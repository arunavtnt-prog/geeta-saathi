/**
 * AI Guide Component
 * Spiritual Q&A with conversational interface
 */

import React, { useState, useRef, useEffect } from 'react';
import styles from './AIGuide.module.css';
import { Card } from '../../ui/Card';
import { mockAIResponses, mockAudioTracks } from '../../../lib/mock';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'typing';
  content?: string;
  response?: typeof mockAIResponses[keyof typeof mockAIResponses];
}

const suggestedPrompts = [
  'I feel anxious about my exams.',
  'What does Gita say about failure?',
  'How to reduce attachment to outcomes?',
  'I\'m struggling with anger.',
  'How do I find my purpose?',
];

export const AIGuide: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      type: 'ai',
      content: 'Namaste 🙏 I\'m here to help you navigate life\'s questions through the wisdom of the Gita. What\'s on your mind today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Find matching response or generate default
    let response;
    const lowerContent = content.toLowerCase();

    if (lowerContent.includes('anxious') || lowerContent.includes('worry') || lowerContent.includes('exam')) {
      response = mockAIResponses.anxious;
    } else if (lowerContent.includes('fail')) {
      response = mockAIResponses.failure;
    } else if (lowerContent.includes('attach') || lowerContent.includes('outcome')) {
      response = mockAIResponses.attachment;
    } else {
      // Default response
      response = {
        id: Date.now().toString(),
        question: content,
        verseRef: 'Chapter 2, Verse 70',
        explanation: 'The Gita teaches that true peace comes from within, not from external circumstances. Like the ocean remains undisturbed while waters flow into it, the wise person remains calm amidst desires.',
        actionableStep: 'Take a moment to observe your mind without judgment. Acknowledge your feelings, but don\'t let them control you.',
        relatedAudioId: mockAudioTracks[0].id,
      };
    }

    setIsTyping(false);

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      response,
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleSuggestedClick = (prompt: string) => {
    setInputValue(prompt);
    handleSend(prompt);
  };

  return (
    <div className={styles.guide}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="url(#glow)" />
            <path d="M16 8v16M8 16h16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <defs>
              <radialGradient id="glow">
                <stop stopColor="#FF6B35" />
                <stop offset="1" stopColor="#D4451A" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Spiritual Guide</h1>
          <p className={styles.headerSubtitle}>Wisdom from the Gita for your questions</p>
        </div>
      </header>

      {/* Messages */}
      <div className={styles.messagesContainer}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && (
          <div className={`${styles.message} ${styles.messageAI}`}>
            <div className={styles.typingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 2 && (
        <div className={styles.suggestions}>
          <p className={styles.suggestionsTitle}>Try asking:</p>
          <div className={styles.suggestionsList}>
            {suggestedPrompts.map((prompt, index) => (
              <button
                key={index}
                className={`${styles.suggestionChip} animate-slideUp`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleSuggestedClick(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <button
            className={styles.voiceBtn}
            aria-label="Voice input"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" y1="19" x2="12" y2="23" />
              <line x1="8" y1="23" x2="16" y2="23" />
            </svg>
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            placeholder="Ask anything about life, duty, or purpose..."
            className={styles.input}
          />
          <button
            className={`${styles.sendBtn} ${inputValue.trim() ? styles.sendBtnActive : ''}`}
            onClick={() => handleSend(inputValue)}
            disabled={!inputValue.trim()}
            aria-label="Send message"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22,2 15,22 11,13 2,9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/* === Message Bubble Component === */

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  if (message.type === 'typing') return null;

  if (message.type === 'user') {
    return (
      <div className={`${styles.message} ${styles.messageUser}`}>
        <p className={styles.messageContent}>{message.content}</p>
      </div>
    );
  }

  if (message.response) {
    return (
      <div className={`${styles.message} ${styles.messageAI}`}>
        <Card variant="default" elevation="subtle" padding="lg" className={styles.responseCard}>
          {/* Verse Reference */}
          <div className={styles.verseRef}>
            <span className={styles.verseIcon}>📖</span>
            <span className={styles.verseText}>{message.response.verseRef}</span>
          </div>

          {/* Explanation */}
          <p className={styles.explanation}>{message.response.explanation}</p>

          {/* Actionable Step */}
          <div className={styles.actionableStep}>
            <span className={styles.stepIcon}>✨</span>
            <p className={styles.stepText}>{message.response.actionableStep}</p>
          </div>

          {/* Related Audio */}
          {message.response.relatedAudioId && (
            <button className={styles.relatedAudio}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Listen to related audio
            </button>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className={`${styles.message} ${styles.messageAI}`}>
      <div className={styles.welcomeMessage}>
        <p>{message.content}</p>
      </div>
    </div>
  );
};
