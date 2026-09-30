'use client';

import { ModuleId } from '@/types/chameleon';

export interface StatusHistoryEntry {
  id: string;
  fromStatus?: ClientContract['status'];
  toStatus: ClientContract['status'];
  timestamp: string;
  author?: string;
  note?: string;
}

export interface ClientContract {
  id: string;
  createdAt: string;
  expiresAt?: string; // Data de Vencimento / Renovação (DD/MM/AAAA)
  // Company info
  companyName: string;
  cnpj: string;
  cityState?: string;
  // Contact info
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactRole: string;
  // Selected Modules & Plan (Supports multiple modules)
  selectedModules: ModuleId[];
  moduleNames: string[];
  // Legacy single module compatibility
  moduleId?: ModuleId;
  moduleName?: string;
  teamTier: string;
  plan?: 'Starter' | 'Professional' | 'Enterprise';
  teamSize: number;
  billingCycle: 'mensal' | 'anual';
  monthlyValue: number;
  annualValue: number;
  discountApplied?: string;
  // Technical Deployment Setup
  deploymentEnvironment: 'Cloud Dedicada Chameleon' | 'On-Premise / VPC Própria' | 'Nuvem Híbrida';
  legacyIntegration: string;
  paymentMethod: 'Boleto Bancário (30 dias)' | 'PIX Corporativo' | 'Cartão de Crédito Empresarial';
  // Status & SLA
  status: 'Aguardando Provisionamento' | 'Ativo / Em Implantação' | 'Homologado' | 'Pendente Assinatura Digital' | 'Cancelado';
  slaLevel: string;
  internalNotes?: string;
  statusHistory?: StatusHistoryEntry[];
}

const CONTRACTS_STORAGE_KEY = 'chameleon_client_contracts_db';

export const INITIAL_CLIENT_CONTRACTS: ClientContract[] = [
  {
    id: 'CTR-2026-7812',
    createdAt: '29/09/2026, 10:15:22',
    expiresAt: '29/09/2027',
    companyName: 'Logística TransBrasil Sul Ltda',
    cnpj: '18.492.381/0001-44',
    cityState: 'Curitiba / PR',
    contactName: 'Eduardo Guimarães',
    contactEmail: 'eduardo.guimaraes@transbrasilsul.com.br',
    contactPhone: '(41) 98841-9021',
    contactRole: 'Diretor de Tecnologia & Operações',
    selectedModules: ['erp', 'bi'],
    moduleNames: ['Chameleon ERP Suite', 'Chameleon BI Analytics'],
    moduleId: 'erp',
    moduleName: 'Chameleon ERP Suite + BI',
    teamTier: '101 a 500 colaboradores',
    teamSize: 150,
    billingCycle: 'anual',
    monthlyValue: 279,
    annualValue: 3348,
    discountApplied: '10% Multi-Módulos + 20% Anual',
    deploymentEnvironment: 'Cloud Dedicada Chameleon',
    legacyIntegration: 'TOTVS Protheus 12.1',
    paymentMethod: 'Boleto Bancário (30 dias)',
    status: 'Ativo / Em Implantação',
    slaLevel: '99.9% Uptime Garantido',
    internalNotes: 'Cluster dedicado provisionado. Observer fiscal e dashboards C-Level ativos.',
    statusHistory: [
      {
        id: 'hist-7812-1',
        toStatus: 'Aguardando Provisionamento',
        timestamp: '29/09/2026, 10:15:22',
        author: 'Sistema Automático / Checkout Online',
        note: 'Contrato corporativo assinado e recebido via plataforma.'
      },
      {
        id: 'hist-7812-2',
        fromStatus: 'Aguardando Provisionamento',
        toStatus: 'Ativo / Em Implantação',
        timestamp: '29/09/2026, 14:30:10',
        author: 'Eng. Carlos Mendonça (Platform Staff)',
        note: 'Cluster dedicado provisionado com conector TOTVS Protheus 12.1 e dashboards C-Level ativos.'
      }
    ]
  },
  {
    id: 'CTR-2026-7811',
    createdAt: '28/09/2026, 16:42:08',
    expiresAt: '18/10/2026', // Vencimento próximo: 18 dias restantes (< 30 dias!)
    companyName: 'NovaEra FinTech Soluções de Crédito',
    cnpj: '34.819.002/0001-90',
    cityState: 'São Paulo / SP',
    contactName: 'Beatriz Vasconcelos',
    contactEmail: 'beatriz.v@novaerafin.com.br',
    contactPhone: '(11) 99120-7733',
    contactRole: 'Head de Operações Comerciais',
    selectedModules: ['crm', 'erp'],
    moduleNames: ['Chameleon CRM Vendas', 'Chameleon ERP Suite'],
    moduleId: 'crm',
    moduleName: 'Chameleon CRM Vendas + ERP',
    teamTier: '21 a 100 colaboradores',
    teamSize: 45,
    billingCycle: 'mensal',
    monthlyValue: 223,
    annualValue: 2676,
    discountApplied: '10% Pacote 2 Módulos',
    deploymentEnvironment: 'Cloud Dedicada Chameleon',
    legacyIntegration: 'Salesforce Enterprise',
    paymentMethod: 'PIX Corporativo',
    status: 'Homologado',
    slaLevel: '99.9% Uptime',
    internalNotes: 'Integração WhatsApp 1-Click aprovada pela equipe de vendas.',
    statusHistory: [
      {
        id: 'hist-7811-1',
        toStatus: 'Aguardando Provisionamento',
        timestamp: '28/09/2026, 16:42:08',
        author: 'Sistema de Contratação Chameleon',
        note: 'Contrato gerado com sucesso via portal comercial.'
      },
      {
        id: 'hist-7811-2',
        fromStatus: 'Aguardando Provisionamento',
        toStatus: 'Ativo / Em Implantação',
        timestamp: '29/09/2026, 09:15:30',
        author: 'Eng. Juliana Rios (Arquitetura)',
        note: 'Ambiente cloud provisionado e webhook conectado com Salesforce Enterprise.'
      },
      {
        id: 'hist-7811-3',
        fromStatus: 'Ativo / Em Implantação',
        toStatus: 'Homologado',
        timestamp: '29/09/2026, 16:20:45',
        author: 'Beatriz Vasconcelos / Suporte Técnico',
        note: 'Testes de ponta a ponta finalizados. Integração WhatsApp 1-Click e CRM liberados para o time comercial.'
      }
    ]
  },
  {
    id: 'CTR-2026-7810',
    createdAt: '27/09/2026, 14:18:45',
    expiresAt: '15/10/2026', // Vencimento próximo: 15 dias restantes (< 30 dias!)
    companyName: 'Distribuidora Aliança de Alimentos',
    cnpj: '07.219.554/0001-12',
    cityState: 'Campinas / SP',
    contactName: 'Marcos Aurelio Ramos',
    contactEmail: 'm.ramos@aliancaalimentos.ind.br',
    contactPhone: '(19) 98702-4411',
    contactRole: 'CFO / Diretor Financeiro',
    selectedModules: ['bi'],
    moduleNames: ['Chameleon BI Analytics'],
    moduleId: 'bi',
    moduleName: 'Chameleon BI Analytics',
    teamTier: 'Até 20 colaboradores',
    teamSize: 18,
    billingCycle: 'anual',
    monthlyValue: 63,
    annualValue: 756,
    discountApplied: '20% Faturamento Anual',
    deploymentEnvironment: 'Nuvem Híbrida',
    legacyIntegration: 'SAP S/4HANA Cloud',
    paymentMethod: 'Boleto Bancário (30 dias)',
    status: 'Aguardando Provisionamento',
    slaLevel: '99.9% Uptime',
    internalNotes: 'Aguardando liberação de token de API pelo time de TI do cliente.',
    statusHistory: [
      {
        id: 'hist-7810-1',
        toStatus: 'Aguardando Provisionamento',
        timestamp: '27/09/2026, 14:18:45',
        author: 'Sistema Automático / Checkout Online',
        note: 'Contratação Chameleon BI iniciada. Aguardando credenciais de API SAP S/4HANA.'
      }
    ]
  },
  {
    id: 'CTR-2026-7809',
    createdAt: '26/09/2026, 11:05:19',
    expiresAt: '26/09/2027',
    companyName: 'OmniVarejo Brasil E-Commerce S/A',
    cnpj: '22.301.884/0001-78',
    cityState: 'Belo Horizonte / MG',
    contactName: 'Larissa Fontes',
    contactEmail: 'larissa.fontes@omnivarejo.com.br',
    contactPhone: '(31) 99450-3322',
    contactRole: 'Gerente Geral de E-Commerce B2B',
    selectedModules: ['portal', 'erp', 'crm', 'bi'],
    moduleNames: ['Portal Web & B2B', 'Chameleon ERP Suite', 'Chameleon CRM Vendas', 'Chameleon BI Analytics'],
    moduleId: 'portal',
    moduleName: 'Pacote 4 Módulos (Omni Suite)',
    teamTier: '101 a 500 colaboradores',
    teamSize: 280,
    billingCycle: 'anual',
    monthlyValue: 468,
    annualValue: 5616,
    discountApplied: '20% Multi-Módulos + 20% Anual',
    deploymentEnvironment: 'On-Premise / VPC Própria',
    legacyIntegration: 'Next.js & Magento 2',
    paymentMethod: 'Boleto Bancário (30 dias)',
    status: 'Pendente Assinatura Digital',
    slaLevel: '99.95% Enterprise 24/7',
    internalNotes: 'Minuta de contrato enviada para o departamento jurídico.',
    statusHistory: [
      {
        id: 'hist-7809-1',
        toStatus: 'Aguardando Provisionamento',
        timestamp: '26/09/2026, 11:05:19',
        author: 'Consultoria de Vendas Chameleon',
        note: 'Escopo corporativo customizado de 4 módulos fechado com sucesso.'
      },
      {
        id: 'hist-7809-2',
        fromStatus: 'Aguardando Provisionamento',
        toStatus: 'Pendente Assinatura Digital',
        timestamp: '26/09/2026, 17:00:40',
        author: 'Dpto. Jurídico & Compliance Chameleon',
        note: 'Minuta de contrato com cláusula de SLA 99.95% enviada via DocuSign para diretoria executiva.'
      }
    ]
  }
];

export interface ContractExpirationInfo {
  expiresAt: string;
  daysRemaining: number;
  isExpiringSoon: boolean;
  isExpired: boolean;
  isExpiringToday: boolean;
}

export function getContractExpirationInfo(contract: ClientContract): ContractExpirationInfo {
  let expiresAt = contract.expiresAt;
  
  if (!expiresAt) {
    if (contract.id === 'CTR-2026-7811') {
      expiresAt = '18/10/2026';
    } else if (contract.id === 'CTR-2026-7810') {
      expiresAt = '15/10/2026';
    } else {
      const parts = (contract.createdAt || '').split(',')[0].split('/');
      if (parts.length === 3) {
        const day = Number(parts[0]);
        const month = Number(parts[1]) - 1;
        const year = Number(parts[2]);
        const expDate = new Date(year, month, day);
        if (contract.billingCycle === 'mensal') {
          expDate.setDate(expDate.getDate() + 30);
        } else {
          expDate.setFullYear(expDate.getFullYear() + 1);
        }
        expiresAt = `${expDate.getDate().toString().padStart(2, '0')}/${(expDate.getMonth() + 1).toString().padStart(2, '0')}/${expDate.getFullYear()}`;
      } else {
        expiresAt = '30/10/2026';
      }
    }
  }

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let targetDate: Date;
  const expParts = expiresAt.split('/');
  if (expParts.length === 3) {
    targetDate = new Date(Number(expParts[2]), Number(expParts[1]) - 1, Number(expParts[0]));
  } else {
    targetDate = new Date(expiresAt);
  }

  const diffTime = targetDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isExpiringSoon = daysRemaining <= 30 && daysRemaining >= 0;
  const isExpired = daysRemaining < 0;
  const isExpiringToday = daysRemaining === 0;

  return {
    expiresAt,
    daysRemaining,
    isExpiringSoon,
    isExpired,
    isExpiringToday
  };
}

export function ensureContractHistory(contract: ClientContract): StatusHistoryEntry[] {
  if (contract.statusHistory && Array.isArray(contract.statusHistory) && contract.statusHistory.length > 0) {
    return contract.statusHistory;
  }

  const defaultHistory: StatusHistoryEntry[] = [
    {
      id: `hist-init-${contract.id}`,
      toStatus: 'Aguardando Provisionamento',
      timestamp: contract.createdAt,
      author: 'Sistema Automático / Checkout',
      note: 'Contrato corporativo registrado na base Chameleon.'
    }
  ];

  if (contract.status !== 'Aguardando Provisionamento') {
    defaultHistory.push({
      id: `hist-cur-${contract.id}`,
      fromStatus: 'Aguardando Provisionamento',
      toStatus: contract.status,
      timestamp: contract.createdAt,
      author: 'Equipe de Implantação Chameleon',
      note: contract.internalNotes || `Transição de status para ${contract.status}.`
    });
  }

  return defaultHistory;
}

export function getClientContracts(): ClientContract[] {
  if (typeof window === 'undefined') return INITIAL_CLIENT_CONTRACTS;
  try {
    const raw = localStorage.getItem(CONTRACTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CONTRACTS_STORAGE_KEY, JSON.stringify(INITIAL_CLIENT_CONTRACTS));
      return INITIAL_CLIENT_CONTRACTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Ensure all contracts in storage have statusHistory and expiresAt
      let needsSave = false;
      const verified = parsed.map((c: ClientContract) => {
        let changed = false;
        let item = { ...c };

        if (!item.statusHistory || item.statusHistory.length === 0) {
          item.statusHistory = ensureContractHistory(item);
          changed = true;
        }

        if (!item.expiresAt) {
          item.expiresAt = getContractExpirationInfo(item).expiresAt;
          changed = true;
        }

        if (changed) {
          needsSave = true;
        }
        return item;
      });

      if (needsSave) {
        localStorage.setItem(CONTRACTS_STORAGE_KEY, JSON.stringify(verified));
      }
      return verified;
    }
    return INITIAL_CLIENT_CONTRACTS;
  } catch {
    return INITIAL_CLIENT_CONTRACTS;
  }
}

export function saveClientContract(
  contractData: Omit<ClientContract, 'id' | 'createdAt' | 'status' | 'slaLevel' | 'statusHistory'>
): ClientContract {
  const current = getClientContracts();
  const timestamp = new Date().toLocaleString('pt-BR');
  const newId = `CTR-2026-${String(Math.floor(7000 + Math.random() * 2999))}`;

  // Calculate default expiration date if not provided
  let calculatedExpiresAt = contractData.expiresAt;
  if (!calculatedExpiresAt) {
    const now = new Date();
    const expDate = new Date(now);
    if (contractData.billingCycle === 'mensal') {
      expDate.setDate(expDate.getDate() + 30);
    } else {
      expDate.setFullYear(expDate.getFullYear() + 1);
    }
    calculatedExpiresAt = `${expDate.getDate().toString().padStart(2, '0')}/${(expDate.getMonth() + 1).toString().padStart(2, '0')}/${expDate.getFullYear()}`;
  }

  const newContract: ClientContract = {
    ...contractData,
    id: newId,
    createdAt: timestamp,
    expiresAt: calculatedExpiresAt,
    status: 'Aguardando Provisionamento',
    slaLevel: (contractData.selectedModules && contractData.selectedModules.length >= 3) || contractData.teamSize > 200
      ? '99.95% Enterprise 24/7' 
      : '99.9% Uptime',
    internalNotes: 'Contratação multi-módulo recebida via checkout da landing page. Provisionamento automático inicializado.',
    statusHistory: [
      {
        id: `hist-${Date.now()}-init`,
        toStatus: 'Aguardando Provisionamento',
        timestamp: timestamp,
        author: 'Checkout da Plataforma / Sistema Automático',
        note: 'Contrato registrado e provisionamento automático disparado.'
      }
    ]
  };

  const updated = [newContract, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(CONTRACTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('chameleon-contracts-updated'));
  }
  return newContract;
}

export function updateClientContractStatus(
  id: string,
  newStatus: ClientContract['status'],
  internalNotes?: string,
  author?: string
): ClientContract[] {
  const current = getClientContracts();
  const now = new Date().toLocaleString('pt-BR');

  const updated = current.map((c) => {
    if (c.id === id) {
      const prevHistory = ensureContractHistory(c);
      const statusChanged = c.status !== newStatus;
      let newHistory = prevHistory;

      if (statusChanged) {
        newHistory = [
          ...prevHistory,
          {
            id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            fromStatus: c.status,
            toStatus: newStatus,
            timestamp: now,
            author: author || 'Equipe Chameleon Staff',
            note: internalNotes || `Transição de status executada: de ${c.status} para ${newStatus}.`
          }
        ];
      } else if (internalNotes && internalNotes !== c.internalNotes) {
        const lastEntry = prevHistory[prevHistory.length - 1];
        if (lastEntry) {
          lastEntry.note = internalNotes;
        }
      }

      return {
        ...c,
        status: newStatus,
        internalNotes: internalNotes !== undefined ? internalNotes : c.internalNotes,
        statusHistory: newHistory
      };
    }
    return c;
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem(CONTRACTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('chameleon-contracts-updated'));
  }
  return updated;
}

export function deleteClientContract(id: string): ClientContract[] {
  const current = getClientContracts();
  const updated = current.filter((c) => c.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(CONTRACTS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('chameleon-contracts-updated'));
  }
  return updated;
}

export function generateProvisioningProposalEmail(contract: ClientContract, staffName?: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://chameleon.systems';
  const setupUrl = `${origin}/setup?contract=${contract.id}&token=${btoa(contract.cnpj || contract.id).substring(0, 16)}`;
  
  const modulesText = contract.moduleNames && contract.moduleNames.length > 0
    ? contract.moduleNames.join(', ')
    : (contract.moduleName || 'Chameleon ERP Suite');

  const billingText = contract.billingCycle === 'anual'
    ? `R$ ${contract.annualValue.toLocaleString('pt-BR')}/ano (faturamento anual consolidado)`
    : `R$ ${contract.monthlyValue.toLocaleString('pt-BR')}/mês`;

  const expInfo = getContractExpirationInfo(contract);

  const subject = `Proposta de Provisionamento & Setup Técnico - ${contract.id} - ${contract.companyName}`;

  const body = `Prezado(a) ${contract.contactName},

É uma honra confirmar a aprovação da contratação e dar início ao provisionamento dos módulos do ecossistema Chameleon Systems para a ${contract.companyName}.

Segue abaixo o resumo consolidado da sua contratação e as diretrizes para liberação dos acessos ao painel de setup:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DADOS DA CONTRATAÇÃO & ESPECIFICAÇÕES TÉCNICAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Identificador do Contrato: ${contract.id}
• Razão Social: ${contract.companyName}
• CNPJ: ${contract.cnpj}
• Titular Responsável: ${contract.contactName} (${contract.contactRole})
• Módulos Contratados: ${modulesText}
• Plano / Capacidade: ${contract.plan || contract.teamTier} (${contract.teamSize} licenças de operadores corporativos)
• Ambiente de Hospedagem: ${contract.deploymentEnvironment}
• Conector de Integração Legada: ${contract.legacyIntegration}
• Ciclo de Faturamento: ${billingText}
• Data de Vencimento / Renovação: ${expInfo.expiresAt} (${expInfo.daysRemaining} dias restantes)
• Nível de SLA Garantido: ${contract.slaLevel}
• Política de Privacidade: Conformidade Integral LGPD · Telemetria Ergonômica Zero-PII

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LINK DE ACESSO AO PAINEL DE SETUP TÉCNICO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Para que a sua equipe de TI ou o gestor responsável possa homologar o script de micro-adaptação e ativar os conectores dos módulos, acesse o painel dedicado através do link seguro abaixo:

🔗 Painel de Setup Técnico:
${setupUrl}

Passos recomendados para início imediato:
1. Acesse o painel de setup utilizando o link acima.
2. Homologue o token de integração do seu ERP (${contract.legacyIntegration}) no ambiente de testes.
3. Valide a camada de apresentação ergonômica com sua equipe de operadores-chave.
4. Qualquer dúvida técnica pode ser respondida diretamente através deste canal ou pelo nosso time de engenharia de plataforma.

Estamos à disposição para garantir uma ativação suave, não invasiva e com ganho instantâneo de produtividade.

Atenciosamente,

${staffName || 'Equipe de Engenharia & Implantação'}
Chameleon Systems · Ecossistema de Interfaces Adaptativas
suporte@chameleon.systems | https://chameleon.systems`;

  return { subject, body, setupUrl };
}
