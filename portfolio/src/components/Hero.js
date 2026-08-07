import Image from "next/image";
import Link from "next/link";
import { profile, projects, videoWork } from "@/data/site";
import Marquee from "./Marquee";

const freelanceCount = projects.filter((p) => p.kind === "freelance").length;

export default function Hero({ mode }) {
  const isDev = mode !== "video";

  return (
    <section id="top" className="mx-auto max-w-[1400px] px-5 pt-6 sm:px-8 sm:pt-10">
      {/* The hero is set as a printed page: ruled edges, meta in the margins,
          type and portrait sharing the plate rather than sitting in a row. */}
      <div className="poster px-5 py-8 sm:px-8 sm:py-12">
        {/* Masthead margin — the three things worth knowing before the name */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule pb-6">
          {profile.available ? (
            <p className="label flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              Available for work
            </p>
          ) : (
            <span className="label text-muted">Portfolio</span>
          )}
          <p className="label hidden text-muted sm:block">Portfolio · 2026</p>
          <p className="label text-muted">{profile.location}</p>
        </div>

        {/* Intro line */}
        <p className="rise mt-8 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-12 sm:text-lg">
          <span aria-hidden="true">👋</span> my name is{" "}
          <span className="text-ink">Hariprasath</span> and I am a{" "}
          <span className="script text-ink">frontend developer</span> and{" "}
          <span className="script text-ink">video editor</span>
        </p>

        {/* The statement. The portrait column pulls left on desktop so the
            plate reads as one composition instead of two boxes side by side. */}
        <div className="mt-6 grid items-end gap-8 sm:mt-8 lg:grid-cols-[minmax(0,1fr)_clamp(210px,21vw,290px)] lg:gap-0">
          <h1 className="display relative z-10 text-[clamp(3rem,11.5vw,9.5rem)]">
            <span className="block">Developer</span>
            <span className="block">
              <span className="script lowercase">&amp;</span>{" "}
              <span className="outline">Video&nbsp;Editor</span>
            </span>
          </h1>

          <figure className="relative z-0 mx-auto w-[58%] max-w-[240px] lg:mx-0 lg:-ml-10 lg:w-full lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden border border-rule">
              <Image
                src={profile.photo}
                alt={`${profile.name}, frontend developer and video editor`}
                fill
                priority
                sizes="(max-width: 1024px) 62vw, 22vw"
                className="portrait object-cover object-[38%_28%]"
              />
            </div>
            <figcaption className="label mt-3 text-muted">
              Hariprasath E — {profile.location}
            </figcaption>
          </figure>
        </div>

        {/* Footer margin — the pull quote, the count, and the two doors */}
        <div className="mt-10 grid gap-8 border-t border-rule pt-8 sm:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="display text-[clamp(1.5rem,3.5vw,2.5rem)]">
              Fewer clicks.
              <br />
              <span className="script lowercase">more</span> shipped.
            </p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
              based in {profile.location}. I build the front end, then cut the
              film that sells it.
            </p>
          </div>

          {/* The number that answers "has he actually done this before?" */}
          <div className="flex gap-8 lg:col-span-3">
            <div>
              <p className="display text-4xl text-accent sm:text-5xl">
                {String(freelanceCount).padStart(2, "0")}
              </p>
              <p className="label mt-2 text-muted">Client projects</p>
            </div>
            <div>
              <p className="display text-4xl sm:text-5xl">
                {String(projects.length).padStart(2, "0")}
              </p>
              <p className="label mt-2 text-muted">Shipped total</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <Link
              href="/"
              aria-current={isDev ? "page" : undefined}
              className={`rounded-full px-6 py-4 text-sm font-medium transition-all duration-300 sm:text-base ${
                isDev
                  ? "bg-ink text-paper"
                  : "border border-rule text-muted hover:border-ink hover:text-ink"
              }`}
            >
              You need a developer
            </Link>
            <Link
              href="/video"
              aria-current={!isDev ? "page" : undefined}
              className={`rounded-full px-6 py-4 text-sm font-medium transition-all duration-300 sm:text-base ${
                !isDev
                  ? "bg-ink text-paper"
                  : "border border-rule text-muted hover:border-ink hover:text-ink"
              }`}
            >
              You need an editor
            </Link>
          </div>
        </div>
      </div>

      {/* Skills ticker — swaps with the mode */}
      <div className="-mx-5 sm:-mx-8">
        <Marquee
          items={
            isDev
              ? [
                  "React",
                  "Next.js",
                  "JavaScript",
                  "Tailwind CSS",
                  "MongoDB",
                  "Node.js",
                  "MySQL",
                  "Figma",
                  "Responsive",
                  "Performance",
                ]
              : videoWork.tools.concat(["Reels", "Colour grade", "Motion titles"])
          }
        />
      </div>

      <p className="label py-6 text-muted">
        {isDev
          ? `${projects.length} shipped projects — screenshot, live link, and how each one was figured out`
          : "Reels, edits and design work — shot to grade to caption"}
      </p>
    </section>
  );
}
