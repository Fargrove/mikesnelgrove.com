# WC Pool 2026 — Project Context

> **Shared memory file**: `GEMINI.md` is a symlink to this file — Claude and Gemini both read from `CLAUDE.md` as the single source of truth.

## Repo & Hosting
- **GitHub**: `Fargrove/mikesnelgrove.com` (branch: `wc-pool-2026`, merged to `main` for production)
- **Local path**: `/Users/michael/Claude OS/mikesnelgrove.com`
- **Cloudflare Pages project**: `mikesnelgrove-com`
- **Live URL**: `wc.mikesnelgrove.com` / `wcpool.mikesnelgrove.com`
- **Auth**: Cloudflare Zero Trust / Access (email one-time-code, already live)

## Tech Stack
- React 19 + Vite → `npm run build` → `dist/`
- Tailwind CSS
- Cloudflare Pages (hosting) + Pages Functions (`/functions/api/`) for backend
- Cloudflare D1 database (`wc-pool-2026-db`, id: `559e5c16-6078-4063-b820-e6bb768711c2`)
- Schema defined in `schema.sql`

## Key Files
- `src/App.jsx` — main UI logic
- `src/real_app_data.json` — 2026 WC group/match data (48 teams, 12 groups, verified)
- `src/components/KnockoutBracket.jsx` — bracket component (built, not yet wired)
- `functions/api/me.js` — returns authenticated user info from CF Access headers
- `functions/api/picks.js` — GET/POST picks to D1 (not yet wired to frontend)
- `wrangler.toml` — CF Pages config; build command set in CF dashboard, NOT wrangler.toml

## Cloudflare Deployment Notes
- **Build command** must be set in Cloudflare dashboard (Settings > Build), NOT in wrangler.toml — `[pages_build_config]` is not a valid wrangler v3 field
- Production branch: `main`. Always merge `wc-pool-2026` → `main` to deploy.

---

## SESSION HANDOFF 2026-05-02:

### What Happened
- Diagnosed why `wc.mikesnelgrove.com` was serving old `main` content: WC Pool code was on `wc-pool-2026` branch (Cloudflare Preview), not `main` (Production).
- Merged `wc-pool-2026` → `main` and pushed to GitHub → triggered Cloudflare production deploy.
- Two failed deployments: (1) `[pages_build_config]` is invalid in wrangler v3 — silently ignored; (2) build command must live in the Cloudflare dashboard, not wrangler.toml.
- Fixed by setting `npm run build` + `dist` in CF dashboard (Settings > Build > Build configuration), then triggering a fresh deploy via empty commit.
- Site is now live and protected by Cloudflare Zero Trust (email OTP auth gate confirmed working).
- Drafted handoff email to Dan Sankar in Gmail (saved as draft, not sent).

### Open Issues / Blockers
- Picks are not yet saved to D1 — `functions/api/picks.js` exists but frontend doesn't call it.
- User display name registration flow is not built yet (only email identity from CF Access token).

### Next 3 Priorities
1. **Wire auth → display name**: Read `CF-Access-Authenticated-User-Email` header in `me.js`, check D1 for existing display name, prompt first-time users to register one.
2. **Wire picks to D1**: On each pick change in `App.jsx`, POST to `/api/picks`; on load, GET picks and hydrate state.
3. **Knockout bracket**: Connect `KnockoutBracket.jsx` into the main flow, enable after group stage deadline.
