import { projects } from "@/data/site";
import ProjectCard from "./ProjectCard";

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
          Four projects, each with the screenshot, the link, and the three
          decisions that shaped it — what I looked at, what I tested, what I
          built.
        </p>
      </div>

      {projects.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          flip={i % 2 === 1}
          priority={i === 0}
        />
      ))}
    </section>
  );
}
