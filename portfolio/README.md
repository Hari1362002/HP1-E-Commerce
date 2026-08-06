# Hariprasath E — Portfolio

Two sides of the same person behind one switch:

| Route | What it shows | Palette |
|---|---|---|
| `/` | Development work — four shipped projects | Paper, ink, hot orange |
| `/video` | Video editing & graphic design | Dark, cinema, yellow |

**Stack:** Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · no database, no API

---

## The one file you'll actually edit

Everything written on the site — copy, links, project points, skills, timeline —
lives in [`src/data/site.js`](./src/data/site.js). Change it there and the whole
site updates. No component edits needed.

### Adding the live project links

Each project has a `live` field, currently empty:

```js
{
  slug: "autospare",
  live: "",   // ← paste the deployed URL here
  code: "https://github.com/Hari1362002/...",
}
```

Leave it `""` and the card shows **View code** only. Fill it in and a **Live
site** button appears next to it, and the browser-frame caption above the
screenshot switches to the real domain.

### Replacing a screenshot

Drop a new PNG into `public/shots/` and point the project's `shot` field at it.
Shots are captured at 1440×900 and the card crops to 16:10 from the top.

---

## The type system

Four voices, each with one job — this is why the page reads as designed rather
than assembled:

| Voice | Font | Used for |
|---|---|---|
| Display | **Anton** | Every headline. Uppercase, tight, huge. `.display` |
| Counter-voice | **Instrument Serif** *italic* | The one word in a headline that shouldn't shout. `.script` |
| Body | **Inter** | Paragraphs and buttons |
| Meta | **JetBrains Mono** | Labels, years, stats captions. `.label` |

`.outline` renders display type as a stroke only — used on the second line of
the hero.

## The two palettes

Five tokens (`--paper`, `--ink`, `--muted`, `--rule`, `--accent`, `--card`) are
redefined under `html:has(.mode-video)`. Every component reads the tokens, so
neither one knows which mode it's in.

The mode wrapper is **server-rendered from the route**, so `/video` arrives dark
on the first paint — no theme script, no hydration mismatch, no flash.

---

## Run it

```bash
npm install
npm run dev
```

Then <http://localhost:3000>.

## Deploy

Both routes are fully static — `next build` prerenders them.

```bash
npm run build
```

On [Vercel](https://vercel.com): import the repo, set the project's **root
directory** to `portfolio`, and deploy. No environment variables needed.

---

## Structure

```
src/
├── app/
│   ├── layout.js          Fonts, metadata
│   ├── page.js            "/"       → <Portfolio mode="dev" />
│   ├── video/page.js      "/video"  → <Portfolio mode="video" />
│   └── globals.css        Tokens, type classes, marquee
├── components/
│   ├── Portfolio.js       Shell — picks the palette and the work section
│   ├── Nav.js             Wordmark, the switch, contact
│   ├── Hero.js            Statement, portrait, the two doors
│   ├── DevWork.js         → ProjectCard ×4
│   ├── ProjectCard.js     Screenshot, 3 points, stats, stack, links
│   ├── VideoWork.js       Showreel, services, tools
│   ├── About.js           Bio, timeline, skills, certifications
│   ├── Contact.js         Email, socials, both résumés
│   └── Marquee.js         The ticker
└── data/site.js           ← all copy and links
```

`public/` holds the portrait, the four project screenshots and both résumé PDFs.
