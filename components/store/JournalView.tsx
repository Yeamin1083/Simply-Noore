"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { JournalArticle } from "@/lib/types";

export function JournalView({ article }: { article: JournalArticle }) {
  const { articles } = useStore();
  const current = articles.find((a) => a.slug === article.slug || a.id === article.id) || article;

  return (
    <article className="py-12 md:py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <Link
        href="/journal"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted hover:text-text font-medium"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Return to Journal</span>
      </Link>

      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold font-mono">
          {current.date} • {current.author}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-text leading-tight">
          {current.title}
        </h1>
      </div>

      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl border border-border">
        <img src={current.image} alt={current.title} className="object-cover h-full w-full" />
      </div>

      {/* Editorial Lead Excerpt */}
      {current.excerpt && (
        <div className="py-6 border-y border-border/30 text-center">
          <p className="font-serif text-xl md:text-2xl italic text-text max-w-2xl mx-auto leading-relaxed">
            &ldquo;{current.excerpt}&rdquo;
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="prose max-w-none text-muted text-sm md:text-base leading-relaxed space-y-6">
        {current.content ? (
          current.content.split("\n\n").map((para, idx) => (
            <p key={idx}>{para}</p>
          ))
        ) : (
          <>
            <p>
              In our Dhaka atelier, the quest for the archetypal abaya begins not with sketching silhouettes on paper, but with tactile tests of yarn resonance. Heavy Korean Nida behaves unlike ordinary poly-crepes: its micro-twisted filament structure absorbs light rather than bouncing it, creating deep matte tones that stay true across harsh daylight and soft evening lamps.
            </p>
            <p>
              By pairing these drapes with clean kimono batwing cuts, the garment removes shoulder tension entirely. The silhouette falls directly from the collarbone to the hem, swaying with natural cadence without clinging.
            </p>
          </>
        )}
      </div>
    </article>
  );
}
