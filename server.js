const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

const SUPABASE_URL = 'https://brjugcqaznpgvfbcpnxl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyanVnY3Fhem5wZ3ZmYmNwbnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MjY3MDksImV4cCI6MjA5NzAwMjcwOX0.PHHcKuR0LLh-6YpEZwNPKcW9d7yL8BO-c9_z3oQYmHU';

const db = axios.create({
  baseURL: SUPABASE_URL + '/rest/v1',
  headers: {
    'apikey': SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
  }
});

// ===== IN-MEMORY VIOLATION LOG =====
// Stores recent proctoring violations for the faculty dashboard notifications.
// Kept in-memory (no DB table needed) — resets on server restart, which is fine
// since violations are session-scoped events.
const violationLog = [];       // Array of { usn, name, type, message, timestamp }
const MAX_VIOLATIONS = 200;    // Cap to prevent memory bloat

function addViolation(usn, name, type, message) {
  violationLog.unshift({ usn, name: name || usn, type, message, timestamp: new Date().toISOString() });
  if (violationLog.length > MAX_VIOLATIONS) violationLog.length = MAX_VIOLATIONS;
}

// LOGIN
app.post('/login', async (req, res) => {
  const { usn, password } = req.body;
  try {
    const result = await db.get(`/users?usn=eq.${usn}&password=eq.${password}`);
    if (result.data.length === 0) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    const user = result.data[0];

    // Check temporary login block (e.g. faculty locked rewrites after an exam)
    if (user.login_blocked_until) {
      const blockedUntil = new Date(user.login_blocked_until);
      if (blockedUntil > new Date()) {
        const minsLeft = Math.ceil((blockedUntil - new Date()) / 60000);
        return res.json({
          success: false,
          message: `Login temporarily locked by faculty. Try again in ${minsLeft} minute${minsLeft !== 1 ? 's' : ''}.`
        });
      }
    }

    // Single-session lock — students only
    if (user.role === 'student') {
      const activeCheck = await db.get(`/active_logins?usn=eq.${usn}`);
      if (activeCheck.data.length > 0) {
        const lastSeen = new Date(activeCheck.data[0].last_seen);
        const secondsSinceActive = (new Date() - lastSeen) / 1000;
        // Consider a session "still active" if heartbeat was within the last 40 seconds
        if (secondsSinceActive < 40) {
          // Log the multi-login attempt as a violation for the faculty dashboard
          addViolation(usn, user.name, 'multi_login', `${user.name || usn} tried to login from another device while already active`);
          return res.json({
            success: false,
            message: 'You are already logged in on another device. Please log out there first.'
          });
        }
        // Stale session (tab closed without cleanup) — clear it and continue
        await db.delete(`/active_logins?usn=eq.${usn}`);
      }

      const loginToken = 'tok_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
      await db.post('/active_logins', { usn, login_token: loginToken });
      return res.json({ success: true, name: user.name, role: user.role, usn: user.usn, login_token: loginToken });
    }

    // Faculty/admin/hod — no session lock
    res.json({ success: true, name: user.name, role: user.role, usn: user.usn });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// HEARTBEAT — keeps a student's active session alive
app.post('/heartbeat', async (req, res) => {
  const { usn, login_token } = req.body;
  try {
    // Check if the session row still exists (faculty may have force-deleted it)
    const check = await db.get(`/active_logins?usn=eq.${usn}&login_token=eq.${login_token}`);
    if (!check.data || check.data.length === 0) {
      // Session was deleted (force-logout by faculty) — tell the client
      return res.json({ success: false, kicked: true });
    }

    // Also check if the student has been login-blocked
    const userCheck = await db.get(`/users?usn=eq.${usn}`);
    if (userCheck.data && userCheck.data.length > 0 && userCheck.data[0].login_blocked_until) {
      const blockedUntil = new Date(userCheck.data[0].login_blocked_until);
      if (blockedUntil > new Date()) {
        // Student was blocked — kick them out
        await db.delete(`/active_logins?usn=eq.${usn}`);
        return res.json({ success: false, kicked: true, blocked: true });
      }
    }

    await db.patch(`/active_logins?usn=eq.${usn}&login_token=eq.${login_token}`, {
      last_seen: new Date().toISOString()
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// LOGOUT CLEANUP — removes the active session row
app.post('/session-logout', async (req, res) => {
  const { usn } = req.body;
  try {
    await db.delete(`/active_logins?usn=eq.${usn}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// FACULTY: check which students are currently active (for dashboard live indicator)
app.get('/active-students', async (req, res) => {
  try {
    const result = await db.get('/active_logins');
    // Only count as active if heartbeat within last 40 seconds
    const cutoff = new Date(Date.now() - 40000);
    const active = result.data.filter(r => new Date(r.last_seen) > cutoff);
    res.json(active.map(r => r.usn));
  } catch (err) {
    res.status(500).json([]);
  }
});

// FACULTY: force-log-out a student (frees their session immediately)
app.post('/force-logout/:usn', async (req, res) => {
  try {
    await db.delete(`/active_logins?usn=eq.${req.params.usn}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// FACULTY: temporarily block a student from logging in (post-exam lock)
app.post('/block-login/:usn', async (req, res) => {
  const { minutes } = req.body;
  try {
    const until = new Date(Date.now() + (minutes || 60) * 60000).toISOString();
    await db.patch(`/users?usn=eq.${req.params.usn}`, { login_blocked_until: until });
    // Also kick them out immediately if currently logged in
    await db.delete(`/active_logins?usn=eq.${req.params.usn}`);
    res.json({ success: true, until });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// FACULTY: remove a login block early
app.post('/unblock-login/:usn', async (req, res) => {
  try {
    await db.patch(`/users?usn=eq.${req.params.usn}`, { login_blocked_until: null });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// RUN CODE
app.post('/run', async (req, res) => {
  const { code, language_id, usn, program, language, stdin } = req.body;
  try {
    const submit = await axios.post('https://ce.judge0.com/submissions?wait=true', {
      source_code: code,
      language_id: language_id,
      stdin: stdin || ""
    });
    const result = submit.data;
    const output = result.stdout || result.stderr || result.compile_output || "No output";
    const status = result.status.description;

    await db.post('/submissions', {
      usn: usn || 'unknown',
      program: program || 'prog_1',
      language: language || 'unknown',
      code,
      output,
      status,
      subject_id: req.body.subject_id || null
    });

    res.json({ output, status });
  } catch (err) {
    res.status(500).json({ error: "Execution failed", detail: err.message });
  }
});

// SAVE SUBMISSION (For Local Electron Compiler)
app.post('/save-submission', async (req, res) => {
  const { code, language, usn, program, subject_id, output, status } = req.body;
  try {
    await db.post('/submissions', {
      usn: usn || 'unknown',
      program: program || 'prog_1',
      language: language || 'unknown',
      code: code || '',
      output: output || '',
      status: status || 'Accepted',
      subject_id: subject_id || null
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Save failed", detail: err.message });
  }
});

// GET all submissions
app.get('/submissions', async (req, res) => {
  try {
    const result = await db.get('/submissions?order=submitted_at.desc');
    res.json(result.data);
  } catch (err) {
    res.status(500).json([]);
  }
});

// GET submissions by USN
app.get('/submissions/:usn', async (req, res) => {
  try {
    const result = await db.get(`/submissions?usn=eq.${req.params.usn}&order=submitted_at.asc`);
    res.json(result.data);
  } catch (err) {
    res.status(500).json([]);
  }
});

// SAVE MARKS
app.post('/marks', async (req, res) => {
  const { id, marks } = req.body;
  try {
    await db.patch(`/submissions?id=eq.${id}`, { marks });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// SAVE OBSERVATION
app.post('/observation', async (req, res) => {
  const { id, observation } = req.body;
  try {
    await db.patch(`/submissions?id=eq.${id}`, { observation });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// UPDATE FACULTY SIGNATURE (Deprecated, handled in frontend via localStorage now)

// EXPORT PDF
app.all('/export/:usn', async (req, res) => {
  const PDFDocument = require('pdfkit');
  const usn = req.params.usn;
  const subjectId = req.query.subject_id;
  const { signature_image, signature_enabled } = req.body || {};

  try {
    let query = `/submissions?usn=eq.${usn}&order=submitted_at.asc`;
    if (subjectId) query += `&subject_id=eq.${subjectId}`;
    const result = await db.get(query);
    let submissions = result.data;

    const latestSubsMap = new Map();
    submissions.forEach(s => latestSubsMap.set(s.program, s));
    submissions = Array.from(latestSubsMap.values());


    if (!submissions.length) {
      return res.status(404).json({ error: 'No submissions found for this subject yet.' });
    }

    const userResult = await db.get(`/users?usn=eq.${usn}`);
    const user = userResult.data[0];

    const doc = new PDFDocument({ margin: 50, bufferPages: true });
    res.setHeader('Content-Type', 'application/pdf');

    const subjectName = req.query.subject || 'Lab';
    const safeSubjectName = subjectName.replace(/[^a-zA-Z0-9_-]/g, '_');
    res.setHeader('Content-Disposition', `attachment; filename=LabRecord_${usn}_${safeSubjectName}.pdf`);

    doc.pipe(res);

    const PAGE_W = doc.page.width;
    const MARGIN = 50;
    const CONTENT_W = PAGE_W - MARGIN * 2;

    let facSignature = signature_image || null;
    let facSigEnabled = signature_enabled === true;
    let facultyName = 'Authorized Faculty';
    
    // We still try to get the faculty name from the database, but we use the provided signature
    if (subjectId) {
      try {
        const facSubResult = await db.get(`/faculty_subjects?subject_id=eq.${subjectId}`);
        if (facSubResult.data.length > 0) {
          const fUsn = facSubResult.data[0].faculty_usn;
          const fUserResult = await db.get(`/users?usn=eq.${fUsn}`);
          if (fUserResult.data.length > 0) {
            facultyName = fUserResult.data[0].name || fUsn;
          }
        }
      } catch(e) {}
    }

    // ===== COVER =====
    doc.rect(0, 0, PAGE_W, 120).fill('#1e1e2e');
    const startX = (PAGE_W - 154) / 2;
    try {
      doc.image(path.join(__dirname, 'MITE_logo.png'), startX, 28, { width: 36, height: 36 });
    } catch(e) {}
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(28).text('LabCode', startX + 44, 33);
    doc.fillColor('#a6adc8').font('Helvetica').fontSize(12).text(`Lab Record — ${subjectName} — MITE`, MARGIN, 76, { width: CONTENT_W, align: 'center' });

    let y = 145;
    doc.roundedRect(MARGIN, y, CONTENT_W, 85, 8).fill('#f0f4ff');
    doc.fillColor('#1e3a5f').font('Helvetica-Bold').fontSize(12).text('Student Details', MARGIN + 20, y + 14);
    doc.fillColor('#333333').font('Helvetica').fontSize(10.5)
      .text(`Name: ${user ? user.name : 'Unknown'}`, MARGIN + 20, y + 36)
      .text(`USN: ${usn}`, MARGIN + 260, y + 36)
      .text(`Subject: ${subjectName}`, MARGIN + 20, y + 54)
      .text(`Total Programs: ${submissions.length}`, MARGIN + 260, y + 54);

    let sigY = y + 110;
    doc.lineWidth(1).roundedRect(MARGIN, sigY, CONTENT_W, 110, 8).stroke('#e2e2ea');
    doc.fillColor('#1e3a5f').font('Helvetica-Bold').fontSize(12).text('Faculty Authentication', MARGIN + 20, sigY + 14);
    
    if (facSigEnabled && facSignature) {
      try {
        const base64Data = facSignature.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');
        doc.image(imageBuffer, MARGIN + 20, sigY + 34, { fit: [150, 40] });
      } catch(e) {
        doc.fillColor('#ff5a78').font('Helvetica').fontSize(10).text('[Signature Image Error]', MARGIN + 20, sigY + 40);
      }
    } else {
      doc.fillColor('#a8a8bc').font('Helvetica-Oblique').fontSize(10).text('Signed digitally / Not provided', MARGIN + 20, sigY + 40);
    }
    doc.fillColor('#333333').font('Helvetica-Bold').fontSize(10.5).text(facultyName, MARGIN + 20, sigY + 76);
    doc.fillColor('#666666').font('Helvetica').fontSize(9.5).text('Evaluating Faculty, MITE', MARGIN + 20, sigY + 90);

    // ===== PROGRAMS — one per page, fully flowed (no manual y math fighting moveDown) =====
    submissions.forEach((s, i) => {
      doc.addPage();

      // Header bar
      doc.rect(MARGIN, doc.y, CONTENT_W, 32).fill('#1e3a5f');
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(12)
        .text(`Program ${i + 1} — ${s.program}`, MARGIN + 12, doc.y - 24, { width: CONTENT_W - 24 });
      doc.moveDown(1.4);

      doc.fillColor('#333333').font('Helvetica').fontSize(10)
        .text(`Language: ${s.language}    |    Date: ${new Date(s.submitted_at).toLocaleDateString()}    |    Marks: ${s.marks !== null && s.marks !== undefined ? s.marks + '/10' : 'Not graded'}`,
          { width: CONTENT_W });
      doc.moveDown(0.8);

      const isFrontend = s.language === 'Frontend' || s.language === 'HTML/CSS';

      function sectionHeading(label) {
        doc.fillColor('#2e6fd8').font('Helvetica-Bold').fontSize(10.5).text(label, { width: CONTENT_W });
        doc.moveDown(0.25);
      }
      function codeBlock(text, color = '#1a1a2e', maxChars = 3000) {
        doc.fillColor(color).font('Courier').fontSize(8.3)
          .text((text || '').substring(0, maxChars), { width: CONTENT_W, lineGap: 1.5 });
        doc.font('Helvetica').moveDown(0.7);
      }

      if (isFrontend) {
        // Split the combined "/* HTML */ ... /* CSS */ ... /* JS */ ..." blob back into parts
        const code = s.code || '';
        const htmlMatch = code.match(/\/\* HTML \*\/([\s\S]*?)(?=\/\* CSS \*\/|$)/);
        const cssMatch = code.match(/\/\* CSS \*\/([\s\S]*?)(?=\/\* JS \*\/|$)/);
        const jsMatch = code.match(/\/\* JS \*\/([\s\S]*?)$/);

        sectionHeading('HTML');
        codeBlock(htmlMatch ? htmlMatch[1].trim() : code, '#1a1a2e', 1500);

        if (doc.y > doc.page.height - 150) doc.addPage();
        sectionHeading('CSS');
        codeBlock(cssMatch ? cssMatch[1].trim() : '(none)', '#1a1a2e', 1000);

        if (doc.y > doc.page.height - 150) doc.addPage();
        sectionHeading('JavaScript');
        codeBlock(jsMatch ? jsMatch[1].trim() : '(none)', '#1a1a2e', 1000);

        if (doc.y > doc.page.height - 100) doc.addPage();
        sectionHeading('Result');
        doc.fillColor('#1a4a1a').font('Helvetica').fontSize(9.5)
          .text('Page rendered successfully in the browser live-preview panel during the lab session. Visual screenshots are not embedded in this PDF — refer to the live preview in LabCode for visual verification.',
            { width: CONTENT_W });
        doc.moveDown(0.8);
      } else {
        sectionHeading('Code:');
        codeBlock(s.code, '#1a1a2e', 3000);

        if (doc.y > doc.page.height - 150) doc.addPage();
        sectionHeading('Output:');
        codeBlock(s.output || 'No output', '#1a4a1a', 1500);
      }

      if (doc.y > doc.page.height - 120) doc.addPage();
      sectionHeading('Observation:');
      const obs = s.observation ||
        `The program "${s.program}" was implemented in ${s.language} and executed successfully. Output was verified on ${new Date(s.submitted_at).toLocaleDateString()} during the lab session at MITE. Status: ${s.status}.`;
      doc.fillColor('#333333').font('Helvetica').fontSize(9.5).text(obs, { width: CONTENT_W });
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: 'Export failed', detail: err.message });
  }
});

// EXPORT ALL STUDENTS' SUBMISSIONS FOR A SUBJECT (faculty/student bulk export)
app.all('/export-subject/:subjectId', async (req, res) => {
  const PDFDocument = require('pdfkit');
  const subjectId = req.params.subjectId;
  const subjectName = req.query.subject || 'Lab';
  const { signature_image, signature_enabled } = req.body || {};

  try {
    const result = await db.get(`/submissions?subject_id=eq.${subjectId}&order=usn.asc,submitted_at.asc`);
    const submissions = result.data;

    if (!submissions.length) {
      return res.status(404).json({ error: 'No submissions found for this subject yet.' });
    }

    const usns = [...new Set(submissions.map(s => s.usn))];
    const usersResult = await db.get(`/users?usn=in.(${usns.map(u => '"' + u + '"').join(',')})`);
    const userMap = {};
    usersResult.data.forEach(u => userMap[u.usn] = u.name);

    const doc = new PDFDocument({ margin: 50, bufferPages: true });
    res.setHeader('Content-Type', 'application/pdf');
    const safeSubjectName = subjectName.replace(/[^a-zA-Z0-9_-]/g, '_');
    res.setHeader('Content-Disposition', `attachment; filename=LabRecord_${safeSubjectName}_AllStudents.pdf`);
    doc.pipe(res);

    const PAGE_W = doc.page.width;
    const MARGIN = 50;
    const CONTENT_W = PAGE_W - MARGIN * 2;

    let facSignature = signature_image || null;
    let facSigEnabled = signature_enabled === true;
    let facultyName = 'Authorized Faculty';
    
    // Attempt to resolve actual faculty name from database
    try {
      const facSubResult = await db.get(`/faculty_subjects?subject_id=eq.${subjectId}`);
      if (facSubResult.data.length > 0) {
        const fUsn = facSubResult.data[0].faculty_usn;
        const fUserResult = await db.get(`/users?usn=eq.${fUsn}`);
        if (fUserResult.data.length > 0) {
          facultyName = fUserResult.data[0].name || fUsn;
        }
      }
    } catch(e) {}

    // Cover page with summary table
    doc.rect(0, 0, PAGE_W, 120).fill('#1e1e2e');
    const startX = (PAGE_W - 154) / 2;
    try {
      doc.image(path.join(__dirname, 'MITE_logo.png'), startX, 28, { width: 36, height: 36 });
    } catch(e) {}
    doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(28).text('LabCode', startX + 44, 33);
    doc.fillColor('#cbd6f0').font('Helvetica').fontSize(12).text(`Full Class Submissions — ${subjectName}`, MARGIN, 76, { width: CONTENT_W, align: 'center' });

    doc.moveDown(4);
    let sigY = 160;
    doc.lineWidth(1).roundedRect(MARGIN, sigY, CONTENT_W, 110, 8).stroke('#e2e2ea');
    doc.fillColor('#1e3a5f').font('Helvetica-Bold').fontSize(12).text('Faculty Authentication', MARGIN + 20, sigY + 14);
    if (facSigEnabled && facSignature) {
      try {
        const base64Data = facSignature.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');
        doc.image(imageBuffer, MARGIN + 20, sigY + 34, { fit: [150, 40] });
      } catch(e) {}
    } else {
      doc.fillColor('#a8a8bc').font('Helvetica-Oblique').fontSize(10).text('Signed digitally / Not provided', MARGIN + 20, sigY + 40);
    }
    doc.fillColor('#333333').font('Helvetica-Bold').fontSize(10.5).text(facultyName, MARGIN + 20, sigY + 76);
    doc.fillColor('#666666').font('Helvetica').fontSize(9.5).text('Evaluating Faculty, MITE', MARGIN + 20, sigY + 90);

    doc.fillColor('#333333').font('Helvetica-Bold').fontSize(11).text(`Students: ${usns.length}    |    Total Submissions: ${submissions.length}`, MARGIN, sigY + 140, { width: CONTENT_W });

    // One section per student, each program on its own page
    usns.forEach(usn => {
      let studentSubs = submissions.filter(s => s.usn === usn);
      const latestSubsMap = new Map();
      studentSubs.forEach(s => latestSubsMap.set(s.program, s));
      studentSubs = Array.from(latestSubsMap.values());

      doc.addPage();
      doc.rect(MARGIN, doc.y, CONTENT_W, 30).fill('#1e3a5f');
      doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(12).text(`${userMap[usn] || usn}  (${usn})`, MARGIN + 12, doc.y - 22);
      doc.moveDown(1.2);

      studentSubs.forEach((s, i) => {
        if (i > 0 && doc.y > doc.page.height - 200) doc.addPage();
        doc.fillColor('#2e6fd8').font('Helvetica-Bold').fontSize(10.5).text(`${s.program} — ${s.language}`, { width: CONTENT_W });
        doc.fillColor('#666666').font('Helvetica').fontSize(9).text(`Marks: ${s.marks !== null && s.marks !== undefined ? s.marks + '/10' : 'Not graded'}  |  ${new Date(s.submitted_at).toLocaleDateString()}`, { width: CONTENT_W });
        doc.moveDown(0.3);
        doc.fillColor('#1a1a2e').font('Courier').fontSize(8).text((s.code || '').substring(0, 1200), { width: CONTENT_W, lineGap: 1.5 });
        doc.font('Helvetica').moveDown(1);
      });
    });

    doc.end();
  } catch (err) {
    res.status(500).json({ error: 'Export failed', detail: err.message });
  }
});

// GET tasks
app.get('/tasks', async (req, res) => {
  try {
    const subjectId = req.query.subject_id;
    let query = '/tasks?is_active=eq.true&order=program.asc';
    if (subjectId) query += `&subject_id=eq.${subjectId}`;
    const result = await db.get(query);
    res.json(result.data);
  } catch (err) {
    res.status(500).json([]);
  }
});

// GET faculty subjects and sections
app.get('/faculty-subjects/:usn', async (req, res) => {
  try {
    const result = await db.get(`/faculty_subjects?faculty_usn=eq.${req.params.usn}&select=*,subjects(*),sections(*)`);
    res.json(result.data);
  } catch (err) {
    res.status(500).json([]);
  }
});

// GET subject settings
app.get('/subject-settings/:id', async (req, res) => {
  try {
    const result = await db.get(`/subjects?id=eq.${req.params.id}`);
    if (result.data.length) {
      res.json({
        paste_enabled: result.data[0].paste_enabled,
        fullscreen_lock: result.data[0].fullscreen_lock
      });
    } else {
      res.json({ paste_enabled: false, fullscreen_lock: false });
    }
  } catch (err) {
    res.status(500).json({ paste_enabled: false, fullscreen_lock: false });
  }
});

// UPDATE subject settings
app.post('/subject-settings/:id', async (req, res) => {
  const { key, value } = req.body;
  try {
    await db.patch(`/subjects?id=eq.${req.params.id}`, { [key]: value === 'true' || value === true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ===== PROCTORING VIOLATION REPORTING =====
// Students report violations (tab switch, fullscreen exit, alt+tab, etc.)
app.post('/report-violation', async (req, res) => {
  const { usn, name, type, message } = req.body;
  if (!usn || !type) return res.status(400).json({ success: false });
  addViolation(usn, name, type, message || `${name || usn} committed a proctoring violation: ${type}`);
  res.json({ success: true });
});

// Faculty fetches recent violations (optionally filtered by ?since=ISO_timestamp)
app.get('/violations', (req, res) => {
  const since = req.query.since;
  if (since) {
    const sinceDate = new Date(since);
    const newer = violationLog.filter(v => new Date(v.timestamp) > sinceDate);
    return res.json(newer);
  }
  // Return the last 50 by default
  res.json(violationLog.slice(0, 50));
});

// Faculty clears the violation log (dismiss all)
app.post('/violations/clear', (req, res) => {
  violationLog.length = 0;
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('LabCode server running on port ' + PORT);
});
