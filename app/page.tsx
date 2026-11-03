"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/data";

const EDIT_DATA: Record<string, Array<[string, number, string]>> = {
  Everyday: [
    ["Linen-blend Abaya", 3850, "t-sage"],
    ["Soft Jersey Hijab", 550, "t-oat"],
    ["Everyday Tote", 2400, "t-stone"],
  ],
  Office: [
    ["Crepe Abaya", 4600, "t-ink"],
    ["Pinned Georgette Hijab", 700, "t-stone"],
    ["Slim Laptop Sleeve", 1900, "t-moss"],
  ],
  Eid: [
    ["Embroidered Abaya", 7200, "t-oat"],
    ["Silk Chiffon Hijab", 1100, "t-sage"],
    ["Clutch in Champagne", 2600, "t-stone"],
  ],
  Wedding: [
    ["Three Piece Set", 8900, "t-moss"],
    ["Beaded Hijab", 1400, "t-oat"],
    ["Evening Clutch", 3100, "t-ink"],
  ],
  Ramadan: [
    ["Light Nida Abaya", 4200, "t-stone"],
    ["Cotton Prayer Set", 2300, "t-sage"],
    ["Tasbih Pouch", 900, "t-oat"],
  ],
  Prayer: [
    ["Full-coverage Prayer Abaya", 3600, "t-oat"],
    ["Easy Khimar", 1300, "t-sage"],
    ["Travel Prayer Mat", 1500, "t-moss"],
  ],
  Gift: [
    ["Gift-wrapped Hijab Set", 2200, "t-oat"],
    ["Handwritten Card Add-on", 300, "t-stone"],
    ["Scented Pouch", 800, "t-sage"],
  ],
};

const KEYS = ["The Statement", "The Match", "The Finishing Touch"];

const LOOK_PIECES = [
  { name: "Chiffon Hijab", v: "One size", price: 650, t: "t-oat" },
  { name: "The Sage Drape Abaya", v: "Size 54", price: 4850, t: "t-sage" },
  { name: "Structured Day Bag", v: "Ink", price: 2900, t: "t-ink" },
];

export default function HomePage() {
  const { lang, addToCart, setQuickViewProduct } = useStore();

  // Scene state (Sage: 0, Linen: 1, Ink: 2)
  const [scene, setScene] = useState(0);
  const toneNames = ["Sage", "Linen", "Ink"];
  const toneClasses = ["t-sage", "t-oat", "t-ink"];

  // Chips expansion
  const [openChip, setOpenChip] = useState<number | null>(null);

  // Shop the look
  const [activeLookPiece, setActiveLookPiece] = useState(1);

  // Edit Finder
  const [activeOccasion, setActiveOccasion] = useState("Everyday");

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ h: "02", m: "18", s: "43" });

  // Word Reveal scroll progress
  const [wordProgress, setWordProgress] = useState(0);

  // Statement section intersection
  const [statementIn, setStatementIn] = useState(false);
  const statementRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // Countdown effect
  useEffect(() => {
    const end = Date.now() + (2 * 3600 + 18 * 60 + 43) * 1000;
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const d = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setTimeLeft({
        h: pad(Math.floor(d / 3600)),
        m: pad(Math.floor((d % 3600) / 60)),
        s: pad(d % 60),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll effect for word reveal & statement
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;

      // Word reveal calculation
      const wrEl = document.getElementById("wr1");
      if (wrEl) {
        const rect = wrEl.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.88 - rect.top) / (vh * 0.55)));
        setWordProgress(p);
      }

      // Statement section reveal
      if (statementRef.current) {
        const r = statementRef.current.getBoundingClientRect();
        if (r.top < vh * 0.8 && r.bottom > 0) {
          setStatementIn(true);
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const editorialText =
    "We design for the woman who dresses with intention. Every abaya is cut for movement, draped for calm and made to be worn from the first prayer of the day to the last conversation of the night.";
  const editorialWords = editorialText.split(" ");

  const money = (n: number) => `৳${n.toLocaleString("en-US")}`;

  const handleAddLook = () => {
    LOOK_PIECES.forEach((p, idx) => {
      addToCart({
        productId: `look-piece-${idx}`,
        variantId: `look-var-${idx}`,
        slug: "the-sage-drape-abaya",
        title: p.name,
        colorName: p.v,
        size: "Standard",
        price: p.price,
        image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=900&auto=format&fit=crop",
        quantity: 1,
      });
    });
  };

  const handleOpenQuickView = () => {
    setQuickViewProduct(PRODUCTS[0]);
  };

  const scrollRail = (offset: number) => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* HERO SECTION */}
      <section className="sec hero" id="hero">
        {/* Dynamic Scene Wash Layers */}
        <div className="layers sls" aria-hidden="true">
          <i className={scene === 0 ? "on" : ""} />
          <i className={scene === 1 ? "on" : ""} />
          <i className={scene === 2 ? "on" : ""} />
        </div>

        {/* Aurora radial glow */}
        <div className="aurora" aria-hidden="true" />

        {/* Giant Parallax Ghost Word */}
        <div className="ghost-wrap" id="ghostWrap" aria-hidden="true">
          <div className="ghost" id="ghost">
            <span className={scene === 0 ? "on" : ""}>Sage</span>
            <span className={scene === 1 ? "on" : ""}>Linen</span>
            <span className={scene === 2 ? "on" : ""}>Noor</span>
          </div>
        </div>

        <div className="inner">
          <p className="label">{lang === "bn" ? "ফার্স্ট লাইট এডিট" : "The First Light Edit"}</p>
          <h1 className="h1">
            <span>{lang === "bn" ? "শালীনতা," : "Modesty,"}</span>{" "}
            <em>{lang === "bn" ? "নতুন রূপে।" : "Redefined."}</em>
          </h1>

          <div className="hero-grid">
            <div className="hero-copy">
              <p className="lede" style={{ margin: "0 0 20px" }}>
                {lang === "bn"
                  ? "চলাফেরার জন্য কাটা, প্রশান্তির জন্য ড্রেপ করা। একটি রং বেছে নিন, পুরো দৃশ্য বদলে যাবে।"
                  : "Cut for movement, draped for calm. Choose a shade and the whole scene takes its light."}
              </p>

              <div className="prod">
                <p className="label">
                  <span className="num">01</span>
                  <span>{lang === "bn" ? "নতুন" : "New in"}</span>
                </p>
                <h2>The Sage Drape Abaya</h2>
                <p className="price">৳4,850</p>

                {/* Shade Swatch Dots */}
                <div className="sw" role="group" aria-label="Shade">
                  <button
                    type="button"
                    aria-pressed={scene === 0}
                    onClick={() => setScene(0)}
                    aria-label="Sage"
                  >
                    <i style={{ background: "#8CA283" }} />
                  </button>
                  <button
                    type="button"
                    aria-pressed={scene === 1}
                    onClick={() => setScene(1)}
                    aria-label="Linen"
                  >
                    <i style={{ background: "#C9B696" }} />
                  </button>
                  <button
                    type="button"
                    aria-pressed={scene === 2}
                    onClick={() => setScene(2)}
                    aria-label="Ink"
                  >
                    <i style={{ background: "#26302A" }} />
                  </button>
                  <span className="nm" id="swName">
                    {toneNames[scene]}
                  </span>
                </div>

                <p className="modelnote">Model is 5′6″ and wears size 54.</p>

                <button
                  className="pill"
                  type="button"
                  id="discover"
                  onClick={handleOpenQuickView}
                >
                  <span>{lang === "bn" ? "পোশাকটি দেখুন" : "Discover the piece"}</span>
                  <span className="plus">+</span>
                </button>
              </div>
            </div>

            {/* Hero Photo & Detail Loupe */}
            <div className="hero-photo" id="hp">
              <div className="frame sls">
                <div className={`sl ph ${toneClasses[scene]} on`} />
                <span className="ph-l">Model Photography</span>
              </div>

              <div className="detail sls" aria-hidden="true">
                <div className={`sl ph ${toneClasses[scene]} on`} />
                <span className="ph-l">Detail</span>
              </div>

              {/* Numbered Hotspot Chips */}
              <button
                className={`chip ${openChip === 1 ? "open" : ""}`}
                style={{ left: "68%", top: "20%" }}
                type="button"
                onClick={() => setOpenChip(openChip === 1 ? null : 1)}
              >
                <b>01</b>
                <span>Fabric · Nida crepe</span>
              </button>
              <button
                className={`chip ${openChip === 2 ? "open" : ""}`}
                style={{ left: "4%", top: "46%" }}
                type="button"
                onClick={() => setOpenChip(openChip === 2 ? null : 2)}
              >
                <b>02</b>
                <span>Cut · A-line drape</span>
              </button>
              <button
                className={`chip ${openChip === 3 ? "open" : ""}`}
                style={{ left: "62%", top: "74%" }}
                type="button"
                onClick={() => setOpenChip(openChip === 3 ? null : 3)}
              >
                <b>03</b>
                <span>Detail · Hidden snap placket</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ANNOUNCEMENT / CUTOFF RIBBON - Placed elegantly below hero (not on top of navbar!) */}
      <div className="bar">
        <b>✦</b> Order by 12 March to receive before Eid · Dhaka 24h Courier & Nationwide Cash on Delivery
      </div>

      {/* EDITORIAL WITH WORD REVEAL */}
      <section className="sec tone-cream">
        <div className="inner editorial">
          <div className="arch ph t-moss" aria-hidden="true" style={{ aspectRatio: "3/4" }}>
            <span className="ph-l">Editorial Silhouette</span>
          </div>

          <div>
            <p className="label">
              <span className="num">02</span>
              <span>{lang === "bn" ? "তিনটি অনুভূতিতে" : "A feeling, in three notes"}</span>
            </p>

            <p className="wr" id="wr1">
              <span className="sr">{editorialText}</span>
              {editorialWords.map((word, i) => {
                const n = editorialWords.length;
                const opacity = Math.min(1, Math.max(0.25, 0.25 + 0.75 * (wordProgress * n * 1.1 - i)));
                return (
                  <span
                    key={i}
                    className="w"
                    aria-hidden="true"
                    style={{ opacity }}
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </p>

            <div className="notes">
              <span>Drape</span>
              <span>Stillness</span>
              <span>Light</span>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP THE LOOK */}
      <section className="sec tone-mist" id="look">
        <div className="inner look">
          <div className="lookphoto">
            <div className={`ph ${LOOK_PIECES[activeLookPiece].t}`} id="lookPh">
              <span className="ph-l">Model Ensemble</span>
            </div>

            {/* Hotspot Dots */}
            <button
              className={`dot ${activeLookPiece === 0 ? "on" : ""}`}
              style={{ left: "50%", top: "15%" }}
              type="button"
              onClick={() => setActiveLookPiece(0)}
              aria-label="Hijab"
            >
              <i />
            </button>
            <button
              className={`dot ${activeLookPiece === 1 ? "on" : ""}`}
              style={{ left: "46%", top: "50%" }}
              type="button"
              onClick={() => setActiveLookPiece(1)}
              aria-label="Abaya"
            >
              <i />
            </button>
            <button
              className={`dot ${activeLookPiece === 2 ? "on" : ""}`}
              style={{ left: "24%", top: "78%" }}
              type="button"
              onClick={() => setActiveLookPiece(2)}
              aria-label="Bag"
            >
              <i />
            </button>
          </div>

          <div>
            <p className="label">
              <span className="num">03</span>Shop the look
            </p>
            <h2 className="h2">
              Wear it <em>whole.</em>
            </h2>
            <p className="lede">
              Tap a dot on the photo, or pick a piece from the list. Add the entire look in one tap.
            </p>

            <div className="pieces" id="pieces">
              {LOOK_PIECES.map((piece, idx) => (
                <button
                  key={idx}
                  className={`piece ${activeLookPiece === idx ? "on" : ""}`}
                  type="button"
                  onClick={() => setActiveLookPiece(idx)}
                >
                  <div className={`ph ${piece.t}`} />
                  <div>
                    <b>{piece.name}</b>
                    <small>{piece.v}</small>
                  </div>
                  <span className="p">{money(piece.price)}</span>
                </button>
              ))}
            </div>

            <div className="lookfoot">
              <div>
                <div className="tot">৳8,400</div>
                <small>Bundle total</small>
              </div>
              <button className="pill" type="button" onClick={handleAddLook}>
                <span>Add the look</span> <span className="plus">+</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS - Standard format (No Islamic arch masks on product cards) */}
      <section className="sec tone-cream" id="depts">
        <div className="inner">
          <div className="h-row">
            <div>
              <p className="label">
                <span className="num">04</span>Women
              </p>
              <h2 className="h2">
                Shop by <em>department</em>
              </h2>
            </div>
            <Link className="pill line" href="/women">
              View all <span className="plus">+</span>
            </Link>
          </div>

          <div className="depts">
            <Link className="dept" href="/category/abayas">
              <div className="arch ph t-sage">
                <span className="ph-l">Abayas</span>
              </div>
              <h3>
                Abayas <span>→</span>
              </h3>
              <p>Daily, occasion and made-to-measure lengths.</p>
            </Link>

            <Link className="dept" href="/category/three-piece-sets">
              <div className="arch ph t-oat">
                <span className="ph-l">Three Piece Sets</span>
              </div>
              <h3>
                Three Piece Sets <span>→</span>
              </h3>
              <p>Matching sets, ready to layer.</p>
            </Link>

            <Link className="dept" href="/category/corsets">
              <div className="arch ph t-ink">
                <span className="ph-l">Corsets</span>
              </div>
              <h3>
                Corsets <span>→</span>
              </h3>
              <p>Structured shape for modest silhouettes.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* FIND YOUR EDIT */}
      <section className="sec tone-wash" id="edit" style={{ background: "var(--wash1)" }}>
        <div className="inner finder">
          <div>
            <p className="label">
              <span className="num">05</span>Find your Nooré Edit ✦
            </p>
            <h2 className="h2">
              What are you <em>dressing for?</em>
            </h2>

            <div className="chips" id="occ" role="group" aria-label="Occasion">
              {Object.keys(EDIT_DATA).map((occ) => (
                <button
                  key={occ}
                  type="button"
                  aria-pressed={activeOccasion === occ}
                  onClick={() => setActiveOccasion(occ)}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic 3-Piece Result Grid */}
          <div className="res" id="res">
            {EDIT_DATA[activeOccasion].map((item, i) => (
              <div key={i} className="rc" style={{ "--i": i } as React.CSSProperties}>
                <div className={`ph ${item[2]}`}>
                  <span className="ph-l">Silhouette</span>
                </div>
                <span className="k">
                  0{i + 1} · {KEYS[i]}
                </span>
                <b>{item[0]}</b>
                <small>{money(item[1])}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY MOMENT */}
      <section className="sec tone-mist" id="moments" style={{ paddingBottom: "72px" }}>
        <div className="inner h-row">
          <div>
            <p className="label">
              <span className="num">06</span>Shop by moment
            </p>
            <h2 className="h2">
              Collected in <em>soft light.</em>
            </h2>
          </div>
          <div className="railbar">
            <button
              className="round"
              type="button"
              onClick={() => scrollRail(-320)}
              aria-label="Previous"
            >
              ←
            </button>
            <button
              className="round"
              type="button"
              onClick={() => scrollRail(320)}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          className="rail"
          id="rail"
          tabIndex={0}
          aria-label="Moments"
        >
          <article className="mc">
            <div className="arch ph t-sage">
              <span className="cap">Everyday</span>
            </div>
            <h3>Everyday</h3>
            <p>Easy layers for long days.</p>
          </article>

          <article className="mc">
            <div className="arch flat ph t-ink">
              <span className="cap">Office</span>
            </div>
            <h3>Office</h3>
            <p>Sharp, quiet, composed.</p>
          </article>

          <article className="mc">
            <div className="arch ph t-oat">
              <span className="cap">Eid</span>
            </div>
            <h3>Eid</h3>
            <p>Pieces made for the morning.</p>
          </article>

          <article className="mc">
            <div className="arch ph t-moss">
              <span className="cap">Wedding Guest</span>
            </div>
            <h3>Wedding Guest</h3>
            <p>Soft statement, no excess.</p>
          </article>

          <article className="mc">
            <div className="arch flat ph t-stone">
              <span className="cap">Ramadan</span>
            </div>
            <h3>Ramadan</h3>
            <p>Light fabrics for long nights.</p>
          </article>

          <article className="mc">
            <div className="arch ph t-sage">
              <span className="cap">Prayer</span>
            </div>
            <h3>Prayer</h3>
            <p>Full coverage, easy movement.</p>
          </article>

          <article className="mc">
            <div className="arch flat ph t-oat">
              <span className="cap">Gift</span>
            </div>
            <h3>Gift</h3>
            <p>Wrapped, with a handwritten note.</p>
          </article>
        </div>
      </section>

      {/* STATEMENT SECTION */}
      <section
        ref={statementRef}
        className={`sec tone-deep statement ${statementIn ? "in" : ""}`}
        id="statement"
      >
        <div className="sea" aria-hidden="true" />
        <div className="aurora" aria-hidden="true" />
        <div className="inner">
          <p className="label">
            <span className="num">07</span>For moments that stay
          </p>
          <h2 className="lines">
            <span className="ln" style={{ "--i": 0 } as React.CSSProperties}>
              <span>Leave a little</span>
            </span>
            <span className="ln" style={{ "--i": 1 } as React.CSSProperties}>
              <span>of yourself in</span>
            </span>
            <span className="ln" style={{ "--i": 2 } as React.CSSProperties}>
              <span>
                <em>every room.</em>
              </span>
            </span>
          </h2>
          <Link className="pill" href="/style-finder">
            <span>Find your edit</span> <span className="plus">+</span>
          </Link>
        </div>
      </section>

      {/* NOORÉ DROPS */}
      <section className="sec tone-sage" id="drop">
        <div className="inner drop">
          <div>
            <p className="label">
              <span className="num">08</span>Nooré Drops
            </p>
            <h2 className="h2">
              The First Light <em>Drop</em>
            </h2>
            <p className="lede">Eight pieces, one quiet palette. Launching soon.</p>

            <div className="cd" role="timer" aria-label="Time until launch">
              <div>
                <span>{timeLeft.h}</span>
                <small>Hours</small>
              </div>
              <span className="sep">:</span>
              <div>
                <span>{timeLeft.m}</span>
                <small>Minutes</small>
              </div>
              <span className="sep">:</span>
              <div>
                <span>{timeLeft.s}</span>
                <small>Seconds</small>
              </div>
            </div>

            <p style={{ marginTop: "28px" }}>
              <Link className="pill" href="/drops">
                <span>Remind me</span> <span className="plus">+</span>
              </Link>
            </p>
          </div>

          <div className="arch ph t-moss" aria-hidden="true" style={{ aspectRatio: "3/4" }}>
            <span className="ph-l">Drop Hero Silhouette</span>
          </div>
        </div>
      </section>

      {/* TRUST GRID */}
      <section className="sec tone-cream" style={{ paddingBlock: "72px 24px" }}>
        <div className="inner">
          <div className="trust">
            <div>
              <h3>Cash on delivery</h3>
              <p>Pay when it arrives, or use bKash and Nagad.</p>
            </div>
            <div>
              <h3>Delivery</h3>
              <p>Dhaka 1–2 working days. Outside Dhaka 2–4.</p>
            </div>
            <div>
              <h3>Returns</h3>
              <p>Request a return or exchange from Track Order.</p>
            </div>
            <div>
              <h3>Concierge</h3>
              <p>Message us on WhatsApp for help choosing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="sec tone-wash foot" id="footer">
        <div className="inner">
          <div className="cols">
            <div>
              <h4>Shop</h4>
              <Link href="/category/abayas">Abayas</Link>
              <Link href="/category/three-piece-sets">Three Piece Sets</Link>
              <Link href="/category/corsets">Corsets</Link>
            </div>
            <div>
              <h4>Moments</h4>
              <Link href="/moment/eid">Eid</Link>
              <Link href="/moment/wedding-guest">Wedding Guest</Link>
              <Link href="/moment/ramadan">Ramadan</Link>
            </div>
            <div>
              <h4>Help</h4>
              <Link href="/track-order">Track order</Link>
              <Link href="/size-guide">Size guide</Link>
              <Link href="/delivery-returns">Delivery &amp; returns</Link>
            </div>
            <div>
              <h4>Atelier</h4>
              <Link href="/journal">Journal</Link>
              <Link href="/fabrics">Fabrics</Link>
              <Link href="/about">About</Link>
            </div>
          </div>

          <div className="fine">
            <span>© 2026 Modesty, Redefined.</span>
            <span>All 64 districts priority delivery.</span>
          </div>
        </div>
      </footer>

      {/* CONCIERGE FLOATING WHATSAPP TRIGGER */}
      <a
        className="concierge"
        id="concierge"
        href="https://wa.me/8801700000000?text=Hi%2C%20I'd%20like%20help%20choosing%20an%20outfit."
        target="_blank"
        rel="noopener noreferrer"
      >
        <span aria-hidden="true">✦</span>
        <span className="t">Need help choosing? Atelier Concierge</span>
      </a>

      {/* BOTTOM LEFT DOCK WITH REPLAY INTRO */}
      <div className="dock">
        <button
          type="button"
          id="replay"
          onClick={() => {
            try {
              sessionStorage.removeItem("sn-intro-seen");
            } catch (e) {}
            document.body.classList.remove("entered");
            window.location.reload();
          }}
          aria-label="Replay intro"
        >
          <span aria-hidden="true">↺</span>
          <span>Replay intro</span>
        </button>
      </div>
    </div>
  );
}
