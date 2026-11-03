"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";

export function HeroScene() {
  const { lang, addToCart } = useStore();
  const heroProduct = PRODUCTS[0]; // Rawdah Draped Abaya
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const activeVariant = heroProduct.variants[selectedVariantIdx];

  const handleAdd = () => {
    addToCart({
      productId: heroProduct.id,
      variantId: activeVariant.id,
      slug: heroProduct.slug,
      title: heroProduct.title,
      colorName: activeVariant.colorName,
      size: "54",
      price: heroProduct.price,
      image: activeVariant.image,
      quantity: 1,
    });
  };

  return (
    <section
      className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden transition-colors duration-700 px-4 md:px-8 py-12 md:py-20"
      style={{
        backgroundColor: activeVariant.washColor,
        color: activeVariant.washInk,
      }}
    >
      {/* M3 Giant Ghost Word */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
      >
        <span
          className="font-serif text-[28vw] lg:text-[34vw] font-bold leading-none tracking-tighter opacity-15 transition-colors duration-700"
          style={{ color: activeVariant.washGhost }}
        >
          NOORÉ
        </span>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Editorial Copy */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-current/20 text-xs uppercase tracking-widest font-medium">
            <span>01 / The Hero Piece</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]">
            {lang === "bn" ? heroProduct.titleBn : heroProduct.title}
          </h1>

          <p className="text-sm md:text-base opacity-80 max-w-md mx-auto lg:mx-0 leading-relaxed">
            {lang === "bn" ? heroProduct.descriptionBn : heroProduct.description}
          </p>

          <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
            <span className="font-serif text-2xl md:text-3xl font-medium">
              {formatBDT(heroProduct.price)}
            </span>
            <span className="text-xs uppercase tracking-widest opacity-60">
              {activeVariant.colorName} • {heroProduct.fabricName}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-4">
            <button
              onClick={handleAdd}
              className="h-12 px-7 rounded-full bg-espresso text-on-espresso dark:bg-accent dark:text-bg font-medium text-xs uppercase tracking-widest shadow-md hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{lang === "bn" ? "অর্ডারে যোগ করুন" : "Add to Cart"}</span>
              <Plus className="h-4 w-4" />
            </button>

            <Link
              href={`/product/${heroProduct.slug}`}
              className="h-12 px-6 rounded-full border border-current/30 hover:border-current font-medium text-xs uppercase tracking-widest flex items-center gap-2 transition-all hover:scale-[1.02]"
            >
              <span>{lang === "bn" ? "বিস্তারিত দেখুন" : "Discover Piece"}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Center: Floating Hero Piece with Hotspots */}
        <div className="lg:col-span-7 relative flex justify-center items-center">
          <div className="relative w-full max-w-md lg:max-w-lg aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 border border-current/10">
            <Image
              src={activeVariant.image}
              alt={heroProduct.title}
              fill
              priority
              className="object-cover animate-float"
            />

            {/* M5 Piece Anatomy Hotspots */}
            {heroProduct.hotspots?.map((hotspot) => {
              const isOpen = activeHotspot === hotspot.id;
              return (
                <div
                  key={hotspot.id}
                  className="absolute z-20"
                  style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                >
                  <button
                    onClick={() => setActiveHotspot(isOpen ? null : hotspot.id)}
                    aria-label={hotspot.title}
                    className="relative -translate-x-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-bg/95 text-text border border-border shadow-lg flex items-center justify-center text-[10px] font-bold tracking-tight hover:scale-110 transition-transform"
                  >
                    {hotspot.index}
                  </button>

                  {/* Hotspot details popover */}
                  {isOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-9 w-48 p-3 rounded-xl bg-surface text-text shadow-xl border border-border text-xs z-30 animate-in fade-in zoom-in-95 duration-200">
                      <p className="font-semibold mb-1 text-[11px] uppercase tracking-wider text-accent-ink">
                        {hotspot.title}
                      </p>
                      <p className="text-muted leading-tight text-[11px]">
                        {hotspot.detail}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Floating Swatch Switcher (M4) */}
          <div className="absolute -right-2 md:right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 p-2 rounded-full bg-surface/80 backdrop-blur-md border border-border/40 shadow-lg z-20">
            {heroProduct.variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantIdx(idx)}
                title={v.colorName}
                aria-label={v.colorName}
                className={`h-6 w-6 rounded-full transition-transform ${
                  selectedVariantIdx === idx
                    ? "ring-2 ring-offset-2 ring-current scale-125"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: v.colorHex }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
