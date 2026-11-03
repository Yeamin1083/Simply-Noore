"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Check, Share2, Layers } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";

export default function LookBuilderPage() {
  const { addToCart, products } = useStore();
  const allProducts = products && products.length > 0 ? products : PRODUCTS;

  const abayas = allProducts.filter((p) => p.category === "abayas");
  const corsets = allProducts.filter((p) => p.category === "corsets");

  const fallbackAbaya = abayas[0] || allProducts[0];
  const fallbackCorset = corsets[0] || allProducts[2] || allProducts[0];

  const [selectedAbaya, setSelectedAbaya] = useState(fallbackAbaya);
  const [selectedCorset, setSelectedCorset] = useState(fallbackCorset);
  const [showCorset, setShowCorset] = useState(true);
  const [added, setAdded] = useState(false);
  const [copied, setCopied] = useState(false);

  const lookTotal =
    (selectedAbaya?.price || 0) + (showCorset && selectedCorset ? selectedCorset.price : 0);

  const handleAddLook = () => {
    if (!selectedAbaya) return;
    const abayaVar = selectedAbaya.variants?.[0] || {
      id: "v1",
      colorName: "Natural",
      image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=900&auto=format&fit=crop",
    };

    addToCart({
      productId: selectedAbaya.id,
      variantId: abayaVar.id,
      slug: selectedAbaya.slug,
      title: selectedAbaya.title,
      colorName: abayaVar.colorName,
      size: "54",
      price: selectedAbaya.price,
      image: abayaVar.image,
      quantity: 1,
    });

    if (showCorset && selectedCorset) {
      const corsetVar = selectedCorset.variants?.[0] || {
        id: "v2",
        colorName: "Oat",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop",
      };
      addToCart({
        productId: selectedCorset.id,
        variantId: corsetVar.id,
        slug: selectedCorset.slug,
        title: selectedCorset.title,
        colorName: corsetVar.colorName,
        size: "M/L",
        price: selectedCorset.price,
        image: corsetVar.image,
        quantity: 1,
      });
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShareLook = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        `${window.location.origin}/look-builder?abaya=${selectedAbaya?.slug}&corset=${selectedCorset?.slug}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const abayaVar = selectedAbaya?.variants?.[0];
  const corsetVar = selectedCorset?.variants?.[0];

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Editorial Header */}
      <div className="space-y-3 border-b border-border/30 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold font-mono">
            ✦ Look Builder (#12)
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
            Sculpt Your Silhouette
          </h1>
          <p className="text-sm text-muted">
            Pair fluid base abayas with tailored corset structuring. Instant multi-garment add-to-bag with bundle privilege.
          </p>
        </div>

        <button
          onClick={handleShareLook}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-surface text-xs uppercase tracking-wider font-semibold text-text hover:bg-surface-2 transition-colors self-start md:self-auto"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
          <span>{copied ? "Link Copied" : "Share Look (#17)"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Interactive Staging Preview */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-surface-2 shadow-lg border border-border">
            {/* Base Abaya Image */}
            {abayaVar && (
              <img
                src={abayaVar.image}
                alt={selectedAbaya.title}
                className="object-cover h-full w-full"
              />
            )}

            {/* Overlaid Corset Preview */}
            {showCorset && corsetVar && (
              <div className="absolute inset-x-8 bottom-12 p-4 rounded-xl bg-surface/90 backdrop-blur-md border border-border/80 shadow-xl flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="h-16 w-14 rounded-lg overflow-hidden bg-surface-2 flex-shrink-0 border border-border">
                  <img
                    src={corsetVar.image}
                    alt={selectedCorset.title}
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="space-y-0.5 flex-1 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-accent-ink font-semibold font-mono">
                    Sculpted Accent Layer
                  </span>
                  <p className="font-serif font-medium text-text text-sm">{selectedCorset.title}</p>
                  <p className="text-muted text-[11px] font-mono">{formatBDT(selectedCorset.price)}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Silhouette & Layer Selector */}
        <div className="lg:col-span-5 space-y-8">
          {/* Base Layer: Abayas */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-muted font-semibold block font-mono">
              Step 1: Choose Base Drape
            </span>
            <div className="grid grid-cols-2 gap-3">
              {abayas.map((a) => {
                const isSelected = selectedAbaya?.id === a.id;
                const v = a.variants?.[0];
                return (
                  <button
                    key={a.id}
                    onClick={() => setSelectedAbaya(a)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? "border-espresso bg-espresso/5 dark:border-accent dark:bg-accent/10 shadow-sm"
                        : "border-border/60 hover:bg-surface-2/40"
                    }`}
                  >
                    {v && (
                      <div className="h-12 w-10 rounded-md overflow-hidden bg-surface-2 flex-shrink-0">
                        <img src={v.image} alt={a.title} className="object-cover h-full w-full" />
                      </div>
                    )}
                    <div className="space-y-0.5 min-w-0">
                      <p className="font-serif text-xs font-semibold text-text truncate">{a.title}</p>
                      <p className="text-[11px] text-muted font-mono">{formatBDT(a.price)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accent Layer: Corsets */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted font-semibold font-mono">
                Step 2: Add Sculpted Cinch
              </span>
              <button
                onClick={() => setShowCorset(!showCorset)}
                className="text-xs text-accent-ink hover:underline font-medium"
              >
                {showCorset ? "Remove Cinch" : "+ Add Cinch"}
              </button>
            </div>

            {showCorset && (
              <div className="grid grid-cols-2 gap-3 animate-in fade-in duration-200">
                {corsets.map((c) => {
                  const isSelected = selectedCorset?.id === c.id;
                  const v = c.variants?.[0];
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCorset(c)}
                      className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all ${
                        isSelected
                          ? "border-espresso bg-espresso/5 dark:border-accent dark:bg-accent/10 shadow-sm"
                          : "border-border/60 hover:bg-surface-2/40"
                      }`}
                    >
                      {v && (
                        <div className="h-12 w-10 rounded-md overflow-hidden bg-surface-2 flex-shrink-0">
                          <img src={v.image} alt={c.title} className="object-cover h-full w-full" />
                        </div>
                      )}
                      <div className="space-y-0.5 min-w-0">
                        <p className="font-serif text-xs font-semibold text-text truncate">{c.title}</p>
                        <p className="text-[11px] text-muted font-mono">{formatBDT(c.price)}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pricing & Add All to Bag */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs text-muted">
                <span>Base Silhouette ({selectedAbaya?.title})</span>
                <span className="font-mono">{formatBDT(selectedAbaya?.price || 0)}</span>
              </div>
              {showCorset && selectedCorset && (
                <div className="flex justify-between items-center text-xs text-muted">
                  <span>Sculpted Accent ({selectedCorset?.title})</span>
                  <span className="font-mono">{formatBDT(selectedCorset?.price || 0)}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline pt-2 border-t border-border/30">
                <span className="font-serif text-base font-semibold text-text">Look Total</span>
                <span className="font-serif text-2xl font-bold text-accent-ink">{formatBDT(lookTotal)}</span>
              </div>
            </div>

            <button
              onClick={handleAddLook}
              className={`w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-espresso text-bg dark:bg-accent dark:text-bg hover:opacity-95"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Look Added to Bag ✦</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Add Complete Look to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
