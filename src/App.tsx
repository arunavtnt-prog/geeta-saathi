/**
 * Geeta Saathi - Main App Shell
 * Integrates AuthFlow with main application
 */

import React, { useState } from 'react';
import styles from './App.module.css';
import { AuthProvider, useAuth } from './lib/auth/AuthContext';
import { AuthFlow } from './components/features/auth/AuthFlow';
import { BottomNav } from './components/layout/BottomNav';
import { MiniPlayer, FullPlayer } from './components/features/audio/AudioPlayer';
import { HomeFeed } from './components/features/home/HomeFeed';
import { AIGuide } from './components/features/guide/AIGuide';
import { TempleSection } from './components/features/temple/TempleSection';
import { mockAudioTracks } from './lib/mock';

/* === Feature Components Placeholder === */

const AudioLibrary: React.FC = () => {
  const categories = ['Meditation', 'Chapters', 'Lessons', 'Bhajans', 'Sleep', 'Satsang'];

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Audio Library</h1>
        <p className={styles.pageSubtitle}>Explore spiritual audio content</p>
      </header>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search audio..."
          className={styles.searchInput}
        />
      </div>

      {/* Categories */}
      <div className={styles.categoryChips}>
        {categories.map((cat) => (
          <button key={cat} className={styles.categoryChip}>
            {cat}
          </button>
        ))}
      </div>

      {/* Audio List */}
      <div className={styles.audioList}>
        {mockAudioTracks.slice(0, 20).map((track) => (
          <div key={track.id} className={styles.audioItem}>
            <img src={track.thumbnail} alt="" className={styles.audioThumb} />
            <div className={styles.audioInfo}>
              <h3 className={styles.audioTitle}>{track.title}</h3>
              <p className={styles.audioMeta}>
                {track.category} • {Math.floor(track.duration / 60)}m
              </p>
            </div>
            <button className={styles.audioPlayBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile: React.FC = () => {
  const auth = useAuth();
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('geeta_auth');
    localStorage.removeItem('geeta_user');
    window.location.reload();
  };

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Profile</h1>
        <p className={styles.pageSubtitle}>Track your spiritual journey</p>
      </header>

      {/* Profile Card */}
      <div className={styles.profileCard}>
        <div className={styles.profileAvatar}>
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${auth.onboardingData.firstName}&backgroundColor=FF6B35`}
            alt=""
          />
        </div>
        <h2 className={styles.profileName}>{auth.onboardingData.firstName}</h2>
        <p className={styles.profileLevel}>Level 1 Seeker</p>

        <div className={styles.profileStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>7</span>
            <span className={styles.statLabel}>Day Streak</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>12.5h</span>
            <span className={styles.statLabel}>Total Hours</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>14</span>
            <span className={styles.statLabel}>Lessons</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>2</span>
            <span className={styles.statLabel}>Chapters</span>
          </div>
        </div>
      </div>

      {/* Settings Section */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Settings</h3>

        {/* Language */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <span className={styles.settingIcon}>🌐</span>
            <div>
              <span className={styles.settingLabel}>Language</span>
              <span className={styles.settingDesc}>Choose app language</span>
            </div>
          </div>
          <button
            className={styles.settingToggle}
            onClick={() => {
              const newLang = auth.onboardingData.language === 'en' ? 'hi' : 'en';
              auth.setLanguage(newLang);
            }}
          >
            {auth.onboardingData.language === 'hi' ? 'हिंदी' : 'English'}
          </button>
        </div>

        {/* Font Size */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <span className={styles.settingIcon}>Aa</span>
            <div>
              <span className={styles.settingLabel}>Font Size</span>
              <span className={styles.settingDesc}>Adjust text size</span>
            </div>
          </div>
          <div className={styles.fontSizeOptions}>
            {(['sm', 'md', 'lg'] as const).map((size) => (
              <button
                key={size}
                className={`${styles.fontSizeBtn} ${fontSize === size ? styles.fontSizeActive : ''}`}
                onClick={() => setFontSize(size)}
              >
                {size === 'sm' ? 'A' : size === 'md' ? 'A' : 'A'}
                <span className={styles.fontSizeLabel}>
                  {size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dark Mode */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <span className={styles.settingIcon}>🌙</span>
            <div>
              <span className={styles.settingLabel}>Dark Mode</span>
              <span className={styles.settingDesc}>Easier on eyes at night</span>
            </div>
          </div>
          <button
            className={`${styles.switch} ${darkMode ? styles.switchOn : ''}`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            <span className={styles.switchKnob} />
          </button>
        </div>

        {/* Notifications */}
        <div className={styles.settingItem}>
          <div className={styles.settingInfo}>
            <span className={styles.settingIcon}>🔔</span>
            <div>
              <span className={styles.settingLabel}>Notifications</span>
              <span className={styles.settingDesc}>Daily practice reminders</span>
            </div>
          </div>
          <button
            className={`${styles.switch} ${notifications ? styles.switchOn : ''}`}
            onClick={() => setNotifications(!notifications)}
            aria-label="Toggle notifications"
          >
            <span className={styles.switchKnob} />
          </button>
        </div>
      </section>

      {/* Support Section */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Support</h3>

        <div className={styles.supportGrid}>
          <button className={styles.supportItem}>
            <span className={styles.supportIcon}>❓</span>
            <span className={styles.supportLabel}>Help & FAQs</span>
          </button>
          <button className={styles.supportItem}>
            <span className={styles.supportIcon}>📤</span>
            <span className={styles.supportLabel}>Share App</span>
          </button>
          <button className={styles.supportItem}>
            <span className={styles.supportIcon}>💬</span>
            <span className={styles.supportLabel}>Feedback</span>
          </button>
          <button className={styles.supportItem}>
            <span className={styles.supportIcon}>ℹ️</span>
            <span className={styles.supportLabel}>About</span>
          </button>
        </div>
      </section>

      {/* Logout Button */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

/* === Main App Content (authenticated) === */

const AppContent: React.FC = () => {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [currentTrack, setCurrentTrack] = useState<typeof mockAudioTracks[0] | null>(mockAudioTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFullPlayer, setShowFullPlayer] = useState(false);

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomeFeed />;
      case 'audio':
        return <AudioLibrary />;
      case 'guide':
        return <AIGuide />;
      case 'temple':
        return <TempleSection />;
      case 'profile':
        return <Profile />;
      default:
        return <HomeFeed />;
    }
  };

  return (
    <div className={styles.app}>
      {/* Texture Overlay */}
      <div className="texture-overlay" />

      {/* Page Content */}
      <main className={styles.main}>
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeId={activeTab} onChange={setActiveTab} />

      {/* Mini Player */}
      {currentTrack && !showFullPlayer && (
        <MiniPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onExpand={() => setShowFullPlayer(true)}
          progress={0.35}
        />
      )}

      {/* Full Screen Player */}
      {showFullPlayer && currentTrack && (
        <FullPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={() => setIsPlaying(!isPlaying)}
          onClose={() => setShowFullPlayer(false)}
        />
      )}
    </div>
  );
};

/* === Root App with AuthProvider === */

function App() {
  return (
    <AuthProvider>
      <AppWithAuth />
    </AuthProvider>
  );
}

/* === Internal component that uses auth context === */

const AppWithAuth: React.FC = () => {
  const auth = useAuth();

  // Show auth/onboarding flow if not complete
  if (auth.phase !== 'complete') {
    return <AuthFlow />;
  }

  // Show main app if authenticated
  return <AppContent />;
};

export default App;
