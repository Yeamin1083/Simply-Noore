"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";

export function Footer() {
  const { lang } = useStore();

  return (
    <footer className="relative bg-surface-2/70 border-t border-border/40 pt-16 md:pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-text mb-4">
              {lang === "bn" ? "পোশাক সম্ভার" : "Collection"}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/category/abayas" className="hover:text-text transition-colors">
                  {lang === "bn" ? "আবায়া" : "Abayas"}
                </Link>
              </li>
              <li>
                <Link href="/category/three-piece-sets" className="hover:text-text transition-colors">
                  {lang === "bn" ? "থ্রি পিস সেট" : "Three Piece Sets"}
                </Link>
              </li>
              <li>
                <Link href="/category/corsets" className="hover:text-text transition-colors">
                  {lang === "bn" ? "করসেট ও বেল্ট" : "Corsets & Belts"}
                </Link>
              </li>
              <li>
                <Link href="/drops" className="hover:text-text transition-colors">
                  {lang === "bn" ? "গোল্ডেন আওয়ার ড্রপ" : "Golden Hour Drop"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-text mb-4">
              {lang === "bn" ? "অনবদ্য সেবা" : "Curated"}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/style-finder" className="hover:text-text transition-colors">
                  {lang === "bn" ? "স্টাইল ফাইন্ডার" : "The Style Edit ✦"}
                </Link>
              </li>
              <li>
                <Link href="/look-builder" className="hover:text-text transition-colors">
                  {lang === "bn" ? "লুক বিল্ডার" : "Look Builder"}
                </Link>
              </li>
              <li>
                <Link href="/fabrics" className="hover:text-text transition-colors">
                  {lang === "bn" ? "ফ্যাব্রিক লাইব্রেরি" : "Fabric Library"}
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-text transition-colors">
                  {lang === "bn" ? "জার্নাল" : "Editorial Journal"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-text mb-4">
              {lang === "bn" ? "গ্রাহক সহায়তা" : "Client Care"}
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <Link href="/track-order" className="hover:text-text transition-colors">
                  {lang === "bn" ? "অর্ডার ট্র্যাকিং" : "Track Order"}
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-text transition-colors">
                  {lang === "bn" ? "সাইজ গাইড" : "Smart Size Assistant"}
                </Link>
              </li>
              <li>
                <Link href="/delivery-returns" className="hover:text-text transition-colors">
                  {lang === "bn" ? "ডেলিভারি ও রিটার্ন" : "Delivery & Returns"}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-text transition-colors">
                  {lang === "bn" ? "যোগাযোগ" : "Atelier Concierge"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-text mb-4">
              {lang === "bn" ? "আটেলিয়ার" : "Atelier"}
            </h4>
            <p className="text-sm text-muted mb-3 leading-relaxed">
              Dhaka Atelier, Gulshan-2, Dhaka 1212. Nationwide priority courier & cash on delivery.
            </p>
            <div className="text-xs uppercase tracking-widest text-muted space-y-1">
              <p>WhatsApp: +880 1700 000000</p>
              <p>Instagram: @simplynoore</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between text-xs text-muted gap-4">
          <p>© 2026 Modesty, Redefined. Dhaka Atelier.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-text">Privacy Policy</Link>
            <Link href="/delivery-returns" className="hover:text-text">Delivery &amp; Returns</Link>
            <Link href="/admin" className="hover:text-text">Atelier Operations</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
