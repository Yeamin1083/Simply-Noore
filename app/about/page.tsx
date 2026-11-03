import React from "react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.2em] text-accent-ink font-semibold">
          The House of Nooré
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-text">
          Modesty, Redefined.
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          Founded in Dhaka, Simply Nooré represents a modern sanctuary for contemporary Muslim women seeking quiet luxury, architectural drape, and uncompromised dignity.
        </p>
      </div>

      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl border border-border">
        <Image
          src="https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=1400&auto=format&fit=crop"
          alt="Simply Nooré Atelier"
          fill
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-border/30">
        <div>
          <h3 className="font-serif text-xl font-medium text-text mb-2">Restraint</h3>
          <p className="text-xs text-muted leading-relaxed">
            We avoid excess ornamentation. Elegance is achieved through precision of cut, density of weave, and balance of silhouette.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-xl font-medium text-text mb-2">Honesty</h3>
          <p className="text-xs text-muted leading-relaxed">
            Real inventory, authentic customer voices, transparent Bangladesh courier delivery times, and zero fake timers.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-xl font-medium text-text mb-2">Craft</h3>
          <p className="text-xs text-muted leading-relaxed">
            Every garment features weighted blind hems, reinforced French seams, and verified opaque grade fabrics.
          </p>
        </div>
      </div>
    </div>
  );
}
