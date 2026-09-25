export interface FactItem {
  id: string;
  cellId: string;
  value: string;
  label: string;
  tableId: string;
  tableTitle?: string;
  parameter?: string;
  cohort?: 'Active' | 'Placebo' | 'Total' | 'Difference';
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

export interface ClinicalTable {
  id: string;
  number: string;
  title: string;
  datasetName: 'ADSL' | 'ADEFF' | 'ADAE' | 'ADLB';
  population: string;
  rows: TableRow[];
}

export interface EfficacyVisitData {
  visit: string;
  week: number;
  activeMean: number;
  activeCiLow: number;
  activeCiHigh: number;
  placeboMean: number;
  placeboCiLow: number;
  placeboCiHigh: number;
  diffMean: number;
  diffCiLow: number;
  diffCiHigh: number;
  pValue: string;
  factId: string;
}

export interface SafetyEventData {
  term: string;
  activeCount: number;
  activePct: number;
  placeboCount: number;
  placeboPct: number;
  totalCount: number;
  totalPct: number;
  riskRatio: number;
  pValue: string;
  factIdActive: string;
  factIdPlacebo: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: 'DATASET_INGESTED' | 'DRAFT_GENERATED' | 'CITATION_CLICKED' | 'PROSE_MANUALLY_EDITED' | 'DISCREPANCY_FLAGGED' | 'SECTION_ELECTRONICALLY_SIGNED' | 'DOCX_EXPORTED';
  userEmail: string;
  userName: string;
  userRole: 'Senior Medical Writer' | 'Lead Biostatistician' | 'Regulatory Affairs VP';
  details: string;
  targetSection?: string;
  checksumHash?: string;
  signatureMeaning?: string;
}

export interface StudyMetadata {
  protocolId: string;
  protocolNumber: string;
  studyTitle: string;
  phase: string;
  indication: string;
  drugName: string;
  comparator: string;
  safetyPopulationN: number;
  status: 'Draft Ready' | 'Under Cross-Review' | 'eCTD Locked & Signed';
  ectdModule: string;
  sponsor: string;
  lockedAt?: string;
  signedBy?: string;
  signatureRole?: string;
}

export interface SectionContent {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  narrativeTemplate: string;
  factIds: string[];
}

