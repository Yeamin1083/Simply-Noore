"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Category, Product } from "@/lib/types";
import { useStore } from "@/lib/store";

interface CategoryViewProps {
  category: Category;
  products: Product[];
}

export function CategoryView({ category, products }: CategoryViewProps) {
  const { lang } = useStore();

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Back button */}
      <Link
        href="/women"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-text transition-colors font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Return to Women</span>
      </Link>

      {/* Category Header */}
      <div className="space-y-3 border-b border-border/30 pb-6">
        <span className="text-[11px] font-mono uppercase tracking-widest text-accent-ink font-semibold">
          Dhaka Atelier Collection
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          {lang === "bn" ? category.nameBn : category.name}
        </h1>
        <p className="text-sm text-muted max-w-xl leading-relaxed">
          {category.description}
        </p>
      </div>

      {/* Standard Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
