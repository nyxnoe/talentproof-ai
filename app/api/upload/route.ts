import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { uploadFileLocally } from "@/lib/storage";
import { parsePDF } from "@/lib/parser/pdf";
import { extractWithZoneTemplate } from "@/lib/extractor/zoneExtractor";
import sharp from "sharp";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File;
  const caseId = formData.get("caseId") as string;
  const fileType = formData.get("fileType") as string;

  const buffer = Buffer.from(await file.arrayBuffer());
  const { storagePath, storageUrl } = await uploadFileLocally(buffer, file.name);

  // Normalize & get dimensions for zone extraction
  const normalized = await sharp(buffer).rotate().grayscale().toBuffer();
  const metadata = await sharp(normalized).metadata();

  let extractedText = await parsePDF(buffer);
  const structuredFields = await extractWithZoneTemplate(
    normalized,
    metadata.width!,
    metadata.height!,
    fileType as any
  );

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
}