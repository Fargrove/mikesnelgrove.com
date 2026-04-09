# mikesnelgrove.com

## Project Overview

Personal website for Michael Snelgrove. Originally a workshop resource host for NeuroBridge Consulting, now transitioning to a **sandbox and experimentation site**. The primary professional site is moving to **threenottwo.com** (Three Not Two Consulting).

The site still hosts live workshop content that will eventually migrate to threenottwo.com.

## Hosting & Deployment

- **Domain:** mikesnelgrove.com (registered through Cloudflare)
- **Hosting:** Cloudflare Pages, auto-deploys from `main` branch
- **Repo:** `github.com/Fargrove/mikesnelgrove.com` (private)
- **Deploy:** Push to `main` on GitHub. No build commands or configuration needed.

## Tech Stack

- Static HTML, no build step, no dependencies
- Open to adopting a static site generator (Astro, 11ty, etc.) when complexity warrants it

## Site Structure

```
/                          → Root page (NeuroBridge logo — outdated, needs updating)
/workshops/                → Workshops index page
/workshops/parenting-ai/   → JO workshop digital resource package (live, QR codes point here)
```

## Key Files

| File | Purpose |
|---|---|
| `index.html` | Root page (currently shows NeuroBridge logo) |
| `NeuroBridge-Logo_trans_bg.png` | Logo image (will be replaced after rebrand) |
| `workshops/index.html` | Workshops listing |
| `workshops/parenting-ai/index.html` | JO workshop digital resource package |
| `PRD.md` | Project source of truth (current state, direction, open questions) |

## Live Dependencies

The `/workshops/parenting-ai/` page is referenced by QR codes on printed materials for the JO workshop. These URLs must keep working. When content migrates to threenottwo.com, set up 301 redirects via Cloudflare Pages `_redirects` file.

## Related Projects

| Project | Location | Relationship |
|---|---|---|
| Three Not Two Branding | `~/Claude OS/Three Not Two Branding/` | threenottwo.com is the professional site; this site is the sandbox |
| JO Workshop | `~/Claude OS/JO/Parenting in the Age of AI/` | Workshop resource page lives here |
| AI Education Initiative | `~/Claude OS/AI Education Initiative/` | Future workshops may prototype here first |

## Workspace Conventions

- **PRD.md** — detailed source of truth; update in place (statuses, decisions, research gaps)
- **CLAUDE.md** — concise session briefing; append a new SESSION HANDOFF each session, keep under 200 lines
- **Deliverable format:** Author in the repo directly (HTML, CSS, MD). No external build tools currently.
