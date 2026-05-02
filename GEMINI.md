# WC Pool 2026 Project
**Description**: A modern, interactive web application to manage a World Cup 2026 prediction pool.

## Architecture
- **Frontend**: React 19 + Vite, styled with Tailwind CSS
- **Backend & Storage**: Cloudflare Workers/Pages with D1 (Serverless SQL) for free-tier hosting and database storage.
- **State Management**: React `useState` for current picks (winners and exact scores), with dynamic progression calculation.

## Coding Standards & Preferences
- **Aesthetics**: Premium, dark-mode glassmorphic design with vibrant cyan/blue gradients. Use modern micro-animations and avoid generic Tailwind colors.
- **Componentization**: Break down the UI into logical, reusable components (e.g., `GroupCard`, `Bracket`).
- **Data Integrity**: Hardcoded realistic 2026 World Cup groups/schedule data rather than the legacy 2022 spreadsheet data.

## Project Structure
- `/src/App.jsx`: Main frontend application logic and UI.
- `/src/index.css`: Tailwind directives and custom animations (e.g., shimmer effect).
- `/src/real_app_data.json`: Validated 2026 group structures and match schedules.
- `/src/components/KnockoutBracket.jsx`: Interactive CSS Grid-based tournament bracket.
- `/functions/api/`: Cloudflare Pages functions for handling auth and database (`picks.js`, `me.js`).
- `/schema.sql`: D1 database schema for users and picks.

## Goals & Objectives
1. Build an interactive UI for users to select Group Stage match outcomes and exact scores. (Done)
2. Develop a "March Madness" style 32-team Knockout Stage bracket for users to fill out entirely. (Done)
3. Set up Cloudflare Access for secure, email-based user authentication. (Done)
4. Build backend endpoints via Cloudflare D1 to store user submissions. (Done)
5. Define scoring rules and build the Standings / Leaderboard view. (Pending)
6. Set up a Cloudflare Cron Trigger to automatically fetch real-world scores via API. (Pending)
