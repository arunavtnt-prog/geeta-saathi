/**
 * Home Feed - Daily Practice
 * The central hub for daily spiritual routine
 */

import React, { useState } from 'react';
import styles from './HomeFeed.module.css';
import { Card, VerseCard } from '../../ui/Card';
import { Button, PlayButton } from '../../ui/Button';
import {
  mockUser,
  mockVerses,
  mockLessons,
  getGreeting,
  formatDuration,
} from '../../../lib/mock';

export const HomeFeed: React.FC = () => {
  const [streak, setStreak] = useState(mockUser.streak);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set(['lesson-003']));
  const [reflection, setReflection] = useState('');
  const [showReflectionInput, setShowReflectionInput] = useState(false);

  const verseOfTheDay = mockVerses[0];
  const todayLesson = mockLessons[0];

  const handleLessonComplete = (lessonId: string) => {
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setCompletedLessons(newCompleted);
  };

  const handleSaveReflection = () => {
    console.log('Saving reflection:', reflection);
    setReflection('');
    setShowReflectionInput(false);
  };

  return (
    <div className={styles.feed}>
      {/* === Header === */}
      <header className={`${styles.header} animate-slideUp`}>
        <div className={styles.headerTop}>
          <div>
            <p className={styles.greeting}>{getGreeting()}, {mockUser.name}</p>
            <p className={styles.subtitle}>Continue your journey</p>
          </div>
          <div className={styles.streakBadge}>
            <span className={styles.fireIcon}>🔥</span>
            <span className={styles.streakCount}>{streak}</span>
          </div>
        </div>
        <Button
          variant="sacred"
          leftIcon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          }
        >
          Resume Last Audio
        </Button>
      </header>

      {/* === Verse of the Day === */}
      <section className={`${styles.section} animate-slideUp delay-100`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Verse of the Day</h2>
          <span className={styles.chapterRef}>Chapter 2, Verse 47</span>
        </div>
        <VerseCard
          sanskrit={verseOfTheDay.sanskrit}
          translation={verseOfTheDay.translation}
          reference={`${verseOfTheDay.chapter}:${verseOfTheDay.verseNumber}`}
          onPlay={() => console.log('Playing verse audio')}
          onReflect={() => setShowReflectionInput(true)}
        />
      </section>

      {/* === 5-Minute Lesson === */}
      <section className={`${styles.section} animate-slideUp delay-200`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Today's Lesson</h2>
          <span className={styles.durationBadge}>{formatDuration(todayLesson.duration)}</span>
        </div>
        <Card variant="default" elevation="subtle" padding="md">
          <div className={styles.lessonCard}>
            <div className={styles.lessonContent}>
              <h3 className={styles.lessonTitle}>{todayLesson.title}</h3>
              <p className={styles.lessonPreview}>{todayLesson.preview}</p>
              <div className={styles.lessonActions}>
                <PlayButton
                  size="sm"
                  onToggle={() => console.log('Toggle lesson play')}
                  label="Play lesson"
                />
                <button
                  className={`${styles.completeToggle} ${completedLessons.has(todayLesson.id) ? styles.completed : ''}`}
                  onClick={() => handleLessonComplete(todayLesson.id)}
                  aria-label="Mark as complete"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  <span>{completedLessons.has(todayLesson.id) ? 'Completed' : 'Mark Complete'}</span>
                </button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* === Midday Check-in === */}
      <section className={`${styles.section} animate-slideUp delay-300`}>
        <Card variant="outlined" elevation="none" padding="lg" className={styles.checkinCard}>
          <div className={styles.checkinIcon}>🌤️</div>
          <h3 className={styles.checkinTitle}>Midday Check-in</h3>
          <p className={styles.checkinQuestion}>Have you taken a moment for yourself today?</p>
          <div className={styles.checkinActions}>
            <Button variant="ghost" size="sm" onClick={() => console.log('Check-in: yes')}>
              Yes
            </Button>
            <Button variant="text" size="sm" onClick={() => console.log('Check-in: not yet')}>
              Not yet
            </Button>
          </div>
        </Card>
      </section>

      {/* === Evening Reflection === */}
      <section className={`${styles.section} animate-slideUp delay-400`}>
        <Card variant="deep" elevation="medium" padding="lg">
          <div className={styles.reflectionHeader}>
            <div>
              <h3 className={styles.reflectionTitle}>Evening Reflection</h3>
              <p className={styles.reflectionSubtitle}>Take a moment to pause and look inward</p>
            </div>
            <div className={styles.moonIcon}>🌙</div>
          </div>

          {showReflectionInput ? (
            <div className={styles.reflectionInput}>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What resonated with you today? What are you grateful for?"
                className={styles.textarea}
                rows={4}
              />
              <div className={styles.reflectionActions}>
                <Button variant="ghost" size="sm" onClick={() => setShowReflectionInput(false)}>
                  Cancel
                </Button>
                <Button variant="sacred" size="sm" onClick={handleSaveReflection}>
                  Save Reflection
                </Button>
              </div>
            </div>
          ) : (
            <button
              className={styles.startReflectionBtn}
              onClick={() => setShowReflectionInput(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Write Reflection
            </button>
          )}

          <button className={styles.viewPastBtn}>
            View Past Reflections
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </Card>
      </section>

      {/* === Personalized Suggestions === */}
      <section className={`${styles.section} animate-slideUp delay-500`}>
        <h2 className={styles.sectionTitle}>For You</h2>
        <div className={styles.suggestionsRow}>
          {[
            { id: '1', label: 'Meditation', icon: '🧘', color: '#4A7C59' },
            { id: '2', label: 'Bhajan', icon: '🪘', color: '#C9A227' },
            { id: '3', label: 'Focus', icon: '🎯', color: '#3949AB' },
            { id: '4', label: 'Sleep', icon: '🌙', color: '#1A237E' },
          ].map((item, index) => (
            <button
              key={item.id}
              className={`${styles.suggestionCard} animate-slideUp delay-${600 + index * 100}`}
              style={{ '--accent-color': item.color } as React.CSSProperties}
            >
              <span className={styles.suggestionIcon}>{item.icon}</span>
              <span className={styles.suggestionLabel}>{item.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* === Bottom Spacer for Mini Player === */}
      <div className={styles.bottomSpacer} />
    </div>
  );
};
