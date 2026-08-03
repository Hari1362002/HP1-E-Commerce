"use client";

import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "hp-wishlist";

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  function isSaved(productId) {
    return items.some((item) => item.productId === productId);
  }

  /** Adds the product, or removes it when it is already saved. */
  function toggleItem(product) {
    setItems((prev) => {
      if (prev.some((item) => item.productId === product._id)) {
        return prev.filter((item) => item.productId !== product._id);
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
          category: product.category,
          material: product.material,
        },
      ];
    });
  }

  function removeItem(productId) {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function clearWishlist() {
    setItems([]);
  }

  return (
    <WishlistContext.Provider
      value={{
        items,
        isSaved,
        toggleItem,
        removeItem,
        clearWishlist,
        count: items.length,
        hydrated,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
