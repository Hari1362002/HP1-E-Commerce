import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import AddToCartForm from "@/components/AddToCartForm";
import ProductCard from "@/components/ProductCard";
import BackButton from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProductBySlug(id);

  if (!product) notFound();

  const all = await getProducts();
  const related = all
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <BackButton />

        <nav className="flex min-w-0 items-center gap-2 text-xs text-ink-400">
          <Link href="/" className="transition hover:text-brand-600">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${encodeURIComponent(product.category)}`}
            className="transition hover:text-brand-600"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="truncate text-ink-500">{product.name}</span>
        </nav>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-cream-200">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            {product.category}
          </span>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 font-display text-2xl font-semibold text-ink-900">
            {formatPrice(product.price)}
          </p>

          <p className="mt-5 text-sm leading-relaxed text-ink-500">
            {product.description}
          </p>

          {(product.material || product.dimensions) && (
            <dl className="mt-6 grid gap-3 rounded-2xl bg-white p-5 ring-1 ring-cream-300/70 sm:grid-cols-2">
              {product.material && (
                <div>
                  <dt className="text-xs text-ink-400">Material</dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink-900">
                    {product.material}
                  </dd>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <dt className="text-xs text-ink-400">Dimensions</dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink-900">
                    {product.dimensions}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <AddToCartForm product={product} />

          <p className="mt-5 flex items-center gap-2 text-sm text-ink-400">
            <span
              className={`h-2 w-2 rounded-full ${
                product.stock > 0 ? "bg-emerald-500" : "bg-red-400"
              }`}
            />
            {product.stock > 0
              ? `In stock — ${product.stock} available`
              : "Currently out of stock"}
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold text-ink-900">
            You might also like
          </h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {related.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
