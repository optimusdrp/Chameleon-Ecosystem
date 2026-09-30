'use client';

export type AuditActionType = 
  | 'Visualização de Ficha' 
  | 'Alteração de Status' 
  | 'Exportação de Relatório' 
  | 'Geração de Proposta' 
  | 'Abertura de Chat WhatsApp' 
  | 'Acesso ao Painel de Setup' 
  | 'Atualização de Notas' 
  | 'Exclusão de Contrato' 
  | 'Criação de Contrato';

export interface ContractAuditLog {
  id: string;
  contractId: string;
  companyName: string;
  timestamp: string; // "30/09/2026, 06:14:22"
  timestampEpoch: number;
  operatorName: string;
  operatorEmail: string;
  operatorRole: string;
  action: AuditActionType;
  ipAddress: string;
  location: string;
  userAgent: string;
  details: string;
  severity: 'info' | 'warning' | 'success';
}

const AUDIT_STORAGE_KEY = 'chameleon_contract_audit_logs_db';

export const INITIAL_AUDIT_LOGS: ContractAuditLog[] = [
  {
    id: 'LOG-2026-9041',
    contractId: 'CTR-2026-7812',
    companyName: 'Logística TransBrasil Sul Ltda',
    timestamp: '30/09/2026, 06:18:40',
    timestampEpoch: 1790759920000,
    operatorName: 'Eng. Carlos Mendonça',
    operatorEmail: 'carlos.mendonca@chameleon.systems',
    operatorRole: 'Staff / Platform Architecture',
    action: 'Visualização de Ficha',
    ipAddress: '189.40.122.84',
    location: 'Curitiba, PR - Brasil (VPC Dedicada)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    details: 'Acesso completo à ficha cadastral e verificação de métricas de telemetria do cluster ERP TOTVS Protheus.',
    severity: 'info'
  },
  {
    id: 'LOG-2026-9040',
    contractId: 'CTR-2026-7811',
    companyName: 'NovaEra FinTech Soluções de Crédito',
    timestamp: '30/09/2026, 05:42:15',
    timestampEpoch: 1790757735000,
    operatorName: 'Eng. Juliana Rios',
    operatorEmail: 'juliana.rios@chameleon.systems',
    operatorRole: 'Staff / Tech Lead Suporte',
    action: 'Abertura de Chat WhatsApp',
    ipAddress: '177.136.241.10',
    location: 'São Paulo, SP - Brasil',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    details: 'Início de sessão de atendimento via canal WhatsApp Business com a titular Beatriz Vasconcelos referente a renovação (< 30 dias).',
    severity: 'info'
  },
  {
    id: 'LOG-2026-9039',
    contractId: 'CTR-2026-7810',
    companyName: 'Distribuidora Aliança de Alimentos',
    timestamp: '29/09/2026, 17:30:02',
    timestampEpoch: 1790713802000,
    operatorName: 'Henrique Faria',
    operatorEmail: 'henrique.faria@chameleon.systems',
    operatorRole: 'Staff / Implantação e Provisionamento',
    action: 'Geração de Proposta',
    ipAddress: '201.86.19.144',
    location: 'Campinas, SP - Brasil',
    userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    details: 'Emissão de proposta de provisionamento e minuta de e-mail institucional com link seguro de handshake e token de API.',
    severity: 'success'
  },
  {
    id: 'LOG-2026-9038',
    contractId: 'CTR-2026-7811',
    companyName: 'NovaEra FinTech Soluções de Crédito',
    timestamp: '29/09/2026, 16:20:45',
    timestampEpoch: 1790709645000,
    operatorName: 'Beatriz Vasconcelos / Suporte',
    operatorEmail: 'beatriz.v@novaerafin.com.br',
    operatorRole: 'Cliente Titular / Gestor Autorizado',
    action: 'Alteração de Status',
    ipAddress: '187.54.12.90',
    location: 'São Paulo, SP - Brasil',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15',
    details: 'Transição de status executada com sucesso: de "Ativo / Em Implantação" para "Homologado" após testes ponta a ponta do conector Salesforce.',
    severity: 'success'
  },
  {
    id: 'LOG-2026-9037',
    contractId: 'CTR-2026-7809',
    companyName: 'OmniVarejo Brasil E-Commerce S/A',
    timestamp: '29/09/2026, 14:10:19',
    timestampEpoch: 1790701819000,
    operatorName: 'Eng. Carlos Mendonça',
    operatorEmail: 'carlos.mendonca@chameleon.systems',
    operatorRole: 'Staff / Platform Architecture',
    action: 'Atualização de Notas',
    ipAddress: '189.40.122.84',
    location: 'Curitiba, PR - Brasil (VPC Dedicada)',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    details: 'Anotações internas atualizadas: "Minuta com SLA de 99.95% homologada pelo jurídico corporativo. Aguardando assinatura digital".',
    severity: 'info'
  },
  {
    id: 'LOG-2026-9036',
    contractId: 'CTR-2026-7812',
    companyName: 'Logística TransBrasil Sul Ltda',
    timestamp: '29/09/2026, 11:05:40',
    timestampEpoch: 1790690740000,
    operatorName: 'Eng. Juliana Rios',
    operatorEmail: 'juliana.rios@chameleon.systems',
    operatorRole: 'Staff / Tech Lead Suporte',
    action: 'Exportação de Relatório',
    ipAddress: '177.136.241.10',
    location: 'São Paulo, SP - Brasil',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    details: 'Download e extração completa da planilha CSV de contratos corporativos incluindo colunas de vigência e faturamento anual.',
    severity: 'warning'
  },
  {
    id: 'LOG-2026-9035',
    contractId: 'CTR-2026-7810',
    companyName: 'Distribuidora Aliança de Alimentos',
    timestamp: '28/09/2026, 18:45:11',
    timestampEpoch: 1790631911000,
    operatorName: 'Sistema Automático / Gateway',
    operatorEmail: 'gateway-audit@chameleon.systems',
    operatorRole: 'Daemon / Sistema Central',
    action: 'Acesso ao Painel de Setup',
    ipAddress: '200.180.91.45',
    location: 'Campinas, SP - Brasil',
    userAgent: 'Chameleon-Observer-Agent/1.0 (Headless; Linux)',
    details: 'Validação de handshake sintético via token temporário e verificação de ping do conector SAP S/4HANA Cloud (11.8 ms).',
    severity: 'info'
  }
];

export function getAuditLogs(): ContractAuditLog[] {
  if (typeof window === 'undefined') return INITIAL_AUDIT_LOGS;
  try {
    const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(INITIAL_AUDIT_LOGS));
      return INITIAL_AUDIT_LOGS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_AUDIT_LOGS;
  } catch {
    return INITIAL_AUDIT_LOGS;
  }
}

/**
 * Returns a plausible client IP address based on environment or session.
 */
function getClientIp(): string {
  if (typeof window === 'undefined') return '189.40.122.84';
  const cached = sessionStorage.getItem('chameleon_session_ip');
  if (cached) return cached;
  
  // Deterministic realistic internal IP for demo fidelity
  const ips = ['189.40.122.84', '177.136.241.10', '201.86.19.144', '187.54.12.90'];
  const chosen = ips[Math.floor(Math.random() * ips.length)];
  sessionStorage.setItem('chameleon_session_ip', chosen);
  return chosen;
}

/**
 * Records an access or operation performed on a specific contract
 */
export function recordContractAuditLog(data: {
  contractId: string;
  companyName: string;
  action: AuditActionType;
  details: string;
  operatorName?: string;
  operatorEmail?: string;
  operatorRole?: string;
  severity?: 'info' | 'warning' | 'success';
}): ContractAuditLog {
  const currentLogs = getAuditLogs();
  const now = new Date();
  const timestamp = now.toLocaleString('pt-BR');
  const timestampEpoch = now.getTime();
  const newId = `LOG-2026-${String(Math.floor(9000 + Math.random() * 999))}`;

  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : 'Mozilla/5.0 (Chameleon Staff Client)';
  const ipAddress = getClientIp();

  const newLog: ContractAuditLog = {
    id: newId,
    contractId: data.contractId,
    companyName: data.companyName,
    timestamp,
    timestampEpoch,
    operatorName: data.operatorName || 'Equipe Chameleon Staff',
    operatorEmail: data.operatorEmail || 'staff@chameleon.systems',
    operatorRole: data.operatorRole || 'Staff / Operações Globais',
    action: data.action,
    ipAddress,
    location: ipAddress.startsWith('189') 
      ? 'Curitiba, PR - Brasil (VPC Dedicada)'
      : ipAddress.startsWith('177') 
      ? 'São Paulo, SP - Brasil' 
      : 'Campinas, SP - Brasil',
    userAgent,
    details: data.details,
    severity: data.severity || (data.action === 'Exclusão de Contrato' ? 'warning' : data.action === 'Alteração de Status' ? 'success' : 'info')
  };

  const updated = [newLog, ...currentLogs];

  if (typeof window !== 'undefined') {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('chameleon-audit-logs-updated'));
  }

  return newLog;
}

export function clearAuditLogs(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(INITIAL_AUDIT_LOGS));
    window.dispatchEvent(new CustomEvent('chameleon-audit-logs-updated'));
  }
}

export function exportAuditLogsCSV(logs: ContractAuditLog[]): void {
  const headers = [
    'ID do Log',
    'Timestamp',
    'ID Contrato',
    'Razao Social / Empresa',
    'Operador Responsavel',
    'E-mail Operador',
    'Cargo / Permissao',
    'Acao Executada',
    'Endereco IP',
    'Localizacao Estimada',
    'Dispositivo / User Agent',
    'Detalhes Tecnicos e Auditoria'
  ];

  const rows = logs.map((log) => [
    log.id,
    log.timestamp,
    log.contractId,
    `"${log.companyName.replace(/"/g, '""')}"`,
    `"${log.operatorName.replace(/"/g, '""')}"`,
    log.operatorEmail,
    `"${log.operatorRole.replace(/"/g, '""')}"`,
    `"${log.action.replace(/"/g, '""')}"`,
    log.ipAddress,
    `"${log.location.replace(/"/g, '""')}"`,
    `"${log.userAgent.replace(/"/g, '""')}"`,
    `"${log.details.replace(/"/g, '""')}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `auditoria_acessos_chameleon_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
