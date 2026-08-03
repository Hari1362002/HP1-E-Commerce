/** Shown while the client auth form hydrates inside its Suspense boundary. */
export default function AuthFallback() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-24 sm:px-6">
      <p className="text-sm text-ink-400">Loading…</p>
    </div>
  );
}
