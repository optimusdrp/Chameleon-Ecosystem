'use client';

import { ModuleId } from '@/types/chameleon';

export interface DemoRequest {
  id: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  segment: string;
  teamSize: string;
  selectedModules: ModuleId[];
  notes?: string;
  createdAt: string;
  status: 'Novo' | 'Em Análise' | 'Demonstração Agendada' | 'Em Homologação' | 'Concluído' | 'Arquivado';
  internalNotes?: string;
}

const STORAGE_KEY = 'chameleon_demo_requests_db';

export const INITIAL_DEMO_REQUESTS: DemoRequest[] = [
  {
    id: 'DEMO-2026-0042',
    name: 'Carlos Henrique Viana',
    email: 'carlos.viana@cargassul.com.br',
    company: 'Logística & Cargas Sul S/A',
    phone: '(41) 99182-3401',
    segment: 'Logística & Armazém',
    teamSize: '101 a 500 colaboradores',
    selectedModules: ['erp', 'bi'],
    notes: 'Utilizamos TOTVS Protheus 12.1.33 e precisamos reduzir o tempo de faturamento fiscal de motoristas em pátio.',
    createdAt: '29/09/2026, 11:24:18',
    status: 'Novo',
    internalNotes: 'Prioridade alta: 180 licenças estimadas no armazém central de Curitiba.'
  },
  {
    id: 'DEMO-2026-0041',
    name: 'Dra. Fernanda Albuquerque',
    email: 'fernanda@nexusfintech.io',
    company: 'Nexus FinTech Serviços de Crédito',
    phone: '(11) 98721-9988',
    segment: 'Fintech & Serviços B2B',
    teamSize: '21 a 100 colaboradores',
    selectedModules: ['crm', 'erp', 'bi'],
    notes: 'Nosso CRM atual é Salesforce Enterprise. Queremos acelerar o fechamento de propostas de crédito consignado via WhatsApp.',
    createdAt: '29/09/2026, 09:40:05',
    status: 'Demonstração Agendada',
    internalNotes: 'Demonstração técnica agendada com o CTO para quinta-feira às 15:00.'
  },
  {
    id: 'DEMO-2026-0040',
    name: 'Rodrigo M. Peixoto',
    email: 'rodrigo.peixoto@varejoglobal.com.br',
    company: 'Varejo Global Brasil E-Commerce',
    phone: '(21) 97103-4455',
    segment: 'Varejo & E-commerce',
    teamSize: '500+ corporativo',
    selectedModules: ['portal', 'erp'],
    notes: 'Sistema próprio em Next.js com backend legado SAP. Os compradores B2B reclamam de excesso de campos para emitir faturas recorrentes.',
    createdAt: '28/09/2026, 17:15:32',
    status: 'Em Análise',
    internalNotes: 'Analisando viabilidade de injeção do Chameleon SDK via Script tag.'
  },
  {
    id: 'DEMO-2026-0039',
    name: 'Mariana Esteves',
    email: 'm.esteves@alvoradametal.ind.br',
    company: 'Indústria Metalúrgica Alvorada',
    phone: '(19) 98452-1120',
    segment: 'Indústria & Manufatura',
    teamSize: '21 a 100 colaboradores',
    selectedModules: ['erp', 'sdk'],
    notes: 'Utilizamos ERP Sankhya. Queremos adaptar as ordens de produção para os operadores de chão de fábrica com luvas de proteção.',
    createdAt: '28/09/2026, 14:02:11',
    status: 'Em Homologação',
    internalNotes: 'Perfil High Contrast + Densidade Espaçosa recomendado para os tablets da fábrica.'
  },
  {
    id: 'DEMO-2026-0038',
    name: 'Bruno Fagundes Lima',
    email: 'b.fagundes@clinicamedlife.com.br',
    company: 'Rede Hospitalar MedLife Saúde',
    phone: '(31) 99632-8812',
    segment: 'Saúde & Hospitais',
    teamSize: '101 a 500 colaboradores',
    selectedModules: ['erp', 'crm', 'bi'],
    notes: 'Prontuário eletrônico com TOTVS MV. Médicos perdem muito tempo procurando guias de exames.',
    createdAt: '27/09/2026, 16:48:50',
    status: 'Novo',
    internalNotes: 'Necessário assinar termo BAA/LGPD Saúde antes do piloto de telemetria.'
  }
];

export function getDemoRequests(): DemoRequest[] {
  if (typeof window === 'undefined') return INITIAL_DEMO_REQUESTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REQUESTS));
      return INITIAL_DEMO_REQUESTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_DEMO_REQUESTS;
  } catch {
    return INITIAL_DEMO_REQUESTS;
  }
}

export function saveDemoRequest(request: Omit<DemoRequest, 'id' | 'createdAt' | 'status'>): DemoRequest {
  const current = getDemoRequests();
  const newRequest: DemoRequest = {
    ...request,
    id: `DEMO-2026-${String(Math.floor(1000 + Math.random() * 9000))}`,
    createdAt: new Date().toLocaleString('pt-BR'),
    status: 'Novo',
    internalNotes: 'Solicitação recente recebida via formulário web oficial.'
  };

  const updated = [newRequest, ...current];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('chameleon-demo-requests-updated'));
  }
  return newRequest;
}

export function updateDemoRequestStatus(
  id: string,
  newStatus: DemoRequest['status'],
  internalNotes?: string
): DemoRequest[] {
  const current = getDemoRequests();
  const updated = current.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status: newStatus,
        internalNotes: internalNotes !== undefined ? internalNotes : item.internalNotes
      };
    }
    return item;
  });

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('chameleon-demo-requests-updated'));
  }
  return updated;
}

export function deleteDemoRequest(id: string): DemoRequest[] {
  const current = getDemoRequests();
  const updated = current.filter((item) => item.id !== id);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('chameleon-demo-requests-updated'));
  }
  return updated;
}
