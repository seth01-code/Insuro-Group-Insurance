import { departments } from "./dashboard-data";

export type ModalType =
  | "get-started"
  | "claim-car"
  | "claim-life"
  | "claim-health"
  | "claim-electronics"
  | "claim-travel"
  | "claim-property"
  | "claim-business"
  | "claim-marine"
  | "claim-accident"
  | "claim-agriculture"
  | "claim-specialised"
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

const claimFields = (
  policyLabel: string,
  dateLabel: string,
  nameLabel = "Employee Name",
): Field[] => [
  {
    name: "employee",
    label: nameLabel,
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

/** Shared shape for every claim modal. Pass literal Tailwind classes for
 *  `panel` and `btnClass` so they get picked up at build time. */
const claim = (
  title: string,
  policyLabel: string,
  dateLabel: string,
  panel: string,
  btnClass: string,
  nameLabel?: string,
): ModalConfig => ({
  title,
  desc: "Submit the details below and our claims team will reach out within 24 hours.",
  btn: "Submit Claim",
  success: "Claim Submitted!",
  panel,
  btnClass,
  note: "Avg. response time: 24 hours",
  noteIcon: "clock",
  fields: claimFields(policyLabel, dateLabel, nameLabel),
});

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

  // ── Claims (one per insurance product) ──
  "claim-car": claim(
    "File a Car Insurance Claim",
    "Motor Policy Number",
    "Date of Incident",
    "from-red-600 to-red-800",
    "bg-red-600 hover:bg-red-700",
  ),
  "claim-life": claim(
    "File a Life Insurance Claim",
    "Life Policy Number",
    "Date of Event",
    "from-emerald-500 to-emerald-700",
    "bg-emerald-600 hover:bg-emerald-700",
  ),
  "claim-health": claim(
    "File a Health Insurance Claim",
    "Health Policy / Enrollee ID",
    "Date of Treatment",
    "from-sky-500 to-sky-700",
    "bg-sky-600 hover:bg-sky-700",
    "Enrollee Name",
  ),
  "claim-electronics": claim(
    "File a Device Insurance Claim",
    "Device Policy Number",
    "Date of Incident",
    "from-cyan-500 to-cyan-700",
    "bg-cyan-600 hover:bg-cyan-700",
    "Claimant Name",
  ),
  "claim-travel": claim(
    "File a Travel Insurance Claim",
    "Travel Policy Number",
    "Date of Incident",
    "from-blue-500 to-blue-700",
    "bg-blue-600 hover:bg-blue-700",
    "Traveller Name",
  ),
  "claim-property": claim(
    "File a Home & Property Claim",
    "Property Policy Number",
    "Date of Loss",
    "from-violet-500 to-violet-700",
    "bg-violet-600 hover:bg-violet-700",
    "Claimant Name",
  ),
  "claim-business": claim(
    "File a Business Insurance Claim",
    "Business Policy Number",
    "Date of Incident",
    "from-indigo-500 to-indigo-700",
    "bg-indigo-600 hover:bg-indigo-700",
    "Business / Claimant Name",
  ),
  "claim-marine": claim(
    "File a Marine & Transit Claim",
    "Cargo Policy Number",
    "Date of Loss",
    "from-teal-500 to-teal-700",
    "bg-teal-600 hover:bg-teal-700",
    "Claimant Name",
  ),
  "claim-accident": claim(
    "File a Personal Accident Claim",
    "Accident Policy Number",
    "Date of Accident",
    "from-orange-500 to-orange-700",
    "bg-orange-600 hover:bg-orange-700",
    "Claimant Name",
  ),
  "claim-agriculture": claim(
    "File an Agricultural Claim",
    "Agric Policy Number",
    "Date of Loss",
    "from-lime-500 to-lime-700",
    "bg-lime-600 hover:bg-lime-700",
    "Farmer / Claimant Name",
  ),
  "claim-specialised": claim(
    "File a Specialised Commercial Claim",
    "Policy Number",
    "Date of Incident",
    "from-slate-600 to-slate-800",
    "bg-slate-700 hover:bg-slate-800",
    "Business / Claimant Name",
  ),

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
