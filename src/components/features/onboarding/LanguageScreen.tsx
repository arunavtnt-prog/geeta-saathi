/**
 * LanguageScreen - Language preference selection
 * Large cards for Hindi/English selection
 */

import React from 'react';
import styles from './LanguageScreen.module.css';
import { AuthLayout } from '../auth/AuthLayout';

interface LanguageScreenProps {
  onSelect: (language: 'hi' | 'en') => void;
  language: 'hi' | 'en';
}

const content = {
  en: {
    title: 'Choose your language',
    subtitle: 'अपनी भाषा चुनें',
    english: 'English',
    hindi: 'हिंदी',
    englishDesc: 'For English speakers',
    hindiDesc: 'हिंदी भाषी के लिए',
  },
  hi: {
    title: 'अपनी भाषा चुनें',
    subtitle: 'Choose your language',
    english: 'English',
    hindi: 'हिंदी',
    englishDesc: 'For English speakers',
    hindiDesc: 'हिंदी भाषी के लिए',
  },
};

export const LanguageScreen: React.FC<LanguageScreenProps> = ({ onSelect, language }) => {
  const t = content[language];

  return (
    <AuthLayout language={language} step={2} totalSteps={5}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>

      {/* Language Options */}
      <div className={styles.options}>
        <button
          className={`${styles.option} ${styles.optionEnglish} animate-slideUp`}
          onClick={() => onSelect('en')}
        >
          <span className={styles.flag}>🇬🇧</span>
          <div className={styles.optionContent}>
            <span className={styles.optionTitle}>{t.english}</span>
            <span className={styles.optionDesc}>{t.englishDesc}</span>
          </div>
        </button>

        <button
          className={`${styles.option} ${styles.optionHindi} animate-slideUp delay-100`}
          onClick={() => onSelect('hi')}
        >
          <span className={styles.flag}>🇮🇳</span>
          <div className={styles.optionContent}>
            <span className={styles.optionTitle}>{t.hindi}</span>
            <span className={styles.optionDesc}>{t.hindiDesc}</span>
          </div>
        </button>
      </div>
    </AuthLayout>
  );
};
