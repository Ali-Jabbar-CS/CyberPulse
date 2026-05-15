import React from 'react';
import { SectionHeader } from './SectionHeader';
import { Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

interface AttackTypeChartProps {
  data: Record<string, number>;
}

export function AttackTypeChart({ data }: AttackTypeChartProps) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...entries.map((e) => e[1]), 1);

  return (
    <div className="glass-panel p-7">
      <SectionHeader title="ATTACK VECTORS" icon={<Terminal size={18} />} />

      <div className="space-y-5 mt-5">
        {entries.map(([type, count], index) => {
          const percentage = (count / maxCount) * 100;
          return (
            <div key={type} className="flex flex-col gap-2 group">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-300 group-hover:text-cyber-cyan transition-colors">
                  {type}
                </span>
                <span className="text-cyber-cyan font-bold">{count}</span>
              </div>
              <div className="h-2.5 w-full bg-cyber-bg border border-cyber-cyan/20 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                  className="absolute top-0 left-0 h-full bg-cyber-cyan shadow-glow-cyan-sm"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
