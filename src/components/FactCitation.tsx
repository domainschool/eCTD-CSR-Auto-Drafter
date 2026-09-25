import React, { useState } from 'react';
import { FactItem } from '../types';
import { AlertTriangle, CheckCircle2, Table2 } from 'lucide-react';

interface FactCitationProps {
  factId: string;
  displayValue: string;
  activeFactId: string | null;
  onHover: (factId: string | null) => void;
  onClick?: (factId: string) => void;
  factDictionary: Record<string, FactItem>;
  isSimulatedDiscrepancy?: boolean;
}

export const FactCitation: React.FC<FactCitationProps> = ({
  factId,
  displayValue,
  activeFactId,
  onHover,
  onClick,
  factDictionary,
  isSimulatedDiscrepancy = false,
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const fact = factDictionary[factId];
  const isSelected = activeFactId === factId;

  // Determine if there is a real value mismatch
  const hasMismatch = isSimulatedDiscrepancy || (fact && fact.value !== displayValue.trim() && !displayValue.includes(fact.value));

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(factId);
    }
  };

  if (hasMismatch) {
    return (
      <span
        onMouseEnter={() => {
          onHover(factId);
          setIsTooltipOpen(true);
        }}
        onMouseLeave={() => {
          onHover(null);
          setIsTooltipOpen(false);
        }}
        onClick={handleClick}
        className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1 mx-1 my-0.5 rounded-lg text-xs font-mono font-semibold tracking-tight transition-all duration-300 cursor-pointer backdrop-blur-xl ${
          isSelected
            ? 'bg-rose-500/25 text-rose-200 shadow-glow-rose ring-1 ring-rose-400/80 scale-105'
            : 'bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 hover:shadow-glow-rose ring-1 ring-rose-500/40'
        }`}
        data-fact-id={factId}
      >
        <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
        <span>{displayValue}</span>

        {/* Cinematic Tooltip */}
        {isTooltipOpen && (
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3.5 rounded-xl glass-dropdown backdrop-blur-2xl text-left pointer-events-none shadow-[0_12px_40px_rgba(244,63,94,0.3)] ring-1 ring-rose-500/40 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Critical Discrepancy</span>
            </div>
            <div className="text-[11px] text-zinc-300 leading-relaxed font-sans">
              Narrative claims <span className="font-mono text-rose-300 font-bold underline">{displayValue}</span>, but Source Table {fact?.tableId || "14.2"} records <span className="font-mono text-emerald-400 font-bold">{fact?.value || "N/A"}</span>.
            </div>
            <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
              <span>Cell: {fact?.cellId || "coord"}</span>
              <span className="text-rose-400 font-semibold">21 CFR 11 Audit Flag</span>
            </div>
          </span>
        )}
      </span>
    );
  }

  return (
    <span
      onMouseEnter={() => {
        onHover(factId);
        setIsTooltipOpen(true);
      }}
      onMouseLeave={() => {
        onHover(null);
        setIsTooltipOpen(false);
      }}
      onClick={handleClick}
      className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1 mx-1 my-0.5 rounded-lg text-xs font-mono font-semibold tracking-tight transition-all duration-300 cursor-pointer backdrop-blur-xl ${
        isSelected
          ? 'bg-cyan-500/25 text-cyan-200 shadow-glow-cyan ring-1 ring-cyan-400/90 scale-105'
          : 'bg-white/[0.06] text-sky-200 hover:bg-white/[0.12] hover:text-white hover:shadow-glow-blue ring-1 ring-white/10'
      }`}
      data-fact-id={factId}
    >
      <CheckCircle2 className={`w-3 h-3 transition-colors ${isSelected ? 'text-cyan-300' : 'text-sky-400/80'}`} />
      <span>{displayValue}</span>

      {/* Cinematic Tooltip */}
      {isTooltipOpen && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3.5 rounded-xl glass-dropdown backdrop-blur-2xl text-left pointer-events-none shadow-[0_16px_48px_rgba(0,0,0,0.8),0_0_24px_rgba(6,182,212,0.25)] ring-1 ring-white/15 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-cyan-300 tracking-tight">{fact?.label || "Statistical Point"}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-medium">100% Traceable</span>
          </div>
          <div className="text-[11px] text-zinc-300 flex items-center gap-1.5 mb-2 font-sans">
            <Table2 className="w-3.5 h-3.5 text-zinc-400" />
            <span>Table {fact?.tableId} ({fact?.tableTitle || "Analysis Dataset"})</span>
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span>Coordinate: <strong className="text-white">{fact?.cellId}</strong></span>
            <span className="text-sky-400 font-medium">Click to focus</span>
          </div>
        </span>
      )}
    </span>
  );
};
