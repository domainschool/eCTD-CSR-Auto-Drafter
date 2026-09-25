# Prompt Implementation Playbook: eCTD CSR Auto-Drafter

---

## Tier 1: MVP 1 (Zero-Config UI, Local Mocks, Immediate State)

### Prompt 1.1: Project Shell, Split-Screen Workspace, and Core Layout

```markdown
You are an expert Frontend Architect. We are building the frontend prototype for "eCTD CSR Auto-Drafter", a specialized regulatory medical writing copilot for pharmaceutical clinical study reports.

Tech Stack:
- Next.js 14+ (App Router) or React + Vite
- Tailwind CSS
- Lucide React (Icons)
- shadcn/ui components (if available, otherwise pure Tailwind)

Requirements:
1. Create a full-height screen (`h-screen overflow-hidden`) with a top regulatory navigation bar:
   - Left: Product name "eCTD CSR Auto-Drafter", document title "Study XYZ-001 (Protocol: SBP-2024) - Phase III CSR", and badge "ICH E3 Module 5.3.5.1".
   - Right: Quick stats badge: "Population: Safety (N=400)", "Status: Draft Ready", and a secondary button "Export .docx".
2. Implement a split-pane container below the navbar (`50vw / 50vw`):
   - Left Panel ("Source Data & Analysis Tables"): A card container with a tabbed header ("Table 14.1: Demographics", "Table 14.2: Primary Efficacy", "Table 14.3: Adverse Events").
   - Right Panel ("ICH E3 Narrative Drafter"): A regulatory document editor container showing a section selector dropdown ("Section 10: Demographics & Disposition", "Section 11: Efficacy Evaluation", "Section 12: Safety Summary").
3. Make both panels independently scrollable (`overflow-y-auto`).
4. Apply clean clinical styling: neutral slate background (`bg-slate-50`), clean white card surfaces, subtle borders (`border-slate-200`), and monospace fonts for tabular data cells.

```

### Prompt 1.2: Synthetic Clinical Data Mocks & Fact Extraction Engine

```markdown
Implement the synthetic CDISC ADaM data layer and facts model directly in TypeScript/JavaScript mock files (no external libraries or APIs).

Requirements:
1. Create `src/mocks/clinicalData.ts` with two structured mock tables:
   - `DEMOGRAPHICS_TABLE_14_1`: Columns for `Parameter`, `Active Cohort (N=200)`, `Placebo Cohort (N=200)`, and `Total (N=400)`. Include rows for Age (Mean, SD), Sex (Male n/%, Female n/%), and Race (White, Black, Asian).
   - `EFFICACY_TABLE_14_2`: Columns for `Endpoint`, `Active (N=200)`, `Placebo (N=200)`, `Difference (95% CI)`, and `p-value`. Include rows for "Baseline SBP (mmHg)", "Week 12 SBP (mmHg)", "Change from Baseline (Mean, SD)", and "ANCOVA LS Mean Diff".
2. Create a structured Fact Dictionary `FACT_DICTIONARY`:
   - Map individual numbers to a unique identifier, cell coordinate, and raw value:
     * `fact_101`: { id: "fact_101", cellId: "demo-row-1-col-1", value: "54.2", label: "Active Mean Age", tableId: "14.1" }
     * `fact_102`: { id: "fact_102", cellId: "demo-row-1-col-2", value: "53.8", label: "Placebo Mean Age", tableId: "14.1" }
     * `fact_201`: { id: "fact_201", cellId: "eff-row-3-col-1", value: "-14.2", label: "Active SBP Mean Change", tableId: "14.2" }
     * `fact_202`: { id: "fact_202", cellId: "eff-row-3-col-2", value: "-4.1", label: "Placebo SBP Mean Change", tableId: "14.2" }
     * `fact_203`: { id: "fact_203", cellId: "eff-row-4-col-3", value: "-10.1 (-12.4, -7.8)", label: "LS Mean Diff 95% CI", tableId: "14.2" }
     * `fact_204`: { id: "fact_204", cellId: "eff-row-4-col-4", value: "<0.001", label: "Primary p-value", tableId: "14.2" }
3. Render the Left Panel table component using this data. Each table cell must have an `id` or `data-cell-id` corresponding to the coordinates specified in the dictionary.

```

### Prompt 1.3: Interactive Verification Linker & Narrative Renderer

```markdown
Implement the core interactive link between the narrative prose and the statistical data table using local React state.

Requirements:
1. Define a shared state in the parent view:
   - `activeFactId: string | null`
   - `highlightedCellId: string | null`
2. In the Right Panel, render a pre-written ICH E3 Section 11 narrative:
   - Embed custom interactive tokens `<FactCitation factId="fact_201" value="-14.2 mmHg" />`, `<FactCitation factId="fact_202" value="-4.1 mmHg" />`, `<FactCitation factId="fact_203" value="-10.1 mmHg (95% CI: -12.4, -7.8)" />`, and `<FactCitation factId="fact_204" value="p < 0.001" />`.
3. Style the `<FactCitation />` component:
   - Styled as a distinct inline chip: subtle blue background (`bg-blue-50 text-blue-700 font-medium px-1.5 py-0.5 rounded border border-blue-200 hover:bg-blue-100 cursor-pointer`).
   - On hover or click: Sets `activeFactId`, which triggers the Left Panel to find the matching `cellId`, smoothly scrolls it into view, and applies an animated highlight ring (`ring-2 ring-blue-500 bg-blue-100/50 transition-all duration-300`).
4. Reverse hover:
   - Hovering over any cell in the Left Panel should temporarily highlight the corresponding citation chip in the Right Panel narrative text.
5. Add a simple toggle button "Simulate Discrepancy":
   - When toggled, changes `fact_201` in the text to `-18.5 mmHg`. The citation chip turns amber/red (`bg-red-50 text-red-700 border-red-300`) with a warning tooltip: "Mismatch with Source Table 14.2: Expected -14.2".

```

---

## Tier 2: MVP 2 (Live API Routes, LLM Drafter, Async State & Streaming)

### Prompt 2.1: Server-Side Pipeline & Structured LLM Extraction

```markdown
Convert the prototype to use a live server-side architecture (Next.js Route Handlers `/api/draft` or FastAPI backend) integrated with an LLM provider (OpenAI or Gemini) using environment variables.

Requirements:
1. Set up an API endpoint `/api/generate-narrative` that accepts:
   - `sectionId`: string (e.g., "ICH_E3_SEC_11_EFFICACY")
   - `tableData`: JSON array of table rows and cells
   - `parameters`: { drugName: "CardioPax", indication: "Hypertension", primaryEndpoint: "Systolic Blood Pressure at Week 12" }
2. Create a system prompt enforcing the zero-hallucination regulatory slot-filling protocol:
   - The LLM must adopt the persona of an expert Senior Regulatory Medical Writer.
   - Inject the extracted fact dictionary as JSON in the system prompt.
   - Enforce the rule: "Every single numerical claim, percentage, sample size, or p-value MUST be wrapped in custom XML tags: `<cite factId='KEY'>VALUE</cite>`. Never alter the number found in the dictionary."
   - The output must follow the standard ICH E3 format for that section.
3. Validate and parse the LLM output on the server to ensure all emitted `factId` tags strictly exist in the provided dictionary. Return an HTTP 422 error if the model invents a numerical value without a matching fact identifier.

```

### Prompt 2.2: Async Streaming UI, Skeleton Loaders, and Error Boundaries

```markdown
Implement real-time streaming, loading states, and robust error handling in the frontend workspace.

Requirements:
1. Replace static text generation with an asynchronous streaming state using the Vercel AI SDK (`useCompletion` / `useChat`) or a custom Server-Sent Events (SSE) reader.
2. In the Right Panel:
   - Add a "Generate Draft with AI" action bar with model selector (e.g., "Claude 3.5 Sonnet / GPT-4o / Gemini 1.5 Pro") and a primary button "Auto-Draft Section".
   - When clicked, display a pulse skeleton loader reflecting regulatory document structure (paragraph lines, table skeletons, sub-headings).
   - Stream the response in real-time. As text streams in, parse the `<cite>` tags on-the-fly and hydrate them immediately into interactive, clickable `<FactCitation />` components.
3. Add a "Verification Progress Bar" that counts:
   - "Total facts claimed": e.g., 8
   - "Verified against source table": e.g., 8/8 (100% verified)
   - "Discrepancies found": 0
4. Implement an error fallback screen if the API key is missing or invalid, showing clear setup instructions for `.env.local` (`OPENAI_API_KEY` or `GEMINI_API_KEY`).

```

### Prompt 2.3: CSV/ADaM File Ingestion & Deterministic Fact Extractor

```markdown
Build a real client-side file upload and server-side statistical parser for CDISC ADaM datasets.

Requirements:
1. In the Left Panel, add a drag-and-drop file upload zone accepting `.csv` files (supporting typical CDISC formats: `ADSL.csv` or `ADEFF.csv`).
2. Provide two built-in downloadable/selectable synthetic presets:
   - "Load Synthetic ADSL (Demographics, N=400)"
   - "Load Synthetic ADEFF (Blood Pressure Efficacy, N=400)"
3. Write a server/worker calculation utility (in TypeScript or Python) that parses the uploaded CSV and programmatically computes:
   - Arm-specific counts: `N`, Mean, Standard Deviation, Median, Min, Max for numeric parameters (`AGE`, `BASE`, `CHG`).
   - Category frequency and percentages for discrete parameters (`SEX`, `RACE`).
   - Mean difference between arms and a student's $t$-test or simplified ANCOVA estimate.
4. Auto-generate the dynamic `FACT_DICTIONARY` and populate the Left Panel's tabular display from the ingested CSV file without any hardcoded mock dependencies.

```

---

## Tier 3: Enterprise Scale (Persistence, Auth, Visual Analytics & Compliance)

### Prompt 3.1: Supabase/PostgreSQL Persistence & 21 CFR Part 11 Audit Trail

```markdown
Integrate a persistent database layer using Supabase (or standard PostgreSQL + Prisma) to support multi-tenant study management and regulatory audit requirements.

Requirements:
1. Create a relational schema:
   - `studies`: `id`, `protocol_number`, `study_title`, `phase`, `created_at`
   - `clinical_datasets`: `id`, `study_id`, `dataset_name` (e.g., "ADSL"), `raw_data_json`, `uploaded_by`, `uploaded_at`
   - `csr_sections`: `id`, `study_id`, `section_number` (e.g., "11.1"), `title`, `content_markdown`, `status` ("Draft", "Under Review", "Approved")
   - `audit_logs` (Mandatory for 21 CFR Part 11 compliance):
     * Columns: `id`, `study_id`, `action` ("GENERATE_DRAFT", "EDIT_FACT", "MANUAL_OVERRIDE", "APPROVE_SECTION"), `user_id`, `timestamp`, `old_value`, `new_value`, `reason_for_change`.
     * This table must be append-only (no UPDATE or DELETE operations permitted).
2. Implement Next.js Middleware route guards:
   - Restrict access to routes `/study/[id]/*` to authenticated users with valid session tokens.
   - Enforce Role-Based Access Control (RBAC): "Medical Writer" (can draft/edit), "Biostatistician" (can upload data/validate facts), and "Regulatory Approver" (can approve/lock document).
3. Build an "Audit Trail Drawer" in the UI showing every change made to the report text and citations with ISO 8601 timestamps and user signatures.

```

### Prompt 3.2: Interactive Efficacy & Safety Analytics (Recharts Integration)

```markdown
Enhance the Left Panel with interactive data visualization dashboards using Recharts to mirror the "Figures" portion of clinical TLFs.

Requirements:
1. Add a view mode switch in the Left Panel: "Tabular View" | "Visual Figures".
2. Implement two regulatory clinical study figures:
   - Primary Efficacy Chart: A Forest Plot / Error Bar chart showing LS Mean Change in SBP from Baseline across Week 2, Week 4, Week 8, and Week 12 for Active vs. Placebo cohorts with 95% Confidence Interval whiskers.
   - Safety Summary Chart: A horizontal grouped bar chart showing Adverse Event Incidence (>5% threshold) categorized by MedDRA System Organ Class (Headache, Dizziness, Fatigue, Nausea).
3. Connect the charts to the central highlighting engine:
   - Hovering over an error bar or data point in Recharts triggers the identical `activeFactId` event, highlighting the corresponding paragraph sentence in the Right Panel's narrative text.
4. Provide an "Export SVG/PNG" utility for each chart configured with standard publication resolutions (300 DPI).

```

### Prompt 3.3: Production eCTD Document Exporter & Polished Enterprise UX

```markdown
Complete the enterprise-readiness suite with an eCTD-compliant Word export engine, unified theme system, and review workflow.

Requirements:
1. Build an eCTD-compliant Microsoft Word (`.docx`) exporter (using the `docx` npm library or a Python `python-docx` microservice):
   - Generates output matching strict regulatory typography: Times New Roman or Arial 10pt/12pt, 1-inch margins, standard ICH E3 numbered headings (e.g., "11.4.1 Primary Efficacy Results").
   - Embeds automated Word cross-references and XML bookmarks for all table citations and statistical figures.
   - Inserts headers and footers with confidential submission disclaimers, study protocol ID, pagination ("Page X of Y"), and eCTD module metadata.
2. Implement an Enterprise Theme Toggle:
   - Seamless switching between clean regulatory Light Mode (`bg-slate-50`, crisp contrast designed for 8-hour document review) and Dark Mode (`bg-slate-950`, slate-800 borders, high-contrast readable accents).
3. Build a "Review & Sign-Off" Modal:
   - Captures an electronic signature adhering to 21 CFR Part 11: Prompt for user re-authentication (password), printed name, timestamp, and "Meaning of Signature" dropdown ("I confirm the review and approval of this clinical study report section").
   - Freezes the section to read-only state upon successful signing.

```