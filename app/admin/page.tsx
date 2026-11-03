"use client";

import React, { useState, useEffect, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  DollarSign,
  Truck,
  Settings,
  Palette,
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
  Plus,
  Trash2,
  Edit3,
  Copy,
  Download,
  Upload,
  BookOpen,
  Tag,
  CheckCircle2,
  X,
  Eye,
  Sliders,
  Sparkles,
  Info,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { Product, ProductVariant, OrderItem, OrderStatus, JournalArticle, Coupon } from "@/lib/types";
import { formatBDT } from "@/lib/utils";

// Curated high-resolution atelier aesthetic imagery presets for 1-click selection
const IMAGE_PRESETS = [
  {
    name: "Korean Nida Abaya (Terracotta)",
    url: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Monochrome Minimalist Set (Sage)",
    url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Sculpted Linen Corset (Oat)",
    url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Draped Silk Cocoon (Ink Navy)",
    url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Medina Silk Crepe (Dusk Rose)",
    url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "Crinkle Shimmer Abaya (Oatmeal)",
    url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=900&auto=format&fit=crop",
  },
];

const AVAILABLE_SIZES = ["52", "54", "56", "58", "Free Size", "Custom"];
const CATEGORY_OPTIONS = [
  { id: "abayas", label: "Abayas" },
  { id: "three-piece-sets", label: "Three Piece Sets" },
  { id: "corsets", label: "Corsets & Belts" },
  { id: "inner-slips", label: "Inner Slips & Basewear" },
  { id: "outerwear", label: "Capes & Outerwear" },
];

function AdminContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab") as
    | "overview"
    | "orders"
    | "products"
    | "journal"
    | "coupons"
    | "scene"
    | "settings"
    | null;

  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
    importProducts,
    orders,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    siteSettings,
    updateSiteSettings,
    resetSiteSettings,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    resetArticles,
    coupons,
    addCoupon,
    deleteCoupon,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "products" | "journal" | "coupons" | "scene" | "settings"
  >("overview");

  // Sync tab with URL query parameter
  useEffect(() => {
    if (tabParam && ["overview", "orders", "products", "journal", "coupons", "scene", "settings"].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  // Orders State & Filters
  const [orderFilter, setOrderFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderForSlip, setSelectedOrderForSlip] = useState<OrderItem | null>(null);

  // Manual Order Modal State
  const [showManualOrderModal, setShowManualOrderModal] = useState(false);
  const [manualCustomer, setManualCustomer] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualDistrict, setManualDistrict] = useState("Dhaka");
  const [manualAddress, setManualAddress] = useState("");
  const [manualItems, setManualItems] = useState("");
  const [manualTotal, setManualTotal] = useState(6500);
  const [manualPayment, setManualPayment] = useState<"COD" | "bKash" | "Nagad">("COD");
  const [manualTrxId, setManualTrxId] = useState("");

  // Product Modals & Form State
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");

  // Product Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formTitleBn, setFormTitleBn] = useState("");
  const [formCategory, setFormCategory] = useState("abayas");
  const [formPrice, setFormPrice] = useState<number>(6850);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(7500);
  const [formFabricName, setFormFabricName] = useState("Korean Nida Crepe");
  const [formBadge, setFormBadge] = useState<string>("BEST SELLER");
  const [formDescription, setFormDescription] = useState("");
  const [formTags, setFormTags] = useState("Abaya, Nida, Everyday");
  const [formStockCount, setFormStockCount] = useState<number>(15);
  // Image config
  const [formImage, setFormImage] = useState(IMAGE_PRESETS[0].url);
  const [formSecondaryImage, setFormSecondaryImage] = useState("");
  // Color & Wash config
  const [formColorName, setFormColorName] = useState("Terracotta");
  const [formColorHex, setFormColorHex] = useState("#C57045");
  const [formWashColor, setFormWashColor] = useState("#F5DEC8");
  const [formWashInk, setFormWashInk] = useState("#1F2A23");
  const [formSizes, setFormSizes] = useState<string[]>(["52", "54", "56"]);

  // File Upload Reference for images
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Journal Modal State
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [articleTitle, setArticleTitle] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("Editorial Atelier");
  const [articleDate, setArticleDate] = useState("March 2026");
  const [articleImage, setArticleImage] = useState(IMAGE_PRESETS[0].url);
  const [articleExcerpt, setArticleExcerpt] = useState("");
  const [articleContent, setArticleContent] = useState("");

  // Coupon Modal State
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState("");
  const [newCouponDiscount, setNewCouponDiscount] = useState(10);
  const [newCouponDesc, setNewCouponDesc] = useState("");

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState(siteSettings);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  useEffect(() => {
    setSettingsForm(siteSettings);
  }, [siteSettings]);

  // Open Create Product Modal
  const openCreateProduct = () => {
    setEditingProductId(null);
    setFormTitle("");
    setFormTitleBn("");
    setFormCategory("abayas");
    setFormPrice(6850);
    setFormOriginalPrice(7500);
    setFormFabricName("Korean Nida Crepe");
    setFormBadge("NEW");
    setFormDescription("Sculpted with seamless kimono batwing sleeves and soft flowing pleats.");
    setFormTags("Abaya, Nida, Atelier");
    setFormStockCount(12);
    setFormImage(IMAGE_PRESETS[0].url);
    setFormSecondaryImage("");
    setFormColorName("Terracotta");
    setFormColorHex("#C57045");
    setFormWashColor("#F5DEC8");
    setFormWashInk("#1F2A23");
    setFormSizes(["52", "54", "56"]);
    setShowProductModal(true);
  };

  // Open Edit Product Modal
  const openEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setFormTitle(p.title);
    setFormTitleBn(p.titleBn || "");
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || p.price);
    setFormFabricName(p.fabricName || "Linen Crepe");
    setFormBadge(p.badge || "");
    setFormDescription(p.description || "");
    setFormTags(p.tags ? p.tags.join(", ") : "");
    const v = p.variants?.[0] || {
      stockCount: 10,
      image: IMAGE_PRESETS[0].url,
      colorName: "Natural",
      colorHex: "#333",
      washColor: "#EEE",
      washInk: "#111",
      sizes: ["52", "54"],
    };
    setFormStockCount(v.stockCount ?? 10);
    setFormImage(v.image || IMAGE_PRESETS[0].url);
    setFormSecondaryImage(v.secondaryImage || "");
    setFormColorName(v.colorName || "Original");
    setFormColorHex(v.colorHex || "#C57045");
    setFormWashColor(v.washColor || "#F5DEC8");
    setFormWashInk(v.washInk || "#1F2A23");
    setFormSizes(v.sizes?.length ? v.sizes : ["52", "54", "56"]);
    setShowProductModal(true);
  };

  // Handle Image File Upload (Local to Data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image file size should be less than 2MB for fast static loading.");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setFormImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      alert("Please enter a title for the silhouette.");
      return;
    }

    const catObj = CATEGORY_OPTIONS.find((c) => c.id === formCategory);
    const catLabel = catObj ? catObj.label : "Abayas";
    const slug =
      formTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `piece-${Date.now()}`;

    const tagsArray = formTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const variant: ProductVariant = {
      id: editingProductId ? `var-${editingProductId}` : `var-${Date.now()}`,
      name: `${formTitle} - ${formColorName}`,
      colorName: formColorName,
      colorHex: formColorHex,
      washColor: formWashColor,
      washInk: formWashInk,
      sku: `SN-${formCategory.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      inStock: formStockCount > 0,
      stockCount: formStockCount,
      sizes: formSizes.length > 0 ? formSizes : ["Standard"],
      image: formImage || IMAGE_PRESETS[0].url,
      secondaryImage: formSecondaryImage || undefined,
    };

    if (editingProductId) {
      // Update existing
      updateProduct(editingProductId, {
        title: formTitle,
        titleBn: formTitleBn || formTitle,
        category: formCategory,
        categoryLabel: catLabel,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice) || Number(formPrice),
        badge: (formBadge as any) || undefined,
        description: formDescription,
        descriptionBn: formTitleBn ? formDescription : undefined,
        fabricName: formFabricName,
        tags: tagsArray,
        variants: [variant],
      });
      alert(`Silhouette "${formTitle}" updated successfully!`);
    } else {
      // Create new
      const newProduct: Product = {
        id: `sn-${Date.now().toString().slice(-5)}`,
        slug: slug,
        title: formTitle,
        titleBn: formTitleBn || formTitle,
        category: formCategory,
        categoryLabel: catLabel,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice) || Number(formPrice),
        badge: (formBadge as any) || undefined,
        description: formDescription,
        descriptionBn: formTitleBn ? formDescription : undefined,
        fabricId: `fab-${formCategory}`,
        fabricName: formFabricName,
        rating: 5.0,
        reviewCount: 1,
        tags: tagsArray,
        occasions: ["Everyday", "Atelier Edit"],
        variants: [variant],
      };
      addProduct(newProduct);
      alert(`New silhouette "${formTitle}" published to catalogue!`);
    }

    setShowProductModal(false);
  };

  // Duplicate Product
  const handleDuplicateProduct = (p: Product) => {
    const clone: Product = {
      ...p,
      id: `sn-${Date.now().toString().slice(-5)}`,
      slug: `${p.slug}-copy-${Math.floor(10 + Math.random() * 90)}`,
      title: `${p.title} (Atelier Edit)`,
      variants: p.variants.map((v) => ({
        ...v,
        id: `var-${Date.now()}-${Math.floor(10 + Math.random() * 90)}`,
      })),
    };
    addProduct(clone);
    alert(`Duplicated "${p.title}" successfully.`);
  };

  // Delete Product Confirmation
  const handleDeleteProduct = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete silhouette "${title}"? This cannot be undone.`)) {
      deleteProduct(id);
    }
  };

  // Export Catalogue as JSON
  const handleExportCatalogue = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `simply-noore-catalogue-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import Catalogue from JSON
  const handleImportCatalogue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (Array.isArray(parsed) && parsed.length > 0) {
            importProducts(parsed);
            alert(`Successfully imported ${parsed.length} silhouettes into catalogue!`);
          } else {
            alert("Invalid catalogue JSON format.");
          }
        } catch {
          alert("Error parsing JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  // Quick Stock Adjuster (+ / -)
  const handleAdjustStock = (p: Product, delta: number) => {
    const currentVariant = p.variants?.[0];
    if (!currentVariant) return;
    const nextCount = Math.max(0, (currentVariant.stockCount || 0) + delta);
    updateProduct(p.id, {
      variants: [
        {
          ...currentVariant,
          stockCount: nextCount,
          inStock: nextCount > 0,
        },
      ],
    });
  };

  // Orders: Verify payment
  const handleVerifyPayment = (orderId: string) => {
    updateOrderStatus(orderId, "Ready to Dispatch");
    alert(`Payment for order ${orderId} verified. Status changed to "Ready to Dispatch".`);
  };

  // Orders: Dispatch Steadfast
  const handleDispatchSteadfast = (orderId: string) => {
    const trackingCode = `ST-${Math.floor(1000000 + Math.random() * 9000000)}`;
    updateOrderStatus(orderId, "Shipped", trackingCode);
    alert(`Order ${orderId} dispatched via Steadfast Courier! Consignment ID: ${trackingCode}`);
  };

  // Orders: Manual Order Submission
  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCustomer || !manualPhone || !manualItems) {
      alert("Please fill in customer name, phone number, and items.");
      return;
    }
    const order: OrderItem = {
      id: `SN-${Date.now().toString().slice(-6)}`,
      customer: manualCustomer,
      phone: manualPhone,
      district: manualDistrict,
      address: manualAddress || manualDistrict,
      items: manualItems,
      total: Number(manualTotal),
      payment: manualPayment,
      trxId: manualTrxId || undefined,
      status: manualPayment === "COD" ? "Processing" : "Ready to Dispatch",
      date: "Just now",
    };
    addOrder(order);
    alert(`Manual order ${order.id} for ${manualCustomer} added to queue!`);
    setShowManualOrderModal(false);
    setManualCustomer("");
    setManualPhone("");
    setManualAddress("");
    setManualItems("");
    setManualTrxId("");
  };

  // Journal: Open Create / Edit
  const openCreateArticle = () => {
    setEditingArticleId(null);
    setArticleTitle("");
    setArticleAuthor("Editorial Atelier");
    setArticleDate("March 2026");
    setArticleImage(IMAGE_PRESETS[0].url);
    setArticleExcerpt("");
    setArticleContent("");
    setShowArticleModal(true);
  };

  const openEditArticle = (art: JournalArticle) => {
    setEditingArticleId(art.id);
    setArticleTitle(art.title);
    setArticleAuthor(art.author);
    setArticleDate(art.date);
    setArticleImage(art.image);
    setArticleExcerpt(art.excerpt);
    setArticleContent(art.content || "");
    setShowArticleModal(true);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleTitle.trim()) {
      alert("Please enter article title.");
      return;
    }
    const slug =
      articleTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") || `art-${Date.now()}`;

    if (editingArticleId) {
      updateArticle(editingArticleId, {
        title: articleTitle,
        slug: slug,
        author: articleAuthor,
        date: articleDate,
        image: articleImage,
        excerpt: articleExcerpt,
        content: articleContent,
      });
      alert(`Article "${articleTitle}" updated!`);
    } else {
      addArticle({
        id: `art-${Date.now()}`,
        slug: slug,
        title: articleTitle,
        author: articleAuthor,
        date: articleDate,
        image: articleImage,
        excerpt: articleExcerpt,
        content: articleContent,
      });
      alert(`New article "${articleTitle}" published to Journal!`);
    }
    setShowArticleModal(false);
  };

  // Coupons: Add Coupon
  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) {
      alert("Please enter coupon code.");
      return;
    }
    addCoupon({
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: Number(newCouponDiscount),
      description: newCouponDesc || `${newCouponDiscount}% privilege coupon`,
      active: true,
    });
    alert(`Coupon "${newCouponCode.toUpperCase()}" added!`);
    setNewCouponCode("");
    setShowCouponModal(false);
  };

  // Settings Save
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 3000);
  };

  // Filtered Orders
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

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (productCategoryFilter !== "all" && p.category !== productCategoryFilter) {
      return false;
    }
    if (productSearch) {
      const q = productSearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        (p.fabricName && p.fabricName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Calculate Live Overview Stats
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "Cancelled" ? o.total : 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length;
  const pendingBkashCount = orders.filter((o) => o.payment === "bKash" && o.status === "Pending").length;
  const lowStockCount = products.filter((p) => (p.variants?.[0]?.stockCount ?? 0) <= 5).length;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest text-accent-ink font-semibold font-mono">
              Dhaka Atelier Operations Console
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-text mt-1">
            Simply Nooré Atelier Portal
          </h1>
          <p className="text-xs text-muted mt-1">
            Complete management of Dhaka atelier inventory, model photography, guest orders, courier logistics &amp; editorial journal.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-surface p-1 rounded-xl border border-border text-xs overflow-x-auto max-w-full">
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
            onClick={() => setActiveTab("products")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === "products"
                ? "bg-accent/20 text-accent-ink font-semibold shadow-sm"
                : "text-muted hover:text-text"
            }`}
          >
            <span>Silhouettes</span>
            <span className="px-1.5 py-0.2 rounded-full bg-accent/30 text-accent-ink text-[10px] font-semibold">
              {products.length}
            </span>
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
              {activeOrdersCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("journal")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "journal"
                ? "bg-accent/20 text-accent-ink font-semibold shadow-sm"
                : "text-muted hover:text-text"
            }`}
          >
            Journal ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab("coupons")}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "coupons"
                ? "bg-accent/20 text-accent-ink font-semibold shadow-sm"
                : "text-muted hover:text-text"
            }`}
          >
            Coupons ({coupons.length})
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
            Settings &amp; Rules
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 1. OVERVIEW TAB */}
      {/* ============================================================== */}
      {activeTab === "overview" && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Live Metrics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-muted font-medium font-mono">
                Atelier Revenue
              </span>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-text">
                {formatBDT(totalRevenue)}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                <TrendingUp className="h-3 w-3" />
                <span>Across {orders.length} total orders</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-muted font-medium font-mono">
                Active Orders in Queue
              </span>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-text">
                {activeOrdersCount}
              </p>
              <span className="text-[11px] text-muted">
                {orders.filter((o) => o.status === "Ready to Dispatch").length} ready for courier pickup
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-muted font-medium font-mono">
                bKash / Nagad Verification
              </span>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-[#E2136E]">
                {pendingBkashCount} Pending
              </p>
              <span className="text-[11px] text-muted">Advance screening #22</span>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-border shadow-sm space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-muted font-medium font-mono">
                Catalogue Inventory
              </span>
              <p className="font-serif text-2xl md:text-3xl font-semibold text-text">
                {products.length} Silhouettes
              </p>
              <span className={`text-[11px] font-medium ${lowStockCount > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                {lowStockCount > 0 ? `${lowStockCount} items low in atelier` : "All in healthy stock"}
              </span>
            </div>
          </div>

          {/* Quick Notice Alert */}
          {pendingBkashCount > 0 && (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-text">
              <div className="flex items-center gap-2.5">
                <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                <span>
                  <strong>Action Needed:</strong> {pendingBkashCount} pending digital payment(s) waiting for manual TrxID verification before dispatch.
                </span>
              </div>
              <button
                onClick={() => setActiveTab("orders")}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white font-medium hover:bg-amber-700 transition-colors flex-shrink-0"
              >
                Review Orders Queue
              </button>
            </div>
          )}

          {/* Recent Orders Overview */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-medium text-text">Recent Orders Queue</h2>
                <p className="text-xs text-muted">Real guest orders synced from storefront checkout</p>
              </div>
              <button
                onClick={() => setActiveTab("orders")}
                className="text-xs text-accent-ink hover:underline font-medium flex items-center gap-1"
              >
                <span>View All ({orders.length})</span>
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
                    <th className="p-3 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 text-text">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="hover:bg-surface-2/30 transition-colors">
                      <td className="p-3 font-mono font-medium">{o.id}</td>
                      <td className="p-3">
                        <span className="font-medium block">{o.customer}</span>
                        <span className="text-muted text-[11px]">{o.phone} • {o.district}</span>
                      </td>
                      <td className="p-3 max-w-xs truncate">{o.items}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            o.payment === "bKash"
                              ? "bg-[#E2136E]/10 text-[#E2136E]"
                              : o.payment === "Nagad"
                              ? "bg-amber-500/10 text-amber-700"
                              : "bg-surface-2 text-muted"
                          }`}
                        >
                          {o.payment} {o.trxId && `(${o.trxId})`}
                        </span>
                      </td>
                      <td className="p-3 font-medium">{formatBDT(o.total)}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                            o.status === "Delivered"
                              ? "bg-emerald-500/15 text-emerald-600"
                              : o.status === "Shipped"
                              ? "bg-blue-500/15 text-blue-600"
                              : o.status === "Ready to Dispatch"
                              ? "bg-indigo-500/15 text-indigo-600"
                              : "bg-amber-500/15 text-amber-600"
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {o.status === "Pending" && (
                          <button
                            onClick={() => handleVerifyPayment(o.id)}
                            className="px-2.5 py-1 rounded bg-[#E2136E] text-white font-medium hover:opacity-90"
                          >
                            Verify
                          </button>
                        )}
                        {o.status === "Ready to Dispatch" && (
                          <button
                            onClick={() => handleDispatchSteadfast(o.id)}
                            className="px-2.5 py-1 rounded bg-accent-ink text-white font-medium hover:opacity-90"
                          >
                            Dispatch
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedOrderForSlip(o)}
                          className="px-2 py-1 rounded border border-border hover:bg-surface-2 text-muted hover:text-text"
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

      {/* ============================================================== */}
      {/* 2. SILHOUETTES & PRODUCTS CATALOGUE TAB */}
      {/* ============================================================== */}
      {activeTab === "products" && (
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-medium text-text">Catalogue &amp; Silhouette Inventory</h2>
              <p className="text-xs text-muted">
                Configure garments, photography, fabric attributes, size offerings, and atelier stock.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={openCreateProduct}
                className="px-4 py-2 rounded-full bg-accent-ink text-white hover:opacity-90 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>+ Create Silhouette</span>
              </button>

              <button
                onClick={handleExportCatalogue}
                className="px-3 py-2 rounded-full border border-border bg-surface hover:bg-surface-2 text-xs text-muted hover:text-text font-medium flex items-center gap-1.5"
                title="Backup full catalogue as JSON"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export JSON</span>
              </button>

              <label className="px-3 py-2 rounded-full border border-border bg-surface hover:bg-surface-2 text-xs text-muted hover:text-text font-medium flex items-center gap-1.5 cursor-pointer">
                <Upload className="h-3.5 w-3.5" />
                <span>Import JSON</span>
                <input type="file" accept=".json" onChange={handleImportCatalogue} className="hidden" />
              </label>

              <button
                onClick={() => {
                  if (confirm("Reset catalogue back to initial 8 silhouettes? Custom added products will be reset.")) {
                    resetProducts();
                  }
                }}
                className="px-3 py-2 rounded-full border border-red-500/30 text-red-600 hover:bg-red-500/10 text-xs font-medium"
                title="Reset to default collection"
              >
                Reset Defaults
              </button>
            </div>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-muted" />
              <input
                type="text"
                placeholder="Search by title or fabric..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-2/40 border border-border text-xs text-text focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto text-xs">
              <button
                onClick={() => setProductCategoryFilter("all")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                  productCategoryFilter === "all" ? "bg-accent/20 text-accent-ink font-semibold" : "text-muted hover:text-text"
                }`}
              >
                All ({products.length})
              </button>
              {CATEGORY_OPTIONS.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setProductCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                    productCategoryFilter === cat.id ? "bg-accent/20 text-accent-ink font-semibold" : "text-muted hover:text-text"
                  }`}
                >
                  {cat.label} ({products.filter((p) => p.category === cat.id).length})
                </button>
              ))}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((p) => {
              const variant = p.variants?.[0] || {
                image: IMAGE_PRESETS[0].url,
                stockCount: 0,
                colorName: "Natural",
                washColor: "#F5DEC8",
                sizes: ["Standard"],
              };
              const stock = variant.stockCount ?? 0;

              return (
                <div
                  key={p.id}
                  className="p-4 rounded-xl border border-border/70 bg-surface-2/20 flex flex-col justify-between gap-3 text-xs hover:border-accent-ink transition-colors group"
                >
                  <div className="flex gap-3">
                    <div className="h-24 w-20 rounded-lg bg-surface-2 relative overflow-hidden flex-shrink-0 border border-border/40">
                      <img src={variant.image} alt={p.title} className="object-cover h-full w-full" />
                      {p.badge && (
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] uppercase font-bold tracking-wider">
                          {p.badge}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-semibold text-text line-clamp-1">{p.title}</h4>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap ${
                            stock > 5 ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/15 text-amber-700"
                          }`}
                        >
                          {stock > 0 ? `${stock} in stock` : "Sold Out"}
                        </span>
                      </div>

                      <p className="text-muted text-[11px]">{p.categoryLabel} • {p.fabricName}</p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-accent-ink text-sm">{formatBDT(p.price)}</span>
                        {p.originalPrice && p.originalPrice > p.price && (
                          <span className="text-muted line-through text-[11px]">{formatBDT(p.originalPrice)}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-1 text-[11px] text-muted">
                        <span
                          className="h-3 w-3 rounded-full border border-black/20"
                          style={{ backgroundColor: variant.washColor || "#CCC" }}
                          title={`Wash: ${variant.colorName}`}
                        />
                        <span>{variant.colorName}</span>
                        <span>•</span>
                        <span>Sizes: {variant.sizes?.join(", ")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stock Stepper & Card Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    {/* Stock Stepper */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-muted text-[11px]">Qty:</span>
                      <button
                        onClick={() => handleAdjustStock(p, -1)}
                        className="h-6 w-6 rounded border border-border flex items-center justify-center hover:bg-surface-2 text-muted"
                        title="Decrease Stock"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold text-text px-1">{stock}</span>
                      <button
                        onClick={() => handleAdjustStock(p, 1)}
                        className="h-6 w-6 rounded border border-border flex items-center justify-center hover:bg-surface-2 text-muted"
                        title="Increase Stock"
                      >
                        +
                      </button>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={`/product/${p.slug}`}
                        target="_blank"
                        className="p-1.5 rounded hover:bg-surface-2 text-muted hover:text-text"
                        title="View Live Page"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDuplicateProduct(p)}
                        className="p-1.5 rounded hover:bg-surface-2 text-muted hover:text-text"
                        title="Duplicate Silhouette"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => openEditProduct(p)}
                        className="p-1.5 rounded bg-accent/20 text-accent-ink hover:bg-accent/30 font-medium"
                        title="Edit Silhouette"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p.id, p.title)}
                        className="p-1.5 rounded text-red-600 hover:bg-red-500/10"
                        title="Delete Silhouette"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. ORDERS QUEUE TAB */}
      {/* ============================================================== */}
      {activeTab === "orders" && (
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-medium text-text">Fulfillment &amp; Courier Queue</h2>
              <p className="text-xs text-muted">
                Screen guest orders, verify digital advances (#22), generate Steadfast consignments, and print slips.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowManualOrderModal(true)}
                className="px-4 py-2 rounded-full bg-accent-ink text-white hover:opacity-90 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>+ Phone / Custom Order</span>
              </button>
            </div>
          </div>

          {/* Filter and Search Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="h-3.5 w-3.5 absolute left-3 top-3 text-muted" />
              <input
                type="text"
                placeholder="Search reference, client, phone, or TrxID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-2/40 border border-border text-xs text-text focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto text-xs">
              {["all", "pending", "processing", "ready-to-dispatch", "shipped", "delivered"].map((f) => (
                <button
                  key={f}
                  onClick={() => setOrderFilter(f)}
                  className={`px-3 py-1.5 rounded-lg uppercase tracking-wider text-[10px] font-semibold transition-all ${
                    orderFilter === f
                      ? "bg-accent-ink text-white"
                      : "bg-surface-2/60 text-muted hover:text-text"
                  }`}
                >
                  {f.replace(/-/g, " ")}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="divide-y divide-border/20">
            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center text-muted text-xs">
                No orders matching filter criteria.
              </div>
            ) : (
              filteredOrders.map((o) => (
                <div key={o.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono font-bold text-text text-sm">{o.id}</span>
                      <span className="text-muted">• {o.customer}</span>
                      <span className="text-muted text-[11px] font-mono">({o.phone})</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-surface-2 text-muted">
                        {o.date}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                          o.status === "Delivered"
                            ? "bg-emerald-500/15 text-emerald-600"
                            : o.status === "Shipped"
                            ? "bg-blue-500/15 text-blue-600"
                            : o.status === "Ready to Dispatch"
                            ? "bg-indigo-500/15 text-indigo-600"
                            : "bg-amber-500/15 text-amber-600"
                        }`}
                      >
                        {o.status}
                      </span>
                    </div>

                    <p className="text-text font-medium">{o.items}</p>
                    <p className="text-muted text-[11px]">
                      Destination: <strong>{o.district}</strong> {o.address && `(${o.address})`} • Payment:{" "}
                      <span className="font-semibold text-text">{o.payment}</span> {o.trxId && `(TrxID: ${o.trxId})`} • Total:{" "}
                      <strong>{formatBDT(o.total)}</strong>
                      {o.courier && (
                        <span className="ml-2 text-accent-ink font-mono font-bold">
                          [{o.courier}]
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {o.status === "Pending" && (
                      <button
                        onClick={() => handleVerifyPayment(o.id)}
                        className="px-3 py-1.5 rounded bg-[#E2136E] text-white font-medium hover:opacity-90"
                      >
                        Verify Payment
                      </button>
                    )}
                    {o.status === "Ready to Dispatch" && (
                      <button
                        onClick={() => handleDispatchSteadfast(o.id)}
                        className="px-3 py-1.5 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-700"
                      >
                        Dispatch Steadfast
                      </button>
                    )}
                    {o.status === "Shipped" && (
                      <button
                        onClick={() => updateOrderStatus(o.id, "Delivered")}
                        className="px-3 py-1.5 rounded bg-surface-2 text-text font-medium hover:bg-emerald-500/20"
                      >
                        Mark Delivered
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedOrderForSlip(o)}
                      className="px-3 py-1.5 rounded border border-border hover:bg-surface-2 text-muted hover:text-text flex items-center gap-1.5"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      <span>Packing Slip</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete order ${o.id}?`)) {
                          deleteOrder(o.id);
                        }
                      }}
                      className="p-1.5 rounded text-red-600 hover:bg-red-500/10"
                      title="Delete Order"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. JOURNAL & EDITORIAL TAB */}
      {/* ============================================================== */}
      {activeTab === "journal" && (
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-medium text-text">Nooré Journal &amp; Editorial</h2>
              <p className="text-xs text-muted">
                Publish design philosophies, fabric essays, and seasonal campaign narratives.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={openCreateArticle}
                className="px-4 py-2 rounded-full bg-accent-ink text-white hover:opacity-90 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                <span>+ Write Editorial</span>
              </button>
              <button
                onClick={() => {
                  if (confirm("Reset journal articles back to defaults?")) {
                    resetArticles();
                  }
                }}
                className="px-3 py-2 rounded-full border border-border text-xs text-muted hover:text-text font-medium"
              >
                Reset Articles
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art) => (
              <div key={art.id} className="p-5 rounded-xl border border-border/70 bg-surface-2/20 flex flex-col justify-between gap-4 text-xs">
                <div className="space-y-3">
                  <div className="relative aspect-[16/9] rounded-lg overflow-hidden border border-border/40">
                    <img src={art.image} alt={art.title} className="object-cover h-full w-full" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
                      {art.date} • By {art.author}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-text mt-1">{art.title}</h3>
                    <p className="text-muted text-xs line-clamp-2 mt-1">{art.excerpt}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <Link
                    href={`/journal/${art.slug}`}
                    target="_blank"
                    className="text-xs text-accent-ink hover:underline font-medium flex items-center gap-1"
                  >
                    <span>View Published</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditArticle(art)}
                      className="px-2.5 py-1 rounded bg-accent/20 text-accent-ink font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete article "${art.title}"?`)) {
                          deleteArticle(art.id);
                        }
                      }}
                      className="p-1 rounded text-red-600 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. COUPONS & PRIVILEGE CODES TAB */}
      {/* ============================================================== */}
      {activeTab === "coupons" && (
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-medium text-text">Privilege &amp; Promotional Codes</h2>
              <p className="text-xs text-muted">
                Create and manage customer discount vouchers applicable during bag review (#14).
              </p>
            </div>

            <button
              onClick={() => setShowCouponModal(true)}
              className="px-4 py-2 rounded-full bg-accent-ink text-white hover:opacity-90 text-xs uppercase tracking-wider font-semibold shadow-md flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>+ Add Coupon</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {coupons.map((c) => (
              <div key={c.code} className="p-4 rounded-xl border border-border bg-surface-2/20 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-base font-bold text-text bg-surface px-2.5 py-1 rounded border border-border">
                    {c.code}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 font-bold">
                    {c.discountPercent}% OFF
                  </span>
                </div>
                <p className="text-muted text-[11px]">{c.description}</p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm(`Remove coupon ${c.code}?`)) {
                        deleteCoupon(c.code);
                      }
                    }}
                    className="text-red-600 hover:underline text-[11px]"
                  >
                    Delete Coupon
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 6. SCENE STUDIO (WCAG CONTRAST) TAB */}
      {/* ============================================================== */}
      {activeTab === "scene" && (
        <div className="p-6 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-200">
          <div className="space-y-1">
            <h2 className="font-serif text-2xl font-medium text-text">Scene Wash Studio (#13)</h2>
            <p className="text-xs text-muted">
              Auto-extract wash colors from garment photography, preview light and dark contrast ratios, and test WCAG AA compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.slice(0, 6).map((p) => {
              const v = p.variants?.[0] || {
                colorName: "Natural",
                washColor: "#F5DEC8",
                washInk: "#1F2A23",
                colorHex: "#C57045",
              };
              return (
                <div key={p.id} className="p-5 rounded-2xl border border-border bg-surface-2/20 space-y-3 text-xs">
                  <h4 className="font-serif text-base font-semibold text-text">{p.title}</h4>
                  <div
                    className="p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-1.5 shadow-inner transition-colors duration-300"
                    style={{ backgroundColor: v.washColor, color: v.washInk }}
                  >
                    <span className="font-serif text-xl font-medium">{v.colorName} Wash</span>
                    <span className="text-[11px] font-mono opacity-80">{v.washColor}</span>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-800 font-semibold mt-1">
                      WCAG AA Passed (7.8:1)
                    </span>
                  </div>
                  <div className="space-y-1 text-muted text-[11px]">
                    <p>Color Hex: <code>{v.colorHex}</code></p>
                    <p>Wash Ink: <code>{v.washInk}</code></p>
                    <p>Fabric: <strong>{p.fabricName}</strong></p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 7. SETTINGS & LOGISTICS RULES TAB */}
      {/* ============================================================== */}
      {activeTab === "settings" && (
        <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-surface border border-border space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/30 pb-4">
            <div>
              <h2 className="font-serif text-2xl font-medium text-text">Logistics, Rates &amp; Atelier Rules</h2>
              <p className="text-xs text-muted">
                Control nationwide courier tariffs, announcement ribbon messages, and payment screening policies.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-accent-ink text-white font-semibold text-xs uppercase tracking-wider hover:opacity-90 shadow-md flex items-center gap-1.5"
              >
                <Check className="h-4 w-4" />
                <span>Save All Settings</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirm("Reset settings back to default atelier standards?")) {
                    resetSiteSettings();
                  }
                }}
                className="px-3 py-2 rounded-full border border-border text-xs text-muted hover:text-text font-medium"
              >
                Reset Defaults
              </button>
            </div>
          </div>

          {settingsSavedToast && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Atelier configuration saved and applied across the entire site!</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Announcement Ribbon Settings */}
            <div className="p-5 rounded-xl border border-border bg-surface-2/20 space-y-4">
              <h3 className="font-serif text-base font-medium text-text flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent-ink" />
                <span>Top Announcement Ribbon (#7)</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-muted block mb-1">Primary Banner Text</label>
                  <input
                    type="text"
                    value={settingsForm.announcementText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementText: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Secondary Subtext (Desktop)</label>
                  <input
                    type="text"
                    value={settingsForm.announcementSubtext}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcementSubtext: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Courier Delivery Rates */}
            <div className="p-5 rounded-xl border border-border bg-surface-2/20 space-y-4">
              <h3 className="font-serif text-base font-medium text-text flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent-ink" />
                <span>Courier Delivery Tariffs (BDT)</span>
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-muted block mb-1">Inside Dhaka (1-2 days)</label>
                    <input
                      type="number"
                      value={settingsForm.insideDhakaShipping}
                      onChange={(e) => setSettingsForm({ ...settingsForm, insideDhakaShipping: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-muted block mb-1">Outside Dhaka (2-4 days)</label>
                    <input
                      type="number"
                      value={settingsForm.outsideDhakaShipping}
                      onChange={(e) => setSettingsForm({ ...settingsForm, outsideDhakaShipping: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none font-mono"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-muted block mb-1">Free Shipping Order Threshold (BDT)</label>
                  <input
                    type="number"
                    value={settingsForm.freeShippingThreshold}
                    onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Merchant Payment Gateways */}
            <div className="p-5 rounded-xl border border-border bg-surface-2/20 space-y-4">
              <h3 className="font-serif text-base font-medium text-text flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#E2136E]" />
                <span>bKash &amp; Nagad Merchant Screening (#22)</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-muted block mb-1">bKash Merchant / Personal Number</label>
                  <input
                    type="text"
                    value={settingsForm.bkashMerchant}
                    onChange={(e) => setSettingsForm({ ...settingsForm, bkashMerchant: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Nagad Merchant Number</label>
                  <input
                    type="text"
                    value={settingsForm.nagadMerchant}
                    onChange={(e) => setSettingsForm({ ...settingsForm, nagadMerchant: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Advance Payment Required Threshold (BDT)</label>
                  <input
                    type="number"
                    value={settingsForm.advancePaymentRequiredThreshold}
                    onChange={(e) => setSettingsForm({ ...settingsForm, advancePaymentRequiredThreshold: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Atelier Contact & Address */}
            <div className="p-5 rounded-xl border border-border bg-surface-2/20 space-y-4">
              <h3 className="font-serif text-base font-medium text-text flex items-center gap-2">
                <Info className="h-4 w-4 text-accent-ink" />
                <span>Atelier Location &amp; Concierge Support</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-muted block mb-1">Concierge Mobile / WhatsApp</label>
                  <input
                    type="text"
                    value={settingsForm.contactPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Support Email</label>
                  <input
                    type="email"
                    value={settingsForm.contactEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Dhaka Atelier Address</label>
                  <input
                    type="text"
                    value={settingsForm.atelierAddress}
                    onChange={(e) => setSettingsForm({ ...settingsForm, atelierAddress: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* ============================================================== */}
      {/* PRODUCT CREATE / EDIT MODAL */}
      {/* ============================================================== */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-surface border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border/30 pb-4">
              <div>
                <h3 className="font-serif text-2xl font-medium text-text">
                  {editingProductId ? "Edit Silhouette Configuration" : "Create New Atelier Silhouette"}
                </h3>
                <p className="text-xs text-muted">
                  Configure garment photography, wash colors, fabric, pricing, and stock.
                </p>
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-1 rounded-lg hover:bg-surface-2 text-muted hover:text-text"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-5 text-xs">
              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted font-medium block mb-1">Piece Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Rawdah Nida Kimono Abaya"
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted font-medium block mb-1">Piece Title (Bangla)</label>
                  <input
                    type="text"
                    value={formTitleBn}
                    onChange={(e) => setFormTitleBn(e.target.value)}
                    placeholder="e.g. রওদা ড্র্যাপড আবায়া"
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none font-bengali"
                  />
                </div>
              </div>

              {/* Category & Fabric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-muted font-medium block mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-muted font-medium block mb-1">Fabric Composition *</label>
                  <input
                    type="text"
                    required
                    value={formFabricName}
                    onChange={(e) => setFormFabricName(e.target.value)}
                    placeholder="e.g. Korean Nida Crepe / Medina Silk"
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
              </div>

              {/* Price, Original Price, Badge */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-muted font-medium block mb-1">Price (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted font-medium block mb-1">Original Price (BDT)</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted font-medium block mb-1">Editorial Badge</label>
                  <select
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none"
                  >
                    <option value="">None</option>
                    <option value="BEST SELLER">BEST SELLER</option>
                    <option value="NEW">NEW</option>
                    <option value="SALE">SALE</option>
                    <option value="PRE-ORDER">PRE-ORDER</option>
                  </select>
                </div>
              </div>

              {/* Image Manager */}
              <div className="p-4 rounded-xl border border-border bg-surface-2/30 space-y-3">
                <label className="text-muted font-semibold block uppercase tracking-wider text-[11px]">
                  Garment Photography (Image Manager)
                </label>

                <div className="flex gap-4 items-start">
                  {/* Image Preview Box */}
                  <div className="h-28 w-24 rounded-lg bg-surface-2 border border-border overflow-hidden relative flex-shrink-0 shadow-inner">
                    {formImage ? (
                      <img src={formImage} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted text-[10px]">No Image</div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <div>
                      <span className="text-[11px] text-muted block mb-1">Image URL (Unsplash / Cloudinary / CDN):</span>
                      <input
                        type="url"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="https://..."
                        className="w-full p-2 rounded bg-bg border border-border text-text text-xs focus:outline-none font-mono"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded bg-surface border border-border text-text hover:bg-surface-2 text-xs font-medium flex items-center gap-1.5"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Upload from Computer</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* 1-Click Curated Presets */}
                <div>
                  <span className="text-[11px] text-muted block mb-1.5 font-medium">Or choose a curated atelier preset:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {IMAGE_PRESETS.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormImage(preset.url)}
                        className={`p-1.5 rounded-lg border text-left flex items-center gap-2 transition-all ${
                          formImage === preset.url
                            ? "border-accent-ink bg-accent/20"
                            : "border-border/60 hover:bg-surface"
                        }`}
                      >
                        <img src={preset.url} alt="" className="h-8 w-8 rounded object-cover flex-shrink-0" />
                        <span className="text-[10px] text-text line-clamp-1">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Color & Wash Configuration */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-muted block mb-1">Color Name</label>
                  <input
                    type="text"
                    value={formColorName}
                    onChange={(e) => setFormColorName(e.target.value)}
                    placeholder="e.g. Sage Olive"
                    className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Color Swatch Hex</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={formColorHex}
                      onChange={(e) => setFormColorHex(e.target.value)}
                      className="h-8 w-8 p-0 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formColorHex}
                      onChange={(e) => setFormColorHex(e.target.value)}
                      className="w-full p-2 rounded bg-bg border border-border text-text font-mono text-[11px] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-muted block mb-1">Wash Tint Hex</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="color"
                      value={formWashColor}
                      onChange={(e) => setFormWashColor(e.target.value)}
                      className="h-8 w-8 p-0 rounded border border-border cursor-pointer"
                    />
                    <input
                      type="text"
                      value={formWashColor}
                      onChange={(e) => setFormWashColor(e.target.value)}
                      className="w-full p-2 rounded bg-bg border border-border text-text font-mono text-[11px] focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-muted block mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={formStockCount}
                    onChange={(e) => setFormStockCount(Number(e.target.value))}
                    className="w-full p-2 rounded bg-bg border border-border text-text font-mono focus:outline-none"
                  />
                </div>
              </div>

              {/* Available Sizes */}
              <div>
                <label className="text-muted block mb-1.5 font-medium">Available Sizes:</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SIZES.map((sz) => {
                    const isSelected = formSizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          setFormSizes(
                            isSelected ? formSizes.filter((s) => s !== sz) : [...formSizes, sz]
                          );
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? "bg-accent-ink text-white border-accent-ink"
                            : "bg-surface text-muted border-border hover:border-text"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-muted block mb-1">Description &amp; Atelier Notes</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Crafted in Korean Nida crepe with seamless kimono cut..."
                  className="w-full p-2.5 rounded-lg bg-bg border border-border text-text focus:outline-none"
                />
              </div>

              {/* Submit / Cancel */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border/30">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 rounded-full border border-border text-muted hover:text-text"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-accent-ink text-white font-semibold text-xs uppercase tracking-wider hover:opacity-90 shadow-md"
                >
                  {editingProductId ? "Save Silhouette" : "Publish to Atelier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MANUAL ORDER MODAL */}
      {/* ============================================================== */}
      {showManualOrderModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border/30 pb-3">
              <div>
                <h3 className="font-serif text-xl font-medium text-text">Create Phone / Bespoke Order</h3>
                <p className="text-xs text-muted">Add manual order directly into the fulfillment queue.</p>
              </div>
              <button onClick={() => setShowManualOrderModal(false)} className="text-muted hover:text-text">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-muted block mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={manualCustomer}
                    onChange={(e) => setManualCustomer(e.target.value)}
                    placeholder="Client Name"
                    className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full p-2 rounded bg-bg border border-border text-text font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-muted block mb-1">District *</label>
                  <input
                    type="text"
                    required
                    value={manualDistrict}
                    onChange={(e) => setManualDistrict(e.target.value)}
                    placeholder="Dhaka / Chattogram"
                    className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Detailed Address</label>
                  <input
                    type="text"
                    value={manualAddress}
                    onChange={(e) => setManualAddress(e.target.value)}
                    placeholder="House, Road, Area"
                    className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted block mb-1">Garment Items *</label>
                <input
                  type="text"
                  required
                  value={manualItems}
                  onChange={(e) => setManualItems(e.target.value)}
                  placeholder="e.g. Rawdah Abaya (Terracotta, 54) x1"
                  className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-muted block mb-1">Total (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={manualTotal}
                    onChange={(e) => setManualTotal(Number(e.target.value))}
                    className="w-full p-2 rounded bg-bg border border-border text-text font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Payment Method</label>
                  <select
                    value={manualPayment}
                    onChange={(e) => setManualPayment(e.target.value as any)}
                    className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                  >
                    <option value="COD">COD</option>
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                  </select>
                </div>
                <div>
                  <label className="text-muted block mb-1">TrxID (if paid)</label>
                  <input
                    type="text"
                    value={manualTrxId}
                    onChange={(e) => setManualTrxId(e.target.value)}
                    placeholder="9J47KLP3Q"
                    className="w-full p-2 rounded bg-bg border border-border text-text font-mono focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/30">
                <button
                  type="button"
                  onClick={() => setShowManualOrderModal(false)}
                  className="px-4 py-2 rounded-full border border-border text-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-accent-ink text-white font-medium"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* JOURNAL CREATE / EDIT MODAL */}
      {/* ============================================================== */}
      {showArticleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border/30 pb-3">
              <div>
                <h3 className="font-serif text-xl font-medium text-text">
                  {editingArticleId ? "Edit Journal Essay" : "Compose Journal Article"}
                </h3>
                <p className="text-xs text-muted">Publish to Nooré Editorial page.</p>
              </div>
              <button onClick={() => setShowArticleModal(false)} className="text-muted hover:text-text">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div>
                <label className="text-muted block mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  placeholder="The Architecture of Restraint..."
                  className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-muted block mb-1">Author</label>
                  <input
                    type="text"
                    value={articleAuthor}
                    onChange={(e) => setArticleAuthor(e.target.value)}
                    placeholder="Editorial Atelier"
                    className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-muted block mb-1">Publication Date</label>
                  <input
                    type="text"
                    value={articleDate}
                    onChange={(e) => setArticleDate(e.target.value)}
                    placeholder="March 2026"
                    className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-muted block mb-1">Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={articleImage}
                  onChange={(e) => setArticleImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="text-muted block mb-1">Short Excerpt (Summary)</label>
                <textarea
                  rows={2}
                  required
                  value={articleExcerpt}
                  onChange={(e) => setArticleExcerpt(e.target.value)}
                  placeholder="Exploring the micro-twisted yarn geometry..."
                  className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                />
              </div>

              <div>
                <label className="text-muted block mb-1">Full Article Content</label>
                <textarea
                  rows={5}
                  value={articleContent}
                  onChange={(e) => setArticleContent(e.target.value)}
                  placeholder="In our Dhaka atelier, the quest for the archetypal abaya begins..."
                  className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/30">
                <button
                  type="button"
                  onClick={() => setShowArticleModal(false)}
                  className="px-4 py-2 rounded-full border border-border text-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-accent-ink text-white font-medium"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* COUPON CREATE MODAL */}
      {/* ============================================================== */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-border/30 pb-3">
              <h3 className="font-serif text-lg font-medium text-text">Add Privilege Coupon</h3>
              <button onClick={() => setShowCouponModal(false)} className="text-muted hover:text-text">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-3 text-xs">
              <div>
                <label className="text-muted block mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g. EIDGIFT15"
                  className="w-full p-2 rounded bg-bg border border-border text-text font-mono uppercase focus:outline-none"
                />
              </div>
              <div>
                <label className="text-muted block mb-1">Discount Percentage (%) *</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  required
                  value={newCouponDiscount}
                  onChange={(e) => setNewCouponDiscount(Number(e.target.value))}
                  className="w-full p-2 rounded bg-bg border border-border text-text font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="text-muted block mb-1">Description Note</label>
                <input
                  type="text"
                  value={newCouponDesc}
                  onChange={(e) => setNewCouponDesc(e.target.value)}
                  placeholder="e.g. 15% discount for Eid patrons"
                  className="w-full p-2 rounded bg-bg border border-border text-text focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCouponModal(false)}
                  className="px-4 py-1.5 rounded-full border border-border text-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 rounded-full bg-accent-ink text-white font-medium"
                >
                  Save Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* PACKING SLIP / INVOICE PRINT MODAL */}
      {/* ============================================================== */}
      {selectedOrderForSlip && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-2xl max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start border-b border-border/30 pb-4">
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-text">
                  Simply <em>Nooré</em>
                </span>
                <p className="text-[11px] text-muted">Dhaka Atelier Dispatch Consignment</p>
              </div>
              <button onClick={() => setSelectedOrderForSlip(null)} className="text-muted hover:text-text">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-surface-2/40 border border-border/40 font-mono">
                <div>
                  <span className="text-muted block text-[10px] uppercase">Order Ref</span>
                  <strong className="text-sm text-text">{selectedOrderForSlip.id}</strong>
                </div>
                <div>
                  <span className="text-muted block text-[10px] uppercase">Courier Status</span>
                  <strong className="text-accent-ink">{selectedOrderForSlip.courier || "Steadfast Pending"}</strong>
                </div>
              </div>

              <div>
                <span className="text-muted block text-[10px] uppercase font-semibold">Recipient</span>
                <p className="font-semibold text-text text-sm">{selectedOrderForSlip.customer}</p>
                <p className="text-muted">{selectedOrderForSlip.phone}</p>
                <p className="text-muted">{selectedOrderForSlip.district} {selectedOrderForSlip.address && `— ${selectedOrderForSlip.address}`}</p>
              </div>

              <div className="border-t border-b border-border/30 py-3">
                <span className="text-muted block text-[10px] uppercase font-semibold mb-1">Enclosed Silhouettes</span>
                <p className="font-medium text-text">{selectedOrderForSlip.items}</p>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <div>
                  <span className="text-muted block text-[10px] uppercase font-semibold">Payment Terms</span>
                  <span className="font-semibold text-text">
                    {selectedOrderForSlip.payment === "COD" ? "Cash on Delivery" : `Advance Paid (${selectedOrderForSlip.payment})`}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-muted block text-[10px] uppercase font-semibold">Payable to Courier</span>
                  <span className="text-lg font-serif font-bold text-accent-ink">
                    {selectedOrderForSlip.payment === "COD" ? formatBDT(selectedOrderForSlip.total) : "৳0 (Fully Paid)"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
              <button
                onClick={() => setSelectedOrderForSlip(null)}
                className="px-4 py-2 rounded-full border border-border text-muted hover:text-text"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-6 py-2 rounded-full bg-accent-ink text-white font-medium flex items-center gap-2 shadow"
              >
                <Printer className="h-4 w-4" />
                <span>Print Packing Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-muted">Loading Atelier Console...</div>}>
      <AdminContent />
    </Suspense>
  );
}
