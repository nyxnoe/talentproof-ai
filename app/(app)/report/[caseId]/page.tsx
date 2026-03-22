// app/(app)/report/[caseId]/page.tsx
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getScoreLabel } from "@/lib/scoring/score";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, AlertTriangle, CheckCircle2, Clock, XCircle, HelpCircle } from "lucide-react";
import PrintButton from "@/components/report/PrintButton";

export default async function ReportPage({ params }: { params: Promise<{ caseId: string }> }) {
  const { userId } = await auth();
  const { caseId } = await params;

  const report = await db.report.findFirst({
    where: { case: { id: caseId, user: { clerkId: userId! } } },
    include: { case: { select: { title: true, mode: true, jdText: true } } },
  });

  if (!report) return notFound();

  const scoreInfo = getScoreLabel(report.score);
  const breakdown = report.scoreBreakdown as Record<string, number>;
  const verifications = report.verifications as {
    category: string; label: string; status: string; note: string;
  }[];

  return (
    <div className="p-8 max-w-4xl fade-up">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm transition-colors hover:opacity-70"
          style={{ color: "var(--muted)" }}
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <PrintButton caseId={caseId} />
      </div>

      {/* Header card */}
      <div
        className="rounded-2xl p-7 mb-6 border"
        style={{ background: "var(--white)", borderColor: "var(--line)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--ghost)" }}>
              Evaluation Report
            </p>
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
              {report.case.title}
            </h1>
            <p className="text-sm" style={{ color: "var(--muted)" }}>
              {report.case.mode === "RECRUITER" ? "Recruiter Assessment" : "Candidate Readiness Check"}
            </p>
          </div>

          {/* Score circle */}
          <div className="flex flex-col items-center">
            <div
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center border-4"
              style={{
                borderColor:
                  report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
              }}
            >
              <span
                className="text-2xl font-bold leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  color: report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
                }}
              >
                {Math.round(report.score)}
              </span>
              <span className="text-[10px]" style={{ color: "var(--ghost)" }}>/ 100</span>
            </div>
            <span
              className="text-xs font-medium mt-2 px-2 py-0.5 rounded-full"
              style={{
                background: report.score >= 70 ? "var(--green-lt)" : report.score >= 50 ? "var(--amber-lt)" : "var(--red-lt)",
                color: report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
              }}
            >
              {scoreInfo.label}
            </span>
          </div>
        </div>

        {/* Recommendation banner */}
        <div
          className="mt-5 flex items-center gap-3 p-4 rounded-xl"
          style={{ background: "var(--accent-lt)" }}
        >
          <ShieldCheck size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
          <div>
            <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>AI Recommendation</p>
            <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{report.recommendation}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Summary */}
        <ReportSection title="Summary">
          <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{report.summary}</p>
        </ReportSection>

        {/* Score Breakdown */}
        <ReportSection title="Score Breakdown">
          <div className="space-y-3">
            {Object.entries(breakdown).map(([key, val]) => (
              <div key={key}>
                <div className="flex justify-between text-xs mb-1">
                  <span style={{ color: "var(--muted)" }}>{formatKey(key)}</span>
                  <span className="font-semibold" style={{ color: "var(--ink)" }}>{Math.round(val)}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.round(val)}%`,
                      background: val >= 70 ? "var(--green)" : val >= 50 ? "var(--amber)" : "var(--red)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </ReportSection>
      </div>

      {/* Verification Table */}
      {verifications?.length > 0 && (
        <div
          className="rounded-2xl border mb-6 overflow-hidden"
          style={{ background: "var(--white)", borderColor: "var(--line)" }}
        >
          <div className="px-6 py-4 border-b" style={{ borderColor: "var(--line)" }}>
            <h2 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>Verification Details</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface)" }}>
                <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Category</th>
                <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Item</th>
                <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Note</th>
              </tr>
            </thead>
            <tbody>
              {verifications.map((v, i) => (
                <tr
                  key={i}
                  className="border-t"
                  style={{ borderColor: "var(--line)" }}
                >
                  <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{v.category}</td>
                  <td className="px-6 py-3 text-xs font-medium">{v.label}</td>
                  <td className="px-6 py-3">
                    <VerificationBadge status={v.status} />
                  </td>
                  <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{v.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="grid grid-cols-3 gap-6 mb-6">
        <ListSection title="Strengths" items={report.strengths} color="green" />
        <ListSection title="Weaknesses" items={report.weaknesses} color="amber" />
        <ListSection title="Missing Items" items={report.missingItems} color="red" />
      </div>

      {report.riskFlags?.length > 0 && (
        <div
          className="rounded-2xl border p-6 mb-6"
          style={{ background: "var(--red-lt)", borderColor: "var(--red)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={15} style={{ color: "var(--red)" }} />
            <h2 className="font-semibold text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--red)" }}>
              Risk Flags
            </h2>
          </div>
          <ul className="space-y-1.5">
            {report.riskFlags.map((flag, i) => (
              <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--red)" }}>
                <span className="mt-1">•</span> {flag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-center mt-4" style={{ color: "var(--ghost)" }}>
        This report is AI-assisted and for preliminary evaluation only. It does not replace official verification.
      </p>
    </div>
  );
}

function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl border p-6"
      style={{ background: "var(--white)", borderColor: "var(--line)" }}
    >
      <h2
        className="font-semibold mb-4"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

function ListSection({ title, items, color }: { title: string; items: string[]; color: string }) {
  const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
    green: { bg: "var(--white)",    text: "var(--green)", dot: "var(--green)" },
    amber: { bg: "var(--white)",    text: "var(--amber)", dot: "var(--amber)" },
    red:   { bg: "var(--white)",    text: "var(--red)",   dot: "var(--red)" },
  };
  const c = colorMap[color];

  return (
    <div
      className="rounded-2xl border p-5"
      style={{ background: c.bg, borderColor: "var(--line)" }}
    >
      <h2
        className="font-semibold text-sm mb-3"
        style={{ fontFamily: "var(--font-display)", color: c.text }}
      >
        {title}
      </h2>
      {items?.length === 0 ? (
        <p className="text-xs" style={{ color: "var(--ghost)" }}>None noted.</p>
      ) : (
        <ul className="space-y-1.5">
          {items?.map((item, i) => (
            <li key={i} className="text-xs flex items-start gap-2">
              <span style={{ color: c.dot, marginTop: "3px", flexShrink: 0 }}>•</span>
              <span style={{ color: "var(--ink)" }}>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function VerificationBadge({ status }: { status: string }) {
  const map: Record<string, { icon: React.ReactNode; label: string; style: React.CSSProperties }> = {
    "Verified":           { icon: <CheckCircle2 size={11} />, label: "Verified",   style: { background: "var(--green-lt)", color: "var(--green)" } },
    "Not Verified":       { icon: <XCircle size={11} />,      label: "Not Verified",style: { background: "var(--red-lt)",   color: "var(--red)" } },
    "Pending":            { icon: <Clock size={11} />,         label: "Pending",    style: { background: "var(--amber-lt)", color: "var(--amber)" } },
    "Risk":               { icon: <AlertTriangle size={11} />, label: "Risk",       style: { background: "var(--red-lt)",   color: "var(--red)" } },
    "Manual Required":    { icon: <HelpCircle size={11} />,    label: "Manual",     style: { background: "var(--blue-lt)",  color: "var(--blue)" } },
  };
  const cfg = map[status] ?? map["Pending"];
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
      style={cfg.style}
    >
      {cfg.icon} {cfg.label}
    </span>
  );
}

function formatKey(key: string): string {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim();
}
