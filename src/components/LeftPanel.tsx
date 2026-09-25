import React, { useState, useEffect, useRef } from 'react';
import { ClinicalTable, FactItem, EfficacyVisitData, SafetyEventData } from '../types';
import { 
  Table2, 
  BarChart3, 
  UploadCloud, 
  FileSpreadsheet, 
  Database, 
  ArrowUpRight, 
  Check, 
  Info,
  Download
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  BarChart, 
  Bar, 
  Cell, 
  ReferenceLine,
  ErrorBar
} from 'recharts';

interface LeftPanelProps {
  tables: ClinicalTable[];
  activeFactId: string | null;
  onCellHover: (factId: string | null) => void;
  onCellClick: (factId: string) => void;
  factDictionary: Record<string, FactItem>;
  efficacyForestData: EfficacyVisitData[];
  safetyIncidenceData: SafetyEventData[];
  onIngestDataset: (name: string, data: any) => void;
}

export const LeftPanel: React.FC<LeftPanelProps> = ({
  tables,
  activeFactId,
  onCellHover,
  onCellClick,
  factDictionary,
  efficacyForestData,
  safetyIncidenceData,
  onIngestDataset,
}) => {
  const [viewMode, setViewMode] = useState<'tables' | 'figures' | 'ingest'>('tables');
  const [activeTableIndex, setActiveTableIndex] = useState(1); // Default to Table 14.2 (Efficacy)
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Auto-switch tab and scroll into view when activeFactId changes
  useEffect(() => {
    if (!activeFactId) return;
    const fact = factDictionary[activeFactId];
    if (!fact) return;

    // Find table matching fact.tableId
    const targetTableIdx = tables.findIndex(t => t.number === fact.tableId || fact.tableId.includes(t.number));
    if (targetTableIdx !== -1 && targetTableIdx !== activeTableIndex) {
      setActiveTableIndex(targetTableIdx);
      setViewMode('tables');
    }

    // Scroll to cell after a brief layout render
    setTimeout(() => {
      const cellElement = document.getElementById(fact.cellId);
      if (cellElement) {
        cellElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }, [activeFactId, factDictionary, tables]);

  // Find fact id from cell id
  const getFactIdByCell = (cellId: string): string | null => {
    for (const [fId, fact] of Object.entries(factDictionary)) {
      if (fact.cellId === cellId) return fId;
    }
    return null;
  };

  const currentTable = tables[activeTableIndex] || tables[0];

  // Handle synthetic ingestion presets
  const handleLoadSyntheticADSL = () => {
    onIngestDataset('ADSL', { rowsCount: 400, params: ['AGE', 'SEX', 'RACE', 'BMI'] });
    setUploadSuccess('Successfully ingested CDISC ADSL.csv (N=400 Subjects). Table 14.1 updated.');
    setTimeout(() => setUploadSuccess(null), 4000);
  };

  const handleLoadSyntheticADEFF = () => {
    onIngestDataset('ADEFF', { rowsCount: 400, endpoint: 'Sitting SBP at Week 12' });
    setUploadSuccess('Successfully ingested CDISC ADEFF.csv (N=400 Subjects). ANCOVA Estimates recalibrated.');
    setTimeout(() => setUploadSuccess(null), 4000);
  };

  // Drag and drop mock parser
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const isEff = file.name.toLowerCase().includes('eff');
      if (isEff) {
        handleLoadSyntheticADEFF();
      } else {
        handleLoadSyntheticADSL();
      }
    }
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-3xl overflow-hidden shadow-2xl">
      {/* Top Header & View Modes */}
      <div className="p-6 pb-4 border-b border-white/[0.04] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20 shadow-glow-cyan">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Source Data & Biostatistics
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-400 font-mono">
                  CDISC ADaM
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Ground-truth statistical tables and clinical endpoints for ICH E3 validation
              </p>
            </div>
          </div>

          {/* Mode Switch Pills */}
          <div className="flex items-center p-1 rounded-2xl bg-white/[0.03] ring-1 ring-white/5">
            <button
              onClick={() => setViewMode('tables')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                viewMode === 'tables'
                  ? 'bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white shadow-glow-cyan font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>Tables</span>
            </button>
            <button
              onClick={() => setViewMode('figures')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                viewMode === 'figures'
                  ? 'bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white shadow-glow-cyan font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Figures</span>
            </button>
            <button
              onClick={() => setViewMode('ingest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                viewMode === 'ingest'
                  ? 'bg-gradient-to-r from-blue-600/80 to-cyan-600/80 text-white shadow-glow-cyan font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Ingest ADaM</span>
            </button>
          </div>
        </div>

        {/* Tabbed Table Selector (Shown when in Tables mode) */}
        {viewMode === 'tables' && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {tables.map((tbl, idx) => {
              const isSelected = activeTableIndex === idx;
              return (
                <button
                  key={tbl.id}
                  onClick={() => setActiveTableIndex(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 backdrop-blur-xl ${
                    isSelected
                      ? 'bg-white/[0.08] text-cyan-300 ring-1 ring-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.15)] font-semibold'
                      : 'bg-white/[0.02] text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200'
                  }`}
                >
                  <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-300">
                    T-{tbl.number}
                  </span>
                  <span>{tbl.title.split(':')[0]}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div ref={tableContainerRef} className="flex-1 p-6 overflow-y-auto overflow-x-auto">
        {/* VIEW 1: TABULAR CDISC TABLES */}
        {viewMode === 'tables' && (
          <div className="space-y-4">
            {/* Table Metadata Banner */}
            <div className="p-4 rounded-2xl bg-white/[0.02] backdrop-blur-xl ring-1 ring-white/5 flex items-center justify-between">
              <div>
                <div className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-2">
                  <span>Table {currentTable.number}</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-300 font-sans font-medium">{currentTable.title}</span>
                </div>
                <div className="text-[11px] text-zinc-400 mt-0.5">
                  Dataset: <strong className="text-white font-mono">{currentTable.datasetName}.xpt / .csv</strong> | Analysis Set: <span className="text-zinc-200">{currentTable.population}</span>
                </div>
              </div>
              <div className="text-[11px] font-mono text-zinc-400 px-2.5 py-1 rounded-lg bg-white/5">
                {currentTable.rows.length} Parameters Extracted
              </div>
            </div>

            {/* Clinical Data Grid */}
            <div className="rounded-2xl overflow-hidden bg-white/[0.015] ring-1 ring-white/[0.06] shadow-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.06] bg-white/[0.03] text-zinc-300 text-xs font-semibold tracking-tight">
                    <th className="p-3.5 pl-4 font-medium text-zinc-400">Parameter / Endpoint</th>
                    <th className="p-3.5 font-mono text-right text-cyan-300">Active (N=200)</th>
                    <th className="p-3.5 font-mono text-right text-zinc-300">Placebo (N=200)</th>
                    <th className="p-3.5 font-mono text-right text-indigo-300">Total / Difference</th>
                    <th className="p-3.5 pr-4 font-mono text-right text-amber-300">p-value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.03] text-xs">
                  {currentTable.rows.map((row, rIdx) => {
                    const activeFId = getFactIdByCell(row.cellIds.active);
                    const placeboFId = getFactIdByCell(row.cellIds.placebo);
                    const totalFId = getFactIdByCell(row.cellIds.totalOrDiff);
                    const pValFId = row.cellIds.pValue ? getFactIdByCell(row.cellIds.pValue) : null;

                    const isActiveActive = activeFactId && activeFId === activeFactId;
                    const isPlaceboActive = activeFactId && placeboFId === activeFactId;
                    const isTotalActive = activeFactId && totalFId === activeFactId;
                    const isPValActive = activeFactId && pValFId === activeFactId;

                    return (
                      <tr 
                        key={rIdx} 
                        className="hover:bg-white/[0.03] transition-colors group"
                      >
                        <td className="p-3.5 pl-4 font-sans text-zinc-200 group-hover:text-white font-medium">
                          {row.parameter}
                        </td>

                        {/* Active Cohort Cell */}
                        <td
                          id={row.cellIds.active}
                          onMouseEnter={() => onCellHover(activeFId)}
                          onMouseLeave={() => onCellHover(null)}
                          onClick={() => activeFId && onCellClick(activeFId)}
                          className={`p-3.5 font-mono text-right cursor-pointer transition-all duration-300 ${
                            isActiveActive
                              ? 'bg-cyan-500/25 text-white font-bold ring-2 ring-cyan-400 shadow-glow-cyan rounded-lg scale-105'
                              : 'text-zinc-300 hover:text-cyan-300 hover:bg-white/[0.06] rounded-md'
                          }`}
                        >
                          <span className="relative">
                            {row.active}
                            {activeFId && (
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 right-0 text-[9px] text-cyan-400 font-mono">
                                #{activeFId}
                              </span>
                            )}
                          </span>
                        </td>

                        {/* Placebo Cohort Cell */}
                        <td
                          id={row.cellIds.placebo}
                          onMouseEnter={() => onCellHover(placeboFId)}
                          onMouseLeave={() => onCellHover(null)}
                          onClick={() => placeboFId && onCellClick(placeboFId)}
                          className={`p-3.5 font-mono text-right cursor-pointer transition-all duration-300 ${
                            isPlaceboActive
                              ? 'bg-blue-500/25 text-white font-bold ring-2 ring-blue-400 shadow-glow-blue rounded-lg scale-105'
                              : 'text-zinc-300 hover:text-blue-300 hover:bg-white/[0.06] rounded-md'
                          }`}
                        >
                          <span className="relative">
                            {row.placebo}
                            {placeboFId && (
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 right-0 text-[9px] text-blue-400 font-mono">
                                #{placeboFId}
                              </span>
                            )}
                          </span>
                        </td>

                        {/* Total / Difference Cell */}
                        <td
                          id={row.cellIds.totalOrDiff}
                          onMouseEnter={() => onCellHover(totalFId)}
                          onMouseLeave={() => onCellHover(null)}
                          onClick={() => totalFId && onCellClick(totalFId)}
                          className={`p-3.5 font-mono text-right cursor-pointer transition-all duration-300 ${
                            isTotalActive
                              ? 'bg-indigo-500/25 text-white font-bold ring-2 ring-indigo-400 shadow-glow-indigo rounded-lg scale-105'
                              : 'text-zinc-300 hover:text-indigo-300 hover:bg-white/[0.06] rounded-md'
                          }`}
                        >
                          <span className="relative">
                            {row.totalOrDiff}
                            {totalFId && (
                              <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-3 right-0 text-[9px] text-indigo-400 font-mono">
                                #{totalFId}
                              </span>
                            )}
                          </span>
                        </td>

                        {/* p-value Cell */}
                        <td
                          id={row.cellIds.pValue || `pval-${rIdx}`}
                          onMouseEnter={() => onCellHover(pValFId)}
                          onMouseLeave={() => onCellHover(null)}
                          onClick={() => pValFId && onCellClick(pValFId)}
                          className={`p-3.5 pr-4 font-mono text-right cursor-pointer transition-all duration-300 ${
                            isPValActive
                              ? 'bg-amber-500/25 text-amber-200 font-bold ring-2 ring-amber-400 shadow-glow-amber rounded-lg scale-105'
                              : 'text-amber-300/80 hover:text-amber-300 hover:bg-white/[0.06] rounded-md'
                          }`}
                        >
                          {row.pValue || '--'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Instruction Footer */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] ring-1 ring-white/5 flex items-center justify-between text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>Hover or click any cell coordinate to highlight linked ICH E3 narrative tokens</span>
              </div>
              <span className="font-mono text-zinc-500">21 CFR Part 11 Coordinate Audit</span>
            </div>
          </div>
        )}

        {/* VIEW 2: VISUAL FIGURES & FOREST PLOT (RECHARTS) */}
        {viewMode === 'figures' && (
          <div className="space-y-6">
            {/* Primary Efficacy Forest / Longitudinal Trajectory Plot */}
            <div className="p-5 rounded-2xl bg-white/[0.02] backdrop-blur-xl ring-1 ring-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Figure 14.2.1: LS Mean Change in SBP by Visit (95% CI)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 font-mono">
                      Primary Endpoint
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Longitudinal ANCOVA trajectory for CardioPax vs. Placebo with 95% Confidence Interval error whiskers
                  </p>
                </div>
                <button
                  onClick={() => alert("Exported publication-grade high-resolution 300 DPI vector graphic (SVG).")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all ring-1 ring-white/10"
                >
                  <Download className="w-3 h-3 text-cyan-400" />
                  <span>Export 300 DPI</span>
                </button>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={efficacyForestData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="visit" stroke="#71717a" fontSize={11} tickLine={false} />
                    <YAxis 
                      stroke="#71717a" 
                      fontSize={11} 
                      tickLine={false} 
                      domain={[-18, 0]}
                      unit=" mmHg"
                    />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 15, 18, 0.95)', 
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                        fontSize: '11px',
                        color: '#fff'
                      }} 
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <ReferenceLine y={0} stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
                    <Line 
                      type="monotone" 
                      dataKey="activeMean" 
                      name="CardioPax 20mg (LS Mean)" 
                      stroke="#06b6d4" 
                      strokeWidth={2.5}
                      dot={{ r: 5, fill: '#06b6d4', stroke: '#083344', strokeWidth: 2 }}
                      activeDot={{ r: 7, fill: '#38bdf8', stroke: '#fff', strokeWidth: 2, className: "shadow-glow-cyan" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="placeboMean" 
                      name="Matching Placebo (LS Mean)" 
                      stroke="#71717a" 
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={{ r: 4, fill: '#71717a' }}
                      activeDot={{ r: 6, fill: '#a1a1aa' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Safety Summary Bar Chart (MedDRA Adverse Events) */}
            <div className="p-5 rounded-2xl bg-white/[0.02] backdrop-blur-xl ring-1 ring-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Figure 14.3.1: Most Common TEAEs by MedDRA Preferred Term</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 font-mono">
                      Threshold &gt; 3%
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Incidence of Treatment-Emergent Adverse Events comparing active vs placebo cohorts
                  </p>
                </div>
              </div>

              <div className="h-56 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={safetyIncidenceData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis type="number" stroke="#71717a" fontSize={11} unit="%" domain={[0, 15]} />
                    <YAxis dataKey="term" type="category" stroke="#a1a1aa" fontSize={11} tickLine={false} />
                    <RechartsTooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(15, 15, 18, 0.95)', 
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        backdropFilter: 'blur(16px)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                        fontSize: '11px',
                        color: '#fff'
                      }} 
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="activePct" name="CardioPax (%)" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="placeboPct" name="Placebo (%)" fill="#64748b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: INGEST CDISC WORKBENCH */}
        {viewMode === 'ingest' && (
          <div className="space-y-6">
            {uploadSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2.5 shadow-glow-emerald">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`p-8 rounded-3xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center backdrop-blur-xl ${
                isDragging
                  ? 'border-cyan-400 bg-cyan-500/10 shadow-glow-cyan'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/30 mb-4 shadow-glow-cyan">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                Drag & Drop CDISC ADaM Datasets
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mb-4">
                Upload <span className="font-mono text-zinc-200">ADSL.csv</span>, <span className="font-mono text-zinc-200">ADEFF.csv</span>, or <span className="font-mono text-zinc-200">ADAE.csv</span> for automatic statistical parsing.
              </p>
              <button
                onClick={handleLoadSyntheticADEFF}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white ring-1 ring-white/15 transition-all shadow-glow-blue"
              >
                Browse Files
              </button>
            </div>

            {/* Synthetic Presets */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                Or Load Validated Synthetic Presets (N=400 RCT)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleLoadSyntheticADSL}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] text-left ring-1 ring-white/5 hover:ring-cyan-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300">CDISC ADSL (Demographics)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    400 subjects, 2-arms (Active vs Placebo), Age, Sex, Race, Baseline BMI
                  </p>
                </button>

                <button
                  onClick={handleLoadSyntheticADEFF}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] text-left ring-1 ring-white/5 hover:ring-cyan-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white group-hover:text-cyan-300">CDISC ADEFF (Blood Pressure)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400" />
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    Baseline, Wk 4, Wk 8, Wk 12 SBP endpoints with ANCOVA delta and 95% CI
                  </p>
                </button>
              </div>
            </div>

            {/* Pharmaverse Info Box */}
            <div className="p-4 rounded-2xl bg-white/[0.02] ring-1 ring-white/5 flex items-start gap-3 text-xs text-zinc-400">
              <Database className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-zinc-200">Pharmaverse CDISC Architecture: </span>
                Extracts arm-specific means, standard deviations, confidence intervals, and ANCOVA estimators deterministically without floating-point hallucination risk.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
