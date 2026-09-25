import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  KeyRound, 
  UserCheck, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ElectronicSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignAndLock: (signatureData: {
    printedName: string;
    role: string;
    meaning: string;
  }) => void;
  protocolNumber: string;
}

export const ElectronicSignatureModal: React.FC<ElectronicSignatureModalProps> = ({
  isOpen,
  onClose,
  onSignAndLock,
  protocolNumber,
}) => {
  const [printedName, setPrintedName] = useState('Dr. Edward Marlowe');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Senior Regulatory Medical Writer');
  const [meaning, setMeaning] = useState('I confirm the review and approval of this clinical study report section.');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || password.length < 4) {
      setError('Please provide your valid credentials to authenticate electronic signature.');
      return;
    }
    if (!printedName.trim()) {
      setError('Printed legal name is mandatory under 21 CFR Part 11.');
      return;
    }

    // Trigger celebratory regulatory compliance confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#10b981', '#ffffff']
    });

    onSignAndLock({ printedName, role, meaning });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xl p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-[#0E0E12] border border-white/[0.08] shadow-[0_24px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(99,102,241,0.2)] p-8 space-y-6 backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-indigo-500/15 text-indigo-400 ring-1 ring-indigo-500/30 shadow-glow-indigo">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                21 CFR Part 11 Electronic Signature
              </h3>
              <p className="text-xs text-zinc-400">
                Formal sign-off & document freeze for {protocolNumber}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white transition-all ring-1 ring-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning Banner */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <span>
            Executing this signature will <strong className="text-white">lock the CSR section to read-only</strong> and write an immutable cryptographic transaction to the audit ledger.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* Printed Name */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Full Legal Name (Printed)
            </label>
            <input
              type="text"
              value={printedName}
              onChange={(e) => setPrintedName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] text-white text-xs font-medium ring-1 ring-white/10 focus:ring-indigo-500/50 outline-none backdrop-blur-xl"
              placeholder="e.g., Dr. Jane Doe, Ph.D."
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Signatory Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-medium ring-1 ring-white/10 focus:ring-indigo-500/50 outline-none cursor-pointer"
            >
              <option value="Senior Regulatory Medical Writer">Senior Regulatory Medical Writer (Author)</option>
              <option value="Lead Biostatistician">Lead Biostatistician (Verification)</option>
              <option value="Regulatory Affairs VP">Regulatory Affairs VP (Final Approval)</option>
            </select>
          </div>

          {/* Meaning of Signature */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Regulatory Meaning of Signature
            </label>
            <select
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-medium ring-1 ring-white/10 focus:ring-indigo-500/50 outline-none cursor-pointer"
            >
              <option value="I confirm the review and approval of this clinical study report section.">
                "I confirm the review and approval of this clinical study report section."
              </option>
              <option value="I attest to the statistical accuracy and source-table provenance of these data.">
                "I attest to the statistical accuracy and source-table provenance of these data."
              </option>
              <option value="I authorize regulatory submission to FDA/EMA under Module 5.3.5.1.">
                "I authorize regulatory submission to FDA/EMA under Module 5.3.5.1."
              </option>
            </select>
          </div>

          {/* Password Re-Authentication */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
              Password Re-Authentication (21 CFR Part 11 requirement)
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] text-white text-xs font-mono ring-1 ring-white/10 focus:ring-indigo-500/50 outline-none backdrop-blur-xl"
                placeholder="Enter password (e.g. ••••••••)"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-white/5 ring-1 ring-white/10 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-glow-indigo transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Apply 21 CFR 11 Signature & Lock</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
