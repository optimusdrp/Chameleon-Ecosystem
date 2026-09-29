'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Sparkles, 
  Sliders, 
  Layers, 
  Check, 
  Zap, 
  FileText, 
  Building2, 
  ShoppingCart, 
  BarChart3, 
  ChevronRight, 
  ArrowUpRight, 
  Filter, 
  Search, 
  Download, 
  RefreshCw, 
  Maximize2, 
  Minimize2, 
  Flame, 
  PlusCircle, 
  Clock, 
  Share2, 
  Send, 
  Eye, 
  MousePointerClick,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Layout,
  Sun,
  Moon,
  Palette
} from 'lucide-react';
import { ModuleId, UserPersona } from '@/types/chameleon';
import { CHAMELEON_MODULES, PERSONA_CONFIGS } from '@/lib/chameleonData';
import { AestheticTheme, THEME_CONFIGS } from '@/types/theme';

interface AdaptiveSimulatorProps {
  onOpenLeadModal: (moduleId?: ModuleId) => void;
  selectedModule?: ModuleId;
  onSelectModule?: (moduleId: ModuleId) => void;
  isAdapting?: boolean;
  onTriggerAdaptation?: (moduleId?: ModuleId) => void;
  currentTheme?: AestheticTheme;
  onThemeChange?: (theme: AestheticTheme) => void;
}

export function AdaptiveSimulator({ 
  onOpenLeadModal,
  selectedModule,
  onSelectModule,
  isAdapting = false,
  onTriggerAdaptation,
  currentTheme = 'modern-minimalist',
  onThemeChange = () => {}
}: AdaptiveSimulatorProps) {
  const [internalModule, setInternalModule] = useState<ModuleId>('erp');
  const activeModule = selectedModule ?? internalModule;

  const [selectedPersona, setSelectedPersona] = useState<UserPersona>('balanced');
  const [density, setDensity] = useState<'compact' | 'standard' | 'spacious'>('standard');
  const [telemetryClicks, setTelemetryClicks] = useState<number>(47);
  const [actionLog, setActionLog] = useState<string>('Navegação inicial mapeada');
  const [isSimulatingAdaptation, setIsSimulatingAdaptation] = useState<boolean>(false);
  const [adaptationProgress, setAdaptationProgress] = useState<number>(85);

  const isSimulating = isAdapting || isSimulatingAdaptation;
  
  // Dynamic user-clicked shortcut frequency promotions
  const [promotedActions, setPromotedActions] = useState<Record<ModuleId, string[]>>({
    erp: ['Emitir NFe Fiscal', 'Conciliar Lote', 'Aprovar Pedido'],
    crm: ['Enviar WhatsApp (1-Click)', 'Mover para Proposta', 'Registrar Ligação'],
    portal: ['Repetir Último Pedido', 'Rastrear Envio', 'Fatura em PDF'],
    bi: ['Exportar Balanço XLS', 'Filtrar por Região', 'Alerta de Margem'],
    sdk: ['Injetar Observer', 'Carregar Tokens', 'Sincronizar Local']
  });

  const currentModuleData = CHAMELEON_MODULES.find((m) => m.id === activeModule) || CHAMELEON_MODULES[1];
  const currentPersonaData = PERSONA_CONFIGS[selectedPersona];

  // Broadcast active simulator context to Chameleon Assistant and any listeners
  const broadcastSimulatorContext = useCallback((
    mod: ModuleId,
    d: 'compact' | 'standard' | 'spacious',
    p: UserPersona
  ) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('chameleon-simulator-context-change', {
          detail: {
            moduleId: mod,
            density: d,
            persona: p,
            moduleName: mod === 'erp' ? 'Chameleon ERP (Gestão & Faturamento)' :
              mod === 'crm' ? 'Chameleon CRM (Pipeline de Vendas)' :
              mod === 'portal' ? 'Portal Web & B2B (E-Commerce)' :
              'Chameleon BI (Dashboards Executivos)'
          }
        })
      );
    }
  }, []);

  const handleSelectModule = (mod: ModuleId) => {
    setInternalModule(mod);
    if (onSelectModule) {
      onSelectModule(mod);
    }
    broadcastSimulatorContext(mod, density, selectedPersona);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('chameleon-module-change', {
          detail: { moduleId: mod }
        })
      );
    }
  };

  const handleSelectDensity = (newDensity: 'compact' | 'standard' | 'spacious') => {
    setDensity(newDensity);
    broadcastSimulatorContext(activeModule, newDensity, selectedPersona);
  };

  const handleSelectPersona = (pKey: UserPersona) => {
    const pData = PERSONA_CONFIGS[pKey];
    setSelectedPersona(pKey);
    setDensity(pData.density);
    setActionLog(`Perfil alterado para "${pData.name}". Chameleon reconfigurou parâmetros.`);
    broadcastSimulatorContext(activeModule, pData.density, pKey);
  };

  // Interactive handler when user clicks anything inside the mock UI
  const handleItemClick = (actionName: string) => {
    setTelemetryClicks((prev) => prev + 1);
    setActionLog(`Ação "${actionName}" registrada. Frequência atualizada no Chameleon.`);
    
    // Promote clicked action to top of shortcuts if not already first
    setPromotedActions((prev) => {
      const currentList = prev[activeModule] || [];
      const filtered = currentList.filter((item) => item !== actionName);
      return {
        ...prev,
        [activeModule]: [actionName, ...filtered].slice(0, 4)
      };
    });
  };

  // The Big Interactive Test Button Handler
  const handleTriggerInstantAdaptation = useCallback((targetMod?: ModuleId) => {
    const modToAdapt = targetMod || activeModule;
    setIsSimulatingAdaptation(true);
    const moduleLabel = modToAdapt === 'erp' ? 'Chameleon ERP' :
      modToAdapt === 'crm' ? 'Chameleon CRM' :
      modToAdapt === 'portal' ? 'Portal Web' : 'Chameleon BI';

    setActionLog(`Calculando mapa ergonômico neural para ${moduleLabel}...`);
    
    setTimeout(() => {
      setActionLog(`Reorganizando hierarquia visual, agrupando atalhos e reconfigurando contraste para ${moduleLabel}...`);
      setAdaptationProgress(98);
    }, 700);

    setTimeout(() => {
      let targetPersona: UserPersona = 'balanced';
      let targetDensity: 'compact' | 'standard' | 'spacious' = 'standard';

      if (modToAdapt === 'erp') {
        targetPersona = 'power_user';
        targetDensity = 'compact';
      } else if (modToAdapt === 'crm') {
        targetPersona = 'balanced';
        targetDensity = 'standard';
      } else if (modToAdapt === 'bi') {
        targetPersona = 'executive';
        targetDensity = 'spacious';
      } else {
        targetPersona = 'minimalist';
        targetDensity = 'standard';
      }

      setSelectedPersona(targetPersona);
      setDensity(targetDensity);
      setIsSimulatingAdaptation(false);
      setActionLog(`Interface adaptada com sucesso para ${moduleLabel}! 4.2 cliques economizados por processo.`);
      broadcastSimulatorContext(modToAdapt, targetDensity, targetPersona);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('chameleon-adaptation-completed', {
            detail: {
              moduleId: modToAdapt,
              density: targetDensity,
              persona: targetPersona,
              timestamp: Date.now()
            }
          })
        );
      }
    }, 1600);
  }, [activeModule, broadcastSimulatorContext]);

  // Handle when button is clicked inside Simulator
  const handleClickSimulateButton = () => {
    handleTriggerInstantAdaptation(activeModule);

    if (onTriggerAdaptation) {
      onTriggerAdaptation(activeModule);
    } else {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('chameleon-trigger-adaptation', {
            detail: { moduleId: activeModule }
          })
        );
      }
    }
  };

  // Respond to assistant queries for current simulator state
  useEffect(() => {
    const handleQueryContext = () => {
      broadcastSimulatorContext(activeModule, density, selectedPersona);
    };

    window.addEventListener('chameleon-query-simulator-context', handleQueryContext);
    // Broadcast initial state once on mount
    broadcastSimulatorContext(activeModule, density, selectedPersona);

    return () => {
      window.removeEventListener('chameleon-query-simulator-context', handleQueryContext);
    };
  }, [activeModule, density, selectedPersona, broadcastSimulatorContext]);

  // Listen for unified adaptation and module synchronization events
  useEffect(() => {
    const handleAdaptationEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ moduleId?: ModuleId }>;
      const targetMod = customEvent.detail?.moduleId || activeModule;
      setInternalModule(targetMod);
      onSelectModule?.(targetMod);
      handleTriggerInstantAdaptation(targetMod);
    };

    const handleModuleChangeEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ moduleId: ModuleId }>;
      if (customEvent.detail?.moduleId) {
        setInternalModule(customEvent.detail.moduleId);
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
  }, [activeModule, onSelectModule, handleTriggerInstantAdaptation]);

  return (
    <section id="simulador" className="py-24 relative border-t border-b border-white/10 overflow-hidden w-full max-w-full">
      {/* Background radial gradient */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] max-w-full h-[500px] blur-[140px] pointer-events-none bg-gradient-to-b from-teal-500/10 via-emerald-500/5 to-transparent" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-4 border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            <Cpu className="w-3.5 h-3.5 animate-spin" />
            <span>Simulador de Adaptação em Tempo Real</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display tracking-tight text-balance">
            Veja o Chameleon transformar a interface diante dos seus olhos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Selecione o módulo corporativo, teste a telemetria ao clicar nas ações do sistema e aperte o botão de adaptação para observar a reorganização instantânea de layouts, paletas e atalhos.
          </p>
        </div>

        {/* Master Control Bar (Module Selector Tabs) */}
        <div className="p-3 sm:p-4 rounded-2xl backdrop-blur-xl mb-8 shadow-2xl transition-all duration-300 bg-slate-900/90 border border-slate-800">
          <div className="text-xs text-slate-400 mb-2 px-1 flex items-center justify-between">
            <span className="font-semibold text-slate-300">Escolha o módulo independente que deseja testar:</span>
            <span className="hidden sm:inline text-[11px] font-mono text-emerald-400">
              Sincronizado com a Telemetria em Tempo Real ({currentModuleData.name})
            </span>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {/* Module 1: ERP */}
            <button
              onClick={() => handleSelectModule('erp')}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2.5 sm:gap-3 border min-w-0 ${
                activeModule === 'erp'
                  ? 'bg-sky-950/70 border-sky-500/60 shadow-lg shadow-sky-500/20'
                  : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/60 text-slate-400'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${activeModule === 'erp' ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${activeModule === 'erp' ? 'text-white' : 'text-slate-300'}`}>
                  Chameleon ERP
                </p>
                <p className="text-[10px] text-slate-400 truncate">Gestão & Estoque</p>
              </div>
            </button>

            {/* Module 2: CRM */}
            <button
              onClick={() => handleSelectModule('crm')}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2.5 sm:gap-3 border min-w-0 ${
                activeModule === 'crm'
                  ? 'bg-violet-950/70 border-violet-500/60 shadow-lg shadow-violet-500/20'
                  : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/60 text-slate-400'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${activeModule === 'crm' ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${activeModule === 'crm' ? 'text-white' : 'text-slate-300'}`}>
                  Chameleon CRM
                </p>
                <p className="text-[10px] text-slate-400 truncate">Pipeline de Vendas</p>
              </div>
            </button>

            {/* Module 3: Portal Web */}
            <button
              onClick={() => handleSelectModule('portal')}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2.5 sm:gap-3 border min-w-0 ${
                activeModule === 'portal'
                  ? 'bg-emerald-950/70 border-emerald-500/60 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/60 text-slate-400'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${activeModule === 'portal' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${activeModule === 'portal' ? 'text-white' : 'text-slate-300'}`}>
                  Portal Web & B2B
                </p>
                <p className="text-[10px] text-slate-400 truncate">E-Commerce & Sites</p>
              </div>
            </button>

            {/* Module 4: BI Analytics */}
            <button
              onClick={() => handleSelectModule('bi')}
              className={`p-2.5 sm:p-3 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2.5 sm:gap-3 border min-w-0 ${
                activeModule === 'bi'
                  ? 'bg-amber-950/70 border-amber-500/60 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/60 text-slate-400'
              }`}
            >
              <div className={`p-2 rounded-lg shrink-0 ${activeModule === 'bi' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-bold truncate ${activeModule === 'bi' ? 'text-white' : 'text-slate-300'}`}>
                  Chameleon BI
                </p>
                <p className="text-[10px] text-slate-400 truncate">Dashboards C-Level</p>
              </div>
            </button>
          </div>
        </div>

        {/* The Live Interactive Sandbox Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Simulated Live Screen Frame (Interactive Demo) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 bg-slate-900 border border-slate-700/80">
              
              {/* Visual Scanning Animation Overlay during adaptation trigger */}
              {isSimulating && (
                <motion.div
                  initial={{ top: '-10%' }}
                  animate={{ top: '110%' }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                  className="absolute left-0 right-0 h-24 bg-gradient-to-b from-transparent via-emerald-400/35 to-transparent pointer-events-none z-30 border-y border-emerald-400/60"
                />
              )}
              
              {/* App Window Top Bar */}
              <div className="px-3 sm:px-4 py-3 border-b flex items-center justify-between gap-2 transition-colors bg-slate-950/90 border-slate-800">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <div className="flex gap-1.5 shrink-0">
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500/70"></span>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/70"></span>
                    <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/70"></span>
                  </div>
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 ml-1 sm:ml-2 truncate max-w-[130px] sm:max-w-none">
                    app://chameleon/{activeModule}/live-view
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 text-xs shrink-0">
                  <span className="text-slate-400 hidden md:inline">Densidade:</span>
                  <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg">
                    <button
                      onClick={() => handleSelectDensity('compact')}
                      className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium transition-all ${
                        density === 'compact' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Compacta
                    </button>
                    <button
                      onClick={() => handleSelectDensity('standard')}
                      className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium transition-all ${
                        density === 'standard' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Padrão
                    </button>
                    <button
                      onClick={() => handleSelectDensity('spacious')}
                      className={`px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-medium transition-all ${
                        density === 'spacious' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Espaçosa
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Notification Bar / Chameleon Telemetry Notification */}
              <div className="border-b px-3 sm:px-4 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 text-xs transition-colors bg-emerald-950/40 border-emerald-500/20 text-emerald-300">
                <div className="flex items-center gap-2 min-w-0">
                  <Sparkles className="w-4 h-4 animate-pulse shrink-0 text-emerald-400" />
                  <span className="font-medium text-[11px] sm:text-xs break-words">{actionLog}</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono shrink-0">
                  <span>{telemetryClicks} cliques analisados</span>
                  <span>·</span>
                  <span>Adaptação: {adaptationProgress}%</span>
                </div>
              </div>

              {/* Active Simulated Interface Canvas */}
              <div 
                className={`p-3 sm:p-5 transition-all duration-300 min-h-[460px] ${
                  density === 'compact' ? 'space-y-3' : density === 'spacious' ? 'space-y-6' : 'space-y-4'
                } bg-slate-950/95 text-slate-100`}
              >
                
                {/* Dynamically Re-ordered Adaptive Shortcut Bar */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      <span>Barra de Ações Rápidas (Reordenada pelo Chameleon conforme você clica):</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Clique para testar</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {promotedActions[activeModule].map((action, idx) => (
                      <motion.button
                        key={`${activeModule}-${action}-${idx}`}
                        layout
                        onClick={() => handleItemClick(action)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.96 }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition-all cursor-pointer ${
                          idx === 0 
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600 hover:text-white'
                        }`}
                      >
                        {idx === 0 && <Flame className="w-3 h-3 text-emerald-400" />}
                        <span>{action}</span>
                        {selectedPersona === 'power_user' && (
                          <span className="text-[10px] text-slate-400 font-mono ml-1">⌘{idx + 1}</span>
                        )}
                      </motion.button>
                    ))}
                    
                    <button
                      onClick={() => handleItemClick('Novo Filtro Personalizado')}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-dashed border-slate-700 hover:border-slate-500 flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="w-3 h-3" />
                      <span>Adicionar Atalho</span>
                    </button>
                  </div>
                </div>

                {/* Sub-interface: ERP Module Simulation */}
                {activeModule === 'erp' && (
                  <div className="space-y-4">
                    {/* Header metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div 
                        onClick={() => handleItemClick('Métrica NFe Emitidas')}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-sky-500/40 transition-colors cursor-pointer"
                      >
                        <p className="text-[11px] text-slate-400">NF-e Emitidas Hoje</p>
                        <p className="text-xl font-bold text-white mt-1 font-display">1.482</p>
                        <p className="text-[10px] text-emerald-400 mt-0.5">100% autorizadas</p>
                      </div>
                      <div 
                        onClick={() => handleItemClick('Métrica Lotes de Estoque')}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-sky-500/40 transition-colors cursor-pointer"
                      >
                        <p className="text-[11px] text-slate-400">Lotes em Separação</p>
                        <p className="text-xl font-bold text-sky-400 mt-1 font-display">64</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Tempo médio: 4.2 min</p>
                      </div>
                      <div 
                        onClick={() => handleItemClick('Métrica Contas a Pagar')}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-sky-500/40 transition-colors cursor-pointer"
                      >
                        <p className="text-[11px] text-slate-400">Aprovações Pendentes</p>
                        <p className="text-xl font-bold text-amber-400 mt-1 font-display">12</p>
                        <p className="text-[10px] text-amber-400/80 mt-0.5">3 de alto valor</p>
                      </div>
                      <div 
                        onClick={() => handleItemClick('Métrica Margem Operacional')}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-sky-500/40 transition-colors cursor-pointer"
                      >
                        <p className="text-[11px] text-slate-400">Disponibilidade CD</p>
                        <p className="text-xl font-bold text-emerald-400 mt-1 font-display">99.1%</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Sem rupturas</p>
                      </div>
                    </div>

                    {/* Operational Data Table */}
                    <div className="bg-slate-900/80 rounded-xl border border-slate-800 overflow-hidden">
                      <div className="p-3 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">Ordens de Faturamento & Expedição</span>
                          <span className="text-[10px] bg-sky-500/10 text-sky-400 px-2 py-0.5 rounded font-mono">
                            Modo Operacional Ativo
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleItemClick('Filtrar por Status')}
                            className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1 cursor-pointer"
                          >
                            <Filter className="w-3 h-3" />
                            <span>Filtros Rápidos</span>
                          </button>
                          <button 
                            onClick={() => handleItemClick('Exportar XLS Completo')}
                            className="px-2 py-1 text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1 cursor-pointer"
                          >
                            <Download className="w-3 h-3" />
                            <span>Exportar</span>
                          </button>
                        </div>
                      </div>

                      <div className="overflow-x-auto w-full">
                        <div className="min-w-[420px] sm:min-w-full divide-y divide-slate-800/80 text-xs">
                          {[
                            { id: 'ORD-9842', client: 'Indústria MetalFlex S/A', val: 'R$ 142.500', st: 'Pronto p/ NFe', color: 'text-emerald-400' },
                            { id: 'ORD-9841', client: 'Distribuidora Atlas Nordeste', val: 'R$ 68.320', st: 'Aguardando Pesagem', color: 'text-sky-400' },
                            { id: 'ORD-9840', client: 'Comércio de Ferragens Brasil', val: 'R$ 29.800', st: 'Bloqueio Financeiro', color: 'text-amber-400' },
                            { id: 'ORD-9839', client: 'Transportadora TransGlobo', val: 'R$ 84.100', st: 'Pronto p/ NFe', color: 'text-emerald-400' },
                          ].map((row) => (
                            <div
                              key={row.id}
                              onClick={() => handleItemClick(`Ordem ${row.id}`)}
                              className="px-3 py-2.5 flex items-center justify-between hover:bg-slate-800/50 transition-colors cursor-pointer gap-2"
                            >
                              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                <span className="font-mono text-slate-400 font-semibold text-[11px] sm:text-xs shrink-0">{row.id}</span>
                                <span className="text-white font-medium text-[11px] sm:text-xs truncate">{row.client}</span>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                                <span className="font-mono text-slate-200 text-[11px] sm:text-xs">{row.val}</span>
                                <span className={`text-[10px] sm:text-[11px] font-medium ${row.color}`}>{row.st}</span>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleItemClick(`Ação rápida na ${row.id}`);
                                  }}
                                  className="px-2 py-1 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 rounded text-[10px] cursor-pointer"
                                >
                                  Executar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-interface: CRM Module Simulation */}
                {activeModule === 'crm' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {/* Column 1: Leads Quentes */}
                      <div className="bg-slate-900 rounded-xl border border-slate-800 p-3 space-y-2">
                        <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                            Em Qualificação (4)
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">R$ 180k</span>
                        </div>
                        <div 
                          onClick={() => handleItemClick('Lead BioFarma')}
                          className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 hover:border-violet-500/40 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-white">Laboratórios BioFarma</span>
                            <span className="text-violet-400 font-mono text-[10px]">85% fit</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">Contato com Diretor de TI agendado</p>
                          <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                            <span className="text-slate-400">R$ 45.000 / ano</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick('Chamar BioFarma no WhatsApp');
                              }}
                              className="text-emerald-400 hover:underline"
                            >
                              WhatsApp Direto
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Propostas Enviadas */}
                      <div className="bg-slate-900 rounded-xl border border-slate-800 p-3 space-y-2">
                        <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                            Proposta Enviada (2)
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">R$ 310k</span>
                        </div>
                        <div 
                          onClick={() => handleItemClick('Proposta Grupo Sol Nascente')}
                          className="p-2.5 bg-slate-950/80 rounded-lg border border-violet-500/30 hover:border-violet-500/60 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-white">Grupo Sol Nascente</span>
                            <span className="text-emerald-400 font-mono text-[10px]">Alta Chance</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">Proposta aberta 5x pelo cliente hoje</p>
                          <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                            <span className="text-white font-bold">R$ 190.000</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick('Follow-up de Fechamento');
                              }}
                              className="text-violet-400 font-semibold hover:underline"
                            >
                              Follow-up Rápido
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Fechamento & Contrato */}
                      <div className="bg-slate-900 rounded-xl border border-slate-800 p-3 space-y-2">
                        <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            Contrato Emitido (1)
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">R$ 120k</span>
                        </div>
                        <div 
                          onClick={() => handleItemClick('Contrato TechCorp')}
                          className="p-2.5 bg-slate-950/80 rounded-lg border border-emerald-500/30 hover:border-emerald-500/60 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-white">TechCorp Brasil</span>
                            <span className="text-emerald-400 font-bold text-[10px]">Assinatura D+0</span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">Documento aguardando DocuSign</p>
                          <div className="mt-2 pt-2 border-t border-slate-800 flex justify-between items-center text-[10px]">
                            <span className="text-emerald-400 font-bold">R$ 120.000</span>
                            <span className="text-slate-400">Comissão R$ 9.600</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-interface: Portal Web & E-Commerce */}
                {activeModule === 'portal' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-slate-900 rounded-xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-emerald-400">CLIENTE RECORRENTE IDENTIFICADO</span>
                          <span className="text-[10px] text-slate-400">Perfil: Distribuidor Atacadista</span>
                        </div>
                        <h4 className="text-white font-bold text-sm mt-0.5">
                          Itens de reposição do seu estoque sugeridos com 1 clique
                        </h4>
                      </div>
                      <button 
                        onClick={() => handleItemClick('Repetir Pedido Anterior')}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                      >
                        Repetir Pedido (R$ 14.800)
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { title: 'Kit Conexões Industriais Alta Pressão', code: 'REF-8842', price: 'R$ 2.450', affinity: '98% de afinidade' },
                        { title: 'Válvula de Retenção Inox 316', code: 'REF-3310', price: 'R$ 890', affinity: '94% de afinidade' },
                        { title: 'Manômetro Digital Calibrado', code: 'REF-1190', price: 'R$ 1.150', affinity: '91% de afinidade' }
                      ].map((prod) => (
                        <div
                          key={prod.code}
                          onClick={() => handleItemClick(`Ver ${prod.title}`)}
                          className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-emerald-500/40 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between items-center text-[10px] text-emerald-400">
                            <span>{prod.code}</span>
                            <span>{prod.affinity}</span>
                          </div>
                          <p className="text-xs font-semibold text-white mt-1.5 line-clamp-1">{prod.title}</p>
                          <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800">
                            <span className="text-xs font-bold text-white">{prod.price}</span>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleItemClick(`Adicionar ${prod.code} ao carrinho`);
                              }}
                              className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold"
                            >
                              + Adicionar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-interface: BI Analytics Module */}
                {activeModule === 'bi' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                        <span className="font-bold text-white">Receita Líquida Consolidada vs Metas 2026</span>
                        <span className="text-amber-400 font-mono text-[11px]">+18.4% YoY</span>
                      </div>
                      
                      {/* Visual Bar chart simulation */}
                      <div className="pt-4 grid grid-cols-6 gap-2 items-end h-28">
                        {[
                          { m: 'Jan', v: '65%', h: 'h-16' },
                          { m: 'Fev', v: '72%', h: 'h-20' },
                          { m: 'Mar', v: '88%', h: 'h-24' },
                          { m: 'Abr', v: '94%', h: 'h-26' },
                          { m: 'Mai', v: '91%', h: 'h-24' },
                          { m: 'Jun', v: '99%', h: 'h-28' },
                        ].map((col) => (
                          <div 
                            key={col.m} 
                            onClick={() => handleItemClick(`Ver detalhes do mês ${col.m}`)}
                            className="flex flex-col items-center gap-1.5 group cursor-pointer"
                          >
                            <span className="text-[10px] text-slate-400 font-mono group-hover:text-amber-400">{col.v}</span>
                            <div className={`w-full ${col.h} bg-amber-500/20 group-hover:bg-amber-500/40 border border-amber-500/40 rounded-t transition-all`}></div>
                            <span className="text-[10px] text-slate-400">{col.m}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div 
                        onClick={() => handleItemClick('Ver Margem EBITDA')}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-amber-500/40 cursor-pointer"
                      >
                        <p className="text-slate-400 text-[11px]">EBITDA Operacional</p>
                        <p className="text-xl font-bold text-white mt-1">29.4%</p>
                        <p className="text-emerald-400 text-[10px] mt-0.5">+3.2 p.p acima do orçado</p>
                      </div>
                      <div 
                        onClick={() => handleItemClick('Ver CAC vs LTV')}
                        className="p-3 bg-slate-900 rounded-xl border border-slate-800 hover:border-amber-500/40 cursor-pointer"
                      >
                        <p className="text-slate-400 text-[11px]">LTV / CAC Global</p>
                        <p className="text-xl font-bold text-white mt-1">6.8x</p>
                        <p className="text-slate-400 text-[10px] mt-0.5">Payback em 4.1 meses</p>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Telemetry Bar */}
              <div className="bg-slate-950 px-3 sm:px-4 py-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-2 min-w-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] leading-tight">LGPD Conforme: Telemetria puramente ergonômica sem dados confidenciais</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] shrink-0 font-mono">
                  <span className="text-emerald-400">Latência: 12ms</span>
                  <span className="text-slate-600">|</span>
                  <span>Brand System: Lock 100%</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Dynamic Adaptation Controller & The Conversion Engine */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* The Master Adaptation Button Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Motor Chameleon em Ação</span>
              </div>

              <h3 className="text-xl font-bold text-white font-display mb-2">
                Disparar Teste de Adaptação Imediata
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Clique no botão abaixo para simular o aprendizado neural do Chameleon. O sistema vai reestruturar os atalhos para os botões mais clicados, recalcular densidade e harmonizar contraste.
              </p>

              {/* THE INTERACTIVE TEST BUTTON */}
              <button
                onClick={handleClickSimulateButton}
                disabled={isSimulating}
                className="w-full py-4 px-5 rounded-xl font-bold text-sm active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-70 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 shadow-emerald-500/20"
              >
                <Zap className={`w-5 h-5 ${isSimulating ? 'animate-spin' : 'group-hover:scale-110 transition-transform'}`} />
                <span>
                  {isSimulating ? 'Adaptando Interface...' : '⚡ Testar Adaptação Automática'}
                </span>
              </button>

              {/* Real-time metrics breakdown */}
              <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Economia média de cliques:</span>
                  <span className="text-emerald-400 font-bold font-mono">4.2 cliques / tarefa</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Tempo de tela economizado:</span>
                  <span className="text-cyan-400 font-bold font-mono">~35 min / dia por usuário</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Curva de aprendizado de novatos:</span>
                  <span className="text-teal-400 font-bold font-mono">-70%</span>
                </div>
              </div>
            </div>

            {/* Persona Simulator Selector */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-teal-400" />
                  Simular Perfil de Usuário
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Modos Ergonômicos</span>
              </div>

              <div className="space-y-1.5">
                {(Object.keys(PERSONA_CONFIGS) as UserPersona[]).map((pKey) => {
                  const pData = PERSONA_CONFIGS[pKey];
                  const isSelected = selectedPersona === pKey;
                  return (
                    <button
                      key={pKey}
                      onClick={() => handleSelectPersona(pKey)}
                      className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-slate-800 border-emerald-500/50 text-white'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <div>
                        <p className={`font-semibold ${isSelected ? 'text-emerald-300' : 'text-slate-300'}`}>
                          {pData.name}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{pData.label}</p>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Direct Module Acquisition Callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 text-center space-y-3">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Módulo em Exibição: {currentModuleData.name}
              </p>
              <h4 className="text-sm font-bold text-white">
                Deseja integrar este módulo ao seu sistema?
              </h4>
              <p className="text-xs text-slate-300">
                Setup em menos de {currentModuleData.setupTime} sem alterar seu backend ou banco de dados.
              </p>
              <button
                onClick={() => onOpenLeadModal(activeModule)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Solicitar Proposta para este Módulo</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
