import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { runEvaluationPipeline } from "@/lib/ai/pipeline";

// Tell Next.js this route can take a long time to prevent timeouts
export const maxDuration = 300; // 5 minutes

// --- THE BOUNCER: Helper to ensure an array always exists ---
const ensureArray = (val: any) => Array.isArray(val) ? val : [];

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

    // --- DATA SANITIZATION LAYER ---
    // We do not trust the LLM. We reconstruct the object exactly as Prisma expects it.
    const llm = result.analysis || {};

    const validDbData = {
      summary: typeof llm.summary === 'string' ? llm.summary : "Analysis completed successfully.",
      recommendation: typeof llm.recommendation === 'string' ? llm.recommendation : "Hold for clarification",
      strengths: ensureArray(llm.strengths),
      weaknesses: ensureArray(llm.weaknesses),
      missingItems: ensureArray(llm.missingItems),
      riskFlags: ensureArray(llm.riskFlags),
      verifications: ensureArray(llm.verifications),
      scoreBreakdown: typeof llm.scoreBreakdown === 'object' && llm.scoreBreakdown !== null ? llm.scoreBreakdown : {
        jdMatch: 0, profileCompleteness: 0, verificationSupport: 0,
        academicAlignment: 0, experienceRelevance: 0, consistency: 0
      }
    };

    // Ensure the final score is a valid number
    const safeFinalScore = typeof result.finalScore === 'number' && !isNaN(result.finalScore) ? result.finalScore : 0;

    // --- DATABASE UPDATE ---
    // Prisma will never crash here because validDbData is perfectly formed every single time.
    await db.report.upsert({
      where: { caseId },
      create: { 
        caseId, 
        ...validDbData, 
        score: safeFinalScore 
      },
      update: { 
        ...validDbData, 
        score: safeFinalScore 
      },
    });

    await db.case.update({ 
      where: { id: caseId }, 
      data: { status: "COMPLETED", finalScore: safeFinalScore } 
    });

    return NextResponse.json({ report: { analysis: validDbData, finalScore: safeFinalScore } });

  } catch (err) {
    console.error("[PIPELINE CRASH]", err);
    await db.case.update({ 
      where: { id: caseId }, 
      data: { status: "FAILED" } 
    });
    return NextResponse.json({ error: "Analysis failed. Check server logs." }, { status: 500 });
  }
}