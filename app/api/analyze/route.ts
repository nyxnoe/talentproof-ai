// app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { runEvaluationPipeline } from "@/lib/ai/pipeline";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { caseId } = await req.json();
  if (!caseId) return NextResponse.json({ error: "caseId required" }, { status: 400 });

  // Fetch case with uploads
  const caseRecord = await db.case.findFirst({
    where: { id: caseId, user: { clerkId: userId } },
    include: { uploads: true },
  });

  if (!caseRecord) return NextResponse.json({ error: "Case not found" }, { status: 404 });

  if (!caseRecord.uploads.length) {
    return NextResponse.json({ error: "No files uploaded yet" }, { status: 400 });
  }

  // Mark as processing
  await db.case.update({ where: { id: caseId }, data: { status: "PROCESSING" } });

  try {
    const result = await runEvaluationPipeline({
      caseId,
      uploads: caseRecord.uploads,
      jdText: caseRecord.jdText,
      companyPreferences: caseRecord.companyPreferences,
      mode: caseRecord.mode,
    });

    // Save report
    const report = await db.report.upsert({
      where: { caseId },
      create: {
        caseId,
        summary: result.analysis.summary,
        strengths: result.analysis.strengths,
        weaknesses: result.analysis.weaknesses,
        missingItems: result.analysis.missingItems,
        riskFlags: result.analysis.riskFlags,
        recommendation: result.analysis.recommendation,
        score: result.finalScore,
        scoreBreakdown: result.analysis.scoreBreakdown,
        verifications: result.analysis.verifications,
      },
      update: {
        summary: result.analysis.summary,
        strengths: result.analysis.strengths,
        weaknesses: result.analysis.weaknesses,
        missingItems: result.analysis.missingItems,
        riskFlags: result.analysis.riskFlags,
        recommendation: result.analysis.recommendation,
        score: result.finalScore,
        scoreBreakdown: result.analysis.scoreBreakdown,
        verifications: result.analysis.verifications,
      },
    });

    await db.case.update({
      where: { id: caseId },
      data: { status: "COMPLETED", finalScore: result.finalScore },
    });

    return NextResponse.json({ report });
  } catch (err) {
    console.error("[analyze] Pipeline error:", err);
    await db.case.update({ where: { id: caseId }, data: { status: "FAILED" } });
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}