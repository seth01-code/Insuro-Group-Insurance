// Sample data. Replace with backend data later.

export type PaymentStatus = "Paid" | "Pending" | "Failed";
export type PaymentMethod = "Card" | "Bank Transfer";

export interface Payment {
  id: string;
  invoice: string;
  date: string;
  description: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  employees: number;
}

const DESC = "Hygeia Plus + Leadway Group Life Plus";

export const payments: Payment[] = [
  {
    id: "pay-10",
    invoice: "INV-2026-0510",
    date: "May 1, 2026",
    description: DESC,
    amount: 1128000,
    method: "Card",
    status: "Pending",
    employees: 24,
  },
  {
    id: "pay-9",
    invoice: "INV-2026-0409",
    date: "Apr 1, 2026",
    description: DESC,
    amount: 1128000,
    method: "Card",
    status: "Paid",
    employees: 24,
  },
  {
    id: "pay-8",
    invoice: "INV-2026-0308",
    date: "Mar 1, 2026",
    description: DESC,
    amount: 987000,
    method: "Bank Transfer",
    status: "Paid",
    employees: 21,
  },
  {
    id: "pay-7",
    invoice: "INV-2026-0207",
    date: "Feb 1, 2026",
    description: DESC,
    amount: 987000,
    method: "Card",
    status: "Paid",
    employees: 21,
  },
  {
    id: "pay-6",
    invoice: "INV-2026-0106",
    date: "Jan 1, 2026",
    description: DESC,
    amount: 987000,
    method: "Card",
    status: "Failed",
    employees: 21,
  },
  {
    id: "pay-5",
    invoice: "INV-2026-0105",
    date: "Jan 3, 2026",
    description: DESC,
    amount: 987000,
    method: "Bank Transfer",
    status: "Paid",
    employees: 21,
  },
  {
    id: "pay-4",
    invoice: "INV-2025-1204",
    date: "Dec 1, 2025",
    description: DESC,
    amount: 987000,
    method: "Card",
    status: "Paid",
    employees: 21,
  },
  {
    id: "pay-3",
    invoice: "INV-2025-1103",
    date: "Nov 1, 2025",
    description: DESC,
    amount: 987000,
    method: "Card",
    status: "Paid",
    employees: 21,
  },
  {
    id: "pay-2",
    invoice: "INV-2025-1002",
    date: "Oct 1, 2025",
    description: DESC,
    amount: 987000,
    method: "Bank Transfer",
    status: "Paid",
    employees: 21,
  },
  {
    id: "pay-1",
    invoice: "INV-2025-0901",
    date: "Sep 1, 2025",
    description: DESC,
    amount: 987000,
    method: "Card",
    status: "Paid",
    employees: 21,
  },
];

export function receiptText(p: Payment, company: string): string {
  return [
    "INSURO AFRICA GROUP LTD",
    "PAYMENT RECEIPT",
    "------------------------------",
    `Invoice:     ${p.invoice}`,
    `Date:        ${p.date}`,
    `Billed to:   ${company}`,
    `Plans:       ${p.description}`,
    `Employees:   ${p.employees}`,
    `Method:      ${p.method}`,
    `Status:      ${p.status}`,
    "------------------------------",
    `Amount:      NGN ${p.amount.toLocaleString("en-NG")}`,
    "",
    "Thank you for choosing Insuro Africa.",
  ].join("\n");
}
