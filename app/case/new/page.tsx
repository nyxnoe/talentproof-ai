"use client";
// app/(app)/cases/new/page.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Briefcase, User, ChevronRight } from "lucide-react";

export default function NewCasePage() {
  const router = useRouter();
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState<"RECRUITER" | "CANDIDATE" | "">("");
  const [jdText, setJdText] = useState("");
  const [preferences, setPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
    if (!title.trim() || !mode) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          mode,
          jdText: jdText.trim() || null,
          companyPreferences: preferences.trim() || null,
          email: user?.primaryEmailAddress?.emailAddress,
        }),
      });

      if (!res.ok) throw new Error("Failed to create case");
      const data = await res.json();
      router.push(`/cases/${data.case.id}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl fade-up">
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          New Evaluation Case
        </h1>
        <p className="text-sm" style={{ color: "var(--muted)" }}>
          Set up a new candidate assessment workspace
        </p>
      </div>

      {/* Step 1: Case name */}
      <Section label="Case Name" required>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. John Doe — Senior Developer"
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2"
          style={{
            borderColor: "var(--line)",
            background: "var(--white)",
            color: "var(--ink)",
          }}
        />
      </Section>

      {/* Step 2: Mode */}
      <Section label="Evaluation Mode" required>
        <div className="grid grid-cols-2 gap-3">
          {[
            {
              value: "RECRUITER",
              icon: Briefcase,
              title: "Recruiter / HR",
              desc: "Evaluate a candidate for a role",
            },
            {
              value: "CANDIDATE",
              icon: User,
              title: "Candidate / Job Seeker",
              desc: "Check your own profile readiness",
            },
          ].map(({ value, icon: Icon, title: t, desc }) => (
            <button
              key={value}
              onClick={() => setMode(value as any)}
              className="text-left p-4 rounded-xl border-2 transition-all"
              style={{
                borderColor: mode === value ? "var(--accent)" : "var(--line)",
                background: mode === value ? "var(--accent-lt)" : "var(--white)",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{
                  background: mode === value ? "var(--accent)" : "var(--surface)",
                }}
              >
                <Icon size={16} color={mode === value ? "white" : "var(--muted)"} />
              </div>
              <div
                className="font-semibold text-sm mb-0.5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t}
              </div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>
                {desc}
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Step 3: JD */}
      <Section label="Job Description" hint="Optional — paste or type the JD">
        <textarea
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          placeholder="Paste the job description here..."
          rows={5}
          className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 resize-none"
          style={{
            borderColor: "var(--line)",
            background: "var(--white)",
            color: "var(--ink)",
          }}
        />
      </Section>

      {/* Step 4: Company preferences (recruiter only) */}
      {mode === "RECRUITER" && (
        <Section label="Company Priorities" hint="Optional — what matters most to you">
          <textarea
            value={preferences}
            onChange={(e) => setPreferences(e.target.value)}
            placeholder="e.g. Strong academic record, verified internship experience, coding skills..."
            rows={3}
            className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 resize-none"
            style={{
              borderColor: "var(--line)",
              background: "var(--white)",
              color: "var(--ink)",
            }}
          />
        </Section>
      )}

      {error && (
        <p className="text-sm mb-4" style={{ color: "var(--red)" }}>
          {error}
        </p>
      )}

      <button
        onClick={handleCreate}
        disabled={loading || !title || !mode}
        className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: "var(--accent)" }}
      >
        {loading ? "Creating…" : "Create & Open Workspace"}
        {!loading && <ChevronRight size={15} />}
      </button>
    </div>
  );
}

function Section({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline gap-1.5 mb-2">
        <label
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {label}
        </label>
        {required && (
          <span className="text-xs" style={{ color: "var(--accent)" }}>
            *
          </span>
        )}
        {hint && (
          <span className="text-xs" style={{ color: "var(--ghost)" }}>
            — {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}