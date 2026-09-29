'use client';

import React from 'react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenDemoModal: () => void;
  onNavigateToSimulator: () => void;
}

export function Footer({ onOpenDemoModal, onNavigateToSimulator }: FooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-emerald-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0.2" />
                    <path d="M7 14c1.5 2 4.5 3 7 1.5s3.5-4 1.5-6.5-5-2-7 0" />
                    <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                    <path d="M16 8c1-1 3-1 4 0" />
                  </svg>
                </div>
              </div>
              <span className="text-lg font-bold text-white font-display tracking-tight">
                CHAMELEON
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Ecossistema de módulos plug-and-play que aprende padrões ergonômicos e adapta layouts, atalhos e paletas em tempo real em ERPs, CRMs, portais e ferramentas digitais.
            </p>

            <div className="flex items-center gap-2 text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Conformidade com a LGPD · Telemetria Zero-PII</span>
            </div>
          </div>

          {/* Column 2: Módulos */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Módulos
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#modulos" className="hover:text-emerald-400 transition-colors">
                  Chameleon ERP Suite
                </a>
              </li>
              <li>
                <a href="#modulos" className="hover:text-emerald-400 transition-colors">
                  Chameleon CRM Sales
                </a>
              </li>
              <li>
                <a href="#modulos" className="hover:text-emerald-400 transition-colors">
                  Chameleon Web & Portais
                </a>
              </li>
              <li>
                <a href="#modulos" className="hover:text-emerald-400 transition-colors">
                  Chameleon Analytics & BI
                </a>
              </li>
              <li>
                <a href="#modulos" className="hover:text-emerald-400 transition-colors">
                  Chameleon Core SDK Universal
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Solução */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Recursos
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onNavigateToSimulator}
                  className="hover:text-emerald-400 transition-colors text-left"
                >
                  Simulador Interativo
                </button>
              </li>
              <li>
                <a href="#como-funciona" className="hover:text-emerald-400 transition-colors">
                  Motor de Afinidade
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  Perguntas Frequentes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Demonstração */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Contato Corporativo
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deseja homologar o Chameleon nas interfaces da sua empresa?
            </p>
            <button
              onClick={onOpenDemoModal}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span>Solicitar Demonstração</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Chameleon Ecosystem. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <span>Privacidade & LGPD</span>
            <span>Segurança da Apresentação</span>
            <span>Termos de Uso</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
