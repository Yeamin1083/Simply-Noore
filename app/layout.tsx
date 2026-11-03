import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { Navbar } from "@/components/navigation/Navbar";
import { BrandReveal } from "@/components/motion/BrandReveal";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickViewModal } from "@/components/product/QuickViewModal";

export const metadata: Metadata = {
  title: "Simply Nooré — Modesty, Redefined.",
  description:
    "Luxury editorial modest fashion atelier. Sculptural abayas, three-piece duster ensembles, and architectural corsetry designed in Dhaka.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <StoreProvider>
          {/* Landing auto animation with Next button */}
          <BrandReveal />

          <div className="stage top" id="top">
            <div className="grain" aria-hidden="true" />
            <Navbar />
            <main>{children}</main>
          </div>

          <CartDrawer />
          <QuickViewModal />
        </StoreProvider>
      </body>
    </html>
  );
}
