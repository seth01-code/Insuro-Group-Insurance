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
];
