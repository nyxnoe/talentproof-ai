// components/dashboard/StatsCard.tsx
import { FileCheck, TrendingUp, Clock, AlertTriangle, LucideIcon, CheckCircle2, FileStack, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const colorMap: Record<string, { bg: string; icon: string }> = {
  accent: { bg: "var(--accent-lt)",  icon: "var(--accent)" },
  green:  { bg: "var(--green-lt)",   icon: "var(--green)" },
  amber:  { bg: "var(--amber-lt)",   icon: "var(--amber)" },
  blue:   { bg: "var(--blue-lt)",    icon: "var(--blue)" },
  red:    { bg: "var(--red-lt)",     icon: "var(--red)" },
};

interface Props {
  icon: string;
  label: string;
  value: string | number;
  color?: string;
  delay?: number;
}

const iconMap: Record<string, LucideIcon> = {
  FileCheck,
  TrendingUp,
  Clock,
  AlertTriangle,
  Users,
  FileStack,
  CheckCircle2,
};

export default function StatsCard({ icon, label, value, color = "accent", delay = 0 }: Props) {
  const c = colorMap[color] ?? colorMap.accent;
  const Icon = iconMap[icon];

  return (
    <div
      className={cn("rounded-xl p-5 border fade-up", `fade-up-delay-${delay}`)}
      style={{ background: "var(--white)", borderColor: "var(--line)" }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
        style={{ background: c.bg }}
      >
        {Icon && <Icon size={16} style={{ color: c.icon }} />}
      </div>
      <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
        {value}
      </div>
      <div className="text-xs" style={{ color: "var(--muted)" }}>
        {label}
      </div>
    </div>
  );
}