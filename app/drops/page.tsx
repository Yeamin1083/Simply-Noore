"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Clock, ShieldAlert } from "lucide-react";
import { DROPS, PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/product/ProductCard";
import { useStore } from "@/lib/store";

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 18,
    seconds: 43,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-3 font-mono text-2xl md:text-4xl font-semibold tracking-tight text-text">
      <div className="flex flex-col items-center">
        <span>{format(timeLeft.hours)}</span>
        <span className="text-[9px] uppercase tracking-widest text-muted">Hours</span>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span>{format(timeLeft.minutes)}</span>
        <span className="text-[9px] uppercase tracking-widest text-muted">Mins</span>
      </div>
      <span>:</span>
      <div className="flex flex-col items-center">
        <span>{format(timeLeft.seconds)}</span>
        <span className="text-[9px] uppercase tracking-widest text-muted">Secs</span>
      </div>
    </div>
  );
}

export default function DropsPage() {
  const { lang } = useStore();
  const drop = DROPS[0];
  const dropProducts = PRODUCTS.filter((p) => drop.productIds.includes(p.id));

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      {/* Drop Hero */}
      <div className="relative rounded-2xl md:rounded-stage overflow-hidden border border-border bg-surface-2 p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-ink text-bg text-[10px] uppercase tracking-widest font-semibold">
            <Clock className="h-3 w-3" />
            <span>Limited Capsule Release</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-medium text-text leading-tight">
            {lang === "bn" ? drop.titleBn : drop.title}
          </h1>

          <p className="text-sm text-muted leading-relaxed max-w-lg">
            {drop.description}
          </p>

          {/* Real Countdown */}
          <div className="pt-2">
            <p className="text-xs uppercase tracking-widest text-muted font-medium mb-2">
              Capsule Windows Close In:
            </p>
            <CountdownTimer targetDate={drop.launchDate} />
          </div>

          <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20 max-w-md">
            <ShieldAlert className="h-4 w-4 flex-shrink-0" />
            <span>Only 40 individually numbered garments dyed per colorway. No re-stocks.</span>
          </div>
        </div>

        <div className="lg:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl border border-border">
          <Image src={drop.heroImage} alt={drop.title} fill className="object-cover" />
        </div>
      </div>

      {/* Drop Products in Standard Format */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl font-medium text-text">
          Capsule Pieces
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dropProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
