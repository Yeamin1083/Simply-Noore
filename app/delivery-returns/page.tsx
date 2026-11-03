import React from "react";
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export default function DeliveryReturnsPage() {
  return (
    <div className="py-12 md:py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
      <div className="space-y-3 border-b border-border/30 pb-6 text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
          Service Terms
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          Delivery & Exchange Policy
        </h1>
        <p className="text-sm text-muted">
          Transparent, honest terms crafted for a frictionless luxury shopping experience.
        </p>
      </div>

      <div className="space-y-8 text-xs md:text-sm text-muted leading-relaxed">
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-3">
          <div className="flex items-center gap-2 text-text font-serif text-xl font-medium">
            <Truck className="h-5 w-5 text-accent-ink" />
            <span>Courier Dispatch & Rates</span>
          </div>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Inside Dhaka City:</strong> ৳80 delivery charge (1–2 working days). Complimentary on orders over ৳5,000.</li>
            <li><strong>Outside Dhaka (All 63 Districts):</strong> ৳130 delivery charge (2–4 working days via Steadfast Priority Courier).</li>
            <li><strong>Pre-order & Made-to-order:</strong> Dispatched strictly according to the specified production window (typically 5–7 working days).</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border space-y-3">
          <div className="flex items-center gap-2 text-text font-serif text-xl font-medium">
            <RotateCcw className="h-5 w-5 text-accent-ink" />
            <span>7-Day Size & Color Exchange (#24)</span>
          </div>
          <p>
            If the length or fit does not meet your expectations, you may initiate an exchange request directly from the Track Order page within 7 calendar days of receipt. Garments must be unworn with original atelier security tags attached.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-border space-y-3">
          <div className="flex items-center gap-2 text-text font-serif text-xl font-medium">
            <ShieldCheck className="h-5 w-5 text-accent-ink" />
            <span>Inspection & Payment</span>
          </div>
          <p>
            Cash on Delivery is available across all 64 districts in Bangladesh. You may inspect the outer package seal prior to handing payment to our courier partner.
          </p>
        </div>
      </div>
    </div>
  );
}
