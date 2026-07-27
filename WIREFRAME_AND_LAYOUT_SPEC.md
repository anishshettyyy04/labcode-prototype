# LabCode — Wireframe & Layout Specification (Phase 2.2)
## Low-Fidelity Layout Blueprints — MITE Institutional Deployment

---

## 1. Application Layout (Common Shell)

The overall application shell uses a multi-pane desktop-first layout designed to maximize workspace efficiency and maintain structural consistency across all roles.

```
+-----------------------------------------------------------------------------+
| [LOGO] LabCode | MITE Lab Portal           [User Badge] [Theme] [Sign Out]  | (Header)
+-------------------+---------------------------------------------------------+
|                   |                                                         |
|                   |                                                         |
|                   |                                                         |
|  [Sidebar Menu]   |                  [Main Content Area]                    |
|                   |                                                         |
|                   |                                                         |
|                   |                                                         |
|                   |                                                         |
+-------------------+---------------------------------------------------------+
|  Status: [Online] | Log: [Idle]             Session: 02:45 | V1.0.0 (MITE)  | (Footer)
+-----------------------------------------------------------------------------+
```

### 1.1 Shell Subsystems
*   **Header (52px fixed height):** Displays institutional branding, application identity, user status tags, light/dark theme selectors, and the sign-out button.
*   **Sidebar (210px width, expandable to 260px):** Handles main navigation options, grouping courses or configuration sections.
*   **Main Content Area (Fluid width, scrollable):** Displays active dashboards, editors, tables, or setup screens.
*   **Footer (32px fixed height):** Shows network status logs, compile indicators, timers, and release metadata.

---

## 2. Authentication Screens

All authentication screens use a centered, single-column container structure to focus user attention on inputs and security alerts.

```
+-------------------------------------------------------+
|                                                       |
|                     [MITE LOGO]                       |
|                       LabCode                         |
|                                                       |
|                 +------------------+                  |
|                 |    Sign In       |                  |
|                 |                  |                  |
|                 | USN / User ID    |                  |
|                 | [______________] |                  |
|                 |                  |                  |
|                 | Password         |                  |
|                 | [______________] |                  |
|                 |                  |                  |
|                 | [Submit Button]  |                  |
|                 |                  |                  |
|                 | [Forgot Link]    |                  |
|                 +------------------+                  |
|                                                       |
+-------------------------------------------------------+
```

### 2.1 Authentication Layout Specifications
1.  **Login Screen:** Centered panel. Displays USN/UserID input, password input, a sign-in button, and password reset links. Features error banners for invalid credentials or lockout states.
2.  **Forgot Password Screen:** Centered panel. Includes an input field for the registered USN or user ID, a reset request button, and a link to return to the sign-in page.
3.  **Reset Password Screen:** Centered panel (accessed via link). Displays fields for the new password and confirmation, password policy requirements, and a save button.
4.  **Session Expired Screen:** Modal window overlay. Displays an idle warning message, details of the expired session, and a button to return to the login page.
5.  **Unauthorized Access Screen:** Centered error panel. Shows a warning icon, a message explaining the access issue, and a button to return to the user's dashboard.

---

## 3. Student Dashboard

The student home dashboard presents a clear overview of profile details, enrolled subjects, and progress metrics.

```
+-----------------------------------------------------------------------------+
| Welcome, Ananya Hegde [USN: 1MT23CS001] | Dept: CSE | Year 3, Section A     | (Profile Card)
+-----------------------------------------------------------------------------+
|                                                                             |
|  [Active Subject Enrolments]                [Institutional Announcements]   |
|  +-------------------------------------+    +----------------------------+  |
|  | CS301 — Data Structures             |    | • Exam schedule uploaded   |  |
|  | Progress: [========------] 60%      |    | • System update at 6 PM    |  |
|  | [Open Lab Workspace ->]             |    |                            |  |
|  +-------------------------------------+    +----------------------------+  |
|  +-------------------------------------+                                    |
|  | CS302 — Java Programming            |    [Syllabus Progress Stats]      |
|  | Progress: [====----------] 30%      |    Programs: 6 / 12 completed   |
|  | [Open Lab Workspace ->]             |    Average evaluation: 8.5/10   |
|  +-------------------------------------+                                    |
|                                                                             |
+-----------------------------------------------------------------------------+
```

### 3.1 Layout Priorities
*   **Subject Cards (Left Column, 65% width):** Displays active courses, language indicators, progress bars, and workspace entry links. Highlight ongoing exam modes with red borders.
*   **Stats & Messages (Right Column, 35% width):** Displays announcements, syllabus progress statistics, and system notifications.

---

## 4. Subject Workspace

This view lists the lab exercises and requirements for a selected subject.

```
+-----------------------------------------------------------------------------+
| ← Back to Subjects | CS301 — Data Structures Laboratory                     |
+------------------------------------+----------------------------------------+
|                                    |                                        |
|  [Syllabus Laboratory Tasks]       |  [Selected Task Instructions]          |
|  +------------------------------+  |  Program ID: prog_1                     |
|  | prog_1: Stack Operations     |  |  Title: Stack implementation using array|
|  | Status: [✓ Evaluated - 9/10] |  |                                        |
|  +------------------------------+  |  Description:                          |
|  | prog_2: Queue Operations     |  |  Write a program to simulate a FIFO    |
|  | Status: [! Pending review]   |  |  queue using fixed arrays...           |
|  +------------------------------+  |                                        |
|  | prog_3: Singly Linked List   |  |  Sample Input: [10, 20, 30]            |
|  | Status: [Draft in progress]  |  |  Expected Output: [10, 20, 30]         |
|  +------------------------------+  |                                        |
|                                    |  [Open Workspace Editor Button]        |
|                                    |                                        |
+------------------------------------+----------------------------------------+
```

### 4.1 Interface Specifications
*   **Task Directory (Left Panel, 35% width):** Lists lab programs with tags indicating their status (e.g., *Draft*, *Pending Review*, *Graded*, *Revision Required*).
*   **Specification Details (Right Panel, 65% width):** Displays program details, input/output samples, task instructions, and the button to open the editor.

---

## 5. Programming Workspace

This screen is the core interface for writing, compiling, and submitting lab code.

```
+-----------------------------------------------------------------------------+
| ← Subject List | CS301 — Stack Operations (Python)     Autosave: [Saved]    | (Header)
+-------------------------------------+---------------------------------------+
|  [Split View: Left Panel]           |  [Split View: Right Panel]            |
|  +-------------------------------+  |  +---------------------------------+  |
|  | [Problem Tab] [Reference Tab] |  |  | [Code Editor Tab]  [Options]    |  |
|  |                               |  |  | 1 | def stack_push(arr, item):  |  |
|  | Implement a Stack using dynamic | |  | 2 |     arr.append(item)        |  |
|  | arrays with options for:      |  |  | 3 |                             |  |
|  | 1. Push                       |  |  | 4 |                             |  |
|  | 2. Pop                        |  |  | 5 |                             |  |
|  | 3. Exit                       |  |  | 6 |                             |  |
|  +-------------------------------+  |  +---------------------------------+  |
|                                     |  | [Console Output / Sandbox Terminal] |  |
|                                     |  | Stdin: [ 10, 2 ]                    |  |
|                                     |  | Console stdout:                     |  |
|                                     |  | >> Stack items: 10, 2               |  |
|                                     |  | [Run Sandbox]   [Submit Solution]   |  |
+-------------------------------------+---------------------------------------+
|  Proctoring Mode: [Enabled]         |  Caret: L1:C12   | Connection: Live   | (Footer)
+-----------------------------------------------------------------------------+
```

### 5.1 Panel Structure
*   **Workspace Tabs (Left Panel):**
    *   *Problem Statement Tab:* Displays exercise guidelines, constraints, and test inputs.
    *   *Observations Tab:* Text area for students to write analysis notes, along with an "Insert Console Log" quick action.
*   **Coding Workspace (Right Panel):**
    *   *Toolbar:* Language selector, theme controls, font size settings, and screen reset buttons.
    *   *Editor Panel:* Text editor with line numbers, code highlighting layers, and autosave indicators.
    *   *Sandbox Terminal Panel:* Input field for stdin arguments, and console outputs displaying compile logs, test runs, or error details.
    *   *Control Actions:* Actions to run code or submit solutions for evaluation.

---

## 6. Submission Screen

Displays a summary of a student's submission once a task is locked for grading.

```
+-----------------------------------------------------------------------------+
| ← Subject List | Submission Record: prog_1 Stack Operations                 |
+-----------------------------------------------------------------------------+
|                                                                             |
|  Student: Ananya Hegde | Sub Date: 2026-07-19 | Grade Status: [Evaluated]   |
|                                                                             |
|  +----------------------------------+  +---------------------------------+  |
|  | Submitted Code Snapshot          |  | Run Output Logs                 |  |
|  | 1 | def push(item):              |  | Stack push test: Success        |  |
|  | 2 |    arr.append(item)          |  | Output: [10, 20]                |  |
|  +----------------------------------+  +---------------------------------+  |
|                                                                             |
|  Student Observations:                                                      |
|  [ The stack behavior was verified using integer arrays... ]                 |
|                                                                             |
|  Evaluation Details:                                                        |
|  Score: 9 / 10     | Comment: Well documented, structure functions correct. |
|  Faculty Authenticated Stamp: Signed digitally by Prof. Shridhar Bhat       |
|                                                                             |
|  [Download signed PDF Record]                                               |
|                                                                             |
+-----------------------------------------------------------------------------+
```

---

## 7. Student History

Provides an archive of all submissions, grades, and comments across courses.

```
+-----------------------------------------------------------------------------+
| Student Submission History & Archive Dashboard                             |
+-----------------------------------------------------------------------------+
| Filter: [All Subjects   ]   Status: [All       ]   Search: [Search task...] |
+-----------------------------------------------------------------------------+
| Code     | Subject       | Task Name          | Grade | Status   | Download |
+----------+---------------+--------------------+-------+----------+----------+
| CS301    | Data Struct   | Stack Operations   | 9/10  | Graded   | [PDF]    |
| CS301    | Data Struct   | Queue Operations   | --    | Pending  | [Draft]  |
| CS302    | Java Prog     | Class Inheritance  | 8/10  | Graded   | [PDF]    |
+----------+---------------+--------------------+-------+----------+----------+
```

---

## 8. Faculty Dashboard

The landing page for faculty, displaying active classes, grading status, and security settings.

```
+-----------------------------------------------------------------------------+
| Welcome, Prof. Shridhar Bhat | Information Science Dept | Faculty Workspace  |
+-----------------------------------------------------------------------------+
|                                                                             |
|  [Active Section Grid]                      [System Announcements]          |
|  +-------------------------------------+    +----------------------------+  |
|  | CS301 (Data Structures)             |    | • Lab exam scheduled       |  |
|  | Year 3 · Sec A                      |    | • Signature required       |  |
|  | Submissions Pending: 14 students    |    |                            |  |
|  | [Open Class Dashboard ->]           |    |                            |  |
|  +-------------------------------------+    +----------------------------+  |
|  +-------------------------------------+                                    |
|  | CS302 (Java Programming)            |    [Grading Statistics Overview]   |
|  | Year 2 · Sec B                      |    Pending Evaluations: 14        |
|  | Submissions Pending: 2 students     |    Signed off Records: 128        |
|  | [Open Class Dashboard ->]           |                                    |
|  +-------------------------------------+                                    |
|                                                                             |
+-----------------------------------------------------------------------------+
```

---

## 9. Live Monitoring Screen

Allows faculty to monitor student activity, network connectivity, and compiler status in real-time.

```
+-----------------------------------------------------------------------------+
| CS301 (Data Structures) — Year 3 · Sec A | Controls: [Paste Locked] [Exam]  |
+-----------------------------------------------------------------------------+
| Search Student: [Type USN...]             Sort: [Progress] [Status]         |
+-----------------------------------------------------------------------------+
| [✓] 1MT23CS001 — Ananya Hegde | Progress: 6/12  | Status: Active (Coding)   |
| [!] 1MT23CS002 — Bipul Kumar  | Progress: 3/12  | Status: Idle (Warning: FS)|
| [✓] 1MT23CS003 — Chetana Dev  | Progress: 8/12  | Status: Compile Error     |
| [ ] 1MT23CS004 — Divya Rao    | Progress: 0/12  | Status: Offline           |
+-----------------------------------------------------------------------------+
| Actions: [Force Logout Selected]   [Unblock Selected]  [Session Lock Toggle]|
+-----------------------------------------------------------------------------+
```

### 9.1 Live Monitoring Features
*   **Grid layout:** Lists students alphabetically or by progress metrics.
*   **Status Indicators:** Shows active status (green), compiler errors (yellow), proctoring warnings (red), or offline status (gray).
*   **Batch Action Controls:** Buttons to reset sessions, unlock student accounts, or force logout multiple users.

---

## 10. Evaluation Screen

The grading panel where faculty review student work, assign marks, and sign off.

```
+-----------------------------------------------------------------------------+
| Student: Ananya Hegde (1MT23CS001) | Subject: Stack Operations (Python)     |
+------------------------------------+----------------------------------------+
|  [Student Submission Details]      |  [Evaluation Control Panel]            |
|  +------------------------------+  |  Grade (0 - 10):                       |
|  | Code Solution                |  |  [  9 ] / 10                           |
|  | 1 | def push(item):          |  |                                        |
|  | 2 |    arr.append(item)      |  |  Evaluator Remarks:                    |
|  +------------------------------+  |  [Well commented, correct log flow.  ] |
|  | Console Sandbox Run Output   |  |                                        |
|  | >> Push test: Success        |  |  Faculty Signature:                    |
|  +------------------------------+  |  +----------------------------------+  |
|  | Student Observations Log     |  |  | [PNG Preview: Signed]            |  |
|  | The execution logs verify... |  |  +----------------------------------+  |
|  +------------------------------+  |  [Save Mark & Sign]  [Request Revision]|
+------------------------------------+----------------------------------------+
```

---

## 11. Faculty Reports

Provides course performance summaries and completion charts.

```
+-----------------------------------------------------------------------------+
| Subject Reports: CS301 (Data Structures) — Year 3 · Sec A                   |
+-----------------------------------------------------------------------------+
| Options: [Completion Rates]  [Performance Spread]  Search Student: [_______] |
+-----------------------------------------------------------------------------+
|                                                                             |
|   [Average Completion Metric]           [Grade Distribution Chart]          |
|   Completed: 85% of assigned tasks       9-10 Marks: [========] 48 students |
|   In Progress: 10% of assigned tasks     7-8 Marks:  [====] 24 students     |
|   Pending: 5% of assigned tasks          5-6 Marks:  [==] 12 students       |
|                                                                             |
+-----------------------------------------------------------------------------+
| Actions: [Download Excel Grade List]         [Compile Bulk Signed PDF Record] |
+-----------------------------------------------------------------------------+
```

---

## 12. Admin Dashboard

The interface for administrative configuration and course mapping setup.

```
+-----------------------------------------------------------------------------+
| Admin Console Portal | MITE Institutional Configuration Environment         |
+--------------------+--------------------------------------------------------+
|                    |                                                        |
|  Quick Actions:    |  [Institutional Parameters Status Dashboard]           |
|  [Add Student ID]  |  Total Departments: 4      | Sections Mapped: 12       |
|  [Add Faculty Profile] Registered Students: 840 | Active Subjects: 14       |
|  [Map Subject Class] |                                                        |
|  [View Server Logs] |  Recent Activity:                                      |
|                    |  • Student account 1MT23CS012 updated (10:15)          |
|                    |  • Faculty member Prof. Bhat mapped to CS301 (09:42)    |
|                    |                                                        |
+--------------------+--------------------------------------------------------+
```

---

## 13. User Management Screen

Contains list management tools, filters, search, and bulk operations for student and faculty accounts.

```
+-----------------------------------------------------------------------------+
| Manage System Accounts | Roster Registry Administration Panel               |
+-----------------------------------------------------------------------------+
| Role: [Student  ]  Dept: [All  ]  Search Profile: [Name or USN ID__________] |
+-----------------------------------------------------------------------------+
| User ID      | Name               | Dept  | Class Section     | Actions    |
+--------------+--------------------+-------+-------------------+------------+
| 1MT23CS001   | Ananya Hegde       | CSE   | Year 3 · Sec A    | [Edit] [X] |
| 1MT23CS002   | Bipul Kumar        | CSE   | Year 3 · Sec A    | [Edit] [X] |
+--------------+--------------------+-------+-------------------+------------+
| Actions: [Add Single Account]   [Bulk Import CSV]   [Export Active List]     |
+-----------------------------------------------------------------------------+
```

---

## 14. Academic Management

Handles settings for departments, cycles, subjects, and sections.

```
+-----------------------------------------------------------------------------+
| Academic Structure Configuration | Classes, Cycles & Subjects              |
+--------------------+--------------------------------------------------------+
|  Configure views:  |  Active Course Mapping List                            |
|  [Departments    ] |  Code   | Name           | Year  | Department | Actions |
|  [Section Divisions] |  -----+----------------+-------+------------+---------|
|  [Course Subjects] |  CS301  | Data Structures| 3rd   | CSE        | [Edit]  |
|  [Task Syllabus  ] |  CS302  | Java Progr     | 2nd   | ISE        | [Edit]  |
|                    |  ------------------------------------------------------|
|                    |  [Map Faculty Assignment]       [Map Section Student]  |
+--------------------+--------------------------------------------------------+
```

---

## 15. Settings Page

Allows users to update profiles, security passwords, signature credentials, and application layouts.

```
+-----------------------------------------------------------------------------+
| User Profile & Application Configuration Panel                              |
+--------------------+--------------------------------------------------------+
|  Settings Menu:    |  Security Configuration                                |
|  [Personal Profile] |  Current Password: [_________________]                 |
|  [Security Lock  ] |  New Password:     [_________________]                 |
|  [PDF Signature  ] |  Confirm Password: [_________________]                 |
|  [Preferences    ] |                                                        |
|                    |  [Save Changes Button]                                 |
+--------------------+--------------------------------------------------------+
```

---

## 16. Dialogs & Popups

### 16.1 Save Changes Confirmation
```
+-------------------------------------------------------+
|                 Save Changes Confirm                  |
+-------------------------------------------------------+
|  Are you sure you want to save grading parameters for  |
|  student USN 1MT23CS001?                              |
|                                                       |
|  This action will stamp your digital signature.       |
|                                                       |
|         [ Cancel Action ]       [ Confirm Save ]      |
+-------------------------------------------------------+
```

### 16.2 Delete Record Alert
```
+-------------------------------------------------------+
|                 Delete Account Warning                |
+-------------------------------------------------------+
|  Warning: You are deleting user account 1MT23CS002.    |
|  This action cannot be undone and will delete all     |
|  associated compiler history log entries.             |
|                                                       |
|         [ Cancel Action ]       [ Confirm Delete ]    |
+-------------------------------------------------------+
```

### 16.3 Exam Mode Warning
```
+-------------------------------------------------------+
|                 Exam Mode Lockdown                    |
+-------------------------------------------------------+
|  This section is currently locked in Exam Mode.       |
|  All copy-paste operations are disabled, and window   |
|  focus tracking is active.                            |
|                                                       |
|                     [ Enter Exam ]                    |
+-------------------------------------------------------+
```

---

## 17. Empty States

### 17.1 No Subjects Assigned (Student/Faculty view)
```
+-------------------------------------------------------+
|                 No Subjects Assigned                  |
|                                                       |
|                         📚                            |
|                                                       |
|  No active courses are assigned to your account.      |
|  Please contact the administrator to configure your  |
|  academic subject enrollment mappings.                |
|                                                       |
|                  [ Contact Admin ]                    |
+-------------------------------------------------------+
```

### 17.2 Empty Seating Grid (Faculty dashboard view)
```
+-------------------------------------------------------+
|                No Active Student Logs                 |
|                                                       |
|                         👥                            |
|                                                       |
|  There are currently no students logged into this     |
|  laboratory section session.                          |
|                                                       |
|                  [ Sync Dashboard ]                   |
+-------------------------------------------------------+
```

---

## 18. Loading States

### 18.1 Compilation Loading Panel
```
+-------------------------------------------------------+
|                  Compiling Sandbox                    |
|                                                       |
|                       ( O O )                         |
|                                                       |
|  Code execution is processing in the sandbox...       |
|  Running test case verifications.                    |
|                                                       |
|                 [ Cancel Run Task ]                   |
+-------------------------------------------------------+
```

### 18.2 Document Generation Panel
```
+-------------------------------------------------------+
|                   Generating PDF                      |
|                                                       |
|                       =======                         |
|                                                       |
|  Formatting code listings and signing documents...   |
|  Do not close this application window.                |
|                                                       |
+-------------------------------------------------------+
```

---

## 19. Error Screens

### 19.1 System Connection Disrupted Panel
```
+-------------------------------------------------------+
|              System Connection Disrupted              |
|                                                       |
|                         ⚡                            |
|                                                       |
|  Unable to connect to the system server.             |
|  Your code changes are saved in local storage.        |
|  The system will reconnect automatically.             |
|                                                       |
|                  [ Retry Connection ]                 |
+-------------------------------------------------------+
```

### 19.2 Access Locked / Lockout Page
```
+-------------------------------------------------------+
|                 Access Account Locked                 |
|                                                       |
|                         🔒                            |
|                                                       |
|  Your account has been locked by faculty.             |
|  This lockout expires in 45 minutes.                 |
|  Please contact your supervisor for assistance.       |
|                                                       |
|                   [ Return Home ]                     |
+-------------------------------------------------------+
```

---

## 20. Wireframe Layout Standards

To ensure interface consistency across dashboards, all screen designs must follow these standards:

| Layout Component | Standard Metric | Constraints & Rules |
| :--- | :--- | :--- |
| **Grid Column Gutter** | 16px | Consistent spacing between dashboard panel borders. |
| **Shell Panel Border** | 1px Solid | Standard gray outline interface boundary lines. |
| **Application Width** | Min: 1024px | Layouts are optimized for desktop resolutions and block mobile screens. |
| **Sidebar Menu Width** | 210px | Fixed sidebar spacing to optimize space for the main content area. |
| **Workspace Split Pane** | 50% Left / 50% Right | Resizable columns for viewing code, logs, and instructions side-by-side. |
| **Dialog Container Size** | 440px Fixed Width | Standard dimension for confirmation dialog panels. |
| **Table Layout Padding** | 12px Vertical / 14px Horizontal | Padding structure for system log and database roster lists. |
| **Inner Panel Margins** | 20px | Spacing boundary margins around panels. |
