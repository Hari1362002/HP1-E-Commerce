import Link from "next/link";
import { getProducts } from "@/lib/products";
import Hero from "@/components/Hero";
import FeatureStrip from "@/components/FeatureStrip";
import Collections from "@/components/Collections";
import ProductCard from "@/components/ProductCard";
import AboutSection from "@/components/AboutSection";
import ContactCTA from "@/components/ContactCTA";

export const dynamic = "force-dynamic";

/** One tile per category, using the first product image in that category. */
function buildCollections(products) {
  const map = new Map();
  for (const product of products) {
    const existing = map.get(product.category);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(product.category, {
        category: product.category,
        image: product.image,
        count: 1,
      });
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 5);
}

export default async function HomePage() {
  const products = await getProducts();
  const collections = buildCollections(products);
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Hero />
      <FeatureStrip />
      <Collections collections={collections} />

      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
              Handpicked
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-ink-900 sm:text-3xl">
              Best sellers
            </h2>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-brand-600 transition hover:text-brand-700"
          >
            View all products →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      <AboutSection />
      <ContactCTA />
    </div>
  );
}
