"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

const topics = [
  "Get a quote",
  "Question about a plan",
  "Claims enquiry",
  "Partnership",
  "Something else",
];

const inputClass =
  "w-full rounded-2xl border border-line bg-canvas px-4 py-3.5 text-[14px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:ring-4 focus:ring-brand/10";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    // TODO: send `data` to your backend / email service here.
    console.log("contact form", data);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
          <Check size={30} strokeWidth={3} />
        </span>
        <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-ink">
          Message sent
        </h3>
        <p className="mt-2 text-[13px] text-muted">
          Thanks for reaching out. We&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[12.5px] font-semibold text-ink">
            Full name
          </span>
          <input
            name="name"
            required
            placeholder="e.g. Ada Obi"
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-[12.5px] font-semibold text-ink">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-[12.5px] font-semibold text-ink">
            Phone (optional)
          </span>
          <input
            name="phone"
            type="tel"
            placeholder="+234"
            className={inputClass}
          />
        </label>
        <label className="relative block">
          <span className="mb-2 block text-[12.5px] font-semibold text-ink">
            What&apos;s this about?
          </span>
          <select
            name="topic"
            className={`${inputClass} appearance-none pr-10`}
          >
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute bottom-4 right-4 text-muted"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-2 block text-[12.5px] font-semibold text-ink">
          Message
        </span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us how we can help"
          className={`${inputClass} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="rounded-full bg-brand px-8 py-3.5 text-[13px] font-semibold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
      >
        Send message →
      </button>
    </form>
  );
}
