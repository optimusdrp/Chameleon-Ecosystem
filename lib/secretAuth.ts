'use client';

// Key for storage
const SECRET_STORAGE_KEY = 'chameleon_staff_session';
const CLICKS_STORAGE_KEY = 'chameleon_secret_clicks';
const SECRET_WINDOW_MS = 30000; // 30 seconds
const REQUIRED_CLICKS = 5;

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
  loginTime: number;
}

/**
 * Registers a click on the Chameleon logo.
 * If 5 clicks happen in less than 30 seconds, returns true (triggering redirection).
 */
export function registerSecretLogoClick(): { count: number; triggered: boolean } {
  if (typeof window === 'undefined') return { count: 0, triggered: false };

  const now = Date.now();
  let clicks: number[] = [];

  try {
    const raw = sessionStorage.getItem(CLICKS_STORAGE_KEY);
    if (raw) {
      clicks = JSON.parse(raw);
    }
  } catch {
    clicks = [];
  }

  // Filter clicks within the last 30 seconds
  const validClicks = clicks.filter((t) => now - t <= SECRET_WINDOW_MS);
  validClicks.push(now);

  sessionStorage.setItem(CLICKS_STORAGE_KEY, JSON.stringify(validClicks));

  if (validClicks.length >= REQUIRED_CLICKS) {
    sessionStorage.removeItem(CLICKS_STORAGE_KEY);
    return { count: validClicks.length, triggered: true };
  }

  return { count: validClicks.length, triggered: false };
}

/**
 * Checks if current browser session has active staff authentication
 */
export function getStaffSession(): StaffUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(SECRET_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Stores authenticated staff session
 */
export function setStaffSession(user: StaffUser): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SECRET_STORAGE_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('chameleon-staff-auth-change'));
}

/**
 * Clears staff session (logout)
 */
export function clearStaffSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SECRET_STORAGE_KEY);
  window.dispatchEvent(new Event('chameleon-staff-auth-change'));
}
