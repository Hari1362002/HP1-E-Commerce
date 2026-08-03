import Image from "next/image";
import Link from "next/link";

/**
 * Editorial grid of category tiles. The first two tiles are wide, the
 * remaining three sit in a row beneath — mirroring the reference layout.
 */
export default function Collections({ collections }) {
  if (collections.length === 0) return null;

  const [first, second, ...rest] = collections;

  return (
    <section className="mt-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Browse by room
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
            Our Collections
          </h2>
        </div>
        <Link
          href="/products"
          className="text-sm font-medium text-brand-600 transition hover:text-brand-700"
        >
          View all products →
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[first, second].filter(Boolean).map((c) => (
          <CollectionTile key={c.category} collection={c} tall />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {rest.map((c) => (
            <CollectionTile key={c.category} collection={c} />
          ))}
        </div>
      )}
    </section>
  );
}

function CollectionTile({ collection, tall = false }) {
  return (
    <Link
      href={`/products?category=${encodeURIComponent(collection.category)}`}
      className={`group relative overflow-hidden rounded-2xl bg-cream-200 ${
        tall ? "aspect-[16/10]" : "aspect-[4/3]"
      }`}
    >
      <Image
        src={collection.image}
        alt={collection.category}
        fill
        sizes="(min-width: 640px) 50vw, 100vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <div>
          <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
            {collection.category}
          </h3>
          <p className="mt-0.5 text-xs text-white/70">
            {collection.count} {collection.count === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition group-hover:bg-brand-500">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
