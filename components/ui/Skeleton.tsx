// components/ui/Skeleton.tsx
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-lg", className)}
      style={{ background: "var(--line)" }}
    />
  );
}

export function CaseCardSkeleton() {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: "var(--white)", borderColor: "var(--line)" }}
    >
      <div className="flex items-center gap-2.5 mb-4">
        <Skeleton className="w-8 h-8 rounded-lg" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-2.5 w-1/3" />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-3 w-10" />
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div
      className="rounded-xl border p-5"
      style={{ background: "var(--white)", borderColor: "var(--line)" }}
    >
      <Skeleton className="w-9 h-9 rounded-lg mb-3" />
      <Skeleton className="h-7 w-12 mb-1.5" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="p-8 max-w-6xl">
      <div className="flex items-start justify-between mb-8">
        <div className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <Skeleton className="h-10 w-44 rounded-lg" />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => <StatsCardSkeleton key={i} />)}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => <CaseCardSkeleton key={i} />)}
      </div>
    </div>
  );
}

export function ReportSkeleton() {
  return (
    <div className="p-8 max-w-4xl space-y-6">
      <Skeleton className="h-4 w-32" />
      <div className="rounded-2xl border p-7" style={{ borderColor: "var(--line)" }}>
        <div className="flex justify-between">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-36" />
          </div>
          <Skeleton className="w-24 h-24 rounded-full" />
        </div>
        <Skeleton className="h-14 w-full rounded-xl mt-5" />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6 space-y-3" style={{ borderColor: "var(--line)" }}>
          <Skeleton className="h-5 w-24" />
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
        </div>
        <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: "var(--line)" }}>
          <Skeleton className="h-5 w-36" />
          {[...Array(5)].map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-8" />
              </div>
              <Skeleton className="h-1.5 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
