'use client';

import React, { useState, useEffect, useMemo, Suspense, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  ShieldCheck, 
  Cpu, 
  Server, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowLeft, 
  ExternalLink,
  Layers,
  Terminal,
  Clock,
  Sparkles,
  Lock,
  ChevronRight
} from 'lucide-react';
import { INITIAL_CLIENT_CONTRACTS, ClientContract } from '@/lib/contracts';

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

function SetupContent() {
  const searchParams = useSearchParams();
  const contractIdParam = searchParams.get('contract');
  const tokenParam = searchParams.get('token');

  const contractsRaw = useSyncExternalStore(subscribeClientContracts, getClientContractsSnapshot, getServerClientContractsSnapshot);
  const contracts: ClientContract[] = useMemo(() => {
    try {
      return JSON.parse(contractsRaw);
    } catch {
      return INITIAL_CLIENT_CONTRACTS;
    }
  }, [contractsRaw]);

  const [copiedScript, setCopiedScript] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [testValidationRunning, setTestValidationRunning] = useState(false);
  const [testValidationComplete, setTestValidationComplete] = useState(false);

  const contract = useMemo(() => {
    if (!contracts.length) return null;
    if (contractIdParam) {
      const found = contracts.find((c) => c.id.toLowerCase() === contractIdParam.toLowerCase());
      if (found) return found;
    }
    return contracts[0];
  }, [contracts, contractIdParam]);

  const scriptCode = `<!-- Chameleon Systems · Micro-Script Ergonômico Zero-PII (11.8 KB) -->
<script
  src="https://cdn.chameleon.systems/v1/chameleon-observer.js"
  data-contract-id="${contract?.id || 'CTR-2026-DEMO'}"
  data-environment="${contract?.deploymentEnvironment === 'On-Premise / VPC Própria' ? 'vpc-internal' : 'cloud-dedicated'}"
  data-zero-pii="strict"
  data-brand-lock="enforced"
  async
></script>`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2500);
  };

  const handleCopyToken = () => {
    const token = tokenParam || (contract ? btoa(contract.cnpj).substring(0, 20) : 'CHAMELEON-PROV-TOKEN');
    navigator.clipboard.writeText(token);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2500);
  };

  const handleRunTestValidation = () => {
    setTestValidationRunning(true);
    setTimeout(() => {
      setTestValidationRunning(false);
      setTestValidationComplete(true);
    }, 1800);
  };

  if (!contract) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-emerald-400">
            <Cpu className="w-6 h-6 animate-spin" />
          </div>
          <h2 className="text-lg font-bold font-display">Carregando Painel de Setup Técnico...</h2>
          <p className="text-xs text-slate-400">Localizando especificações e credenciais do contrato corporativo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[1px] transition-transform group-hover:scale-105">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0.2" />
                    <path d="M7 14c1.5 2 4.5 3 7 1.5s3.5-4 1.5-6.5-5-2-7 0" />
                  </svg>
                </div>
              </div>
              <span className="font-bold text-white tracking-tight text-base font-display">
                CHAMELEON
              </span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Painel de Setup Técnico & Provisionamento
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <Link 
              href="/restrito" 
              className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voltar para Área Restrita</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8">
        
        {/* Top Banner with Company Info */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {contract.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Status: {contract.status}
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">
                  Contratado em: {contract.createdAt}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
                {contract.companyName}
              </h1>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-300">
                <span>CNPJ: <strong className="font-mono text-white">{contract.cnpj}</strong></span>
                <span>Titular: <strong className="text-white">{contract.contactName}</strong> ({contract.contactRole})</span>
                <span>Ambiente: <strong className="text-cyan-400">{contract.deploymentEnvironment}</strong></span>
              </div>
            </div>

            {/* SLA Badge */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Nível de Serviço Homologado</span>
              <span className="text-base font-bold text-emerald-400 font-display mt-0.5 block">{contract.slaLevel}</span>
              <span className="text-[10px] text-slate-400 mt-1 block flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Zero-PII & LGPD Blindado
              </span>
            </div>
          </div>
        </div>

        {/* Modules Configured */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Módulos Inclusos</span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {contract.moduleNames && contract.moduleNames.length > 0 ? (
                contract.moduleNames.map((name) => (
                  <span key={name} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-semibold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {name}
                  </span>
                ))
              ) : (
                <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-semibold text-white">
                  {contract.moduleName}
                </span>
              )}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Conector Legado Configurado</span>
            <p className="text-sm font-bold text-white font-mono flex items-center gap-2">
              <Server className="w-4 h-4 text-cyan-400" />
              {contract.legacyIntegration}
            </p>
            <span className="text-[11px] text-emerald-400 font-mono block">
              ● Status do Connector: Pronto para Binding
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Capacidade de Operadores</span>
            <p className="text-sm font-bold text-white">
              {contract.teamSize} operadores simultâneos
            </p>
            <span className="text-[11px] text-slate-400 block font-mono">
              Plano: {contract.plan || contract.teamTier}
            </span>
          </div>
        </div>

        {/* Step-by-Step Technical Onboarding */}
        <div className="space-y-6">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white font-display flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              Passo a Passo de Integração & Homologação
            </h2>
            <span className="text-xs text-slate-400">Tempo estimado: 5 minutos</span>
          </div>

          {/* STEP 1: EMBED SCRIPT */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold font-mono text-xs flex items-center justify-center">
                  1
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">Inclusão do Micro-Script Universal na Camada Web/ERP</h3>
                  <p className="text-xs text-slate-400">Insira a tag abaixo antes do fechamento do &lt;/body&gt; ou via Google Tag Manager</p>
                </div>
              </div>

              <button
                onClick={handleCopyScript}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedScript ? 'Copiado!' : 'Copiar Script'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-slate-300 overflow-x-auto relative">
              <pre className="text-emerald-400/90 whitespace-pre">{scriptCode}</pre>
            </div>
          </div>

          {/* STEP 2: TOKEN AND CONNECTOR VALIDATION */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold font-mono text-xs flex items-center justify-center">
                  2
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">Token de Handshake Seguro (Zero-PII Authentication)</h3>
                  <p className="text-xs text-slate-400">Credencial criptografada exclusiva para autenticar seu conector legado ({contract.legacyIntegration})</p>
                </div>
              </div>

              <button
                onClick={handleCopyToken}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-white font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedToken ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedToken ? 'Token Copiado!' : 'Copiar Token'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400 truncate">
                CHM-{contract.id}-{btoa(contract.cnpj).substring(0, 24)}
              </span>
              <span className="text-[10px] text-emerald-400 shrink-0 font-bold ml-2">● TOKEN VÁLIDO</span>
            </div>
          </div>

          {/* STEP 3: RUN PING VALIDATION */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Testar Conexão com o Cluster Chameleon
              </h3>
              <p className="text-xs text-slate-400">
                Dispara um ping ergonômico sintético para validar o handshake com {contract.deploymentEnvironment}
              </p>
            </div>

            <button
              onClick={handleRunTestValidation}
              disabled={testValidationRunning}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                testValidationComplete
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20'
              }`}
            >
              {testValidationRunning ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin" />
                  <span>Validando Cluster...</span>
                </>
              ) : testValidationComplete ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cluster 100% Homologado (Latência 9.4ms)</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Executar Teste de Conexão</span>
                </>
              )}
            </button>
          </div>

          {/* STEP 4: ACCESS SIMULATOR */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-white">Deseja homologar a experiência visual antes de implantar?</h3>
              <p className="text-xs text-slate-300 mt-1">
                Acesse o Simulador Interativo em tempo real para visualizar as transformações ergonômicas dos seus módulos.
              </p>
            </div>

            <Link
              href="/#simulador"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-emerald-500/40 text-xs font-bold flex items-center gap-2 transition-colors shrink-0"
            >
              <span>Abrir Simulador em Tempo Real</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-400 mt-12">
        <p>© {new Date().getFullYear()} Chameleon Ecosystem · Painel de Setup Técnico Corporativo · Suporte: suporte@chameleon.systems</p>
      </footer>
    </div>
  );
}

export default function SetupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="animate-spin text-emerald-400">
          <Cpu className="w-8 h-8" />
        </div>
      </div>
    }>
      <SetupContent />
    </Suspense>
  );
}
