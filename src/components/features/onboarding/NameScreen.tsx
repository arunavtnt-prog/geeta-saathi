/**
 * NameScreen - First name, last name (optional)
 * Simple, welcoming, culturally appropriate
 */

import React, { useState } from 'react';
import styles from './NameScreen.module.css';
import { AuthLayout } from '../auth/AuthLayout';
import { Button } from '../../ui/Button';

interface NameScreenProps {
  onSubmit: (firstName: string, lastName: string) => void;
  language: 'hi' | 'en';
}

const content = {
  en: {
    title: 'What should we call you?',
    subtitle: 'Your spiritual journey begins with a name',
    firstName: 'First Name',
    lastName: 'Last Name (optional)',
    cta: 'Continue',
    namaste: 'Namaste',
  },
  hi: {
    title: 'हम आपको क्या कहें?',
    subtitle: 'आपकी आध्यात्मिक यात्रा एक नाम से शुरू होती है',
    firstName: 'पहला नाम',
    lastName: 'उपनाम (वैकल्पिक)',
    cta: 'आगे बढ़ें',
    namaste: 'नमस्ते',
  },
};

export const NameScreen: React.FC<NameScreenProps> = ({ onSubmit, language }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const t = content[language];

  const handleSubmit = () => {
    if (firstName.trim().length >= 2) {
      onSubmit(firstName.trim(), lastName.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <AuthLayout language={language} step={1} totalSteps={5}>
      {/* Greeting */}
      <div className={styles.greeting}>
        {t.namaste} 🙏
      </div>

      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>

      {/* Name Inputs */}
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="firstName" className={styles.label}>
            {t.firstName}
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === 'hi' ? 'अरुण' : 'Arun'}
            className={styles.input}
            autoFocus
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="lastName" className={styles.label}>
            {t.lastName}
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={language === 'hi' ? 'शर्मा' : 'Sharma (optional)'}
            className={styles.input}
          />
        </div>
      </div>

      {/* CTA */}
      <Button
        variant="sacred"
        size="lg"
        fullWidth
        onClick={handleSubmit}
        disabled={firstName.trim().length < 2}
        className={styles.cta}
      >
        {t.cta}
      </Button>

      {/* Skip Option */}
      <button
        className={styles.skip}
        onClick={() => onSubmit('Seeker', '')}
      >
        {language === 'hi' ? 'बाद में भरें' : 'Fill later'}
      </button>
    </AuthLayout>
  );
};
