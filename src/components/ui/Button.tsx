/**
 * Button Component
 * Ritual-inspired interactions with meaningful feedback
 */

import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'sacred' | 'ghost' | 'text';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  loading = false,
  disabled,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    loading ? styles.loading : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className={styles.spinner}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" opacity="0.25" />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        </span>
      )}
      {!loading && leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      <span className={styles.content}>{children}</span>
      {!loading && rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </button>
  );
};

/* === IconButton Component === */

export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: 'default' | 'sacred' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const iconClasses = [
    styles.iconButton,
    styles[variant],
    styles[`icon-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={iconClasses} {...props}>
      {children}
    </button>
  );
};

/* === Play Button - Sacred Variant === */

export interface PlayButtonProps {
  playing?: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const PlayButton: React.FC<PlayButtonProps> = ({
  playing = false,
  onToggle,
  size = 'md',
  label,
}) => {
  const sizeMap = {
    sm: 40,
    md: 56,
    lg: 72,
  };

  const iconSize = sizeMap[size];

  return (
    <button
      className={`${styles.playButton} ${styles[`play-${size}`]} ${playing ? styles.playing : ''}`}
      onClick={onToggle}
      aria-label={label || (playing ? 'Pause' : 'Play')}
    >
      <span className={styles.playGlow}></span>
      {playing ? (
        <svg width={iconSize * 0.4} height={iconSize * 0.4} viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg width={iconSize * 0.45} height={iconSize * 0.45} viewBox="0 0 24 24" fill="currentColor">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      )}
    </button>
  );
};
