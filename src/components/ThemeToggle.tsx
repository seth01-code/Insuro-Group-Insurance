"use client";

import { Moon, Sun } from "lucide-react";
import clsx from "clsx";
import { applyPref } from "@/lib/theme";

export function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  applyPref(isDark ? "light" : "dark");
}

// Icons and labels swap with CSS (dark: variants), so there's no hydration mismatch.
export default function ThemeToggle({
  variant = "icon",
  className,
}: {
  variant?: "icon" | "switch" | "segment";
  className?: string;
}) {
  if (variant === "segment") {
    const base =
      "flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-[12px] font-semibold transition";
    return (
      <div
        role="group"
        aria-label="Theme"
        className={clsx("flex gap-1 rounded-full bg-brand-soft p-1", className)}
      >
        <button
          type="button"
          onClick={() => applyPref("light")}
          className={clsx(
            base,
            "bg-surface text-brand shadow-sm dark:bg-transparent dark:text-muted dark:shadow-none dark:hover:text-ink",
          )}
        >
          <Sun size={14} /> Light
        </button>
        <button
          type="button"
          onClick={() => applyPref("dark")}
          className={clsx(
            base,
            "text-muted hover:text-ink dark:bg-surface dark:text-brand dark:shadow-sm",
          )}
        >
          <Moon size={14} /> Dark
        </button>
      </div>
    );
  }

  if (variant === "switch") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className={clsx(
          "flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-[13px] font-medium text-muted transition hover:bg-brand-soft hover:text-ink",
          className,
        )}
      >
        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center">
          <Sun size={18} className="dark:hidden" />
          <Moon size={18} className="hidden dark:block" />
        </span>
        <span className="flex-1 text-left">
          <span className="dark:hidden">Light Mode</span>
          <span className="hidden dark:inline">Dark Mode</span>
        </span>
        <span
          aria-hidden
          className="relative h-6 w-11 shrink-0 rounded-full bg-line transition-colors dark:bg-brand"
        >
          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-[#fff] shadow transition-transform dark:translate-x-5" />
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title="Toggle light / dark mode"
      className={clsx(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition hover:border-brand hover:text-brand",
        className,
      )}
    >
      <Sun size={18} className="dark:hidden" />
      <Moon size={18} className="hidden dark:block" />
    </button>
  );
}
