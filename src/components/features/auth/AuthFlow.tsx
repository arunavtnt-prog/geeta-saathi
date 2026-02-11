/**
 * AuthFlow - Main authentication and onboarding orchestrator
 * Routes between all auth and onboarding screens
 */

import React from 'react';
import { useAuth } from '../../../lib/auth/AuthContext';

// Auth Screens
import { WelcomeScreen } from './WelcomeScreen';
import { PhoneInputScreen } from './PhoneInputScreen';
import { OTPScreen } from './OTPScreen';

// Onboarding Screens
import { NameScreen } from '../onboarding/NameScreen';
import { LanguageScreen } from '../onboarding/LanguageScreen';
import { ExperienceScreen } from '../onboarding/ExperienceScreen';
import { GoalScreen } from '../onboarding/GoalScreen';
import { TimeCommitmentScreen } from '../onboarding/TimeCommitmentScreen';

export const AuthFlow: React.FC = () => {
  const auth = useAuth();

  // Based on phase, render appropriate screen
  switch (auth.phase) {
    case 'welcome':
      return (
        <WelcomeScreen
          language={auth.onboardingData.language}
          onLanguageChange={(lang) => {
            auth.setLanguage(lang);
          }}
          onStart={auth.goToPhone}
        />
      );

    case 'phone':
      return (
        <PhoneInputScreen
          language={auth.onboardingData.language}
          onBack={auth.goToWelcome}
          onSubmit={(phone) => {
            auth.setPhone(phone);
            auth.goToOTP();
          }}
        />
      );

    case 'otp':
      return (
        <OTPScreen
          phone={auth.phone}
          language={auth.onboardingData.language}
          onBack={auth.goToPhone}
          onResend={auth.resendOTP}
          onSubmit={async (otp) => {
            auth.setOTP(otp);
            const success = await auth.verifyOTP();
            if (!success) {
              // Error handling would go here
              console.error('OTP verification failed');
            }
          }}
        />
      );

    case 'onboarding':
      // Check onboarding progress to determine which screen to show
      return <OnboardingFlow />;

    default:
      return null; // Will be handled by App component
  }
};

// Onboarding sub-flow based on what's been filled
const OnboardingFlow: React.FC = () => {
  const auth = useAuth();
  const { firstName, language, experience, goal, dailyTime } = auth.onboardingData;

  // Progress through onboarding based on what's filled
  if (!firstName) {
    return (
      <NameScreen
        language={language}
        onSubmit={(first, last) => {
          auth.setName(first, last);
        }}
      />
    );
  }

  if (!experience) {
    return (
      <ExperienceScreen
        language={language}
        onSelect={(exp) => {
          auth.setExperience(exp);
        }}
      />
    );
  }

  if (!goal) {
    return (
      <GoalScreen
        language={language}
        onSelect={(g) => {
          auth.setGoal(g);
        }}
      />
    );
  }

  return (
    <TimeCommitmentScreen
      language={language}
      onSelect={(minutes) => {
        auth.setDailyTime(minutes);
        auth.completeOnboarding();
      }}
    />
  );
};
