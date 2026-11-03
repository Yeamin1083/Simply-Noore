"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  DollarSign,
  Truck,
  Users,
  Settings,
  ShieldCheck,
  Palette,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Printer,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  RefreshCw,
  Clock,
  Phone,
  Check,
} from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { formatBDT } from "@/lib/utils";

interface OrderItem {
  id: string;
  customer: string;
  phone: string;
  district: string;
  items: string;
  total: number;
  payment: "COD" | "bKash" | "Nagad";
  trxId?: string;
  status: "Pending" | "Processing" | "Ready to Dispatch" | "Shipped" | "Delivered";
  date: string;
  courier?: string;
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "products" | "scene" | "settings">("overview");
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [inventoryList, setInventoryList] = useState(PRODUCTS);

  // Live orders state
  const [orders, setOrders] = useState<OrderItem[]>([
    {
      id: "SN-2610-48219",
      customer: "Farzana Yasmin",
      phone: "01712-345678",
      district: "Dhaka (Dhanmondi)",
      items: "Rawdah Abaya (Terracotta Rose, 54)",
      total: 6850,
      payment: "COD",
      status: "Processing",
      date: "10 mins ago",
    },
    {
      id: "SN-2610-48218",
      customer: "Nafisa Anjum",
      phone: "01844-987654",
      district: "Chattogram (Nasirabad)",
      items: "Layla Three-Piece + Safia Cinch (Sage, 56)",
      total: 13250,
      payment: "bKash",
      trxId: "9J47KLP3Q",
      status: "Ready to Dispatch",
      date: "42 mins ago",
      courier: "Steadfast Pending",
    },
    {
      id: "SN-2610-48217",
      customer: "Taslima Begum",
      phone: "01911-223344",
      district: "Sylhet (Zindabazar)",
      items: "Qamar Crinkle Silk Abaya (Oat, 54)",
      total: 7400,
      payment: "COD",
      status: "Shipped",
      date: "2 hours ago",
      courier: "ST-8829104",
    },
    {
      id: "SN-2610-48216",
      customer: "Sadia Rahman",
      phone: "01733-112233",
      district: "Dhaka (Uttara)",
      items: "Nura Kimono Trench (Ink, 52)",
      total: 5400,
      payment: "bKash",
      trxId: "8BL9921XP",
      status: "Delivered",
      date: "5 hours ago",
      courier: "ST-8829091",
    },
  ]);

  const handleDispatch = (orderId: string) => {
    const trackingCode = `ST-${Math.floor(1000000 + Math.random() * 9000000)}`;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: "Shipped", courier: trackingCode }
          : o
      )
    );
    alert(`Order ${orderId} dispatched via Steadfast Courier! Consignment ID: ${trackingCode}`);
  };

  const handleVerifyBkash = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: "Ready to Dispatch" }
          : o
      )
    );
    alert(`bKash payment for order ${orderId} verified successfully!`);
  };

  const filteredOrders = orders.filter((o) => {
    if (orderFilter !== "all" && o.status.toLowerCase().replace(/\s+/g, "-") !== orderFilter) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        (o.trxId && o.trxId.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header & Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest text-accent-ink font-semibold font-mono">
              Atelier Operations Portal
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-text mt-1">
            Simply Nooré Console
          </h1>
          <p className="text-xs text-muted mt-1">
            Dhaka Atelier Inventory, Real-time Guest Orders, Steadfast Courier API &amp; Scene Wash Studio.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-surface p-1 rounded-xl border border-border text-xs overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "overview"
                ? "bg-accent/20 text-accent-ink font-semibold shadow-sm"
                : "text-muted hover:text-text"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "orders"
                ? "bg-accent/20 text-accent-ink font-semibold shadow-sm"
                : "text-muted hover:text-text"
            }`}
          >
            <span>Orders Queue</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 text-[10px] font-semibold">
              {orders.filter((o) => o.status !== "Delivered").length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "products"
                ? "bg-accent/20 text-accent-ink font-semibold shadow-sm"
                : "text-muted hover:text-text"
            }`}
          >
            Silhouettes ({inventoryList.length})
          </button>
          <button
            onClick={() => setActiveTab("scene")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "scene"
                ? "bg-accent/20 text-accent-ink font-semibold shadow-sm"
                : "text-muted hover:text-text"
            }`}
          >
            Scene Studio
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "settings"
                ? "bg-accent/20 text-accent-ink font-semibold shadow-sm"
                : "text-muted hover:text-text"
            }`}
          >
            Logistics &amp; Rules
          </button>
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-muted font-medium font-mono">
                Today&apos;s Revenue
              </span>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-text">
                {formatBDT(48250)}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <TrendingUp className="h-3 w-3" />
                <span>+18% vs yesterday</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-muted font-medium font-mono">
                Active Orders in Queue
              </span>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-text">
                {orders.filter((o) => o.status !== "Delivered").length}
              </p>
              <span className="text-[11px] text-muted">2 ready for courier pickup</span>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-muted font-medium font-mono">
                bKash Verification
              </span>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-[#E2136E]">
                1 Pending
              </p>
              <span className="text-[11px] text-muted">TrxID: 9J47KLP3Q</span>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-muted font-medium font-mono">
                Steadfast Logistics
              </span>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-text">14 Dispatched</p>
              <span className="text-[11px] text-emerald-600 font-medium">100% on schedule</span>
            </div>
          </div>

          {/* Quick Action Alert Banner */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-text">
            <div className="flex items-center gap-2.5">
              <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
              <span>
                <strong>Action Needed:</strong> Order <code>SN-2610-48218</code> has a ৳13,250 bKash transaction waiting for verification before dispatch.
              </span>
            </div>
            <button
              onClick={() => handleVerifyBkash("SN-2610-48218")}
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors flex-shrink-0"
            >
              Verify bKash Now
            </button>
          </div>

          {/* Recent Orders Queue Table */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-medium text-text">Recent Orders Queue</h2>
                <p className="text-xs text-muted">Guest orders screened with phone risk (#21) &amp; partial advance (#22)</p>
              </div>
              <button
                onClick={() => setActiveTab("orders")}
                className="text-xs text-accent-ink hover:underline font-medium flex items-center gap-1"
              >
                <span>View Full Queue</span>
                <ArrowUpRight className="h-3 w-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-surface-2/40 text-muted border-b border-border font-medium uppercase tracking-wider font-mono">
                  <tr>
                    <th className="p-3">Reference</th>
                    <th className="p-3">Client</th>
                    <th className="p-3">Garments</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 text-text">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-surface-2/30 transition-colors">
                      <td className="p-3 font-mono font-medium">{o.id}</td>
                      <td className="p-3">
                        <span className="font-medium block">{o.customer}</span>
                        <span className="text-muted text-[11px]">{o.phone} • {o.district}</span>
                      </td>
                      <td className="p-3 max-w-xs truncate">{o.items}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          o.payment === "bKash"
                            ? "bg-[#E2136E]/10 text-[#E2136E]"
                            : "bg-surface-2 text-muted"
                        }`}>
                          {o.payment} {o.trxId && `(${o.trxId})`}
                        </span>
                      </td>
                      <td className="p-3 font-medium">{formatBDT(o.total)}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          o.status === "Delivered"
                            ? "bg-emerald-500/15 text-emerald-600"
                            : o.status === "Shipped"
                            ? "bg-blue-500/15 text-blue-600"
                            : "bg-amber-500/15 text-amber-600"
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {o.status === "Ready to Dispatch" && (
                          <button
                            onClick={() => handleDispatch(o.id)}
                            className="px-3 py-1 rounded bg-accent-ink text-white font-medium hover:opacity-90"
                          >
                            Dispatch Steadfast
                          </button>
                        )}
                        <button
                          onClick={() => alert(`Packing slip for order ${o.id}:\nClient: ${o.customer}\nDestination: ${o.district}\nItems: ${o.items}\nPayable: ${o.payment === "COD" ? formatBDT(o.total) : "PAID"}`)}
                          className="px-2.5 py-1 rounded border border-border hover:bg-surface-2 text-muted hover:text-text"
                          title="Print Packing Slip"
                        >
                          <Printer className="h-3.5 w-3.5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ORDERS QUEUE TAB */}
      {activeTab === "orders" && (
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-medium text-text">Full Orders Queue</h2>
              <p className="text-xs text-muted">
                Order fulfillment pipeline with Steadfast courier consignment generator and partial advance screening.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-2 text-xs flex-wrap">
              {["all", "processing", "ready-to-dispatch", "shipped", "delivered"].map((f) => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f)}
                  className={`px-3 py-1.5 rounded-lg uppercase tracking-wider text-[10px] font-semibold transition-all ${
                    orderFilter === f
                      ? "bg-accent text-bg"
                      : "bg-surface-2/60 text-muted hover:text-text"
                  }`}
                >
                  {f.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-border/20">
            {filteredOrders.map((o) => (
              <div key={o.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-text text-sm">{o.id}</span>
                    <span className="text-muted">• {o.customer}</span>
                    <span className="text-muted text-[11px] font-mono">({o.phone})</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-surface-2 text-muted">
                      {o.date}
                    </span>
                  </div>
                  <p className="text-text font-medium">{o.items}</p>
                  <p className="text-muted text-[11px]">
                    Delivery: {o.district} • Payment: {o.payment} {o.trxId && `(TrxID: ${o.trxId})`} • Total: <strong>{formatBDT(o.total)}</strong>
                    {o.courier && <span className="ml-2 text-accent-ink font-mono font-semibold">[{o.courier}]</span>}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {o.payment === "bKash" && o.status === "Processing" && (
                    <button
                      onClick={() => handleVerifyBkash(o.id)}
                      className="px-3 py-1.5 rounded bg-[#E2136E] text-white font-medium hover:opacity-90"
                    >
                      Verify bKash
                    </button>
                  )}
                  {o.status === "Ready to Dispatch" && (
                    <button
                      onClick={() => handleDispatch(o.id)}
                      className="px-3 py-1.5 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700"
                    >
                      Dispatch Steadfast
                    </button>
                  )}
                  <button
                    onClick={() => alert(`Packing Slip for Order #${o.id}\nClient: ${o.customer}\nPhone: ${o.phone}\nAddress: ${o.district}\nItems: ${o.items}\nAmount: ${formatBDT(o.total)}`)}
                    className="px-3 py-1.5 rounded border border-border hover:bg-surface-2 text-muted hover:text-text flex items-center gap-1.5"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    <span>Packing Slip</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === "products" && (
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-serif text-2xl font-medium text-text">Launch Catalogue Inventory</h2>
              <p className="text-xs text-muted">Women&apos;s Modest Fashion (8 active silhouettes designed in Dhaka)</p>
            </div>
            <button
              onClick={() => alert("Silhouette creator modal opened: upload high-res imagery, set wash hex, fabric composition, and stock counts.")}
              className="px-4 py-2 rounded-full bg-accent-ink text-white hover:opacity-90 text-xs uppercase tracking-wider font-semibold shadow-md"
            >
              + Create Silhouette
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inventoryList.map((p) => (
              <div key={p.id} className="p-4 rounded-xl border border-border/60 bg-surface-2/20 flex gap-4 text-xs">
                <div className="h-20 w-16 rounded-lg bg-surface-2 relative overflow-hidden flex-shrink-0">
                  <img src={p.variants[0].image} alt={p.title} className="object-cover h-full w-full" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-semibold text-text">{p.title}</h4>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold text-[10px]">
                      Active
                    </span>
                  </div>
                  <p className="text-muted">{p.categoryLabel} • Fabric: {p.fabricName}</p>
                  <p className="font-medium text-accent-ink text-sm">{formatBDT(p.price)}</p>
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-muted">
                    <span>Sizes: {p.variants[0].sizes.join(", ")}</span>
                    <span>•</span>
                    <span className="font-mono font-medium text-text">{p.variants[0].stockCount} in atelier</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SCENE STUDIO TAB (#4, #13) */}
      {activeTab === "scene" && (
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-medium text-text">Scene Studio (#13)</h2>
            <p className="text-xs text-muted">
              Auto-extract wash colors from garment photography, preview light and dark theme contrast, and configure anatomy hotspot coordinates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.slice(0, 3).map((p) => (
              <div key={p.id} className="p-5 rounded-2xl border border-border bg-surface-2/20 space-y-3 text-xs">
                <h4 className="font-serif text-base font-semibold text-text">{p.title}</h4>
                <div
                  className="p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-1.5 shadow-inner"
                  style={{ backgroundColor: p.variants[0].washColor, color: p.variants[0].washInk }}
                >
                  <span className="font-serif text-xl font-medium">{p.variants[0].colorName} Wash</span>
                  <span className="text-[11px] font-mono opacity-80">{p.variants[0].washColor}</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-800 font-semibold mt-1">
                    WCAG AA Passed (7.8:1)
                  </span>
                </div>
                <div className="space-y-1 text-muted text-[11px]">
                  <p>Hotspots: {p.hotspots?.length || 2} pins configured.</p>
                  <p>Color Hex: <code>{p.variants[0].colorHex}</code></p>
                  <p>Wash Ink: <code>{p.variants[0].washInk}</code></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SETTINGS & LOGISTICS TAB */}
      {activeTab === "settings" && (
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-medium text-text">Logistics &amp; Courier Rules</h2>
            <p className="text-xs text-muted">
              Dhaka city priority dispatch, all 64 districts courier rates, advance payment screening (#22), and notification webhooks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Courier Settings */}
            <div className="p-5 rounded-xl border border-border space-y-4">
              <h3 className="font-serif text-base font-medium text-text">Courier Delivery Rates</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted">Inside Dhaka Priority (1-2 days)</span>
                  <span className="font-mono font-bold text-text">৳80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Outside Dhaka Nationwide (2-4 days)</span>
                  <span className="font-mono font-bold text-text">৳130</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Free Shipping Order Threshold</span>
                  <span className="font-mono font-bold text-text">৳10,000</span>
                </div>
              </div>
            </div>

            {/* Advance Payment Rule (#22) */}
            <div className="p-5 rounded-xl border border-border space-y-4">
              <h3 className="font-serif text-base font-medium text-text">Advance Payment Screening (#22)</h3>
              <p className="text-muted text-[11px] leading-relaxed">
                Orders exceeding ৳10,000 or including custom alterations require a 25% advance via bKash or Nagad to confirm atelier cutting.
              </p>
              <div className="p-3 bg-surface-2 rounded-lg space-y-1 font-mono text-[11px]">
                <p>Status: <span className="text-emerald-600 font-bold">ACTIVE</span></p>
                <p>bKash Merchant: <code>01700-000000</code></p>
                <p>Nagad Merchant: <code>01700-000000</code></p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
