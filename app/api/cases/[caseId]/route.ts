// app/api/cases/[caseId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ caseId: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { caseId } = await params;

  const caseRecord = await db.case.findFirst({
    where: { id: caseId, user: { clerkId: userId } },
    include: {
      uploads: true,
      report: true,
    },
  });

  if (!caseRecord) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json({ case: caseRecord });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ caseId: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { caseId } = await params;

  const body = await req.json();
  const { jdText, companyPreferences, title } = body;

  const updated = await db.case.updateMany({
    where: { id: caseId, user: { clerkId: userId } },
    data: {
      ...(title !== undefined && { title }),
      ...(jdText !== undefined && { jdText }),
      ...(companyPreferences !== undefined && { companyPreferences }),
    },
  });

  return NextResponse.json({ updated });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ caseId: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { caseId } = await params;

  await db.case.deleteMany({
    where: { id: caseId, user: { clerkId: userId } },
  });

  return NextResponse.json({ deleted: true });
}
