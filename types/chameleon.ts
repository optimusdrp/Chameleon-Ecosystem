export type ModuleId = 'portal' | 'erp' | 'crm' | 'bi' | 'sdk';

export interface ChameleonModule {
  id: ModuleId;
  name: string;
  tagline: string;
  description: string;
  category: string;
  recommendedFor: string;
  setupTime: string;
  badge: string;
  accentColor: string;
  accentBg: string;
  accentBorder: string;
  features: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  priceEstimatePerUserMonth: number;
}

export type UserPersona = 'balanced' | 'power_user' | 'minimalist' | 'high_contrast' | 'executive';

export interface PersonaConfig {
  id: UserPersona;
  name: string;
  label: string;
  description: string;
  density: 'compact' | 'standard' | 'spacious';
  primaryPalette: string;
  shortcutsStyle: string;
  layoutEmphasis: string;
  shortcutHighlights: string[];
}

export interface SimulationState {
  activeModule: ModuleId;
  persona: UserPersona;
  density: 'compact' | 'standard' | 'spacious';
  adaptationLevel: number; // 0 to 100%
  adaptiveTelemetryClicks: number;
  recentActionName: string | null;
  promotedShortcuts: string[];
  isAdapting: boolean;
  autoAdaptEnabled: boolean;
}

export interface LeadFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  segment: string;
  teamSize: string;
  selectedModules: ModuleId[];
  notes?: string;
}
