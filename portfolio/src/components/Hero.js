import Image from "next/image";
import Link from "next/link";
import { profile, projects, videoWork } from "@/data/site";
import Marquee from "./Marquee";

export default function Hero({ mode }) {
  const isDev = mode !== "video";

  return (
    <section id="top" className="relative overflow-hidden pt-10 sm:pt-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* Intro line */}
        <p className="rise max-w-xl text-[15px] leading-relaxed text-muted sm:text-lg">
          <span aria-hidden="true">👋</span> my name is{" "}
          <span className="text-ink">Hariprasath</span> and I am a{" "}
          <span className="script text-ink">frontend developer</span> and{" "}
          <span className="script text-ink">video editor</span>
        </p>

        {/* The statement.
            Type and portrait get their own grid columns rather than stacking
            on top of each other — the outlined line is hard enough to read
            without a photograph behind it. */}
        <div className="mt-6 grid items-end gap-8 sm:mt-10 lg:grid-cols-[minmax(0,1fr)_clamp(200px,22vw,300px)] lg:gap-10">
          <h1 className="display text-[clamp(3rem,11.5vw,9.5rem)]">
            <span className="block">Developer</span>
            <span className="block">
              <span className="script lowercase">&amp;</span>{" "}
              <span className="outline">Video&nbsp;Editor</span>
            </span>
          </h1>

          {/* Portrait */}
          <figure className="relative mx-auto w-[58%] max-w-[240px] lg:mx-0 lg:w-full lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={profile.photo}
                alt={`${profile.name}, frontend developer and video editor`}
                fill
                priority
                sizes="(max-width: 1024px) 62vw, 22vw"
                className="object-cover object-[38%_28%] grayscale transition-all duration-700 hover:grayscale-0"
              />
            </div>
            <figcaption className="label mt-3 text-muted">
              Hariprasath E — {profile.location}
            </figcaption>
          </figure>
        </div>

        {/* Location + the two doors */}
        <div className="relative z-10 mt-10 flex flex-col gap-8 pb-14 sm:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-lg text-muted sm:text-xl">
              based in {profile.location}.
            </p>
            {profile.available && (
              <p className="label mt-4 flex items-center gap-2 text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for work
              </p>
            )}
          </div>

          {/* Straight nod to how people actually arrive: they need one or the other */}
          <div className="flex flex-wrap gap-3">
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

      {/* Count line */}
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <p className="label py-6 text-muted">
          {isDev
            ? `${projects.length} shipped projects — screenshot, live link, and how each one was figured out`
            : "Reels, edits and design work — shot to grade to caption"}
        </p>
      </div>
    </section>
  );
}
