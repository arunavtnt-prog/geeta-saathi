/**
 * Authentication & Onboarding Types
 */

export interface AuthState {
  /* Auth Phase */
  isAuthenticated: boolean;
  phone: string;
  otp: string;
  phase: 'welcome' | 'phone' | 'otp' | 'onboarding' | 'complete';

  /* Onboarding Data */
  onboardingData: OnboardingData;
}

export interface OnboardingData {
  firstName: string;
  lastName: string;
  language: 'hi' | 'en';
  experience: 'new' | 'familiar' | 'advanced';
  goal: string;
  dailyTime: number;
}

export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName?: string;
  language: 'hi' | 'en';
  experience: 'new' | 'familiar' | 'advanced';
  goal: string;
  dailyTime: number;
  createdAt: string;
}
