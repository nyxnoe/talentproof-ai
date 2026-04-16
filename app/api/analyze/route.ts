import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { runEvaluationPipeline } from "@/lib/ai/pipeline";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { caseId } = await req.json();

  const caseRecord = await db.case.findFirst({
    where: { id: caseId, user: { clerkId: userId } },
    include: { uploads: true },
  });

  if (!caseRecord || !caseRecord.uploads.length) {
    return NextResponse.json({ error: "No files" }, { status: 400 });
  }

  await db.case.update({ where: { id: caseId }, data: { status: "PROCESSING" } });

  try {
    const result = await runEvaluationPipeline({
      caseId,
      uploads: caseRecord.uploads,
      jdText: caseRecord.jdText,
      companyPreferences: caseRecord.companyPreferences,
      mode: caseRecord.mode,
    });

    await db.report.upsert({
      where: { caseId },
      create: { caseId, ...result.analysis, score: result.finalScore, scoreBreakdown: result.analysis.scoreBreakdown, verifications: result.analysis.verifications },
      update: { ...result.analysis, score: result.finalScore, scoreBreakdown: result.analysis.scoreBreakdown, verifications: result.analysis.verifications },
    });

    await db.case.update({ where: { id: caseId }, data: { status: "COMPLETED", finalScore: result.finalScore } });

    return NextResponse.json({ report: result });
  } catch (err) {
    console.error(err);
    await db.case.update({ where: { id: caseId }, data: { status: "FAILED" } });
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}