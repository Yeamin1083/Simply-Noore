"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
}

export function JournalView({ article }: { article: ArticleItem }) {
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
          {article.date} • {article.author}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium text-text leading-tight">
          {article.title}
        </h1>
      </div>

      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-xl border border-border">
        <Image src={article.image} alt={article.title} fill priority className="object-cover" />
      </div>

      {/* Editorial Lead Quote */}
      <div className="py-6 border-y border-border/30 text-center">
        <p className="font-serif text-xl md:text-2xl italic text-text max-w-2xl mx-auto leading-relaxed">
          &ldquo;Modesty is not an act of concealing beauty; it is the discipline of framing presence through proportion, tension, and texture.&rdquo;
        </p>
      </div>

      <div className="prose max-w-none text-muted text-sm md:text-base leading-relaxed space-y-6">
        <p>
          In our Dhaka atelier, the quest for the archetypal abaya begins not with sketching silhouettes on paper, but with tactile tests of yarn resonance. Heavy Korean Nida behaves unlike ordinary poly-crepes: its micro-twisted filament structure absorbs light rather than bouncing it, creating deep matte tones that stay true across harsh daylight and soft evening lamps.
        </p>
        <p>
          By pairing these drapes with clean kimono batwing cuts, the garment removes shoulder tension entirely. The silhouette falls directly from the collarbone to the hem, swaying with natural cadence without clinging.
        </p>
      </div>
    </article>
  );
}
