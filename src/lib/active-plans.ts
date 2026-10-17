import { plans, type Plan } from "./plans";

// Sample data. Replace with backend data later.
export interface ActivePlanRecord {
  planId: string; // matches an id in plans.ts
  employees: number;
  policyNo: string;
  start: string;
  renewal: string;
  periodPct: number;
}

export const activePlanRecords: ActivePlanRecord[] = [
  {
    planId: "hygeia-plus",
    employees: 24,
    policyNo: "INS-2026-00214",
    start: "Jul 26, 2025",
    renewal: "Jul 25, 2026",
    periodPct: 65,
  },
  {
    planId: "leadway-plus",
    employees: 24,
    policyNo: "INS-2026-00215",
    start: "Jul 26, 2025",
    renewal: "Jul 25, 2026",
    periodPct: 65,
  },
];

/** The next tier up from the same provider, if there is one. */
export function getUpgrade(plan: Plan): Plan | undefined {
  return plans
    .filter(
      (p) =>
        p.provider === plan.provider &&
        p.type === plan.type &&
        p.price > plan.price,
    )
    .sort((a, b) => a.price - b.price)[0];
}
