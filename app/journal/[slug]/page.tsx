import React from "react";
import { ARTICLES } from "@/lib/data";
import { JournalView } from "@/components/store/JournalView";

export function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export default function JournalDetailPage({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find((a) => a.slug === params.slug) || ARTICLES[0];
  return <JournalView article={article} />;
}
