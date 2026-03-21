// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { uploadFileToStorage } from "@/lib/storage";
import { parsePDF } from "@/lib/parser/pdf";
import { parseDocx } from "@/lib/parser/docx";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const caseId = formData.get("caseId") as string;
  const fileType = formData.get("fileType") as string;

  if (!file || !caseId || !fileType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Verify case belongs to user
  const caseRecord = await db.case.findFirst({
    where: { id: caseId, user: { clerkId: userId } },
  });
  if (!caseRecord) return NextResponse.json({ error: "Case not found" }, { status: 404 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type;

  // Upload to Supabase Storage
  const storageUrl = await uploadFileToStorage(buffer, file.name, mimeType);

  // Extract text based on file type
  let extractedText: string | null = null;
  try {
    if (mimeType === "application/pdf") {
      extractedText = await parsePDF(buffer);
    } else if (
      mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extractedText = await parseDocx(buffer);
    }
  } catch (err) {
    console.error("[upload] Text extraction failed:", err);
    // Don't fail upload if extraction fails — just store without text
  }

  const upload = await db.upload.create({
    data: {
      caseId,
      fileName: file.name,
      fileType: fileType as any,
      storageUrl,
      extractedText,
      processingStatus: extractedText ? "PARSED" : "PENDING",
    },
  });

  return NextResponse.json({ upload });
}