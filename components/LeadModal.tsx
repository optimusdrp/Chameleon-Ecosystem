'use client';

import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Building2, 
  Mail, 
  Phone, 
  User, 
  Cpu, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { CHAMELEON_MODULES } from '@/lib/chameleonData';
import { ModuleId, LeadFormData } from '@/types/chameleon';
import { saveDemoRequest } from '@/lib/demoRequests';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedModule?: ModuleId;
  preSelectedModules?: ModuleId[];
  preSelectedUsers?: number;
}

export function LeadModal({
  isOpen,
  onClose,
  preSelectedModule,
  preSelectedModules,
  preSelectedUsers = 50
}: LeadModalProps) {
  const initialModules: ModuleId[] = preSelectedModules && preSelectedModules.length > 0
    ? preSelectedModules
    : preSelectedModule 
    ? [preSelectedModule] 
    : ['erp', 'crm'];

  const [selectedModules, setSelectedModules] = useState<ModuleId[]>(initialModules);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    phone: '',
    segment: 'Indústria & Manufatura',
    teamSize: `${preSelectedUsers} colaboradores`,
    selectedModules: initialModules,
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleModuleSelection = (id: ModuleId) => {
    setSelectedModules((prev) => {
      const next = prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id];
      setFormData((f) => ({ ...f, selectedModules: next }));
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      saveDemoRequest({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        segment: formData.segment,
        teamSize: formData.teamSize,
        selectedModules: selectedModules,
        notes: formData.notes
      });
    } catch {
      // Continue simulation gracefully
    }

    // Simulate instant enterprise blueprint generation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                {isSubmitted ? 'Ecossistema Chameleon Configurado' : 'Solicitar Demonstração Personalizada'}
              </h3>
              <p className="text-xs text-slate-400">
                {isSubmitted ? 'Sua arquitetura adaptativa foi gerada' : 'Escolha os módulos e teste a adaptação na sua interface'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isSubmitted ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-bold text-white font-display">
                  Tudo pronto, {formData.name || 'Parceiro'}!
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Geramos o plano preliminar do ecossistema Chameleon para a <strong className="text-white">{formData.company || 'sua empresa'}</strong>.
                </p>
              </div>

              {/* Summary of Modules Selected */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-left space-y-3">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Módulos Reservados para a Demonstração Técnica:
                </p>
                <div className="space-y-2">
                  {selectedModules.map((mId) => {
                    const mod = CHAMELEON_MODULES.find((m) => m.id === mId);
                    if (!mod) return null;
                    return (
                      <div key={mId} className="flex items-center justify-between text-xs text-slate-300 p-2 bg-slate-900 rounded-lg">
                        <span className="font-semibold text-white">{mod.name}</span>
                        <span className="text-emerald-400 font-mono">Setup em {mod.setupTime}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Equipe informada:</span>
                  <span className="text-white font-mono">{formData.teamSize}</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-left text-xs text-emerald-300 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 shrink-0 text-emerald-400" />
                <span>
                  Um arquiteto de interfaces do Chameleon entrará em contato pelo e-mail <strong className="text-white">{formData.email || 'informado'}</strong> para agendar a demonstração assistida.
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm rounded-xl transition-all"
              >
                Concluir e Voltar à Página
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Step 1: Select/Confirm Modules */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Quais módulos você deseja incluir na proposta / teste?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CHAMELEON_MODULES.map((mod) => {
                    const isChecked = selectedModules.includes(mod.id);
                    return (
                      <button
                        type="button"
                        key={mod.id}
                        onClick={() => toggleModuleSelection(mod.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-slate-800 border-emerald-500/50 text-white'
                            : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${isChecked ? 'bg-emerald-500 text-slate-950 font-bold' : 'border border-slate-700'}`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold leading-tight">{mod.name}</p>
                            <p className="text-[10px] text-slate-400">{mod.badge}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Contact fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Seu Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="Ex: Carlos Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    E-mail Corporativo *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="carlos@suaempresa.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Nome da Empresa *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="Ex: Distribuidora Brasil"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    WhatsApp ou Telefone *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      required
                      type="tel"
                      placeholder="(11) 98765-4321"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Segment & Team size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Segmento
                  </label>
                  <select
                    value={formData.segment}
                    onChange={(e) => setFormData({ ...formData, segment: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Indústria & Manufatura">Indústria & Manufatura</option>
                    <option value="Logística & Armazém">Logística & Armazém</option>
                    <option value="Varejo & E-commerce">Varejo & E-commerce</option>
                    <option value="Fintech & Serviços B2B">Fintech & Serviços B2B</option>
                    <option value="Saúde & Hospitais">Saúde & Hospitais</option>
                    <option value="Outro">Outro segmento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Tamanho Estimado da Equipe
                  </label>
                  <select
                    value={formData.teamSize}
                    onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Até 20 colaboradores">Até 20 colaboradores</option>
                    <option value="21 a 100 colaboradores">21 a 100 colaboradores</option>
                    <option value="101 a 500 colaboradores">101 a 500 colaboradores</option>
                    <option value="500+ corporativo">500+ corporativo</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Qual sistema ou ERP você usa atualmente? (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: SAP, TOTVS Protheus, Sankhya, Salesforce ou Sistema Próprio"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || selectedModules.length === 0}
                  className="w-full py-3.5 px-5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting ? 'Gerando Plano Técnico...' : 'Solicitar Demonstração com Minha Interface'}
                  </span>
                </button>
                <p className="text-center text-[10px] text-slate-400 mt-2">
                  Atendimento corporativo confidencial · Sem fidelidade contratual · Zero instalação de software local
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
