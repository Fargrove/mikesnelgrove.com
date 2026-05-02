# Product Requirements Document: WC Pool 2026

## Overview
A web application for users to participate in a World Cup 2026 prediction pool. The application is divided into two distinct phases: Group Stage picks and Knockout Stage picks.

## Target Audience
Friends, family, and colleagues participating in a friendly World Cup prediction competition.

## Technical Stack
- **Frontend**: React.js with Vite
- **Styling**: Tailwind CSS
- **Backend & Storage**: Cloudflare D1 (Serverless SQL) or Cloudflare KV, with Cloudflare Workers or Pages for API/Hosting. User Authentication via Cloudflare Access or a simple custom JWT implementation.
- **Data Source**: Initial data mapped from JSON (extracted from provided specs/Wikipedia), representing the real 2026 format (48 teams, 12 groups).

## Features
### Phase 1: Group Stage (Current)
- Display all 12 groups (A-L) with their respective 4 teams.
- Allow users to select the outcome of each group stage match (Team 1 Win, Draw, Team 2 Win).
- **Score Prediction**: Allow users to input the exact score prediction for each match alongside their win/draw/loss selection.
- Visual progress indicator tracking how many picks have been made.

### Phase 2: Knockout Stage (March Madness Style)
- Occurs *after* the real-world group stage finishes. The actual Round of 32 teams will be known.
- Users fill out the entire 32-team bracket in one shot before the knockout round begins.
- Users pick winners from the Round of 32 all the way to the Champion. 
- Fast turnaround time required for submissions.

### Phase 3: Bonus Picks & Submission
- Provide a section for "Bonus Picks" (e.g., top goalscorer, team with most goals).
- Final review and submission of the completed picks.

### Phase 4: Admin & Live Standings
- User login system to track and submit individual picks.
- Master Admin Dashboard to view all participant submissions.
- Live public dashboard showing current participant standings based on real-world match results.
