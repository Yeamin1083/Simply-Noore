"use client";

import React, { useState } from "react";
import { Search, Package, Truck, CheckCircle2, RotateCcw } from "lucide-react";
import { formatBDT } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { OrderItem } from "@/lib/types";

export default function TrackOrderPage() {
  const { orders } = useStore();
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [tracked, setTracked] = useState(false);
  const [foundOrder, setFoundOrder] = useState<OrderItem | null>(null);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !phone) {
      alert("Please enter both your Order Number and phone number.");
      return;
    }
    const cleanNum = orderNumber.trim().toLowerCase();
    const cleanPh = phone.trim().replace(/\D/g, "");

    const match = orders.find(
      (o) =>
        o.id.toLowerCase() === cleanNum ||
        (o.phone.replace(/\D/g, "").includes(cleanPh) && o.id.toLowerCase().includes(cleanNum))
    );

    setFoundOrder(match || null);
    setTracked(true);
  };

  return (
    <div className="py-12 md:py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-10 min-h-[75vh]">
      <div className="text-center space-y-2 max-w-lg mx-auto">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold font-mono">
          Client Logistics
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          Track Your Order
        </h1>
        <p className="text-xs md:text-sm text-muted">
          Enter your order reference (e.g. SN-2610-48219) and contact mobile number.
        </p>
      </div>

      {/* Lookup Form */}
      <form onSubmit={handleTrack} className="p-6 md:p-8 rounded-2xl bg-surface border border-border shadow-sm max-w-xl mx-auto space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-muted font-medium block mb-1">Order Number *</label>
            <input
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="SN-2610-48219"
              className="w-full p-3 rounded-lg bg-bg border border-border text-text font-mono uppercase focus:outline-none"
            />
          </div>
          <div>
            <label className="text-muted font-medium block mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01712345678"
              className="w-full p-3 rounded-lg bg-bg border border-border text-text font-mono focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-11 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-md"
        >
          <Search className="h-4 w-4" />
          <span>Lookup Live Status</span>
        </button>
      </form>

      {/* Status Result Timeline */}
      {tracked && (
        <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-border/30 pb-4">
            <div>
              <span className="font-mono text-sm font-semibold text-text">
                {foundOrder?.id || orderNumber.toUpperCase()}
              </span>
              <p className="text-xs text-muted">
                {foundOrder
                  ? `Client: ${foundOrder.customer} • ${foundOrder.district} • ${foundOrder.payment}`
                  : "Recorded in Dhaka Atelier • Cash on Delivery (Steadfast Courier)"}
              </p>
              {foundOrder && (
                <p className="text-xs text-text font-medium mt-1">
                  Enclosed: {foundOrder.items} • Total: {formatBDT(foundOrder.total)}
                </p>
              )}
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                foundOrder?.status === "Delivered"
                  ? "bg-emerald-500/15 text-emerald-600"
                  : foundOrder?.status === "Shipped"
                  ? "bg-blue-500/15 text-blue-600"
                  : "bg-indigo-500/15 text-indigo-600"
              }`}
            >
              {foundOrder ? foundOrder.status : "In Production Queue"}
            </span>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-surface-2/40 border border-border/40 space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Order Placed</span>
              </div>
              <p className="text-muted text-[11px]">Recorded at Dhaka Atelier</p>
            </div>

            <div className="p-4 rounded-xl bg-surface-2/40 border border-border/40 space-y-1">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Fabric Inspected</span>
              </div>
              <p className="text-muted text-[11px]">Yarn tension &amp; drape verified</p>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-1 ${
                foundOrder?.status === "Shipped" || foundOrder?.status === "Delivered"
                  ? "bg-surface-2/40 border-border/40 text-emerald-600"
                  : "bg-surface-2/20 border-border/30 opacity-70"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                <Truck className="h-4 w-4" />
                <span>Steadfast Dispatch</span>
              </div>
              <p className="text-muted text-[11px]">
                {foundOrder?.courier ? `Consignment: ${foundOrder.courier}` : "Booking pending in Banani"}
              </p>
            </div>

            <div
              className={`p-4 rounded-xl border space-y-1 ${
                foundOrder?.status === "Delivered"
                  ? "bg-surface-2/40 border-border/40 text-emerald-600"
                  : "bg-surface-2/20 border-border/30 opacity-70"
              }`}
            >
              <div className="flex items-center gap-2 font-semibold">
                <Package className="h-4 w-4" />
                <span>Delivered</span>
              </div>
              <p className="text-muted text-[11px]">Handover to recipient</p>
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center text-xs text-muted">
            <span>Need modification to address or size? Contact Dhaka Atelier via WhatsApp.</span>
            <button
              onClick={() => setShowReturnModal(true)}
              className="text-accent-ink hover:underline font-medium flex items-center gap-1"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Initiate Exchange (#20)</span>
            </button>
          </div>
        </div>
      )}

      {/* Exchange Modal */}
      {showReturnModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl font-medium text-text">Exchange Request (#20)</h3>
            <p className="text-xs text-muted leading-relaxed">
              We offer complimentary size exchanges within 3 calendar days of delivery for unworn garments with atelier seals intact.
            </p>
            <div className="space-y-3 text-xs">
              <label className="text-muted block">Exchange Reason:</label>
              <select className="w-full p-2.5 rounded-lg bg-bg border border-border text-text">
                <option>Size too large (request smaller size)</option>
                <option>Size too short / need longer hem</option>
                <option>Color exchange</option>
                <option>Atelier flaw inspection</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowReturnModal(false)}
                className="px-4 py-2 rounded-full border border-border text-xs text-muted"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert("Exchange request recorded! Our concierge will arrange pickup.");
                  setShowReturnModal(false);
                }}
                className="px-5 py-2 rounded-full bg-accent-ink text-white text-xs font-medium"
              >
                Submit Exchange
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
