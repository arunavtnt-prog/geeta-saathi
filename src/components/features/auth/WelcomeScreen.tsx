/**
 * WelcomeScreen - Entry point with value proposition
 * Simple, warm, culturally relevant for 40+ Indian users
 */

import React from 'react';
import styles from './WelcomeScreen.module.css';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../ui/Button';

interface WelcomeScreenProps {
  onStart: () => void;
  language: 'hi' | 'en';
  onLanguageChange: (lang: 'hi' | 'en') => void;
}

const content = {
  en: {
    greeting: 'Namaste',
    title: 'Begin Your Spiritual Journey',
    subtitle: 'Learn the Bhagavad Gita through audio, daily practice, and guidance',
    features: [
      { icon: '🎧', text: 'Audio chapters & lessons' },
      { icon: '🙏', text: 'Daily verse & practice' },
      { icon: '🤖', text: 'AI spiritual guide' },
      { icon: '🏛️', text: 'Live temple darshan' },
    ],
    cta: 'Get Started',
    trustNote: 'Free forever • No credit card needed',
  },
  hi: {
    greeting: 'नमस्ते',
    title: 'अपनी आध्यात्मिक यात्रा शुरू करें',
    subtitle: 'ऑडियो, दैनिक अभ्यास और मार्गदर्शन के साथ भगवद्गीता सीखें',
    features: [
      { icon: '🎧', text: 'ऑडियो अध्याय और पाठ' },
      { icon: '🙏', text: 'दैनिक श्लोक और अभ्यास' },
      { icon: '🤖', text: 'आध्यात्मिक मार्गदर्शन' },
      { icon: '🏛️', text: 'मंदिर दर्शन' },
    ],
    cta: 'शुरू करें',
    trustNote: 'हमेशा मुफ़्त • कोई क्रेडिट कार्ड नहीं',
  },
};

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  language,
  onLanguageChange,
}) => {
  const t = content[language];

  return (
    <AuthLayout language={language} onLanguageChange={onLanguageChange}>
      {/* Greeting */}
      <div className={styles.greeting}>{t.greeting}</div>

      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoRing}>
          <span className={styles.logoIcon}>ॐ</span>
        </div>
      </div>

      {/* Title */}
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>

      {/* Features Grid */}
      <div className={styles.features}>
        {t.features.map((feature, index) => (
          <div
            key={index}
            className={`${styles.feature} animate-slideUp`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className={styles.featureIcon}>{feature.icon}</span>
            <span className={styles.featureText}>{feature.text}</span>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <Button
        variant="sacred"
        size="lg"
        fullWidth
        onClick={onStart}
        className={styles.cta}
      >
        {t.cta}
      </Button>

      {/* Trust Note */}
      <p className={styles.trustNote}>{t.trustNote}</p>
    </AuthLayout>
  );
};
