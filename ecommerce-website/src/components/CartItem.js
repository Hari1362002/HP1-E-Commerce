"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import ProductVisual from "./ProductVisual";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-slate-200 py-5 last:border-none">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:h-24 sm:w-24">
        <ProductVisual category={item.category} className="h-full w-full" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-3">
          <h3 className="text-sm font-medium text-slate-900 sm:text-base">
            {item.name}
          </h3>
          <p className="whitespace-nowrap text-sm font-semibold text-slate-900 sm:text-base">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center rounded-full border border-slate-200">
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="px-3 py-1 text-slate-600 hover:text-teal-600"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-6 text-center text-sm">{item.quantity}</span>
            <button
              type="button"
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="px-3 py-1 text-slate-600 hover:text-teal-600"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => removeItem(item.productId)}
            className="text-sm text-slate-400 hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
