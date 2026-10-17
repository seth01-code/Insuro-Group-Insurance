import DashboardView from "@/components/DashboardView";

export const metadata = { title: "Dashboard | Insuro Africa" };

// The dashboard is gated client-side by the mock auth, so it can't be part of the prerendered shell
export const instant = false;

export default function DashboardPage() {
  return <DashboardView />;
}
