/**
 * Card Component
 * Elevated surface with subtle temple-inspired aesthetics
 */

import React from 'react';
import styles from './Card.module.css';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'sacred' | 'deep' | 'outlined';
  elevation?: 'none' | 'subtle' | 'medium' | 'high';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  className?: string;
  animate?: boolean;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  elevation = 'subtle',
  padding = 'md',
  onClick,
  className = '',
  animate = true,
  style,
}) => {
  const cardClasses = [
    styles.card,
    styles[variant],
    styles[elevation],
    styles[padding],
    onClick ? styles.clickable : '',
    animate ? styles.animate : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} onClick={onClick} style={style}>
      {children}
    </div>
  );
};

/* === Card Variants === */

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return <div className={`${styles.header} ${className}`}>{children}</div>;
};

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return <div className={`${styles.body} ${className}`}>{children}</div>;
};

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return <div className={`${styles.footer} ${className}`}>{children}</div>;
};

/* === Specialized Card Variants === */

export interface VerseCardProps {
  sanskrit: string;
  translation: string;
  reference?: string;
  onPlay?: () => void;
  onReflect?: () => void;
  className?: string;
}

export const VerseCard: React.FC<VerseCardProps> = ({
  sanskrit,
  translation,
  reference,
  onPlay,
  onReflect,
  className = '',
}) => {
  return (
    <Card variant="sacred" elevation="medium" padding="lg" className={`${styles.verseCard} ${className}`}>
      {reference && <p className={styles.reference}>{reference}</p>}
      <p className={`${styles.sanskrit} animate-breathe font-sanskrit`}>{sanskrit}</p>
      <p className={styles.translation}>{translation}</p>
      <div className={styles.actions}>
        {onPlay && (
          <button className={styles.iconButton} onClick={onPlay} aria-label="Play audio">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          </button>
        )}
        {onReflect && (
          <button className={styles.reflectButton} onClick={onReflect}>
            Reflect
          </button>
        )}
      </div>
    </Card>
  );
};
