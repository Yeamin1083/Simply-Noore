"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";

export function StatementSection() {
  const { lang } = useStore();

  return (
    <section className="relative my-16 md:my-28 mx-4 md:mx-8 rounded-2xl md:rounded-stage overflow-hidden min-h-[500px] md:min-h-[640px] flex items-center justify-center text-center p-6 md:p-16">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=2000&auto=format&fit=crop"
        alt="Simply Nooré Editorial"
        fill
        className="object-cover brightness-75 transition-transform duration-1000 scale-100 hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto space-y-6 text-on-espresso">
        <span className="text-xs uppercase tracking-[0.25em] font-medium text-champagne">
          04 / Statement Edit
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-tight">
          {lang === "bn"
            ? "আভিজাত্য যা নীরবে কথা বলে"
            : "Presence without noise. Pure silhouette."}
        </h2>

        <p className="text-sm md:text-base opacity-90 max-w-lg mx-auto font-light leading-relaxed">
          {lang === "bn"
            ? "প্রতিটি পোশাকের কাটিং এবং ওজন তৈরি হয়েছে আধুনিক নারীদের আত্মবিশ্বাসের প্রতিফলন হিসেবে।"
            : "Weighted drapes and pure fabrics engineered for fluid motion across every occasion."}
        </p>

        <div className="pt-4">
          <Link
            href="/style-finder"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-bg text-text hover:bg-surface transition-all transform hover:scale-105 active:scale-95 text-xs uppercase tracking-widest font-semibold shadow-xl"
          >
            <span>{lang === "bn" ? "আপনার উপযুক্ত এডিট খুঁজুন" : "Find Your Nooré Edit"}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
