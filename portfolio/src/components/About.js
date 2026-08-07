import { profile, skills } from "@/data/site";

/**
 * Bio and skills only. The work above already argues the case better than a
 * degree or a certificate list can, and both tabs read shorter without them.
 */
export default function About({ mode }) {
  const skillGroups = mode === "video" ? skills.video : skills.dev;

  return (
    <section
      id="about"
      className="mx-auto max-w-[1400px] border-t border-rule px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="label text-accent">About</p>
          <h2 className="display mt-5 text-[clamp(2.25rem,6vw,4.5rem)]">
            Two crafts,
            <br />
            <span className="script lowercase">one</span> eye.
          </h2>
        </div>

        <div className="lg:col-span-7">
          <div className="space-y-5">
            {profile.bio.map((para) => (
              <p key={para} className="text-lg leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Skills — per tab */}
      <div className="mt-16 border-t border-rule pt-12">
        <p className="label text-muted">Skills</p>
        <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.group}>
              <h3 className="display text-xl sm:text-2xl">{group.group}</h3>
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
