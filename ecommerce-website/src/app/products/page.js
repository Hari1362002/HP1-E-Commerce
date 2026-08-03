import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All products — FURNICO",
};

export default async function ProductsPage({ searchParams }) {
  const { category, q } = await searchParams;
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
        Shop
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-ink-900 sm:text-4xl">
        All products
      </h1>
      <p className="mt-3 max-w-lg text-sm text-ink-500">
        {products.length} pieces across sofas, chairs, lighting, tables and
        more — every one built to last.
      </p>

      <div className="mt-10">
        <ProductGrid
          products={products}
          initialCategory={category || "All"}
          initialQuery={q || ""}
        />
      </div>
    </div>
  );
}
