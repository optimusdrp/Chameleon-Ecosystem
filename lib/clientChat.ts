'use client';

export interface ChatMessage {
  id: string;
  sender: 'staff' | 'client' | 'system';
  senderName: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export interface ClientConversation {
  id: string;
  clientId: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  phone: string;
  email: string;
  status: string;
  moduleName?: string;
  unreadCount: number;
  lastMessageAt: string;
  messages: ChatMessage[];
}

const CHAT_STORAGE_KEY = 'chameleon_chat_conversations_db';

export const INITIAL_CONVERSATIONS: ClientConversation[] = [
  {
    id: 'chat-CTR-2026-7812',
    clientId: 'CTR-2026-7812',
    clientName: 'Eduardo Guimarães',
    clientRole: 'Diretor de Tecnologia & Operações',
    companyName: 'Logística TransBrasil Sul Ltda',
    phone: '(41) 98841-9021',
    email: 'eduardo.guimaraes@transbrasilsul.com.br',
    status: 'Ativo / Em Implantação',
    moduleName: 'Chameleon ERP Suite + BI',
    unreadCount: 0,
    lastMessageAt: 'Ontem, 15:10',
    messages: [
      {
        id: 'msg-7812-1',
        sender: 'staff',
        senderName: 'Engenharia Chameleon',
        text: 'Olá Eduardo! Sou da equipe de implantação do Chameleon Systems. Seu contrato CTR-2026-7812 para os módulos ERP Suite e BI Analytics foi registrado com sucesso.',
        timestamp: '29/09, 10:20',
        status: 'read'
      },
      {
        id: 'msg-7812-2',
        sender: 'client',
        senderName: 'Eduardo Guimarães',
        text: 'Olá equipe! Excelente. Nosso time de infraestrutura já liberou as portas para a conexão com o TOTVS Protheus 12.1.',
        timestamp: '29/09, 10:25',
        status: 'read'
      },
      {
        id: 'msg-7812-3',
        sender: 'staff',
        senderName: 'Engenharia Chameleon',
        text: 'Perfeito, Eduardo! O cluster dedicado já foi homologado e o conector TOTVS está respondendo com latência de 11.6ms. Segue o link do painel de setup para testes: /setup?contract=CTR-2026-7812',
        timestamp: '29/09, 14:35',
        status: 'read'
      },
      {
        id: 'msg-7812-4',
        sender: 'client',
        senderName: 'Eduardo Guimarães',
        text: 'Visualizamos os dashboards com os atalhos fiscais aqui, a equipe da logística aprovou a velocidade.',
        timestamp: '29/09, 15:10',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat-CTR-2026-7811',
    clientId: 'CTR-2026-7811',
    clientName: 'Beatriz Vasconcelos',
    clientRole: 'Head de Operações Comerciais',
    companyName: 'NovaEra FinTech Soluções de Crédito',
    phone: '(11) 99120-7733',
    email: 'beatriz.v@novaerafin.com.br',
    status: 'Homologado',
    moduleName: 'Chameleon CRM Vendas + ERP',
    unreadCount: 1,
    lastMessageAt: '29/09, 16:22',
    messages: [
      {
        id: 'msg-7811-1',
        sender: 'staff',
        senderName: 'Equipe Chameleon',
        text: 'Olá Beatriz! Seja bem-vinda ao Chameleon Systems. Contrato CTR-2026-7811 confirmado.',
        timestamp: '28/09, 16:45',
        status: 'read'
      },
      {
        id: 'msg-7811-2',
        sender: 'client',
        senderName: 'Beatriz Vasconcelos',
        text: 'Bom dia! Estamos alinhando a equipe de pré-vendas para validar a integração com o Salesforce Enterprise.',
        timestamp: '29/09, 09:20',
        status: 'read'
      },
      {
        id: 'msg-7811-3',
        sender: 'staff',
        senderName: 'Equipe Chameleon',
        text: 'Ambiente cloud provisionado e webhook conectado com Salesforce Enterprise.',
        timestamp: '29/09, 11:00',
        status: 'read'
      },
      {
        id: 'msg-7811-4',
        sender: 'client',
        senderName: 'Beatriz Vasconcelos',
        text: 'Homologação 100% concluída! As conversões com 1-Click WhatsApp estão funcionando perfeitamente.',
        timestamp: '29/09, 16:22',
        status: 'delivered'
      }
    ]
  },
  {
    id: 'chat-CTR-2026-7810',
    clientId: 'CTR-2026-7810',
    clientName: 'Marcos Aurelio Ramos',
    clientRole: 'CFO / Diretor Financeiro',
    companyName: 'Distribuidora Aliança de Alimentos',
    phone: '(19) 98702-4411',
    email: 'm.ramos@aliancaalimentos.ind.br',
    status: 'Aguardando Provisionamento',
    moduleName: 'Chameleon BI Analytics',
    unreadCount: 0,
    lastMessageAt: '27/09, 15:15',
    messages: [
      {
        id: 'msg-7810-1',
        sender: 'staff',
        senderName: 'Equipe Chameleon',
        text: 'Prezado Marcos Aurelio, recebemos sua contratação do Chameleon BI Analytics (CTR-2026-7810).',
        timestamp: '27/09, 14:25',
        status: 'read'
      },
      {
        id: 'msg-7810-2',
        sender: 'client',
        senderName: 'Marcos Aurelio Ramos',
        text: 'Olá, estamos aguardando a liberação do token da nossa instância SAP S/4HANA para compartilhar com vocês.',
        timestamp: '27/09, 15:02',
        status: 'read'
      },
      {
        id: 'msg-7810-3',
        sender: 'staff',
        senderName: 'Equipe Chameleon',
        text: 'Sem problemas! Assim que tiver as chaves, você pode inserir diretamente pelo link de setup ou nos enviar por aqui.',
        timestamp: '27/09, 15:15',
        status: 'read'
      }
    ]
  },
  {
    id: 'chat-CTR-2026-7809',
    clientId: 'CTR-2026-7809',
    clientName: 'Larissa Fontes',
    clientRole: 'Gerente Geral de E-Commerce B2B',
    companyName: 'OmniVarejo Brasil E-Commerce S/A',
    phone: '(31) 99450-3322',
    email: 'larissa.fontes@omnivarejo.com.br',
    status: 'Pendente Assinatura Digital',
    moduleName: 'Pacote 4 Módulos (Omni Suite)',
    unreadCount: 0,
    lastMessageAt: '26/09, 17:05',
    messages: [
      {
        id: 'msg-7809-1',
        sender: 'staff',
        senderName: 'Jurídico Chameleon',
        text: 'Olá Larissa! Minuta contratual do pacote Omni Suite de 4 módulos gerada com sucesso.',
        timestamp: '26/09, 11:20',
        status: 'read'
      },
      {
        id: 'msg-7809-2',
        sender: 'client',
        senderName: 'Larissa Fontes',
        text: 'Boa tarde! O jurídico já aprovou os termos de SLA de 99.95%, estamos apenas coletando a assinatura do diretor executivo.',
        timestamp: '26/09, 14:40',
        status: 'read'
      },
      {
        id: 'msg-7809-3',
        sender: 'staff',
        senderName: 'Jurídico Chameleon',
        text: 'Perfeito, ficamos no aguardo para dar o pontapé no provisionamento dos ambientes On-Premise!',
        timestamp: '26/09, 17:05',
        status: 'read'
      }
    ]
  }
];

export function getClientConversations(): ClientConversation[] {
  if (typeof window === 'undefined') return INITIAL_CONVERSATIONS;
  try {
    const raw = localStorage.getItem(CHAT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(INITIAL_CONVERSATIONS));
      return INITIAL_CONVERSATIONS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_CONVERSATIONS;
  } catch {
    return INITIAL_CONVERSATIONS;
  }
}

export function saveClientConversations(conversations: ClientConversation[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(conversations));
    window.dispatchEvent(new CustomEvent('chameleon-chat-updated'));
  } catch (e) {
    console.error('Error saving chat conversations', e);
  }
}

export function getOrCreateConversationForClient(client: {
  id: string;
  name: string;
  role?: string;
  company: string;
  phone: string;
  email?: string;
  status?: string;
  moduleName?: string;
}): ClientConversation {
  const current = getClientConversations();
  const existing = current.find(
    (c) => c.clientId === client.id || (client.phone && c.phone.replace(/\D/g, '') === client.phone.replace(/\D/g, ''))
  );

  if (existing) {
    return existing;
  }

  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const dateString = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}`;

  const newConversation: ClientConversation = {
    id: `chat-${client.id || Date.now()}`,
    clientId: client.id,
    clientName: client.name,
    clientRole: client.role || 'Titular do Contrato',
    companyName: client.company,
    phone: client.phone,
    email: client.email || '',
    status: client.status || 'Ativo',
    moduleName: client.moduleName || 'Chameleon ERP Suite',
    unreadCount: 0,
    lastMessageAt: `${dateString}, ${timeString}`,
    messages: [
      {
        id: `msg-${Date.now()}-init`,
        sender: 'system',
        senderName: 'WhatsApp Business API Gateway',
        text: `Canal de atendimento WhatsApp iniciado para ${client.company} (${client.name}).`,
        timestamp: `${dateString}, ${timeString}`,
        status: 'read'
      },
      {
        id: `msg-${Date.now()}-welcome`,
        sender: 'staff',
        senderName: 'Equipe Chameleon',
        text: `Olá ${client.name}! Sou da equipe de engenharia do Chameleon Systems. Seu canal direto com nosso suporte técnico para a empresa ${client.company} está ativo. Como podemos apoiar sua implantação hoje?`,
        timestamp: `${dateString}, ${timeString}`,
        status: 'delivered'
      }
    ]
  };

  const updated = [newConversation, ...current];
  saveClientConversations(updated);
  return newConversation;
}

export function sendChatMessage(
  conversationId: string, 
  text: string, 
  sender: 'staff' | 'client' = 'staff',
  senderName: string = 'Equipe Chameleon'
): ClientConversation[] {
  const current = getClientConversations();
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  const dateString = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}`;
  const formattedTime = `${dateString}, ${timeString}`;

  const updated = current.map((conv) => {
    if (conv.id === conversationId) {
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        sender,
        senderName,
        text,
        timestamp: formattedTime,
        status: 'sent'
      };

      return {
        ...conv,
        lastMessageAt: formattedTime,
        messages: [...conv.messages, newMessage]
      };
    }
    return conv;
  });

  saveClientConversations(updated);

  // If message was sent by staff, simulate a client response after 1.5 seconds
  if (sender === 'staff') {
    setTimeout(() => {
      const convNow = getClientConversations().find((c) => c.id === conversationId);
      if (!convNow) return;

      let replyText = 'Mensagem recebida com sucesso! Nossa equipe técnica/operacional agradece o retorno e já está acompanhando o chamado.';
      const lower = text.toLowerCase();

      if (lower.includes('setup') || lower.includes('painel') || lower.includes('link')) {
        replyText = 'Obrigado pelo envio do link de setup! Nossa equipe de TI já está acessando a página para homologar o micro-script.';
      } else if (lower.includes('proposta') || lower.includes('contrato') || lower.includes('valor')) {
        replyText = 'Recebido! Já estamos revisando os detalhes da proposta e das licenças acordadas.';
      } else if (lower.includes('token') || lower.includes('api') || lower.includes('credencial')) {
        replyText = 'Registrado! Estamos inserindo as credenciais no conector seguro agora mesmo.';
      } else if (lower.includes('olá') || lower.includes('bom dia') || lower.includes('boa tarde')) {
        replyText = `Olá! Tudo bem por aqui na ${convNow.companyName}. Estamos acompanhando a implantação dos módulos.`;
      }

      const clientReply: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        sender: 'client',
        senderName: convNow.clientName,
        text: replyText,
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered'
      };

      const withReply = getClientConversations().map((c) => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessageAt: 'Agora',
            messages: [...c.messages, clientReply]
          };
        }
        return c;
      });

      saveClientConversations(withReply);
    }, 1500);
  }

  return updated;
}
