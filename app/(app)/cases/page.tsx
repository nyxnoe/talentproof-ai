// app/(app)/cases/page.tsx
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import Link from "next/link";
import { Plus } from "lucide-react";
import CaseCard from "@/components/dashboard/CaseCard";

export default async function CasesPage() {
  const { userId } = await auth();

  const user = userId
    ? await db.user.findUnique({
        where: { clerkId: userId },
        include: {
          cases: {
            orderBy: { createdAt: "desc" },
            include: {
              uploads: { select: { id: true } },
              report: { select: { score: true, recommendation: true } },
            },
          },
        },
      })
    : null;

  const cases = user?.cases ?? [];

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8 fade-up">
        <div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
            My Cases
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            {cases.length} evaluation case{cases.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/cases/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
          style={{ background: "var(--accent)" }}
        >
          <Plus size={15} />
          New Case
        </Link>
      </div>

      {cases.length === 0 ? (
        <div
          className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-20 text-center"
          style={{ borderColor: "var(--line)" }}
        >
          <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
            No evaluation cases yet
          </p>
          <Link
            href="/cases/new"
            className="px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ background: "var(--accent)" }}
          >
            Create your first case
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 fade-up fade-up-delay-1">
          {cases.map((c) => (
            <CaseCard key={c.id} case={c} />
          ))}
        </div>
      )}
    </div>
  );
}
