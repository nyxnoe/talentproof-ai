import { db } from "@/lib/db";
import { FileType } from "@prisma/client";
import { createWorker } from "tesseract.js";

export interface FieldZone {
  fieldId: string;
  label: string;
  zone: { x: number; y: number; w: number; h: number };
  anchorText: string | null;
}

export async function extractWithZoneTemplate(
  imageBuffer: Buffer,
  docWidth: number,
  docHeight: number,
  documentType: FileType
): Promise<Record<string, string>> {
  const template = await db.documentTemplate.findFirst({
    where: { documentType, active: true },
    orderBy: { version: "desc" },
  });
  if (!template) return {};

  const fields = template.fields as FieldZone[];
  const worker = await createWorker("eng");
  const results: Record<string, string> = {};

  for (const field of fields) {
    let rect = {
      left: Math.round(field.zone.x * docWidth),
      top: Math.round(field.zone.y * docHeight),
      width: Math.round(field.zone.w * docWidth),
      height: Math.round(field.zone.h * docHeight),
    };

    if (field.anchorText) {
      const adjusted = await findAnchorAndAdjust(worker, imageBuffer, field.anchorText, rect);
      if (adjusted) rect = adjusted;
    }

    const { data } = await worker.recognize(imageBuffer, { rectangle: rect });
    results[field.fieldId] = data.text.trim();
  }

  await worker.terminate();
  return results;
}

async function findAnchorAndAdjust(worker: any, buffer: Buffer, anchorText: string, fallbackRect: any) {
  const { data: { words } } = await worker.recognize(buffer);
  const matches = words.filter((w: any) =>
    anchorText.toLowerCase().includes(w.text.toLowerCase())
  );
  if (!matches.length) return null;

  const anchor = matches[0].bbox;
  return {
    left: fallbackRect.left + (anchor.x0 - fallbackRect.left) + 15,
    top: fallbackRect.top + (anchor.y0 - fallbackRect.top),
    width: fallbackRect.width,
    height: fallbackRect.height,
  };
}