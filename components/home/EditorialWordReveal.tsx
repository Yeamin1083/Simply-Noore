"use client";

import React from "react";
import { useStore } from "@/lib/store";

export function EditorialWordReveal() {
  const { lang } = useStore();

  const textEn =
    "We believe modesty is not a compromise. It is an architectural dialogue between restraint and presence. Every seam is considered, every drape weighted to fall with effortless grace.";
  const textBn =
    "আমরা বিশ্বাস করি শালীনতা কোনো সমঝোতা নয়। এটি পরিমিতিবোধ ও আভিজাত্যের এক অনুপম সমন্বয়। প্রতিটি সুতো আর ভাঁজ তৈরি হয়েছে নিপুণ ভারসাম্যের সাথে।";

  const text = lang === "bn" ? textBn : textEn;
  const words = text.split(" ");

  return (
    <section className="py-20 md:py-32 px-4 md:px-8 max-w-5xl mx-auto text-center">
      <div className="inline-block mb-6 text-xs uppercase tracking-[0.2em] font-semibold text-accent-ink">
        02 / The Philosophy
      </div>

      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.25] text-text">
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block mr-2.5 transition-opacity duration-300 hover:opacity-100"
            style={{ opacity: 0.9 }}
          >
            {word}
          </span>
        ))}
      </h2>
    </section>
  );
}
