import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { seedProducts } from "@/data/seedProducts";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

async function getProducts() {
  await connectDB();
  let products = await Product.find({}).sort({ createdAt: 1 }).lean();

  if (products.length === 0) {
    await Product.insertMany(seedProducts);
    products = await Product.find({}).sort({ createdAt: 1 }).lean();
  }

  return JSON.parse(JSON.stringify(products));
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <section className="mb-12 overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-center sm:py-20">
        <p className="text-sm font-medium uppercase tracking-widest text-teal-400">
          New arrivals
        </p>
        <h1 className="mx-auto mt-3 max-w-xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Everyday essentials, thoughtfully designed
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-slate-300 sm:text-base">
          A small curated catalogue of electronics, home, fitness and
          accessories — built as a portfolio demo storefront.
        </p>
      </section>

      <ProductGrid products={products} />
    </div>
  );
}
