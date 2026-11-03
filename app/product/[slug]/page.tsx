import React from "react";
import { PRODUCTS, FABRICS } from "@/lib/data";
import { ProductDetailView } from "@/components/store/ProductDetailView";

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find((p) => p.slug === params.slug) || PRODUCTS[0];
  const fabric = FABRICS.find((f) => f.id === product.fabricId) || FABRICS[0];
  const bundlePiece = PRODUCTS.find((p) => p.id !== product.id && p.category === "corsets") || PRODUCTS[2];

  return <ProductDetailView product={product} fabric={fabric} bundlePiece={bundlePiece} />;
}
