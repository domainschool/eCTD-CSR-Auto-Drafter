# Implementation Guide: Executing the eCTD CSR Auto-Drafter Build

This guide provides the complete, self-contained reference code and step-by-step workflow required to execute the Prompt Playbook across Tier 1, Tier 2, and Tier 3 using AI coding assistants (such as Cursor, Claude Code, Lovable, or Windsurf).

---

## 1. End-to-End System Architecture

Before executing prompts, load this end-to-end architecture into your coding workspace (e.g., inside `.cursorrules` or `CLAUDE.md`) so your AI assistant understands the data flow and regulatory constraints:

```
┌────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND                                  │
│  Next.js 14+ (App Router) / React + Tailwind CSS / Lucide / Recharts   │
├───────────────────────────────────┬────────────────────────────────────┤
│            LEFT PANEL             │            RIGHT PANEL             │
│      Source Data & Figures        │      ICH E3 Narrative Drafter      │
│  - Tabular View (ADSL / ADEFF)    │  - Section Selector (Sec 10/11/12) │
│  - Recharts (Forest / AE Plots)   │  - Streaming Draft Engine          │
│  - Cell Coordinates & Hovers      │  - Bidirectional <FactCitation />  │
│  - Discrepancy Indicator          │  - Audit Signature & .docx Export  │
└─────────────────▲─────────────────┴─────────────────▲──────────────────┘
                  │                                   │
                  │ Context / Actions                 │ SSE Stream / Mutations
                  ▼                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         BACKEND ROUTE HANDLERS                         │
│                           Next.js API Routes                           │
├───────────────────────────────────┬────────────────────────────────────┤
│     /api/ingest & /api/facts      │             /api/draft             │
│  - CSV Parser (ADaM Standards)    │  - Constrained System Prompt       │
│  - Statistical Math Engine        │  - Fact-Slot Filling Guardrails    │
│  - Dynamic Fact Dictionary Builder│  - Fact Validation Checksum        │
└─────────────────▲─────────────────┴─────────────────▲──────────────────┘
                  │                                   │
                  ▼                                   ▼
┌───────────────────────────────────┬────────────────────────────────────┐
│      SUPABASE / POSTGRES DB       │       EXTERNAL LLM PROVIDER        │
│  - Studies & Datasets             │  - Anthropic / OpenAI / Gemini     │
│  - CSR Sections & Revisions       │  - Strict Citation Tagging         │
│  - 21 CFR Part 11 Audit Trail     │  - Zero Unmapped Floats            │
└───────────────────────────────────┴────────────────────────────────────┘

```

---

## 2. Tier 1: MVP 1 Foundation Code

Use the code below as the primary reference when running **Prompt 1.1**, **Prompt 1.2**, and **Prompt 1.3**.

### File: `src/mocks/clinicalData.ts`

```typescript
export interface FactItem {
  id: string;
  cellId: string;
  value: string;
  label: string;
  tableId: string;
}

export interface TableRow {
  parameter: string;
  active: string;
  placebo: string;
  totalOrDiff: string;
  pValue?: string;
  cellIds: {
    active: string;
    placebo: string;
    totalOrDiff: string;
    pValue?: string;
  };
}

export const DEMOGRAPHICS_TABLE_14_1: TableRow[] = [
  {
    parameter: "Age (Years) - Mean (SD)",
    active: "54.2 (8.4)",
    placebo: "53.8 (8.1)",
    totalOrDiff: "54.0 (8.2)",
    cellIds: {
      active: "demo-row-1-col-1",
      placebo: "demo-row-1-col-2",
      totalOrDiff: "demo-row-1-col-3"
    }
  },
  {
    parameter: "Sex - Male: n (%)",
    active: "108 (54.0%)",
    placebo: "104 (52.0%)",
    totalOrDiff: "212 (53.0%)",
    cellIds: {
      active: "demo-row-2-col-1",
      placebo: "demo-row-2-col-2",
      totalOrDiff: "demo-row-2-col-3"
    }
  },
  {
    parameter: "Sex - Female: n (%)",
    active: "92 (46.0%)",
    placebo: "96 (48.0%)",
    totalOrDiff: "188 (47.0%)",
    cellIds: {
      active: "demo-row-3-col-1",
      placebo: "demo-row-3-col-2",
      totalOrDiff: "demo-row-3-col-3"
    }
  }
];

export const EFFICACY_TABLE_14_2: TableRow[] = [
  {
    parameter: "Baseline Sitting SBP (mmHg) - Mean (SD)",
    active: "156.4 (9.1)",
    placebo: "155.9 (8.8)",
    totalOrDiff: "0.5 (-1.2, 2.2)",
    pValue: "0.582",
    cellIds: {
      active: "eff-row-1-col-1",
      placebo: "eff-row-1-col-2",
      totalOrDiff: "eff-row-1-col-3",
      pValue: "eff-row-1-col-4"
    }
  },
  {
    parameter: "Week 12 Sitting SBP (mmHg) - Mean (SD)",
    active: "142.2 (8.2)",
    placebo: "151.8 (8.9)",
    totalOrDiff: "-9.6 (-11.2, -7.9)",
    pValue: "<0.001",
    cellIds: {
      active: "eff-row-2-col-1",
      placebo: "eff-row-2-col-2",
      totalOrDiff: "eff-row-2-col-3",
      pValue: "eff-row-2-col-4"
    }
  },
  {
    parameter: "Change from Baseline at Wk 12 - Mean (SD)",
    active: "-14.2 (6.1)",
    placebo: "-4.1 (5.4)",
    totalOrDiff: "-10.1 (-12.4, -7.8)",
    pValue: "<0.001",
    cellIds: {
      active: "eff-row-3-col-1",
      placebo: "eff-row-3-col-2",
      totalOrDiff: "eff-row-3-col-3",
      pValue: "eff-row-3-col-4"
    }
  },
  {
    parameter: "ANCOVA LS Mean Difference vs Placebo",
    active: "--",
    placebo: "--",
    totalOrDiff: "-10.1 (-12.4, -7.8)",
    pValue: "<0.001",
    cellIds: {
      active: "eff-row-4-col-1",
      placebo: "eff-row-4-col-2",
      totalOrDiff: "eff-row-4-col-3",
      pValue: "eff-row-4-col-4"
    }
  }
];

export const FACT_DICTIONARY: Record<string, FactItem> = {
  fact_101: { id: "fact_101", cellId: "demo-row-1-col-1", value: "54.2", label: "Active Mean Age", tableId: "14.1" },
  fact_102: { id: "fact_102", cellId: "demo-row-1-col-2", value: "53.8", label: "Placebo Mean Age", tableId: "14.1" },
  fact_201: { id: "fact_201", cellId: "eff-row-3-col-1", value: "-14.2", label: "Active SBP Mean Change", tableId: "14.2" },
  fact_202: { id: "fact_202", cellId: "eff-row-3-col-2", value: "-4.1", label: "Placebo SBP Mean Change", tableId: "14.2" },
  fact_203: { id: "fact_203", cellId: "eff-row-3-col-3", value: "-10.1 (-12.4, -7.8)", label: "LS Mean Diff (95% CI)", tableId: "14.2" },
  fact_204: { id: "fact_204", cellId: "eff-row-3-col-4", value: "<0.001", label: "Primary p-value", tableId: "14.2" }
};

```

### File: `src/components/FactCitation.tsx`

```tsx
import React from 'react';
import { FACT_DICTIONARY } from '../mocks/clinicalData';

interface FactCitationProps {
  factId: string;
  displayValue: string;
  activeFactId: string | null;
  onHover: (factId: string | null) => void;
  isDiscrepancy?: boolean;
}

export const FactCitation: React.FC<FactCitationProps> = ({
  factId,
  displayValue,
  activeFactId,
  onHover,
  isDiscrepancy = false
}) => {
  const fact = FACT_DICTIONARY[factId];
  const isSelected = activeFactId === factId;

  if (isDiscrepancy) {
    return (
      <span
        onMouseEnter={() => onHover(factId)}
        onMouseLeave={() => onHover(null)}
        className="group relative inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded text-xs font-semibold font-mono bg-red-100 text-red-800 border border-red-300 cursor-pointer animate-pulse"
      >
        {displayValue}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col z-50 w-52 p-2 bg-slate-900 text-white rounded text-[11px] shadow-lg pointer-events-none">
          <span className="text-red-400 font-bold">Data Discrepancy</span>
          <span>Source ({fact?.tableId}): Expected {fact?.value}</span>
        </span>
      </span>
    );
  }

  return (
    <span
      onMouseEnter={() => onHover(factId)}
      onMouseLeave={() => onHover(null)}
      className={`group relative inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded text-xs font-semibold font-mono cursor-pointer transition-all duration-150 ${
        isSelected
          ? 'bg-blue-600 text-white ring-2 ring-blue-400 shadow-sm'
          : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
      }`}
    >
      {displayValue}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col z-50 w-48 p-2 bg-slate-900 text-white rounded text-[11px] shadow-lg pointer-events-none">
        <span className="text-blue-300 font-bold">{fact?.label}</span>
        <span>Table {fact?.tableId} | Cell: {fact?.cellId}</span>
      </span>
    </span>
  );
};

```

---

## 3. Tier 2: MVP 2 Server-Side Logic

Use this implementation pattern for **Prompt 2.1** and **Prompt 2.2** to implement constrained drafting without hallucination.

### File: `app/api/generate-narrative/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { sectionId, factDictionary, metadata } = await req.json();

    if (!factDictionary || Object.keys(factDictionary).length === 0) {
      return NextResponse.json({ error: "Missing validated fact dictionary" }, { status: 400 });
    }

    const systemPrompt = `
You are an expert Senior Regulatory Medical Writer drafting Clinical Study Reports (CSR) conforming to ICH E3 guidelines.
Your job is to draft Section 11 (Efficacy Evaluation) for Study ${metadata?.protocolId || "XYZ-001"}.

CRITICAL MANDATORY RULES:
1. Every statistical number, percentage, change score, or p-value MUST be wrapped in: <cite factId="KEY">EXACT_VALUE</cite>.
2. You must ONLY use fact keys present in the provided FACT DICTIONARY.
3. NEVER calculate, extrapolate, round differently, or invent any number.
4. Tone must be formal, objective, passive voice, regulatory medical writing style.

FACT DICTIONARY:
${JSON.stringify(factDictionary, null, 2)}
`;

    // Example calling external LLM (e.g., Anthropic Claude or OpenAI)
    // Replace with standard client call:
    const promptPayload = {
      prompt: `Write Section 11.4.1 (Primary Efficacy Analysis) summarizing change in systolic blood pressure at Week 12.`,
      systemPrompt
    };

    // Simulated compliant deterministic generation stream or response:
    const draftedProse = `
### 11.4.1 Primary Efficacy Results: Systolic Blood Pressure at Week 12

In the primary efficacy population (N=400), baseline sitting systolic blood pressure (SBP) was well balanced across cohorts. At Week 12, patients receiving ${metadata?.drugName || "CardioPax"} demonstrated a statistically significant and clinically meaningful reduction in sitting SBP.

The mean change from baseline at Week 12 was <cite factId="fact_201">-14.2</cite> mmHg in the active cohort compared with <cite factId="fact_202">-4.1</cite> mmHg in the placebo cohort. The ANCOVA least-squares mean difference between active treatment and placebo was <cite factId="fact_203">-10.1 (-12.4, -7.8)</cite> mmHg, confirming superiority of active therapy over placebo (<cite factId="fact_204"><0.001</cite>).
`;

    // Server-side checksum audit: Verify all emitted factIds exist in the dictionary
    const extractedCitations = [...draftedProse.matchAll(/<cite factId="([^"]+)">([^<]+)<\/cite>/g)];
    for (const [, factId, value] of extractedCitations) {
      if (!factDictionary[factId]) {
        return NextResponse.json(
          { error: `Validation failure: Hallucinated factId "${factId}"` },
          { status: 422 }
        );
      }
      if (factDictionary[factId].value !== value.trim()) {
        return NextResponse.json(
          { error: `Validation failure: Value mismatch for "${factId}". Expected "${factDictionary[factId].value}", received "${value}"` },
          { status: 422 }
        );
      }
    }

    return NextResponse.json({
      sectionId,
      markdown: draftedProse,
      verifiedFactsCount: extractedCitations.length,
      auditPassed: true
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

```

---

## 4. Tier 3: Enterprise Database Schema & Validation

Use this SQL schema when executing **Prompt 3.1** to guarantee 21 CFR Part 11 compliant audit logging in PostgreSQL / Supabase.

### Schema: `supabase/migrations/20260925_ectd_core.sql`

```sql
-- Core Study Protocol Registry
CREATE TABLE studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocol_number TEXT NOT NULL UNIQUE,
    study_title TEXT NOT NULL,
    phase TEXT NOT NULL CHECK (phase IN ('Phase I', 'Phase II', 'Phase III', 'Phase IV')),
    indication TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Uploaded & Parsed Clinical Datasets (ADaM)
CREATE TABLE clinical_datasets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
    dataset_name TEXT NOT NULL CHECK (dataset_name IN ('ADSL', 'ADEFF', 'ADAE', 'ADLB')),
    raw_data JSONB NOT NULL,
    computed_facts JSONB NOT NULL,
    uploaded_by UUID NOT NULL,
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- CSR Sections & Review Workflow
CREATE TABLE csr_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID NOT NULL REFERENCES studies(id) ON DELETE CASCADE,
    section_number TEXT NOT NULL,
    section_title TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'In Review', 'Approved', 'Locked')),
    last_modified_by UUID NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 21 CFR Part 11 Mandatory Immutable Audit Trail
-- Under FDA rules, this table MUST NEVER ALLOW UPDATE OR DELETE operations.
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID NOT NULL REFERENCES studies(id),
    section_id UUID REFERENCES csr_sections(id),
    action TEXT NOT NULL CHECK (action IN (
        'DATASET_INGESTED',
        'DRAFT_GENERATED',
        'CITATION_CLICKED',
        'PROSE_MANUALLY_EDITED',
        'DISCREPANCY_FLAGGED',
        'SECTION_ELECTRONICALLY_SIGNED'
    )),
    user_id UUID NOT NULL,
    user_email TEXT NOT NULL,
    user_role TEXT NOT NULL CHECK (user_role IN ('MedicalWriter', 'Biostatistician', 'RegulatoryLead')),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    previous_state JSONB,
    new_state JSONB,
    electronic_signature_meaning TEXT
);

-- Revoke mutation rights on audit_logs to preserve regulatory integrity
CREATE RULE no_update_audit AS ON UPDATE TO audit_logs DO INSTEAD NOTHING;
CREATE RULE no_delete_audit AS ON DELETE TO audit_logs DO INSTEAD NOTHING;

```

---

## 5. Step-by-Step Prompt Execution Sequence

Feed these prompts sequentially into your AI builder workspace. After each step, verify the deliverable against the checklist before moving forward.

| Tier | Prompt | Target Deliverable | Verification Checklist |
| --- | --- | --- | --- |
| **Tier 1** | **Prompt 1.1** | Shell, split-screen container, navigation bar | Both panels independently scroll; clinical styling applied; layout matches 50vw split. |
| **Tier 1** | **Prompt 1.2** | `clinicalData.ts` mock file and Left Panel tables | Tables render with cell IDs matching coordinate strings in `FACT_DICTIONARY`. |
| **Tier 1** | **Prompt 1.3** | Interactive `<FactCitation/>` and highlight sync | Hovering on text highlights table cells; hovering on cells highlights text; discrepancy toggle turns chip red. |
| **Tier 2** | **Prompt 2.1** | `/api/generate-narrative` Route Handler | API accepts facts JSON and returns text with `<cite>` tags; rejects hallucinated fact keys with HTTP 422. |
| **Tier 2** | **Prompt 2.2** | Real-time streaming & Verification Progress bar | Text streams with skeleton loader; citations hydrate dynamically; progress bar shows 100% verified. |
| **Tier 2** | **Prompt 2.3** | Drag-and-drop CSV parser | Ingesting synthetic `ADEFF.csv` calculates mean change and updates Left Panel dynamically without mock files. |
| **Tier 3** | **Prompt 3.1** | Supabase database and 21 CFR Part 11 schema | Tables created; audit log entries recorded on every generation; update/delete operations blocked on logs. |
| **Tier 3** | **Prompt 3.2** | Recharts Forest Plot & AE Figures | Efficacy chart displays 95% CI whiskers; hovering over data points highlights corresponding narrative text. |
| **Tier 3** | **Prompt 3.3** | eCTD Word `.docx` Exporter & Sign-Off modal | Document exports with correct ICH headings and bookmarks; e-signature modal locks section to read-only. |