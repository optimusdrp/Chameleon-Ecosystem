'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  Users, 
  ShieldAlert, 
  Layers,
  CheckCircle2
} from 'lucide-react';
import { CHAMELEON_MODULES } from '@/lib/chameleonData';
import { ModuleId } from '@/types/chameleon';

interface ModuleConfiguratorProps {
  onOpenLeadModalWithConfig: (modules: ModuleId[], usersCount: number) => void;
}

export function ModuleConfigurator({ onOpenLeadModalWithConfig }: ModuleConfiguratorProps) {
  // Default selected modules
  const [selectedModuleIds, setSelectedModuleIds] = useState<ModuleId[]>(['erp', 'crm']);
  const [userScale, setUserScale] = useState<number>(50);
  const [industry, setIndustry] = useState<string>('industria');

  const toggleModule = (id: ModuleId) => {
    setSelectedModuleIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((m) => m !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Calculations based on modules and user scale
  const baseHoursSavedPerUser = 8.5; // hours/month/user
  const totalHoursSaved = Math.round(userScale * baseHoursSavedPerUser * (1 + selectedModuleIds.length * 0.15));
  
  // Approximate financial value of time saved (assuming average hourly cost R$ 45)
  const monthlyFinancialGain = totalHoursSaved * 45;
  
  // Error reduction rate
  const errorReduction = Math.min(68, 38 + selectedModuleIds.length * 6);

  return (
    <section id="calculadora" className="py-24 bg-slate-950 border-t border-white/10 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Monte seu Pacote & Calcule o Retorno</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display tracking-tight text-balance">
            Escolha os módulos e dimensione o impacto na sua operação
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Selecione apenas as ferramentas que sua empresa utiliza hoje. Veja em tempo real as horas operacionais economizadas e a redução de falhas de digitação.
          </p>
        </div>

        {/* The Configurator Board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Module Toggles & Scale Selector */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Modules */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs flex items-center justify-center font-bold">1</span>
                  Selecione os módulos desejados:
                </span>
                <span className="text-xs text-slate-400">
                  {selectedModuleIds.length} selecionado{selectedModuleIds.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-2.5">
                {CHAMELEON_MODULES.map((mod) => {
                  const isChecked = selectedModuleIds.includes(mod.id);
                  return (
                    <div
                      key={mod.id}
                      onClick={() => toggleModule(mod.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-slate-800/90 border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20'
                          : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/40 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                              : 'border-slate-700 bg-slate-900'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                            {mod.name}
                          </p>
                          <p className="text-xs text-slate-400">{mod.tagline}</p>
                        </div>
                      </div>

                      <span className="text-xs font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                        {mod.setupTime} setup
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Set Scale & Industry */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center font-bold">2</span>
                  Dimensão da equipe e setor:
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {userScale} operadores ativos
                </span>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Volume de usuários que usarão as interfaces:</span>
                  <span className="text-white font-bold">{userScale} colaboradores</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="500"
                  step="5"
                  value={userScale}
                  onChange={(e) => setUserScale(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>5 equipes</span>
                  <span>100</span>
                  <span>250</span>
                  <span>500+ corporativo</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Segmento principal de atuação:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'industria', label: 'Indústria & Manufatura' },
                    { id: 'logistica', label: 'Logística & Armazém' },
                    { id: 'varejo', label: 'Varejo & E-commerce' },
                    { id: 'servicos', label: 'FinTech & B2B' },
                  ].map((ind) => (
                    <button
                      key={ind.id}
                      onClick={() => setIndustry(ind.id)}
                      className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        industry === ind.id
                          ? 'bg-slate-800 border-cyan-500 text-cyan-300 font-bold'
                          : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {ind.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Real-time Calculated ROI & Proposal CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Impacto Mensal Projetado</span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display mb-1">
                Ganhos de Eficiência Chameleon
              </h3>
              <p className="text-xs text-slate-300 mb-6">
                Estimativa calculada com base na telemetria ergonômica média de empresas do seu porte.
              </p>

              {/* Big Metric Box */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 mb-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    Tempo produtivo resgatado:
                  </span>
                  <span className="text-2xl font-bold text-emerald-400 font-display tabular-nums">
                    ~{totalHoursSaved}h / mês
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Equivalente a <strong className="text-white">{(totalHoursSaved / 160).toFixed(1)} colaboradores em tempo integral</strong> dedicados exclusivamente à operação sem horas extras.
                </p>
              </div>

              {/* Secondary Metrics */}
              <div className="space-y-3 pb-6 border-b border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                    Redução de erros de digitação:
                  </span>
                  <span className="text-amber-400 font-bold font-mono">-{errorReduction}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    Ganho financeiro estimado em produtividade:
                  </span>
                  <span className="text-cyan-400 font-bold font-mono">
                    R$ {monthlyFinancialGain.toLocaleString('pt-BR')} / mês
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Retorno estimado do investimento (ROI):
                  </span>
                  <span className="text-emerald-400 font-bold font-mono">5.2x em 12 meses</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 space-y-2">
                <button
                  onClick={() => onOpenLeadModalWithConfig(selectedModuleIds, userScale)}
                  className="w-full py-4 px-5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                  <span>Receber Proposta Formal para Este Pacote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-center text-[10px] text-slate-400">
                  Sem compromisso. Inclui demonstração técnica com teste na interface da sua empresa.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
