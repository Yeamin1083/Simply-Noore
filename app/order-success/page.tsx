"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Check, ArrowRight, MessageCircle, Truck } from "lucide-react";
import { formatBDT } from "@/lib/utils";
import { OrderItem } from "@/lib/types";

export default function OrderSuccessPage() {
  const [latestOrder, setLatestOrder] = useState<OrderItem | null>(null);
  const [orderNumber, setOrderNumber] = useState("SN-2610-48220");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("sn_latest_order");
      if (saved) {
        const parsed = JSON.parse(saved);
        setLatestOrder(parsed);
        setOrderNumber(parsed.id);
      } else {
        const randomSeq = Math.floor(10000 + Math.random() * 90000);
        setOrderNumber(`SN-2610-${randomSeq}`);
      }
    } catch {}
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
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold font-mono">
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
            <span className="text-xs uppercase tracking-wider text-muted block font-mono">Order Reference</span>
            <span className="font-mono text-lg font-semibold text-text">{orderNumber}</span>
          </div>
          <div className="text-right">
            <span className="text-xs uppercase tracking-wider text-muted block">Status</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 uppercase tracking-wider">
              {latestOrder?.status || "Processing"}
            </span>
          </div>
        </div>

        {latestOrder && (
          <div className="text-xs space-y-1 text-muted border-b border-border/30 pb-3">
            <p><strong>Recipient:</strong> {latestOrder.customer} ({latestOrder.phone})</p>
            <p><strong>Destination:</strong> {latestOrder.district} {latestOrder.address && `— ${latestOrder.address}`}</p>
            <p><strong>Items:</strong> {latestOrder.items}</p>
            <p><strong>Total Amount:</strong> <span className="font-serif font-bold text-accent-ink text-sm">{formatBDT(latestOrder.total)}</span> ({latestOrder.payment})</p>
          </div>
        )}

        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-3 text-muted">
            <Truck className="h-4 w-4 text-accent-ink flex-shrink-0" />
            <span>Estimated Dispatch: Within 24 hours via Steadfast Logistics</span>
          </div>
          <p className="text-muted leading-relaxed">
            Our Dhaka concierge will contact you via SMS or WhatsApp with your parcel tracking consignment link once packed.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          href={`https://wa.me/8801700000000?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white text-xs uppercase tracking-wider font-semibold hover:opacity-95 transition-all shadow-md"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Atelier Concierge WhatsApp</span>
        </Link>

        <Link
          href="/shop"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border bg-surface text-text text-xs uppercase tracking-wider font-semibold hover:bg-surface-2 transition-all"
        >
          <span>Continue Exploring</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
