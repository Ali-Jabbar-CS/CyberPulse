import React, { useState } from 'react';
import { Article, ThreatLevel } from '../types/threat';
import { ChevronRight, ChevronDown, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThreatCardProps {
  article: Article;
}

const levelColors: Record<ThreatLevel, string> = {
  Critical: 'bg-cyber-red text-black shadow-glow-red',
  High: 'bg-cyber-amber text-black shadow-glow-amber',
  Medium: 'bg-cyber-cyan text-black shadow-glow-cyan-sm',
  Low: 'bg-cyber-green text-black shadow-glow-green',
};
const levelTextColors: Record<ThreatLevel, string> = {
  Critical: 'text-cyber-red',
  High: 'text-cyber-amber',
  Medium: 'text-cyber-cyan',
  Low: 'text-cyber-green',
};

export function ThreatCard({ article }: ThreatCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { analysis } = article;
  const threatLevel = (analysis.threat_level as ThreatLevel) in levelColors
    ? (analysis.threat_level as ThreatLevel)
    : 'Low';

  return (
    <motion.div
      layout
      className={`
        glass-panel mb-6 transition-colors duration-300 overflow-hidden
        ${isExpanded ? 'border-cyber-cyan/60 bg-cyber-panel/20' : 'hover:border-cyber-cyan/50 hover:bg-cyber-panel/10'}
      `}
    >
      {/* Collapsed header */}
      <div
        className="p-6 cursor-pointer flex items-start gap-5"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Threat level badge */}
        <div
          className={`
            font-mono text-xs font-bold px-3 py-1.5 uppercase tracking-wider
            min-w-[90px] text-center flex-shrink-0 mt-0.5
            ${levelColors[threatLevel]}
          `}
        >
          {analysis.threat_level}
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-5">
            <h3 className="text-white font-semibold text-lg leading-snug mb-2 min-w-0">
              {article.title}
            </h3>
            <div
              className={`font-mono text-2xl font-bold flex-shrink-0 ${levelTextColors[threatLevel]}`}
              style={{ textShadow: '0 0 10px currentColor' }}
            >
              {analysis.priority_score}/10
            </div>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cyber-cyan/60 hover:text-cyber-cyan hover:underline truncate max-w-[220px]"
              onClick={(e) => e.stopPropagation()}
            >
              {article.source}
            </a>

            <div className="flex gap-2 flex-wrap">
              {article.cve_ids.map((cve) => (
                <span
                  key={cve}
                  className="font-mono text-[10px] border border-cyber-green text-cyber-green px-2 py-0.5 bg-cyber-green/10"
                >
                  {cve}
                </span>
              ))}
            </div>

            {article.patch_available ? (
              <span className="flex items-center gap-1 font-mono text-[10px] text-cyber-green">
                <CheckCircle2 size={12} /> PATCH AVAILABLE
              </span>
            ) : (
              <span className="flex items-center gap-1 font-mono text-[10px] text-cyber-red">
                <XCircle size={12} /> NO PATCH
              </span>
            )}
          </div>

          {/* Sector tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {analysis.affected_sectors.map((sector) => (
              <span
                key={sector}
                className="font-mono text-[10px] border border-cyber-cyan/40 text-cyber-cyan/80 px-2.5 py-1 rounded-sm"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        <div className="text-cyber-cyan/50 mt-1 flex-shrink-0">
          {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="border-t border-cyber-cyan/20 bg-black/20"
          >
            <div className="p-6 space-y-6 font-mono text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-cyber-cyan/50 text-xs mb-2 tracking-widest">[ THREAT_SUMMARY ]</div>
                  <div className="text-slate-300 leading-relaxed">{analysis.threat_summary}</div>
                </div>
                <div>
                  <div className="text-cyber-cyan/50 text-xs mb-2 tracking-widest">[ ATTACK_VECTOR ]</div>
                  <div className="text-slate-300 leading-relaxed">{analysis.attack_vector}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-cyber-cyan/50 text-xs mb-2 tracking-widest">[ AFFECTED_SYSTEMS ]</div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {analysis.affected_systems.map((sys) => (
                      <li key={sys}>{sys}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-cyber-cyan/50 text-xs mb-2 tracking-widest">[ RELEVANCE_TO_DEFENSE ]</div>
                  <div className="text-cyber-amber/90 leading-relaxed">{analysis.relevance_to_defense}</div>
                </div>
              </div>

              <div className="bg-cyber-amber/10 border border-cyber-amber/30 p-4 flex items-start gap-4">
                <AlertTriangle className="text-cyber-amber shrink-0 mt-0.5" size={16} />
                <div>
                  <div className="text-cyber-amber text-xs font-bold mb-2 tracking-widest">
                    RECOMMENDED_ACTION:
                  </div>
                  <div className="text-cyber-amber/90 text-xs leading-relaxed">
                    {analysis.recommended_action}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
