import Link from "next/link";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/products" },
      { label: "Sofas", href: "/products?category=Sofas" },
      { label: "Chairs", href: "/products?category=Chairs" },
      { label: "Lighting", href: "/products?category=Lighting" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/#contact" },
      { label: "Cart", href: "/cart" },
      { label: "Sign up", href: "/signup" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", d: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM17.5 6.5h.01" },
  { label: "Twitter", d: "M21 5.9a7.5 7.5 0 0 1-2.1.6 3.7 3.7 0 0 0 1.6-2 7.4 7.4 0 0 1-2.3.9 3.7 3.7 0 0 0-6.3 3.4A10.5 10.5 0 0 1 4.3 4.9a3.7 3.7 0 0 0 1.1 4.9 3.7 3.7 0 0 1-1.7-.5 3.7 3.7 0 0 0 3 3.6 3.7 3.7 0 0 1-1.7.1 3.7 3.7 0 0 0 3.5 2.6A7.5 7.5 0 0 1 3 17.2a10.5 10.5 0 0 0 5.7 1.7c6.8 0 10.6-5.7 10.6-10.6v-.5A7.5 7.5 0 0 0 21 5.9Z" },
  { label: "Pinterest", d: "M12 3a9 9 0 0 0-3.3 17.4c-.1-.7-.2-1.9 0-2.7l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.9 0 1.3.6 1.3 1.4 0 .9-.5 2.2-.8 3.4-.3 1 .5 1.9 1.5 1.9 1.8 0 3.2-1.9 3.2-4.7 0-2.4-1.8-4.1-4.3-4.1a4.5 4.5 0 0 0-4.7 4.5c0 .9.3 1.9.8 2.4l.1.4-.3 1c0 .2-.2.3-.4.2-1.4-.7-2.2-2.7-2.2-4.3 0-3.5 2.5-6.7 7.3-6.7 3.8 0 6.8 2.7 6.8 6.4 0 3.8-2.4 6.9-5.7 6.9a3 3 0 0 1-2.5-1.3l-.7 2.6c-.2 1-.9 2.2-1.4 2.9A9 9 0 1 0 12 3Z" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-cream-300/70 bg-cream-50">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-ink-900"
            >
              FURNI<span className="text-brand-500">CO</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-500">
              Modern furniture built from solid materials, designed in-house and
              delivered in three days.
            </p>

            <div className="mt-5 flex gap-2">
              {SOCIALS.map((social) => (
                <span
                  key={social.label}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-500 ring-1 ring-cream-300 transition hover:bg-brand-500 hover:text-white hover:ring-brand-500"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d={social.d} />
                  </svg>
                </span>
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-sm font-semibold text-ink-900">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-500 transition hover:text-brand-600"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream-300 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ink-400">
            &copy; {new Date().getFullYear()} FURNICO. Portfolio demo — no real
            payments are processed.
          </p>
          <p className="text-xs text-ink-400">
            Built with Next.js, Tailwind CSS &amp; MongoDB.
          </p>
        </div>
      </div>
    </footer>
  );
}
