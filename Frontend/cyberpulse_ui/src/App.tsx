import React, { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './components/Header';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { ThreatList } from './components/ThreatList';
import { AttackTypeChart } from './components/AttackTypeChart';
import { SectorCloud } from './components/SectorCloud';
import { LandingScreen } from './components/LandingScreen';
import { PipelineLoadingOverlay } from './components/PipelineLoadingOverlay';
import { threatData as defaultData } from './data/threatData';
import { ThreatData } from './types/threat';

// ╔══════════════════════════════════════════════════════════════════════╗
// ║  CHANGE THIS to 'cinematic' or 'boot' to swap landing animation     ║
// ╚══════════════════════════════════════════════════════════════════════╝
const LANDING_VARIANT: 'boot' | 'cinematic' = 'cinematic';
const API_BASE = 'http://localhost:8000/api';

const STAGE_MAP: Record<string, number> = {
  crawling: 0,
  enriching: 1,
  analyzing: 2,
  reporting: 3,
};

export function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [data, setData] = useState<ThreatData>(defaultData);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [serverOnline, setServerOnline] = useState(false);
  const [activeSector, setActiveSector] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [lastRunTime, setLastRunTime] = useState(
    new Date(defaultData.report_metadata.generated_at)
      .toLocaleString('en-US', { hour12: false })
      .replace(',', '')
  );

  // Auto-load report from server on mount
  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await fetch(`${API_BASE}/report`);
      if (!res.ok) throw new Error('bad response');
      const json = await res.json();
      setServerOnline(true);
      if (!json.error) {
        setData(json);
        setLastRunTime(
          new Date(json.report_metadata.generated_at)
            .toLocaleString('en-US', { hour12: false })
            .replace(',', '')
        );
      }
    } catch {
      setServerOnline(false);
    }
  };

  const handleRunPipeline = async () => {
    setLoadError(null);
    try {
      const res = await fetch(`${API_BASE}/run`, { method: 'POST' });
      const json = await res.json();
      if (json.error) {
        setLoadError(json.error);
        return;
      }
      if (json.started) {
        setCurrentStageIndex(0);
        setPipelineRunning(true);
        pollStatus();
      }
    } catch {
      setLoadError('Cannot connect to pipeline server. Start server.py in your venv.');
    }
  };

  const pollStatus = () => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${API_BASE}/status`);
        const status = await res.json();

        if (status.stage && status.stage in STAGE_MAP) {
          setCurrentStageIndex(STAGE_MAP[status.stage]);
        }

        if (status.status === 'complete') {
          clearInterval(interval);
          setCurrentStageIndex(4);
          await new Promise((r) => setTimeout(r, 800));
          await fetchReport();
          setPipelineRunning(false);
        } else if (status.status === 'error') {
          clearInterval(interval);
          setLoadError(`Pipeline error: ${status.error}`);
          setPipelineRunning(false);
        }
      } catch {
        clearInterval(interval);
        setPipelineRunning(false);
      }
    }, 1000);
  };

  const handleLoadReport = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string) as ThreatData;
        setData(parsed);
        setLoadError(null);
        setLastRunTime(
          new Date(parsed.report_metadata.generated_at)
            .toLocaleString('en-US', { hour12: false })
            .replace(',', '')
        );
      } catch {
        setLoadError('Invalid JSON — make sure you selected threat_report.json');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
      <AnimatePresence>
        {showLanding && (
          <LandingScreen variant={LANDING_VARIANT} onComplete={() => setShowLanding(false)} />
        )}
      </AnimatePresence>

      <PipelineLoadingOverlay isOpen={pipelineRunning} currentStageIndex={currentStageIndex} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showLanding ? 0 : 1 }}
        transition={{ duration: 0.8, delay: showLanding ? 0 : 0.2 }}
        className="min-h-screen w-full relative px-6 py-6 md:px-10 md:py-8 lg:px-14 lg:py-10"
      >
        <div className="fixed top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyber-cyan/40 pointer-events-none z-40" />
        <div className="fixed top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyber-cyan/40 pointer-events-none z-40" />
        <div className="fixed bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-cyber-cyan/40 pointer-events-none z-40" />
        <div className="fixed bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyber-cyan/40 pointer-events-none z-40" />

        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          className="hidden"
          onChange={handleFileChange}
        />

        <Header
          lastRunTime={lastRunTime}
          onRunPipeline={handleRunPipeline}
          onLoadReport={handleLoadReport}
          pipelineRunning={pipelineRunning}
        />

        {!serverOnline && (
          <div className="mt-4 px-4 py-3 border border-cyber-amber/60 bg-cyber-amber/10 font-mono text-xs text-cyber-amber">
            ⚠ Pipeline server offline — showing demo data. Start server.py to run real pipeline.
          </div>
        )}

        {loadError && (
          <div className="mt-4 px-4 py-3 border border-cyber-red/60 bg-cyber-red/10 font-mono text-xs text-cyber-red">
            ⚠ {loadError}
          </div>
        )}

        <main className="mt-10">
          <ExecutiveSummary data={data.statistics} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
            <div className="lg:col-span-7 xl:col-span-8 min-w-0">
              <ThreatList
                articles={data.articles}
                activeSector={activeSector}
                onClearFilter={() => setActiveSector(null)}
              />
            </div>

            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-8 min-w-0">
              <AttackTypeChart data={data.statistics.by_attack_type} />
              <SectorCloud
                data={data.statistics.by_sector}
                activeSector={activeSector}
                onSectorClick={setActiveSector}
              />

              <div className="glass-panel p-5 mt-auto opacity-60">
                <div className="font-mono text-[11px] text-cyber-cyan/60 space-y-2 leading-relaxed">
                  <div>&gt; INITIALIZING NEURAL THREAT ENGINE... OK</div>
                  <div>&gt; INGESTING CTI FEEDS ({data.report_metadata.sources.length} SOURCES)... OK</div>
                  <div>&gt; CORRELATING CVE DATA... OK</div>
                  <div>&gt; {data.statistics.cves_identified.length} CVEs INDEXED... OK</div>
                  <div className="animate-pulse">&gt; AWAITING COMMAND_</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </>
  );
}