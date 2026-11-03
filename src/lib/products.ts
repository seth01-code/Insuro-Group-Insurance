import {
  Bandage,
  Briefcase,
  Car,
  HeartPulse,
  Home,
  Plane,
  ShieldAlert,
  ShieldCheck,
  Ship,
  Smartphone,
  Sprout,
  type LucideIcon,
} from "lucide-react";
import type { PlanType } from "./plans";

/** Every product has the same key as its plan type. */
export type ProductKey = PlanType;

export interface Product {
  key: ProductKey;
  /** Short label for tabs */
  label: string;
  title: string;
  sub: string;
  /** Label above the budget filter */
  priceLabel: string;
  /** false = no plans yet, page shows the Coming Soon state */
  live: boolean;
  Icon: LucideIcon;
}

const MONTHLY = "Monthly premium budget";
const PER_STAFF = "Budget per staff/month";

export const products: Product[] = [
  {
    key: "health",
    label: "Health",
    title: "Health Insurance",
    sub: "Compare plans from our HMO partners",
    priceLabel: PER_STAFF,
    live: true,
    Icon: HeartPulse,
  },
  {
    key: "life",
    label: "Life",
    title: "Life Assurance",
    sub: "Protect your team with group life and assurance plans",
    priceLabel: PER_STAFF,
    live: true,
    Icon: ShieldCheck,
  },
  {
    key: "motor",
    label: "Motor",
    title: "Motor Insurance",
    sub: "Third-party, comprehensive, commercial vehicle, and fleet insurance",
    priceLabel: MONTHLY,
    live: true,
    Icon: Car,
  },
  {
    key: "electronics",
    label: "Devices",
    title: "Electronic Device Insurance",
    sub: "Phones, laptops, TVs, digital watches, POS machines, cameras, and projectors",
    priceLabel: MONTHLY,
    live: true,
    Icon: Smartphone,
  },
  {
    key: "travel",
    label: "Travel",
    title: "Travel Insurance",
    sub: "International, Schengen, business, and family travel cover",
    priceLabel: MONTHLY,
    live: true,
    Icon: Plane,
  },
  {
    key: "property",
    label: "Property",
    title: "Home & Property Insurance",
    sub: "Homeowners’, household contents, fire and special perils, and commercial property cover",
    priceLabel: MONTHLY,
    live: true,
    Icon: Home,
  },
  {
    key: "business",
    label: "Business",
    title: "Business & SME Insurance",
    sub: "Business packages, public liability, employers’ liability, professional indemnity, and equipment cover",
    priceLabel: MONTHLY,
    live: true,
    Icon: Briefcase,
  },
  {
    key: "marine",
    label: "Marine",
    title: "Marine & Goods-in-Transit",
    sub: "Marine cargo, inland transit, and import/export cargo cover",
    priceLabel: MONTHLY,
    live: true,
    Icon: Ship,
  },
  {
    key: "accident",
    label: "Accident",
    title: "Personal Accident Insurance",
    sub: "Individual, family, and group accident cover",
    priceLabel: MONTHLY,
    live: true,
    Icon: Bandage,
  },
  {
    key: "agriculture",
    label: "Agric",
    title: "Agricultural Insurance",
    sub: "Crop, livestock, and agricultural equipment cover",
    priceLabel: MONTHLY,
    live: true,
    Icon: Sprout,
  },
  {
    key: "specialised",
    label: "Specialised",
    title: "Specialised Commercial",
    sub: "Cyber, directors’ and officers’ liability, contractors’ all risks, and other specialist covers",
    priceLabel: MONTHLY,
    live: true,
    Icon: ShieldAlert,
  },
];

export function getProduct(key: string | undefined): Product | undefined {
  return products.find((p) => p.key === key);
}

/** Type guard for query-string values. */
export function isProductKey(v: unknown): v is ProductKey {
  return products.some((p) => p.key === v);
}
