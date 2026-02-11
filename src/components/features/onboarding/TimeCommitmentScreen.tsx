/**
 * TimeCommitmentScreen - Daily time preference for practice
 * Helps set reminders and personalize content
 */

import React from 'react';
import styles from './TimeCommitmentScreen.module.css';
import { AuthLayout } from '../auth/AuthLayout';
import { Button } from '../../ui/Button';

interface TimeCommitmentScreenProps {
  onSelect: (minutes: number) => void;
  language: 'hi' | 'en';
}

const content = {
  en: {
    title: 'How much time daily?',
    subtitle: 'We\'ll personalize based on your availability',
    options: [
      {
        value: 5,
        title: '5 min',
        desc: 'Quick practice',
        icon: '⚡',
      },
      {
        value: 15,
        title: '15 min',
        desc: 'Recommended',
        icon: '🌟',
      },
      {
        value: 30,
        title: '30 min',
        desc: 'Deep learning',
        icon: '📖',
      },
      {
        value: 0,
        title: 'Flexible',
        desc: 'Anytime',
        icon: '🔄',
      },
    ],
    cta: 'Complete Setup',
    skip: 'Decide later',
  },
  hi: {
    title: 'रोज़ कितना समय दे सकते हैं?',
    subtitle: 'आपकी सुविधा के अनुसार सामग्री',
    options: [
      {
        value: 5,
        title: '5 मिनट',
        desc: 'त्वरित अभ्यास',
        icon: '⚡',
      },
      {
        value: 15,
        title: '15 मिनट',
        desc: 'अनुशंसित',
        icon: '🌟',
      },
      {
        value: 30,
        title: '30 मिनट',
        desc: 'गहरा अध्ययन',
        icon: '📖',
      },
      {
        value: 0,
        title: 'लचीला',
        desc: 'जब भी समय मिले',
        icon: '🔄',
      },
    ],
    cta: 'शुरू करें',
    skip: 'बाद में तय करें',
  },
};

export const TimeCommitmentScreen: React.FC<TimeCommitmentScreenProps> = ({
  onSelect,
  language,
}) => {
  const t = content[language];
  const [selected, setSelected] = React.useState<number | null>(15); // Default to 15 min

  return (
    <AuthLayout language={language} step={5} totalSteps={5}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>

      {/* Options Grid */}
      <div className={styles.options}>
        {t.options.map((option) => (
          <button
            key={option.value}
            className={`${styles.option} ${selected === option.value ? styles.optionSelected : ''}`}
            onClick={() => setSelected(option.value)}
          >
            <span className={styles.icon}>{option.icon}</span>
            <span className={styles.optionTitle}>{option.title}</span>
            <span className={styles.optionDesc}>{option.desc}</span>
          </button>
        ))}
      </div>

      {/* CTA */}
      <Button
        variant="sacred"
        size="lg"
        fullWidth
        onClick={() => onSelect(selected ?? 15)}
        className={styles.cta}
      >
        {t.cta}
      </Button>

      {/* Skip Option */}
      <button
        className={styles.skip}
        onClick={() => onSelect(0)}
      >
        {t.skip}
      </button>
    </AuthLayout>
  );
};
