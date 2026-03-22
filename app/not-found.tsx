// app/not-found.tsx
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center p-8"
      style={{ background: "var(--surface)" }}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: "var(--accent-lt)" }}
      >
        <ShieldCheck size={26} style={{ color: "var(--accent)" }} />
      </div>
      <h1
        className="text-5xl font-bold mb-3"
        style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
      >
        404
      </h1>
      <p className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
        Page not found
      </p>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        This page doesn&apos;t exist or you don&apos;t have access to it.
      </p>
      <Link
        href="/dashboard"
        className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
        style={{ background: "var(--accent)" }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
