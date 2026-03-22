"use client";
// components/report/PrintButton.tsx
import { useState } from "react";
import { Printer, Loader2 } from "lucide-react";

export default function PrintButton({ caseId }: { caseId: string }) {
  const [loading, setLoading] = useState(false);

  function handlePrint() {
    setLoading(true);
    const win = window.open(`/api/report/export?caseId=${caseId}`, "_blank");
    // Reset loading state after window opens
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <button
      onClick={handlePrint}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all hover:opacity-80 disabled:opacity-40"
      style={{
        borderColor: "var(--line)",
        background: "var(--white)",
        color: "var(--ink)",
      }}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Printer size={14} />
      )}
      Export PDF
    </button>
  );
}
