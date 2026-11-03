"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "@/lib/store";

export function Navbar() {
  const pathname = usePathname();
  const {
    theme,
    toggleTheme,
    lang,
    toggleLang,
    cartCount,
    wishlist,
    setIsCartOpen,
  } = useStore();

  const [isTop, setIsTop] = useState(true);
  const [isHide, setIsHide] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  // Separate Admin navigation from Storefront navigation
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setIsTop(y < 30);
      if (y > lastY + 6 && y > 120) {
        setIsHide(true);
      } else if (y < lastY - 6 || y < 120) {
        setIsHide(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (cartCount > 0) {
      setIsPopping(true);
      const t = setTimeout(() => setIsPopping(false), 250);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  return (
    <nav
      className={`nav ${isHide ? "hide" : ""}`}
      id="nav"
      aria-label="Main"
    >
      <div className="links">
        <Link href="/women" className={pathname === "/women" ? "underline" : ""}>
          {lang === "bn" ? "নারী" : "Women"}
        </Link>
        <Link href="/shop" className={pathname === "/shop" ? "underline" : ""}>
          {lang === "bn" ? "কালেকশন" : "Collections"}
        </Link>
        <Link href="/journal" className={pathname === "/journal" ? "underline" : ""}>
          {lang === "bn" ? "জার্নাল" : "Journal"}
        </Link>
        <Link href="/style-finder" className="text-amber-300">
          ✦ {lang === "bn" ? "এডিট" : "Edit"}
        </Link>
      </div>

      <Link className="logo" href="/" aria-label="Simply Nooré home">
        Simply <em>Nooré</em>
      </Link>

      <div className="tools">
        <Link href="/shop" className="ib hide-sm" aria-label="Search">
          <svg viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="6.5" />
            <path d="M20 20l-4-4" />
          </svg>
        </Link>

        <button
          className="lang"
          type="button"
          onClick={toggleLang}
          aria-label="Switch language"
        >
          {lang === "en" ? "EN | বাং" : "বাং | EN"}
        </button>

        <button
          className="ib"
          type="button"
          onClick={toggleTheme}
          aria-label="Switch theme"
        >
          {theme === "light" ? (
            <svg viewBox="0 0 24 24">
              <path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          )}
        </button>

        <Link
          href="/wishlist"
          className="ib hide-sm"
          aria-label="Wishlist"
        >
          <svg viewBox="0 0 24 24">
            <path
              d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"
              fill={wishlist.length > 0 ? "currentColor" : "none"}
            />
          </svg>
          {wishlist.length > 0 && (
            <span className="count">{wishlist.length}</span>
          )}
        </Link>

        <button
          className="ib"
          type="button"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open your selection"
        >
          <svg viewBox="0 0 24 24">
            <path d="M5 8h14l-1 12H6L5 8zM9 8a3 3 0 016 0" />
          </svg>
          {cartCount > 0 && (
            <span className={`count ${isPopping ? "pop" : ""}`}>
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
