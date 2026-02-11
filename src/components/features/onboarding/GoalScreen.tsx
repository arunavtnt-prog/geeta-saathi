/**
 * GoalScreen - User's primary goal for using the app
 * Helps personalize recommendations
 */

import React from 'react';
import styles from './GoalScreen.module.css';
import { AuthLayout } from '../auth/AuthLayout';

interface GoalScreenProps {
  onSelect: (goal: string) => void;
  language: 'hi' | 'en';
}

const content = {
  en: {
    title: 'What brings you here?',
    subtitle: 'Choose what matters most to you',
    options: [
      {
        value: 'learning',
        icon: '📚',
        title: 'Daily Learning',
        desc: 'Structured Gita lessons every day',
      },
      {
        value: 'peace',
        icon: '☮️',
        title: 'Peace of Mind',
        desc: 'Calm and reduce stress',
      },
      {
        value: 'guidance',
        icon: '💡',
        title: 'Life Guidance',
        desc: 'Answers to life\'s questions',
      },
      {
        value: 'all',
        icon: '🌟',
        title: 'All of Above',
        desc: 'Complete spiritual experience',
      },
    ],
  },
  hi: {
    title: 'आप यहाँ क्यों आए हैं?',
    subtitle: 'अपना मुख्य उद्देश्य चुनें',
    options: [
      {
        value: 'learning',
        icon: '📚',
        title: 'दैनिक अध्ययन',
        desc: 'रोज़ गीता के पाठ',
      },
      {
        value: 'peace',
        icon: '☮️',
        title: 'मन की शांति',
        desc: 'तनाव कम करना',
      },
      {
        value: 'guidance',
        icon: '💡',
        title: 'जीवन मार्गदर्शन',
        desc: 'जीवन के सवालों के जवाब',
      },
      {
        value: 'all',
        icon: '🌟',
        title: 'सब कुछ',
        desc: 'पूरा आध्यात्मिक अनुभव',
      },
    ],
  },
};

export const GoalScreen: React.FC<GoalScreenProps> = ({ onSelect, language }) => {
  const t = content[language];

  return (
    <AuthLayout language={language} step={4} totalSteps={5}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>

      {/* Options Grid */}
      <div className={styles.options}>
        {t.options.map((option) => (
          <button
            key={option.value}
            className={styles.option}
            onClick={() => onSelect(option.value)}
          >
            <span className={styles.icon}>{option.icon}</span>
            <span className={styles.optionTitle}>{option.title}</span>
            <span className={styles.optionDesc}>{option.desc}</span>
          </button>
        ))}
      </div>

      {/* Skip Option */}
      <button
        className={styles.skip}
        onClick={() => onSelect('all')}
      >
        {language === 'hi' ? 'बाद में बताएं' : 'Tell later'}
      </button>
    </AuthLayout>
  );
};
