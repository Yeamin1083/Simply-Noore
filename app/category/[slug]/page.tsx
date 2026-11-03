import React from "react";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { CategoryView } from "@/components/store/CategoryView";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find((c) => c.slug === params.slug) || CATEGORIES[0];
  const products = PRODUCTS.filter((p) => p.category === category.slug);

  return <CategoryView category={category} products={products} />;
}
