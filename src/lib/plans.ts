export type PlanType = "health" | "life";

export interface Plan {
  id: string;
  provider: string;
  name: string;
  price: number; // per staff / month, in naira
  type: PlanType;
  tag?: string;
  features: string[];
}

export const plans: Plan[] = [
  // ── Health: Hygeia HMO ──
  {
    id: "hygeia-basic",
    provider: "Hygeia HMO",
    name: "Hygeia Basic",
    price: 15000,
    type: "health",
    features: [
      "Outpatient consultations",
      "Basic lab tests",
      "Prescription drugs",
      "500+ hospital network",
    ],
  },
  {
    id: "hygeia-plus",
    provider: "Hygeia HMO",
    name: "Hygeia Plus",
    price: 35000,
    type: "health",
    tag: "Most Popular",
    features: [
      "All Basic benefits",
      "Specialist consultations",
      "Optical & dental cover",
      "Emergency care",
      "800+ hospital network",
    ],
  },
  {
    id: "hygeia-premium",
    provider: "Hygeia HMO",
    name: "Hygeia Premium",
    price: 75000,
    type: "health",
    features: [
      "All Plus benefits",
      "Chronic disease management",
      "Private ward admission",
      "Telemedicine 24/7",
      "1,200+ hospital network",
    ],
  },
  // ── Health: Reliance Health ──
  {
    id: "reliance-basic",
    provider: "Reliance Health",
    name: "Reliance Basic",
    price: 12000,
    type: "health",
    features: [
      "Mobile app management",
      "Outpatient coverage",
      "Telemedicine access",
      "400+ hospitals",
    ],
  },
  {
    id: "reliance-standard",
    provider: "Reliance Health",
    name: "Reliance Standard",
    price: 42000,
    type: "health",
    tag: "Best Rated",
    features: [
      "All Basic benefits",
      "Wellness programs",
      "Mental health support",
      "Specialist referrals",
      "700+ hospitals",
    ],
  },
  {
    id: "reliance-enterprise",
    provider: "Reliance Health",
    name: "Reliance Enterprise",
    price: 120000,
    type: "health",
    features: [
      "Unlimited consultations",
      "International emergency cover",
      "Dedicated care manager",
      "1,000+ hospitals",
    ],
  },
  // ── Health: AXA Mansard Health ──
  {
    id: "axa-bronze",
    provider: "AXA Mansard Health",
    name: "AXA Bronze",
    price: 20000,
    type: "health",
    features: [
      "GP consultations",
      "Lab & diagnostics",
      "Inpatient cover",
      "600+ hospitals",
    ],
  },
  {
    id: "axa-silver",
    provider: "AXA Mansard Health",
    name: "AXA Silver",
    price: 55000,
    type: "health",
    features: [
      "All Bronze benefits",
      "Optical & dental",
      "Maternity cover",
      "900+ hospitals",
    ],
  },
  {
    id: "axa-gold",
    provider: "AXA Mansard Health",
    name: "AXA Gold",
    price: 150000,
    type: "health",
    features: [
      "All Silver benefits",
      "International coverage",
      "VIP hospital access",
      "1,000+ hospitals",
    ],
  },
  // ── Life: Leadway Assurance ──
  {
    id: "leadway-basic",
    provider: "Leadway Assurance",
    name: "Leadway Group Life Basic",
    price: 5000,
    type: "life",
    features: [
      "3x annual salary cover",
      "Accidental death benefit",
      "Minimum 10 employees",
    ],
  },
  {
    id: "leadway-plus",
    provider: "Leadway Assurance",
    name: "Leadway Group Life Plus",
    price: 12000,
    type: "life",
    tag: "Most Popular",
    features: [
      "5x annual salary cover",
      "Critical illness benefit",
      "Permanent disability cover",
      "Funeral expense benefit",
    ],
  },
  {
    id: "leadway-executive",
    provider: "Leadway Assurance",
    name: "Leadway Executive Life",
    price: 25000,
    type: "life",
    features: [
      "10x annual salary cover",
      "Keyman insurance option",
      "Spouse rider available",
      "Retirement savings benefit",
    ],
  },
  // ── Life: AXA Mansard Life ──
  {
    id: "axa-term-standard",
    provider: "AXA Mansard Life",
    name: "AXA Term Life Standard",
    price: 8000,
    type: "life",
    features: [
      "4x annual salary",
      "Death benefit only",
      "5-year renewable term",
    ],
  },
  {
    id: "axa-term-enhanced",
    provider: "AXA Mansard Life",
    name: "AXA Term Life Enhanced",
    price: 18000,
    type: "life",
    features: [
      "6x annual salary",
      "Critical illness rider",
      "Disability income benefit",
      "Waiver of premium",
    ],
  },
  {
    id: "axa-whole-life",
    provider: "AXA Mansard Life",
    name: "AXA Whole Life Corporate",
    price: 40000,
    type: "life",
    features: [
      "8x annual salary",
      "Cash value accumulation",
      "Whole-of-life cover",
      "Premium holiday option",
    ],
  },
];

export const budgetRanges = [
  { value: "all", label: "Any budget" },
  { value: "0-30000", label: "Under ₦30,000" },
  { value: "30000-50000", label: "₦30k – ₦50k" },
  { value: "50000-100000", label: "₦50k – ₦100k" },
  { value: "100000+", label: "₦100k+" },
] as const;

export type BudgetKey = (typeof budgetRanges)[number]["value"];

export function matchesBudget(price: number, key: BudgetKey): boolean {
  switch (key) {
    case "0-30000":
      return price < 30000;
    case "30000-50000":
      return price >= 30000 && price <= 50000;
    case "50000-100000":
      return price > 50000 && price <= 100000;
    case "100000+":
      return price > 100000;
    default:
      return true;
  }
}

export function formatNaira(n: number): string {
  return "₦" + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getPlanById(id: string): Plan | undefined {
  return plans.find((p) => p.id === id);
}
