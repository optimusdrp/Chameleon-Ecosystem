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
9. [Estrutura de Arquivos & Detalhamento Arquitetural](#9-estrutura-de-arquivos--detalhamento-arquitetural)
   - [Mapa Visual de Pastas e Arquivos](#mapa-visual-de-pastas-e-arquivos)
   - [Detalhamento de Cada Arquivo do Projeto](#detalhamento-de-cada-arquivo-do-projeto)
10. [Instalação, Execução e Comandos](#10-instalação-execução-e-comandos)
11. [Métricas de Impacto e ROI Comprovado](#11-métricas-de-impacto-e-roi-comprovado)

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

## 9. Estrutura de Arquivos & Detalhamento Arquitetural

### Mapa Visual de Pastas e Arquivos

```
/
├── app/
│   ├── api/
│   │   └── assistant/
│   │       └── route.ts         # Endpoint de IA server-side (Gemini API) para consultoria de layout
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
│   ├── chameleonData.ts         # Base de dados dos módulos, personas e métricas
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
  - **Para que serve:** Recebe as mensagens da conversa e o contexto da página em tempo real (módulo ativo, densidade atual, persona ergonômica e viewport). Processa diretrizes especializadas de ergonomia corporativa e retorna recomendações personalizadas de layout, atalhos de teclado e densidade visual, com fallback inteligente caso a chave de API não esteja configurada.

* **`/app/globals.css`**
  - **O que faz:** Contém as diretivas de estilo global do projeto utilizando o **Tailwind CSS v4** (`@import "tailwindcss";`).
  - **Para que serve:** Define variáveis de tema de tipografia (`--font-sans` e `--font-display`), regras de contenção estrita contra transbordamento horizontal (`html, body { max-width: 100vw; overflow-x: hidden; }`), estilização minimalista de barras de rolagem (`::-webkit-scrollbar`) e padrões visuais de fundo sutis em malha quadriculada (`.bg-grid-subtle`) e pontilhada (`.bg-dot-subtle`).

* **`/app/layout.tsx`**
  - **O que faz:** É o componente de layout raiz (*Root Layout*) que envelopa todas as rotas e componentes da aplicação.
  - **Para que serve:** Carrega e injeta as fontes modernas do Google Fonts (**Plus Jakarta Sans** para corpo de texto e **Space Grotesk** para títulos/displays), configura os metadados oficiais de SEO, OpenGraph e Twitter Cards do Chameleon, e injeta as classes de contenção `overflow-x-hidden max-w-full` na tag `<html>` e `<body>`.

* **`/app/page.tsx`**
  - **O que faz:** Página principal da aplicação (`/`), estruturada como Client Component orchestrador.
  - **Para que serve:** Monta a experiência completa da landing-page em ordem lógica de conversão. Gerencia os estados globais da interface (como abertura e pré-configuração do modal de leads `leadModalOpen`, módulo ativo selecionado e contagem de usuários para estimativa). Garante que a tag `<main>` possua contenção total `w-full max-w-full overflow-x-hidden`.

---

#### 📁 Diretório `/components` (Componentes Visuais Modulares)

* **`/components/Navbar.tsx`**
  - **O que faz:** Cabeçalho de navegação fixo (*sticky*) com efeito de desfoque de fundo (*backdrop-blur*) ao rolar a página.
  - **Para que serve:** Permite a navegação rápida para seções cruciais (*Simulador em Tempo Real*, *Módulos*, *Como Funciona*, *Calculadora de ROI*, *FAQ*), exibe a identidade visual da marca Chameleon com ícone dinâmico e oferece o botão primário de conversão *"Solicitar Demonstração"*. Inclui menu hambúrguer responsivo para dispositivos móveis.

* **`/components/Hero.tsx`**
  - **O que faz:** Primeira dobra da página (seção de impacto visual e proposta de valor imediata).
  - **Para que serve:** Apresenta a headline com gradientes de alta fidelidade, badge de ecossistema neural sem código backend, botões de ação e métricas de impacto comprovado (+44% velocidade, <18ms latência, -61% cliques). À direita, traz um **mini-simulador dinâmico de morphing** com botões rápidos para alternar entre *ERP Gestão*, *CRM Vendas* e *Portal Web*, demonstrando varredura e adaptação visual imediata.

* **`/components/AdaptiveSimulator.tsx`**
  - **O que faz:** O grande diferencial interativo da página — simulador de adaptação em tempo real com telemetria viva.
  - **Para que serve:** Permite ao visitante escolher entre 4 módulos independentes (ERP, CRM, Portal Web, BI), interagir com elementos da tela simulada (emitir nota, chamar no WhatsApp, repetir pedido) e clicar no botão principal **"⚡ Testar Adaptação Automática"**. O componente simula o aprendizado neural, reposiciona dinamicamente os atalhos mais clicados, recalcula densidades visuais (Compacta, Padrão, Espaçosa) e permite alternar entre personas ergonômicas (*Power User*, *Minimalista*, *Noturno*, *Executivo*).

* **`/components/ChameleonAssistant.tsx`**
  - **O que faz:** Assistente flutuante de layout com inteligência artificial generativa (FAB no canto inferior direito + interface conversacional de chat).
  - **Para que serve:** Monitora o contexto ativo da navegação (módulo em teste, persona e densidade) para sugerir melhorias ergonômicas práticas. Possui badges de status em tempo real, sugestões rápidas de prompt (*1-Click Prompts*), formatação Markdown e botão de aplicação direta no Simulador em Tempo Real com rolagem suave automática.

* **`/components/ModulesGrid.tsx`**
  - **O que faz:** Catálogo expositor dos 5 módulos independentes plug-and-play do Chameleon.
  - **Para que serve:** Detalha cada produto que o cliente pode escolher adquirir (ERP Suite, CRM Sales, Web & Portais, BI Analytics e Core SDK Universal). Apresenta métricas específicas de cada módulo, tempo de setup de homologação (< 15 min a 48h), lista de recursos e botões individuais para testar o módulo no simulador ou contratar diretamente.

* **`/components/HowItWorks.tsx`**
  - **O que faz:** Seção explicativa da metodologia e arquitetura do Chameleon.
  - **Para que serve:** Detalha o funcionamento do ecossistema em 4 passos: (1) Sensoriamento ergonômico Zero-PII, (2) Mapeamento neural de afinidade, (3) Micro-adaptação não destrutiva sub-18ms e (4) Consistência multi-device com proteção de tokens corporativos (desktop, coletores de depósito e smartphones).

* **`/components/ModuleConfigurator.tsx`**
  - **O que faz:** Calculadora de ROI e construtor customizado de pacotes de módulos.
  - **Para que serve:** Permite que o cliente marque/desmarque quais módulos utiliza, defina o número de operadores ativos (5 a 500+) através de um controle deslizante (*slider*) e selecione seu setor de atuação. Em tempo real, calcula as horas produtivas resgatadas no mês, a redução de erros operacionais e o retorno financeiro estimado, oferecendo um botão direto para solicitar proposta formal para a configuração montada.

* **`/components/CaseStudies.tsx`**
  - **O que faz:** Seção de prova social e validação em operações de grande porte.
  - **Para que serve:** Apresenta depoimentos de executivos de grandes empresas (Logística, FinTech e E-Commerce) com dados auditados pós-implantação do Chameleon (redução de tempo de expedição, aceleração de ciclo comercial e queda em chamados de suporte).

* **`/components/FAQSection.tsx`**
  - **O que faz:** Seção interativa de perguntas frequentes em formato de sanfona (*accordion*).
  - **Para que serve:** Responde às principais objeções técnicas e comerciais de CTOs e gestores: ausência de necessidade de reescrever backend, independência na contratação gradual de módulos, conformidade com a LGPD/GDPR e proteção de marcas registradas.

* **`/components/LeadModal.tsx`**
  - **O que faz:** Modal corporativo de captura de leads e geração assistida de blueprint de arquitetura.
  - **Para que serve:** Permite ao cliente confirmar os módulos desejados, informar dados corporativos (nome, empresa, e-mail corporativo, WhatsApp, tamanho de equipe e ERP atual) e receber na hora a confirmação do plano técnico preliminar, agendando uma demonstração assistida na interface da própria empresa.

* **`/components/AdaptationToast.tsx`**
  - **O que faz:** Componente de notificação flutuante (*toast*) com feedback imediato de adaptação de layout.
  - **Para que serve:** Disparado assim que a rede neural do Chameleon conclui a adaptação ergonômica de um módulo (via Telemetria em Tempo Real ou Simulador). Apresenta badge animado de sucesso, identificador colorido do módulo aplicado, métricas de latência (&lt;18ms) e economia de cliques (-4.2), além de barra de contagem regressiva linear e fechamento manual acessível.

* **`/components/Footer.tsx`**
  - **O que faz:** Rodapé institucional com mapa de links e informações de conformidade.
  - **Para que serve:** Reúne acessos rápidos a todos os módulos, ferramentas do ecossistema, declarações de conformidade de privacidade/LGPD e direitos autorais.

---

#### 📁 Diretório `/hooks` (Hooks Customizados)

* **`/hooks/use-mobile.ts`**
  - **O que faz:** Hook customizado em React para detecção segura da largura de tela em relação ao breakpoint móvel (`768px`).
  - **Para que serve:** Utiliza a API `React.useSyncExternalStore` para assinar mudanças na media query (`matchMedia`), prevenindo erros de hidratação no Next.js (SSR) e evitando disparos de renderização em cascata (*cascading renders*).

---

#### 📁 Diretório `/lib` (Regras de Negócio e Dados Estruturados)

* **`/lib/chameleonData.ts`**
  - **O que faz:** Central de dados estáticos do ecossistema.
  - **Para que serve:** Contém a definição completa de cada módulo (`CHAMELEON_MODULES`), incluindo categorias, tempos de implantação, listas de funcionalidades, métricas auditadas e paletas visuais. Também armazena as configurações e parâmetros de cada persona ergonômica (`PERSONA_CONFIGS`).

* **`/lib/utils.ts`**
  - **O que faz:** Utilitário para mesclagem limpa de classes CSS utilitárias do Tailwind.
  - **Para que serve:** Exporta a função padrão `cn(...)`, que combina `clsx` e `tailwind-merge` para resolver conflitos de classes condicionais sem duplicação de regras no DOM.

---

#### 📁 Diretório `/types` (Tipagens TypeScript)

* **`/types/chameleon.ts`**
  - **O que faz:** Declaração de tipos e interfaces estritas do TypeScript para o ecossistema.
  - **Para que serve:** Define os identificadores de módulo (`ModuleId = 'portal' | 'erp' | 'crm' | 'bi' | 'sdk'`), a interface `ChameleonModule`, as personas de usuário (`UserPersona`), os estados de simulação em tempo real (`SimulationState`) e a estrutura de dados do formulário de proposta técnica (`LeadFormData`).

---

#### 📄 Arquivos de Configuração da Raiz do Projeto

* **`metadata.json`**
  - **O que faz:** Arquivo de manifesto e registro do applet no Google AI Studio.
  - **Para que serve:** Registra o nome oficial (`Chameleon — Ecossistema de Interfaces Adaptativas`), a descrição técnica do ecossistema e as capacidades autorizadas no runtime do Google Cloud.

* **`package.json`**
  - **O que faz:** Manifesto do ecossistema Node.js / npm.
  - **Para que serve:** Lista todas as bibliotecas instaladas (Next.js 15, React 19, Motion, Lucide React, Tailwind CSS v4) e define os scripts operacionais (`npm run dev`, `npm run build`, `npm run start`, `npm run lint`).

* **`next.config.ts`**
  - **O que faz:** Arquivo de configuração oficial do framework Next.js.
  - **Para que serve:** Define o modo estrito do React (`reactStrictMode`), habilita o modo de compilação autônoma (`output: 'standalone'`), transfigura pacotes de animação (`transpilePackages: ['motion']`) e gerencia a política de imagens remotas.

* **`tsconfig.json`**
  - **O que faz:** Configuração do compilador TypeScript (`tsc`).
  - **Para que serve:** Estabelece a checagem estrita de tipos (`strict: true`), o mapeamento de paths de importação (`@/*` para a raiz `./*`), a resolução de módulos moderna (`moduleResolution: "bundler"`) e o target ECMAScript.

* **`postcss.config.mjs`**
  - **O que faz:** Configuração do processador PostCSS.
  - **Para que serve:** Conecta o plugin `@tailwindcss/postcss` ao pipeline de build para compilar as diretivas do Tailwind CSS v4.

* **`eslint.config.mjs` & `.eslintrc.json`**
  - **O que faz:** Arquivos de regras de qualidade e conformidade de código do ESLint.
  - **Para que serve:** Garante que o código fonte siga os padrões mais rígidos do ecossistema React/Next.js, prevenindo bugs de hooks, importações circulares ou erros de sintaxe.

* **`.env.example`**
  - **O que faz:** Modelo de documentação de variáveis de ambiente do projeto.
  - **Para que serve:** Indica aos desenvolvedores quais chaves podem ser configuradas no runtime (como `GEMINI_API_KEY` e `APP_URL`).

* **`.gitignore`**
  - **O que faz:** Arquivo de instrução do sistema de versionamento Git.
  - **Para que serve:** Impede o commit acidental de pastas pesadas e temporárias como `node_modules/`, `.next/`, logs e arquivos de build local.

* **`README.md`**
  - **O que faz:** Documentação técnica completa, executiva e arquitetural do ecossistema Chameleon.
  - **Para que serve:** Serve como base de conhecimento definitiva para engenheiros, arquitetos de software e clientes corporativos compreenderem as regras, módulos, integrações e estrutura de código.

---

## 10. Instalação, Execução e Comandos

### Pré-requisitos
* **Node.js**: Versão 20.x ou superior.
* **npm**: Versão 10.x ou superior.

### Comandos de Desenvolvimento

```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Executar o servidor de desenvolvimento local
npm run dev

# 3. Executar o validador de sintaxe e código (ESLint)
npm run lint

# 4. Gerar o build otimizado de produção
npm run build

# 5. Iniciar o servidor em modo de produção
npm start
```

---

## 11. Métricas de Impacto e ROI Comprovado

Estudos realizados em clientes com operações ativas de alta volumetria apontam os seguintes números médios após 90 dias de ativação do Chameleon:

```
  ┌─────────────────────────────────────────────────────────────┐
  │  • Redução de cliques desnecessários:         -61%          │
  │  • Aumento na velocidade de processos diários: +44%          │
  │  • Redução do tempo de treinamento de novatos: -70%          │
  │  • Tempo médio de retorno do investimento:     4.1 meses     │
  │  • Taxa de conformidade de marca (Brand Lock): 100%          │
  └─────────────────────────────────────────────────────────────┘
```

---

## 📞 Contato & Suporte Corporativo

O ecossistema **Chameleon** foi projetado para operações que não podem parar. Para agendar uma prova de conceito (PoC) assistida na interface da sua organização, utilize o simulador integrado ou solicite contato por meio do formulário do sistema.

*© Chameleon Ecosystem. Todos os direitos reservados.*
