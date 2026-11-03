import React from "react";

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <div className="space-y-3 border-b border-border/30 pb-6">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
          Data Governance
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          Privacy & Disclosures
        </h1>
        <p className="text-xs md:text-sm text-muted">
          Last revised: March 2026 • Simply Nooré Atelier
        </p>
      </div>

      <div className="space-y-6 text-xs md:text-sm text-muted leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-serif text-xl font-medium text-text">1. Guest-Only Storefront Protocol</h2>
          <p>
            Simply Nooré does not require customer accounts or passwords. We capture contact credentials (name, Bangladesh mobile number, delivery address) solely to execute courier dispatch and provide real-time order tracking.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-medium text-text">2. Local Storage First</h2>
          <p>
            Your Wishlist and Shopping Bag are maintained locally on your device storage unless you choose to share a bag link with a trusted contact. We do not track cross-site marketing identifiers without explicit consent.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-xl font-medium text-text">3. Courier & Payment Disclosures</h2>
          <p>
            Necessary delivery coordinates are transmitted via encrypted API to Steadfast Courier. Mobile payment transaction IDs submitted for bKash or Nagad verification are matched by authorized atelier staff and never shared with third parties.
          </p>
        </section>
      </div>
    </div>
  );
}
