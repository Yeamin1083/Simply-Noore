"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function WomenPage() {
  const { lang } = useStore();

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-border/30 pb-8 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-accent-ink font-semibold">
          Department
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-text">
          Women&apos;s Modest Atelier
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          {lang === "bn"
            ? "আধুনিক মুসলিম নারীদের জন্য মার্জিত ও পরিশীলিত পোশাক।"
            : "Sculptural silhouettes tailored for contemporary modest presence. Fluid drapes, weighted hems, and breathable natural fibers."}
        </p>
      </div>

      {/* Category Nav Cards (Standard modern format) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="group relative aspect-[16/10] rounded-xl overflow-hidden border border-border/40 shadow-sm hover:shadow-md transition-all"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-700 ease-luxury-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/40 to-transparent" />
            <div className="absolute inset-x-5 bottom-5 text-on-espresso flex items-end justify-between">
              <div>
                <h3 className="font-serif text-xl font-medium">{cat.name}</h3>
                <p className="text-xs opacity-75">{cat.itemCount} Designs</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-bg/20 backdrop-blur-md flex items-center justify-center group-hover:bg-bg/40 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* All Products in Standard Format */}
      <div className="space-y-6 pt-6">
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-text">
          All Women&apos;s Designs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </div>
  );
}
