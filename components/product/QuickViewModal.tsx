"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, CheckCircle2, Ruler, Sparkles, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";

interface SizeOption {
  size: string;
  height: string;
  desc: string;
}

const SIZE_GUIDES: SizeOption[] = [
  { size: "52", height: "5'0\" – 5'2\"", desc: "Abaya Length 52\"" },
  { size: "54", height: "5'3\" – 5'5\"", desc: "Abaya Length 54\" (Standard)" },
  { size: "56", height: "5'6\" – 5'8\"", desc: "Abaya Length 56\"" },
  { size: "58", height: "5'9\"+", desc: "Abaya Length 58\" (Tall)" },
];

export function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart } = useStore();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState("54");
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  if (!quickViewProduct) return null;

  const currentVariant = quickViewProduct.variants[selectedVariantIdx] || quickViewProduct.variants[0];
  const views = ["Front View", "Side Silhouette", "Fabric Detail", "Back Drape"];

  const currentSizeObj = SIZE_GUIDES.find((s) => s.size === selectedSize) || {
    size: selectedSize,
    height: "Universal modest fit",
    desc: `Length ${selectedSize}"`,
  };

  const handleAdd = () => {
    addToCart({
      productId: quickViewProduct.id,
      variantId: currentVariant.id,
      slug: quickViewProduct.slug,
      title: quickViewProduct.title,
      colorName: currentVariant.colorName,
      size: selectedSize,
      price: quickViewProduct.price,
      image: currentVariant.image,
      quantity: 1,
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      setQuickViewProduct(null);
    }, 900);
  };

  return (
    <>
      <div
        className="scrim on"
        id="scrim"
        onClick={() => setQuickViewProduct(null)}
        aria-hidden="true"
      />

      <div
        className="qv on"
        id="qv"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qvT"
      >
        <button
          className="ib round close"
          type="button"
          id="qvClose"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Gallery on Left */}
        <div className="gal">
          <div className="thumbs" id="thumbs">
            {views.map((v, i) => (
              <button
                key={v}
                type="button"
                aria-pressed={selectedThumb === i}
                onClick={() => setSelectedThumb(i)}
                aria-label={`${v} view`}
                className="overflow-hidden rounded-lg relative"
              >
                <div
                  className="ph t-sage"
                  style={{
                    filter:
                      i === 1
                        ? "saturate(.9) brightness(1.05)"
                        : i === 2
                        ? "contrast(1.1)"
                        : i === 3
                        ? "brightness(.92)"
                        : "none",
                  }}
                />
              </button>
            ))}
          </div>

          <div className="mainph">
            <div className="ph t-sage relative h-full w-full" id="qvMain">
              <span className="ph-l" id="qvLbl">
                {views[selectedThumb]} · {currentVariant.colorName}
              </span>
            </div>
          </div>
        </div>

        {/* Info & Selectors on Right */}
        <div className="info p-6 md:p-8 space-y-5">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-accent-ink font-semibold">
              {quickViewProduct.categoryLabel}
            </span>
            <h2 id="qvT" className="font-serif text-2xl md:text-3xl font-medium text-text mt-1">
              {quickViewProduct.title}
            </h2>
            <p className="price text-xl font-semibold text-text mt-1">
              {formatBDT(quickViewProduct.price)}
            </p>
          </div>

          <p className="text-xs text-muted leading-relaxed">
            {quickViewProduct.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-2 pt-1 border-t border-border/40">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-text">
                Color: <span className="text-accent-ink font-normal">{currentVariant.colorName}</span>
              </span>
              <span className="text-[11px] text-muted">
                {currentVariant.stockCount} in Dhaka atelier
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              {quickViewProduct.variants.map((v, idx) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setSelectedVariantIdx(idx)}
                  className={`h-9 w-9 rounded-full relative transition-all flex items-center justify-center ${
                    selectedVariantIdx === idx
                      ? "ring-2 ring-offset-2 ring-accent-ink scale-110 shadow-sm"
                      : "opacity-75 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: v.colorHex }}
                  title={v.colorName}
                  aria-label={v.colorName}
                >
                  {selectedVariantIdx === idx && (
                    <Check className="h-3.5 w-3.5 text-white drop-shadow-md" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* User-Friendly Size Selection */}
          <div className="space-y-2 pt-2 border-t border-border/40">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-text flex items-center gap-1.5">
                <Ruler className="h-3.5 w-3.5 text-accent-ink" />
                <span>Length / Size Selection:</span>
              </span>
              <span className="text-[11px] text-muted">
                Fits true to size (96% verified)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SIZE_GUIDES.map((item) => {
                const isSelected = selectedSize === item.size;
                return (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => setSelectedSize(item.size)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-accent-ink text-white border-accent-ink shadow-md"
                        : "bg-surface-2/40 text-text border-border/60 hover:border-text/40"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <span className="font-bold text-sm font-serif">Size {item.size}</span>
                      {isSelected && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className={`text-[10px] mt-1 line-clamp-1 ${isSelected ? "text-white/90" : "text-muted"}`}>
                      {item.height}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Clear visual feedback box for selected size */}
            <div className="p-2.5 rounded-lg bg-surface-2/60 border border-border/50 text-[11px] text-text flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
              <span>
                Selected: <strong>Size {currentSizeObj.size}</strong> ({currentSizeObj.desc} • Fits Height {currentSizeObj.height})
              </span>
            </div>
          </div>

          {/* Action button */}
          <button
            className={`pill full w-full justify-center transition-all ${
              isAdded ? "bg-emerald-600 text-white" : ""
            }`}
            type="button"
            id="qvAdd"
            onClick={handleAdd}
            disabled={isAdded}
          >
            {isAdded ? (
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" /> Added to Your Bag
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>Add to Bag • {formatBDT(quickViewProduct.price)}</span>
                <span className="plus">+</span>
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
