'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  ShoppingCart, 
  BarChart3, 
  TrendingUp, 
  Cpu, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Sliders, 
  ShieldCheck, 
  FileText, 
  X, 
  CheckCircle2, 
  Layers, 
  Clock, 
  Server, 
  DollarSign, 
  Tag,
  Lock,
  Plus
} from 'lucide-react';
import { CHAMELEON_MODULES } from '@/lib/chameleonData';
import { ModuleId } from '@/types/chameleon';
import { saveClientContract, ClientContract } from '@/lib/contracts';

// Realistic, accessible monthly base prices per module
const MODULE_BASE_PRICES: Record<ModuleId, number> = {
  erp: 149,
  crm: 99,
  portal: 129,
  bi: 79,
  sdk: 169
};

const TEAM_SIZE_OPTIONS = [
  { label: 'Até 20 colaboradores', users: 20, extraMonthly: 0 },
  { label: '21 a 100 colaboradores', users: 100, extraMonthly: 80 },
  { label: '101 a 500 colaboradores', users: 500, extraMonthly: 160 },
  { label: '500+ corporativo', users: 1000, extraMonthly: 290 }
];

interface ModulesGridProps {
  onSelectModuleForSimulator: (moduleId: ModuleId) => void;
  onOpenLeadModal: (moduleId?: ModuleId) => void;
  selectedModules?: ModuleId[];
}

export function ModulesGrid({
  onSelectModuleForSimulator,
  onOpenLeadModal,
  selectedModules: initialSelectedModules = ['erp', 'crm']
}: ModulesGridProps) {
  // Selected modules for package
  const [selectedModuleIds, setSelectedModuleIds] = useState<ModuleId[]>(initialSelectedModules);
  const [selectedTeamTier, setSelectedTeamTier] = useState(TEAM_SIZE_OPTIONS[1]);
  const [billingCycle, setBillingCycle] = useState<'mensal' | 'anual'>('anual');

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdContract, setCreatedContract] = useState<ClientContract | null>(null);

  // Form Fields
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    cityState: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactRole: 'Diretor de Tecnologia / TI',
    deploymentEnvironment: 'Cloud Dedicada Chameleon' as ClientContract['deploymentEnvironment'],
    legacyIntegration: 'TOTVS Protheus',
    paymentMethod: 'Boleto Bancário (30 dias)' as ClientContract['paymentMethod']
  });

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

  const toggleModuleSelection = (id: ModuleId) => {
    setSelectedModuleIds((prev) => {
      if (prev.includes(id)) {
        // Prevent unselecting all (keep at least 1)
        if (prev.length === 1) return prev;
        return prev.filter((m) => m !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Pricing calculations
  const rawSubtotal = selectedModuleIds.reduce((sum, id) => sum + MODULE_BASE_PRICES[id], 0) + selectedTeamTier.extraMonthly;

  // Progressive multi-module discount
  const multiModuleDiscountPercent = 
    selectedModuleIds.length === 5 ? 30 :
    selectedModuleIds.length === 4 ? 20 :
    selectedModuleIds.length === 3 ? 15 :
    selectedModuleIds.length === 2 ? 10 : 0;

  const afterModuleDiscount = rawSubtotal * (1 - multiModuleDiscountPercent / 100);

  // Annual discount: 20%
  const finalMonthlyPrice = billingCycle === 'anual' ? Math.round(afterModuleDiscount * 0.8) : Math.round(afterModuleDiscount);
  const annualTotal = finalMonthlyPrice * 12;
  const annualSavings = Math.round(rawSubtotal * 12 - annualTotal);

  const selectedModulesList = CHAMELEON_MODULES.filter((m) => selectedModuleIds.includes(m.id));

  const handleOpenCheckout = () => {
    setCreatedContract(null);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const discountDescription = [
        multiModuleDiscountPercent > 0 ? `${multiModuleDiscountPercent}% Pacote Multi-Módulos` : '',
        billingCycle === 'anual' ? '20% Faturamento Anual' : ''
      ].filter(Boolean).join(' + ') || 'Preço Padrão';

      const contract = saveClientContract({
        companyName: formData.companyName,
        cnpj: formData.cnpj,
        cityState: formData.cityState,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        contactRole: formData.contactRole,
        selectedModules: selectedModuleIds,
        moduleNames: selectedModulesList.map((m) => m.name),
        moduleId: selectedModuleIds[0],
        moduleName: selectedModulesList.length === 1 ? selectedModulesList[0].name : `Pacote ${selectedModulesList.length} Módulos`,
        teamTier: selectedTeamTier.label,
        teamSize: selectedTeamTier.users,
        billingCycle: billingCycle,
        monthlyValue: finalMonthlyPrice,
        annualValue: annualTotal,
        discountApplied: discountDescription,
        deploymentEnvironment: formData.deploymentEnvironment,
        legacyIntegration: formData.legacyIntegration,
        paymentMethod: formData.paymentMethod
      });

      setCreatedContract(contract);
      setIsSubmitting(false);
    }, 900);
  };

  return (
    <section id="modulos" className="py-24 bg-slate-950 relative overflow-hidden w-full max-w-full border-t border-slate-800/80">
      {/* Anchor for contracting link */}
      <div id="contratar" className="scroll-mt-24" />

      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 rounded-full uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Módulos Plug-and-Play & Contratação Personalizada</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            Escolha e Contrate Exatamente os Módulos que sua Empresa Precisa
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Monte o pacote sob medida para a sua operação. Sem pacotes forçados ou mensalidades exorbitantes: selecione um ou múltiplos módulos com desconto progressivo e integração direta ao seu ERP ou sistema legado.
          </p>
        </div>

        {/* Global Controls: Billing Cycle and Team Size */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Billing Toggle */}
          <div className="flex items-center gap-3">
            <span className={`text-xs font-semibold ${billingCycle === 'mensal' ? 'text-white' : 'text-slate-400'}`}>
              Mensal
            </span>

            <button
              type="button"
              onClick={() => setBillingCycle(billingCycle === 'mensal' ? 'anual' : 'mensal')}
              className="w-12 h-6 rounded-full bg-slate-800 p-0.5 transition-colors relative cursor-pointer"
            >
              <span
                className={`block w-5 h-5 rounded-full bg-emerald-400 transition-transform ${
                  billingCycle === 'anual' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>

            <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === 'anual' ? 'text-white' : 'text-slate-400'}`}>
              <span>Anual</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono font-bold">
                20% OFF
              </span>
            </span>
          </div>

          {/* Team Size Selector */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">Equipe:</span>
            <select
              value={selectedTeamTier.label}
              onChange={(e) => {
                const opt = TEAM_SIZE_OPTIONS.find((o) => o.label === e.target.value);
                if (opt) setSelectedTeamTier(opt);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              {TEAM_SIZE_OPTIONS.map((opt) => (
                <option key={opt.label} value={opt.label}>
                  {opt.label} {opt.extraMonthly === 0 ? '(Sem custo extra)' : `(+R$ ${opt.extraMonthly}/mês)`}
                </option>
              ))}
            </select>
          </div>

          {/* Multi-Module Discount Status */}
          <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" />
            <span>
              {selectedModuleIds.length >= 2 
                ? `Desconto de Combo Ativo: -${multiModuleDiscountPercent}%` 
                : 'Selecione 2+ módulos para ganhar desconto de combo'}
            </span>
          </div>
        </div>

        {/* Modules Grid (Multi-Selectable) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {CHAMELEON_MODULES.map((module) => {
            const isSelected = selectedModuleIds.includes(module.id);
            const basePrice = MODULE_BASE_PRICES[module.id];
            const discountedPrice = billingCycle === 'anual' ? Math.round(basePrice * 0.8) : basePrice;

            return (
              <div
                key={module.id}
                onClick={() => toggleModuleSelection(module.id)}
                className={`rounded-2xl transition-all duration-300 flex flex-col justify-between p-6 shadow-xl relative cursor-pointer group border ${
                  isSelected
                    ? 'bg-slate-900 border-emerald-500 shadow-emerald-500/10 ring-1 ring-emerald-500/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Top Accent Bar */}
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 transition-all ${isSelected ? 'h-1.5' : 'group-hover:h-1'}`}
                  style={{ backgroundColor: isSelected ? '#10b981' : module.accentColor }}
                />

                <div>
                  {/* Category, Badge and Selection Indicator */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-medium text-slate-400">
                      {module.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${module.accentBg} ${module.accentBorder}`}>
                        {module.badge}
                      </span>
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                        isSelected 
                          ? 'bg-emerald-500 text-slate-950 font-bold' 
                          : 'border border-slate-700 bg-slate-950 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    </div>
                  </div>

                  {/* Title, Icon and Tagline */}
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="p-2.5 rounded-xl text-white shrink-0"
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
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {module.description}
                  </p>

                  {/* Accessible Price Tag Box */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 mb-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase font-mono block">Valor Individual:</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-white font-mono">
                          R$ {discountedPrice}
                        </span>
                        <span className="text-[10px] text-slate-400">/mês</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono px-2 py-1 rounded font-bold ${
                      isSelected 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isSelected ? '✓ Incluso no Pacote' : '+ Clique para Incluir'}
                    </span>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-950/60 rounded-xl border border-slate-800/80 mb-4">
                    {module.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <p className="text-xs font-bold text-white font-mono tabular-nums">{metric.value}</p>
                        <p className="text-[9px] text-slate-400 leading-tight mt-0.5">{metric.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Feature checklist */}
                  <div className="space-y-1.5 mb-5">
                    {module.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span className="leading-snug text-[11px]">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => onSelectModuleForSimulator(module.id)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5 text-teal-400" />
                    <span>Ver no Simulador</span>
                  </button>

                  <button
                    onClick={() => toggleModuleSelection(module.id)}
                    className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 hover:bg-slate-700'
                        : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20'
                    }`}
                  >
                    {isSelected ? <span>Remover</span> : <span>+ Adicionar</span>}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* UNIFIED PACKAGE SUMMARY & IMMEDIATE CHECKOUT BAR         */}
        {/* ======================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-teal-950/30 to-slate-900 border border-emerald-500/40 shadow-2xl shadow-emerald-950/30 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left summary details */}
          <div className="space-y-3 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Pacote Selecionado ({selectedModuleIds.length} {selectedModuleIds.length === 1 ? 'Módulo' : 'Módulos'}):
              </span>
              {multiModuleDiscountPercent > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono font-bold">
                  -{multiModuleDiscountPercent}% Desconto de Combo
                </span>
              )}
              {billingCycle === 'anual' && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono font-bold">
                  -20% Desconto Anual
                </span>
              )}
            </div>

            {/* Badges of selected modules */}
            <div className="flex flex-wrap gap-1.5">
              {selectedModulesList.map((mod) => (
                <span key={mod.id} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-white flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {mod.name}
                </span>
              ))}
            </div>

            <p className="text-xs text-slate-400">
              Dimensionado para <strong>{selectedTeamTier.label}</strong> com suporte técnico, observer Zero-PII e implantação assistida em até 48 horas.
            </p>
          </div>

          {/* Right price and CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 border-t lg:border-t-0 lg:border-l border-slate-800 pt-4 lg:pt-0 lg:pl-6 shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono block">
                Valor Total do Pacote:
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white font-display">
                  R$ {finalMonthlyPrice.toLocaleString('pt-BR')}
                </span>
                <span className="text-xs text-slate-400 font-mono">/mês</span>
              </div>
              {billingCycle === 'anual' && annualSavings > 0 && (
                <span className="text-[10px] text-emerald-400 font-mono block mt-0.5">
                  Economia de R$ {annualSavings.toLocaleString('pt-BR')}/ano
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleOpenCheckout}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Contratar Pacote Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenLeadModal(selectedModuleIds[0])}
                className="px-4 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Tirar Dúvidas</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* CHECKOUT & CONTRACTING MODAL (MULTI-MODULE SUPPORT)     */}
      {/* ======================================================== */}
      {isCheckoutOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => !isSubmitting && setIsCheckoutOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white font-display">
                    {createdContract ? 'Contratação Confirmada com Sucesso!' : `Contratar Pacote Chameleon (${selectedModuleIds.length} Módulos)`}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {createdContract 
                      ? `Contrato gerado sob o protocolo ${createdContract.id}` 
                      : `Total de R$ ${finalMonthlyPrice.toLocaleString('pt-BR')}/mês · ${selectedTeamTier.label} · Faturamento ${billingCycle === 'anual' ? 'Anual' : 'Mensal'}`}
                  </p>
                </div>
              </div>

              {!isSubmitting && (
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
              {createdContract ? (
                /* Success View */
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-white font-display">
                      Parabéns, {createdContract.contactName}!
                    </h4>
                    <p className="text-slate-300 max-w-md mx-auto text-xs leading-relaxed">
                      A contratação para a empresa <strong>{createdContract.companyName}</strong> foi confirmada e protocolada.
                    </p>
                  </div>

                  {/* Receipt Box */}
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-3 font-mono text-xs max-w-lg mx-auto">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="text-slate-500">Número do Contrato:</span>
                      <span className="text-emerald-400 font-bold">{createdContract.id}</span>
                    </div>

                    <div className="flex justify-between items-start">
                      <span className="text-slate-500">Módulos Contratados:</span>
                      <div className="text-right space-y-0.5">
                        {createdContract.moduleNames.map((name) => (
                          <span key={name} className="block text-white font-sans font-bold">
                            • {name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Equipe Dimensionada:</span>
                      <span className="text-white">{createdContract.teamTier}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Valor Mensal:</span>
                      <span className="text-emerald-400 font-bold">R$ {createdContract.monthlyValue.toLocaleString('pt-BR')}/mês</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Ambiente de Deploy:</span>
                      <span className="text-slate-300">{createdContract.deploymentEnvironment}</span>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                      <span className="text-slate-500">Status de Ativação:</span>
                      <span className="text-amber-400 font-bold">{createdContract.status}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-3 text-left max-w-lg mx-auto">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>
                      Enviamos a confirmação detalhada para o e-mail <strong>{createdContract.contactEmail}</strong>. Nosso arquiteto entrará em contato via WhatsApp para liberar os acessos.
                    </span>
                  </div>

                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
                  >
                    Concluir e Voltar à Página
                  </button>
                </div>
              ) : (
                /* Checkout Form */
                <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                  
                  {/* Selected Modules Breakdown */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono tracking-wider">
                      Resumo dos Módulos Inclusos ({selectedModuleIds.length}):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedModulesList.map((m) => (
                        <div key={m.id} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-white block">{m.name}</span>
                            <span className="text-[10px] text-slate-400">{m.badge}</span>
                          </div>
                          <span className="font-mono text-emerald-400 font-bold">
                            R$ {billingCycle === 'anual' ? Math.round(MODULE_BASE_PRICES[m.id] * 0.8) : MODULE_BASE_PRICES[m.id]}/mês
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-400">Total Mensal Final:</span>
                      <span className="font-mono text-emerald-400 font-bold text-sm">
                        R$ {finalMonthlyPrice.toLocaleString('pt-BR')}/mês
                      </span>
                    </div>
                  </div>

                  {/* Section 1: Company Data */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                      1. Dados da Empresa
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Razão Social / Nome Fantasia *</label>
                        <input
                          required
                          type="text"
                          placeholder="Ex: Indústria Brasil S/A"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">CNPJ da Empresa *</label>
                        <input
                          required
                          type="text"
                          placeholder="00.000.000/0001-00"
                          value={formData.cnpj}
                          onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Cidade / Estado (UF) *</label>
                      <input
                        required
                        type="text"
                        placeholder="Ex: Curitiba / PR"
                        value={formData.cityState}
                        onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  {/* Section 2: Contact Responsible */}
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Lock className="w-3.5 h-3.5 text-cyan-400" />
                      2. Titular do Contrato & Acessos
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Nome Completo do Titular *</label>
                        <input
                          required
                          type="text"
                          placeholder="Ex: Eduardo Guimarães"
                          value={formData.contactName}
                          onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Cargo na Empresa *</label>
                        <input
                          required
                          type="text"
                          placeholder="Ex: Diretor de Operações"
                          value={formData.contactRole}
                          onChange={(e) => setFormData({ ...formData, contactRole: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">E-mail Corporativo *</label>
                        <input
                          required
                          type="email"
                          placeholder="eduardo@empresa.com.br"
                          value={formData.contactEmail}
                          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">WhatsApp / Telefone Direto *</label>
                        <input
                          required
                          type="tel"
                          placeholder="(11) 98765-4321"
                          value={formData.contactPhone}
                          onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Technical & Payment Details */}
                  <div className="space-y-3 pt-2 border-t border-slate-800">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
                      <Server className="w-3.5 h-3.5 text-teal-400" />
                      3. Ambiente de Implantação & Pagamento
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Ambiente de Hospedagem</label>
                        <select
                          value={formData.deploymentEnvironment}
                          onChange={(e) => setFormData({ ...formData, deploymentEnvironment: e.target.value as ClientContract['deploymentEnvironment'] })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                        >
                          <option value="Cloud Dedicada Chameleon">Cloud Dedicada Chameleon (Recomendado)</option>
                          <option value="On-Premise / VPC Própria">On-Premise / VPC Própria do Cliente</option>
                          <option value="Nuvem Híbrida">Nuvem Híbrida (Observer Local)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 font-semibold mb-1">Sistema / ERP Atual em Uso</label>
                        <input
                          type="text"
                          placeholder="Ex: TOTVS Protheus, SAP S/4HANA, Salesforce"
                          value={formData.legacyIntegration}
                          onChange={(e) => setFormData({ ...formData, legacyIntegration: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Forma de Pagamento Preferencial</label>
                      <select
                        value={formData.paymentMethod}
                        onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as ClientContract['paymentMethod'] })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-400"
                      >
                        <option value="Boleto Bancário (30 dias)">Boleto Bancário Faturado (30 dias)</option>
                        <option value="PIX Corporativo">PIX Corporativo PJ</option>
                        <option value="Cartão de Crédito Empresarial">Cartão de Crédito Corporativo</option>
                      </select>
                    </div>
                  </div>

                  {/* Guarantee Disclaimer */}
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                    Ao confirmar, você emite a ordem de contratação com garantia de satisfação de 30 dias: caso a telemetria não reduza o tempo de execução de tarefas, o cancelamento é integralmente sem ônus.
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setIsCheckoutOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-bold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-70 flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Clock className="w-4 h-4 animate-spin" />
                          <span>Processando Contrato...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Emitir Contrato & Iniciar Setup</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
