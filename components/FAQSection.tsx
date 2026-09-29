'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Preciso reescrever o código-fonte do meu ERP, CRM ou portal para usar o Chameleon?',
      a: 'Não. O ecossistema Chameleon foi arquitetado especificamente como uma camada inteligente não invasiva (plug-and-play). Ele é acoplado via script leve (< 12KB) ou SDK universal que se sobrepõe à camada de apresentação. O seu backend, APIs, banco de dados e regras de negócio permanecem 100% inalterados.'
    },
    {
      q: 'Posso contratar apenas um módulo agora e adicionar novos módulos posteriormente?',
      a: 'Sim, a arquitetura é totalmente modular e independente. Você pode iniciar, por exemplo, apenas com o Chameleon ERP para otimizar a equipe de faturamento e armazém. Mais adiante, quando desejar estender a adaptação para a equipe de vendas ou portal de clientes, basta ativar o módulo respectivo com ativação instantânea.'
    },
    {
      q: 'Como o Chameleon garante que a identidade da minha marca não será descaracterizada?',
      a: 'O Chameleon trabalha com um sistema de travas de Design Tokens da sua organização. O algoritmo ajusta apenas níveis ergonômicos (densidade, contraste relativo, hierarquia de atalhos e disposição de botões). As cores institucionais, famílias tipográficas e logotipos são imutáveis e protegidos pelo motor de governança de marca.'
    },
    {
      q: 'Como o Chameleon lida com privacidade de dados e conformidade com a LGPD/GDPR?',
      a: 'Nenhum dado pessoal (PII) ou informação comercial confidencial é capturado, transmitido ou armazenado em servidores externos. O motor de telemetria opera de forma estritamente ergonômica e no navegador do cliente (client-side), computando apenas métricas anônimas como frequência de clique em seletores e tempo de foco.'
    },
    {
      q: 'Qual é o tempo médio de implementação de cada módulo?',
      a: 'A maior parte dos módulos (como Chameleon Web e Chameleon CRM) fica operacional em menos de 24 horas. Para ERPs corporativos com telas mais complexas de estoque ou faturamento (SAP, TOTVS, Sankhya), o setup de homologação é concluído em até 48 horas úteis.'
    },
    {
      q: 'E se um colaborador não quiser que a interface mude automaticamente?',
      a: 'O Chameleon oferece total controle de governança. O usuário ou gestor de equipe pode fixar layouts (travar modo clássico), alternar manualmente entre perfis pré-definidos (Power User, Minimalista, Alto Contraste) ou redefinir a telemetria com 1 clique a qualquer momento.'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-950 border-t border-white/10 relative overflow-hidden w-full max-w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-display tracking-tight text-balance">
            Perguntas Frequentes sobre o Chameleon
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Entenda como nossa tecnologia modular se integra às suas operações com total segurança e zero atrito técnico.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 transition-colors overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white font-display leading-snug">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-slate-800 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
