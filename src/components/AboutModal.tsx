import React, { useState } from 'react';
import { 
  X, 
  HelpCircle, 
  BookOpen, 
  Database, 
  Users, 
  DollarSign, 
  GraduationCap, 
  Code2, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  TrendingUp,
  Cpu,
  Lock,
  Workflow
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [openPromptAccordions, setOpenPromptAccordions] = useState<Record<string, boolean>>({
    '1.1': true,
    '1.2': false,
    '1.3': false,
    '2.1': false,
    '2.2': false,
    '2.3': false,
    '3.1': false,
    '3.2': false,
    '3.3': false,
  });

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const toggleAccordion = (id: string) => {
    setOpenPromptAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const tabs = [
    { id: 0, label: "1. Problem & Core Concept", icon: BookOpen },
    { id: 1, label: "2. Required Domain Knowledge", icon: ShieldCheck },
    { id: 2, label: "3. Systems Architecture & Flow", icon: Layers },
    { id: 3, label: "4. Stakeholders & Personas", icon: Users },
    { id: 4, label: "5. Commercial Valuations", icon: DollarSign },
    { id: 5, label: "6. College & Resume Strategy", icon: GraduationCap },
    { id: 6, label: "7. AI Vibe-Coding Prompts", icon: Code2 },
    { id: 7, label: "8. Further Enhancements", icon: Sparkles },
  ];

  const promptRunway = [
    {
      id: '1.1',
      tier: 'Tier 1: MVP 1',
      title: 'Prompt 1.1: Project Shell, Split-Screen Workspace, and Core Layout',
      promptText: `You are an expert Frontend Architect. We are building the frontend prototype for "eCTD CSR Auto-Drafter", a specialized regulatory medical writing copilot for pharmaceutical clinical study reports.

Tech Stack:
- Next.js 14+ (App Router) or React + Vite
- Tailwind CSS
- Lucide React (Icons)
- shadcn/ui components (if available, otherwise pure Tailwind)

Requirements:
1. Create a full-height screen (\`h-screen overflow-hidden\`) with a top regulatory navigation bar:
   - Left: Product name "eCTD CSR Auto-Drafter", document title "Study XYZ-001 (Protocol: SBP-2024) - Phase III CSR", and badge "ICH E3 Module 5.3.5.1".
   - Right: Quick stats badge: "Population: Safety (N=400)", "Status: Draft Ready", and a secondary button "Export .docx".
2. Implement a split-pane container below the navbar (\`50vw / 50vw\`):
   - Left Panel ("Source Data & Analysis Tables"): A card container with a tabbed header ("Table 14.1: Demographics", "Table 14.2: Primary Efficacy", "Table 14.3: Adverse Events").
   - Right Panel ("ICH E3 Narrative Drafter"): A regulatory document editor container showing a section selector dropdown ("Section 10: Demographics & Disposition", "Section 11: Efficacy Evaluation", "Section 12: Safety Summary").
3. Make both panels independently scrollable (\`overflow-y-auto\`).
4. Apply clean clinical styling: neutral slate background (\`bg-slate-50\`), clean white card surfaces, subtle borders (\`border-slate-200\`), and monospace fonts for tabular data cells.`
    },
    {
      id: '1.2',
      tier: 'Tier 1: MVP 1',
      title: 'Prompt 1.2: Synthetic Clinical Data Mocks & Fact Extraction Engine',
      promptText: `Implement the synthetic CDISC ADaM data layer and facts model directly in TypeScript/JavaScript mock files (no external libraries or APIs).

Requirements:
1. Create \`src/mocks/clinicalData.ts\` with two structured mock tables:
   - \`DEMOGRAPHICS_TABLE_14_1\`: Columns for \`Parameter\`, \`Active Cohort (N=200)\`, \`Placebo Cohort (N=200)\`, and \`Total (N=400)\`. Include rows for Age (Mean, SD), Sex (Male n/%, Female n/%), and Race (White, Black, Asian).
   - \`EFFICACY_TABLE_14_2\`: Columns for \`Endpoint\`, \`Active (N=200)\`, \`Placebo (N=200)\`, \`Difference (95% CI)\`, and \`p-value\`. Include rows for "Baseline SBP (mmHg)", "Week 12 SBP (mmHg)", "Change from Baseline (Mean, SD)", and "ANCOVA LS Mean Diff".
2. Create a structured Fact Dictionary \`FACT_DICTIONARY\`:
   - Map individual numbers to a unique identifier, cell coordinate, and raw value:
     * \`fact_101\`: { id: "fact_101", cellId: "demo-row-1-col-1", value: "54.2", label: "Active Mean Age", tableId: "14.1" }
     * \`fact_102\`: { id: "fact_102", cellId: "demo-row-1-col-2", value: "53.8", label: "Placebo Mean Age", tableId: "14.1" }
     * \`fact_201\`: { id: "fact_201", cellId: "eff-row-3-col-1", value: "-14.2", label: "Active SBP Mean Change", tableId: "14.2" }
     * \`fact_202\`: { id: "fact_202", cellId: "eff-row-3-col-2", value: "-4.1", label: "Placebo SBP Mean Change", tableId: "14.2" }
     * \`fact_203\`: { id: "fact_203", cellId: "eff-row-4-col-3", value: "-10.1 (-12.4, -7.8)", label: "LS Mean Diff 95% CI", tableId: "14.2" }
     * \`fact_204\`: { id: "fact_204", cellId: "eff-row-4-col-4", value: "<0.001", label: "Primary p-value", tableId: "14.2" }
3. Render the Left Panel table component using this data. Each table cell must have an \`id\` or \`data-cell-id\` corresponding to the coordinates specified in the dictionary.`
    },
    {
      id: '1.3',
      tier: 'Tier 1: MVP 1',
      title: 'Prompt 1.3: Interactive Verification Linker & Narrative Renderer',
      promptText: `Implement the core interactive link between the narrative prose and the statistical data table using local React state.

Requirements:
1. Define a shared state in the parent view:
   - \`activeFactId: string | null\`
   - \`highlightedCellId: string | null\`
2. In the Right Panel, render a pre-written ICH E3 Section 11 narrative:
   - Embed custom interactive tokens \`<FactCitation factId="fact_201" value="-14.2 mmHg" />\`, \`<FactCitation factId="fact_202" value="-4.1 mmHg" />\`, \`<FactCitation factId="fact_203" value="-10.1 mmHg (95% CI: -12.4, -7.8)" />\`, and \`<FactCitation factId="fact_204" value="p < 0.001" />\`.
3. Style the \`<FactCitation />\` component:
   - Styled as a distinct inline chip: subtle blue background (\`bg-blue-50 text-blue-700 font-medium px-1.5 py-0.5 rounded border border-blue-200 hover:bg-blue-100 cursor-pointer\`).
   - On hover or click: Sets \`activeFactId\`, which triggers the Left Panel to find the matching \`cellId\`, smoothly scrolls it into view, and applies an animated highlight ring (\`ring-2 ring-blue-500 bg-blue-100/50 transition-all duration-300\`).
4. Reverse hover:
   - Hovering over any cell in the Left Panel should temporarily highlight the corresponding citation chip in the Right Panel narrative text.
5. Add a simple toggle button "Simulate Discrepancy":
   - When toggled, changes \`fact_201\` in the text to \`-18.5 mmHg\`. The citation chip turns amber/red (\`bg-red-50 text-red-700 border-red-300\`) with a warning tooltip: "Mismatch with Source Table 14.2: Expected -14.2".`
    },
    {
      id: '2.1',
      tier: 'Tier 2: MVP 2',
      title: 'Prompt 2.1: Server-Side Pipeline & Structured LLM Extraction',
      promptText: `Convert the prototype to use a live server-side architecture (Next.js Route Handlers \`/api/draft\` or FastAPI backend) integrated with an LLM provider (OpenAI or Gemini) using environment variables.

Requirements:
1. Set up an API endpoint \`/api/generate-narrative\` that accepts:
   - \`sectionId\`: string (e.g., "ICH_E3_SEC_11_EFFICACY")
   - \`tableData\`: JSON array of table rows and cells
   - \`parameters\`: { drugName: "CardioPax", indication: "Hypertension", primaryEndpoint: "Systolic Blood Pressure at Week 12" }
2. Create a system prompt enforcing the zero-hallucination regulatory slot-filling protocol:
   - The LLM must adopt the persona of an expert Senior Regulatory Medical Writer.
   - Inject the extracted fact dictionary as JSON in the system prompt.
   - Enforce the rule: "Every single numerical claim, percentage, sample size, or p-value MUST be wrapped in custom XML tags: \`<cite factId='KEY'>VALUE</cite>\`. Never alter the number found in the dictionary."
   - The output must follow the standard ICH E3 format for that section.
3. Validate and parse the LLM output on the server to ensure all emitted \`factId\` tags strictly exist in the provided dictionary. Return an HTTP 422 error if the model invents a numerical value without a matching fact identifier.`
    },
    {
      id: '2.2',
      tier: 'Tier 2: MVP 2',
      title: 'Prompt 2.2: Async Streaming UI, Skeleton Loaders, and Error Boundaries',
      promptText: `Implement real-time streaming, loading states, and robust error handling in the frontend workspace.

Requirements:
1. Replace static text generation with an asynchronous streaming state using the Vercel AI SDK (\`useCompletion\` / \`useChat\`) or a custom Server-Sent Events (SSE) reader.
2. In the Right Panel:
   - Add a "Generate Draft with AI" action bar with model selector (e.g., "Claude 3.5 Sonnet / GPT-4o / Gemini 1.5 Pro") and a primary button "Auto-Draft Section".
   - When clicked, display a pulse skeleton loader reflecting regulatory document structure (paragraph lines, table skeletons, sub-headings).
   - Stream the response in real-time. As text streams in, parse the \`<cite>\` tags on-the-fly and hydrate them immediately into interactive, clickable \`<FactCitation />\` components.
3. Add a "Verification Progress Bar" that counts:
   - "Total facts claimed": e.g., 8
   - "Verified against source table": e.g., 8/8 (100% verified)
   - "Discrepancies found": 0
4. Implement an error fallback screen if the API key is missing or invalid, showing clear setup instructions for \`.env.local\` (\`OPENAI_API_KEY\` or \`GEMINI_API_KEY\`).`
    },
    {
      id: '2.3',
      tier: 'Tier 2: MVP 2',
      title: 'Prompt 2.3: CSV/ADaM File Ingestion & Deterministic Fact Extractor',
      promptText: `Build a real client-side file upload and server-side statistical parser for CDISC ADaM datasets.

Requirements:
1. In the Left Panel, add a drag-and-drop file upload zone accepting \`.csv\` files (supporting typical CDISC formats: \`ADSL.csv\` or \`ADEFF.csv\`).
2. Provide two built-in downloadable/selectable synthetic presets:
   - "Load Synthetic ADSL (Demographics, N=400)"
   - "Load Synthetic ADEFF (Blood Pressure Efficacy, N=400)"
3. Write a server/worker calculation utility (in TypeScript or Python) that parses the uploaded CSV and programmatically computes:
   - Arm-specific counts: \`N\`, Mean, Standard Deviation, Median, Min, Max for numeric parameters (\`AGE\`, \`BASE\`, \`CHG\`).
   - Category frequency and percentages for discrete parameters (\`SEX\`, \`RACE\`).
   - Mean difference between arms and a student's $t$-test or simplified ANCOVA estimate.
4. Auto-generate the dynamic \`FACT_DICTIONARY\` and populate the Left Panel's tabular display from the ingested CSV file without any hardcoded mock dependencies.`
    },
    {
      id: '3.1',
      tier: 'Tier 3: Enterprise Scale',
      title: 'Prompt 3.1: Supabase/PostgreSQL Persistence & 21 CFR Part 11 Audit Trail',
      promptText: `Integrate a persistent database layer using Supabase (or standard PostgreSQL + Prisma) to support multi-tenant study management and regulatory audit requirements.

Requirements:
1. Create a relational schema:
   - \`studies\`: \`id\`, \`protocol_number\`, \`study_title\`, \`phase\`, \`created_at\`
   - \`clinical_datasets\`: \`id\`, \`study_id\`, \`dataset_name\` (e.g., "ADSL"), \`raw_data_json\`, \`uploaded_by\`, \`uploaded_at\`
   - \`csr_sections\`: \`id\`, \`study_id\`, \`section_number\` (e.g., "11.1"), \`title\`, \`content_markdown\`, \`status\` ("Draft", "Under Review", "Approved")
   - \`audit_logs\` (Mandatory for 21 CFR Part 11 compliance):
     * Columns: \`id\`, \`study_id\`, \`action\` ("GENERATE_DRAFT", "EDIT_FACT", "MANUAL_OVERRIDE", "APPROVE_SECTION"), \`user_id\`, \`timestamp\`, \`old_value\`, \`new_value\`, \`reason_for_change\`.
     * This table must be append-only (no UPDATE or DELETE operations permitted).
2. Implement Next.js Middleware route guards:
   - Restrict access to routes \`/study/[id]/*\` to authenticated users with valid session tokens.
   - Enforce Role-Based Access Control (RBAC): "Medical Writer" (can draft/edit), "Biostatistician" (can upload data/validate facts), and "Regulatory Approver" (can approve/lock document).
3. Build an "Audit Trail Drawer" in the UI showing every change made to the report text and citations with ISO 8601 timestamps and user signatures.`
    },
    {
      id: '3.2',
      tier: 'Tier 3: Enterprise Scale',
      title: 'Prompt 3.2: Interactive Efficacy & Safety Analytics (Recharts Integration)',
      promptText: `Enhance the Left Panel with interactive data visualization dashboards using Recharts to mirror the "Figures" portion of clinical TLFs.

Requirements:
1. Add a view mode switch in the Left Panel: "Tabular View" | "Visual Figures".
2. Implement two regulatory clinical study figures:
   - Primary Efficacy Chart: A Forest Plot / Error Bar chart showing LS Mean Change in SBP from Baseline across Week 2, Week 4, Week 8, and Week 12 for Active vs. Placebo cohorts with 95% Confidence Interval whiskers.
   - Safety Summary Chart: A horizontal grouped bar chart showing Adverse Event Incidence (>5% threshold) categorized by MedDRA System Organ Class (Headache, Dizziness, Fatigue, Nausea).
3. Connect the charts to the central highlighting engine:
   - Hovering over an error bar or data point in Recharts triggers the identical \`activeFactId\` event, highlighting the corresponding paragraph sentence in the Right Panel's narrative text.
4. Provide an "Export SVG/PNG" utility for each chart configured with standard publication resolutions (300 DPI).`
    },
    {
      id: '3.3',
      tier: 'Tier 3: Enterprise Scale',
      title: 'Prompt 3.3: Production eCTD Document Exporter & Polished Enterprise UX',
      promptText: `Complete the enterprise-readiness suite with an eCTD-compliant Word export engine, unified theme system, and review workflow.

Requirements:
1. Build an eCTD-compliant Microsoft Word (\`.docx\`) exporter (using the \`docx\` npm library or a Python \`python-docx\` microservice):
   - Generates output matching strict regulatory typography: Times New Roman or Arial 10pt/12pt, 1-inch margins, standard ICH E3 numbered headings (e.g., "11.4.1 Primary Efficacy Results").
   - Embeds automated Word cross-references and XML bookmarks for all table citations and statistical figures.
   - Inserts headers and footers with confidential submission disclaimers, study protocol ID, pagination ("Page X of Y"), and eCTD module metadata.
2. Implement an Enterprise Theme Toggle:
   - Seamless switching between clean regulatory Light Mode (\`bg-slate-50\`, crisp contrast designed for 8-hour document review) and Dark Mode (\`bg-slate-950\`, slate-800 borders, high-contrast readable accents).
3. Build a "Review & Sign-Off" Modal:
   - Captures an electronic signature adhering to 21 CFR Part 11: Prompt for user re-authentication (password), printed name, timestamp, and "Meaning of Signature" dropdown ("I confirm the review and approval of this clinical study report section").
   - Freezes the section to read-only state upon successful signing.`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4 md:p-8 animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-6xl h-[88vh] bg-[#0A0A0C] border border-white/[0.08] rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.95),0_0_60px_rgba(6,182,212,0.15)] flex flex-col overflow-hidden backdrop-blur-3xl">
        
        {/* Modal Header */}
        <div className="px-8 py-5 border-b border-white/[0.06] bg-white/[0.02] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-indigo-500/20 text-cyan-400 ring-1 ring-cyan-500/30 shadow-glow-cyan">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
                eCTD CSR AUTO-DRAFTER LEARNING DECK & SYSTEMS ARCHITECTURE
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono ring-1 ring-cyan-400/30">
                  Pharma AI Mastery
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Educational reference for regulatory biostatistics, deterministic AI generation, and 21 CFR Part 11 compliance
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all ring-1 ring-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split Sidebar Navigation & Content */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* Left Navigation Sidebar */}
          <div className="w-72 border-r border-white/[0.06] bg-white/[0.015] p-4 overflow-y-auto space-y-1.5 flex-shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-semibold tracking-tight transition-all duration-200 text-left ${
                    isSelected
                      ? 'bg-gradient-to-r from-blue-600/90 to-cyan-600/90 text-white shadow-glow-cyan ring-1 ring-cyan-400/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-zinc-500'}`} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Rich Educational Content Canvas */}
          <div className="flex-1 p-8 overflow-y-auto bg-[#0A0A0E]/50">
            
            {/* TAB 0: PROBLEM & CORE CONCEPT */}
            {activeTab === 0 && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>The Billion-Dollar Clinical Documentation Bottleneck</span>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Why Pharma Loses $1M–$5M Every Single Day in Manual CSR Transcription
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  In pharmaceutical drug development, completing a pivotal Phase III clinical trial generates thousands of pages of statistical Tables, Listings, and Figures (TLFs). However, before submitting the New Drug Application (NDA) to the FDA or EMA under <strong className="text-white">eCTD Module 5</strong>, medical writers spend <strong className="text-cyan-300">3 to 6 months manually copy-pasting numbers</strong> from statistical outputs into Microsoft Word narrative reports (ICH E3 Sections 10, 11, and 12).
                </p>

                {/* Problem Flow Diagram */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    The Clinical Bottleneck Flow:
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs">
                    <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/20 text-rose-300">
                      <div className="font-bold mb-1">1. Phase III Trial</div>
                      <div className="text-[11px] text-zinc-400">1,200 subjects, $400M budget, hits p &lt; 0.001</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/20 text-amber-300">
                      <div className="font-bold mb-1">2. 3,000 Pages TLFs</div>
                      <div className="text-[11px] text-zinc-400">SAS macros generate massive static tables</div>
                    </div>
                    <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-200">
                      <div className="font-bold mb-1">3. Manual Transcription</div>
                      <div className="text-[11px] text-zinc-400">12-24 weeks manual Word drafting, transcription errors</div>
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 shadow-glow-cyan">
                      <div className="font-bold mb-1">4. Auto-Drafter Solution</div>
                      <div className="text-[11px] text-zinc-300">Deterministic TAG, 100% cell linking, drafts in hours</div>
                    </div>
                  </div>
                </div>

                {/* Naive LLM vs Deterministic TAG Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-rose-400 text-xs font-bold">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Why Pure LLMs Fail in Submissions</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Standard ChatGPT or generic RAG hallucinates floating-point numbers, inverts confidence intervals (e.g. claiming -10.1 is +10.1), and creates FDA <strong className="text-rose-300">Refusal-to-File (RTF)</strong> compliance violations under 21 CFR Part 11.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>The Deterministic TAG Architecture</span>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      This application parses CDISC ADaM datasets deterministically into a Fact Coordinate Dictionary, restricts the LLM to strictly filling predefined fact slots, and builds a bidirectional interactive verification layer linking every prose number directly to table cells.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: REQUIRED DOMAIN KNOWLEDGE */}
            {activeTab === 1 && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Essential Life Sciences & Regulatory Vocabulary</span>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Domain Concepts Every Bio-Software Engineer Must Master
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="font-bold text-cyan-300 font-mono">eCTD (electronic Common Technical Document)</div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      The mandatory international standard for submitting drug applications to FDA (US), EMA (EU), and PMDA (Japan). Organized into 5 hierarchical modules, where <strong className="text-white">Module 5</strong> contains Clinical Study Reports.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="font-bold text-blue-300 font-mono">ICH E3 Guideline</div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      The global harmonized blueprint defining the exact structure, numbering, and statistical conventions of Clinical Study Reports (Section 10 Demographics, Section 11 Efficacy, Section 12 Safety).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="font-bold text-indigo-300 font-mono">CDISC ADaM Standards</div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      Analysis Data Model standards required by regulatory authorities. Includes <strong className="text-white">ADSL</strong> (Subject-Level Demographics), <strong className="text-white">ADEFF</strong> (Primary Efficacy Endpoints), and <strong className="text-white">ADAE</strong> (Adverse Events).
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="font-bold text-emerald-300 font-mono">21 CFR Part 11 & Annex 11</div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      FDA and EMA regulations for electronic records and electronic signatures. Mandates append-only immutable audit logs, tamper-evident transaction hashing, and legally binding digital sign-offs.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="font-bold text-purple-300 font-mono">ANCOVA & LS Mean Differences</div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      Analysis of Covariance statistical model used to evaluate treatment efficacy while adjusting for baseline disease severity and multi-center stratification.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                    <div className="font-bold text-amber-300 font-mono">MedDRA (Medical Dictionary for Regulatory Activities)</div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      The standardized medical terminology hierarchy used worldwide to code adverse events (System Organ Class -&gt; High Level Group Term -&gt; Preferred Term).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SYSTEMS ARCHITECTURE & FLOW */}
            {activeTab === 2 && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Workflow className="w-4 h-4" />
                  <span>End-to-End System Architecture</span>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Four-Tier Deterministic Tool-Augmented Generation (TAG) Pipeline
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-cyan-500/30 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 font-mono font-bold text-xs">
                      LAYER 1
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">CDISC Ingestion & Deterministic Statistical Fact Engine</h4>
                      <p className="text-[11.5px] text-zinc-300">
                        Ingests ADSL/ADEFF/ADAE datasets (CSV or XPT format). Runs exact arithmetic and statistical calculations (means, SDs, percentages, ANCOVA deltas) and indexes every output with a coordinate hash (e.g., <code className="text-cyan-300">Table_14.2:Row5_Col1</code>).
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-blue-500/30 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 font-mono font-bold text-xs">
                      LAYER 2
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">Constrained Regulatory LLM Slot-Filling Drafter</h4>
                      <p className="text-[11.5px] text-zinc-300">
                        The LLM is prompted under strict ICH E3 medical writing personas. It is injected with the Fact Dictionary and forced to wrap all numerical claims in XML tags (<code className="text-blue-300">&lt;cite factId="fact_201"&gt;-14.2&lt;/cite&gt;</code>). Server-side checksum checks reject any hallucinated key with HTTP 422.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-indigo-500/30 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 font-mono font-bold text-xs">
                      LAYER 3
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">Bidirectional Verification & Discrepancy Overlay</h4>
                      <p className="text-[11.5px] text-zinc-300">
                        The frontend dynamically hydrates XML tags into interactive <code className="text-indigo-300">&lt;FactCitation /&gt;</code> tokens. Hovering or clicking a citation instantly scrolls to and highlights the originating cell coordinate in the source table.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-emerald-500/30 flex items-start gap-4">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono font-bold text-xs">
                      LAYER 4
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-1">21 CFR Part 11 Immutable Audit & eCTD Word Exporter</h4>
                      <p className="text-[11.5px] text-zinc-300">
                        Append-only audit logs record all interactions with Merkle root hashes. Electronic signatures freeze the document and generate eCTD-compliant <code className="text-emerald-300">.docx</code> documents with Times/Arial typography and submission bookmarks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: STAKEHOLDERS & PERSONAS */}
            {activeTab === 3 && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Users className="w-4 h-4" />
                  <span>Enterprise Personas & Collaborative Workflow</span>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Who Uses This Application in BioPharma & CROs
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-cyan-300 font-bold">
                      <FileText className="w-4 h-4" />
                      <span>Senior Regulatory Medical Writer (Author)</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      <strong>Role:</strong> Compiles ICH E3 narrative sections 10, 11, and 12.
                      <br />
                      <strong>Value:</strong> Eliminates hundreds of hours of manual copy-pasting. Generates compliant drafts in minutes with zero arithmetic error risk.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-blue-300 font-bold">
                      <Database className="w-4 h-4" />
                      <span>Lead Biostatistician (Data Verifier)</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      <strong>Role:</strong> Uploads ADaM datasets, validates ANCOVA models, and verifies cell coordinate mapping.
                      <br />
                      <strong>Value:</strong> Ensures 100% mathematical fidelity between statistical tables and final text prose.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-indigo-300 font-bold">
                      <Lock className="w-4 h-4" />
                      <span>VP / Director of Regulatory Affairs (Approver)</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      <strong>Role:</strong> Reviews audit trail, conducts sign-off under 21 CFR Part 11, and exports eCTD Module 5 packages for FDA submission.
                      <br />
                      <strong>Value:</strong> Accelerated submission timeline protects $30M–$180M in drug patent exclusivity.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="flex items-center gap-2 text-emerald-300 font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Clinical Quality Assurance (QA Auditor)</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      <strong>Role:</strong> Inspects tamper-evident audit logs and verifies zero-hallucination guarantees.
                      <br />
                      <strong>Value:</strong> Guarantees compliance with GAMP 5 and FDA electronic record regulations.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: COMMERCIAL VALUATIONS & CONSULTING */}
            {activeTab === 4 && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <DollarSign className="w-4 h-4" />
                  <span>Commercial Valuation & External Consulting Breakdown</span>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  What Would a Specialized Life Sciences Consulting Firm Charge?
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  Building a 21 CFR Part 11 compliant, deterministic CSR auto-drafter requires specialized cross-disciplinary expertise across regulatory affairs, CDISC data architecture, biostatistics, and constrained AI engineering.
                </p>

                {/* Consulting Cost Table */}
                <div className="rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.015] shadow-xl text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/[0.06] bg-white/[0.04] text-zinc-300 font-semibold">
                        <th className="p-3 pl-4">Project Phase & Deliverables</th>
                        <th className="p-3">Timeline</th>
                        <th className="p-3 text-right pr-4">Estimated Consulting Cost</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.03] text-[11.5px]">
                      <tr>
                        <td className="p-3 pl-4 font-medium text-white">1. Discovery, Regulatory Scoping & Architecture</td>
                        <td className="p-3 text-zinc-400">4–6 Weeks</td>
                        <td className="p-3 pr-4 text-right font-mono text-cyan-300 font-bold">$85,000 – $120,000</td>
                      </tr>
                      <tr>
                        <td className="p-3 pl-4 font-medium text-white">2. CDISC ADaM Ingestion & Fact Coordinate Engine</td>
                        <td className="p-3 text-zinc-400">6–8 Weeks</td>
                        <td className="p-3 pr-4 text-right font-mono text-cyan-300 font-bold">$140,000 – $195,000</td>
                      </tr>
                      <tr>
                        <td className="p-3 pl-4 font-medium text-white">3. Constrained LLM Drafter & Verification Overlay</td>
                        <td className="p-3 text-zinc-400">6–8 Weeks</td>
                        <td className="p-3 pr-4 text-right font-mono text-cyan-300 font-bold">$165,000 – $230,000</td>
                      </tr>
                      <tr>
                        <td className="p-3 pl-4 font-medium text-white">4. 21 CFR Part 11 Audit Ledger & E-Sign Suite</td>
                        <td className="p-3 text-zinc-400">4–6 Weeks</td>
                        <td className="p-3 pr-4 text-right font-mono text-cyan-300 font-bold">$130,000 – $180,000</td>
                      </tr>
                      <tr>
                        <td className="p-3 pl-4 font-medium text-white">5. eCTD Word Exporter & GAMP 5 Software Validation</td>
                        <td className="p-3 text-zinc-400">4–6 Weeks</td>
                        <td className="p-3 pr-4 text-right font-mono text-cyan-300 font-bold">$120,000 – $170,000</td>
                      </tr>
                      <tr className="bg-cyan-500/10 font-bold text-white">
                        <td className="p-3.5 pl-4">Total Enterprise Project Engagement</td>
                        <td className="p-3.5 text-cyan-300">24–34 Weeks</td>
                        <td className="p-3.5 pr-4 text-right font-mono text-cyan-400 text-sm">$640,000 – $895,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* ROI Highlight */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">Sponsor ROI Impact: </span>
                    Shaving just 30 days off CSR assembly saves a pharmaceutical sponsor <strong className="text-emerald-300">$30M to $150M</strong> in patent exclusivity runway.
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                </div>
              </div>
            )}

            {/* TAB 5: COLLEGE & RESUME STRATEGY */}
            {activeTab === 5 && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <GraduationCap className="w-4 h-4" />
                  <span>College Applications, Portfolio & Resume Differentiation</span>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  How This Project Sets You Apart From 99% of Applicants
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  Most student portfolios contain generic clone apps (to-do lists, simple chatbots, generic weather dashboards). Building a <strong className="text-cyan-300">21 CFR Part 11 compliant life sciences copilot</strong> demonstrates deep domain translation, deterministic AI architecture, and enterprise-grade regulatory rigor.
                </p>

                {/* Resume Bullet Points */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
                  <div className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Ready-to-Use Resume Bullet Points:
                  </div>
                  <ul className="space-y-2.5 text-xs text-zinc-300 list-disc list-inside leading-relaxed">
                    <li>
                      <strong className="text-white">Architected Deterministic AI Copilot for Clinical Trials:</strong> Built a specialized medical writing assistant for eCTD Module 5 CSRs adhering to ICH E3 guidelines, replacing manual transcription of CDISC ADaM datasets.
                    </li>
                    <li>
                      <strong className="text-white">Zero-Hallucination Citation Indexing Engine:</strong> Engineered a Tool-Augmented Generation (TAG) pipeline with a dynamic Fact Dictionary, binding narrative tokens to cell coordinates with bidirectional UI highlighting.
                    </li>
                    <li>
                      <strong className="text-white">21 CFR Part 11 Regulatory Compliance Suite:</strong> Implemented tamper-evident append-only audit ledgers, SHA-256 Merkle root verification, and electronic signature sign-offs for clinical document freezing.
                    </li>
                    <li>
                      <strong className="text-white">Full-Stack Production Exporter:</strong> Developed automated Microsoft Word (<code className="text-cyan-300">.docx</code>) generation engine with custom ICH numbered headings, confidential disclaimers, and bookmarks.
                    </li>
                  </ul>
                </div>

                {/* Interview Soundbite */}
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-200 space-y-1">
                  <div className="font-bold text-white">Interview Power Answer:</div>
                  <p className="italic text-[11.5px] leading-relaxed text-zinc-300">
                    "When building for regulated life sciences, off-the-shelf LLMs fail because floating-point hallucinations create federal compliance violations. I designed a deterministic fact-slot architecture where every emitted number is mathematically verified against source CDISC datasets before rendering."
                  </p>
                </div>
              </div>
            )}

            {/* TAB 6: AI VIBE-CODING PROMPTS RUNWAY */}
            {activeTab === 6 && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Code2 className="w-4 h-4" />
                  <span>AI Vibe-Coding Prompt Runway (from prompts.md)</span>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Step-by-Step Prompt Suite Used to Construct This Platform
                </h3>

                <p className="text-xs text-zinc-400">
                  Click any prompt block to view the full instruction prompt. Click the copy icon to copy the prompt to your clipboard.
                </p>

                <div className="space-y-3">
                  {promptRunway.map((p) => {
                    const isOpen = openPromptAccordions[p.id];
                    const isCopied = copiedIndex === p.id;
                    return (
                      <div
                        key={p.id}
                        className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all"
                      >
                        {/* Accordion Header */}
                        <div
                          onClick={() => toggleAccordion(p.id)}
                          className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/[0.03] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-bold">
                              {p.tier}
                            </span>
                            <span className="text-xs font-bold text-white">{p.title}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(p.promptText, p.id);
                              }}
                              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                                isCopied
                                  ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40'
                                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 ring-1 ring-white/10'
                              }`}
                              title="Copy prompt text"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy Prompt</span>
                                </>
                              )}
                            </button>

                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-zinc-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-zinc-400" />
                            )}
                          </div>
                        </div>

                        {/* Accordion Body */}
                        {isOpen && (
                          <div className="p-4 pt-0 border-t border-white/[0.04] bg-black/40">
                            <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-300 font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre-wrap border border-white/5">
                              {p.promptText}
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 7: FURTHER ENHANCEMENTS */}
            {activeTab === 7 && (
              <div className="space-y-6 max-w-4xl">
                <div className="flex items-center gap-2.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Production Roadmap & Future Enhancements</span>
                </div>

                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  High-Impact Expansion Vectors for Enterprise Submissions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="font-bold text-cyan-300 flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      <span>WebAssembly SAS Transport (.xpt) Parser</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      Compile high-performance C/Rust SAS XPORT parser to WASM for instantaneous, zero-latency binary dataset parsing directly inside the browser client without server upload overhead.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="font-bold text-blue-300 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span>Automated Statistical Analysis Plan (SAP) Mapper</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      Ingest the trial's SAP PDF and automatically configure statistical hypothesis rules, primary/secondary endpoints, and covariate adjustment formulas into the draft templates.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="font-bold text-indigo-300 flex items-center gap-2">
                      <Layers className="w-4 h-4" />
                      <span>Direct Veeva Vault & Lorenz docuBridge Connectors</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      Build enterprise REST API connectors to push generated CSR modules directly into Regulatory Information Management (RIM) systems and eCTD compilation dossiers.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">
                    <div className="font-bold text-emerald-300 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Multi-Agent Consensus & Red-Teaming Engine</span>
                    </div>
                    <p className="text-zinc-300 leading-relaxed text-[11.5px]">
                      Deploy a triumvirate of specialized AI agents (Medical Writer, Biostatistician, and Regulatory QA Auditor) that asynchronously review and cross-validate each sentence before final sign-off.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-3.5 border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between text-xs text-zinc-400 flex-shrink-0">
          <span>eCTD CSR Auto-Drafter • Advanced Pharmaceutical AI Architecture</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-all"
          >
            Close Deck
          </button>
        </div>

      </div>
    </div>
  );
};
