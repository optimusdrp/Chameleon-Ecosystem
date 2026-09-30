'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  MessageSquare,
  Send,
  Check,
  CheckCheck,
  Search,
  Phone,
  Building2,
  User,
  ExternalLink,
  Clock,
  Sparkles,
  ShieldCheck,
  ArrowLeft,
  CircleDot
} from 'lucide-react';
import { 
  ClientConversation, 
  sendChatMessage 
} from '@/lib/clientChat';

interface ClientChatTabProps {
  conversations: ClientConversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  staffName?: string;
  onOpenContractDetails?: (clientId: string) => void;
}

export function ClientChatTab({
  conversations,
  activeConversationId,
  onSelectConversation,
  staffName = 'Equipe Chameleon',
  onOpenContractDetails
}: ClientChatTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [inputText, setInputText] = useState('');
  const [isClientTyping, setIsClientTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        c.clientName.toLowerCase().includes(q) ||
        c.companyName.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.messages.some((m) => m.text.toLowerCase().includes(q))
      );
    });
  }, [conversations, searchQuery]);

  // Active conversation object
  const activeConversation = useMemo(() => {
    if (!activeConversationId) {
      return filteredConversations[0] || null;
    }
    return conversations.find((c) => c.id === activeConversationId) || filteredConversations[0] || null;
  }, [conversations, activeConversationId, filteredConversations]);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    const text = inputText.trim();
    setInputText('');
    sendChatMessage(activeConversation.id, text, 'staff', staffName);

    // Show simulated typing after a brief moment
    setTimeout(() => {
      setIsClientTyping(true);
      setTimeout(() => {
        setIsClientTyping(false);
      }, 1400);
    }, 400);
  };

  const handleInsertQuickTemplate = (templateText: string) => {
    if (!activeConversation) return;
    setInputText(templateText);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row h-[720px] max-h-[85vh]">
      
      {/* ======================================================== */}
      {/* LEFT COLUMN: CONVERSATION LIST                           */}
      {/* ======================================================== */}
      <div className={`w-full lg:w-80 lg:shrink-0 border-r border-slate-800 flex flex-col bg-slate-950/60 ${
        activeConversation ? 'hidden lg:flex' : 'flex'
      }`}>
        
        {/* Search & Header */}
        <div className="p-4 border-b border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-sm text-white font-display">
                WhatsApp Clientes
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-emerald-400 border border-slate-800">
              {conversations.length} canais
            </span>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar cliente ou empresa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 font-sans"
            />
          </div>
        </div>

        {/* Conversation List Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              Nenhuma conversa localizada com esse termo.
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isSelected = activeConversation?.id === conv.id;
              const lastMessage = conv.messages[conv.messages.length - 1];

              return (
                <button
                  key={conv.id}
                  onClick={() => onSelectConversation(conv.id)}
                  className={`w-full text-left p-3.5 transition-all flex items-start gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-l-2 border-emerald-400'
                      : 'hover:bg-slate-900/40 text-slate-300'
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center font-bold text-xs text-emerald-300 border border-slate-700 shadow-sm">
                      {conv.clientName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-xs text-white truncate max-w-[130px]">
                        {conv.clientName}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0">
                        {conv.lastMessageAt}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate">{conv.companyName}</span>
                    </p>

                    {lastMessage && (
                      <p className="text-[11px] text-slate-500 truncate mt-1 font-sans">
                        {lastMessage.sender === 'staff' ? 'Você: ' : ''}
                        {lastMessage.text}
                      </p>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

      </div>

      {/* ======================================================== */}
      {/* RIGHT COLUMN: ACTIVE CHAT THREAD                         */}
      {/* ======================================================== */}
      {activeConversation ? (
        <div className="flex-1 flex flex-col bg-slate-950/40 min-w-0">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Back button for mobile */}
              <button
                onClick={() => onSelectConversation('')}
                className="lg:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-teal-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center font-bold text-xs text-emerald-400 shrink-0">
                {activeConversation.clientName.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white truncate">
                    {activeConversation.clientName}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hidden sm:inline-block">
                    ● WhatsApp Conectado
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-slate-400 truncate">
                  <span className="text-slate-300 font-medium">{activeConversation.companyName}</span>
                  <span>·</span>
                  <span className="font-mono text-emerald-400">{activeConversation.phone}</span>
                  {activeConversation.status && (
                    <>
                      <span>·</span>
                      <span className="text-cyan-400">{activeConversation.status}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {onOpenContractDetails && activeConversation.clientId.startsWith('CTR') && (
                <button
                  onClick={() => onOpenContractDetails(activeConversation.clientId)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono hidden md:flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Ver Ficha Contrato</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </button>
              )}

              <a
                href={`https://wa.me/55${activeConversation.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir no aplicativo WhatsApp Web externo"
                className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/60 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp Web</span>
              </a>
            </div>
          </div>

          {/* Quick Response Template Pills */}
          <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
            <span className="text-slate-500 font-mono shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Respostas Rápidas:
            </span>

            <button
              onClick={() => handleInsertQuickTemplate(
                `Olá ${activeConversation.clientName}! Seu ambiente de setup técnico está pronto para homologação. Acesse o link seguro: https://chameleon.systems/setup?contract=${activeConversation.clientId}`
              )}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-emerald-500/30 shrink-0 transition-colors cursor-pointer"
            >
              🔗 Enviar Link de Setup
            </button>

            <button
              onClick={() => handleInsertQuickTemplate(
                `Confirmamos que a integração com o conector legado foi homologada com sucesso e latência inferior a 15ms. Podemos liberar o acesso para todos os operadores corporativos?`
              )}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-emerald-500/30 shrink-0 transition-colors cursor-pointer"
            >
              ✅ Homologação Concluída
            </button>

            <button
              onClick={() => handleInsertQuickTemplate(
                `Olá! Para darmos continuidade ao provisionamento do cluster dedicado, precisamos do token de conexão da API do seu software legado.`
              )}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-emerald-500/30 shrink-0 transition-colors cursor-pointer"
            >
              🔑 Solicitar Token de API
            </button>
          </div>

          {/* Message Thread Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {activeConversation.messages.map((msg) => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <span className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400 flex items-center gap-1.5 shadow-sm">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {msg.text}
                    </span>
                  </div>
                );
              }

              const isStaff = msg.sender === 'staff';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isStaff ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-md ${
                      isStaff
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-tr-xs'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className={`text-[10px] font-bold font-mono ${isStaff ? 'text-emerald-200' : 'text-emerald-400'}`}>
                        {isStaff ? 'Você (Engenharia Chameleon)' : msg.senderName}
                      </span>
                    </div>

                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] font-mono opacity-80">
                      <span>{msg.timestamp}</span>
                      {isStaff && (
                        <span>
                          {msg.status === 'read' ? (
                            <CheckCheck className="w-3 h-3 text-cyan-200 inline" />
                          ) : (
                            <Check className="w-3 h-3 text-emerald-200 inline" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {isClientTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 w-fit">
                <span className="font-semibold text-emerald-400 text-xs">{activeConversation.clientName}</span>
                <span>está digitando...</span>
                <span className="inline-flex gap-1 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form 
            onSubmit={handleSendMessage}
            className="p-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={`Enviar mensagem no WhatsApp para ${activeConversation.clientName}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:hover:bg-emerald-500 text-slate-950 font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Enviar</span>
            </button>
          </form>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500">
          <div className="space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs">Selecione uma conversa ao lado para visualizar as mensagens.</p>
          </div>
        </div>
      )}

    </div>
  );
}
