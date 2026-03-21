// lib/ai/gemini.ts
// Core Gemini integration — all AI calls go through here

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function callGemini(prompt: string): Promise<string> {
  const response = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 4096 },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const result = await response.json();
  return result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

// ── Step 1: Extract structured candidate info from raw document text ──
export async function extractCandidateProfile(rawText: string): Promise<CandidateProfile> {
  const prompt = `
You are an AI recruitment analyst. Extract structured information from the following candidate document text.

Return ONLY valid JSON with this exact schema (no markdown, no explanation):
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "education": [{ "degree": "", "institution": "", "year": "", "grade": "" }],
  "experience": [{ "role": "", "company": "", "duration": "", "description": "" }],
  "skills": ["string"],
  "certifications": [{ "name": "", "issuer": "", "year": "" }],
  "projects": [{ "name": "", "description": "", "tech": [] }],
  "claims": ["string"]
}

DOCUMENT TEXT:
${rawText}
`;

  const raw = await callGemini(prompt);
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned) as CandidateProfile;
}

// ── Step 2: Parse job description ──
export async function parseJobDescription(jdText: string): Promise<JobDescription> {
  const prompt = `
Extract structured information from this job description.
Return ONLY valid JSON (no markdown):
{
  "title": "string",
  "requiredSkills": ["string"],
  "preferredSkills": ["string"],
  "requiredExperience": "string",
  "requiredEducation": "string",
  "requiredCertifications": ["string"],
  "responsibilities": ["string"]
}

JOB DESCRIPTION:
${jdText}
`;

  const raw = await callGemini(prompt);
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned) as JobDescription;
}

// ── Step 3: Full candidate analysis ──
export async function analyzeCandidateFull(input: AnalysisInput): Promise<AnalysisResult> {
  const prompt = `
You are an expert AI recruitment analyst. Perform a thorough candidate evaluation.

CANDIDATE PROFILE:
${JSON.stringify(input.profile, null, 2)}

JOB DESCRIPTION:
${JSON.stringify(input.jobDescription, null, 2)}

UPLOADED DOCUMENT TYPES:
${input.documentTypes.join(", ")}

COMPANY PREFERENCES (if any):
${input.companyPreferences ?? "Not specified"}

Return ONLY valid JSON (no markdown) with this schema:
{
  "summary": "2-3 sentence candidate summary",
  "strengths": ["string"],
  "weaknesses": ["string"],
  "missingItems": ["missing documents or skills"],
  "riskFlags": ["any inconsistencies or concerns"],
  "recommendation": "one of: Proceed | Proceed with manual verification | Hold for clarification | Reject",
  "candidateMessage": "for candidate mode: personalized improvement advice",
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
}
`;

  const raw = await callGemini(prompt);
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned) as AnalysisResult;
}

// ── Types ──
export interface CandidateProfile {
  name: string;
  email: string;
  phone: string;
  education: { degree: string; institution: string; year: string; grade: string }[];
  experience: { role: string; company: string; duration: string; description: string }[];
  skills: string[];
  certifications: { name: string; issuer: string; year: string }[];
  projects: { name: string; description: string; tech: string[] }[];
  claims: string[];
}

export interface JobDescription {
  title: string;
  requiredSkills: string[];
  preferredSkills: string[];
  requiredExperience: string;
  requiredEducation: string;
  requiredCertifications: string[];
  responsibilities: string[];
}

export interface AnalysisInput {
  profile: CandidateProfile;
  jobDescription: JobDescription;
  documentTypes: string[];
  companyPreferences?: string;
}

export interface AnalysisResult {
  summary: string;
  strengths: string[];
  weaknesses: string[];
  missingItems: string[];
  riskFlags: string[];
  recommendation: string;
  candidateMessage: string;
  scoreBreakdown: Record<string, number>;
  verifications: { category: string; label: string; status: string; note: string }[];
}
