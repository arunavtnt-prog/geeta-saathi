/**
 * OTPInput - 6-digit OTP input with auto-focus
 * Accessible, large touch targets for 40+ users
 */

import React, { useRef, useState, useEffect } from 'react';
import styles from './OTPInput.module.css';

export interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  error,
  disabled = false,
  autoFocus = true,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  // Focus first input on mount
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
    }
  }, [autoFocus]);

  // Handle input change
  const handleChange = (index: number, newValue: string) => {
    // Only allow digits
    const digitsOnly = newValue.replace(/\D/g, '');

    // Take only the last character if multiple entered
    const char = digitsOnly.slice(-1);

    if (!char) {
      // Backspace/delete case
      const newValueArray = value.split('');
      newValueArray[index] = '';
      const newOTP = newValueArray.join('');
      onChange(newOTP);

      // Focus previous input
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      return;
    }

    // Set the character
    const newValueArray = value.split('');
    newValueArray[index] = char;
    const newOTP = newValueArray.join('');
    onChange(newOTP);

    // Focus next input
    if (index < length - 1 && char) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger completion callback
    if (newOTP.length === length && onComplete) {
      onComplete(newOTP);
    }
  };

  // Handle keydown for special keys
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);

    if (pastedData) {
      onChange(pastedData.padEnd(length, ' '));

      // Focus the next empty input or the last one
      const nextEmptyIndex = pastedData.length;
      if (nextEmptyIndex < length) {
        inputRefs.current[nextEmptyIndex]?.focus();
      }

      if (pastedData.length === length && onComplete) {
        onComplete(pastedData);
      }
    }
  };

  return (
    <div className={styles.otpContainer}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          className={`${styles.otpInput} ${error ? styles.otpInputError : ''} ${
            focusedIndex === index ? styles.otpInputFocused : ''
          }`}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(-1)}
          disabled={disabled}
          aria-label={`OTP digit ${index + 1} of ${length}`}
          autoComplete="one-time-code"
        />
      ))}

      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};
