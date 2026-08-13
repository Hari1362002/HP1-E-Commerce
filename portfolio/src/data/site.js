/**
 * Every piece of copy and every link on the site lives here.
 * Edit this one file to update the portfolio — no component changes needed.
 */

export const profile = {
  name: "Hariprasath E",
  first: "Hariprasath",
  // One per tab — the caption under the portrait names the craft you came for.
  title: "Full Stack Developer",
  videoTitle: "Video Editor & Designer",
  roles: ["Full Stack Developer", "Video Editor"],
  location: "Coimbatore, India",
  email: "hp8706325@gmail.com",
  phone: "+91 96009 31833",
  phoneHref: "tel:+919600931833",
  // Background lifted out, so the display type can sit behind him.
  photo: "/hari-cutout.png",
  bio: [
    "An MCA graduate who builds the whole stack and cuts the video. Freelance work for real businesses, plus my own storefronts, dashboards and browser tools — and the reels that sell them. I work remotely, so where you are makes no difference.",
    "Every project here started the same way: watch how people actually use the thing, find where they get stuck, then build only what removes the friction.",
  ],
};

// Share-tracking parameters stripped — they carry referrer data and expire.
export const links = {
  github: "https://github.com/Hari1362002",
  linkedin: "https://www.linkedin.com/in/hariprasath13",
  instagram: "https://www.instagram.com/hari.edz",
  drive:
    "https://drive.google.com/drive/folders/1Sv-_ZzIGfErRDdVmAFCu4ad6Q5sCZ9ag?usp=share_link",
};

export const resumes = [
  {
    label: "Frontend Developer",
    file: "/resume/Hariprasath-Frontend-Developer.pdf",
    meta: "PDF · 1 page",
  },
  {
    label: "Video Editor & Designer",
    file: "/resume/Hariprasath-Video-Editor-Graphic-Designer.pdf",
    meta: "PDF · 1 page",
  },
];

/**
 * Projects.
 *
 * `kind`   — "freelance" for paid client work, "personal" for self-directed
 *            builds. The work section groups on this, and client work leads.
 * `live`   — deployed URL. Leave "" and the card drops the button rather
 *            than shipping a dead link.
 * `points` — three of them, always in the same order:
 *   1. Analysis — what I looked at before writing anything
 *   2. R&D      — what I tested, measured or figured out
 *   3. Build    — what actually shipped
 */
export const projects = [
  {
    slug: "emas",
    kind: "freelance",
    index: "01",
    title: "EMAS Organic",
    kicker: "Wellness storefront & dealer portal",
    client: "EMAS — Organic · Naturals · Ayurveda",
    year: "2026",
    shot: "/shots/emas.png",
    live: "https://hari1362002.github.io/emas1/",
    stack: ["React", "Vite", "Tailwind CSS", "React Router"],
    summary:
      "A honey and ayurveda brand that sells two ways at once — direct to shoppers, and through a dealer network that needs its own rules in writing.",
    points: [
      {
        label: "Analysis",
        text: "Two audiences, one site. Shoppers want the product; dealers want the package, the ethics code and the rules. Mixing them buries both.",
      },
      {
        label: "R&D",
        text: "Split the routes — storefront on one path, dealer and policy pages on another — so each audience gets a straight run without the other's content in the way.",
      },
      {
        label: "Build",
        text: "Hero slider, category grid, product grid, certifications and dealer packages as separate components. Ships to GitHub Pages, so hosting costs the client nothing.",
      },
    ],
    stats: [
      ["2", "Audiences, one site"],
      ["ISO 9001", "Certified brand"],
      ["₹0", "Hosting cost"],
    ],
  },
  {
    slug: "sds",
    kind: "freelance",
    index: "02",
    title: "SDS Technologies",
    kicker: "IT services & training institute",
    client: "SDS Technologies, Palani",
    year: "2026",
    shot: "/shots/sds.png",
    live: "https://hari1362002.github.io/sds-technologies/",
    stack: ["React", "Vite", "Three.js", "Tailwind CSS"],
    summary:
      "An agency that also teaches and hires — three different visitors landing on one homepage.",
    points: [
      {
        label: "Analysis",
        text: "Someone arrives wanting work done, wanting to learn, or wanting a job. One generic “contact us” served none of the three.",
      },
      {
        label: "R&D",
        text: "Split the nav by intent — services, courses, careers — so each visitor gets their own track and their own call to action instead of a shared form.",
      },
      {
        label: "Build",
        text: "A Three.js hero that turns a phone in real time over the brand gradient, intent-led sections beneath it, and WhatsApp pinned on every screen — how local clients actually make contact.",
      },
    ],
    stats: [
      ["3", "Visitor intents"],
      ["3D", "Real-time hero"],
      ["1 tap", "To WhatsApp"],
    ],
  },
  {
    slug: "autospare",
    kind: "freelance",
    index: "03",
    client: "Thirumalai Autospare World",
    title: "Thirumalai Autospare World",
    kicker: "Two-wheeler parts storefront",
    year: "2026",
    shot: "/shots/autospare.png",
    live: "https://thirumalai-autospare.vercel.app",
    stack: ["HTML", "CSS", "JavaScript", "No build step"],
    summary:
      "Pick your bike brand, pick your model, see only the parts that actually fit it.",
    points: [
      {
        label: "Analysis",
        text: "Real parts counters work one way — the customer names their bike, not a part number. Every online catalogue I checked forced the opposite.",
      },
      {
        label: "R&D",
        text: "Made fitment a rule instead of a list. 70 part templates expand across 57 bike models, with exclusions, to generate ~3,060 honest SKUs.",
      },
      {
        label: "Build",
        text: "Brand → model → fitting parts, in three clicks. Plain JS, zero dependencies, so it costs nothing to host and loads instantly.",
      },
    ],
    stats: [
      ["3,060+", "SKUs generated"],
      ["57", "Bike models"],
      ["0", "Dependencies"],
    ],
  },
  {
    slug: "ecommerce",
    kind: "personal",
    index: "04",
    title: "HP Store",
    kicker: "Furniture e-commerce",
    year: "2026",
    shot: "/shots/ecommerce.png",
    live: "https://hp-1-e-commerce.vercel.app",
    stack: ["Next.js 16", "React", "Tailwind v4", "MongoDB", "JWT"],
    summary:
      "A full storefront — catalogue, wishlist, cart and a checkout you can't reach logged out.",
    points: [
      {
        label: "Analysis",
        text: "Shoppers browse in the grid. Every tap that yanked them to a product page and back was a tap that lost them.",
      },
      {
        label: "R&D",
        text: "Tested add-to-cart and wishlist controls that sit on the card and never navigate — revealed on hover, always visible on touch.",
      },
      {
        label: "Build",
        text: "23 products over 7 categories, hashed passwords with httpOnly JWT sessions, and a checkout that sends guests to log in then returns them.",
      },
    ],
    stats: [
      ["23", "Products"],
      ["7", "Categories"],
      ["2-up → 4-up", "Responsive grid"],
    ],
  },
  {
    slug: "dashboard",
    kind: "personal",
    index: "05",
    title: "Daily",
    kicker: "Expenses · Tasks · Fitness",
    year: "2026",
    shot: "/shots/dashboard.png",
    live: "https://daily-hp.vercel.app",
    stack: ["Next.js", "React", "Tailwind", "MongoDB"],
    summary:
      "Three trackers most people abandon, folded into one page that never reloads.",
    points: [
      {
        label: "Analysis",
        text: "Three separate apps for money, tasks and workouts mean three habits to keep. Almost nobody keeps all three.",
      },
      {
        label: "R&D",
        text: "Made tab switching pure client state rather than routing, so moving between sections costs nothing and the day stays in view.",
      },
      {
        label: "Build",
        text: "One warm editorial theme across all three panels, a tab bar on desktop that becomes a fixed bottom nav on mobile.",
      },
    ],
    stats: [
      ["3", "Trackers, one page"],
      ["0ms", "Tab navigation"],
      ["Full CRUD", "On every panel"],
    ],
  },
  {
    slug: "resizer",
    kind: "personal",
    index: "06",
    title: "Image Toolkit",
    kicker: "Resize · Scan · PDF",
    year: "2026",
    shot: "/shots/resizer.png",
    live: "https://hari1362002.github.io/image-resizer/",
    stack: ["Vanilla JS", "Canvas API", "PWA", "Offline"],
    summary:
      "Shrink photos, straighten a page shot at an angle, merge it all into one PDF — without a single upload.",
    points: [
      {
        label: "Analysis",
        text: "Upload forms cap file size, so people hand their documents to random websites just to lose a few hundred KB.",
      },
      {
        label: "R&D",
        text: "Did the whole pipeline on canvas in the browser — multi-step downscaling to keep edges sharp, and a binary search on quality to land just under a target KB.",
      },
      {
        label: "Build",
        text: "Perspective correction, scan filters, batch export and multi-page PDF. Installable as a PWA, works with no network at all.",
      },
    ],
    stats: [
      ["0", "Bytes uploaded"],
      ["3", "Tools, one image list"],
      ["Offline", "Installable PWA"],
    ],
  },
];

export const videoWork = {
  headline: "Cuts that hold attention past the third second.",
  summary:
    "Short-form reels, YouTube edits and social graphics — from the shot list to the colour grade to the caption card.",
  services: [
    {
      n: "01",
      title: "Short-form reels",
      text: "Instagram and YouTube Shorts — paced for the scroll, cut on the beat, captions that stay readable on mute.",
    },
    {
      n: "02",
      title: "Colour grading",
      text: "DaVinci Resolve for correction and look development, so footage from different phones still cuts together.",
    },
    {
      n: "03",
      title: "Motion & titles",
      text: "After Effects for lower thirds, kinetic type and the small movements that make a static frame feel alive.",
    },
    {
      n: "04",
      title: "Graphic design",
      text: "Posters, event banners and social sets in Figma and Canva — one type system across the whole campaign.",
    },
  ],
  tools: [
    "DaVinci Resolve",
    "Premiere Pro",
    "After Effects",
    "Figma",
    "Canva",
    "Photoshop",
  ],
  proof: [
    ["@hari.edz", "My own reel page — every edit cut by me"],
    ["College events", "Posters, banners and social sets"],
    ["Short form", "Reels, YouTube edits, promo cuts"],
  ],
};

/**
 * Skills are per-tab. Someone hiring an editor does not need to read about
 * MongoDB, and the coding list only dilutes the video case.
 */
export const skills = {
  dev: [
    {
      group: "Frontend",
      items: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Tailwind CSS"],
    },
    {
      group: "Backend & data",
      items: ["Node.js", "Express", "MongoDB", "MySQL", "SQL", "REST APIs"],
    },
    {
      group: "Tooling",
      items: ["Git & GitHub", "Vite", "Vercel", "Figma", "Power BI"],
    },
    {
      group: "Craft",
      items: [
        "Responsive layout",
        "Performance",
        "Accessibility",
        "Component design",
      ],
    },
  ],
  video: [
    {
      group: "Editing",
      items: ["DaVinci Resolve", "Premiere Pro", "After Effects"],
    },
    {
      group: "Design",
      items: ["Figma", "Photoshop", "Canva"],
    },
    {
      group: "Craft",
      items: ["Colour grading", "Motion titles", "Short-form pacing", "Sound sync"],
    },
    {
      group: "Delivery",
      items: ["Reels & Shorts", "YouTube edits", "Promo cuts", "Social sets"],
    },
  ],
};

