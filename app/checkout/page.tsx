"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Check } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatBDT } from "@/lib/utils";
import { OrderItem } from "@/lib/types";

const BD_DISTRICTS = [
  "Dhaka", "Chattogram", "Sylhet", "Rajshahi", "Khulna", "Barishal", "Rangpur", "Mymensingh",
  "Gazipur", "Narayanganj", "Cumilla", "Bogura", "Brahmanbaria", "Cox's Bazar", "Dinajpur",
  "Faridpur", "Feni", "Habiganj", "Jamalpur", "Jashore", "Kushtia", "Moulvibazar", "Naogaon",
  "Narsingdi", "Noakhali", "Pabna", "Panchagarh", "Patuakhali", "Satkhira", "Sirajganj", "Tangail"
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, lang, addOrder, siteSettings } = useStore();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad">("cod");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFreeDelivery = cartTotal >= (siteSettings?.freeShippingThreshold || 10000);
  const deliveryCharge = isFreeDelivery
    ? 0
    : district === "Dhaka"
    ? siteSettings?.insideDhakaShipping || 80
    : siteSettings?.outsideDhakaShipping || 130;
  const total = cartTotal + deliveryCharge;

  // Advance calculation if order over ৳10,000 or custom length (#22)
  const isAdvanceRequired = total > (siteSettings?.advancePaymentRequiredThreshold || 10000);
  const advanceAmount = isAdvanceRequired ? Math.round(total * 0.25) : 0;
  const remainingCod = total - advanceAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) {
      alert("Please fill in your recipient name, phone number, and delivery address.");
      return;
    }

    // Phone validation
    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone.startsWith("01") || cleanPhone.length !== 11) {
      alert("Please enter a valid 11-digit Bangladesh phone number (01XXXXXXXXX).");
      return;
    }

    setIsSubmitting(true);

    const orderId = `SN-${Date.now().toString().slice(-6)}`;
    const newOrder: OrderItem = {
      id: orderId,
      customer: fullName,
      phone: phone,
      district: district,
      address: address,
      items: cart.map((i) => `${i.title} (${i.colorName}, ${i.size}) x${i.quantity}`).join(", "),
      total: total,
      payment: paymentMethod === "cod" ? "COD" : paymentMethod === "bkash" ? "bKash" : "Nagad",
      trxId: trxId || undefined,
      senderPhone: senderNumber || undefined,
      status: paymentMethod === "cod" ? "Processing" : "Pending",
      date: "Just now",
    };
    addOrder(newOrder);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sn_latest_order", JSON.stringify(newOrder));
      } catch {}
    }

    setTimeout(() => {
      clearCart();
      router.push("/order-success");
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center space-y-4 max-w-md mx-auto">
        <h1 className="font-serif text-3xl font-medium text-text">Your bag is empty</h1>
        <p className="text-xs text-muted">Add pieces to proceed with checkout.</p>
        <Link
          href="/shop"
          className="inline-block px-6 py-2.5 rounded-full bg-espresso text-bg dark:bg-accent text-xs uppercase tracking-widest font-semibold"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-6xl mx-auto space-y-8">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-text font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Return to Selection</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Form: Delivery & Payment Details */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
          {/* Step 1: Contact & Delivery Address */}
          <div className="space-y-4 bg-surface p-6 md:p-8 rounded-2xl border border-border">
            <h2 className="font-serif text-xl font-medium text-text border-b border-border/30 pb-3">
              Delivery Information
            </h2>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-muted font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Samira Rahman"
                  className="w-full p-3 rounded-lg bg-bg border border-border text-text focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-muted font-medium mb-1">
                  Bangladesh Mobile Number * (01XXXXXXXXX)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01700000000"
                  className="w-full p-3 rounded-lg bg-bg border border-border text-text focus:outline-none focus:ring-1 focus:ring-accent font-mono"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-muted font-medium mb-1">District (Zilla) *</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-3 rounded-lg bg-bg border border-border text-text focus:outline-none"
                  >
                    {BD_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-muted font-medium mb-1">Estimated Courier Lead Time</label>
                  <div className="p-3 rounded-lg bg-surface-2 text-muted border border-border/30">
                    {district === "Dhaka" ? "1–2 Working Days (Dhaka City)" : "2–4 Working Days (Out of Dhaka)"}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-muted font-medium mb-1">Full Street Address *</label>
                <textarea
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House, Road, Area, Thana"
                  className="w-full p-3 rounded-lg bg-bg border border-border text-text focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method */}
          <div className="space-y-4 bg-surface p-6 md:p-8 rounded-2xl border border-border">
            <h2 className="font-serif text-xl font-medium text-text border-b border-border/30 pb-3">
              Payment Choice
            </h2>

            <div className="space-y-3">
              {/* COD Option */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "cod"
                    ? "border-accent-ink bg-surface-2/40 shadow-sm"
                    : "border-border/60 hover:border-text"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="mt-1 accent-accent-ink"
                />
                <div className="text-xs">
                  <span className="font-semibold text-text block">Cash on Delivery (Standard)</span>
                  <span className="text-muted leading-relaxed">
                    Pay upon receipt from our Steadfast / Pathao courier representative.
                  </span>
                </div>
              </label>

              {/* bKash Option (#20) */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "bkash"
                    ? "border-accent-ink bg-surface-2/40 shadow-sm"
                    : "border-border/60 hover:border-text"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "bkash"}
                  onChange={() => setPaymentMethod("bkash")}
                  className="mt-1 accent-accent-ink"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#E2136E] block">bKash Merchant / Personal</span>
                  <span className="text-muted">
                    Send amount to 01700-000000 and enter your transaction ID below.
                  </span>
                </div>
              </label>

              {/* Nagad Option */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === "nagad"
                    ? "border-accent-ink bg-surface-2/40 shadow-sm"
                    : "border-border/60 hover:border-text"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "nagad"}
                  onChange={() => setPaymentMethod("nagad")}
                  className="mt-1 accent-accent-ink"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#F7921E] block">Nagad Wallet</span>
                  <span className="text-muted">
                    Send amount to 01700-000000 and enter your transaction ID.
                  </span>
                </div>
              </label>
            </div>

            {/* Trx input for bKash/Nagad */}
            {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
              <div className="p-4 rounded-xl bg-surface-2/50 border border-border/60 space-y-3 text-xs animate-in fade-in">
                <p className="font-semibold text-text">Payment Verification Details:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-muted block mb-1">Sender Mobile Number</label>
                    <input
                      type="text"
                      required
                      value={senderNumber}
                      onChange={(e) => setSenderNumber(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full p-2.5 rounded bg-bg border border-border text-text"
                    />
                  </div>
                  <div>
                    <label className="text-muted block mb-1">Transaction ID (TrxID)</label>
                    <input
                      type="text"
                      required
                      value={trxId}
                      onChange={(e) => setTrxId(e.target.value)}
                      placeholder="e.g. 9J47KLP3Q"
                      className="w-full p-2.5 rounded bg-bg border border-border text-text font-mono uppercase"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* High-Visibility Primary Checkout Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              id="checkoutSubmitBtn"
              className="w-full h-16 rounded-2xl bg-[#1B2B20] text-[#F6F3EA] dark:bg-[#A9C2A4] dark:text-[#0B100D] border-2 border-[#C9A86A]/40 dark:border-[#E6D3A8]/60 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 shadow-2xl hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />
              <Lock className="h-4 w-4 text-[#C9A86A] dark:text-[#0B100D]" />
              {isSubmitting ? (
                <span>Confirming Order with Atelier...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Confirm &amp; Place Order</span>
                  <span className="opacity-60">•</span>
                  <span className="font-mono text-base font-extrabold">{formatBDT(total)}</span>
                </span>
              )}
            </button>
            <p className="text-center text-[11px] text-muted mt-2.5 flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 inline" />
              <span>Priority packaging &amp; dispatch across all 64 districts.</span>
            </p>
          </div>
        </form>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-surface p-6 md:p-8 rounded-2xl border border-border space-y-6 lg:sticky lg:top-24">
          <h2 className="font-serif text-xl font-medium text-text border-b border-border/30 pb-3">
            Items in Order ({cart.length})
          </h2>

          <div className="space-y-4 max-h-80 overflow-y-auto divide-y divide-border/20 pr-2">
            {cart.map((item, idx) => (
              <div key={idx} className="pt-3 first:pt-0 flex gap-4">
                <div className="relative h-18 w-14 aspect-[3/4] rounded overflow-hidden bg-surface-2 flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 text-xs">
                  <h4 className="font-serif font-medium text-text line-clamp-1">{item.title}</h4>
                  <p className="text-muted">{item.colorName} • Size {item.size} • Qty {item.quantity}</p>
                  <p className="font-semibold text-text mt-1">{formatBDT(item.price * item.quantity)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border/30 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="text-text">{formatBDT(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Courier Dispatch ({district})</span>
              <span className="text-text">{formatBDT(deliveryCharge)}</span>
            </div>

            {isAdvanceRequired && (
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-800 space-y-1 text-[11px] my-2">
                <div className="flex justify-between font-semibold">
                  <span>Advance Due (25%):</span>
                  <span>{formatBDT(advanceAmount)}</span>
                </div>
                <p className="text-muted">Remaining {formatBDT(remainingCod)} payable on delivery.</p>
              </div>
            )}

            <div className="pt-3 border-t border-border/30 flex justify-between items-baseline">
              <span className="font-serif text-base font-semibold text-text">Total Payable</span>
              <span className="font-serif text-2xl font-bold text-text dark:text-champagne">
                {formatBDT(total)}
              </span>
            </div>
          </div>

          {/* Secondary Quick Action Button in Summary for Desktop */}
          <button
            type="button"
            onClick={(e) => {
              const form = document.querySelector("form");
              if (form) form.requestSubmit();
            }}
            disabled={isSubmitting}
            className="hidden lg:flex w-full h-12 rounded-xl bg-accent-ink text-white text-xs uppercase tracking-wider font-semibold items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span>Proceed to Confirmation • {formatBDT(total)}</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] text-muted justify-center pt-1">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Encrypted guest checkout. No account or password needed.</span>
          </div>
        </div>
      </div>

      {/* Floating Sticky Bottom Bar for Mobile Devices */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-40 bg-surface/95 backdrop-blur-md border-t border-border p-4 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-wider text-muted block">Total Order</span>
          <span className="font-serif text-xl font-bold text-text">{formatBDT(total)}</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const form = document.querySelector("form");
            if (form) form.requestSubmit();
          }}
          disabled={isSubmitting}
          className="flex-1 max-w-xs h-12 rounded-xl bg-[#1B2B20] text-[#F6F3EA] dark:bg-[#A9C2A4] dark:text-[#0B100D] border border-[#C9A86A] text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 shadow-lg"
        >
          <Lock className="h-3.5 w-3.5 text-[#C9A86A]" />
          <span>Confirm &amp; Place Order</span>
        </button>
      </div>
    </div>
  );
}
