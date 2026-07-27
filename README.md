# LabCode 🎓

LabCode is a lightweight, full-stack educational platform designed to streamline laboratory sessions. It provides an intuitive environment for students to write, execute, and submit code, while empowering faculty to evaluate, grade, and export these submissions efficiently.

## 🚀 Features

### For Students
*   **Live Code Execution:** Write and run code directly in the browser via Judge0 API integration.
*   **Interactive Dashboard:** A resizable split-pane editor featuring syntax highlighting.
*   **Customizable Theme:** Isolated Light/Dark mode switcher specifically for the code editor area.
*   **Organized Workspace:** Tabbed navigation for Code, Problem Description, and Observations.

### For Faculty
*   **Evaluation Dashboard:** View and evaluate all student submissions for assigned subjects.
*   **Grading & Feedback:** Assign marks and add observations directly to student submissions.
*   **PDF Export:** Generate and download single or bulk PDFs of student submissions, stamped with the faculty member's personalized signature.
*   **Signature Management:** Upload and manage faculty signatures locally for seamless document stamping.

## 🏗️ Architecture & Tech Stack

LabCode is built with a modern, decoupled architecture:

*   **Frontend:** Vanilla HTML, CSS, and JavaScript. No heavy frameworks, ensuring fast load times and a lightweight footprint.
*   **Backend:** Express.js (Node.js) REST API deployed on Render (`https://labcode-m4i3.onrender.com`).
*   **Database:** Supabase (PostgreSQL) (`https://brjugcqaznpgvfbcpnxl.supabase.co`).
*   **Code Execution Engine:** Public Judge0 API.
*   **PDF Generation:** `pdfkit` (Server-side).

## 📁 Project Structure

*   `login.html`: Unified authentication portal for students and faculty.
*   `index.html` (Student Dashboard): The primary interface for students to write and run code.
*   `faculty-home.html`: Faculty landing page to select subjects and sections.
*   `dashboard.html` (Faculty Dashboard): Interface for grading and exporting submissions.
*   `server.js`: The Express.js backend server handling code execution proxies, database interactions, and PDF generation.
*   `AI_AGENT_CONTEXT.md`: Crucial architectural context and handoff document for AI contributors.

## 🛠️ Setup & Installation

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd labcode
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory for any local database/API connections required by `server.js`. Ensure you have the necessary Supabase and Judge0 keys if running the backend locally.

4.  **Start the server:**
    ```bash
    npm start
    ```

5.  **Access the application:**
    Since it's a decoupled architecture, you might need to serve the frontend files (e.g., using a Live Server extension in VS Code) and ensure they point to your local backend server during development.

## 🤝 Contributing (For AI Agents & Developers)

**CRITICAL:** Every contributor, especially AI agents, MUST read `AI_AGENT_CONTEXT.md` before making any modifications. 
Whenever significant architectural changes, complex bug fixes, or new features are introduced, update the "Recent Changes by AI Agents" section in that document to maintain a clear project history.

## 📝 License
ISC
