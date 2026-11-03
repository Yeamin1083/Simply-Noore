"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";

export function AnnouncementRibbon() {
  const { lang, siteSettings } = useStore();

  return (
    <div className="relative overflow-hidden bg-surface-2/60 border-y border-border/40 py-3 px-4 my-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm">
        <div className="flex items-center gap-2.5 text-text">
          <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-medium tracking-wide">
            {siteSettings?.announcementText ||
              (lang === "bn"
                ? "ঈদ বিশেষ ডেলিভারি: সময়মতো পৌঁছাতে ১২ মার্চের মধ্যে অর্ডার করুন"
                : "Occasion Cutoff: Order by 12 March for guaranteed pre-Eid delivery")}
          </span>
          <span className="hidden lg:inline text-muted">|</span>
          <span className="hidden lg:inline text-muted">
            {siteSettings?.announcementSubtext ||
              (lang === "bn"
                ? "সারা দেশে ক্যাশ অন ডেলিভারি এবং ঢাকা সিটিতে ২৪ ঘণ্টায় ডেলিভারি"
                : "Complimentary courier dispatch on all edits over ৳10,000")}
          </span>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-1.5 text-accent-ink hover:underline font-medium uppercase tracking-wider text-[11px]"
        >
          <span>{lang === "bn" ? "সম্ভার দেখুন" : "Explore Edit"}</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
