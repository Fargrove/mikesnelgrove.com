# CLAUDE.md — mikesnelgrove.com

---

## Project Overview

Personal website for Mike Snelgrove, hosted on Cloudflare Pages with automatic deployment from GitHub.

- **Domain:** mikesnelgrove.com (registered through Cloudflare)
- **Hosting:** Cloudflare Pages, auto-deploys from `main` branch
- **Repo:** `github.com/Fargrove/mikesnelgrove.com` (private)
- **Stack:** Static HTML, no build step

---

## Site Structure

```
/                          → Root page (NeuroBridge logo)
/workshops/                → Workshops index page
/workshops/parenting-ai/   → Digital Resource Package for JO parent workshop
```

---

## History

- **2026-03-08:** Site created. Initially planned for Google Sites, switched to Cloudflare Pages for simplicity and GitHub auto-deploy. Domain purchased through Cloudflare (DNS configured automatically). Root page shows the NeuroBridge logo. Workshops index page links to individual workshop resource packages.
- **2026-03-08:** Digital Resource Package for the "Parenting in the Age of AI" workshop (John Oliver Secondary, March 10, 2026) published at `/workshops/parenting-ai/`. Contains workshop recap, scenario cards, how AI works explainer, recommended watching/reading, BC education guidance, and crisis resources. QR code pointing to this page is embedded in the printed one-pager and slide deck for that workshop.

---

## Key Files

| File | Purpose |
|---|---|
| `index.html` | Root page (NeuroBridge logo) |
| `NeuroBridge-Logo_trans_bg.png` | Logo image |
| `workshops/index.html` | Workshops listing |
| `workshops/parenting-ai/index.html` | JO workshop digital resource package |

---

## Deployment

Push to `main` on GitHub. Cloudflare Pages picks it up automatically. No build commands or configuration needed.
