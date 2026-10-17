"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  LifeBuoy,
  MessageSquareText,
  PenLine,
  Send,
} from "lucide-react";
import clsx from "clsx";
import { topics } from "@/lib/support";

export interface SupportMessage {
  topic: string;
  subject: string;
  message: string;
}

const inputClass =
  "w-full rounded-2xl border border-line bg-canvas py-3.5 pl-11 pr-4 text-[14px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand focus:bg-surface focus:ring-4 focus:ring-brand/10";

export default function SupportForm({
  onSend,
}: {
  onSend: (m: SupportMessage) => void;
}) {
  const [topic, setTopic] = useState<string>(topics[0]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Mock: send the message to your backend here
    onSend({ topic, subject: subject.trim(), message: message.trim() });
    setSubject("");
    setMessage("");
    setTopic(topics[0]);
    setSent(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setSent(false), 5000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-[12.5px] font-semibold text-ink">
            Topic
          </label>
          <div className="relative">
            <LifeBuoy
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={`${inputClass} appearance-none pr-10`}
            >
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-[12.5px] font-semibold text-ink">
            Subject
          </label>
          <div className="relative">
            <PenLine
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What's it about?"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[12.5px] font-semibold text-ink">
          Message
        </label>
        <div className="relative">
          <MessageSquareText
            size={17}
            className="pointer-events-none absolute left-4 top-4 text-muted"
          />
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what's going on"
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p
          aria-live="polite"
          className={clsx(
            "flex items-center gap-1.5 text-[12px] font-semibold text-emerald-600 transition-opacity",
            sent ? "opacity-100" : "opacity-0",
          )}
        >
          <Check size={14} strokeWidth={3} /> Message sent. Your request is
          listed below.
        </p>
        <button
          type="submit"
          className="flex items-center gap-2 rounded-full bg-brand px-7 py-3 text-[13px] font-semibold text-white shadow-[0_14px_34px_-10px_rgba(26,86,219,0.7)] transition hover:bg-brand-dark"
        >
          <Send size={15} /> Send message
        </button>
      </div>
    </form>
  );
}
