# Deploying the portfolio

The site is two static pages (`/` and `/video`) with **no environment variables
and no database**, so any host works. These are the two routes worth using.

---

## Path A — Vercel CLI (fastest, ~2 minutes)

Use this to get a URL right now. No GitHub push needed.

### 1. Log in

```bash
cd "/Users/hariprasath/Desktop/Portfolio Websites/portfolio" && npx vercel login
```

A list appears — pick **Continue with GitHub** (arrow keys, then Enter). The
browser opens; approve it there and come back to the terminal.

### 2. Deploy

```bash
cd "/Users/hariprasath/Desktop/Portfolio Websites/portfolio" && npx vercel --prod
```

Answer the prompts:

| Prompt | Answer |
|---|---|
| Set up and deploy "…/portfolio"? | `Y` |
| Which scope should contain your project? | your own account |
| Link to existing project? | `N` |
| What's your project's name? | `hariprasath` ← this becomes the URL |
| In which directory is your code located? | `./` |
| Want to modify these settings? | `N` — Next.js is auto-detected |

The production URL prints at the end: `https://hariprasath.vercel.app`.

### 3. Re-deploying later

After any change, one command:

```bash
cd "/Users/hariprasath/Desktop/Portfolio Websites/portfolio" && npx vercel --prod
```

---

## Path B — GitHub import (auto-deploys on every push)

Slower to set up, but then every `git push` publishes itself. Better long-term.

### 1. Get the code onto GitHub's main branch

The portfolio currently sits on the `portfolio-site` branch. Vercel builds the
production branch — `main` — so merge and push first:

```bash
cd "/Users/hariprasath/Desktop/Portfolio Websites" && git checkout main && git merge portfolio-site && git push origin main
```

### 2. Import on Vercel

1. Go to **[vercel.com/new](https://vercel.com/new)**
2. **Import Git Repository** → pick `Hari1362002/HP1-E-Commerce`
3. **Root Directory** → click *Edit* → choose **`portfolio`**
   — this is the step people miss. The repo root holds several projects; without
   it Vercel builds the wrong one.
4. Framework Preset should already read **Next.js**. Leave the build settings alone.
5. Environment Variables — **none needed**.
6. **Deploy**

From then on, any push to `main` that touches `portfolio/` rebuilds the site.

---

## Custom domain

Once a domain is bought (Namecheap, GoDaddy, Cloudflare — ~₹800/year for `.dev`):

1. Vercel project → **Settings → Domains → Add**
2. Enter the domain; Vercel shows the DNS records to create
3. Add those records at the registrar. Propagation is usually minutes.

Then update `metadataBase` in `src/app/layout.js` to match — it's what makes
link previews resolve correctly when the site is shared.

---

## Before sharing the link

- [ ] Fill in the four `live:` URLs in `src/data/site.js` so each project card
      shows its **Live site** button
- [ ] Check `links.linkedin` in the same file — it's currently a guess
      (`linkedin.com/in/hari`)
- [ ] Open `/video` on a phone and confirm the reel link opens
