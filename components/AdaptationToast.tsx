'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sparkles, Zap, X, ShieldCheck, Cpu } from 'lucide-react';
import { ModuleId } from '@/types/chameleon';

export interface ToastPayload {
  id: string;
  moduleId: ModuleId;
  moduleName: string;
  density?: 'compact' | 'standard' | 'spacious';
  personaName?: string;
  timestamp: number;
}

const MODULE_NAMES: Record<ModuleId, { name: string; tag: string; color: string; bg: string; border: string }> = {
  erp: {
    name: 'Chameleon ERP',
    tag: 'Gestão & Faturamento',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/30'
  },
  crm: {
    name: 'Chameleon CRM',
    tag: 'Pipeline & Vendas',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30'
  },
  portal: {
    name: 'Portal Web & B2B',
    tag: 'E-Commerce & Catálogo',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30'
  },
  bi: {
    name: 'Chameleon BI',
    tag: 'Dashboards Executivos',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/30'
  },
  sdk: {
    name: 'Chameleon SDK',
    tag: 'Motor Neural',
    color: 'text-teal-400',
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/30'
  }
};

export function AdaptationToast() {
  const [currentToast, setCurrentToast] = useState<ToastPayload | null>(null);
  const [progress, setProgress] = useState<number>(100);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const lastToastTimeRef = useRef<number>(0);

  const DURATION_MS = 4000;

  const dismissToast = () => {
    setCurrentToast(null);
  };

  useEffect(() => {
    const handleAdaptationCompleted = (e: Event) => {
      const now = Date.now();
      if (now - lastToastTimeRef.current < 600) {
        return;
      }
      lastToastTimeRef.current = now;

      const customEvent = e as CustomEvent<{
        moduleId: ModuleId;
        density?: 'compact' | 'standard' | 'spacious';
        persona?: string;
        timestamp?: number;
      }>;

      const modId = customEvent.detail?.moduleId || 'erp';
      const modInfo = MODULE_NAMES[modId] || MODULE_NAMES.erp;

      const newPayload: ToastPayload = {
        id: `${modId}-${now}`,
        moduleId: modId,
        moduleName: modInfo.name,
        density: customEvent.detail?.density,
        timestamp: customEvent.detail?.timestamp || now
      };

      setCurrentToast(newPayload);
      setProgress(100);
    };

    window.addEventListener('chameleon-adaptation-completed', handleAdaptationCompleted);

    return () => {
      window.removeEventListener('chameleon-adaptation-completed', handleAdaptationCompleted);
    };
  }, []);

  // Handle countdown and progress bar when a toast is active
  useEffect(() => {
    if (!currentToast) return;

    const stepMs = 50;
    const decrement = 100 / (DURATION_MS / stepMs);

    const interval = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev <= decrement) {
            setCurrentToast(null);
            return 0;
          }
          return prev - decrement;
        });
      }
    }, stepMs);

    return () => {
      clearInterval(interval);
    };
  }, [currentToast, isPaused]);

  if (!currentToast) return null;

  const modMeta = MODULE_NAMES[currentToast.moduleId] || MODULE_NAMES.erp;

  return (
    <aside 
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-20 sm:top-24 right-4 sm:right-6 z-50 max-w-sm sm:max-w-md w-full pointer-events-none"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentToast.id}
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.95, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="pointer-events-auto relative overflow-hidden rounded-2xl bg-slate-900/95 border border-emerald-500/40 shadow-2xl shadow-emerald-950/50 backdrop-blur-xl p-4 sm:p-4.5"
        >
          {/* Ambient Glow Pulse inside Toast */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              {/* Animated Success Badge */}
              <div className="relative shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500/30 to-teal-500/20 border border-emerald-400/50 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 animate-in zoom-in-50 duration-200" />
                </div>
                <span className="absolute -bottom-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                </span>
              </div>

              {/* Title & Module */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white tracking-tight">
                    Adaptação Visual Aplicada!
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${modMeta.bg} ${modMeta.color} ${modMeta.border}`}>
                    {modMeta.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  Layout reestruturado em tempo real pela rede neural ergonômica do Chameleon.
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={dismissToast}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors shrink-0 cursor-pointer"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/60">
              <span className="text-slate-400 block text-[9px]">Latência</span>
              <span className="text-emerald-400 font-bold">&lt;18ms</span>
            </div>
            <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/60">
              <span className="text-slate-400 block text-[9px]">Cliques</span>
              <span className="text-cyan-400 font-bold">-4.2 p/ tarefa</span>
            </div>
            <div className="bg-slate-950/60 p-1.5 rounded-lg border border-slate-800/60">
              <span className="text-slate-400 block text-[9px]">Brand-Lock</span>
              <span className="text-teal-400 font-bold">100% Zero-PII</span>
            </div>
          </div>

          {/* Auto-dismiss Animated Progress Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.05 }}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
