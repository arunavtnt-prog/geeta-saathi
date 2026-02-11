/**
 * ExperienceScreen - User's familiarity with Gita
 * Simple 3-option selection for personalization
 */

import React from 'react';
import styles from './ExperienceScreen.module.css';
import { AuthLayout } from '../auth/AuthLayout';

interface ExperienceScreenProps {
  onSelect: (experience: 'new' | 'familiar' | 'advanced') => void;
  language: 'hi' | 'en';
}

const content = {
  en: {
    title: 'How familiar are you with the Gita?',
    subtitle: 'This helps us personalize your experience',
    options: [
      {
        value: 'new',
        icon: '🌱',
        title: 'New to Gita',
        desc: 'Just starting my spiritual journey',
      },
      {
        value: 'familiar',
        icon: '📖',
        title: 'Read some',
        desc: 'Familiar with basic teachings',
      },
      {
        value: 'advanced',
        icon: '🕉️',
        title: 'Know well',
        desc: 'Study Gita regularly',
      },
    ],
  },
  hi: {
    title: 'आप गीता से कितने परिचित हैं?',
    subtitle: 'इससे हम आपके अनुभव को बेहतर बना सकते हैं',
    options: [
      {
        value: 'new',
        icon: '🌱',
        title: 'नये हैं',
        desc: 'अभी-अभी शुरू किया है',
      },
      {
        value: 'familiar',
        icon: '📖',
        title: 'थोड़ा बहुत पढ़ा है',
        desc: 'बुनियादी बातें पता हैं',
      },
      {
        value: 'advanced',
        icon: '🕉️',
        title: 'अच्छे से जानते हैं',
        desc: 'नियमित रूप से पढ़ते हैं',
      },
    ],
  },
};

export const ExperienceScreen: React.FC<ExperienceScreenProps> = ({
  onSelect,
  language,
}) => {
  const t = content[language];

  return (
    <AuthLayout language={language} step={3} totalSteps={5}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>

      {/* Options */}
      <div className={styles.options}>
        {t.options.map((option, index) => (
          <button
            key={option.value}
            className={`${styles.option} animate-slideUp`}
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => onSelect(option.value as any)}
          >
            <span className={styles.icon}>{option.icon}</span>
            <div className={styles.content}>
              <span className={styles.titleText}>{option.title}</span>
              <span className={styles.desc}>{option.desc}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Skip Option */}
      <button
        className={styles.skip}
        onClick={() => onSelect('familiar')}
      >
        {language === 'hi' ? 'बाद में बताएं' : 'Tell later'}
      </button>
    </AuthLayout>
  );
};
