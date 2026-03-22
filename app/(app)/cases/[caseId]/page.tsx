"use client";
// app/(app)/cases/[caseId]/page.tsx
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import {
  Upload, FileText, CheckCircle2, AlertCircle,
  Loader2, Sparkles, X, ChevronRight, FileUp
} from "lucide-react";

const FILE_TYPES = [
  { value: "RESUME",           label: "Resume" },
  { value: "COVER_LETTER",     label: "Cover Letter" },
  { value: "CERTIFICATE",      label: "Certificate" },
  { value: "MARKSHEET",        label: "Marksheet" },
  { value: "DEGREE",           label: "Degree" },
  { value: "INTERNSHIP",       label: "Internship Proof" },
  { value: "EXPERIENCE_LETTER",label: "Experience Letter" },
  { value: "JOB_DESCRIPTION",  label: "Job Description (file)" },
  { value: "OTHER",            label: "Other" },
];

interface UploadedFile {
  id: string; fileName: string; fileType: string; processingStatus: string;
}

interface Insight { type: "info" | "warn" | "ok"; text: string; }

export default function CaseWorkspacePage() {
  const { caseId } = useParams<{ caseId: string }>();
  const router = useRouter();

  const [caseData, setCaseData] = useState<any>(null);
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [insights, setInsights] = useState<Insight[]>([
    { type: "info", text: "Upload documents to begin evaluation." },
  ]);
  const [analyzing, setAnalyzing] = useState(false);
  const [pendingFileType, setPendingFileType] = useState("RESUME");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`/api/cases/${caseId}`)
      .then((r) => r.json())
      .then((d) => {
        setCaseData(d.case);
        setUploads(d.case?.uploads ?? []);
        if (d.case?.status === "COMPLETED") router.push(`/report/${caseId}`);
      });
  }, [caseId]);

  const onDrop = useCallback(
    async (accepted: File[]) => {
      if (!accepted.length) return;
      const file = accepted[0];
      setUploading(true);

      const form = new FormData();
      form.append("file", file);
      form.append("caseId", caseId);
      form.append("fileType", pendingFileType);

      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();

      if (data.upload) {
        setUploads((prev) => [...prev, data.upload]);
        setInsights((prev) => [
          { type: "ok", text: `"${file.name}" uploaded and parsed.` },
          ...prev,
        ]);
      } else {
        setInsights((prev) => [
          { type: "warn", text: `Failed to upload "${file.name}".` },
          ...prev,
        ]);
      }
      setUploading(false);
    },
    [caseId, pendingFileType]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [], "image/*": [] },
    maxFiles: 1,
  });

  async function handleAnalyze() {
    if (uploads.length === 0) return;
    setAnalyzing(true);
    setInsights((prev) => [{ type: "info", text: "Running AI evaluation pipeline…" }, ...prev]);

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ caseId }),
    });
    const data = await res.json();

    if (data.report) {
      setInsights((prev) => [
        { type: "ok", text: "Evaluation complete! Redirecting to report…" },
        ...prev,
      ]);
      setTimeout(() => router.push(`/report/${caseId}`), 1200);
    } else {
      setInsights((prev) => [
        { type: "warn", text: "Analysis failed. Please try again." },
        ...prev,
      ]);
      setAnalyzing(false);
    }
  }

  const statusIcon = (status: string) => {
    if (status === "PARSED" || status === "ANALYZED")
      return <CheckCircle2 size={13} style={{ color: "var(--green)" }} />;
    if (status === "ERROR")
      return <AlertCircle size={13} style={{ color: "var(--red)" }} />;
    return <Loader2 size={13} className="animate-spin" style={{ color: "var(--amber)" }} />;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* LEFT: Files panel */}
      <div
        className="w-64 flex-shrink-0 border-r flex flex-col"
        style={{ borderColor: "var(--line)", background: "var(--white)" }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--line)" }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ghost)" }}>
            Uploaded Files
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {uploads.length === 0 && (
            <p className="text-xs text-center mt-6" style={{ color: "var(--ghost)" }}>
              No files yet
            </p>
          )}
          {uploads.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
              style={{ background: "var(--surface)" }}
            >
              <FileText size={13} style={{ color: "var(--muted)" }} />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{u.fileName}</p>
                <p className="text-[10px]" style={{ color: "var(--ghost)" }}>{u.fileType}</p>
              </div>
              {statusIcon(u.processingStatus)}
            </div>
          ))}
        </div>
        <div className="p-3 border-t" style={{ borderColor: "var(--line)" }}>
          <p className="text-[10px] text-center" style={{ color: "var(--ghost)" }}>
            {uploads.length} file{uploads.length !== 1 ? "s" : ""} uploaded
          </p>
        </div>
      </div>

      {/* CENTER: Actions panel */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-lg mx-auto">
          <div className="mb-6">
            <h1
              className="text-2xl font-bold mb-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {caseData?.title ?? "Loading…"}
            </h1>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: "var(--accent-lt)", color: "var(--accent)" }}
            >
              {caseData?.mode === "RECRUITER" ? "Recruiter Mode" : "Candidate Mode"}
            </span>
          </div>

          {/* File type selector */}
          <div className="mb-3">
            <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--muted)" }}>
              Document Type
            </label>
            <select
              value={pendingFileType}
              onChange={(e) => setPendingFileType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
              style={{ borderColor: "var(--line)", background: "var(--white)", color: "var(--ink)" }}
            >
              {FILE_TYPES.map((ft) => (
                <option key={ft.value} value={ft.value}>{ft.label}</option>
              ))}
            </select>
          </div>

          {/* Dropzone */}
          <div
            {...getRootProps()}
            className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-6"
            style={{
              borderColor: isDragActive ? "var(--accent)" : "var(--line)",
              background: isDragActive ? "var(--accent-lt)" : "var(--white)",
            }}
          >
            <input {...getInputProps()} />
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 size={24} className="animate-spin" style={{ color: "var(--accent)" }} />
                <p className="text-sm" style={{ color: "var(--muted)" }}>Uploading & parsing…</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <FileUp size={24} style={{ color: isDragActive ? "var(--accent)" : "var(--ghost)" }} />
                <p className="text-sm font-medium">
                  {isDragActive ? "Drop to upload" : "Drag & drop or click to upload"}
                </p>
                <p className="text-xs" style={{ color: "var(--ghost)" }}>
                  PDF, DOCX, or image — one file at a time
                </p>
              </div>
            )}
          </div>

          {/* JD reminder if not set */}
          {!caseData?.jdText && uploads.length > 0 && (
            <div
              className="flex items-start gap-3 p-4 rounded-xl mb-6"
              style={{ background: "var(--amber-lt)" }}
            >
              <AlertCircle size={15} style={{ color: "var(--amber)", flexShrink: 0, marginTop: 1 }} />
              <p className="text-xs" style={{ color: "var(--amber)" }}>
                No job description was added. For best results, edit this case and add a JD before analyzing.
              </p>
            </div>
          )}

          {/* Run Analysis */}
          <button
            onClick={handleAnalyze}
            disabled={analyzing || uploads.length === 0}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ background: analyzing ? "var(--ink-3)" : "var(--accent)" }}
          >
            {analyzing ? (
              <><Loader2 size={16} className="animate-spin" /> Evaluating…</>
            ) : (
              <><Sparkles size={16} /> Run AI Evaluation<ChevronRight size={15} /></>
            )}
          </button>

          <p className="text-xs text-center mt-3" style={{ color: "var(--ghost)" }}>
            Upload all documents first, then run evaluation
          </p>
        </div>
      </div>

      {/* RIGHT: Insights panel */}
      <div
        className="w-72 flex-shrink-0 border-l flex flex-col"
        style={{ borderColor: "var(--line)", background: "var(--white)" }}
      >
        <div className="px-5 py-4 border-b" style={{ borderColor: "var(--line)" }}>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ghost)" }}>
            AI Insights
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {insights.map((ins, i) => (
            <InsightItem key={i} insight={ins} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightItem({ insight }: { insight: Insight }) {
  const cfg = {
    info: { bg: "var(--blue-lt)",  color: "var(--blue)",  icon: <Sparkles size={11} /> },
    warn: { bg: "var(--amber-lt)", color: "var(--amber)", icon: <AlertCircle size={11} /> },
    ok:   { bg: "var(--green-lt)", color: "var(--green)", icon: <CheckCircle2 size={11} /> },
  }[insight.type];

  return (
    <div className="flex items-start gap-2.5 p-3 rounded-lg" style={{ background: cfg.bg }}>
      <span style={{ color: cfg.color, marginTop: 1, flexShrink: 0 }}>{cfg.icon}</span>
      <p className="text-xs leading-relaxed" style={{ color: cfg.color }}>{insight.text}</p>
    </div>
  );
}
