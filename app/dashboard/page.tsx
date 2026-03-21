// app/(app)/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, TrendingUp, FileCheck, AlertTriangle, Clock } from "lucide-react";
import CaseCard from "@/components/dashboard/CaseCard";
import StatsCard from "@/components/dashboard/StatsCard";

export default async function DashboardPage() {
  const { userId } = await auth();

  const user = userId
    ? await db.user.findUnique({
        where: { clerkId: userId },
        include: {
          cases: {
            orderBy: { createdAt: "desc" },
            take: 6,
            include: {
              uploads: { select: { id: true } },
              report: { select: { score: true, recommendation: true } },
            },
          },
        },
      })
    : null;

  const cases = user?.cases ?? [];
  const completed  = cases.filter((c) => c.status === "COMPLETED").length;
  const processing = cases.filter((c) => c.status === "PROCESSING").length;
  const avgScore   = completed
    ? Math.round(cases.filter((c) => c.report).reduce((s, c) => s + (c.report?.score ?? 0), 0) / completed)
    : 0;

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8 fade-up">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            Dashboard
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Manage your evaluation cases and candidate reports
          </p>
        </div>
        <Link
          href="/cases/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: "var(--accent)" }}
        >
          <Plus size={15} />
          New Evaluation Case
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <StatsCard icon={FileCheck}      label="Total Cases"   value={cases.length} color="accent" delay={1} />
        <StatsCard icon={TrendingUp}     label="Completed"     value={completed}     color="green"  delay={2} />
        <StatsCard icon={Clock}          label="Processing"    value={processing}    color="amber"  delay={3} />
        <StatsCard icon={AlertTriangle}  label="Avg Score"     value={avgScore ? `${avgScore}%` : "—"} color="blue" delay={4} />
      </div>

      {/* Recent Cases */}
      <div className="fade-up fade-up-delay-3">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Recent Cases
          </h2>
          <Link href="/cases" className="text-sm" style={{ color: "var(--accent)" }}>
            View all →
          </Link>
        </div>

        {cases.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {cases.map((c) => (
              <CaseCard key={c.id} case={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-16 text-center"
      style={{ borderColor: "var(--line)" }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: "var(--accent-lt)" }}
      >
        <FileCheck size={22} style={{ color: "var(--accent)" }} />
      </div>
      <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
        No cases yet
      </h3>
      <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
        Create your first evaluation case to get started
      </p>
      <Link
        href="/cases/new"
        className="px-4 py-2 rounded-lg text-sm font-medium text-white"
        style={{ background: "var(--accent)" }}
      >
        Create Case
      </Link>
    </div>
  );
}