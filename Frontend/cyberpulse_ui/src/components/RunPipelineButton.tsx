import React from 'react';
import { Play } from 'lucide-react';

interface RunPipelineButtonProps {
  onRun: () => void;
  disabled?: boolean;
}

export function RunPipelineButton({ onRun, disabled }: RunPipelineButtonProps) {
  return (
    <button
      onClick={onRun}
      disabled={disabled}
      className={`
        relative overflow-hidden font-mono text-sm font-bold px-6 py-2.5 flex items-center justify-center min-w-[180px]
        transition-all duration-300 border bg-cyber-green/10 border-cyber-green text-cyber-green shadow-glow-green
        hover:bg-cyber-green/20 hover:scale-[1.02]
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-[200%] animate-scanline pointer-events-none opacity-50" />
      <div className="flex items-center gap-2 relative z-10">
        <Play size={16} className="fill-current" />
        <span>RUN PIPELINE</span>
      </div>
    </button>
  );
}
