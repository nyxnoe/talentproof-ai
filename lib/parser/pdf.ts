// lib/parser/pdf.ts  (updated)
import pdf from "pdf-parse";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import os from "os";

export async function parsePDF(fileBuffer: Buffer): Promise<string> {
  try {
    const data = await pdf(fileBuffer);
    if (data.text.trim().length > 100) return data.text.trim();
    // Fallback: OCR via Tesseract
    return await ocrPDF(fileBuffer);
  } catch {
    return await ocrPDF(fileBuffer);
  }
}

async function ocrPDF(buffer: Buffer): Promise<string> {
  const tmpDir = os.tmpdir();
  const pdfPath = path.join(tmpDir, `${Date.now()}.pdf`);
  fs.writeFileSync(pdfPath, buffer);
  try {
    // pdftoppm → tesseract (install: apt-get install poppler-utils tesseract-ocr)
    execSync(`pdftoppm -r 200 ${pdfPath} ${pdfPath}-page`);
    const pages = fs.readdirSync(tmpDir)
      .filter(f => f.startsWith(path.basename(pdfPath) + "-page"));
    const texts = pages.sort().map(p => {
      const imgPath = path.join(tmpDir, p);
      return execSync(`tesseract ${imgPath} stdout`).toString();
    });
    return texts.join("\n\n").trim();
  } finally {
    fs.unlinkSync(pdfPath);
  }
}