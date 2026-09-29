import { ChameleonModule, PersonaConfig } from '@/types/chameleon';

export const CHAMELEON_MODULES: ChameleonModule[] = [
  {
    id: 'portal',
    name: 'Chameleon Web & Portais',
    tagline: 'Experiência fluida para clientes e e-commerce',
    description: 'Transforma portais web, sites institucionais e lojas virtuais em interfaces camaleônicas que antecipam intenções de compra, reorganizam menus de busca e simplificam checkouts para cada perfil de usuário.',
    category: 'Canais Digitais & Web',
    recommendedFor: 'E-commerce B2B/B2C, Portais de Autoatendimento e Web Apps voltados ao cliente final',
    setupTime: '< 24 horas',
    badge: 'Plug & Play Web',
    accentColor: '#10b981', // emerald
    accentBg: 'bg-emerald-500/10 text-emerald-400',
    accentBorder: 'border-emerald-500/30',
    features: [
      'Vitrine com ordenação adaptativa por afinidade de navegação',
      'Menu de categorias auto-rearranjável conforme termos mais buscados',
      'Checkout dinâmico com campos prioritários pré-destacados',
      'Detecção de intenção de saída com ajuste de contraste e ofertas',
      'Compatibilidade total com React, Next.js, Shopify, VTEX e WordPress'
    ],
    metrics: [
      { label: 'Aumento na Conversão', value: '+28.4%' },
      { label: 'Queda em Abandono de Carrinho', value: '-35%' },
      { label: 'Tempo de Localização de Itens', value: '-52%' }
    ],
    priceEstimatePerUserMonth: 18
  },
  {
    id: 'erp',
    name: 'Chameleon ERP Suite',
    tagline: 'Elimine a lentidão em telas complexas de gestão',
    description: 'Encaixa-se sobre sistemas ERP legados ou modernos (SAP, TOTVS, Sankhya, Oracle ou próprios). Identifica os fluxos mais repetitivos de cada operador (faturamento, estoque, compras) e traz botões críticos para a visão principal instantaneamente.',
    category: 'Operações & Gestão Corporativa',
    recommendedFor: 'Indústrias, Distribuidores, Centros de Logística e Departamentos Financeiros com alto volume de dados',
    setupTime: '< 48 horas',
    badge: 'Enterprise Core',
    accentColor: '#0ea5e9', // sky
    accentBg: 'bg-sky-500/10 text-sky-400',
    accentBorder: 'border-sky-500/30',
    features: [
      'Grid de dados e inventário com densidade adaptável ao ritmo de trabalho',
      'Promoção automática de botões de aprovação e emissão de NFe mais clicados',
      'Modo de preenchimento rápido guiado com atalhos inteligentes de teclado',
      'Filtragem preditiva de notas fiscais, pedidos e centros de custo',
      'Zero modificação no backend do seu ERP legado'
    ],
    metrics: [
      { label: 'Velocidade de Digitação/Operação', value: '+44%' },
      { label: 'Redução de Erros Operacionais', value: '-61%' },
      { label: 'Tempo de Treinamento de Novos Funcionários', value: '-70%' }
    ],
    priceEstimatePerUserMonth: 35
  },
  {
    id: 'crm',
    name: 'Chameleon CRM Sales',
    tagline: 'O funil de vendas que se adapta ao vendedor campeão',
    description: 'Pipelines comerciais costumam ser cheios de campos desnecessários. O Chameleon CRM aprende quais etapas, canais (WhatsApp, E-mail, Ligação) e dados são decisivos para fechar cada negócio, simplificando a tela de cada closer.',
    category: 'Vendas & Relacionamento',
    recommendedFor: 'Equipes comerciais de Inside Sales, Vendas B2B Consultivas e Pré-vendas SDR',
    setupTime: '< 24 horas',
    badge: 'Alta Conversão',
    accentColor: '#8b5cf6', // violet
    accentBg: 'bg-violet-500/10 text-violet-400',
    accentBorder: 'border-violet-500/30',
    features: [
      'Kanban de oportunidades que reordena cards por probabilidade real de fechamento',
      'Gatilhos rápidos de contato direto (WhatsApp 1-click, template dinâmico)',
      'Campos de qualificação que se adaptam ao porte do cliente atendido',
      'Registro de reuniões e follow-ups em menos de 10 segundos',
      'Sincronização bidirecional com HubSpot, Pipedrive, Salesforce ou CRM interno'
    ],
    metrics: [
      { label: 'Tempo Gasto em Preenchimento', value: '-58%' },
      { label: 'Volume de Follow-ups no Prazo', value: '+73%' },
      { label: 'Aumento na Taxa de Ganho de Propostas', value: '+31%' }
    ],
    priceEstimatePerUserMonth: 27
  },
  {
    id: 'bi',
    name: 'Chameleon Analytics & BI',
    tagline: 'Dashboards que mostram o que importa para cada cargo',
    description: 'Substitui telas abarrotadas de gráficos genéricos por painéis inteligentes que se reorganizam de acordo com o nível hierárquico: KPIs sintéticos e alertas para a diretoria, detalhes operacionais profundos para analistas.',
    category: 'Inteligência de Dados',
    recommendedFor: 'Diretores executivos, Controladoria, Gerentes de Produto e Analistas de Negócio',
    setupTime: '< 36 horas',
    badge: 'Visão Estratégica',
    accentColor: '#f59e0b', // amber
    accentBg: 'bg-amber-500/10 text-amber-400',
    accentBorder: 'border-amber-500/30',
    features: [
      'Cards de KPIs executivos com priorização semântica automática',
      'Alterne com 1 clique entre visão resumida executiva e dados brutos tabulares',
      'Alertas de anomalia visualmente destacados quando metas desviam da média',
      'Exportação automatizada com filtros inteligentes salvos pelo comportamento',
      'Compatível com Power BI embed, Metabase, Tableau e dashboards personalizados'
    ],
    metrics: [
      { label: 'Tempo de Tomada de Decisão', value: '-65%' },
      { label: 'Engajamento com Relatórios Diários', value: '+85%' },
      { label: 'Adoção de Dados na Empresa', value: '3.4x maior' }
    ],
    priceEstimatePerUserMonth: 22
  },
  {
    id: 'sdk',
    name: 'Chameleon Core SDK Universal',
    tagline: 'A engine adaptativa em qualquer aplicação com 1 script',
    description: 'Pacote universal de integração em biblioteca leve (< 12KB) que injeta o motor de telemetria ergonômica e o subsistema de adaptação de estilos em qualquer software proprietário da sua empresa.',
    category: 'Infraestrutura & DevTools',
    recommendedFor: 'Times de Engenharia de Software, SaaS B2B proprietários e Fábricas de Software',
    setupTime: '< 15 minutos',
    badge: 'Universal SDK',
    accentColor: '#06b6d4', // cyan
    accentBg: 'bg-cyan-500/10 text-cyan-400',
    accentBorder: 'border-cyan-500/30',
    features: [
      'SDK agnóstico de framework: React, Vue, Angular, Svelte, Web Components ou Vanilla JS',
      'Algoritmo ergonômico 100% executado no client-side sem impacto de latência (< 5ms)',
      'Conformidade rígida LGPD/GDPR: nenhum dado comercial ou PII trafega na rede',
      'Painel de controle com telemetria agregada de usabilidade da sua frota de usuários',
      'Documentação técnica em TypeScript e hooks prontos para uso imediato'
    ],
    metrics: [
      { label: 'Tamanho da Biblioteca', value: '11.8 KB' },
      { label: 'Latência de Processamento', value: '< 4ms' },
      { label: 'Segurança de Dados', value: 'Zero-PII' }
    ],
    priceEstimatePerUserMonth: 12
  }
];

export const PERSONA_CONFIGS: Record<string, PersonaConfig> = {
  balanced: {
    id: 'balanced',
    name: 'Equilibrado / Padrão',
    label: 'Uso Diário Universal',
    description: 'Equilíbrio ideal entre espaço em tela, leitura confortável e atalhos essenciais para quem opera de forma multifuncional.',
    density: 'standard',
    primaryPalette: 'Emerald-Slate',
    shortcutsStyle: 'Barra lateral suave e cards informativos balanceados',
    layoutEmphasis: 'Visualização completa com espaçamento arejado',
    shortcutHighlights: ['Buscar Geral', 'Novo Registro', 'Relatórios', 'Filtros Recentes']
  },
  power_user: {
    id: 'power_user',
    name: 'Power User / Agilidade Extrema',
    label: 'Alta Densidade & Atalhos Rápidos',
    description: 'Projetado para operadores experientes: tipografia compacta, tabelas condensadas com mais linhas por polegada e atalhos rápidos acionáveis via tecla de atalho.',
    density: 'compact',
    primaryPalette: 'Cyber-Teal & Obsidian',
    shortcutsStyle: 'Barra de comando rápida centralizada com hotkeys [⌘K]',
    layoutEmphasis: 'Densidade máxima de dados, sem espaços ociosos',
    shortcutHighlights: ['Executar Lote [⌘B]', 'Emitir NFe [⌘E]', 'Exportar XLS [⌘X]', 'Comando Rápido [⌘K]']
  },
  minimalist: {
    id: 'minimalist',
    name: 'Foco & Concentração',
    label: 'Modo Minimalista / Zero Distrações',
    description: 'O Chameleon oculta barras laterais pesadas, recolhe métricas secundárias e mantém em destaque apenas o fluxo de trabalho corrente.',
    density: 'spacious',
    primaryPalette: 'Monochrome Warm Slate',
    shortcutsStyle: 'Ações primárias isoladas no centro de atenção',
    layoutEmphasis: 'Foco puro na tarefa em andamento, sem distrações periféricas',
    shortcutHighlights: ['Ação Prioritária', 'Histórico Imediato', 'Modo Foco Ativo']
  },
  high_contrast: {
    id: 'high_contrast',
    name: 'Turno Noturno & Alto Contraste',
    label: 'Ergonomia Visual Noturna',
    description: 'Adequação automática para ambientes com iluminação reduzida ou operadores de plantão: fundo escuro profundo, bordas nítidas e textos de alto contraste que evitam estresse ocular.',
    density: 'standard',
    primaryPalette: 'Pure Obsidian & High Lumen Amber/Cyan',
    shortcutsStyle: 'Contornos nítidos de alta legibilidade',
    layoutEmphasis: 'Contraste reforçado para evitar fadiga ocular após 6 horas contínuas',
    shortcutHighlights: ['Atalhos Noturnos', 'Modo de Leitura Focada', 'Alertas de Alta Prioridade']
  },
  executive: {
    id: 'executive',
    name: 'Visão Executiva / C-Level',
    label: 'Resumo Estratégico & KPIs Macro',
    description: 'Transforma listagens complexas em gráficos de síntese, indicadores de meta, alertas de desvio e botões de aprovação instantânea com 1 toque.',
    density: 'spacious',
    primaryPalette: 'Royal Navy & Golden Glow',
    shortcutsStyle: 'Botões expressivos de aprovação e relatórios executivos',
    layoutEmphasis: 'Semáforos de performance e métricas de alto impacto',
    shortcutHighlights: ['Aprovação em Lote', 'Balanço do Dia', 'Resumo Semanal', 'Alerta de Metas']
  }
};
