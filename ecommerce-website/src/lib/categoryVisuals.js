const VISUALS = {
  Electronics: {
    gradient: "from-slate-800 to-teal-700",
    icon: "M13 2 3 14h9l-1 8 10-12h-9l1-8Z",
  },
  Bags: {
    gradient: "from-amber-700 to-amber-500",
    icon: "M6 7h12l1 13H5L6 7Zm3 0V5a3 3 0 0 1 6 0v2",
  },
  Footwear: {
    gradient: "from-indigo-700 to-indigo-400",
    icon: "M3 18c0-2 2-3 4-4l5-4 2 2-2 2c3 0 6 1 8 4v2H3v-2Z",
  },
  Home: {
    gradient: "from-rose-600 to-orange-400",
    icon: "M4 11 12 4l8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-9Z",
  },
  Accessories: {
    gradient: "from-fuchsia-700 to-pink-400",
    icon: "M12 4a4 4 0 0 1 4 4v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1V8a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v2h4V8a2 2 0 0 0-2-2Z",
  },
  Fitness: {
    gradient: "from-emerald-700 to-lime-500",
    icon: "M4 12h2v-3h3v3h6v-3h3v3h2m-16 3h16M6.5 9v6M17.5 9v6",
  },
};

const DEFAULT_VISUAL = {
  gradient: "from-slate-700 to-slate-500",
  icon: "M4 7h16M4 12h16M4 17h16",
};

export function getCategoryVisual(category) {
  return VISUALS[category] || DEFAULT_VISUAL;
}
