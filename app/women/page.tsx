"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function WomenPage() {
  const { lang, products } = useStore();
  const allProducts = products && products.length > 0 ? products : PRODUCTS;

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Category Hero Header */}
      <div className="space-y-3 border-b border-border/30 pb-6 max-w-xl">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold font-mono">
          Dhaka Atelier Collections
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          Women&apos;s Modest Silhouettes
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Flowing abayas, tailored three-piece sets, and sculpted linen corsets engineered for contemporary South Asian motion.
        </p>
      </div>

      {/* Category Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => {
          const count = allProducts.filter((p) => p.category === cat.slug).length;
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] border border-border/50 bg-surface-2 flex flex-col justify-end p-6 shadow-sm"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="object-cover h-full w-full absolute inset-0 transition-transform duration-700 ease-luxury-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="relative z-10 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-wider opacity-80 font-mono">
                  {count} Designs Available
                </span>
                <h3 className="font-serif text-2xl font-medium">
                  {lang === "bn" ? cat.nameBn : cat.name}
                </h3>
                <div className="pt-2 flex items-center gap-1.5 text-xs text-accent-ink group-hover:underline">
                  <span className="text-white font-medium">Explore Category</span>
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* All Products in Standard Format */}
      <div className="space-y-6 pt-6">
        <div className="flex items-center justify-between border-b border-border/20 pb-4">
          <h2 className="font-serif text-2xl font-medium text-text">
            All Women&apos;s Silhouettes ({allProducts.length})
          </h2>
          <Link href="/shop" className="text-xs uppercase tracking-wider text-accent-ink hover:underline font-semibold">
            View Complete Shop
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
