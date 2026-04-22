# TalentProof AI – Complete Local Version

**AI-Powered Candidate Verification Platform (100% local – Ollama + Tesseract)**

## Quick Start (VPS / Local)

```bash
# 1. System packages
sudo apt-get install -y poppler-utils tesseract-ocr tesseract-ocr-eng ollama

# 2. Start Ollama
ollama serve & sleep 3
ollama pull llama3.2

# 3. Project
npm install
npm install tesseract.js sharp

# 4. Database
npx prisma generate
npx prisma db push

<<<<<<< HEAD
### 5. Create Supabase storage bucket
- Go to Supabase dashboard → Storage
- Create a bucket named: `talentproof-uploads`
- Set to Public (or use signed URLs for private)

### 6. Run development server
```bash
npm run dev
```

---

## Project Structure

```
talentproof-ai/
│
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Clerk sign-in / sign-up
│   ├── dashboard/                # Main dashboard
│   ├── case/[caseId]/            # Workspace for each evaluation case
│   ├── report/[caseId]/          # Final evaluation report view
│   ├── admin/                    # Admin dashboard
│   └── api/
│       ├── cases/route.ts        # CRUD for cases
│       ├── upload/route.ts       # File upload + text extraction
│       ├── analyze/route.ts      # Trigger AI pipeline
│       └── report/route.ts       # Fetch/export report
│
├── components/
│   ├── ui/                       # shadcn components
│   ├── dashboard/                # CaseCard, StatsPanel
│   ├── workspace/                # FileUploader, InsightsPanel, JDInput
│   └── report/                   # EvaluationSheet, ScoreGauge, VerificationTable
│
├── lib/
│   ├── ai/
│   │   ├── gemini.ts             # Gemini API calls
│   │   └── pipeline.ts           # Multi-step analysis orchestrator
│   ├── parser/
│   │   ├── pdf.ts                # PDF text extraction
│   │   └── docx.ts               # DOCX text extraction
│   ├── scoring/
│   │   └── score.ts              # Weighted scoring engine
│   ├── storage.ts                # Supabase file storage
│   └── db.ts                     # Prisma client singleton
│
├── prisma/
│   └── schema.prisma             # Database schema
│
├── types/                        # TypeScript type definitions
├── utils/                        # Helper functions
├── middleware.ts                 # Clerk auth middleware
└── .env.local                    # Environment variables
```

---

## AI Pipeline (8 steps)

```
1. User uploads documents + JD
2. Files stored in Supabase Storage
3. Text extracted from PDFs/DOCX
4. Gemini extracts structured candidate profile
5. Gemini parses job description
6. Cross-document validation & verification
7. Weighted score calculated (0–100)
8. Report generated & saved to DB
```

---

## Scoring Weights

| Factor | Weight |
|--------|--------|
| JD Match | 25% |
| Profile Completeness | 20% |
| Verification Support | 20% |
| Academic Alignment | 15% |
| Experience Relevance | 10% |
| Consistency | 10% |

---

## Deployment

**Recommended (free):**
- App: [Render](https://render.com) free web service
- Database + Storage: [Supabase](https://supabase.com) free plan
- Auth: [Clerk](https://clerk.com) free tier (50k users/month)
- AI: [Google AI Studio](https://aistudio.google.com) free Gemini API

=======
# 5. Environment
cp .env.example .env.local
# Edit .env.local and add:
# DATABASE_URL=...
# OLLAMA_BASE_URL=http://localhost:11434
# OLLAMA_MODEL=llama3.2
# UPLOAD_DIR=/var/talentproof/uploads
>>>>>>> ff30164 (new update)
