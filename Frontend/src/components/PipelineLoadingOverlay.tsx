import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';

const STAGES = ['CRAWLING', 'ENRICHING', 'ANALYZING', 'REPORTING'] as const;

interface PipelineLoadingOverlayProps {
  isOpen: boolean;
  currentStageIndex: number;
}

export function PipelineLoadingOverlay({ isOpen, currentStageIndex }: PipelineLoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] bg-cyber-bg/85 backdrop-blur-md flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass-panel p-10 max-w-2xl w-full"
          >
            {/* Scrolling EKG */}
            <div className="relative h-16 overflow-hidden mb-8 border-y border-cyber-cyan/25 bg-cyber-bg/40">
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-y-0 flex"
                style={{ width: '200%' }}
              >
                <EKGWave />
                <EKGWave />
              </motion.div>
            </div>

            <div className="text-center mb-8">
              <h2
                className="font-mono text-3xl font-bold text-cyber-cyan tracking-widest mb-2"
                style={{ textShadow: '0 0 14px rgba(0,245,255,0.65)' }}
              >
                PIPELINE RUNNING
              </h2>
              <p className="font-mono text-xs text-cyber-cyan/60 uppercase tracking-[0.25em]">
                Analyzing live threat intelligence feeds
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {STAGES.map((stage, i) => {
                const isComplete = i < currentStageIndex;
                const isActive = i === currentStageIndex;
                return (
                  <motion.div
                    key={stage}
                    animate={isActive ? { opacity: [0.6, 1, 0.6] } : { opacity: 1 }}
                    transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
                    className={`
                      flex items-center gap-4 px-5 py-3.5 font-mono text-sm border transition-colors
                      ${isComplete ? 'border-cyber-green/40 text-cyber-green bg-cyber-green/5' : ''}
                      ${isActive ? 'border-cyber-cyan text-cyber-cyan bg-cyber-cyan/10 shadow-glow-cyan-sm' : ''}
                      ${!isComplete && !isActive ? 'border-slate-700/60 text-slate-500' : ''}
                    `}
                  >
                    <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                      {isComplete ? (
                        <CheckCircle2 size={18} />
                      ) : isActive ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <span className="text-lg">○</span>
                      )}
                    </span>
                    <span className="flex-1 tracking-widest">
                      [ {String(i + 1).padStart(2, '0')} ] {stage}
                    </span>
                    {isComplete && <span className="text-xs">DONE</span>}
                    {isActive && <span className="text-xs animate-pulse">RUNNING_</span>}
                  </motion.div>
                );
              })}
            </div>

            <div className="h-1.5 w-full bg-cyber-bg border border-cyber-cyan/20 overflow-hidden">
              <motion.div
                animate={{ width: `${(currentStageIndex / STAGES.length) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="h-full bg-cyber-cyan shadow-glow-cyan-sm"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function EKGWave() {
  return (
    <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="w-1/2 h-full">
      <path
        d="M0 30 L80 30 L88 30 L94 8 L104 52 L114 4 L124 30 L200 30 L208 30 L213 14 L223 46 L233 30 L400 30"
        fill="none"
        stroke="#00f5ff"
        strokeWidth="2"
        style={{ filter: 'drop-shadow(0 0 5px rgba(0,245,255,0.9))' }}
      />
    </svg>
  );
}