/**
 * OTPScreen - OTP verification with resend timer
 * Auto-focus, paste support, clear error handling
 */

import React, { useState, useEffect } from 'react';
import styles from './OTPScreen.module.css';
import { AuthLayout } from './AuthLayout';
import { OTPInput } from './OTPInput';
import { Button } from '../../ui/Button';

interface OTPScreenProps {
  phone: string;
  onSubmit: (otp: string) => void;
  onBack: () => void;
  onResend: () => void;
  language: 'hi' | 'en';
  loading?: boolean;
  error?: string;
}

const content = {
  en: {
    title: 'Enter verification code',
    subtitle: 'Sent to',
    cta: 'Verify',
    resend: 'Resend OTP',
    resendAfter: 'Resend in',
    seconds: 'sec',
    receivingOtp: 'Receiving OTP...',
    didNotReceive: 'Didn\'t receive?',
  },
  hi: {
    title: 'वेरिफिकेशन कोड डालें',
    subtitle: 'भेजा गया',
    cta: 'वेरिफाई करें',
    resend: 'OTP फिर से भेजें',
    resendAfter: 'भेजने में',
    seconds: 'सेकंड',
    receivingOtp: 'OTP प्राप्त हो रहा है...',
    didNotReceive: 'OTP नहीं मिला?',
  },
};

export const OTPScreen: React.FC<OTPScreenProps> = ({
  phone,
  onSubmit,
  onBack,
  onResend,
  language,
  loading = false,
  error,
}) => {
  const [otp, setOtp] = useState('');
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(30);

  const t = content[language];

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleSubmit = () => {
    if (otp.length === 6) {
      onSubmit(otp);
    }
  };

  const handleResend = () => {
    if (canResend) {
      onResend();
      setCountdown(30);
      setCanResend(false);
    }
  };

  const handleOTPComplete = (value: string) => {
    if (value.length === 6) {
      onSubmit(value);
    }
  };

  // Format phone for display (mask middle digits)
  const formatPhoneDisplay = (phone: string) => {
    if (phone.startsWith('+91')) {
      const num = phone.substring(3);
      return `+91 ${num.substring(0, 2)}XXXXXX${num.substring(8)}`;
    }
    return phone;
  };

  return (
    <AuthLayout showBack onBack={onBack} language={language}>
      <h1 className={styles.title}>{t.title}</h1>
      <p className={styles.subtitle}>
        {t.subtitle} <strong>{formatPhoneDisplay(phone)}</strong>
      </p>

      {/* OTP Input */}
      <div className={styles.otpWrapper}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          onComplete={handleOTPComplete}
          error={error}
          disabled={loading}
        />
      </div>

      {/* Resend Section */}
      <div className={styles.resendSection}>
        {!canResend ? (
          <div className={styles.countdown}>
            <span className={styles.receiving}>{t.receivingOtp}</span>
            <span className={styles.timer}>
              {t.resendAfter} {countdown} {t.seconds}
            </span>
          </div>
        ) : (
          <button
            className={styles.resendBtn}
            onClick={handleResend}
            disabled={loading}
          >
            {t.resend}
          </button>
        )}
      </div>

      {/* Verify Button */}
      <Button
        variant="sacred"
        size="lg"
        fullWidth
        onClick={handleSubmit}
        disabled={otp.length !== 6 || loading}
        loading={loading}
        className={styles.cta}
      >
        {t.cta}
      </Button>

      {/* Help Text */}
      <p className={styles.helpText}>
        {language === 'hi'
          ? 'कोई भी 6 अंक डालकर डेमो जारी रखें'
          : 'Enter any 6 digits to continue demo'}
      </p>
    </AuthLayout>
  );
};
