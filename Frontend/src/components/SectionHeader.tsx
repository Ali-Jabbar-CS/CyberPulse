import React from 'react';
interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
}
export function SectionHeader({ title, icon }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 mb-4 border-b border-cyber-cyan/20 pb-2">
      {icon && <span className="text-cyber-cyan">{icon}</span>}
      <h2 className="font-mono text-cyber-cyan text-sm tracking-widest uppercase font-semibold flex items-center">
        <span className="text-cyber-cyan/50 mr-2">[</span>
        {title}
        <span className="text-cyber-cyan/50 ml-2">]</span>
        <span className="ml-2 w-2 h-4 bg-cyber-cyan animate-pulse inline-block opacity-70"></span>
      </h2>
    </div>);

}