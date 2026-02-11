/**
 * AuthLayout - Full-screen layout for authentication screens
 * Decorative temple elements, language toggle, back button
 */

import React, { ReactNode } from 'react';
import styles from './AuthLayout.module.css';

export interface AuthLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  step?: number;
  totalSteps?: number;
  language?: 'hi' | 'en';
  onLanguageChange?: (lang: 'hi' | 'en') => void;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  showBack = false,
  onBack,
  step,
  totalSteps,
  language = 'en',
  onLanguageChange,
}) => {
  return (
    <div className={styles.layout}>
      {/* Decorative Background Elements */}
      <div className={styles.decoration}>
        <div className={styles.omSymbol}>ॐ</div>
        <div className={styles.diyal}>
          <span className={styles.flame}>🪔</span>
        </div>
        <div className={styles.pattern}></div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        {showBack && onBack && (
          <button className={styles.backBtn} onClick={onBack} aria-label="Go back">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
          </button>
        )}

        {step && totalSteps && (
          <div className={styles.progress}>
            <span className={styles.stepText}>
              {language === 'hi' ? `चरण ${step} of ${totalSteps}` : `Step ${step} of ${totalSteps}`}
            </span>
            <div className={styles.dots}>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <span
                  key={i}
                  className={`${styles.dot} ${i < step ? styles.dotActive : ''}`}
                />
              ))}
            </div>
          </div>
        )}

        {onLanguageChange && (
          <button
            className={styles.langToggle}
            onClick={() => onLanguageChange(language === 'hi' ? 'en' : 'hi')}
          >
            {language === 'hi' ? 'हिंदी' : 'English'}
          </button>
        )}
      </header>

      {/* Content */}
      <div className={styles.content}>{children}</div>

      {/* Footer Trust Badge */}
      <div className={styles.footer}>
        <span className={styles.trustBadge}>🙏 {language === 'hi' ? 'आपकी गोपनीयता सुरक्षित है' : 'Your privacy is protected'}</span>
      </div>
    </div>
  );
};
