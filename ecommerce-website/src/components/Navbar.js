"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import Logo from "./Logo";
import Tooltip from "./Tooltip";
import SearchBar from "./SearchBar";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About us" },
  { href: "/#contact", label: "Contact" },
];

function Icon({ d, className = "h-5 w-5" }) {
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
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  cart: "M6 7h12l-1 12H7L6 7Zm3 0V5.5a3 3 0 0 1 6 0V7",
  heart: "M12 20s-7-4.5-7-9.5A4.5 4.5 0 0 1 12 8a4.5 4.5 0 0 1 7 2.5c0 5-7 9.5-7 9.5Z",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm9 2-3.5-3.5",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 18 18 6M6 6l12 12",
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Close the panels whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await logout();
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <>
      {/*
        Solid white on a cream page, plus a soft drop shadow, so the bar always
        reads as a separate layer while content scrolls underneath it.
      */}
      <header className="sticky top-0 z-50 border-b border-cream-200 bg-white shadow-[0_2px_16px_-6px_rgba(31,26,21,0.16)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:h-20 lg:gap-6">
        <Logo onClick={() => setMenuOpen(false)} />

        <nav className="ml-2 hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:rounded-full after:bg-brand-500 after:transition-all ${
                  active
                    ? "text-ink-900 after:w-full"
                    : "text-ink-500 after:w-0 hover:text-ink-900 hover:after:w-full"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Search lives in the header from md up, and in a drop-down below it on phones. */}
        <div className="ml-auto hidden min-w-0 max-w-sm flex-1 md:block lg:max-w-md">
          <SearchBar size="sm" />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0 sm:gap-1.5">
          <Tooltip label="Search" className="md:hidden">
            <button
              type="button"
              aria-label="Search"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
              className="rounded-full p-2.5 text-ink-600 transition hover:bg-cream-100 hover:text-brand-600"
            >
              <Icon d={searchOpen ? ICONS.close : ICONS.search} />
            </button>
          </Tooltip>

          <Tooltip
            label={
              wishlistCount > 0 ? `Wishlist · ${wishlistCount}` : "Wishlist"
            }
          >
            <Link
              href="/wishlist"
              aria-label="Wishlist"
              className="relative block rounded-full p-2.5 text-ink-600 transition hover:bg-cream-100 hover:text-brand-600"
            >
              <Icon d={ICONS.heart} />
              {wishlistCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Tooltip>

          <Tooltip label={itemCount > 0 ? `Cart · ${itemCount}` : "Cart"}>
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative block rounded-full p-2.5 text-ink-600 transition hover:bg-cream-100 hover:text-brand-600"
            >
              <Icon d={ICONS.cart} />
              {itemCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </Tooltip>

          {!loading &&
            (user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <Tooltip label={user.email}>
                  <span className="flex items-center gap-2 rounded-full bg-cream-100 py-1.5 pl-1.5 pr-3.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="max-w-24 truncate text-sm font-medium text-ink-700">
                      {user.name.split(" ")[0]}
                    </span>
                  </span>
                </Tooltip>
                <Tooltip label="Sign out">
                  <button
                    type="button"
                    onClick={handleLogout}
                    aria-label="Log out"
                    className="rounded-full p-2.5 text-ink-600 transition hover:bg-cream-100 hover:text-brand-600"
                  >
                    <Icon d="M15 17l5-5-5-5M20 12H9M13 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                  </button>
                </Tooltip>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  href="/login"
                  className="rounded-full px-4 py-2 text-sm font-medium text-ink-600 transition hover:bg-cream-100 hover:text-ink-900"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  Sign up
                </Link>
              </div>
            ))}

          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="rounded-full p-2.5 text-ink-900 transition hover:bg-cream-100 lg:hidden"
          >
            <Icon d={menuOpen ? ICONS.close : ICONS.menu} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-cream-200 bg-white px-4 py-3 md:hidden">
          <SearchBar size="sm" autoFocus onDone={() => setSearchOpen(false)} />
        </div>
      )}

      {menuOpen && (
        <nav className="border-t border-cream-200 bg-white px-4 py-3 lg:hidden">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-600 transition hover:bg-cream-100 hover:text-brand-600"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-3 flex gap-2 border-t border-cream-200 pt-3">
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
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-xl border border-cream-300 px-4 py-2.5 text-center text-sm font-medium text-ink-600"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMenuOpen(false)}
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
    </>
  );
}
