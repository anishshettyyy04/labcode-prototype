# LabCode — Interaction Design & Accessibility Specification (Phase 2.4)
## Behavioral Constitution & Accessibility Blueprints — MITE Deployment

---

## 1. Interaction Philosophy

LabCode’s interface behavior is designed to ensure usability and efficiency during programming laboratory sessions and exams.

*   **Responsive Feedback:** The interface must acknowledge all user inputs within 100 milliseconds using hover states, loading states, or state tags.
*   **System Transparency:** The interface must clearly show what is happening (e.g., *Compiling...*), what just happened (e.g., *Sandbox run failed*), and what to do next (e.g., *Fix syntax errors on line 12*).
*   **Forgiving Control System:** Destructive actions must require confirmation overlays, and the system should auto-save code drafts to prevent data loss.
*   **Interaction Consistency:** Interactive elements (buttons, inputs, tabs, search boxes) must behave identically across all dashboards, forms, and workflows.

---

## 2. Interaction Principles

The following 25 principles guide the interaction design of LabCode:

```
+-----------------------------------------------------------------------------------+
|                           THE TWENTY-FIVE UX PRINCIPLES                           |
+-----------------------------------------------------------------------------------+
|  1. Acknowledge Action Input           |  14. Consistent Dialog Dismissals        |
|  2. Silent Background Autosaves        |  15. Real-Time Status Footers            |
|  3. Avoid Sudden UI Shifting           |  16. High Visibility Selection Boxes      |
|  4. Confirm Destructive Inputs         |  17. Single Focus States                 |
|  5. Non-Disruptive Warning Flags       |  18. Keep Workspaces Editable            |
|  6. Clear Backwards Pathing            |  19. Direct Downloads (No New Tabs)      |
|  7. Highlight Contextual Menus         |  20. Standard Keyboard Shortcuts         |
|  8. No Orphan Dialog Views             |  21. Keyboard-Only Navigation Loops      |
|  9. Explicit Cancel Options            |  22. High-legibility Focus Indicators    |
| 10. Grade Locking Security             |  23. Context-Aware Error Banners         |
| 11. Informative Load Metrics           |  24. Safe Form Reset Options             |
| 12. Alert on Offline Transitions       |  25. Explicit Lockout Countdowns         |
| 13. Logical Tab Index Loop Navigation  |                                           |
+-----------------------------------------------------------------------------------+
```

1.  **Acknowledge Action Input:** Every click, keypress, or option change must produce a direct visual change (e.g., hover highlight or active selection marker) within 100 milliseconds.
2.  **Silent Background Autosaves:** The coding workspace must autosave drafts locally every 30 seconds without showing popup windows or blocking student input.
3.  **Avoid Sudden UI Shifting:** Loading elements and expanding menus must use placeholders to prevent page content from shifting suddenly.
4.  **Confirm Destructive Inputs:** Destructive actions (e.g., logging out during a test, deleting user profiles, clearing submissions) must require confirmation via an overlay modal.
5.  **Non-Disruptive Warning Flags:** System warnings, like proctoring alerts, must explain the violation clearly and display a button to resume the task.
6.  **Clear Backwards Pathing:** Users must always have a visible, single-click path to return to the previous screen (e.g., `← Subjects`).
7.  **Highlight Contextual Menus:** Focused controls (e.g., current editor views or selected dropdowns) must use a high-contrast accent outline.
8.  **No Orphan Dialog Views:** Modal windows must include a close button (`✕`) in the top-right and support closing with the Escape key.
9.  **Explicit Cancel Options:** All configuration forms must include a Cancel button to allow users to exit without saving changes.
10. **Grade Locking Security:** Once a submission is graded, editing access must be locked to prevent changes by the student.
11. **Informative Load Metrics:** Long-running processes, like sandbox compilations, must display a status indicator (e.g., *Compiling Stack Operations...*) rather than a blank screen.
12. **Alert on Offline Transitions:** If the connection drops, a non-blocking banner must display at the top of the screen to notify the user.
13. **Logical Tab Index Loop Navigation:** Forms and editor components must follow a structured layout tab order for keyboard users.
14. **Consistent Dialog Dismissals:** Clicking outside a modal container must not dismiss the modal, preventing accidental data loss.
15. **Real-Time Status Footers:** The application status bar must display network health, compiler statuses, and session timers.
16. **High Visibility Selection Boxes:** Selected table rows must use a high-contrast background to stand out from other entries.
17. **Single Focus States:** The cursor focus must target only one input field at a time to prevent duplicate entry issues.
18. **Keep Workspaces Editable:** The student code editor must remain writable during compile runs, allowing users to continue typing.
19. **Direct Downloads (No New Tabs):** Triggering report exports must download files directly through the browser, avoiding empty tabs.
20. **Standard Keyboard Shortcuts:** The coding editor must support common shortcuts (`Ctrl + S` to save, `Ctrl + F` to search) to match developer workflows.
21. **Keyboard-Only Navigation Loops:** Standard dashboards and navigation sidebars must allow keyboard selection using the arrow and Enter keys.
22. **High-Legibility Focus Indicators:** Focused elements must display a 3px glow outline matching primary accent colors.
23. **Context-Aware Error Banners:** Form validation errors must appear directly below the incorrect input field, with a description of how to fix the issue.
24. **Safe Form Reset Options:** Resetting configuration parameters must require double confirmation to prevent accidental clears.
25. **Explicit Lockout Countdowns:** Lockout screens must display an active countdown timer showing when the user can log in again.

---

## 3. Navigation Behavior

### 3.1 Navigation Interaction Model
*   **Sidebar Navigation:** Handles main dashboard navigation. Hovering over a sidebar item displays a tooltip, and selecting an item applies an active state highlight.
*   **Breadcrumbs:** Displays the current location path (e.g., `Subjects > Data Structures > USN: 1MT23CS001`). Clicking a path element returns the user to that screen.
*   **Workspace Tabs:** Standardizes switching between Problem Description, Code Editor, and Observations views. Switching tabs must update the main view instantly without reloading the page.
*   **Page Transitions:** Screen changes must complete within 200 milliseconds using simple fade transitions to keep the application responsive.
*   **Keyboard Navigation & Focus Loop:** Users can navigate interactive controls using the Tab key. The focus ring must wrap logically from the last field back to the first.

---

## 4. Programming Workspace Behavior

The student programming workspace contains the core coding and submission tools:

```
+-----------------------------------------------------------------------------+
|  [Problem Details Panel]            |  [Workspace Coding Panel]             |
|                                     |  Toolbar: [Language Select] [Theme]   |
|  * Instructions display             |                                       |
|  * Scroll locks internally          |  * Editor auto-saves code drafts      |
|                                     |  * Ctrl+S triggers a manual save      |
|                                     |                                       |
|-------------------------------------|---------------------------------------|
|  [Observation Input Area]           |  [Sandbox Console Terminal]           |
|                                     |                                       |
|  * Text input for log results       |  * Console displays output logs       |
|  * Autosaves to database            |  * Errors show syntax line highlights |
|                                     |                                       |
|                     [Submit Draft]  |  [Run Code Sandbox]                   |
+-------------------------------------+---------------------------------------+
```

### 4.1 Component Interaction Flows
1.  **Code Editor Pane:**
    *   *Autosave Flow:* The system automatically caches changes locally in the browser's storage 30 seconds after the last keystroke. The status bar displays a *Draft Saved* indicator.
    *   *Manual Save:* Pressing `Ctrl + S` manually saves the draft to the database. The status bar briefly updates to *Draft Saved*.
2.  **Compilation & Sandbox Sandbox Console:**
    *   *Compile Trigger:* Clicking the primary "Run Code Sandbox" button sends the code to the compilation sandbox. The console changes to a loading state displaying *Sandbox run in progress...*
    *   *Runtime Output Display:* Sandbox output returns console results in under 5 seconds. If the build is successful, stdout displays in green text. If it fails, compiler error logs display in red text.
3.  **Language Switching Configuration:**
    *   *Warning Flow:* Changing the programming language in the dropdown menu displays a confirmation prompt: *"Changing languages will load a new boiler-plate code template. Your current draft will be archived. Do you want to continue?"*
    *   *Reset Flow:* Confirming the change resets the editor window and loads the boilerplate template for the selected language.
4.  **Security & Proctoring Control Interface:**
    *   *Fullscreen Enforcer:* If the subject has proctoring enabled, the system displays a modal overlay requiring the student to enter fullscreen mode.
    *   *Violation Detection:* If the user exits fullscreen or switches browser tabs, the workspace immediately locks and displays a warning prompt. The student must click "Re-enter Fullscreen" to unlock the editor. Repeated violations are logged and flagged on the faculty dashboard.

---

## 5. Feedback System

The system provides clear feedback for actions to ensure users understand the results of their interactions:

| Action Trigger | Visual Interaction | Status Banner | Success / Fail Behavior |
| :--- | :--- | :--- | :--- |
| **Save Code** | The autosave status updates to *Syncing...* | *Draft Saved* | The status bar updates to show a green checkmark next to *Draft Saved*. |
| **Run Code** | The Run button changes to a loading spinner. | *Compiling sandbox...* | **Success:** Console output displays in green. **Failure:** Console logs show compiler errors in red and highlight the affected lines of code. |
| **Submit Task** | An overlay modal displays verification details. | *Submitting code logs...* | **Success:** The editor locks, updates the status badge to *Grading Pending*, and shows a success toast. **Failure:** Displays a warning toast explaining the missing input parameters. |
| **Network Loss** | Toggles a top-level alert banner. | *Network connection lost* | Displays an alert banner at the top of the screen. Student workspace remains editable, caching changes in local storage. |
| **Network Reconnect**| Updates the alert banner status. | *Connection restored* | The alert banner changes to green, syncs local drafts, and fades out over 3 seconds. |
| **Grade Save** | Displays a status badge next to the student's entry. | *Grades signed and saved* | Updates the student's status badge to *Evaluated* and displays a success toast. |

---

## 6. Loading Behavior

*   **Page Transitions:** Navigation switches must load within 200 milliseconds, displaying skeleton screens on dashboard cards to show that content is loading.
*   **Compile Submissions:** The Run button shows a loading spinner, and the console displays *Compiling Sandbox...* to indicate active processing.
*   **Bulk PDF Compilation:** Generating bulk reports displays a modal progress bar showing completion metrics (e.g., *Stamping signatures... 14 of 48 completed*), disabling other dashboard controls until the export finishes.

---

## 7. Error Behavior & Recovery Pathways

```
[System Connection Disrupted]
      |
      v
  Local Draft Mode Enabled
  (Save code to browser storage)
      |
      v
[Retry Connection Clicked]
     /          \
  (Success)    (Failed)
    /              \
Sync Drafts     Display Error Alert
Update Header   Keep Offline Status
```

### 7.1 Error Recovery Specifications
1.  **Compiler Sandboxing Timeout:** If sandbox compilation exceeds 8 seconds, the terminal displays an error: *"Compiler timeout. Please verify your loop exits correctly and retry."*
2.  **Save Failures:** If the network disconnects during a manual save, the status bar displays a warning: *"Offline. Draft saved locally."* The system will automatically sync the changes once the connection is restored.
3.  **PDF Compilation Errors:** If a signature image fails to load, the PDF compiler displays an alert: *"Signature image parsing error. Generate PDF without signature stamp?"* providing buttons to confirm or upload a new signature.

---

## 8. Confirmation Behavior

Confirmation dialogs are centered on the screen and require the user to confirm before proceeding with critical actions.

*   **Cancel Logic:** The secondary cancel action must always align to the left, closing the modal without modifying data.
*   **Confirmation Actions:** The primary action button must align to the right. Actions that delete data or modify grades must use danger red buttons.
*   **Confirmation Scenarios:**
    *   *Sign Out:* Warns if the student has unsaved drafts or is in the middle of a live laboratory session.
    *   *Submitting observations:* Confirms that submission will lock the editor pane for grading.
    *   *Account Deletions:* Requires the administrator to type the user's USN or profile ID before deleting the account.

---

## 9. Notification System

*   **Toast Alerts:** Non-blocking notifications that appear at the top-center of the screen and fade out after 4 seconds. Used for minor updates (e.g., *Draft saved* or *Paste blocked*).
*   **Warning Banners:** Prominent alerts that lock target inputs until resolved. Used for system-wide notices, like connection status warnings.
*   **Inline Validation Errors:** Displayed in red text directly below form inputs when validation fails (e.g., *Invalid subject code format*).

---

## 10. Keyboard Interaction

The system supports the following keyboard shortcuts to ensure keyboard-only accessibility:

| Target Scope | Shortcut Key | Triggered System Action |
| :--- | :--- | :--- |
| **Workspace** | `Ctrl + S` | Manually saves the active code draft to the database. |
| **Workspace** | `Ctrl + Enter` | Compiles the code and runs verification tests. |
| **Workspace** | `Ctrl + Shift + S`| Opens the submission confirmation modal. |
| **Workspace** | `Ctrl + \`` | Switches focus directly to the Sandbox Console input field. |
| **Workspace** | `Alt + 1` | Switches to the Problem Description tab. |
| **Workspace** | `Alt + 2` | Switches to the Code Editor tab. |
| **Workspace** | `Alt + 3` | Switches to the Observations tab. |
| **Evaluation**| `Alt + S` | Saves the input grade parameters and signs the document. |
| **Evaluation**| `Alt + N` | Opens the next student profile in the class list. |
| **Navigation**| `Ctrl + F` | Focuses the dashboard search bar input field. |
| **Navigation**| `Escape` | Closes any open modal overlay or dropdown menu. |

---

## 11. Accessibility (A11y) Standards

To ensure the platform is accessible to all users, the interface must meet the following standards:

*   **Logical Tab Order:** Interactive controls must follow a top-to-bottom, left-to-right tab order.
*   **Focus Ring Indicator:** Focused components must display a 3px outline matching the primary accent color to make navigation clear for keyboard users.
*   **Screen Reader Metadata:** Interactive buttons and input fields must use descriptive labels (e.g., `aria-label="Run Code Compilation"`) to support screen readers.
*   **Accessible Input Validation:** Form validation errors must be linked to their input fields using attributes (e.g., `aria-describedby="error-message-id"`) to ensure they are read aloud by screen readers.
*   **Color Independence:** Visual indicators, such as compile states and proctoring warnings, must not rely on color alone; they must use clear text labels or icons (e.g., `[✓ Success]` or `[✗ Error]`).

---

## 12. Empty States

*   **No Subjects Enrolled:** Displays an illustration of a book with the message: *"No subjects assigned. Contact the administrator to update your course enrollments."*
*   **No Active Students:** Displays a profile icon grid with the message: *"No active student logs. Student heartbeats will appear here once they sign in."*
*   **No Matching Search Results:** Displays a magnifying glass icon with the message: *"No matches found. Try refining your search query."*

---

## 13. Search & Filtering Behavior

*   **Live Filtering:** Search boxes must filter lists in real-time, updating matching row displays within 100 milliseconds of typing.
*   **Sort Actions:** Table headers must feature toggle arrows to sort lists alphabetically, numerically, or by progress status.
*   **Search Reset:** Search bars must include a clear icon (`✕`) on the right to reset filters and restore default list views.

---

## 14. Table Interaction

*   **Row Selection:** Clicking a table row applies a high-contrast background highlight and displays quick action menus.
*   **Bulk Selection:** The header row must feature a checkbox to select all rows on the page for batch actions (e.g., *Bulk sign selected*).
*   **Pagination Controls:** Table pagination must use a clear page navigation block (e.g., `Showing 1-10 of 48 records`) with disabled back/next button states on the first and last pages.

---

## 15. Form Behavior

*   **Required Fields:** Required form inputs must feature a red asterisk (`*`) next to their labels.
*   **Autosave for Text Areas:** Observation textareas must save drafts to the local browser cache automatically 30 seconds after the user stops typing.
*   **Validation States:** Form fields must show inline validation checks immediately when the user clicks or tabs out of the input area.

---

## 16. Security Interaction

*   **Double-Login Block:** If a student tries to log in while an active session exists, the system blocks the request and displays a confirmation dialog: *"This account is currently logged in on another terminal. Force logout the previous session?"*
*   **Forced Logout Flow:** If a faculty member logs a student out remotely, the student's editor locks immediately and displays a message: *"Session terminated by faculty. Contact your instructor."*
*   **Proctoring Alerts:** Exiting fullscreen mode or switching tabs locks the editor, pauses the session timer, and flags a warning indicator on the faculty dashboard. The student must click "Re-enter Fullscreen" to unlock the editor.

---

## 17. Performance Expectations

*   **Compiler Latency:** Code compilation runs and sandbox returns must complete in under 5 seconds under standard network loads.
*   **UI Response Time:** Interactive buttons, hover states, and tab switches must respond within 100 milliseconds.
*   **Navigation Speed:** Page changes and dashboard navigations must complete within 200 milliseconds.
*   **Grid Sync Speed:** The faculty monitoring grid must update student activity states and compile indicators within 3 seconds of execution events.

---

## 18. Micro-Interactions

*   **Button States:** Clicking a button must display an active state (e.g., a slight shrink or color change) to confirm the click.
*   **Tooltip Delay:** Tooltips must appear only after the cursor hovers over a component for 500 milliseconds, preventing accidental popups.
*   **Panel Resizing:** Hovering over resizable layout borders must change the cursor to a drag indicator, and dragging must resize the panels smoothly.

---

## 19. Application Behavior Rules

These 40 rules define the core application behaviors for LabCode:

```
+-----------------------------------------------------------------------------------+
|                            THE FORTY BEHAVIOR RULES                               |
+-----------------------------------------------------------------------------------+
|  1. Autosave every 30 seconds          |  21. Keep logs read-only                 |
|  2. Never lose unsaved code            |  22. Display active filters              |
|  3. Display current locations          |  23. Show warning for unsaved forms      |
|  4. Confirm all deletions              |  24. Highlight search keywords           |
|  5. Toggle fullscreen lock variables   |  25. Confirm language switches           |
|  6. Set default languages              |  26. Close menus on Escape               |
|  7. Track student tab exits            |  27. Restrict multi-tab logins           |
|  8. Limit login retries                |  28. Limit file upload size              |
|  9. Show session timers                |  29. Format validation alerts            |
| 10. Direct download for PDFs           |  30. Block paste in strict mode          |
| 11. Lock code after grading            |  31. Clear locks on logout               |
| 12. Show offline banners               |  32. Run inline validations              |
| 13. Maintain logical tab loops         |  33. Toggle show/hide password           |
| 14. Keep editors open on compile       |  34. Standard navigation animations      |
| 15. Standard modal sizes               |  35. Mute inactive status indicators     |
| 16. Show error descriptions            |  36. Constant heartbeat ticks            |
| 17. Confirm destructive actions        |  37. Logical row details                 |
| 18. Sentence case buttons              |  38. Highlight search matches            |
| 19. Primary button alignments          |  39. Standard loading spinner templates  |
| 20. Lock out blocks on exit            |  40. Set default theme parameters        |
+-----------------------------------------------------------------------------------+
```

1.  **Autosave every 30 seconds:** The student code editor must save drafts to local storage every 30 seconds without showing popup warnings.
2.  **Never lose unsaved code:** Unsaved code drafts must be cached in local storage before the page is closed or reloaded.
3.  **Display current locations:** Breadcrumb headers must show the user's active page path at all times.
4.  **Confirm all deletions:** Any delete action must trigger a confirmation overlay modal before data is removed.
5.  **Toggle fullscreen lock variables:** Fullscreen mode requirements are set by state parameters in the subjects table.
6.  **Set default languages:** The editor must load the default language specified for the subject course.
7.  **Track student tab exits:** Exiting fullscreen mode or switching tabs must lock the editor and flag a warning on the faculty monitor.
8.  **Limit login retries:** Accounts must lock out for 15 minutes after 5 consecutive failed login attempts.
9.  **Show session timers:** Live examination dashboards must display a countdown timer in the header.
10. **Direct download for PDFs:** Export actions must trigger a direct file download, without opening empty browser tabs.
11. **Lock code after grading:** Student submission workspaces must change to read-only once evaluation grades are saved.
12. **Show offline banners:** The application must display a warning banner at the top of the screen if connection is lost.
13. **Maintain logical tab loops:** Focus movement must wrap logically within form elements and workspace panels.
14. **Keep editors open on compile:** Code editors must remain active and editable during sandbox compilation tasks.
15. **Standard modal sizes:** Confirmation modals must use a fixed width of 440px to ensure a consistent appearance.
16. **Show error descriptions:** Input validation errors must display directly below the affected input container.
17. **Confirm destructive actions:** Batch processes (e.g., bulk exports or section lockouts) must show warning prompts before running.
18. **Sentence case buttons:** Button labels must use sentence case to maintain consistent UI styling.
19. **Primary button alignments:** Primary actions (e.g., Save, Submit) must align to the right side of dialog forms.
20. **Lock out blocks on exit:** Exiting an exam session before final submission must require double confirmation.
21. **Keep logs read-only:** The compiler sandbox console must remain read-only for students.
22. **Display active filters:** Search lists must display active filter tags and provide an easy way to clear them.
23. **Show warning for unsaved forms:** Navigating away from an edited, unsaved setup form must trigger a warning prompt.
24. **Highlight search keywords:** Search matches in tables must highlight search keywords within the row cells.
25. **Confirm language switches:** Changing languages in the dropdown menu must prompt the user before overwriting code drafts.
26. **Close menus on Escape:** Pressing the Escape key must close any open modals, dropdown menus, or context selections.
27. **Restrict multi-tab logins:** Logging into a student account on a second device or tab must prompt the user to release the active session.
28. **Limit file upload size:** Signature image uploads must be restricted to PNG files smaller than 2MB.
29. **Format validation alerts:** Required form fields must use clear red asterisks next to their titles.
30. **Block paste in strict mode:** Pasting text into the editor must be blocked when paste restriction features are enabled.
31. **Clear locks on logout:** Logging out of a student account must remove the active login token from the database.
32. **Run inline validations:** Form elements must run validation checks immediately when focus leaves the input field.
33. **Toggle show/hide password:** Password fields must include a visibility toggle to show or hide entered text.
34. **Standard navigation animations:** Page navigations must complete within 200 milliseconds using simple fade transitions.
35. **Mute inactive status indicators:** Inactive options and menu items must use muted colors to keep focus on active elements.
36. **Constant heartbeat ticks:** Student workspace heartbeats must check session connection health every 15 seconds.
37. **Logical row details:** Selected table records must expand inline to show detail summaries.
38. **Highlight search matches:** Search queries must search across column entries and highlight matches in real-time.
39. **Standard loading spinner templates:** Sandboxed compilations must display a loading spinner in place of the run code action button.
40. **Set default theme parameters:** The editor pane theme setting must remain cached in local storage for subsequent sessions.

---

## 20. Developer Interaction Specifications

These specifications define the triggers, actions, and expectations for developer reference:

### 20.1 Sandbox Execution Flow
*   **Trigger:** Click on "Run Code Sandbox" or press `Ctrl + Enter`.
*   **System Action:** Save active editor draft, compile and run verification tests on compiler APIs, and output console results.
*   **User Feedback:** The Run button shows a loading spinner, and the console displays *Compiling Sandbox...*
*   **Success Behavior:** Outputs execution results in green text, showing stdout, resource usage metrics, and progress logs.
*   **Failure Behavior:** Displays compiler errors in red text and highlights syntax error lines in the editor view.
*   **Recovery Behavior:** Student revises code draft in the editor window and clicks compile again.

### 20.2 Double-Login Session Verification
*   **Trigger:** User signs in.
*   **System Action:** Query active session records for matching User ID USN.
*   **User Feedback:** Displays loading spinner during credential verification checks.
*   **Success Behavior:** Initializes user session token and redirects to dashboard.
*   **Failure Behavior:** Displays an error message explaining that the account is active on another device, with a button to release the previous session.
*   **Recovery Behavior:** Click "Release Previous Session" to delete the old session token and log in.
