/**
 * Mock Data for Geeta Saathi
 * Realistic demo data for frontend development
 */

/* === Types === */

export interface User {
  id: string;
  name: string;
  avatar: string;
  level: string;
  streak: number;
  totalHours: number;
  lessonsCompleted: number;
  chaptersCovered: number;
  preferences: UserPreferences;
}

export interface UserPreferences {
  language: 'en' | 'hi';
  fontSize: 'sm' | 'md' | 'lg';
  darkMode: boolean;
  notifications: boolean;
}

export interface AudioTrack {
  id: string;
  title: string;
  category: AudioCategory;
  duration: number; // in seconds
  language: string;
  mood: string;
  isBookmarked: boolean;
  isDownloaded: boolean;
  thumbnail: string;
  narrator?: string;
}

export type AudioCategory =
  | 'meditation'
  | 'chapter-narration'
  | 'lesson'
  | 'bhajan'
  | 'sleep'
  | 'satsang';

export interface Verse {
  id: string;
  chapter: number;
  verseNumber: number;
  sanskrit: string;
  translation: string;
  explanation: string;
  audioUrl?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood?: string;
}

export interface Temple {
  id: string;
  name: string;
  location: string;
  streamUrl: string;
  thumbnail: string;
  isLive: boolean;
}

export interface AIResponse {
  id: string;
  question: string;
  verseRef: string;
  explanation: string;
  actionableStep: string;
  relatedAudioId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  preview: string;
  duration: number;
  isCompleted: boolean;
  category: string;
}

/* === Mock User === */

export const mockUser: User = {
  id: 'user-001',
  name: 'Arunav',
  avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Arunav&backgroundColor=FF6B35',
  level: 'Level 1 Seeker',
  streak: 7,
  totalHours: 12.5,
  lessonsCompleted: 14,
  chaptersCovered: 2,
  preferences: {
    language: 'en',
    fontSize: 'md',
    darkMode: false,
    notifications: true,
  },
};

/* === Mock Verses === */

export const mockVerses: Verse[] = [
  {
    id: 'verse-2-47',
    chapter: 2,
    verseNumber: 47,
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    translation: 'You have the right to perform your duty, but you are not entitled to the fruits of your actions. Never consider yourself the cause of results, nor be attached to inaction.',
    explanation: 'This verse teaches the essence of Karma Yoga - focusing on action without attachment to outcomes. Perform your duties with dedication, but surrender the results to the divine.',
    audioUrl: '/audio/verse-2-47.mp3',
  },
  {
    id: 'verse-2-14',
    chapter: 2,
    verseNumber: 14,
    sanskrit: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
    translation: 'O son of Kunti, the contact between the senses and the sense objects gives rise to fleeting perceptions of happiness and distress. These are non-permanent, and come and go like the winter and summer seasons. O descendent of Bharat, one must learn to tolerate them without being disturbed.',
    explanation: 'Lord Krishna teaches that pleasure and pain are temporary experiences like changing seasons. The wise remain equanimous through all circumstances.',
    audioUrl: '/audio/verse-2-14.mp3',
  },
  {
    id: 'verse-6-5',
    chapter: 6,
    verseNumber: 5,
    sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
    translation: 'Let a man lift himself by his own self alone, let him not lower himself; for this self alone is the friend of oneself and this self alone is the enemy of oneself.',
    explanation: 'We are our own best friend or worst enemy. The mind, when controlled, serves as our greatest ally. When uncontrolled, it becomes our biggest obstacle.',
    audioUrl: '/audio/verse-6-5.mp3',
  },
];

/* === Mock Audio Tracks === */

export const mockAudioTracks: AudioTrack[] = [
  // Meditation
  {
    id: 'audio-001',
    title: 'Morning Breath Awareness',
    category: 'meditation',
    duration: 300,
    language: 'en',
    mood: 'calm',
    isBookmarked: true,
    isDownloaded: true,
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200',
  },
  {
    id: 'audio-002',
    title: 'Krishna Flute Meditation',
    category: 'meditation',
    duration: 900,
    language: 'hi',
    mood: 'devotional',
    isBookmarked: false,
    isDownloaded: false,
    thumbnail: 'https://images.unsplash.com/photo-1544535830-9df3f56fff6a?w=200',
  },
  // Chapter Narrations
  {
    id: 'audio-003',
    title: 'Chapter 2: Sankhya Yoga',
    category: 'chapter-narration',
    duration: 1800,
    language: 'en',
    mood: 'philosophical',
    isBookmarked: false,
    isDownloaded: true,
    thumbnail: 'https://images.unsplash.com/photo-1604975999044-188783d54fb3?w=200',
    narrator: 'Swami Dayananda',
  },
  {
    id: 'audio-004',
    title: 'Chapter 3: Karma Yoga',
    category: 'chapter-narration',
    duration: 2100,
    language: 'hi',
    mood: 'inspiring',
    isBookmarked: true,
    isDownloaded: false,
    thumbnail: 'https://images.unsplash.com/photo-1543418420-758b610e1d6c?w=200',
    narrator: 'Swami Paramarthananda',
  },
  // Lessons
  {
    id: 'audio-005',
    title: 'Understanding Detachment',
    category: 'lesson',
    duration: 420,
    language: 'en',
    mood: 'practical',
    isBookmarked: false,
    isDownloaded: true,
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=200',
  },
  {
    id: 'audio-006',
    title: 'Finding Purpose in Work',
    category: 'lesson',
    duration: 360,
    language: 'en',
    mood: 'motivating',
    isBookmarked: false,
    isDownloaded: false,
    thumbnail: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=200',
  },
  // Bhajans
  {
    id: 'audio-007',
    title: 'Hare Krishna Maha Mantra',
    category: 'bhajan',
    duration: 600,
    language: 'sans',
    mood: 'ecstatic',
    isBookmarked: true,
    isDownloaded: true,
    thumbnail: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=200',
  },
  {
    id: 'audio-008',
    title: 'Achyutam Keshavam',
    category: 'bhajan',
    duration: 480,
    language: 'hi',
    mood: 'devotional',
    isBookmarked: false,
    isDownloaded: false,
    thumbnail: 'https://images.unsplash.com/photo-1543418420-758b610e1d6c?w=200',
  },
  // Sleep
  {
    id: 'audio-009',
    title: 'Peaceful Sleep with Gita',
    category: 'sleep',
    duration: 1200,
    language: 'en',
    mood: 'calm',
    isBookmarked: false,
    isDownloaded: false,
    thumbnail: 'https://images.unsplash.com/photo-1511296933631-18b481361f0c?w=200',
  },
  // Satsang
  {
    id: 'audio-010',
    title: 'Dealing with Anxiety - Q&A',
    category: 'satsang',
    duration: 2400,
    language: 'en',
    mood: 'comforting',
    isBookmarked: false,
    isDownloaded: false,
    thumbnail: 'https://images.unsplash.com/photo-1543418420-758b610e1d6c?w=200',
  },
];

/* === Generate More Audio Tracks for Demo === */

const moods = ['calm', 'inspiring', 'philosophical', 'devotional', 'motivating', 'comforting'];
const categories: AudioCategory[] = ['meditation', 'chapter-narration', 'lesson', 'bhajan', 'sleep', 'satsang'];

for (let i = 11; i <= 100; i++) {
  const category = categories[i % categories.length];
  const mood = moods[i % moods.length];

  mockAudioTracks.push({
    id: `audio-${i.toString().padStart(3, '0')}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Session ${i}`,
    category,
    duration: 300 + (i * 30) % 2700, // 5-50 minutes
    language: i % 3 === 0 ? 'hi' : 'en',
    mood,
    isBookmarked: i % 7 === 0,
    isDownloaded: i % 5 === 0,
    thumbnail: `https://images.unsplash.com/photo-${1506126613408 + (i * 100)}?w=200`,
  });
}

/* === Mock Lessons === */

export const mockLessons: Lesson[] = [
  {
    id: 'lesson-001',
    title: 'The Art of Letting Go',
    preview: 'Learn how attachment creates suffering and how to practice detachment in daily life.',
    duration: 300,
    isCompleted: false,
    category: 'philosophy',
  },
  {
    id: 'lesson-002',
    title: 'Finding Your Dharma',
    preview: 'Discover your unique purpose and how to align your actions with it.',
    duration: 420,
    isCompleted: false,
    category: 'self-discovery',
  },
  {
    id: 'lesson-003',
    title: 'Mind in Daily Life',
    preview: 'Practical techniques to master your mind during challenging situations.',
    duration: 360,
    isCompleted: true,
    category: 'practice',
  },
];

/* === Mock Temples === */

export const mockTemples: Temple[] = [
  {
    id: 'temple-001',
    name: 'Govind Dev Ji',
    location: 'Jaipur, Rajasthan',
    streamUrl: 'https://youtube.com/live/placeholder',
    thumbnail: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Govind_dev_ji.jpg',
    isLive: true,
  },
  {
    id: 'temple-002',
    name: 'Mahakaleshwar',
    location: 'Ujjain, Madhya Pradesh',
    streamUrl: 'https://youtube.com/live/placeholder',
    thumbnail: 'https://images.openai.com/static-rsc-3/UYMbkziWdQBYKeN7iRTMhMcNFltBWYr1F9e-H0QM3MUo__sd49Am48dn9DjG-pQyT-i_f2WaIz7fpilp9xCU3CZuHaCFzydLLVs2_lEBUZI?purpose=fullsize',
    isLive: true,
  },
  {
    id: 'temple-003',
    name: 'Shirdi Sai Baba',
    location: 'Shirdi, Maharashtra',
    streamUrl: 'https://youtube.com/live/placeholder',
    thumbnail: 'https://images.openai.com/static-rsc-3/oD4JpCN3zd6tJd13vLXB3hESi4w3BQPThdUu9Mv0eySQ8VrwgnulAGrHRed6WgZXEGsYLHCw7xLQHuDRK3EPj1NMevOF5YI7VKfBe2jAAcc',
    isLive: true,
  },
  {
    id: 'temple-004',
    name: 'Kashi Vishwanath',
    location: 'Varanasi, Uttar Pradesh',
    streamUrl: 'https://youtube.com/live/placeholder',
    thumbnail: 'https://images.openai.com/static-rsc-3/edjD9o26kXAffm7vLXFo0HP4tpxJ6GW0p745rrPsmP7pDerVtxHxbNd7KvwCcLeecwHbf2wLOXR6qPY-TcKroRIGriixmGN7AWmcfMTuzSA',
    isLive: true,
  },
];

/* === Mock AI Responses === */

export const mockAIResponses: Record<string, AIResponse> = {
  anxious: {
    id: 'ai-001',
    question: 'I feel anxious about my exams.',
    verseRef: 'Chapter 2, Verse 47',
    explanation: 'Anxiety often stems from being overly concerned about results we cannot control. The Gita teaches us to focus on our effort (karma) rather than the fruit (phala). Your duty is to study with dedication - the outcome is not in your hands.',
    actionableStep: 'Practice this: Before studying, set an intention to do your best. During study, focus only on the present moment. After studying, mentally offer the results to the divine.',
    relatedAudioId: 'audio-001',
  },
  failure: {
    id: 'ai-002',
    question: 'What does Gita say about failure?',
    verseRef: 'Chapter 2, Verse 14',
    explanation: 'The Gita teaches that happiness and distress are temporary, like winter and summer seasons. Failure is not a reflection of your worth - it is simply an experience that comes and goes. The wise remain equanimous.',
    actionableStep: 'When facing failure, ask yourself: "What can I learn from this?" Treat it as a teacher, not a judgment. Every setback contains wisdom if you are willing to see it.',
    relatedAudioId: 'audio-006',
  },
  attachment: {
    id: 'ai-003',
    question: 'How to reduce attachment to outcomes?',
    verseRef: 'Chapter 6, Verse 5',
    explanation: 'Attachment to outcomes creates suffering because the future is never guaranteed. The Gita recommends becoming your own friend by disciplining your mind. When you control your mind, you can act without being bound by results.',
    actionableStep: 'Try the "offering practice": mentally offer every action and its results to a higher purpose before beginning. Do your work as an offering, not a transaction.',
    relatedAudioId: 'audio-005',
  },
};

/* === Mock Journal Entries === */

export const mockJournalEntries: JournalEntry[] = [
  {
    id: 'journal-001',
    date: '2024-01-15',
    content: 'Today I practiced detachment during a difficult work meeting. Instead of getting attached to my ideas being accepted, I focused on expressing my truth clearly. Felt much lighter afterward.',
    mood: 'peaceful',
  },
  {
    id: 'journal-002',
    date: '2024-01-14',
    content: 'Struggled with staying present during meditation. My mind kept wandering to future worries. Need to practice the breathing technique more consistently.',
    mood: 'restless',
  },
];

/* === Category Data === */

export const audioCategories = [
  { id: 'meditation', label: 'Meditation', icon: '🧘', color: '#4A7C59' },
  { id: 'chapter-narration', label: 'Chapters', icon: '📖', color: '#3949AB' },
  { id: 'lesson', label: 'Lessons', icon: '💡', color: '#FF6B35' },
  { id: 'bhajan', label: 'Bhajans', icon: '🪘', color: '#C9A227' },
  { id: 'sleep', label: 'Sleep', icon: '🌙', color: '#1A237E' },
  { id: 'satsang', label: 'Satsang', icon: '🙏', color: '#E8917C' },
];

/* === Helper Functions === */

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return remainingSeconds > 0
    ? `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
    : `${minutes}m`;
};

export const getTodayVerse = (): Verse => {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  return mockVerses[dayOfYear % mockVerses.length];
};
