// app/(app)/reports/page.tsx
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Link from "next/link";
import { getScoreColor, getScoreBg } from "@/lib/scoring/score";
import { ArrowRight, FileText, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default async function ReportsPage() {
  const { userId } = await auth();

  const user = userId
    ? await db.user.findUnique({
        where: { clerkId: userId },
        include: {
          cases: {
            where: { status: "COMPLETED" },
            orderBy: { createdAt: "desc" },
            include: {
              report: true,
            },
          },
        },
      })
    : null;

  const cases = user?.cases ?? [];

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8 fade-up">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Reports
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          All completed evaluations — {cases.length} report{cases.length !== 1 ? "s" : ""}
        </p>
      </div>

      {cases.length === 0 ? (
        <div
          className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-20 text-center fade-up"
          style={{ borderColor: "var(--line)" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ background: "var(--accent-lt)" }}
          >
            <FileText size={20} style={{ color: "var(--accent)" }} />
          </div>
          <p className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
            No completed reports yet
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
            Complete an evaluation case to see reports here
          </p>
          <Link
            href="/cases/new"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: "var(--accent)" }}
          >
            Create a case
          </Link>
        </div>
      ) : (
        <div className="space-y-3 fade-up fade-up-delay-1">
          {cases.map((c) => {
            const score = c.report?.score ?? 0;
            return (
              <Link
                key={c.id}
                href={`/report/${c.id}`}
                className="flex items-center justify-between p-5 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5 group"
                style={{ background: "var(--white)", borderColor: "var(--line)" }}
              >
                <div className="flex items-center gap-4">
                  {/* Score badge */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
                    style={{
                      background: getScoreBg(score),
                      color: getScoreColor(score),
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {Math.round(score)}
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-sm mb-0.5"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {c.title}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "var(--surface)", color: "var(--muted)" }}
                      >
                        {c.mode === "RECRUITER" ? "Recruiter" : "Candidate"}
                      </span>
                      <span className="flex items-center gap-1 text-xs" style={{ color: "var(--ghost)" }}>
                        <Calendar size={10} />
                        {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {c.report?.recommendation && (
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full hidden sm:block"
                      style={{
                        background: getScoreBg(score),
                        color: getScoreColor(score),
                      }}
                    >
                      {c.report.recommendation}
                    </span>
                  )}
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                    style={{ color: "var(--ghost)" }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
