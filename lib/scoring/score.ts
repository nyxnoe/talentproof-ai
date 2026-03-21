// lib/scoring/score.ts
// Weighted scoring model — each factor contributes to a 0–100 final score

const WEIGHTS: Record<string, number> = {
  jdMatch:             0.25,
  profileCompleteness: 0.20,
  verificationSupport: 0.20,
  academicAlignment:   0.15,
  experienceRelevance: 0.10,
  consistency:         0.10,
};

export function calculateScore(breakdown: Record<string, number>): number {
  let total = 0;
  for (const [key, weight] of Object.entries(WEIGHTS)) {
    const raw = breakdown[key] ?? 0;
    total += Math.min(100, Math.max(0, raw)) * weight;
  }
  return Math.round(total);
}

export function getScoreLabel(score: number): { label: string; color: string } {
  if (score >= 85) return { label: "Highly Suitable", color: "green" };
  if (score >= 70) return { label: "Suitable — Minor Checks", color: "blue" };
  if (score >= 50) return { label: "Moderate Fit — Review Needed", color: "yellow" };
  return { label: "Weak Fit — Major Gaps", color: "red" };
}
