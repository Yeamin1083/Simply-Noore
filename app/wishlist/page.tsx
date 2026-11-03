"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const { wishlist, lang, products } = useStore();
  const allProducts = products && products.length > 0 ? products : PRODUCTS;
  const wishedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8 min-h-[70vh]">
      <div className="space-y-2 border-b border-border/30 pb-6">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
          Saved Pieces
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          {lang === "bn" ? "পছন্দের তালিকা" : "Your Wishlist"}
        </h1>
        <p className="text-xs md:text-sm text-muted">
          Local-first saved silhouettes. Accessible across your browser session without account creation.
        </p>
      </div>

      {wishedProducts.length === 0 ? (
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <div className="h-12 w-12 rounded-full bg-surface-2 mx-auto flex items-center justify-center text-muted">
            <Heart className="h-6 w-6" />
          </div>
          <h2 className="font-serif text-2xl font-medium text-text">
            Save pieces you love.
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            Your Nooré edit is waiting. Browse our collection and tap the heart icon on any silhouette to curate your personal list.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg text-xs uppercase tracking-widest font-semibold hover:opacity-90 transition-all"
            >
              <span>Explore Collection</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
