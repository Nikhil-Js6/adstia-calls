# Call Transcript Dashboard - Adstia

Overview
A frontend-only React single-page application built to browse, filter, and analyze static call transcript records. Features include composed filtering, frontend-only pagination, a responsive detail drawer, and a custom dark mode, all styled with Tailwind CSS.

Setup
To run this project locally from a clean clone:

Ensure you have Node.js installed.

Clone the repository and navigate into the project directory.

Install the dependencies:

Bash
npm install

Start the Vite development server:

Bash
npm run dev

Open http://localhost:5173 (or the port provided in your terminal) in your browser.

Challenges

Frontend-Only Pagination with Composed Filters: Since there is no backend database to handle LIMIT and OFFSET, coordinating the pagination logic alongside the search and outcome filters was an interesting challenge. I had to ensure that the data was fully filtered before calculating the .slice() for the current page, force the currentPage back to 1 whenever a user types a new search query or changes a dropdown and more importantly, maintain state consistency all over. This prevents the user from accidentally landing on an empty view if they apply a strict filter while on page 5.

State Management & Prop Drilling: Managing the dark/light theme state alongside the filter states without reaching for a heavy state-management library like Redux or Context API required careful component structuring. I kept the state lifted in App.tsx and cleanly passed it down to keep the UI predictable.

Data Typing: Forcing strict TypeScript types onto a raw, static JSON import took a bit of fine-tuning to ensure the outcome strings and timestamps were handled predictably across the table and drawer components.

AI Usage

I utilized AI tools (Gemini) during this assessment as a development co-pilot to accelerate my workflow:

Scaffolding & Styling: I used AI to quickly generate the repetitive HTML/Tailwind boilerplate for the Table structure and Drawer UI. I also used it to suggest the hexadecimal color pairs and opacity levels for the Outcome badges (Qualified, Rejected, etc.) to ensure clean contrast in both light and dark themes.

Debugging: I used it to quickly untangle a specific TypeScript typing issue when importing the raw calls.json file, and to double-check my frontend array .slice() math for the pagination controls.