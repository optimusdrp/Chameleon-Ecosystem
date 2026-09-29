'use client';

import React from 'react';
import { Building2, TrendingUp, Quote, CheckCircle, ArrowRight } from 'lucide-react';

export function CaseStudies() {
  const cases = [
    {
      company: 'Logística TransBrasil S/A',
      segment: 'Transporte & Centros de Distribuição',
      moduleUsed: 'Chameleon ERP Suite',
      quote: 'Nossos operadores de armazém passavam o dia clicando em abas minúsculas em um ERP antigo. Com o Chameleon, os 4 botões que eles mais usam agora aparecem automaticamente no topo e em tamanho ideal para o coletor. Cortamos 35% do tempo de cada expedição.',
      author: 'Carlos Eduardo Mendes',
      role: 'Diretor de Operações e TI',
      stats: [
        { label: 'Tempo de Expedição', value: '-35%' },
        { label: 'Erros de Separação', value: '-62%' },
        { label: 'Usuários Ativos', value: '1.400+' }
      ]
    },
    {
      company: 'PayFlex FinTech Solutions',
      segment: 'Meios de Pagamento & B2B',
      moduleUsed: 'Chameleon CRM Sales',
      quote: 'O time de vendas gastava horas preenchendo relatórios após reuniões. O módulo de CRM adaptou a tela para cada vendedor com base em como eles fecham contas. Quem prefere WhatsApp tem atalhos diretos, quem usa ligação tem discador nativo.',
      author: 'Renata Vasconcellos',
      role: 'Head de Revenue Operations',
      stats: [
        { label: 'Aumento em Vendas', value: '+31%' },
        { label: 'Adesão ao CRM', value: '98.5%' },
        { label: 'Ciclo de Vendas', value: '-10 dias' }
      ]
    },
    {
      company: 'Grupo Casa & Conforto',
      segment: 'E-Commerce B2B e Lojas Físicas',
      moduleUsed: 'Chameleon Web & Portais',
      quote: 'Nossos lojistas compravam sempre os mesmos itens, mas precisavam pesquisar no catálogo inteiro de 15.000 SKUs todo mês. A vitrine agora se reconstrói no primeiro segundo em que o lojista loga, colocando o botão de reposição rápida em evidência.',
      author: 'Guilherme Sampaio',
      role: 'Chief Digital Officer',
      stats: [
        { label: 'Conversão B2B', value: '+28.4%' },
        { label: 'Recompra Rápida', value: '3.2x maior' },
        { label: 'Chamados no Suporte', value: '-48%' }
      ]
    }
  ];

  return (
    <section className="py-24 bg-slate-950 border-t border-white/10 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Casos de Sucesso Reais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display tracking-tight text-balance">
            Resultados comprovados em operações de alta complexidade
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Veja como empresas líderes usam os módulos Chameleon para resgatar horas de produtividade e garantir fidelidade de marca sem reescrever sistemas.
          </p>
        </div>

        {/* Case Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((cs, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between shadow-xl relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 mb-4 border-b border-slate-800">
                  <span className="font-semibold text-emerald-400 font-mono">{cs.moduleUsed}</span>
                  <span>{cs.segment}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 font-display">
                  {cs.company}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{cs.quote}&rdquo;
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-slate-950 rounded-xl border border-slate-800 mb-6">
                  {cs.stats.map((st, i) => (
                    <div key={i} className="text-center">
                      <p className="text-base font-bold text-white font-mono tabular-nums">{st.value}</p>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{st.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{cs.author}</p>
                  <p className="text-[11px] text-slate-400">{cs.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
