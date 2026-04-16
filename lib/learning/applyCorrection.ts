import { db } from "@/lib/db";

export async function getExtractionHints(fileType: string) {
  // Pull recent corrections for this file type to adjust prompts dynamically
  const corrections = await db.adminCorrection.findMany({
    where: { correctionType: "WRONG_EXTRACTION", template: { fileType: fileType as any } },
    orderBy: { appliedAt: "desc" },
    take: 20,
  });

  if (!corrections.length) return "";
  
  const hints = corrections
    .map(c => `- Field "${c.field}": was extracted as "${c.originalValue}", correct value is "${c.correctedValue}"`)
    .join("\n");

  return `\n\nPAST CORRECTION HINTS (admin verified):\n${hints}\nPlease avoid these extraction mistakes.`;
}