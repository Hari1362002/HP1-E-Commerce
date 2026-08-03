"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ fallback = "/products", label = "Back" }) {
  const router = useRouter();

  function handleClick() {
    // Use real history when there is somewhere to go back to, otherwise send
    // the user somewhere sensible (e.g. they opened the link in a new tab).
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group inline-flex items-center gap-2 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-medium text-ink-600 transition hover:border-brand-400 hover:text-brand-600"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
      >
        <path d="M19 12H5M11 18l-6-6 6-6" />
      </svg>
      {label}
    </button>
  );
}
