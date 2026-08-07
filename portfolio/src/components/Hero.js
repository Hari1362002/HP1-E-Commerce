import Image from "next/image";
import Link from "next/link";
import { profile, projects, videoWork } from "@/data/site";
import Marquee from "./Marquee";

const freelanceCount = projects.filter((p) => p.kind === "freelance").length;

export default function Hero({ mode }) {
  const isDev = mode !== "video";

  return (
    <section id="top" className="mx-auto max-w-[1400px] px-5 pt-6 sm:px-8 sm:pt-10">
      {/* The hero is set as a printed plate: ruled edge, crop marks, and the
          portrait standing in front of the type rather than beside it. */}
      <div className="poster px-5 py-8 sm:px-8 sm:py-12">
        {/* Intro line */}
        <p className="rise max-w-xl text-[15px] leading-relaxed text-muted sm:text-lg">
          <span aria-hidden="true">👋</span> my name is{" "}
          <span className="text-ink">Hariprasath</span> and I am a{" "}
          <span className="script text-ink">full stack developer</span> and{" "}
          <span className="script text-ink">video editor</span>
        </p>

        {/* Type and portrait share one stacking context. The cut-out sits on
            its own layer above the first line and below the outlined one, so
            the words genuinely run behind him. */}
        <div className="relative mt-8 sm:mt-12">
          <h1 className="display relative text-[clamp(3rem,12.5vw,10.5rem)]">
            <span className="relative z-0 block">Developer</span>
            <span className="relative z-20 block">
              <span className="script lowercase">&amp;</span>{" "}
              <span className="outline">Video&nbsp;Editor</span>
            </span>
          </h1>

          {/* Portrait — absolute on desktop so it overlaps the type; on small
              screens it drops below, where there is no room to overlap. */}
          <div className="pointer-events-none relative z-10 mx-auto mt-6 w-[62%] max-w-[260px] lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[30%] lg:max-w-[380px] lg:-translate-y-[52%]">
            {/* Quiet geometry so he isn't floating on bare paper */}
            <div className="backdrop" aria-hidden="true">
              <span className="backdrop-arch" />
              <span className="backdrop-ring" />
              <span className="backdrop-dots" />
            </div>
            <Image
              src={profile.photo}
              alt={`${profile.name}, ${profile.title} and video editor`}
              width={797}
              height={868}
              priority
              sizes="(max-width: 1024px) 62vw, 30vw"
              className="portrait relative h-auto w-full"
            />
          </div>
        </div>

        <p className="label mt-4 text-muted lg:mt-8">{profile.title}</p>

        {/* Footer margin — the pull quote, the counts, and the two doors */}
        <div className="mt-10 grid gap-8 border-t border-rule pt-8 sm:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="display text-[clamp(1.5rem,3.5vw,2.5rem)]">
              Fewer clicks.
              <br />
              <span className="script lowercase">more</span> shipped.
            </p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
              I build the whole stack, then cut the film that sells it.
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
                  "Node.js",
                  "MongoDB",
                  "Tailwind CSS",
                  "MySQL",
                  "Express",
                  "Figma",
                  "Responsive",
                ]
              : videoWork.tools.concat(["Reels", "Colour grade", "Motion titles"])
          }
        />
      </div>
    </section>
  );
}
