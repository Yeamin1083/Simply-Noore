"use client";

import React, { useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function ShopPage() {
  const { lang, products } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const allProducts = products && products.length > 0 ? products : PRODUCTS;

  const filteredProducts = allProducts
    .filter((p) => {
      if (selectedCategory === "all") return true;
      return p.category === selectedCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-border/30 pb-6">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold font-mono">
          {lang === "bn" ? "পোশাক সম্ভার" : "Collection"}
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          {lang === "bn" ? "সকল পোশাক" : "The Complete Atelier Edit"}
        </h1>
        <p className="text-xs md:text-sm text-muted max-w-lg">
          {lang === "bn"
            ? "কোরিয়ান নিদা ও মদিনা সিল্কের সমন্বয়ে তৈরি প্রিমিয়াম আবায়া ও থ্রি-পিস সেট।"
            : "Architectural modest garments cut from Korean Nida, Medina Silks, and tailored crepes."}
        </p>
      </div>

      {/* Filter and Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-b border-border/20 text-xs">
        {/* Category filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-1.5 rounded-full border transition-all ${
              selectedCategory === "all"
                ? "bg-espresso text-bg dark:bg-accent dark:text-bg border-transparent font-medium"
                : "border-border/60 text-muted hover:text-text"
            }`}
          >
            All Pieces ({allProducts.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = allProducts.filter((p) => p.category === cat.slug).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-1.5 rounded-full border transition-all ${
                  selectedCategory === cat.slug
                    ? "bg-espresso text-bg dark:bg-accent dark:text-bg border-transparent font-medium"
                    : "border-border/60 text-muted hover:text-text"
                }`}
              >
                {lang === "bn" ? cat.nameBn : cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-muted text-[11px] uppercase tracking-wider">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface border border-border rounded-lg px-3 py-1.5 text-xs text-text focus:outline-none"
          >
            <option value="featured">Editorial Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-muted text-sm">
          No silhouettes available in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
