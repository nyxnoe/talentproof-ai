// lib/verification/rules.ts
export function runRuleBasedChecks(profile: CandidateProfile): VerificationFlag[] {
  const flags: VerificationFlag[] = [];
  const currentYear = new Date().getFullYear();

  for (const edu of profile.education) {
    const year = parseInt(edu.year);
    if (year > currentYear) flags.push({ field: "education.year", issue: "Future graduation year", severity: "HIGH" });
    if (year < 1950) flags.push({ field: "education.year", issue: "Implausibly old graduation", severity: "MEDIUM" });
  }

  // Gap detection
  const expYears = profile.experience
    .map(e => extractYearsFromDuration(e.duration))
    .filter(Boolean) as number[];
  // ... more rule checks

  return flags;
}