// lib/parser/pdf.ts
import pdf from "pdf-parse";

export async function parsePDF(fileBuffer: Buffer): Promise<string> {
  try {
    const data = await pdf(fileBuffer);
    return data.text.trim();
  } catch (err) {
    console.error("[parsePDF] Error:", err);
    throw new Error("Failed to parse PDF. File may be corrupted or scanned.");
  }
}
