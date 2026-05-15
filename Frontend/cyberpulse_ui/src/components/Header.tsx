import React from 'react';
import { Activity, FolderOpen } from 'lucide-react';
import { RunPipelineButton } from './RunPipelineButton';
import { motion } from 'framer-motion';

interface HeaderProps {
  lastRunTime: string;
  onRunPipeline: () => void;
  onLoadReport: () => void;
  pipelineRunning: boolean;
}

export function Header({ lastRunTime, onRunPipeline, onLoadReport, pipelineRunning }: HeaderProps) {
  return (
    <header className="w-full glass-panel border-t-0 border-l-0 border-r-0 border-b-cyber-cyan/40 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 z-10 relative">
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Activity className="text-cyber-cyan w-9 h-9" />
          </motion.div>
          <h1
            className="text-4xl font-mono font-bold text-cyber-cyan tracking-wider"
            style={{ textShadow: '0 0 14px rgba(0,245,255,0.6)' }}
          >
            CyberPulse
          </h1>
        </div>
        <p className="font-mono text-xs text-cyber-cyan/50 mt-2 uppercase tracking-widest pl-13">
          AI-Powered Threat Intelligence Pipeline — ObjectSecurity
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8">
        <div className="font-mono text-xs text-slate-400 flex flex-col gap-1">
          <span className="text-cyber-cyan/50">
            SYSTEM STATUS: <span className="text-cyber-green">ONLINE</span>
          </span>
          <span>
            LAST RUN: <span className="text-cyber-cyan">{lastRunTime}</span>
          </span>
        </div>

        <button
          onClick={onLoadReport}
          className="flex items-center gap-2 font-mono text-xs px-4 py-2.5 border border-cyber-cyan/50 text-cyber-cyan/70 hover:text-cyber-cyan hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-200"
        >
          <FolderOpen size={14} />
          LOAD REPORT
        </button>

        <RunPipelineButton onRun={onRunPipeline} disabled={pipelineRunning} />
      </div>
    </header>
  );
}
