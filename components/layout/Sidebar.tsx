"use client";
// components/layout/Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  FileText,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",      label: "Dashboard",   icon: LayoutDashboard },
  { href: "/cases",          label: "My Cases",    icon: FolderOpen },
  { href: "/cases/new",      label: "New Case",    icon: PlusCircle },
  { href: "/reports",        label: "Reports",     icon: FileText },
  { href: "/settings",       label: "Settings",    icon: Settings },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside
      style={{ background: "var(--ink)", color: "var(--white)" }}
      className="fixed inset-y-0 left-0 w-60 flex flex-col z-30"
    >
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--accent)" }}
          >
            <ShieldCheck size={16} color="white" />
          </div>
          <span
            className="text-[17px] font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--white)" }}
          >
            TalentProof
          </span>
        </div>
        <p className="text-[11px] mt-1 opacity-40 tracking-widest uppercase">AI Platform</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = path === href || (href !== "/dashboard" && path.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all",
                active
                  ? "text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
              style={active ? { background: "var(--accent)", color: "white" } : {}}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">
        <UserButton afterSignOutUrl="/" />
        <span className="text-[12px] text-white/40">Account</span>
      </div>
    </aside>
  );
}