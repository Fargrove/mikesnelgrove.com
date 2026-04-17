# PRD: mikesnelgrove.com

## 1. Project Overview

Personal website for Michael Snelgrove, hosted on Cloudflare Pages. Originally created as a workshop resource host for NeuroBridge Consulting, the site is transitioning to a sandbox and experimentation space now that threenottwo.com has been purchased as the primary professional domain.

### 1.1 Premise

When the site launched in March 2026, it served two purposes: a root page with the NeuroBridge logo and a place to host digital resource packages for workshops (starting with the "Parenting in the Age of AI" workshop at John Oliver Secondary). With the Three Not Two rebrand and threenottwo.com as the company's home, mikesnelgrove.com no longer needs to be the professional face. It becomes a more useful space for prototyping, experimenting with web technologies, and testing ideas before they go live elsewhere.

### 1.2 Goal

Document the current state of the site, clarify its evolving purpose, and provide context for future development sessions.

### 1.3 Desired Outcomes

- A clear record of what exists on the site today
- Defined purpose as a sandbox/testing site with live workshop content
- Context for how this site relates to threenottwo.com and other projects

---

## 2. Current State

### 2.1 What Exists

| Route | Content | Status |
|---|---|---|
| `/` | Root page displaying the NeuroBridge logo | Live |
| `/workshops/` | Workshops index page linking to individual resource packages | Live |
| `/workshops/parenting-ai/` | Digital Resource Package for the "Parenting in the Age of AI" workshop (John Oliver Secondary, March 10, 2026) | Live |

### 2.2 Technical Setup

- **Domain:** mikesnelgrove.com (registered through Cloudflare)
- **Hosting:** Cloudflare Pages, auto-deploys from `main` branch
- **Repo:** `github.com/Fargrove/mikesnelgrove.com` (private)
- **Stack:** Static HTML, no build step, no dependencies
- **DNS:** Configured automatically through Cloudflare

### 2.3 Live Dependencies

The `/workshops/parenting-ai/` page is referenced by QR codes on printed materials (one-pager and slide deck for the JO workshop). These QR codes point directly to `mikesnelgrove.com/workshops/parenting-ai/` and cannot be changed after printing.

---

## 3. Direction

### 3.1 Primary Purpose: Sandbox and Experimentation

With threenottwo.com taking over as the professional site, mikesnelgrove.com becomes a space for:

- **Prototyping pages** - Testing designs and content before deploying to threenottwo.com or other projects
- **Learning and experiments** - Trying out static site generators, CSS frameworks, new web technologies, or layout ideas without consequences
- **Hosting workshop resources** - Continuing to serve live workshop content until it migrates to threenottwo.com

### 3.2 Workshop Content Migration

The existing workshop content (`/workshops/` and `/workshops/parenting-ai/`) will eventually move to threenottwo.com. No timeline for this yet. When migration happens, the mikesnelgrove.com URLs should redirect to the new locations (the QR codes on printed materials still need to work).

### 3.3 Tech Stack Evolution

The site is currently static HTML with no build step. As experimentation needs grow, a static site generator (e.g., Astro, 11ty) may be adopted. No rush on this - adopt when complexity warrants it.

---

## 4. Relationship to Other Projects

| Project | Location | Relationship |
|---|---|---|
| Three Not Two Branding | `~/Claude OS/Three Not Two/Branding/` | threenottwo.com will be the primary professional site. mikesnelgrove.com becomes the sandbox. |
| JO - Parenting in the Age of AI | `~/Claude OS/JO/Parenting in the Age of AI/` | The `/workshops/parenting-ai/` page was built for this workshop. QR codes on printed materials point here. |
| AI Education Initiative | `~/Claude OS/AI Education Initiative/` | Future workshops may initially prototype on mikesnelgrove.com before going to threenottwo.com. |
| NSNH - AI Readiness 2026 | `~/Claude OS/NSNH/AI Readiness 2026/` | No direct dependency. NSNH materials are delivered separately. |

---

## 5. Open Questions

1. **When should workshop content migrate to threenottwo.com?** Depends on when that site is built out. No urgency since the content works fine here.
2. **What happens to the NeuroBridge logo on the root page?** The rebrand to Three Not Two means the NeuroBridge logo is outdated. The root page needs updating, but to what?
3. **Should a static site generator be adopted?** Only when the site grows beyond what hand-written HTML handles comfortably. Not a decision needed now.
4. **How should redirects work after migration?** Cloudflare Pages supports `_redirects` files. When workshop content moves, set up 301 redirects so the QR code URLs keep working.

---

## 6. Timeline

No active deadlines. This is a documentation-first project. Future work happens as needed, driven by:

- The threenottwo.com buildout (which will clarify migration timing)
- New workshop engagements that need resource pages
- Experimentation and learning goals
