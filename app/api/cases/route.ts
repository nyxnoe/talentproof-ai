// app/api/cases/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// GET — list all cases for current user
export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cases = await db.case.findMany({
    where: { user: { clerkId: userId } },
    include: { uploads: { select: { id: true, fileType: true, processingStatus: true } }, report: { select: { score: true, recommendation: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ cases });
}

// POST — create new case
export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, mode, jdText, companyPreferences } = body;

  if (!title || !mode) {
    return NextResponse.json({ error: "title and mode are required" }, { status: 400 });
  }

  // Ensure user exists in DB
  const user = await db.user.upsert({
    where: { clerkId: userId },
    create: { clerkId: userId, email: body.email ?? "", role: mode === "RECRUITER" ? "RECRUITER" : "CANDIDATE" },
    update: {},
  });

  const newCase = await db.case.create({
    data: { title, userId: user.id, mode, jdText, companyPreferences },
  });

  return NextResponse.json({ case: newCase }, { status: 201 });
}
