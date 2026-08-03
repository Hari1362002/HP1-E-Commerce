"use client";

import { useState } from "react";

export default function ContactCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Demo only — a real build would POST this to a mailing-list provider.
    setSent(true);
    setEmail("");
  }

  return (
    <section
      id="contact"
      className="mt-20 scroll-mt-24 overflow-hidden rounded-3xl bg-ink-900 px-6 py-12 sm:px-10 sm:py-14"
    >
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">
            Get 10% off your first order
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/60">
            Join the list for new arrivals, restocks and the occasional look
            inside the workshop. No spam — unsubscribe any time.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="lg:justify-self-end lg:w-full lg:max-w-md">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 rounded-full bg-white/10 px-5 py-3 text-sm text-white outline-none ring-1 ring-white/15 transition placeholder:text-white/40 focus:ring-2 focus:ring-brand-400"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              Subscribe
            </button>
          </div>
          {sent && (
            <p className="mt-3 text-sm text-brand-300">
              Thanks — check your inbox for the code.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
