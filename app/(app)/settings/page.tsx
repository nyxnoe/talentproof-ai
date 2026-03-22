"use client";
import { useUser } from "@clerk/nextjs";
import { Mail, User, Shield } from "lucide-react";

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8 fade-up">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
          Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Your account information
        </p>
      </div>

      <div
        className="rounded-2xl border p-6 space-y-5 fade-up fade-up-delay-1"
        style={{ background: "var(--white)", borderColor: "var(--line)" }}
      >
        <Row icon={User} label="Full Name" value={user?.fullName ?? "—"} />
        <Row icon={Mail} label="Email" value={user?.primaryEmailAddress?.emailAddress ?? "—"} />
        <Row icon={Shield} label="Account ID" value={user?.id ?? "—"} />
      </div>

      <div
        className="rounded-2xl border p-6 mt-5 fade-up fade-up-delay-2"
        style={{ background: "var(--white)", borderColor: "var(--line)" }}
      >
        <p className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
          Manage Account
        </p>
        <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
          Update your profile, password, and connected accounts via Clerk.
        </p>
        <a
          href="https://accounts.clerk.dev/user"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
          style={{ background: "var(--accent)" }}
        >
          Open Account Portal
        </a>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "var(--accent-lt)" }}
      >
        <Icon size={15} style={{ color: "var(--accent)" }} />
      </div>
      <div>
        <p className="text-xs" style={{ color: "var(--muted)" }}>{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}