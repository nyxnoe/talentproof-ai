// lib/ai/pipeline.ts
// Multi-step evaluation pipeline — this is the "brain" of TalentProof AI

import { extractCandidateProfile, parseJobDescription, analyzeCandidateFull, AnalysisResult } from "./gemini";
import { parsePDF } from "../parser/pdf";
import { parseDocx } from "../parser/docx";
import { calculateScore } from "../scoring/score";

export interface PipelineInput {
  caseId: string;
  uploads: { fileType: string; storageUrl: string; extractedText?: string | null }[];
  jdText?: string | null;
  companyPreferences?: string | null;
  mode: "RECRUITER" | "CANDIDATE";
}

export interface PipelineOutput {
  profile: object;
  jobDescription: object;
  analysis: AnalysisResult;
  finalScore: number;
}

export async function runEvaluationPipeline(input: PipelineInput): Promise<PipelineOutput> {
  console.log(`[Pipeline] Starting for case ${input.caseId}`);

  // ── Step 1: Aggregate all extracted text ──
  const allText = input.uploads
    .map((u) => u.extractedText ?? "")
    .filter(Boolean)
    .join("\n\n---\n\n");

  if (!allText.trim()) {
    throw new Error("No extracted text available. Ensure documents were parsed first.");
  }

  // ── Step 2: Extract candidate profile ──
  console.log("[Pipeline] Step 2: Extracting candidate profile...");
  const profile = await extractCandidateProfile(allText);

  // ── Step 3: Parse JD (if provided) ──
  console.log("[Pipeline] Step 3: Parsing job description...");
  const jobDescription = input.jdText
    ? await parseJobDescription(input.jdText)
    : { title: "General Role", requiredSkills: [], preferredSkills: [], requiredExperience: "", requiredEducation: "", requiredCertifications: [], responsibilities: [] };

  // ── Step 4: Full analysis ──
  console.log("[Pipeline] Step 4: Running full candidate analysis...");
  const documentTypes = input.uploads.map((u) => u.fileType);
  const analysis = await analyzeCandidateFull({
    profile,
    jobDescription,
    documentTypes,
    companyPreferences: input.companyPreferences ?? undefined,
  });

  // ── Step 5: Calculate final score ──
  console.log("[Pipeline] Step 5: Calculating score...");
  const finalScore = calculateScore(analysis.scoreBreakdown);

  console.log(`[Pipeline] Complete. Score: ${finalScore}`);
  return { profile, jobDescription, analysis, finalScore };
}