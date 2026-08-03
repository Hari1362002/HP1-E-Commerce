import Link from "next/link";
import { formatPrice } from "@/lib/format";
import ProductVisual from "./ProductVisual";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200"
    >
      <div className="relative aspect-square overflow-hidden">
        <ProductVisual
          category={product.category}
          className="h-full w-full transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-600">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="text-sm font-medium text-slate-900">{product.name}</h3>
        <p className="mt-auto text-base font-semibold text-teal-700">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
