import { departments } from "./dashboard-data";

export type ModalType =
  | "get-started"
  | "claim-car"
  | "claim-life"
  | "service-medical"
  | "service-preemployment"
  | "service-fitness"
  | "add-employee";

export interface Field {
  name: string;
  label: string;
  type: "text" | "email" | "date" | "textarea" | "select";
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface ModalConfig {
  title: string;
  desc: string;
  btn: string;
  success: string;
  /** Line under the success title. Defaults to "We'll be in touch shortly." */
  successNote?: string;
  panel: string; // gradient for the left panel
  btnClass: string;
  note: string;
  noteIcon: "clock" | "shield";
  /** Optional image/logo shown instead of the icon, e.g. "/images/logo.png".
   *  Falls back to the icon if the file is missing. */
  image?: string;
  fields: Field[];
}

const claimFields = (policyLabel: string, dateLabel: string): Field[] => [
  {
    name: "employee",
    label: "Employee Name",
    type: "text",
    placeholder: "Full name",
    required: true,
  },
  {
    name: "policy",
    label: policyLabel,
    type: "text",
    placeholder: "e.g. INS-2026-00214",
    required: true,
  },
  { name: "date", label: dateLabel, type: "date", required: true },
  {
    name: "details",
    label: "Claim Details",
    type: "textarea",
    placeholder: "Briefly describe what happened",
    required: true,
  },
];

const serviceFields: Field[] = [
  {
    name: "employees",
    label: "Employee Name(s)",
    type: "text",
    placeholder: "Full name or 'All staff'",
    required: true,
  },
  { name: "date", label: "Preferred Date", type: "date", required: true },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    placeholder: "Any additional details",
  },
];

export const modalConfig: Record<ModalType, ModalConfig> = {
  "get-started": {
    title: "Get Started with Insuro",
    desc: "Create your company account and start comparing plans in minutes.",
    btn: "Create Account",
    success: "Account Created!",
    panel: "from-brand to-brand-dark",
    btnClass: "bg-brand hover:bg-brand-dark",
    note: "48hrs average onboarding",
    noteIcon: "clock",
    // image: "/images/logo.png",   // <- uncomment to use your logo instead of the icon
    fields: [
      {
        name: "company",
        label: "Company Name",
        type: "text",
        placeholder: "e.g. ShipAfrica Ltd",
        required: true,
      },
      {
        name: "email",
        label: "Work Email",
        type: "email",
        placeholder: "hr@company.com",
        required: true,
      },
      {
        name: "size",
        label: "Number of Employees",
        type: "select",
        options: ["1 – 10", "11 – 50", "51 – 200", "200+"],
      },
    ],
  },
  "claim-car": {
    title: "File a Car Insurance Claim",
    desc: "Submit the details below and our claims team will reach out within 24 hours.",
    btn: "Submit Claim",
    success: "Claim Submitted!",
    panel: "from-red-600 to-red-800",
    btnClass: "bg-red-600 hover:bg-red-700",
    note: "Avg. response time: 24 hours",
    noteIcon: "clock",
    // image: "/images/modal-car.png",
    fields: claimFields("Motor Policy Number", "Date of Incident"),
  },
  "claim-life": {
    title: "File a Life Insurance Claim",
    desc: "Submit the details below and our claims team will reach out within 24 hours.",
    btn: "Submit Claim",
    success: "Claim Submitted!",
    panel: "from-emerald-500 to-emerald-700",
    btnClass: "bg-emerald-600 hover:bg-emerald-700",
    note: "Avg. response time: 24 hours",
    noteIcon: "clock",
    // image: "/images/modal-life.png",
    fields: claimFields("Life Policy Number", "Date of Event"),
  },
  "service-medical": {
    title: "Book Annual Medicals",
    desc: "Schedule annual medical screening for your team.",
    btn: "Request Service",
    success: "Request Sent!",
    panel: "from-violet-500 to-violet-700",
    btnClass: "bg-violet-600 hover:bg-violet-700",
    note: "NDPR Compliant",
    noteIcon: "shield",
    // image: "/images/modal-medical.png",
    fields: serviceFields,
  },
  "service-preemployment": {
    title: "Pre-Employment Medical Check",
    desc: "Request a pre-employment health check for a new hire.",
    btn: "Request Service",
    success: "Request Sent!",
    panel: "from-violet-500 to-violet-700",
    btnClass: "bg-violet-600 hover:bg-violet-700",
    note: "NDPR Compliant",
    noteIcon: "shield",
    // image: "/images/modal-preemployment.png",
    fields: serviceFields,
  },
  "service-fitness": {
    title: "Fitness to Work Assessment",
    desc: "Request a fitness-to-work assessment for an employee.",
    btn: "Request Service",
    success: "Request Sent!",
    panel: "from-violet-500 to-violet-700",
    btnClass: "bg-violet-600 hover:bg-violet-700",
    note: "NDPR Compliant",
    noteIcon: "shield",
    // image: "/images/modal-fitness.png",
    fields: serviceFields,
  },
  "add-employee": {
    title: "Add an Employee",
    desc: "They'll show as Pending until their coverage is confirmed.",
    btn: "Add Employee",
    success: "Employee Added!",
    successNote: "They're now on your list as Pending.",
    panel: "from-brand to-brand-dark",
    btnClass: "bg-brand hover:bg-brand-dark",
    note: "Covered within 48hrs",
    noteIcon: "clock",
    // image: "/images/modal-employee.png",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        placeholder: "e.g. Ada Obi",
        required: true,
      },
      {
        name: "email",
        label: "Work Email",
        type: "email",
        placeholder: "Leave blank to auto-generate",
      },
      {
        name: "department",
        label: "Department",
        type: "select",
        options: [...departments],
      },
    ],
  },
};
