"use client";

import React, { useState } from "react";
import { Search, Package, Truck, CheckCircle2, RotateCcw } from "lucide-react";
import { formatBDT } from "@/lib/utils";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [tracked, setTracked] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !phone) {
      alert("Please enter both your Order Number and phone number.");
      return;
    }
    setTracked(true);
  };

  return (
    <div className="py-12 md:py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-10 min-h-[75vh]">
      <div className="text-center space-y-2 max-w-lg mx-auto">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
          Client Logistics
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          Track Your Order
        </h1>
        <p className="text-xs md:text-sm text-muted">
          Enter your order reference (e.g. SN-2610-00001) and contact mobile number.
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
              placeholder="SN-2610-00001"
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
              placeholder="01700000000"
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
              <span className="font-mono text-sm font-semibold text-text">{orderNumber.toUpperCase()}</span>
              <p className="text-xs text-muted">Placed on 10 March 2026 • Cash on Delivery (Steadfast Courier)</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600">
              Dispatched with Courier
            </span>
          </div>

          {/* Timeline */}
          <div className="relative flex justify-between items-center max-w-2xl mx-auto py-6">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2 z-0" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="h-9 w-9 rounded-full bg-accent-ink text-bg flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-semibold mt-2 text-text">Confirmed</span>
              <span className="text-[9px] text-muted">10 Mar, 10:30 AM</span>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="h-9 w-9 rounded-full bg-accent-ink text-bg flex items-center justify-center">
                <Package className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-semibold mt-2 text-text">Packed</span>
              <span className="text-[9px] text-muted">10 Mar, 02:15 PM</span>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="h-9 w-9 rounded-full bg-accent-ink text-bg flex items-center justify-center ring-4 ring-accent-ink/20 animate-pulse">
                <Truck className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-semibold mt-2 text-accent-ink">In Transit</span>
              <span className="text-[9px] text-muted">Consignment #SF-99214</span>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center opacity-40">
              <div className="h-9 w-9 rounded-full bg-surface-2 text-muted flex items-center justify-center border border-border">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-semibold mt-2">Delivered</span>
              <span className="text-[9px]">Est. Tomorrow</span>
            </div>
          </div>

          {/* Return & Exchange Action (#24) */}
          <div className="pt-4 border-t border-border/30 flex items-center justify-between text-xs">
            <span className="text-muted">
              Within 7-day window after delivery? You may request size or color exchange.
            </span>
            <button
              onClick={() => setShowReturnModal(true)}
              className="px-4 py-2 rounded-full border border-border text-text hover:bg-surface-2 font-medium flex items-center gap-1.5"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Request Return / Exchange (#24)</span>
            </button>
          </div>
        </div>
      )}

      {/* Return Request Modal (#24) */}
      {showReturnModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowReturnModal(false)} />
          <div className="relative w-full max-w-md bg-surface p-6 rounded-2xl border border-border shadow-2xl z-10 space-y-4">
            <h3 className="font-serif text-xl font-medium text-text">Return or Exchange Request</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-muted block mb-1">Reason for request</label>
                <select className="w-full p-2.5 rounded bg-bg border border-border text-text">
                  <option>Exchange for Different Length / Size</option>
                  <option>Exchange for Different Color</option>
                  <option>Fabric / Fit Preference</option>
                  <option>Damaged in Transit</option>
                </select>
              </div>
              <div>
                <label className="text-muted block mb-1">Desired replacement size</label>
                <input type="text" placeholder="e.g. Size 56" className="w-full p-2.5 rounded bg-bg border border-border text-text" />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert("Return request registered. Our logistics team will contact you via WhatsApp within 4 hours.");
                  setShowReturnModal(false);
                }}
                className="flex-1 py-2.5 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg text-xs uppercase tracking-wider font-semibold"
              >
                Submit Request
              </button>
              <button
                onClick={() => setShowReturnModal(false)}
                className="px-4 py-2.5 rounded-full border border-border text-xs text-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
