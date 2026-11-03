"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Plus,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Ruler,
  HelpCircle,
  MessageCircle,
} from "lucide-react";
import { Product, Fabric } from "@/lib/types";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";

interface ProductDetailViewProps {
  product: Product;
  fabric: Fabric;
  bundlePiece: Product;
}

export function ProductDetailView({ product, fabric, bundlePiece }: ProductDetailViewProps) {
  const { lang, addToCart, isInWishlist, toggleWishlist, products } = useStore();
  const liveProduct = products?.find((p) => p.slug === product.slug || p.id === product.id) || product;

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [customLength, setCustomLength] = useState<number>(54);
  const [isCustomLengthOpen, setIsCustomLengthOpen] = useState(false);
  const [showSizeAssistant, setShowSizeAssistant] = useState(false);
  const [userHeight, setUserHeight] = useState("5'4\"");
  const [added, setAdded] = useState(false);

  const activeVariant =
    liveProduct.variants?.[selectedVariantIdx] ||
    liveProduct.variants?.[0] || {
      id: "v1",
      name: liveProduct.title,
      colorName: "Natural",
      colorHex: "#C57045",
      washColor: "#F5DEC8",
      washInk: "#1F2A23",
      stockCount: 10,
      sizes: ["52", "54", "56"],
      image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=900&auto=format&fit=crop",
    };
  const currentSize = selectedSize || activeVariant.sizes?.[0] || "Standard";
  const isWished = isInWishlist(liveProduct.id);

  const handleAddToCart = () => {
    addToCart({
      productId: liveProduct.id,
      variantId: activeVariant.id,
      slug: liveProduct.slug,
      title: liveProduct.title,
      colorName: activeVariant.colorName,
      size: currentSize,
      price: liveProduct.price,
      image: activeVariant.image,
      quantity: 1,
      customLength: isCustomLengthOpen ? customLength : undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleAddBundle = () => {
    handleAddToCart();
    addToCart({
      productId: bundlePiece.id,
      variantId: bundlePiece.variants[0].id,
      slug: bundlePiece.slug,
      title: bundlePiece.title,
      colorName: bundlePiece.variants[0].colorName,
      size: bundlePiece.variants[0].sizes[0] || "Standard",
      price: bundlePiece.price,
      image: bundlePiece.variants[0].image,
      quantity: 1,
    });
  };

  return (
    <div
      className="transition-colors duration-700 min-h-screen"
      style={{
        backgroundColor: activeVariant.washColor,
        color: activeVariant.washInk,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16 space-y-16 animate-in fade-in duration-300">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-wider opacity-70">
          <Link href="/women" className="hover:underline">Women</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:underline">
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="font-semibold">{product.title}</span>
        </div>

        {/* Top Product Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: 3:4 Standard Luxury Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl border border-current/10 bg-surface/50">
              <img
                src={activeVariant.image}
                alt={liveProduct.title}
                className="object-cover h-full w-full"
              />

              {/* Anatomy Hotspots Overlay (M5, #13) */}
              {liveProduct.hotspots?.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className="absolute z-10 group"
                  style={{ top: `${hotspot.y}%`, left: `${hotspot.x}%` }}
                >
                  <button
                    aria-label={hotspot.title}
                    className="h-7 w-7 rounded-full bg-surface/90 text-text backdrop-blur-md border border-current/20 flex items-center justify-center text-xs font-mono font-semibold shadow-lg hover:scale-125 transition-transform"
                  >
                    ✦
                  </button>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block w-48 p-2.5 rounded-xl bg-surface/95 text-text border border-border text-[11px] shadow-xl pointer-events-none backdrop-blur-md">
                    <p className="font-semibold text-accent-ink">{hotspot.title}</p>
                    <p className="text-muted leading-tight mt-0.5">{hotspot.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Micro thumbnail strip */}
            {liveProduct.variants && liveProduct.variants.length > 1 && (
              <div className="flex gap-3">
                {liveProduct.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIdx(idx)}
                    className={`relative h-20 w-16 aspect-[3/4] rounded-lg overflow-hidden border transition-all ${
                      selectedVariantIdx === idx
                        ? "border-current ring-2 ring-current/40 scale-105"
                        : "border-current/20 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={v.image} alt={v.colorName} className="object-cover h-full w-full" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Garment Selection Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-widest opacity-75 font-mono">
                  {product.categoryLabel}
                </span>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={isWished ? "Saved" : "Save"}
                  className="h-8 w-8 rounded-full border border-current/20 flex items-center justify-center hover:bg-current/10 transition-colors"
                >
                  <Heart
                    className={`h-4 w-4 ${isWished ? "fill-current text-current" : "opacity-70"}`}
                  />
                </button>
              </div>

              <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-tight">
                {lang === "bn" ? product.titleBn : product.title}
              </h1>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="font-serif text-2xl md:text-3xl font-medium">
                  {formatBDT(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm line-through opacity-50">
                    {formatBDT(product.originalPrice)}
                  </span>
                )}
                {product.badge && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase border border-current/30">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Fit Voice (#16) */}
              {product.fitsTrueToSizePercent && (
                <div className="pt-2 text-xs flex items-center gap-1.5 opacity-80">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span>
                    Fits true to size for {product.fitsTrueToSizePercent}% of verified buyers (sample size: {product.reviewCount})
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed opacity-85">
              {lang === "bn" ? product.descriptionBn : product.description}
            </p>

            {/* Color Swatches (M4 Scene Wash Switcher) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between text-xs uppercase tracking-wider font-medium">
                <span>Color: <strong className="text-accent-ink">{activeVariant.colorName}</strong></span>
                <span className="opacity-70 font-mono text-[11px]">{activeVariant.stockCount} in Dhaka atelier</span>
              </div>
              <div className="flex items-center gap-3">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVariantIdx(idx);
                      setSelectedSize(v.sizes[0]);
                    }}
                    title={v.colorName}
                    aria-label={v.colorName}
                    className={`h-9 w-9 rounded-full transition-all flex items-center justify-center ${
                      selectedVariantIdx === idx
                        ? "ring-2 ring-offset-2 ring-current scale-110 shadow-md"
                        : "opacity-75 hover:opacity-100"
                    }`}
                    style={{ backgroundColor: v.colorHex }}
                  >
                    {selectedVariantIdx === idx && (
                      <Check className="h-3.5 w-3.5 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector + Smart Size Assistant (#5) */}
            <div className="space-y-2.5 pt-2">
              <div className="flex justify-between items-center text-xs uppercase tracking-wider font-medium">
                <span className="flex items-center gap-1.5">
                  <Ruler className="h-3.5 w-3.5" />
                  <span>Length / Size</span>
                </span>
                <button
                  onClick={() => setShowSizeAssistant(!showSizeAssistant)}
                  className="text-accent-ink hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Size Recommendation Guide</span>
                </button>
              </div>

              {/* Size Buttons Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activeVariant.sizes.map((size) => {
                  const isSelected = currentSize === size;
                  const heightMap: Record<string, string> = {
                    "52": "Height 5'0\" – 5'2\"",
                    "54": "Height 5'3\" – 5'5\"",
                    "56": "Height 5'6\" – 5'8\"",
                    "58": "Height 5'9\"+",
                    "Free Size": "Universal Fit",
                    "Standard": "Universal Fit",
                  };
                  const heightDesc = heightMap[size] || "Standard Fit";

                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-text text-bg border-text shadow-md font-semibold ring-1 ring-current"
                          : "border-current/25 hover:border-current/60 bg-current/5"
                      }`}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="font-serif text-sm font-bold">Size {size}</span>
                        {isSelected && <Check className="h-3.5 w-3.5 text-bg" />}
                      </div>
                      <span className={`text-[10px] mt-1 font-normal ${isSelected ? "opacity-90" : "opacity-70"}`}>
                        {heightDesc}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Clear visual feedback box for selected size */}
              <div className="p-2.5 rounded-lg bg-current/10 border border-current/20 text-[11px] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>
                  Selected: <strong>Size {currentSize}</strong> ({activeVariant.colorName} • Length {currentSize}&quot;)
                </span>
              </div>

              {/* Size Assistant Helper Drawer */}
              {showSizeAssistant && (
                <div className="p-4 rounded-xl bg-surface/95 text-text border border-border text-xs space-y-3 mt-3 animate-in fade-in shadow-xl">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-accent-ink">Size Recommendation Calculator</span>
                    <button onClick={() => setShowSizeAssistant(false)} className="text-muted hover:text-text">
                      ✕
                    </button>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span>Your height:</span>
                    <select
                      value={userHeight}
                      onChange={(e) => {
                        setUserHeight(e.target.value);
                        if (e.target.value === "5-0") setSelectedSize("52");
                        if (e.target.value === "5-3") setSelectedSize("54");
                        if (e.target.value === "5-6") setSelectedSize("56");
                        if (e.target.value === "5-9") setSelectedSize("58");
                      }}
                      className="bg-bg border border-border rounded px-2.5 py-1 text-text"
                    >
                      <option value="5-0">5&apos;0&quot; – 5&apos;2&quot; (Auto-select Size 52)</option>
                      <option value="5-3">5&apos;3&quot; – 5&apos;5&quot; (Auto-select Size 54)</option>
                      <option value="5-6">5&apos;6&quot; – 5&apos;8&quot; (Auto-select Size 56)</option>
                      <option value="5-9">5&apos;9&quot;+ (Auto-select Size 58)</option>
                    </select>
                  </div>
                  <p className="text-muted leading-tight text-[11px]">
                    Recommendation: For flat footwear, select exact floor height. For 2-3 inch heels, we suggest sizing one increment up (e.g. Size 56).
                  </p>
                </div>
              )}
            </div>

            {/* Custom Length / Made-to-Order Toggle (#15) */}
            <div className="pt-2 border-t border-current/15">
              <button
                onClick={() => setIsCustomLengthOpen(!isCustomLengthOpen)}
                className="text-xs uppercase tracking-wider font-medium flex items-center justify-between w-full hover:opacity-80"
              >
                <span>Need Custom Length or Sleeve Alteration?</span>
                <span className="font-mono text-base">{isCustomLengthOpen ? "−" : "+"}</span>
              </button>

              {isCustomLengthOpen && (
                <div className="mt-3 p-4 rounded-xl bg-surface/90 text-text border border-border text-xs space-y-3 animate-in fade-in">
                  <div className="flex justify-between items-center">
                    <span>Target Length (Inches):</span>
                    <span className="font-mono font-semibold text-accent-ink">{customLength}&quot;</span>
                  </div>
                  <input
                    type="range"
                    min="48"
                    max="62"
                    value={customLength}
                    onChange={(e) => setCustomLength(Number(e.target.value))}
                    className="w-full accent-accent-ink"
                  />
                  <p className="text-[11px] text-muted leading-tight">
                    Custom lengths require +2 days atelier tailoring and 25% advance booking via bKash (#22).
                  </p>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <div className="pt-4 space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={added}
                className="w-full h-12 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg font-semibold text-xs uppercase tracking-widest shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Added to Your Selection</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Add to Cart • {formatBDT(product.price)}</span>
                  </>
                )}
              </button>

              {/* WhatsApp Concierge direct consultation link */}
              <a
                href={`https://wa.me/8801700000000?text=Hi%20Simply%20Noor%C3%A9%2C%20I'm%20interested%20in%20${encodeURIComponent(
                  product.title
                )}%20(SKU:%20${activeVariant.sku})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-10 rounded-full border border-current/30 hover:border-current text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                <span>Consult with Concierge on WhatsApp</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-current/15 grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-wider opacity-75">
              <div className="flex flex-col items-center gap-1">
                <Truck className="h-4 w-4" />
                <span>Dhaka 24h Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                <span>Cash on Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="h-4 w-4" />
                <span>7-Day Exchange</span>
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Look ✦ Bundle (#2) */}
        <section className="p-6 md:p-8 rounded-2xl bg-surface text-text border border-border shadow-sm space-y-6">
          <div className="flex items-baseline justify-between border-b border-border/30 pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-widest text-accent-ink font-semibold">
                ✦ Complete the Look
              </span>
              <h2 className="font-serif text-2xl font-medium mt-1">
                Harmonized Ensemble Pairing
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted block">Bundle Combined:</span>
              <span className="font-serif text-lg font-medium text-text">
                {formatBDT(product.price + bundlePiece.price)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-18 aspect-[3/4] rounded-lg overflow-hidden bg-surface-2 flex-shrink-0">
                <Image src={activeVariant.image} alt="Base" fill className="object-cover" />
              </div>
              <span className="text-lg font-serif opacity-40">+</span>
              <div className="relative h-24 w-18 aspect-[3/4] rounded-lg overflow-hidden bg-surface-2 flex-shrink-0">
                <Image
                  src={bundlePiece.variants[0].image}
                  alt={bundlePiece.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-base font-medium">{bundlePiece.title}</h3>
                <p className="text-xs text-muted">{bundlePiece.fabricName}</p>
                <p className="text-xs font-semibold text-accent-ink mt-1">
                  {formatBDT(bundlePiece.price)}
                </p>
              </div>
            </div>

            <div className="flex justify-start md:justify-end">
              <button
                onClick={handleAddBundle}
                className="px-6 py-3 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg text-xs uppercase tracking-widest font-semibold shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Add Entire Look to Bag</span>
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Fabric Specifications Section (#13) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-current/15 pt-12">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-widest opacity-70">
              Fabric Specifications
            </span>
            <h2 className="font-serif text-3xl font-medium">
              {fabric.name}
            </h2>
            <p className="text-sm opacity-85 leading-relaxed">
              {fabric.description}
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div>
                <span className="font-semibold block opacity-60">Origin</span>
                <span>{fabric.origin}</span>
              </div>
              <div>
                <span className="font-semibold block opacity-60">Season</span>
                <span>{fabric.season}</span>
              </div>
              <div>
                <span className="font-semibold block opacity-60">Hand-feel</span>
                <span>{fabric.texture}</span>
              </div>
              <div>
                <span className="font-semibold block opacity-60">Care</span>
                <span>{fabric.care}</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-lg border border-current/20">
            <Image src={fabric.image} alt={fabric.name} fill className="object-cover" />
          </div>
        </section>
      </div>
    </div>
  );
}
