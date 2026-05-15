import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity } from 'lucide-react';

interface LandingBootProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  '> INITIALIZING CYBERPULSE v1.0.0...',
  '> LOADING THREAT INTELLIGENCE ENGINE...',
  '> CONNECTING TO CTI FEEDS [THN / BleepingComputer / Krebs]...',
  '> CALIBRATING AI ANALYSIS MODELS...',
  '> INDEXING CVE DATABASE...',
  '> ARMING DEFENSE CONTRACTOR PROTOCOLS...',
  '> ALL SYSTEMS NOMINAL.',
  '> READY.',
];

const LINE_DELAY = 300;
const COMPLETE_DELAY = 900;

export function LandingBoot({ onComplete }: LandingBootProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [heartbeatActive, setHeartbeatActive] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Flatline for a moment, then activate heartbeat
    timers.push(setTimeout(() => setHeartbeatActive(true), 600));

    // Type out lines one by one
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, i * LINE_DELAY + 800));
    });

    const afterLines = BOOT_LINES.length * LINE_DELAY + 800;

    // Show title after lines finish
    timers.push(setTimeout(() => setShowTitle(true), afterLines + 300));

    // Exit
    timers.push(setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 800);
    }, afterLines + 300 + COMPLETE_DELAY + 600));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-cyber-bg px-6"
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)',
            }}
          />

          {/* Heartbeat icon — flatlines then pulses */}
          <motion.div
            animate={heartbeatActive
              ? { opacity: [0.5, 1, 0.5], scale: [0.95, 1.1, 0.95] }
              : { opacity: 0.3, scale: 1 }
            }
            transition={heartbeatActive
              ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
              : {}
            }
            className="mb-8 relative"
          >
            <Activity
              className="text-cyber-cyan"
              size={64}
              style={{ filter: 'drop-shadow(0 0 20px rgba(0,245,255,0.9))' }}
            />
            {/* Flatline indicator */}
            {!heartbeatActive && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '120%' }}
                transition={{ duration: 0.5 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 h-px bg-cyber-cyan/40"
              />
            )}
          </motion.div>

          {/* Terminal box */}
          <div className="w-full max-w-xl glass-panel p-6 font-mono text-xs space-y-2.5 mb-6 min-h-[200px]">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={i === visibleLines - 1 ? 'text-cyber-cyan' : 'text-cyber-cyan/45'}
              >
                {line}
                {i === visibleLines - 1 && (
                  <span className="inline-block w-2 h-3 bg-cyber-cyan ml-1 animate-pulse align-middle" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-xl h-1 bg-cyber-bg border border-cyber-cyan/20 mb-2">
            <motion.div
              className="h-full bg-cyber-cyan shadow-glow-cyan"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          <div className="w-full max-w-xl flex justify-between font-mono text-[10px] text-cyber-cyan/40 mb-8">
            <span>BOOT SEQUENCE</span>
            <span>{progress}%</span>
          </div>

          {/* Title */}
          <AnimatePresence>
            {showTitle && (
              <motion.div
                initial={{ opacity: 0, letterSpacing: '0.6em' }}
                animate={{ opacity: 1, letterSpacing: '0.2em' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-5xl font-mono font-bold text-cyber-cyan text-center"
                style={{ textShadow: '0 0 40px rgba(0,245,255,0.9), 0 0 80px rgba(0,245,255,0.4)' }}
              >
                CYBERPULSE
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
