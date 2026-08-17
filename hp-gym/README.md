# HP Gym

Website for a coached strength and conditioning gym in Singanallur, Coimbatore.
Dark athletic UI — near-black surfaces, one red accent, Anton display type.

Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies —
open `index.html` and it runs.

> **HP Gym is fictional.** The gym, its coaches, prices, address and phone
> numbers were invented for this portfolio piece. Every page says so in the
> footer. Do not present it as a real business.

---

## Pages

| File | What it does |
|---|---|
| `index.html` | Hero, marquee, stats, four lead programmes, why-us, member results, four coaches, three plans, testimonials, articles, CTA |
| `programmes.html` | Nine programmes filterable by category, the weekly class timetable, and how joining works |
| `trainers.html` | Eight coaches filterable by speciality, plus the hiring standard |
| `membership.html` | Three plans with a monthly/yearly toggle, add-on pricing table, what's included, six-question FAQ |
| `about.html` | The 2016 story, numbers, four values, nine-image facility gallery, equipment list |
| `contact.html` | Free-trial form, contact tiles, opening hours, OpenStreetMap embed |
| `404.html` | Not-found page with the routes people actually want |

Every page is self-contained — the header and footer are inlined rather than
injected by JavaScript, so the markup a crawler sees is the markup a visitor sees.

---

## The look

One stylesheet, `css/style.css`, driven by custom properties at the top. To
rebrand, change the tokens and nothing else.

```css
--bg:#0a0a0b;      /* page */
--panel:#141417;   /* cards */
--red:#e01b12;     /* the only accent */
--white:#f6f5f4;
--text:#a9a8ac;
```

Type is two families, loaded from Google Fonts:

- **Anton** — every heading, uppercase, tight leading. It carries the poster feel.
- **Inter** — body copy, labels, buttons. Labels run uppercase at `.14em` tracking.

Red is used for exactly three things: the primary button, the accent word in a
heading, and the one highlighted card in a group. Everywhere else the page is
black, grey and white — which is what makes the red read as loud.

---

## Behaviour

`js/main.js` is one IIFE, roughly 200 lines, no dependencies:

- **Mobile nav** — closes on the burger, a link, an outside tap, Escape, back/forward,
  and on resize past the breakpoint (it reads the burger's own computed `display`,
  so the check cannot drift from the stylesheet).
- **Header** — gains a background and blur past 12px of scroll.
- **Reveal on scroll** — `IntersectionObserver`, with a 4-second safety net that
  shows everything if the observer never fires.
- **Counters** — `data-count` animates once on entry, formatted `en-IN`, skipped
  under `prefers-reduced-motion`.
- **Filters** — one delegated handler drives both the programme and coach grids.
- **Price toggle** — each price carries `data-monthly` and `data-yearly`, so
  switching term is a text swap rather than a second copy of the table.
- **Forms** — validated client-side and answered inline. Nothing is sent anywhere.

Everything degrades: with JavaScript off, the reveal styles never apply, the nav
falls back to the desktop list, and every link still works.

---

## Images

All 34 photographs live in `images/` and are served from the repo — nothing is
hotlinked. They are free-licence photos from [Unsplash](https://unsplash.com),
cropped at download time to the aspect ratio each slot needs (`3:4` portraits for
coaches, `16:11` for cards, `2:1` for the CTA band).

---

## Running locally

No build step. Either open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8127
```

Then visit <http://localhost:8127>.

---

## Deploying

The site is static, so it works anywhere that serves files.

- **GitHub Pages** — it is already published from this repo at
  `/<repo>/hp-gym/`. All internal links are relative, so the subfolder path works
  without configuration.
- **Vercel / Netlify** — set the project root to `hp-gym` and deploy. `vercel.json`
  is included with cache headers (a year on assets, revalidate on HTML) and the
  usual security headers.

`robots.txt` and `sitemap.xml` both point at the GitHub Pages URL — change those
two files if you host it somewhere else.

---

## SEO notes

Each page carries its own title, description, keywords, canonical, Open Graph and
Twitter tags. Structured data covers the gym itself (`HealthAndBeautyBusiness`
with opening hours, geo and rating), breadcrumbs on the inner pages, and an
`FAQPage` block on `membership.html`.
