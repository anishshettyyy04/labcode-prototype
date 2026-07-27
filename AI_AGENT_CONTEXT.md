# LabCode - AI Agent Context & Handoff Document

**CRITICAL DIRECTIVE FOR ALL AI AGENTS:**
> **EVERY AI AGENT working on this project MUST read this document FIRST before making any changes.** 
> Understand the flow of the project, the architecture, and the existing features. 
> **Whenever you make a significant change, fix a bug, or add a feature, you MUST update the "Recent Changes by AI Agents" section at the bottom of this document.** This helps other AI agents to understand the flow of the project.

---

## 🏗️ Project Architecture

LabCode is a lightweight, full-stack educational platform for students to write, execute, and submit code during lab sessions, and for faculty to evaluate and export those submissions.

### 1. Frontend (Vanilla HTML/CSS/JS)
- **`login.html`**: Handles authentication for both `student` and `faculty` roles.
- **`index.html` (Student Dashboard)**: 
  - Contains a resizable split-pane code editor (invisible `textarea` overlaid with syntax highlighting).
  - Includes tabs for Code, Problem Description, and Observation.
  - Features an isolated Light/Dark theme switcher specifically for the code editor (persisted in `localStorage`).
  - Communicates with Judge0 for code execution.
- **`faculty-home.html`**: Faculty portal to select assigned subjects/sections. Includes a modal to upload a Faculty Signature (saved in `localStorage`).
- **`dashboard.html` (Faculty Dashboard)**: Displays all student submissions for a selected subject. Allows faculty to assign marks, add observations, and export single or bulk PDFs (stamped with the faculty's local signature).

### 2. Backend Server (`server.js`)
- **Express.js API** deployed on Render (`https://labcode-m4i3.onrender.com`).
- **Endpoints**:
  - `/run` (POST): Proxies code execution to the public Judge0 API (`https://ce.judge0.com`).
  - `/submissions`, `/marks`, `/observation` (GET/POST/PATCH): Interfaces with the Supabase database.
  - `/export/:usn` (GET/POST): Generates a PDF for a single student using `pdfkit`. Accepts `POST` to receive the faculty signature from the frontend.
  - `/export-subject/:subjectId` (GET/POST): Generates a bulk PDF for all students in a subject.

### 3. Database (Supabase PostgreSQL)
- **URL**: `https://brjugcqaznpgvfbcpnxl.supabase.co`
- **Tables**:
  - `users`: Stores USN, password, role, name (Note: DOES NOT contain signature columns).
  - `subjects`: Metadata about lab subjects.
  - `faculty_subjects`: Maps faculty USNs to subjects and sections.
  - `tasks`: Programming problems assigned to subjects.
  - `submissions`: Student code submissions, output, marks, and observations.

---

## ⚙️ Core Features & Flows

- **Live Code Execution**: Handled via Judge0. The student's code is sent to the backend `/run`, which forwards it to Judge0 and returns stdout/stderr.
- **Syntax Highlighting**: Custom-built using a transparent `textarea` layered over a stylized `div`. **Warning**: Beware of DOM selection bugs (e.g., `selectedOptions`) when updating this logic.
- **PDF Generation**: Handled server-side via `pdfkit`. The frontend must send the faculty signature (base64) from `localStorage` in the body of a `POST` request to bypass missing database columns. 
- **Data Fetching**: The frontend fetches data directly from the Supabase REST API using an `anon` key, except for routes that require server-side processing (like code execution and PDF generation).

---

## 📝 Recent Changes by AI Agents

*(Append to this list whenever you make architectural changes or fix complex bugs)*

1. **Syntax Highlighter Bug Fix**: Fixed a visual bug where the editor overlay would freeze on older boilerplate code. Replaced `.selectedOptions[0]` with `.options[.selectedIndex]` to prevent browser crashes.
2. **Editor Light/Dark Theme**: Added an isolated theme switcher for the code editor space that toggles CSS variables without affecting the global app theme.
3. **Faculty Signature System Overhaul**: The `users` database table was missing `signature_image` columns, causing silent 500 errors. Rewrote the system to store signatures locally in the browser's `localStorage`, and updated the frontend to send the signature via `POST` payload to the PDF generator.
4. **PDF Export Route Fix**: Updated `server.js` export routes to use `app.all()` (supporting both `GET` and `POST`) and increased the `express.json` payload limit to 10MB to accommodate large base64 signature images. This ensures `window.open` downloads from the student dashboard don't fail with `Cannot GET` errors.
5. **Dashboard Stats Crash Fix**: `loadAll()` in `dashboard.html` referenced non-existent DOM elements (`stat-total`, `stat-passing`), causing a JS crash that prevented `stat-students` and `stat-programs` from ever updating (both showed "0"). Removed the broken references and the failing `sessions` table query. Now `stat-students` shows enrolled count and `stat-programs` shows live heartbeat-based active student count from `activeStudentUSNs`.
6. **Multi-Account Login Notification**: Added a styled security violation modal in `login.html` that appears when a student tries to log in while already logged in elsewhere. Also shows a distinct "Login Blocked" modal when faculty has temporarily blocked the student. Both are visually distinct from normal login errors (red warning theme, shake animation, acknowledgment button).
7. **Exam Mode Security Hardening**: Three new protections in `index.html`: (a) ESC key is intercepted in capture phase to prevent default fullscreen-exit, (b) `window.blur` event detects Alt+Tab/app switching and counts as a proctoring violation, (c) `visibilitychange` event detects browser tab switching. All violations feed into the existing violation counter (max 4 before auto-block). A cooldown mechanism prevents double-counting when both blur and visibilitychange fire simultaneously.
8. **Live Faculty Notifications**: Implemented real-time proctoring alerts for the faculty dashboard. Added an in-memory violation log to `server.js` (`/report-violation` and `/violations` endpoints). `index.html` now reports fullscreen exits, tab switches, and Alt+Tab events to the server. `dashboard.html` features a new notification bell with a badge counter, a dropdown panel, and 8-second polling with audio/visual alerts when new violations occur. Multi-login attempts are also logged automatically by the server.
