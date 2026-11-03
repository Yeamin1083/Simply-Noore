export interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  washColor: string;
  washInk: string;
  washGhost?: string;
  sku: string;
  inStock: boolean;
  stockCount: number;
  sizes: string[];
  image: string;
  secondaryImage?: string;
}

export interface Hotspot {
  id: string;
  index: string;
  title: string;
  detail: string;
  x: number; // percentage
  y: number; // percentage
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  titleBn: string;
  category: "abayas" | "three-piece-sets" | "corsets" | "inner-slips" | "outerwear" | string;
  categoryLabel: string;
  categoryLabelBn?: string;
  price: number;
  originalPrice?: number;
  badge?: "NEW" | "SALE" | "BEST SELLER" | "PRE-ORDER" | string;
  description: string;
  descriptionBn?: string;
  fabricId: string;
  fabricName: string;
  isMadeToOrder?: boolean;
  leadTimeDays?: number;
  hotspots?: Hotspot[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  fitsTrueToSizePercent?: number;
  tags: string[];
  occasions: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Moment {
  id: string;
  slug: string;
  name: string;
  nameBn: string;
  description: string;
  image: string;
  washColor: string;
}

export interface Drop {
  id: string;
  title: string;
  titleBn: string;
  status: "live" | "scheduled" | "ended";
  launchDate: string;
  heroImage: string;
  description: string;
  productIds: string[];
}

export interface Fabric {
  id: string;
  slug: string;
  name: string;
  season: string;
  texture: string;
  origin: string;
  care: string;
  image: string;
  description: string;
}

export interface Review {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  date: string;
  comment: string;
  productTitle: string;
  sizePurchased: string;
  fitVote: "true_to_size" | "runs_small" | "runs_large";
}

export interface CartItem {
  productId: string;
  variantId: string;
  slug: string;
  title: string;
  colorName: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
  customLength?: number;
}

export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Ready to Dispatch"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  id: string;
  customer: string;
  phone: string;
  district: string;
  address?: string;
  items: string;
  total: number;
  payment: "COD" | "bKash" | "Nagad";
  trxId?: string;
  senderPhone?: string;
  status: OrderStatus;
  date: string;
  courier?: string;
}

export interface SiteSettings {
  announcementText: string;
  announcementSubtext: string;
  insideDhakaShipping: number;
  outsideDhakaShipping: number;
  freeShippingThreshold: number;
  bkashMerchant: string;
  nagadMerchant: string;
  contactPhone: string;
  contactEmail: string;
  atelierAddress: string;
  advancePaymentRequiredThreshold: number;
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  titleBn?: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content?: string;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
  active: boolean;
}
