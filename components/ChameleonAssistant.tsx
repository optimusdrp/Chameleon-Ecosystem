'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Building2, 
  BarChart3, 
  Sliders, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Minimize2,
  RefreshCw
} from 'lucide-react';
import { ModuleId, UserPersona } from '@/types/chameleon';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    moduleId: ModuleId;
    density?: 'compact' | 'standard' | 'spacious';
  };
}

interface SimulatorContextState {
  moduleId: ModuleId;
  density: 'compact' | 'standard' | 'spacious';
  persona: UserPersona;
  moduleName?: string;
}

interface ChameleonAssistantProps {
  currentModule?: ModuleId;
  onApplyLayoutToSimulator?: (moduleId: ModuleId, density?: 'compact' | 'standard' | 'spacious') => void;
}

function getModuleName(mod: ModuleId): string {
  switch (mod) {
    case 'erp':
      return 'Chameleon ERP (Gestão & Faturamento)';
    case 'crm':
      return 'Chameleon CRM (Pipeline de Vendas)';
    case 'portal':
      return 'Portal Web & B2B (E-Commerce)';
    case 'bi':
      return 'Chameleon Analytics & BI (Dashboards Executivos)';
    default:
      return 'Chameleon Core SDK';
  }
}

function getModuleSpecificRecommendations(mod: ModuleId): string {
  switch (mod) {
    case 'erp':
      return `- **Densidade Recomendada:** \`Compacta\` para exibir até 18 ordens fiscais e lotes sem rolagem vertical.
- **Barra de Atalhos 1-Click:** \`[⌘1] Emitir NFe Fiscal\`, \`[⌘2] Conciliar Lote\` e \`[⌘3] Baixa Financeira em Lote\`.
- **Modo Foco Operacional:** Ocultação inteligente de campos tributários secundários para diminuir em 61% erros de digitação.`;
    case 'crm':
      return `- **Densidade Recomendada:** \`Padrão com Agrupamento Dinâmico\` para cards de oportunidade no funil Kanban.
- **Barra de Atalhos 1-Click:** \`Disparo WhatsApp 1-Click\`, \`Mover para Proposta [⌘P]\` e \`Registrar Call [⌘R]\`.
- **Alívio de Atrito:** Redução de 8 campos burocráticos durante ligações ativas, mantendo visível apenas Decisor e Valor.`;
    case 'portal':
      return `- **Densidade Recomendada:** \`Equilibrada com Alívio Cognitivo\` em vitrines e buscas de catálogos B2B volumosos.
- **Barra de Atalhos 1-Click:** \`Repetir Último Pedido\`, \`Rastrear Envio\` e \`Fatura em PDF\`.
- **Checkout Preditivo:** Preenchimento automático de dados habituais de entrega e faturamento (+28.4% conversão).`;
    case 'bi':
      return `- **Densidade Recomendada:** \`Espaçosa / Executiva\` com cartões sintéticos de EBITDA, margens e semáforos de meta.
- **Barra de Atalhos 1-Click:** \`Exportar Balanço XLS\`, \`Filtrar por Região\` e \`Alertas de Margem\`.
- **Detecção de Anomalias:** Destaque visual automático de desvios orçamentários sem requisições demoradas.`;
    default:
      return `- **Densidade Adaptável:** Ajuste ergonômico contínuo conforme repetição de uso.
- **Brand Lock Ativo:** Cores, fontes e identidade corporativa 100% preservadas.`;
  }
}

function createWelcomeMessage(mod: ModuleId, density: 'compact' | 'standard' | 'spacious'): Message {
  return {
    id: `welcome-${mod}`,
    role: 'assistant',
    content: `Olá! Sou o **Chameleon Assistant**, especialista em ergonomia digital e arquiteturas de interface adaptativas.

Estou sincronizado em tempo real com o **${getModuleName(mod)}** ativo no seu Simulador (Densidade: \`${density}\`).

**Sugestões ergonômicas para este módulo:**
${getModuleSpecificRecommendations(mod)}

Como posso ajudar você a redesenhar ou otimizar seu layout corporativo hoje?`,
    timestamp: 'Agora',
    suggestedAction: {
      label: `Ver Layout ${mod.toUpperCase()} no Simulador`,
      moduleId: mod,
      density: density || 'compact'
    }
  };
}

export function ChameleonAssistant({
  currentModule = 'erp',
  onApplyLayoutToSimulator,
}: ChameleonAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  // Active context strictly synced with Real-Time Simulator
  const [simulatorContext, setSimulatorContext] = useState<SimulatorContextState>({
    moduleId: currentModule,
    density: currentModule === 'erp' ? 'compact' : 'standard',
    persona: 'balanced',
    moduleName: getModuleName(currentModule)
  });

  const lastContextRef = useRef<SimulatorContextState>({
    moduleId: currentModule,
    density: currentModule === 'erp' ? 'compact' : 'standard',
    persona: 'balanced'
  });

  const isOpenRef = useRef(isOpen);
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const [messages, setMessages] = useState<Message[]>([
    createWelcomeMessage(currentModule, currentModule === 'erp' ? 'compact' : 'standard')
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Synchronize with Simulator context changes in real time
  useEffect(() => {
    const handleSimulatorContextChange = (e: Event) => {
      const customEvent = e as CustomEvent<SimulatorContextState>;
      if (!customEvent.detail) return;

      const { moduleId, density, persona } = customEvent.detail;
      const prev = lastContextRef.current;

      // Check if context has actually changed
      const moduleChanged = prev.moduleId !== moduleId;
      const densityChanged = prev.density !== density;

      if (!moduleChanged && !densityChanged) return;

      lastContextRef.current = { moduleId, density, persona };
      setSimulatorContext({
        moduleId,
        density,
        persona,
        moduleName: getModuleName(moduleId)
      });

      // Update assistant conversation dynamically
      setMessages((prevMessages) => {
        const hasUserMessages = prevMessages.some((m) => m.role === 'user');

        if (!hasUserMessages) {
          // If conversation has not started yet, replace welcome message with new module context
          return [createWelcomeMessage(moduleId, density)];
        }

        // If conversation has already started, append an alert message showing the context switch
        const contextSwitchMessage: Message = {
          id: `context-switch-${Date.now()}`,
          role: 'assistant',
          content: `🔄 **Contexto do Simulador alterado para ${getModuleName(moduleId)}**

Detectei que você alterou o módulo ativo no Simulador em Tempo Real. Ajustei minhas análises ergonômicas para **${getModuleName(moduleId)}** (Densidade: \`${density}\`, Perfil: \`${persona}\`).

**Sugestões ergonômicas imediatas:**
${getModuleSpecificRecommendations(moduleId)}

Como posso te ajudar a personalizar o fluxo ou os atalhos para este caso de uso?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: {
            label: `Testar Layout ${moduleId.toUpperCase()} no Simulador`,
            moduleId,
            density
          }
        };

        return [...prevMessages, contextSwitchMessage];
      });

      // Trigger unread notification if assistant is closed
      if (!isOpenRef.current) {
        setHasUnread(true);
      }
    };

    window.addEventListener('chameleon-simulator-context-change', handleSimulatorContextChange);

    // Ask simulator for its current state right now
    window.dispatchEvent(new CustomEvent('chameleon-query-simulator-context'));

    return () => {
      window.removeEventListener('chameleon-simulator-context-change', handleSimulatorContextChange);
    };
  }, []);

  const handleSendMessage = async (userText?: string) => {
    const textToSend = userText || inputMessage.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content
          })),
          context: {
            activeModule: simulatorContext.moduleId,
            density: simulatorContext.density,
            persona: simulatorContext.persona,
            viewport: typeof window !== 'undefined' && window.innerWidth < 768 ? 'Mobile / Coletor' : 'Desktop Corporativo'
          }
        })
      });

      if (!response.ok) {
        throw new Error('Falha na resposta do assistente');
      }

      const data = await response.json();
      
      // Determine if a simulator action should be attached
      let suggestedAction: Message['suggestedAction'] = undefined;
      const lowerReply = data.reply.toLowerCase();
      if (lowerReply.includes('erp') || lowerReply.includes('fatur')) {
        suggestedAction = { label: 'Aplicar Layout ERP no Simulador', moduleId: 'erp', density: 'compact' };
      } else if (lowerReply.includes('crm') || lowerReply.includes('venda')) {
        suggestedAction = { label: 'Aplicar Layout CRM no Simulador', moduleId: 'crm', density: 'standard' };
      } else if (lowerReply.includes('bi') || lowerReply.includes('executiv')) {
        suggestedAction = { label: 'Aplicar Layout BI no Simulador', moduleId: 'bi', density: 'spacious' };
      } else if (lowerReply.includes('portal') || lowerReply.includes('web') || lowerReply.includes('checkout')) {
        suggestedAction = { label: 'Aplicar Layout Web no Simulador', moduleId: 'portal', density: 'standard' };
      }

      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `### ⚡ Sugestão de Layout Ergonômico

Para o fluxo ativo de **${getModuleName(simulatorContext.moduleId)}**, recomendamos:

${getModuleSpecificRecommendations(simulatorContext.moduleId)}

*Você pode testar esse layout agora mesmo no Simulador interativo da página.*`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: {
            label: 'Testar no Simulador',
            moduleId: simulatorContext.moduleId,
            density: simulatorContext.density
          }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  // Sync back to simulator when user clicks a module button in the assistant
  const handleSelectModuleFromAssistant = useCallback((mod: ModuleId) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('chameleon-apply-layout', {
          detail: { moduleId: mod }
        })
      );
    }
  }, []);

  const handleApplyLayout = (action: NonNullable<Message['suggestedAction']>) => {
    if (onApplyLayoutToSimulator) {
      onApplyLayoutToSimulator(action.moduleId, action.density);
    } else {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('chameleon-apply-layout', {
            detail: { moduleId: action.moduleId, density: action.density }
          })
        );
      }
      const simEl = document.getElementById('simulador');
      if (simEl) {
        simEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const formatMessageContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ') || line.startsWith('## ')) {
        const headerText = line.replace(/^#{2,3}\s+/, '');
        return (
          <h4 key={idx} className="text-xs sm:text-sm font-bold text-white mt-2.5 mb-1.5 font-display flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            {headerText}
          </h4>
        );
      }
      
      if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
        const itemText = line.trim().replace(/^[-*]\s+/, '');
        return (
          <div key={idx} className="flex items-start gap-1.5 ml-1 my-1 text-slate-200">
            <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
            <span dangerouslySetInnerHTML={{ __html: renderFormattedInline(itemText) }} />
          </div>
        );
      }

      if (/^\d+\.\s+/.test(line.trim())) {
        const itemText = line.trim().replace(/^\d+\.\s+/, '');
        const match = line.trim().match(/^(\d+)\./);
        const number = match ? match[1] : '•';
        return (
          <div key={idx} className="flex items-start gap-1.5 ml-1 my-1 text-slate-200">
            <span className="text-cyan-400 font-mono text-[10px] bg-cyan-950/60 px-1 rounded shrink-0 mt-0.5">
              {number}.
            </span>
            <span dangerouslySetInnerHTML={{ __html: renderFormattedInline(itemText) }} />
          </div>
        );
      }

      if (line.trim() === '') {
        return <div key={idx} className="h-1.5" />;
      }

      return (
        <p key={idx} className="my-1 text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderFormattedInline(line) }} />
      );
    });
  };

  const renderFormattedInline = (str: string) => {
    return str
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-slate-800 text-emerald-300 text-[11px] font-mono border border-slate-700">$1</code>')
      .replace(/\*([^*]+)\*/g, '<em class="text-slate-400 text-xs">$1</em>');
  };

  return (
    <>
      {/* Floating Action Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.95 }}
              className="hidden md:flex items-center gap-2 bg-slate-900/90 text-slate-200 border border-slate-700/80 px-3.5 py-1.5 rounded-full shadow-xl backdrop-blur-md text-xs cursor-pointer hover:border-emerald-500/50 transition-colors"
              onClick={() => {
                setIsOpen(true);
                setHasUnread(false);
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300">
                Simulador: <strong className="text-emerald-300 font-semibold">{simulatorContext.moduleId.toUpperCase()}</strong>
              </span>
              <span className="text-slate-600">|</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">Sugestões com IA</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            setHasUnread(false);
          }}
          aria-label="Abrir Chameleon Assistant"
          className="relative group w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[1.5px] shadow-2xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center transition-colors group-hover:bg-slate-900">
            {isOpen ? (
              <X className="w-6 h-6 text-white transition-transform group-hover:rotate-90 duration-200" />
            ) : (
              <div className="relative flex items-center justify-center">
                <Bot className="w-6 h-6 text-emerald-400 transition-colors group-hover:text-cyan-300" />
                {hasUnread && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950 animate-ping" />
                )}
                {hasUnread && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 border-2 border-slate-950" />
                )}
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Floating Chat Modal Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[430px] max-h-[82vh] h-[600px] flex flex-col rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl shadow-black/70 backdrop-blur-xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 p-[1px]">
                  <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                    <Bot className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white font-display">
                      Chameleon Assistant
                    </h3>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      IA Ergonômica
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Sincronizado com o Simulador em Tempo Real
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Minimizar"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Context Sync Indicator Bar */}
            <div className="bg-slate-900/70 px-3 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] shrink-0 gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span className="text-slate-300 font-medium truncate">
                  Simulador: <strong className="text-emerald-400 font-semibold">{simulatorContext.moduleId.toUpperCase()}</strong> ({simulatorContext.density})
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {(['erp', 'crm', 'portal', 'bi'] as ModuleId[]).map((mod) => (
                  <button
                    key={mod}
                    onClick={() => handleSelectModuleFromAssistant(mod)}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase transition-all cursor-pointer ${
                      simulatorContext.moduleId === mod
                        ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                        : 'text-slate-400 hover:text-white bg-slate-800/60'
                    }`}
                    title={`Mudar Simulador para ${mod.toUpperCase()}`}
                  >
                    {mod}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  )}

                  <div className={`max-w-[85%] rounded-2xl p-3.5 shadow-md ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-medium rounded-br-none'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}>
                    {msg.role === 'assistant' ? (
                      formatMessageContent(msg.content)
                    ) : (
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    )}

                    {/* Interactive Button to apply suggestion directly to simulator */}
                    {msg.suggestedAction && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                        <button
                          onClick={() => handleApplyLayout(msg.suggestedAction!)}
                          className="w-full px-3 py-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm"
                        >
                          <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{msg.suggestedAction.label}</span>
                          <ArrowRight className="w-3 h-3 text-emerald-400" />
                        </button>
                      </div>
                    )}

                    <span className="block text-[9px] mt-1.5 text-right opacity-60">
                      {msg.timestamp}
                    </span>
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 rounded-bl-none text-slate-400 text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Analisando ergonomia do {simulatorContext.moduleId.toUpperCase()}...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Context Prompt Suggestions */}
            <div className="px-3 py-2 bg-slate-900/60 border-t border-slate-800/80 shrink-0">
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                <button
                  onClick={() => handleQuickPrompt(`Como otimizar a densidade visual e atalhos de ${simulatorContext.moduleId.toUpperCase()}?`)}
                  className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Building2 className="w-3 h-3 text-sky-400" />
                  <span>Otimizar {simulatorContext.moduleId.toUpperCase()}</span>
                </button>
                <button
                  onClick={() => handleQuickPrompt('Quais atalhos de teclado 1-click reduzem mais cliques diários?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <BarChart3 className="w-3 h-3 text-violet-400" />
                  <span>Atalhos 1-Click</span>
                </button>
                <button
                  onClick={() => handleQuickPrompt('Como o Brand Lock impede alterações indesejadas na identidade da empresa?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Zap className="w-3 h-3 text-amber-400" />
                  <span>Brand Lock</span>
                </button>
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-slate-950 border-t border-slate-800 shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Pergunte sobre layout para ${simulatorContext.moduleId.toUpperCase()}...`}
                  className="flex-1 bg-slate-900 border border-slate-700/80 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none transition-all"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="p-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Sincronizado: {simulatorContext.moduleId.toUpperCase()}
                </span>
                <span>Gemini Ergonomics AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
