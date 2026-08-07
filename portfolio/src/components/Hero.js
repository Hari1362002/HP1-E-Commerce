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
              screens it drops below, where there is no room to overlap.

              The disc is a square box and everything else is placed against
              it, so the fit is arithmetic rather than eyeballed. Measured off
              the cut-out's alpha channel: his head centres at 25% of the image
              width and the whole figure at 39%, so the anchor is 32%. At
              w-[96%], putting the image's 32% point on the disc's centre means
              left = 50 − 32×0.96 ≈ 19%. The image is 797×868, so 96% of the
              disc's width is 105% of its height — top at -10% lifts his hair
              just past the top edge and lands the fade near the bottom. */}
          <div className="pointer-events-none relative z-10 mx-auto mt-6 aspect-square w-[64%] max-w-[270px] lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[30%] lg:max-w-[370px] lg:-translate-y-[50%]">
            <span
              aria-hidden="true"
              className="backdrop-glow absolute -inset-[14%] rounded-full"
            />
            <span
              aria-hidden="true"
              className="backdrop-orb absolute inset-0 rounded-full"
            />
            <span
              aria-hidden="true"
              className="backdrop-grid absolute inset-0 rounded-full"
            />
            <span
              aria-hidden="true"
              className="backdrop-ring absolute -inset-[9%] rounded-full"
            />

            {/* Mask on the image, filters on the wrapper — so the drop shadow
                is cast by the faded silhouette, not the raw rectangle. */}
            <div className="portrait absolute -top-[10%] left-[19%] w-[96%]">
              <Image
                src={profile.photo}
                alt={`${profile.name}, ${profile.title} and video editor`}
                width={797}
                height={868}
                priority
                sizes="(max-width: 1024px) 80vw, 38vw"
                className="portrait-mask h-auto w-full"
              />
            </div>
          </div>
        </div>

        <p className="label mt-4 text-muted lg:mt-8">{profile.title}</p>

        {/* Footer margin — the pull quote, the counts, and the two doors */}
        <div className="mt-10 grid gap-8 border-t border-rule pt-8 sm:mt-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="display text-[clamp(1.5rem,3.5vw,2.5rem)]">
              I build websites
              <br />
              <span className="script lowercase">and</span> edit videos.
            </p>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">
              Front end to database, then the reel that sells it. Based in
              Coimbatore, working with clients across Tamil Nadu.
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
