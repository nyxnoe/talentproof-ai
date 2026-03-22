"use client";
// components/dashboard/CaseCard.tsx
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { FileStack, ChevronRight } from "lucide-react";

const statusStyles: Record<string, { label: string; bg: string; color: string }> = {
  PENDING:    { label: "Pending",    bg: "var(--amber-lt)", color: "var(--amber)" },
  PROCESSING: { label: "Processing", bg: "var(--blue-lt)",  color: "var(--blue)" },
  COMPLETED:  { label: "Completed",  bg: "var(--green-lt)", color: "var(--green)" },
  FAILED:     { label: "Failed",     bg: "var(--red-lt)",   color: "var(--red)" },
};

interface Props {
  case: {
    id: string;
    title: string;
    mode: string;
    status: string;
    finalScore: number | null;
    createdAt: Date;
    uploads: { id: string }[];
    report: { score: number; recommendation: string } | null;
  };
}

export default function CaseCard({ case: c }: Props) {
  const st = statusStyles[c.status] ?? statusStyles.PENDING;
  const score = c.report?.score ?? c.finalScore;

  return (
    <Link
      href={c.status === "COMPLETED" ? `/report/${c.id}` : `/cases/${c.id}`}
      className="block rounded-xl border p-5 transition-all hover:shadow-md hover:-translate-y-0.5 group"
      style={{ background: "var(--white)", borderColor: "var(--line)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--surface)" }}
          >
            <FileStack size={14} style={{ color: "var(--muted)" }} />
          </div>
          <div>
            <h3
              className="font-semibold text-sm leading-tight line-clamp-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {c.title}
            </h3>
            <span className="text-[11px]" style={{ color: "var(--ghost)" }}>
              {c.mode === "RECRUITER" ? "Recruiter Mode" : "Candidate Mode"}
            </span>
          </div>
        </div>
        <ChevronRight
          size={15}
          className="transition-transform group-hover:translate-x-0.5"
          style={{ color: "var(--ghost)" }}
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{ background: st.bg, color: st.color }}
          >
            {st.label}
          </span>
          <span className="text-[11px]" style={{ color: "var(--ghost)" }}>
            {c.uploads.length} file{c.uploads.length !== 1 ? "s" : ""}
          </span>
        </div>
        {score != null ? (
          <div
            className="text-sm font-bold"
            style={{
              color:
                score >= 70 ? "var(--green)" : score >= 50 ? "var(--amber)" : "var(--red)",
              fontFamily: "var(--font-display)",
            }}
          >
            {Math.round(score)}%
          </div>
        ) : (
          <span className="text-[11px]" style={{ color: "var(--ghost)" }}>
            {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
          </span>
        )}
      </div>
    </Link>
  );
}
