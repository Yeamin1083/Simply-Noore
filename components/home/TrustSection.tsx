"use client";

import React from "react";
import { Truck, ShieldCheck, RefreshCw, MessageSquare } from "lucide-react";
import { useStore } from "@/lib/store";

export function TrustSection() {
  const { lang } = useStore();

  const trustItems = [
    {
      icon: Truck,
      titleEn: "24h Priority Dhaka",
      titleBn: "২৪ ঘণ্টার ঢাকা ডেলিভারি",
      descEn: "1–2 days inside Dhaka, 2–4 days nationwide via tracked courier.",
      descBn: "ঢাকায় ১-২ কার্যদিবস এবং সারাদেশে ২-৪ দিনে নির্ভরযোগ্য কুরিয়ার।",
    },
    {
      icon: ShieldCheck,
      titleEn: "Cash on Delivery",
      titleBn: "ক্যাশ অন ডেলিভারি",
      descEn: "Inspect upon arrival or complete checkout seamlessly with bKash/Nagad.",
      descBn: "পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা এবং বিকাশ/নগদে অগ্রিম পরিশোধ।",
    },
    {
      icon: RefreshCw,
      titleEn: "7-Day Easy Exchange",
      titleBn: "৭ দিনের সহজ এক্সচেঞ্জ",
      descEn: "Request size or color exchange online in seconds via Track Order.",
      descBn: "অনলাইনে ট্র্যাক অর্ডার পেজ থেকে খুব সহজেই সাইজ পরিবর্তন করুন।",
    },
    {
      icon: MessageSquare,
      titleEn: "Nooré Concierge",
      titleBn: "নুর কনসিয়ার্জ সেবা",
      descEn: "Direct WhatsApp styling assistance and size recommendations.",
      descBn: "সরাসরি হোয়াটসঅ্যাপে সাইজ ও স্টাইলিং পরামর্শ গ্রহণ করুন।",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 border-t border-border/30 bg-surface/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {trustItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-3 p-4 rounded-xl"
            >
              <div className="h-10 w-10 rounded-full bg-accent-ink/10 text-accent-ink flex items-center justify-center">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-medium text-text">
                {lang === "bn" ? item.titleBn : item.titleEn}
              </h3>
              <p className="text-xs leading-relaxed text-muted max-w-xs">
                {lang === "bn" ? item.descBn : item.descEn}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
