import React from 'react';
import { StatCard } from './StatCard';
import { ThreatData } from '../types/threat';
import { motion } from 'framer-motion';

interface ExecutiveSummaryProps {
  data: ThreatData['statistics'];
}

export function ExecutiveSummary({ data }: ExecutiveSummaryProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-full flex flex-wrap gap-5 mb-10"
    >
      <motion.div variants={itemVariants} className="flex-1 min-w-[130px]">
        <StatCard label="Critical" value={data.by_threat_level['Critical'] ?? 0} color="red" />
      </motion.div>
      <motion.div variants={itemVariants} className="flex-1 min-w-[130px]">
        <StatCard label="High" value={data.by_threat_level['High'] ?? 0} color="amber" />
      </motion.div>
      <motion.div variants={itemVariants} className="flex-1 min-w-[130px]">
        <StatCard label="Medium" value={data.by_threat_level['Medium'] ?? 0} color="cyan" />
      </motion.div>
      <motion.div variants={itemVariants} className="flex-1 min-w-[130px]">
        <StatCard label="Low" value={data.by_threat_level['Low'] ?? 0} color="green" />
      </motion.div>

      <div className="w-px bg-cyber-cyan/20 hidden lg:block mx-3" />

      <motion.div variants={itemVariants} className="flex gap-5 w-full lg:w-auto">
        <StatCard label="CVEs Identified" value={data.cves_identified.length} color="cyan" isSmall />
        <StatCard label="Patches Available" value={data.patch_available_count} color="green" isSmall />
      </motion.div>
    </motion.div>
  );
}
