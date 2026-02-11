/**
 * PhoneInputScreen - Phone number entry with country code
 * Large inputs for 40+ users, clear validation
 */

import React, { useState } from 'react';
import styles from './PhoneInputScreen.module.css';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../ui/Button';

interface PhoneInputScreenProps {
  onSubmit: (phone: string) => void;
  onBack: () => void;
  language: 'hi' | 'en';
  loading?: boolean;
}

const content = {
  en: {
    title: 'Enter your phone number',
    subtitle: 'We\'ll send a verification code via SMS',
    countryCode: '+91',
    placeholder: '98765 43210',
    cta: 'Get OTP',
    back: 'Back',
    error: 'Please enter a valid 10-digit phone number',
  },
  hi: {
    title: 'अपना मोबाइल नंबर डालें',
    subtitle: 'हम एसएमएस के जरिए वेरिफिकेशन कोड भेजेंगे',
    countryCode: '+91',
    placeholder: '98765 43210',
    cta: 'OTP प्राप्त करें',
    back: 'वापस',
    error: 'कृपया 10 अंकों का मान्य मोबाइल नंबर डालें',
  },
};

export const PhoneInputScreen: React.FC<PhoneInputScreenProps> = ({
  onSubmit,
  onBack,
  language,
  loading = false,
}) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const t = content[language];

  const formatPhone = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Limit to 10 digits
    return digits.slice(0, 10);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    setError('');
  };

  const handleSubmit = () => {
    // Validate: must be 10 digits
    if (phone.length !== 10) {
      setError(t.error);
      return;
    }

    onSubmit(`+91${phone}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <AuthLayout showBack onBack={onBack} language={language}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>{t.subtitle}</p>

      {/* Phone Input */}
      <div className={styles.inputGroup}>
        <div className={styles.countryCode}>{t.countryCode}</div>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={phone}
          onChange={handlePhoneChange}
          onKeyDown={handleKeyDown}
          placeholder={t.placeholder}
          className={`${styles.phoneInput} ${error ? styles.phoneInputError : ''}`}
          disabled={loading}
          autoFocus
          aria-label="Phone number"
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      {/* Info Box */}
      <div className={styles.infoBox}>
        <span className={styles.infoIcon}>ℹ️</span>
        <p className={styles.infoText}>
          {language === 'hi'
            ? 'आपका नंबर केवल वेरिफिकेशन के लिए उपयोग होगा'
            : 'Your number is only used for verification'}
        </p>
      </div>

      {/* CTA Button */}
      <Button
        variant="sacred"
        size="lg"
        fullWidth
        onClick={handleSubmit}
        disabled={phone.length !== 10 || loading}
        loading={loading}
        className={styles.cta}
      >
        {t.cta}
      </Button>
    </AuthLayout>
  );
};
