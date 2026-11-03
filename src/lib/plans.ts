export type PlanType =
  | "health"
  | "life"
  | "motor"
  | "electronics"
  | "travel"
  | "property"
  | "business"
  | "marine"
  | "accident"
  | "agriculture"
  | "specialised";

export interface Plan {
  id: string;
  provider: string;
  name: string;
  /** Monthly premium in naira. Per staff for health/life/group plans,
   *  otherwise per policy (annual premiums shown as a monthly equivalent). */
  price: number;
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

  // ════════════════════════════════════════════════════════════
  // PLACEHOLDER DATA below: plan names, prices, features and
  // providers are illustrative. Replace with real partner quotes.
  // ════════════════════════════════════════════════════════════

  // ── Motor: AIICO Insurance ──
  {
    id: "aiico-motor-tp",
    provider: "AIICO Insurance",
    name: "AIICO Third-Party",
    price: 3000,
    type: "motor",
    features: [
      "Third-party bodily injury",
      "Third-party property damage",
      "Statutory minimum cover",
      "Fast online certificate",
    ],
  },
  {
    id: "aiico-motor-comp",
    provider: "AIICO Insurance",
    name: "AIICO Comprehensive",
    price: 14000,
    type: "motor",
    tag: "Most Popular",
    features: [
      "All Third-Party benefits",
      "Accident, fire & theft cover",
      "Own-damage repairs",
      "Flood & natural-peril cover",
    ],
  },
  {
    id: "aiico-motor-fleet",
    provider: "AIICO Insurance",
    name: "AIICO Fleet Cover",
    price: 65000,
    type: "motor",
    features: [
      "5+ commercial vehicles",
      "Single renewal date",
      "Driver personal accident",
      "Dedicated claims handler",
    ],
  },
  // ── Motor: Allianz Nigeria ──
  {
    id: "allianz-motor-tp",
    provider: "Allianz Nigeria",
    name: "Allianz Third-Party Plus",
    price: 4500,
    type: "motor",
    features: [
      "Third-party injury & property",
      "Windscreen cover",
      "Towing assistance",
      "Roadside support",
    ],
  },
  {
    id: "allianz-motor-comp",
    provider: "Allianz Nigeria",
    name: "Allianz Comprehensive",
    price: 18000,
    type: "motor",
    tag: "Best Rated",
    features: [
      "Full own-damage cover",
      "Theft & fire",
      "Courtesy car during repairs",
      "Excess protection option",
    ],
  },
  {
    id: "allianz-motor-commercial",
    provider: "Allianz Nigeria",
    name: "Allianz Commercial Vehicle",
    price: 38000,
    type: "motor",
    features: [
      "Trucks, buses & vans",
      "Goods-carrying liability",
      "Passenger liability",
      "Fleet discounts available",
    ],
  },

  // ── Electronics: Custodian Insurance ──
  {
    id: "custodian-device-mobile",
    provider: "Custodian Insurance",
    name: "Custodian Mobile Shield",
    price: 1500,
    type: "electronics",
    features: [
      "Phones & tablets",
      "Accidental screen damage",
      "Theft cover with police report",
      "Smartwatch add-on",
    ],
  },
  {
    id: "custodian-device-work",
    provider: "Custodian Insurance",
    name: "Custodian Work Devices",
    price: 8000,
    type: "electronics",
    tag: "Most Popular",
    features: [
      "Laptops, cameras & projectors",
      "Accidental & liquid damage",
      "Theft & burglary",
      "Up to 20 devices",
    ],
  },
  {
    id: "custodian-device-business",
    provider: "Custodian Insurance",
    name: "Custodian Business Equipment",
    price: 25000,
    type: "electronics",
    features: [
      "POS machines & TVs",
      "Power surge damage",
      "Breakdown cover",
      "Unlimited devices on register",
    ],
  },
  // ── Electronics: Cornerstone Insurance ──
  {
    id: "cornerstone-device-basic",
    provider: "Cornerstone Insurance",
    name: "Cornerstone Device Basic",
    price: 2000,
    type: "electronics",
    features: [
      "Single device cover",
      "Accidental damage",
      "Theft cover",
      "12-month term",
    ],
  },
  {
    id: "cornerstone-device-plus",
    provider: "Cornerstone Insurance",
    name: "Cornerstone Device Plus",
    price: 6500,
    type: "electronics",
    features: [
      "Up to 5 devices",
      "Liquid damage",
      "Screen repair",
      "Replacement within 5 working days",
    ],
  },
  {
    id: "cornerstone-device-pos",
    provider: "Cornerstone Insurance",
    name: "Cornerstone POS & Retail",
    price: 18000,
    type: "electronics",
    features: [
      "POS machines & terminals",
      "TVs & display screens",
      "Theft & vandalism",
      "Onsite replacement",
    ],
  },

  // ── Travel: Leadway Assurance ──
  {
    id: "leadway-travel-basic",
    provider: "Leadway Assurance",
    name: "Leadway Travel Essential",
    price: 4000,
    type: "travel",
    features: [
      "Emergency medical expenses",
      "Lost baggage",
      "Trip delay",
      "Schengen-compliant cover",
    ],
  },
  {
    id: "leadway-travel-plus",
    provider: "Leadway Assurance",
    name: "Leadway Travel Plus",
    price: 9000,
    type: "travel",
    tag: "Most Popular",
    features: [
      "All Essential benefits",
      "Trip cancellation",
      "Emergency evacuation",
      "24/7 assistance line",
    ],
  },
  {
    id: "leadway-travel-business",
    provider: "Leadway Assurance",
    name: "Leadway Business Traveller",
    price: 22000,
    type: "travel",
    features: [
      "Multi-trip annual cover",
      "Laptop & equipment cover",
      "Missed connection",
      "Emergency evacuation",
    ],
  },
  // ── Travel: Sunu Assurances ──
  {
    id: "sunu-travel-single",
    provider: "Sunu Assurances",
    name: "Sunu Single Trip",
    price: 3500,
    type: "travel",
    features: [
      "International single trip",
      "Medical emergencies",
      "Passport loss assistance",
      "Baggage delay",
    ],
  },
  {
    id: "sunu-travel-family",
    provider: "Sunu Assurances",
    name: "Sunu Family Voyager",
    price: 14000,
    type: "travel",
    features: [
      "2 adults & up to 3 children",
      "Child-care cover",
      "Trip cancellation",
      "Emergency evacuation",
    ],
  },
  {
    id: "sunu-travel-annual",
    provider: "Sunu Assurances",
    name: "Sunu Annual Multi-Trip",
    price: 28000,
    type: "travel",
    features: [
      "Unlimited trips per year",
      "Extended trip duration",
      "Schengen-compliant",
      "Personal liability",
    ],
  },

  // ── Property: AXA Mansard General ──
  {
    id: "axa-home-contents",
    provider: "AXA Mansard General",
    name: "AXA Home Contents",
    price: 4000,
    type: "property",
    features: [
      "Furniture & appliances",
      "Fire & lightning",
      "Theft & burglary",
      "Accidental damage option",
    ],
  },
  {
    id: "axa-home-owner",
    provider: "AXA Mansard General",
    name: "AXA Homeowner",
    price: 16000,
    type: "property",
    tag: "Most Popular",
    features: [
      "Building structure cover",
      "Fire & special perils",
      "Flood & storm",
      "Alternative accommodation",
    ],
  },
  {
    id: "axa-commercial-prop",
    provider: "AXA Mansard General",
    name: "AXA Commercial Property",
    price: 55000,
    type: "property",
    features: [
      "Offices, shops & warehouses",
      "Fire & special perils",
      "Stock & fittings",
      "Business interruption add-on",
    ],
  },
  // ── Property: Custodian Insurance ──
  {
    id: "custodian-home-basic",
    provider: "Custodian Insurance",
    name: "Custodian Home Basic",
    price: 3000,
    type: "property",
    features: [
      "Fire & explosion",
      "Burglary",
      "Household contents cover",
      "Annual renewal",
    ],
  },
  {
    id: "custodian-home-comp",
    provider: "Custodian Insurance",
    name: "Custodian Home Comprehensive",
    price: 12000,
    type: "property",
    features: [
      "Building & contents",
      "Fire & special perils",
      "Public liability",
      "Emergency repairs",
    ],
  },
  {
    id: "custodian-prop-comm",
    provider: "Custodian Insurance",
    name: "Custodian Commercial Property",
    price: 48000,
    type: "property",
    features: [
      "Fire & special perils",
      "Burglary & theft",
      "Plate glass cover",
      "Business interruption option",
    ],
  },

  // ── Business: Allianz Nigeria ──
  {
    id: "allianz-sme-starter",
    provider: "Allianz Nigeria",
    name: "Allianz SME Starter",
    price: 15000,
    type: "business",
    features: [
      "Shop & office package",
      "Fire & burglary",
      "Public liability",
      "Money in transit",
    ],
  },
  {
    id: "allianz-sme-pro",
    provider: "Allianz Nigeria",
    name: "Allianz SME Professional",
    price: 40000,
    type: "business",
    tag: "Most Popular",
    features: [
      "All Starter benefits",
      "Professional indemnity",
      "Employers' liability",
      "Equipment breakdown",
    ],
  },
  {
    id: "allianz-sme-enterprise",
    provider: "Allianz Nigeria",
    name: "Allianz Business Enterprise",
    price: 110000,
    type: "business",
    features: [
      "Multi-location cover",
      "Higher liability limits",
      "Equipment & stock",
      "Dedicated risk adviser",
    ],
  },
  // ── Business: NEM Insurance ──
  {
    id: "nem-sme-liability",
    provider: "NEM Insurance",
    name: "NEM Liability Cover",
    price: 12000,
    type: "business",
    features: [
      "Public liability",
      "Employers' liability",
      "Product liability option",
      "Legal defence costs",
    ],
  },
  {
    id: "nem-sme-package",
    provider: "NEM Insurance",
    name: "NEM Business Package",
    price: 35000,
    type: "business",
    tag: "Best Rated",
    features: [
      "Fire & special perils",
      "Burglary & money",
      "Equipment cover",
      "Public liability",
    ],
  },
  {
    id: "nem-sme-pi",
    provider: "NEM Insurance",
    name: "NEM Professional Indemnity",
    price: 60000,
    type: "business",
    features: [
      "For consultants & firms",
      "Negligence claims",
      "Legal costs covered",
      "Retroactive cover option",
    ],
  },

  // ── Marine: NEM Insurance ──
  {
    id: "nem-marine-inland",
    provider: "NEM Insurance",
    name: "NEM Inland Transit",
    price: 8000,
    type: "marine",
    features: [
      "Road & rail goods in transit",
      "Theft & accidental loss",
      "Single or multi-trip",
      "Fast certificate issue",
    ],
  },
  {
    id: "nem-marine-cargo",
    provider: "NEM Insurance",
    name: "NEM Marine Cargo",
    price: 25000,
    type: "marine",
    tag: "Most Popular",
    features: [
      "Sea & air cargo",
      "Standard cargo clauses",
      "Port-to-port cover",
      "War & strikes option",
    ],
  },
  {
    id: "nem-marine-annual",
    provider: "NEM Insurance",
    name: "NEM Annual Open Cover",
    price: 70000,
    type: "marine",
    features: [
      "Unlimited shipments in a year",
      "Import & export",
      "Monthly declarations",
      "Dedicated marine desk",
    ],
  },
  // ── Marine: Cornerstone Insurance ──
  {
    id: "cornerstone-marine-goods",
    provider: "Cornerstone Insurance",
    name: "Cornerstone Goods-in-Transit",
    price: 7000,
    type: "marine",
    features: [
      "Local goods movement",
      "Theft & hijack",
      "Accidental damage",
      "Per-trip or annual",
    ],
  },
  {
    id: "cornerstone-marine-import",
    provider: "Cornerstone Insurance",
    name: "Cornerstone Import Cover",
    price: 22000,
    type: "marine",
    features: [
      "Imported cargo to warehouse",
      "Marine perils",
      "Loading & unloading",
      "Certificate on demand",
    ],
  },
  {
    id: "cornerstone-marine-export",
    provider: "Cornerstone Insurance",
    name: "Cornerstone Export Cover",
    price: 30000,
    type: "marine",
    features: [
      "Export cargo to destination",
      "Multi-modal transport",
      "Sellers' interest",
      "Certificate on demand",
    ],
  },

  // ── Accident: AIICO Insurance ──
  {
    id: "aiico-pa-individual",
    provider: "AIICO Insurance",
    name: "AIICO PA Individual",
    price: 2000,
    type: "accident",
    features: [
      "Accidental death",
      "Permanent disability",
      "Medical expenses",
      "24-hour worldwide cover",
    ],
  },
  {
    id: "aiico-pa-family",
    provider: "AIICO Insurance",
    name: "AIICO PA Family",
    price: 6000,
    type: "accident",
    tag: "Most Popular",
    features: [
      "2 adults & up to 4 children",
      "Accidental death & disability",
      "Hospital cash benefit",
      "Funeral expenses",
    ],
  },
  {
    id: "aiico-pa-group",
    provider: "AIICO Insurance",
    name: "AIICO Group Accident",
    price: 3500,
    type: "accident",
    features: [
      "Per-staff pricing",
      "Minimum 10 employees",
      "Death & disability",
      "Temporary total disablement",
    ],
  },
  // ── Accident: Sunu Assurances ──
  {
    id: "sunu-pa-basic",
    provider: "Sunu Assurances",
    name: "Sunu PA Basic",
    price: 1800,
    type: "accident",
    features: [
      "Accidental death",
      "Permanent disability",
      "Quick claims",
      "Annual renewal",
    ],
  },
  {
    id: "sunu-pa-plus",
    provider: "Sunu Assurances",
    name: "Sunu PA Plus",
    price: 5500,
    type: "accident",
    features: [
      "All Basic benefits",
      "Medical expense reimbursement",
      "Temporary disablement",
      "Ambulance cover",
    ],
  },
  {
    id: "sunu-pa-group",
    provider: "Sunu Assurances",
    name: "Sunu Group Accident",
    price: 4000,
    type: "accident",
    features: [
      "Per-staff pricing",
      "Minimum 10 employees",
      "Death & disability",
      "Weekly income benefit",
    ],
  },

  // ── Agriculture: NAIC ──
  {
    id: "naic-crop-basic",
    provider: "NAIC",
    name: "NAIC Crop Basic",
    price: 5000,
    type: "agriculture",
    features: [
      "Drought & flood",
      "Pest & disease",
      "Named crops",
      "Per-hectare cover",
    ],
  },
  {
    id: "naic-livestock",
    provider: "NAIC",
    name: "NAIC Livestock Cover",
    price: 9000,
    type: "agriculture",
    tag: "Most Popular",
    features: [
      "Cattle, poultry & fish",
      "Death by disease or accident",
      "Vet-certified claims",
      "Herd registers",
    ],
  },
  {
    id: "naic-equipment",
    provider: "NAIC",
    name: "NAIC Farm Equipment",
    price: 15000,
    type: "agriculture",
    features: [
      "Tractors & implements",
      "Fire & theft",
      "Accidental damage",
      "Seasonal premium option",
    ],
  },
  // ── Agriculture: Leadway Assurance ──
  {
    id: "leadway-agri-crop",
    provider: "Leadway Assurance",
    name: "Leadway Crop Shield",
    price: 6500,
    type: "agriculture",
    features: [
      "Weather-indexed cover",
      "Fast payouts",
      "Smallholder friendly",
      "Multiple crop types",
    ],
  },
  {
    id: "leadway-agri-livestock",
    provider: "Leadway Assurance",
    name: "Leadway Livestock Plus",
    price: 12000,
    type: "agriculture",
    features: [
      "Livestock mortality",
      "Theft cover",
      "Transit cover",
      "Farm veterinary assistance",
    ],
  },
  {
    id: "leadway-agri-commercial",
    provider: "Leadway Assurance",
    name: "Leadway Agribusiness Pack",
    price: 45000,
    type: "agriculture",
    features: [
      "Crops, livestock & equipment",
      "Farm buildings",
      "Public liability",
      "Dedicated agri adviser",
    ],
  },

  // ── Specialised: Allianz Nigeria ──
  {
    id: "allianz-cyber",
    provider: "Allianz Nigeria",
    name: "Allianz Cyber Protect",
    price: 30000,
    type: "specialised",
    tag: "Most Popular",
    features: [
      "Data breach response",
      "Ransomware & extortion",
      "Business interruption",
      "Legal & forensic costs",
    ],
  },
  {
    id: "allianz-do",
    provider: "Allianz Nigeria",
    name: "Allianz D&O Liability",
    price: 70000,
    type: "specialised",
    features: [
      "Directors' & officers' liability",
      "Defence costs",
      "Regulatory investigations",
      "Entity cover option",
    ],
  },
  {
    id: "allianz-car",
    provider: "Allianz Nigeria",
    name: "Allianz Contractors' All Risks",
    price: 120000,
    type: "specialised",
    features: [
      "Construction works cover",
      "Plant & equipment",
      "Third-party liability",
      "Project-based terms",
    ],
  },
  // ── Specialised: Custodian Insurance ──
  {
    id: "custodian-cyber",
    provider: "Custodian Insurance",
    name: "Custodian Cyber Essentials",
    price: 22000,
    type: "specialised",
    features: [
      "SME cyber cover",
      "Data restoration",
      "Phishing & fraud losses",
      "Incident hotline",
    ],
  },
  {
    id: "custodian-do",
    provider: "Custodian Insurance",
    name: "Custodian D&O Cover",
    price: 55000,
    type: "specialised",
    features: [
      "Board liability",
      "Defence costs",
      "Employment practices option",
      "Claims-made basis",
    ],
  },
  {
    id: "custodian-spec",
    provider: "Custodian Insurance",
    name: "Custodian Specialist Risks",
    price: 95000,
    type: "specialised",
    features: [
      "Tailored specialist covers",
      "Engineering risks",
      "Underwritten per project",
      "Broker-assisted quote",
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
