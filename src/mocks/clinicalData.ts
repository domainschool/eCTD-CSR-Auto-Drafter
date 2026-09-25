import { ClinicalTable, FactItem, EfficacyVisitData, SafetyEventData, StudyMetadata, AuditLogEntry } from '../types';

export const INITIAL_STUDY_METADATA: StudyMetadata = {
  protocolId: "Study XYZ-001",
  protocolNumber: "SBP-2024-PH3",
  studyTitle: "A 12-Week, Double-Blind, Randomized, Placebo-Controlled Phase III Study Evaluating CardioPax in Stage 2 Essential Hypertension",
  phase: "Phase III",
  indication: "Stage 2 Essential Hypertension",
  drugName: "CardioPax (20 mg QD)",
  comparator: "Matching Placebo",
  safetyPopulationN: 400,
  status: "Draft Ready",
  ectdModule: "ICH E3 Module 5.3.5.1",
  sponsor: "Aethelgard BioTherapeutics Inc.",
};

export const CLINICAL_TABLES: ClinicalTable[] = [
  {
    id: "table_14_1",
    number: "14.1",
    title: "Demographic and Baseline Characteristics",
    datasetName: "ADSL",
    population: "Safety Population (N=400)",
    rows: [
      {
        parameter: "Age (Years) - Mean (SD)",
        active: "54.2 (8.4)",
        placebo: "53.8 (8.1)",
        totalOrDiff: "54.0 (8.2)",
        pValue: "0.624",
        cellIds: {
          active: "demo-row-1-col-1",
          placebo: "demo-row-1-col-2",
          totalOrDiff: "demo-row-1-col-3",
          pValue: "demo-row-1-col-4"
        }
      },
      {
        parameter: "Age >= 65 Years: n (%)",
        active: "48 (24.0%)",
        placebo: "44 (22.0%)",
        totalOrDiff: "92 (23.0%)",
        pValue: "0.635",
        cellIds: {
          active: "demo-row-2-col-1",
          placebo: "demo-row-2-col-2",
          totalOrDiff: "demo-row-2-col-3",
          pValue: "demo-row-2-col-4"
        }
      },
      {
        parameter: "Sex - Male: n (%)",
        active: "108 (54.0%)",
        placebo: "104 (52.0%)",
        totalOrDiff: "212 (53.0%)",
        pValue: "0.689",
        cellIds: {
          active: "demo-row-3-col-1",
          placebo: "demo-row-3-col-2",
          totalOrDiff: "demo-row-3-col-3",
          pValue: "demo-row-3-col-4"
        }
      },
      {
        parameter: "Sex - Female: n (%)",
        active: "92 (46.0%)",
        placebo: "96 (48.0%)",
        totalOrDiff: "188 (47.0%)",
        pValue: "0.689",
        cellIds: {
          active: "demo-row-4-col-1",
          placebo: "demo-row-4-col-2",
          totalOrDiff: "demo-row-4-col-3",
          pValue: "demo-row-4-col-4"
        }
      },
      {
        parameter: "Race - White: n (%)",
        active: "142 (71.0%)",
        placebo: "140 (70.0%)",
        totalOrDiff: "282 (70.5%)",
        pValue: "0.828",
        cellIds: {
          active: "demo-row-5-col-1",
          placebo: "demo-row-5-col-2",
          totalOrDiff: "demo-row-5-col-3",
          pValue: "demo-row-5-col-4"
        }
      },
      {
        parameter: "Race - Black / African American: n (%)",
        active: "38 (19.0%)",
        placebo: "40 (20.0%)",
        totalOrDiff: "78 (19.5%)",
        pValue: "0.801",
        cellIds: {
          active: "demo-row-6-col-1",
          placebo: "demo-row-6-col-2",
          totalOrDiff: "demo-row-6-col-3",
          pValue: "demo-row-6-col-4"
        }
      },
      {
        parameter: "Race - Asian / Other: n (%)",
        active: "20 (10.0%)",
        placebo: "20 (10.0%)",
        totalOrDiff: "40 (10.0%)",
        pValue: "1.000",
        cellIds: {
          active: "demo-row-7-col-1",
          placebo: "demo-row-7-col-2",
          totalOrDiff: "demo-row-7-col-3",
          pValue: "demo-row-7-col-4"
        }
      },
      {
        parameter: "Baseline BMI (kg/m²) - Mean (SD)",
        active: "28.6 (3.9)",
        placebo: "28.4 (4.1)",
        totalOrDiff: "28.5 (4.0)",
        pValue: "0.612",
        cellIds: {
          active: "demo-row-8-col-1",
          placebo: "demo-row-8-col-2",
          totalOrDiff: "demo-row-8-col-3",
          pValue: "demo-row-8-col-4"
        }
      }
    ]
  },
  {
    id: "table_14_2",
    number: "14.2",
    title: "Primary & Key Secondary Efficacy: Sitting Blood Pressure",
    datasetName: "ADEFF",
    population: "Full Analysis Set / ITT (N=400)",
    rows: [
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
        parameter: "Week 4 Sitting SBP (mmHg) - Mean (SD)",
        active: "148.1 (8.6)",
        placebo: "153.7 (8.4)",
        totalOrDiff: "-5.6 (-7.3, -3.9)",
        pValue: "<0.001",
        cellIds: {
          active: "eff-row-2-col-1",
          placebo: "eff-row-2-col-2",
          totalOrDiff: "eff-row-2-col-3",
          pValue: "eff-row-2-col-4"
        }
      },
      {
        parameter: "Week 8 Sitting SBP (mmHg) - Mean (SD)",
        active: "144.5 (8.0)",
        placebo: "152.4 (8.7)",
        totalOrDiff: "-7.9 (-9.5, -6.3)",
        pValue: "<0.001",
        cellIds: {
          active: "eff-row-3-col-1",
          placebo: "eff-row-3-col-2",
          totalOrDiff: "eff-row-3-col-3",
          pValue: "eff-row-3-col-4"
        }
      },
      {
        parameter: "Week 12 Sitting SBP (mmHg) - Mean (SD)",
        active: "142.2 (8.2)",
        placebo: "151.8 (8.9)",
        totalOrDiff: "-9.6 (-11.2, -7.9)",
        pValue: "<0.001",
        cellIds: {
          active: "eff-row-4-col-1",
          placebo: "eff-row-4-col-2",
          totalOrDiff: "eff-row-4-col-3",
          pValue: "eff-row-4-col-4"
        }
      },
      {
        parameter: "Change from Baseline at Wk 12 - Mean (SD)",
        active: "-14.2 (6.1)",
        placebo: "-4.1 (5.4)",
        totalOrDiff: "-10.1 (-12.4, -7.8)",
        pValue: "<0.001",
        cellIds: {
          active: "eff-row-5-col-1",
          placebo: "eff-row-5-col-2",
          totalOrDiff: "eff-row-5-col-3",
          pValue: "eff-row-5-col-4"
        }
      },
      {
        parameter: "ANCOVA LS Mean Difference vs Placebo",
        active: "--",
        placebo: "--",
        totalOrDiff: "-10.1 (-12.4, -7.8)",
        pValue: "<0.001",
        cellIds: {
          active: "eff-row-6-col-1",
          placebo: "eff-row-6-col-2",
          totalOrDiff: "eff-row-6-col-3",
          pValue: "eff-row-6-col-4"
        }
      },
      {
        parameter: "SBP Responders (<130 mmHg at Wk 12): n (%)",
        active: "136 (68.0%)",
        placebo: "44 (22.0%)",
        totalOrDiff: "+46.0% (36.8, 55.2)",
        pValue: "<0.001",
        cellIds: {
          active: "eff-row-7-col-1",
          placebo: "eff-row-7-col-2",
          totalOrDiff: "eff-row-7-col-3",
          pValue: "eff-row-7-col-4"
        }
      }
    ]
  },
  {
    id: "table_14_3",
    number: "14.3",
    title: "Overall Summary of Treatment-Emergent Adverse Events (TEAEs)",
    datasetName: "ADAE",
    population: "Safety Population (N=400)",
    rows: [
      {
        parameter: "Subjects with >= 1 TEAE: n (%)",
        active: "64 (32.0%)",
        placebo: "58 (29.0%)",
        totalOrDiff: "122 (30.5%)",
        pValue: "0.518",
        cellIds: {
          active: "ae-row-1-col-1",
          placebo: "ae-row-1-col-2",
          totalOrDiff: "ae-row-1-col-3",
          pValue: "ae-row-1-col-4"
        }
      },
      {
        parameter: "Treatment-Related TEAEs: n (%)",
        active: "28 (14.0%)",
        placebo: "18 (9.0%)",
        totalOrDiff: "46 (11.5%)",
        pValue: "0.117",
        cellIds: {
          active: "ae-row-2-col-1",
          placebo: "ae-row-2-col-2",
          totalOrDiff: "ae-row-2-col-3",
          pValue: "ae-row-2-col-4"
        }
      },
      {
        parameter: "Serious Adverse Events (SAE): n (%)",
        active: "2 (1.0%)",
        placebo: "3 (1.5%)",
        totalOrDiff: "5 (1.3%)",
        pValue: "1.000",
        cellIds: {
          active: "ae-row-3-col-1",
          placebo: "ae-row-3-col-2",
          totalOrDiff: "ae-row-3-col-3",
          pValue: "ae-row-3-col-4"
        }
      },
      {
        parameter: "Discontinuations Due to AEs: n (%)",
        active: "4 (2.0%)",
        placebo: "3 (1.5%)",
        totalOrDiff: "7 (1.8%)",
        pValue: "1.000",
        cellIds: {
          active: "ae-row-4-col-1",
          placebo: "ae-row-4-col-2",
          totalOrDiff: "ae-row-4-col-3",
          pValue: "ae-row-4-col-4"
        }
      },
      {
        parameter: "MedDRA: Headache: n (%)",
        active: "22 (11.0%)",
        placebo: "19 (9.5%)",
        totalOrDiff: "41 (10.3%)",
        pValue: "0.621",
        cellIds: {
          active: "ae-row-5-col-1",
          placebo: "ae-row-5-col-2",
          totalOrDiff: "ae-row-5-col-3",
          pValue: "ae-row-5-col-4"
        }
      },
      {
        parameter: "MedDRA: Dizziness: n (%)",
        active: "16 (8.0%)",
        placebo: "8 (4.0%)",
        totalOrDiff: "24 (6.0%)",
        pValue: "0.089",
        cellIds: {
          active: "ae-row-6-col-1",
          placebo: "ae-row-6-col-2",
          totalOrDiff: "ae-row-6-col-3",
          pValue: "ae-row-6-col-4"
        }
      },
      {
        parameter: "MedDRA: Fatigue: n (%)",
        active: "12 (6.0%)",
        placebo: "10 (5.0%)",
        totalOrDiff: "22 (5.5%)",
        pValue: "0.658",
        cellIds: {
          active: "ae-row-7-col-1",
          placebo: "ae-row-7-col-2",
          totalOrDiff: "ae-row-7-col-3",
          pValue: "ae-row-7-col-4"
        }
      },
      {
        parameter: "MedDRA: Nausea: n (%)",
        active: "8 (4.0%)",
        placebo: "7 (3.5%)",
        totalOrDiff: "15 (3.8%)",
        pValue: "0.793",
        cellIds: {
          active: "ae-row-8-col-1",
          placebo: "ae-row-8-col-2",
          totalOrDiff: "ae-row-8-col-3",
          pValue: "ae-row-8-col-4"
        }
      }
    ]
  }
];

export const FACT_DICTIONARY: Record<string, FactItem> = {
  // Demographics Facts (100 Series)
  fact_101: { id: "fact_101", cellId: "demo-row-1-col-1", value: "54.2", label: "Active Mean Age", tableId: "14.1", tableTitle: "Demographics & Baseline" },
  fact_102: { id: "fact_102", cellId: "demo-row-1-col-2", value: "53.8", label: "Placebo Mean Age", tableId: "14.1", tableTitle: "Demographics & Baseline" },
  fact_103: { id: "fact_103", cellId: "demo-row-1-col-3", value: "54.0 (8.2)", label: "Total Mean Age (SD)", tableId: "14.1", tableTitle: "Demographics & Baseline" },
  fact_104: { id: "fact_104", cellId: "demo-row-3-col-1", value: "108 (54.0%)", label: "Active Male Count/Pct", tableId: "14.1", tableTitle: "Demographics & Baseline" },
  fact_105: { id: "fact_105", cellId: "demo-row-3-col-2", value: "104 (52.0%)", label: "Placebo Male Count/Pct", tableId: "14.1", tableTitle: "Demographics & Baseline" },
  fact_106: { id: "fact_106", cellId: "demo-row-4-col-1", value: "92 (46.0%)", label: "Active Female Count/Pct", tableId: "14.1", tableTitle: "Demographics & Baseline" },
  fact_107: { id: "fact_107", cellId: "demo-row-4-col-2", value: "96 (48.0%)", label: "Placebo Female Count/Pct", tableId: "14.1", tableTitle: "Demographics & Baseline" },
  fact_108: { id: "fact_108", cellId: "demo-row-5-col-3", value: "282 (70.5%)", label: "White Total Count/Pct", tableId: "14.1", tableTitle: "Demographics & Baseline" },
  fact_109: { id: "fact_109", cellId: "demo-row-6-col-3", value: "78 (19.5%)", label: "Black Total Count/Pct", tableId: "14.1", tableTitle: "Demographics & Baseline" },
  fact_110: { id: "fact_110", cellId: "demo-row-8-col-3", value: "28.5 (4.0)", label: "Total Mean Baseline BMI", tableId: "14.1", tableTitle: "Demographics & Baseline" },

  // Efficacy Facts (200 Series)
  fact_201: { id: "fact_201", cellId: "eff-row-5-col-1", value: "-14.2", label: "Active SBP Mean Change", tableId: "14.2", tableTitle: "Primary Efficacy" },
  fact_202: { id: "fact_202", cellId: "eff-row-5-col-2", value: "-4.1", label: "Placebo SBP Mean Change", tableId: "14.2", tableTitle: "Primary Efficacy" },
  fact_203: { id: "fact_203", cellId: "eff-row-6-col-3", value: "-10.1 (-12.4, -7.8)", label: "ANCOVA LS Mean Diff (95% CI)", tableId: "14.2", tableTitle: "Primary Efficacy" },
  fact_204: { id: "fact_204", cellId: "eff-row-6-col-4", value: "<0.001", label: "Primary ANCOVA p-value", tableId: "14.2", tableTitle: "Primary Efficacy" },
  fact_205: { id: "fact_205", cellId: "eff-row-1-col-1", value: "156.4", label: "Active Baseline SBP", tableId: "14.2", tableTitle: "Primary Efficacy" },
  fact_206: { id: "fact_206", cellId: "eff-row-1-col-2", value: "155.9", label: "Placebo Baseline SBP", tableId: "14.2", tableTitle: "Primary Efficacy" },
  fact_207: { id: "fact_207", cellId: "eff-row-4-col-1", value: "142.2", label: "Active Wk 12 SBP", tableId: "14.2", tableTitle: "Primary Efficacy" },
  fact_208: { id: "fact_208", cellId: "eff-row-4-col-2", value: "151.8", label: "Placebo Wk 12 SBP", tableId: "14.2", tableTitle: "Primary Efficacy" },
  fact_209: { id: "fact_209", cellId: "eff-row-7-col-1", value: "136 (68.0%)", label: "Active SBP Responders", tableId: "14.2", tableTitle: "Primary Efficacy" },
  fact_210: { id: "fact_210", cellId: "eff-row-7-col-2", value: "44 (22.0%)", label: "Placebo SBP Responders", tableId: "14.2", tableTitle: "Primary Efficacy" },

  // Safety Adverse Event Facts (300 Series)
  fact_301: { id: "fact_301", cellId: "ae-row-1-col-1", value: "64 (32.0%)", label: "Active Overall TEAEs", tableId: "14.3", tableTitle: "Adverse Events" },
  fact_302: { id: "fact_302", cellId: "ae-row-1-col-2", value: "58 (29.0%)", label: "Placebo Overall TEAEs", tableId: "14.3", tableTitle: "Adverse Events" },
  fact_303: { id: "fact_303", cellId: "ae-row-2-col-1", value: "28 (14.0%)", label: "Active Drug-Related TEAEs", tableId: "14.3", tableTitle: "Adverse Events" },
  fact_304: { id: "fact_304", cellId: "ae-row-2-col-2", value: "18 (9.0%)", label: "Placebo Drug-Related TEAEs", tableId: "14.3", tableTitle: "Adverse Events" },
  fact_305: { id: "fact_305", cellId: "ae-row-3-col-1", value: "2 (1.0%)", label: "Active Serious AEs (SAE)", tableId: "14.3", tableTitle: "Adverse Events" },
  fact_306: { id: "fact_306", cellId: "ae-row-3-col-2", value: "3 (1.5%)", label: "Placebo Serious AEs (SAE)", tableId: "14.3", tableTitle: "Adverse Events" },
  fact_307: { id: "fact_307", cellId: "ae-row-4-col-1", value: "4 (2.0%)", label: "Active Discontinuation due to AE", tableId: "14.3", tableTitle: "Adverse Events" },
  fact_308: { id: "fact_308", cellId: "ae-row-5-col-1", value: "22 (11.0%)", label: "Active Headache Incidence", tableId: "14.3", tableTitle: "Adverse Events" },
  fact_309: { id: "fact_309", cellId: "ae-row-5-col-2", value: "19 (9.5%)", label: "Placebo Headache Incidence", tableId: "14.3", tableTitle: "Adverse Events" },
  fact_310: { id: "fact_310", cellId: "ae-row-6-col-1", value: "16 (8.0%)", label: "Active Dizziness Incidence", tableId: "14.3", tableTitle: "Adverse Events" },
};

export const EFFICACY_FOREST_DATA: EfficacyVisitData[] = [
  {
    visit: "Week 2",
    week: 2,
    activeMean: -6.4,
    activeCiLow: -7.8,
    activeCiHigh: -5.0,
    placeboMean: -2.1,
    placeboCiLow: -3.2,
    placeboCiHigh: -1.0,
    diffMean: -4.3,
    diffCiLow: -5.9,
    diffCiHigh: -2.7,
    pValue: "<0.001",
    factId: "fact_201"
  },
  {
    visit: "Week 4",
    week: 4,
    activeMean: -9.8,
    activeCiLow: -11.2,
    activeCiHigh: -8.4,
    placeboMean: -2.9,
    placeboCiLow: -4.1,
    placeboCiHigh: -1.7,
    diffMean: -6.9,
    diffCiLow: -8.6,
    diffCiHigh: -5.2,
    pValue: "<0.001",
    factId: "fact_201"
  },
  {
    visit: "Week 8",
    week: 8,
    activeMean: -12.1,
    activeCiLow: -13.7,
    activeCiHigh: -10.5,
    placeboMean: -3.6,
    placeboCiLow: -4.9,
    placeboCiHigh: -2.3,
    diffMean: -8.5,
    diffCiLow: -10.4,
    diffCiHigh: -6.6,
    pValue: "<0.001",
    factId: "fact_201"
  },
  {
    visit: "Week 12 (Endpoint)",
    week: 12,
    activeMean: -14.2,
    activeCiLow: -15.9,
    activeCiHigh: -12.5,
    placeboMean: -4.1,
    placeboCiLow: -5.5,
    placeboCiHigh: -2.7,
    diffMean: -10.1,
    diffCiLow: -12.4,
    diffCiHigh: -7.8,
    pValue: "<0.001",
    factId: "fact_203"
  }
];

export const SAFETY_INCIDENCE_DATA: SafetyEventData[] = [
  {
    term: "Headache",
    activeCount: 22,
    activePct: 11.0,
    placeboCount: 19,
    placeboPct: 9.5,
    totalCount: 41,
    totalPct: 10.3,
    riskRatio: 1.16,
    pValue: "0.621",
    factIdActive: "fact_308",
    factIdPlacebo: "fact_309"
  },
  {
    term: "Dizziness",
    activeCount: 16,
    activePct: 8.0,
    placeboCount: 8,
    placeboPct: 4.0,
    totalCount: 24,
    totalPct: 6.0,
    riskRatio: 2.00,
    pValue: "0.089",
    factIdActive: "fact_310",
    factIdPlacebo: "fact_302"
  },
  {
    term: "Fatigue",
    activeCount: 12,
    activePct: 6.0,
    placeboCount: 10,
    placeboPct: 5.0,
    totalCount: 22,
    totalPct: 5.5,
    riskRatio: 1.20,
    pValue: "0.658",
    factIdActive: "fact_301",
    factIdPlacebo: "fact_302"
  },
  {
    term: "Nausea",
    activeCount: 8,
    activePct: 4.0,
    placeboCount: 7,
    placeboPct: 3.5,
    totalCount: 15,
    totalPct: 3.8,
    riskRatio: 1.14,
    pValue: "0.793",
    factIdActive: "fact_301",
    factIdPlacebo: "fact_302"
  }
];

export interface SectionContent {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  narrativeTemplate: string;
  factIds: string[];
}

export const CSR_SECTIONS: Record<string, SectionContent> = {
  section_11: {
    id: "section_11",
    number: "11.4.1",
    title: "Section 11: Efficacy Evaluation",
    subtitle: "Primary Endpoint: Sitting Systolic Blood Pressure at Week 12",
    narrativeTemplate: `### 11.4.1 Primary Efficacy Analysis: Sitting Systolic Blood Pressure at Week 12

In the Full Analysis Set (N=400), baseline sitting systolic blood pressure (SBP) was comparable between treatment cohorts, with a mean baseline SBP of <cite factId="fact_205">156.4</cite> mmHg in the CardioPax cohort and <cite factId="fact_206">155.9</cite> mmHg in the placebo cohort.

At Week 12, patients receiving CardioPax 20 mg QD demonstrated a statistically significant and clinically meaningful reduction in sitting SBP from baseline. The mean observed reduction was <cite factId="fact_201">-14.2</cite> mmHg (SD 6.1) in the CardioPax arm compared with <cite factId="fact_202">-4.1</cite> mmHg (SD 5.4) in the placebo arm.

The primary ANCOVA model, adjusting for baseline SBP and study center stratification, yielded a least-squares (LS) mean difference between CardioPax and placebo of <cite factId="fact_203">-10.1 (-12.4, -7.8)</cite> mmHg (95% CI: -12.4 to -7.8; <cite factId="fact_204"><0.001</cite>).

Furthermore, a higher proportion of subjects achieved normalized therapeutic blood pressure target (<130 mmHg) at Week 12 in the active arm (<cite factId="fact_209">136 (68.0%)</cite>) compared to the placebo cohort (<cite factId="fact_210">44 (22.0%)</cite>; p < 0.001). These findings satisfy the primary protocol objective and substantiate robust antihypertensive superiority over placebo.`,
    factIds: ["fact_205", "fact_206", "fact_201", "fact_202", "fact_203", "fact_204", "fact_209", "fact_210"]
  },
  section_10: {
    id: "section_10",
    number: "10.1",
    title: "Section 10: Study Patients & Demographics",
    subtitle: "Disposition, Demographic, and Baseline Disease Characteristics",
    narrativeTemplate: `### 10.1 Demographic and Baseline Characteristics

A total of 400 subjects were randomized across 24 clinical investigative centers in North America and Western Europe (200 randomized to CardioPax 20 mg QD and 200 to matching placebo). All randomized subjects received at least one dose of investigational medicinal product and comprised the Safety Population (N=400).

The mean overall subject age was <cite factId="fact_103">54.0 (8.2)</cite> years, with a mean of <cite factId="fact_101">54.2</cite> years in the CardioPax arm and <cite factId="fact_102">53.8</cite> years in the placebo arm. Overall, the study enrolled <cite factId="fact_104">108 (54.0%)</cite> males in the active cohort and <cite factId="fact_105">104 (52.0%)</cite> males in the placebo cohort, with female subjects accounting for <cite factId="fact_106">92 (46.0%)</cite> and <cite factId="fact_107">96 (48.0%)</cite>, respectively.

The racial composition of the overall population was predominantly White (<cite factId="fact_108">282 (70.5%)</cite>), followed by Black or African American (<cite factId="fact_109">78 (19.5%)</cite>). Mean baseline body mass index (BMI) across all cohorts was <cite factId="fact_110">28.5 (4.0)</cite> kg/m². Baseline characteristics were well balanced with no statistically significant differences between treatment groups.`,
    factIds: ["fact_103", "fact_101", "fact_102", "fact_104", "fact_105", "fact_106", "fact_107", "fact_108", "fact_109", "fact_110"]
  },
  section_12: {
    id: "section_12",
    number: "12.2",
    title: "Section 12: Safety Evaluation",
    subtitle: "Adverse Events, Serious Adverse Events, and Discontinuations",
    narrativeTemplate: `### 12.2 Overall Safety Profile and Treatment-Emergent Adverse Events

The safety evaluation was conducted in the Safety Population (N=400; 200 active, 200 placebo). Overall, CardioPax was well tolerated over the 12-week double-blind treatment period.

A total of <cite factId="fact_301">64 (32.0%)</cite> subjects in the CardioPax cohort and <cite factId="fact_302">58 (29.0%)</cite> subjects in the placebo cohort reported at least one treatment-emergent adverse event (TEAE). Investigator-assessed treatment-related TEAEs occurred in <cite factId="fact_303">28 (14.0%)</cite> of CardioPax-treated subjects versus <cite factId="fact_304">18 (9.0%)</cite> of placebo-treated subjects.

Serious adverse events (SAEs) were infrequent, reported in <cite factId="fact_305">2 (1.0%)</cite> active subjects and <cite factId="fact_306">3 (1.5%)</cite> placebo subjects; none of the SAEs were deemed related to investigational product. Permanent treatment discontinuation due to an adverse event was required in only <cite factId="fact_307">4 (2.0%)</cite> active patients.

The most frequently reported individual TEAE by MedDRA Preferred Term was headache, reported in <cite factId="fact_308">22 (11.0%)</cite> active subjects and <cite factId="fact_309">19 (9.5%)</cite> placebo subjects, followed by dizziness in <cite factId="fact_310">16 (8.0%)</cite> active subjects. The majority of events were mild to moderate in severity and resolved without therapeutic sequelae.`,
    factIds: ["fact_301", "fact_302", "fact_303", "fact_304", "fact_305", "fact_306", "fact_307", "fact_308", "fact_309", "fact_310"]
  }
};

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log-001",
    timestamp: "2026-09-25T14:10:02Z",
    action: "DATASET_INGESTED",
    userEmail: "h.vance@aethelgardbio.com",
    userName: "Dr. Helena Vance",
    userRole: "Lead Biostatistician",
    details: "Ingested CDISC ADaM datasets: ADSL (N=400), ADEFF (N=400), ADAE (N=400). Checksum verified SHA-256.",
    checksumHash: "8f7e9a2b1c4d5e6f"
  },
  {
    id: "log-002",
    timestamp: "2026-09-25T14:22:15Z",
    action: "DRAFT_GENERATED",
    userEmail: "e.marlowe@aethelgardbio.com",
    userName: "Edward Marlowe",
    userRole: "Senior Medical Writer",
    targetSection: "Section 11 (Efficacy Evaluation)",
    details: "Automated draft generated using Constrained LLM Protocol. 8/8 facts bound to validated table cells.",
    checksumHash: "c4b3a210f9e8d7c6"
  }
];
