"use client";

import { useState } from "react";
import {
  CarFront,
  Clock,
  HeartHandshake,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import type { ModalType } from "@/lib/modals";
import { getProduct, type ProductKey } from "@/lib/products";
import {
  contact,
  tickets as seed,
  type Ticket,
  type TicketStatus,
} from "@/lib/support";
import { useModal } from "./ModalProvider";
import SupportFaq from "./SupportFaq";
import SupportForm, { type SupportMessage } from "./SupportForm";

const statusStyle: Record<TicketStatus, string> = {
  Open: "bg-amber-100 text-amber-800",
  "In progress": "bg-brand-soft text-brand",
  Resolved: "bg-emerald-100 text-emerald-800",
};

// One claim shortcut per insurance product
const claimDefs: { key: ProductKey; label: string; modal: ModalType }[] = [
  { key: "health", label: "Health claim", modal: "claim-health" },
  { key: "life", label: "Life claim", modal: "claim-life" },
  { key: "motor", label: "Car claim", modal: "claim-car" },
  { key: "electronics", label: "Device claim", modal: "claim-electronics" },
  { key: "travel", label: "Travel claim", modal: "claim-travel" },
  { key: "property", label: "Property claim", modal: "claim-property" },
  { key: "business", label: "Business claim", modal: "claim-business" },
  { key: "marine", label: "Marine claim", modal: "claim-marine" },
  { key: "accident", label: "Accident claim", modal: "claim-accident" },
  { key: "agriculture", label: "Agric claim", modal: "claim-agriculture" },
  {
    key: "specialised",
    label: "Specialised claim",
    modal: "claim-specialised",
  },
];

const claimShortcuts = claimDefs.map(({ key, label, modal }) => ({
  label,
  modal,
  Icon:
    key === "motor"
      ? CarFront
      : key === "life"
        ? HeartHandshake
        : getProduct(key)!.Icon,
}));

// Title + description on the left, content on the right. No card.
function Section({
  id,
  title,
  desc,
  children,
}: {
  id: string;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="grid scroll-mt-24 gap-8 border-t border-line py-12 lg:grid-cols-[15rem_1fr] lg:gap-14"
    >
      <div>
        <h2 className="text-[18px] font-extrabold tracking-tight text-ink">
          {title}
        </h2>
        <p className="mt-2 max-w-60 text-[13px] leading-relaxed text-muted">
          {desc}
        </p>
      </div>
      <div className="min-w-0 max-w-2xl">{children}</div>
    </section>
  );
}

export default function SupportView() {
  const { openModal } = useModal();
  const [list, setList] = useState<Ticket[]>(seed);

  function addTicket(m: SupportMessage) {
    // Mock: the backend would create the ticket and return its id
    const n = 1043 + (list.length - seed.length);
    setList((l) => [
      {
        id: `SUP-${n}`,
        subject: m.subject,
        topic: m.topic,
        status: "Open",
        date: "Just now",
      },
      ...l,
    ]);
  }

  const channels: {
    label: string;
    value: string;
    href?: string;
    Icon: LucideIcon;
  }[] = [
    {
      label: "Email us",
      value: contact.email,
      href: `mailto:${contact.email}`,
      Icon: Mail,
    },
    {
      label: "Call us",
      value: contact.phone,
      href: contact.phoneHref,
      Icon: Phone,
    },
    { label: "Support hours", value: contact.hours, Icon: Clock },
  ];

  return (
    <div className="px-5 py-8 sm:px-8 lg:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          Support
        </h1>
        <p className="mt-2 text-[14px] text-muted">
          Answers, ways to reach us, and your open requests
        </p>

        {/* Channels */}
        <div className="mt-8 grid divide-y divide-line border-y border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {channels.map(({ label, value, href, Icon }) => {
            const inner = (
              <>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Icon size={21} />
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] font-medium text-muted">
                    {label}
                  </div>
                  <div className="mt-0.5 text-[14px] font-bold text-ink">
                    {value}
                  </div>
                </div>
              </>
            );
            const cls =
              "flex items-center gap-4 py-6 md:px-8 md:first:pl-0 md:last:pr-0";
            return href ? (
              <a
                key={label}
                href={href}
                className={clsx(cls, "transition hover:text-brand")}
              >
                {inner}
              </a>
            ) : (
              <div key={label} className={cls}>
                {inner}
              </div>
            );
          })}
        </div>

        {/* Claims shortcut */}
        <div className="py-8">
          <div className="max-w-md">
            <h2 className="text-[15px] font-bold text-ink">
              Need to file a claim?
            </h2>
            <p className="mt-1 text-[13px] leading-relaxed text-muted">
              No login required to start. Average response time: 24 hours.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {claimShortcuts.map(({ label, modal, Icon }) => (
              <button
                key={modal}
                type="button"
                onClick={() => openModal(modal)}
                className="flex items-center gap-2 rounded-full border-2 border-brand/20 px-4 py-2 text-[13px] font-semibold text-brand transition hover:bg-brand-soft"
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <Section
          id="faq"
          title="Frequently asked"
          desc="Quick answers about plans, enrollment, payments and claims."
        >
          <SupportFaq />
        </Section>

        {/* Message */}
        <Section
          id="message"
          title="Send us a message"
          desc="Can't find what you need? Tell us and we'll get back to you."
        >
          <SupportForm onSend={addTicket} />
        </Section>

        {/* Requests */}
        <Section
          id="requests"
          title="Your requests"
          desc="Everything you've sent us and where it stands."
        >
          <ul className="divide-y divide-line border-y border-line">
            {list.map((t) => (
              <li
                key={t.id}
                className="flex items-center justify-between gap-4 py-5"
              >
                <div className="min-w-0">
                  <div className="truncate text-[14px] font-semibold text-ink">
                    {t.subject}
                  </div>
                  <div className="mt-1 truncate text-[12px] text-muted">
                    {t.id} · {t.topic} · {t.date}
                  </div>
                </div>
                <span
                  className={clsx(
                    "shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold",
                    statusStyle[t.status],
                  )}
                >
                  {t.status}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <div className="h-8" />
      </div>
    </div>
  );
}
