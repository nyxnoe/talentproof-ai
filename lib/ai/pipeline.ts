import { callOllama } from "./ollama";
import { parsePDF } from "../parser/pdf";
import { calculateScore } from "../scoring/score";

export async function runEvaluationPipeline(input: any) {
  const allText = input.uploads.map((u: any) => u.extractedText || "").join("\n\n");
  const structured = input.uploads.map((u: any) => u.structuredFields || {}).reduce((a: any, b: any) => ({ ...a, ...b }), {});

  const prompt = `You are an expert recruiter. Use the structured fields below and the raw text.

STRUCTURED FIELDS FROM ADMIN TEMPLATE:
${JSON.stringify(structured, null, 2)}

RAW DOCUMENT TEXT:
${allText}

Job Description:
${input.jdText || "General role"}

Return ONLY valid JSON with summary, strengths, weaknesses, missingItems, riskFlags, recommendation, scoreBreakdown, verifications.`;

  const raw = await callOllama(prompt);
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const analysis = JSON.parse(cleaned);

  const finalScore = calculateScore(analysis.scoreBreakdown);

  return { analysis, finalScore };
}