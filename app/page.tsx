// app/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowRight, FileCheck, Sparkles, BarChart3 } from "lucide-react";

export default async function LandingPage() {
  const { userId } = await auth();
  if (userId) redirect("/dashboard");

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--ink)", color: "var(--white)" }}
    >
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "var(--accent)" }}
          >
            <ShieldCheck size={16} color="white" />
          </div>
          <span
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            TalentProof AI
          </span>
        </div>
        <Link
          href="/sign-in"
          className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-80"
          style={{ background: "var(--accent)" }}
        >
          Sign In
        </Link>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
          style={{ background: "var(--ink-3)", color: "var(--ghost)" }}
        >
          <Sparkles size={11} style={{ color: "var(--accent)" }} />
          AI-Powered Hiring Intelligence
        </div>

        <h1
          className="text-5xl font-bold mb-6 max-w-2xl leading-tight"
          style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
        >
          Evaluate candidates with AI precision
        </h1>
        <p
          className="text-lg max-w-xl mb-10 leading-relaxed"
          style={{ color: "var(--ghost)" }}
        >
          Upload resumes, certificates, and documents. Get a structured evaluation report with verification status, job-fit score, and AI recommendations — in minutes.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
            style={{ background: "var(--accent)" }}
          >
            Get Started Free <ArrowRight size={15} />
          </Link>
          <Link
            href="/sign-in"
            className="px-6 py-3.5 rounded-xl font-semibold transition-all hover:opacity-80"
            style={{ background: "var(--ink-2)", color: "var(--ghost)" }}
          >
            Sign In
          </Link>
        </div>

        {/* Feature pills */}
        <div className="flex items-center gap-3 mt-14 flex-wrap justify-center">
          {[
            { icon: FileCheck, text: "Multi-document analysis" },
            { icon: BarChart3, text: "0–100 readiness score" },
            { icon: ShieldCheck, text: "Verification engine" },
            { icon: Sparkles,  text: "Explainable AI" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ background: "var(--ink-2)", color: "var(--ghost)" }}
            >
              <Icon size={13} style={{ color: "var(--accent)" }} />
              {text}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}