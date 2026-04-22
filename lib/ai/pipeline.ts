import { callOllama } from "./ollama";
import { calculateScore } from "../scoring/score";

const MAX_CHARS = 12000; // keep prompt under ~3000 tokens

export async function runEvaluationPipeline(input: any) {
  const allText = input.uploads
    .map((u: any) => u.extractedText || "")
    .join("\n\n")
    .slice(0, MAX_CHARS); // truncate to prevent timeout

  const structured = input.uploads
    .map((u: any) => u.structuredFields || {})
    .reduce((a: any, b: any) => ({ ...a, ...b }), {});

  const prompt = `You are an expert recruiter. Analyse the candidate documents below.

STRUCTURED FIELDS:
${JSON.stringify(structured, null, 2)}

DOCUMENT TEXT:
${allText}

JOB DESCRIPTION:
${(input.jdText || "General role").slice(0, 2000)}

Return ONLY valid JSON — no markdown, no explanation:
{
  "summary": "string",
  "strengths": ["string"],
  "weaknesses": ["string"],
  "missingItems": ["string"],
  "riskFlags": ["string"],
  "recommendation": "Proceed | Proceed with manual verification | Hold for clarification | Reject",
  "candidateMessage": "string",
  "scoreBreakdown": {
    "jdMatch": 0,
    "profileCompleteness": 0,
    "verificationSupport": 0,
    "academicAlignment": 0,
    "experienceRelevance": 0,
    "consistency": 0
  },
  "verifications": [
    { "category": "string", "label": "string", "status": "Verified|Not Verified|Pending|Risk|Manual Required", "note": "string" }
  ]
}`;

  const raw = await callOllama(prompt);
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const analysis = JSON.parse(cleaned);
  const finalScore = calculateScore(analysis.scoreBreakdown);

  return { analysis, finalScore };
}