"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, ArrowRight, MessageCircle, Truck } from "lucide-react";
import { formatBDT } from "@/lib/utils";

export default function OrderSuccessPage() {
  const [orderNumber, setOrderNumber] = useState("SN-2610-00001");

  useEffect(() => {
    // Generate realistic sequence
    const randomSeq = Math.floor(10000 + Math.random() * 90000);
    setOrderNumber(`SN-2610-${randomSeq}`);
  }, []);

  const whatsappMessage = encodeURIComponent(
    `Hi Simply Nooré, I just placed order ${orderNumber}. Please confirm dispatch timeline.`
  );

  return (
    <div className="py-16 md:py-24 px-4 md:px-8 max-w-2xl mx-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Animated Terracotta Checkmark */}
      <div className="h-20 w-20 rounded-full bg-accent-ink/10 text-accent-ink mx-auto flex items-center justify-center border-2 border-accent-ink animate-bounce">
        <Check className="h-10 w-10 stroke-[2.5]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
          Order Confirmed
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          Thank you for choosing Simply Nooré
        </h1>
        <p className="text-sm text-muted">
          Your order has been recorded into our atelier production queue.
        </p>
      </div>

      {/* Order Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-surface border border-border shadow-sm text-left space-y-4">
        <div className="flex justify-between items-baseline border-b border-border/30 pb-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-muted block">Order Reference</span>
            <span className="font-mono text-lg font-semibold text-text">{orderNumber}</span>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-muted block">Status</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 uppercase tracking-wider">
              Processing
            </span>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3 text-muted">
            <Truck className="h-4 w-4 text-accent-ink" />
            <span>Estimated Dispatch: Within 24 hours (Steadfast Courier)</span>
          </div>
          <p className="text-muted leading-relaxed">
            A confirmation SMS will be sent to your mobile phone with real-time courier consignment tracking once dispatched.
          </p>
        </div>

        {/* WhatsApp Immediate Confirmation */}
        <div className="pt-4 border-t border-border/30">
          <a
            href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 rounded-full border border-border hover:bg-surface-2 text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors text-text"
          >
            <MessageCircle className="h-4 w-4 text-emerald-600" />
            <span>Confirm instantly via WhatsApp Concierge</span>
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href={`/track-order?order=${orderNumber}`}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all"
        >
          <span>Track Order Status</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        <Link
          href="/shop"
          className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-border hover:bg-surface text-xs uppercase tracking-widest font-medium text-text"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
