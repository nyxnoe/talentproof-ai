// lib/parser/docx.ts
import mammoth from "mammoth";

export async function parseDocx(fileBuffer: Buffer): Promise<string> {
  try {
    const result = await mammoth.extractRawText({ buffer: fileBuffer });
    return result.value.trim();
  } catch (err) {
    console.error("[parseDocx] Error:", err);
    throw new Error("Failed to parse DOCX file.");
  }
}
