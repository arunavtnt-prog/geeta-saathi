/**
 * AuthContext - Authentication & Onboarding State Management
 * Simple context for demo phase (no backend yet)
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { AuthState, OnboardingData, User } from './types';

interface AuthContextType extends AuthState {
  // Auth Actions
  setPhone: (phone: string) => void;
  setOTP: (otp: string) => void;
  verifyOTP: () => Promise<boolean>;
  resendOTP: () => Promise<void>;

  // Onboarding Actions
  setName: (firstName: string, lastName: string) => void;
  setLanguage: (language: 'hi' | 'en') => void;
  setExperience: (experience: 'new' | 'familiar' | 'advanced') => void;
  setGoal: (goal: string) => void;
  setDailyTime: (minutes: number) => void;
  completeOnboarding: () => void;

  // Navigation
  goToPhone: () => void;
  goToOTP: () => void;
  goToWelcome: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  isAuthenticated: false,
  phone: '',
  otp: '',
  phase: 'welcome',
  onboardingData: {
    firstName: '',
    lastName: '',
    language: 'en',
    experience: 'new',
    goal: '',
    dailyTime: 15,
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    // Check for existing session in localStorage
    const saved = localStorage.getItem('geeta_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  // Persist state to localStorage
  const saveState = (newState: AuthState) => {
    setState(newState);
    localStorage.setItem('geeta_auth', JSON.stringify(newState));
  };

  // Auth Actions
  const setPhone = (phone: string) => {
    saveState({ ...state, phone });
  };

  const setOTP = (otp: string) => {
    saveState({ ...state, otp });
  };

  const verifyOTP = async (): Promise<boolean> => {
    // Demo: Accept any 6-digit OTP
    if (state.otp.length === 6) {
      saveState({
        ...state,
        isAuthenticated: true,
        phase: 'onboarding',
      });
      return true;
    }
    return false;
  };

  const resendOTP = async (): Promise<void> => {
    // Demo: Just a delay to simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // Onboarding Actions
  const setName = (firstName: string, lastName: string) => {
    saveState({
      ...state,
      onboardingData: { ...state.onboardingData, firstName, lastName },
    });
  };

  const setLanguage = (language: 'hi' | 'en') => {
    saveState({
      ...state,
      onboardingData: { ...state.onboardingData, language },
    });
  };

  const setExperience = (experience: 'new' | 'familiar' | 'advanced') => {
    saveState({
      ...state,
      onboardingData: { ...state.onboardingData, experience },
    });
  };

  const setGoal = (goal: string) => {
    saveState({
      ...state,
      onboardingData: { ...state.onboardingData, goal },
    });
  };

  const setDailyTime = (dailyTime: number) => {
    saveState({
      ...state,
      onboardingData: { ...state.onboardingData, dailyTime },
    });
  };

  const completeOnboarding = () => {
    // Create user object
    const user: User = {
      id: Date.now().toString(),
      phone: state.phone,
      firstName: state.onboardingData.firstName,
      lastName: state.onboardingData.lastName,
      language: state.onboardingData.language,
      experience: state.onboardingData.experience,
      goal: state.onboardingData.goal,
      dailyTime: state.onboardingData.dailyTime,
      createdAt: new Date().toISOString(),
    };

    // Save user to localStorage
    localStorage.setItem('geeta_user', JSON.stringify(user));

    // Update state
    saveState({
      ...state,
      phase: 'complete',
      isAuthenticated: true,
    });
  };

  // Navigation
  const goToWelcome = () => saveState({ ...state, phase: 'welcome' });
  const goToPhone = () => saveState({ ...state, phase: 'phone' });
  const goToOTP = () => saveState({ ...state, phase: 'otp' });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setPhone,
        setOTP,
        verifyOTP,
        resendOTP,
        setName,
        setLanguage,
        setExperience,
        setGoal,
        setDailyTime,
        completeOnboarding,
        goToWelcome,
        goToPhone,
        goToOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
