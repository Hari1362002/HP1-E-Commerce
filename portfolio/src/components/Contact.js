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
  ["GitHub", links.github],
  ["LinkedIn", links.linkedin],
  ["Instagram", links.instagram],
  ["Showreel", links.drive],
];

export default function Contact() {
  return (
    <footer
      id="contact"
      className="mx-auto max-w-[1400px] border-t border-rule px-5 py-16 sm:px-8 sm:py-24"
    >
      <p className="label text-accent">Contact</p>

      {/* The big ask */}
      <h2 className="display mt-5 text-[clamp(2.5rem,10vw,8rem)]">
        Let&apos;s make
        <br />
        <span className="script lowercase">something</span> good.
      </h2>

      <a
        href={`mailto:${profile.email}`}
        className="group mt-10 inline-flex max-w-full items-center gap-3 border-b-2 border-ink pb-2 transition-colors hover:border-accent hover:text-accent"
      >
        <span className="truncate text-[clamp(1.1rem,4vw,2.25rem)] font-medium">
          {profile.email}
        </span>
        <ArrowIcon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 sm:h-7 sm:w-7" />
      </a>

      <div className="mt-14 grid gap-12 border-t border-rule pt-12 lg:grid-cols-3">
        {/* Direct */}
        <div>
          <p className="label text-muted">Direct</p>
          <ul className="mt-5 space-y-3">
            <li>
              <a
                href={profile.phoneHref}
                className="text-lg transition-colors hover:text-accent"
              >
                {profile.phone}
              </a>
            </li>
            <li className="text-lg text-muted">{profile.location}</li>
          </ul>
        </div>

        {/* Elsewhere */}
        <div>
          <p className="label text-muted">Elsewhere</p>
          <ul className="mt-5 space-y-3">
            {SOCIALS.map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-2 text-lg transition-colors hover:text-accent"
                >
                  {label}
                  <ArrowIcon className="h-4 w-4 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Résumés — one per craft */}
        <div>
          <p className="label text-muted">Résumé</p>
          <ul className="mt-5 space-y-3">
            {resumes.map((resume) => (
              <li key={resume.file}>
                <a
                  href={resume.file}
                  download
                  className="group flex items-center justify-between gap-4 rounded-lg border border-rule px-4 py-3.5 transition-colors hover:border-ink"
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
      </div>

      <div className="mt-14 border-t border-rule pt-8">
        <p className="label text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
  );
}
