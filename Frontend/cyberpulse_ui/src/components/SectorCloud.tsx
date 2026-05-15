import React from 'react';
import { SectionHeader } from './SectionHeader';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface SectorCloudProps {
  data: Record<string, number>;
  activeSector: string | null;
  onSectorClick: (sector: string | null) => void;
}

export function SectorCloud({ data, activeSector, onSectorClick }: SectorCloudProps) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  const handleClick = (sector: string) => {
    onSectorClick(activeSector === sector ? null : sector);
  };

  return (
    <div className="glass-panel p-7">
      <SectionHeader title="AFFECTED SECTORS" icon={<Shield size={18} />} />
      <p className="font-mono text-[10px] text-cyber-cyan/50 uppercase tracking-widest mb-4">
        Click a sector to filter threats
      </p>

      <div className="flex flex-wrap gap-4 mt-6 justify-center items-center py-4">
        {entries.map(([sector, count], index) => {
          const isActive = activeSector === sector;
          const isTopTwo = index < 2;
          const isMid = index >= 2 && index < 4;

          let colorClass = 'border-cyber-green/40 text-cyber-green bg-cyber-green/5 hover:bg-cyber-green/15';
          if (isTopTwo) {
            colorClass = 'border-cyber-red text-cyber-red bg-cyber-red/10 shadow-glow-red font-bold hover:bg-cyber-red/20';
          } else if (isMid) {
            colorClass = 'border-cyber-cyan/60 text-cyber-cyan bg-cyber-cyan/10 shadow-glow-cyan-sm hover:bg-cyber-cyan/20';
          }

          if (isActive) {
            colorClass = 'border-cyber-cyan bg-cyber-cyan/30 text-white shadow-glow-cyan font-bold ring-2 ring-cyber-cyan ring-offset-2 ring-offset-cyber-bg';
          }

          let sizeClass = 'text-xs px-3 py-1.5';
          if (index === 0) sizeClass = 'text-xl px-5 py-2.5';
          else if (index === 1) sizeClass = 'text-lg px-4 py-2';
          else if (isMid) sizeClass = 'text-sm px-3.5 py-1.5';

          return (
            <motion.button
              key={sector}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleClick(sector)}
              className={`border rounded-sm font-mono transition-all cursor-pointer ${colorClass} ${sizeClass}`}
            >
              {sector} <span className="opacity-50 ml-1">({count})</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}