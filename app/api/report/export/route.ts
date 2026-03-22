// app/api/report/export/route.ts
// Generates a clean HTML page the browser can print-to-PDF
// This avoids heavy PDF libraries — uses browser's native print dialog

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const caseId = req.nextUrl.searchParams.get("caseId");
  if (!caseId) return NextResponse.json({ error: "caseId required" }, { status: 400 });

  const report = await db.report.findFirst({
    where: { case: { id: caseId, user: { clerkId: userId } } },
    include: { case: { select: { title: true, mode: true, createdAt: true } } },
  });

  if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const breakdown = report.scoreBreakdown as Record<string, number>;
  const verifications = report.verifications as {
    category: string; label: string; status: string; note: string;
  }[];

  const scoreColor =
    report.score >= 70 ? "#12b76a" : report.score >= 50 ? "#f79009" : "#f04438";

  const statusColor: Record<string, string> = {
    "Verified":        "#12b76a",
    "Not Verified":    "#f04438",
    "Pending":         "#f79009",
    "Risk":            "#f04438",
    "Manual Required": "#2e90fa",
  };

  function formatKey(key: string): string {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim();
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>TalentProof AI — ${report.case.title}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #1a1a24; background: #fff; padding: 40px; line-height: 1.6; }
    h1 { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
    h2 { font-size: 14px; font-weight: 600; margin-bottom: 12px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 2px solid #e2e2ea; }
    .brand { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9898a8; margin-bottom: 6px; }
    .score-circle { width: 80px; height: 80px; border-radius: 50%; border: 4px solid ${scoreColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .score-number { font-size: 22px; font-weight: 700; color: ${scoreColor}; line-height: 1; }
    .score-label { font-size: 9px; color: #9898a8; }
    .recommendation { background: #ede9ff; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px; display: flex; gap: 10px; align-items: flex-start; }
    .rec-label { font-size: 11px; font-weight: 600; color: #5b4dff; margin-bottom: 2px; }
    .rec-text { font-size: 13px; font-weight: 500; color: #1a1a24; }
    .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
    .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px; }
    .card { border: 1px solid #e2e2ea; border-radius: 12px; padding: 18px; }
    .summary-text { font-size: 12px; color: #2a2a38; line-height: 1.7; }
    .bar-row { margin-bottom: 10px; }
    .bar-label { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px; color: #6b6b80; }
    .bar-label span:last-child { font-weight: 600; color: #1a1a24; }
    .bar-track { height: 6px; background: #e2e2ea; border-radius: 3px; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 3px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { text-align: left; padding: 8px 14px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9898a8; background: #f8f8fc; border-bottom: 1px solid #e2e2ea; }
    td { padding: 9px 14px; font-size: 11px; border-bottom: 1px solid #e2e2ea; vertical-align: top; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: 600; }
    .list-item { font-size: 11px; color: #2a2a38; margin-bottom: 6px; display: flex; gap: 6px; }
    .list-dot { flex-shrink: 0; margin-top: 2px; }
    .risk-box { background: #fee4e2; border: 1px solid #f04438; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px; }
    .risk-title { font-size: 12px; font-weight: 600; color: #f04438; margin-bottom: 8px; }
    .disclaimer { font-size: 10px; color: #9898a8; text-align: center; margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e2ea; }
    .section-title { font-size: 13px; font-weight: 600; margin-bottom: 12px; color: #0a0a0f; }
    @media print {
      body { padding: 20px; }
      @page { margin: 1.5cm; }
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand">TalentProof AI — Evaluation Report</div>
      <h1>${report.case.title}</h1>
      <p style="color:#6b6b80;font-size:12px;margin-top:4px;">
        ${report.case.mode === "RECRUITER" ? "Recruiter Assessment" : "Candidate Readiness Check"} &nbsp;·&nbsp;
        ${new Date(report.case.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
      </p>
    </div>
    <div style="text-align:center">
      <div class="score-circle">
        <div class="score-number">${Math.round(report.score)}</div>
        <div class="score-label">/ 100</div>
      </div>
    </div>
  </div>

  <div class="recommendation">
    <div>
      <div class="rec-label">AI Recommendation</div>
      <div class="rec-text">${report.recommendation}</div>
    </div>
  </div>

  <div class="grid2">
    <div class="card">
      <div class="section-title">Summary</div>
      <p class="summary-text">${report.summary}</p>
    </div>
    <div class="card">
      <div class="section-title">Score Breakdown</div>
      ${Object.entries(breakdown).map(([key, val]) => `
        <div class="bar-row">
          <div class="bar-label"><span>${formatKey(key)}</span><span>${Math.round(val)}%</span></div>
          <div class="bar-track"><div class="bar-fill" style="width:${Math.round(val)}%;background:${val >= 70 ? "#12b76a" : val >= 50 ? "#f79009" : "#f04438"}"></div></div>
        </div>
      `).join("")}
    </div>
  </div>

  ${verifications?.length > 0 ? `
  <div class="card" style="margin-bottom:20px">
    <div class="section-title">Verification Details</div>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Item</th>
          <th>Status</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        ${verifications.map(v => `
          <tr>
            <td style="color:#6b6b80">${v.category}</td>
            <td style="font-weight:500">${v.label}</td>
            <td><span class="badge" style="background:${statusColor[v.status] ?? "#f79009"}20;color:${statusColor[v.status] ?? "#f79009"}">${v.status}</span></td>
            <td style="color:#6b6b80">${v.note}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>
  ` : ""}

  <div class="grid3">
    <div class="card">
      <div class="section-title" style="color:#12b76a">Strengths</div>
      ${(report.strengths ?? []).map(s => `<div class="list-item"><span class="list-dot" style="color:#12b76a">•</span>${s}</div>`).join("") || "<p style='font-size:11px;color:#9898a8'>None noted.</p>"}
    </div>
    <div class="card">
      <div class="section-title" style="color:#f79009">Weaknesses</div>
      ${(report.weaknesses ?? []).map(s => `<div class="list-item"><span class="list-dot" style="color:#f79009">•</span>${s}</div>`).join("") || "<p style='font-size:11px;color:#9898a8'>None noted.</p>"}
    </div>
    <div class="card">
      <div class="section-title" style="color:#f04438">Missing Items</div>
      ${(report.missingItems ?? []).map(s => `<div class="list-item"><span class="list-dot" style="color:#f04438">•</span>${s}</div>`).join("") || "<p style='font-size:11px;color:#9898a8'>None noted.</p>"}
    </div>
  </div>

  ${(report.riskFlags ?? []).length > 0 ? `
  <div class="risk-box">
    <div class="risk-title">⚠ Risk Flags</div>
    ${report.riskFlags.map(f => `<div class="list-item"><span class="list-dot" style="color:#f04438">•</span>${f}</div>`).join("")}
  </div>
  ` : ""}

  <div class="disclaimer">
    This report is AI-assisted and for preliminary evaluation only. It does not replace official legal or institutional verification.<br/>
    Generated by TalentProof AI &nbsp;·&nbsp; ${new Date().toLocaleDateString()}
  </div>

  <script>window.onload = () => window.print();</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
