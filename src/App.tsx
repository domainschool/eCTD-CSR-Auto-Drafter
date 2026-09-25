import React, { useState } from 'react';
import { 
  INITIAL_STUDY_METADATA, 
  CLINICAL_TABLES, 
  FACT_DICTIONARY, 
  CSR_SECTIONS, 
  EFFICACY_FOREST_DATA, 
  SAFETY_INCIDENCE_DATA, 
  INITIAL_AUDIT_LOGS 
} from './mocks/clinicalData';
import { StudyMetadata, ClinicalTable, FactItem, AuditLogEntry } from './types';
import { TopNavbar } from './components/TopNavbar';
import { LeftPanel } from './components/LeftPanel';
import { RightPanel } from './components/RightPanel';
import { AuditTrailDrawer } from './components/AuditTrailDrawer';
import { ElectronicSignatureModal } from './components/ElectronicSignatureModal';
import { AboutModal } from './components/AboutModal';
import { exportEctdDocx } from './services/docxExport';

export function App() {
  const [metadata, setMetadata] = useState<StudyMetadata>(INITIAL_STUDY_METADATA);
  const [tables, setTables] = useState<ClinicalTable[]>(CLINICAL_TABLES);
  const [factDictionary, setFactDictionary] = useState<Record<string, FactItem>>(FACT_DICTIONARY);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('section_11');
  const [activeFactId, setActiveFactId] = useState<string | null>(null);
  const [isSimulatedDiscrepancy, setIsSimulatedDiscrepancy] = useState<boolean>(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [isAuditTrailOpen, setIsAuditTrailOpen] = useState<boolean>(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState<boolean>(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Handle cell / citation interactions
  const handleFactHover = (factId: string | null) => {
    setActiveFactId(factId);
  };

  const handleFactClick = (factId: string) => {
    setActiveFactId(factId);
    logAuditAction({
      action: 'CITATION_CLICKED',
      details: `Reviewer navigated to fact coordinate for '${factDictionary[factId]?.label || factId}' (Table ${factDictionary[factId]?.tableId || 'N/A'}, Cell ${factDictionary[factId]?.cellId || 'N/A'}).`,
      targetSection: CSR_SECTIONS[selectedSectionId]?.title
    });
  };

  // Toggle Discrepancy Simulator
  const handleToggleDiscrepancy = () => {
    const newState = !isSimulatedDiscrepancy;
    setIsSimulatedDiscrepancy(newState);

    if (newState) {
      logAuditAction({
        action: 'DISCREPANCY_FLAGGED',
        details: 'Simulated discrepancy injected for fact_201: Narrative claim altered to "-18.5 mmHg" (Source Table 14.2 records "-14.2 mmHg"). Automated 21 CFR Part 11 violation warning triggered.',
        targetSection: 'Section 11 (Efficacy Evaluation)'
      });
    }
  };

  // Append immutable audit log
  const logAuditAction = (data: Partial<AuditLogEntry> & { action: AuditLogEntry['action']; details: string }) => {
    const newEntry: AuditLogEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      action: data.action,
      userEmail: 'e.marlowe@aethelgardbio.com',
      userName: 'Dr. Edward Marlowe',
      userRole: 'Senior Medical Writer',
      details: data.details,
      targetSection: data.targetSection,
      checksumHash: Math.random().toString(16).substr(2, 16),
      signatureMeaning: data.signatureMeaning
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  // Manual prose edit log
  const handleLogProseEdit = (sectionId: string, oldText: string, newText: string) => {
    logAuditAction({
      action: 'PROSE_MANUALLY_EDITED',
      details: `Medical writer manually modified narrative content for ${CSR_SECTIONS[sectionId]?.title}. Re-validating citation checksums against fact dictionary.`,
      targetSection: CSR_SECTIONS[sectionId]?.title
    });
  };

  // Electronic Signature sign-off & lock
  const handleSignAndLock = (sigData: { printedName: string; role: string; meaning: string }) => {
    const lockedTime = new Date().toISOString();
    setMetadata((prev) => ({
      ...prev,
      status: 'eCTD Locked & Signed',
      signedBy: sigData.printedName,
      signatureRole: sigData.role,
      lockedAt: lockedTime,
    }));

    logAuditAction({
      action: 'SECTION_ELECTRONICALLY_SIGNED',
      userName: sigData.printedName,
      userRole: sigData.role as any,
      signatureMeaning: sigData.meaning,
      details: `21 CFR Part 11 compliant electronic signature affixed by ${sigData.printedName} (${sigData.role}). Document state locked to immutable read-only.`,
      targetSection: CSR_SECTIONS[selectedSectionId]?.title,
      checksumHash: '3f7a1e8c9b2d4e6f'
    });
  };

  // Dataset Ingestion Handler
  const handleIngestDataset = (name: string, data: any) => {
    logAuditAction({
      action: 'DATASET_INGESTED',
      details: `Ingested ${name} clinical dataset (${data.rowsCount || 400} subjects). Statistical analysis engine auto-computed descriptive statistics and refreshed fact dictionary.`,
      targetSection: 'Data Layer'
    });
  };

  // Docx Export Handler
  const handleExportDocx = async () => {
    try {
      setIsExporting(true);
      const currentSection = CSR_SECTIONS[selectedSectionId] || CSR_SECTIONS['section_11'];
      const activeTable = tables.find(t => currentSection.factIds.some(f => factDictionary[f]?.tableId === t.number)) || tables[0];
      
      await exportEctdDocx(metadata, currentSection, activeTable);
      
      logAuditAction({
        action: 'DOCX_EXPORTED',
        details: `Generated eCTD-compliant Microsoft Word (.docx) package for ${currentSection.title}. Embedded regulatory typography, confidential headers, and ICH E3 bookmarks.`,
        targetSection: currentSection.title
      });
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to generate .docx document.');
    } finally {
      setIsExporting(false);
    }
  };

  const currentSection = CSR_SECTIONS[selectedSectionId] || CSR_SECTIONS['section_11'];

  return (
    <div className="relative min-h-screen h-screen bg-[#0A0A0A] text-white flex flex-col overflow-hidden font-sans select-none">
      {/* Cinematic Ambient Glow Background Shaders */}
      <div className="ambient-glow w-[600px] h-[600px] -top-40 -left-40 bg-cyan-600" />
      <div className="ambient-glow w-[700px] h-[700px] -top-20 -right-40 bg-indigo-600" />
      <div className="ambient-glow w-[500px] h-[500px] -bottom-40 left-1/3 bg-blue-700" />

      {/* Top Regulatory Navigation Bar */}
      <TopNavbar
        metadata={metadata}
        isSimulatedDiscrepancy={isSimulatedDiscrepancy}
        onToggleDiscrepancy={handleToggleDiscrepancy}
        onOpenAuditTrail={() => setIsAuditTrailOpen(true)}
        onOpenSignModal={() => setIsSignModalOpen(true)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
        onExportDocx={handleExportDocx}
        isExporting={isExporting}
        activeFactsCount={currentSection.factIds.length}
      />

      {/* Split-Screen Clinical Workspace */}
      <main className="relative z-10 flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden">
        {/* Left Panel: Source Data & Figures */}
        <div className="h-full overflow-hidden">
          <LeftPanel
            tables={tables}
            activeFactId={activeFactId}
            onCellHover={handleFactHover}
            onCellClick={handleFactClick}
            factDictionary={factDictionary}
            efficacyForestData={EFFICACY_FOREST_DATA}
            safetyIncidenceData={SAFETY_INCIDENCE_DATA}
            onIngestDataset={handleIngestDataset}
          />
        </div>

        {/* Right Panel: ICH E3 Narrative Drafter */}
        <div className="h-full overflow-hidden">
          <RightPanel
            sections={CSR_SECTIONS}
            selectedSectionId={selectedSectionId}
            onSelectSection={setSelectedSectionId}
            activeFactId={activeFactId}
            onHoverFact={handleFactHover}
            onClickFact={handleFactClick}
            factDictionary={factDictionary}
            isSimulatedDiscrepancy={isSimulatedDiscrepancy}
            onLogProseEdit={handleLogProseEdit}
            isStudyLocked={metadata.status === 'eCTD Locked & Signed'}
          />
        </div>
      </main>

      {/* 21 CFR Part 11 Audit Trail Drawer */}
      <AuditTrailDrawer
        isOpen={isAuditTrailOpen}
        onClose={() => setIsAuditTrailOpen(false)}
        auditLogs={auditLogs}
      />

      {/* Electronic Signature & Lock Modal */}
      <ElectronicSignatureModal
        isOpen={isSignModalOpen}
        onClose={() => setIsSignModalOpen(false)}
        onSignAndLock={handleSignAndLock}
        protocolNumber={metadata.protocolNumber}
      />

      {/* Educational Learning Deck & Systems Architecture Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}

export default App;
