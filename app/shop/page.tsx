"use client";

import React, { useState } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function ShopPage() {
  const { lang } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  }).sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      {/* Editorial Header */}
      <div className="space-y-2 border-b border-border/30 pb-6">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
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
            All Pieces ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-1.5 rounded-full border transition-all ${
                selectedCategory === cat.slug
                  ? "bg-espresso text-bg dark:bg-accent dark:text-bg border-transparent font-medium"
                  : "border-border/60 text-muted hover:text-text"
              }`}
            >
              {lang === "bn" ? cat.nameBn : cat.name}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-muted">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-surface border border-border/60 rounded-lg px-3 py-1.5 text-text focus:outline-none focus:ring-1 focus:ring-accent"
          >
            <option value="featured">Curated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Standard Format Product Showcase Grid (3:4 luxury rectangular boxes) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
