import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface PageContext {
  activeModule?: string;
  density?: string;
  persona?: string;
  viewport?: string;
}

const SYSTEM_INSTRUCTION = `Você é o "Chameleon Assistant", especialista em ergonomia de interfaces corporativas e no Ecossistema Chameleon de Interfaces Adaptativas Inteligentes.

Sua missão é analisar o contexto da aplicação e da página atual do usuário e fornecer SUGESTÕES ESPECÍFICAS DE LAYOUT, ergonomia visual e atalhos de alta produtividade para sistemas corporativos (como ERPs SAP/TOTVS, CRMs Salesforce/HubSpot, Portais Web B2B e Dashboards BI), sem exigir qualquer alteração no código de backend do cliente.

Diretrizes de Resposta:
1. Seja objetivo, técnico e focado em UX ergonômica de alto impacto.
2. Forneça recomendações práticas e estruturadas:
   - **Densidade Recomendada:** (Compacta para operadores analíticos, Padrão para uso misto, Espaçosa para visualização C-Level/executiva).
   - **Reorganização de Componentes:** Quais seções subir, quais ocultar e onde posicionar barras de ações rápidas.
   - **Atalhos 1-Click e Teclado:** Sugestões de teclas de atalho (ex: [⌘E] Emitir, [⌘B] Baixar, [⌘W] WhatsApp).
   - **Contraste & Ergonomia Ocular:** Recomendações para ambientes industriais ou turnos noturnos.
   - **Proteção Brand Lock:** Relembre que o Chameleon preserva 100% dos tokens corporativos de marca da empresa.
3. Responda em Português do Brasil com formatação clara em Markdown (tópicos, negrito e blocos organizados).
4. Mantenha um tom profissional, amigável e consultivo.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, context }: { messages: ChatMessage[]; context?: PageContext } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Nenhuma mensagem fornecida.' },
        { status: 400 }
      );
    }

    const lastUserMessage = messages[messages.length - 1]?.content || '';

    // Build context string from page state
    const contextPrompt = `
[CONTEXTO ATUAL DA PÁGINA]:
- Módulo ativo em foco: ${context?.activeModule || 'ERP de Gestão'}
- Densidade visual atual: ${context?.density || 'Padrão'}
- Perfil ergonômico atual: ${context?.persona || 'Equilibrado'}
- Tipo de dispositivo: ${context?.viewport || 'Desktop'}
- Ecossistema: Chameleon (Zero-código backend, latência sub-18ms, conformidade Zero-PII, Brand Lock 100%).
`;

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is available, call Gemini API
    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });

      // Build conversation history for contents
      const conversationHistory = messages.slice(0, -1).map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const currentContents = [
        ...conversationHistory,
        {
          role: 'user',
          parts: [{ text: `${contextPrompt}\n\nPergunta do Usuário:\n${lastUserMessage}` }]
        }
      ];

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: currentContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const replyText = response.text || 'Não foi possível gerar a sugestão de layout no momento.';
      return NextResponse.json({ reply: replyText });
    }

    // Fallback if GEMINI_API_KEY is not configured in environment
    const fallbackReply = generateFallbackLayoutSuggestion(lastUserMessage, context);
    return NextResponse.json({ reply: fallbackReply });
  } catch (error) {
    console.error('Erro no Chameleon Assistant API:', error);
    // Return structured fallback rather than crashing
    return NextResponse.json(
      {
        reply: `### Sugestão de Layout Inteligente (Modo Autônomo)

Com base no seu módulo atual (**${'Gestão Corporativa'}**), aqui estão recomendações imediatas de reestruturação ergonômica:

1. **Densidade Compacta Preditiva:** Reduza o padding de tabelas em 35% para exibir até 18 ordens visíveis sem necessidade de rolagem vertical.
2. **Barra de Atalhos Flutuante:** Promova as ações mais repetidas (*Emitir NF-e*, *Baixa em Lote*, *WhatsApp 1-Click*) para o topo com atalhos de teclado direto (\`[⌘1]\`, \`[⌘2]\`).
3. **Modo Foco / Redução de Ruído:** Oculte campos tributários opcionais até que a operação exija parametrização especial.
4. **Brand Lock Ativo:** A identidade visual corporativa permanece 100% preservada de acordo com as diretrizes do ecossistema Chameleon.

*Você pode testar essa transição agora mesmo no Simulador em Tempo Real da página.*`
      },
      { status: 200 }
    );
  }
}

function generateFallbackLayoutSuggestion(query: string, context?: PageContext): string {
  const q = query.toLowerCase();
  const mod = context?.activeModule || 'erp';

  if (q.includes('fatur') || q.includes('nota') || q.includes('erp') || mod === 'erp') {
    return `### ⚡ Sugestão de Layout: Faturamento de Alta Volumetria (ERP)

Para fluxos fiscais repetitivos (ex: emissão em lote de NF-e e liberação de pedidos):

1. **Densidade Recomendada:** \`Compacta\` — Permite visualizar múltiplos pedidos e status fiscais na mesma tela sem rolagem.
2. **Barra de Ações Promovida:**
   - \`[⌘1] Emitir NF-e Fiscal\` (Promover para o canto superior esquerdo)
   - \`[⌘2] Conferência Cega de Mercadoria\`
   - \`[⌘3] Baixa Financeira em Lote\`
3. **Layout da Tabela:** Fixar colunas críticas (*Número da Ordem*, *Valor Total*, *Status SEFAZ*) e colapsar observações secundárias em popover sob demanda.
4. **Ergonomia Ocular:** Contraste suave em tons slate-900 para prevenir cansaço visual em jornadas operacionais contínuas.

*Dica: Você pode ativar o perfil "Power User" no Simulador da página para ver essa estrutura em ação.*`;
  }

  if (q.includes('venda') || q.includes('crm') || q.includes('pipeline') || mod === 'crm') {
    return `### 🎯 Sugestão de Layout: Pipeline de Vendas Ágil (CRM)

Para equipes de Inside Sales e SDRs que precisam registrar contatos com mínimo atrito:

1. **Densidade Recomendada:** \`Padrão com Agrupamento Dinâmico\`.
2. **Ações 1-Click Diretas:**
   - \`WhatsApp Template 1-Click\` embutido diretamente no card do lead.
   - \`Registrar Ligação / Call\` com pré-preenchimento automático de data/hora.
   - \`Gerar Proposta Comercial\` via atalho rápido \`[⌘P]\`.
3. **Redução de Ruído:** Ocultar 8 campos cadastrais secundários durante a ligação, exibindo apenas *Decisor*, *Dor Principal* e *Valor Estimado*.
4. **Brand Lock:** Todas as cores dos estágios do funil respeitam as cores da sua empresa.`;
  }

  if (q.includes('noturno') || q.includes('noite') || q.includes('olho') || q.includes('contraste')) {
    return `### 🌙 Sugestão de Layout: Turno Noturno & Alto Contraste

Para centros de distribuição, armazéns 24/7 e salas de controle:

1. **Paleta Cromática:** Fundo preto absoluto (\`#000000\`) com elementos em âmbar de alta luminância (\`#f59e0b\`) e texto em alto contraste.
2. **Bordas Delimitadoras:** Contornos de 1.5px em todos os botões clicáveis para facilitar o toque em telas sensíveis e coletores industriais.
3. **Tamanho de Alvos de Toque:** Aumentar botões para o padrão ergonômico de 48px de altura mínima.
4. **Zero Fadiga Ocular:** Redução da emissão de luz azul em 78% em comparação com telas tradicionais de ERPs legados.`;
  }

  return `### 💡 Sugestão de Layout Chameleon

Analisando o contexto da sua operação corporativa:

1. **Reordenação Inteligente:** O Chameleon detecta que 20% das ações respondem por 80% do tempo de tela. Recomenda-se ancorar esses botões na barra de ação primária.
2. **Adaptação por Função:** 
   - *Operadores:* Modo Compacto + Hotkeys de teclado.
   - *Gestores:* Modo Espaçoso + Cartões sintéticos de KPI e semáforos.
3. **Consistência Total:** As modificações respeitam os Design Tokens corporativos sem alterar nenhum arquivo ou endpoint no backend.

*Experimente selecionar o módulo desejado e clicar em "⚡ Testar Adaptação Automática" no Simulador acima.*`;
}
