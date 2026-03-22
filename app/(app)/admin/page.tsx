// app/(app)/admin/page.tsx
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Users, FileStack, CheckCircle2, AlertTriangle } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";

export default async function AdminPage() {
  const { userId } = await auth();

  // Verify admin role
  const user = await db.user.findUnique({ where: { clerkId: userId! } });
  if (!user || user.role !== "ADMIN") redirect("/dashboard");

  const [totalUsers, totalCases, completedCases, failedCases] = await Promise.all([
    db.user.count(),
    db.case.count(),
    db.case.count({ where: { status: "COMPLETED" } }),
    db.case.count({ where: { status: "FAILED" } }),
  ]);

  const recentCases = await db.case.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: {
      user: { select: { email: true } },
      report: { select: { score: true } },
    },
  });

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8 fade-up">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
          style={{ background: "var(--red-lt)", color: "var(--red)" }}
        >
          Admin Access
        </div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Admin Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8 fade-up fade-up-delay-1">
       <StatsCard icon="Users"        label="Total Users"  value={totalUsers}    color="accent" />
       <StatsCard icon="FileStack"    label="Total Cases"  value={totalCases}    color="blue" />
       <StatsCard icon="CheckCircle2" label="Completed"    value={completedCases} color="green" />
       <StatsCard icon="AlertTriangle" label="Failed"      value={failedCases}   color="red" />
      </div>

      {/* Recent cases table */}
      <div
        className="rounded-2xl border overflow-hidden fade-up fade-up-delay-2"
        style={{ background: "var(--white)", borderColor: "var(--line)" }}
      >
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--line)" }}>
          <h2 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
            Recent Cases (all users)
          </h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--surface)" }}>
              <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Case</th>
              <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>User</th>
              <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Mode</th>
              <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Status</th>
              <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Score</th>
            </tr>
          </thead>
          <tbody>
            {recentCases.map((c) => (
              <tr key={c.id} className="border-t" style={{ borderColor: "var(--line)" }}>
                <td className="px-6 py-3 text-xs font-medium">{c.title}</td>
                <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{c.user.email}</td>
                <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{c.mode}</td>
                <td className="px-6 py-3">
                  <span
                    className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                    style={{
                      background:
                        c.status === "COMPLETED" ? "var(--green-lt)" :
                        c.status === "PROCESSING" ? "var(--blue-lt)" :
                        c.status === "FAILED" ? "var(--red-lt)" : "var(--amber-lt)",
                      color:
                        c.status === "COMPLETED" ? "var(--green)" :
                        c.status === "PROCESSING" ? "var(--blue)" :
                        c.status === "FAILED" ? "var(--red)" : "var(--amber)",
                    }}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-xs font-bold" style={{
                  color: c.report?.score
                    ? c.report.score >= 70 ? "var(--green)" : c.report.score >= 50 ? "var(--amber)" : "var(--red)"
                    : "var(--ghost)"
                }}>
                  {c.report?.score ? `${Math.round(c.report.score)}%` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
