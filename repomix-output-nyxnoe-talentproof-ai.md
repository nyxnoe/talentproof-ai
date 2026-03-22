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
  api/
    analyze/
      route.ts
    cases/
      route.ts
    report/
      route.ts
    upload/
      route.ts
  case/
    [caseId]/
      page.tsx
    new/
      page.tsx
  dashboard/
    page.tsx
  report/
    [caseId]/
      page.tsx
  global.css
  layout.tsx
  page.tsx
components/
  dashboard/
    CaseCard.tsx
    StatsCard.tsx
  layout/
    Sidebar.tsx
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
prisma/
  schema.prisma
.env.local
.gitignore
env.example
middleware.ts
package.json
README.md
```

# Files

## File: app/api/analyze/route.ts
````typescript
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
````

## File: app/api/cases/route.ts
````typescript
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
````

## File: app/api/report/route.ts
````typescript
1: 
````

## File: app/api/upload/route.ts
````typescript
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
````

## File: app/case/[caseId]/page.tsx
````typescript
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
````

## File: app/case/new/page.tsx
````typescript
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
````

## File: app/dashboard/page.tsx
````typescript
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
 59:         <StatsCard icon={FileCheck}      label="Total Cases"   value={cases.length} color="accent" delay={1} />
 60:         <StatsCard icon={TrendingUp}     label="Completed"     value={completed}     color="green"  delay={2} />
 61:         <StatsCard icon={Clock}          label="Processing"    value={processing}    color="amber"  delay={3} />
 62:         <StatsCard icon={AlertTriangle}  label="Avg Score"     value={avgScore ? `${avgScore}%` : "—"} color="blue" delay={4} />
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
````

## File: app/report/[caseId]/page.tsx
````typescript
  1: // app/(app)/report/[caseId]/page.tsx
  2: import { auth } from "@clerk/nextjs/server";
  3: import { db } from "@/lib/db";
  4: import { notFound } from "next/navigation";
  5: import { getScoreLabel } from "@/lib/scoring/score";
  6: import Link from "next/link";
  7: import { ArrowLeft, Download, ShieldCheck, AlertTriangle, CheckCircle2, Clock, XCircle, HelpCircle } from "lucide-react";
  8: 
  9: export default async function ReportPage({ params }: { params: { caseId: string } }) {
 10:   const { userId } = await auth();
 11: 
 12:   const report = await db.report.findFirst({
 13:     where: { case: { id: params.caseId, user: { clerkId: userId! } } },
 14:     include: { case: { select: { title: true, mode: true, jdText: true } } },
 15:   });
 16: 
 17:   if (!report) return notFound();
 18: 
 19:   const scoreInfo = getScoreLabel(report.score);
 20:   const breakdown = report.scoreBreakdown as Record<string, number>;
 21:   const verifications = report.verifications as {
 22:     category: string; label: string; status: string; note: string;
 23:   }[];
 24: 
 25:   return (
 26:     <div className="p-8 max-w-4xl fade-up">
 27:       {/* Back */}
 28:       <Link
 29:         href="/dashboard"
 30:         className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors hover:opacity-70"
 31:         style={{ color: "var(--muted)" }}
 32:       >
 33:         <ArrowLeft size={14} /> Back to Dashboard
 34:       </Link>
 35: 
 36:       {/* Header card */}
 37:       <div
 38:         className="rounded-2xl p-7 mb-6 border"
 39:         style={{ background: "var(--white)", borderColor: "var(--line)" }}
 40:       >
 41:         <div className="flex items-start justify-between">
 42:           <div>
 43:             <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--ghost)" }}>
 44:               Evaluation Report
 45:             </p>
 46:             <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-display)" }}>
 47:               {report.case.title}
 48:             </h1>
 49:             <p className="text-sm" style={{ color: "var(--muted)" }}>
 50:               {report.case.mode === "RECRUITER" ? "Recruiter Assessment" : "Candidate Readiness Check"}
 51:             </p>
 52:           </div>
 53: 
 54:           {/* Score circle */}
 55:           <div className="flex flex-col items-center">
 56:             <div
 57:               className="w-24 h-24 rounded-full flex flex-col items-center justify-center border-4"
 58:               style={{
 59:                 borderColor:
 60:                   report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
 61:               }}
 62:             >
 63:               <span
 64:                 className="text-2xl font-bold leading-none"
 65:                 style={{
 66:                   fontFamily: "var(--font-display)",
 67:                   color: report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
 68:                 }}
 69:               >
 70:                 {Math.round(report.score)}
 71:               </span>
 72:               <span className="text-[10px]" style={{ color: "var(--ghost)" }}>/ 100</span>
 73:             </div>
 74:             <span
 75:               className="text-xs font-medium mt-2 px-2 py-0.5 rounded-full"
 76:               style={{
 77:                 background: report.score >= 70 ? "var(--green-lt)" : report.score >= 50 ? "var(--amber-lt)" : "var(--red-lt)",
 78:                 color: report.score >= 70 ? "var(--green)" : report.score >= 50 ? "var(--amber)" : "var(--red)",
 79:               }}
 80:             >
 81:               {scoreInfo.label}
 82:             </span>
 83:           </div>
 84:         </div>
 85: 
 86:         {/* Recommendation banner */}
 87:         <div
 88:           className="mt-5 flex items-center gap-3 p-4 rounded-xl"
 89:           style={{ background: "var(--accent-lt)" }}
 90:         >
 91:           <ShieldCheck size={18} style={{ color: "var(--accent)", flexShrink: 0 }} />
 92:           <div>
 93:             <p className="text-xs font-semibold" style={{ color: "var(--accent)" }}>AI Recommendation</p>
 94:             <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>{report.recommendation}</p>
 95:           </div>
 96:         </div>
 97:       </div>
 98: 
 99:       <div className="grid grid-cols-2 gap-6 mb-6">
100:         {/* Summary */}
101:         <ReportSection title="Summary">
102:           <p className="text-sm leading-relaxed" style={{ color: "var(--ink)" }}>{report.summary}</p>
103:         </ReportSection>
104: 
105:         {/* Score Breakdown */}
106:         <ReportSection title="Score Breakdown">
107:           <div className="space-y-3">
108:             {Object.entries(breakdown).map(([key, val]) => (
109:               <div key={key}>
110:                 <div className="flex justify-between text-xs mb-1">
111:                   <span style={{ color: "var(--muted)" }}>{formatKey(key)}</span>
112:                   <span className="font-semibold" style={{ color: "var(--ink)" }}>{Math.round(val)}%</span>
113:                 </div>
114:                 <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
115:                   <div
116:                     className="h-full rounded-full transition-all"
117:                     style={{
118:                       width: `${Math.round(val)}%`,
119:                       background: val >= 70 ? "var(--green)" : val >= 50 ? "var(--amber)" : "var(--red)",
120:                     }}
121:                   />
122:                 </div>
123:               </div>
124:             ))}
125:           </div>
126:         </ReportSection>
127:       </div>
128: 
129:       {/* Verification Table */}
130:       {verifications?.length > 0 && (
131:         <div
132:           className="rounded-2xl border mb-6 overflow-hidden"
133:           style={{ background: "var(--white)", borderColor: "var(--line)" }}
134:         >
135:           <div className="px-6 py-4 border-b" style={{ borderColor: "var(--line)" }}>
136:             <h2 className="font-semibold" style={{ fontFamily: "var(--font-display)" }}>Verification Details</h2>
137:           </div>
138:           <table className="w-full text-sm">
139:             <thead>
140:               <tr style={{ background: "var(--surface)" }}>
141:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Category</th>
142:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Item</th>
143:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Status</th>
144:                 <th className="text-left px-6 py-3 text-xs font-semibold" style={{ color: "var(--ghost)" }}>Note</th>
145:               </tr>
146:             </thead>
147:             <tbody>
148:               {verifications.map((v, i) => (
149:                 <tr
150:                   key={i}
151:                   className="border-t"
152:                   style={{ borderColor: "var(--line)" }}
153:                 >
154:                   <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{v.category}</td>
155:                   <td className="px-6 py-3 text-xs font-medium">{v.label}</td>
156:                   <td className="px-6 py-3">
157:                     <VerificationBadge status={v.status} />
158:                   </td>
159:                   <td className="px-6 py-3 text-xs" style={{ color: "var(--muted)" }}>{v.note}</td>
160:                 </tr>
161:               ))}
162:             </tbody>
163:           </table>
164:         </div>
165:       )}
166: 
167:       <div className="grid grid-cols-3 gap-6 mb-6">
168:         <ListSection title="Strengths" items={report.strengths} color="green" />
169:         <ListSection title="Weaknesses" items={report.weaknesses} color="amber" />
170:         <ListSection title="Missing Items" items={report.missingItems} color="red" />
171:       </div>
172: 
173:       {report.riskFlags?.length > 0 && (
174:         <div
175:           className="rounded-2xl border p-6 mb-6"
176:           style={{ background: "var(--red-lt)", borderColor: "var(--red)" }}
177:         >
178:           <div className="flex items-center gap-2 mb-3">
179:             <AlertTriangle size={15} style={{ color: "var(--red)" }} />
180:             <h2 className="font-semibold text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--red)" }}>
181:               Risk Flags
182:             </h2>
183:           </div>
184:           <ul className="space-y-1.5">
185:             {report.riskFlags.map((flag, i) => (
186:               <li key={i} className="text-sm flex items-start gap-2" style={{ color: "var(--red)" }}>
187:                 <span className="mt-1">•</span> {flag}
188:               </li>
189:             ))}
190:           </ul>
191:         </div>
192:       )}
193: 
194:       {/* Disclaimer */}
195:       <p className="text-xs text-center mt-4" style={{ color: "var(--ghost)" }}>
196:         This report is AI-assisted and for preliminary evaluation only. It does not replace official verification.
197:       </p>
198:     </div>
199:   );
200: }
201: 
202: function ReportSection({ title, children }: { title: string; children: React.ReactNode }) {
203:   return (
204:     <div
205:       className="rounded-2xl border p-6"
206:       style={{ background: "var(--white)", borderColor: "var(--line)" }}
207:     >
208:       <h2
209:         className="font-semibold mb-4"
210:         style={{ fontFamily: "var(--font-display)" }}
211:       >
212:         {title}
213:       </h2>
214:       {children}
215:     </div>
216:   );
217: }
218: 
219: function ListSection({ title, items, color }: { title: string; items: string[]; color: string }) {
220:   const colorMap: Record<string, { bg: string; text: string; dot: string }> = {
221:     green: { bg: "var(--white)",    text: "var(--green)", dot: "var(--green)" },
222:     amber: { bg: "var(--white)",    text: "var(--amber)", dot: "var(--amber)" },
223:     red:   { bg: "var(--white)",    text: "var(--red)",   dot: "var(--red)" },
224:   };
225:   const c = colorMap[color];
226: 
227:   return (
228:     <div
229:       className="rounded-2xl border p-5"
230:       style={{ background: c.bg, borderColor: "var(--line)" }}
231:     >
232:       <h2
233:         className="font-semibold text-sm mb-3"
234:         style={{ fontFamily: "var(--font-display)", color: c.text }}
235:       >
236:         {title}
237:       </h2>
238:       {items?.length === 0 ? (
239:         <p className="text-xs" style={{ color: "var(--ghost)" }}>None noted.</p>
240:       ) : (
241:         <ul className="space-y-1.5">
242:           {items?.map((item, i) => (
243:             <li key={i} className="text-xs flex items-start gap-2">
244:               <span style={{ color: c.dot, marginTop: "3px", flexShrink: 0 }}>•</span>
245:               <span style={{ color: "var(--ink)" }}>{item}</span>
246:             </li>
247:           ))}
248:         </ul>
249:       )}
250:     </div>
251:   );
252: }
253: 
254: function VerificationBadge({ status }: { status: string }) {
255:   const map: Record<string, { icon: React.ReactNode; label: string; style: React.CSSProperties }> = {
256:     "Verified":           { icon: <CheckCircle2 size={11} />, label: "Verified",   style: { background: "var(--green-lt)", color: "var(--green)" } },
257:     "Not Verified":       { icon: <XCircle size={11} />,      label: "Not Verified",style: { background: "var(--red-lt)",   color: "var(--red)" } },
258:     "Pending":            { icon: <Clock size={11} />,         label: "Pending",    style: { background: "var(--amber-lt)", color: "var(--amber)" } },
259:     "Risk":               { icon: <AlertTriangle size={11} />, label: "Risk",       style: { background: "var(--red-lt)",   color: "var(--red)" } },
260:     "Manual Required":    { icon: <HelpCircle size={11} />,    label: "Manual",     style: { background: "var(--blue-lt)",  color: "var(--blue)" } },
261:   };
262:   const cfg = map[status] ?? map["Pending"];
263:   return (
264:     <span
265:       className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium"
266:       style={cfg.style}
267:     >
268:       {cfg.icon} {cfg.label}
269:     </span>
270:   );
271: }
272: 
273: function formatKey(key: string): string {
274:   return key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()).trim();
275: }
````

## File: app/global.css
````css
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
````

## File: app/layout.tsx
````typescript
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
````

## File: app/page.tsx
````typescript
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
````

## File: components/dashboard/CaseCard.tsx
````typescript
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
````

## File: components/dashboard/StatsCard.tsx
````typescript
 1: "use client";
 2: // components/dashboard/StatsCard.tsx
 3: import { LucideIcon } from "lucide-react";
 4: import { cn } from "@/lib/utils";
 5: 
 6: const colorMap: Record<string, { bg: string; icon: string }> = {
 7:   accent: { bg: "var(--accent-lt)",  icon: "var(--accent)" },
 8:   green:  { bg: "var(--green-lt)",   icon: "var(--green)" },
 9:   amber:  { bg: "var(--amber-lt)",   icon: "var(--amber)" },
10:   blue:   { bg: "var(--blue-lt)",    icon: "var(--blue)" },
11:   red:    { bg: "var(--red-lt)",     icon: "var(--red)" },
12: };
13: 
14: interface Props {
15:   icon: LucideIcon;
16:   label: string;
17:   value: string | number;
18:   color?: string;
19:   delay?: number;
20: }
21: 
22: export default function StatsCard({ icon: Icon, label, value, color = "accent", delay = 0 }: Props) {
23:   const c = colorMap[color] ?? colorMap.accent;
24:   return (
25:     <div
26:       className={cn("rounded-xl p-5 border fade-up", `fade-up-delay-${delay}`)}
27:       style={{ background: "var(--white)", borderColor: "var(--line)" }}
28:     >
29:       <div
30:         className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
31:         style={{ background: c.bg }}
32:       >
33:         <Icon size={16} style={{ color: c.icon }} />
34:       </div>
35:       <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-display)" }}>
36:         {value}
37:       </div>
38:       <div className="text-xs" style={{ color: "var(--muted)" }}>
39:         {label}
40:       </div>
41:     </div>
42:   );
43: }
````

## File: components/layout/Sidebar.tsx
````typescript
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
76:         <UserButton afterSignOutUrl="/" />
77:         <span className="text-[12px] text-white/40">Account</span>
78:       </div>
79:     </aside>
80:   );
81: }
````

## File: lib/ai/gemini.ts
````typescript
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
````

## File: lib/ai/pipeline.ts
````typescript
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
40: 
41:   // ── Step 3: Parse JD (if provided) ──
42:   console.log("[Pipeline] Step 3: Parsing job description...");
43:   const jobDescription = input.jdText
44:     ? await parseJobDescription(input.jdText)
45:     : { title: "General Role", requiredSkills: [], preferredSkills: [], requiredExperience: "", requiredEducation: "", requiredCertifications: [], responsibilities: [] };
46: 
47:   // ── Step 4: Full analysis ──
48:   console.log("[Pipeline] Step 4: Running full candidate analysis...");
49:   const documentTypes = input.uploads.map((u) => u.fileType);
50:   const analysis = await analyzeCandidateFull({
51:     profile,
52:     jobDescription,
53:     documentTypes,
54:     companyPreferences: input.companyPreferences ?? undefined,
55:   });
56: 
57:   // ── Step 5: Calculate final score ──
58:   console.log("[Pipeline] Step 5: Calculating score...");
59:   const finalScore = calculateScore(analysis.scoreBreakdown);
60: 
61:   console.log(`[Pipeline] Complete. Score: ${finalScore}`);
62:   return { profile, jobDescription, analysis, finalScore };
63: }
````

## File: lib/parser/docx.ts
````typescript
1: 
````

## File: lib/parser/pdf.ts
````typescript
1: 
````

## File: lib/scoring/score.ts
````typescript
 1: // lib/scoring/score.ts
 2: // Weighted scoring model — each factor contributes to a 0–100 final score
 3: 
 4: const WEIGHTS: Record<string, number> = {
 5:   jdMatch:             0.25,
 6:   profileCompleteness: 0.20,
 7:   verificationSupport: 0.20,
 8:   academicAlignment:   0.15,
 9:   experienceRelevance: 0.10,
10:   consistency:         0.10,
11: };
12: 
13: export function calculateScore(breakdown: Record<string, number>): number {
14:   let total = 0;
15:   for (const [key, weight] of Object.entries(WEIGHTS)) {
16:     const raw = breakdown[key] ?? 0;
17:     total += Math.min(100, Math.max(0, raw)) * weight;
18:   }
19:   return Math.round(total);
20: }
21: 
22: export function getScoreLabel(score: number): { label: string; color: string } {
23:   if (score >= 85) return { label: "Highly Suitable", color: "green" };
24:   if (score >= 70) return { label: "Suitable — Minor Checks", color: "blue" };
25:   if (score >= 50) return { label: "Moderate Fit — Review Needed", color: "yellow" };
26:   return { label: "Weak Fit — Major Gaps", color: "red" };
27: }
````

## File: lib/db.ts
````typescript
1: 
````

## File: lib/storage.ts
````typescript
1: 
````

## File: prisma/schema.prisma
````prisma
  1: generator client {
  2:   provider = "prisma-client-js"
  3: }
  4: 
  5: datasource db {
  6:   provider = "postgresql"
  7:   url      = env("DATABASE_URL")
  8: }
  9: 
 10: model User {
 11:   id        String   @id @default(cuid())
 12:   clerkId   String   @unique
 13:   email     String   @unique
 14:   name      String?
 15:   role      Role     @default(CANDIDATE)
 16:   cases     Case[]
 17:   createdAt DateTime @default(now())
 18: }
 19: 
 20: enum Role {
 21:   CANDIDATE
 22:   RECRUITER
 23:   ADMIN
 24: }
 25: 
 26: model Case {
 27:   id                 String    @id @default(cuid())
 28:   title              String
 29:   userId             String
 30:   mode               CaseMode
 31:   jdText             String?
 32:   companyPreferences String?
 33:   status             CaseStatus @default(PENDING)
 34:   finalScore         Float?
 35:   createdAt          DateTime  @default(now())
 36:   updatedAt          DateTime  @updatedAt
 37: 
 38:   user    User     @relation(fields: [userId], references: [id])
 39:   uploads Upload[]
 40:   report  Report?
 41: }
 42: 
 43: enum CaseMode {
 44:   RECRUITER
 45:   CANDIDATE
 46: }
 47: 
 48: enum CaseStatus {
 49:   PENDING
 50:   PROCESSING
 51:   COMPLETED
 52:   FAILED
 53: }
 54: 
 55: model Upload {
 56:   id               String        @id @default(cuid())
 57:   caseId           String
 58:   fileName         String
 59:   fileType         FileType
 60:   storageUrl       String
 61:   extractedText    String?
 62:   processingStatus UploadStatus  @default(PENDING)
 63:   createdAt        DateTime      @default(now())
 64: 
 65:   case Case @relation(fields: [caseId], references: [id], onDelete: Cascade)
 66: }
 67: 
 68: enum FileType {
 69:   RESUME
 70:   COVER_LETTER
 71:   CERTIFICATE
 72:   MARKSHEET
 73:   DEGREE
 74:   INTERNSHIP
 75:   EXPERIENCE_LETTER
 76:   ID_PROOF
 77:   JOB_DESCRIPTION
 78:   OTHER
 79: }
 80: 
 81: enum UploadStatus {
 82:   PENDING
 83:   PARSED
 84:   ANALYZED
 85:   ERROR
 86: }
 87: 
 88: model Report {
 89:   id             String   @id @default(cuid())
 90:   caseId         String   @unique
 91:   summary        String
 92:   strengths      String[]
 93:   weaknesses     String[]
 94:   missingItems   String[]
 95:   riskFlags      String[]
 96:   recommendation String
 97:   score          Float
 98:   scoreBreakdown Json
 99:   verifications  Json
100:   createdAt      DateTime @default(now())
101: 
102:   case Case @relation(fields: [caseId], references: [id], onDelete: Cascade)
103: }
````

## File: .env.local
````
 1: # Database (Supabase)
 2: DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
 3: 
 4: # Clerk Auth
 5: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
 6: CLERK_SECRET_KEY=sk_test_xxxx
 7: NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
 8: NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
 9: NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
10: NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
11: 
12: # Supabase Storage
13: NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
14: NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
15: SUPABASE_SERVICE_ROLE_KEY=xxxx
16: 
17: # AI
18: GEMINI_API_KEY=your_gemini_key
19: OPENROUTER_API_KEY=your_openrouter_key_optional
````

## File: .gitignore
````
1: node_modules
````

## File: env.example
````
 1: # Database (Supabase)
 2: DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"
 3: 
 4: # Clerk Auth
 5: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxx
 6: CLERK_SECRET_KEY=sk_test_xxxx
 7: NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
 8: NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
 9: NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
10: NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
11: 
12: # Supabase Storage
13: NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
14: NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
15: SUPABASE_SERVICE_ROLE_KEY=xxxx
16: 
17: # AI
18: GEMINI_API_KEY=your_gemini_key
19: OPENROUTER_API_KEY=your_openrouter_key_optional
````

## File: middleware.ts
````typescript
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
````

## File: package.json
````json
1: {
2:   "dependencies": {
3:     "@prisma/client": "^7.5.0",
4:     "clsx": "^2.1.1",
5:     "date-fns": "^4.1.0",
6:     "prisma": "^7.5.0",
7:     "tailwind-merge": "^3.5.0"
8:   }
9: }
````

## File: README.md
````markdown
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
````
