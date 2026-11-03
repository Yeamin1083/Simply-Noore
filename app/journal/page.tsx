"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ARTICLES } from "@/lib/data";

export default function JournalPage() {
  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-3 border-b border-border/30 pb-6 max-w-xl">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
          ✦ Nooré Journal (#9)
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          Editorial Thoughts
        </h1>
        <p className="text-sm text-muted">
          Reflections on fabric engineering, proportion, and the evolving language of contemporary modest design.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {ARTICLES.map((article) => (
          <article key={article.id} className="group space-y-4">
            <Link href={`/journal/${article.slug}`} className="block relative aspect-[16/10] rounded-xl overflow-hidden border border-border/40 bg-surface-2 shadow-sm">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 ease-luxury-out group-hover:scale-105"
              />
            </Link>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-muted font-medium">
                {article.date} • By {article.author}
              </span>
              <Link href={`/journal/${article.slug}`}>
                <h2 className="font-serif text-2xl font-medium text-text group-hover:text-accent-ink transition-colors leading-snug">
                  {article.title}
                </h2>
              </Link>
              <p className="text-xs text-muted leading-relaxed line-clamp-2">
                {article.excerpt}
              </p>
              <div className="pt-1">
                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-accent-ink hover:underline"
                >
                  <span>Read Article</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
