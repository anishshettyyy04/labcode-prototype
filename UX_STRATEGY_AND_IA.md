# LabCode — UX Strategy & Information Architecture (Phase 2.1)
## System Constitution & Interaction Blueprint — MITE Institutional Deployment

---

## 1. UX Vision

The User Experience (UX) strategy for LabCode Version 1 is designed to support the academic rigor and operational structure of engineering lab sessions and examinations at MITE. The platform replaces paper-based tasks with a digital environment that is predictable, secure, and focused on learning.

```
       STUDENT                              FACULTY                             ADMINISTRATOR
+--------------------+               +--------------------+               +--------------------+
|  Deep Focus        |               |  Operational Speed |               |  Administrative    |
|  - Zero visual noise|               |  - One-screen view |               |    Clarity         |
|  - Reliable saves  |               |  - Rapid grading   |               |  - Automated logs  |
|  - Clear targets   |               |  - Instant locks   |               |  - Easy mapping    |
+--------------------+               +--------------------+               +--------------------+
```

### 1.1 Stakeholder Emotional Responses
*   **Students:** Should feel focused, calm, and confident in the reliability of their workspace. During timed examinations, the interface must minimize anxiety by ensuring code drafts are never lost and compilation status is clear.
*   **Faculty:** Should feel in control and efficient. The platform should reduce their grading workload, allowing them to review, evaluate, and sign records quickly from a single screen.
*   **Administrators:** Should feel that system configuration is clear and straightforward, allowing them to map departments, subjects, sections, and faculty assignments without manual database adjustments.

### 1.2 UX Keywords & Definitions
*   **Simple:** Minimizes visual elements to reduce cognitive load and focus the user on the task at hand.
*   **Reliable:** Focuses on data integrity, ensuring user work is saved even during network interruptions.
*   **Professional:** Uses clean, functional layout designs that mirror modern software tools (e.g., VS Code, GitHub) rather than looking like a student project.
*   **Predictable:** Employs consistent navigation patterns, page layouts, and action button behaviors across the application.
*   **Efficient:** Minimizes the steps required to complete tasks, supporting keyboard navigation for students and quick grading loops for faculty.
*   **Minimal:** Excludes unnecessary menus, indicators, and details to keep screens clean and clear.
*   **Fast:** Optimized UI transitions, quick data fetches, and fast sandboxed runtimes that deliver compiler feedback immediately.
*   **Focused:** Maximize vertical code-editing space and isolate the editor layout from global display themes to prevent distractions.

---

## 2. UX Principles

These twenty core principles guide the interaction design of LabCode:

```
+-----------------------------------------------------------------------------------+
|                            THE TWENTY LABCODE UX PRINCIPLES                        |
+-----------------------------------------------------------------------------------+
|  1. Never Interrupt Code Input         |  11. One-Screen Faculty Evaluation Panel  |
|  2. Implicit Autosave is Required      |  12. Session Status Visibility (Heartbeat)|
|  3. Zero-Friction Sandbox Output       |  13. Double-Login Blocking Control        |
|  4. non-Disruptive Proctoring Warnings |  14. Grade Integrity and Modification Lock|
|  5. Predictable Breadcrumb Navigation  |  15. Destructive Action Confirmation Logs |
|  6. Context-Aware Help Messages        |  16. Network Connection Loss Banner       |
|  7. No Orphan Screens                  |  17. Minimalist Form Configuration        |
|  8. High Contrast Active Layouts       |  18. Keyboard First Navigation Order      |
|  9. Explicit Navigation Backwards      |  19. Direct Report Download Flow          |
| 10. Grade-State Visibility            |  20. No Manual SQL Operations             |
+-----------------------------------------------------------------------------------+
```

1.  **Never Interrupt Code Input:** The student's typing must never be interrupted by background saves, auto-sync warnings, or non-critical alert popups.
2.  **Implicit Autosave is Required:** Code drafts and observation logs must autosave locally in the browser's storage as the student writes, ensuring no progress is lost in a crash.
3.  **Zero-Friction Sandbox Output:** Compiler results (stdout, stderr, runtime metrics) must display directly below the editor code pane to prevent window switching.
4.  **Non-Disruptive Proctoring Warnings:** When fullscreen mode is exited, the proctoring warning overlay must explain the violation clearly and provide an easy way to return to the workspace.
5.  **Predictable Breadcrumb Navigation:** Users must always see where they are in the course structure (e.g., `IS Lab > Year 3 > Sec A > Program 1`) at the top of the interface.
6.  **Context-Aware Help Messages:** Compiler error messages must be accompanied by simple, actionable recommendations on how to fix syntax issues.
7.  **No Orphan Screens:** Every subview or details panel must have a visible path back to the parent module view.
8.  **High Contrast Active Layouts:** Focus active statuses (e.g., active editor tabs, chosen menus) using distinct colors to establish clear visual hierarchy.
9.  **Explicit Navigation Backwards:** Reversible paths must use simple, recognizable actions (e.g., `← Subjects`) to ensure users can safely exit workspaces.
10. **Grade-State Visibility:** Submissions must clearly indicate their status—*Pending Evaluation*, *Graded*, or *Requires Revision*—using distinct visual tags.
11. **One-Screen Faculty Evaluation Panel:** Faculty must be able to view student code, compile logs, observations, and grade input fields on a single, split screen.
12. **Session Status Visibility (Heartbeat):** The header bar must display connection health and heartbeat indicators so students know their session is secure.
13. **Double-Login Blocking Control:** When account conflicts occur, the system must show a message explaining the lockout status and listing the active session's details.
14. **Grade Integrity and Modification Lock:** Once a grade is submitted, the code and observation entries must lock, preventing students from editing their work.
15. **Destructive Action Confirmation Logs:** Destructive actions, such as signing out during a test or removing a student's session, must require double confirmation.
16. **Network Connection Loss Banner:** If the connection is lost, a non-blocking banner must display at the top of the screen to reassure students that their current code draft is saved locally.
17. **Minimalist Form Configuration:** Administrative forms must collect only required parameters, keeping setups quick and simple.
18. **Keyboard-First Navigation Order:** All interactive controls must support logical tab index loops, allowing keyboard navigation without a mouse.
19. **Direct Report Download Flow:** Generating report PDFs must trigger a download directly, avoiding empty popups or separate download menus.
20. **No Manual SQL Operations:** The administration dashboard must handle all database operations using intuitive GUI forms, removing the need for raw SQL edits.

---

## 3. User Personas

```
+-----------------------------------------------------------------------------------+
|                                  USER PERSONAS                                    |
+-----------------------------------------------------------------------------------+
|  1. Student Persona: Ananya Hegde (MITE Computer Science, 3rd Year)              |
|  2. Faculty Persona: Prof. Shridhar Bhat (Assistant Professor, ISE Dept)           |
|  3. Administrator Persona: Rajesh Kumar (Lab System Administrator, IT Division)   |
+-----------------------------------------------------------------------------------+
```

### 3.1 Student Persona: Ananya Hegde
*   **Background:** 3rd-year Computer Science student at MITE.
*   **Responsibilities:** Complete 12 assigned lab programs, write observation logs, and pass practical exams.
*   **Technical Skill Level:** Intermediate (comfortable with Python, C++, and basic web systems).
*   **Daily Workflow:** Logs in at the lab terminal, reads the assignment prompt, writes code, runs tests, documents observations, and requests faculty sign-off.
*   **Pain Points:** Anxious during timed evaluations; concerned about losing code to network drops or terminal crashes; dislikes the manual process of rewriting observation details.
*   **Expectations:** The code editor should save drafts automatically, compilation feedback should be instant, and the dashboard should show clear task completion statuses.

### 3.2 Faculty Persona: Prof. Shridhar Bhat
*   **Background:** Assistant Professor in the Information Science & Engineering Department.
*   **Responsibilities:** Manages 4 lab sections (approx. 240 students), reviews submissions, grades programs, and signs records.
*   **Technical Skill Level:** Advanced (proficient in compiler configurations, systems coding, and databases).
*   **Daily Workflow:** Selects the section dashboard, monitors student coding progress, evaluates observations, enters marks, signs records, and exports bulk PDFs.
*   **Pain Points:** Heavy grading workload; finding plagiarism in large classes; managing paper records and physical signature lines that disrupt lab teaching time.
*   **Expectations:** A consolidated dashboard showing grading status, easy-to-use proctoring controls, and simple signature stamping to automate sign-offs.

### 3.3 Administrator Persona: Rajesh Kumar
*   **Background:** Laboratory System Administrator at MITE.
*   **Responsibilities:** Manages lab configurations, configures system environments, and sets up student and faculty accounts.
*   **Technical Skill Level:** Expert (experienced with server setup, databases, and network routing).
*   **Daily Workflow:** Uploads student registration lists, maps subjects to faculty, updates lab schedules, and reviews compile error logs.
*   **Pain Points:** Handling frequent student profile modifications, resolving duplicate session conflicts, and managing database updates for course roster changes.
*   **Expectations:** An interface that makes managing users and course assignments simple, with access to system transaction logs.

---

## 4. User Goals

```
STUDENT GOALS
- Primary: Write code, view compilation results, save observation logs, submit tasks.
- Secondary: Track lab progress metrics, review faculty grades and comments.
- Occasional: Download signed laboratory record PDFs, review past submissions.

FACULTY GOALS
- Primary: Monitor class session heartbeats, grade student code and observations.
- Secondary: Toggle proctoring controls, lock/unlock student logins.
- Occasional: Manage syllabus tasks, upload signature templates, export bulk PDF records.

ADMINISTRATOR GOALS
- Primary: Provision student and faculty accounts, map faculty to subjects.
- Secondary: Configure cycles, departments, and course metadata.
- Occasional: Review raw system logs, audit grading reports.
```

---

## 5. User Journey Mapping

### 5.1 Student Journey
```
[Login Screen] --> [Subject Dashboard] --> [Resizable Editor] --> [Observations View] --> [PDF Record Download]
      ^                     ^                     ^                     ^                      ^
  Credentials           Select Lab         Compile / Test        Write Analysis         Grade Stamped
```

| Phase | User Action | Alternate Flow / Exceptional Scenario |
| :--- | :--- | :--- |
| **1. Session Entry** | Student enters USN/password, verifies session lock, and enters workspace. | *Session Conflict:* System detects an active session and shows a conflict message. Student clicks "Release Previous Session" to resolve. |
| **2. Task Selection** | Student views the subject list and selects the active experiment task. | *Locked Task:* The student views task details in read-only mode if the deadline has passed. |
| **3. Coding Cycle** | Student writes code, runs test compilations, and views error logs. | *Network Interruption:* A top banner alerts the student that the system is offline, saving drafts locally until the connection is restored. |
| **4. Integrity Lock** | If proctoring is enabled, the student enters fullscreen to unlock the editor. | *Tab Exit:* The editor locks and flags the violation. The student must click "Re-enter Fullscreen" to resume. |
| **5. Observation Log** | Student writes observations, runs test outputs, and clicks submit. | *Premature Submission:* System prompts "Are you sure? This will lock editing" to prevent early locks. |
| **6. Grade Review** | Student views comments and numerical marks on their dashboard. | *Requires Revision:* The editor unlocks for correction if faculty flags the task. |

---

### 5.2 Faculty Journey
```
[Subject Portal] --> [Class Seating Grid] --> [Split Evaluation Page] --> [Grades Panel] --> [Bulk Stamping]
      ^                     ^                       ^                       ^                  ^
  Role Verify           Select Section           Code & Output           Mark & Observation   PDF compilation
```

| Phase | User Action | Alternate Flow / Exceptional Scenario |
| :--- | :--- | :--- |
| **1. Session Entry** | Faculty signs in and selects their subject and class section. | *No Assigned Subjects:* The system displays a landing page with admin contact details. |
| **2. Proctoring Setup** | Faculty toggles fullscreen and paste lock settings. | *Exam Lockdown:* Toggling Exam Mode automatically hides non-exam tasks for students. |
| **3. Progress Tracking** | Faculty monitors active compiling status and USNs. | *Student Inactive:* A gray dot identifies students who have not sent a heartbeat for over 40 seconds. |
| **4. Rapid Evaluation** | Faculty selects a student, reviews code and observations on a split screen. | *Incorrect Solution:* Faculty clicks "Send Back for Revision," which unlocks the student's editor. |
| **5. Signature Stamp** | Faculty saves their PNG signature locally in the browser. | *No Signature:* Stamping uses a default digital signature placeholder. |
| **6. Records Signing** | Faculty generates a bulk signed PDF containing the class records. | *Memory Limit:* The system compiles PDFs in chunks to prevent browser memory issues. |

---

### 5.3 Administrator Journey
```
[Main Portal] --> [User Profiles] --> [Section Mapping] --> [Syllabus Settings] --> [Log View Console]
```

| Phase | User Action | Alternate Flow / Exceptional Scenario |
| :--- | :--- | :--- |
| **1. Authentication** | Admin signs in and accesses the Admin Dashboard. | *Security Lock:* System blocks access after 5 failed login attempts. |
| **2. Roster Upload** | Admin uploads student records or creates individual accounts. | *Duplicate User:* System flags duplicate USNs and prompts the admin to merge or overwrite. |
| **3. Course Mapping** | Admin maps faculty members to subjects, sections, and cycle divisions. | *Mapping Conflicts:* System flags warning indicators if a section is mapped to multiple faculty. |
| **4. Log Audits** | Admin reviews log reports to track grading activity. | *Log Overflow:* Filter system allows sorting logs by date, USN, and subject. |

---

## 6. Task Analysis

### 6.1 Task 1: Student Submits Program
*   **User Goal:** Submit code and observation logs for grading and lock the workspace.
*   **Step-by-Step Flow:**
    1.  Student compiles and runs the final code draft.
    2.  Student navigates to the Observation tab and writes their analysis.
    3.  Student clicks the primary "Submit Observation" button.
    4.  System checks formatting, verifies console output logs, and shows a confirmation modal.
    5.  Student confirms the submission.
*   **Decision Points:**
    *   *Is the code compiled?* If compile history is empty, show a warning: "Run compilation test once before submitting."
    *   *Are observations complete?* If the observation input is empty, show: "Observation description is required."
*   **Possible Errors:**
    *   *Network drop during submission:* Save state locally and retry in the background.
*   **UX Improvements:** Include an auto-fill helper that copies terminal run output directly into the student's observation draft to save time.

---

### 6.2 Task 2: Faculty Grades Submission
*   **User Goal:** Review student code, run outputs, input marks, add feedback, and stamp the record.
*   **Step-by-Step Flow:**
    1.  Faculty selects a student from the class seating grid.
    2.  Faculty selects a program node marked *Pending Evaluation*.
    3.  Review the student's code, output, and observations side-by-side.
    4.  Input a score (0–10) and write qualitative comments.
    5.  Click "Save Grade and Sign off."
*   **Decision Points:**
    *   *Is the score within bounds (0–10)?* Block inputs outside this range and show a warning.
    *   *Is a revision required?* Provide a "Return for Revision" button to send the task back.
*   **Possible Errors:**
    *   *Workstation left open:* Implement a grading timeout that requires re-authentication before saving.
*   **UX Improvements:** Use quick keyboard shortcuts (e.g., `Alt + S` to save and open the next student's submission) to speed up grading.

---

### 6.3 Task 3: Admin Creates a Course Subject
*   **User Goal:** Set up a new course subject, assign language runtimes, and establish section mappings.
*   **Step-by-Step Flow:**
    1.  Admin navigates to the Course Management tab.
    2.  Click the "Add Subject" button.
    3.  Enter the Subject Code, Name, Year, Cycle, and runtime language.
    4.  Assign mapped sections.
    5.  Click "Save Course."
*   **Decision Points:**
    *   *Is the subject code a duplicate?* Check database and flag matching entries.
*   **Possible Errors:**
    *   *Invalid configuration:* Highlight missing required fields in red.
*   **UX Improvements:** Allow administrators to clone subjects from previous semesters to simplify course setup.

---

## 7. Information Architecture

```
Student Menu Tree:
Dashboard (student-home.html)
  ├── Subjects (Active Course Cards)
  │     └── Workspace Editor (index.html)
  │           ├── Problem Tab (Instructions, sample IO)
  │           ├── Editor Tab (Syntax highlighting compiler)
  │           └── Observations Tab (Rich comments logging)
  ├── History (Submissions log, revisions, marks, feedback)
  └── Profile (Student USN details, cycles, network stats)

Faculty Menu Tree:
Faculty Portal (faculty-home.html)
  ├── Subject Dashboard (dashboard.html)
  │     ├── Student Grid (Session statuses, compilation flags)
  │     │     └── Split Evaluator View (Code | Observations | Grading Panel)
  │     ├── Syllabus Management (Syllabus task list creator)
  │     └── Raw Logs (Section runtime log lists)
  └── Signature settings (PNG upload, local Base64 configs)

Administrator Menu Tree:
Admin Portal (admin.html)
  ├── User Roster (Student lists, Faculty lists, Admin accounts)
  ├── Academic Divisions (Departments, Cycles, Sections)
  ├── Subjects & Assignments (Subjects, Faculty mapping, Section mapping)
  └── Compliance Logs (System transactions log details)
```

### 7.1 Component Rationale
*   **Workspace Tabs (Student):** Grouping Problem, Editor, and Observations into tabs keeps the workspace simple and makes the best use of screen space.
*   **Live Seating Grid (Faculty):** Displays student statuses in a grid layout that mirrors the physical lab room, helping faculty monitor progress.
*   **Split Evaluator View (Faculty):** Placing student code, run logs, observations, and grade input controls on one screen minimizes navigation steps during grading.
*   **Group Mapping Controls (Admin):** Keeps configuration simple by separating user rosters, academic divisions, and subject assignments.

---

## 8. Navigation Strategy

*   **Primary Navigation:** Uses top navigation bars containing user profiles, status badges, configuration tools, and sign-out links.
*   **Secondary Navigation:** Implements sidebars to display lists of laboratory subjects or class rosters without cluttering the screen.
*   **Breadcrumbs:** Displays clear breadcrumb paths (e.g., `Subjects > IS Lab > Section A > USN: 1MT23CS001`) in the top navigation bar.
*   **Tabs:** Workspace editors use simple tabs (e.g., *Editor*, *Problem Description*, *Observations*) to make switching views straightforward.
*   **Quick Actions:** Key controls, like grading saves, PDF downloads, and proctoring switches, use prominent, consistent buttons.
*   **Search and Filters:** Faculty and admin dashboards include search boxes to filter student lists by name or USN.
*   **Keyboard Navigation:** Students can use standard keyboard shortcuts (`Tab`, `Shift + Tab`) to move focus logically through editor views.
*   **Context Menus:** Right-click context menus are disabled inside the student editor to discourage plagiarism and external code pasting.
*   **Back Navigation:** Provides visible back actions (e.g., `← Subjects`) to allow users to exit dashboards safely.

---

## 9. Screen Inventory

| Module | Screen ID | Screen Name | Purpose | Primary User | Entry Point | Exit Point |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth** | **SCR-001** | Login Page | Authenticates users and redirects them based on roles. | All | Browser URL | Dashboard |
| **Student**| **SCR-002** | Student Home | Shows student profiles and active subject directories. | Student | Login Page | Editor |
| **Student**| **SCR-003** | Sandbox Workspace | Resizable coding workspace with compilation tools. | Student | Student Home | Student Home |
| **Faculty**| **SCR-004** | Faculty Home | Displays mapped subjects and sections. | Faculty | Login Page | Class Dashboard|
| **Faculty**| **SCR-005** | Class Dashboard | Live session dashboard showing student grids. | Faculty | Faculty Home | Faculty Home |
| **Faculty**| **SCR-006** | Grading Pane | Split-screen grading view showing student work and grading tools. | Faculty | Class Dashboard| Class Dashboard|
| **Admin**  | **SCR-007** | Admin Panel | Admin portal with system status metrics. | Admin | Login Page | Login Page |

---

## 10. Workflow Architecture

```
Student Workflow:
[Login Screen] -> [Student Home] -> [Select Subject] -> [Select Program] -> [Fullscreen Editor] -> [Run Compiles] -> [Observations tab] -> [Save Submission] -> [Graded Review] -> [PDF Record Download] -> [Logout]

Faculty Workflow:
[Login Screen] -> [Faculty Home] -> [Select Subject/Section] -> [Control Panel Dashboard] -> [Toggle Locks] -> [Monitor Student Seating Grid] -> [Select Graded Student] -> [Open Split grading View] -> [Enter Grade & Remarks] -> [Save & Sign off] -> [Export bulk PDF] -> [Lock Section Logins] -> [Logout]

Administrator Workflow:
[Login Screen] -> [Admin Dashboard] -> [Select Management View (Users/Courses)] -> [Upload Roster/Assign Mappings] -> [Verify Log Transactions] -> [Logout]
```

---

## 11. Decision Flows

### 11.1 Compile Flow (Student View)
```
          [Run Code Clicked]
                  |
                  v
         [Compile Success?]
           /            \
        (Yes)           (No)
        /                  \
   [Show Stdout]        [Highlight Error Lines]
   [Update History]     [Show Compiler Stderr]
```
*   **Success UX:** Console updates with output in green. The progress log records the compilation time.
*   **Failure UX:** Console displays compile errors in red. The editor highlights the error lines to help the student debug.

### 11.2 Double-Login Flow
```
               [Login Request]
                      |
                      v
             [Session Active?]
               /            \
            (No)            (Yes)
            /                  \
     [Create Session]    [Is Heartbeat Live?]
     [Open Dashboard]      /              \
                        (No)              (Yes)
                        /                    \
              [Delete Old Session]      [Block Login]
              [Create New Session]      [Show Session Conflict Dialog]
```
*   **Lockout UX:** The login screen displays a message explaining the session conflict, showing the active IP address, browser type, and elapsed session time, and offering a button to release the session if it was left open by mistake.

---

## 12. Usability Goals

To ensure the system is easy to use, LabCode targets the following usability metrics:

*   **Student Workspace Entry Time:** Students must be able to log in, select their active subject, and open the code editor in under 15 seconds.
*   **Syllabus Task Discovery:** Students must be able to locate their assigned laboratory experiment within 10 seconds of entering the workspace.
*   **Click Budget Constraint:** No primary task (e.g., viewing submissions, toggling safety locks, exporting records) should require more than 3 clicks from the dashboard.
*   **Grading Efficiency:** Faculty must be able to select a student, review their code and observations, assign a grade, write comments, and stamp the document in under 30 seconds.
*   **System Status Visibility:** Status and connection indicators must be visible at all times, updating heartbeats and compiler connectivity flags every 15 seconds.
*   **Autosave Confirmation:** A visual indicator must show the status of autosaves (e.g., *Draft Saved* or *Syncing*) in the editor header within 1 second of any document edit.

---

## 13. Accessibility Goals

The platform design must support the following accessibility standards:

*   **Keyboard Navigation:** Interactive elements (buttons, inputs, language selectors) must support keyboard navigation using standard focus indicators.
*   **Typography Contrast:** Interface text must meet a minimum contrast ratio of 4.5:1 (or 3:1 for large headings) to ensure readability under various lighting conditions.
*   **Color Independence:** Important states (e.g., compile success, errors, graded tasks) must not rely on color alone; they must use text labels or icons (e.g., `[✓ Passed]`, `[✗ Compile Error]`).
*   **Visible Focus States:** Focused components must display a clear outline border to help keyboard-only users navigate.
*   **Clear Error Explanations:** Input forms and compiler errors must use simple, clear language to help users fix issues.
*   **Clickable Target Sizes:** Interactive buttons and links must have a minimum target size of 44x44 pixels to prevent misclicks on touchscreens or lab terminals.

---

## 14. Future UX Considerations

While Version 1.0 is designed for a single-college setup, the user experience strategy is structured to support future expansion:

*   **Multi-Tenant Settings:** The navigation hierarchy separates user profiles from academic mapping lists. This structure makes it easy to integrate college and department selector tools in future versions.
*   **Syllabus Task Expansion:** Task creation interfaces are modular. This design allows the platform to support other lab subjects (e.g., electronics, networks) by adding subject-specific templates.
*   **AI Assessment Integrations:** The grading interface includes placeholder panels for auto-grading logs, logic reviews, and similarity flags, keeping the layout clean for future updates.
*   **Mobile Analytics Companion:** The system tracks clean data streams for progress tracking and log exports, which can easily feed a mobile dashboard app in the future.
