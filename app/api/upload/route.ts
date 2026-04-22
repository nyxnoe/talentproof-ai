import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { uploadFileLocally } from "@/lib/storage";
import { parsePDF } from "@/lib/parser/pdf";
import { parseDocx } from "@/lib/parser/docx";
import { extractWithZoneTemplate } from "@/lib/extractor/templateExtractor";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const caseId = formData.get("caseId") as string;
    const fileType = formData.get("fileType") as string;

    if (!file || !caseId || !fileType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type;
    const isImage = mimeType.startsWith("image/");
    const isPDF = mimeType === "application/pdf";
    const isDocx = mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    // ── Upload to local storage ──
    const { storagePath, storageUrl } = await uploadFileLocally(buffer, file.name);

    // ── Extract text based on file type ──
    let extractedText = "";
    if (isPDF) {
      extractedText = await parsePDF(buffer);
    } else if (isDocx) {
      extractedText = await parseDocx(buffer);
    }
    // images: text extraction happens via zone extractor below

    // ── Zone extraction (images only) ──
    let structuredFields: Record<string, string> = {};
    if (isImage) {
      const normalized = await sharp(buffer).rotate().grayscale().toBuffer();
      const metadata = await sharp(normalized).metadata();
      structuredFields = await extractWithZoneTemplate(
        normalized,
        metadata.width ?? 0,
        metadata.height ?? 0,
        fileType as any
      );
    }

    // ── Save to DB ──
    const upload = await db.upload.create({
      data: {
        caseId,
        fileName: file.name,
        fileType: fileType as any,
        storagePath,
        storageUrl,
        extractedText,
        structuredFields,
        processingStatus: "PARSED",
      },
    });

    return NextResponse.json({ upload });

  } catch (err: any) {
    console.error("[UPLOAD ERROR]", err);
    return NextResponse.json(
      { error: err?.message ?? "Upload failed" },
      { status: 500 }
    );
  }
}