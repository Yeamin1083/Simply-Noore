"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FABRICS, PRODUCTS } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function FabricsPage() {
  const { products } = useStore();
  const allProducts = products && products.length > 0 ? products : PRODUCTS;

  return (
    <div className="py-10 md:py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
      <div className="space-y-3 border-b border-border/30 pb-6 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
          ✦ Feature #13
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          The Fabric Library
        </h1>
        <p className="text-sm text-muted">
          Our silhouettes begin with tactile restraint. Sourced directly from premier mills in South Korea, Turkey, and Japan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FABRICS.map((fabric) => {
          const matchingProducts = allProducts.filter((p) => p.fabricId === fabric.id || p.fabricName?.toLowerCase().includes(fabric.name.toLowerCase()));
          return (
            <div
              key={fabric.id}
              className="p-6 rounded-2xl bg-surface border border-border/50 shadow-sm space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border/40">
                  <Image src={fabric.image} alt={fabric.name} fill className="object-cover" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-accent-ink font-semibold">
                    {fabric.origin}
                  </span>
                  <h2 className="font-serif text-2xl font-medium text-text">
                    {fabric.name}
                  </h2>
                </div>

                <p className="text-xs text-muted leading-relaxed">
                  {fabric.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-border/30">
                  <div>
                    <span className="font-semibold block text-muted">Texture</span>
                    <span className="text-text">{fabric.texture}</span>
                  </div>
                  <div>
                    <span className="font-semibold block text-muted">Season</span>
                    <span className="text-text">{fabric.season}</span>
                  </div>
                </div>

                <div className="pt-2 text-[11px] text-muted bg-surface-2/60 p-2.5 rounded-lg border border-border/30">
                  <span className="font-semibold text-text block mb-0.5">Care Instruction</span>
                  <span>{fabric.care}</span>
                </div>
              </div>

              {matchingProducts.length > 0 && (
                <div className="pt-4 border-t border-border/30">
                  <p className="text-[11px] uppercase tracking-wider text-muted font-medium mb-2">
                    Pieces made from {fabric.name}:
                  </p>
                  <div className="space-y-1.5">
                    {matchingProducts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}`}
                        className="text-xs font-serif text-text hover:text-accent-ink flex items-center justify-between"
                      >
                        <span>{p.title}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
