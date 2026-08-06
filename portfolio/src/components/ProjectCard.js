import Image from "next/image";

function ArrowIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/** A screenshot reads as "a real website" once you put a browser around it. */
function BrowserFrame({ src, alt, host, priority }) {
  return (
    <div className="overflow-hidden rounded-xl border border-rule bg-card shadow-[0_24px_60px_-28px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-2 border-b border-rule px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
          <span className="h-2.5 w-2.5 rounded-full bg-rule" />
        </span>
        <span className="label mx-auto truncate text-muted">{host}</span>
      </div>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export default function ProjectCard({ project, flip, priority }) {
  const { index, title, kicker, year, shot, live, code, stack, summary, points, stats } =
    project;

  return (
    <article className="border-t border-rule py-14 sm:py-20">
      {/* Header row */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div className="flex items-baseline gap-4 sm:gap-6">
          <span className="display text-4xl text-accent sm:text-5xl">{index}</span>
          <div>
            <h3 className="display text-[clamp(1.75rem,5vw,3.5rem)]">{title}</h3>
            <p className="script mt-1 text-lg text-muted sm:text-xl">{kicker}</p>
          </div>
        </div>
        <span className="label text-muted">{year}</span>
      </div>

      <div
        className={`mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Screenshot */}
        <div className="lg:col-span-7">
          <BrowserFrame
            src={shot}
            alt={`${title} — homepage screenshot`}
            host={live ? live.replace(/^https?:\/\//, "") : `${title.toLowerCase().replace(/\s+/g, "-")}`}
            priority={priority}
          />

          {/* Stats strip */}
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-rule pt-6">
            {stats.map(([value, caption]) => (
              <div key={caption}>
                <dt className="display text-xl sm:text-2xl">{value}</dt>
                <dd className="label mt-1.5 text-muted">{caption}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* The thinking */}
        <div className="lg:col-span-5">
          <p className="text-lg leading-relaxed sm:text-xl">{summary}</p>

          <ol className="mt-8 space-y-6">
            {points.map((point, i) => (
              <li key={point.label} className="border-t border-rule pt-5">
                <div className="flex items-center gap-3">
                  <span className="label text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="label">{point.label}</span>
                </div>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                  {point.text}
                </p>
              </li>
            ))}
          </ol>

          {/* Stack */}
          <ul className="mt-8 flex flex-wrap gap-2">
            {stack.map((tech) => (
              <li
                key={tech}
                className="label rounded-full border border-rule px-3 py-1.5 text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Links */}
          <div className="mt-8 flex flex-wrap gap-3">
            {live && (
              <a
                href={live}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
              >
                Live site
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            <a
              href={code}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-2 rounded-full border border-ink px-6 py-3.5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
            >
              View code
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
