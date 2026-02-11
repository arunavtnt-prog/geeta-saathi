/**
 * Temple Section Component
 * Live Darshan, Panchang, and Festival Calendar
 */

import React, { useState } from 'react';
import styles from './TempleSection.module.css';
import { Card } from '../../ui/Card';
import { IconButton } from '../../ui/Button';
import { mockTemples } from '../../../lib/mock';

export const TempleSection: React.FC = () => {
  const [selectedTemple, setSelectedTemple] = useState<typeof mockTemples[0] | null>(null);

  return (
    <div className={styles.templeSection}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Temple</h1>
        <p className={styles.subtitle}>Connect with the divine</p>
      </header>

      {/* Live Darshan Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Live Darshan</h2>
          <span className={styles.liveBadge}>
            <span className={styles.liveDot}></span>
            Live
          </span>
        </div>

        <div className={styles.templeGrid}>
          {mockTemples.map((temple, index) => (
            <Card
              key={temple.id}
              variant="default"
              elevation="subtle"
              padding="none"
              className={`${styles.templeCard} animate-slideUp`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedTemple(temple)}
            >
              {/* Thumbnail */}
              <div className={styles.templeThumbnail}>
                <img src={temple.thumbnail} alt={temple.name} />
                <div className={styles.templeOverlay}>
                  <span className={styles.liveIndicator}>
                    <span className={styles.pulseDot}></span>
                    LIVE
                  </span>
                </div>
              </div>

              {/* Temple Info */}
              <div className={styles.templeInfo}>
                <h3 className={styles.templeName}>{temple.name}</h3>
                <p className={styles.templeLocation}>{temple.location}</p>
              </div>

              {/* View Button */}
              <button className={styles.viewBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                View Now
              </button>
            </Card>
          ))}
        </div>
      </section>

      {/* Panchang Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Today's Panchang</h2>
        <Card variant="sacred" elevation="medium" padding="lg" className={styles.panchangCard}>
          <div className={styles.panchangHeader}>
            <div className={styles.panchangIcon}>🌅</div>
            <div>
              <h3 className={styles.panchangDate}>
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </h3>
              <p className={styles.panchangSubtitle}>Auspicious timings for the day</p>
            </div>
          </div>

          <div className={styles.panchangGrid}>
            <div className={styles.panchangItem}>
              <span className={styles.panchangLabel}>Tithi</span>
              <span className={styles.panchangValue}>Krishna Paksha Ekadashi</span>
            </div>
            <div className={styles.panchangItem}>
              <span className={styles.panchangLabel}>Nakshatra</span>
              <span className={styles.panchangValue}>Uttara Bhadrapada</span>
            </div>
            <div className={styles.panchangItem}>
              <span className={styles.panchangLabel}>Yoga</span>
              <span className={styles.panchangValue}>Shubh</span>
            </div>
            <div className={styles.panchangItem}>
              <span className={styles.panchangLabel}>Karana</span>
              <span className={styles.panchangValue}>Balava</span>
            </div>
          </div>

          <div className={styles.muhuratSection}>
            <h4 className={styles.muhuratTitle}>Shubh Muhurat</h4>
            <div className={styles.muhuratList}>
              <div className={styles.muhuratItem}>
                <span className={styles.muhuratTime}>06:00 - 07:30</span>
                <span className={styles.muhuratLabel}>Abhijit Muhurat</span>
              </div>
              <div className={styles.muhuratItem}>
                <span className={styles.muhuratTime}>17:30 - 18:15</span>
                <span className={styles.muhuratLabel}>Amrit Kaal</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Festival Calendar */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Festival Calendar</h2>
          <button className={styles.monthSelector}>
            February 2024
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </button>
        </div>

        <div className={styles.festivalList}>
          {[
            {
              id: '1',
              name: 'Maha Shivaratri',
              date: 'Mar 8',
              color: '#9C27B0',
              icon: '🔱',
            },
            {
              id: '2',
              name: 'Holi',
              date: 'Mar 25',
              color: '#FF6B35',
              icon: '🎨',
            },
            {
              id: '3',
              name: 'Ram Navami',
              date: 'Apr 17',
              color: '#FFC107',
              icon: '🏹',
            },
            {
              id: '4',
              name: 'Hanuman Jayanti',
              date: 'Apr 23',
              color: '#FF5722',
              icon: '🙏',
            },
          ].map((festival) => (
            <Card
              key={festival.id}
              variant="outlined"
              elevation="none"
              padding="md"
              className={styles.festivalCard}
            >
              <div
                className={styles.festivalColor}
                style={{ backgroundColor: festival.color }}
              >
                <span className={styles.festivalIcon}>{festival.icon}</span>
              </div>
              <div className={styles.festivalInfo}>
                <h4 className={styles.festivalName}>{festival.name}</h4>
                <p className={styles.festivalDate}>{festival.date}</p>
              </div>
              <button className={styles.festivalMoreBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </Card>
          ))}
        </div>
      </section>

      {/* Darshan Modal */}
      {selectedTemple && (
        <div
          className={styles.modalOverlay}
          onClick={() => setSelectedTemple(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={styles.modalHeader}>
              <div>
                <h3 className={styles.modalTitle}>{selectedTemple.name}</h3>
                <p className={styles.modalLocation}>{selectedTemple.location}</p>
              </div>
              <IconButton
                variant="ghost"
                size="md"
                onClick={() => setSelectedTemple(null)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </IconButton>
            </div>

            {/* Video Placeholder */}
            <div className={styles.videoPlaceholder}>
              <img src={selectedTemple.thumbnail} alt={selectedTemple.name} />
              <div className={styles.playOverlay}>
                <div className={styles.playBtnLarge}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </div>
              <span className={styles.liveBadgeLarge}>
                <span className={styles.pulseDot}></span>
                LIVE
              </span>
            </div>

            {/* Modal Actions */}
            <div className={styles.modalActions}>
              <button className={styles.modalActionBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                Add to Favorites
              </button>
              <button className={styles.modalActionBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16,6 12,2 8,6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Spacer */}
      <div className={styles.bottomSpacer} />
    </div>
  );
};
