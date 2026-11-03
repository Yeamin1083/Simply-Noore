"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Gift,
  Share2,
  Check,
  Tag,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateCartQty,
    cartTotal,
    lang,
    coupons,
    siteSettings,
  } = useStore();

  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  const GIFT_WRAP_PRICE = 250;
  const freeThreshold = siteSettings?.freeShippingThreshold || 10000;
  const deliveryCharge = cartTotal >= freeThreshold ? 0 : siteSettings?.insideDhakaShipping || 80;
  const giftCharge = isGift ? GIFT_WRAP_PRICE : 0;
  const total = Math.max(0, cartTotal - couponDiscount + deliveryCharge + giftCharge);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    const match = coupons?.find((c) => c.code.toUpperCase() === clean && c.active);
    if (match) {
      const discount = Math.round(cartTotal * (match.discountPercent / 100));
      setCouponDiscount(discount);
      setCouponApplied(true);
      alert(`Coupon "${match.code}" applied! ${match.discountPercent}% discount deducted.`);
    } else {
      const sample = coupons?.[0]?.code || "NOORE10";
      alert(`Invalid coupon code. Try '${sample}' for privilege discount.`);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(
        `${window.location.origin}/cart?shared=bag-${Date.now().toString(36)}`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-10 min-h-[75vh]">
      <div className="border-b border-border/30 pb-6 flex items-baseline justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
            Review Bag
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-medium text-text mt-1">
            Your Nooré Selection
          </h1>
        </div>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-accent-ink hover:underline font-medium"
        >
          {copiedShare ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          <span>{copiedShare ? "Link Copied" : "Share My Bag (#17)"}</span>
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="py-20 text-center space-y-4 max-w-md mx-auto">
          <p className="font-serif text-2xl font-medium text-text">
            Your Nooré edit is waiting ✦
          </p>
          <p className="text-xs text-muted">
            You have not added any pieces to your bag yet.
          </p>
          <div className="pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg text-xs uppercase tracking-widest font-semibold"
            >
              Discover Pieces
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Items List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="divide-y divide-border/20 border-b border-border/20">
              {cart.map((item, idx) => (
                <div key={`${item.variantId}-${item.size}-${idx}`} className="py-6 first:pt-0 flex gap-6">
                  <div className="relative h-28 w-20 aspect-[3/4] rounded-lg overflow-hidden bg-surface-2 border border-border/40 flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link href={`/product/${item.slug}`} className="hover:text-accent-ink">
                          <h3 className="font-serif text-lg font-medium text-text">
                            {item.title}
                          </h3>
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.variantId, item.size)}
                          className="text-muted hover:text-red-500 p-1"
                          aria-label="Remove"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted mt-1">
                        Color: {item.colorName} • Size: {item.size}
                      </p>
                      {item.customLength && (
                        <p className="text-[11px] text-accent-ink font-medium mt-0.5">
                          Custom Length: {item.customLength}&quot; (+৳500)
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center border border-border/60 rounded-full bg-surface px-2.5 py-1 gap-3 text-xs">
                        <button
                          onClick={() => updateCartQty(item.variantId, item.size, item.quantity - 1)}
                          className="text-muted hover:text-text"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQty(item.variantId, item.size, item.quantity + 1)}
                          className="text-muted hover:text-text"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <span className="font-medium text-base text-text dark:text-champagne">
                        {formatBDT(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gift Studio (#14) */}
            <div className="p-6 rounded-xl bg-surface border border-border space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Gift className="h-5 w-5 text-accent-ink" />
                  <div>
                    <h4 className="text-sm font-semibold text-text">Gift Studio (#14)</h4>
                    <p className="text-xs text-muted">
                      Add embossed signature gift box & handwritten message (+{formatBDT(GIFT_WRAP_PRICE)})
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={isGift}
                  onChange={(e) => setIsGift(e.target.checked)}
                  className="h-4 w-4 rounded accent-accent-ink cursor-pointer"
                />
              </div>

              {isGift && (
                <div className="space-y-3 pt-3 border-t border-border/30">
                  <label className="text-xs text-muted block">
                    Handwritten card message (max 150 chars):
                  </label>
                  <textarea
                    value={giftMessage}
                    maxLength={150}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Wishing you elegance and light on this special day..."
                    rows={3}
                    className="w-full p-3 rounded-lg bg-bg border border-border text-xs text-text focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  {giftMessage && (
                    <div className="p-3 bg-surface-2/60 rounded border border-border/40 text-xs italic font-serif text-text">
                      &ldquo;{giftMessage}&rdquo;
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Summary & Checkout */}
          <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-6">
            <h2 className="font-serif text-xl font-medium text-text border-b border-border/30 pb-4">
              Order Summary
            </h2>

            {/* Coupon (#23) */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Privilege Code (try NOORE10)"
                className="flex-1 px-3 py-2 bg-bg border border-border rounded-lg text-xs uppercase text-text focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-surface-2 border border-border text-xs uppercase tracking-wider font-semibold hover:bg-surface"
              >
                Apply
              </button>
            </form>

            {/* Calculations */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-text">{formatBDT(cartTotal)}</span>
              </div>

              {couponApplied && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Coupon Discount (10%)</span>
                  <span>−{formatBDT(couponDiscount)}</span>
                </div>
              )}

              {isGift && (
                <div className="flex justify-between">
                  <span className="text-muted">Gift Studio Presentation</span>
                  <span className="text-text">{formatBDT(GIFT_WRAP_PRICE)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span className="text-muted">Estimated Courier Delivery</span>
                <span>{deliveryCharge === 0 ? "Complimentary" : formatBDT(deliveryCharge)}</span>
              </div>

              <div className="pt-4 border-t border-border/30 flex justify-between items-baseline text-sm">
                <span className="font-serif text-base font-semibold text-text">Total</span>
                <span className="font-serif text-2xl font-semibold text-text dark:text-champagne">
                  {formatBDT(total)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full h-12 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-95 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
