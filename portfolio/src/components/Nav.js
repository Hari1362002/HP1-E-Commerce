"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/data/site";

const TABS = [
  { id: "dev", label: "Development", href: "/" },
  { id: "video", label: "Video", href: "/video" },
];

/**
 * The switch — the one control that changes everything. Real links, so each
 * side can be handed to someone on its own.
 *
 * Below `sm` it gets its own full-width row: the wordmark, the switch and a
 * contact button cannot share 375px without something being clipped.
 */
function Switch({ mode, className = "" }) {
  return (
    <nav
      aria-label="Portfolio section"
      className={`relative flex rounded-full border border-rule p-1 ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform:
            mode === "video" ? "translateX(calc(100% + 0.5rem))" : "translateX(0)",
        }}
      />
      {TABS.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          aria-current={mode === tab.id ? "page" : undefined}
          className={`label relative z-10 flex-1 basis-0 rounded-full py-2 text-center transition-colors duration-300 ${
            mode === tab.id ? "text-paper" : "text-muted hover:text-ink"
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}

export default function Nav({ mode }) {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-500 ${
        stuck
          ? "border-rule bg-paper/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          {/* Mark */}
          <Link href="/" className="group flex min-w-0 items-baseline gap-2">
            <span className="display truncate text-xl sm:text-2xl">
              Hariprasath
            </span>
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
            />
          </Link>

          <Switch mode={mode} className="hidden w-[17rem] shrink-0 sm:flex" />

          {/* Contact */}
          <a
            href={`mailto:${profile.email}`}
            className="label hidden shrink-0 rounded-full border border-ink px-5 py-2.5 transition-colors duration-300 hover:bg-ink hover:text-paper md:block"
          >
            {profile.email}
          </a>
        </div>

        {/* Mobile: the switch gets the room it needs */}
        <Switch mode={mode} className="mb-3 w-full sm:hidden" />
      </div>
    </header>
  );
}
