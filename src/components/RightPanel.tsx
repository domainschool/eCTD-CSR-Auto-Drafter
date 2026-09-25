import React, { useState, useEffect } from 'react';
import { FactItem, SectionContent } from '../types';
import { FactCitation } from './FactCitation';
import { 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Bot, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Edit3, 
  Eye, 
  RefreshCw 
} from 'lucide-react';

interface RightPanelProps {
  sections: Record<string, SectionContent>;
  selectedSectionId: string;
  onSelectSection: (sectionId: string) => void;
  activeFactId: string | null;
  onHoverFact: (factId: string | null) => void;
  onClickFact: (factId: string) => void;
  factDictionary: Record<string, FactItem>;
  isSimulatedDiscrepancy: boolean;
  onLogProseEdit: (sectionId: string, oldText: string, newText: string) => void;
  isStudyLocked: boolean;
}

export const RightPanel: React.FC<RightPanelProps> = ({
  sections,
  selectedSectionId,
  onSelectSection,
  activeFactId,
  onHoverFact,
  onClickFact,
  factDictionary,
  isSimulatedDiscrepancy,
  onLogProseEdit,
  isStudyLocked,
}) => {
  const [selectedModel, setSelectedModel] = useState<'claude' | 'gpt4o' | 'gemini'>('claude');
  const [isGenerating, setIsGenerating] = useState(false);
  const [streamedText, setStreamedText] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableMarkdown, setEditableMarkdown] = useState<string>('');

  const currentSection = sections[selectedSectionId] || sections['section_11'];

  // Initialize prose from current section template
  useEffect(() => {
    setStreamedText(currentSection.narrativeTemplate);
    setEditableMarkdown(currentSection.narrativeTemplate);
  }, [selectedSectionId, currentSection]);

  // Simulate Constrained Regulatory LLM Streaming
  const handleGenerateDraft = () => {
    if (isStudyLocked) return;
    setIsGenerating(true);
    setStreamedText('');

    const fullTemplate = currentSection.narrativeTemplate;
    const tokens = fullTemplate.split(/(\s+|<cite[^>]*>.*?<\/cite>)/g).filter(Boolean);
    let currentIdx = 0;
    let accumulated = '';

    const interval = setInterval(() => {
      if (currentIdx < tokens.length) {
        accumulated += tokens[currentIdx];
        setStreamedText(accumulated);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsGenerating(false);
        setEditableMarkdown(fullTemplate);
      }
    }, 28);
  };

  // Parse `<cite factId="fact_xxx">value</cite>` tags into interactive React nodes
  const renderInteractiveNarrative = (rawText: string) => {
    const regex = /<cite\s+factId="([^"]+)">([\s\S]*?)<\/cite>/g;
    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(rawText)) !== null) {
      const matchIndex = match.index;
      const factId = match[1];
      let displayValue = match[2];

      // If simulated discrepancy is active and this is fact_201, alter the value to trigger discrepancy alert
      if (isSimulatedDiscrepancy && factId === 'fact_201') {
        displayValue = '-18.5 mmHg';
      }

      // Add preceding plain text
      if (matchIndex > lastIndex) {
        elements.push(
          <span key={`text-${lastIndex}`} className="leading-relaxed">
            {rawText.substring(lastIndex, matchIndex)}
          </span>
        );
      }

      // Add interactive FactCitation chip
      elements.push(
        <FactCitation
          key={`cite-${factId}-${matchIndex}`}
          factId={factId}
          displayValue={displayValue}
          activeFactId={activeFactId}
          onHover={onHoverFact}
          onClick={onClickFact}
          factDictionary={factDictionary}
          isSimulatedDiscrepancy={isSimulatedDiscrepancy && factId === 'fact_201'}
        />
      );

      lastIndex = regex.lastIndex;
    }

    // Add trailing text
    if (lastIndex < rawText.length) {
      elements.push(
        <span key={`text-${lastIndex}`} className="leading-relaxed">
          {rawText.substring(lastIndex)}
        </span>
      );
    }

    return elements;
  };

  // Calculate Verification Metrics
  const extractedCitations = [...streamedText.matchAll(/<cite\s+factId="([^"]+)">([\s\S]*?)<\/cite>/g)];
  const totalFactsClaimed = extractedCitations.length;
  const verifiedFactsCount = isSimulatedDiscrepancy && totalFactsClaimed > 0 ? totalFactsClaimed - 1 : totalFactsClaimed;
  const discrepancyCount = isSimulatedDiscrepancy ? 1 : 0;
  const verificationPercent = totalFactsClaimed > 0 ? Math.round((verifiedFactsCount / totalFactsClaimed) * 100) : 100;

  return (
    <div className="flex flex-col h-full glass-panel rounded-3xl overflow-hidden shadow-2xl">
      {/* Top Header & Section Selector */}
      <div className="p-6 pb-4 border-b border-white/[0.04] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20 shadow-glow-blue">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                ICH E3 Narrative Drafter
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 font-mono">
                  Module 5.3.5
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Constrained, deterministic regulatory prose generation with zero-hallucination verification
              </p>
            </div>
          </div>

          {/* Section Dropdown Selector */}
          <div className="relative">
            <select
              value={selectedSectionId}
              onChange={(e) => onSelectSection(e.target.value)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] text-zinc-200 border-none ring-1 ring-white/10 hover:ring-white/20 focus:ring-cyan-500/50 outline-none backdrop-blur-xl cursor-pointer"
            >
              <option value="section_11" className="bg-zinc-950 text-white">Section 11: Efficacy Evaluation (Primary)</option>
              <option value="section_10" className="bg-zinc-950 text-white">Section 10: Demographics & Disposition</option>
              <option value="section_12" className="bg-zinc-950 text-white">Section 12: Safety Summary (TEAEs)</option>
            </select>
          </div>
        </div>

        {/* Action Bar: LLM Model Selection & Auto-Drafting Action */}
        <div className="p-3.5 rounded-2xl bg-white/[0.02] ring-1 ring-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.03] ring-1 ring-white/5 text-xs text-zinc-300">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Model:</span>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as any)}
                className="bg-transparent text-white font-semibold outline-none cursor-pointer text-xs"
              >
                <option value="claude" className="bg-zinc-950 text-white">Claude 3.5 Sonnet (Constrained)</option>
                <option value="gpt4o" className="bg-zinc-950 text-white">GPT-4o Regulatory Drafter</option>
                <option value="gemini" className="bg-zinc-950 text-white">Gemini 1.5 Pro Bio</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-500 font-mono px-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Deterministic TAG Active</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isStudyLocked && (
              <button
                onClick={() => setIsEditMode(!isEditMode)}
                className={`p-2 rounded-xl text-xs transition-all ring-1 ${
                  isEditMode
                    ? 'bg-blue-500/20 text-blue-300 ring-blue-500/40'
                    : 'bg-white/5 text-zinc-400 hover:text-white ring-white/5'
                }`}
                title="Toggle manual markdown editing mode"
              >
                {isEditMode ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              </button>
            )}

            <button
              onClick={handleGenerateDraft}
              disabled={isGenerating || isStudyLocked}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-300 backdrop-blur-xl ${
                isGenerating
                  ? 'bg-cyan-600/50 cursor-not-allowed shadow-glow-cyan'
                  : isStudyLocked
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-glow-cyan active:scale-95'
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-200" />
                  <span>Streaming Prose...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  <span>Auto-Draft Section</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Verification Progress Bar */}
        <div className="p-4 rounded-2xl bg-white/[0.02] ring-1 ring-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-white">Validation Audit:</span>
              <span className="text-zinc-300 font-mono">
                {totalFactsClaimed} Claims Extracted
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-mono font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {verifiedFactsCount}/{totalFactsClaimed} Verified ({verificationPercent}%)
              </span>
              {discrepancyCount > 0 && (
                <>
                  <span className="text-zinc-600">•</span>
                  <span className="text-rose-400 font-mono font-bold flex items-center gap-1 animate-pulse">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {discrepancyCount} Discrepancy Found
                  </span>
                </>
              )}
            </div>

            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-md">
              Zero-Hallucination Check: {discrepancyCount === 0 ? 'PASSED' : 'FLAGGED'}
            </span>
          </div>

          {/* Progress Track */}
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden p-0.5 ring-1 ring-white/10">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                discrepancyCount > 0
                  ? 'bg-gradient-to-r from-rose-500 to-amber-500 shadow-glow-rose'
                  : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 shadow-glow-cyan'
              }`}
              style={{ width: `${verificationPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Narrative Editor / Viewer */}
      <div className="flex-1 p-8 overflow-y-auto">
        {isEditMode ? (
          /* Manual Markdown Editor */
          <div className="h-full flex flex-col gap-3">
            <div className="text-xs text-zinc-400 flex items-center justify-between">
              <span>Manual Prose Editor (Wrap statistical numbers in <code className="text-cyan-400">&lt;cite factId="KEY"&gt;VAL&lt;/cite&gt;</code>)</span>
              <button
                onClick={() => {
                  setStreamedText(editableMarkdown);
                  setIsEditMode(false);
                  onLogProseEdit(selectedSectionId, currentSection.narrativeTemplate, editableMarkdown);
                }}
                className="px-3 py-1.5 rounded-lg text-xs bg-cyan-600 text-white font-semibold shadow-glow-cyan"
              >
                Apply & Validate
              </button>
            </div>
            <textarea
              value={editableMarkdown}
              onChange={(e) => setEditableMarkdown(e.target.value)}
              className="flex-1 p-5 rounded-2xl bg-white/[0.02] text-zinc-200 font-mono text-xs leading-relaxed ring-1 ring-white/10 focus:ring-cyan-500/50 outline-none resize-none backdrop-blur-xl"
            />
          </div>
        ) : (
          /* Rich Rendered Document View */
          <div className="max-w-3xl mx-auto space-y-6 text-zinc-200 text-sm leading-relaxed">
            {isGenerating && (
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-3 animate-pulse shadow-glow-cyan mb-4">
                <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
                <span>Streaming regulatory draft conforming to ICH E3 guidelines...</span>
              </div>
            )}

            <div className="p-8 rounded-3xl bg-white/[0.015] ring-1 ring-white/[0.06] shadow-2xl backdrop-blur-xl whitespace-pre-wrap font-sans text-[13.5px] leading-7 tracking-normal selection:bg-cyan-500/20">
              {renderInteractiveNarrative(streamedText)}
            </div>

            {/* Document Quality Sign-Off Banner */}
            <div className="p-4 rounded-2xl bg-white/[0.02] ring-1 ring-white/5 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Traceability Checksum: <strong className="text-zinc-200 font-mono">0x8F7E9A2B1C4D5E6F</strong></span>
              </div>
              <span className="font-mono text-zinc-500">ICH E3 Section Verified</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
