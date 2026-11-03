"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Eye, Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { lang, isInWishlist, toggleWishlist, addToCart, setQuickViewProduct } =
    useStore();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const isWished = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      productId: product.id,
      variantId: activeVariant.id,
      slug: product.slug,
      title: product.title,
      colorName: activeVariant.colorName,
      size: activeVariant.sizes[0] || "Standard",
      price: product.price,
      image: activeVariant.image,
      quantity: 1,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  return (
    <div
      className="group relative flex flex-col bg-surface/50 border border-border/40 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Standard rectangular 3:4 image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-2/40">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          {/* Primary image */}
          <Image
            src={activeVariant.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={priority}
            className={`object-cover transition-transform duration-700 ease-luxury-out group-hover:scale-105 ${
              isHovered && activeVariant.secondaryImage ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Secondary image crossfade */}
          {activeVariant.secondaryImage && (
            <Image
              src={activeVariant.secondaryImage}
              alt={`${product.title} alternative`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-500 ease-luxury-out ${
                isHovered ? "opacity-100 scale-105" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase bg-bg/90 backdrop-blur-md text-text border border-border/30 rounded-full">
              {product.badge}
            </span>
          )}
          {product.isMadeToOrder && (
            <span className="px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase bg-accent-ink text-bg rounded-full">
              Made to Order
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-bg/80 backdrop-blur-md border border-border/40 flex items-center justify-center text-text transition-all duration-200 hover:scale-110 z-10"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isWished ? "fill-accent-ink text-accent-ink" : "text-muted hover:text-text"
            }`}
          />
        </button>

        {/* Quick action bar on desktop hover */}
        <div className="absolute inset-x-3 bottom-3 hidden md:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={handleQuickAdd}
            className="flex-1 h-9 px-3 bg-espresso text-bg dark:bg-accent dark:text-bg rounded-lg text-xs font-medium tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add</span>
          </button>
          <button
            onClick={handleQuickView}
            aria-label="Quick view"
            className="h-9 w-9 bg-bg/90 backdrop-blur-md border border-border text-text rounded-lg flex items-center justify-center hover:bg-surface active:scale-95 transition-all"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Details Box */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Color Swatches */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] uppercase tracking-wider text-muted font-medium">
              {lang === "bn" ? product.categoryLabelBn : product.categoryLabel}
            </span>

            {/* Swatch dots */}
            {product.variants.length > 1 && (
              <div className="flex items-center gap-1.5">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIdx(idx)}
                    title={v.colorName}
                    aria-label={v.colorName}
                    className={`h-3 w-3 rounded-full transition-transform ${
                      selectedVariantIdx === idx
                        ? "ring-1 ring-offset-1 ring-accent-ink scale-110"
                        : "opacity-75 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: v.colorHex }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-accent-ink transition-colors">
            <h3 className="font-serif text-base md:text-lg leading-snug font-medium text-text line-clamp-1">
              {lang === "bn" ? product.titleBn : product.title}
            </h3>
          </Link>
        </div>

        {/* Price & Rating */}
        <div className="mt-3 pt-2.5 border-t border-border/30 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-medium text-sm md:text-base text-text dark:text-champagne">
              {formatBDT(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted line-through">
                {formatBDT(product.originalPrice)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-muted">
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
