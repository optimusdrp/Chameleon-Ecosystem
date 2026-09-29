export type AestheticTheme = 'modern-minimalist' | 'high-contrast' | 'ocean-blue' | 'cyber-violet';

export interface ThemeConfig {
  id: AestheticTheme;
  name: string;
  shortName: string;
  tagline: string;
  dotColor: string;
  primaryColorName: string;
  accentGradient: string;
  bgClass: string;
  glowGradient: string;
  badgeStyle: string;
  borderStyle: string;
  textColor: string;
}

export const THEME_CONFIGS: Record<AestheticTheme, ThemeConfig> = {
  'modern-minimalist': {
    id: 'modern-minimalist',
    name: 'Modern Minimalist',
    shortName: 'Minimalist',
    tagline: 'Ardósia escura, esmeralda neural e ergonomia corporativa balanceada',
    dotColor: '#10b981',
    primaryColorName: 'Esmeralda & Ciano',
    accentGradient: 'from-emerald-400 via-teal-400 to-cyan-400',
    bgClass: 'bg-slate-950',
    glowGradient: 'from-emerald-500/15 via-teal-500/10 to-cyan-500/15',
    badgeStyle: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    borderStyle: 'border-slate-800',
    textColor: 'text-emerald-400'
  },
  'high-contrast': {
    id: 'high-contrast',
    name: 'High Contrast',
    shortName: 'Alto Contraste',
    tagline: 'OLED preto absoluto, acentos em ouro/âmbar e máxima legibilidade industrial',
    dotColor: '#f59e0b',
    primaryColorName: 'Âmbar & Dourado',
    accentGradient: 'from-amber-400 via-yellow-400 to-amber-500',
    bgClass: 'bg-black',
    glowGradient: 'from-amber-500/20 via-yellow-500/10 to-amber-600/15',
    badgeStyle: 'bg-amber-500/15 text-amber-300 border-amber-500/40',
    borderStyle: 'border-amber-500/30',
    textColor: 'text-amber-400'
  },
  'ocean-blue': {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    shortName: 'Ocean Blue',
    tagline: 'Azul-marinho profundo com acentos ciano e azul royal executivo',
    dotColor: '#0ea5e9',
    primaryColorName: 'Ciano & Azul Royal',
    accentGradient: 'from-cyan-400 via-sky-400 to-blue-500',
    bgClass: 'bg-[#020617]',
    glowGradient: 'from-sky-500/20 via-cyan-500/15 to-blue-600/15',
    badgeStyle: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    borderStyle: 'border-blue-900/60',
    textColor: 'text-sky-400'
  },
  'cyber-violet': {
    id: 'cyber-violet',
    name: 'Cyber Violet',
    shortName: 'Cyber Violet',
    tagline: 'Profundidade espacial com acentos neon magenta e violeta tech',
    dotColor: '#a855f7',
    primaryColorName: 'Magenta & Violeta',
    accentGradient: 'from-fuchsia-400 via-violet-400 to-indigo-400',
    bgClass: 'bg-[#070210]',
    glowGradient: 'from-fuchsia-500/20 via-violet-500/15 to-purple-600/15',
    badgeStyle: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    borderStyle: 'border-purple-900/60',
    textColor: 'text-purple-400'
  }
};
