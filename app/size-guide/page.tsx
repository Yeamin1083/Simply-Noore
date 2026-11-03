import React from "react";
import Link from "next/link";
import { Ruler, Sparkles } from "lucide-react";

export default function SizeGuidePage() {
  const sizes = [
    { size: "52", height: "5'0\" – 5'2\"", bust: "Up to 40\"", length: "52 inches", sleeve: "26.5 inches" },
    { size: "54", height: "5'3\" – 5'4\"", bust: "Up to 42\"", length: "54 inches", sleeve: "27.5 inches" },
    { size: "56", height: "5'5\" – 5'7\"", bust: "Up to 44\"", length: "56 inches", sleeve: "28.5 inches" },
    { size: "58", height: "5'8\" – 5'10\"", bust: "Up to 46\"", length: "58 inches", sleeve: "29.5 inches" },
  ];

  return (
    <div className="py-12 md:py-20 px-4 md:px-8 max-w-4xl mx-auto space-y-10">
      <div className="space-y-3 border-b border-border/30 pb-6 text-center max-w-xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold">
          ✦ Feature #5
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-medium text-text">
          Smart Size Assistant & Guide
        </h1>
        <p className="text-xs md:text-sm text-muted">
          Our silhouettes are engineered with relaxed, fluid ease. Select your size primarily based on your height (shoulder to floor).
        </p>
      </div>

      <div className="overflow-x-auto border border-border rounded-xl bg-surface shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-surface-2 text-text border-b border-border font-semibold uppercase tracking-wider">
            <tr>
              <th className="p-4">Abaya Size</th>
              <th className="p-4">Recommended Height</th>
              <th className="p-4">Garment Length</th>
              <th className="p-4">Bust Allowance</th>
              <th className="p-4">Sleeve Length</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20 text-muted">
            {sizes.map((s) => (
              <tr key={s.size} className="hover:bg-surface-2/40 transition-colors">
                <td className="p-4 font-semibold text-text">{s.size}</td>
                <td className="p-4">{s.height}</td>
                <td className="p-4 font-medium text-text">{s.length}</td>
                <td className="p-4">{s.bust}</td>
                <td className="p-4">{s.sleeve}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 rounded-2xl bg-surface-2/50 border border-border/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-semibold text-text block mb-1">Need a custom hem or sleeve length?</span>
          <p className="text-muted max-w-md">
            We provide custom atelier tailoring (+৳500) for eligible silhouettes. Select &ldquo;Custom Length&rdquo; directly on any product page.
          </p>
        </div>
        <Link
          href="/women"
          className="px-6 py-2.5 rounded-full bg-espresso text-bg dark:bg-accent dark:text-bg font-semibold uppercase tracking-wider text-[11px]"
        >
          View Silhouettes
        </Link>
      </div>
    </div>
  );
}
