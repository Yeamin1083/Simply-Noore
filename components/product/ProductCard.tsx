"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Eye, Plus } from "lucide-react";
import { Product } from "@/lib/types";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=900&auto=format&fit=crop";

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { lang, isInWishlist, toggleWishlist, addToCart, setQuickViewProduct } =
    useStore();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeVariant =
    product.variants?.[selectedVariantIdx] ||
    product.variants?.[0] || {
      id: "var-default",
      name: product.title,
      colorName: "Natural",
      colorHex: "#C57045",
      washColor: "#F5DEC8",
      washInk: "#1F2A23",
      stockCount: 10,
      inStock: true,
      sizes: ["Standard"],
      image: FALLBACK_IMAGE,
    };

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
      size: activeVariant.sizes?.[0] || "Standard",
      price: product.price,
      image: activeVariant.image || FALLBACK_IMAGE,
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
      {/* Rectangular 3:4 image container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-2/40">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          {/* Primary image */}
          <img
            src={activeVariant.image || FALLBACK_IMAGE}
            alt={product.title}
            className={`h-full w-full object-cover transition-transform duration-700 ease-luxury-out group-hover:scale-105 ${
              isHovered && activeVariant.secondaryImage ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* Secondary image on hover if available */}
          {activeVariant.secondaryImage && (
            <img
              src={activeVariant.secondaryImage}
              alt={`${product.title} alternate`}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </Link>

        {/* Editorial Badge */}
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-espresso/80 text-bg backdrop-blur-sm dark:bg-accent/90 dark:text-bg">
            {product.badge}
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            isWished
              ? "bg-espresso text-bg dark:bg-accent dark:text-bg"
              : "bg-surface/80 text-muted hover:text-text hover:bg-surface"
          }`}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-4 w-4 ${isWished ? "fill-current" : ""}`} />
        </button>

        {/* Quick View Button (desktop hover) */}
        <button
          onClick={handleQuickView}
          className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 items-center gap-1.5 px-4 py-2 rounded-full bg-surface/95 text-text text-xs uppercase tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md backdrop-blur-sm hover:bg-surface"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Quick View</span>
        </button>
      </div>

      {/* Info container */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3">
        <div className="space-y-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-[11px] uppercase tracking-wider text-muted font-medium font-mono">
              {lang === "bn" ? product.categoryLabelBn || product.categoryLabel : product.categoryLabel}
            </span>

            {/* In-Stock Indicator */}
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                activeVariant.inStock ? "bg-emerald-500" : "bg-muted"
              }`}
              title={activeVariant.inStock ? "In atelier stock" : "Made to order"}
            />
          </div>

          <Link href={`/product/${product.slug}`} className="block group-hover:text-accent-ink transition-colors">
            <h3 className="font-serif text-base font-medium text-text line-clamp-1 leading-snug">
              {lang === "bn" ? product.titleBn || product.title : product.title}
            </h3>
          </Link>

          <p className="text-xs text-muted font-serif italic line-clamp-1">
            {product.fabricName}
          </p>
        </div>

        {/* Color swatches */}
        {product.variants && product.variants.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1">
            {product.variants.map((v, idx) => (
              <button
                key={v.id || idx}
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedVariantIdx(idx);
                }}
                className={`h-4 w-4 rounded-full border transition-all ${
                  selectedVariantIdx === idx
                    ? "border-espresso dark:border-accent scale-110"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: v.colorHex }}
                title={v.colorName}
              />
            ))}
          </div>
        )}

        {/* Price & Quick Add */}
        <div className="flex items-center justify-between pt-1 border-t border-border/20">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-sm font-semibold text-text">
              {formatBDT(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-muted line-through font-serif">
                {formatBDT(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="p-1.5 rounded-full hover:bg-surface-2 text-text border border-border/60 hover:border-text transition-colors"
            title="Quick add to bag"
            aria-label="Add to cart"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
