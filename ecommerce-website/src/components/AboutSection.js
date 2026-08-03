import Image from "next/image";
import Link from "next/link";

const POINTS = [
  "Designed in-house and made in small batches, so nothing is mass-produced.",
  "Solid hardwood frames and natural fabrics — no particle board, ever.",
  "A ten-year structural warranty on every sofa and bed we sell.",
];

export default function AboutSection() {
  return (
    <section className="mt-20 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-200">
        <Image
          src="/images/site/about.jpg"
          alt="A sunlit apartment furnished with a dining table, red armchair and sofa"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
          About us
        </p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
          Furniture worth keeping
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-ink-500 sm:text-base">
          FURNICO started in a single workshop with one idea: make furniture
          good enough that nobody needs to replace it in three years. We work
          directly with the mills and workshops that build our pieces, which
          keeps the quality high and the price honest.
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {POINTS.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <path d="m5 13 4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm text-ink-500">{point}</span>
            </li>
          ))}
        </ul>

        <Link
          href="/about"
          className="mt-7 inline-block rounded-full bg-ink-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
        >
          Read our story
        </Link>
      </div>
    </section>
  );
}
