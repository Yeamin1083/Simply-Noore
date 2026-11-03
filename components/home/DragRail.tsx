"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";

interface DragRailProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
  products: Product[];
}

export function DragRail({ title, subtitle, viewAllHref, products }: DragRailProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-14 md:py-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header with Title and Scroll Controls */}
      <div className="flex items-end justify-between mb-8 pb-4 border-b border-border/30">
        <div>
          {subtitle && (
            <p className="text-xs uppercase tracking-widest text-accent-ink font-semibold mb-1">
              {subtitle}
            </p>
          )}
          <h2 className="font-serif text-2xl md:text-4xl text-text font-medium">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="hidden sm:inline-block text-xs uppercase tracking-widest font-medium text-muted hover:text-text mr-4 transition-colors"
            >
              View All
            </Link>
          )}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-text hover:bg-surface active:scale-95 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="h-10 w-10 rounded-full border border-border/50 flex items-center justify-center text-text hover:bg-surface active:scale-95 transition-all"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Standard Product Rail */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth pb-4"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] snap-start flex-shrink-0"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
