import { projects } from "@/data/site";
import ProjectCard from "./ProjectCard";

const GROUPS = [
  {
    kind: "freelance",
    label: "Client work",
    heading: "Paid to solve\nsomeone else's problem.",
    blurb:
      "Freelance builds for real businesses — a brief, a deadline, and someone whose customers depend on it working.",
  },
  {
    kind: "personal",
    label: "Personal builds",
    heading: "Built because\nit bothered me.",
    blurb:
      "Self-directed projects. Each one started with something that was harder than it needed to be.",
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
      <div className="max-w-3xl py-10 sm:py-16">
        <p className="label text-accent">Selected work</p>
        <h2 className="display mt-5 text-[clamp(2.25rem,7vw,5rem)]">
          Built, shipped,
          <br />
          <span className="script lowercase">and</span> explained.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted sm:text-xl">
          {projects.length} projects, each with the screenshot, the link, and the
          three decisions that shaped it — what I looked at, what I tested, what I
          built.
        </p>
      </div>

      {GROUPS.map((group) => {
        const items = projects.filter((p) => p.kind === group.kind);
        if (items.length === 0) return null;

        return (
          <div key={group.kind} className="pt-6">
            <div className="max-w-2xl border-t-2 border-ink pt-8">
              <p className="label text-accent">
                {group.label} — {String(items.length).padStart(2, "0")}
              </p>
              <Heading text={group.heading} />
              <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
                {group.blurb}
              </p>
            </div>

            <div className="mt-10">
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
