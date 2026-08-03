import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { formatPrice } from "@/lib/format";
import AddToCartForm from "@/components/AddToCartForm";
import ProductVisual from "@/components/ProductVisual";

export const dynamic = "force-dynamic";

async function getProduct(slug) {
  await connectDB();
  const product = await Product.findOne({ slug }).lean();
  return product ? JSON.parse(JSON.stringify(product)) : null;
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <ProductVisual category={product.category} className="h-full w-full" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium text-teal-600">
            {product.category}
          </span>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-slate-900">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 leading-relaxed text-slate-600">
            {product.description}
          </p>

          <AddToCartForm product={product} />

          <p className="mt-6 text-sm text-slate-400">
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Currently out of stock"}
          </p>
        </div>
      </div>
    </div>
  );
}
