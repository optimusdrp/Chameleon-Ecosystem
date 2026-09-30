'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Menu, X, Cpu } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { AestheticTheme } from '@/types/theme';
import { registerSecretLogoClick } from '@/lib/secretAuth';

interface NavbarProps {
  onOpenDemoModal: () => void;
  onNavigateToSimulator: () => void;
  currentTheme?: AestheticTheme;
  onThemeChange?: (theme: AestheticTheme) => void;
}

const NAV_ITEMS = [
  { id: 'simulador', label: 'Simulador em Tempo Real', icon: Cpu },
  { id: 'modulos', label: 'Módulos e Contratar' },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'faq', label: 'FAQ', mobileLabel: 'Perguntas Frequentes' },
];

export function Navbar({ 
  onOpenDemoModal, 
  onNavigateToSimulator,
  currentTheme = 'modern-minimalist',
  onThemeChange = () => {}
}: NavbarProps) {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Scroll spy to highlight active link based on current scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // If at top of the page, clear active section
      if (window.scrollY < 220) {
        setActiveSection('');
        return;
      }

      const sectionIds = ['faq', 'como-funciona', 'modulos', 'simulador'];
      const scrollPosition = window.scrollY + 140;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
    setMobileMenuOpen(false);

    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState(null, '', `#${sectionId}`);
    }

    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -80; // Height of the fixed navbar
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    const { triggered } = registerSecretLogoClick();
    if (triggered) {
      e.preventDefault();
      router.push('/restrito');
    } else {
      e.preventDefault();
      setActiveSection('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Chameleon Mark */}
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-3 group select-none cursor-pointer">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-emerald-400 transition-colors duration-500 group-hover:text-cyan-300"
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
                  <path d="M17 14c1 1 2.5 1.5 4 1" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  CHAMELEON
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Ecossistema de Interfaces Adaptativas
              </p>
            </div>
          </a>

          {/* Desktop Nav Links with Active Highlight */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer relative ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 font-semibold shadow-sm shadow-emerald-500/20 ring-1 ring-emerald-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60 font-medium border border-transparent'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />}
                  {isActive && !Icon && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  )}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenDemoModal}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:opacity-95 rounded-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 font-medium cursor-pointer"
            >
              <span>Solicitar Demonstração</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 cursor-pointer"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 bg-slate-900/95 border border-slate-800 rounded-xl backdrop-blur-xl space-y-2 animate-in fade-in slide-in-from-top-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`w-full py-2.5 px-3.5 text-sm rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />}
                    <span>{item.mobileLabel || item.label}</span>
                  </div>
                  {isActive && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Ativo
                    </span>
                  )}
                </a>
              );
            })}

            <div className="pt-2 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDemoModal();
                }}
                className="w-full py-2.5 px-4 text-center text-xs font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg cursor-pointer"
              >
                Solicitar Demonstração Gratuita
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
