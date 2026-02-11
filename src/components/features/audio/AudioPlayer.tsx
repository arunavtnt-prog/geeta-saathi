/**
 * Audio Player Components
 * Mini player and full-screen player with mandala visualization
 */

import React, { useState, useRef, useEffect } from 'react';
import styles from './AudioPlayer.module.css';
import { PlayButton } from '../../ui/Button';
import type { AudioTrack } from '../../../lib/mock';
import { formatDuration } from '../../../lib/mock';

/* === Mini Player === */

export interface MiniPlayerProps {
  track: AudioTrack | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onExpand: () => void;
  progress?: number;
}

export const MiniPlayer: React.FC<MiniPlayerProps> = ({
  track,
  isPlaying,
  onPlayPause,
  onExpand,
  progress = 0,
}) => {
  if (!track) return null;

  return (
    <div className={styles.miniPlayer} onClick={onExpand}>
      {/* Progress Bar */}
      <div className={styles.miniProgress}>
        <div className={styles.miniProgressFill} style={{ width: `${progress * 100}%` }} />
      </div>

      <div className={styles.miniContent}>
        {/* Thumbnail */}
        <div className={styles.miniThumbnail}>
          <img src={track.thumbnail} alt="" />
          <div className={styles.miniPlayBtn}>
            <PlayButton size="sm" playing={isPlaying} onToggle={(e) => {
              e.stopPropagation();
              onPlayPause();
            }} />
          </div>
        </div>

        {/* Track Info */}
        <div className={styles.miniInfo}>
          <p className={styles.miniTitle}>{track.title}</p>
          <p className={styles.miniMeta}>{formatDuration(track.duration)}</p>
        </div>

        {/* Actions */}
        <div className={styles.miniActions}>
          <button
            className={styles.miniActionBtn}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Skip forward');
            }}
            aria-label="Skip forward"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12l9-9v9l9-9v18l-9-9v9L5 12z" />
              <path d="M19 12h5" />
            </svg>
          </button>
          <button
            className={styles.miniActionBtn}
            onClick={(e) => {
              e.stopPropagation();
              console.log('Close player');
            }}
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

/* === Full Screen Player === */

export interface FullPlayerProps {
  track: AudioTrack;
  isPlaying: boolean;
  onPlayPause: () => void;
  onClose: () => void;
}

export const FullPlayer: React.FC<FullPlayerProps> = ({
  track,
  isPlaying,
  onPlayPause,
  onClose,
}) => {
  const [progress, setProgress] = useState(0.28);
  const [currentTime, setCurrentTime] = useState(84);
  const [speed, setShowSpeed] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    setCurrentTime(Math.floor(track.duration * newProgress));
  };

  const skip = (seconds: number) => {
    const newTime = Math.max(0, Math.min(track.duration, currentTime + seconds));
    setCurrentTime(newTime);
    setProgress(newTime / track.duration);
  };

  return (
    <div className={styles.fullPlayer}>
      {/* Background Blur */}
      <div className={styles.playerBg}>
        <img src={track.thumbnail} alt="" />
        <div className={styles.playerBgOverlay} />
      </div>

      {/* Header */}
      <header className={styles.playerHeader}>
        <button
          className={styles.playerCloseBtn}
          onClick={onClose}
          aria-label="Close player"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6" />
          </svg>
        </button>

        <div className={styles.playerTitleGroup}>
          <p className={styles.playerNowPlaying}>Now Playing</p>
          <p className={styles.playerCategory}>
            {track.category.charAt(0).toUpperCase() + track.category.slice(1)}
          </p>
        </div>

        <button
          className={styles.playerMenuBtn}
          aria-label="More options"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </header>

      {/* Album Art with Mandala Visualization */}
      <div className={styles.artContainer}>
        <div className={`${styles.mandala} ${isPlaying ? styles.mandalaActive : ''}`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className={styles.mandalaRing}
              style={{
                animationDelay: `${i * 0.15}s`,
                transform: `rotate(${i * 22.5}deg)`,
              }}
            />
          ))}
        </div>
        <div className={styles.artWrapper}>
          <img
            src={track.thumbnail}
            alt={track.title}
            className={`${styles.artwork} ${isPlaying ? styles.artworkPlaying : ''}`}
          />
          <div className={styles.artOverlay}>
            <PlayButton
              size="lg"
              playing={isPlaying}
              onToggle={onPlayPause}
              label={isPlaying ? 'Pause' : 'Play'}
            />
          </div>
        </div>
      </div>

      {/* Track Info */}
      <div className={styles.trackInfo}>
        <h2 className={styles.trackTitle}>{track.title}</h2>
        <p className={styles.trackMeta}>
          {track.narrator && <span>{track.narrator} • </span>}
          {formatDuration(track.duration)} • {track.language.toUpperCase()}
        </p>
      </div>

      {/* Progress Bar */}
      <div className={styles.progressSection}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={progress}
          onChange={handleSeek}
          className={styles.progressSlider}
        />
        <div className={styles.timeLabels}>
          <span>{formatDuration(currentTime)}</span>
          <span>-{formatDuration(track.duration - currentTime)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        {/* Speed Control */}
        <div className={styles.speedControl} style={{ position: 'relative' }}>
          <button
            className={styles.controlBtn}
            onClick={() => setShowSpeed(!speed)}
          >
            {playbackSpeed}x
          </button>
          {speed && (
            <div className={styles.speedDropdown}>
              {[0.75, 1, 1.25, 1.5, 2].map((s) => (
                <button
                  key={s}
                  className={`${styles.speedOption} ${playbackSpeed === s ? styles.speedActive : ''}`}
                  onClick={() => {
                    setPlaybackSpeed(s);
                    setShowSpeed(false);
                  }}
                >
                  {s}x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Skip Back */}
        <button
          className={styles.controlBtn}
          onClick={() => skip(-15)}
          aria-label="Skip back 15 seconds"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12l-9 9v-9l-9 9V6l9 9V6l9 9z" />
            <path d="M5 12h-5" />
          </svg>
          <span>15</span>
        </button>

        {/* Play/Pause */}
        <div className={styles.mainPlayBtn}>
          <PlayButton
            size="md"
            playing={isPlaying}
            onToggle={onPlayPause}
            label={isPlaying ? 'Pause' : 'Play'}
          />
        </div>

        {/* Skip Forward */}
        <button
          className={styles.controlBtn}
          onClick={() => skip(15)}
          aria-label="Skip forward 15 seconds"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12l9-9v9l9-9v18l-9-9v9L5 12z" />
            <path d="M19 12h5" />
          </svg>
          <span>15</span>
        </button>

        {/* Bookmark */}
        <button
          className={`${styles.controlBtn} ${track.isBookmarked ? styles.bookmarked : ''}`}
          aria-label={track.isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={track.isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </div>

      {/* Bottom Actions */}
      <div className={styles.bottomActions}>
        <button className={styles.bottomBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Add Note
        </button>
        <button className={styles.bottomBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
          Sleep Timer
        </button>
      </div>
    </div>
  );
};
