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
  variant?: "icon" | "switch";
  className?: string;
}) {
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
        <span className="flex h-4.5 w-4.5 shrink-0 items-center justify-center">
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
          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform dark:translate-x-5" />
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
