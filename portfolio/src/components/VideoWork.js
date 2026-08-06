import { videoWork, links } from "@/data/site";

function PlayIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

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

export default function VideoWork() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 pb-10 sm:px-8">
      <div className="max-w-3xl py-10 sm:py-16">
        <p className="label text-accent">Video &amp; design</p>
        <h2 className="display mt-5 text-[clamp(2.25rem,7vw,5rem)]">
          {videoWork.headline}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
          {videoWork.summary}
        </p>
      </div>

      {/* The reel — the one thing a client actually wants to click */}
      <a
        href={links.drive}
        target="_blank"
        rel="noreferrer noopener"
        className="group block overflow-hidden rounded-xl border border-rule bg-card transition-colors hover:border-accent"
      >
        <div className="flex flex-col items-start gap-8 p-8 sm:p-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="label text-accent">Showreel</p>
            <h3 className="display mt-4 text-[clamp(2rem,6vw,4.5rem)]">
              Watch the
              <br />
              <span className="script lowercase">full</span> portfolio
            </h3>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Every edit, reel and design piece — hosted on Google Drive so you
              can scrub through the lot without an account.
            </p>
            <span className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-paper transition-opacity group-hover:opacity-85">
              Open the reel
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>

          <span
            aria-hidden="true"
            className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-rule transition-all duration-500 group-hover:scale-105 group-hover:border-accent group-hover:bg-accent sm:h-40 sm:w-40"
          >
            <PlayIcon className="h-8 w-8 translate-x-0.5 text-ink transition-colors duration-500 group-hover:text-paper sm:h-12 sm:w-12" />
          </span>
        </div>
      </a>

      {/* What I actually do */}
      <div className="mt-16 grid gap-px border border-rule bg-rule sm:grid-cols-2">
        {videoWork.services.map((service) => (
          <div
            key={service.n}
            className="group bg-paper p-8 transition-colors duration-300 hover:bg-card sm:p-10"
          >
            <span className="display text-3xl text-accent">{service.n}</span>
            <h3 className="display mt-4 text-2xl sm:text-3xl">{service.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {service.text}
            </p>
          </div>
        ))}
      </div>

      {/* Proof + tools */}
      <div className="mt-16 grid gap-12 border-t border-rule pt-12 lg:grid-cols-2">
        <div>
          <p className="label text-muted">Where the work lives</p>
          <ul className="mt-6 space-y-5">
            {videoWork.proof.map(([title, text]) => (
              <li key={title} className="border-t border-rule pt-5">
                <p className="display text-2xl sm:text-3xl">{title}</p>
                <p className="mt-1.5 text-[15px] text-muted">{text}</p>
              </li>
            ))}
          </ul>
          <a
            href={links.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper"
          >
            @hari.edz on Instagram
            <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div>
          <p className="label text-muted">Tools</p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {videoWork.tools.map((tool) => (
              <li
                key={tool}
                className="display rounded-full border border-rule px-5 py-2.5 text-xl sm:text-2xl"
              >
                {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
