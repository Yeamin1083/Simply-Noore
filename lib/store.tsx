"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem, Product } from "./types";

interface StoreContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  lang: "en" | "bn";
  toggleLang: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (variantId: string, size: string) => void;
  updateCartQty: (variantId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<"en" | "bn">("en");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Load persisted settings
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("sn_theme") as "light" | "dark";
      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
      }
      const savedLang = localStorage.getItem("sn_lang") as "en" | "bn";
      if (savedLang) setLang(savedLang);

      const savedCart = localStorage.getItem("sn_cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem("sn_wishlist");
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // storage unavailable or privacy mode
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("sn_theme", next);
    } catch {}
  };

  const toggleLang = () => {
    const next = lang === "en" ? "bn" : "en";
    setLang(next);
    try {
      localStorage.setItem("sn_lang", next);
    } catch {}
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.variantId === item.variantId && i.size === item.size
      );
      let nextCart: CartItem[];
      if (existing) {
        nextCart = prev.map((i) =>
          i.variantId === item.variantId && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        nextCart = [...prev, item];
      }
      try {
        localStorage.setItem("sn_cart", JSON.stringify(nextCart));
      } catch {}
      return nextCart;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (variantId: string, size: string) => {
    setCart((prev) => {
      const nextCart = prev.filter(
        (i) => !(i.variantId === variantId && i.size === size)
      );
      try {
        localStorage.setItem("sn_cart", JSON.stringify(nextCart));
      } catch {}
      return nextCart;
    });
  };

  const updateCartQty = (variantId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId, size);
      return;
    }
    setCart((prev) => {
      const nextCart = prev.map((i) =>
        i.variantId === variantId && i.size === size ? { ...i, quantity } : i
      );
      try {
        localStorage.setItem("sn_cart", JSON.stringify(nextCart));
      } catch {}
      return nextCart;
    });
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem("sn_cart");
    } catch {}
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem("sn_wishlist", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        toggleLang,
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
