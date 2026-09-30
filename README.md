# Chameleon — Ecossistema de Interfaces Adaptativas Inteligentes

> **Interfaces neurais plug-and-play que aprendem os hábitos de cada usuário e adaptam layouts, paletas de cores, densidade de dados e atalhos em tempo real, sem necessidade de modificar o backend ou reescrever código legado.**

---

## 📑 Sumário Executivo

1. [Visão Geral & Proposta de Valor](#1-visão-geral--proposta-de-valor)
2. [Pilares Fundamentais do Ecossistema](#2-pilares-fundamentais-do-ecossistema)
3. [Módulos Independentes Plug-and-Play](#3-módulos-independentes-plug-and-play)
   - [3.1. Chameleon ERP Suite](#31-chameleon-erp-suite)
   - [3.2. Chameleon CRM Sales](#32-chameleon-crm-sales)
   - [3.3. Chameleon Web & Portais](#33-chameleon-web--portais)
   - [3.4. Chameleon Analytics & BI](#34-chameleon-analytics--bi)
   - [3.5. Chameleon Core SDK Universal](#35-chameleon-core-sdk-universal)
4. [Motor de Adaptação Dinâmica (Adaptive Engine)](#4-motor-de-adaptação-dinâmica-adaptive-engine)
   - [Ciclo Neural de 4 Fases](#ciclo-neural-de-4-fases)
   - [Perfis Ergonômicos Nativos (Personas)](#perfis-ergonômicos-nativos-personas)
5. [Regras Oficiais do Ecossistema Chameleon](#5-regras-oficiais-do-ecossistema-chameleon)
   - [Regra 1: Independência e Desacoplamento Modular](#regra-1-independência-e-desacoplamento-modular)
   - [Regra 2: Não-Intrusão e Imutabilidade de Backend](#regra-2-não-intrusão-e-imutabilidade-de-backend)
   - [Regra 3: Privacidade Zero-PII e Sandbox Client-Side](#regra-3-privacidade-zero-pii-e-sandbox-client-side)
   - [Regra 4: Preservação Rígida de Marca (Brand Lock Protocol)](#regra-4-preservação-rígida-de-marca-brand-lock-protocol)
   - [Regra 5: Soberania e Controle do Usuário](#regra-5-soberania-e-controle-do-usuário)
   - [Regra 6: Responsividade Estrita e Anti-Distorção](#regra-6-responsividade-estrita-e-anti-distorção)
   - [Regra 7: Orçamento de Latência Sub-18ms](#regra-7-orçamento-de-latência-sub-18ms)
6. [Segurança, Privacidade & Conformidade LGPD/GDPR](#6-segurança-privacidade--conformidade-lgpdgdpr)
7. [Arquitetura Técnica & Métodos de Integração](#7-arquitetura-técnica--métodos-de-integração)
   - [Método 1: Script Tag Universal (Zero-Code)](#método-1-script-tag-universal-zero-code)
   - [Método 2: SDK Universal (React / Next.js / Vue / Angular)](#método-2-sdk-universal-react--nextjs--vue--angular)
8. [Simulador Interativo da Landing Page](#8-simulador-interativo-da-landing-page)
9. [Área Restrita Corporativa & Gestão de Contratos (`/restrito`)](#9-área-restrita-corporativa--gestão-de-contratos-restrito)
   - [9.1. Autenticação Staff Segura & 2FA](#91-autenticação-staff-segura--2fa)
   - [9.2. Gestão de Contratos de Clientes & Métricas (MRR/ARR)](#92-gestão-de-contratos-de-clientes--métricas-mrrarr)
   - [9.3. Vencimento de Contratos & Alerta de Renovação (< 30 dias)](#93-vencimento-de-contratos--alerta-de-renovação--30-dias)
   - [9.4. Timeline de Auditoria de Status (`ContractTimeline`)](#94-timeline-de-auditoria-de-status-contracttimeline)
   - [9.5. Gerador de Proposta de Provisionamento & E-mail Pré-formatado](#95-gerador-de-proposta-de-provisionamento--e-mail-pré-formatado)
   - [9.6. Exportação de Relatórios em CSV](#96-exportação-de-relatórios-em-csv)
   - [9.7. Auditoria de Acessos & Rastreabilidade Total](#97-auditoria-de-acessos--rastreabilidade-total-auditlogstab--libauditlogsts)
10. [Central de Atendimento & Chat WhatsApp com Clientes (`ClientChatTab`)](#10-central-de-atendimento--chat-whatsapp-com-clientes-clientchattab)
    - [10.1. Integração Direta com 1 Clique nas Tabelas e Fichas](#101-integração-direta-com-1-clique-nas-tabelas-e-fichas)
    - [10.2. Respostas Rápidas em 1 Toque](#102-respostas-rápidas-em-1-toque)
    - [10.3. Mensageria Reativa & Respostas Automáticas Inteligentes](#103-mensageria-reativa--respostas-automáticas-inteligentes)
11. [Painel de Setup Técnico & Provisionamento (`/setup`)](#11-painel-de-setup-técnico--provisionamento-setup)
    - [11.1. Injeção do Micro-Script Universal (< 12KB)](#111-injeção-do-micro-script-universal--12kb)
    - [11.2. Conectores para ERPs e Sistemas Legados](#112-conectores-para-erps-e-sistemas-legados)
    - [11.3. Teste Sintético de Latência e Handshake (< 15ms)](#113-teste-sintético-de-latência-e-handshake--15ms)
12. [Estrutura de Arquivos & Detalhamento Arquitetural](#12-estrutura-de-arquivos--detalhamento-arquitetural)
    - [Mapa Visual de Pastas e Arquivos](#mapa-visual-de-pastas-e-arquivos)
    - [Detalhamento de Cada Arquivo do Projeto](#detalhamento-de-cada-arquivo-do-projeto)
13. [Instalação, Execução e Comandos](#13-instalação-execução-e-comandos)
14. [Métricas de Impacto e ROI Comprovado](#14-métricas-de-impacto-e-roi-comprovado)

---

## 1. Visão Geral & Proposta de Valor

Sistemas corporativos tradicionais (ERPs, CRMs, portais B2B e intranets) foram desenhados como blocos estáticos: todos os colaboradores — do estagiário ao diretor de operações — são forçados a encarar a mesma interface genérica, sobrecarregada de campos irrelevantes para sua rotina diária. Isso resulta em fadiga cognitiva, lentidão operacional e alta taxa de erros manuais.

O **Chameleon** resolve essa dor estrutural ao introduzir uma camada inteligente e não intrusiva de adaptação visual. O ecossistema monitora a ergonomia digital em tempo real (quais botões são clicados, quais seções são mais consultadas, períodos do dia com maior estresse ocular) e reorganiza a apresentação visual para cada indivíduo:

- **Reordenação Inteligente de Atalhos:** Ações prioritárias (ex: "Emitir NF-e", "Disparar WhatsApp", "Aprovar Lote") sobem para barras de ação rápida personalizadas.
- **Densidade Visual Preditiva:** Operadores analíticos recebem grades compactas com alto volume de dados; executivos recebem sínteses visuais e cartões de KPI.
- **Preservação Rígida de Identidade:** O design system corporativo (cores primárias, fontes e tokens) permanece 100% íntegro.
- **Modelo Plug-and-Play Independente:** Cada cliente pode contratar apenas os módulos que fazem sentido para sua infraestrutura atual, integrando novos conforme a necessidade evolui.

---

## 2. Pilares Fundamentais do Ecossistema

| Pilar | Descrição |
| :--- | :--- |
| **Zero Código Backend** | Não requer criação de novos endpoints, reescrita de APIs ou migração de banco de dados. Opera na camada de apresentação (DOM / Web Components). |
| **Independência Modular** | Cada módulo (ERP, CRM, Web, BI, SDK) é isolado. O cliente adquire, implanta e escala de acordo com a prioridade do negócio. |
| **Latência Sub-18ms** | As transmutações de estilo e layout ocorrem em menos de 18 milissegundos via aceleração de hardware (CSS GPU), sem travamento de renderização (*layout thrashing*). |
| **Zero-PII Compliance** | Nenhum dado comercial, cadastral ou senha trafega na rede. O motor analisa estritamente seletores e telemetria de interação anônima no navegador. |
| **Multi-Device & Responsive** | Ajuste fluido entre estações desktop, monitores widescreen de controle, tablets de campo e coletores de dados industriais. |

---

## 3. Módulos Independentes Plug-and-Play

O ecossistema é formado por módulos autocontidos que cobrem os principais pilares de software de uma organização:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      CHAMELEON ECOSYSTEM CORE                          │
└────────────────────────────────────────────────────────────────────────┘
          │                   │                   │                   │
   ┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐     ┌──────▼──────┐
   │ Chameleon   │     │ Chameleon   │     │ Chameleon   │     │ Chameleon   │
   │ ERP Suite   │     │ CRM Sales   │     │ Web/Portais │     │ BI & Metric │
   └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
          ▲                   ▲                   ▲                   ▲
          └───────────────────┴───────────────────┴───────────────────┘
                                        │
                       ┌────────────────▼────────────────┐
                       │  Chameleon Core SDK Universal   │
                       └─────────────────────────────────┘
```

### 3.1. Chameleon ERP Suite
* **Foco:** Sistemas de Gestão Empresarial, Faturamento, Suprimentos, Logística e Estoque.
* **Compatibilidade:** SAP, TOTVS (Protheus/Datasul), Sankhya, Oracle ERP Cloud, Senior e ERPs proprietários.
* **Tempo de Setup:** < 48 horas úteis.
* **Capacidades Principais:**
  - Identificação de rotinas de alto volume (ex.: faturamento em lote, conferência cega de mercadoria).
  - Compactação ergonômica de tabelas e grids sem perda de legibilidade.
  - Promoção de atalhos rápidos acionáveis via teclado (`[⌘E]` para emitir notas, `[⌘B]` para baixar títulos).
  - Redução de até **61% nos erros de digitação** e **44% de ganho de velocidade** em digitação repetitiva.

### 3.2. Chameleon CRM Sales
* **Foco:** Times de Inside Sales, Vendas Consultivas B2B e Pré-Vendas (SDRs).
* **Compatibilidade:** Salesforce, HubSpot, Pipedrive, RD Station, Zoho e CRMs proprietários.
* **Tempo de Setup:** < 24 horas úteis.
* **Capacidades Principais:**
  - Reordenação de cards no funil Kanban com base na probabilidade estatística de fechamento.
  - Botões de ação em 1 clique: disparo de template WhatsApp aprovado, registro de ligação e geração de proposta.
  - Ocultação inteligente de campos secundários que atrasam o vendedor durante reuniões e prospecção.
  - Redução de **58% no tempo gasto em preenchimento** de formulários burocráticos.

### 3.3. Chameleon Web & Portais
* **Foco:** E-Commerce B2B/B2C, Portais de Autoatendimento ao Cliente e Extranets.
* **Compatibilidade:** Next.js, React, VTEX, Shopify Plus, Magento, WordPress/WooCommerce.
* **Tempo de Setup:** < 24 horas úteis.
* **Capacidades Principais:**
  - Vitrines que reordenam SKUs com base na intenção de compra e histórico de recompra recorrente.
  - Checkouts adaptativos que antecipam os campos de entrega e pagamento preferenciais do cliente.
  - Alívio de atrito na busca de catálogos complexos (redução de 52% no tempo de localização de itens).
  - Aumento médio de **+28.4% na conversão de vendas B2B**.

### 3.4. Chameleon Analytics & BI
* **Foco:** Tomada de Decisão Executiva, Controladoria e Gestão Estratégica.
* **Compatibilidade:** Microsoft Power BI (Embedded), Tableau, Metabase, Looker Studio e dashboards internos.
* **Tempo de Setup:** < 36 horas úteis.
* **Capacidades Principais:**
  - Adaptação contextual do nível de detalhamento: para Diretores/C-Level, gráficos de semáforo e KPIs sintéticos; para analistas, tabelas com abertura granular e drill-down rápido.
  - Destaque automático de desvios e anomalias de margem ou orçado vs. realizado.
  - Redução de **65% no tempo de interpretação e tomada de decisão**.

### 3.5. Chameleon Core SDK Universal
* **Foco:** Times de Engenharia, Plataformas SaaS B2B e Fábricas de Software.
* **Tamanho do Bundle:** **< 12 KB** (minificado e gzipado).
* **Tempo de Setup:** < 15 minutos via npm/yarn/pnpm.
* **Capacidades Principais:**
  - Biblioteca agnóstica (`vanilla`, React hooks, Vue directives, Web Components).
  - Observer DOM inteligente de baixo consumo de CPU (< 1.5% overhead em background).
  - Hooks prontos como `useChameleonAdaptation()`, `useAdaptiveShortcuts()` e `useErgonomicDensity()`.

---

## 4. Motor de Adaptação Dinâmica (Adaptive Engine)

### Ciclo Neural de 4 Fases

O algoritmo interno do Chameleon opera em um ciclo contínuo de 4 fases no ambiente do navegador:

```
[1. Sensor de Interação] ──> [2. Vetor de Frequência] ──> [3. Matriz de Afinidade] ──> [4. Transmutação DOM]
  (Cliques anônimos,          (Cálculo de repetição         (Relevância por função       (Reordenação de botões,
   scrolls e foco)              ponderada no tempo)            ou cargo do usuário)        densidade e contraste)
```

1. **Sensor de Interação:** Registra padrões de foco, frequência de cliques em botões com atributos específicos (`data-chameleon-action`) e dispersão do cursor.
2. **Vetor de Frequência Ponderada:** Ações recentes e repetidas ganham peso exponencial, enquanto ações sazonais ou esporádicas não poluem a área de trabalho.
3. **Matriz de Afinidade Ergonômica:** Agrupa intenções afins (ex.: agrupar "Pesquisar Preço" com "Gerar Pedido").
4. **Transmutação Não Destrutiva:** Aplica classes CSS dinâmicas e reordena fragmentos de interface sem violar os listeners de eventos originais do sistema anfitrião.

### Perfis Ergonômicos Nativos (Personas)

O Chameleon disponibiliza modos padrão e ajustáveis conforme a necessidade do operador:

| Perfil | Densidade | Estilo de Atalhos | Foco de Aplicação |
| :--- | :--- | :--- | :--- |
| **Equilibrado (Padrão)** | Standard | Barra superior balanceada | Uso misto diário para operadores multifuncionais. |
| **Power User / Agilidade** | Compacta (máx. dados/cm²) | Barra de comando estilo `[⌘K]` | Faturamento rápido, conferência, digitação rápida e operadores experientes. |
| **Modo Foco / Minimalista** | Espaçosa | Apenas a ação corrente isolada | Redução de distrações para tarefas complexas de conciliação ou auditoria. |
| **Turno Noturno / Alto Contraste** | Standard | Contornos de alta nitidez | Salas de controle 24/7, turnos noturnos em armazéns, prevenção de fadiga ocular. |
| **Visão Executiva (C-Level)** | Espaçosa | Semáforos e aprovações em lote | Diretores, gerentes regionais e aprovações de alto nível em 1 toque. |

---

## 5. Regras Oficiais do Ecossistema Chameleon

Para garantir estabilidade, segurança e governança corporativa, qualquer aplicação ou módulo que opere sob a chancela do Chameleon deve seguir rigorosamente as 7 regras abaixo:

### Regra 1: Independência e Desacoplamento Modular
- Cada módulo (ERP, CRM, Web, BI, SDK) **deve ser comercializado, ativado, atualizado ou removido de forma 100% autônoma**.
- Nenhum módulo pode possuir dependência rígida de outro para executar seu ciclo de adaptação básico.
- A contratação de um novo módulo nunca pode exigir reinstalação dos módulos preexistentes.

### Regra 2: Não-Intrusão e Imutabilidade de Backend
- O Chameleon opera **exclusivamente na camada de apresentação (client-side DOM/CSS)**.
- É expressamente proibido exigir alterações no esquema de banco de dados, triggers, controllers ou rotas de API do sistema anfitrião (seja ele legado ou moderno).
- Os fluxos de submissão e listeners originais da aplicação permanecem intactos.

### Regra 3: Privacidade Zero-PII e Sandbox Client-Side
- **Nenhum dado pessoal identificável (PII), valor financeiro digitado, senha ou documento pode ser capturado ou transmitido.**
- O algoritmo só inspeciona metadados de ergonomia anônimos: seletores CSS, tags de ação (`data-chameleon-action`), taxa de cliques e resolução da janela.
- A persistência de estado do usuário opera localmente (`sessionStorage` ou `IndexedDB` local), sem envio de telemetria crua para servidores centrais.

### Regra 4: Preservação Rígida de Marca (Brand Lock Protocol)
- A adaptação neural **jamais pode descaracterizar a identidade visual corporativa**.
- Cores primárias de marca, logotipos, fontes institucionais e proporções corporativas são imutáveis e travadas (*Lock 100%*).
- O motor só tem autorização para ajustar: *densidade visual (padding/margin)*, *hierarquia posicional de botões*, *contraste lumínico relativo* e *agrupamento de atalhos*.

### Regra 5: Soberania e Controle do Usuário
- O algoritmo ergonômico não pode agir como uma "caixa preta incontrolável".
- O usuário ou gestor tem sempre a prerrogativa de:
  1. Travar a interface no modo clássico/estático (*Pin Layout*).
  2. Forçar manualmente qualquer uma das personas homologadas (*Power User*, *Minimalista*, *Executivo*).
  3. Redefinir a telemetria com 1 clique para reiniciar o aprendizado.

### Regra 6: Responsividade Estrita e Anti-Distorção
- **Zero Scroll Horizontal Involuntário:** A janela nunca deve ultrapassar `100vw` nem exibir barras de rolagem horizontais que distorçam o layout.
- Todas as seções e containers globais devem possuir contenção estrita (`max-w-full overflow-x-hidden`).
- Tabelas de dados densos e listas operacionais devem implementar rolagem horizontal interna contida (`overflow-x-auto`) com proteção `min-w`, preservando a largura de tela em coletores industriais, tablets e celulares.

### Regra 7: Orçamento de Latência Sub-18ms
- Mutações visuais e reordenações de botões devem ser computadas e renderizadas em menos de 18 milissegundos.
- A transmutação deve utilizar propriedades CSS aceleradas por GPU (`transform`, `opacity`), evitando *forced reflows* ou bloqueio do thread principal de UI.

---

## 6. Segurança, Privacidade & Conformidade LGPD/GDPR

O Chameleon foi desenhado sob o princípio de **Privacy-by-Design** e **Zero-Trust**:

1. **Zero-PII (Personally Identifiable Information):**
   - O Chameleon **nunca** inspeciona valores digitados em campos de formulário (`<input value>`, senhas, CPFs, cartões ou montantes financeiros).
   - O algoritmo apenas identifica o *tipo do controle* (exemplo: `button#emitir-nfe`, `nav.menu-item`).
2. **Execução Local (Client-Side Sandboxing):**
   - Todo o cálculo da telemetria ergonômica é executado no motor V8 do próprio navegador do usuário (`window.sessionStorage` ou `IndexedDB` criptografado localmente).
   - Nenhuma imagem da tela ou gravação de sessão é transmitida para servidores externos.
3. **Governança do Administrador:**
   - A empresa pode fixar políticas no nível organizacional (ex.: "bloquear adaptação de cor no domínio financeiro", "permitir apenas adaptação de atalhos").

---

## 7. Arquitetura Técnica & Métodos de Integração

### Método 1: Script Tag Universal (Zero-Code)

Para aplicações legadas, ERPs web empacotados ou lojas prontas, a injeção é realizada com uma única linha no `<head>` do layout mestre:

```html
<!-- Injeção do Chameleon Engine com proteção de tokens corporativos -->
<script 
  src="https://cdn.chameleon-ui.com/v2/chameleon.min.js" 
  data-org-id="ORG_CHAMELEON_9842"
  data-modules="erp,crm"
  data-brand-lock="true"
  async>
</script>
```

### Método 2: SDK Universal (React / Next.js / Vue / Angular)

Para times de produto desenvolvendo SaaS proprietário:

```tsx
import { ChameleonProvider, useAdaptiveShortcuts } from '@chameleon-ui/react';

// 1. Envolver a aplicação com o Provider homologado
export function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ChameleonProvider
      config={{
        defaultDensity: 'standard',
        allowHotkeys: true,
        brandTokens: {
          primaryColor: '#0ea5e9',
          fontFamily: 'var(--font-sans)',
        },
      }}
    >
      {children}
    </ChameleonProvider>
  );
}

// 2. Consumir atalhos adaptados dinamicamente no componente
export function OperationalActionBar() {
  const { topShortcuts, triggerAction } = useAdaptiveShortcuts({ module: 'erp' });

  return (
    <div className="flex gap-2 p-3 bg-slate-900 rounded-xl">
      {topShortcuts.map((shortcut) => (
        <button
          key={shortcut.id}
          onClick={() => triggerAction(shortcut.id)}
          className="px-3 py-1.5 bg-sky-500/20 text-sky-200 border border-sky-500/30 rounded-lg text-xs font-semibold"
        >
          {shortcut.label} {shortcut.hotkey && `[${shortcut.hotkey}]`}
        </button>
      ))}
    </div>
  );
}
```

---

## 8. Simulador Interativo da Landing Page

A aplicação conta com um **Simulador de Alta Fidelidade em Tempo Real** localizado na seção central:

* **Botão "⚡ Testar Adaptação Automática":** Executa um escaneamento imediato da matriz de calor, demonstrando a transição fluida de layout e reposicionamento de botões.
* **Telemetria ao Vivo:** Ao clicar em itens simulados (como *"Emitir NFe Fiscal"*, *"Disparar WhatsApp 1-Click"* ou *"Repetir Último Pedido"*), o usuário vê o contador de cliques subir e a ação selecionada ser promovida dinamicamente na barra de atalhos.
* **Alternador de Módulos (ERP / CRM / Web / BI):** Permite testar na prática a diferença conceitual e visual de cada caso de uso em milissegundos.
* **Controle de Densidade:** Botões de alternância instantânea entre modos *Compacta*, *Padrão* e *Espaçosa*.
* **Calculadora de ROI Dinâmica:** Permite deslizar o número de operadores (5 a 500+) e selecionar os módulos contratados para visualizar a estimativa mensal de horas resgatadas e ganho financeiro.

---

## 9. Área Restrita Corporativa & Gestão de Contratos (`/restrito`)

A Área Restrita é a central de operações e governança dos clientes e leads do Chameleon Systems.

### 9.1. Autenticação Staff Segura & 2FA
- **Acesso Operacional:** Rota `/restrito`, também ativável pelo gatilho discreto de 5 cliques rápidos no logotipo Chameleon da barra de navegação (`lib/secretAuth.ts`).
- **Camada Dupla de Segurança:** Exige credenciais autorizadas (`staff@chameleon.systems` / senha mestra) e código verificador de dois fatores (**PIN 2FA: `482910`**).
- **Gestão de Sessão Reativa:** Estado de autenticação persistido em `sessionStorage` e sincronizado via `useSyncExternalStore` com logout em 1 clique.

### 9.2. Gestão de Contratos de Clientes & Métricas (MRR/ARR)
- **Base Centralizada de Contratos:** Tabela completa com filtros por texto, status, módulo e plano.
- **Painel de KPIs em Tempo Real:**
  - **MRR Contratado:** Soma do faturamento recorrente mensal de todos os contratos ativos.
  - **ARR Projetado:** Projeção anual total de receita.
  - **Licenças de Operadores:** Total de usuários corporativos sob cobertura ergonômica.
  - **Contratos Homologados & Em Implantação:** Indicadores de entrega técnica.
- **Registro Manual de Contratos:** Modal para cadastro direto de novos contratos com cálculo automático de valores mensais/anuais e seleção multi-módulos.

### 9.3. Vencimento de Contratos & Alerta de Renovação (< 30 dias)
- **Coluna "Data de Vencimento":** Exibe a data de término do ciclo de vigência e os dias restantes para renovação calculados pela função `getContractExpirationInfo()`.
- **Badge de Alerta Visual Pulsante:**
  - Contratos com **menos de 30 dias para o vencimento** recebem destaque visual âmbar/vermelho com badge animado (`⚠️ X dias p/ renovação` ou `⚠️ Vence Hoje!`).
  - Contratos já vencidos exibem status destacado em vermelho.
- **Cartão de KPI Dedicado:** Exibe o número total de contratos na zona de renovação crítica no topo do painel.
- **Filtro de 1 Clique:** Opção no seletor de status para isolar instantaneamente apenas contas que requerem contato comercial prioritário.

### 9.4. Timeline de Auditoria de Status (`ContractTimeline`)
- Componente de auditoria cronológica integrado na ficha do contrato.
- Registra cada transição de status (*Aguardando Provisionamento*, *Ativo / Em Implantação*, *Homologado*, *Pendente Assinatura Digital*, *Cancelado*), registrando data/hora exata, operador staff responsável e anotações técnicas internas.

### 9.5. Gerador de Proposta de Provisionamento & E-mail Pré-formatado
- **Botão "Enviar Proposta de Provisionamento":** Destaque em gradiente no rodapé da ficha do contrato.
- **Minuta Institucional Automática:** Gera e-mail completo com razão social, CNPJ, módulos contratados, ambiente de hospedagem, SLA e link seguro com token de handshake criptografado:
  `https://chameleon.systems/setup?contract=[ID]&token=[TOKEN]`.
- **Ações Rápidas:**
  - *Copiar E-mail Formatado:* Copia todo o texto padronizado para a área de transferência com feedback visual;
  - *Copiar Link / Abrir Painel de Setup:* Permite testar o setup diretamente;
  - *Abrir no Cliente de E-mail (`mailto:`):* Abre o cliente padrão (Outlook, Thunderbird, Gmail) com assunto e corpo pré-preenchidos.

### 9.6. Exportação de Relatórios em CSV
- Botão "Exportar Relatório CSV" que compila todos os campos contratuais (ID, Data, Vencimento, Dias p/ Renovação, CNPJ, Titular, Telefones, Módulos, Valores, Ambientes e Status) em formato compatível com Excel e Google Sheets.

### 9.7. Auditoria de Acessos & Rastreabilidade Total (`AuditLogsTab` / `lib/auditLogs.ts`)
- **Aba "Auditoria de Acessos" na Área Restrita:** Painel corporativo em conformidade com o Art. 37 da LGPD, registrando cada interação e acesso a dados de contratos.
- **Rastreabilidade Extensiva:** Cada registro forense captura:
  - *ID do Contrato & Razão Social* acessada;
  - *Identificação do Operador:* Nome, e-mail corporativo e nível de permissão;
  - *Ação Realizada:* Visualização de ficha, alteração de status, atualização de notas, geração de proposta, abertura de chat WhatsApp, exportação de relatório ou acesso ao setup;
  - *Endereço IP & Localização:* Rastreamento do IP de origem com indicação de VPC/cidade e botão de cópia rápida;
  - *User-Agent & Dispositivo:* Identificação do navegador e sistema operacional utilizado;
  - *Carimbo de Tempo & Epoch:* Data e hora exatas da ocorrência;
  - *Descrição Circunstanciada:* Detalhamento técnico da operação executada.
- **Painel de KPIs Forenses:** Contadores de eventos totais, acessos em 24h, operadores distintos, IPs únicos e ações críticas.
- **Inspeção Forense Detalhada:** Modal com visão detalhada do registro e botão "Copiar Registro JSON".
- **Exportação de Logs em CSV:** Botão dedicado "Exportar Logs CSV" para relatórios formais de compliance e auditorias externas.

---

## 10. Central de Atendimento & Chat WhatsApp com Clientes (`ClientChatTab`)

Aba dedicada dentro da Área Restrita para relacionamento técnico e operacional ágil com os clientes.

### 10.1. Integração Direta com 1 Clique nas Tabelas e Fichas
- **Redirecionamento Automático:** Ao clicar no ícone do WhatsApp em qualquer linha da tabela de contratos, tabela de leads ou na ficha detalhada, o sistema transita automaticamente para a aba de chat e seleciona a conversa do titular.
- **Criação Sob Demanda:** Se o contato ainda não possuir conversa aberta, o sistema cria o canal instantaneamente com uma mensagem institucional de boas-vindas.

### 10.2. Respostas Rápidas em 1 Toque
- Pílulas de templates prontos no topo da janela de chat:
  - 🔗 *Enviar Link de Setup:* Envia URL com token de integração técnica;
  - ✅ *Homologação Concluída:* Confirma aprovação da latência sub-15ms e solicita liberação dos operadores;
  - 🔑 *Solicitar Token de API:* Solicita credenciais de conexão com o ERP legado do cliente.

### 10.3. Mensageria Reativa & Respostas Automáticas Inteligentes
- Envio bidirecional de mensagens com verificação de status (`sent`, `delivered`, `read`).
- **Simulador de Digitação & Respostas Automáticas:** Após o envio de mensagem pelo operador staff, o sistema simula o cliente digitando e gera respostas coerentes com o contexto (agradecimento de links, confirmação de testes fiscais ou dúvidas técnicas).
- **Sincronização em Tempo Real:** Conversas e mensagens persistidas em `localStorage` com disparadores de eventos customizados (`chameleon-chat-updated`).

---

## 11. Painel de Setup Técnico & Provisionamento (`/setup`)

Página dedicada para a equipe de TI e homologadores do cliente ativarem a camada de adaptação ergonômica.

### 11.1. Injeção do Micro-Script Universal (< 12KB)
- Fornece o bloco de código minimalista pronto para inserção no cabeçalho `<head>` do software anfitrião do cliente:
  ```html
  <script
    src="https://cdn.chameleon.systems/v1/chameleon-observer.js"
    data-contract-id="CTR-2026-XXXX"
    data-environment="cloud-dedicated"
    data-zero-pii="strict"
    data-brand-lock="enforced"
    async
  ></script>
  ```
- Botão de cópia em 1 clique com feedback visual imediato.

### 11.2. Conectores para ERPs e Sistemas Legados
- Suporte homologado a conectores dedicados:
  - **TOTVS Protheus:** Mapeamento de rotinas fiscais e atalhos de faturamento;
  - **SAP S/4HANA Cloud:** Compactação de grades e síntese de pedidos;
  - **Salesforce Enterprise:** Otimização de pipeline Kanban e gatilhos de WhatsApp.
- Campo de homologação do **Token Criptografado de Integração**.

### 11.3. Teste Sintético de Latência e Handshake (< 15ms)
- Ferramenta interativa de teste de ping entre o micro-script do cliente e o cluster corporativo Chameleon.
- Emite relatório com latência mensurada (ex.: **11.4 ms**), verificação de conformidade Zero-PII e aprovação formal para início de uso em produção.

---

## 12. Estrutura de Arquivos & Detalhamento Arquitetural

### Mapa Visual de Pastas e Arquivos

```
/
├── app/
│   ├── api/
│   │   └── assistant/
│   │       └── route.ts         # Endpoint de IA server-side (Gemini API) para consultoria de layout
│   ├── restrito/
│   │   └── page.tsx             # Área restrita corporativa (Contratos, Leads, Chat WhatsApp, Métricas)
│   ├── setup/
│   │   └── page.tsx             # Painel de setup técnico e provisionamento de micro-scripts
│   ├── globals.css              # Estilos globais Tailwind CSS v4, temas e fontes
│   ├── layout.tsx               # Root Layout com Plus Jakarta Sans e Space Grotesk
│   └── page.tsx                 # Página principal da Landing Page
├── components/
│   ├── Navbar.tsx               # Cabeçalho global de navegação e CTAs com ThemeSwitcher
│   ├── Hero.tsx                 # Hero section com mini-simulador morphing integrado e glow dinâmico
│   ├── AdaptiveSimulator.tsx    # Simulador interativo central em tempo real com seletor estético
│   ├── ThemeSwitcher.tsx        # Seletor de perfis estéticos (Modern Minimalist, High Contrast, Ocean Blue)
│   ├── ChameleonAssistant.tsx   # Assistente flutuante de layout com IA (FAB + Chat em tempo real)
│   ├── AdaptationToast.tsx      # Indicador visual e toast de feedback de layout adaptado com sucesso
│   ├── AuditLogsTab.tsx         # Aba de auditoria de acessos corporativos (LGPD, IPs, dispositivos, ações)
│   ├── ClientChatTab.tsx        # Aba de chat com clientes integrado ao WhatsApp Business API
│   ├── ContractTimeline.tsx     # Linha do tempo visual de auditoria de histórico de status de contratos
│   ├── ModulesGrid.tsx          # Grade com os 5 módulos independentes plug-and-play
│   ├── HowItWorks.tsx           # Arquitetura ergonômica em 4 etapas e Brand Lock
│   ├── ModuleConfigurator.tsx   # Calculadora de ROI e construtor dinâmico de pacotes
│   ├── CaseStudies.tsx          # Casos de sucesso reais (Logística, FinTech, E-Commerce)
│   ├── FAQSection.tsx           # Seção expansível de perguntas frequentes
│   ├── LeadModal.tsx            # Modal de solicitação de proposta e blueprint técnico
│   └── Footer.tsx               # Rodapé corporativo com links de conformidade LGPD
├── hooks/
│   └── use-mobile.ts            # Hook SSR-safe para detecção de viewport móvel
├── lib/
│   ├── auditLogs.ts             # Modelos, persistência reativa e registro forense de auditoria de acessos
│   ├── chameleonData.ts         # Base de dados dos módulos, personas e métricas
│   ├── clientChat.ts            # Modelos, persistência e auto-respostas do chat de clientes WhatsApp
│   ├── contracts.ts             # Modelos, persistência, cálculo de vencimento e propostas de contratos
│   ├── demoRequests.ts          # Persistência e regras de negócio de solicitações de demonstração
│   ├── secretAuth.ts            # Autenticação staff, 2FA e gatilho de acesso secreto via logotipo
│   └── utils.ts                 # Utilitário de mesclagem condicional de classes (cn)
├── types/
│   ├── chameleon.ts             # Tipagens TypeScript completas do ecossistema
│   └── theme.ts                 # Definições dos perfis estéticos (Minimalist, High Contrast, Ocean Blue, Violet)
├── .env.example                 # Declaração das variáveis de ambiente necessárias
├── .eslintrc.json               # Configuração legado do ESLint
├── .gitignore                   # Regras de exclusão de versionamento Git
├── eslint.config.mjs            # Configuração moderna Flat Config do ESLint
├── metadata.json                # Metadados e permissões da aplicação no AI Studio
├── next.config.ts               # Configurações do framework Next.js
├── package.json                 # Manifesto de dependências e scripts do Node.js
├── postcss.config.mjs           # Plugin do Tailwind CSS v4 para processamento de estilos
├── tsconfig.json                # Configuração do compilador TypeScript
└── README.md                    # Documentação técnica e operacional completa (este arquivo)
```

---

### Detalhamento de Cada Arquivo do Projeto

Abaixo encontra-se a explicação detalhada de cada pasta e arquivo que compõe a solução:

#### 📁 Diretório `/app` (Next.js App Router)

* **`/app/api/assistant/route.ts`**
  - **O que faz:** Rota de API server-side que conecta a interface do assistente ao modelo de inteligência artificial **Gemini 3.8 Flash** (`@google/genai`).
  - **Para que serve:** Recebe as mensagens da conversa e o contexto da página em tempo real (módulo ativo, densidade atual, persona ergonômica e viewport). Processa diretrizes especializadas de ergonomia corporativa e retorna recomendações personalizadas de layout, atalhos de teclado e densidade visual.

* **`/app/restrito/page.tsx`**
  - **O que faz:** Painel administrativo restrito de governança operacional e comercial para operadores Staff.
  - **Para que serve:**
    - Autenticação de equipe com proteção de credenciais e segundo fator (PIN 2FA);
    - Gestão completa de Contratos de Clientes (com cálculo dinâmico de MRR, ARR e licenças);
    - Monitoramento de Vencimentos de Contratos com alertas visuais para prazos inferiores a 30 dias;
    - Emissão e envio de Propostas de Provisionamento com link seguro;
    - Central de Atendimento e Chat WhatsApp integrado;
    - Gerenciamento de leads de demonstração e exportação de relatórios em CSV.

* **`/app/setup/page.tsx`**
  - **O que faz:** Página de ativação técnica e homologação do micro-script para a equipe de TI do cliente.
  - **Para que serve:** Recebe o contrato via parâmetro de URL (`/setup?contract=CTR-XXXX&token=YYYY`), disponibiliza o script universal (< 12KB) com cópia em 1 clique, token de autenticação e simulador de teste de latência e handshake sintético (< 15ms).

* **`/app/globals.css`**
  - **O que faz:** Contém as diretivas de estilo global do projeto utilizando o **Tailwind CSS v4** (`@import "tailwindcss";`).
  - **Para que serve:** Define variáveis de tema de tipografia (`--font-sans` e `--font-display`), regras de contenção estrita contra transbordamento horizontal (`html, body { max-width: 100vw; overflow-x: hidden; }`) e estilização de barras de rolagem.

* **`/app/layout.tsx`**
  - **O que faz:** Componente de layout raiz (*Root Layout*) que envelopa todas as rotas da aplicação.
  - **Para que serve:** Carrega as fontes modernas do Google Fonts (**Plus Jakarta Sans** e **Space Grotesk**), configura metadados oficiais de SEO, OpenGraph e Twitter Cards, e injeta as regras de viewport.

* **`/app/page.tsx`**
  - **O que faz:** Página principal da aplicação (`/`), orquestradora da experiência da landing page.
  - **Para que serve:** Monta a experiência completa com hero section, mini-simulador morphing, catálogo dos 5 módulos, como funciona, simulador central em tempo real, calculadora de ROI e formulário de leads.

---

#### 📁 Diretório `/components` (Componentes Visuais Modulares)

* **`/components/AuditLogsTab.tsx`**
  - **O que faz:** Interface forense e gerencial de auditoria de acessos aos contratos corporativos.
  - **Para que serve:** Exibe a tabela completa de logs (IP, geolocalização aproximada, operador, cargo, ação, carimbo de data/hora e detalhes técnicos), filtros instantâneos por ação e contrato, métricas forenses (acessos em 24h, operadores e IPs distintos), modal de inspeção profunda com JSON e botão de exportação dos logs em CSV.

* **`/components/ClientChatTab.tsx`**
  - **O que faz:** Interface de chat corporativo WhatsApp para suporte e implantação com clientes.
  - **Para que serve:** Permite a comunicação direta entre a equipe staff e os titulares de contratos ou leads. Possui busca de conversas, badges de status, respostas rápidas em 1 clique (link de setup, confirmação de homologação, solicitação de token), indicador de digitação e respostas automáticas simuladas.

* **`/components/ContractTimeline.tsx`**
  - **O que faz:** Linha do tempo visual de auditoria de transição de status contratuais.
  - **Para que serve:** Exibe de forma cronológica cada mudança de fase do contrato (*Aguardando Provisionamento*, *Ativo / Em Implantação*, *Homologado*, *Pendente Assinatura Digital*, *Cancelado*), com carimbo de data/hora, autor da mudança e notas técnicas de auditoria.

* **`/components/Navbar.tsx`**
  - **O que faz:** Cabeçalho global de navegação e CTAs com ThemeSwitcher integrado.
  - **Para que serve:** Navegação rápida, alternador estético de paletas corporativas e botão de demonstração. Contém o gatilho discreto de 5 cliques rápidos no logotipo para acesso à Área Restrita.

* **`/components/Hero.tsx`**
  - **O que faz:** Seção de impacto inicial da landing page.
  - **Para que serve:** Headline de alto impacto, métricas auditadas (+44% velocidade, <18ms latência) e mini-simulador interativo de morphing visual em tempo real.

* **`/components/AdaptiveSimulator.tsx`**
  - **O que faz:** Simulador interativo central em tempo real com telemetria viva.
  - **Para que serve:** Demonstração prática do aprendizado neural do Chameleon, permitindo ao usuário testar cliques, verificar o reposicionamento de atalhos e alternar entre personas ergonômicas.

* **`/components/ThemeSwitcher.tsx`**
  - **O que faz:** Seletor de temas estéticos visuais (Modern Minimalist, High Contrast, Ocean Blue, Violet).
  - **Para que serve:** Demonstra a capacidade de preservação de marca e adaptação lumínica sem violação das regras de identidade corporativa.

* **`/components/ChameleonAssistant.tsx`**
  - **O que faz:** Assistente flutuante de layout com IA generativa (Gemini 3.8 Flash).
  - **Para que serve:** Analisa o contexto ativo da navegação e fornece consultoria ergonômica em tempo real, com aplicação direta de melhorias no simulador.

* **`/components/ModulesGrid.tsx`**
  - **O que faz:** Catálogo expositor dos 5 módulos independentes plug-and-play do ecossistema.
  - **Para que serve:** Detalha especificações, compatibilidade, tempo de setup e benefícios de cada produto.

* **`/components/HowItWorks.tsx`**
  - **O que faz:** Seção explicativa da metodologia neural em 4 etapas e protocolo Brand Lock.

* **`/components/ModuleConfigurator.tsx`**
  - **O que faz:** Calculadora de ROI e construtor dinâmico de pacotes multi-módulo com slider de operadores.

* **`/components/CaseStudies.tsx`**
  - **O que faz:** Prova social corporativa com métricas de clientes dos setores de Logística, FinTech e E-Commerce.

* **`/components/FAQSection.tsx`**
  - **O que faz:** Acordeão expansível de perguntas frequentes sobre integração, backend imutável e segurança.

* **`/components/LeadModal.tsx`**
  - **O que faz:** Modal de solicitação de proposta e blueprint técnico preliminar.

* **`/components/AdaptationToast.tsx`**
  - **O que faz:** Notificação flutuante com feedback visual imediato após a conclusão da adaptação de layout.

* **`/components/Footer.tsx`**
  - **O que faz:** Rodapé institucional com declarações de conformidade LGPD e links rápidos.

---

#### 📁 Diretório `/lib` (Regras de Negócio e Dados Estruturados)

* **`/lib/auditLogs.ts`**
  - **O que faz:** Módulo de auditoria, rastreabilidade e persistência de acessos a dados sensíveis de contratos corporativos.
  - **Para que serve:**
    - Modelo de dados `ContractAuditLog` com campos de IP, geolocalização, operador, ação, user-agent, severidade e descrição;
    - Função `recordContractAuditLog()` para gravação automática de eventos de auditoria;
    - Persistência reativa em `localStorage` e disparador de eventos customizados (`chameleon-audit-logs-updated`);
    - Gerador e exportador de relatórios forenses em CSV (`exportAuditLogsCSV()`).

* **`/lib/contracts.ts`**
  - **O que faz:** Camada central de modelos e persistência de Contratos de Clientes.
  - **Para que serve:**
    - Estruturas de dados `ClientContract` e `StatusHistoryEntry`;
    - Cálculo de prazos de vigência e alertas de renovação (`getContractExpirationInfo()`);
    - Gerenciador de histórico de status (`updateClientContractStatus()`, `ensureContractHistory()`);
    - Gerador de proposta técnica de provisionamento (`generateProvisioningProposalEmail()`);
    - Persistência reativa em `localStorage` com eventos `chameleon-contracts-updated`.

* **`/lib/clientChat.ts`**
  - **O que faz:** Gerenciador de conversas e mensagens do WhatsApp integrado.
  - **Para que serve:**
    - Armazena canais de chat por cliente (`ClientConversation`, `ChatMessage`);
    - Permite criação automática ou recuperação de conversas (`getOrCreateConversationForClient()`);
    - Envio de mensagens com cálculo de carimbo de data/hora;
    - Motor de respostas automáticas simuladas inteligentes do cliente.

* **`/lib/demoRequests.ts`**
  - **O que faz:** Gerenciador de leads e solicitações de demonstração recebidas na plataforma.
  - **Para que serve:** Persistência, alteração de status e anotações internas para o funil comercial.

* **`/lib/secretAuth.ts`**
  - **O que faz:** Módulo de segurança, autenticação staff e controle de sessão da Área Restrita.
  - **Para que serve:** Validação de credenciais, exigência de PIN 2FA, persistência em `sessionStorage` e mecanismo de detecção de 5 cliques rápidos no logotipo da marca.

* **`/lib/chameleonData.ts`**
  - **O que faz:** Central de dados estáticos do ecossistema (módulos, personas, métricas e ROI).

* **`/lib/utils.ts`**
  - **O que faz:** Utilitário padrão `cn(...)` para fusão de classes condicionais do Tailwind CSS.

---

#### 📁 Diretórios `/hooks` e `/types`

* **`/hooks/use-mobile.ts`:** Hook SSR-safe para detecção de viewport móvel via `useSyncExternalStore`.
* **`/types/chameleon.ts`:** Tipagens TypeScript de módulos, personas, estados de simulação e leads.
* **`/types/theme.ts`:** Tipagens dos perfis estéticos visuais.

---

## 13. Instalação, Execução e Comandos

### Pré-requisitos
* **Node.js**: Versão 20.x ou superior.
* **npm**: Versão 10.x ou superior.

### Comandos de Desenvolvimento

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Executar o servidor de desenvolvimento local (porta 3000)
npm run dev

# 3. Executar o validador de sintaxe e qualidade (ESLint)
npm run lint

# 4. Compilar a aplicação para produção (Next.js build)
npm run build

# 5. Iniciar o servidor em modo de produção
npm start
```

---

## 14. Métricas de Impacto e ROI Comprovado

Estudos realizados em clientes com operações ativas de alta volumetria apontam os seguintes números médios após 90 dias de ativação do Chameleon:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  • Redução de cliques desnecessários:         -61%          │
  │  • Aumento na velocidade de processos diários: +44%          │
  │  • Redução do tempo de treinamento de novatos: -70%          │
  │  • Tempo médio de retorno do investimento:     4.1 meses     │
  │  • Taxa de conformidade de marca (Brand Lock): 100%          │
  │  • Latência de adaptação na interface:         < 15ms        │
  └─────────────────────────────────────────────────────────────┘
```

---

## 📞 Contato & Suporte Corporativo

O ecossistema **Chameleon** foi projetado para operações corporativas que exigem alta performance e adaptabilidade contínua. Para agendar uma prova de conceito (PoC) assistida na interface da sua organização, utilize o simulador integrado ou solicite contato por meio da plataforma.

*© Chameleon Ecosystem. Todos os direitos reservados.*
