This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where line numbers have been added, content has been formatted for parsing in markdown style, security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Line numbers have been added to the beginning of each line
- Content has been formatted for parsing in markdown style
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
app/
  (app)/
    admin/
      page.tsx
    cases/
      [caseId]/
        page.tsx
      new/
        page.tsx
      page.tsx
    dashboard/
      loading.tsx
      page.tsx
    report/
      [caseId]/
        loading.tsx
        page.tsx
    reports/
      page.tsx
    settings/
      page.tsx
    error.tsx
    layout.tsx
  api/
    analyze/
      route.ts
    cases/
      [caseId]/
        route.ts
      route.ts
    report/
      export/
        route.ts
      route.ts
    upload/
      route.ts
  sign-in/
    [[...sign-in]]/
      page.tsx
  sign-up/
    [[...sign-up]]/
      page.tsx
  globals.css
  layout.tsx
  not-found.tsx
  page.tsx
components/
  dashboard/
    CaseCard.tsx
    StatsCard.tsx
  layout/
    Sidebar.tsx
  report/
    PrintButton.tsx
  ui/
    Skeleton.tsx
lib/
  ai/
    gemini.ts
    pipeline.ts
  parser/
    docx.ts
    pdf.ts
  scoring/
    score.ts
  db.ts
  storage.ts
  utils.ts
prisma/
  schema.prisma
.gitignore
middleware.ts
next.config.ts
package.json
postcss.config.js
README.md
repomix-output-nyxnoe-talentproof-ai.md
tailwind.config.ts
tsconfig.json
```

# Files

## File: app/(app)/admin/page.tsx
`````typescript
  1: // app/(app)/admin/page.tsx
  2: import { auth } from "@clerk/nextjs/server";
  3: import { db } from "@/lib/db";
  4: import { redirect } from "next/navigation";
  5: import { Users, FileStack, CheckCircle2, AlertTriangle } from "lucide-react";
  6: import StatsCard from "@/components/dashboard/StatsCard";
  7: 
  8: export default async function AdminPage() {
  9:   const { userId } = await auth();
 10: 
 11:   // Verify admin role
 12:   const user = await db.user.findUnique({ where: { clerkId: userId! } });
 13:   if (!user || user.role !== "ADMIN") redirect("/dashboard");
 14: 
 15:   const [totalUsers, totalCases, completedCases, failedCases] = await Promise.all([
 16:     db.user.count(),
 17:     db.case.count(),
 18:     db.case.count({ where: { status: "COMPLETED" } }),
 19:     db.case.count({ where: { status: "FAILED" } }),
 20:   ]);
 21: 
 22:   const recentCases = await db.case.findMany({
 23:     orderBy: { createdAt: "desc" },
 24:     take: 10,
 25:     include: {
 26:       user: { select: { email: true } },
 27:       report: { select: { score: true } },
 28:     },
 29:   });
 30: 
 31:   return (
 32:     <div className="p-8 max-w-5xl">
 33:       <div className="mb-8 fade-up">
 34:         <div
 35:           className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3"
 36:           style={{ background: "var(--red-lt)", color: "var(--red)" }}
 37:         >
 38:           Admin Access
 39:         </div>
 40:         <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
 41:           Admin Dashboard
 42:         </h1>
 43:       </div>
 44: 
 45:       <div className="grid grid-cols-4 gap-4 mb-8 fade-up fade-up-delay-1">
 46:        <StatsCard icon="Users"        label="Total Users"  value={totalUsers}    color="accent" />
 47:        <StatsCard icon="FileStack"    label="Total Cases"  value={totalCases}    color="blue" />
 48:        <StatsCard icon="CheckCircle2" label="Completed"    value={completedCases} color="green" />
 49:        <StatsCard icon="AlertTriangle" label="Failed"      value={failedCases}   color="red" />
 50:       </div>
 51: 
 52:       {/* Recent cases table */}
 53:       <div
 54:         className="rounded-2xl border overflow-hidden fade-up fade-up-delay-2"
 55:         style={{ background: "var(--white)", borderColor: "var(--line)" }}
 56:       >
 57:         <div className="px-6 py-4 border-b" style={{ borderColor: "var(--line)" }}>
 58:           <h2 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>
 59:             Recent Cases (all users)
 60:           </h2>
 61:         </div>
 62:         <table className="w-full text-sm">
 63:           <thead>
 64:             <tr style={{ background: "var(--surface)" }}>
 65:               <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Case</th>
 66:               <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>User</th>
 67:               <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Mode</th>
 68:               <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Status</th>
 69:               <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Score</th>
 70:             </tr>
 71:           </thead>
 72:           <tbody>
 73:             {recentCases.map((c) => (
 74:               <tr key={c.id} className="border-t" style={{ borderColor: "var(--line)" }}>
 75:                 <td className="px-6 py-3 text-xs font-medium">{c.title}</td>
 76:                 <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{c.user.email}</td>
 77:                 <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{c.mode}</td>
 78:                 <td className="px-6 py-3">
 79:                   <span
 80:                     className="text-[11px] font-medium px-2 py-0.5 rounded-full"
 81:                     style={{
 82:                       background:
 83:                         c.status === "COMPLETED" ? "var(--green-lt)" :
 84:                         c.status === "PROCESSING" ? "var(--blue-lt)" :
 85:                         c.status === "FAILED" ? "var(--red-lt)" : "var(--amber-lt)",
 86:                       color:
 87:                         c.status === "COMPLETED" ? "var(--green)" :
 88:                         c.status === "PROCESSING" ? "var(--blue)" :
 89:                         c.status === "FAILED" ? "var(--red)" : "var(--amber)",
 90:                     }}
 91:                   >
 92:                     {c.status}
 93:                   </span>
 94:                 </td>
 95:                 <td className="px-6 py-3 text-xs font-bold" style={{
 96:                   color: c.report?.score
 97:                     ? c.report.score >= 70 ? "var(--green)" : c.report.score >= 50 ? "var(--amber)" : "var(--red)"
 98:                     : "var(--ghost)"
 99:                 }}>
100:                   {c.report?.score ? `${Math.round(c.report.score)}%` : "—"}
101:                 </td>
102:               </tr>
103:             ))}
104:           </tbody>
105:         </table>
106:       </div>
107:     </div>
108:   );
109: }
`````

## File: app/(app)/cases/[caseId]/page.tsx
`````typescript
  1: "use client";
  2: // app/(app)/cases/[caseId]/page.tsx
  3: import { useEffect, useState, useCallback } from "react";
  4: import { useParams, useRouter } from "next/navigation";
  5: import { useDropzone } from "react-dropzone";
  6: import {
  7:   Upload, FileText, CheckCircle2, AlertCircle,
  8:   Loader2, Sparkles, X, ChevronRight, FileUp
  9: } from "lucide-react";
 10: 
 11: const FILE_TYPES = [
 12:   { value: "RESUME",           label: "Resume" },
 13:   { value: "COVER_LETTER",     label: "Cover Letter" },
 14:   { value: "CERTIFICATE",      label: "Certificate" },
 15:   { value: "MARKSHEET",        label: "Marksheet" },
 16:   { value: "DEGREE",           label: "Degree" },
 17:   { value: "INTERNSHIP",       label: "Internship Proof" },
 18:   { value: "EXPERIENCE_LETTER",label: "Experience Letter" },
 19:   { value: "JOB_DESCRIPTION",  label: "Job Description (file)" },
 20:   { value: "OTHER",            label: "Other" },
 21: ];
 22: 
 23: interface UploadedFile {
 24:   id: string; fileName: string; fileType: string; processingStatus: string;
 25: }
 26: 
 27: interface Insight { type: "info" | "warn" | "ok"; text: string; }
 28: 
 29: export default function CaseWorkspacePage() {
 30:   const { caseId } = useParams<{ caseId: string }>();
 31:   const router = useRouter();
 32: 
 33:   const [caseData, setCaseData] = useState<any>(null);
 34:   const [uploads, setUploads] = useState<UploadedFile[]>([]);
 35:   const [insights, setInsights] = useState<Insight[]>([
 36:     { type: "info", text: "Upload documents to begin evaluation." },
 37:   ]);
 38:   const [analyzing, setAnalyzing] = useState(false);
 39:   const [pendingFileType, setPendingFileType] = useState("RESUME");
 40:   const [uploading, setUploading] = useState(false);
 41: 
 42:   useEffect(() => {
 43:     fetch(`/api/cases/${caseId}`)
 44:       .then((r) => r.json())
 45:       .then((d) => {
 46:         setCaseData(d.case);
 47:         setUploads(d.case?.uploads ?? []);
 48:         if (d.case?.status === "COMPLETED") router.push(`/report/${caseId}`);
 49:       });
 50:   }, [caseId]);
 51: 
 52:   const onDrop = useCallback(
 53:     async (accepted: File[]) => {
 54:       if (!accepted.length) return;
 55:       const file = accepted[0];
 56:       setUploading(true);
 57: 
 58:       const form = new FormData();
 59:       form.append("file", file);
 60:       form.append("caseId", caseId);
 61:       form.append("fileType", pendingFileType);
 62: 
 63:       const res = await fetch("/api/upload", { method: "POST", body: form });
 64:       const data = await res.json();
 65: 
 66:       if (data.upload) {
 67:         setUploads((prev) => [...prev, data.upload]);
 68:         setInsights((prev) => [
 69:           { type: "ok", text: `"${file.name}" uploaded and parsed.` },
 70:           ...prev,
 71:         ]);
 72:       } else {
 73:         setInsights((prev) => [
 74:           { type: "warn", text: `Failed to upload "${file.name}".` },
 75:           ...prev,
 76:         ]);
 77:       }
 78:       setUploading(false);
 79:     },
 80:     [caseId, pendingFileType]
 81:   );
 82: 
 83:   const { getRootProps, getInputProps, isDragActive } = useDropzone({
 84:     onDrop,
 85:     accept: { "application/pdf": [], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [], "image/*": [] },
 86:     maxFiles: 1,
 87:   });
 88: 
 89:   async function handleAnalyze() {
 90:     if (uploads.length === 0) return;
 91:     setAnalyzing(true);
 92:     setInsights((prev) => [{ type: "info", text: "Running AI evaluation pipeline…" }, ...prev]);
 93: 
 94:     const res = await fetch("/api/analyze", {
 95:       method: "POST",
 96:       headers: { "Content-Type": "application/json" },
 97:       body: JSON.stringify({ caseId }),
 98:     });
 99:     const data = await res.json();
100: 
101:     if (data.report) {
102:       setInsights((prev) => [
103:         { type: "ok", text: "Evaluation complete! Redirecting to report…" },
104:         ...prev,
105:       ]);
106:       setTimeout(() => router.push(`/report/${caseId}`), 1200);
107:     } else {
108:       setInsights((prev) => [
109:         { type: "warn", text: "Analysis failed. Please try again." },
110:         ...prev,
111:       ]);
112:       setAnalyzing(false);
113:     }
114:   }
115: 
116:   const statusIcon = (status: string) => {
117:     if (status === "PARSED" || status === "ANALYZED")
118:       return <CheckCircle2 size={13} style={{ color: "var(--green)" }} />;
119:     if (status === "ERROR")
120:       return <AlertCircle size={13} style={{ color: "var(--red)" }} />;
121:     return <Loader2 size={13} className="animate-spin" style={{ color: "var(--amber)" }} />;
122:   };
123: 
124:   return (
125:     <div className="flex h-screen overflow-hidden">
126:       {/* LEFT: Files panel */}
127:       <div
128:         className="w-64 flex-shrink-0 border-r flex flex-col"
129:         style={{ borderColor: "var(--line)", background: "var(--white)" }}
130:       >
131:         <div className="px-5 py-4 border-b" style={{ borderColor: "var(--line)" }}>
132:           <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ghost)" }}>
133:             Uploaded Files
134:           </p>
135:         </div>
136:         <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
137:           {uploads.length === 0 && (
138:             <p className="text-xs text-center mt-6" style={{ color: "var(--ghost)" }}>
139:               No files yet
140:             </p>
141:           )}
142:           {uploads.map((u) => (
143:             <div
144:               key={u.id}
145:               className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
146:               style={{ background: "var(--surface)" }}
147:             >
148:               <FileText size={13} style={{ color: "var(--muted)" }} />
149:               <div className="flex-1 min-w-0">
150:                 <p className="text-xs font-medium truncate">{u.fileName}</p>
151:                 <p className="text-[10px]" style={{ color: "var(--ghost)" }}>{u.fileType}</p>
152:               </div>
153:               {statusIcon(u.processingStatus)}
154:             </div>
155:           ))}
156:         </div>
157:         <div className="p-3 border-t" style={{ borderColor: "var(--line)" }}>
158:           <p className="text-[10px] text-center" style={{ color: "var(--ghost)" }}>
159:             {uploads.length} file{uploads.length !== 1 ? "s" : ""} uploaded
160:           </p>
161:         </div>
162:       </div>
163: 
164:       {/* CENTER: Actions panel */}
165:       <div className="flex-1 overflow-y-auto p-8">
166:         <div className="max-w-lg mx-auto">
167:           <div className="mb-6">
168:             <h1
169:               className="text-2xl font-bold mb-1"
170:               style={{ fontFamily: "var(--font-display)" }}
171:             >
172:               {caseData?.title ?? "Loading…"}
173:             </h1>
174:             <span
175:               className="text-xs font-medium px-2 py-0.5 rounded-full"
176:               style={{ background: "var(--accent-lt)", color: "var(--accent)" }}
177:             >
178:               {caseData?.mode === "RECRUITER" ? "Recruiter Mode" : "Candidate Mode"}
179:             </span>
180:           </div>
181: 
182:           {/* File type selector */}
183:           <div className="mb-3">
184:             <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--muted)" }}>
185:               Document Type
186:             </label>
187:             <select
188:               value={pendingFileType}
189:               onChange={(e) => setPendingFileType(e.target.value)}
190:               className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
191:               style={{ borderColor: "var(--line)", background: "var(--white)", color: "var(--ink)" }}
192:             >
193:               {FILE_TYPES.map((ft) => (
194:                 <option key={ft.value} value={ft.value}>{ft.label}</option>
195:               ))}
196:             </select>
197:           </div>
198: 
199:           {/* Dropzone */}
200:           <div
201:             {...getRootProps()}
202:             className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-6"
203:             style={{
204:               borderColor: isDragActive ? "var(--accent)" : "var(--line)",
205:               background: isDragActive ? "var(--accent-lt)" : "var(--white)",
206:             }}
207:           >
208:             <input {...getInputProps()} />
209:             {uploading ? (
210:               <div className="flex flex-col items-center gap-2">
211:                 <Loader2 size={24} className="animate-spin" style={{ color: "var(--accent)" }} />
212:                 <p className="text-sm" style={{ color: "var(--muted)" }}>Uploading & parsing…</p>
213:               </div>
214:             ) : (
215:               <div className="flex flex-col items-center gap-2">
216:                 <FileUp size={24} style={{ color: isDragActive ? "var(--accent)" : "var(--ghost)" }} />
217:                 <p className="text-sm font-medium">
218:                   {isDragActive ? "Drop to upload" : "Drag & drop or click to upload"}
219:                 </p>
220:                 <p className="text-xs" style={{ color: "var(--ghost)" }}>
221:                   PDF, DOCX, or image — one file at a time
222:                 </p>
223:               </div>
224:             )}
225:           </div>
226: 
227:           {/* JD reminder if not set */}
228:           {!caseData?.jdText && uploads.length > 0 && (
229:             <div
230:               className="flex items-start gap-3 p-4 rounded-xl mb-6"
231:               style={{ background: "var(--amber-lt)" }}
232:             >
233:               <AlertCircle size={15} style={{ color: "var(--amber)", flexShrink: 0, marginTop: 1 }} />
234:               <p className="text-xs" style={{ color: "var(--amber)" }}>
235:                 No job description was added. For best results, edit this case and add a JD before analyzing.
236:               </p>
237:             </div>
238:           )}
239: 
240:           {/* Run Analysis */}
241:           <button
242:             onClick={handleAnalyze}
243:             disabled={analyzing || uploads.length === 0}
244:             className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
245:             style={{ background: analyzing ? "var(--ink-3)" : "var(--accent)" }}
246:           >
247:             {analyzing ? (
248:               <><Loader2 size={16} className="animate-spin" /> Evaluating…</>
249:             ) : (
250:               <><Sparkles size={16} /> Run AI Evaluation<ChevronRight size={15} /></>
251:             )}
252:           </button>
253: 
254:           <p className="text-xs text-center mt-3" style={{ color: "var(--ghost)" }}>
255:             Upload all documents first, then run evaluation
256:           </p>
257:         </div>
258:       </div>
259: 
260:       {/* RIGHT: Insights panel */}
261:       <div
262:         className="w-72 flex-shrink-0 border-l flex flex-col"
263:         style={{ borderColor: "var(--line)", background: "var(--white)" }}
264:       >
265:         <div className="px-5 py-4 border-b" style={{ borderColor: "var(--line)" }}>
266:           <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ghost)" }}>
267:             AI Insights
268:           </p>
269:         </div>
270:         <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
271:           {insights.map((ins, i) => (
272:             <InsightItem key={i} insight={ins} />
273:           ))}
274:         </div>
275:       </div>
276:     </div>
277:   );
278: }
279: 
280: function InsightItem({ insight }: { insight: Insight }) {
281:   const cfg = {
282:     info: { bg: "var(--blue-lt)",  color: "var(--blue)",  icon: <Sparkles size={11} /> },
283:     warn: { bg: "var(--amber-lt)", color: "var(--amber)", icon: <AlertCircle size={11} /> },
284:     ok:   { bg: "var(--green-lt)", color: "var(--green)", icon: <CheckCircle2 size={11} /> },
285:   }[insight.type];
286: 
287:   return (
288:     <div className="flex items-start gap-2.5 p-3 rounded-lg" style={{ background: cfg.bg }}>
289:       <span style={{ color: cfg.color, marginTop: 1, flexShrink: 0 }}>{cfg.icon}</span>
290:       <p className="text-xs leading-relaxed" style={{ color: cfg.color }}>{insight.text}</p>
291:     </div>
292:   );
293: }
`````

## File: app/(app)/cases/new/page.tsx
`````typescript
  1: "use client";
  2: // app/(app)/cases/new/page.tsx
  3: import { useState } from "react";
  4: import { useRouter } from "next/navigation";
  5: import { useUser } from "@clerk/nextjs";
  6: import { Briefcase, User, ChevronRight } from "lucide-react";
  7: 
  8: export default function NewCasePage() {
  9:   const router = useRouter();
 10:   const { user } = useUser();
 11:   const [title, setTitle] = useState("");
 12:   const [mode, setMode] = useState<"RECRUITER" | "CANDIDATE" | "">("");
 13:   const [jdText, setJdText] = useState("");
 14:   const [preferences, setPreferences] = useState("");
 15:   const [loading, setLoading] = useState(false);
 16:   const [error, setError] = useState("");
 17: 
 18:   async function handleCreate() {
 19:     if (!title.trim() || !mode) {
 20:       setError("Please fill in all required fields.");
 21:       return;
 22:     }
 23:     setLoading(true);
 24:     setError("");
 25: 
 26:     try {
 27:       const res = await fetch("/api/cases", {
 28:         method: "POST",
 29:         headers: { "Content-Type": "application/json" },
 30:         body: JSON.stringify({
 31:           title: title.trim(),
 32:           mode,
 33:           jdText: jdText.trim() || null,
 34:           companyPreferences: preferences.trim() || null,
 35:           email: user?.primaryEmailAddress?.emailAddress,
 36:         }),
 37:       });
 38: 
 39:       if (!res.ok) throw new Error("Failed to create case");
 40:       const data = await res.json();
 41:       router.push(`/cases/${data.case.id}`);
 42:     } catch {
 43:       setError("Something went wrong. Please try again.");
 44:       setLoading(false);
 45:     }
 46:   }
 47: 
 48:   return (
 49:     <div className="p-8 max-w-2xl fade-up">
 50:       <div className="mb-8">
 51:         <h1
 52:           className="text-3xl font-bold mb-1"
 53:           style={{ fontFamily: "var(--font-display)" }}
 54:         >
 55:           New Evaluation Case
 56:         </h1>
 57:         <p className="text-sm" style={{ color: "var(--muted)" }}>
 58:           Set up a new candidate assessment workspace
 59:         </p>
 60:       </div>
 61: 
 62:       {/* Step 1: Case name */}
 63:       <Section label="Case Name" required>
 64:         <input
 65:           type="text"
 66:           value={title}
 67:           onChange={(e) => setTitle(e.target.value)}
 68:           placeholder="e.g. John Doe — Senior Developer"
 69:           className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2"
 70:           style={{
 71:             borderColor: "var(--line)",
 72:             background: "var(--white)",
 73:             color: "var(--ink)",
 74:           }}
 75:         />
 76:       </Section>
 77: 
 78:       {/* Step 2: Mode */}
 79:       <Section label="Evaluation Mode" required>
 80:         <div className="grid grid-cols-2 gap-3">
 81:           {[
 82:             {
 83:               value: "RECRUITER",
 84:               icon: Briefcase,
 85:               title: "Recruiter / HR",
 86:               desc: "Evaluate a candidate for a role",
 87:             },
 88:             {
 89:               value: "CANDIDATE",
 90:               icon: User,
 91:               title: "Candidate / Job Seeker",
 92:               desc: "Check your own profile readiness",
 93:             },
 94:           ].map(({ value, icon: Icon, title: t, desc }) => (
 95:             <button
 96:               key={value}
 97:               onClick={() => setMode(value as any)}
 98:               className="text-left p-4 rounded-xl border-2 transition-all"
 99:               style={{
100:                 borderColor: mode === value ? "var(--accent)" : "var(--line)",
101:                 background: mode === value ? "var(--accent-lt)" : "var(--white)",
102:               }}
103:             >
104:               <div
105:                 className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
106:                 style={{
107:                   background: mode === value ? "var(--accent)" : "var(--surface)",
108:                 }}
109:               >
110:                 <Icon size={16} color={mode === value ? "white" : "var(--muted)"} />
111:               </div>
112:               <div
113:                 className="font-semibold text-sm mb-0.5"
114:                 style={{ fontFamily: "var(--font-display)" }}
115:               >
116:                 {t}
117:               </div>
118:               <div className="text-xs" style={{ color: "var(--muted)" }}>
119:                 {desc}
120:               </div>
121:             </button>
122:           ))}
123:         </div>
124:       </Section>
125: 
126:       {/* Step 3: JD */}
127:       <Section label="Job Description" hint="Optional — paste or type the JD">
128:         <textarea
129:           value={jdText}
130:           onChange={(e) => setJdText(e.target.value)}
131:           placeholder="Paste the job description here..."
132:           rows={5}
133:           className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 resize-none"
134:           style={{
135:             borderColor: "var(--line)",
136:             background: "var(--white)",
137:             color: "var(--ink)",
138:           }}
139:         />
140:       </Section>
141: 
142:       {/* Step 4: Company preferences (recruiter only) */}
143:       {mode === "RECRUITER" && (
144:         <Section label="Company Priorities" hint="Optional — what matters most to you">
145:           <textarea
146:             value={preferences}
147:             onChange={(e) => setPreferences(e.target.value)}
148:             placeholder="e.g. Strong academic record, verified internship experience, coding skills..."
149:             rows={3}
150:             className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 resize-none"
151:             style={{
152:               borderColor: "var(--line)",
153:               background: "var(--white)",
154:               color: "var(--ink)",
155:             }}
156:           />
157:         </Section>
158:       )}
159: 
160:       {error && (
161:         <p className="text-sm mb-4" style={{ color: "var(--red)" }}>
162:           {error}
163:         </p>
164:       )}
165: 
166:       <button
167:         onClick={handleCreate}
168:         disabled={loading || !title || !mode}
169:         className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
170:         style={{ background: "var(--accent)" }}
171:       >
172:         {loading ? "Creating…" : "Create & Open Workspace"}
173:         {!loading && <ChevronRight size={15} />}
174:       </button>
175:     </div>
176:   );
177: }
178: 
179: function Section({
180:   label,
181:   hint,
182:   required,
183:   children,
184: }: {
185:   label: string;
186:   hint?: string;
187:   required?: boolean;
188:   children: React.ReactNode;
189: }) {
190:   return (
191:     <div className="mb-6">
192:       <div className="flex items-baseline gap-1.5 mb-2">
193:         <label
194:           className="text-sm font-semibold"
195:           style={{ fontFamily: "var(--font-display)" }}
196:         >
197:           {label}
198:         </label>
199:         {required && (
200:           <span className="text-xs" style={{ color: "var(--accent)" }}>
201:             *
202:           </span>
203:         )}
204:         {hint && (
205:           <span className="text-xs" style={{ color: "var(--ghost)" }}>
206:             — {hint}
207:           </span>
208:         )}
209:       </div>
210:       {children}
211:     </div>
212:   );
213: }
`````

## File: app/(app)/cases/page.tsx
`````typescript
 1: // app/(app)/cases/page.tsx
 2: import { auth } from "@clerk/nextjs/server";
 3: import { db } from "@/lib/db";
 4: import Link from "next/link";
 5: import { Plus } from "lucide-react";
 6: import CaseCard from "@/components/dashboard/CaseCard";
 7: 
 8: export default async function CasesPage() {
 9:   const { userId } = await auth();
10: 
11:   const user = userId
12:     ? await db.user.findUnique({
13:         where: { clerkId: userId },
14:         include: {
15:           cases: {
16:             orderBy: { createdAt: "desc" },
17:             include: {
18:               uploads: { select: { id: true } },
19:               report: { select: { score: true, recommendation: true } },
20:             },
21:           },
22:         },
23:       })
24:     : null;
25: 
26:   const cases = user?.cases ?? [];
27: 
28:   return (
29:     <div className="p-8 max-w-5xl">
30:       <div className="flex items-center justify-between mb-8 fade-up">
31:         <div>
32:           <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
33:             My Cases
34:           </h1>
35:           <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
36:             {cases.length} evaluation case{cases.length !== 1 ? "s" : ""} total
37:           </p>
38:         </div>
39:         <Link
40:           href="/cases/new"
41:           className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
42:           style={{ background: "var(--accent)" }}
43:         >
44:           <Plus size={15} />
45:           New Case
46:         </Link>
47:       </div>
48: 
49:       {cases.length === 0 ? (
50:         <div
51:           className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-20 text-center"
52:           style={{ borderColor: "var(--line)" }}
53:         >
54:           <p className="text-sm mb-3" style={{ color: "var(--muted)" }}>
55:             No evaluation cases yet
56:           </p>
57:           <Link
58:             href="/cases/new"
59:             className="px-4 py-2 rounded-lg text-sm font-medium text-white"
60:             style={{ background: "var(--accent)" }}
61:           >
62:             Create your first case
63:           </Link>
64:         </div>
65:       ) : (
66:         <div className="grid grid-cols-2 gap-4 fade-up fade-up-delay-1">
67:           {cases.map((c) => (
68:             <CaseCard key={c.id} case={c} />
69:           ))}
70:         </div>
71:       )}
72:     </div>
73:   );
74: }
`````

## File: app/(app)/dashboard/loading.tsx
`````typescript
1: // app/(app)/dashboard/loading.tsx
2: import { DashboardSkeleton } from "@/components/ui/Skeleton";
3: export default function DashboardLoading() {
4:   return <DashboardSkeleton />;
5: }
`````

## File: app/(app)/dashboard/page.tsx
`````typescript
  1: // app/(app)/dashboard/page.tsx
  2: import { auth } from "@clerk/nextjs/server";
  3: import { db } from "@/lib/db";
  4: import Link from "next/link";
  5: import { Plus, TrendingUp, FileCheck, AlertTriangle, Clock } from "lucide-react";
  6: import CaseCard from "@/components/dashboard/CaseCard";
  7: import StatsCard from "@/components/dashboard/StatsCard";
  8: 
  9: export default async function DashboardPage() {
 10:   const { userId } = await auth();
 11: 
 12:   const user = userId
 13:     ? await db.user.findUnique({
 14:         where: { clerkId: userId },
 15:         include: {
 16:           cases: {
 17:             orderBy: { createdAt: "desc" },
 18:             take: 6,
 19:             include: {
 20:               uploads: { select: { id: true } },
 21:               report: { select: { score: true, recommendation: true } },
 22:             },
 23:           },
 24:         },
 25:       })
 26:     : null;
 27: 
 28:   const cases = user?.cases ?? [];
 29:   const completed  = cases.filter((c) => c.status === "COMPLETED").length;
 30:   const processing = cases.filter((c) => c.status === "PROCESSING").length;
 31:   const avgScore   = completed
 32:     ? Math.round(cases.filter((c) => c.report).reduce((s, c) => s + (c.report?.score ?? 0), 0) / completed)
 33:     : 0;
 34: 
 35:   return (
 36:     <div className="p-8 max-w-6xl">
 37:       {/* Header */}
 38:       <div className="flex items-start justify-between mb-8 fade-up">
 39:         <div>
 40:           <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
 41:             Dashboard
 42:           </h1>
 43:           <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
 44:             Manage your evaluation cases and candidate reports
 45:           </p>
 46:         </div>
 47:         <Link
 48:           href="/cases/new"
 49:           className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
 50:           style={{ background: "var(--accent)" }}
 51:         >
 52:           <Plus size={15} />
 53:           New Evaluation Case
 54:         </Link>
 55:       </div>
 56: 
 57:       {/* Stats */}
 58:       <div className="grid grid-cols-4 gap-4 mb-8">
 59:         <StatsCard icon="FileCheck"     label="Total Cases"  value={cases.length} color="accent" delay={1} />
 60:         <StatsCard icon="TrendingUp"    label="Completed"    value={completed}    color="green"  delay={2} />
 61:         <StatsCard icon="Clock"         label="Processing"   value={processing}   color="amber"  delay={3} />
 62:         <StatsCard icon="AlertTriangle" label="Avg Score"    value={avgScore ? `${avgScore}%` : "—"} color="blue" delay={4} />
 63:       </div>
 64: 
 65:       {/* Recent Cases */}
 66:       <div className="fade-up fade-up-delay-3">
 67:         <div className="flex items-center justify-between mb-4">
 68:           <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
 69:             Recent Cases
 70:           </h2>
 71:           <Link href="/cases" className="text-sm" style={{ color: "var(--accent)" }}>
 72:             View all →
 73:           </Link>
 74:         </div>
 75: 
 76:         {cases.length === 0 ? (
 77:           <EmptyState />
 78:         ) : (
 79:           <div className="grid grid-cols-2 gap-4">
 80:             {cases.map((c) => (
 81:               <CaseCard key={c.id} case={c} />
 82:             ))}
 83:           </div>
 84:         )}
 85:       </div>
 86:     </div>
 87:   );
 88: }
 89: 
 90: function EmptyState() {
 91:   return (
 92:     <div
 93:       className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-16 text-center"
 94:       style={{ borderColor: "var(--line)" }}
 95:     >
 96:       <div
 97:         className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
 98:         style={{ background: "var(--accent-lt)" }}
 99:       >
100:         <FileCheck size={22} style={{ color: "var(--accent)" }} />
101:       </div>
102:       <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
103:         No cases yet
104:       </h3>
105:       <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
106:         Create your first evaluation case to get started
107:       </p>
108:       <Link
109:         href="/cases/new"
110:         className="px-4 py-2 rounded-lg text-sm font-medium text-white"
111:         style={{ background: "var(--accent)" }}
112:       >
113:         Create Case
114:       </Link>
115:     </div>
116:   );
117: }
`````

## File: app/(app)/report/[caseId]/loading.tsx
`````typescript
1: // app/(app)/report/[caseId]/loading.tsx
2: import { ReportSkeleton } from "@/components/ui/Skeleton";
3: export default function ReportLoading() {
4:   return <ReportSkeleton />;
5: }
`````

## File: app/(app)/report/[caseId]/page.tsx
`````typescript
  1: // app/(app)/report/[caseId]/page.tsx
  2: import { auth } from "@clerk/nextjs/server";
  3: import { db } from "@/lib/db";
  4: import { notFound } from "next/navigation";
  5: import { getScoreLabel } from "@/lib/scoring/score";
  6: import Link from "next/link";
  7: import { ArrowLeft, ShieldCheck, AlertTriangle, CheckCircle2, Clock, XCircle, HelpCircle } from "lucide-react";
  8: import PrintButton from "@/components/report/PrintButton";
  9: 
 10: export default async function ReportPage({ params }: { params: Promise<{ caseId: string }> }) {
 11:   const { userId } = await auth();
 12:   const { caseId } = await params;
 13: 
 14:   const report = await db.report.findFirst({
 15:     where: { case: { id: caseId, user: { clerkId: userId! } } },
 16:     include: { case: { select: { title: true, mode: true, jdText: true } } },
 17:   });
 18: 
 19:   if (!report) return notFound();
 20: 
 21:   const scoreInfo = getScoreLabel(report.score);
 22:   const breakdown = report.scoreBreakdown as Record<string, number>;
 23:   const verifications = report.verifications as {
 24:     category: string; label: string; status: string; note: string;
 25:   }[];
 26: 
 27:   return (
 28:     <div className="p-8 max-w-4xl fade-up">
 29:       {/* Top bar */}
 30:       <div className="flex items-center justify-between mb-6">
 31:         <Link
 32:           href="/dashboard"
 33:           className="inline-flex items-center gap-1.5 text-sm transition-colors hover:opacity-70"
 34:           style={{ color: "var(--muted)" }}
 35:         >
 36:           <ArrowLeft size={14} /> Back to Dashboard
 37:         </Link>
 38:         <PrintButton caseId={caseId} />
 39:       </div>
 40: 
 41:       {/* Header card */}
 42:       <div
 43:         className="rounded-2xl p-7 mb-6 border"
 44:         style={{ background: "var(--white)", borderColor: "var(--line)" }}
 45:       >
 46:         <div className="flex items-start justify-between">
 47:           <div>
 48:             <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--ghost)" }}>
 49:               Evaluation Report
 50:             </p>
 51:             <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
 52:               {report.case.title}
 53:             </h1>
 54:             <p className="text-sm" style={{ color: "var(--muted)" }}>
 55:               {report.case.mode === "RECRUITER" ? "Recruiter Assessment" : "Candidate Readiness Check"}
 56:             </p>
 57:           </div>
 58: 
 59:           {/* Score circle */}
 60:           <div className="flex flex-col items-center">
 61:             <div
 62:               className="w-24 h-24 rounded-full flex flex-col items-center justify-center border-4"
 63:               style={{
 64:                 borderColor:
 65:                   report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
 66:               }}
 67:             >
 68:               <span
 69:                 className="text-2xl font-bold leading-none"
 70:                 style={{
 71:                   fontFamily: "var(--font-display)",
 72:                   color: report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
 73:                 }}
 74:               >
 75:                 {Math.round(report.score)}
 76:               </span>
 77:               <span className="text-[10px]" style={{ color: "var(--ghost)" }}>/ 100</span>
 78:             </div>
 79:             <span
 80:               className="text-xs font-medium mt-2 px-2 py-0.5 rounded-full"
 81:               style={{
 82:                 background: report.score >= 70 ? "var(--green-lt)" : report.score >= 50 ? "var(--amber-lt)" : "var(--red-lt)",
 83:                 color: report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
 84:               }}
 85:             >
 86:               {scoreInfo.label}
 87:             </span>
 88:           </div>
 89:         </div>
 90: 
 91:         {/* Recommendation banner */}
 92:         <div
 93:           className="mt-5 flex items-center gap-3 p-4 rounded-xl"
 94:           style={{ background: "var(--accent-lt)" }}
 95:         >
 96:           <ShieldCheck size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
 97:           <div>
 98:             <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>AI Recommendation</p>
 99:             <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{report.recommendation}</p>
100:           </div>
101:         </div>
102:       </div>
103: 
104:       <div className="grid grid-cols-2 gap-6 mb-6">
105:         {/* Summary */}
106:         <ReportSection title="Summary">
107:           <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{report.summary}</p>
108:         </ReportSection>
109: 
110:         {/* Score Breakdown */}
111:         <ReportSection title="Score Breakdown">
112:           <div className="space-y-3">
113:             {Object.entries(breakdown).map(([key, val]) => (
114:               <div key={key}>
115:                 <div className="flex justify-between text-xs mb-1">
116:                   <span style={{ color: "var(--muted)" }}>{formatKey(key)}</span>
117:                   <span className="font-semibold" style={{ color: "var(--ink)" }}>{Math.round(val)}%</span>
118:                 </div>
119:                 <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
120:                   <div
121:                     className="h-full rounded-full transition-all"
122:                     style={{
123:                       width: `${Math.round(val)}%`,
124:                       background: val >= 70 ? "var(--green)" : val >= 50 ? "var(--amber)" : "var(--red)",
125:                     }}
126:                   />
127:                 </div>
128:               </div>
129:             ))}
130:           </div>
131:         </ReportSection>
132:       </div>
133: 
134:       {/* Verification Table */}
135:       {verifications?.length > 0 && (
136:         <div
137:           className="rounded-2xl border mb-6 overflow-hidden"
138:           style={{ background: "var(--white)", borderColor: "var(--line)" }}
139:         >
140:           <div className="px-6 py-4 border-b" style={{ borderColor: "var(--line)" }}>
141:             <h2 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>Verification Details</h2>
142:           </div>
143:           <table className="w-full text-sm">
144:             <thead>
145:               <tr style={{ background: "var(--surface)" }}>
146:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Category</th>
147:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Item</th>
148:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Status</th>
149:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Note</th>
150:               </tr>
151:             </thead>
152:             <tbody>
153:               {verifications.map((v, i) => (
154:                 <tr
155:                   key={i}
156:                   className="border-t"
157:                   style={{ borderColor: "var(--line)" }}
158:                 >
159:                   <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{v.category}</td>
160:                   <td className="px-6 py-3 text-xs font-medium">{v.label}</td>
161:                   <td className="px-6 py-3">
162:                     <VerificationBadge status={v.status} />
163:                   </td>
164:                   <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{v.note}</td>
165:                 </tr>
166:               ))}
167:             </tbody>
168:           </table>
169:         </div>
170:       )}
171: 
172:       <div className="grid grid-cols-3 gap-6 mb-6">
173:         <ListSection title="Strengths" items={report.strengths} color="green" />
174:         <ListSection title="Weaknesses" items={report.weaknesses} color="amber" />
175:         <ListSection title="Missing Items" items={report.missingItems} color="red" />
176:       </div>
177: 
178:       {report.riskFlags?.length > 0 && (
179:         <div
180:           className="rounded-2xl border p-6 mb-6"
181:           style={{ background: "var(--red-lt)", borderColor: "var(--red)" }}
182:         >
183:           <div className="flex items-center gap-2 mb-3">
184:             <AlertTriangle size={15} style={{ color: "var(--red)" }} />
185:             <h2 className="font-semibold text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--red)" }}>
186:               Risk Flags
187:             </h2>
188:           </div>
189:           <ul className="space-y-1.5">
190:             {report.riskFlags.map((flag, i) => (
191:               <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--red)" }}>
192:                 <span className="mt-1">•</span> {flag}
193:               </li>
194:             ))}
195:           </ul>
196:         </div>
197:       )}
198: 
199:       {/* Disclaimer */}
200:       <p className="text-xs text-center mt-4" style={{ color: "var(--ghost)" }}>
201:         This report is AI-assisted and for preliminary evaluation only. It does not replace official verification.
202:       </p>
203:     </div>
204:   );
205: }
206: 
207: function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
208:   return (
209:     <div
210:       className="rounded-2xl border p-6"
211:       style={{ background: "var(--white)", borderColor: "var(--line)" }}
212:     >
213:       <h2
214:         className="font-semibold mb-4"
215:         style={{ fontFamily: "var(--font-display)" }}
216:       >
217:         {title}
218:       </h2>
219:       {children}
220:     </div>
221:   );
222: }
223: 
224: function ListSection({ title, items, color }: { title: string; items: string[]; color: string }) {
225:   const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
226:     green: { bg: "var(--white)",    text: "var(--green)", dot: "var(--green)" },
227:     amber: { bg: "var(--white)",    text: "var(--amber)", dot: "var(--amber)" },
228:     red:   { bg: "var(--white)",    text: "var(--red)",   dot: "var(--red)" },
229:   };
230:   const c = colorMap[color];
231: 
232:   return (
233:     <div
234:       className="rounded-2xl border p-5"
235:       style={{ background: c.bg, borderColor: "var(--line)" }}
236:     >
237:       <h2
238:         className="font-semibold text-sm mb-3"
239:         style={{ fontFamily: "var(--font-display)", color: c.text }}
240:       >
241:         {title}
242:       </h2>
243:       {items?.length === 0 ? (
244:         <p className="text-xs" style={{ color: "var(--ghost)" }}>None noted.</p>
245:       ) : (
246:         <ul className="space-y-1.5">
247:           {items?.map((item, i) => (
248:             <li key={i} className="text-xs flex items-start gap-2">
249:               <span style={{ color: c.dot, marginTop: "3px", flexShrink: 0 }}>•</span>
250:               <span style={{ color: "var(--ink)" }}>{item}</span>
251:             </li>
252:           ))}
253:         </ul>
254:       )}
255:     </div>
256:   );
257: }
258: 
259: function VerificationBadge({ status }: { status: string }) {
260:   const map: Record<string, { icon: React.ReactNode; label: string; style: React.CSSProperties }> = {
261:     "Verified":           { icon: <CheckCircle2 size={11} />, label: "Verified",   style: { background: "var(--green-lt)", color: "var(--green)" } },
262:     "Not Verified":       { icon: <XCircle size={11} />,      label: "Not Verified",style: { background: "var(--red-lt)",   color: "var(--red)" } },
263:     "Pending":            { icon: <Clock size={11} />,         label: "Pending",    style: { background: "var(--amber-lt)", color: "var(--amber)" } },
264:     "Risk":               { icon: <AlertTriangle size={11} />, label: "Risk",       style: { background: "var(--red-lt)",   color: "var(--red)" } },
265:     "Manual Required":    { icon: <HelpCircle size={11} />,    label: "Manual",     style: { background: "var(--blue-lt)",  color: "var(--blue)" } },
266:   };
267:   const cfg = map[status] ?? map["Pending"];
268:   return (
269:     <span
270:       className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
271:       style={cfg.style}
272:     >
273:       {cfg.icon} {cfg.label}
274:     </span>
275:   );
276: }
277: 
278: function formatKey(key: string): string {
279:   return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim();
280: }
`````

## File: app/(app)/reports/page.tsx
`````typescript
  1: // app/(app)/reports/page.tsx
  2: import { auth } from "@clerk/nextjs/server";
  3: import { db } from "@/lib/db";
  4: import Link from "next/link";
  5: import { getScoreColor, getScoreBg } from "@/lib/scoring/score";
  6: import { ArrowRight, FileText, Calendar } from "lucide-react";
  7: import { formatDistanceToNow } from "date-fns";
  8: 
  9: export default async function ReportsPage() {
 10:   const { userId } = await auth();
 11: 
 12:   const user = userId
 13:     ? await db.user.findUnique({
 14:         where: { clerkId: userId },
 15:         include: {
 16:           cases: {
 17:             where: { status: "COMPLETED" },
 18:             orderBy: { createdAt: "desc" },
 19:             include: {
 20:               report: true,
 21:             },
 22:           },
 23:         },
 24:       })
 25:     : null;
 26: 
 27:   const cases = user?.cases ?? [];
 28: 
 29:   return (
 30:     <div className="p-8 max-w-4xl">
 31:       <div className="mb-8 fade-up">
 32:         <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
 33:           Reports
 34:         </h1>
 35:         <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
 36:           All completed evaluations — {cases.length} report{cases.length !== 1 ? "s" : ""}
 37:         </p>
 38:       </div>
 39: 
 40:       {cases.length === 0 ? (
 41:         <div
 42:           className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-20 text-center fade-up"
 43:           style={{ borderColor: "var(--line)" }}
 44:         >
 45:           <div
 46:             className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
 47:             style={{ background: "var(--accent-lt)" }}
 48:           >
 49:             <FileText size={20} style={{ color: "var(--accent)" }} />
 50:           </div>
 51:           <p className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
 52:             No completed reports yet
 53:           </p>
 54:           <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
 55:             Complete an evaluation case to see reports here
 56:           </p>
 57:           <Link
 58:             href="/cases/new"
 59:             className="px-4 py-2 rounded-lg text-sm font-medium text-white"
 60:             style={{ background: "var(--accent)" }}
 61:           >
 62:             Create a case
 63:           </Link>
 64:         </div>
 65:       ) : (
 66:         <div className="space-y-3 fade-up fade-up-delay-1">
 67:           {cases.map((c) => {
 68:             const score = c.report?.score ?? 0;
 69:             return (
 70:               <Link
 71:                 key={c.id}
 72:                 href={`/report/${c.id}`}
 73:                 className="flex items-center justify-between p-5 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5 group"
 74:                 style={{ background: "var(--white)", borderColor: "var(--line)" }}
 75:               >
 76:                 <div className="flex items-center gap-4">
 77:                   {/* Score badge */}
 78:                   <div
 79:                     className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-sm"
 80:                     style={{
 81:                       background: getScoreBg(score),
 82:                       color: getScoreColor(score),
 83:                       fontFamily: "var(--font-display)",
 84:                     }}
 85:                   >
 86:                     {Math.round(score)}
 87:                   </div>
 88:                   <div>
 89:                     <h3
 90:                       className="font-semibold text-sm mb-0.5"
 91:                       style={{ fontFamily: "var(--font-display)" }}
 92:                     >
 93:                       {c.title}
 94:                     </h3>
 95:                     <div className="flex items-center gap-3">
 96:                       <span
 97:                         className="text-xs px-2 py-0.5 rounded-full"
 98:                         style={{ background: "var(--surface)", color: "var(--muted)" }}
 99:                       >
100:                         {c.mode === "RECRUITER" ? "Recruiter" : "Candidate"}
101:                       </span>
102:                       <span className="flex items-center gap-1 text-xs" style={{ color: "var(--ghost)" }}>
103:                         <Calendar size={10} />
104:                         {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
105:                       </span>
106:                     </div>
107:                   </div>
108:                 </div>
109: 
110:                 <div className="flex items-center gap-4">
111:                   {c.report?.recommendation && (
112:                     <span
113:                       className="text-xs font-medium px-3 py-1 rounded-full hidden sm:block"
114:                       style={{
115:                         background: getScoreBg(score),
116:                         color: getScoreColor(score),
117:                       }}
118:                     >
119:                       {c.report.recommendation}
120:                     </span>
121:                   )}
122:                   <ArrowRight
123:                     size={15}
124:                     className="transition-transform group-hover:translate-x-0.5"
125:                     style={{ color: "var(--ghost)" }}
126:                   />
127:                 </div>
128:               </Link>
129:             );
130:           })}
131:         </div>
132:       )}
133:     </div>
134:   );
135: }
`````

## File: app/(app)/settings/page.tsx
`````typescript
 1: "use client";
 2: import { useUser } from "@clerk/nextjs";
 3: import { Mail, User, Shield } from "lucide-react";
 4: 
 5: export default function SettingsPage() {
 6:   const { user } = useUser();
 7: 
 8:   return (
 9:     <div className="p-8 max-w-2xl">
10:       <div className="mb-8 fade-up">
11:         <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
12:           Settings
13:         </h1>
14:         <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
15:           Your account information
16:         </p>
17:       </div>
18: 
19:       <div
20:         className="rounded-2xl border p-6 space-y-5 fade-up fade-up-delay-1"
21:         style={{ background: "var(--white)", borderColor: "var(--line)" }}
22:       >
23:         <Row icon={User} label="Full Name" value={user?.fullName ?? "—"} />
24:         <Row icon={Mail} label="Email" value={user?.primaryEmailAddress?.emailAddress ?? "—"} />
25:         <Row icon={Shield} label="Account ID" value={user?.id ?? "—"} />
26:       </div>
27: 
28:       <div
29:         className="rounded-2xl border p-6 mt-5 fade-up fade-up-delay-2"
30:         style={{ background: "var(--white)", borderColor: "var(--line)" }}
31:       >
32:         <p className="text-sm font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
33:           Manage Account
34:         </p>
35:         <p className="text-xs mb-4" style={{ color: "var(--muted)" }}>
36:           Update your profile, password, and connected accounts via Clerk.
37:         </p>
38:         <a
39:           href="https://accounts.clerk.dev/user"
40:           target="_blank"
41:           rel="noopener noreferrer"
42:           className="inline-flex px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
43:           style={{ background: "var(--accent)" }}
44:         >
45:           Open Account Portal
46:         </a>
47:       </div>
48:     </div>
49:   );
50: }
51: 
52: function Row({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
53:   return (
54:     <div className="flex items-center gap-4">
55:       <div
56:         className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
57:         style={{ background: "var(--accent-lt)" }}
58:       >
59:         <Icon size={15} style={{ color: "var(--accent)" }} />
60:       </div>
61:       <div>
62:         <p className="text-xs" style={{ color: "var(--muted)" }}>{label}</p>
63:         <p className="text-sm font-medium">{value}</p>
64:       </div>
65:     </div>
66:   );
67: }
`````

## File: app/(app)/error.tsx
`````typescript
 1: "use client";
 2: // app/(app)/error.tsx
 3: import { useEffect } from "react";
 4: import { AlertTriangle, RefreshCw } from "lucide-react";
 5: 
 6: export default function AppError({
 7:   error,
 8:   reset,
 9: }: {
10:   error: Error & { digest?: string };
11:   reset: () => void;
12: }) {
13:   useEffect(() => {
14:     console.error("[AppError]", error);
15:   }, [error]);
16: 
17:   return (
18:     <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center">
19:       <div
20:         className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
21:         style={{ background: "var(--red-lt)" }}
22:       >
23:         <AlertTriangle size={24} style={{ color: "var(--red)" }} />
24:       </div>
25:       <h2
26:         className="text-xl font-bold mb-2"
27:         style={{ fontFamily: "var(--font-display)" }}
28:       >
29:         Something went wrong
30:       </h2>
31:       <p className="text-sm mb-6 max-w-sm" style={{ color: "var(--muted)" }}>
32:         {error.message || "An unexpected error occurred. Please try again."}
33:       </p>
34:       <button
35:         onClick={reset}
36:         className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium transition-all hover:opacity-90"
37:         style={{ background: "var(--accent)" }}
38:       >
39:         <RefreshCw size={14} />
40:         Try again
41:       </button>
42:     </div>
43:   );
44: }
`````

## File: app/(app)/layout.tsx
`````typescript
 1: // app/(app)/layout.tsx
 2: import Sidebar from "@/components/layout/Sidebar";
 3: 
 4: export default function AppLayout({ children }: { children: React.ReactNode }) {
 5:   return (
 6:     <div className="flex min-h-screen">
 7:       <Sidebar />
 8:       <main className="flex-1 ml-60 min-h-screen" style={{ background: "var(--surface)" }}>
 9:         {children}
10:       </main>
11:     </div>
12:   );
13: }
`````

## File: app/api/analyze/route.ts
`````typescript
 1: // app/api/analyze/route.ts
 2: import { NextRequest, NextResponse } from "next/server";
 3: import { auth } from "@clerk/nextjs/server";
 4: import { db } from "@/lib/db";
 5: import { runEvaluationPipeline } from "@/lib/ai/pipeline";
 6: 
 7: export async function POST(req: NextRequest) {
 8:   const { userId } = await auth();
 9:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
10: 
11:   const { caseId } = await req.json();
12:   if (!caseId) return NextResponse.json({ error: "caseId required" }, { status: 400 });
13: 
14:   // Fetch case with uploads
15:   const caseRecord = await db.case.findFirst({
16:     where: { id: caseId, user: { clerkId: userId } },
17:     include: { uploads: true },
18:   });
19: 
20:   if (!caseRecord) return NextResponse.json({ error: "Case not found" }, { status: 404 });
21: 
22:   if (!caseRecord.uploads.length) {
23:     return NextResponse.json({ error: "No files uploaded yet" }, { status: 400 });
24:   }
25: 
26:   // Mark as processing
27:   await db.case.update({ where: { id: caseId }, data: { status: "PROCESSING" } });
28: 
29:   try {
30:     const result = await runEvaluationPipeline({
31:       caseId,
32:       uploads: caseRecord.uploads,
33:       jdText: caseRecord.jdText,
34:       companyPreferences: caseRecord.companyPreferences,
35:       mode: caseRecord.mode,
36:     });
37: 
38:     // Save report
39:     const report = await db.report.upsert({
40:       where: { caseId },
41:       create: {
42:         caseId,
43:         summary: result.analysis.summary,
44:         strengths: result.analysis.strengths,
45:         weaknesses: result.analysis.weaknesses,
46:         missingItems: result.analysis.missingItems,
47:         riskFlags: result.analysis.riskFlags,
48:         recommendation: result.analysis.recommendation,
49:         score: result.finalScore,
50:         scoreBreakdown: result.analysis.scoreBreakdown,
51:         verifications: result.analysis.verifications,
52:       },
53:       update: {
54:         summary: result.analysis.summary,
55:         strengths: result.analysis.strengths,
56:         weaknesses: result.analysis.weaknesses,
57:         missingItems: result.analysis.missingItems,
58:         riskFlags: result.analysis.riskFlags,
59:         recommendation: result.analysis.recommendation,
60:         score: result.finalScore,
61:         scoreBreakdown: result.analysis.scoreBreakdown,
62:         verifications: result.analysis.verifications,
63:       },
64:     });
65: 
66:     await db.case.update({
67:       where: { id: caseId },
68:       data: { status: "COMPLETED", finalScore: result.finalScore },
69:     });
70: 
71:     return NextResponse.json({ report });
72:   } catch (err) {
73:     console.error("[analyze] Pipeline error:", err);
74:     await db.case.update({ where: { id: caseId }, data: { status: "FAILED" } });
75:     return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
76:   }
77: }
`````

## File: app/api/cases/[caseId]/route.ts
`````typescript
 1: // app/api/cases/[caseId]/route.ts
 2: import { NextRequest, NextResponse } from "next/server";
 3: import { auth } from "@clerk/nextjs/server";
 4: import { db } from "@/lib/db";
 5: 
 6: export async function GET(_req: NextRequest, { params }: { params: Promise<{ caseId: string }> }) {
 7:   const { userId } = await auth();
 8:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 9:   const { caseId } = await params;
10: 
11:   const caseRecord = await db.case.findFirst({
12:     where: { id: caseId, user: { clerkId: userId } },
13:     include: {
14:       uploads: true,
15:       report: true,
16:     },
17:   });
18: 
19:   if (!caseRecord) return NextResponse.json({ error: "Not found" }, { status: 404 });
20: 
21:   return NextResponse.json({ case: caseRecord });
22: }
23: 
24: export async function PATCH(req: NextRequest, { params }: { params: Promise<{ caseId: string }> }) {
25:   const { userId } = await auth();
26:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
27:   const { caseId } = await params;
28: 
29:   const body = await req.json();
30:   const { jdText, companyPreferences, title } = body;
31: 
32:   const updated = await db.case.updateMany({
33:     where: { id: caseId, user: { clerkId: userId } },
34:     data: {
35:       ...(title !== undefined && { title }),
36:       ...(jdText !== undefined && { jdText }),
37:       ...(companyPreferences !== undefined && { companyPreferences }),
38:     },
39:   });
40: 
41:   return NextResponse.json({ updated });
42: }
43: 
44: export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ caseId: string }> }) {
45:   const { userId } = await auth();
46:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
47:   const { caseId } = await params;
48: 
49:   await db.case.deleteMany({
50:     where: { id: caseId, user: { clerkId: userId } },
51:   });
52: 
53:   return NextResponse.json({ deleted: true });
54: }
`````

## File: app/api/cases/route.ts
`````typescript
 1: // app/api/cases/route.ts
 2: import { NextRequest, NextResponse } from "next/server";
 3: import { auth } from "@clerk/nextjs/server";
 4: import { db } from "@/lib/db";
 5: 
 6: // GET — list all cases for current user
 7: export async function GET() {
 8:   const { userId } = await auth();
 9:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
10: 
11:   const cases = await db.case.findMany({
12:     where: { user: { clerkId: userId } },
13:     include: { uploads: { select: { id: true, fileType: true, processingStatus: true } }, report: { select: { score: true, recommendation: true } } },
14:     orderBy: { createdAt: "desc" },
15:   });
16: 
17:   return NextResponse.json({ cases });
18: }
19: 
20: // POST — create new case
21: export async function POST(req: NextRequest) {
22:   const { userId } = await auth();
23:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
24: 
25:   const body = await req.json();
26:   const { title, mode, jdText, companyPreferences } = body;
27: 
28:   if (!title || !mode) {
29:     return NextResponse.json({ error: "title and mode are required" }, { status: 400 });
30:   }
31: 
32:   // Ensure user exists in DB
33:   const user = await db.user.upsert({
34:     where: { clerkId: userId },
35:     create: { clerkId: userId, email: body.email ?? "", role: mode === "RECRUITER" ? "RECRUITER" : "CANDIDATE" },
36:     update: {},
37:   });
38: 
39:   const newCase = await db.case.create({
40:     data: { title, userId: user.id, mode, jdText, companyPreferences },
41:   });
42: 
43:   return NextResponse.json({ case: newCase }, { status: 201 });
44: }
`````

## File: app/api/report/export/route.ts
`````typescript
  1: // app/api/report/export/route.ts
  2: // Generates a clean HTML page the browser can print-to-PDF
  3: // This avoids heavy PDF libraries — uses browser's native print dialog
  4: 
  5: import { NextRequest, NextResponse } from "next/server";
  6: import { auth } from "@clerk/nextjs/server";
  7: import { db } from "@/lib/db";
  8: 
  9: export async function GET(req: NextRequest) {
 10:   const { userId } = await auth();
 11:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 12: 
 13:   const caseId = req.nextUrl.searchParams.get("caseId");
 14:   if (!caseId) return NextResponse.json({ error: "caseId required" }, { status: 400 });
 15: 
 16:   const report = await db.report.findFirst({
 17:     where: { case: { id: caseId, user: { clerkId: userId } } },
 18:     include: { case: { select: { title: true, mode: true, createdAt: true } } },
 19:   });
 20: 
 21:   if (!report) return NextResponse.json({ error: "Not found" }, { status: 404 });
 22: 
 23:   const breakdown = report.scoreBreakdown as Record<string, number>;
 24:   const verifications = report.verifications as {
 25:     category: string; label: string; status: string; note: string;
 26:   }[];
 27: 
 28:   const scoreColor =
 29:     report.score >= 70 ? "#12b76a" : report.score >= 50 ? "#f79009" : "#f04438";
 30: 
 31:   const statusColor: Record<string, string> = {
 32:     "Verified":        "#12b76a",
 33:     "Not Verified":    "#f04438",
 34:     "Pending":         "#f79009",
 35:     "Risk":            "#f04438",
 36:     "Manual Required": "#2e90fa",
 37:   };
 38: 
 39:   function formatKey(key: string): string {
 40:     return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim();
 41:   }
 42: 
 43:   const html = `<!DOCTYPE html>
 44: <html lang="en">
 45: <head>
 46:   <meta charset="UTF-8" />
 47:   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 48:   <title>TalentProof AI — ${report.case.title}</title>
 49:   <style>
 50:     * { box-sizing: border-box; margin: 0; padding: 0; }
 51:     body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; color: #1a1a24; background: #fff; padding: 40px; line-height: 1.6; }
 52:     h1 { font-size: 22px; font-weight: 700; letter-spacing: -0.02em; }
 53:     h2 { font-size: 14px; font-weight: 600; margin-bottom: 12px; }
 54:     .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 2px solid #e2e2ea; }
 55:     .brand { font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #9898a8; margin-bottom: 6px; }
 56:     .score-circle { width: 80px; height: 80px; border-radius: 50%; border: 4px solid ${scoreColor}; display: flex; flex-direction: column; align-items: center; justify-content: center; }
 57:     .score-number { font-size: 22px; font-weight: 700; color: ${scoreColor}; line-height: 1; }
 58:     .score-label { font-size: 9px; color: #9898a8; }
 59:     .recommendation { background: #ede9ff; border-radius: 10px; padding: 14px 18px; margin-bottom: 24px; display: flex; gap: 10px; align-items: flex-start; }
 60:     .rec-label { font-size: 11px; font-weight: 600; color: #5b4dff; margin-bottom: 2px; }
 61:     .rec-text { font-size: 13px; font-weight: 500; color: #1a1a24; }
 62:     .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
 63:     .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 20px; }
 64:     .card { border: 1px solid #e2e2ea; border-radius: 12px; padding: 18px; }
 65:     .summary-text { font-size: 12px; color: #2a2a38; line-height: 1.7; }
 66:     .bar-row { margin-bottom: 10px; }
 67:     .bar-label { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px; color: #6b6b80; }
 68:     .bar-label span:last-child { font-weight: 600; color: #1a1a24; }
 69:     .bar-track { height: 6px; background: #e2e2ea; border-radius: 3px; overflow: hidden; }
 70:     .bar-fill { height: 100%; border-radius: 3px; }
 71:     table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
 72:     th { text-align: left; padding: 8px 14px; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #9898a8; background: #f8f8fc; border-bottom: 1px solid #e2e2ea; }
 73:     td { padding: 9px 14px; font-size: 11px; border-bottom: 1px solid #e2e2ea; vertical-align: top; }
 74:     .badge { display: inline-block; padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: 600; }
 75:     .list-item { font-size: 11px; color: #2a2a38; margin-bottom: 6px; display: flex; gap: 6px; }
 76:     .list-dot { flex-shrink: 0; margin-top: 2px; }
 77:     .risk-box { background: #fee4e2; border: 1px solid #f04438; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px; }
 78:     .risk-title { font-size: 12px; font-weight: 600; color: #f04438; margin-bottom: 8px; }
 79:     .disclaimer { font-size: 10px; color: #9898a8; text-align: center; margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e2ea; }
 80:     .section-title { font-size: 13px; font-weight: 600; margin-bottom: 12px; color: #0a0a0f; }
 81:     @media print {
 82:       body { padding: 20px; }
 83:       @page { margin: 1.5cm; }
 84:     }
 85:   </style>
 86: </head>
 87: <body>
 88:   <div class="header">
 89:     <div>
 90:       <div class="brand">TalentProof AI — Evaluation Report</div>
 91:       <h1>${report.case.title}</h1>
 92:       <p style="color:#6b6b80;font-size:12px;margin-top:4px;">
 93:         ${report.case.mode === "RECRUITER" ? "Recruiter Assessment" : "Candidate Readiness Check"} &nbsp;·&nbsp;
 94:         ${new Date(report.case.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
 95:       </p>
 96:     </div>
 97:     <div style="text-align:center">
 98:       <div class="score-circle">
 99:         <div class="score-number">${Math.round(report.score)}</div>
100:         <div class="score-label">/ 100</div>
101:       </div>
102:     </div>
103:   </div>
104: 
105:   <div class="recommendation">
106:     <div>
107:       <div class="rec-label">AI Recommendation</div>
108:       <div class="rec-text">${report.recommendation}</div>
109:     </div>
110:   </div>
111: 
112:   <div class="grid2">
113:     <div class="card">
114:       <div class="section-title">Summary</div>
115:       <p class="summary-text">${report.summary}</p>
116:     </div>
117:     <div class="card">
118:       <div class="section-title">Score Breakdown</div>
119:       ${Object.entries(breakdown).map(([key, val]) => `
120:         <div class="bar-row">
121:           <div class="bar-label"><span>${formatKey(key)}</span><span>${Math.round(val)}%</span></div>
122:           <div class="bar-track"><div class="bar-fill" style="width:${Math.round(val)}%;background:${val >= 70 ? "#12b76a" : val >= 50 ? "#f79009" : "#f04438"}"></div></div>
123:         </div>
124:       `).join("")}
125:     </div>
126:   </div>
127: 
128:   ${verifications?.length > 0 ? `
129:   <div class="card" style="margin-bottom:20px">
130:     <div class="section-title">Verification Details</div>
131:     <table>
132:       <thead>
133:         <tr>
134:           <th>Category</th>
135:           <th>Item</th>
136:           <th>Status</th>
137:           <th>Note</th>
138:         </tr>
139:       </thead>
140:       <tbody>
141:         ${verifications.map(v => `
142:           <tr>
143:             <td style="color:#6b6b80">${v.category}</td>
144:             <td style="font-weight:500">${v.label}</td>
145:             <td><span class="badge" style="background:${statusColor[v.status] ?? "#f79009"}20;color:${statusColor[v.status] ?? "#f79009"}">${v.status}</span></td>
146:             <td style="color:#6b6b80">${v.note}</td>
147:           </tr>
148:         `).join("")}
149:       </tbody>
150:     </table>
151:   </div>
152:   ` : ""}
153: 
154:   <div class="grid3">
155:     <div class="card">
156:       <div class="section-title" style="color:#12b76a">Strengths</div>
157:       ${(report.strengths ?? []).map(s => `<div class="list-item"><span class="list-dot" style="color:#12b76a">•</span>${s}</div>`).join("") || "<p style='font-size:11px;color:#9898a8'>None noted.</p>"}
158:     </div>
159:     <div class="card">
160:       <div class="section-title" style="color:#f79009">Weaknesses</div>
161:       ${(report.weaknesses ?? []).map(s => `<div class="list-item"><span class="list-dot" style="color:#f79009">•</span>${s}</div>`).join("") || "<p style='font-size:11px;color:#9898a8'>None noted.</p>"}
162:     </div>
163:     <div class="card">
164:       <div class="section-title" style="color:#f04438">Missing Items</div>
165:       ${(report.missingItems ?? []).map(s => `<div class="list-item"><span class="list-dot" style="color:#f04438">•</span>${s}</div>`).join("") || "<p style='font-size:11px;color:#9898a8'>None noted.</p>"}
166:     </div>
167:   </div>
168: 
169:   ${(report.riskFlags ?? []).length > 0 ? `
170:   <div class="risk-box">
171:     <div class="risk-title">⚠ Risk Flags</div>
172:     ${report.riskFlags.map(f => `<div class="list-item"><span class="list-dot" style="color:#f04438">•</span>${f}</div>`).join("")}
173:   </div>
174:   ` : ""}
175: 
176:   <div class="disclaimer">
177:     This report is AI-assisted and for preliminary evaluation only. It does not replace official legal or institutional verification.<br/>
178:     Generated by TalentProof AI &nbsp;·&nbsp; ${new Date().toLocaleDateString()}
179:   </div>
180: 
181:   <script>window.onload = () => window.print();</script>
182: </body>
183: </html>`;
184: 
185:   return new NextResponse(html, {
186:     headers: {
187:       "Content-Type": "text/html; charset=utf-8",
188:       "Cache-Control": "no-store",
189:     },
190:   });
191: }
`````

## File: app/api/report/route.ts
`````typescript
 1: // app/api/report/route.ts
 2: import { NextRequest, NextResponse } from "next/server";
 3: import { auth } from "@clerk/nextjs/server";
 4: import { db } from "@/lib/db";
 5: 
 6: // GET /api/report?caseId=xxx  — fetch report for a case
 7: export async function GET(req: NextRequest) {
 8:   const { userId } = await auth();
 9:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
10: 
11:   const caseId = req.nextUrl.searchParams.get("caseId");
12:   if (!caseId) return NextResponse.json({ error: "caseId required" }, { status: 400 });
13: 
14:   const report = await db.report.findFirst({
15:     where: { case: { id: caseId, user: { clerkId: userId } } },
16:     include: { case: { select: { title: true, mode: true, jdText: true, createdAt: true } } },
17:   });
18: 
19:   if (!report) return NextResponse.json({ error: "Report not found" }, { status: 404 });
20: 
21:   return NextResponse.json({ report });
22: }
`````

## File: app/api/upload/route.ts
`````typescript
 1: // app/api/upload/route.ts
 2: import { NextRequest, NextResponse } from "next/server";
 3: import { auth } from "@clerk/nextjs/server";
 4: import { db } from "@/lib/db";
 5: import { uploadFileToStorage } from "@/lib/storage";
 6: import { parsePDF } from "@/lib/parser/pdf";
 7: import { parseDocx } from "@/lib/parser/docx";
 8: 
 9: export async function POST(req: NextRequest) {
10:   const { userId } = await auth();
11:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
12: 
13:   const formData = await req.formData();
14:   const file = formData.get("file") as File;
15:   const caseId = formData.get("caseId") as string;
16:   const fileType = formData.get("fileType") as string;
17: 
18:   if (!file || !caseId || !fileType) {
19:     return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
20:   }
21: 
22:   // Verify case belongs to user
23:   const caseRecord = await db.case.findFirst({
24:     where: { id: caseId, user: { clerkId: userId } },
25:   });
26:   if (!caseRecord) return NextResponse.json({ error: "Case not found" }, { status: 404 });
27: 
28:   const buffer = Buffer.from(await file.arrayBuffer());
29:   const mimeType = file.type;
30: 
31:   // Upload to Supabase Storage
32:   const storageUrl = await uploadFileToStorage(buffer, file.name, mimeType);
33: 
34:   // Extract text based on file type
35:   let extractedText: string | null = null;
36:   try {
37:     if (mimeType === "application/pdf") {
38:       extractedText = await parsePDF(buffer);
39:     } else if (
40:       mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
41:     ) {
42:       extractedText = await parseDocx(buffer);
43:     }
44:   } catch (err) {
45:     console.error("[upload] Text extraction failed:", err);
46:     // Don't fail upload if extraction fails — just store without text
47:   }
48: 
49:   const upload = await db.upload.create({
50:     data: {
51:       caseId,
52:       fileName: file.name,
53:       fileType: fileType as any,
54:       storageUrl,
55:       extractedText,
56:       processingStatus: extractedText ? "PARSED" : "PENDING",
57:     },
58:   });
59: 
60:   return NextResponse.json({ upload });
61: }
`````

## File: app/sign-in/[[...sign-in]]/page.tsx
`````typescript
 1: import { SignIn } from "@clerk/nextjs";
 2: 
 3: export default function SignInPage() {
 4:   return (
 5:     <div className="min-h-screen flex items-center justify-center"
 6:       style={{ background: "var(--ink)" }}>
 7:       <SignIn />
 8:     </div>
 9:   );
10: }
`````

## File: app/sign-up/[[...sign-up]]/page.tsx
`````typescript
 1: import { SignUp } from "@clerk/nextjs";
 2: 
 3: export default function SignUpPage() {
 4:   return (
 5:     <div className="min-h-screen flex items-center justify-center"
 6:       style={{ background: "var(--ink)" }}>
 7:       <SignUp />
 8:     </div>
 9:   );
10: }
`````

## File: app/globals.css
`````css
 1: /* app/globals.css */
 2: @tailwind base;
 3: @tailwind components;
 4: @tailwind utilities;
 5: 
 6: :root {
 7:   /* Brand palette */
 8:   --ink:       #0a0a0f;
 9:   --ink-2:     #1a1a24;
10:   --ink-3:     #2a2a38;
11:   --muted:     #6b6b80;
12:   --ghost:     #9898a8;
13:   --line:      #e2e2ea;
14:   --surface:   #f8f8fc;
15:   --white:     #ffffff;
16: 
17:   /* Accent — electric indigo */
18:   --accent:    #5b4dff;
19:   --accent-lt: #ede9ff;
20:   --accent-dk: #3d31cc;
21: 
22:   /* Status */
23:   --green:     #12b76a;
24:   --green-lt:  #d1fadf;
25:   --amber:     #f79009;
26:   --amber-lt:  #fef0c7;
27:   --red:       #f04438;
28:   --red-lt:    #fee4e2;
29:   --blue:      #2e90fa;
30:   --blue-lt:   #d1e9ff;
31: 
32:   /* Typography */
33:   --font-display: var(--font-syne);
34:   --font-body:    var(--font-dm);
35: }
36: 
37: * { box-sizing: border-box; margin: 0; padding: 0; }
38: 
39: body {
40:   background: var(--surface);
41:   color: var(--ink);
42:   font-family: var(--font-body), sans-serif;
43:   font-size: 15px;
44:   line-height: 1.6;
45: }
46: 
47: h1, h2, h3, h4, h5 {
48:   font-family: var(--font-display), sans-serif;
49:   letter-spacing: -0.02em;
50: }
51: 
52: /* Scrollbar */
53: ::-webkit-scrollbar { width: 6px; }
54: ::-webkit-scrollbar-track { background: var(--surface); }
55: ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
56: ::-webkit-scrollbar-thumb:hover { background: var(--ghost); }
57: 
58: /* Utility classes */
59: @layer utilities {
60:   .font-display { font-family: var(--font-display), sans-serif; }
61:   .font-dm      { font-family: var(--font-body), sans-serif; }
62: 
63:   .status-verified   { @apply bg-green-50 text-green-700 border border-green-200; }
64:   .status-pending    { @apply bg-amber-50  text-amber-700 border border-amber-200; }
65:   .status-not-verified { @apply bg-red-50 text-red-700 border border-red-200; }
66:   .status-risk       { @apply bg-red-100 text-red-800 border border-red-300; }
67:   .status-manual     { @apply bg-blue-50 text-blue-700 border border-blue-200; }
68: }
69: 
70: /* Fade-in animation */
71: @keyframes fadeUp {
72:   from { opacity: 0; transform: translateY(12px); }
73:   to   { opacity: 1; transform: translateY(0); }
74: }
75: .fade-up { animation: fadeUp 0.35s ease both; }
76: .fade-up-delay-1 { animation-delay: 0.05s; }
77: .fade-up-delay-2 { animation-delay: 0.10s; }
78: .fade-up-delay-3 { animation-delay: 0.15s; }
79: .fade-up-delay-4 { animation-delay: 0.20s; }
`````

## File: app/layout.tsx
`````typescript
 1: // app/layout.tsx
 2: import type { Metadata } from "next";
 3: import { ClerkProvider } from "@clerk/nextjs";
 4: import { Syne, DM_Sans } from "next/font/google";
 5: import "./globals.css";
 6: 
 7: const syne = Syne({
 8:   subsets: ["latin"],
 9:   variable: "--font-syne",
10:   weight: ["400", "500", "600", "700", "800"],
11: });
12: 
13: const dmSans = DM_Sans({
14:   subsets: ["latin"],
15:   variable: "--font-dm",
16:   weight: ["300", "400", "500"],
17: });
18: 
19: export const metadata: Metadata = {
20:   title: "TalentProof AI",
21:   description: "AI-Powered Candidate Evaluation & Verification Platform",
22: };
23: 
24: export default function RootLayout({ children }: { children: React.ReactNode }) {
25:   return (
26:     <ClerkProvider>
27:       <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
28:         <body className="font-dm antialiased">{children}</body>
29:       </html>
30:     </ClerkProvider>
31:   );
32: }
`````

## File: app/not-found.tsx
`````typescript
 1: // app/not-found.tsx
 2: import Link from "next/link";
 3: import { ShieldCheck } from "lucide-react";
 4: 
 5: export default function NotFound() {
 6:   return (
 7:     <div
 8:       className="min-h-screen flex flex-col items-center justify-center text-center p-8"
 9:       style={{ background: "var(--surface)" }}
10:     >
11:       <div
12:         className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
13:         style={{ background: "var(--accent-lt)" }}
14:       >
15:         <ShieldCheck size={26} style={{ color: "var(--accent)" }} />
16:       </div>
17:       <h1
18:         className="text-5xl font-bold mb-3"
19:         style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
20:       >
21:         404
22:       </h1>
23:       <p className="text-lg font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
24:         Page not found
25:       </p>
26:       <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
27:         This page doesn&apos;t exist or you don&apos;t have access to it.
28:       </p>
29:       <Link
30:         href="/dashboard"
31:         className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-all"
32:         style={{ background: "var(--accent)" }}
33:       >
34:         Go to Dashboard
35:       </Link>
36:     </div>
37:   );
38: }
`````

## File: app/page.tsx
`````typescript
  1: // app/page.tsx
  2: import { auth } from "@clerk/nextjs/server";
  3: import { redirect } from "next/navigation";
  4: import Link from "next/link";
  5: import { ShieldCheck, ArrowRight, FileCheck, Sparkles, BarChart3 } from "lucide-react";
  6: 
  7: export default async function LandingPage() {
  8:   const { userId } = await auth();
  9:   if (userId) redirect("/dashboard");
 10: 
 11:   return (
 12:     <div
 13:       className="min-h-screen flex flex-col"
 14:       style={{ background: "var(--ink)", color: "var(--white)" }}
 15:     >
 16:       {/* Nav */}
 17:       <nav className="flex items-center justify-between px-8 py-5">
 18:         <div className="flex items-center gap-2.5">
 19:           <div
 20:             className="w-8 h-8 rounded-lg flex items-center justify-center"
 21:             style={{ background: "var(--accent)" }}
 22:           >
 23:             <ShieldCheck size={16} color="white" />
 24:           </div>
 25:           <span
 26:             className="text-lg font-bold"
 27:             style={{ fontFamily: "var(--font-display)" }}
 28:           >
 29:             TalentProof AI
 30:           </span>
 31:         </div>
 32:         <Link
 33:           href="/sign-in"
 34:           className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-80"
 35:           style={{ background: "var(--accent)" }}
 36:         >
 37:           Sign In
 38:         </Link>
 39:       </nav>
 40: 
 41:       {/* Hero */}
 42:       <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
 43:         <div
 44:           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
 45:           style={{ background: "var(--ink-3)", color: "var(--ghost)" }}
 46:         >
 47:           <Sparkles size={11} style={{ color: "var(--accent)" }} />
 48:           AI-Powered Hiring Intelligence
 49:         </div>
 50: 
 51:         <h1
 52:           className="text-5xl font-bold mb-6 max-w-2xl leading-tight"
 53:           style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
 54:         >
 55:           Evaluate candidates with AI precision
 56:         </h1>
 57:         <p
 58:           className="text-lg max-w-xl mb-10 leading-relaxed"
 59:           style={{ color: "var(--ghost)" }}
 60:         >
 61:           Upload resumes, certificates, and documents. Get a structured evaluation report with verification status, job-fit score, and AI recommendations — in minutes.
 62:         </p>
 63: 
 64:         <div className="flex items-center gap-4">
 65:           <Link
 66:             href="/sign-up"
 67:             className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
 68:             style={{ background: "var(--accent)" }}
 69:           >
 70:             Get Started Free <ArrowRight size={15} />
 71:           </Link>
 72:           <Link
 73:             href="/sign-in"
 74:             className="px-6 py-3.5 rounded-xl font-semibold transition-all hover:opacity-80"
 75:             style={{ background: "var(--ink-2)", color: "var(--ghost)" }}
 76:           >
 77:             Sign In
 78:           </Link>
 79:         </div>
 80: 
 81:         {/* Feature pills */}
 82:         <div className="flex items-center gap-3 mt-14 flex-wrap justify-center">
 83:           {[
 84:             { icon: FileCheck, text: "Multi-document analysis" },
 85:             { icon: BarChart3, text: "0–100 readiness score" },
 86:             { icon: ShieldCheck, text: "Verification engine" },
 87:             { icon: Sparkles,  text: "Explainable AI" },
 88:           ].map(({ icon: Icon, text }) => (
 89:             <div
 90:               key={text}
 91:               className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
 92:               style={{ background: "var(--ink-2)", color: "var(--ghost)" }}
 93:             >
 94:               <Icon size={13} style={{ color: "var(--accent)" }} />
 95:               {text}
 96:             </div>
 97:           ))}
 98:         </div>
 99:       </main>
100:     </div>
101:   );
102: }
`````

## File: components/dashboard/CaseCard.tsx
`````typescript
 1: "use client";
 2: // components/dashboard/CaseCard.tsx
 3: import Link from "next/link";
 4: import { formatDistanceToNow } from "date-fns";
 5: import { FileStack, ChevronRight } from "lucide-react";
 6: 
 7: const statusStyles: Record<string, { label: string; bg: string; color: string }> = {
 8:   PENDING:    { label: "Pending",    bg: "var(--amber-lt)", color: "var(--amber)" },
 9:   PROCESSING: { label: "Processing", bg: "var(--blue-lt)",  color: "var(--blue)" },
10:   COMPLETED:  { label: "Completed",  bg: "var(--green-lt)", color: "var(--green)" },
11:   FAILED:     { label: "Failed",     bg: "var(--red-lt)",   color: "var(--red)" },
12: };
13: 
14: interface Props {
15:   case: {
16:     id: string;
17:     title: string;
18:     mode: string;
19:     status: string;
20:     finalScore: number | null;
21:     createdAt: Date;
22:     uploads: { id: string }[];
23:     report: { score: number; recommendation: string } | null;
24:   };
25: }
26: 
27: export default function CaseCard({ case: c }: Props) {
28:   const st = statusStyles[c.status] ?? statusStyles.PENDING;
29:   const score = c.report?.score ?? c.finalScore;
30: 
31:   return (
32:     <Link
33:       href={c.status === "COMPLETED" ? `/report/${c.id}` : `/cases/${c.id}`}
34:       className="block rounded-xl border p-5 transition-all hover:shadow-md hover:-translate-y-0.5 group"
35:       style={{ background: "var(--white)", borderColor: "var(--line)" }}
36:     >
37:       <div className="flex items-start justify-between mb-3">
38:         <div className="flex items-center gap-2.5">
39:           <div
40:             className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
41:             style={{ background: "var(--surface)" }}
42:           >
43:             <FileStack size={14} style={{ color: "var(--muted)" }} />
44:           </div>
45:           <div>
46:             <h3
47:               className="font-semibold text-sm leading-tight line-clamp-1"
48:               style={{ fontFamily: "var(--font-display)" }}
49:             >
50:               {c.title}
51:             </h3>
52:             <span className="text-[11px]" style={{ color: "var(--ghost)" }}>
53:               {c.mode === "RECRUITER" ? "Recruiter Mode" : "Candidate Mode"}
54:             </span>
55:           </div>
56:         </div>
57:         <ChevronRight
58:           size={15}
59:           className="transition-transform group-hover:translate-x-0.5"
60:           style={{ color: "var(--ghost)" }}
61:         />
62:       </div>
63: 
64:       <div className="flex items-center justify-between mt-4">
65:         <div className="flex items-center gap-2">
66:           <span
67:             className="text-[11px] font-medium px-2 py-0.5 rounded-full"
68:             style={{ background: st.bg, color: st.color }}
69:           >
70:             {st.label}
71:           </span>
72:           <span className="text-[11px]" style={{ color: "var(--ghost)" }}>
73:             {c.uploads.length} file{c.uploads.length !== 1 ? "s" : ""}
74:           </span>
75:         </div>
76:         {score != null ? (
77:           <div
78:             className="text-sm font-bold"
79:             style={{
80:               color:
81:                 score >= 70 ? "var(--green)" : score >= 50 ? "var(--amber)" : "var(--red)",
82:               fontFamily: "var(--font-display)",
83:             }}
84:           >
85:             {Math.round(score)}%
86:           </div>
87:         ) : (
88:           <span className="text-[11px]" style={{ color: "var(--ghost)" }}>
89:             {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
90:           </span>
91:         )}
92:       </div>
93:     </Link>
94:   );
95: }
`````

## File: components/dashboard/StatsCard.tsx
`````typescript
 1: // components/dashboard/StatsCard.tsx
 2: import { FileCheck, TrendingUp, Clock, AlertTriangle, LucideIcon, CheckCircle2, FileStack, Users } from "lucide-react";
 3: import { cn } from "@/lib/utils";
 4: 
 5: const colorMap: Record<string, { bg: string; icon: string }> = {
 6:   accent: { bg: "var(--accent-lt)",  icon: "var(--accent)" },
 7:   green:  { bg: "var(--green-lt)",   icon: "var(--green)" },
 8:   amber:  { bg: "var(--amber-lt)",   icon: "var(--amber)" },
 9:   blue:   { bg: "var(--blue-lt)",    icon: "var(--blue)" },
10:   red:    { bg: "var(--red-lt)",     icon: "var(--red)" },
11: };
12: 
13: interface Props {
14:   icon: string;
15:   label: string;
16:   value: string | number;
17:   color?: string;
18:   delay?: number;
19: }
20: 
21: const iconMap: Record<string, LucideIcon> = {
22:   FileCheck,
23:   TrendingUp,
24:   Clock,
25:   AlertTriangle,
26:   Users,
27:   FileStack,
28:   CheckCircle2,
29: };
30: 
31: export default function StatsCard({ icon, label, value, color = "accent", delay = 0 }: Props) {
32:   const c = colorMap[color] ?? colorMap.accent;
33:   const Icon = iconMap[icon];
34: 
35:   return (
36:     <div
37:       className={cn("rounded-xl p-5 border fade-up", `fade-up-delay-${delay}`)}
38:       style={{ background: "var(--white)", borderColor: "var(--line)" }}
39:     >
40:       <div
41:         className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
42:         style={{ background: c.bg }}
43:       >
44:         {Icon && <Icon size={16} style={{ color: c.icon }} />}
45:       </div>
46:       <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
47:         {value}
48:       </div>
49:       <div className="text-xs" style={{ color: "var(--muted)" }}>
50:         {label}
51:       </div>
52:     </div>
53:   );
54: }
`````

## File: components/layout/Sidebar.tsx
`````typescript
 1: "use client";
 2: // components/layout/Sidebar.tsx
 3: import Link from "next/link";
 4: import { usePathname } from "next/navigation";
 5: import { UserButton } from "@clerk/nextjs";
 6: import {
 7:   LayoutDashboard,
 8:   FolderOpen,
 9:   PlusCircle,
10:   FileText,
11:   Settings,
12:   ShieldCheck,
13: } from "lucide-react";
14: import { cn } from "@/lib/utils";
15: 
16: const navItems = [
17:   { href: "/dashboard",      label: "Dashboard",   icon: LayoutDashboard },
18:   { href: "/cases",          label: "My Cases",    icon: FolderOpen },
19:   { href: "/cases/new",      label: "New Case",    icon: PlusCircle },
20:   { href: "/reports",        label: "Reports",     icon: FileText },
21:   { href: "/settings",       label: "Settings",    icon: Settings },
22: ];
23: 
24: export default function Sidebar() {
25:   const path = usePathname();
26: 
27:   return (
28:     <aside
29:       style={{ background: "var(--ink)", color: "var(--white)" }}
30:       className="fixed inset-y-0 left-0 w-60 flex flex-col z-30"
31:     >
32:       {/* Logo */}
33:       <div className="px-6 py-5 border-b border-white/10">
34:         <div className="flex items-center gap-2.5">
35:           <div
36:             className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
37:             style={{ background: "var(--accent)" }}
38:           >
39:             <ShieldCheck size={16} color="white" />
40:           </div>
41:           <span
42:             className="text-[17px] font-bold tracking-tight"
43:             style={{ fontFamily: "var(--font-display)", color: "var(--white)" }}
44:           >
45:             TalentProof
46:           </span>
47:         </div>
48:         <p className="text-[11px] mt-1 opacity-40 tracking-widest uppercase">AI Platform</p>
49:       </div>
50: 
51:       {/* Nav */}
52:       <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
53:         {navItems.map(({ href, label, icon: Icon }) => {
54:           const active = path === href || (href !== "/dashboard" && path.startsWith(href));
55:           return (
56:             <Link
57:               key={href}
58:               href={href}
59:               className={cn(
60:                 "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all",
61:                 active
62:                   ? "text-white"
63:                   : "text-white/50 hover:text-white/80 hover:bg-white/5"
64:               )}
65:               style={active ? { background: "var(--accent)", color: "white" } : {}}
66:             >
67:               <Icon size={15} />
68:               {label}
69:             </Link>
70:           );
71:         })}
72:       </nav>
73: 
74:       {/* User */}
75:       <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">
76:         <UserButton />
77:         <span className="text-[12px] text-white/40">Account</span>
78:       </div>
79:     </aside>
80:   );
81: }
`````

## File: components/report/PrintButton.tsx
`````typescript
 1: "use client";
 2: // components/report/PrintButton.tsx
 3: import { useState } from "react";
 4: import { Printer, Loader2 } from "lucide-react";
 5: 
 6: export default function PrintButton({ caseId }: { caseId: string }) {
 7:   const [loading, setLoading] = useState(false);
 8: 
 9:   function handlePrint() {
10:     setLoading(true);
11:     const win = window.open(`/api/report/export?caseId=${caseId}`, "_blank");
12:     // Reset loading state after window opens
13:     setTimeout(() => setLoading(false), 2000);
14:   }
15: 
16:   return (
17:     <button
18:       onClick={handlePrint}
19:       disabled={loading}
20:       className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all hover:opacity-80 disabled:opacity-40"
21:       style={{
22:         borderColor: "var(--line)",
23:         background: "var(--white)",
24:         color: "var(--ink)",
25:       }}
26:     >
27:       {loading ? (
28:         <Loader2 size={14} className="animate-spin" />
29:       ) : (
30:         <Printer size={14} />
31:       )}
32:       Export PDF
33:     </button>
34:   );
35: }
`````

## File: components/ui/Skeleton.tsx
`````typescript
  1: // components/ui/Skeleton.tsx
  2: import { cn } from "@/lib/utils";
  3: 
  4: export function Skeleton({ className }: { className?: string }) {
  5:   return (
  6:     <div
  7:       className={cn("animate-pulse rounded-lg", className)}
  8:       style={{ background: "var(--line)" }}
  9:     />
 10:   );
 11: }
 12: 
 13: export function CaseCardSkeleton() {
 14:   return (
 15:     <div
 16:       className="rounded-xl border p-5"
 17:       style={{ background: "var(--white)", borderColor: "var(--line)" }}
 18:     >
 19:       <div className="flex items-center gap-2.5 mb-4">
 20:         <Skeleton className="w-8 h-8 rounded-lg" />
 21:         <div className="flex-1 space-y-1.5">
 22:           <Skeleton className="h-3 w-3/4" />
 23:           <Skeleton className="h-2.5 w-1/3" />
 24:         </div>
 25:       </div>
 26:       <div className="flex items-center justify-between">
 27:         <Skeleton className="h-5 w-20 rounded-full" />
 28:         <Skeleton className="h-3 w-10" />
 29:       </div>
 30:     </div>
 31:   );
 32: }
 33: 
 34: export function StatsCardSkeleton() {
 35:   return (
 36:     <div
 37:       className="rounded-xl border p-5"
 38:       style={{ background: "var(--white)", borderColor: "var(--line)" }}
 39:     >
 40:       <Skeleton className="w-9 h-9 rounded-lg mb-3" />
 41:       <Skeleton className="h-7 w-12 mb-1.5" />
 42:       <Skeleton className="h-3 w-20" />
 43:     </div>
 44:   );
 45: }
 46: 
 47: export function DashboardSkeleton() {
 48:   return (
 49:     <div className="p-8 max-w-6xl">
 50:       <div className="flex items-start justify-between mb-8">
 51:         <div className="space-y-2">
 52:           <Skeleton className="h-9 w-48" />
 53:           <Skeleton className="h-4 w-72" />
 54:         </div>
 55:         <Skeleton className="h-10 w-44 rounded-lg" />
 56:       </div>
 57:       <div className="grid grid-cols-4 gap-4 mb-8">
 58:         {[...Array(4)].map((_, i) => <StatsCardSkeleton key={i} />)}
 59:       </div>
 60:       <div className="grid grid-cols-2 gap-4">
 61:         {[...Array(4)].map((_, i) => <CaseCardSkeleton key={i} />)}
 62:       </div>
 63:     </div>
 64:   );
 65: }
 66: 
 67: export function ReportSkeleton() {
 68:   return (
 69:     <div className="p-8 max-w-4xl space-y-6">
 70:       <Skeleton className="h-4 w-32" />
 71:       <div className="rounded-2xl border p-7" style={{ borderColor: "var(--line)" }}>
 72:         <div className="flex justify-between">
 73:           <div className="space-y-2">
 74:             <Skeleton className="h-3 w-24" />
 75:             <Skeleton className="h-8 w-56" />
 76:             <Skeleton className="h-4 w-36" />
 77:           </div>
 78:           <Skeleton className="w-24 h-24 rounded-full" />
 79:         </div>
 80:         <Skeleton className="h-14 w-full rounded-xl mt-5" />
 81:       </div>
 82:       <div className="grid grid-cols-2 gap-6">
 83:         <div className="rounded-2xl border p-6 space-y-3" style={{ borderColor: "var(--line)" }}>
 84:           <Skeleton className="h-5 w-24" />
 85:           {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-4 w-full" />)}
 86:         </div>
 87:         <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: "var(--line)" }}>
 88:           <Skeleton className="h-5 w-36" />
 89:           {[...Array(5)].map((_, i) => (
 90:             <div key={i} className="space-y-1">
 91:               <div className="flex justify-between">
 92:                 <Skeleton className="h-3 w-28" />
 93:                 <Skeleton className="h-3 w-8" />
 94:               </div>
 95:               <Skeleton className="h-1.5 w-full rounded-full" />
 96:             </div>
 97:           ))}
 98:         </div>
 99:       </div>
100:     </div>
101:   );
102: }
`````

## File: lib/ai/gemini.ts
`````typescript
  1: // lib/ai/gemini.ts
  2: // Core Gemini integration — all AI calls go through here
  3: 
  4: const GEMINI_URL =
  5:   "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  6: 
  7: async function callGemini(prompt: string): Promise<string> {
  8:   const response = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
  9:     method: "POST",
 10:     headers: { "Content-Type": "application/json" },
 11:     body: JSON.stringify({
 12:       contents: [{ parts: [{ text: prompt }] }],
 13:       generationConfig: { temperature: 0.3, maxOutputTokens: 4096 },
 14:     }),
 15:   });
 16: 
 17:   if (!response.ok) {
 18:     throw new Error(`Gemini API error: ${response.statusText}`);
 19:   }
 20: 
 21:   const result = await response.json();
 22:   return result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
 23: }
 24: 
 25: // ── Step 1: Extract structured candidate info from raw document text ──
 26: export async function extractCandidateProfile(rawText: string): Promise<CandidateProfile> {
 27:   const prompt = `
 28: You are an AI recruitment analyst. Extract structured information from the following candidate document text.
 29: 
 30: Return ONLY valid JSON with this exact schema (no markdown, no explanation):
 31: {
 32:   "name": "string",
 33:   "email": "string",
 34:   "phone": "string",
 35:   "education": [{ "degree": "", "institution": "", "year": "", "grade": "" }],
 36:   "experience": [{ "role": "", "company": "", "duration": "", "description": "" }],
 37:   "skills": ["string"],
 38:   "certifications": [{ "name": "", "issuer": "", "year": "" }],
 39:   "projects": [{ "name": "", "description": "", "tech": [] }],
 40:   "claims": ["string"]
 41: }
 42: 
 43: DOCUMENT TEXT:
 44: ${rawText}
 45: `;
 46: 
 47:   const raw = await callGemini(prompt);
 48:   const cleaned = raw.replace(/```json|```/g, "").trim();
 49:   return JSON.parse(cleaned) as CandidateProfile;
 50: }
 51: 
 52: // ── Step 2: Parse job description ──
 53: export async function parseJobDescription(jdText: string): Promise<JobDescription> {
 54:   const prompt = `
 55: Extract structured information from this job description.
 56: Return ONLY valid JSON (no markdown):
 57: {
 58:   "title": "string",
 59:   "requiredSkills": ["string"],
 60:   "preferredSkills": ["string"],
 61:   "requiredExperience": "string",
 62:   "requiredEducation": "string",
 63:   "requiredCertifications": ["string"],
 64:   "responsibilities": ["string"]
 65: }
 66: 
 67: JOB DESCRIPTION:
 68: ${jdText}
 69: `;
 70: 
 71:   const raw = await callGemini(prompt);
 72:   const cleaned = raw.replace(/```json|```/g, "").trim();
 73:   return JSON.parse(cleaned) as JobDescription;
 74: }
 75: 
 76: // ── Step 3: Full candidate analysis ──
 77: export async function analyzeCandidateFull(input: AnalysisInput): Promise<AnalysisResult> {
 78:   const prompt = `
 79: You are an expert AI recruitment analyst. Perform a thorough candidate evaluation.
 80: 
 81: CANDIDATE PROFILE:
 82: ${JSON.stringify(input.profile, null, 2)}
 83: 
 84: JOB DESCRIPTION:
 85: ${JSON.stringify(input.jobDescription, null, 2)}
 86: 
 87: UPLOADED DOCUMENT TYPES:
 88: ${input.documentTypes.join(", ")}
 89: 
 90: COMPANY PREFERENCES (if any):
 91: ${input.companyPreferences ?? "Not specified"}
 92: 
 93: Return ONLY valid JSON (no markdown) with this schema:
 94: {
 95:   "summary": "2-3 sentence candidate summary",
 96:   "strengths": ["string"],
 97:   "weaknesses": ["string"],
 98:   "missingItems": ["missing documents or skills"],
 99:   "riskFlags": ["any inconsistencies or concerns"],
100:   "recommendation": "one of: Proceed | Proceed with manual verification | Hold for clarification | Reject",
101:   "candidateMessage": "for candidate mode: personalized improvement advice",
102:   "scoreBreakdown": {
103:     "jdMatch": 0,
104:     "profileCompleteness": 0,
105:     "verificationSupport": 0,
106:     "academicAlignment": 0,
107:     "experienceRelevance": 0,
108:     "consistency": 0
109:   },
110:   "verifications": [
111:     { "category": "string", "label": "string", "status": "Verified|Not Verified|Pending|Risk|Manual Required", "note": "string" }
112:   ]
113: }
114: `;
115: 
116:   const raw = await callGemini(prompt);
117:   const cleaned = raw.replace(/```json|```/g, "").trim();
118:   return JSON.parse(cleaned) as AnalysisResult;
119: }
120: 
121: // ── Types ──
122: export interface CandidateProfile {
123:   name: string;
124:   email: string;
125:   phone: string;
126:   education: { degree: string; institution: string; year: string; grade: string }[];
127:   experience: { role: string; company: string; duration: string; description: string }[];
128:   skills: string[];
129:   certifications: { name: string; issuer: string; year: string }[];
130:   projects: { name: string; description: string; tech: string[] }[];
131:   claims: string[];
132: }
133: 
134: export interface JobDescription {
135:   title: string;
136:   requiredSkills: string[];
137:   preferredSkills: string[];
138:   requiredExperience: string;
139:   requiredEducation: string;
140:   requiredCertifications: string[];
141:   responsibilities: string[];
142: }
143: 
144: export interface AnalysisInput {
145:   profile: CandidateProfile;
146:   jobDescription: JobDescription;
147:   documentTypes: string[];
148:   companyPreferences?: string;
149: }
150: 
151: export interface AnalysisResult {
152:   summary: string;
153:   strengths: string[];
154:   weaknesses: string[];
155:   missingItems: string[];
156:   riskFlags: string[];
157:   recommendation: string;
158:   candidateMessage: string;
159:   scoreBreakdown: Record<string, number>;
160:   verifications: { category: string; label: string; status: string; note: string }[];
161: }
`````

## File: lib/ai/pipeline.ts
`````typescript
 1: // lib/ai/pipeline.ts
 2: // Multi-step evaluation pipeline — this is the "brain" of TalentProof AI
 3: 
 4: import { extractCandidateProfile, parseJobDescription, analyzeCandidateFull, AnalysisResult } from "./gemini";
 5: import { parsePDF } from "../parser/pdf";
 6: import { parseDocx } from "../parser/docx";
 7: import { calculateScore } from "../scoring/score";
 8: 
 9: export interface PipelineInput {
10:   caseId: string;
11:   uploads: { fileType: string; storageUrl: string; extractedText?: string | null }[];
12:   jdText?: string | null;
13:   companyPreferences?: string | null;
14:   mode: "RECRUITER" | "CANDIDATE";
15: }
16: 
17: export interface PipelineOutput {
18:   profile: object;
19:   jobDescription: object;
20:   analysis: AnalysisResult;
21:   finalScore: number;
22: }
23: 
24: export async function runEvaluationPipeline(input: PipelineInput): Promise<PipelineOutput> {
25:   console.log(`[Pipeline] Starting for case ${input.caseId}`);
26: 
27:   // ── Step 1: Aggregate all extracted text ──
28:   const allText = input.uploads
29:     .map((u) => u.extractedText ?? "")
30:     .filter(Boolean)
31:     .join("\n\n---\n\n");
32: 
33:   if (!allText.trim()) {
34:     throw new Error("No extracted text available. Ensure documents were parsed first.");
35:   }
36: 
37:   // ── Step 2: Extract candidate profile ──
38:   console.log("[Pipeline] Step 2: Extracting candidate profile...");
39:   const profile = await extractCandidateProfile(allText);
40:   await new Promise(r => setTimeout(r, 2000));
41: 
42:   // ── Step 3: Parse JD (if provided) ──
43:   console.log("[Pipeline] Step 3: Parsing job description...");
44:   const jobDescription = input.jdText
45:     ? await parseJobDescription(input.jdText)
46:     : { title: "General Role", requiredSkills: [], preferredSkills: [], requiredExperience: "", requiredEducation: "", requiredCertifications: [], responsibilities: [] };
47:     await new Promise(r => setTimeout(r, 2000));
48: 
49:   // ── Step 4: Full analysis ──
50:   console.log("[Pipeline] Step 4: Running full candidate analysis...");
51:   const documentTypes = input.uploads.map((u) => u.fileType);
52:   const analysis = await analyzeCandidateFull({
53:     profile,
54:     jobDescription,
55:     documentTypes,
56:     companyPreferences: input.companyPreferences ?? undefined,
57:   });
58: 
59:   // ── Step 5: Calculate final score ──
60:   console.log("[Pipeline] Step 5: Calculating score...");
61:   const finalScore = calculateScore(analysis.scoreBreakdown);
62: 
63:   console.log(`[Pipeline] Complete. Score: ${finalScore}`);
64:   return { profile, jobDescription, analysis, finalScore };
65: }
`````

## File: lib/parser/docx.ts
`````typescript
 1: // lib/parser/docx.ts
 2: import mammoth from "mammoth";
 3: 
 4: export async function parseDocx(fileBuffer: Buffer): Promise<string> {
 5:   try {
 6:     const result = await mammoth.extractRawText({ buffer: fileBuffer });
 7:     return result.value.trim();
 8:   } catch (err) {
 9:     console.error("[parseDocx] Error:", err);
10:     throw new Error("Failed to parse DOCX file.");
11:   }
12: }
`````

## File: lib/parser/pdf.ts
`````typescript
 1: // lib/parser/pdf.ts
 2: import pdf from "pdf-parse";
 3: 
 4: export async function parsePDF(fileBuffer: Buffer): Promise<string> {
 5:   try {
 6:     const data = await pdf(fileBuffer);
 7:     return data.text.trim();
 8:   } catch (err) {
 9:     console.error("[parsePDF] Error:", err);
10:     throw new Error("Failed to parse PDF. File may be corrupted or scanned.");
11:   }
12: }
`````

## File: lib/scoring/score.ts
`````typescript
 1: // lib/scoring/score.ts
 2: // Weighted scoring model — each factor contributes to a 0–100 final score
 3: 
 4: const WEIGHTS: Record<string, number> = {
 5:   jdMatch:             0.25,  // 25%
 6:   profileCompleteness: 0.20,  // 20%
 7:   verificationSupport: 0.20,  // 20%
 8:   academicAlignment:   0.15,  // 15%
 9:   experienceRelevance: 0.10,  // 10%
10:   consistency:         0.10,  // 10%
11:   // Total: 100% ✓
12: };
13: 
14: export function calculateScore(breakdown: Record<string, number>): number {
15:   let total = 0;
16:   for (const [key, weight] of Object.entries(WEIGHTS)) {
17:     const raw = breakdown[key] ?? 0;
18:     total += Math.min(100, Math.max(0, raw)) * weight;
19:   }
20:   return Math.round(total);
21: }
22: 
23: export function getScoreLabel(score: number): { label: string; color: string } {
24:   if (score >= 85) return { label: "Highly Suitable",              color: "green" };
25:   if (score >= 70) return { label: "Suitable — Minor Checks",      color: "blue"  };
26:   if (score >= 50) return { label: "Moderate Fit — Review Needed", color: "amber" };
27:   return              { label: "Weak Fit — Major Gaps",            color: "red"   };
28: }
29: 
30: export function getScoreColor(score: number): string {
31:   if (score >= 70) return "var(--green)";
32:   if (score >= 50) return "var(--amber)";
33:   return "var(--red)";
34: }
35: 
36: export function getScoreBg(score: number): string {
37:   if (score >= 70) return "var(--green-lt)";
38:   if (score >= 50) return "var(--amber-lt)";
39:   return "var(--red-lt)";
40: }
`````

## File: lib/db.ts
`````typescript
 1: // lib/db.ts
 2: import { PrismaClient } from "@prisma/client";
 3: 
 4: const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
 5: 
 6: export const db =
 7:   globalForPrisma.prisma ??
 8:   new PrismaClient({ log: ["query"] });
 9: 
10: if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
`````

## File: lib/storage.ts
`````typescript
 1: // lib/storage.ts
 2: import { createClient } from "@supabase/supabase-js";
 3: 
 4: const supabase = createClient(
 5:   process.env.NEXT_PUBLIC_SUPABASE_URL!,
 6:   process.env.SUPABASE_SERVICE_ROLE_KEY!
 7: );
 8: 
 9: const BUCKET = "talentproof-uploads";
10: 
11: export async function uploadFileToStorage(
12:   file: Buffer,
13:   fileName: string,
14:   mimeType: string
15: ): Promise<string> {
16:   const path = `${Date.now()}-${fileName}`;
17: 
18:   const { error } = await supabase.storage
19:     .from(BUCKET)
20:     .upload(path, file, { contentType: mimeType });
21: 
22:   if (error) throw new Error(`Storage upload failed: ${error.message}`);
23: 
24:   const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
25:   return data.publicUrl;
26: }
27: 
28: export async function deleteFileFromStorage(url: string): Promise<void> {
29:   const path = url.split(`/${BUCKET}/`)[1];
30:   if (!path) return;
31:   await supabase.storage.from(BUCKET).remove([path]);
32: }
`````

## File: lib/utils.ts
`````typescript
1: // lib/utils.ts
2: import { type ClassValue, clsx } from "clsx";
3: import { twMerge } from "tailwind-merge";
4: 
5: export function cn(...inputs: ClassValue[]) {
6:   return twMerge(clsx(inputs));
7: }
`````

## File: prisma/schema.prisma
`````prisma
  1: generator client {
  2:   provider = "prisma-client-js"
  3:   output   = "../node_modules/.prisma/client"
  4: }
  5: 
  6: datasource db {
  7:   provider = "postgresql"
  8:   url      = env("DATABASE_URL")
  9: }
 10: 
 11: model User {
 12:   id        String   @id @default(cuid())
 13:   clerkId   String   @unique
 14:   email     String   @unique
 15:   name      String?
 16:   role      Role     @default(CANDIDATE)
 17:   cases     Case[]
 18:   createdAt DateTime @default(now())
 19: }
 20: 
 21: enum Role {
 22:   CANDIDATE
 23:   RECRUITER
 24:   ADMIN
 25: }
 26: 
 27: model Case {
 28:   id                 String    @id @default(cuid())
 29:   title              String
 30:   userId             String
 31:   mode               CaseMode
 32:   jdText             String?
 33:   companyPreferences String?
 34:   status             CaseStatus @default(PENDING)
 35:   finalScore         Float?
 36:   createdAt          DateTime  @default(now())
 37:   updatedAt          DateTime  @updatedAt
 38: 
 39:   user    User     @relation(fields: [userId], references: [id])
 40:   uploads Upload[]
 41:   report  Report?
 42: }
 43: 
 44: enum CaseMode {
 45:   RECRUITER
 46:   CANDIDATE
 47: }
 48: 
 49: enum CaseStatus {
 50:   PENDING
 51:   PROCESSING
 52:   COMPLETED
 53:   FAILED
 54: }
 55: 
 56: model Upload {
 57:   id               String        @id @default(cuid())
 58:   caseId           String
 59:   fileName         String
 60:   fileType         FileType
 61:   storageUrl       String
 62:   extractedText    String?
 63:   processingStatus UploadStatus  @default(PENDING)
 64:   createdAt        DateTime      @default(now())
 65: 
 66:   case Case @relation(fields: [caseId], references: [id], onDelete: Cascade)
 67: }
 68: 
 69: enum FileType {
 70:   RESUME
 71:   COVER_LETTER
 72:   CERTIFICATE
 73:   MARKSHEET
 74:   DEGREE
 75:   INTERNSHIP
 76:   EXPERIENCE_LETTER
 77:   ID_PROOF
 78:   JOB_DESCRIPTION
 79:   OTHER
 80: }
 81: 
 82: enum UploadStatus {
 83:   PENDING
 84:   PARSED
 85:   ANALYZED
 86:   ERROR
 87: }
 88: 
 89: model Report {
 90:   id             String   @id @default(cuid())
 91:   caseId         String   @unique
 92:   summary        String
 93:   strengths      String[]
 94:   weaknesses     String[]
 95:   missingItems   String[]
 96:   riskFlags      String[]
 97:   recommendation String
 98:   score          Float
 99:   scoreBreakdown Json
100:   verifications  Json
101:   createdAt      DateTime @default(now())
102: 
103:   case Case @relation(fields: [caseId], references: [id], onDelete: Cascade)
104: }
`````

## File: .gitignore
`````
 1: # Dependencies
 2: node_modules
 3: .pnp
 4: .pnp.js
 5: 
 6: # Next.js
 7: .next/
 8: out/
 9: build/
10: 
11: # Environment variables — NEVER commit these
12: .env
13: .env.local
14: .env.development.local
15: .env.test.local
16: .env.production.local
17: 
18: # Prisma
19: prisma/generated/
20: 
21: # Misc
22: .DS_Store
23: *.pem
24: npm-debug.log*
25: yarn-debug.log*
26: yarn-error.log*
27: 
28: # TypeScript
29: *.tsbuildinfo
30: next-env.d.ts
`````

## File: middleware.ts
`````typescript
 1: // middleware.ts
 2: import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
 3: 
 4: const isPublicRoute = createRouteMatcher([
 5:   "/",
 6:   "/sign-in(.*)",
 7:   "/sign-up(.*)",
 8: ]);
 9: 
10: export default clerkMiddleware(async (auth, req) => {
11:   if (!isPublicRoute(req)) {
12:     await auth.protect();
13:   }
14: });
15: 
16: export const config = {
17:   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
18: };
`````

## File: next.config.ts
`````typescript
 1: import type { NextConfig } from "next";
 2: 
 3: const nextConfig: NextConfig = {
 4:   // Allow PDF parsing to work in server components/routes
 5:   serverExternalPackages: ["pdf-parse", "mammoth"],
 6: 
 7:   images: {
 8:     remotePatterns: [
 9:       {
10:         protocol: "https",
11:         hostname: "*.supabase.co",
12:         pathname: "/storage/v1/object/public/**",
13:       },
14:     ],
15:   },
16: };
17: 
18: export default nextConfig;
`````

## File: package.json
`````json
 1: {
 2:   "name": "talentproof-ai",
 3:   "version": "0.1.0",
 4:   "private": true,
 5:   "scripts": {
 6:     "dev": "next dev",
 7:     "build": "next build",
 8:     "start": "next start",
 9:     "lint": "next lint",
10:     "db:push": "prisma db push",
11:     "db:generate": "prisma generate",
12:     "db:studio": "prisma studio"
13:   },
14:   "dependencies": {
15:     "@clerk/nextjs": "^6.39.1",
16:     "@hookform/resolvers": "^3.9.0",
17:     "@prisma/client": "^6.0.0",
18:     "@supabase/supabase-js": "^2.47.0",
19:     "autoprefixer": "^10.4.27",
20:     "clsx": "^2.1.1",
21:     "date-fns": "^4.1.0",
22:     "lucide-react": "^0.468.0",
23:     "mammoth": "^1.8.0",
24:     "next": "^15.2.3",
25:     "pdf-parse": "^1.1.1",
26:     "react": "^19.0.0",
27:     "react-dom": "^19.0.0",
28:     "react-dropzone": "^14.3.5",
29:     "react-hook-form": "^7.54.0",
30:     "tailwind-merge": "^2.5.5",
31:     "zod": "^3.23.8"
32:   },
33:   "devDependencies": {
34:     "@types/node": "^20",
35:     "@types/pdf-parse": "^1.1.4",
36:     "@types/react": "^19",
37:     "@types/react-dom": "^19",
38:     "eslint": "^8",
39:     "eslint-config-next": "^15.2.3",
40:     "postcss": "^8",
41:     "prisma": "^6.0.0",
42:     "tailwindcss": "^3.4.1",
43:     "typescript": "^5"
44:   }
45: }
`````

## File: postcss.config.js
`````javascript
1: module.exports = {
2:   plugins: {
3:     tailwindcss: {},
4:     autoprefixer: {},
5:   },
6: };
`````

## File: README.md
`````markdown
  1: # TalentProof AI
  2: 
  3: **AI-Powered Candidate Background Evaluation & Hiring Readiness Platform**
  4: 
  5: ---
  6: 
  7: ## Quick Start
  8: 
  9: ### 1. Create the project
 10: ```bash
 11: npx create-next-app@latest talentproof-ai --typescript --tailwind --app
 12: cd talentproof-ai
 13: ```
 14: 
 15: ### 2. Install dependencies
 16: ```bash
 17: # Core
 18: npm install @prisma/client prisma
 19: npm install @clerk/nextjs
 20: npm install @supabase/supabase-js
 21: 
 22: # Document parsing
 23: npm install pdf-parse mammoth
 24: npm install @types/pdf-parse --save-dev
 25: 
 26: # Forms & validation
 27: npm install zod react-hook-form @hookform/resolvers
 28: 
 29: # UI
 30: npm install lucide-react react-dropzone
 31: npx shadcn@latest init
 32: npx shadcn@latest add button card badge progress table tabs
 33: 
 34: # PDF export (for reports)
 35: npm install @react-pdf/renderer
 36: ```
 37: 
 38: ### 3. Set up environment
 39: ```bash
 40: cp .env.example .env.local
 41: # Fill in your keys:
 42: # - DATABASE_URL from Supabase > Settings > Database
 43: # - Clerk keys from Clerk dashboard
 44: # - Supabase URL & keys from Supabase dashboard
 45: # - GEMINI_API_KEY from Google AI Studio (free)
 46: ```
 47: 
 48: ### 4. Set up database
 49: ```bash
 50: npx prisma generate
 51: npx prisma db push
 52: ```
 53: 
 54: ### 5. Create Supabase storage bucket
 55: - Go to Supabase dashboard → Storage
 56: - Create a bucket named: `talentproof-uploads`
 57: - Set to Public (or use signed URLs for private)
 58: 
 59: ### 6. Run development server
 60: ```bash
 61: npm run dev
 62: ```
 63: 
 64: ---
 65: 
 66: ## Project Structure
 67: 
 68: ```
 69: talentproof-ai/
 70: │
 71: ├── app/                          # Next.js App Router pages
 72: │   ├── (auth)/                   # Clerk sign-in / sign-up
 73: │   ├── dashboard/                # Main dashboard
 74: │   ├── case/[caseId]/            # Workspace for each evaluation case
 75: │   ├── report/[caseId]/          # Final evaluation report view
 76: │   ├── admin/                    # Admin dashboard
 77: │   └── api/
 78: │       ├── cases/route.ts        # CRUD for cases
 79: │       ├── upload/route.ts       # File upload + text extraction
 80: │       ├── analyze/route.ts      # Trigger AI pipeline
 81: │       └── report/route.ts       # Fetch/export report
 82: │
 83: ├── components/
 84: │   ├── ui/                       # shadcn components
 85: │   ├── dashboard/                # CaseCard, StatsPanel
 86: │   ├── workspace/                # FileUploader, InsightsPanel, JDInput
 87: │   └── report/                   # EvaluationSheet, ScoreGauge, VerificationTable
 88: │
 89: ├── lib/
 90: │   ├── ai/
 91: │   │   ├── gemini.ts             # Gemini API calls
 92: │   │   └── pipeline.ts           # Multi-step analysis orchestrator
 93: │   ├── parser/
 94: │   │   ├── pdf.ts                # PDF text extraction
 95: │   │   └── docx.ts               # DOCX text extraction
 96: │   ├── scoring/
 97: │   │   └── score.ts              # Weighted scoring engine
 98: │   ├── storage.ts                # Supabase file storage
 99: │   └── db.ts                     # Prisma client singleton
100: │
101: ├── prisma/
102: │   └── schema.prisma             # Database schema
103: │
104: ├── types/                        # TypeScript type definitions
105: ├── utils/                        # Helper functions
106: ├── middleware.ts                 # Clerk auth middleware
107: └── .env.local                    # Environment variables
108: ```
109: 
110: ---
111: 
112: ## AI Pipeline (8 steps)
113: 
114: ```
115: 1. User uploads documents + JD
116: 2. Files stored in Supabase Storage
117: 3. Text extracted from PDFs/DOCX
118: 4. Gemini extracts structured candidate profile
119: 5. Gemini parses job description
120: 6. Cross-document validation & verification
121: 7. Weighted score calculated (0–100)
122: 8. Report generated & saved to DB
123: ```
124: 
125: ---
126: 
127: ## Scoring Weights
128: 
129: | Factor | Weight |
130: |--------|--------|
131: | JD Match | 25% |
132: | Profile Completeness | 20% |
133: | Verification Support | 20% |
134: | Academic Alignment | 15% |
135: | Experience Relevance | 10% |
136: | Consistency | 10% |
137: 
138: ---
139: 
140: ## Deployment
141: 
142: **Recommended (free):**
143: - App: [Render](https://render.com) free web service
144: - Database + Storage: [Supabase](https://supabase.com) free plan
145: - Auth: [Clerk](https://clerk.com) free tier (50k users/month)
146: - AI: [Google AI Studio](https://aistudio.google.com) free Gemini API
147: 
148: **Alternative:**
149: - App: [Railway](https://railway.app) ($5 trial credit)
`````

## File: repomix-output-nyxnoe-talentproof-ai.md
`````markdown
   1: This file is a merged representation of the entire codebase, combined into a single document by Repomix.
   2: The content has been processed where line numbers have been added, content has been formatted for parsing in markdown style, security check has been disabled.
   3: 
   4: # File Summary
   5: 
   6: ## Purpose
   7: This file contains a packed representation of the entire repository's contents.
   8: It is designed to be easily consumable by AI systems for analysis, code review,
   9: or other automated processes.
  10: 
  11: ## File Format
  12: The content is organized as follows:
  13: 1. This summary section
  14: 2. Repository information
  15: 3. Directory structure
  16: 4. Repository files (if enabled)
  17: 5. Multiple file entries, each consisting of:
  18:   a. A header with the file path (## File: path/to/file)
  19:   b. The full contents of the file in a code block
  20: 
  21: ## Usage Guidelines
  22: - This file should be treated as read-only. Any changes should be made to the
  23:   original repository files, not this packed version.
  24: - When processing this file, use the file path to distinguish
  25:   between different files in the repository.
  26: - Be aware that this file may contain sensitive information. Handle it with
  27:   the same level of security as you would the original repository.
  28: 
  29: ## Notes
  30: - Some files may have been excluded based on .gitignore rules and Repomix's configuration
  31: - Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
  32: - Files matching patterns in .gitignore are excluded
  33: - Files matching default ignore patterns are excluded
  34: - Line numbers have been added to the beginning of each line
  35: - Content has been formatted for parsing in markdown style
  36: - Security check has been disabled - content may contain sensitive information
  37: - Files are sorted by Git change count (files with more changes are at the bottom)
  38: 
  39: # Directory Structure
  40: ```
  41: app/
  42:   api/
  43:     analyze/
  44:       route.ts
  45:     cases/
  46:       route.ts
  47:     report/
  48:       route.ts
  49:     upload/
  50:       route.ts
  51:   case/
  52:     [caseId]/
  53:       page.tsx
  54:     new/
  55:       page.tsx
  56:   dashboard/
  57:     page.tsx
  58:   report/
  59:     [caseId]/
  60:       page.tsx
  61:   global.css
  62:   layout.tsx
  63:   page.tsx
  64: components/
  65:   dashboard/
  66:     CaseCard.tsx
  67:     StatsCard.tsx
  68:   layout/
  69:     Sidebar.tsx
  70: lib/
  71:   ai/
  72:     gemini.ts
  73:     pipeline.ts
  74:   parser/
  75:     docx.ts
  76:     pdf.ts
  77:   scoring/
  78:     score.ts
  79:   db.ts
  80:   storage.ts
  81: prisma/
  82:   schema.prisma
  83: .env.local
  84: .gitignore
  85: env.example
  86: middleware.ts
  87: package.json
  88: README.md
  89: ```
  90: 
  91: # Files
  92: 
  93: ## File: app/api/analyze/route.ts
  94: ````typescript
  95:  1: // app/api/analyze/route.ts
  96:  2: import { NextRequest, NextResponse } from "next/server";
  97:  3: import { auth } from "@clerk/nextjs/server";
  98:  4: import { db } from "@/lib/db";
  99:  5: import { runEvaluationPipeline } from "@/lib/ai/pipeline";
 100:  6: 
 101:  7: export async function POST(req: NextRequest) {
 102:  8:   const { userId } = await auth();
 103:  9:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 104: 10: 
 105: 11:   const { caseId } = await req.json();
 106: 12:   if (!caseId) return NextResponse.json({ error: "caseId required" }, { status: 400 });
 107: 13: 
 108: 14:   // Fetch case with uploads
 109: 15:   const caseRecord = await db.case.findFirst({
 110: 16:     where: { id: caseId, user: { clerkId: userId } },
 111: 17:     include: { uploads: true },
 112: 18:   });
 113: 19: 
 114: 20:   if (!caseRecord) return NextResponse.json({ error: "Case not found" }, { status: 404 });
 115: 21: 
 116: 22:   if (!caseRecord.uploads.length) {
 117: 23:     return NextResponse.json({ error: "No files uploaded yet" }, { status: 400 });
 118: 24:   }
 119: 25: 
 120: 26:   // Mark as processing
 121: 27:   await db.case.update({ where: { id: caseId }, data: { status: "PROCESSING" } });
 122: 28: 
 123: 29:   try {
 124: 30:     const result = await runEvaluationPipeline({
 125: 31:       caseId,
 126: 32:       uploads: caseRecord.uploads,
 127: 33:       jdText: caseRecord.jdText,
 128: 34:       companyPreferences: caseRecord.companyPreferences,
 129: 35:       mode: caseRecord.mode,
 130: 36:     });
 131: 37: 
 132: 38:     // Save report
 133: 39:     const report = await db.report.upsert({
 134: 40:       where: { caseId },
 135: 41:       create: {
 136: 42:         caseId,
 137: 43:         summary: result.analysis.summary,
 138: 44:         strengths: result.analysis.strengths,
 139: 45:         weaknesses: result.analysis.weaknesses,
 140: 46:         missingItems: result.analysis.missingItems,
 141: 47:         riskFlags: result.analysis.riskFlags,
 142: 48:         recommendation: result.analysis.recommendation,
 143: 49:         score: result.finalScore,
 144: 50:         scoreBreakdown: result.analysis.scoreBreakdown,
 145: 51:         verifications: result.analysis.verifications,
 146: 52:       },
 147: 53:       update: {
 148: 54:         summary: result.analysis.summary,
 149: 55:         strengths: result.analysis.strengths,
 150: 56:         weaknesses: result.analysis.weaknesses,
 151: 57:         missingItems: result.analysis.missingItems,
 152: 58:         riskFlags: result.analysis.riskFlags,
 153: 59:         recommendation: result.analysis.recommendation,
 154: 60:         score: result.finalScore,
 155: 61:         scoreBreakdown: result.analysis.scoreBreakdown,
 156: 62:         verifications: result.analysis.verifications,
 157: 63:       },
 158: 64:     });
 159: 65: 
 160: 66:     await db.case.update({
 161: 67:       where: { id: caseId },
 162: 68:       data: { status: "COMPLETED", finalScore: result.finalScore },
 163: 69:     });
 164: 70: 
 165: 71:     return NextResponse.json({ report });
 166: 72:   } catch (err) {
 167: 73:     console.error("[analyze] Pipeline error:", err);
 168: 74:     await db.case.update({ where: { id: caseId }, data: { status: "FAILED" } });
 169: 75:     return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
 170: 76:   }
 171: 77: }
 172: ````
 173: 
 174: ## File: app/api/cases/route.ts
 175: ````typescript
 176:  1: // app/api/cases/route.ts
 177:  2: import { NextRequest, NextResponse } from "next/server";
 178:  3: import { auth } from "@clerk/nextjs/server";
 179:  4: import { db } from "@/lib/db";
 180:  5: 
 181:  6: // GET — list all cases for current user
 182:  7: export async function GET() {
 183:  8:   const { userId } = await auth();
 184:  9:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 185: 10: 
 186: 11:   const cases = await db.case.findMany({
 187: 12:     where: { user: { clerkId: userId } },
 188: 13:     include: { uploads: { select: { id: true, fileType: true, processingStatus: true } }, report: { select: { score: true, recommendation: true } } },
 189: 14:     orderBy: { createdAt: "desc" },
 190: 15:   });
 191: 16: 
 192: 17:   return NextResponse.json({ cases });
 193: 18: }
 194: 19: 
 195: 20: // POST — create new case
 196: 21: export async function POST(req: NextRequest) {
 197: 22:   const { userId } = await auth();
 198: 23:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 199: 24: 
 200: 25:   const body = await req.json();
 201: 26:   const { title, mode, jdText, companyPreferences } = body;
 202: 27: 
 203: 28:   if (!title || !mode) {
 204: 29:     return NextResponse.json({ error: "title and mode are required" }, { status: 400 });
 205: 30:   }
 206: 31: 
 207: 32:   // Ensure user exists in DB
 208: 33:   const user = await db.user.upsert({
 209: 34:     where: { clerkId: userId },
 210: 35:     create: { clerkId: userId, email: body.email ?? "", role: mode === "RECRUITER" ? "RECRUITER" : "CANDIDATE" },
 211: 36:     update: {},
 212: 37:   });
 213: 38: 
 214: 39:   const newCase = await db.case.create({
 215: 40:     data: { title, userId: user.id, mode, jdText, companyPreferences },
 216: 41:   });
 217: 42: 
 218: 43:   return NextResponse.json({ case: newCase }, { status: 201 });
 219: 44: }
 220: ````
 221: 
 222: ## File: app/api/report/route.ts
 223: ````typescript
 224: 1: 
 225: ````
 226: 
 227: ## File: app/api/upload/route.ts
 228: ````typescript
 229:  1: // app/api/upload/route.ts
 230:  2: import { NextRequest, NextResponse } from "next/server";
 231:  3: import { auth } from "@clerk/nextjs/server";
 232:  4: import { db } from "@/lib/db";
 233:  5: import { uploadFileToStorage } from "@/lib/storage";
 234:  6: import { parsePDF } from "@/lib/parser/pdf";
 235:  7: import { parseDocx } from "@/lib/parser/docx";
 236:  8: 
 237:  9: export async function POST(req: NextRequest) {
 238: 10:   const { userId } = await auth();
 239: 11:   if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
 240: 12: 
 241: 13:   const formData = await req.formData();
 242: 14:   const file = formData.get("file") as File;
 243: 15:   const caseId = formData.get("caseId") as string;
 244: 16:   const fileType = formData.get("fileType") as string;
 245: 17: 
 246: 18:   if (!file || !caseId || !fileType) {
 247: 19:     return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
 248: 20:   }
 249: 21: 
 250: 22:   // Verify case belongs to user
 251: 23:   const caseRecord = await db.case.findFirst({
 252: 24:     where: { id: caseId, user: { clerkId: userId } },
 253: 25:   });
 254: 26:   if (!caseRecord) return NextResponse.json({ error: "Case not found" }, { status: 404 });
 255: 27: 
 256: 28:   const buffer = Buffer.from(await file.arrayBuffer());
 257: 29:   const mimeType = file.type;
 258: 30: 
 259: 31:   // Upload to Supabase Storage
 260: 32:   const storageUrl = await uploadFileToStorage(buffer, file.name, mimeType);
 261: 33: 
 262: 34:   // Extract text based on file type
 263: 35:   let extractedText: string | null = null;
 264: 36:   try {
 265: 37:     if (mimeType === "application/pdf") {
 266: 38:       extractedText = await parsePDF(buffer);
 267: 39:     } else if (
 268: 40:       mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
 269: 41:     ) {
 270: 42:       extractedText = await parseDocx(buffer);
 271: 43:     }
 272: 44:   } catch (err) {
 273: 45:     console.error("[upload] Text extraction failed:", err);
 274: 46:     // Don't fail upload if extraction fails — just store without text
 275: 47:   }
 276: 48: 
 277: 49:   const upload = await db.upload.create({
 278: 50:     data: {
 279: 51:       caseId,
 280: 52:       fileName: file.name,
 281: 53:       fileType: fileType as any,
 282: 54:       storageUrl,
 283: 55:       extractedText,
 284: 56:       processingStatus: extractedText ? "PARSED" : "PENDING",
 285: 57:     },
 286: 58:   });
 287: 59: 
 288: 60:   return NextResponse.json({ upload });
 289: 61: }
 290: ````
 291: 
 292: ## File: app/case/[caseId]/page.tsx
 293: ````typescript
 294:   1: "use client";
 295:   2: // app/(app)/cases/[caseId]/page.tsx
 296:   3: import { useEffect, useState, useCallback } from "react";
 297:   4: import { useParams, useRouter } from "next/navigation";
 298:   5: import { useDropzone } from "react-dropzone";
 299:   6: import {
 300:   7:   Upload, FileText, CheckCircle2, AlertCircle,
 301:   8:   Loader2, Sparkles, X, ChevronRight, FileUp
 302:   9: } from "lucide-react";
 303:  10: 
 304:  11: const FILE_TYPES = [
 305:  12:   { value: "RESUME",           label: "Resume" },
 306:  13:   { value: "COVER_LETTER",     label: "Cover Letter" },
 307:  14:   { value: "CERTIFICATE",      label: "Certificate" },
 308:  15:   { value: "MARKSHEET",        label: "Marksheet" },
 309:  16:   { value: "DEGREE",           label: "Degree" },
 310:  17:   { value: "INTERNSHIP",       label: "Internship Proof" },
 311:  18:   { value: "EXPERIENCE_LETTER",label: "Experience Letter" },
 312:  19:   { value: "JOB_DESCRIPTION",  label: "Job Description (file)" },
 313:  20:   { value: "OTHER",            label: "Other" },
 314:  21: ];
 315:  22: 
 316:  23: interface UploadedFile {
 317:  24:   id: string; fileName: string; fileType: string; processingStatus: string;
 318:  25: }
 319:  26: 
 320:  27: interface Insight { type: "info" | "warn" | "ok"; text: string; }
 321:  28: 
 322:  29: export default function CaseWorkspacePage() {
 323:  30:   const { caseId } = useParams<{ caseId: string }>();
 324:  31:   const router = useRouter();
 325:  32: 
 326:  33:   const [caseData, setCaseData] = useState<any>(null);
 327:  34:   const [uploads, setUploads] = useState<UploadedFile[]>([]);
 328:  35:   const [insights, setInsights] = useState<Insight[]>([
 329:  36:     { type: "info", text: "Upload documents to begin evaluation." },
 330:  37:   ]);
 331:  38:   const [analyzing, setAnalyzing] = useState(false);
 332:  39:   const [pendingFileType, setPendingFileType] = useState("RESUME");
 333:  40:   const [uploading, setUploading] = useState(false);
 334:  41: 
 335:  42:   useEffect(() => {
 336:  43:     fetch(`/api/cases/${caseId}`)
 337:  44:       .then((r) => r.json())
 338:  45:       .then((d) => {
 339:  46:         setCaseData(d.case);
 340:  47:         setUploads(d.case?.uploads ?? []);
 341:  48:         if (d.case?.status === "COMPLETED") router.push(`/report/${caseId}`);
 342:  49:       });
 343:  50:   }, [caseId]);
 344:  51: 
 345:  52:   const onDrop = useCallback(
 346:  53:     async (accepted: File[]) => {
 347:  54:       if (!accepted.length) return;
 348:  55:       const file = accepted[0];
 349:  56:       setUploading(true);
 350:  57: 
 351:  58:       const form = new FormData();
 352:  59:       form.append("file", file);
 353:  60:       form.append("caseId", caseId);
 354:  61:       form.append("fileType", pendingFileType);
 355:  62: 
 356:  63:       const res = await fetch("/api/upload", { method: "POST", body: form });
 357:  64:       const data = await res.json();
 358:  65: 
 359:  66:       if (data.upload) {
 360:  67:         setUploads((prev) => [...prev, data.upload]);
 361:  68:         setInsights((prev) => [
 362:  69:           { type: "ok", text: `"${file.name}" uploaded and parsed.` },
 363:  70:           ...prev,
 364:  71:         ]);
 365:  72:       } else {
 366:  73:         setInsights((prev) => [
 367:  74:           { type: "warn", text: `Failed to upload "${file.name}".` },
 368:  75:           ...prev,
 369:  76:         ]);
 370:  77:       }
 371:  78:       setUploading(false);
 372:  79:     },
 373:  80:     [caseId, pendingFileType]
 374:  81:   );
 375:  82: 
 376:  83:   const { getRootProps, getInputProps, isDragActive } = useDropzone({
 377:  84:     onDrop,
 378:  85:     accept: { "application/pdf": [], "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [], "image/*": [] },
 379:  86:     maxFiles: 1,
 380:  87:   });
 381:  88: 
 382:  89:   async function handleAnalyze() {
 383:  90:     if (uploads.length === 0) return;
 384:  91:     setAnalyzing(true);
 385:  92:     setInsights((prev) => [{ type: "info", text: "Running AI evaluation pipeline…" }, ...prev]);
 386:  93: 
 387:  94:     const res = await fetch("/api/analyze", {
 388:  95:       method: "POST",
 389:  96:       headers: { "Content-Type": "application/json" },
 390:  97:       body: JSON.stringify({ caseId }),
 391:  98:     });
 392:  99:     const data = await res.json();
 393: 100: 
 394: 101:     if (data.report) {
 395: 102:       setInsights((prev) => [
 396: 103:         { type: "ok", text: "Evaluation complete! Redirecting to report…" },
 397: 104:         ...prev,
 398: 105:       ]);
 399: 106:       setTimeout(() => router.push(`/report/${caseId}`), 1200);
 400: 107:     } else {
 401: 108:       setInsights((prev) => [
 402: 109:         { type: "warn", text: "Analysis failed. Please try again." },
 403: 110:         ...prev,
 404: 111:       ]);
 405: 112:       setAnalyzing(false);
 406: 113:     }
 407: 114:   }
 408: 115: 
 409: 116:   const statusIcon = (status: string) => {
 410: 117:     if (status === "PARSED" || status === "ANALYZED")
 411: 118:       return <CheckCircle2 size={13} style={{ color: "var(--green)" }} />;
 412: 119:     if (status === "ERROR")
 413: 120:       return <AlertCircle size={13} style={{ color: "var(--red)" }} />;
 414: 121:     return <Loader2 size={13} className="animate-spin" style={{ color: "var(--amber)" }} />;
 415: 122:   };
 416: 123: 
 417: 124:   return (
 418: 125:     <div className="flex h-screen overflow-hidden">
 419: 126:       {/* LEFT: Files panel */}
 420: 127:       <div
 421: 128:         className="w-64 flex-shrink-0 border-r flex flex-col"
 422: 129:         style={{ borderColor: "var(--line)", background: "var(--white)" }}
 423: 130:       >
 424: 131:         <div className="px-5 py-4 border-b" style={{ borderColor: "var(--line)" }}>
 425: 132:           <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ghost)" }}>
 426: 133:             Uploaded Files
 427: 134:           </p>
 428: 135:         </div>
 429: 136:         <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
 430: 137:           {uploads.length === 0 && (
 431: 138:             <p className="text-xs text-center mt-6" style={{ color: "var(--ghost)" }}>
 432: 139:               No files yet
 433: 140:             </p>
 434: 141:           )}
 435: 142:           {uploads.map((u) => (
 436: 143:             <div
 437: 144:               key={u.id}
 438: 145:               className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
 439: 146:               style={{ background: "var(--surface)" }}
 440: 147:             >
 441: 148:               <FileText size={13} style={{ color: "var(--muted)" }} />
 442: 149:               <div className="flex-1 min-w-0">
 443: 150:                 <p className="text-xs font-medium truncate">{u.fileName}</p>
 444: 151:                 <p className="text-[10px]" style={{ color: "var(--ghost)" }}>{u.fileType}</p>
 445: 152:               </div>
 446: 153:               {statusIcon(u.processingStatus)}
 447: 154:             </div>
 448: 155:           ))}
 449: 156:         </div>
 450: 157:         <div className="p-3 border-t" style={{ borderColor: "var(--line)" }}>
 451: 158:           <p className="text-[10px] text-center" style={{ color: "var(--ghost)" }}>
 452: 159:             {uploads.length} file{uploads.length !== 1 ? "s" : ""} uploaded
 453: 160:           </p>
 454: 161:         </div>
 455: 162:       </div>
 456: 163: 
 457: 164:       {/* CENTER: Actions panel */}
 458: 165:       <div className="flex-1 overflow-y-auto p-8">
 459: 166:         <div className="max-w-lg mx-auto">
 460: 167:           <div className="mb-6">
 461: 168:             <h1
 462: 169:               className="text-2xl font-bold mb-1"
 463: 170:               style={{ fontFamily: "var(--font-display)" }}
 464: 171:             >
 465: 172:               {caseData?.title ?? "Loading…"}
 466: 173:             </h1>
 467: 174:             <span
 468: 175:               className="text-xs font-medium px-2 py-0.5 rounded-full"
 469: 176:               style={{ background: "var(--accent-lt)", color: "var(--accent)" }}
 470: 177:             >
 471: 178:               {caseData?.mode === "RECRUITER" ? "Recruiter Mode" : "Candidate Mode"}
 472: 179:             </span>
 473: 180:           </div>
 474: 181: 
 475: 182:           {/* File type selector */}
 476: 183:           <div className="mb-3">
 477: 184:             <label className="text-xs font-semibold mb-1.5 block" style={{ color: "var(--muted)" }}>
 478: 185:               Document Type
 479: 186:             </label>
 480: 187:             <select
 481: 188:               value={pendingFileType}
 482: 189:               onChange={(e) => setPendingFileType(e.target.value)}
 483: 190:               className="w-full px-3 py-2.5 rounded-xl border text-sm outline-none"
 484: 191:               style={{ borderColor: "var(--line)", background: "var(--white)", color: "var(--ink)" }}
 485: 192:             >
 486: 193:               {FILE_TYPES.map((ft) => (
 487: 194:                 <option key={ft.value} value={ft.value}>{ft.label}</option>
 488: 195:               ))}
 489: 196:             </select>
 490: 197:           </div>
 491: 198: 
 492: 199:           {/* Dropzone */}
 493: 200:           <div
 494: 201:             {...getRootProps()}
 495: 202:             className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-6"
 496: 203:             style={{
 497: 204:               borderColor: isDragActive ? "var(--accent)" : "var(--line)",
 498: 205:               background: isDragActive ? "var(--accent-lt)" : "var(--white)",
 499: 206:             }}
 500: 207:           >
 501: 208:             <input {...getInputProps()} />
 502: 209:             {uploading ? (
 503: 210:               <div className="flex flex-col items-center gap-2">
 504: 211:                 <Loader2 size={24} className="animate-spin" style={{ color: "var(--accent)" }} />
 505: 212:                 <p className="text-sm" style={{ color: "var(--muted)" }}>Uploading & parsing…</p>
 506: 213:               </div>
 507: 214:             ) : (
 508: 215:               <div className="flex flex-col items-center gap-2">
 509: 216:                 <FileUp size={24} style={{ color: isDragActive ? "var(--accent)" : "var(--ghost)" }} />
 510: 217:                 <p className="text-sm font-medium">
 511: 218:                   {isDragActive ? "Drop to upload" : "Drag & drop or click to upload"}
 512: 219:                 </p>
 513: 220:                 <p className="text-xs" style={{ color: "var(--ghost)" }}>
 514: 221:                   PDF, DOCX, or image — one file at a time
 515: 222:                 </p>
 516: 223:               </div>
 517: 224:             )}
 518: 225:           </div>
 519: 226: 
 520: 227:           {/* JD reminder if not set */}
 521: 228:           {!caseData?.jdText && uploads.length > 0 && (
 522: 229:             <div
 523: 230:               className="flex items-start gap-3 p-4 rounded-xl mb-6"
 524: 231:               style={{ background: "var(--amber-lt)" }}
 525: 232:             >
 526: 233:               <AlertCircle size={15} style={{ color: "var(--amber)", flexShrink: 0, marginTop: 1 }} />
 527: 234:               <p className="text-xs" style={{ color: "var(--amber)" }}>
 528: 235:                 No job description was added. For best results, edit this case and add a JD before analyzing.
 529: 236:               </p>
 530: 237:             </div>
 531: 238:           )}
 532: 239: 
 533: 240:           {/* Run Analysis */}
 534: 241:           <button
 535: 242:             onClick={handleAnalyze}
 536: 243:             disabled={analyzing || uploads.length === 0}
 537: 244:             className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
 538: 245:             style={{ background: analyzing ? "var(--ink-3)" : "var(--accent)" }}
 539: 246:           >
 540: 247:             {analyzing ? (
 541: 248:               <><Loader2 size={16} className="animate-spin" /> Evaluating…</>
 542: 249:             ) : (
 543: 250:               <><Sparkles size={16} /> Run AI Evaluation<ChevronRight size={15} /></>
 544: 251:             )}
 545: 252:           </button>
 546: 253: 
 547: 254:           <p className="text-xs text-center mt-3" style={{ color: "var(--ghost)" }}>
 548: 255:             Upload all documents first, then run evaluation
 549: 256:           </p>
 550: 257:         </div>
 551: 258:       </div>
 552: 259: 
 553: 260:       {/* RIGHT: Insights panel */}
 554: 261:       <div
 555: 262:         className="w-72 flex-shrink-0 border-l flex flex-col"
 556: 263:         style={{ borderColor: "var(--line)", background: "var(--white)" }}
 557: 264:       >
 558: 265:         <div className="px-5 py-4 border-b" style={{ borderColor: "var(--line)" }}>
 559: 266:           <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ghost)" }}>
 560: 267:             AI Insights
 561: 268:           </p>
 562: 269:         </div>
 563: 270:         <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
 564: 271:           {insights.map((ins, i) => (
 565: 272:             <InsightItem key={i} insight={ins} />
 566: 273:           ))}
 567: 274:         </div>
 568: 275:       </div>
 569: 276:     </div>
 570: 277:   );
 571: 278: }
 572: 279: 
 573: 280: function InsightItem({ insight }: { insight: Insight }) {
 574: 281:   const cfg = {
 575: 282:     info: { bg: "var(--blue-lt)",  color: "var(--blue)",  icon: <Sparkles size={11} /> },
 576: 283:     warn: { bg: "var(--amber-lt)", color: "var(--amber)", icon: <AlertCircle size={11} /> },
 577: 284:     ok:   { bg: "var(--green-lt)", color: "var(--green)", icon: <CheckCircle2 size={11} /> },
 578: 285:   }[insight.type];
 579: 286: 
 580: 287:   return (
 581: 288:     <div className="flex items-start gap-2.5 p-3 rounded-lg" style={{ background: cfg.bg }}>
 582: 289:       <span style={{ color: cfg.color, marginTop: 1, flexShrink: 0 }}>{cfg.icon}</span>
 583: 290:       <p className="text-xs leading-relaxed" style={{ color: cfg.color }}>{insight.text}</p>
 584: 291:     </div>
 585: 292:   );
 586: 293: }
 587: ````
 588: 
 589: ## File: app/case/new/page.tsx
 590: ````typescript
 591:   1: "use client";
 592:   2: // app/(app)/cases/new/page.tsx
 593:   3: import { useState } from "react";
 594:   4: import { useRouter } from "next/navigation";
 595:   5: import { useUser } from "@clerk/nextjs";
 596:   6: import { Briefcase, User, ChevronRight } from "lucide-react";
 597:   7: 
 598:   8: export default function NewCasePage() {
 599:   9:   const router = useRouter();
 600:  10:   const { user } = useUser();
 601:  11:   const [title, setTitle] = useState("");
 602:  12:   const [mode, setMode] = useState<"RECRUITER" | "CANDIDATE" | "">("");
 603:  13:   const [jdText, setJdText] = useState("");
 604:  14:   const [preferences, setPreferences] = useState("");
 605:  15:   const [loading, setLoading] = useState(false);
 606:  16:   const [error, setError] = useState("");
 607:  17: 
 608:  18:   async function handleCreate() {
 609:  19:     if (!title.trim() || !mode) {
 610:  20:       setError("Please fill in all required fields.");
 611:  21:       return;
 612:  22:     }
 613:  23:     setLoading(true);
 614:  24:     setError("");
 615:  25: 
 616:  26:     try {
 617:  27:       const res = await fetch("/api/cases", {
 618:  28:         method: "POST",
 619:  29:         headers: { "Content-Type": "application/json" },
 620:  30:         body: JSON.stringify({
 621:  31:           title: title.trim(),
 622:  32:           mode,
 623:  33:           jdText: jdText.trim() || null,
 624:  34:           companyPreferences: preferences.trim() || null,
 625:  35:           email: user?.primaryEmailAddress?.emailAddress,
 626:  36:         }),
 627:  37:       });
 628:  38: 
 629:  39:       if (!res.ok) throw new Error("Failed to create case");
 630:  40:       const data = await res.json();
 631:  41:       router.push(`/cases/${data.case.id}`);
 632:  42:     } catch {
 633:  43:       setError("Something went wrong. Please try again.");
 634:  44:       setLoading(false);
 635:  45:     }
 636:  46:   }
 637:  47: 
 638:  48:   return (
 639:  49:     <div className="p-8 max-w-2xl fade-up">
 640:  50:       <div className="mb-8">
 641:  51:         <h1
 642:  52:           className="text-3xl font-bold mb-1"
 643:  53:           style={{ fontFamily: "var(--font-display)" }}
 644:  54:         >
 645:  55:           New Evaluation Case
 646:  56:         </h1>
 647:  57:         <p className="text-sm" style={{ color: "var(--muted)" }}>
 648:  58:           Set up a new candidate assessment workspace
 649:  59:         </p>
 650:  60:       </div>
 651:  61: 
 652:  62:       {/* Step 1: Case name */}
 653:  63:       <Section label="Case Name" required>
 654:  64:         <input
 655:  65:           type="text"
 656:  66:           value={title}
 657:  67:           onChange={(e) => setTitle(e.target.value)}
 658:  68:           placeholder="e.g. John Doe — Senior Developer"
 659:  69:           className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2"
 660:  70:           style={{
 661:  71:             borderColor: "var(--line)",
 662:  72:             background: "var(--white)",
 663:  73:             color: "var(--ink)",
 664:  74:           }}
 665:  75:         />
 666:  76:       </Section>
 667:  77: 
 668:  78:       {/* Step 2: Mode */}
 669:  79:       <Section label="Evaluation Mode" required>
 670:  80:         <div className="grid grid-cols-2 gap-3">
 671:  81:           {[
 672:  82:             {
 673:  83:               value: "RECRUITER",
 674:  84:               icon: Briefcase,
 675:  85:               title: "Recruiter / HR",
 676:  86:               desc: "Evaluate a candidate for a role",
 677:  87:             },
 678:  88:             {
 679:  89:               value: "CANDIDATE",
 680:  90:               icon: User,
 681:  91:               title: "Candidate / Job Seeker",
 682:  92:               desc: "Check your own profile readiness",
 683:  93:             },
 684:  94:           ].map(({ value, icon: Icon, title: t, desc }) => (
 685:  95:             <button
 686:  96:               key={value}
 687:  97:               onClick={() => setMode(value as any)}
 688:  98:               className="text-left p-4 rounded-xl border-2 transition-all"
 689:  99:               style={{
 690: 100:                 borderColor: mode === value ? "var(--accent)" : "var(--line)",
 691: 101:                 background: mode === value ? "var(--accent-lt)" : "var(--white)",
 692: 102:               }}
 693: 103:             >
 694: 104:               <div
 695: 105:                 className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
 696: 106:                 style={{
 697: 107:                   background: mode === value ? "var(--accent)" : "var(--surface)",
 698: 108:                 }}
 699: 109:               >
 700: 110:                 <Icon size={16} color={mode === value ? "white" : "var(--muted)"} />
 701: 111:               </div>
 702: 112:               <div
 703: 113:                 className="font-semibold text-sm mb-0.5"
 704: 114:                 style={{ fontFamily: "var(--font-display)" }}
 705: 115:               >
 706: 116:                 {t}
 707: 117:               </div>
 708: 118:               <div className="text-xs" style={{ color: "var(--muted)" }}>
 709: 119:                 {desc}
 710: 120:               </div>
 711: 121:             </button>
 712: 122:           ))}
 713: 123:         </div>
 714: 124:       </Section>
 715: 125: 
 716: 126:       {/* Step 3: JD */}
 717: 127:       <Section label="Job Description" hint="Optional — paste or type the JD">
 718: 128:         <textarea
 719: 129:           value={jdText}
 720: 130:           onChange={(e) => setJdText(e.target.value)}
 721: 131:           placeholder="Paste the job description here..."
 722: 132:           rows={5}
 723: 133:           className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 resize-none"
 724: 134:           style={{
 725: 135:             borderColor: "var(--line)",
 726: 136:             background: "var(--white)",
 727: 137:             color: "var(--ink)",
 728: 138:           }}
 729: 139:         />
 730: 140:       </Section>
 731: 141: 
 732: 142:       {/* Step 4: Company preferences (recruiter only) */}
 733: 143:       {mode === "RECRUITER" && (
 734: 144:         <Section label="Company Priorities" hint="Optional — what matters most to you">
 735: 145:           <textarea
 736: 146:             value={preferences}
 737: 147:             onChange={(e) => setPreferences(e.target.value)}
 738: 148:             placeholder="e.g. Strong academic record, verified internship experience, coding skills..."
 739: 149:             rows={3}
 740: 150:             className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-all focus:ring-2 resize-none"
 741: 151:             style={{
 742: 152:               borderColor: "var(--line)",
 743: 153:               background: "var(--white)",
 744: 154:               color: "var(--ink)",
 745: 155:             }}
 746: 156:           />
 747: 157:         </Section>
 748: 158:       )}
 749: 159: 
 750: 160:       {error && (
 751: 161:         <p className="text-sm mb-4" style={{ color: "var(--red)" }}>
 752: 162:           {error}
 753: 163:         </p>
 754: 164:       )}
 755: 165: 
 756: 166:       <button
 757: 167:         onClick={handleCreate}
 758: 168:         disabled={loading || !title || !mode}
 759: 169:         className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
 760: 170:         style={{ background: "var(--accent)" }}
 761: 171:       >
 762: 172:         {loading ? "Creating…" : "Create & Open Workspace"}
 763: 173:         {!loading && <ChevronRight size={15} />}
 764: 174:       </button>
 765: 175:     </div>
 766: 176:   );
 767: 177: }
 768: 178: 
 769: 179: function Section({
 770: 180:   label,
 771: 181:   hint,
 772: 182:   required,
 773: 183:   children,
 774: 184: }: {
 775: 185:   label: string;
 776: 186:   hint?: string;
 777: 187:   required?: boolean;
 778: 188:   children: React.ReactNode;
 779: 189: }) {
 780: 190:   return (
 781: 191:     <div className="mb-6">
 782: 192:       <div className="flex items-baseline gap-1.5 mb-2">
 783: 193:         <label
 784: 194:           className="text-sm font-semibold"
 785: 195:           style={{ fontFamily: "var(--font-display)" }}
 786: 196:         >
 787: 197:           {label}
 788: 198:         </label>
 789: 199:         {required && (
 790: 200:           <span className="text-xs" style={{ color: "var(--accent)" }}>
 791: 201:             *
 792: 202:           </span>
 793: 203:         )}
 794: 204:         {hint && (
 795: 205:           <span className="text-xs" style={{ color: "var(--ghost)" }}>
 796: 206:             — {hint}
 797: 207:           </span>
 798: 208:         )}
 799: 209:       </div>
 800: 210:       {children}
 801: 211:     </div>
 802: 212:   );
 803: 213: }
 804: ````
 805: 
 806: ## File: app/dashboard/page.tsx
 807: ````typescript
 808:   1: // app/(app)/dashboard/page.tsx
 809:   2: import { auth } from "@clerk/nextjs/server";
 810:   3: import { db } from "@/lib/db";
 811:   4: import Link from "next/link";
 812:   5: import { Plus, TrendingUp, FileCheck, AlertTriangle, Clock } from "lucide-react";
 813:   6: import CaseCard from "@/components/dashboard/CaseCard";
 814:   7: import StatsCard from "@/components/dashboard/StatsCard";
 815:   8: 
 816:   9: export default async function DashboardPage() {
 817:  10:   const { userId } = await auth();
 818:  11: 
 819:  12:   const user = userId
 820:  13:     ? await db.user.findUnique({
 821:  14:         where: { clerkId: userId },
 822:  15:         include: {
 823:  16:           cases: {
 824:  17:             orderBy: { createdAt: "desc" },
 825:  18:             take: 6,
 826:  19:             include: {
 827:  20:               uploads: { select: { id: true } },
 828:  21:               report: { select: { score: true, recommendation: true } },
 829:  22:             },
 830:  23:           },
 831:  24:         },
 832:  25:       })
 833:  26:     : null;
 834:  27: 
 835:  28:   const cases = user?.cases ?? [];
 836:  29:   const completed  = cases.filter((c) => c.status === "COMPLETED").length;
 837:  30:   const processing = cases.filter((c) => c.status === "PROCESSING").length;
 838:  31:   const avgScore   = completed
 839:  32:     ? Math.round(cases.filter((c) => c.report).reduce((s, c) => s + (c.report?.score ?? 0), 0) / completed)
 840:  33:     : 0;
 841:  34: 
 842:  35:   return (
 843:  36:     <div className="p-8 max-w-6xl">
 844:  37:       {/* Header */}
 845:  38:       <div className="flex items-start justify-between mb-8 fade-up">
 846:  39:         <div>
 847:  40:           <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
 848:  41:             Dashboard
 849:  42:           </h1>
 850:  43:           <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
 851:  44:             Manage your evaluation cases and candidate reports
 852:  45:           </p>
 853:  46:         </div>
 854:  47:         <Link
 855:  48:           href="/cases/new"
 856:  49:           className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
 857:  50:           style={{ background: "var(--accent)" }}
 858:  51:         >
 859:  52:           <Plus size={15} />
 860:  53:           New Evaluation Case
 861:  54:         </Link>
 862:  55:       </div>
 863:  56: 
 864:  57:       {/* Stats */}
 865:  58:       <div className="grid grid-cols-4 gap-4 mb-8">
 866:  59:         <StatsCard icon={FileCheck}      label="Total Cases"   value={cases.length} color="accent" delay={1} />
 867:  60:         <StatsCard icon={TrendingUp}     label="Completed"     value={completed}     color="green"  delay={2} />
 868:  61:         <StatsCard icon={Clock}          label="Processing"    value={processing}    color="amber"  delay={3} />
 869:  62:         <StatsCard icon={AlertTriangle}  label="Avg Score"     value={avgScore ? `${avgScore}%` : "—"} color="blue" delay={4} />
 870:  63:       </div>
 871:  64: 
 872:  65:       {/* Recent Cases */}
 873:  66:       <div className="fade-up fade-up-delay-3">
 874:  67:         <div className="flex items-center justify-between mb-4">
 875:  68:           <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-display)" }}>
 876:  69:             Recent Cases
 877:  70:           </h2>
 878:  71:           <Link href="/cases" className="text-sm" style={{ color: "var(--accent)" }}>
 879:  72:             View all →
 880:  73:           </Link>
 881:  74:         </div>
 882:  75: 
 883:  76:         {cases.length === 0 ? (
 884:  77:           <EmptyState />
 885:  78:         ) : (
 886:  79:           <div className="grid grid-cols-2 gap-4">
 887:  80:             {cases.map((c) => (
 888:  81:               <CaseCard key={c.id} case={c} />
 889:  82:             ))}
 890:  83:           </div>
 891:  84:         )}
 892:  85:       </div>
 893:  86:     </div>
 894:  87:   );
 895:  88: }
 896:  89: 
 897:  90: function EmptyState() {
 898:  91:   return (
 899:  92:     <div
 900:  93:       className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-16 text-center"
 901:  94:       style={{ borderColor: "var(--line)" }}
 902:  95:     >
 903:  96:       <div
 904:  97:         className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
 905:  98:         style={{ background: "var(--accent-lt)" }}
 906:  99:       >
 907: 100:         <FileCheck size={22} style={{ color: "var(--accent)" }} />
 908: 101:       </div>
 909: 102:       <h3 className="font-semibold mb-1" style={{ fontFamily: "var(--font-display)" }}>
 910: 103:         No cases yet
 911: 104:       </h3>
 912: 105:       <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
 913: 106:         Create your first evaluation case to get started
 914: 107:       </p>
 915: 108:       <Link
 916: 109:         href="/cases/new"
 917: 110:         className="px-4 py-2 rounded-lg text-sm font-medium text-white"
 918: 111:         style={{ background: "var(--accent)" }}
 919: 112:       >
 920: 113:         Create Case
 921: 114:       </Link>
 922: 115:     </div>
 923: 116:   );
 924: 117: }
 925: ````
 926: 
 927: ## File: app/report/[caseId]/page.tsx
 928: ````typescript
 929:   1: // app/(app)/report/[caseId]/page.tsx
 930:   2: import { auth } from "@clerk/nextjs/server";
 931:   3: import { db } from "@/lib/db";
 932:   4: import { notFound } from "next/navigation";
 933:   5: import { getScoreLabel } from "@/lib/scoring/score";
 934:   6: import Link from "next/link";
 935:   7: import { ArrowLeft, Download, ShieldCheck, AlertTriangle, CheckCircle2, Clock, XCircle, HelpCircle } from "lucide-react";
 936:   8: 
 937:   9: export default async function ReportPage({ params }: { params: { caseId: string } }) {
 938:  10:   const { userId } = await auth();
 939:  11: 
 940:  12:   const report = await db.report.findFirst({
 941:  13:     where: { case: { id: params.caseId, user: { clerkId: userId! } } },
 942:  14:     include: { case: { select: { title: true, mode: true, jdText: true } } },
 943:  15:   });
 944:  16: 
 945:  17:   if (!report) return notFound();
 946:  18: 
 947:  19:   const scoreInfo = getScoreLabel(report.score);
 948:  20:   const breakdown = report.scoreBreakdown as Record<string, number>;
 949:  21:   const verifications = report.verifications as {
 950:  22:     category: string; label: string; status: string; note: string;
 951:  23:   }[];
 952:  24: 
 953:  25:   return (
 954:  26:     <div className="p-8 max-w-4xl fade-up">
 955:  27:       {/* Back */}
 956:  28:       <Link
 957:  29:         href="/dashboard"
 958:  30:         className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:opacity-70"
 959:  31:         style={{ color: "var(--muted)" }}
 960:  32:       >
 961:  33:         <ArrowLeft size={14} /> Back to Dashboard
 962:  34:       </Link>
 963:  35: 
 964:  36:       {/* Header card */}
 965:  37:       <div
 966:  38:         className="rounded-2xl p-7 mb-6 border"
 967:  39:         style={{ background: "var(--white)", borderColor: "var(--line)" }}
 968:  40:       >
 969:  41:         <div className="flex items-start justify-between">
 970:  42:           <div>
 971:  43:             <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--ghost)" }}>
 972:  44:               Evaluation Report
 973:  45:             </p>
 974:  46:             <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
 975:  47:               {report.case.title}
 976:  48:             </h1>
 977:  49:             <p className="text-sm" style={{ color: "var(--muted)" }}>
 978:  50:               {report.case.mode === "RECRUITER" ? "Recruiter Assessment" : "Candidate Readiness Check"}
 979:  51:             </p>
 980:  52:           </div>
 981:  53: 
 982:  54:           {/* Score circle */}
 983:  55:           <div className="flex flex-col items-center">
 984:  56:             <div
 985:  57:               className="w-24 h-24 rounded-full flex flex-col items-center justify-center border-4"
 986:  58:               style={{
 987:  59:                 borderColor:
 988:  60:                   report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
 989:  61:               }}
 990:  62:             >
 991:  63:               <span
 992:  64:                 className="text-2xl font-bold leading-none"
 993:  65:                 style={{
 994:  66:                   fontFamily: "var(--font-display)",
 995:  67:                   color: report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
 996:  68:                 }}
 997:  69:               >
 998:  70:                 {Math.round(report.score)}
 999:  71:               </span>
1000:  72:               <span className="text-[10px]" style={{ color: "var(--ghost)" }}>/ 100</span>
1001:  73:             </div>
1002:  74:             <span
1003:  75:               className="text-xs font-medium mt-2 px-2 py-0.5 rounded-full"
1004:  76:               style={{
1005:  77:                 background: report.score >= 70 ? "var(--green-lt)" : report.score >= 50 ? "var(--amber-lt)" : "var(--red-lt)",
1006:  78:                 color: report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
1007:  79:               }}
1008:  80:             >
1009:  81:               {scoreInfo.label}
1010:  82:             </span>
1011:  83:           </div>
1012:  84:         </div>
1013:  85: 
1014:  86:         {/* Recommendation banner */}
1015:  87:         <div
1016:  88:           className="mt-5 flex items-center gap-3 p-4 rounded-xl"
1017:  89:           style={{ background: "var(--accent-lt)" }}
1018:  90:         >
1019:  91:           <ShieldCheck size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
1020:  92:           <div>
1021:  93:             <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>AI Recommendation</p>
1022:  94:             <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{report.recommendation}</p>
1023:  95:           </div>
1024:  96:         </div>
1025:  97:       </div>
1026:  98: 
1027:  99:       <div className="grid grid-cols-2 gap-6 mb-6">
1028: 100:         {/* Summary */}
1029: 101:         <ReportSection title="Summary">
1030: 102:           <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{report.summary}</p>
1031: 103:         </ReportSection>
1032: 104: 
1033: 105:         {/* Score Breakdown */}
1034: 106:         <ReportSection title="Score Breakdown">
1035: 107:           <div className="space-y-3">
1036: 108:             {Object.entries(breakdown).map(([key, val]) => (
1037: 109:               <div key={key}>
1038: 110:                 <div className="flex justify-between text-xs mb-1">
1039: 111:                   <span style={{ color: "var(--muted)" }}>{formatKey(key)}</span>
1040: 112:                   <span className="font-semibold" style={{ color: "var(--ink)" }}>{Math.round(val)}%</span>
1041: 113:                 </div>
1042: 114:                 <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
1043: 115:                   <div
1044: 116:                     className="h-full rounded-full transition-all"
1045: 117:                     style={{
1046: 118:                       width: `${Math.round(val)}%`,
1047: 119:                       background: val >= 70 ? "var(--green)" : val >= 50 ? "var(--amber)" : "var(--red)",
1048: 120:                     }}
1049: 121:                   />
1050: 122:                 </div>
1051: 123:               </div>
1052: 124:             ))}
1053: 125:           </div>
1054: 126:         </ReportSection>
1055: 127:       </div>
1056: 128: 
1057: 129:       {/* Verification Table */}
1058: 130:       {verifications?.length > 0 && (
1059: 131:         <div
1060: 132:           className="rounded-2xl border mb-6 overflow-hidden"
1061: 133:           style={{ background: "var(--white)", borderColor: "var(--line)" }}
1062: 134:         >
1063: 135:           <div className="px-6 py-4 border-b" style={{ borderColor: "var(--line)" }}>
1064: 136:             <h2 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>Verification Details</h2>
1065: 137:           </div>
1066: 138:           <table className="w-full text-sm">
1067: 139:             <thead>
1068: 140:               <tr style={{ background: "var(--surface)" }}>
1069: 141:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Category</th>
1070: 142:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Item</th>
1071: 143:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Status</th>
1072: 144:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Note</th>
1073: 145:               </tr>
1074: 146:             </thead>
1075: 147:             <tbody>
1076: 148:               {verifications.map((v, i) => (
1077: 149:                 <tr
1078: 150:                   key={i}
1079: 151:                   className="border-t"
1080: 152:                   style={{ borderColor: "var(--line)" }}
1081: 153:                 >
1082: 154:                   <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{v.category}</td>
1083: 155:                   <td className="px-6 py-3 text-xs font-medium">{v.label}</td>
1084: 156:                   <td className="px-6 py-3">
1085: 157:                     <VerificationBadge status={v.status} />
1086: 158:                   </td>
1087: 159:                   <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{v.note}</td>
1088: 160:                 </tr>
1089: 161:               ))}
1090: 162:             </tbody>
1091: 163:           </table>
1092: 164:         </div>
1093: 165:       )}
1094: 166: 
1095: 167:       <div className="grid grid-cols-3 gap-6 mb-6">
1096: 168:         <ListSection title="Strengths" items={report.strengths} color="green" />
1097: 169:         <ListSection title="Weaknesses" items={report.weaknesses} color="amber" />
1098: 170:         <ListSection title="Missing Items" items={report.missingItems} color="red" />
1099: 171:       </div>
1100: 172: 
1101: 173:       {report.riskFlags?.length > 0 && (
1102: 174:         <div
1103: 175:           className="rounded-2xl border p-6 mb-6"
1104: 176:           style={{ background: "var(--red-lt)", borderColor: "var(--red)" }}
1105: 177:         >
1106: 178:           <div className="flex items-center gap-2 mb-3">
1107: 179:             <AlertTriangle size={15} style={{ color: "var(--red)" }} />
1108: 180:             <h2 className="font-semibold text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--red)" }}>
1109: 181:               Risk Flags
1110: 182:             </h2>
1111: 183:           </div>
1112: 184:           <ul className="space-y-1.5">
1113: 185:             {report.riskFlags.map((flag, i) => (
1114: 186:               <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--red)" }}>
1115: 187:                 <span className="mt-1">•</span> {flag}
1116: 188:               </li>
1117: 189:             ))}
1118: 190:           </ul>
1119: 191:         </div>
1120: 192:       )}
1121: 193: 
1122: 194:       {/* Disclaimer */}
1123: 195:       <p className="text-xs text-center mt-4" style={{ color: "var(--ghost)" }}>
1124: 196:         This report is AI-assisted and for preliminary evaluation only. It does not replace official verification.
1125: 197:       </p>
1126: 198:     </div>
1127: 199:   );
1128: 200: }
1129: 201: 
1130: 202: function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
1131: 203:   return (
1132: 204:     <div
1133: 205:       className="rounded-2xl border p-6"
1134: 206:       style={{ background: "var(--white)", borderColor: "var(--line)" }}
1135: 207:     >
1136: 208:       <h2
1137: 209:         className="font-semibold mb-4"
1138: 210:         style={{ fontFamily: "var(--font-display)" }}
1139: 211:       >
1140: 212:         {title}
1141: 213:       </h2>
1142: 214:       {children}
1143: 215:     </div>
1144: 216:   );
1145: 217: }
1146: 218: 
1147: 219: function ListSection({ title, items, color }: { title: string; items: string[]; color: string }) {
1148: 220:   const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
1149: 221:     green: { bg: "var(--white)",    text: "var(--green)", dot: "var(--green)" },
1150: 222:     amber: { bg: "var(--white)",    text: "var(--amber)", dot: "var(--amber)" },
1151: 223:     red:   { bg: "var(--white)",    text: "var(--red)",   dot: "var(--red)" },
1152: 224:   };
1153: 225:   const c = colorMap[color];
1154: 226: 
1155: 227:   return (
1156: 228:     <div
1157: 229:       className="rounded-2xl border p-5"
1158: 230:       style={{ background: c.bg, borderColor: "var(--line)" }}
1159: 231:     >
1160: 232:       <h2
1161: 233:         className="font-semibold text-sm mb-3"
1162: 234:         style={{ fontFamily: "var(--font-display)", color: c.text }}
1163: 235:       >
1164: 236:         {title}
1165: 237:       </h2>
1166: 238:       {items?.length === 0 ? (
1167: 239:         <p className="text-xs" style={{ color: "var(--ghost)" }}>None noted.</p>
1168: 240:       ) : (
1169: 241:         <ul className="space-y-1.5">
1170: 242:           {items?.map((item, i) => (
1171: 243:             <li key={i} className="text-xs flex items-start gap-2">
1172: 244:               <span style={{ color: c.dot, marginTop: "3px", flexShrink: 0 }}>•</span>
1173: 245:               <span style={{ color: "var(--ink)" }}>{item}</span>
1174: 246:             </li>
1175: 247:           ))}
1176: 248:         </ul>
1177: 249:       )}
1178: 250:     </div>
1179: 251:   );
1180: 252: }
1181: 253: 
1182: 254: function VerificationBadge({ status }: { status: string }) {
1183: 255:   const map: Record<string, { icon: React.ReactNode; label: string; style: React.CSSProperties }> = {
1184: 256:     "Verified":           { icon: <CheckCircle2 size={11} />, label: "Verified",   style: { background: "var(--green-lt)", color: "var(--green)" } },
1185: 257:     "Not Verified":       { icon: <XCircle size={11} />,      label: "Not Verified",style: { background: "var(--red-lt)",   color: "var(--red)" } },
1186: 258:     "Pending":            { icon: <Clock size={11} />,         label: "Pending",    style: { background: "var(--amber-lt)", color: "var(--amber)" } },
1187: 259:     "Risk":               { icon: <AlertTriangle size={11} />, label: "Risk",       style: { background: "var(--red-lt)",   color: "var(--red)" } },
1188: 260:     "Manual Required":    { icon: <HelpCircle size={11} />,    label: "Manual",     style: { background: "var(--blue-lt)",  color: "var(--blue)" } },
1189: 261:   };
1190: 262:   const cfg = map[status] ?? map["Pending"];
1191: 263:   return (
1192: 264:     <span
1193: 265:       className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
1194: 266:       style={cfg.style}
1195: 267:     >
1196: 268:       {cfg.icon} {cfg.label}
1197: 269:     </span>
1198: 270:   );
1199: 271: }
1200: 272: 
1201: 273: function formatKey(key: string): string {
1202: 274:   return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim();
1203: 275: }
1204: ````
1205: 
1206: ## File: app/global.css
1207: ````css
1208:  1: /* app/globals.css */
1209:  2: @tailwind base;
1210:  3: @tailwind components;
1211:  4: @tailwind utilities;
1212:  5: 
1213:  6: :root {
1214:  7:   /* Brand palette */
1215:  8:   --ink:       #0a0a0f;
1216:  9:   --ink-2:     #1a1a24;
1217: 10:   --ink-3:     #2a2a38;
1218: 11:   --muted:     #6b6b80;
1219: 12:   --ghost:     #9898a8;
1220: 13:   --line:      #e2e2ea;
1221: 14:   --surface:   #f8f8fc;
1222: 15:   --white:     #ffffff;
1223: 16: 
1224: 17:   /* Accent — electric indigo */
1225: 18:   --accent:    #5b4dff;
1226: 19:   --accent-lt: #ede9ff;
1227: 20:   --accent-dk: #3d31cc;
1228: 21: 
1229: 22:   /* Status */
1230: 23:   --green:     #12b76a;
1231: 24:   --green-lt:  #d1fadf;
1232: 25:   --amber:     #f79009;
1233: 26:   --amber-lt:  #fef0c7;
1234: 27:   --red:       #f04438;
1235: 28:   --red-lt:    #fee4e2;
1236: 29:   --blue:      #2e90fa;
1237: 30:   --blue-lt:   #d1e9ff;
1238: 31: 
1239: 32:   /* Typography */
1240: 33:   --font-display: var(--font-syne);
1241: 34:   --font-body:    var(--font-dm);
1242: 35: }
1243: 36: 
1244: 37: * { box-sizing: border-box; margin: 0; padding: 0; }
1245: 38: 
1246: 39: body {
1247: 40:   background: var(--surface);
1248: 41:   color: var(--ink);
1249: 42:   font-family: var(--font-body), sans-serif;
1250: 43:   font-size: 15px;
1251: 44:   line-height: 1.6;
1252: 45: }
1253: 46: 
1254: 47: h1, h2, h3, h4, h5 {
1255: 48:   font-family: var(--font-display), sans-serif;
1256: 49:   letter-spacing: -0.02em;
1257: 50: }
1258: 51: 
1259: 52: /* Scrollbar */
1260: 53: ::-webkit-scrollbar { width: 6px; }
1261: 54: ::-webkit-scrollbar-track { background: var(--surface); }
1262: 55: ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
1263: 56: ::-webkit-scrollbar-thumb:hover { background: var(--ghost); }
1264: 57: 
1265: 58: /* Utility classes */
1266: 59: @layer utilities {
1267: 60:   .font-display { font-family: var(--font-display), sans-serif; }
1268: 61:   .font-dm      { font-family: var(--font-body), sans-serif; }
1269: 62: 
1270: 63:   .status-verified   { @apply bg-green-50 text-green-700 border border-green-200; }
1271: 64:   .status-pending    { @apply bg-amber-50  text-amber-700 border border-amber-200; }
1272: 65:   .status-not-verified { @apply bg-red-50 text-red-700 border border-red-200; }
1273: 66:   .status-risk       { @apply bg-red-100 text-red-800 border border-red-300; }
1274: 67:   .status-manual     { @apply bg-blue-50 text-blue-700 border border-blue-200; }
1275: 68: }
1276: 69: 
1277: 70: /* Fade-in animation */
1278: 71: @keyframes fadeUp {
1279: 72:   from { opacity: 0; transform: translateY(12px); }
1280: 73:   to   { opacity: 1; transform: translateY(0); }
1281: 74: }
1282: 75: .fade-up { animation: fadeUp 0.35s ease both; }
1283: 76: .fade-up-delay-1 { animation-delay: 0.05s; }
1284: 77: .fade-up-delay-2 { animation-delay: 0.10s; }
1285: 78: .fade-up-delay-3 { animation-delay: 0.15s; }
1286: 79: .fade-up-delay-4 { animation-delay: 0.20s; }
1287: ````
1288: 
1289: ## File: app/layout.tsx
1290: ````typescript
1291:  1: // app/layout.tsx
1292:  2: import type { Metadata } from "next";
1293:  3: import { ClerkProvider } from "@clerk/nextjs";
1294:  4: import { Syne, DM_Sans } from "next/font/google";
1295:  5: import "./globals.css";
1296:  6: 
1297:  7: const syne = Syne({
1298:  8:   subsets: ["latin"],
1299:  9:   variable: "--font-syne",
1300: 10:   weight: ["400", "500", "600", "700", "800"],
1301: 11: });
1302: 12: 
1303: 13: const dmSans = DM_Sans({
1304: 14:   subsets: ["latin"],
1305: 15:   variable: "--font-dm",
1306: 16:   weight: ["300", "400", "500"],
1307: 17: });
1308: 18: 
1309: 19: export const metadata: Metadata = {
1310: 20:   title: "TalentProof AI",
1311: 21:   description: "AI-Powered Candidate Evaluation & Verification Platform",
1312: 22: };
1313: 23: 
1314: 24: export default function RootLayout({ children }: { children: React.ReactNode }) {
1315: 25:   return (
1316: 26:     <ClerkProvider>
1317: 27:       <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
1318: 28:         <body className="font-dm antialiased">{children}</body>
1319: 29:       </html>
1320: 30:     </ClerkProvider>
1321: 31:   );
1322: 32: }
1323: ````
1324: 
1325: ## File: app/page.tsx
1326: ````typescript
1327:   1: // app/page.tsx
1328:   2: import { auth } from "@clerk/nextjs/server";
1329:   3: import { redirect } from "next/navigation";
1330:   4: import Link from "next/link";
1331:   5: import { ShieldCheck, ArrowRight, FileCheck, Sparkles, BarChart3 } from "lucide-react";
1332:   6: 
1333:   7: export default async function LandingPage() {
1334:   8:   const { userId } = await auth();
1335:   9:   if (userId) redirect("/dashboard");
1336:  10: 
1337:  11:   return (
1338:  12:     <div
1339:  13:       className="min-h-screen flex flex-col"
1340:  14:       style={{ background: "var(--ink)", color: "var(--white)" }}
1341:  15:     >
1342:  16:       {/* Nav */}
1343:  17:       <nav className="flex items-center justify-between px-8 py-5">
1344:  18:         <div className="flex items-center gap-2.5">
1345:  19:           <div
1346:  20:             className="w-8 h-8 rounded-lg flex items-center justify-center"
1347:  21:             style={{ background: "var(--accent)" }}
1348:  22:           >
1349:  23:             <ShieldCheck size={16} color="white" />
1350:  24:           </div>
1351:  25:           <span
1352:  26:             className="text-lg font-bold"
1353:  27:             style={{ fontFamily: "var(--font-display)" }}
1354:  28:           >
1355:  29:             TalentProof AI
1356:  30:           </span>
1357:  31:         </div>
1358:  32:         <Link
1359:  33:           href="/sign-in"
1360:  34:           className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-80"
1361:  35:           style={{ background: "var(--accent)" }}
1362:  36:         >
1363:  37:           Sign In
1364:  38:         </Link>
1365:  39:       </nav>
1366:  40: 
1367:  41:       {/* Hero */}
1368:  42:       <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
1369:  43:         <div
1370:  44:           className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6"
1371:  45:           style={{ background: "var(--ink-3)", color: "var(--ghost)" }}
1372:  46:         >
1373:  47:           <Sparkles size={11} style={{ color: "var(--accent)" }} />
1374:  48:           AI-Powered Hiring Intelligence
1375:  49:         </div>
1376:  50: 
1377:  51:         <h1
1378:  52:           className="text-5xl font-bold mb-6 max-w-2xl leading-tight"
1379:  53:           style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em" }}
1380:  54:         >
1381:  55:           Evaluate candidates with AI precision
1382:  56:         </h1>
1383:  57:         <p
1384:  58:           className="text-lg max-w-xl mb-10 leading-relaxed"
1385:  59:           style={{ color: "var(--ghost)" }}
1386:  60:         >
1387:  61:           Upload resumes, certificates, and documents. Get a structured evaluation report with verification status, job-fit score, and AI recommendations — in minutes.
1388:  62:         </p>
1389:  63: 
1390:  64:         <div className="flex items-center gap-4">
1391:  65:           <Link
1392:  66:             href="/sign-up"
1393:  67:             className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all hover:opacity-90"
1394:  68:             style={{ background: "var(--accent)" }}
1395:  69:           >
1396:  70:             Get Started Free <ArrowRight size={15} />
1397:  71:           </Link>
1398:  72:           <Link
1399:  73:             href="/sign-in"
1400:  74:             className="px-6 py-3.5 rounded-xl font-semibold transition-all hover:opacity-80"
1401:  75:             style={{ background: "var(--ink-2)", color: "var(--ghost)" }}
1402:  76:           >
1403:  77:             Sign In
1404:  78:           </Link>
1405:  79:         </div>
1406:  80: 
1407:  81:         {/* Feature pills */}
1408:  82:         <div className="flex items-center gap-3 mt-14 flex-wrap justify-center">
1409:  83:           {[
1410:  84:             { icon: FileCheck, text: "Multi-document analysis" },
1411:  85:             { icon: BarChart3, text: "0–100 readiness score" },
1412:  86:             { icon: ShieldCheck, text: "Verification engine" },
1413:  87:             { icon: Sparkles,  text: "Explainable AI" },
1414:  88:           ].map(({ icon: Icon, text }) => (
1415:  89:             <div
1416:  90:               key={text}
1417:  91:               className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
1418:  92:               style={{ background: "var(--ink-2)", color: "var(--ghost)" }}
1419:  93:             >
1420:  94:               <Icon size={13} style={{ color: "var(--accent)" }} />
1421:  95:               {text}
1422:  96:             </div>
1423:  97:           ))}
1424:  98:         </div>
1425:  99:       </main>
1426: 100:     </div>
1427: 101:   );
1428: 102: }
1429: ````
1430: 
1431: ## File: components/dashboard/CaseCard.tsx
1432: ````typescript
1433:  1: "use client";
1434:  2: // components/dashboard/CaseCard.tsx
1435:  3: import Link from "next/link";
1436:  4: import { formatDistanceToNow } from "date-fns";
1437:  5: import { FileStack, ChevronRight } from "lucide-react";
1438:  6: 
1439:  7: const statusStyles: Record<string, { label: string; bg: string; color: string }> = {
1440:  8:   PENDING:    { label: "Pending",    bg: "var(--amber-lt)", color: "var(--amber)" },
1441:  9:   PROCESSING: { label: "Processing", bg: "var(--blue-lt)",  color: "var(--blue)" },
1442: 10:   COMPLETED:  { label: "Completed",  bg: "var(--green-lt)", color: "var(--green)" },
1443: 11:   FAILED:     { label: "Failed",     bg: "var(--red-lt)",   color: "var(--red)" },
1444: 12: };
1445: 13: 
1446: 14: interface Props {
1447: 15:   case: {
1448: 16:     id: string;
1449: 17:     title: string;
1450: 18:     mode: string;
1451: 19:     status: string;
1452: 20:     finalScore: number | null;
1453: 21:     createdAt: Date;
1454: 22:     uploads: { id: string }[];
1455: 23:     report: { score: number; recommendation: string } | null;
1456: 24:   };
1457: 25: }
1458: 26: 
1459: 27: export default function CaseCard({ case: c }: Props) {
1460: 28:   const st = statusStyles[c.status] ?? statusStyles.PENDING;
1461: 29:   const score = c.report?.score ?? c.finalScore;
1462: 30: 
1463: 31:   return (
1464: 32:     <Link
1465: 33:       href={c.status === "COMPLETED" ? `/report/${c.id}` : `/cases/${c.id}`}
1466: 34:       className="block rounded-xl border p-5 transition-all hover:shadow-md hover:-translate-y-0.5 group"
1467: 35:       style={{ background: "var(--white)", borderColor: "var(--line)" }}
1468: 36:     >
1469: 37:       <div className="flex items-start justify-between mb-3">
1470: 38:         <div className="flex items-center gap-2.5">
1471: 39:           <div
1472: 40:             className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
1473: 41:             style={{ background: "var(--surface)" }}
1474: 42:           >
1475: 43:             <FileStack size={14} style={{ color: "var(--muted)" }} />
1476: 44:           </div>
1477: 45:           <div>
1478: 46:             <h3
1479: 47:               className="font-semibold text-sm leading-tight line-clamp-1"
1480: 48:               style={{ fontFamily: "var(--font-display)" }}
1481: 49:             >
1482: 50:               {c.title}
1483: 51:             </h3>
1484: 52:             <span className="text-[11px]" style={{ color: "var(--ghost)" }}>
1485: 53:               {c.mode === "RECRUITER" ? "Recruiter Mode" : "Candidate Mode"}
1486: 54:             </span>
1487: 55:           </div>
1488: 56:         </div>
1489: 57:         <ChevronRight
1490: 58:           size={15}
1491: 59:           className="transition-transform group-hover:translate-x-0.5"
1492: 60:           style={{ color: "var(--ghost)" }}
1493: 61:         />
1494: 62:       </div>
1495: 63: 
1496: 64:       <div className="flex items-center justify-between mt-4">
1497: 65:         <div className="flex items-center gap-2">
1498: 66:           <span
1499: 67:             className="text-[11px] font-medium px-2 py-0.5 rounded-full"
1500: 68:             style={{ background: st.bg, color: st.color }}
1501: 69:           >
1502: 70:             {st.label}
1503: 71:           </span>
1504: 72:           <span className="text-[11px]" style={{ color: "var(--ghost)" }}>
1505: 73:             {c.uploads.length} file{c.uploads.length !== 1 ? "s" : ""}
1506: 74:           </span>
1507: 75:         </div>
1508: 76:         {score != null ? (
1509: 77:           <div
1510: 78:             className="text-sm font-bold"
1511: 79:             style={{
1512: 80:               color:
1513: 81:                 score >= 70 ? "var(--green)" : score >= 50 ? "var(--amber)" : "var(--red)",
1514: 82:               fontFamily: "var(--font-display)",
1515: 83:             }}
1516: 84:           >
1517: 85:             {Math.round(score)}%
1518: 86:           </div>
1519: 87:         ) : (
1520: 88:           <span className="text-[11px]" style={{ color: "var(--ghost)" }}>
1521: 89:             {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
1522: 90:           </span>
1523: 91:         )}
1524: 92:       </div>
1525: 93:     </Link>
1526: 94:   );
1527: 95: }
1528: ````
1529: 
1530: ## File: components/dashboard/StatsCard.tsx
1531: ````typescript
1532:  1: "use client";
1533:  2: // components/dashboard/StatsCard.tsx
1534:  3: import { LucideIcon } from "lucide-react";
1535:  4: import { cn } from "@/lib/utils";
1536:  5: 
1537:  6: const colorMap: Record<string, { bg: string; icon: string }> = {
1538:  7:   accent: { bg: "var(--accent-lt)",  icon: "var(--accent)" },
1539:  8:   green:  { bg: "var(--green-lt)",   icon: "var(--green)" },
1540:  9:   amber:  { bg: "var(--amber-lt)",   icon: "var(--amber)" },
1541: 10:   blue:   { bg: "var(--blue-lt)",    icon: "var(--blue)" },
1542: 11:   red:    { bg: "var(--red-lt)",     icon: "var(--red)" },
1543: 12: };
1544: 13: 
1545: 14: interface Props {
1546: 15:   icon: LucideIcon;
1547: 16:   label: string;
1548: 17:   value: string | number;
1549: 18:   color?: string;
1550: 19:   delay?: number;
1551: 20: }
1552: 21: 
1553: 22: export default function StatsCard({ icon: Icon, label, value, color = "accent", delay = 0 }: Props) {
1554: 23:   const c = colorMap[color] ?? colorMap.accent;
1555: 24:   return (
1556: 25:     <div
1557: 26:       className={cn("rounded-xl p-5 border fade-up", `fade-up-delay-${delay}`)}
1558: 27:       style={{ background: "var(--white)", borderColor: "var(--line)" }}
1559: 28:     >
1560: 29:       <div
1561: 30:         className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
1562: 31:         style={{ background: c.bg }}
1563: 32:       >
1564: 33:         <Icon size={16} style={{ color: c.icon }} />
1565: 34:       </div>
1566: 35:       <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
1567: 36:         {value}
1568: 37:       </div>
1569: 38:       <div className="text-xs" style={{ color: "var(--muted)" }}>
1570: 39:         {label}
1571: 40:       </div>
1572: 41:     </div>
1573: 42:   );
1574: 43: }
1575: ````
1576: 
1577: ## File: components/layout/Sidebar.tsx
1578: ````typescript
1579:  1: "use client";
1580:  2: // components/layout/Sidebar.tsx
1581:  3: import Link from "next/link";
1582:  4: import { usePathname } from "next/navigation";
1583:  5: import { UserButton } from "@clerk/nextjs";
1584:  6: import {
1585:  7:   LayoutDashboard,
1586:  8:   FolderOpen,
1587:  9:   PlusCircle,
1588: 10:   FileText,
1589: 11:   Settings,
1590: 12:   ShieldCheck,
1591: 13: } from "lucide-react";
1592: 14: import { cn } from "@/lib/utils";
1593: 15: 
1594: 16: const navItems = [
1595: 17:   { href: "/dashboard",      label: "Dashboard",   icon: LayoutDashboard },
1596: 18:   { href: "/cases",          label: "My Cases",    icon: FolderOpen },
1597: 19:   { href: "/cases/new",      label: "New Case",    icon: PlusCircle },
1598: 20:   { href: "/reports",        label: "Reports",     icon: FileText },
1599: 21:   { href: "/settings",       label: "Settings",    icon: Settings },
1600: 22: ];
1601: 23: 
1602: 24: export default function Sidebar() {
1603: 25:   const path = usePathname();
1604: 26: 
1605: 27:   return (
1606: 28:     <aside
1607: 29:       style={{ background: "var(--ink)", color: "var(--white)" }}
1608: 30:       className="fixed inset-y-0 left-0 w-60 flex flex-col z-30"
1609: 31:     >
1610: 32:       {/* Logo */}
1611: 33:       <div className="px-6 py-5 border-b border-white/10">
1612: 34:         <div className="flex items-center gap-2.5">
1613: 35:           <div
1614: 36:             className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
1615: 37:             style={{ background: "var(--accent)" }}
1616: 38:           >
1617: 39:             <ShieldCheck size={16} color="white" />
1618: 40:           </div>
1619: 41:           <span
1620: 42:             className="text-[17px] font-bold tracking-tight"
1621: 43:             style={{ fontFamily: "var(--font-display)", color: "var(--white)" }}
1622: 44:           >
1623: 45:             TalentProof
1624: 46:           </span>
1625: 47:         </div>
1626: 48:         <p className="text-[11px] mt-1 opacity-40 tracking-widest uppercase">AI Platform</p>
1627: 49:       </div>
1628: 50: 
1629: 51:       {/* Nav */}
1630: 52:       <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
1631: 53:         {navItems.map(({ href, label, icon: Icon }) => {
1632: 54:           const active = path === href || (href !== "/dashboard" && path.startsWith(href));
1633: 55:           return (
1634: 56:             <Link
1635: 57:               key={href}
1636: 58:               href={href}
1637: 59:               className={cn(
1638: 60:                 "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all",
1639: 61:                 active
1640: 62:                   ? "text-white"
1641: 63:                   : "text-white/50 hover:text-white/80 hover:bg-white/5"
1642: 64:               )}
1643: 65:               style={active ? { background: "var(--accent)", color: "white" } : {}}
1644: 66:             >
1645: 67:               <Icon size={15} />
1646: 68:               {label}
1647: 69:             </Link>
1648: 70:           );
1649: 71:         })}
1650: 72:       </nav>
1651: 73: 
1652: 74:       {/* User */}
1653: 75:       <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">
1654: 76:         <UserButton afterSignOutUrl="/" />
1655: 77:         <span className="text-[12px] text-white/40">Account</span>
1656: 78:       </div>
1657: 79:     </aside>
1658: 80:   );
1659: 81: }
1660: ````
1661: 
1662: ## File: lib/ai/gemini.ts
1663: ````typescript
1664:   1: // lib/ai/gemini.ts
1665:   2: // Core Gemini integration — all AI calls go through here
1666:   3: 
1667:   4: const GEMINI_URL =
1668:   5:   "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
1669:   6: 
1670:   7: async function callGemini(prompt: string): Promise<string> {
1671:   8:   const response = await fetch(`${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`, {
1672:   9:     method: "POST",
1673:  10:     headers: { "Content-Type": "application/json" },
1674:  11:     body: JSON.stringify({
1675:  12:       contents: [{ parts: [{ text: prompt }] }],
1676:  13:       generationConfig: { temperature: 0.3, maxOutputTokens: 4096 },
1677:  14:     }),
1678:  15:   });
1679:  16: 
1680:  17:   if (!response.ok) {
1681:  18:     throw new Error(`Gemini API error: ${response.statusText}`);
1682:  19:   }
1683:  20: 
1684:  21:   const result = await response.json();
1685:  22:   return result?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
1686:  23: }
1687:  24: 
1688:  25: // ── Step 1: Extract structured candidate info from raw document text ──
1689:  26: export async function extractCandidateProfile(rawText: string): Promise<CandidateProfile> {
1690:  27:   const prompt = `
1691:  28: You are an AI recruitment analyst. Extract structured information from the following candidate document text.
1692:  29: 
1693:  30: Return ONLY valid JSON with this exact schema (no markdown, no explanation):
1694:  31: {
1695:  32:   "name": "string",
1696:  33:   "email": "string",
1697:  34:   "phone": "string",
1698:  35:   "education": [{ "degree": "", "institution": "", "year": "", "grade": "" }],
1699:  36:   "experience": [{ "role": "", "company": "", "duration": "", "description": "" }],
1700:  37:   "skills": ["string"],
1701:  38:   "certifications": [{ "name": "", "issuer": "", "year": "" }],
1702:  39:   "projects": [{ "name": "", "description": "", "tech": [] }],
1703:  40:   "claims": ["string"]
1704:  41: }
1705:  42: 
1706:  43: DOCUMENT TEXT:
1707:  44: ${rawText}
1708:  45: `;
1709:  46: 
1710:  47:   const raw = await callGemini(prompt);
1711:  48:   const cleaned = raw.replace(/```json|```/g, "").trim();
1712:  49:   return JSON.parse(cleaned) as CandidateProfile;
1713:  50: }
1714:  51: 
1715:  52: // ── Step 2: Parse job description ──
1716:  53: export async function parseJobDescription(jdText: string): Promise<JobDescription> {
1717:  54:   const prompt = `
1718:  55: Extract structured information from this job description.
1719:  56: Return ONLY valid JSON (no markdown):
1720:  57: {
1721:  58:   "title": "string",
1722:  59:   "requiredSkills": ["string"],
1723:  60:   "preferredSkills": ["string"],
1724:  61:   "requiredExperience": "string",
1725:  62:   "requiredEducation": "string",
1726:  63:   "requiredCertifications": ["string"],
1727:  64:   "responsibilities": ["string"]
1728:  65: }
1729:  66: 
1730:  67: JOB DESCRIPTION:
1731:  68: ${jdText}
1732:  69: `;
1733:  70: 
1734:  71:   const raw = await callGemini(prompt);
1735:  72:   const cleaned = raw.replace(/```json|```/g, "").trim();
1736:  73:   return JSON.parse(cleaned) as JobDescription;
1737:  74: }
1738:  75: 
1739:  76: // ── Step 3: Full candidate analysis ──
1740:  77: export async function analyzeCandidateFull(input: AnalysisInput): Promise<AnalysisResult> {
1741:  78:   const prompt = `
1742:  79: You are an expert AI recruitment analyst. Perform a thorough candidate evaluation.
1743:  80: 
1744:  81: CANDIDATE PROFILE:
1745:  82: ${JSON.stringify(input.profile, null, 2)}
1746:  83: 
1747:  84: JOB DESCRIPTION:
1748:  85: ${JSON.stringify(input.jobDescription, null, 2)}
1749:  86: 
1750:  87: UPLOADED DOCUMENT TYPES:
1751:  88: ${input.documentTypes.join(", ")}
1752:  89: 
1753:  90: COMPANY PREFERENCES (if any):
1754:  91: ${input.companyPreferences ?? "Not specified"}
1755:  92: 
1756:  93: Return ONLY valid JSON (no markdown) with this schema:
1757:  94: {
1758:  95:   "summary": "2-3 sentence candidate summary",
1759:  96:   "strengths": ["string"],
1760:  97:   "weaknesses": ["string"],
1761:  98:   "missingItems": ["missing documents or skills"],
1762:  99:   "riskFlags": ["any inconsistencies or concerns"],
1763: 100:   "recommendation": "one of: Proceed | Proceed with manual verification | Hold for clarification | Reject",
1764: 101:   "candidateMessage": "for candidate mode: personalized improvement advice",
1765: 102:   "scoreBreakdown": {
1766: 103:     "jdMatch": 0,
1767: 104:     "profileCompleteness": 0,
1768: 105:     "verificationSupport": 0,
1769: 106:     "academicAlignment": 0,
1770: 107:     "experienceRelevance": 0,
1771: 108:     "consistency": 0
1772: 109:   },
1773: 110:   "verifications": [
1774: 111:     { "category": "string", "label": "string", "status": "Verified|Not Verified|Pending|Risk|Manual Required", "note": "string" }
1775: 112:   ]
1776: 113: }
1777: 114: `;
1778: 115: 
1779: 116:   const raw = await callGemini(prompt);
1780: 117:   const cleaned = raw.replace(/```json|```/g, "").trim();
1781: 118:   return JSON.parse(cleaned) as AnalysisResult;
1782: 119: }
1783: 120: 
1784: 121: // ── Types ──
1785: 122: export interface CandidateProfile {
1786: 123:   name: string;
1787: 124:   email: string;
1788: 125:   phone: string;
1789: 126:   education: { degree: string; institution: string; year: string; grade: string }[];
1790: 127:   experience: { role: string; company: string; duration: string; description: string }[];
1791: 128:   skills: string[];
1792: 129:   certifications: { name: string; issuer: string; year: string }[];
1793: 130:   projects: { name: string; description: string; tech: string[] }[];
1794: 131:   claims: string[];
1795: 132: }
1796: 133: 
1797: 134: export interface JobDescription {
1798: 135:   title: string;
1799: 136:   requiredSkills: string[];
1800: 137:   preferredSkills: string[];
1801: 138:   requiredExperience: string;
1802: 139:   requiredEducation: string;
1803: 140:   requiredCertifications: string[];
1804: 141:   responsibilities: string[];
1805: 142: }
1806: 143: 
1807: 144: export interface AnalysisInput {
1808: 145:   profile: CandidateProfile;
1809: 146:   jobDescription: JobDescription;
1810: 147:   documentTypes: string[];
1811: 148:   companyPreferences?: string;
1812: 149: }
1813: 150: 
1814: 151: export interface AnalysisResult {
1815: 152:   summary: string;
1816: 153:   strengths: string[];
1817: 154:   weaknesses: string[];
1818: 155:   missingItems: string[];
1819: 156:   riskFlags: string[];
1820: 157:   recommendation: string;
1821: 158:   candidateMessage: string;
1822: 159:   scoreBreakdown: Record<string, number>;
1823: 160:   verifications: { category: string; label: string; status: string; note: string }[];
1824: 161: }
1825: ````
1826: 
1827: ## File: lib/ai/pipeline.ts
1828: ````typescript
1829:  1: // lib/ai/pipeline.ts
1830:  2: // Multi-step evaluation pipeline — this is the "brain" of TalentProof AI
1831:  3: 
1832:  4: import { extractCandidateProfile, parseJobDescription, analyzeCandidateFull, AnalysisResult } from "./gemini";
1833:  5: import { parsePDF } from "../parser/pdf";
1834:  6: import { parseDocx } from "../parser/docx";
1835:  7: import { calculateScore } from "../scoring/score";
1836:  8: 
1837:  9: export interface PipelineInput {
1838: 10:   caseId: string;
1839: 11:   uploads: { fileType: string; storageUrl: string; extractedText?: string | null }[];
1840: 12:   jdText?: string | null;
1841: 13:   companyPreferences?: string | null;
1842: 14:   mode: "RECRUITER" | "CANDIDATE";
1843: 15: }
1844: 16: 
1845: 17: export interface PipelineOutput {
1846: 18:   profile: object;
1847: 19:   jobDescription: object;
1848: 20:   analysis: AnalysisResult;
1849: 21:   finalScore: number;
1850: 22: }
1851: 23: 
1852: 24: export async function runEvaluationPipeline(input: PipelineInput): Promise<PipelineOutput> {
1853: 25:   console.log(`[Pipeline] Starting for case ${input.caseId}`);
1854: 26: 
1855: 27:   // ── Step 1: Aggregate all extracted text ──
1856: 28:   const allText = input.uploads
1857: 29:     .map((u) => u.extractedText ?? "")
1858: 30:     .filter(Boolean)
1859: 31:     .join("\n\n---\n\n");
1860: 32: 
1861: 33:   if (!allText.trim()) {
1862: 34:     throw new Error("No extracted text available. Ensure documents were parsed first.");
1863: 35:   }
1864: 36: 
1865: 37:   // ── Step 2: Extract candidate profile ──
1866: 38:   console.log("[Pipeline] Step 2: Extracting candidate profile...");
1867: 39:   const profile = await extractCandidateProfile(allText);
1868: 40: 
1869: 41:   // ── Step 3: Parse JD (if provided) ──
1870: 42:   console.log("[Pipeline] Step 3: Parsing job description...");
1871: 43:   const jobDescription = input.jdText
1872: 44:     ? await parseJobDescription(input.jdText)
1873: 45:     : { title: "General Role", requiredSkills: [], preferredSkills: [], requiredExperience: "", requiredEducation: "", requiredCertifications: [], responsibilities: [] };
1874: 46: 
1875: 47:   // ── Step 4: Full analysis ──
1876: 48:   console.log("[Pipeline] Step 4: Running full candidate analysis...");
1877: 49:   const documentTypes = input.uploads.map((u) => u.fileType);
1878: 50:   const analysis = await analyzeCandidateFull({
1879: 51:     profile,
1880: 52:     jobDescription,
1881: 53:     documentTypes,
1882: 54:     companyPreferences: input.companyPreferences ?? undefined,
1883: 55:   });
1884: 56: 
1885: 57:   // ── Step 5: Calculate final score ──
1886: 58:   console.log("[Pipeline] Step 5: Calculating score...");
1887: 59:   const finalScore = calculateScore(analysis.scoreBreakdown);
1888: 60: 
1889: 61:   console.log(`[Pipeline] Complete. Score: ${finalScore}`);
1890: 62:   return { profile, jobDescription, analysis, finalScore };
1891: 63: }
1892: ````
1893: 
1894: ## File: lib/parser/docx.ts
1895: ````typescript
1896: 1: 
1897: ````
1898: 
1899: ## File: lib/parser/pdf.ts
1900: ````typescript
1901: 1: 
1902: ````
1903: 
1904: ## File: lib/scoring/score.ts
1905: ````typescript
1906:  1: // lib/scoring/score.ts
1907:  2: // Weighted scoring model — each factor contributes to a 0–100 final score
1908:  3: 
1909:  4: const WEIGHTS: Record<string, number> = {
1910:  5:   jdMatch:             0.25,
1911:  6:   profileCompleteness: 0.20,
1912:  7:   verificationSupport: 0.20,
1913:  8:   academicAlignment:   0.15,
1914:  9:   experienceRelevance: 0.10,
1915: 10:   consistency:         0.10,
1916: 11: };
1917: 12: 
1918: 13: export function calculateScore(breakdown: Record<string, number>): number {
1919: 14:   let total = 0;
1920: 15:   for (const [key, weight] of Object.entries(WEIGHTS)) {
1921: 16:     const raw = breakdown[key] ?? 0;
1922: 17:     total += Math.min(100, Math.max(0, raw)) * weight;
1923: 18:   }
1924: 19:   return Math.round(total);
1925: 20: }
1926: 21: 
1927: 22: export function getScoreLabel(score: number): { label: string; color: string } {
1928: 23:   if (score >= 85) return { label: "Highly Suitable", color: "green" };
1929: 24:   if (score >= 70) return { label: "Suitable — Minor Checks", color: "blue" };
1930: 25:   if (score >= 50) return { label: "Moderate Fit — Review Needed", color: "yellow" };
1931: 26:   return { label: "Weak Fit — Major Gaps", color: "red" };
1932: 27: }
1933: ````
1934: 
1935: ## File: lib/db.ts
1936: ````typescript
1937: 1: 
1938: ````
1939: 
1940: ## File: lib/storage.ts
1941: ````typescript
1942: 1: 
1943: ````
1944: 
1945: ## File: prisma/schema.prisma
1946: ````prisma
1947:   1: generator client {
1948:   2:   provider = "prisma-client-js"
1949:   3: }
1950:   4: 
1951:   5: datasource db {
1952:   6:   provider = "postgresql"
1953:   7:   url      = env("DATABASE_URL")
1954:   8: }
1955:   9: 
1956:  10: model User {
1957:  11:   id        String   @id @default(cuid())
1958:  12:   clerkId   String   @unique
1959:  13:   email     String   @unique
1960:  14:   name      String?
1961:  15:   role      Role     @default(CANDIDATE)
1962:  16:   cases     Case[]
1963:  17:   createdAt DateTime @default(now())
1964:  18: }
1965:  19: 
1966:  20: enum Role {
1967:  21:   CANDIDATE
1968:  22:   RECRUITER
1969:  23:   ADMIN
1970:  24: }
1971:  25: 
1972:  26: model Case {
1973:  27:   id                 String    @id @default(cuid())
1974:  28:   title              String
1975:  29:   userId             String
1976:  30:   mode               CaseMode
1977:  31:   jdText             String?
1978:  32:   companyPreferences String?
1979:  33:   status             CaseStatus @default(PENDING)
1980:  34:   finalScore         Float?
1981:  35:   createdAt          DateTime  @default(now())
1982:  36:   updatedAt          DateTime  @updatedAt
1983:  37: 
1984:  38:   user    User     @relation(fields: [userId], references: [id])
1985:  39:   uploads Upload[]
1986:  40:   report  Report?
1987:  41: }
1988:  42: 
1989:  43: enum CaseMode {
1990:  44:   RECRUITER
1991:  45:   CANDIDATE
1992:  46: }
1993:  47: 
1994:  48: enum CaseStatus {
1995:  49:   PENDING
1996:  50:   PROCESSING
1997:  51:   COMPLETED
1998:  52:   FAILED
1999:  53: }
2000:  54: 
2001:  55: model Upload {
2002:  56:   id               String        @id @default(cuid())
2003:  57:   caseId           String
2004:  58:   fileName         String
2005:  59:   fileType         FileType
2006:  60:   storageUrl       String
2007:  61:   extractedText    String?
2008:  62:   processingStatus UploadStatus  @default(PENDING)
2009:  63:   createdAt        DateTime      @default(now())
2010:  64: 
2011:  65:   case Case @relation(fields: [caseId], references: [id], onDelete: Cascade)
2012:  66: }
2013:  67: 
2014:  68: enum FileType {
2015:  69:   RESUME
2016:  70:   COVER_LETTER
2017:  71:   CERTIFICATE
2018:  72:   MARKSHEET
2019:  73:   DEGREE
2020:  74:   INTERNSHIP
2021:  75:   EXPERIENCE_LETTER
2022:  76:   ID_PROOF
2023:  77:   JOB_DESCRIPTION
2024:  78:   OTHER
2025:  79: }
2026:  80: 
2027:  81: enum UploadStatus {
2028:  82:   PENDING
2029:  83:   PARSED
2030:  84:   ANALYZED
2031:  85:   ERROR
2032:  86: }
2033:  87: 
2034:  88: model Report {
2035:  89:   id             String   @id @default(cuid())
2036:  90:   caseId         String   @unique
2037:  91:   summary        String
2038:  92:   strengths      String[]
2039:  93:   weaknesses     String[]
2040:  94:   missingItems   String[]
2041:  95:   riskFlags      String[]
2042:  96:   recommendation String
2043:  97:   score          Float
2044:  98:   scoreBreakdown Json
2045:  99:   verifications  Json
2046: 100:   createdAt      DateTime @default(now())
2047: 101: 
2048: 102:   case Case @relation(fields: [caseId], references: [id], onDelete: Cascade)
2049: 103: }
2050: ````
2051: 
2052: ## File: .env.local
2053: ````
2054:  1: # Database (Supabase)
2055:  2: DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
2056:  3: 
2057:  4: # Clerk Auth
2058:  5: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
2059:  6: CLERK_SECRET_KEY=sk_test_xxxx
2060:  7: NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
2061:  8: NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
2062:  9: NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
2063: 10: NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
2064: 11: 
2065: 12: # Supabase Storage
2066: 13: NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
2067: 14: NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
2068: 15: SUPABASE_SERVICE_ROLE_KEY=xxxx
2069: 16: 
2070: 17: # AI
2071: 18: GEMINI_API_KEY=your_gemini_key
2072: 19: OPENROUTER_API_KEY=your_openrouter_key_optional
2073: ````
2074: 
2075: ## File: .gitignore
2076: ````
2077: 1: node_modules
2078: ````
2079: 
2080: ## File: env.example
2081: ````
2082:  1: # Database (Supabase)
2083:  2: DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
2084:  3: 
2085:  4: # Clerk Auth
2086:  5: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
2087:  6: CLERK_SECRET_KEY=sk_test_xxxx
2088:  7: NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
2089:  8: NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
2090:  9: NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
2091: 10: NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
2092: 11: 
2093: 12: # Supabase Storage
2094: 13: NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
2095: 14: NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
2096: 15: SUPABASE_SERVICE_ROLE_KEY=xxxx
2097: 16: 
2098: 17: # AI
2099: 18: GEMINI_API_KEY=your_gemini_key
2100: 19: OPENROUTER_API_KEY=your_openrouter_key_optional
2101: ````
2102: 
2103: ## File: middleware.ts
2104: ````typescript
2105:  1: // middleware.ts
2106:  2: import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
2107:  3: 
2108:  4: const isPublicRoute = createRouteMatcher([
2109:  5:   "/",
2110:  6:   "/sign-in(.*)",
2111:  7:   "/sign-up(.*)",
2112:  8: ]);
2113:  9: 
2114: 10: export default clerkMiddleware(async (auth, req) => {
2115: 11:   if (!isPublicRoute(req)) {
2116: 12:     await auth.protect();
2117: 13:   }
2118: 14: });
2119: 15: 
2120: 16: export const config = {
2121: 17:   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
2122: 18: };
2123: ````
2124: 
2125: ## File: package.json
2126: ````json
2127: 1: {
2128: 2:   "dependencies": {
2129: 3:     "@prisma/client": "^7.5.0",
2130: 4:     "clsx": "^2.1.1",
2131: 5:     "date-fns": "^4.1.0",
2132: 6:     "prisma": "^7.5.0",
2133: 7:     "tailwind-merge": "^3.5.0"
2134: 8:   }
2135: 9: }
2136: ````
2137: 
2138: ## File: README.md
2139: ````markdown
2140:   1: # TalentProof AI
2141:   2: 
2142:   3: **AI-Powered Candidate Background Evaluation & Hiring Readiness Platform**
2143:   4: 
2144:   5: ---
2145:   6: 
2146:   7: ## Quick Start
2147:   8: 
2148:   9: ### 1. Create the project
2149:  10: ```bash
2150:  11: npx create-next-app@latest talentproof-ai --typescript --tailwind --app
2151:  12: cd talentproof-ai
2152:  13: ```
2153:  14: 
2154:  15: ### 2. Install dependencies
2155:  16: ```bash
2156:  17: # Core
2157:  18: npm install @prisma/client prisma
2158:  19: npm install @clerk/nextjs
2159:  20: npm install @supabase/supabase-js
2160:  21: 
2161:  22: # Document parsing
2162:  23: npm install pdf-parse mammoth
2163:  24: npm install @types/pdf-parse --save-dev
2164:  25: 
2165:  26: # Forms & validation
2166:  27: npm install zod react-hook-form @hookform/resolvers
2167:  28: 
2168:  29: # UI
2169:  30: npm install lucide-react react-dropzone
2170:  31: npx shadcn@latest init
2171:  32: npx shadcn@latest add button card badge progress table tabs
2172:  33: 
2173:  34: # PDF export (for reports)
2174:  35: npm install @react-pdf/renderer
2175:  36: ```
2176:  37: 
2177:  38: ### 3. Set up environment
2178:  39: ```bash
2179:  40: cp .env.example .env.local
2180:  41: # Fill in your keys:
2181:  42: # - DATABASE_URL from Supabase > Settings > Database
2182:  43: # - Clerk keys from Clerk dashboard
2183:  44: # - Supabase URL & keys from Supabase dashboard
2184:  45: # - GEMINI_API_KEY from Google AI Studio (free)
2185:  46: ```
2186:  47: 
2187:  48: ### 4. Set up database
2188:  49: ```bash
2189:  50: npx prisma generate
2190:  51: npx prisma db push
2191:  52: ```
2192:  53: 
2193:  54: ### 5. Create Supabase storage bucket
2194:  55: - Go to Supabase dashboard → Storage
2195:  56: - Create a bucket named: `talentproof-uploads`
2196:  57: - Set to Public (or use signed URLs for private)
2197:  58: 
2198:  59: ### 6. Run development server
2199:  60: ```bash
2200:  61: npm run dev
2201:  62: ```
2202:  63: 
2203:  64: ---
2204:  65: 
2205:  66: ## Project Structure
2206:  67: 
2207:  68: ```
2208:  69: talentproof-ai/
2209:  70: │
2210:  71: ├── app/                          # Next.js App Router pages
2211:  72: │   ├── (auth)/                   # Clerk sign-in / sign-up
2212:  73: │   ├── dashboard/                # Main dashboard
2213:  74: │   ├── case/[caseId]/            # Workspace for each evaluation case
2214:  75: │   ├── report/[caseId]/          # Final evaluation report view
2215:  76: │   ├── admin/                    # Admin dashboard
2216:  77: │   └── api/
2217:  78: │       ├── cases/route.ts        # CRUD for cases
2218:  79: │       ├── upload/route.ts       # File upload + text extraction
2219:  80: │       ├── analyze/route.ts      # Trigger AI pipeline
2220:  81: │       └── report/route.ts       # Fetch/export report
2221:  82: │
2222:  83: ├── components/
2223:  84: │   ├── ui/                       # shadcn components
2224:  85: │   ├── dashboard/                # CaseCard, StatsPanel
2225:  86: │   ├── workspace/                # FileUploader, InsightsPanel, JDInput
2226:  87: │   └── report/                   # EvaluationSheet, ScoreGauge, VerificationTable
2227:  88: │
2228:  89: ├── lib/
2229:  90: │   ├── ai/
2230:  91: │   │   ├── gemini.ts             # Gemini API calls
2231:  92: │   │   └── pipeline.ts           # Multi-step analysis orchestrator
2232:  93: │   ├── parser/
2233:  94: │   │   ├── pdf.ts                # PDF text extraction
2234:  95: │   │   └── docx.ts               # DOCX text extraction
2235:  96: │   ├── scoring/
2236:  97: │   │   └── score.ts              # Weighted scoring engine
2237:  98: │   ├── storage.ts                # Supabase file storage
2238:  99: │   └── db.ts                     # Prisma client singleton
2239: 100: │
2240: 101: ├── prisma/
2241: 102: │   └── schema.prisma             # Database schema
2242: 103: │
2243: 104: ├── types/                        # TypeScript type definitions
2244: 105: ├── utils/                        # Helper functions
2245: 106: ├── middleware.ts                 # Clerk auth middleware
2246: 107: └── .env.local                    # Environment variables
2247: 108: ```
2248: 109: 
2249: 110: ---
2250: 111: 
2251: 112: ## AI Pipeline (8 steps)
2252: 113: 
2253: 114: ```
2254: 115: 1. User uploads documents + JD
2255: 116: 2. Files stored in Supabase Storage
2256: 117: 3. Text extracted from PDFs/DOCX
2257: 118: 4. Gemini extracts structured candidate profile
2258: 119: 5. Gemini parses job description
2259: 120: 6. Cross-document validation & verification
2260: 121: 7. Weighted score calculated (0–100)
2261: 122: 8. Report generated & saved to DB
2262: 123: ```
2263: 124: 
2264: 125: ---
2265: 126: 
2266: 127: ## Scoring Weights
2267: 128: 
2268: 129: | Factor | Weight |
2269: 130: |--------|--------|
2270: 131: | JD Match | 25% |
2271: 132: | Profile Completeness | 20% |
2272: 133: | Verification Support | 20% |
2273: 134: | Academic Alignment | 15% |
2274: 135: | Experience Relevance | 10% |
2275: 136: | Consistency | 10% |
2276: 137: 
2277: 138: ---
2278: 139: 
2279: 140: ## Deployment
2280: 141: 
2281: 142: **Recommended (free):**
2282: 143: - App: [Render](https://render.com) free web service
2283: 144: - Database + Storage: [Supabase](https://supabase.com) free plan
2284: 145: - Auth: [Clerk](https://clerk.com) free tier (50k users/month)
2285: 146: - AI: [Google AI Studio](https://aistudio.google.com) free Gemini API
2286: 147: 
2287: 148: **Alternative:**
2288: 149: - App: [Railway](https://railway.app) ($5 trial credit)
2289: ````
`````

## File: tailwind.config.ts
`````typescript
 1: // tailwind.config.ts
 2: import type { Config } from "tailwindcss";
 3: 
 4: const config: Config = {
 5:   content: [
 6:     "./pages/**/*.{js,ts,jsx,tsx,mdx}",
 7:     "./components/**/*.{js,ts,jsx,tsx,mdx}",
 8:     "./app/**/*.{js,ts,jsx,tsx,mdx}",
 9:   ],
10:   theme: {
11:     extend: {
12:       fontFamily: {
13:         syne: ["var(--font-syne)", "sans-serif"],
14:         dm:   ["var(--font-dm)",   "sans-serif"],
15:       },
16:       colors: {
17:         accent:  "var(--accent)",
18:         ink:     "var(--ink)",
19:         muted:   "var(--muted)",
20:         surface: "var(--surface)",
21:       },
22:       borderRadius: {
23:         "2xl": "16px",
24:         "3xl": "24px",
25:       },
26:     },
27:   },
28:   plugins: [],
29: };
30: 
31: export default config;
`````

## File: tsconfig.json
`````json
 1: {
 2:   "compilerOptions": {
 3:     "target": "ES2017",
 4:     "lib": ["dom", "dom.iterable", "esnext"],
 5:     "allowJs": true,
 6:     "skipLibCheck": true,
 7:     "strict": true,
 8:     "noEmit": true,
 9:     "esModuleInterop": true,
10:     "module": "esnext",
11:     "moduleResolution": "bundler",
12:     "resolveJsonModule": true,
13:     "isolatedModules": true,
14:     "jsx": "preserve",
15:     "incremental": true,
16:     "plugins": [{ "name": "next" }],
17:     "paths": {
18:       "@/*": ["./*"]
19:     }
20:   },
21:   "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
22:   "exclude": ["node_modules"]
23: }
`````
