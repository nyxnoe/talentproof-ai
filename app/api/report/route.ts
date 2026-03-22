// app/api/report/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// GET /api/report?caseId=xxx  — fetch report for a case
export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const caseId = req.nextUrl.searchParams.get("caseId");
  if (!caseId) return NextResponse.json({ error: "caseId required" }, { status: 400 });

  const report = await db.report.findFirst({
    where: { case: { id: caseId, user: { clerkId: userId } } },
    include: { case: { select: { title: true, mode: true, jdText: true, createdAt: true } } },
  });

  if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });

  return NextResponse.json({ report });
}
