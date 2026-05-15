import React from 'react';
import { SectionHeader } from './SectionHeader';
import { ThreatCard } from './ThreatCard';
import { Article } from '../types/threat';
import { AlertOctagon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThreatListProps {
  articles: Article[];
  activeSector: string | null;
  onClearFilter: () => void;
}

export function ThreatList({ articles, activeSector, onClearFilter }: ThreatListProps) {
  const filtered = activeSector
    ? articles.filter((a) => a.analysis?.affected_sectors?.includes(activeSector))
    : articles;

  const sorted = [...filtered].sort(
    (a, b) => (b.analysis?.priority_score ?? 0) - (a.analysis?.priority_score ?? 0)
  );

  return (
    <div>
      <SectionHeader
        title={
          activeSector
            ? `THREATS — ${activeSector.toUpperCase()} (${sorted.length} OF ${articles.length})`
            : `TOP PRIORITY THREATS (${articles.length})`
        }
        icon={<AlertOctagon size={18} />}
      />

      <AnimatePresence>
        {activeSector && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 mb-6 px-4 py-3 border border-cyber-cyan/50 bg-cyber-cyan/10"
          >
            <span className="font-mono text-xs text-cyber-cyan/70 uppercase tracking-widest">
              Filtered by sector:
            </span>
            <span className="font-mono text-sm text-cyber-cyan font-bold">{activeSector}</span>
            <button
              onClick={onClearFilter}
              className="ml-auto flex items-center gap-1 font-mono text-xs text-cyber-cyan/70 hover:text-cyber-cyan transition-colors"
            >
              CLEAR <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6">
        {sorted.length === 0 ? (
          <div className="glass-panel p-8 text-center font-mono text-sm text-cyber-cyan/60">
            No threats match the current filter.
          </div>
        ) : (
          sorted.map((article, index) => (
            <motion.div
              key={article.id ?? article.url ?? index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 + index * 0.04, ease: 'easeOut' }}
            >
              <ThreatCard article={article} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}