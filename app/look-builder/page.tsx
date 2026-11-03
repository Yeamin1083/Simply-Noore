"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Check, Share2, Layers } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";

export default function LookBuilderPage() {
  const { addToCart } = useStore();

  const abayas = PRODUCTS.filter((p) => p.category === "abayas");
  const sets = PRODUCTS.filter((p) => p.category === "three-piece-sets");
  const corsets = PRODUCTS.filter((p) => p.category === "corsets");

  const [selectedAbaya, setSelectedAbaya] = useState(abayas[0]);
  const [selectedCorset, setSelectedCorset] = useState(corsets[0]);
  const [showCorset, setShowCorset] = useState(true);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const lookTotal = selectedAbaya.price + (showCorset ? selectedCorset.price : 0);

  const handleAddLook = () => {
    addToCart({
      productId: selectedAbaya.id,
      variantId: selectedAbaya.variants[0].id,
      slug: selectedAbaya.slug,
      title: selectedAbaya.title,
      colorName: selectedAbaya.variants[0].colorName,
      size: "54",
      price: selectedAbaya.price,
      image: selectedAbaya.variants[0].image,
      quantity: 1,
    });

    if (showCorset) {
      addToCart({
        productId: selectedCorset.id,
        variantId: selectedCorset.variants[0].id,
        slug: selectedCorset.slug,
        title: selectedCorset.title,
        colorName: selectedCorset.variants[0].colorName,
        size: "M/L",
        price: selectedCorset.price,
        image: selectedCorset.variants[0].image,
        quantity: 1,
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShareLook = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        `${window.location.origin}/look/${selectedAbaya.slug}-${showCorset ? selectedCorset.slug : "none"}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/30 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
            ✦ Studio Feature #12
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-medium text-text mt-1">
            Atelier Look Builder
          </h1>
          <p className="text-xs md:text-sm text-muted mt-1 max-w-md">
            Harmonize silhouette layers on a flat-lay canvas. Test proportions and cinch options before ordering.
          </p>
        </div>

        <button
          onClick={handleShareLook}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-xs uppercase tracking-wider font-medium hover:bg-surface transition-colors"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
          <span>{copied ? "Look Copied" : "Share Look"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Styling Canvas */}
        <div className="lg:col-span-7 bg-surface-2/40 border border-border rounded-2xl p-6 md:p-12 relative flex items-center justify-center min-h-[500px]">
          <div className="relative aspect-[3/4] w-full max-w-md rounded-xl overflow-hidden shadow-2xl bg-surface border border-border">
            {/* Base Layer: Abaya */}
            <Image
              src={selectedAbaya.variants[0].image}
              alt={selectedAbaya.title}
              fill
              className="object-cover transition-opacity duration-300"
            />

            {/* Overlaid Layer: Corset Cinch */}
            {showCorset && (
              <div className="absolute inset-x-8 bottom-1/4 h-32 rounded-xl overflow-hidden border border-border shadow-xl backdrop-blur-sm bg-surface/30 flex items-center justify-center p-2 animate-in zoom-in-95 duration-200">
                <Image
                  src={selectedCorset.variants[0].image}
                  alt={selectedCorset.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right: Layer Selectors & Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Layer 1: Base Silhouette */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-text flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-accent-ink" />
              <span>Layer 01: Base Silhouette</span>
            </span>

            <div className="grid grid-cols-3 gap-2">
              {abayas.map((abaya) => (
                <button
                  key={abaya.id}
                  onClick={() => setSelectedAbaya(abaya)}
                  className={`p-2 rounded-lg border text-left text-xs transition-all ${
                    selectedAbaya.id === abaya.id
                      ? "border-accent-ink bg-surface shadow-sm ring-1 ring-accent-ink"
                      : "border-border/60 hover:border-text opacity-75"
                  }`}
                >
                  <div className="relative aspect-[3/4] rounded mb-1 overflow-hidden">
                    <Image src={abaya.variants[0].image} alt={abaya.title} fill className="object-cover" />
                  </div>
                  <p className="line-clamp-1 font-medium text-text">{abaya.title}</p>
                  <p className="text-muted">{formatBDT(abaya.price)}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Layer 2: Cinch / Corset Accent */}
          <div className="space-y-3 pt-4 border-t border-border/30">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider font-semibold text-text flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-accent-ink" />
                <span>Layer 02: Waist Cinch</span>
              </span>
              <button
                onClick={() => setShowCorset(!showCorset)}
                className="text-xs text-accent-ink hover:underline font-medium"
              >
                {showCorset ? "Remove Cinch" : "Add Cinch"}
              </button>
            </div>

            {showCorset && (
              <div className="grid grid-cols-2 gap-2">
                {corsets.map((corset) => (
                  <button
                    key={corset.id}
                    onClick={() => setSelectedCorset(corset)}
                    className={`p-2 rounded-lg border text-left text-xs transition-all ${
                      selectedCorset.id === corset.id
                        ? "border-accent-ink bg-surface shadow-sm ring-1 ring-accent-ink"
                        : "border-border/60 hover:border-text opacity-75"
                    }`}
                  >
                    <div className="relative aspect-[3/4] rounded mb-1 overflow-hidden">
                      <Image src={corset.variants[0].image} alt={corset.title} fill className="object-cover" />
                    </div>
                    <p className="line-clamp-1 font-medium text-text">{corset.title}</p>
                    <p className="text-muted">{formatBDT(corset.price)}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Total & Action */}
          <div className="pt-6 border-t border-border/40 space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-xs uppercase tracking-widest text-muted">
                Complete Look Total
              </span>
              <span className="font-serif text-3xl font-medium text-text">
                {formatBDT(lookTotal)}
              </span>
            </div>

            <button
              onClick={handleAddLook}
              disabled={added}
              className="w-full h-12 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] active:scale-95 transition-all"
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Added Complete Look</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Add the Look to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
