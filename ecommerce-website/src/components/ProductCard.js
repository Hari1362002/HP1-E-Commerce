import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/format";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-cream-300/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-900/10 hover:ring-brand-200"
    >
      <div className="relative aspect-square overflow-hidden bg-cream-200">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-ink-600 backdrop-blur">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-sm font-semibold text-ink-900 sm:text-base">
          {product.name}
        </h3>
        {product.material && (
          <p className="text-xs text-ink-400">{product.material}</p>
        )}
        <p className="mt-auto pt-2 font-display text-base font-semibold text-brand-600">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
