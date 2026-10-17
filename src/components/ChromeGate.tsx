"use client";

import { usePathname } from "next/navigation";

// Hides its children (navbar / footer) on app-style pages like the dashboard.
const HIDDEN_ON = ["/dashboard"];

export default function ChromeGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;
  return <>{children}</>;
}
