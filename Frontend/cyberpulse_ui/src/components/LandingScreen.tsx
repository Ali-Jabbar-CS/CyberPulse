import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingScreenProps {
  variant: 'boot' | 'cinematic';
  onComplete: () => void;
}

export function LandingScreen({ variant, onComplete }: LandingScreenProps) {
  return variant === 'boot' ? (
    <BootSequence onComplete={onComplete} />
  ) : (
    <CinematicLanding onComplete={onComplete} />
  );
}

/* Small continuously scrolling EKG monitor */
function EKGMonitor({ width = 200, height = 64 }: { width?: number; height?: number }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width, height }}
    >
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
  );
}

function EKGWave() {
  return (
    <svg viewBox="0 0 200 60" preserveAspectRatio="none" className="w-1/2 h-full">
      <path
        d="M0 30 L40 30 L44 30 L47 8 L52 52 L57 4 L62 30 L100 30 L104 30 L106 14 L111 46 L116 30 L200 30"
        fill="none"
        stroke="#00f5ff"
        strokeWidth="2.5"
        style={{ filter: 'drop-shadow(0 0 8px rgba(0,245,255,1))' }}
      />
    </svg>
  );
}

/* ---------- BOOT SEQUENCE VARIANT ---------- */
function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);
  const lines = [
    '> INITIALIZING NEURAL THREAT ENGINE...',
    '> LOADING CTI MODULES... [4 SOURCES]',
    '> CONNECTING TO NVD DATABASE...',
    '> SYNCHRONIZING THREAT FEEDS...',
    '> SYSTEM READY.',
  ];

  useEffect(() => {
    if (stage < lines.length) {
      const t = setTimeout(() => setStage((s) => s + 1), 450);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onComplete, 1600);
      return () => clearTimeout(t);
    }
  }, [stage]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-cyber-bg flex flex-col items-center justify-center font-mono px-8"
    >
      <div className="flex flex-col items-center text-center max-w-2xl w-full">
        {/* Logo at top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            className="text-7xl font-bold text-cyber-cyan tracking-widest"
            style={{ textShadow: '0 0 24px rgba(0,245,255,0.85)' }}
          >
            CyberPulse
          </h1>
          <p className="text-cyber-cyan/60 text-xs uppercase tracking-[0.3em] mt-3">
            Threat Intelligence Online
          </p>
        </motion.div>

        {/* EKG monitor under logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="my-10"
        >
          <EKGMonitor width={480} height={56} />
        </motion.div>

        {/* Stages at bottom, centered */}
        <div className="text-cyber-green text-sm leading-relaxed min-h-[180px] flex flex-col items-center gap-2.5">
          {lines.slice(0, stage).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              {line}
              {i === stage - 1 && stage < lines.length && (
                <span className="inline-block w-2 h-4 bg-cyber-green ml-1 animate-pulse" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- CINEMATIC FADE VARIANT ---------- */
function CinematicLanding({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 2400);
    const t3 = setTimeout(onComplete, 3600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-cyber-bg flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Logo at top */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="text-center"
      >
        <h1
          className="text-7xl md:text-8xl font-mono font-bold text-cyber-cyan tracking-widest"
          style={{ textShadow: '0 0 30px rgba(0,245,255,0.8)' }}
        >
          CyberPulse
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-xs text-cyber-cyan/60 uppercase tracking-[0.35em] mt-6"
        >
          AI-Powered Threat Intelligence
        </motion.p>
      </motion.div>

      {/* EKG under logo */}
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mt-10"
          >
            <EKGMonitor width={650} height={56} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scan line sweep */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            initial={{ top: '-5%', opacity: 0 }}
            animate={{ top: '105%', opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed left-0 right-0 h-[2px] bg-cyber-cyan z-[101] pointer-events-none"
            style={{ boxShadow: '0 0 24px rgba(0,245,255,1)' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}