"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import clsx from "clsx";
import { faqCategories, faqs, type FaqCategory } from "@/lib/support";

type Cat = "All" | FaqCategory;

const inputClass =
  "w-full rounded-2xl border border-line bg-canvas py-3.5 pl-11 pr-4 text-[14px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:bg-surface focus:ring-4 focus:ring-brand/10";

export default function SupportFaq() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Cat>("All");
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      if (cat !== "All" && f.category !== cat) return false;
      if (!q) return true;
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    });
  }, [query, cat]);

  const cats: Cat[] = ["All", ...faqCategories];

  return (
    <div>
      {/* Search */}
      <div className="relative">
        <Search
          size={17}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for an answer"
          className={inputClass}
        />
      </div>

      {/* Categories */}
      <div className="mt-4 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={clsx(
              "rounded-full px-4 py-2 text-[12px] font-semibold transition",
              cat === c
                ? "bg-brand text-white shadow-sm"
                : "bg-brand-soft text-brand hover:bg-brand/15",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Accordion */}
      {list.length === 0 ? (
        <div className="mt-8 py-10 text-center">
          <p className="text-[14px] font-semibold text-ink">
            No answers match that.
          </p>
          <p className="mt-1 text-[13px] text-muted">
            Try different words, or send us a message below.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCat("All");
            }}
            className="mt-4 rounded-full bg-brand-soft px-5 py-2.5 text-[13px] font-semibold text-brand transition hover:bg-brand hover:text-white"
          >
            Clear search
          </button>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {list.map((f) => {
            const isOpen = openId === f.id;
            return (
              <li key={f.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : f.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${f.id}`}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span
                    className={clsx(
                      "text-[14px] font-semibold transition-colors",
                      isOpen ? "text-brand" : "text-ink",
                    )}
                  >
                    {f.q}
                  </span>
                  <ChevronDown
                    size={18}
                    className={clsx(
                      "shrink-0 text-muted transition-transform duration-300",
                      isOpen && "rotate-180 text-brand",
                    )}
                  />
                </button>
                <div
                  id={`faq-${f.id}`}
                  className={clsx(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-5 text-[13px] leading-relaxed text-muted">
                      {f.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
