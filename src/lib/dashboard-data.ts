import {
  CalendarClock,
  CarFront,
  ClipboardList,
  HardHat,
  HeartHandshake,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
  UserRoundCheck,
  UsersRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { ModalType } from "./modals";

// Sample data. Replace with backend data later.

export const company = {
  name: "ShipAfrica Ltd",
  role: "HR Admin Account",
  user: "Kimberly",
  initials: "SA",
};

export const stats: {
  label: string;
  value: string;
  sub: string;
  Icon: LucideIcon;
  featured?: boolean;
}[] = [
  {
    label: "Employees Covered",
    value: "24",
    sub: "↑ 3 added this month",
    Icon: UsersRound,
    featured: true,
  },
  {
    label: "Active Plans",
    value: "2",
    sub: "Health + Life",
    Icon: ClipboardList,
  },
  {
    label: "Monthly Spend",
    value: "₦840k",
    sub: "Within budget",
    Icon: Wallet,
  },
  {
    label: "Next Renewal",
    value: "42d",
    sub: "Jul 25, 2026",
    Icon: CalendarClock,
  },
];

export const quickActions: {
  label: string;
  sub: string;
  modal: ModalType;
  Icon: LucideIcon;
  tile: string;
}[] = [
  {
    label: "Car Claim",
    sub: "File a motor claim",
    modal: "claim-car",
    Icon: CarFront,
    tile: "from-red-500 to-red-700",
  },
  {
    label: "Life Claim",
    sub: "File a life claim",
    modal: "claim-life",
    Icon: HeartHandshake,
    tile: "from-emerald-400 to-emerald-600",
  },
  {
    label: "Annual Medicals",
    sub: "Book screening",
    modal: "service-medical",
    Icon: Stethoscope,
    tile: "from-violet-400 to-violet-600",
  },
  {
    label: "Pre-Employment Check",
    sub: "New hire screening",
    modal: "service-preemployment",
    Icon: UserRoundCheck,
    tile: "from-violet-400 to-violet-600",
  },
  {
    label: "Fitness to Work",
    sub: "Request assessment",
    modal: "service-fitness",
    Icon: HardHat,
    tile: "from-violet-400 to-violet-600",
  },
];

export const activePlans: {
  name: string;
  detail: string;
  Icon: LucideIcon;
  tone: "blue" | "green";
}[] = [
  {
    name: "Hygeia Plus",
    detail: "24 employees · ₦35,000/staff",
    Icon: HeartPulse,
    tone: "blue",
  },
  {
    name: "Leadway Group Life Plus",
    detail: "24 employees · ₦12,000/staff",
    Icon: ShieldCheck,
    tone: "green",
  },
];

export const activity = [
  {
    text: "3 new employees added to Hygeia Plus plan",
    time: "Today, 9:14 AM",
    dot: "bg-brand",
  },
  {
    text: "April payment of ₦1,128,000 confirmed",
    time: "Apr 1, 2026",
    dot: "bg-emerald-500",
  },
  {
    text: "Plan renewal due in 42 days — review options now",
    time: "Mar 28, 2026",
    dot: "bg-amber-500",
  },
  {
    text: "Reliance Standard — new plan available in your budget",
    time: "Mar 20, 2026",
    dot: "bg-brand",
  },
];

/* ───────── Employees ───────── */

export type EmployeeStatus = "Active" | "Pending";

export interface Employee {
  id: string;
  name: string;
  initials: string;
  color: string;
  email: string;
  department: string;
  plan: string;
  status: EmployeeStatus;
  joined: string;
}

export const departments = [
  "Operations",
  "Finance",
  "Logistics",
  "Customer Support",
  "HR",
  "Marketing",
  "Sales",
  "Engineering",
] as const;

export const defaultPlan = "Hygeia Plus · Life Plus";

const palette = [
  "#1A56DB",
  "#059669",
  "#7C3AED",
  "#DC2626",
  "#0891B2",
  "#D97706",
  "#DB2777",
  "#4F46E5",
];

export function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export function colorFor(index: number): string {
  return palette[index % palette.length];
}

export function emailFor(name: string): string {
  return `${name.toLowerCase().trim().replace(/\s+/g, ".")}@shipafrica.com`;
}

const joinedDates = [
  "Jan 12, 2025",
  "Feb 3, 2025",
  "Mar 18, 2025",
  "Apr 7, 2025",
  "May 22, 2025",
  "Jun 9, 2025",
];

// [name, department, status]
const raw: [string, string, EmployeeStatus][] = [
  ["Adeola Okafor", "Operations", "Active"],
  ["Babatunde Fashola", "Finance", "Active"],
  ["Chioma Nwosu", "Customer Support", "Pending"],
  ["Emeka Ihejirika", "Logistics", "Active"],
  ["Fatima Aliyu", "HR", "Active"],
  ["Gbenga Adeyemi", "Operations", "Active"],
  ["Halima Bello", "Finance", "Active"],
  ["Ifeanyi Okonkwo", "Logistics", "Active"],
  ["Jumoke Balogun", "Marketing", "Active"],
  ["Kelechi Eze", "Engineering", "Active"],
  ["Lanre Ogunleye", "Engineering", "Active"],
  ["Mariam Suleiman", "Customer Support", "Active"],
  ["Ngozi Anyanwu", "Operations", "Active"],
  ["Obinna Chukwu", "Logistics", "Active"],
  ["Peter Adebayo", "Sales", "Active"],
  ["Queen Etim", "Marketing", "Pending"],
  ["Rasheed Lawal", "Sales", "Active"],
  ["Sade Williams", "HR", "Active"],
  ["Tunde Bakare", "Finance", "Active"],
  ["Uche Nnamdi", "Engineering", "Active"],
  ["Vivian Okoro", "Customer Support", "Active"],
  ["Wale Ajayi", "Operations", "Pending"],
  ["Yetunde Coker", "Sales", "Active"],
  ["Zainab Musa", "Logistics", "Active"],
];

export const employees: Employee[] = raw.map(
  ([name, department, status], i) => ({
    id: `emp-${i + 1}`,
    name,
    initials: initialsOf(name),
    color: colorFor(i),
    email: emailFor(name),
    department,
    plan: defaultPlan,
    status,
    joined:
      status === "Pending" ? "This month" : joinedDates[i % joinedDates.length],
  }),
);
