/**
 * Every piece of copy and every link on the site lives here.
 * Edit this one file to update the portfolio — no component changes needed.
 */

export const profile = {
  name: "Hariprasath E",
  first: "Hariprasath",
  roles: ["Frontend Developer", "Video Editor"],
  location: "Coimbatore, India",
  email: "hp8706325@gmail.com",
  phone: "+91 96009 31833",
  phoneHref: "tel:+919600931833",
  photo: "/hari.jpg",
  available: true,
  bio: [
    "MCA graduate who builds the front end and cuts the video. I ship real, working products — storefronts, dashboards, browser tools — and I edit the reels that sell them.",
    "Every project below started the same way: watch how people actually use the thing, find where they get stuck, then build only what removes the friction.",
  ],
};

export const links = {
  github: "https://github.com/Hari1362002",
  linkedin: "https://linkedin.com/in/hari",
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
 * `live` — paste the deployed URL here. Leave it as "" and the card simply
 * shows the code link instead of a broken button.
 *
 * `points` — three of them, always in the same order:
 *   1. Analysis — what I looked at before writing anything
 *   2. R&D      — what I tested, measured or figured out
 *   3. Build    — what actually shipped
 */
export const projects = [
  {
    slug: "autospare",
    index: "01",
    title: "Thirumalai Autospare World",
    kicker: "Two-wheeler parts storefront",
    year: "2026",
    shot: "/shots/autospare.png",
    live: "",
    code: "https://github.com/Hari1362002/HP1-E-Commerce/tree/main/thirumalai-autospare-world",
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
        text: "Brand → model → fitting parts, in three clicks. Plain JS, zero dependencies, so it hosts free and loads instantly.",
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
    index: "02",
    title: "HP Store",
    kicker: "Furniture e-commerce",
    year: "2026",
    shot: "/shots/ecommerce.png",
    live: "",
    code: "https://github.com/Hari1362002/HP1-E-Commerce/tree/main/ecommerce-website",
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
    index: "03",
    title: "Daily",
    kicker: "Expenses · Tasks · Fitness",
    year: "2026",
    shot: "/shots/dashboard.png",
    live: "",
    code: "https://github.com/Hari1362002/daily-hp",
    stack: ["Next.js", "React", "Tailwind", "MongoDB"],
    summary:
      "Three trackers most people abandon, folded into one page that never reloads.",
    points: [
      {
        label: "Analysis",
        text: "Three separate apps for money, tasks and workouts means three habits to keep. Almost nobody keeps all three.",
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
    index: "04",
    title: "Image Toolkit",
    kicker: "Resize · Scan · PDF",
    year: "2026",
    shot: "/shots/resizer.png",
    live: "",
    code: "https://github.com/Hari1362002/image-resizer",
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
    "Short-form reels, YouTube edits and social graphics — shot list to colour grade to the caption card.",
  services: [
    {
      n: "01",
      title: "Short-form reels",
      text: "Instagram and YouTube Shorts — paced for the scroll, cut on the beat, captions that stay readable on mute.",
    },
    {
      n: "02",
      title: "Colour & grade",
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
    ["@hari.edz", "Personal reel page, every edit self-cut"],
    ["College events", "Posters, banners and social sets"],
    ["Short form", "Reels, YouTube edits, promo cuts"],
  ],
};

export const skills = [
  {
    group: "Frontend",
    items: ["HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    group: "Backend & data",
    items: ["Node.js", "Express", "MongoDB", "MySQL", "SQL", "REST APIs"],
  },
  {
    group: "Design & video",
    items: ["Figma", "DaVinci Resolve", "Premiere Pro", "After Effects", "Canva"],
  },
  {
    group: "Analysis",
    items: ["Power BI", "Excel", "Google Sheets"],
  },
];

export const timeline = [
  {
    period: "2025",
    title: "Smart Subscription & Payment Management System",
    org: "Internship · DigiSquare",
    text: "Full-stack app for subscriptions and automated payments. React front end, Node/Express APIs, MySQL schema, Razorpay integration with real-time invoice generation.",
    tags: ["React.js", "Node.js", "MySQL", "Razorpay"],
  },
  {
    period: "2024",
    title: "Automated Bill Letter Generator",
    org: "MCA Department project",
    text: "Front end for real-time billing entry with inline validation, backed by SQL storage. Cut manual billing errors out of the department's workflow.",
    tags: ["HTML5", "CSS3", "JavaScript", "SQL"],
  },
  {
    period: "2023 – 2025",
    title: "Master of Computer Applications",
    org: "Bharathiar University, Coimbatore",
    text: "CGPA 6.5 / 10.",
    tags: [],
  },
  {
    period: "2020 – 2023",
    title: "Bachelor of Science",
    org: "Arulmigu Palaniandavar College of Arts and Culture, Palani",
    text: "CGPA 7.04 / 10.",
    tags: [],
  },
];

export const certifications = [
  ["Power BI", "Coursera · 2024"],
  ["Big Data Computing", "NPTEL · 2023"],
];
