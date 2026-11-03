"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Sparkles, RotateCcw, Plus } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";

export default function StyleFinderPage() {
  const { lang, addToCart } = useStore();
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState("Eid");
  const [aesthetic, setAesthetic] = useState("Minimal");
  const [palette, setPalette] = useState("Terracotta & Warm");
  const [budget, setBudget] = useState("৳5,000 - ৳10,000");

  const [addedAll, setAddedAll] = useState(false);

  // Result items for the 3-piece edit
  const statementPiece = PRODUCTS[0]; // Rawdah Abaya
  const matchingPiece = PRODUCTS[1];  // Layla Ensemble
  const accentPiece = PRODUCTS[2];    // Safia Corset

  const totalEditPrice =
    statementPiece.price + matchingPiece.price + accentPiece.price;

  const handleAddAll = () => {
    [statementPiece, matchingPiece, accentPiece].forEach((p) => {
      addToCart({
        productId: p.id,
        variantId: p.variants[0].id,
        slug: p.slug,
        title: p.title,
        colorName: p.variants[0].colorName,
        size: p.variants[0].sizes[0] || "Standard",
        price: p.price,
        image: p.variants[0].image,
        quantity: 1,
      });
    });
    setAddedAll(true);
    setTimeout(() => setAddedAll(false), 2000);
  };

  return (
    <div className="py-12 md:py-20 px-4 md:px-8 max-w-5xl mx-auto min-h-[80vh] flex flex-col justify-center">
      {step < 4 ? (
        <div className="max-w-2xl mx-auto w-full space-y-8 animate-in fade-in duration-300">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs uppercase tracking-widest text-muted">
              <span>Step 0{step + 1} of 04</span>
              <span>The Nooré Consultation</span>
            </div>
            <div className="w-full bg-border/40 h-1 rounded-full overflow-hidden">
              <div
                className="bg-accent-ink h-full transition-all duration-300 rounded-full"
                style={{ width: `${((step + 1) / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1: Occasion */}
          {step === 0 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
                  Occasion Setting
                </span>
                <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
                  Where will this silhouette accompany you?
                </h1>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Everyday Ease",
                  "Office & Executive",
                  "Eid Celebration",
                  "Wedding Reception",
                  "Ramadan Gathering",
                  "Sanctuary & Prayer",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setOccasion(opt)}
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      occasion === opt
                        ? "border-accent-ink bg-surface text-text shadow-sm"
                        : "border-border/50 text-muted hover:border-text hover:text-text"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Aesthetic */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
                  Aesthetic Character
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-medium text-text">
                  What character should your silhouette express?
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Minimal & Architectural",
                  "Fluid & Cascading",
                  "Tiered & Layered",
                  "Classic & Restrained",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setAesthetic(opt)}
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      aesthetic === opt
                        ? "border-accent-ink bg-surface text-text shadow-sm"
                        : "border-border/50 text-muted hover:border-text hover:text-text"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Color Palette */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
                  Color Palette
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-medium text-text">
                  Choose your tone family
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Terracotta & Sunset Warmth",
                  "Deep Onyx & Espresso",
                  "Desert Sand & Neutral Creams",
                  "Dusty Blossom & Rose",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setPalette(opt)}
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      palette === opt
                        ? "border-accent-ink bg-surface text-text shadow-sm"
                        : "border-border/50 text-muted hover:border-text hover:text-text"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Budget */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
                  Investment Range
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-medium text-text">
                  Select your composition budget
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Under ৳5,000",
                  "৳5,000 - ৳10,000",
                  "৳10,000 - ৳15,000",
                  "৳15,000+ (Couture Layering)",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setBudget(opt)}
                    className={`p-4 rounded-xl border text-left text-sm font-medium transition-all ${
                      budget === opt
                        ? "border-accent-ink bg-surface text-text shadow-sm"
                        : "border-border/50 text-muted hover:border-text hover:text-text"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-6 border-t border-border/30">
            {step > 0 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="text-xs uppercase tracking-widest text-muted hover:text-text font-medium"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={() => setStep(step + 1)}
              className="px-8 py-3.5 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg text-xs uppercase tracking-widest font-semibold flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
            >
              <span>{step === 3 ? "Generate Edit" : "Continue"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-ink/10 text-accent-ink text-xs uppercase tracking-widest font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Your Curated Composition</span>
            </div>
            <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
              The {occasion} Edit
            </h1>
            <p className="text-xs md:text-sm text-muted">
              Orchestrated for {aesthetic.toLowerCase()} presence in {palette.toLowerCase()} palette.
            </p>
          </div>

          {/* 3-Piece Edit Grid (Standard Format Boxes) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 01 Statement */}
            <div className="p-4 rounded-xl bg-surface border border-border space-y-3">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-2">
                <Image
                  src={statementPiece.variants[0].image}
                  alt={statementPiece.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-bg/90 font-medium text-text">
                  01 / The Statement
                </span>
              </div>
              <h3 className="font-serif text-lg font-medium text-text">
                {statementPiece.title}
              </h3>
              <p className="font-serif text-base font-medium text-accent-ink">
                {formatBDT(statementPiece.price)}
              </p>
            </div>

            {/* 02 The Match */}
            <div className="p-4 rounded-xl bg-surface border border-border space-y-3">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-2">
                <Image
                  src={matchingPiece.variants[0].image}
                  alt={matchingPiece.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-bg/90 font-medium text-text">
                  02 / The Match
                </span>
              </div>
              <h3 className="font-serif text-lg font-medium text-text">
                {matchingPiece.title}
              </h3>
              <p className="font-serif text-base font-medium text-accent-ink">
                {formatBDT(matchingPiece.price)}
              </p>
            </div>

            {/* 03 The Accent */}
            <div className="p-4 rounded-xl bg-surface border border-border space-y-3">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-surface-2">
                <Image
                  src={accentPiece.variants[0].image}
                  alt={accentPiece.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-bg/90 font-medium text-text">
                  03 / The Accent
                </span>
              </div>
              <h3 className="font-serif text-lg font-medium text-text">
                {accentPiece.title}
              </h3>
              <p className="font-serif text-base font-medium text-accent-ink">
                {formatBDT(accentPiece.price)}
              </p>
            </div>
          </div>

          {/* Action Panel */}
          <div className="p-6 rounded-2xl bg-surface-2 border border-border/60 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-muted block">
                Full 3-Piece Edit Combined:
              </span>
              <span className="font-serif text-2xl font-medium text-text">
                {formatBDT(totalEditPrice)}
              </span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(0)}
                className="px-5 py-3 rounded-full border border-border hover:bg-surface text-xs uppercase tracking-widest font-medium flex items-center gap-1.5"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Restart</span>
              </button>

              <button
                onClick={handleAddAll}
                disabled={addedAll}
                className="px-8 py-3.5 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                {addedAll ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Entire Edit Added</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Add Entire Edit to Bag</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
