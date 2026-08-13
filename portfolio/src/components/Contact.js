import { profile, links, resumes } from "@/data/site";

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

function DownloadIcon({ className = "" }) {
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
      <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" />
    </svg>
  );
}

const SOCIALS = [
  ["GitHub", "The code", links.github],
  ["LinkedIn", "The CV version", links.linkedin],
  ["Instagram", "@hari.edz — the edits", links.instagram],
  ["Showreel", "Every video, on Drive", links.drive],
];

export default function Contact({ mode }) {
  const isVideo = mode === "video";

  return (
    <footer id="contact" className="border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-5 pt-16 pb-10 sm:px-8 sm:pt-24">
        {/* The ask, and the two ways to answer it */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="label text-accent">Get in touch</p>
            <h2 className="display mt-5 text-[clamp(2.5rem,9vw,7rem)]">
              Got a project?
              <br />
              <span className="script lowercase">let&apos;s</span> talk.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              {isVideo
                ? "Send me the footage and what you want it to feel like. I'll come back with a cut."
                : "Tell me what you're building and who it's for. I'll come back with how I'd approach it."}
            </p>
          </div>

          {/* Primary actions — big enough to be the obvious next step */}
          <div className="flex flex-col gap-3 lg:col-span-5 lg:justify-end">
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center justify-between gap-4 rounded-2xl bg-ink px-6 py-6 text-paper transition-opacity hover:opacity-85"
            >
              <span className="min-w-0">
                <span className="label block opacity-70">Email me</span>
                <span className="mt-1.5 block truncate text-lg font-medium sm:text-xl">
                  {profile.email}
                </span>
              </span>
              <ArrowIcon className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>

            <a
              href={profile.phoneHref}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-rule px-6 py-6 transition-colors hover:border-ink"
            >
              <span className="min-w-0">
                <span className="label block text-muted">Or call</span>
                <span className="mt-1.5 block truncate text-lg font-medium sm:text-xl">
                  {profile.phone}
                </span>
              </span>
              <ArrowIcon className="h-6 w-6 shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink" />
            </a>
          </div>
        </div>

        {/* Everything else, on one rule */}
        <div className="mt-16 grid gap-10 border-t border-rule pt-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="label text-muted">Find me on</p>
            <ul className="mt-5 space-y-1">
              {SOCIALS.map(([label, note, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-baseline gap-3 py-2 transition-colors hover:text-accent"
                  >
                    <span className="text-lg font-medium">{label}</span>
                    <span className="text-sm text-muted">{note}</span>
                    <ArrowIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="label text-muted">Download my CV</p>
            <ul className="mt-5 space-y-2.5">
              {resumes.map((resume) => (
                <li key={resume.file}>
                  <a
                    href={resume.file}
                    download
                    className="group flex items-center justify-between gap-4 rounded-xl border border-rule px-4 py-3.5 transition-colors hover:border-ink"
                  >
                    <span>
                      <span className="block text-base">{resume.label}</span>
                      <span className="label mt-1 block text-muted">
                        {resume.meta}
                      </span>
                    </span>
                    <DownloadIcon className="h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:translate-y-0.5 group-hover:text-accent" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <p className="label text-muted">Based in</p>
            <p className="mt-5 text-lg">{profile.location}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Open to freelance and full-time work, remote or on site.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-rule py-8">
          <p className="label text-muted">
            © {new Date().getFullYear()} — All rights reserved.
          </p>
          <a href="#top" className="label -my-2 py-2 text-muted transition-colors hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
