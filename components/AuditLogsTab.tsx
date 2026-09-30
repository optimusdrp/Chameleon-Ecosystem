'use client';

import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Download, 
  Filter, 
  Globe, 
  Clock, 
  User, 
  Laptop, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  RefreshCw, 
  X, 
  Copy, 
  Check, 
  MessageSquare, 
  Edit3, 
  Trash2, 
  ExternalLink,
  Cpu
} from 'lucide-react';
import { ContractAuditLog, AuditActionType, exportAuditLogsCSV } from '@/lib/auditLogs';

interface AuditLogsTabProps {
  logs: ContractAuditLog[];
  onOpenContract?: (contractId: string) => void;
}

export function AuditLogsTab({ logs, onOpenContract }: AuditLogsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [contractFilter, setContractFilter] = useState<string>('all');
  const [selectedLog, setSelectedLog] = useState<ContractAuditLog | null>(null);
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const [copiedJson, setCopiedJson] = useState(false);

  // Extract unique contracts for dropdown
  const uniqueContracts = useMemo(() => {
    const map = new Map<string, string>();
    logs.forEach((log) => {
      if (!map.has(log.contractId)) {
        map.set(log.contractId, log.companyName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [logs]);

  // Filtering
  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !q ||
        log.contractId.toLowerCase().includes(q) ||
        log.companyName.toLowerCase().includes(q) ||
        log.operatorName.toLowerCase().includes(q) ||
        log.operatorEmail.toLowerCase().includes(q) ||
        log.ipAddress.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q);

      const matchesAction = actionFilter === 'all' || log.action === actionFilter;
      const matchesContract = contractFilter === 'all' || log.contractId === contractFilter;

      return matchesSearch && matchesAction && matchesContract;
    });
  }, [logs, searchQuery, actionFilter, contractFilter]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = logs.length;
    const maxEpoch = logs.length > 0 ? Math.max(...logs.map((l) => l.timestampEpoch || 0)) : 0;
    const oneDayMs = 24 * 60 * 60 * 1000;
    const last24h = logs.filter((l) => (maxEpoch - l.timestampEpoch) <= oneDayMs).length;
    const uniqueOperators = new Set(logs.map((l) => l.operatorEmail)).size;
    const uniqueIps = new Set(logs.map((l) => l.ipAddress)).size;
    const modifications = logs.filter((l) => 
      l.action === 'Alteração de Status' || 
      l.action === 'Atualização de Notas' || 
      l.action === 'Exclusão de Contrato' ||
      l.action === 'Exportação de Relatório'
    ).length;

    return { total, last24h, uniqueOperators, uniqueIps, modifications };
  }, [logs]);

  const handleCopyIp = (ip: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(ip);
    setCopiedIp(ip);
    setTimeout(() => setCopiedIp(null), 2000);
  };

  const handleCopyJson = () => {
    if (!selectedLog) return;
    navigator.clipboard.writeText(JSON.stringify(selectedLog, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const getActionBadge = (action: AuditActionType) => {
    switch (action) {
      case 'Visualização de Ficha':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
            <Eye className="w-3 h-3 text-sky-400" />
            {action}
          </span>
        );
      case 'Alteração de Status':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            {action}
          </span>
        );
      case 'Exportação de Relatório':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Download className="w-3 h-3 text-amber-400" />
            {action}
          </span>
        );
      case 'Geração de Proposta':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <FileText className="w-3 h-3 text-purple-400" />
            {action}
          </span>
        );
      case 'Abertura de Chat WhatsApp':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            <MessageSquare className="w-3 h-3 text-teal-400" />
            {action}
          </span>
        );
      case 'Acesso ao Painel de Setup':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            <Cpu className="w-3 h-3 text-cyan-400" />
            {action}
          </span>
        );
      case 'Atualização de Notas':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            <Edit3 className="w-3 h-3 text-blue-400" />
            {action}
          </span>
        );
      case 'Exclusão de Contrato':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <Trash2 className="w-3 h-3 text-rose-400" />
            {action}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
            {action}
          </span>
        );
    }
  };

  const parseBrowserDevice = (ua: string) => {
    let browser = 'Navegador Web';
    if (ua.includes('Chrome')) browser = 'Chrome';
    else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
    else if (ua.includes('Firefox')) browser = 'Firefox';
    else if (ua.includes('Edge')) browser = 'Edge';

    let os = 'Desktop';
    if (ua.includes('Mac OS')) os = 'macOS';
    else if (ua.includes('Windows')) os = 'Windows';
    else if (ua.includes('Linux')) os = 'Linux';
    else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
    else if (ua.includes('Android')) os = 'Android';

    return `${browser} · ${os}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header and Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-3xl border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white font-display">
              Auditoria de Acessos & Rastreabilidade Contratual
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
              LGPD Art. 37
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Registro imutável de quem visualizou ou alterou os dados de cada contrato, incluindo endereço IP, geolocalização aproximada, carimbo de data/hora e detalhes forenses para conformidade integral.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => exportAuditLogsCSV(filteredLogs)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-all flex items-center gap-2 border border-slate-700 cursor-pointer shadow-sm hover:shadow"
            title="Exportar todos os registros de auditoria em CSV"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Exportar Logs CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono block">Total de Eventos</span>
          <p className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
            {stats.total}
          </p>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Logs registrados na base</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono block">Acessos em 24h</span>
          <p className="text-xl sm:text-2xl font-bold text-emerald-400 font-display mt-1">
            {stats.last24h}
          </p>
          <span className="text-[10px] text-emerald-400/80 font-mono mt-1 block flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-400" />
            Atividade recente contínua
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono block">Operadores Distintos</span>
          <p className="text-xl sm:text-2xl font-bold text-cyan-400 font-display mt-1">
            {stats.uniqueOperators}
          </p>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Staff & clientes autorizados</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono block">IPs de Origem</span>
          <p className="text-xl sm:text-2xl font-bold text-purple-400 font-display mt-1">
            {stats.uniqueIps}
          </p>
          <span className="text-[10px] text-slate-500 font-mono mt-1 block">Endereços IP rastreados</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-[11px] text-slate-400 font-mono block">Ações Críticas</span>
          <p className="text-xl sm:text-2xl font-bold text-amber-400 font-display mt-1">
            {stats.modifications}
          </p>
          <span className="text-[10px] text-amber-400/80 font-mono mt-1 block flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-amber-400" />
            Status, notas & exports
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex-1 min-w-[240px] relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por ID de contrato, empresa, operador, ação ou IP..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Action Filter */}
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-emerald-400 cursor-pointer"
          >
            <option value="all">Todas as Ações</option>
            <option value="Visualização de Ficha">Visualização de Ficha</option>
            <option value="Alteração de Status">Alteração de Status</option>
            <option value="Exportação de Relatório">Exportação de Relatório</option>
            <option value="Geração de Proposta">Geração de Proposta</option>
            <option value="Abertura de Chat WhatsApp">Abertura de Chat WhatsApp</option>
            <option value="Acesso ao Painel de Setup">Acesso ao Painel de Setup</option>
            <option value="Atualização de Notas">Atualização de Notas</option>
            <option value="Exclusão de Contrato">Exclusão de Contrato</option>
          </select>

          {/* Contract Filter */}
          <select
            value={contractFilter}
            onChange={(e) => setContractFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-emerald-400 cursor-pointer max-w-[200px] truncate"
          >
            <option value="all">Todos os Contratos</option>
            {uniqueContracts.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.name}
              </option>
            ))}
          </select>

          {(searchQuery || actionFilter !== 'all' || contractFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActionFilter('all');
                setContractFilter('all');
              }}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Limpar Filtros</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Audit Log Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/70">
                <th className="p-3.5">Data & Hora / ID Log</th>
                <th className="p-3.5">Contrato & Empresa</th>
                <th className="p-3.5">Operador / Permissão</th>
                <th className="p-3.5">Ação Realizada</th>
                <th className="p-3.5">Endereço IP & Origem</th>
                <th className="p-3.5">Dispositivo</th>
                <th className="p-3.5">Detalhes da Ação</th>
                <th className="p-3.5 text-right">Inspecionar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500 font-sans">
                    Nenhum registro de auditoria encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    onClick={() => setSelectedLog(log)}
                    className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                  >
                    {/* Timestamp & Log ID */}
                    <td className="p-3.5 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-white font-medium">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{log.timestamp}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono block mt-0.5">
                        {log.id}
                      </span>
                    </td>

                    {/* Contract & Company */}
                    <td className="p-3.5 font-sans max-w-[200px]">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-emerald-400 font-bold text-[11px]">
                          {log.contractId}
                        </span>
                        {onOpenContract && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenContract(log.contractId);
                            }}
                            title="Ver detalhes do contrato"
                            className="text-slate-500 hover:text-white p-0.5"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <span className="text-slate-300 font-medium block truncate text-xs mt-0.5" title={log.companyName}>
                        {log.companyName}
                      </span>
                    </td>

                    {/* Operator */}
                    <td className="p-3.5 font-sans max-w-[180px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] flex items-center justify-center font-bold shrink-0">
                          {log.operatorName.charAt(0)}
                        </div>
                        <span className="text-white text-xs font-semibold truncate" title={log.operatorName}>
                          {log.operatorName}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block mt-0.5 truncate" title={log.operatorRole}>
                        {log.operatorRole}
                      </span>
                    </td>

                    {/* Action Badge */}
                    <td className="p-3.5 whitespace-nowrap">
                      {getActionBadge(log.action)}
                    </td>

                    {/* IP & Location */}
                    <td className="p-3.5 font-mono whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="text-slate-200 font-bold">{log.ipAddress}</span>
                        <button
                          onClick={(e) => handleCopyIp(log.ipAddress, e)}
                          title="Copiar endereço IP"
                          className="text-slate-500 hover:text-white p-0.5 transition-colors"
                        >
                          {copiedIp === log.ipAddress ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5 font-sans truncate max-w-[170px]" title={log.location}>
                        {log.location}
                      </span>
                    </td>

                    {/* Device / User Agent */}
                    <td className="p-3.5 font-sans whitespace-nowrap text-slate-400">
                      <div className="flex items-center gap-1.5 text-xs text-slate-300">
                        <Laptop className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{parseBrowserDevice(log.userAgent)}</span>
                      </div>
                    </td>

                    {/* Details */}
                    <td className="p-3.5 font-sans max-w-[280px]">
                      <p className="text-slate-300 text-xs truncate" title={log.details}>
                        {log.details}
                      </p>
                    </td>

                    {/* Inspect button */}
                    <td className="p-3.5 text-right font-sans whitespace-nowrap">
                      <button
                        onClick={() => setSelectedLog(log)}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-emerald-400 group-hover:border-slate-700 transition-colors cursor-pointer text-xs"
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Deep Forensic Inspection */}
      {selectedLog && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedLog(null)}
        >
          <div 
            className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white font-display">
                      Registro Forense de Auditoria
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-mono">
                      {selectedLog.id}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Carimbo de tempo e telemetria capturada conforme preceitos da LGPD
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLog(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              {/* Target Contract */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-500 block">Contrato Auditado</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm font-bold text-emerald-400 font-mono">{selectedLog.contractId}</span>
                    <span className="text-white font-semibold">{selectedLog.companyName}</span>
                  </div>
                </div>
                {onOpenContract && (
                  <button
                    onClick={() => {
                      const id = selectedLog.contractId;
                      setSelectedLog(null);
                      onOpenContract(id);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Ficha do Contrato</span>
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                )}
              </div>

              {/* Action and Timing Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Ação Executada:</span>
                  <div className="mt-1">{getActionBadge(selectedLog.action)}</div>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Data & Hora Exata:</span>
                  <div className="flex items-center gap-1.5 mt-1 text-white font-mono font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedLog.timestamp}</span>
                  </div>
                  <span className="text-[9px] text-slate-500 font-mono block mt-0.5">
                    Epoch: {selectedLog.timestampEpoch}
                  </span>
                </div>
              </div>

              {/* Operator details */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-mono">
                  Identificação do Operador
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Nome:</span>
                    <strong className="text-white text-xs">{selectedLog.operatorName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">E-mail Corporativo:</span>
                    <span className="text-slate-300 font-mono text-xs">{selectedLog.operatorEmail}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px]">Função / Permissão:</span>
                    <span className="text-cyan-400 text-xs font-semibold">{selectedLog.operatorRole}</span>
                  </div>
                </div>
              </div>

              {/* Network and Device Security */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-mono">
                  Origem da Conexão & Telemetria de Rede
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Endereço IP:</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-white font-mono font-bold text-xs">{selectedLog.ipAddress}</span>
                      <button
                        onClick={(e) => handleCopyIp(selectedLog.ipAddress, e)}
                        className="text-slate-500 hover:text-white p-0.5"
                      >
                        {copiedIp === selectedLog.ipAddress ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-500 block text-[10px]">Geolocalização / Provedor:</span>
                    <span className="text-slate-300 text-xs block mt-0.5">{selectedLog.location}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-slate-500 block text-[10px] mb-1">User-Agent Completo:</span>
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-300 break-all">
                    {selectedLog.userAgent}
                  </div>
                </div>
              </div>

              {/* Action Description */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-400 block text-[10px] uppercase tracking-wider font-mono">
                  Descrição Circunstanciada do Acesso
                </span>
                <p className="text-slate-200 text-xs leading-relaxed font-sans">
                  {selectedLog.details}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={handleCopyJson}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
              >
                {copiedJson ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>JSON Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Registro JSON</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setSelectedLog(null)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
