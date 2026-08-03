const FEATURES = [
  {
    title: "Free shipping",
    copy: "On every order over ₹20,000",
    icon: "M3 7h11v8H3V7Zm11 3h4l3 3v2h-7v-5ZM7 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  },
  {
    title: "24/7 support",
    copy: "Real people, not a chatbot",
    icon: "M4 13a8 8 0 0 1 16 0v4a3 3 0 0 1-3 3h-2m-11-7v3a2 2 0 0 0 2 2h1v-5H5a1 1 0 0 0-1 1Zm16-1h-1v5h1a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Z",
  },
  {
    title: "Secure payment",
    copy: "Encrypted end to end",
    icon: "M6 10V8a6 6 0 1 1 12 0v2m-13 0h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z",
  },
  {
    title: "Easy returns",
    copy: "30 days, no questions",
    icon: "M4 10a8 8 0 1 1 2 5.3M4 5v5h5",
  },
];

export default function FeatureStrip() {
  return (
    <section className="mt-20 rounded-3xl bg-white p-6 ring-1 ring-cream-300/70 sm:p-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="flex items-start gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d={feature.icon} />
              </svg>
            </span>
            <div>
              <h3 className="font-display text-sm font-semibold text-ink-900">
                {feature.title}
              </h3>
              <p className="mt-0.5 text-xs text-ink-400">{feature.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
