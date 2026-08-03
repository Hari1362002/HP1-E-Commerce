"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About us" },
  { href: "/#contact", label: "Contact" },
];

function CartIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 7h12l-1 12H7L6 7Zm3 0V5.5a3 3 0 0 1 6 0V7" />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    setOpen(false);
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b border-cream-300/70 bg-cream-100/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-18">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-xl font-semibold tracking-tight text-ink-900"
        >
          FURNI<span className="text-brand-500">CO</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  active
                    ? "text-brand-600"
                    : "text-ink-500 hover:text-brand-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/cart"
            className="relative rounded-full p-2 text-ink-600 transition hover:bg-cream-200 hover:text-brand-600"
            aria-label="Cart"
          >
            <CartIcon className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {!loading && (
            <div className="hidden items-center gap-2 sm:flex">
              {user ? (
                <>
                  <span className="max-w-28 truncate text-sm font-medium text-ink-600">
                    Hi, {user.name.split(" ")[0]}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-ink-600 transition hover:border-brand-400 hover:text-brand-600"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-full border border-cream-300 px-4 py-1.5 text-sm font-medium text-ink-600 transition hover:border-brand-400 hover:text-brand-600"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-full bg-brand-500 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-brand-600"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          )}

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-full p-2 text-ink-900 transition hover:bg-cream-200 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-cream-300/70 bg-cream-50 px-4 py-3 lg:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-cream-200 hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 flex gap-2 border-t border-cream-300/70 pt-3">
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 rounded-xl border border-cream-300 px-4 py-2.5 text-sm font-medium text-ink-600"
              >
                Log out ({user.name.split(" ")[0]})
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-cream-300 px-4 py-2.5 text-center text-sm font-medium text-ink-600"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl bg-brand-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
