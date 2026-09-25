import React from 'react';
import { StudyMetadata } from '../types';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  Download, 
  History, 
  AlertTriangle, 
  Sparkles,
  CheckCheck,
  HelpCircle,
  BookOpen
} from 'lucide-react';

interface TopNavbarProps {
  metadata: StudyMetadata;
  isSimulatedDiscrepancy: boolean;
  onToggleDiscrepancy: () => void;
  onOpenAuditTrail: () => void;
  onOpenSignModal: () => void;
  onExportDocx: () => void;
  isExporting: boolean;
  activeFactsCount: number;
  onOpenAboutModal: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  metadata,
  isSimulatedDiscrepancy,
  onToggleDiscrepancy,
  onOpenAuditTrail,
  onOpenSignModal,
  onExportDocx,
  isExporting,
  activeFactsCount,
  onOpenAboutModal,
}) => {
  const isLocked = metadata.status === 'eCTD Locked & Signed';

  return (
    <header className="relative z-30 h-20 w-full px-8 flex items-center justify-between backdrop-blur-2xl bg-white/[0.03] border-b border-white/[0.04]">
      {/* Left: Product & Protocol Title */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-indigo-500/20 backdrop-blur-xl ring-1 ring-white/10 shadow-glow-cyan">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 animate-pulse-glow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                eCTD CSR Auto-Drafter
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-400/30">
                AI Copilot
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono tracking-tight flex items-center gap-2">
              <span>{metadata.protocolId}</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300 font-sans">{metadata.studyTitle.slice(0, 65)}...</span>
            </p>
          </div>
        </div>

        {/* Regulatory Badge */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] backdrop-blur-xl ring-1 ring-white/10">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <div className="text-xs">
            <span className="text-zinc-400">Standard: </span>
            <span className="font-semibold text-white">{metadata.ectdModule}</span>
          </div>
        </div>
      </div>

      {/* Right: Quick Stats & Regulatory Actions */}
      <div className="flex items-center gap-3">
        {/* Population & Verification Stats */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/[0.02] backdrop-blur-xl ring-1 ring-white/5">
          <div className="text-right">
            <div className="text-[11px] text-zinc-400">Safety Population</div>
            <div className="text-xs font-mono font-bold text-zinc-200">N={metadata.safetyPopulationN}</div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="text-right">
            <div className="text-[11px] text-zinc-400">Verified Facts</div>
            <div className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1">
              <CheckCheck className="w-3.5 h-3.5" />
              <span>{activeFactsCount} Claims</span>
            </div>
          </div>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isLocked ? 'bg-emerald-400 shadow-glow-emerald' : 'bg-cyan-400 shadow-glow-cyan'} animate-pulse`} />
            <span className="text-xs font-medium text-zinc-300">{metadata.status}</span>
          </div>
        </div>

        {/* Learning Deck & Architecture Button */}
        <button
          onClick={onOpenAboutModal}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 text-cyan-200 hover:text-white hover:from-cyan-500/30 hover:to-indigo-500/30 shadow-glow-cyan hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-300 backdrop-blur-xl ring-1 ring-cyan-400/40 active:scale-95"
          title="Open Educational Learning Deck, Domain Terms, Architecture, and Vibe-Coding Prompts"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
          <span>Learning Deck & Architecture</span>
        </button>

        {/* Simulate Discrepancy Toggle Button */}
        <button
          onClick={onToggleDiscrepancy}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 backdrop-blur-xl ${
            isSimulatedDiscrepancy
              ? 'bg-rose-500/20 text-rose-200 shadow-glow-rose ring-1 ring-rose-500/50'
              : 'bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white ring-1 ring-white/10'
          }`}
          title="Simulate data discrepancy to test 21 CFR Part 11 audit detection"
        >
          <AlertTriangle className={`w-3.5 h-3.5 ${isSimulatedDiscrepancy ? 'text-rose-400 animate-bounce' : 'text-amber-400'}`} />
          <span className="hidden sm:inline">{isSimulatedDiscrepancy ? 'Discrepancy Active' : 'Simulate Mismatch'}</span>
        </button>

        {/* Audit Trail Drawer Trigger */}
        <button
          onClick={onOpenAuditTrail}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-white/[0.04] text-zinc-300 hover:bg-white/[0.08] hover:text-white hover:shadow-glow-blue transition-all duration-200 backdrop-blur-xl ring-1 ring-white/10"
        >
          <History className="w-3.5 h-3.5 text-blue-400" />
          <span className="hidden sm:inline">21 CFR 11 Audit</span>
        </button>

        {/* E-Sign & Lock Modal Trigger */}
        <button
          onClick={onOpenSignModal}
          disabled={isLocked}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-300 backdrop-blur-xl ${
            isLocked
              ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/50 cursor-default'
              : 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-200 hover:from-indigo-500/30 hover:to-purple-500/30 hover:shadow-glow-indigo ring-1 ring-indigo-400/30'
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-indigo-300" />
          <span>{isLocked ? 'Locked & Signed' : 'Sign & Lock'}</span>
        </button>

        {/* Word (.docx) Exporter */}
        <button
          onClick={onExportDocx}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-glow-cyan hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] transition-all duration-300 backdrop-blur-xl active:scale-95 disabled:opacity-50"
        >
          {isExporting ? (
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          <span>Export .docx</span>
        </button>
      </div>
    </header>
  );
};
