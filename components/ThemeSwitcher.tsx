'use client';

import { AestheticTheme } from '@/types/theme';

interface ThemeSwitcherProps {
  currentTheme?: AestheticTheme;
  onThemeChange?: (theme: AestheticTheme) => void;
  variant?: 'popover' | 'segmented' | 'compact';
  className?: string;
}

/**
 * ThemeSwitcher component - hidden per user request.
 * Returns null to prevent rendering in the DOM.
 */
export function ThemeSwitcher({}: ThemeSwitcherProps) {
  return null;
}
