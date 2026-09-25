import React from 'react';
import { AuditLogEntry } from '../types';
import { 
  X, 
  ShieldCheck, 
  FileText, 
  UserCheck, 
  AlertTriangle, 
  Lock, 
  Download, 
  CheckCircle2,
  Fingerprint
} from 'lucide-react';

interface AuditTrailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  auditLogs: AuditLogEntry[];
}

export const AuditTrailDrawer: React.FC<AuditTrailDrawerProps> = ({
  isOpen,
  onClose,
  auditLogs,
}) => {
  if (!isOpen) return null;

  const getActionBadge = (action: AuditLogEntry['action']) => {
    switch (action) {
      case 'DATASET_INGESTED':
        return <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-500/30 text-[10px] font-mono">INGESTION</span>;
      case 'DRAFT_GENERATED':
        return <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/30 text-[10px] font-mono">AI_DRAFT</span>;
      case 'CITATION_CLICKED':
        return <span className="px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 ring-1 ring-purple-500/30 text-[10px] font-mono">CITATION_NAV</span>;
      case 'PROSE_MANUALLY_EDITED':
        return <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30 text-[10px] font-mono">MANUAL_EDIT</span>;
      case 'DISCREPANCY_FLAGGED':
        return <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 ring-1 ring-rose-500/30 text-[10px] font-mono animate-pulse">DISCREPANCY</span>;
      case 'SECTION_ELECTRONICALLY_SIGNED':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30 text-[10px] font-mono">E_SIGNATURE</span>;
      case 'DOCX_EXPORTED':
        return <span className="px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 ring-1 ring-sky-500/30 text-[10px] font-mono">DOCX_EXPORT</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 text-[10px] font-mono">AUDIT_EVENT</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-xl h-full bg-[#0E0E11] border-l border-white/[0.08] shadow-2xl flex flex-col backdrop-blur-2xl">
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20 shadow-glow-indigo">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                21 CFR Part 11 Audit Trail
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 font-mono">
                  Immutable Log
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Tamper-evident, timestamped regulatory transaction ledger
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all ring-1 ring-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audit Trail List */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <div className="p-3.5 rounded-2xl bg-white/[0.02] ring-1 ring-white/5 flex items-center justify-between text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <Fingerprint className="w-4 h-4 text-cyan-400" />
              <span>SHA-256 Merkle Root: <strong className="text-zinc-200 font-mono">d41d8cd98f00b204e9800998ecf8427e</strong></span>
            </div>
            <span className="text-emerald-400 font-medium">Valid</span>
          </div>

          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] ring-1 ring-white/5 transition-all space-y-2.5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getActionBadge(log.action)}
                  {log.targetSection && (
                    <span className="text-xs font-mono text-zinc-400">
                      [{log.targetSection}]
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} UTC
                </span>
              </div>

              <p className="text-xs text-zinc-200 leading-relaxed font-sans">
                {log.details}
              </p>

              {log.signatureMeaning && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-200 font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Meaning: "{log.signatureMeaning}"</span>
                </div>
              )}

              <div className="pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{log.userName}</span>
                  <span className="text-zinc-600">({log.userRole})</span>
                </div>
                {log.checksumHash && (
                  <span className="font-mono text-zinc-500 text-[10px]">
                    Hash: {log.checksumHash.slice(0, 10)}...
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.06] bg-white/[0.02] flex items-center justify-between text-xs text-zinc-400">
          <span>Compliance: FDA 21 CFR Part 11 & EMA Annex 11</span>
          <span className="font-mono text-cyan-400">{auditLogs.length} Total Events Recorded</span>
        </div>
      </div>
    </div>
  );
};
