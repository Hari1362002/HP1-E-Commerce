import { profile, skills, timeline, certifications } from "@/data/site";

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1400px] border-t border-rule px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Bio */}
        <div className="lg:col-span-5">
          <p className="label text-accent">About</p>
          <h2 className="display mt-5 text-[clamp(2.25rem,6vw,4.5rem)]">
            Two crafts,
            <br />
            <span className="script lowercase">one</span> eye.
          </h2>
          <div className="mt-7 space-y-5">
            {profile.bio.map((para) => (
              <p key={para} className="text-lg leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>

          {/* Certifications */}
          <div className="mt-10 border-t border-rule pt-8">
            <p className="label text-muted">Certifications</p>
            <ul className="mt-5 space-y-3">
              {certifications.map(([name, meta]) => (
                <li key={name} className="flex items-baseline justify-between gap-4">
                  <span className="text-base">{name}</span>
                  <span className="label shrink-0 text-muted">{meta}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:col-span-7">
          <p className="label text-muted">Experience &amp; education</p>
          <ol className="mt-6">
            {timeline.map((entry) => (
              <li key={entry.title} className="border-t border-rule py-7">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <h3 className="display text-2xl sm:text-3xl">{entry.title}</h3>
                  <span className="label shrink-0 text-accent">{entry.period}</span>
                </div>
                <p className="script mt-1.5 text-lg text-muted">{entry.org}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">
                  {entry.text}
                </p>
                {entry.tags.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <li
                        key={tag}
                        className="label rounded-full border border-rule px-3 py-1.5 text-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-16 border-t border-rule pt-12">
        <p className="label text-muted">Skills</p>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group) => (
            <div key={group.group}>
              <h3 className="display text-xl text-accent sm:text-2xl">
                {group.group}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item} className="text-base text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
