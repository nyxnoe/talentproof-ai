TalentProof AITalentProof AI is an AI-powered candidate verification and analysis platform designed to streamline the recruitment process through local-first processing. By leveraging Ollama for local LLM inference and Tesseract for OCR, the system ensures data privacy while providing deep insights into candidate profiles.🚀 Quick Start1. PrerequisitesEnsure your system has the necessary packages for document processing and AI inference:Bashsudo apt-get install -y poppler-utils tesseract-ocr tesseract-ocr-eng ollama
2. AI SetupStart the Ollama service and pull the default model:Bashollama serve & 
ollama pull llama3.2
3. InstallationBashnpm install
npx prisma generate
npx prisma db push
npm run dev
🛠️ Tech StackFramework: Next.js 15 (App Router)Database: PostgreSQL with Prisma ORMAuth: ClerkAI Inference: Ollama (Local) or Gemini (Cloud)OCR & Parsing: Tesseract.js, Sharp, PDF-Parse, and Mammoth📊 Analysis Pipeline & ScoringThe platform orchestrates an 8-step pipeline to evaluate candidates:Ingestion: User uploads documents (Resumes, Certificates, IDs) and a Job Description (JD).Extraction: Text is extracted via specialized parsers or OCR for images.Profiling: AI extracts a structured candidate profile and parses JD requirements.Verification: The system runs rule-based checks for consistency and gaps.Scoring: A final score (0–100) is generated based on weighted factors:FactorWeightJD Match25%Profile Completeness20%Verification Support20%Academic Alignment15%Experience Relevance10%Consistency10%🛡️ Key FeaturesZone-Based OCR: Define specific coordinates on document templates (like marksheets or IDs) for high-precision data extraction.Local Privacy: Processes sensitive documents locally using Ollama to avoid sending data to third-party providers.Admin Dashboard: Manage document templates and monitor system-wide verification stats.Smart Reports: Generate printable HTML reports including strengths, weaknesses, and risk flags.⚙️ Environment VariablesCreate a .env.local file with the following:Code snippetDATABASE_URL="postgresql://user:password@localhost:5432/talentproof"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# AI Config
OLLAMA_BASE_URL="http://localhost:11434"
OLLAMA_MODEL="llama3.2"

# Storage
UPLOAD_DIR="./uploads"