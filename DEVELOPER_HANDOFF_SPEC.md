# LabCode — Developer Handoff Specification (Phase 2.5)
## Frontend Implementation Blueprint & UI Component Specifications

---

## 1. Application Overview

### 1.1 Purpose & Vision
LabCode is a desktop-first laboratory management and execution system designed for engineering college laboratory environments. It digitizes the entire student laboratory workflow—compiling code, logging observations, running proctored exams, and generating graded PDFs—without requiring local compiler configurations on lab terminals.

### 1.2 Target Users & Scope
*   **Target Users:** Students, Faculty, and Administrators at Mangalore Institute of Technology & Engineering (MITE).
*   **Scope:** Single-institution desktop-first application. Excludes multi-tenancy, self-registration, and cloud multi-tenancy configurations.

---

## 2. Application Structure & Navigation Trees

```
Student Menu Navigation:
[Login Panel]
  └── [Student Home Dashboard]
        ├── [Course Subject Workspace]
        │     └── [Problem Task Editor]
        │           ├── [Instructions Panel]
        │           ├── [Code Sandbox Panel]
        │           └── [Observations Form Panel]
        └── [Student Submission Archive]

Faculty Menu Navigation:
[Login Panel]
  └── [Faculty Subject Index Portal]
        ├── [Class Seating Grid Monitor]
        │     └── [Split Evaluation & Marking Panel]
        ├── [Syllabus Experiment Creator]
        └── [Institutional PDF Report Generation Portal]

Administrator Menu Navigation:
[Login Panel]
  └── [Admin Configuration Console]
        ├── [User Account Directory (CSV imports)]
        ├── [Course & Mapping Registry Panel]
        └── [System Compliance Log Viewer]
```

---

## 3. Complete Screen Catalogue

| Screen ID | Screen Name | Purpose | User Role | Entry Point | Exit Point | Dependencies |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SCR-001** | Login Interface | Authenticates user credentials and checks session locks. | All | App Launch | Dashboard | None |
| **SCR-002** | Student Home | Lists subjects, task counts, and exam modes. | Student | SCR-001 | SCR-003, Logout| SCR-001 |
| **SCR-003** | Sandbox Workspace | Split-pane editor, console output, and observation form. | Student | SCR-002 | SCR-002, Logout| SCR-002 |
| **SCR-004** | Faculty Portal | Displays assigned courses, sections, and signatures. | Faculty | SCR-001 | SCR-005, Logout| SCR-001 |
| **SCR-005** | Class Seating Monitor | Live grid tracking student compile activity. | Faculty | SCR-004 | SCR-006, SCR-004| SCR-004 |
| **SCR-006** | Grading Split Pane | Side-by-side view for code review and grading. | Faculty | SCR-005 | SCR-005 | SCR-005 |
| **SCR-007** | Admin Panel | Portal to configure users, cycles, maps, and logs. | Admin | SCR-001 | SCR-001 | None |

---

## 4. Screen Specifications

### 4.1 SCR-003: Student Sandbox Workspace
*   **Purpose:** The coding and observation environment for students.
*   **Layout:** Two-column split layout with a resizable divider. The left column contains instructions and observations; the right column hosts the editor and the output console.
*   **Components:** Code editor, language selector dropdown, status footer, observations textarea, run compile button, and submission controls.
*   **Validation:** Code compilation history checks, required input validation, and character limits on observation logs.
*   **Accessibility:** ARIA labels for sandbox run controls, keyboard tab indices, and visible focus indicator rings.

### 4.2 SCR-005: Faculty Live Class Monitor
*   **Purpose:** Real-time tracking of student compiler activity and connection statuses during lab sessions.
*   **Layout:** Upper grid grid showing student seating cards, with a top toolbar for filtering and security settings.
*   **Components:** Search filters, batch action tools, and real-time status indicators.
*   **Validation:** Sorting parameters and batch selection validation.
*   **Accessibility:** Accessible data listings, clear visual indicators, and keyboard-selectable grids.

---

## 5. Component Mapping Matrix

| Screen Component | SCR-001 | SCR-002 | SCR-003 | SCR-004 | SCR-005 | SCR-006 | SCR-007 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Primary/Danger Buttons** | Yes | No | Yes | Yes | Yes | Yes | Yes |
| **Forms / Input Fields** | Yes | No | Yes | No | No | Yes | Yes |
| **Dashboard Grid Cards** | No | Yes | No | Yes | No | No | Yes |
| **Data Tables** | No | No | No | No | Yes | No | Yes |
| **Breadcrumbs Navigation** | No | Yes | Yes | Yes | Yes | Yes | Yes |
| **Coding Editor Tab** | No | No | Yes | No | No | Yes | No |
| **Compile Output Console**| No | No | Yes | No | No | Yes | No |
| **Toast Notifications** | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| **Heartbeat Indicators**| No | Yes | Yes | No | Yes | Yes | No |

---

## 6. Navigation Rules

*   **Primary Sidebar Menu:** Lists navigation options (e.g., Subjects, History, Configuration). Active selections must display a left vertical marker using MITE orange colors.
*   **Tabs:** Horizontal text headers. Selected tabs show an underline highlight matching the primary accent color.
*   **Back Action Controls:** Reversible paths must use simple, recognizable actions (e.g., `← Subjects`) to allow users to exit dashboards safely.
*   **Keyboard Focus Loops:** Pressing Tab moves focus sequentially through page components. The focus ring must wrap logically from the last field back to the first.

---

## 7. Interaction Flow Specifications

### 7.1 Code Execution Flow (SCR-003)
*   **Trigger:** Click on "Run Sandbox" button or press `Ctrl + Enter`.
*   **System Action:** Save active editor draft, compile and run verification tests on compiler APIs, and output console results.
*   **Visual Feedback:** The Run button shows a loading spinner, and the console displays *Compiling Sandbox...*
*   **Success Behavior:** Outputs execution results in green text, showing stdout, resource usage metrics, and progress logs.
*   **Failure Behavior:** Displays compiler errors in red text and highlights syntax error lines in the editor view.
*   **Recovery Behavior:** Student revises code draft in the editor window and clicks compile again.

### 7.2 Double-Login Session Verification
*   **Trigger:** User signs in.
*   **System Action:** Query active session records for matching User ID USN.
*   **User Feedback:** Displays loading spinner during credential verification checks.
*   **Success Behavior:** Initializes user session token and redirects to dashboard.
*   **Failure Behavior:** Displays an error message explaining that the account is active on another device, with a button to release the previous session.
*   **Recovery Behavior:** Click "Release Previous Session" to delete the old session token and log in.

---

## 8. Frontend State Management

```
+---------------+           +---------------+           +---------------+
|     Idle      | --------> |   Compiling   | --------> |    Success    |
| (Ready state) |           |  (Lock Run)   |           | (Show Output) |
+---------------+           +---------------+           +---------------+
        ^                           |                           |
        |                           v                           v
        |                   +---------------+           +---------------+
        +------------------ | Compiler Fail | <-------- |  Save Draft   |
                            | (Show Errors) |           | (Sync Status) |
                            +---------------+           +---------------+
```

*   **Saving State:** Triggers immediately on input changes. The status bar displays a *Syncing...* indicator and locks secondary workspace actions until completion.
*   **Compiling State:** The Run button changes to a loading spinner, and the console displays *Compiling sandbox...*
*   **Connection State:** The footer bar displays a *Live* or *Offline* connection badge based on heartbeat status.

---

## 9. Permission Matrix

| Feature Module | Student Role | Faculty Role | Administrator Role |
| :--- | :---: | :---: | :---: |
| **Manage Roster Users** | Restricted | Restricted | Full Control (C/R/U/D) |
| **Map Subject Classes** | Restricted | Restricted | Full Control (C/R/U/D) |
| **Syllabus Task Management** | Read Only | Full Control (C/R/U/D) | Read Only |
| **Toggle Security Controls** | Restricted | Full Control (U/D) | Read Only |
| **Grade Submissions** | Restricted | Full Control (U/D) | Read Only |
| **Digital Signature setup** | Restricted | Full Control (C/U) | Restricted |
| **PDF Compilation Export** | Single PDF Download | Bulk PDF Compilation | Read Only |

---

## 10. Form Validation Rules

*   **Login Form:**
    *   USN Input: Required, uppercase alphanumeric (regex verification: `^[0-9]MT[0-9]{2}[A-Z]{2}[0-9]{3}$`).
    *   Password Input: Required, minimum 8 characters.
*   **Task Creation Form:**
    *   Program ID: Required, lowercase alphanumeric with underscores (e.g., `prog_1`).
    *   Program Title: Required, minimum 6 characters.
    *   Language Selection: Required, option from dropdown menu.
*   **Evaluation Form:**
    *   Grade Score: Required, numeric range 0 to 10.
    *   Remarks Text: Optional, minimum 3 characters.

---

## 11. Error Specification Table

| Error Code | Error Category | Trigger Event | System Action | Recovery Behavior |
| :--- | :--- | :--- | :--- | :--- |
| **ERR-101** | Compile Sandbox Down | The sandbox compilation API is unreachable. | Displays compiler offline warning banner. | Displays message: *"Sandbox execution server offline. Retrying..."* |
| **ERR-202** | Save Conflict | DB unreachable during manual save. | Saves active code draft to browser storage. | Triggers a background sync once server connection is restored. |
| **ERR-303** | Expired Session | Heartbeat indicates session has timed out. | Logs user out and clears session locks. | Redirects user to the login screen and shows a timeout warning. |
| **ERR-404** | Authentication Block | Student account has been locked by faculty. | Denies login requests for locked accounts. | Displays lockout notice with countdown timer. |

---

## 12. Notification Specification

*   **Autosave Toast:**
    *   *Trigger:* Autosave completes successfully.
    *   *Priority:* Low.
    *   *Message Type:* Success info toast.
    *   *Action:* Auto-dismiss after 3 seconds.
*   **Proctoring Alert Banner:**
    *   *Trigger:* Fullscreen view is exited or focus is lost.
    *   *Priority:* Critical.
    *   *Message Type:* Error overlay modal.
    *   *Action:* Persists until fullscreen mode is re-entered.

---

## 13. Accessibility Verification Checklist

*   **Keyboard Navigation Support:** All buttons, input fields, and tab selections must allow navigation using standard focus selectors.
*   **Visible Focus States:** Focus indicators must display a high-visibility border ring around interactive elements.
*   **Screen Reader Metadata:** Interactive controls must use descriptive labels (e.g., `aria-label`) to support screen readers.
*   **Accessible Table Layouts:** Data tables must use clear column headers linked to cell content to ensure layout structure readability.

---

## 14. Performance Expectations

*   **Screen Load Time:** Dashboard dashboards must load and be interactive within 2 seconds.
*   **Workspace Load Speed:** The programming editor view must load and be ready for input within 3 seconds.
*   **Compiler Latency:** Code compilation runs and sandbox returns must complete in under 5 seconds under standard network loads.
*   **Autosave Confirmation:** Visual indicators must show the status of autosaves in the editor header within 1 second of document edits.

---

## 15. Responsive Viewport Behavior

*   **1920×1080 (Primary Desktop):** Columns display at full width. Workspace panes split evenly at 50% left and 50% right.
*   **1600×900 & 1366×768 (Lab Terminals):** Navigation menus scale down, reducing padding parameters. Textareas resize layout grids internally.
*   **1280×720 (Minimum Resolution Limit):** Sidebars fold to icon-only displays, and horizontal scrolling is disabled to keep page content readable.

---

## 16. Frontend Developer Guidelines

1.  **Never Duplicate Component Files:** Build UI layouts using shared, reusable component designs.
2.  **Follow Design Tokens:** Define visual assets (margins, border radii, borders, color tokens) using designated Design System tokens.
3.  **No Hardcoded Text Labels:** Group all text displays in a translation file to simplify label updates.
4.  **Enforce Loading Indicators:** Every async API call must display a loading spinner within 200 milliseconds of the trigger.
5.  **Enforce Form Validation:** Form elements must run validation checks before allowing data to be submitted to database endpoints.
6.  **Destructive Actions Warning:** Critical operations (e.g., delete task, lock user session, logout) must show confirm warning popups.

---

## 17. QA Validation Checklist

### 17.1 SCR-003 Validation Checklist
*   **Functional:**
    *   Verify the compiler console displays execution results.
    *   Confirm code drafts are saved to local storage when compiling runs.
*   **Visual:**
    *   Check split-pane resizing borders.
    *   Confirm the editor theme matches user preference settings.
*   **Accessibility:**
    *   Verify focus rings appear around active input fields.
    *   Check screen reader announcements for error status chips.

---

## 18. Implementation Roadmap

```
[Phase 1: Login & Session Setup]
       |
       v
[Phase 2: Student Editor & Workspace]
       |
       v
[Phase 3: Faculty Dashboard & Live Grid]
       |
       v
[Phase 4: Admin Portal & User Management]
       |
       v
[Phase 5: PDF Compilation & Reports]
```

*   **Phase 1 (Authentication):** Implement login views, heartbeat checks, and single-session locks.
*   **Phase 2 (Student Portal):** Build the student dashboard, programming editor, and compile console.
*   **Phase 3 (Faculty Portal):** Implement live seating grids, grading forms, and signature upload modals.
*   **Phase 4 (Admin Portal):** Develop department and section configuration consoles.
*   **Phase 5 (PDF Reports):** Integrate backend single/bulk PDF generation pipelines.

---

## 19. Known Implementation Risks & Mitigation

*   **Editor Panel Shift Lag:** Rendering complex code highlighters in a browser textarea can cause input lag.
    *   *Mitigation:* Keep the overlay pre-element light and run token updates in a separate thread.
*   **Offline Data Loss:** If connection drops during a session, student edits could be lost.
    *   *Mitigation:* Cache active code drafts in local browser storage, and sync them back to the database once connection is restored.
*   **Bulk PDF Compilation Memory limits:** Generating multi-student signed record PDFs can cause server timeouts.
    *   *Mitigation:* Compile records in batches of 10 student cards, then merge the generated files to prevent memory issues.

---

## 20. Frontend Readiness Review

*   **Verified Database Keys:** Confirm that user logins and mapped session tokens align with database schema constraints.
*   **Proctoring Control Checks:** Ensure browser focus tracking coordinates match standard fullscreen API specifications.
*   **Local Signature Storage:** Ensure signature Base64 caches match local storage limits.
