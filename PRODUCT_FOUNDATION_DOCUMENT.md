# LabCode — Product Foundation Document (PFD)
## The Constitutional Framework & Product Philosophy for the Digital Programming Laboratory

---

## 1. Product Identity & Definition

### 1.1 Product Naming & Tagline
*   **Official Product Name:** LabCode
*   **Product Tagline:** *The Digital Operating System for Programming Laboratories*

### 1.2 Product Definition & Positioning
LabCode is not merely an online code editor or a browser compiler. It is a specialized, institutional platform designed to manage the entire lifecycle of computer science and engineering laboratory courses. It acts as a digital replacement for the physical observation books, handwritten signatures, manually installed IDEs, and paper grading systems used in engineering colleges.

Unlike general-purpose Learning Management Systems (LMS) like Google Classroom or Moodle, which treat programming as a static file attachment task, LabCode is purpose-built for live, supervised, and evaluated laboratory sessions. It positions itself as the infrastructure layer that bridges the student's sandbox, the faculty's monitor, and the administrator's courses.

---

## 2. Product Philosophy

### 2.1 The "Digital Programming Laboratory" Identity
The traditional laboratory experience in engineering colleges is defined by structure, supervisor presence, immediate validation, and record-keeping. Existing cloud IDEs (e.g., Replit, Gitpod) fail in this environment because they lack institutional constraints: they do not manage syllabus progress, prevent copy-pasting, restrict concurrent logins, or compile verified PDF reports.

LabCode's core philosophy centers on the **Digital Programming Laboratory**:
*   **Presence & Supervision:** Laboratory sessions are synchronous. The platform must connect student screens to the faculty desk in real-time, matching the dynamic of a physical lab room.
*   **Progressive Submission:** Code and observations are recorded in stages. A student does not just submit code; they document their test runs and observation analyses, mirroring the steps of a scientific laboratory.
*   **Authenticity Over Automation:** Evaluators are humans, not scripts. The product is designed to make human grading efficient, not to replace the evaluator's oversight. The platform facilitates this by providing a unified grading interface and authenticated PDF signature stamping.

### 2.2 Why Colleges Choose LabCode
1.  **Lower Administrative Overheads:** Eliminates the need to maintain different compiler versions on lab terminals.
2.  **Verified Academic Integrity:** Enforces proctoring controls (fullscreen locks, paste blocks, single-session checks) that match the strict rules of institutional exams.
3.  **Audit-Ready Compliance:** Generates semester records that are signed, graded, and formatted for academic audits.

---

## 3. Core Guiding Principles

Every feature designed, developed, or integrated into LabCode must align with these eight core principles:

| Principle | Description | Product Application |
| :--- | :--- | :--- |
| **Simple** | Eliminate cognitive load for both students and faculty. | The user interface should present only the tools needed for the active session, avoiding complicated sidebars or menus. |
| **Reliable** | The platform must remain operational under low-network conditions. | Implement local drafting and resilient network request queues to prevent data loss during connectivity drops. |
| **Fast** | Compilation and page loading must happen with minimal latency. | Keep code sandboxing and console output delivery fast to keep students focused on writing code. |
| **Secure** | Student work and faculty evaluations must be tamper-proof. | Prevent students from modifying grades, accessing other students' work, or logging into multiple devices. |
| **Paperless** | Eliminate the need for physical printing. | All records, evaluations, and signatures must be processed digitally and exported as unified, signed PDF packages. |
| **Student-Focused** | The workspace should minimize distractions. | The editor pane should focus on code writing, with clear problem instructions and easy access to observation inputs. |
| **Faculty-Efficient** | Streamline grading workflows to save faculty time. | Enable one-click navigation between student code, outputs, and observations to accelerate the grading process. |
| **Scalable** | The system structure must be ready for future expansions. | Maintain clean separations between user profiles, academic courses, and submission histories. |

---

## 4. Design Rules & Hard Constraints

These design rules serve as the development guidelines for the LabCode interface and system flows:

*   **The 3-Click Rule:** Any core action—such as viewing a student's submission, editing a task description, changing a configuration, or downloading a compiled class report—must be achievable in three clicks or fewer from the user's primary dashboard.
*   **The 2-Second Page Load Budget:** Every application interface (e.g., student editor, faculty grading portal, admin log panel) must load and become interactive within 2 seconds of navigation.
*   **The Code Protection Guarantee:** Student code must never be lost due to network issues, tab closure, or browser crashes. The workspace must auto-save drafts locally in the browser's storage and sync them to the database with every compilation run.
*   **Paperless Enforcement:** The platform must eliminate the need for physical paper trails. Faculty should never manually collect physical prints, and students should not need to handwrite observations.
*   **No Raw database Manipulation:** System administrators must configure sections, mapping tables, and user accounts through the administrator dashboard. Raw SQL execution or manual database edits are restricted.

---

## 5. Usability & User Experience (UX) Targets

To meet institutional standards, the user interface must achieve these performance targets:

### 5.1 Student Workspace UX Targets
*   **Workspace Load Speed:** The code editor, syntax highlighters, and problem descriptions must load and be ready for input within 3 seconds of entering the page.
*   **Language Switch Response:** Switching the editor language (e.g., from Python to C++) must re-configure the editor settings and load the appropriate code template in under 500 milliseconds.
*   **Proctoring Notice Visibility:** If a proctoring violation occurs (e.g., exiting fullscreen), the blocking warning overlay must appear within 200 milliseconds to maintain session integrity.

### 5.2 Faculty Workspace UX Targets
*   **Class Evaluation Cycle:** Faculty must be able to review a student's code, output, and observations, input a grade, add feedback, and sign off in under 30 seconds.
*   **Dashboard Syncing:** The live student seating grid must refresh network statuses and compilation indicators within 3 seconds of a student running code.
*   **Signature Configurator:** The signature upload, preview, and PDF stamping configuration options must be accessible and configurable in under 15 seconds.

---

## 6. Core Workflows

```
Student Workflow:
[Login] -> [Select Subject] -> [Enter Editor] -> [Write/Run Code] -> [Log Observation] -> [Submit] -> [Logout]

Faculty Workflow:
[Login] -> [Select Subject/Section] -> [Configure Locks] -> [Monitor Lab Session] -> [Grade Submissions] -> [Export signed PDF]

Admin Workflow:
[Login] -> [Set Semesters/Sections] -> [Register Users] -> [Map Subject Assignments] -> [Audit Logs]
```

### 6.1 Student Workspace Core Workflow
1.  **Authentication:** The student logs in using their USN and password.
2.  **Subject Selection:** The student lands on the homepage and selects their active subject class (or enters the locked **LAB Exam** workspace if exam mode is active).
3.  **Editor Entry:** The student enters the resizable editor workspace. If the subject configuration requires it, they are prompted to enter fullscreen mode.
4.  **Problem Review:** The student reads the problem description in the Problem tab.
5.  **Code and Test:** The student writes their solution, selects their programming language, and runs compilation tests. They check the console output and modify their code as needed.
6.  **Observation Writing:** Once the output is correct, the student documents their analysis in the Observation tab.
7.  **Final Submission:** The student saves and submits their work, locking the code and observations for faculty grading.
8.  **Report Download:** After grading, the student downloads their certified laboratory report PDF.
9.  **Exit:** The student signs out, releasing their session lock.

### 6.2 Faculty Management Core Workflow
1.  **Authentication:** The faculty member logs in.
2.  **Class Selection:** The faculty member selects a subject and chooses an active section.
3.  **Pre-Lab Security Setup:** The faculty member toggles security parameters (Exam Mode, Fullscreen Lock, Paste Block) for the upcoming lab session.
4.  **Live Session Monitoring:** The faculty member monitors active student heartbeats and compiler outputs from their dashboard.
5.  **Submission Review:** The faculty member clicks a student's profile to open their submission, code revisions, console output, and observations.
6.  **Grading and Stamping:** The faculty member assigns a grade (0–10), adds feedback, and applies their digital signature to stamp the submission.
7.  **Document Export:** The faculty member exports individual reports or generates a bulk PDF containing signed records for the entire class.
8.  **Lockout Control:** After the session ends, the faculty member locks logins for the section to prevent further code edits.

### 6.3 Administrator Management Core Workflow
1.  **Authentication:** The administrator logs in.
2.  **Academic Structure Configuration:** The administrator sets up cycles, departments, academic years, and section divisions.
3.  **User Account Provisioning:** The administrator creates user accounts for students, faculty, and other administrators.
4.  **Course Mapping:** The administrator links faculty members to their respective subjects and sections.
5.  **Syllabus Audit:** The administrator reviews course progress, grading statistics, and raw compile logs to verify curriculum compliance.
6.  **Exit:** The administrator logs out.

---

## 7. Version Roadmap & Growth Strategy

```
  +------------------------------------+
  |             Version 1              |
  | Core Digital Programming Lab       |
  | Single Institution, Base Security  |
  +------------------------------------+
                   |
                   v
  +------------------------------------+
  |             Version 2              |
  | Enhanced Classroom Interaction     |
  | Performance Analytics, Offline Mode|
  +------------------------------------+
                   |
                   v
  +------------------------------------+
  |             Version 3              |
  | Multi-Tenant Expansion             |
  | SaaS Infrastructure, AI Assessment |
  +------------------------------------+
```

### 7.1 Version 1.0: The Core Digital Programming Lab (MITE Focus)
*   **Objective:** Stabilize the core programming workspace, secure evaluations, and replace paper record sheets at MITE.
*   **Key Deliverables:** Single-institution deployment, basic browser proctoring, sandboxed compilers, digital signature stamping, and single-session locks.

### 7.2 Version 2.0: Enhanced Classroom Interaction & Analytics
*   **Objective:** Optimize user interactions, add performance monitoring tools, and improve system reliability.
*   **Key Deliverables:** Offline sandbox compilation fallback, visual student progress charts, automated test-suite runners, draft auto-syncing, and a department-level sub-admin dashboard.

### 7.3 Version 3.0: Multi-Tenant Institutional Expansion
*   **Objective:** Scale LabCode to support multiple colleges and integrate automated evaluation tools.
*   **Key Deliverables:** Multi-tenant database architecture, university-level management dashboards, a Super Admin role, and AI-assisted grading evaluations.

---

## 8. Institutional Security Principles

To maintain academic integrity, the platform must enforce these security principles:

*   **Secure Session Heartbeat Monitoring:** The student's workspace must run a background heartbeat task every 15 seconds. If the session token is removed or modified, the workspace must be immediately locked.
*   **Double-Login Protection:** The system must reject concurrent logins for the same student ID. Session tokens are checked against the last heartbeat time before a new session is allowed.
*   **Browser Proctoring Enforcement:** When fullscreen mode is enabled, the system must detect focus changes and tab exits within 200 milliseconds, overlaying a warning screen that flags the student's profile on the faculty dashboard.
*   **Clipboard Control:** Clipboard copy and paste actions must be blocked inside the editor view when the paste restriction toggle is active.
*   **Grading Security:** Grades, observations, and feedback fields are write-restricted. Only the faculty member assigned to the subject can edit grades.
*   **Digital Signature Stamping Protection:** Signature templates uploaded by faculty must be stored securely on the client-side to prevent unauthorized use. The signature should be loaded into memory only during document compilation and cleared immediately afterward.
*   **Access Lockouts:** Faculty must be able to lock a student's login access after a lab session, preventing any post-lab modifications to codes or observations.
*   **System Action Logging:** The system must log administrative actions, grading events, and student submission details for security auditing.

---

## 9. Product Success Metrics

To evaluate the success of the Version 1.0 deployment at MITE, the system performance will be measured against the following targets:

| Success Metric ID | Target Metric | Target Performance Level |
| :--- | :--- | :--- |
| **MTR-001** | Paper Reduction Rate | 95% of laboratory evaluations must be completed digitally, without requiring physical printouts. |
| **MTR-002** | Average Compiler Sandbox Latency | Sandbox code compilations and output returns must complete in under 5 seconds under standard network loads. |
| **MTR-003** | Faculty Grading Duration | Faculty must be able to review, grade, and sign off on a student program in under 30 seconds. |
| **MTR-004** | Average Student Login Time | User login and dashboard initialization must complete in under 2 seconds. |
| **MTR-005** | Double-Login Containment | Zero instances of concurrent logins under the same student ID during lab sessions. |
| **MTR-006** | PDF Document Compilation Latency | Generating single student reports must take under 4 seconds, and class-wide bulk PDFs must generate in under 15 seconds. |

---

## 10. Future-Proof Decisions for Version 1.0

Although Version 1.0 is built exclusively for MITE, the following design decisions will be implemented to support future scaling:

*   **Decoupled Database Schema:** The database schema will be structured with independent department, section, cycle, and subject mappings. This allows the system to scale from one department to university-wide courses without structural database changes.
*   **Tenant-Ready Architecture:** User accounts and submissions will reference institutional identifiers. This makes it easier to transition to a multi-tenant SaaS model in later versions.
*   **Decoupled Compiling Layer:** The compiler sandbox module will run independently of the core dashboard logic. This allows the compiler to be swapped or updated without affecting session logs or grading systems.
*   **State-Driven Proctoring Controls:** Fullscreen locks and copy-paste blocks will be controlled by state parameters in the subjects table. This allows the system to support additional proctoring tools in future updates.
