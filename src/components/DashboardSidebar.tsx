"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Briefcase,
  CarFront,
  ChevronDown,
  ClipboardList,
  Compass,
  FileText,
  HardHat,
  HeartHandshake,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Stethoscope,
  UserRoundCheck,
  Users,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import type { ModalType } from "@/lib/modals";
import { getProduct, products, type ProductKey } from "@/lib/products";
import { initialsFor } from "@/lib/auth";
import { employees } from "@/lib/dashboard-data";
import insuro from "@/assets/insuro.png";
import { useAuth } from "./AuthProvider";
import { useModal } from "./ModalProvider";
import ThemeToggle from "./ThemeToggle";

/* ───────── Nav config ───────── */

type Leaf = {
  label: string;
  Icon: LucideIcon;
  href?: string;
  modal?: ModalType;
  badge?: string;
};
type Group = { label: string; Icon: LucideIcon; items: Leaf[] };
type Entry = Leaf | Group;

const isGroup = (e: Entry): e is Group => "items" in e;

// Explore: one link per insurance product
const exploreItems: Leaf[] = products.map((p) => ({
  label: p.title,
  Icon: p.Icon,
  href: `/plans?type=${p.key}`,
}));

// Claims: one modal per insurance product
const claimDefs: { key: ProductKey; label: string; modal: ModalType }[] = [
  { key: "health", label: "Health Insurance Claim", modal: "claim-health" },
  { key: "life", label: "Life Insurance Claim", modal: "claim-life" },
  { key: "motor", label: "Car Insurance Claim", modal: "claim-car" },
  {
    key: "electronics",
    label: "Device Insurance Claim",
    modal: "claim-electronics",
  },
  { key: "travel", label: "Travel Insurance Claim", modal: "claim-travel" },
  { key: "property", label: "Home & Property Claim", modal: "claim-property" },
  { key: "business", label: "Business & SME Claim", modal: "claim-business" },
  { key: "marine", label: "Marine & Transit Claim", modal: "claim-marine" },
  {
    key: "accident",
    label: "Personal Accident Claim",
    modal: "claim-accident",
  },
  {
    key: "agriculture",
    label: "Agricultural Claim",
    modal: "claim-agriculture",
  },
  {
    key: "specialised",
    label: "Specialised Commercial Claim",
    modal: "claim-specialised",
  },
];

const claimItems: Leaf[] = claimDefs.map(({ key, label, modal }) => ({
  label,
  modal,
  // Keep the original car and life icons; everything else uses the product icon
  Icon:
    key === "motor"
      ? CarFront
      : key === "life"
        ? HeartHandshake
        : getProduct(key)!.Icon,
}));

const nav: Entry[] = [
  { label: "Overview", Icon: LayoutDashboard, href: "/dashboard" },
  {
    label: "Employees",
    Icon: Users,
    href: "/dashboard/employees",
    badge: String(employees.length),
  },
  { label: "Active Plans", Icon: ClipboardList, href: "/dashboard/plans" },
  { label: "Payments", Icon: Wallet, href: "/dashboard/payments" },
  { label: "Explore", Icon: Compass, items: exploreItems },
  { label: "Claims", Icon: FileText, items: claimItems },
  {
    label: "Employee Services",
    Icon: Briefcase,
    items: [
      { label: "Annual Medicals", Icon: Stethoscope, modal: "service-medical" },
      {
        label: "Pre-Employment Checks",
        Icon: UserRoundCheck,
        modal: "service-preemployment",
      },
      { label: "Fitness to Work", Icon: HardHat, modal: "service-fitness" },
    ],
  },
];

const secondary: Leaf[] = [
  { label: "Settings", Icon: Settings, href: "/dashboard/settings" },
  { label: "Support", Icon: LifeBuoy, href: "/dashboard/support" },
];

/* ───────── Rows ───────── */

function Row({
  item,
  collapsed,
  nested,
  onNavigate,
}: {
  item: Leaf;
  collapsed: boolean;
  nested?: boolean;
  onNavigate?: () => void;
}) {
  const { openModal } = useModal();
  const pathname = usePathname();

  // Active when the route matches (links with ?query strings are never "active")
  const active =
    !!item.href &&
    !item.href.includes("?") &&
    (item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href));

  const cls = clsx(
    "flex items-center whitespace-nowrap rounded-full text-[13px] font-medium transition",
    collapsed
      ? "mx-auto h-11 w-11 justify-center"
      : clsx("w-full gap-3 px-4", nested ? "py-2" : "py-2.5"),
    active
      ? "bg-brand text-white shadow-[0_10px_25px_-10px_rgba(26,86,219,0.8)]"
      : "text-muted hover:bg-brand-soft hover:text-ink",
  );

  const inner = (
    <>
      <item.Icon size={nested ? 15 : 18} className="shrink-0" />
      {!collapsed && (
        <span className="flex-1 truncate text-left">{item.label}</span>
      )}
      {!collapsed && item.badge && (
        <span className="rounded-full bg-sky-400 px-2 py-0.5 text-[10px] font-bold text-[#0a0f1e]">
          {item.badge}
        </span>
      )}
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        title={collapsed ? item.label : undefined}
        aria-label={collapsed ? item.label : undefined}
        aria-current={active ? "page" : undefined}
        className={cls}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      title={collapsed ? item.label : undefined}
      aria-label={collapsed ? item.label : undefined}
      onClick={() => {
        if (!item.modal) return;
        onNavigate?.();
        openModal(item.modal);
      }}
      className={cls}
    >
      {inner}
    </button>
  );
}

function GroupRow({
  group,
  collapsed,
  isOpen,
  onToggle,
  onNavigate,
}: {
  group: Group;
  collapsed: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        title={collapsed ? group.label : undefined}
        aria-label={collapsed ? group.label : undefined}
        aria-expanded={!collapsed && isOpen}
        className={clsx(
          "flex items-center whitespace-nowrap rounded-full text-[13px] font-medium transition",
          collapsed
            ? "mx-auto h-11 w-11 justify-center"
            : "w-full gap-3 px-4 py-2.5",
          !collapsed && isOpen
            ? "bg-brand-soft text-brand"
            : "text-muted hover:bg-brand-soft hover:text-ink",
        )}
      >
        <group.Icon size={18} className="shrink-0" />
        {!collapsed && (
          <>
            <span className="flex-1 truncate text-left">{group.label}</span>
            <ChevronDown
              size={15}
              className={clsx(
                "shrink-0 transition-transform",
                isOpen && "rotate-180",
              )}
            />
          </>
        )}
      </button>

      {!collapsed && isOpen && (
        <div className="ml-[1.65rem] mt-1 space-y-0.5 border-l border-line pl-3">
          {group.items.map((item) => (
            <Row
              key={item.label}
              item={item}
              collapsed={false}
              nested
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ───────── Panel (shared by the desktop sidebar and the mobile drawer) ───────── */

function Panel({
  collapsed,
  mobile,
  openGroups,
  onToggleGroup,
  onToggleCollapse,
  onClose,
}: {
  collapsed: boolean;
  mobile?: boolean;
  openGroups: string[];
  onToggleGroup: (label: string) => void;
  onToggleCollapse?: () => void;
  onClose?: () => void;
}) {
  const { user, logout } = useAuth();

  const iconBtn =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line text-ink transition hover:border-brand hover:text-brand";
  const footerBtn =
    "flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-[13px] font-medium text-muted transition hover:bg-brand-soft hover:text-ink";

  function handleLogout() {
    onClose?.();
    logout();
  }

  return (
    <div
      className={clsx(
        "relative flex h-full flex-col overflow-hidden bg-surface",
        !mobile &&
          "rounded-4xl border border-line shadow-[0_20px_50px_-25px_rgba(15,58,140,0.35)]",
      )}
    >
      {/* Mobile decoration */}
      {mobile && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 -top-16 h-44 w-44 rounded-full bg-brand-soft opacity-80 blur-2xl"
          />
          <div
            aria-hidden
            className="animate-ring pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full border border-brand/15"
          />
        </>
      )}

      {/* Header */}
      <div
        className={clsx(
          "relative flex shrink-0 items-center",
          mobile
            ? "h-16 justify-between px-4"
            : clsx(
                "pb-4 pt-5",
                collapsed ? "justify-center px-3" : "justify-between px-5",
              ),
        )}
      >
        {collapsed ? (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Expand sidebar"
            title="Expand sidebar"
            className={iconBtn}
          >
            <PanelLeftOpen size={18} />
          </button>
        ) : (
          <>
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2.5"
            >
              <Image
                src={insuro}
                alt="Insuro Africa Logo"
                width={100}
                height={50}
                className={clsx(
                  "w-auto object-contain dark:brightness-0 dark:invert",
                  mobile ? "h-11" : "h-14",
                )}
                priority
              />
            </Link>
            {mobile ? (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand transition hover:bg-brand hover:text-white"
              >
                <X size={18} />
              </button>
            ) : (
              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
                className={iconBtn}
              >
                <PanelLeftClose size={18} />
              </button>
            )}
          </>
        )}
      </div>

      {!mobile && (
        <div
          className={clsx("border-t border-line", collapsed ? "mx-3" : "mx-5")}
        />
      )}

      {/* Scrollable nav (scrollbar hidden in every browser) */}
      <div
        className={clsx(
          "relative flex-1 overflow-y-auto [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden",
          mobile ? "px-3 pb-3 pt-1" : clsx("py-4", collapsed ? "px-3" : "px-4"),
        )}
      >
        {!collapsed &&
          user &&
          (mobile ? (
            <div className="relative mb-3 overflow-hidden rounded-2xl bg-linear-to-br from-brand via-brand to-brand-dark p-3 text-white">
              <div className="animate-ring absolute -right-8 -top-10 h-28 w-28 rounded-full border border-white/20" />
              <div className="relative flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[11px] font-extrabold ring-1 ring-white/30">
                  {initialsFor(user.company)}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-[13px] font-bold">
                    {user.company}
                  </div>
                  <div className="truncate text-[11px] text-white/70">
                    {user.name}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 flex items-center gap-3 rounded-2xl bg-canvas p-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-sky-400 to-brand text-[13px] font-extrabold text-white">
                {initialsFor(user.company)}
              </span>
              <div className="min-w-0">
                <div className="truncate text-[14px] font-bold text-ink">
                  {user.company}
                </div>
                <div className="truncate text-[11px] text-muted">
                  {user.name}
                </div>
              </div>
            </div>
          ))}

        <div className="space-y-1">
          {nav.map((entry) =>
            isGroup(entry) ? (
              <GroupRow
                key={entry.label}
                group={entry}
                collapsed={collapsed}
                isOpen={openGroups.includes(entry.label)}
                onToggle={() => onToggleGroup(entry.label)}
                onNavigate={onClose}
              />
            ) : (
              <Row
                key={entry.label}
                item={entry}
                collapsed={collapsed}
                onNavigate={onClose}
              />
            ),
          )}
        </div>

        <div className="my-3 border-t border-line" />

        <div className="space-y-1">
          {secondary.map((item) => (
            <Row
              key={item.label}
              item={item}
              collapsed={collapsed}
              onNavigate={onClose}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className={clsx(
          "relative shrink-0 border-t border-line",
          mobile
            ? "space-y-1 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
            : clsx("space-y-1", collapsed ? "p-3" : "p-4"),
        )}
      >
        {mobile ? (
          <>
            <ThemeToggle variant="segment" className="mb-1.5" />
            <Link href="/" onClick={onClose} className={footerBtn}>
              <ArrowLeft size={17} className="shrink-0" />
              Back to site
            </Link>
            <button type="button" onClick={handleLogout} className={footerBtn}>
              <LogOut size={17} className="shrink-0" />
              Log out
            </button>
          </>
        ) : collapsed ? (
          <div className="flex flex-col items-center gap-2">
            <ThemeToggle />
            <Link
              href="/"
              title="Back to site"
              aria-label="Back to site"
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:bg-brand-soft hover:text-ink"
            >
              <ArrowLeft size={18} />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              title="Log out"
              aria-label="Log out"
              className="flex h-10 w-10 items-center justify-center rounded-full text-muted transition hover:bg-brand-soft hover:text-ink"
            >
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <>
            <ThemeToggle variant="switch" />
            <Link href="/" className={footerBtn}>
              <ArrowLeft size={18} className="shrink-0" />
              Back to site
            </Link>
            <button type="button" onClick={handleLogout} className={footerBtn}>
              <LogOut size={18} className="shrink-0" />
              Log out
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ───────── Sidebar ───────── */

export default function DashboardSidebar({
  mobileOpen,
  onMobileClose,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>(["Explore"]);

  function toggleGroup(label: string) {
    // In the collapsed rail, clicking a group expands the sidebar and opens it
    if (collapsed) {
      setCollapsed(false);
      setOpenGroups((g) => (g.includes(label) ? g : [...g, label]));
      return;
    }
    setOpenGroups((g) =>
      g.includes(label) ? g.filter((x) => x !== label) : [...g, label],
    );
  }

  // Mobile drawer: Escape closes it + lock page scroll while it's open
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onMobileClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen, onMobileClose]);

  return (
    <>
      {/* Desktop / tablet: collapsible sidebar */}
      <aside
        className={clsx(
          "sticky top-0 hidden h-screen shrink-0 self-start p-3 transition-[width] duration-300 md:block",
          collapsed ? "w-23" : "w-[18rem]",
        )}
      >
        <Panel
          collapsed={collapsed}
          openGroups={openGroups}
          onToggleGroup={toggleGroup}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
      </aside>

      {/* Phones: half-width panel from the left + dimmed backdrop */}
      <div
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={clsx(
          "fixed inset-0 z-90 transition-[visibility] duration-300 md:hidden",
          mobileOpen ? "visible" : "invisible",
        )}
      >
        <div
          onClick={onMobileClose}
          className={clsx(
            "absolute inset-0 bg-[#0a0f1e]/55 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <aside
          className={clsx(
            "absolute inset-y-0 left-0 w-1/2 min-w-64 max-w-xs overflow-hidden rounded-r-3xl bg-surface shadow-[0_0_60px_-10px_rgba(10,15,30,0.5)] transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <Panel
            collapsed={false}
            mobile
            openGroups={openGroups}
            onToggleGroup={toggleGroup}
            onClose={onMobileClose}
          />
        </aside>
      </div>
    </>
  );
}
