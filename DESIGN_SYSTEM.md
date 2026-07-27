# LabCode — Design System & UI Component Library (Phase 2.3)
## Single Source of Truth Visual & Interaction Specification — MITE Deployment

---

## 1. Design Philosophy

To support students and faculty during intensive 3-hour laboratory sessions at MITE, LabCode's design system focuses on the following four visual goals:

*   **Professional:** The interface mirrors modern, high-grade development environments (such as VS Code, GitHub Desktop, and JetBrains IDEs) to prepare students for real-world engineering environments.
*   **Minimal:** Focuses on reducing visual clutter and maximizing code-editing workspace to keep student attention on coding task completion.
*   **Academic:** Integrates clear institutional identity markers, structural hierarchies, and progress tracking indicators to reinforce learning goals.
*   **Consistent:** Employs standardized design tokens, component behaviors, and layout geometries to ensure a predictable user experience across all modules.

---

## 2. Brand Identity

The brand identity translates MITE's academic values into a clean, modern digital interface:

*   **Brand Personality:** Trustworthy, precise, clean, and developer-focused.
*   **Visual Tone:** Balanced and functional. It uses neutral backdrops with clear accent markers to highlight code states and progress indicators.
*   **Professional Impression:** Uses clean panels, consistent spacing, and structured navigation to create an environment focused on programming logic.
*   **Academic Rigor:** Incorporates formal nomenclature, structured grade displays, clear progress metrics, and digitally signed records to match the institution's evaluation standards.

---

## 3. Color System (Design Tokens)

The color palette is optimized to prevent eye strain during long lab sessions.

### 3.1 Dark Theme Tokens
```
--color-bg-primary:      #0a0a0f (Main application canvas background)
--color-bg-secondary:    #11111a (Sidebar, headers, and dashboard surfaces)
--color-bg-tertiary:     #1a1a26 (Card containers and hover highlights)
--color-border:          #24243a (Standard container outlines and separation rules)
--color-text-primary:    #f4f4f8 (High-contrast text for headers and body copy)
--color-text-secondary:  #a8a8bc (Medium-contrast labels and descriptions)
--color-text-muted:      #6e6e84 (Muted placeholder text and breadcrumbs)
--color-accent-primary:  #E87722 (MITE orange: highlights, buttons, focus states)
--color-accent-glow:     rgba(232, 119, 34, 0.35) (Focus rings and highlight backdrops)
--color-accent-blue:     #1B3A6B (MITE blue: informational tags and headers)
--color-success:         #7ee2a0 (Successful compile execution, high grades)
--color-warning:         #f9d889 (Pending evaluations, proctoring alerts)
--color-danger:          #ff8aa0 (Compiler failures, account locks, violations)
```

### 3.2 Light Theme Tokens
```
--color-bg-primary:      #f6f6f8 (Light canvas backdrop)
--color-bg-secondary:    #ffffff (Clean white container surfaces)
--color-bg-tertiary:     #eeeef2 (Input fields and list hover highlights)
--color-border:          #e2e2ea (Container edges and column division lines)
--color-text-primary:    #14141f (Dark, highly legible body copy and headers)
--color-text-secondary:  #4a4a5e (Sub-headings and parameter labels)
--color-text-muted:      #8a8a9c (Muted placeholder indicators)
--color-accent-primary:  #E87722 (Consistent MITE orange brand color)
--color-accent-glow:     rgba(232, 119, 34, 0.18) (Soft orange focus rings)
--color-accent-blue:     #1B3A6B (Rich blue brand element)
--color-success:         #22863a (Green validation labels)
--color-warning:         #854d0e (Brown-gold warning labels)
--color-danger:          #cb2431 (Red alert borders and warnings)
```

---

## 4. Typography

LabCode uses a clear typographic hierarchy to organize information and ensure code is easy to read.

| Token | Family | Size | Weight | Line Height | Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Heading-1** | Inter | 24px | 800 (Bold) | 32px | Primary dashboard greeting |
| **Heading-2** | Inter | 18px | 700 (Bold) | 24px | Section and card headers |
| **Heading-3** | Inter | 14px | 600 (Semibold)| 20px | Sub-sections, modal headers |
| **Body-Text** | Inter | 13px | 400 (Regular) | 18px | Standard descriptions, instructions|
| **UI-Label** | Inter | 11px | 600 (Semibold)| 16px | Field titles, metadata, chips |
| **UI-Button** | Inter | 12.5px | 700 (Bold) | 16px | Primary/Secondary buttons |
| **Code-Regular**| JetBrains Mono| 13px | 400 (Regular) | 22px (1.7) | Programming editor syntax |
| **Code-Console**| JetBrains Mono| 12px | 400 (Regular) | 20px (1.6) | Sandboxed compile stdout/stderr |

---

## 5. Spacing System

The layout system is built on a **4px base grid** to ensure spacing is consistent across panels.

```
--space-4:    4px   (Tight spaces: checkboxes, inputs, small tags)
--space-8:    8px   (Component padding: buttons, input fields, labels)
--space-12:   12px  (Lists, dropdown options, status alerts)
--space-16:   16px  (Grid gutters, card margins, table row heights)
--space-20:   20px  (Standard panel padding, card interiors, setup forms)
--space-24:   24px  (Dashboard column gap spacings, modal margins)
--space-32:   32px  (Section headers, dashboard profile blocks)
```

---

## 6. Grid System & Shell Geometry

The desktop-first layout uses a fixed grid design to prevent UI shifting during compilation runs.

*   **Header Height:** 52px (Fixed)
*   **Footer Height:** 32px (Fixed)
*   **Sidebar Width:** 210px (Fixed)
*   **Min App Width:** 1024px
*   **Editor Split Pane Layout:** 50% left column (Problem instructions/Observations), 50% right column (Workspace / Sandbox Console).
*   **Dashboard Grid Columns:** 12-column layout with 16px gutters.
*   **Table Layout Specifications:** Auto-scaling columns with fixed widths for status tags (80px), USNs (120px), and actions (120px).

---

## 7. Border Radius & Elevation (Shadows)

*   **Border Radius Tokens:**
    *   `--radius-4`: 4px (Checkboxes, toggle controls, focus rings)
    *   `--radius-8`: 8px (Buttons, input fields, tags, list rows)
    *   `--radius-12`: 12px (Cards, alerts, sidebar components)
    *   `--radius-16`: 16px (Centered auth cards, evaluation panels)
*   **Elevation (Shadow) Tokens:**
    *   `--shadow-sm`: `0 2px 8px rgba(0, 0, 0, 0.15)` (Active list hover elements)
    *   `--shadow-md`: `0 6px 18px rgba(0, 0, 0, 0.25)` (Buttons, card selections)
    *   `--shadow-lg`: `0 20px 40px rgba(0, 0, 0, 0.4)` (Confirmation modals, system warning screens)

---

## 8. Icon System

*   **Style:** Minimal outline vector line art. Action buttons use filled variants to emphasize priority.
*   **Dimensions:**
    *   `14px`: Small inline labels and warning chips.
    *   `18px`: Primary sidebar items and toolbar controls.
    *   `24px`: Empty state graphics and modal alert displays.
*   **Consistency Rules:** All icons must match in stroke width, corner rounding, and visual weight.

---

## 9. Button System

```
Primary:    [ MITE Orange ] (Main actions: Run, Save, Submit)
Secondary:  [ Charcoal / White ] (Options, navigation controls)
Outline:    [ Transparent w/ Border ] (Secondary filters, search triggers)
Danger:     [ Crimson Red ] (Force logouts, account locks, deletions)
Disabled:   [ Slate Gray ] (Read-only, past deadlines)
```

| Type | Purpose | Size | Default State | Hover State | Focus State |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary** | Main workspace action (e.g., Run, Submit). | Height: 36px | `--color-accent-primary` | Darker Orange | Orange focus ring |
| **Secondary** | Secondary dashboard option. | Height: 36px | `--color-bg-tertiary` | Darker gray/white | Gray focus ring |
| **Outline** | Navigation / Filter toggles. | Height: 32px | Border: `--color-border` | Light backdrop | Blue outline |
| **Danger** | Destructive actions (e.g., lock user). | Height: 36px | `--color-danger` | Deep Crimson | Red focus ring |
| **Disabled** | Read-only actions. | Height: 36px | `--color-bg-tertiary` | No change | No focus outline |

---

## 10. Input Components

*   **Text Field:** Height 36px, padding 8px 12px, border radius 8px. Default: `--color-border`. Focus: `--color-accent-primary` with a 3px glow outline.
*   **Dropdown Selector:** Height 36px, includes a chevron indicator. Focus loads a scrollable list styled in `--color-bg-tertiary`.
*   **Search Box:** Height 32px, featuring a search icon on the left and a clear action button on the right.
*   **Observations Textarea:** Scrollable rich text editor. Font size 13px, line height 1.8. Includes a character counter.
*   **Validation Alerts:** Valid inputs show a green border tick. Errors show a red border with clear error descriptions.

---

## 11. Navigation Components

*   **Sidebar Navigation:** Vertical item lists. Mapped with active left border flags (4px thickness in `--color-accent-primary`) for selected courses.
*   **Breadcrumbs:** Path chains separated by chevrons (`>`). Muted font style; last element is bold to indicate the active screen.
*   **Tabs:** Horizontal text headers. Selected tabs show an underline highlight matching `--color-accent-primary`.

---

## 12. Data Display Components

*   **Cards:** Uses `--color-bg-secondary` surfaces with a 1px border. Mapped with a progress bar and status badge.
*   **Tables:** Striped tables with alternating background colors (`--color-bg-secondary` and `--color-bg-primary`). Rows include a hover highlight.
*   **Status Chips:**
    *   *Evaluated:* Green backdrop (`#7ee2a0` opacity 0.1), green text.
    *   *Pending:* Yellow backdrop (`#f9d889` opacity 0.1), yellow text.
    *   *Error:* Red backdrop (`#ff8aa0` opacity 0.1), red text.
*   **Progress Bars:** Background: `--color-bg-tertiary`. Fill: Gradient using `--color-accent-primary` to indicate completion.

---

## 13. Feedback Components

*   **Toasts:** Non-blocking messages that appear at the top-center of the screen. Height 36px, border radius 20px, featuring clear warnings (e.g., *Paste is disabled*).
*   **Modals:** Centered layout overlays with a dark backdrop mask. Displays confirmation prompts with primary action buttons on the right.
*   **Skeleton Screens:** Gray loader shapes that match the dashboard dashboard cards to show content is loading.

---

## 14. Programming Components

*   **Code Editor:** Clean, dark panel (`#0d0d12` canvas backdrop) to minimize eye strain. Implements custom syntax tokens (e.g., `--color-tok-keyword: #ff8fc9`).
*   **Console Output Panel:** JetBrains Mono font console display. Standard execution returns green; compiler errors return crimson.
*   **Resizable Pane Divider:** A 6px vertical/horizontal bar that shows a resize cursor on hover, allowing users to adjust panel widths.

---

## 15. Table Standards

*   **Search:** Live table filtering that updates as the user types, with a search input field in the top-right of the table.
*   **Sorting:** Column headers feature toggle arrows to sort data alphabetically or numerically.
*   **Pagination:** Displays total page indicators (e.g., `Page 1 of 5`) with disabled back/next button states.
*   **Action Column:** Groups row controls (e.g., Edit, Delete, View) in the right-most column.

---

## 16. Form Standards

*   **Autosave Indicator:** Text updates (e.g., *Syncing*, *Draft Saved*) must display in the workspace toolbar within 1 second of edits.
*   **Validation Errors:** Forms must highlight incorrect fields in red and display clear error descriptions.
*   **Action Confirmation:** Form submissions must require double confirmation before locking edit access.

---

## 17. Motion Guidelines

*   **Transitions:** Fade transitions for layout switches must complete in 150 milliseconds.
*   **Hover States:** Button hover highlights must update colors in 100 milliseconds.
*   **Modals:** Modal windows must animate into view within 200 milliseconds.
*   **No Unnecessary Animations:** Exclude scroll animations or graphic transitions to maintain fast compilation performance.

---

## 18. Accessibility

*   **Contrast Standards:** All text, dashboard labels, and status badges must maintain a minimum contrast ratio of 4.5:1 against their backgrounds.
*   **Focus Outline Rings:** Focus indicators must display a high-visibility border ring around interactive elements.
*   **Clickable Target Sizes:** Interactive buttons and links must have a target size of at least 44x44 pixels.
*   **Keyboard Navigation:** Form elements and coding workspaces must follow a logical tab order for keyboard-only users.

---

## 19. Consistency Rules

These 30 design rules ensure visual consistency across the entire application:

```
+-----------------------------------------------------------------------------------+
|                            THE THIRTY LABCODE DESIGN RULES                        |
+-----------------------------------------------------------------------------------+
|  1. Sentence case buttons              |  16. Consistent error placements         |
|  2. Primary actions on the right       |  17. Constant status bar indicators      |
|  3. Secondary actions on the left      |  18. Confirm logout actions              |
|  4. Danger actions use crimson red     |  19. Inline form validation triggers     |
|  5. Consistent sidebar placements      |  20. Progress metrics visibility         |
|  6. Breadcrumbs show full paths        |  21. Consistent close button placements  |
|  7. Highlight active statuses clearly  |  22. Visible password toggles            |
|  8. Table headers always searchable    |  23. Contextual header badges            |
|  9. Explicit cancel button options     |  24. Persistent draft autosaves          |
| 10. Confirm destructive actions        |  25. Explicit error explanations         |
| 11. Modal close button behaviors       |  26. Identical dropdown styling          |
| 12. Standard focus ring outlines       |  27. Non-disruptive notifications        |
| 13. High-contrast tags and chips       |  28. System status visibility            |
| 14. Unified input heights              |  29. Muted labels for placeholder texts  |
| 15. Uniform scrollbar styling          |  30. Clear grading state indicators      |
+-----------------------------------------------------------------------------------+
```

1.  **Sentence case buttons:** Button labels must use sentence case (e.g., *Save changes* instead of *SAVE CHANGES*).
2.  **Primary actions on the right:** Main action buttons (e.g., Save, Submit) must align to the right side of dialog forms.
3.  **Secondary actions on the left:** Secondary actions (e.g., Cancel, Back) must align to the left side of dialog forms.
4.  **Danger actions use crimson red:** Buttons for destructive actions (e.g., Lock User, Delete Task) must use danger color tokens.
5.  **Consistent sidebar placements:** Sidebars must align to the left side of the screen across all dashboards.
6.  **Breadcrumbs show full paths:** Breadcrumb paths must show the user's complete course location, ending with the active task.
7.  **Highlight active statuses clearly:** Mapped status indicators must use primary accent colors to stand out from other menus.
8.  **Table headers always searchable:** All data tables must include a search input field in the top-right corner.
9.  **Explicit cancel button options:** Every setup form must include a Cancel button to allow users to exit safely.
10. **Confirm destructive actions:** Critical actions (e.g., deleting tasks, locking USNs) must require confirmation via overlay modals.
11. **Modal close button behaviors:** Modals must feature a visible close icon (`✕`) in the top-right corner.
12. **Standard focus ring outlines:** Focused elements must display a 3px glow outline matching `--color-accent-primary`.
13. **High-contrast tags and chips:** Status tags must maintain high contrast to ensure readability.
14. **Unified input heights:** Input text areas, password fields, and dropdown elements must maintain a uniform height of 36px.
15. **Uniform scrollbar styling:** Scrollbars must use a minimal, rounded gray track to avoid distracting from content.
16. **Consistent error placements:** Input validation errors must display directly below the associated field container.
17. **Constant status bar indicators:** The status footer bar must display connection health and heartbeat statuses across all modules.
18. **Confirm logout actions:** Sign-out clicks must trigger a confirmation dialog to prevent accidental logs.
19. **Inline form validation triggers:** Input fields must run validation checks immediately when they lose focus.
20. **Progress metrics visibility:** Course completion metrics must be visible on the main page of student dashboards.
21. **Consistent close button placements:** Close buttons on modal overlays must always align to the top-right corner.
22. **Visible password toggles:** Login and password update screens must include a show/hide password toggle button.
23. **Contextual header badges:** The user badge must display both the user's name and their role (e.g., *Student*, *Faculty*).
24. **Persistent draft autosaves:** Student editors must display a *Saved* or *Syncing* status in the workspace header at all times.
25. **Explicit error explanations:** Error notifications must explain what went wrong and provide steps to resolve the issue.
26. **Identical dropdown styling:** Dropdown selections must use consistent border and background styling.
27. **Non-disruptive notifications:** Toast messages must not block content or interrupt user input tasks.
28. **System status visibility:** Heartbeat status displays must indicate connection states using color-coded badges.
29. **Muted labels for placeholder texts:** Muted text styles must be used only for input place holders and breadcrumbs.
30. **Clear grading state indicators:** Student records must clearly indicate whether they are *Pending*, *Graded*, or *Requires Revision*.

---

## 20. Reusable UI Component Inventory

```
+-----------------------------------------------------------------------------------+
|                            UI COMPONENT INVENTORY                                 |
+-----------------------------------------------------------------------------------+
|  1. Primary Button      |  6. Dropdown Select    | 11. Tab Bar                    |
|  2. Danger Button       |  7. Toggle Switch      | 12. Modal Overlay              |
|  3. Outline Button      |  8. Table Container    | 13. Progress Bar               |
|  4. Text Input Field    |  9. Sidebar Navigation | 14. Status Chip                |
|  5. Textarea Input      | 10. Breadcrumb Nav     | 15. Toast Indicator            |
+-----------------------------------------------------------------------------------+
```

### 20.1 Primary Button
*   **Purpose:** Triggers high-priority actions (e.g., Run, Submit, Save changes).
*   **Variants:** Standard primary, loading state (with spinner), and disabled state.
*   **States:** Default, hover, active, and focused.
*   **Dos:** Use sentence case; place buttons on the right side of dialog forms.
*   **Don'ts:** Do not use primary buttons for secondary actions like Cancel or Back.
*   **Accessibility:** Must maintain a minimum contrast ratio of 4.5:1 and feature high-visibility focus borders.

### 20.2 Text Input Field
*   **Purpose:** Collects single-line text inputs (e.g., user IDs, codes, names).
*   **Variants:** Text, password (with visibility toggle), and search input (with magnifying glass icon).
*   **States:** Default, active, validation error, validation success, and disabled.
*   **Dos:** Display clear placeholders; place validation messages directly below the input field.
*   **Don'ts:** Do not hide validation errors or display placeholder text that is hard to read.
*   **Accessibility:** Match input labels to input IDs; support logical keyboard focus tabs.

### 20.3 Dropdown Selector
*   **Purpose:** Allows users to choose one option from a list (e.g., language selection).
*   **Variants:** Standard selector and disabled.
*   **States:** Default, hover focus, list open, and option hover highlight.
*   **Dos:** Keep selections visible; use clear chevron indicators to show a menu can be opened.
*   **Don'ts:** Do not use dropdowns for lists with fewer than three options.
*   **Accessibility:** Support keyboard navigation using arrow keys, and allow selection using the Space or Enter key.
