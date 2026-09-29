'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Palette, 
  Workflow, 
  CheckCircle2, 
  Zap, 
  Lock,
  Layers,
  Sparkles,
  Smartphone,
  Laptop
} from 'lucide-react';

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: '01',
      title: 'Sensoriamento Ergonômico Zero-PII',
      subtitle: 'Sem ler dados sigilosos ou de negócio',
      description: 'O micro-script Chameleon observa apenas vetores ergonômicos anônimos: botões frequentemente clicados, tempo de rolagem e densidade visual preferida. Nenhuma senha, texto digitado ou dado de cliente sai do navegador.',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      detail: 'Conformidade integral com LGPD e GDPR, operando 100% em sandbox client-side.'
    },
    {
      step: '02',
      title: 'Mapeamento Neural de Afinidade',
      subtitle: 'Identificação preditiva de rotas frequentes',
      description: 'Nosso algoritmo de ergonomia preditiva mapeia a rotina diária do usuário. Se um operador de faturamento emite 40 notas fiscais por hora, a ação de emissão é categorizada como prioritária de alta criticidade.',
      icon: <Cpu className="w-6 h-6 text-sky-400" />,
      detail: 'Mapeia caminhos de menor resistência reduzindo até 58% dos cliques periféricos.'
    },
    {
      step: '03',
      title: 'Micro-Adaptação Não Destrutiva',
      subtitle: 'Transformação visual em menos de 18 milissegundos',
      description: 'O layout se ajusta fluidamente sem quebrar referências visuais que o usuário já conhece. Atalhos essenciais sobem para a barra rápida, tabelas compactam colunas secundárias e o contraste é calibrado para o turno.',
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      detail: 'Transições suaves geradas por CSS GPU-accelerated sem causar repaints pesados.'
    },
    {
      step: '04',
      title: 'Consistência de Marca Multi-Dispositivo',
      subtitle: 'Seu Design System intocado no desktop, tablet e celular',
      description: 'A adaptação respeita rigidamente os Design Tokens da sua empresa (cores primárias, tipografia corporativa e bordas). A marca permanece coesa seja no ERP interno, no CRM de campo ou no portal do cliente.',
      icon: <Palette className="w-6 h-6 text-violet-400" />,
      detail: 'Sincronização instantânea entre telas desktop corporativas e aparelhos móveis operacionais.'
    }
  ];

  return (
    <section id="como-funciona" className="py-24 bg-slate-950 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">
            <Workflow className="w-3.5 h-3.5" />
            <span>Como o Chameleon Opera</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display tracking-tight text-balance">
            Zero código adicional. Inteligência pura de ergonomia.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            Como uma camada inteligente invisível sobre suas aplicações existentes, o Chameleon aprende os padrões de uso e redesenha a interface em tempo real mantendo 100% da integridade da sua marca.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((item, index) => (
            <div
              key={item.step}
              onClick={() => setActiveStep(index)}
              className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                activeStep === index
                  ? 'bg-slate-900 border-emerald-500/50 shadow-xl shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xl font-bold text-slate-500">
                    {item.step}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-800/80">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-emerald-400 font-medium mb-3">
                  {item.subtitle}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{item.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Multi-Device Consistency Assurance Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Laptop className="w-5 h-5" />
                </div>
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Smartphone className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-emerald-400 font-mono">
                  Garantia de Fidelidade Multi-Device
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white font-display">
                A mesma identidade visual. Adaptada a cada formato de tela.
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                Quando um colaborador sai da estação desktop com ERP no depósito e abre a mesma rotina no coletor de dados ou tablet de campo, o Chameleon reconhece a mudança de ambiente físico e expande áreas de toque, sem alterar as cores e normas do seu manual de marca.
              </p>
            </div>

            <div className="lg:col-span-4 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
              <p className="text-xs font-semibold text-white">Auditoria de Marca Contínua:</p>
              
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Tokens de Cor Homologados:</span>
                <span className="text-emerald-400 font-mono font-bold">100% Preservados</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Taxa de Quebra de Layout:</span>
                <span className="text-cyan-400 font-mono font-bold">0.00%</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Modificações no Backend:</span>
                <span className="text-teal-400 font-mono font-bold">Nenhuma</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
