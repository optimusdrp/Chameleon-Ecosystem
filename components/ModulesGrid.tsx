'use client';

import React from 'react';
import { 
  Building2, 
  ShoppingCart, 
  BarChart3, 
  TrendingUp, 
  Cpu, 
  Check, 
  ArrowRight, 
  Sparkles,
  Zap,
  Sliders
} from 'lucide-react';
import { CHAMELEON_MODULES } from '@/lib/chameleonData';
import { ModuleId } from '@/types/chameleon';

interface ModulesGridProps {
  onSelectModuleForSimulator: (moduleId: ModuleId) => void;
  onOpenLeadModal: (moduleId: ModuleId) => void;
  onToggleModuleInCart?: (moduleId: ModuleId) => void;
  selectedModules?: ModuleId[];
}

export function ModulesGrid({
  onSelectModuleForSimulator,
  onOpenLeadModal,
  onToggleModuleInCart,
  selectedModules = []
}: ModulesGridProps) {
  const getIcon = (id: ModuleId) => {
    switch (id) {
      case 'erp':
        return <Building2 className="w-5 h-5" />;
      case 'crm':
        return <BarChart3 className="w-5 h-5" />;
      case 'portal':
        return <ShoppingCart className="w-5 h-5" />;
      case 'bi':
        return <TrendingUp className="w-5 h-5" />;
      case 'sdk':
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="modulos" className="py-24 bg-slate-950 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Arquitetura Modular Plug-and-Play</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display tracking-tight text-balance">
            Módulos independentes para cada ferramenta do seu ecossistema
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Contrate apenas o que você precisa. Cada módulo opera de forma autônoma ou sincronizado em rede, adaptando interfaces complexas com fidelidade extrema à identidade da sua marca.
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CHAMELEON_MODULES.map((module) => {
            const isSelected = selectedModules.includes(module.id);
            return (
              <div
                key={module.id}
                className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between p-6 shadow-xl relative group overflow-hidden"
              >
                {/* Subtle top accent bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 transition-all group-hover:h-1.5"
                  style={{ backgroundColor: module.accentColor }}
                />

                <div>
                  {/* Top category & badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-medium text-slate-400">
                      {module.category}
                    </span>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${module.accentBg} ${module.accentBorder}`}>
                      {module.badge}
                    </span>
                  </div>

                  {/* Title and Icon */}
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="p-2.5 rounded-xl text-white"
                      style={{ backgroundColor: `${module.accentColor}25`, color: module.accentColor }}
                    >
                      {getIcon(module.id)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        {module.name}
                      </h3>
                      <p className="text-xs text-slate-400">{module.tagline}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    {module.description}
                  </p>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-slate-950/80 rounded-xl border border-slate-800 mb-5">
                    {module.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <p className="text-xs font-bold text-white font-mono tabular-nums">{metric.value}</p>
                        <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Feature checklist */}
                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                      Recursos de Adaptação:
                    </p>
                    {module.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-4 border-t border-slate-800 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Tempo de integração:</span>
                    <span className="text-white font-semibold">{module.setupTime}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectModuleForSimulator(module.id)}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5 text-teal-400" />
                      <span>Ver no Simulador</span>
                    </button>
                    <button
                      onClick={() => onOpenLeadModal(module.id)}
                      className="py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-95 transition-opacity flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>Contratar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
