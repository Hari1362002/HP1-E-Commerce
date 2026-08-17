import { projects } from "@/data/site";
import ProjectCard from "./ProjectCard";

const GROUPS = [
  {
    kind: "freelance",
    label: "Client work",
    heading: "Built for\nreal businesses.",
    blurb:
      "Freelance projects with a client, a brief and a deadline — websites people use every day to run their shop.",
  },
  {
    kind: "personal",
    label: "My own projects",
    heading: "Built on\nmy own time.",
    blurb:
      "No client, no brief. I built each one because I wanted to see if I could — and because the existing way was harder than it needed to be.",
  },
];

/** Two-line headings, so the break lands where I want it rather than where the box ends. */
function Heading({ text }) {
  return (
    <h2 className="display mt-5 text-[clamp(2.25rem,7vw,5rem)]">
      {text.split("\n").map((line, i) => (
        <span key={line} className="block">
          {i === 1 ? <span className="script lowercase">{line}</span> : line}
        </span>
      ))}
    </h2>
  );
}

export default function DevWork() {
  return (
    <section id="work" className="mx-auto max-w-[1400px] px-5 pb-10 sm:px-8">
      <div className="max-w-3xl pt-8 pb-8 sm:pt-12 sm:pb-10">
        <p className="label text-accent">My work</p>
        <h2 className="display mt-5 text-[clamp(2.25rem,7vw,5rem)]">
          {projects.length} websites
          <br />
          <span className="script lowercase">I</span> built.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
          Every one is live — open it and try it. For each, I&apos;ve written down
          three things: the problem I found, what I tried, and what I ended up
          building.
        </p>
      </div>

      {GROUPS.map((group) => {
        const items = projects.filter((p) => p.kind === group.kind);
        if (items.length === 0) return null;

        return (
          <div key={group.kind} className="pt-4">
            <div className="max-w-2xl border-t-2 border-ink pt-7">
              <p className="label text-accent">
                {group.label} — {String(items.length).padStart(2, "0")}
              </p>
              <Heading text={group.heading} />
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                {group.blurb}
              </p>
            </div>

            <div className="mt-8">
              {items.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  flip={i % 2 === 1}
                  priority={group.kind === "freelance" && i === 0}
                />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
