import Image from "next/image";
import Link from "next/link";
import FeatureStrip from "@/components/FeatureStrip";
import ContactCTA from "@/components/ContactCTA";

export const metadata = {
  title: "About us — FURNICO",
};

const VALUES = [
  {
    title: "Materials first",
    copy: "Solid hardwood frames, natural fibres and real metal hardware. If a piece cannot be repaired, we do not sell it.",
  },
  {
    title: "Made in small batches",
    copy: "We produce in runs of a few hundred, working with the same handful of workshops for years rather than chasing the cheapest quote.",
  },
  {
    title: "Priced honestly",
    copy: "No inflated list price waiting for a sale. You pay close to what the piece costs to make, plus a margin we can explain.",
  },
];

const MILESTONES = [
  { year: "2019", text: "Started in a single workshop with three sofa designs." },
  { year: "2021", text: "Opened our first showroom and passed 100,000 orders." },
  { year: "2023", text: "Introduced the ten-year structural warranty." },
  { year: "2026", text: "Serving 4.7 million members across the country." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            About us
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight text-ink-900 sm:text-5xl">
            We make furniture
            <br />
            <span className="text-brand-500">worth keeping</span>
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-500 sm:text-base">
            FURNICO began in 2019 with one workshop, three sofa designs and a
            frustration with furniture that falls apart in three years. Seven
            years later the idea has not changed — build things properly, sell
            them at a fair price, and stand behind them for a decade.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Shop the collection
            </Link>
            <Link
              href="/#contact"
              className="rounded-full border border-cream-300 px-7 py-3 text-sm font-semibold text-ink-600 transition hover:border-brand-400 hover:text-brand-600"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-200">
          <Image
            src="/images/site/about.jpg"
            alt="A sunlit apartment furnished with a dining table, red armchair and sofa"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
          What we care about
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {VALUES.map((value, i) => (
            <div
              key={value.title}
              className="rounded-2xl bg-white p-6 ring-1 ring-cream-300/70"
            >
              <span className="font-display text-3xl font-semibold text-brand-200">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold text-ink-900">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                {value.copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
          How we got here
        </h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MILESTONES.map((milestone) => (
            <li
              key={milestone.year}
              className="rounded-2xl border-l-2 border-brand-500 bg-white p-5 ring-1 ring-cream-300/70"
            >
              <p className="font-display text-lg font-semibold text-brand-600">
                {milestone.year}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-500">
                {milestone.text}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <FeatureStrip />
      <ContactCTA />
    </div>
  );
}
