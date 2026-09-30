'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Lock,
  ShieldCheck,
  Cpu,
  Key,
  Users,
  LogOut,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
  Download,
  RefreshCw,
  Search,
  ExternalLink,
  MessageSquare,
  Mail,
  Phone,
  Building2,
  Calendar,
  Layers,
  ChevronRight,
  Plus,
  Trash2,
  X,
  FileSpreadsheet,
  FileText,
  Clock,
  Sparkles,
  Info,
  Check,
  CreditCard,
  Briefcase,
  DollarSign,
  Receipt,
  Send,
  Copy
} from 'lucide-react';
import { setStaffSession, clearStaffSession, StaffUser } from '@/lib/secretAuth';
import {
  DemoRequest,
  INITIAL_DEMO_REQUESTS,
  getDemoRequests,
  saveDemoRequest,
  updateDemoRequestStatus,
  deleteDemoRequest
} from '@/lib/demoRequests';
import {
  ClientContract,
  INITIAL_CLIENT_CONTRACTS,
  getClientContracts,
  saveClientContract,
  updateClientContractStatus,
  deleteClientContract,
  ensureContractHistory,
  generateProvisioningProposalEmail,
  getContractExpirationInfo
} from '@/lib/contracts';
import { ContractTimeline } from '@/components/ContractTimeline';
import { 
  ClientConversation, 
  INITIAL_CONVERSATIONS, 
  getOrCreateConversationForClient 
} from '@/lib/clientChat';
import { ClientChatTab } from '@/components/ClientChatTab';
import { CHAMELEON_MODULES } from '@/lib/chameleonData';
import { ModuleId } from '@/types/chameleon';

// -------------------------------------------------------------
// Session Sync External Store
// -------------------------------------------------------------
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

// -------------------------------------------------------------
// Demo Requests Sync External Store
// -------------------------------------------------------------
function subscribeDemoRequests(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('chameleon-demo-requests-updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('chameleon-demo-requests-updated', callback);
  };
}

function getDemoRequestsSnapshot(): string {
  if (typeof window === 'undefined') return JSON.stringify(INITIAL_DEMO_REQUESTS);
  const data = localStorage.getItem('chameleon_demo_requests_db');
  return data || JSON.stringify(INITIAL_DEMO_REQUESTS);
}

function getServerDemoRequestsSnapshot(): string {
  return JSON.stringify(INITIAL_DEMO_REQUESTS);
}

// -------------------------------------------------------------
// Client Contracts Sync External Store
// -------------------------------------------------------------
function subscribeClientContracts(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('chameleon-contracts-updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('chameleon-contracts-updated', callback);
  };
}

function getClientContractsSnapshot(): string {
  if (typeof window === 'undefined') return JSON.stringify(INITIAL_CLIENT_CONTRACTS);
  const data = localStorage.getItem('chameleon_client_contracts_db');
  return data || JSON.stringify(INITIAL_CLIENT_CONTRACTS);
}

function getServerClientContractsSnapshot(): string {
  return JSON.stringify(INITIAL_CLIENT_CONTRACTS);
}

// -------------------------------------------------------------
// Client Chat Sync External Store
// -------------------------------------------------------------
function subscribeClientChat(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('storage', callback);
  window.addEventListener('chameleon-chat-updated', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('chameleon-chat-updated', callback);
  };
}

function getClientChatSnapshot(): string {
  if (typeof window === 'undefined') return JSON.stringify(INITIAL_CONVERSATIONS);
  const data = localStorage.getItem('chameleon_chat_conversations_db');
  return data || JSON.stringify(INITIAL_CONVERSATIONS);
}

function getServerClientChatSnapshot(): string {
  return JSON.stringify(INITIAL_CONVERSATIONS);
}

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

  // Demo requests synced state
  const demoRequestsRaw = useSyncExternalStore(subscribeDemoRequests, getDemoRequestsSnapshot, getServerDemoRequestsSnapshot);
  const demoRequests: DemoRequest[] = useMemo(() => {
    try {
      return JSON.parse(demoRequestsRaw);
    } catch {
      return INITIAL_DEMO_REQUESTS;
    }
  }, [demoRequestsRaw]);

  // Client contracts synced state
  const contractsRaw = useSyncExternalStore(subscribeClientContracts, getClientContractsSnapshot, getServerClientContractsSnapshot);
  const contracts: ClientContract[] = useMemo(() => {
    try {
      return JSON.parse(contractsRaw);
    } catch {
      return INITIAL_CLIENT_CONTRACTS;
    }
  }, [contractsRaw]);

  // Client conversations synced state
  const chatRaw = useSyncExternalStore(subscribeClientChat, getClientChatSnapshot, getServerClientChatSnapshot);
  const conversations: ClientConversation[] = useMemo(() => {
    try {
      return JSON.parse(chatRaw);
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  }, [chatRaw]);

  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorPin, setTwoFactorPin] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dashboard Tabs: 'contracts' | 'demos' | 'chat'
  const [activeTab, setActiveTab] = useState<'contracts' | 'demos' | 'chat'>('contracts');
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  // Filters for Client Contracts
  const [contractSearchQuery, setContractSearchQuery] = useState('');
  const [contractStatusFilter, setContractStatusFilter] = useState<string>('all');
  const [contractModuleFilter, setContractModuleFilter] = useState<string>('all');
  const [contractPlanFilter, setContractPlanFilter] = useState<string>('all');

  // Detail Modal for a specific contract
  const [selectedContract, setSelectedContract] = useState<ClientContract | null>(null);
  const [contractEditingNotes, setContractEditingNotes] = useState('');

  // Provisioning Proposal Email Modal
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [proposalCopied, setProposalCopied] = useState(false);
  const [proposalLinkCopied, setProposalLinkCopied] = useState(false);

  // Manual New Contract Modal
  const [isNewContractModalOpen, setIsNewContractModalOpen] = useState(false);
  const [newContractForm, setNewContractForm] = useState({
    companyName: '',
    cnpj: '',
    cityState: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    contactRole: 'Diretor de TI',
    moduleId: 'erp' as ModuleId,
    moduleName: 'Chameleon ERP Suite',
    plan: 'Professional' as ClientContract['plan'],
    teamSize: 100,
    billingCycle: 'anual' as ClientContract['billingCycle'],
    monthlyValue: 2990,
    annualValue: 35880,
    deploymentEnvironment: 'Cloud Dedicada Chameleon' as ClientContract['deploymentEnvironment'],
    legacyIntegration: 'TOTVS Protheus 12.1',
    paymentMethod: 'Boleto Bancário (30 dias)' as ClientContract['paymentMethod'],
    internalNotes: ''
  });

  // Filters for Demo Requests
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [segmentFilter, setSegmentFilter] = useState<string>('all');
  const [moduleFilter, setModuleFilter] = useState<string>('all');

  // Detail Modal for a specific demo request
  const [selectedDemo, setSelectedDemo] = useState<DemoRequest | null>(null);
  const [editingNotes, setEditingNotes] = useState('');

  // Manual New Demo Modal
  const [isNewDemoModalOpen, setIsNewDemoModalOpen] = useState(false);
  const [newDemoForm, setNewDemoForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    segment: 'Indústria & Manufatura',
    teamSize: '21 a 100 colaboradores',
    selectedModules: ['erp', 'crm'] as ModuleId[],
    notes: ''
  });

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

  // -------------------------------------------------------------
  // Contract Handlers
  // -------------------------------------------------------------
  const handleChangeContractStatus = (id: string, newStatus: ClientContract['status']) => {
    const authorName = session?.name ? `Staff: ${session.name}` : 'Equipe Chameleon Staff';
    const updatedContracts = updateClientContractStatus(id, newStatus, undefined, authorName);
    const target = updatedContracts.find((c) => c.id === id);
    if (target) {
      setSelectedContract(target);
    }
  };

  const handleSaveContractNotes = (id: string) => {
    const authorName = session?.name ? `Staff: ${session.name}` : 'Equipe Chameleon Staff';
    const updatedContracts = updateClientContractStatus(id, selectedContract?.status || 'Aguardando Provisionamento', contractEditingNotes, authorName);
    const target = updatedContracts.find((c) => c.id === id);
    if (target) {
      setSelectedContract(target);
    }
  };

  const handleDeleteContract = (id: string) => {
    if (confirm('Tem certeza que deseja remover este contrato da base ativa?')) {
      deleteClientContract(id);
      setSelectedContract(null);
    }
  };

  const handleCreateManualContract = (e: React.FormEvent) => {
    e.preventDefault();
    saveClientContract({
      ...newContractForm,
      selectedModules: [newContractForm.moduleId],
      moduleNames: [newContractForm.moduleName],
      teamTier: `${newContractForm.teamSize} usuários`
    });
    setIsNewContractModalOpen(false);
  };

  const handleOpenWhatsAppChat = (client: {
    id: string;
    name: string;
    role?: string;
    company: string;
    phone: string;
    email?: string;
    status?: string;
    moduleName?: string;
  }) => {
    const conversation = getOrCreateConversationForClient(client);
    setSelectedConversationId(conversation.id);
    setSelectedContract(null);
    setSelectedDemo(null);
    setIsProposalModalOpen(false);
    setActiveTab('chat');
  };

  const handleExportContractsCSV = () => {
    const headers = ['ID Contrato', 'Data', 'Vencimento', 'Dias para Renovação', 'Empresa', 'CNPJ', 'Cidade UF', 'Titular', 'Email', 'Telefone', 'Cargo', 'Modulo', 'Plano', 'Usuarios', 'Ciclo', 'Valor Mensal', 'Valor Anual', 'Ambiente', 'Integracao Legada', 'Pagamento', 'Status'];
    const rows = contracts.map((c) => {
      const exp = getContractExpirationInfo(c);
      return [
        c.id,
        c.createdAt,
        exp.expiresAt,
        exp.daysRemaining,
        `"${c.companyName.replace(/"/g, '""')}"`,
        c.cnpj,
        `"${(c.cityState || '').replace(/"/g, '""')}"`,
        `"${c.contactName.replace(/"/g, '""')}"`,
        c.contactEmail,
        c.contactPhone,
        `"${c.contactRole.replace(/"/g, '""')}"`,
        `"${(c.moduleName || (c.moduleNames ? c.moduleNames.join(', ') : '')).replace(/"/g, '""')}"`,
        c.plan || c.teamTier,
        c.teamSize,
        c.billingCycle,
        c.monthlyValue,
        c.annualValue,
        `"${c.deploymentEnvironment}"`,
        `"${c.legacyIntegration}"`,
        `"${c.paymentMethod}"`,
        c.status
      ];
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `chameleon-contratos-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleExportContractsJSON = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(contracts, null, 2))}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `chameleon-contratos-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // -------------------------------------------------------------
  // Demo Requests Handlers
  // -------------------------------------------------------------
  const handleChangeStatus = (id: string, newStatus: DemoRequest['status']) => {
    updateDemoRequestStatus(id, newStatus);
    if (selectedDemo && selectedDemo.id === id) {
      setSelectedDemo((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleSaveInternalNotes = (id: string) => {
    updateDemoRequestStatus(id, selectedDemo?.status || 'Novo', editingNotes);
    if (selectedDemo) {
      setSelectedDemo((prev) => (prev ? { ...prev, internalNotes: editingNotes } : null));
    }
  };

  const handleDeleteDemo = (id: string) => {
    if (confirm('Tem certeza que deseja remover esta solicitação de demonstração da base?')) {
      deleteDemoRequest(id);
      setSelectedDemo(null);
    }
  };

  const handleCreateManualDemo = (e: React.FormEvent) => {
    e.preventDefault();
    saveDemoRequest(newDemoForm);
    setIsNewDemoModalOpen(false);
    setNewDemoForm({
      name: '',
      email: '',
      company: '',
      phone: '',
      segment: 'Indústria & Manufatura',
      teamSize: '21 a 100 colaboradores',
      selectedModules: ['erp', 'crm'],
      notes: ''
    });
  };

  // Filtered Contracts
  const filteredContracts = useMemo(() => {
    return contracts.filter((c) => {
      const matchesSearch =
        contractSearchQuery === '' ||
        c.companyName.toLowerCase().includes(contractSearchQuery.toLowerCase()) ||
        c.cnpj.toLowerCase().includes(contractSearchQuery.toLowerCase()) ||
        c.contactName.toLowerCase().includes(contractSearchQuery.toLowerCase()) ||
        c.contactEmail.toLowerCase().includes(contractSearchQuery.toLowerCase()) ||
        Boolean(c.moduleName && c.moduleName.toLowerCase().includes(contractSearchQuery.toLowerCase())) ||
        Boolean(c.moduleNames && c.moduleNames.some((m) => m.toLowerCase().includes(contractSearchQuery.toLowerCase()))) ||
        c.legacyIntegration.toLowerCase().includes(contractSearchQuery.toLowerCase());

      const matchesStatus = 
        contractStatusFilter === 'all' || 
        c.status === contractStatusFilter ||
        (contractStatusFilter === 'expiring_soon' && getContractExpirationInfo(c).isExpiringSoon);

      const matchesModule = 
        contractModuleFilter === 'all' || 
        c.moduleId === contractModuleFilter ||
        Boolean(c.selectedModules && c.selectedModules.includes(contractModuleFilter as ModuleId));
      const matchesPlan = contractPlanFilter === 'all' || c.plan === contractPlanFilter || c.teamTier === contractPlanFilter;

      return matchesSearch && matchesStatus && matchesModule && matchesPlan;
    });
  }, [contracts, contractSearchQuery, contractStatusFilter, contractModuleFilter, contractPlanFilter]);

  // Pre-formatted Provisioning Proposal Email
  const provisioningProposal = useMemo(() => {
    if (!selectedContract) return null;
    const staffName = session?.name
      ? `Staff: ${session.name} (${session.role || 'Engenharia Chameleon'})`
      : 'Equipe de Engenharia & Implantação Chameleon';
    return generateProvisioningProposalEmail(selectedContract, staffName);
  }, [selectedContract, session]);

  // Filtered Demo Requests
  const filteredDemos = useMemo(() => {
    return demoRequests.filter((req) => {
      const matchesSearch =
        searchQuery === '' ||
        req.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (req.notes && req.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
      const matchesSegment = segmentFilter === 'all' || req.segment === segmentFilter;
      const matchesModule = moduleFilter === 'all' || req.selectedModules.includes(moduleFilter as ModuleId);

      return matchesSearch && matchesStatus && matchesSegment && matchesModule;
    });
  }, [demoRequests, searchQuery, statusFilter, segmentFilter, moduleFilter]);

  // Contract Metrics
  const totalMRR = contracts.reduce((acc, c) => acc + c.monthlyValue, 0);
  const totalContractedUsers = contracts.reduce((acc, c) => acc + c.teamSize, 0);
  const activeContractsCount = contracts.filter((c) => c.status === 'Ativo / Em Implantação' || c.status === 'Homologado').length;
  const pendingProvisioningCount = contracts.filter((c) => c.status === 'Aguardando Provisionamento').length;
  const expiringSoonCount = contracts.filter((c) => getContractExpirationInfo(c).isExpiringSoon).length;

  const newRequestsCount = demoRequests.filter((r) => r.status === 'Novo').length;
  const scheduledCount = demoRequests.filter((r) => r.status === 'Demonstração Agendada').length;

  // ==========================================
  // VIEW 1: LOGIN PORTAL (UNAUTHENTICATED)
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
              Acesso Restrito à Equipe
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
                  Portal de Gestão de Contratos & Operações
                </p>
              </div>
            </div>

            {/* Security Warning Notice */}
            <div className="mb-6 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Área de acesso restrito à equipe Chameleon. Gestão de contratações de módulos, provisionamento e auditoria neural.
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
                    <span>Acessar Central de Operações</span>
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
              <span>Ver Portal Público</span>
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
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 mb-6 overflow-x-auto pb-1">
          {/* TAB 1: CONTRATAÇÕES DE CLIENTES (NOVA SESSÃO) */}
          <button
            onClick={() => setActiveTab('contracts')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'contracts'
                ? 'bg-slate-900 text-emerald-400 border-b-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Contratações de Clientes</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
              {contracts.length}
            </span>
            {pendingProvisioningCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300 text-[9px] font-mono animate-pulse">
                {pendingProvisioningCount} pendentes
              </span>
            )}
            {expiringSoonCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-mono font-bold flex items-center gap-1 animate-pulse">
                <AlertTriangle className="w-2.5 h-2.5 text-rose-400" />
                {expiringSoonCount} a vencer
              </span>
            )}
          </button>

          {/* TAB 2: SOLICITAÇÕES DE DEMONSTRAÇÃO (LEADS) */}
          <button
            onClick={() => setActiveTab('demos')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'demos'
                ? 'bg-slate-900 text-emerald-400 border-b-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Solicitações de Demonstração</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
              {demoRequests.length}
            </span>
          </button>

          {/* TAB 3: CHAT WHATSAPP COM CLIENTES */}
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              activeTab === 'chat'
                ? 'bg-slate-900 text-emerald-400 border-b-2 border-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat WhatsApp</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
              {conversations.length}
            </span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CONTRATAÇÕES DE CLIENTES (NOVA SESSÃO EXCLUSIVA)  */}
        {/* ======================================================== */}
        {activeTab === 'contracts' && (
          <div className="space-y-6">
            
            {/* Top KPI Cards for Client Contracts */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block">MRR Contratado</span>
                <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-display mt-1">
                  R$ {totalMRR.toLocaleString('pt-BR')}
                </p>
                <span className="text-[10px] text-emerald-400/80 font-mono mt-1 block">Receita Mensal Recorrente</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block">Licenças Contratadas</span>
                <p className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                  {totalContractedUsers}
                </p>
                <span className="text-[10px] text-cyan-400 font-mono mt-1 block">Operadores corporativos</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block">Contratos Ativos</span>
                <p className="text-xl sm:text-2xl font-bold text-cyan-400 font-display mt-1">
                  {activeContractsCount} / {contracts.length}
                </p>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">Implantados ou homologados</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block">Pendentes de Setup</span>
                <p className="text-xl sm:text-2xl font-bold text-amber-400 font-display mt-1">
                  {pendingProvisioningCount}
                </p>
                <span className="text-[10px] text-amber-400/80 font-mono mt-1 block">SLA de provisionamento 48h</span>
              </div>

              <div className={`p-4 rounded-2xl border transition-all ${
                expiringSoonCount > 0 
                  ? 'bg-amber-950/20 border-amber-500/40 shadow-lg shadow-amber-500/10' 
                  : 'bg-slate-900/80 border border-slate-800'
              }`}>
                <span className="text-[11px] text-slate-400 font-mono block">A Vencer (&lt; 30 dias)</span>
                <p className={`text-xl sm:text-2xl font-bold font-display mt-1 ${
                  expiringSoonCount > 0 ? 'text-amber-400 animate-pulse' : 'text-slate-300'
                }`}>
                  {expiringSoonCount}
                </p>
                <span className="text-[10px] text-amber-400/90 font-mono mt-1 block flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  Alerta de Renovação Ativo
                </span>
              </div>
            </div>

            {/* Filter and Action Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              
              {/* Search input */}
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por Empresa, CNPJ, Titular, E-mail, Módulo ou ERP integrado..."
                  value={contractSearchQuery}
                  onChange={(e) => setContractSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              {/* Dropdown Filters */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {/* Status Filter */}
                <select
                  value={contractStatusFilter}
                  onChange={(e) => setContractStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="all">Todos os Status</option>
                  <option value="expiring_soon">⚠️ A Vencer (&lt; 30 dias) ({expiringSoonCount})</option>
                  <option value="Aguardando Provisionamento">Aguardando Provisionamento</option>
                  <option value="Ativo / Em Implantação">Ativo / Em Implantação</option>
                  <option value="Homologado">Homologado</option>
                  <option value="Pendente Assinatura Digital">Pendente Assinatura Digital</option>
                  <option value="Cancelado">Cancelado</option>
                </select>

                {/* Module Filter */}
                <select
                  value={contractModuleFilter}
                  onChange={(e) => setContractModuleFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="all">Todos os Módulos</option>
                  <option value="erp">Chameleon ERP</option>
                  <option value="crm">Chameleon CRM</option>
                  <option value="portal">Portal Web & B2B</option>
                  <option value="bi">Chameleon BI</option>
                  <option value="sdk">Chameleon SDK</option>
                </select>

                {/* Plan Filter */}
                <select
                  value={contractPlanFilter}
                  onChange={(e) => setContractPlanFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="all">Todos os Planos</option>
                  <option value="Starter">Starter</option>
                  <option value="Professional">Professional</option>
                  <option value="Enterprise">Enterprise</option>
                </select>

                {/* Export Buttons */}
                <button
                  onClick={handleExportContractsCSV}
                  title="Exportar contratos em formato CSV"
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>CSV</span>
                </button>

                <button
                  onClick={handleExportContractsJSON}
                  title="Exportar contratos em formato JSON"
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>JSON</span>
                </button>

                {/* Add Manual Contract Button */}
                <button
                  onClick={() => setIsNewContractModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Contrato</span>
                </button>
              </div>
            </div>

            {/* Main Contracts Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/70">
                      <th className="p-3.5">Contrato / Data</th>
                      <th className="p-3.5">Empresa & CNPJ</th>
                      <th className="p-3.5">Titular / Contato</th>
                      <th className="p-3.5">Módulo Contratado</th>
                      <th className="p-3.5">Plano & Faturamento</th>
                      <th className="p-3.5">Data de Vencimento</th>
                      <th className="p-3.5">Ambiente & Legado</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredContracts.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="p-8 text-center text-slate-500 font-sans">
                          Nenhum contrato de cliente encontrado com os filtros selecionados.
                        </td>
                      </tr>
                    ) : (
                      filteredContracts.map((contract) => {
                        const expInfo = getContractExpirationInfo(contract);
                        const statusColors: Record<ClientContract['status'], string> = {
                          'Aguardando Provisionamento': 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                          'Ativo / Em Implantação': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
                          'Homologado': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
                          'Pendente Assinatura Digital': 'bg-violet-500/20 text-violet-300 border-violet-500/40',
                          'Cancelado': 'bg-slate-950 text-slate-500 border-slate-800'
                        };

                        return (
                          <tr 
                            key={contract.id} 
                            onClick={() => {
                              setSelectedContract(contract);
                              setContractEditingNotes(contract.internalNotes || '');
                            }}
                            className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                          >
                            {/* Contract ID and Date */}
                            <td className="p-3.5">
                              <span className="font-bold text-white block group-hover:text-emerald-400 transition-colors">
                                {contract.id}
                              </span>
                              <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                                <Clock className="w-3 h-3" />
                                {contract.createdAt}
                              </span>
                            </td>

                            {/* Company & CNPJ */}
                            <td className="p-3.5 font-sans">
                              <p className="font-bold text-white text-xs leading-tight">
                                {contract.companyName}
                              </p>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                                CNPJ: {contract.cnpj}
                              </p>
                              {contract.cityState && (
                                <p className="text-[10px] text-slate-500 font-mono">
                                  {contract.cityState}
                                </p>
                              )}
                            </td>

                            {/* Contact Person */}
                            <td className="p-3.5 font-sans">
                              <p className="text-white font-medium text-xs">
                                {contract.contactName}
                              </p>
                              <p className="text-[10px] text-slate-400 font-mono">
                                {contract.contactRole}
                              </p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-0.5">
                                <span>{contract.contactPhone}</span>
                              </div>
                            </td>

                            {/* Contracted Modules */}
                            <td className="p-3.5">
                              <div className="flex flex-wrap gap-1 max-w-[220px]">
                                {contract.selectedModules && contract.selectedModules.length > 0 ? (
                                  contract.selectedModules.map((mId) => {
                                    const mod = CHAMELEON_MODULES.find((m) => m.id === mId);
                                    return (
                                      <span
                                        key={mId}
                                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                                          mId === 'erp'
                                            ? 'bg-sky-500/15 text-sky-300 border-sky-500/30'
                                            : mId === 'crm'
                                            ? 'bg-violet-500/15 text-violet-300 border-violet-500/30'
                                            : mId === 'portal'
                                            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                            : mId === 'bi'
                                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                            : 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30'
                                        }`}
                                      >
                                        {mod ? mod.name : mId.toUpperCase()}
                                      </span>
                                    );
                                  })
                                ) : (
                                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                    {contract.moduleName}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Plan & Pricing */}
                            <td className="p-3.5">
                              <div className="space-y-0.5">
                                <span className="font-bold text-white text-xs block">
                                  {contract.plan} ({contract.teamSize} licenças)
                                </span>
                                <span className="text-emerald-400 font-bold block text-xs">
                                  R$ {contract.monthlyValue.toLocaleString('pt-BR')}/mês
                                </span>
                                <span className="text-[10px] text-slate-500 block">
                                  Ciclo {contract.billingCycle === 'anual' ? 'Anual (20% off)' : 'Mensal'}
                                </span>
                              </div>
                            </td>

                            {/* Data de Vencimento & Renewal Alert */}
                            <td className="p-3.5 font-mono">
                              {expInfo.isExpired ? (
                                <div className="space-y-1">
                                  <span className="text-rose-400 font-bold block text-xs">{expInfo.expiresAt}</span>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                                    <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                                    Vencido ({Math.abs(expInfo.daysRemaining)}d atrás)
                                  </span>
                                </div>
                              ) : expInfo.isExpiringSoon ? (
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3 text-amber-400 shrink-0" />
                                    <span className="text-white font-bold text-xs">{expInfo.expiresAt}</span>
                                  </div>
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse">
                                    <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                                    {expInfo.isExpiringToday ? 'Vence Hoje!' : `${expInfo.daysRemaining} dias p/ renovação`}
                                  </span>
                                </div>
                              ) : (
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3 text-slate-500 shrink-0" />
                                    <span className="text-slate-200 font-medium text-xs">{expInfo.expiresAt}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-500 block">
                                    {expInfo.daysRemaining} dias restantes
                                  </span>
                                </div>
                              )}
                            </td>

                            {/* Environment & Legacy */}
                            <td className="p-3.5 font-sans">
                              <span className="text-xs text-slate-300 block truncate" title={contract.deploymentEnvironment}>
                                {contract.deploymentEnvironment}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                                Legado: {contract.legacyIntegration}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono block">
                                Pgto: {contract.paymentMethod}
                              </span>
                            </td>

                            {/* Status */}
                            <td className="p-3.5">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border inline-block ${statusColors[contract.status]}`}>
                                {contract.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="p-3.5 text-right font-sans" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center justify-end gap-1.5">
                                {/* WhatsApp Button */}
                                <button
                                  onClick={() => handleOpenWhatsAppChat({
                                    id: contract.id,
                                    name: contract.contactName,
                                    role: contract.contactRole,
                                    company: contract.companyName,
                                    phone: contract.contactPhone,
                                    email: contract.contactEmail,
                                    status: contract.status,
                                    moduleName: contract.moduleName
                                  })}
                                  title="Abrir chat no WhatsApp com o cliente"
                                  className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 transition-colors cursor-pointer"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                </button>

                                {/* Email Button */}
                                <a
                                  href={`mailto:${contract.contactEmail}?subject=${encodeURIComponent(
                                    `Contrato de Implantação Chameleon Systems - ${contract.id}`
                                  )}`}
                                  title="Enviar e-mail de provisionamento"
                                  className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>

                                {/* View Details Chevron */}
                                <button
                                  onClick={() => {
                                    setSelectedContract(contract);
                                    setContractEditingNotes(contract.internalNotes || '');
                                  }}
                                  title="Ver ficha completa do contrato"
                                  className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                                >
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: DEMO REQUESTS                                     */}
        {/* ======================================================== */}
        {activeTab === 'demos' && (
          <div className="space-y-6">
            
            {/* Top KPI Cards for Demo Requests */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block">Total de Solicitações</span>
                <p className="text-xl sm:text-2xl font-bold text-white font-display mt-1">{demoRequests.length}</p>
                <span className="text-[10px] text-emerald-400 font-mono mt-1 block">Recebidas via formulário</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block">Aguardando Contato</span>
                <p className="text-xl sm:text-2xl font-bold text-amber-400 font-display mt-1">{newRequestsCount}</p>
                <span className="text-[10px] text-amber-400/80 font-mono mt-1 block">Leads pendentes</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block">Demos Agendadas</span>
                <p className="text-xl sm:text-2xl font-bold text-cyan-400 font-display mt-1">{scheduledCount}</p>
                <span className="text-[10px] text-cyan-400/80 font-mono mt-1 block">Em alinhamento</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-[11px] text-slate-400 font-mono block">Taxa de Conversão</span>
                <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-display mt-1">42.8%</p>
                <span className="text-[10px] text-emerald-400/80 font-mono mt-1 block">Proposta ➔ Homologação</span>
              </div>
            </div>

            {/* Filter and Action Bar */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar por Empresa, Contato, E-mail, Telefone ou ERP legado..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-emerald-400 cursor-pointer"
                >
                  <option value="all">Todos os Status</option>
                  <option value="Novo">Novo</option>
                  <option value="Em Análise">Em Análise</option>
                  <option value="Demonstração Agendada">Demonstração Agendada</option>
                  <option value="Em Homologação">Em Homologação</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Arquivado">Arquivado</option>
                </select>

                <button
                  onClick={() => setIsNewDemoModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Lead</span>
                </button>
              </div>
            </div>

            {/* Demo Requests Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/70">
                      <th className="p-3.5">Solicitação / Data</th>
                      <th className="p-3.5">Contato & Empresa</th>
                      <th className="p-3.5">Segmento & Equipe</th>
                      <th className="p-3.5">Módulos Solicitados</th>
                      <th className="p-3.5">ERP Atual</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {filteredDemos.map((req) => (
                      <tr 
                        key={req.id} 
                        onClick={() => {
                          setSelectedDemo(req);
                          setEditingNotes(req.internalNotes || '');
                        }}
                        className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                      >
                        <td className="p-3.5">
                          <span className="font-bold text-white block group-hover:text-emerald-400 transition-colors">
                            {req.id}
                          </span>
                          <span className="text-[10px] text-slate-500">{req.createdAt}</span>
                        </td>
                        <td className="p-3.5 font-sans">
                          <p className="font-bold text-white text-xs">{req.company}</p>
                          <p className="text-[11px] text-slate-300">{req.name} · {req.email}</p>
                        </td>
                        <td className="p-3.5 font-sans">
                          <span className="text-slate-300 block text-xs">{req.segment}</span>
                          <span className="text-[11px] text-emerald-400 font-mono">{req.teamSize}</span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {req.selectedModules.map((mId) => (
                              <span key={mId} className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-950 border border-slate-800 text-teal-300">
                                {mId.toUpperCase()}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="p-3.5 max-w-[180px] font-sans">
                          <p className="text-[11px] text-slate-300 truncate">{req.notes || '-'}</p>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                            {req.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right font-sans" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenWhatsAppChat({
                                id: req.id,
                                name: req.name,
                                company: req.company,
                                phone: req.phone,
                                email: req.email,
                                status: req.status,
                                role: 'Lead Corporativo'
                              })}
                              title="Abrir chat no WhatsApp com o lead"
                              className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/60 transition-colors cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                setSelectedDemo(req);
                                setEditingNotes(req.internalNotes || '');
                              }}
                              className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CHAT WHATSAPP COM CLIENTES                        */}
        {/* ======================================================== */}
        {activeTab === 'chat' && (
          <ClientChatTab
            conversations={conversations}
            activeConversationId={selectedConversationId}
            onSelectConversation={(id) => setSelectedConversationId(id)}
            staffName={session?.name ? `Staff: ${session.name}` : 'Equipe Chameleon'}
            onOpenContractDetails={(contractId) => {
              const found = contracts.find((c) => c.id === contractId);
              if (found) {
                setSelectedContract(found);
              }
            }}
          />
        )}

      </div>

      {/* ======================================================== */}
      {/* MODAL 1: DETALHES COMPLETOS DO CONTRATO DE CLIENTE       */}
      {/* ======================================================== */}
      {selectedContract && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedContract(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    {selectedContract.id}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Contratado em: {selectedContract.createdAt}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  {selectedContract.companyName}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  CNPJ: {selectedContract.cnpj} {selectedContract.cityState ? `· ${selectedContract.cityState}` : ''}
                </p>
              </div>

              <button
                onClick={() => setSelectedContract(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* Status Selector Bar */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-slate-400 block text-[11px] font-medium">Status do Contrato:</span>
                  <span className="font-bold text-white text-sm">{selectedContract.status}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-[11px]">Alterar status:</span>
                  <select
                    value={selectedContract.status}
                    onChange={(e) => handleChangeContractStatus(selectedContract.id, e.target.value as ClientContract['status'])}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-emerald-400 font-bold focus:outline-none focus:border-emerald-400 cursor-pointer"
                  >
                    <option value="Aguardando Provisionamento">Aguardando Provisionamento</option>
                    <option value="Ativo / Em Implantação">Ativo / Em Implantação</option>
                    <option value="Homologado">Homologado</option>
                    <option value="Pendente Assinatura Digital">Pendente Assinatura Digital</option>
                    <option value="Cancelado">Cancelado</option>
                  </select>
                </div>
              </div>

              {/* Module & Pricing Details Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-slate-900 border border-emerald-500/30 space-y-3">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-mono">
                  Especificações da Assinatura do Pacote:
                </span>
                {(() => {
                  const selExp = getContractExpirationInfo(selectedContract);
                  return (
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs mb-2">
                      <div>
                        <span className="text-slate-500 block text-[10px]">Plano:</span>
                        <strong className="text-white text-xs">{selectedContract.plan || selectedContract.teamTier}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Equipe / Licenças:</span>
                        <strong className="text-emerald-400">{selectedContract.teamSize} usuários</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Faturamento Mensal:</span>
                        <strong className="text-white">R$ {selectedContract.monthlyValue.toLocaleString('pt-BR')}/mês</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Total Anual:</span>
                        <strong className="text-cyan-400">R$ {selectedContract.annualValue.toLocaleString('pt-BR')}/ano</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px]">Vencimento / Renovação:</span>
                        <div className="flex flex-col gap-0.5 mt-0.5">
                          <strong className="text-white text-xs">{selExp.expiresAt}</strong>
                          {selExp.isExpiringSoon && (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-300 animate-pulse font-mono">
                              <AlertTriangle className="w-2.5 h-2.5 text-amber-400" />
                              {selExp.daysRemaining}d p/ renovação
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* List of included modules */}
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1.5">
                    Módulos Inclusos na Contratação:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedContract.moduleNames && selectedContract.moduleNames.length > 0 ? (
                      selectedContract.moduleNames.map((name) => (
                        <span key={name} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-medium text-xs flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {name}
                        </span>
                      ))
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-white font-medium text-xs">
                        {selectedContract.moduleName}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Person Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                    Titular do Contrato & Cargo
                  </span>
                  <p className="font-bold text-white text-sm">{selectedContract.contactName}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{selectedContract.contactRole}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                    Canais de Contato Corporativo
                  </span>
                  <a href={`mailto:${selectedContract.contactEmail}`} className="font-mono text-emerald-400 hover:underline block truncate">
                    {selectedContract.contactEmail}
                  </a>
                  <p className="font-mono text-white mt-0.5">{selectedContract.contactPhone}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                    Ambiente & Hospedagem
                  </span>
                  <p className="text-white font-medium">{selectedContract.deploymentEnvironment}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-mono">SLA: {selectedContract.slaLevel}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                    Integração Legada & Pagamento
                  </span>
                  <p className="text-white font-medium">ERP: {selectedContract.legacyIntegration}</p>
                  <p className="text-[10px] text-emerald-400 mt-0.5 font-mono">Método: {selectedContract.paymentMethod}</p>
                </div>
              </div>

              {/* Status Change Audit & Vertical Timeline */}
              <ContractTimeline 
                history={ensureContractHistory(selectedContract)} 
                currentStatus={selectedContract.status} 
              />

              {/* Internal Staff Notes */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-mono">
                  Anotações Internas de Provisionamento & Suporte:
                </span>
                <textarea
                  rows={3}
                  value={contractEditingNotes}
                  onChange={(e) => setContractEditingNotes(e.target.value)}
                  placeholder="Registre IP de host, token de conexão, dados de VPC ou pendências fiscais..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-sans leading-relaxed"
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSaveContractNotes(selectedContract.id)}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-emerald-500/30 transition-colors cursor-pointer"
                  >
                    Salvar Anotações
                  </button>
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Primary Action Button: Enviar Proposta de Provisionamento */}
                  <button
                    onClick={() => {
                      setIsProposalModalOpen(true);
                      setProposalCopied(false);
                      setProposalLinkCopied(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:opacity-95 text-slate-950 font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Proposta de Provisionamento</span>
                  </button>

                  <button
                    onClick={() => handleOpenWhatsAppChat({
                      id: selectedContract.id,
                      name: selectedContract.contactName,
                      role: selectedContract.contactRole,
                      company: selectedContract.companyName,
                      phone: selectedContract.contactPhone,
                      email: selectedContract.contactEmail,
                      status: selectedContract.status,
                      moduleName: selectedContract.moduleName
                    })}
                    className="px-3.5 py-2 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-400 border border-emerald-500/30 font-medium flex items-center gap-2 transition-colors cursor-pointer text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>

                  <a
                    href={`mailto:${selectedContract.contactEmail}?subject=${encodeURIComponent(
                      provisioningProposal?.subject || `Setup Técnico Chameleon - ${selectedContract.id}`
                    )}&body=${encodeURIComponent(provisioningProposal?.body || '')}`}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-2 transition-colors cursor-pointer text-xs"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>E-mail</span>
                  </a>
                </div>

                <button
                  onClick={() => handleDeleteContract(selectedContract.id)}
                  className="px-3 py-2 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Excluir</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: PROPOSTA DE PROVISIONAMENTO & SETUP TÉCNICO     */}
      {/* ======================================================== */}
      {isProposalModalOpen && selectedContract && provisioningProposal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsProposalModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    Modelo Automático Pré-formatado
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    Contrato: {selectedContract.id}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white font-display">
                  Proposta de Provisionamento & Setup Técnico
                </h3>
                <p className="text-xs text-slate-400">
                  E-mail institucional com link seguro de onboarding e homologação para a equipe de TI do cliente
                </p>
              </div>

              <button
                onClick={() => setIsProposalModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              
              {/* Recipient & Subject Header Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <span className="text-slate-400 font-mono text-[11px] uppercase">Destinatário:</span>
                  <div className="flex items-center gap-2 text-white font-medium">
                    <span>{selectedContract.contactName} ({selectedContract.contactRole})</span>
                    <span className="text-emerald-400 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                      {selectedContract.contactEmail}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs pt-2 border-t border-slate-900">
                  <span className="text-slate-400 font-mono text-[11px] uppercase">Assunto:</span>
                  <span className="text-white font-medium text-right truncate">
                    {provisioningProposal.subject}
                  </span>
                </div>
              </div>

              {/* Setup Access Link Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-slate-900 border border-emerald-500/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase text-emerald-300 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Link Seguro de Acesso ao Painel de Setup
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(provisioningProposal.setupUrl);
                        setProposalLinkCopied(true);
                        setTimeout(() => setProposalLinkCopied(false), 2500);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-semibold flex items-center gap-1 hover:bg-emerald-500/30 transition-colors cursor-pointer"
                    >
                      {proposalLinkCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{proposalLinkCopied ? 'Link Copiado!' : 'Copiar Link'}</span>
                    </button>

                    <a
                      href={provisioningProposal.setupUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-700 text-[11px] font-mono font-medium flex items-center gap-1 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <span>Abrir Painel</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <p className="text-[11px] font-mono text-emerald-400/90 break-all bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  {provisioningProposal.setupUrl}
                </p>
              </div>

              {/* Formatted Message Preview */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono text-[11px] uppercase block">
                    Corpo do E-mail Pré-formatado:
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Texto Padrão Pronto para Disparo
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-h-[260px] overflow-y-auto font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {provisioningProposal.body}
                </div>
              </div>

            </div>

            {/* Footer Action Buttons */}
            <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(provisioningProposal.body);
                    setProposalCopied(true);
                    setTimeout(() => setProposalCopied(false), 2500);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {proposalCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{proposalCopied ? 'Copiado para a Área de Transferência!' : 'Copiar E-mail Formatado'}</span>
                </button>

                <a
                  href={`mailto:${selectedContract.contactEmail}?subject=${encodeURIComponent(
                    provisioningProposal.subject
                  )}&body=${encodeURIComponent(provisioningProposal.body)}`}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-slate-950 font-bold flex items-center gap-2 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Abrir no Cliente de E-mail</span>
                </a>
              </div>

              <button
                onClick={() => setIsProposalModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-auto"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 2: REGISTRO MANUAL DE CONTRATO                     */}
      {/* ======================================================== */}
      {isNewContractModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsNewContractModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-display">
                  Registrar Nova Contratação de Cliente
                </h3>
                <p className="text-xs text-slate-400">
                  Cadastrar contrato fechado por canal direto ou consultoria
                </p>
              </div>
              <button
                onClick={() => setIsNewContractModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualContract} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Razão Social / Empresa *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: Alfa Logística S/A"
                    value={newContractForm.companyName}
                    onChange={(e) => setNewContractForm({ ...newContractForm, companyName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">CNPJ da Empresa *</label>
                  <input
                    required
                    type="text"
                    placeholder="00.000.000/0001-00"
                    value={newContractForm.cnpj}
                    onChange={(e) => setNewContractForm({ ...newContractForm, cnpj: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nome do Titular *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: Marcos Silva"
                    value={newContractForm.contactName}
                    onChange={(e) => setNewContractForm({ ...newContractForm, contactName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cargo *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: Diretor de Operações"
                    value={newContractForm.contactRole}
                    onChange={(e) => setNewContractForm({ ...newContractForm, contactRole: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">E-mail Corporativo *</label>
                  <input
                    required
                    type="email"
                    placeholder="marcos@alfalog.com.br"
                    value={newContractForm.contactEmail}
                    onChange={(e) => setNewContractForm({ ...newContractForm, contactEmail: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp / Telefone *</label>
                  <input
                    required
                    type="tel"
                    placeholder="(11) 98765-4321"
                    value={newContractForm.contactPhone}
                    onChange={(e) => setNewContractForm({ ...newContractForm, contactPhone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Módulo Contratado</label>
                  <select
                    value={newContractForm.moduleId}
                    onChange={(e) => {
                      const mod = e.target.value as ModuleId;
                      const modData = CHAMELEON_MODULES.find((m) => m.id === mod);
                      setNewContractForm({
                        ...newContractForm,
                        moduleId: mod,
                        moduleName: modData ? modData.name : 'Módulo Chameleon'
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="erp">Chameleon ERP Suite</option>
                    <option value="crm">Chameleon CRM Vendas</option>
                    <option value="portal">Portal Web & B2B</option>
                    <option value="bi">Chameleon BI Analytics</option>
                    <option value="sdk">Chameleon SDK Core</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Plano</label>
                  <select
                    value={newContractForm.plan}
                    onChange={(e) => setNewContractForm({ ...newContractForm, plan: e.target.value as ClientContract['plan'] })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Starter">Starter</option>
                    <option value="Professional">Professional</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Valor Mensal (R$)</label>
                  <input
                    required
                    type="number"
                    value={newContractForm.monthlyValue}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setNewContractForm({
                        ...newContractForm,
                        monthlyValue: val,
                        annualValue: val * 12
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-emerald-400 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewContractModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md shadow-emerald-500/20"
                >
                  Salvar Contrato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 3: DETALHES DE SOLICITAÇÃO DE DEMO                 */}
      {/* ======================================================== */}
      {selectedDemo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedDemo(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  {selectedDemo.id}
                </span>
                <h3 className="text-lg font-bold text-white font-display mt-1">{selectedDemo.company}</h3>
              </div>
              <button onClick={() => setSelectedDemo(null)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
                <span>Status: <strong>{selectedDemo.status}</strong></span>
                <select
                  value={selectedDemo.status}
                  onChange={(e) => handleChangeStatus(selectedDemo.id, e.target.value as DemoRequest['status'])}
                  className="bg-slate-900 border border-slate-700 px-3 py-1 text-emerald-400 rounded-lg"
                >
                  <option value="Novo">Novo</option>
                  <option value="Em Análise">Em Análise</option>
                  <option value="Demonstração Agendada">Demonstração Agendada</option>
                  <option value="Em Homologação">Em Homologação</option>
                  <option value="Concluído">Concluído</option>
                  <option value="Arquivado">Arquivado</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block">Contato:</span>
                  <p className="text-white font-bold">{selectedDemo.name}</p>
                  <p className="text-slate-400">{selectedDemo.email}</p>
                  <p className="text-slate-400">{selectedDemo.phone}</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block">Segmento & Equipe:</span>
                  <p className="text-white font-bold">{selectedDemo.segment}</p>
                  <p className="text-emerald-400 font-mono">{selectedDemo.teamSize}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-slate-500 block mb-1">Notas do Cliente / ERP Atual:</span>
                <p className="text-slate-200">{selectedDemo.notes || 'Nenhum detalhe adicional.'}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-slate-500 block">Anotações Internas:</span>
                <textarea
                  rows={2}
                  value={editingNotes}
                  onChange={(e) => setEditingNotes(e.target.value)}
                  className="w-full p-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
                <button
                  onClick={() => handleSaveInternalNotes(selectedDemo.id)}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded text-[11px] font-bold"
                >
                  Salvar
                </button>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleOpenWhatsAppChat({
                    id: selectedDemo.id,
                    name: selectedDemo.name,
                    company: selectedDemo.company,
                    phone: selectedDemo.phone,
                    email: selectedDemo.email,
                    status: selectedDemo.status,
                    role: 'Lead Corporativo'
                  })}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 transition-colors cursor-pointer text-xs shadow-md shadow-emerald-600/20"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Falar pelo WhatsApp com o Lead</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: REGISTRO MANUAL DE DEMO                         */}
      {/* ======================================================== */}
      {isNewDemoModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsNewDemoModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Registrar Nova Solicitação de Demonstração</h3>
              <button onClick={() => setIsNewDemoModalOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateManualDemo} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nome *</label>
                <input
                  required
                  type="text"
                  value={newDemoForm.name}
                  onChange={(e) => setNewDemoForm({ ...newDemoForm, name: e.target.value })}
                  className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Empresa *</label>
                <input
                  required
                  type="text"
                  value={newDemoForm.company}
                  onChange={(e) => setNewDemoForm({ ...newDemoForm, company: e.target.value })}
                  className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewDemoModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-slate-800 text-slate-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-emerald-500 text-slate-950 font-bold"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
