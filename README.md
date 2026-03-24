# TalentProof AI

**AI-Powered Candidate Background Evaluation & Hiring Readiness Platform**

---

## Quick Start

### 1. Create the project
```bash
npx create-next-app@latest talentproof-ai --typescript --tailwind --app
cd talentproof-ai
```

### 2. Install dependencies
```bash
# Core
npm install @prisma/client prisma
npm install @clerk/nextjs
npm install @supabase/supabase-js

# Document parsing
npm install pdf-parse mammoth
npm install @types/pdf-parse --save-dev

# Forms & validation
npm install zod react-hook-form @hookform/resolvers

# UI
npm install lucide-react react-dropzone
npx shadcn@latest init
npx shadcn@latest add button card badge progress table tabs

# PDF export (for reports)
npm install @react-pdf/renderer
```

### 3. Set up environment
```bash
cp .env.example .env.local
# Fill in your keys:
# - DATABASE_URL from Supabase > Settings > Database
# - Clerk keys from Clerk dashboard
# - Supabase URL & keys from Supabase dashboard
# - GEMINI_API_KEY from Google AI Studio (free)
```

### 4. Set up database
```bash
npx prisma generate
npx prisma db push
```

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

