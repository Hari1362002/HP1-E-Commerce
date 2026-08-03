"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function AddToCartForm({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    addItem(product, quantity);
    router.push("/cart");
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-600">Quantity</span>
        <div className="flex items-center rounded-full border border-slate-200">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1.5 text-slate-600 hover:text-teal-600"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1.5 text-slate-600 hover:text-teal-600"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAdd}
          className="flex-1 rounded-full border border-slate-900 px-6 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-900 hover:text-white"
        >
          {added ? "Added ✓" : "Add to Cart"}
        </button>
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 rounded-full bg-teal-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-teal-700"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
