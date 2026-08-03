import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-display text-6xl font-semibold text-brand-200">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold text-ink-900">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-2 text-sm text-ink-500">
        The link may be broken, or the piece may have sold out.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-full bg-brand-500 px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
      >
        Back to home
      </Link>
    </div>
  );
}
