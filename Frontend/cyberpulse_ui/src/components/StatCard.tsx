import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: number | string;
  color: 'red' | 'amber' | 'green' | 'cyan';
  isSmall?: boolean;
}

export function StatCard({ label, value, color, isSmall = false }: StatCardProps) {
  const colorMap = {
    red: 'border-cyber-red/40 bg-cyber-red/5 text-cyber-red',
    amber: 'border-cyber-amber/40 bg-cyber-amber/5 text-cyber-amber',
    green: 'border-cyber-green/40 bg-cyber-green/5 text-cyber-green',
    cyan: 'border-cyber-cyan/40 bg-cyber-cyan/5 text-cyber-cyan',
  };
  const hoverMap = {
    red: 'hover:border-cyber-red hover:bg-cyber-red/15 hover:shadow-glow-red',
    amber: 'hover:border-cyber-amber hover:bg-cyber-amber/15 hover:shadow-glow-amber',
    green: 'hover:border-cyber-green hover:bg-cyber-green/15 hover:shadow-glow-green',
    cyan: 'hover:border-cyber-cyan hover:bg-cyber-cyan/15 hover:shadow-glow-cyan',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        flex flex-col justify-center cursor-default border backdrop-blur-sm
        transition-all duration-200
        ${isSmall ? 'p-5 min-w-[150px]' : 'p-7 flex-1 min-w-[130px]'}
        ${colorMap[color]} ${hoverMap[color]}
      `}
    >
      <div className={`font-mono font-bold leading-none ${isSmall ? 'text-4xl mb-2' : 'text-6xl mb-3'}`}>
        {value}
      </div>
      <div className="font-mono text-xs uppercase tracking-widest opacity-70 text-slate-300">
        {label}
      </div>
    </motion.div>
  );
}