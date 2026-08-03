import Image from "next/image";
import Link from "next/link";

const STATS = [
  { value: "1.3 M+", label: "Customer reviews" },
  { value: "4.7 M+", label: "Active members" },
  { value: "3 day", label: "Delivery time" },
];

/**
 * Full-bleed hero — it spans the whole viewport width rather than sitting
 * inside a bordered card, so the landing page opens on a full edge-to-edge
 * band of colour.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream-50">
      {/* Warm arc bleeding off the right edge, desktop only */}
      <div
        className="pointer-events-none absolute -right-40 -top-40 hidden h-[38rem] w-[38rem] rounded-full bg-brand-500 lg:block"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
        {/* Copy always comes first so the fold shows the message, not the photo */}
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-700">
            New collection
          </span>

          <h1 className="mt-5 font-display text-[2.5rem] font-semibold leading-[1.05] text-ink-900 sm:text-5xl lg:text-6xl">
            Make you
            <br />
            <span className="text-brand-500">feel luxury</span>
          </h1>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-500 sm:text-base">
            Sofas, chairs and lighting made from materials that age well —
            designed in-house, built to last, and delivered to your door in
            three days.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/products"
              className="rounded-full bg-brand-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600 hover:shadow-brand-500/35"
            >
              Shop now
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-cream-300 bg-white px-7 py-3.5 text-sm font-semibold text-ink-700 transition hover:border-brand-400 hover:text-brand-600"
            >
              Our story
            </Link>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-cream-300 pt-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="font-display text-xl font-semibold text-ink-900 sm:text-2xl">
                  {stat.value}
                </dt>
                <dd className="mt-0.5 text-xs leading-snug text-ink-400">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Fixed heights below lg keep the photo from swallowing the viewport */}
        <div className="relative h-64 overflow-hidden rounded-2xl bg-cream-200 shadow-2xl shadow-brand-900/10 sm:h-80 lg:h-auto lg:aspect-[5/6]">
          <Image
            src="/images/site/hero.jpg"
            alt="A mustard armchair beside a brass floor lamp in a bright modern room"
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
