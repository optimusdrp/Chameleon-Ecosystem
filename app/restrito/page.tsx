'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Cpu,
  Key,
  Database,
  Users,
  Activity,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
  Sliders,
  Download,
  RefreshCw,
  Search,
  ExternalLink,
  Flame,
  Radio
} from 'lucide-react';
import { setStaffSession, clearStaffSession, StaffUser } from '@/lib/secretAuth';

function subscribeStaffSession(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('chameleon-staff-auth-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('chameleon-staff-auth-change', callback);
  };
}

function getStaffSessionSnapshot(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('chameleon_staff_session');
}

function getServerStaffSessionSnapshot(): string | null {
  return null;
}

interface LeadRecord {
  id: string;
  name: string;
  company: string;
  email: string;
  segment: string;
  users: number;
  modules: string[];
  status: 'Novo' | 'Em Análise' | 'Demonstração Agendada' | 'Homologação';
  date: string;
}

const INITIAL_MOCK_LEADS: LeadRecord[] = [
  {
    id: 'LEAD-9041',
    name: 'Carlos Henrique Viana',
    company: 'Logística & Cargas Sul S/A',
    email: 'carlos.viana@cargassul.com.br',
    segment: 'Logística & Supply Chain',
    users: 180,
    modules: ['ERP Gestão', 'BI Analytics'],
    status: 'Novo',
    date: '29/09/2026 - 11:24'
  },
  {
    id: 'LEAD-9040',
    name: 'Dra. Fernanda Albuquerque',
    company: 'Nexus FinTech Serviços',
    email: 'fernanda@nexusfintech.io',
    segment: 'Finanças & Crédito',
    users: 95,
    modules: ['CRM Vendas', 'ERP Gestão', 'BI Analytics'],
    status: 'Demonstração Agendada',
    date: '29/09/2026 - 09:40'
  },
  {
    id: 'LEAD-9039',
    name: 'Rodrigo M. Peixoto',
    company: 'Varejo Global Brasil',
    email: 'rodrigo.peixoto@varejoglobal.com.br',
    segment: 'Varejo & Distribuição',
    users: 320,
    modules: ['Portal Web & B2B', 'ERP Gestão'],
    status: 'Em Análise',
    date: '28/09/2026 - 17:15'
  },
  {
    id: 'LEAD-9038',
    name: 'Mariana Esteves',
    company: 'Indústria Metalúrgica Alvorada',
    email: 'm.esteves@alvoradametal.ind.br',
    segment: 'Manufatura & Indústria',
    users: 60,
    modules: ['ERP Gestão', 'Chameleon SDK'],
    status: 'Homologação',
    date: '28/09/2026 - 14:02'
  }
];

export default function RestritoPage() {
  const sessionRaw = useSyncExternalStore(subscribeStaffSession, getStaffSessionSnapshot, getServerStaffSessionSnapshot);
  const session: StaffUser | null = useMemo(() => {
    if (!sessionRaw) return null;
    try {
      return JSON.parse(sessionRaw);
    } catch {
      return null;
    }
  }, [sessionRaw]);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorPin, setTwoFactorPin] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dashboard Tabs
  const [activeTab, setActiveTab] = useState<'metrics' | 'leads' | 'engine' | 'audit'>('metrics');

  // Leads state
  const [leads, setLeads] = useState<LeadRecord[]>(INITIAL_MOCK_LEADS);
  const [leadFilter, setLeadFilter] = useState('');

  // Engine Control Sliders
  const [adaptationSensitivity, setAdaptationSensitivity] = useState(5);
  const [brandLockLevel, setBrandLockLevel] = useState(99);
  const [federatedLearning, setFederatedLearning] = useState(true);
  const [isFlushingCache, setIsFlushingCache] = useState(false);
  const [cacheFlushSuccess, setCacheFlushSuccess] = useState(false);

  const handleQuickFill = () => {
    setEmail('equipe@chameleon.internal');
    setPassword('chameleon2026');
    setTwoFactorPin('482091');
    setLoginError(null);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError(null);

    setTimeout(() => {
      // Validate credentials (accept staff email or credentials pattern)
      const validEmail = email.toLowerCase().includes('chameleon') || email.toLowerCase().includes('staff') || email.toLowerCase().includes('admin');
      const validPassword = password === 'chameleon2026' || password === 'admin123' || password.length >= 6;

      if (!validEmail || !validPassword) {
        setLoginError('Credenciais inválidas. Utilize seu e-mail corporativo Chameleon autorizado.');
        setIsSubmitting(false);
        return;
      }

      const staffUser: StaffUser = {
        id: 'STAFF-001',
        name: email.split('@')[0].toUpperCase(),
        email,
        role: 'Engenharia de Plataforma & Arquitetura Neural',
        token: `AUTH-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        loginTime: Date.now()
      };

      setStaffSession(staffUser);
      setIsSubmitting(false);
    }, 600);
  };

  const handleLogout = () => {
    clearStaffSession();
    setEmail('');
    setPassword('');
    setTwoFactorPin('');
  };

  const handleFlushCache = () => {
    setIsFlushingCache(true);
    setTimeout(() => {
      setIsFlushingCache(false);
      setCacheFlushSuccess(true);
      setTimeout(() => setCacheFlushSuccess(false), 3000);
    }, 1200);
  };

  const handleExportLeads = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(leads, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `chameleon-leads-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // ==========================================
  // VIEW 1: UNAUTHENTICATED LOGIN PORTAL
  // ==========================================
  if (!session) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          
          {/* Top Return Button */}
          <div className="mb-6 flex justify-between items-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Portal Público</span>
            </Link>

            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Acesso Restrito
            </span>
          </div>

          {/* Login Card */}
          <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-emerald-950/40">
            {/* Chameleon Emblem */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[1.5px] shadow-lg shadow-emerald-500/20 shrink-0">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <Lock className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white font-display tracking-tight flex items-center gap-2">
                  CHAMELEON <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">STAFF</span>
                </h1>
                <p className="text-[11px] text-slate-400 font-mono">
                  Portal de Engenharia & Operações Internas
                </p>
              </div>
            </div>

            {/* Security Warning Notice */}
            <div className="mb-6 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Esta interface é estritamente restrita à equipe interna. Todas as ações de telemetria e gerenciamento de rede neural são auditadas.
              </span>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="mb-5 p-3 rounded-xl bg-rose-950/50 border border-rose-500/50 text-xs text-rose-300 flex items-center gap-2 animate-in fade-in duration-200">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  E-mail Corporativo Chameleon
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="equipe@chameleon.internal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Chave Mestra / Senha de Acesso
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Token 2FA / PIN Master
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">6 dígitos</span>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  value={twoFactorPin}
                  onChange={(e) => setTwoFactorPin(e.target.value)}
                  placeholder="482091"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-mono tracking-widest text-emerald-400 placeholder-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:from-emerald-300 hover:to-cyan-300 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Cpu className="w-4 h-4 animate-spin" />
                    <span>Autenticando Chave Neural...</span>
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>Acessar Painel de Operações</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Fill Helper */}
            <div className="mt-5 pt-4 border-t border-slate-800/80 text-center">
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline font-mono cursor-pointer transition-colors"
              >
                ⚡ Preencher Credenciais da Equipe para Teste
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED STAFF DASHBOARD
  // ==========================================
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Navbar for Staff */}
      <header className="border-b border-slate-800/80 bg-slate-950/95 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[1.5px] shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center">
                <Cpu className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-tight font-display">CHAMELEON</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono font-bold">
                  INTERNAL OPS
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Operador: {session.name} ({session.role})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors font-mono hidden sm:flex"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Portal Público</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* System Pulse Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-slate-900/60 border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Rede Neural Operacional & Aprendizado Contínuo</h2>
              <p className="text-xs text-slate-300">
                5 nós globais ativos · Observer de Borda respondendo com latência média de 11.4ms · Zero-PII ativo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs shrink-0">
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
              Uptime: 99.98%
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-bold">
              Cluster: us-west-neural-01
            </span>
          </div>
        </div>

        {/* Top 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono block">Adaptações (24h)</span>
            <p className="text-xl sm:text-2xl font-bold text-white font-display mt-1">1.482.910</p>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">+18.4% vs semana anterior</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono block">Latência Média (P99)</span>
            <p className="text-xl sm:text-2xl font-bold text-cyan-400 font-display mt-1">11.8ms</p>
            <span className="text-[10px] text-slate-400 font-mono mt-1 block">Inferência local no cliente</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono block">Nós Conectados</span>
            <p className="text-xl sm:text-2xl font-bold text-teal-400 font-display mt-1">4.820</p>
            <span className="text-[10px] text-slate-400 font-mono mt-1 block">SAP, TOTVS, Salesforce, Omie</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-mono block">Economia Operacional</span>
            <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-display mt-1">3.2M h/mês</p>
            <span className="text-[10px] text-emerald-400 font-mono mt-1 block">4.3 cliques economizados/tarefa</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 mb-6 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'metrics'
                ? 'bg-slate-900 text-emerald-400 border-b-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Telemetria & Nodos</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'leads'
                ? 'bg-slate-900 text-emerald-400 border-b-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Leads & Blueprints ({leads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('engine')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'engine'
                ? 'bg-slate-900 text-emerald-400 border-b-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Controle do Motor Neural</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-t-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'audit'
                ? 'bg-slate-900 text-emerald-400 border-b-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Auditoria LGPD & Zero-PII</span>
          </button>
        </div>

        {/* Tab 1: Telemetry & Nodos */}
        {activeTab === 'metrics' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-emerald-400" />
                  Nodos de Conexão com Softwares Legados (Em Tempo Real)
                </h3>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  5/5 Nodos Saudáveis
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-2">Conector ERP / CRM</th>
                      <th className="pb-2">Instâncias Ativas</th>
                      <th className="pb-2">Latência Média</th>
                      <th className="pb-2">Padrão de Adaptação</th>
                      <th className="pb-2 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-2.5 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        SAP S/4HANA (BAPI / OData v4)
                      </td>
                      <td className="py-2.5">1.280 empresas</td>
                      <td className="py-2.5 text-cyan-400">14.2ms</td>
                      <td className="py-2.5 text-slate-400">Densidade Compacta · Atalhos Fiscais</td>
                      <td className="py-2.5 text-right text-emerald-400 font-bold">ONLINE</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        TOTVS Protheus (REST / ADVPL Observer)
                      </td>
                      <td className="py-2.5">1.840 empresas</td>
                      <td className="py-2.5 text-cyan-400">11.6ms</td>
                      <td className="py-2.5 text-slate-400">Estoque & Faturamento Rápido</td>
                      <td className="py-2.5 text-right text-emerald-400 font-bold">ONLINE</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        Salesforce & HubSpot CRM
                      </td>
                      <td className="py-2.5">920 empresas</td>
                      <td className="py-2.5 text-cyan-400">9.8ms</td>
                      <td className="py-2.5 text-slate-400">Pipeline Vendas · 1-Click WhatsApp</td>
                      <td className="py-2.5 text-right text-emerald-400 font-bold">ONLINE</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        Omie & Bling Cloud ERP
                      </td>
                      <td className="py-2.5">580 empresas</td>
                      <td className="py-2.5 text-cyan-400">12.1ms</td>
                      <td className="py-2.5 text-slate-400">Emissão NFe · Conciliação PIX</td>
                      <td className="py-2.5 text-right text-emerald-400 font-bold">ONLINE</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        Custom Portals & React Apps (SDK)
                      </td>
                      <td className="py-2.5">200 empresas</td>
                      <td className="py-2.5 text-cyan-400">8.4ms</td>
                      <td className="py-2.5 text-slate-400">E-Commerce B2B · Catálogos Dinâmicos</td>
                      <td className="py-2.5 text-right text-emerald-400 font-bold">ONLINE</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Module Utilization Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Distribuição de Carga por Módulo Chameleon
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Chameleon ERP Suite</span>
                      <span className="text-sky-400 font-mono font-bold">42%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-sky-500 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Chameleon CRM Vendas</span>
                      <span className="text-violet-400 font-mono font-bold">28%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-violet-500 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Portal Web & B2B E-Commerce</span>
                      <span className="text-emerald-400 font-mono font-bold">18%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-1">
                      <span>Chameleon BI Executivo</span>
                      <span className="text-amber-400 font-mono font-bold">12%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Padrões Ergonômicos Recorrentes
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                    <span>Emissão de NFe promovida após 3º clique</span>
                    <span className="text-emerald-400 font-mono text-[10px]">98.2% precisão</span>
                  </li>
                  <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                    <span>Transição para Densidade Compacta em monitores &gt;24&quot;</span>
                    <span className="text-cyan-400 font-mono text-[10px]">94.7% adoção</span>
                  </li>
                  <li className="p-2 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                    <span>Atalho WhatsApp 1-Click reduz ciclo em 4.2x</span>
                    <span className="text-teal-400 font-mono text-[10px]">Auditado</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Leads & Blueprints */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por empresa, contato ou módulo..."
                  value={leadFilter}
                  onChange={(e) => setLeadFilter(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <button
                onClick={handleExportLeads}
                className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-emerald-400 hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer font-mono shrink-0"
              >
                <Download className="w-4 h-4" />
                <span>Exportar Base (JSON)</span>
              </button>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/60">
                      <th className="p-3">ID & Data</th>
                      <th className="p-3">Contato & Empresa</th>
                      <th className="p-3">Segmento</th>
                      <th className="p-3">Usuários</th>
                      <th className="p-3">Módulos Solicitados</th>
                      <th className="p-3 text-right">Status do Lead</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {leads
                      .filter((l) =>
                        leadFilter === ''
                          ? true
                          : l.company.toLowerCase().includes(leadFilter.toLowerCase()) ||
                            l.name.toLowerCase().includes(leadFilter.toLowerCase()) ||
                            l.segment.toLowerCase().includes(leadFilter.toLowerCase())
                      )
                      .map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-3">
                            <span className="font-bold text-white block">{lead.id}</span>
                            <span className="text-[10px] text-slate-500">{lead.date}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-semibold text-white block">{lead.company}</span>
                            <span className="text-[10px] text-slate-400">{lead.name} · {lead.email}</span>
                          </td>
                          <td className="p-3 text-slate-400">{lead.segment}</td>
                          <td className="p-3 font-bold text-emerald-400">{lead.users} licenças</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {lead.modules.map((m) => (
                                <span key={m} className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-teal-300">
                                  {m}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                lead.status === 'Novo'
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                  : lead.status === 'Demonstração Agendada'
                                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                  : 'bg-slate-800 text-slate-300'
                              }`}
                            >
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Engine Controls */}
        {activeTab === 'engine' && (
          <div className="max-w-2xl space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                Ajuste de Parâmetros e Heurísticas do Chameleon Observer
              </h3>

              {/* Slider 1: Sensitivity */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-slate-300">
                    Limiar de Cliques para Disparo de Adaptação Automática
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {adaptationSensitivity} cliques repetidos
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="15"
                  value={adaptationSensitivity}
                  onChange={(e) => setAdaptationSensitivity(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Valores menores tornam o layout mais dinâmico; valores maiores garantem maior estabilidade antes da reorganização de atalhos.
                </p>
              </div>

              {/* Slider 2: Brand Lock */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="font-semibold text-slate-300">
                    Rigidez do Brand-Lock (Preservação de Identidade Visual do Cliente)
                  </span>
                  <span className="font-mono text-cyan-400 font-bold">{brandLockLevel}%</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="100"
                  value={brandLockLevel}
                  onChange={(e) => setBrandLockLevel(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Garante que o Chameleon respeite logotipos, paletas institucionais e tipografias oficiais da empresa cliente.
                </p>
              </div>

              {/* Toggle: Federated Learning */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">
                    Treinamento Federado (Zero Dados Centrais)
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Apenas matrizes matemáticas de ergonomia são compartilhadas entre nós; nenhum dado corporativo deixa o navegador.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFederatedLearning(!federatedLearning)}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                    federatedLearning ? 'bg-emerald-500' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                      federatedLearning ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Cache Flush Action */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Purga de Cache do Motor Neural</span>
                <span className="text-[11px] text-slate-400">
                  Força a re-computação dos mapas ergonômicos e pesos sinápticos dos simuladores.
                </span>
              </div>
              <button
                onClick={handleFlushCache}
                disabled={isFlushingCache}
                className="px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isFlushingCache ? 'animate-spin' : ''}`} />
                <span>{isFlushingCache ? 'Expurgando...' : 'Expurgar Cache'}</span>
              </button>
            </div>

            {cacheFlushSuccess && (
              <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cache neural expurgado com sucesso em todos os nós edge.</span>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Audit & Zero-PII */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/30 bg-emerald-950/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Relatório de Conformidade Criptográfica (LGPD & Zero-PII)</h3>
                  <p className="text-xs text-slate-300">
                    Auditoria contínua de pacotes de dados trafegados entre os clientes e o motor neural.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Dados Pessoais (PII) Retidos</span>
                  <span className="text-emerald-400 font-bold text-sm">0.00% (Zero)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Hash de Integridade do Modelo</span>
                  <span className="text-cyan-400 font-bold text-[11px] truncate block">e3b0c44298fc1c149afb</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Criptografia em Trânsito</span>
                  <span className="text-teal-400 font-bold text-sm">TLS 1.3 / AES-256</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                Log de Eventos de Auditoria Criptográfica
              </h4>
              <div className="space-y-2 text-[11px] font-mono text-slate-400">
                <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span>[2026-09-29 13:14:02] Verificação de não-armazenamento de CPF/CNPJ</span>
                  <span className="text-emerald-400">PASSED (100%)</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span>[2026-09-29 12:45:19] Validação do Brand-Lock contra injeção de tokens</span>
                  <span className="text-emerald-400">PASSED (100%)</span>
                </div>
                <div className="p-2 rounded bg-slate-950 border border-slate-800 flex justify-between">
                  <span>[2026-09-29 11:20:00] Renovação automática de certificados de borda (Cloudflare/Fastly)</span>
                  <span className="text-emerald-400">PASSED (100%)</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
