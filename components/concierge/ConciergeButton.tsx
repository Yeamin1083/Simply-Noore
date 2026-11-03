"use client";

import React, { useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";

export function ConciergeButton() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl =
    "https://wa.me/8801700000000?text=Hi%20Simply%20Noor%C3%A9%2C%20I'd%20like%20guidance%20on%20choosing%20an%20outfit.";

  return (
    <aside
      aria-label="Nooré Concierge WhatsApp Assistance"
      className="fixed bottom-6 right-6 z-40"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Nooré Concierge on WhatsApp"
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-surface/95 backdrop-blur-md border border-border/80 shadow-xl text-text hover:border-accent hover:text-accent-ink transition-all duration-300"
      >
        <div className="relative">
          <MessageCircle className="h-4 w-4 text-[#25D366]" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent animate-ping" />
        </div>
        <span className="text-xs font-medium tracking-wide flex items-center gap-1.5">
          <span>Concierge</span>
          <Sparkles className="h-3 w-3 text-accent" />
        </span>
      </a>
    </aside>
  );
}
