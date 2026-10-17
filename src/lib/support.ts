// Sample data. Replace with backend data later.

// Placeholder contact details (same ones as the footer)
export const contact = {
  email: "hello@insuro.africa",
  phone: "+234 800 123 4567",
  phoneHref: "tel:+2348001234567",
  hours: "Mon – Fri, 8:00 AM – 6:00 PM (WAT)",
};

/* ───────── FAQ ───────── */

export type FaqCategory =
  | "Plans & pricing"
  | "Enrollment"
  | "Payments"
  | "Claims"
  | "Account";

export const faqCategories: FaqCategory[] = [
  "Plans & pricing",
  "Enrollment",
  "Payments",
  "Claims",
  "Account",
];

export interface Faq {
  id: string;
  category: FaqCategory;
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    id: "pricing",
    category: "Plans & pricing",
    q: "How is pricing calculated?",
    a: "Every plan is priced per staff, per month. Multiply the rate by the number of employees you're covering and you have your monthly total. Checkout shows that total before you pay.",
  },
  {
    id: "rates",
    category: "Plans & pricing",
    q: "Are the rates negotiable?",
    a: "The rates you see are already pre-negotiated with our provider partners, so there's nothing to haggle over. What you see on the plan card is what you pay.",
  },
  {
    id: "minimum",
    category: "Plans & pricing",
    q: "Is there a minimum number of employees?",
    a: "It depends on the plan. Leadway Group Life Basic needs at least 10 employees, and the requirement is listed on the plan card. Check the card before you select a plan.",
  },
  {
    id: "coverage-time",
    category: "Enrollment",
    q: "How long until my employees are covered?",
    a: "Your employees are enrolled and covered within 48 hours of onboarding. Until their coverage is confirmed, they show as Pending in your employee list.",
  },
  {
    id: "add-employee",
    category: "Enrollment",
    q: "How do I add a new employee?",
    a: "Open Employees in the sidebar and choose Add employee. Enter their name, email and department, and they'll appear as Pending until their coverage is confirmed.",
  },
  {
    id: "methods",
    category: "Payments",
    q: "Which payment methods can I use?",
    a: "Checkout offers debit or credit card, bank transfer and USSD. Card payments are confirmed immediately. For a bank transfer, send the amount shown and confirm your payment.",
  },
  {
    id: "receipts",
    category: "Payments",
    q: "Where do I find my receipts?",
    a: "Open Payments in the sidebar. Every paid invoice has a download button that saves its receipt.",
  },
  {
    id: "file-claim",
    category: "Claims",
    q: "How do I file a claim?",
    a: "Choose Car Insurance Claim or Life Insurance Claim from the sidebar, the Plans page, or the buttons above. You don't need to log in to start. Our claims team confirms your policy and follows up directly.",
  },
  {
    id: "claim-details",
    category: "Claims",
    q: "What do I need to file a claim?",
    a: "The employee's name, the policy number, the date of the incident or event, and a short description of what happened. The average response time is 24 hours.",
  },
  {
    id: "company-details",
    category: "Account",
    q: "How do I update my company details?",
    a: "Go to Settings, then Company profile. Edit what you need and save. Those details are used on invoices and policy documents.",
  },
  {
    id: "two-factor",
    category: "Account",
    q: "How do I turn on two-factor authentication?",
    a: "Open Settings, go to Security, and switch on Two-factor authentication. You'll be asked for a one-time code each time you sign in.",
  },
];

/* ───────── Requests ───────── */

export const topics = [
  "Plans & pricing",
  "Employees & enrollment",
  "Payments",
  "Claims",
  "Account",
  "Other",
] as const;

export type TicketStatus = "Open" | "In progress" | "Resolved";

export interface Ticket {
  id: string;
  subject: string;
  topic: string;
  status: TicketStatus;
  date: string;
}

export const tickets: Ticket[] = [
  {
    id: "SUP-1042",
    subject: "Question about the May invoice",
    topic: "Payments",
    status: "Open",
    date: "May 2, 2026",
  },
  {
    id: "SUP-1038",
    subject: "Pre-employment check for a new hire",
    topic: "Employees & enrollment",
    status: "In progress",
    date: "Apr 28, 2026",
  },
  {
    id: "SUP-1031",
    subject: "Update company address on policy documents",
    topic: "Account",
    status: "Resolved",
    date: "Apr 12, 2026",
  },
];
