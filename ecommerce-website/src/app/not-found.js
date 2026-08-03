import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <h1 className="text-3xl font-semibold text-slate-900">404</h1>
      <p className="mt-2 text-slate-500">We couldn&apos;t find that page.</p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-600"
      >
        Back to shop
      </Link>
    </div>
  );
}
