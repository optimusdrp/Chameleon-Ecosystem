'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  Zap, 
  CheckCircle2, 
  Cpu, 
  LayoutGrid, 
  ShoppingCart, 
  Building2, 
  BarChart3, 
  TrendingUp,
  Eye, 
  Command,
  MousePointerClick
} from 'lucide-react';
import { ModuleId } from '@/types/chameleon';
import { AestheticTheme } from '@/types/theme';

interface HeroProps {
  onOpenDemoModal: () => void;
  onNavigateToSimulator: () => void;
  currentTheme?: AestheticTheme;
  selectedModule?: ModuleId;
  onSelectModule?: (moduleId: ModuleId) => void;
  isAdapting?: boolean;
  onTriggerAdaptation?: (moduleId?: ModuleId) => void;
}

export function Hero({ 
  onOpenDemoModal, 
  onNavigateToSimulator,
  currentTheme = 'modern-minimalist',
  selectedModule,
  onSelectModule,
  isAdapting = false,
  onTriggerAdaptation
}: HeroProps) {
  // Local state as fallback if not controlled
  const [localModule, setLocalModule] = useState<ModuleId>('erp');
  const [localAdaptationActive, setLocalAdaptationActive] = useState(false);
  const [simulationToggledCount, setSimulationToggledCount] = useState(0);

  const activeHeroModule = selectedModule ?? localModule;
  const adaptationActive = isAdapting || localAdaptationActive;

  // Listen for global module change and adaptation events
  useEffect(() => {
    const handleAdaptationEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ moduleId?: ModuleId }>;
      if (customEvent.detail?.moduleId) {
        setLocalModule(customEvent.detail.moduleId);
        onSelectModule?.(customEvent.detail.moduleId);
      }
      setLocalAdaptationActive(true);
      setSimulationToggledCount((prev) => prev + 1);
      setTimeout(() => {
        setLocalAdaptationActive(false);
      }, 1800);
    };

    const handleModuleChangeEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ moduleId: ModuleId }>;
      if (customEvent.detail?.moduleId) {
        setLocalModule(customEvent.detail.moduleId);
        onSelectModule?.(customEvent.detail.moduleId);
      }
    };

    window.addEventListener('chameleon-trigger-adaptation', handleAdaptationEvent);
    window.addEventListener('chameleon-module-change', handleModuleChangeEvent);
    window.addEventListener('chameleon-apply-layout', handleAdaptationEvent);

    return () => {
      window.removeEventListener('chameleon-trigger-adaptation', handleAdaptationEvent);
      window.removeEventListener('chameleon-module-change', handleModuleChangeEvent);
      window.removeEventListener('chameleon-apply-layout', handleAdaptationEvent);
    };
  }, [onSelectModule]);

  const handleSelectModuleTab = (mod: ModuleId) => {
    setLocalModule(mod);
    if (onSelectModule) {
      onSelectModule(mod);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('chameleon-module-change', {
          detail: { moduleId: mod }
        })
      );
      window.dispatchEvent(
        new CustomEvent('chameleon-simulator-context-change', {
          detail: { moduleId: mod }
        })
      );
    }
  };

  const handleHeroSimulate = () => {
    setSimulationToggledCount((prev) => prev + 1);
    setLocalAdaptationActive(true);

    if (onTriggerAdaptation) {
      onTriggerAdaptation(activeHeroModule);
    } else {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('chameleon-trigger-adaptation', {
            detail: { moduleId: activeHeroModule }
          })
        );
      }
    }

    setTimeout(() => {
      setLocalAdaptationActive(false);
      if (typeof window !== 'undefined' && !onTriggerAdaptation) {
        window.dispatchEvent(
          new CustomEvent('chameleon-adaptation-completed', {
            detail: { moduleId: activeHeroModule, timestamp: Date.now() }
          })
        );
      }
    }, 1800);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-subtle">
      {/* Ambient Radial Lights */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] blur-[120px] rounded-full pointer-events-none transition-all duration-700 bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-cyan-500/15"
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 -left-32 w-[350px] h-[350px] blur-[100px] rounded-full pointer-events-none transition-all duration-700 bg-emerald-600/10"
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Narrative & Conversion CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            {/* Ambient Meta kicker */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">
                Ecossistema de Interfaces Neurais Plug-and-Play
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-emerald-400 font-semibold">Zero Código Extra</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display text-balance leading-[1.12]">
              Interfaces que{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                aprendem seus hábitos
              </span>{' '}
              e se adaptam em tempo real.
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              O <strong className="text-white font-semibold">Chameleon</strong> é um ecossistema modular independente que se conecta aos seus <span className="text-emerald-300">ERPs</span>, <span className="text-sky-300">CRMs</span>, <span className="text-violet-300">Portais Web</span> e ferramentas digitais. Ele observa o comportamento ergonômico e remodela layout, paletas cromáticas e atalhos mais usados instantaneamente para cada usuário.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onNavigateToSimulator}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all duration-200 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sliders className="w-4 h-4 transition-transform group-hover:rotate-45" />
                <span>Testar Simulador Interativo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenDemoModal}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Configurar Meus Módulos</span>
                <span className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Escolha Livre</span>
              </button>
            </div>

            {/* Quantitative Proof Strip */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <p className="text-2xl font-bold text-white font-display tabular-nums">+44%</p>
                <p className="text-xs text-slate-400">Velocidade em tarefas</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400 font-display tabular-nums">&lt;18ms</p>
                <p className="text-xs text-slate-400">Latência de adaptação</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-cyan-400 font-display tabular-nums">-61%</p>
                <p className="text-xs text-slate-400">Cliques repetitivos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-teal-400 font-display tabular-nums">0 linhas</p>
                <p className="text-xs text-slate-400">De código no backend</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Live Morphing Preview Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Glow Border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500/40 via-teal-500/30 to-cyan-500/40 opacity-70 blur-lg transition duration-500 group-hover:opacity-100" />

              {/* Main Card Shell */}
              <div className="relative rounded-2xl bg-slate-900/95 border border-slate-700/90 p-5 shadow-2xl backdrop-blur-xl">
                
                {/* Header of Simulated Frame */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400">chameleon://adaptive-engine</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    <Cpu className="w-3 h-3 animate-spin" />
                    <span>Telemetria em Tempo Real</span>
                  </div>
                </div>

                {/* Module Quick Pill Switcher inside Hero */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between">
                    <span>Clique para alternar o módulo de teste:</span>
                    <span className="text-emerald-400 font-mono text-[10px]">
                      {activeHeroModule === 'erp' && 'Módulo: Gestão ERP'}
                      {activeHeroModule === 'crm' && 'Módulo: CRM & Vendas'}
                      {activeHeroModule === 'portal' && 'Módulo: E-Commerce Web'}
                      {activeHeroModule === 'bi' && 'Módulo: BI & Analytics'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
                    <button
                      onClick={() => handleSelectModuleTab('erp')}
                      className={`px-1.5 sm:px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer min-w-0 ${
                        activeHeroModule === 'erp'
                          ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">ERP Gestão</span>
                    </button>
                    <button
                      onClick={() => handleSelectModuleTab('crm')}
                      className={`px-1.5 sm:px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer min-w-0 ${
                        activeHeroModule === 'crm'
                          ? 'bg-violet-500 text-white font-bold shadow-md shadow-violet-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <BarChart3 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">CRM Vendas</span>
                    </button>
                    <button
                      onClick={() => handleSelectModuleTab('portal')}
                      className={`px-1.5 sm:px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer min-w-0 ${
                        activeHeroModule === 'portal'
                          ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Portal Web</span>
                    </button>
                    <button
                      onClick={() => handleSelectModuleTab('bi')}
                      className={`px-1.5 sm:px-2 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer min-w-0 ${
                        activeHeroModule === 'bi'
                          ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">BI Analytics</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Screen Morph Container */}
                <div className="relative min-h-[260px] rounded-xl bg-slate-950/90 border border-slate-800 p-4 overflow-hidden transition-all duration-300">
                  
                  {/* Visual Scanning Animation Overlay during adaptation trigger */}
                  {adaptationActive && (
                    <motion.div
                      initial={{ top: '-10%' }}
                      animate={{ top: '110%' }}
                      transition={{ duration: 1.6, ease: 'easeInOut' }}
                      className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-emerald-400/25 to-transparent pointer-events-none z-30 border-y border-emerald-400/50"
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {/* ERP Morph Screen */}
                    {activeHeroModule === 'erp' && (
                      <motion.div
                        key="erp-hero"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-[10px]">
                              ERP
                            </div>
                            <div>
                              <p className="font-semibold text-white">Central de Faturamento & Estoque</p>
                              <p className="text-[10px] text-slate-400">Ambiente Operacional Corporativo</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded font-mono">
                            Modo: Operador Sênior
                          </span>
                        </div>

                        {/* Adaptive Dynamic Shortcut Bar */}
                        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <div className="flex items-center justify-between mb-1.5 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-sky-400" />
                              Atalhos Promovidos por Frequência de Uso:
                            </span>
                            <span className="text-sky-300 font-mono">Auto-organizado</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[11px] px-2 py-1 bg-sky-500/20 text-sky-200 border border-sky-500/30 rounded font-medium flex items-center gap-1">
                              <span>Emitir NFe [⌘E]</span>
                            </span>
                            <span className="text-[11px] px-2 py-1 bg-slate-800 text-slate-300 rounded flex items-center gap-1">
                              <span>Liberar Lote #409</span>
                            </span>
                            <span className="text-[11px] px-2 py-1 bg-slate-800 text-slate-300 rounded flex items-center gap-1">
                              <span>Conciliação PIX</span>
                            </span>
                          </div>
                        </div>

                        {/* Dynamic Table Simulation */}
                        <div className="space-y-1.5 text-[11px]">
                          <div className="flex items-center justify-between text-slate-400 px-2 py-1 bg-slate-900/60 rounded gap-2">
                            <span className="truncate text-[11px]">Pedido #8942 - Metalúrgica Sul</span>
                            <span className="text-emerald-400 font-mono text-[10px] sm:text-[11px] shrink-0">R$ 48.900 · Aprovado</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400 px-2 py-1 bg-slate-900/40 rounded gap-2">
                            <span className="truncate text-[11px]">Pedido #8941 - Alfa Comércio</span>
                            <span className="text-amber-400 font-mono text-[10px] sm:text-[11px] shrink-0">R$ 12.350 · Pend. Fiscal</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400 px-2 py-1 bg-slate-900/40 rounded gap-2">
                            <span className="truncate text-[11px]">Pedido #8940 - Distribuidora K</span>
                            <span className="text-sky-400 font-mono text-[10px] sm:text-[11px] shrink-0">R$ 82.100 · Expedição</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* CRM Morph Screen */}
                    {activeHeroModule === 'crm' && (
                      <motion.div
                        key="crm-hero"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-violet-500/20 text-violet-400 flex items-center justify-center font-bold text-[10px]">
                              CRM
                            </div>
                            <div>
                              <p className="font-semibold text-white">Pipeline de Fechamento Rápido</p>
                              <p className="text-[10px] text-slate-400">Equipe de Vendas Consultivas</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded font-mono">
                            Modo: High Performer
                          </span>
                        </div>

                        {/* CRM Dynamic Shortcut Bar */}
                        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <div className="flex items-center justify-between mb-1.5 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-violet-400" />
                              Ações Prioritárias do Closer:
                            </span>
                            <span className="text-violet-300 font-mono">Adaptado</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[11px] px-2 py-1 bg-violet-500/20 text-violet-200 border border-violet-500/30 rounded font-medium">
                              Disparar Proposta WhatsApp
                            </span>
                            <span className="text-[11px] px-2 py-1 bg-slate-800 text-slate-300 rounded">
                              Registrar Call (1-Click)
                            </span>
                            <span className="text-[11px] px-2 py-1 bg-slate-800 text-slate-300 rounded">
                              Avançar para Ganho
                            </span>
                          </div>
                        </div>

                        {/* Deal Cards */}
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 bg-slate-900 rounded border border-slate-800/80">
                            <div className="flex justify-between text-[10px] text-violet-400">
                              <span>Hospital Santa Clara</span>
                              <span className="font-bold">92% score</span>
                            </div>
                            <p className="font-bold text-white text-xs mt-1">R$ 140.000</p>
                            <p className="text-[10px] text-emerald-400 mt-0.5">Decisor em call agora</p>
                          </div>
                          <div className="p-2 bg-slate-900 rounded border border-slate-800/80">
                            <div className="flex justify-between text-[10px] text-slate-400">
                              <span>LogTech Express</span>
                              <span className="font-bold">78% score</span>
                            </div>
                            <p className="font-bold text-white text-xs mt-1">R$ 65.000</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">Aguardando contrato</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Web / E-Commerce Portal Morph Screen */}
                    {activeHeroModule === 'portal' && (
                      <motion.div
                        key="portal-hero"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                              WEB
                            </div>
                            <div>
                              <p className="font-semibold text-white">Portal do Cliente & Compras</p>
                              <p className="text-[10px] text-slate-400">Experiência B2B Receptiva</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
                            Modo: Comprador Recorrente
                          </span>
                        </div>

                        {/* Adaptive Smart Search & Category */}
                        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <div className="flex items-center justify-between mb-1.5 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-emerald-400" />
                              Vitrine Reordenada por Histórico:
                            </span>
                            <span className="text-emerald-300 font-mono">Predição 98%</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[11px] px-2 py-1 bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 rounded font-medium">
                              Repetir Último Pedido
                            </span>
                            <span className="text-[11px] px-2 py-1 bg-slate-800 text-slate-300 rounded">
                              Peças Hidráulicas (Top 1)
                            </span>
                            <span className="text-[11px] px-2 py-1 bg-slate-800 text-slate-300 rounded">
                              Faturamento em 28 DDL
                            </span>
                          </div>
                        </div>

                        <div className="p-2.5 bg-slate-900 rounded border border-emerald-500/30 flex items-center justify-between text-xs">
                          <div>
                            <p className="font-semibold text-white">Carrinho Inteligente Pré-montado</p>
                            <p className="text-[10px] text-slate-400">3 itens com reposição automática recomendada</p>
                          </div>
                          <button className="px-2.5 py-1 bg-emerald-500 text-slate-950 font-bold text-[11px] rounded">
                            Checkout Rápido
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* BI Analytics Morph Screen */}
                    {activeHeroModule === 'bi' && (
                      <motion.div
                        key="bi-hero"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-[10px]">
                              BI
                            </div>
                            <div>
                              <p className="font-semibold text-white">Dashboards C-Level & Margens</p>
                              <p className="text-[10px] text-slate-400">Inteligência Financeira em Tempo Real</p>
                            </div>
                          </div>
                          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono">
                            Modo: Diretoria Executiva
                          </span>
                        </div>

                        {/* BI Dynamic Shortcut Bar */}
                        <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                          <div className="flex items-center justify-between mb-1.5 text-[10px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3 text-amber-400" />
                              Atalhos Sintéticos C-Level:
                            </span>
                            <span className="text-amber-300 font-mono">Sintético</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="text-[11px] px-2 py-1 bg-amber-500/20 text-amber-200 border border-amber-500/30 rounded font-medium">
                              Exportar Balanço XLS
                            </span>
                            <span className="text-[11px] px-2 py-1 bg-slate-800 text-slate-300 rounded">
                              Filtrar Margem EBITDA
                            </span>
                            <span className="text-[11px] px-2 py-1 bg-slate-800 text-slate-300 rounded">
                              Alerta de Ruptura
                            </span>
                          </div>
                        </div>

                        {/* BI Metric Cards */}
                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 bg-slate-900 rounded border border-amber-500/30">
                            <div className="flex justify-between text-[10px] text-slate-400">
                              <span>EBITDA Operacional</span>
                              <span className="text-emerald-400 font-mono">+3.2 p.p</span>
                            </div>
                            <p className="font-bold text-white text-xs mt-1">29.4%</p>
                            <p className="text-[10px] text-emerald-400 mt-0.5">Acima do orçado</p>
                          </div>
                          <div className="p-2 bg-slate-900 rounded border border-slate-800">
                            <div className="flex justify-between text-[10px] text-slate-400">
                              <span>LTV / CAC Global</span>
                              <span className="text-amber-400 font-mono">Meta: 5.0x</span>
                            </div>
                            <p className="font-bold text-white text-xs mt-1">6.8x</p>
                            <p className="text-[10px] text-sky-400 mt-0.5">Payback em 4.1 meses</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Adaptive Status Footer Indicator */}
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Telemetria: {140 + simulationToggledCount * 12} interações computadas
                    </span>
                    <span>Consistência de Marca: 100%</span>
                  </div>
                </div>

                {/* The Interactive Test Action Button (Explicit prompt requirement) */}
                <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
                  <button
                    onClick={handleHeroSimulate}
                    disabled={adaptationActive}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-md active:scale-[0.99]"
                  >
                    <MousePointerClick className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
                    <span>
                      {adaptationActive ? '⚡ Adaptando Layout e Atalhos...' : 'Testar Adaptação Visual Agora'}
                    </span>
                  </button>
                  <p className="text-center text-[10px] text-slate-400">
                    Clique para ver a rede neural ergonômica recalibrar atalhos e paleta em tempo real.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
