'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { AdaptiveSimulator } from '@/components/AdaptiveSimulator';
import { ModulesGrid } from '@/components/ModulesGrid';
import { HowItWorks } from '@/components/HowItWorks';
// ModuleConfigurator (Calculadora de ROI) temporarily disabled per request
// import { ModuleConfigurator } from '@/components/ModuleConfigurator';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { LeadModal } from '@/components/LeadModal';
import { ChameleonAssistant } from '@/components/ChameleonAssistant';
import { AdaptationToast } from '@/components/AdaptationToast';
import { ModuleId } from '@/types/chameleon';
import { AestheticTheme } from '@/types/theme';

export default function Home() {
  const currentTheme: AestheticTheme = 'modern-minimalist';
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedModuleForModal, setSelectedModuleForModal] = useState<ModuleId | undefined>(undefined);
  const [selectedModulesForModal, setSelectedModulesForModal] = useState<ModuleId[]>(['erp', 'crm']);
  const [selectedUsersCount] = useState<number>(50);
  const [selectedModule, setSelectedModule] = useState<ModuleId>('erp');
  const [isAdapting, setIsAdapting] = useState<boolean>(false);

  // Synchronize document attribute with original theme and clear any leftover contrast setting
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chameleon-theme');
    }
    document.documentElement.setAttribute('data-aesthetic-theme', 'modern-minimalist');
  }, []);

  const handleThemeChange = (newTheme: AestheticTheme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chameleon-theme', newTheme);
      document.documentElement.setAttribute('data-aesthetic-theme', newTheme);
      window.dispatchEvent(new Event('chameleon-theme-change'));
    }
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('simulador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLeadModal = (moduleId?: ModuleId) => {
    setSelectedModuleForModal(moduleId);
    if (moduleId) {
      setSelectedModulesForModal([moduleId]);
    }
    setLeadModalOpen(true);
  };

  const handleSelectModule = (moduleId: ModuleId) => {
    setSelectedModule(moduleId);
  };

  const handleTriggerAdaptation = (targetModule?: ModuleId) => {
    const mod = targetModule || selectedModule;
    setSelectedModule(mod);
    setIsAdapting(true);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('chameleon-trigger-adaptation', {
          detail: { moduleId: mod }
        })
      );
      window.dispatchEvent(
        new CustomEvent('chameleon-simulator-context-change', {
          detail: { moduleId: mod }
        })
      );
    }

    setTimeout(() => {
      setIsAdapting(false);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('chameleon-adaptation-completed', {
            detail: {
              moduleId: mod,
              timestamp: Date.now()
            }
          })
        );
      }
    }, 1800);
  };

  const handleSelectModuleForSimulator = (moduleId: ModuleId) => {
    handleSelectModule(moduleId);
    scrollToSimulator();
    handleTriggerAdaptation(moduleId);
  };

  const handleApplyLayoutFromAssistant = (moduleId: ModuleId) => {
    handleSelectModule(moduleId);
    scrollToSimulator();
    handleTriggerAdaptation(moduleId);
  };

  return (
    <main 
      data-aesthetic-theme="modern-minimalist"
      className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-950 text-slate-100 selection:bg-emerald-500/25 selection:text-emerald-300 transition-colors duration-500"
    >
      {/* Navigation */}
      <Navbar
        onOpenDemoModal={() => handleOpenLeadModal()}
        onNavigateToSimulator={scrollToSimulator}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
      />

      {/* Hero Section with Telemetria em Tempo Real */}
      <Hero
        onOpenDemoModal={() => handleOpenLeadModal()}
        onNavigateToSimulator={scrollToSimulator}
        currentTheme={currentTheme}
        selectedModule={selectedModule}
        onSelectModule={handleSelectModule}
        isAdapting={isAdapting}
        onTriggerAdaptation={handleTriggerAdaptation}
      />

      {/* Centerpiece: Interactive Adaptive Simulator */}
      <AdaptiveSimulator
        onOpenLeadModal={handleOpenLeadModal}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        selectedModule={selectedModule}
        onSelectModule={handleSelectModule}
        isAdapting={isAdapting}
        onTriggerAdaptation={handleTriggerAdaptation}
      />

      {/* Unified Plug-and-Play Modules & Contracting Section */}
      <ModulesGrid
        onSelectModuleForSimulator={handleSelectModuleForSimulator}
        onOpenLeadModal={handleOpenLeadModal}
        selectedModules={selectedModulesForModal}
      />

      {/* How It Works (Adaptive Architecture) */}
      <HowItWorks />

      {/* Interactive FAQ */}
      <FAQSection />

      {/* Footer */}
      <Footer
        onOpenDemoModal={() => handleOpenLeadModal()}
        onNavigateToSimulator={scrollToSimulator}
      />

      {/* Lead Capture & Blueprint Modal */}
      <LeadModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        preSelectedModule={selectedModuleForModal}
        preSelectedModules={selectedModulesForModal}
        preSelectedUsers={selectedUsersCount}
      />

      {/* Floating Action Button & Chameleon Assistant Chat */}
      <ChameleonAssistant
        currentModule={selectedModule}
        onApplyLayoutToSimulator={handleApplyLayoutFromAssistant}
      />

      {/* Real-time Layout Adaptation Success Feedback Toast */}
      <AdaptationToast />
    </main>
  );
}
