import type { PlanType } from "./plans";

export interface Provider {
  name: string; // must match plan.provider in plans.ts
  code: string;
  type: PlanType;
  rating: number;
  blurb: string;
  accreditation: string;
  gradient: string;
}

export const providers: Provider[] = [
  {
    name: "Hygeia HMO",
    code: "HYG",
    type: "health",
    rating: 4.2,
    blurb: "30+ years in market",
    accreditation: "NHIA Accredited",
    gradient: "linear-gradient(135deg, #1A56DB, #06B6D4)",
  },
  {
    name: "Reliance Health",
    code: "REL",
    type: "health",
    rating: 4.7,
    blurb: "Tech-first platform",
    accreditation: "NHIA Accredited",
    gradient: "linear-gradient(135deg, #7C3AED, #a78bfa)",
  },
  {
    name: "AXA Mansard Health",
    code: "AXA",
    type: "health",
    rating: 4.4,
    blurb: "Global insurance group",
    accreditation: "NHIA Accredited",
    gradient: "linear-gradient(135deg, #DC2626, #f87171)",
  },
  {
    name: "Leadway Assurance",
    code: "LEA",
    type: "life",
    rating: 4.6,
    blurb: "Nigeria's leading insurer",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #059669, #34d399)",
  },
  {
    name: "AXA Mansard Life",
    code: "AXA",
    type: "life",
    rating: 4.3,
    blurb: "International backing",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #DC2626, #f87171)",
  },

  // ── PLACEHOLDER providers: ratings and blurbs are illustrative ──
  // Motor
  {
    name: "AIICO Insurance",
    code: "AII",
    type: "motor",
    rating: 4.3,
    blurb: "Life & general insurer",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #0F766E, #2DD4BF)",
  },
  {
    name: "Allianz Nigeria",
    code: "ALZ",
    type: "motor",
    rating: 4.5,
    blurb: "Global insurance group",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #1D4ED8, #60A5FA)",
  },
  // Electronics
  {
    name: "Custodian Insurance",
    code: "CUS",
    type: "electronics",
    rating: 4.2,
    blurb: "Quick device claims",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #B45309, #FBBF24)",
  },
  {
    name: "Cornerstone Insurance",
    code: "COR",
    type: "electronics",
    rating: 4.1,
    blurb: "Flexible cover options",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #0E7490, #22D3EE)",
  },
  // Travel
  {
    name: "Leadway Assurance",
    code: "LEA",
    type: "travel",
    rating: 4.6,
    blurb: "Nigeria's leading insurer",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #059669, #34d399)",
  },
  {
    name: "Sunu Assurances",
    code: "SUN",
    type: "travel",
    rating: 4.2,
    blurb: "Pan-African presence",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #BE185D, #F472B6)",
  },
  // Property
  {
    name: "AXA Mansard General",
    code: "AXA",
    type: "property",
    rating: 4.4,
    blurb: "International backing",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #DC2626, #f87171)",
  },
  {
    name: "Custodian Insurance",
    code: "CUS",
    type: "property",
    rating: 4.2,
    blurb: "Home & commercial property",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #B45309, #FBBF24)",
  },
  // Business
  {
    name: "Allianz Nigeria",
    code: "ALZ",
    type: "business",
    rating: 4.5,
    blurb: "Global insurance group",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #1D4ED8, #60A5FA)",
  },
  {
    name: "NEM Insurance",
    code: "NEM",
    type: "business",
    rating: 4.4,
    blurb: "Strong SME focus",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #4338CA, #818CF8)",
  },
  // Marine
  {
    name: "NEM Insurance",
    code: "NEM",
    type: "marine",
    rating: 4.4,
    blurb: "Marine & cargo specialist",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #4338CA, #818CF8)",
  },
  {
    name: "Cornerstone Insurance",
    code: "COR",
    type: "marine",
    rating: 4.1,
    blurb: "Flexible cargo options",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #0E7490, #22D3EE)",
  },
  // Accident
  {
    name: "AIICO Insurance",
    code: "AII",
    type: "accident",
    rating: 4.3,
    blurb: "Individual & group cover",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #0F766E, #2DD4BF)",
  },
  {
    name: "Sunu Assurances",
    code: "SUN",
    type: "accident",
    rating: 4.2,
    blurb: "Pan-African presence",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #BE185D, #F472B6)",
  },
  // Agriculture
  {
    name: "NAIC",
    code: "NAI",
    type: "agriculture",
    rating: 4.0,
    blurb: "Agricultural insurance specialist",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #4D7C0F, #A3E635)",
  },
  {
    name: "Leadway Assurance",
    code: "LEA",
    type: "agriculture",
    rating: 4.6,
    blurb: "Nigeria's leading insurer",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #059669, #34d399)",
  },
  // Specialised
  {
    name: "Allianz Nigeria",
    code: "ALZ",
    type: "specialised",
    rating: 4.5,
    blurb: "Global specialist risks",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #1D4ED8, #60A5FA)",
  },
  {
    name: "Custodian Insurance",
    code: "CUS",
    type: "specialised",
    rating: 4.2,
    blurb: "Tailored commercial covers",
    accreditation: "NAICOM Licensed",
    gradient: "linear-gradient(135deg, #B45309, #FBBF24)",
  },
];
