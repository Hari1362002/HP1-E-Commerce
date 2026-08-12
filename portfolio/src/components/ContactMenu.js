"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/site";

function MailIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

function PhoneIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5 5.7 2 2 0 0 1 7 3.5Z" />
    </svg>
  );
}

function ChevronIcon({ className = "" }) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/**
 * Contact in the header: one button, two ways through.
 *
 * The header used to show the raw email address, which is only useful on a
 * desktop with a mail client set up — on a phone it was a long string that
 * often did nothing. This gives both routes explicitly, and `mailto:` /
 * `tel:` are what the phone already knows how to handle.
 */
export default function ContactMenu() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Close on outside click and on Escape — a menu you can't dismiss is worse
  // than no menu, especially on a sticky header.
  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (e) => {
      if (!wrapRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const items = [
    {
      href: `mailto:${profile.email}`,
      Icon: MailIcon,
      label: "Email",
      value: profile.email,
    },
    {
      href: profile.phoneHref,
      Icon: PhoneIcon,
      label: "Call",
      value: profile.phone,
    },
  ];

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="label flex items-center gap-2 rounded-full border border-ink px-4 py-2.5 transition-colors duration-300 hover:bg-ink hover:text-paper sm:px-5"
      >
        Contact
        <ChevronIcon
          className={`h-3.5 w-3.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.6rem)] w-[16.5rem] overflow-hidden rounded-2xl border border-rule bg-card shadow-[0_20px_50px_-20px_rgb(0_0_0/0.4)]"
        >
          {items.map(({ href, Icon, label, value }, i) => (
            <a
              key={label}
              href={href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-paper ${
                i > 0 ? "border-t border-rule" : ""
              }`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rule">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="label block text-muted">{label}</span>
                <span className="mt-0.5 block truncate text-sm">{value}</span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
