# Geeta Saathi - Backend & Production Plan

**Version 1.0**
**Status:** Draft
**Last Updated:** 2025-02-11

---

## Executive Summary

This document outlines the complete backend architecture and production roadmap for Geeta Saathi - a Bhagavad Gita learning platform with audio-first experience, AI guidance, and temple features.

**Target: Production-ready MVP within 8-10 weeks**

---

## 1. Technology Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Backend** | Node.js + Express | Proven, scalable, large talent pool in India |
| **Database** | PostgreSQL + Redis | Reliable RDBMS + fast caching |
| **ORM** | Prisma | Type-safe, great DX, good migrations |
| **Auth** | Supabase Auth | Phone OTP built-in, reduces dev time |
| **Storage** | Supabase Storage/AWS S3 | CDN-backed media delivery |
| **AI** | OpenAI API | GPT-4 for Q&A responses |
| **Push** | Firebase Cloud Messaging | Free tier, reliable for India |
| **Hosting** | Vercel (Frontend) + Railway/Render (Backend) | Cost-effective for MVP |
| **Monitoring** | Sentry + Vercel Analytics | Error tracking + user analytics |
| **CI/CD** | GitHub Actions | Automated testing & deployment |

---

## 2. Database Schema

### 2.1 Core Tables

```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone VARCHAR(15) UNIQUE NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  language VARCHAR(5) DEFAULT 'en',
  experience_level VARCHAR(20), -- new/familiar/advanced
  goal VARCHAR(50),
  daily_time_minutes INTEGER DEFAULT 15,
  fcm_token VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User Progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  total_audio_seconds INTEGER DEFAULT 0,
  lessons_completed INTEGER DEFAULT 0,
  chapters_covered INTEGER[] DEFAULT '{}',
  last_active_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Streaks History
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  streak_date DATE NOT NULL,
  streak_count INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Journal Entries
CREATE TABLE journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  mood VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Audio Tracks
CREATE TABLE audio_tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL, -- meditation/chapter-narration/lesson/bhajan/sleep/satsang
  duration_seconds INTEGER NOT NULL,
  language VARCHAR(10) NOT NULL,
  mood VARCHAR(50),
  narrator VARCHAR(100),
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  verses JSONB, -- Related verses if any
  is_premium BOOLEAN DEFAULT false,
  playback_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Audio Progress
CREATE TABLE user_audio_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  track_id UUID REFERENCES audio_tracks(id) ON DELETE CASCADE,
  position_seconds INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  last_played_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, track_id)
);

-- Bookmarks
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  track_id UUID REFERENCES audio_tracks(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, track_id)
);

-- Verses
CREATE TABLE verses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter INTEGER NOT NULL,
  verse_number INTEGER NOT NULL,
  sanskrit TEXT NOT NULL,
  hindi_translation TEXT,
  english_translation TEXT NOT NULL,
  explanation TEXT,
  audio_url TEXT,
  UNIQUE(chapter, verse_number)
);

-- Daily Verses (scheduled content)
CREATE TABLE daily_verses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  verse_id UUID REFERENCES verses(id),
  scheduled_date DATE UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  preview TEXT,
  content TEXT NOT NULL,
  duration_seconds INTEGER,
  category VARCHAR(50),
  difficulty VARCHAR(20), -- beginner/intermediate/advanced
  sequence INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- User Lessons Progress
CREATE TABLE user_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  UNIQUE(user_id, lesson_id)
);

-- Temples
CREATE TABLE temples (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_hi VARCHAR(255),
  location VARCHAR(255) NOT NULL,
  stream_url TEXT,
  thumbnail_url TEXT,
  description TEXT,
  is_live BOOLEAN DEFAULT false,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT NOW()
);

-- AI Conversations
CREATE TABLE ai_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  verse_reference VARCHAR(50),
  actionable_step TEXT,
  related_track_id UUID REFERENCES audio_tracks(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Feedback
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  category VARCHAR(50), -- bug/feature/ui/content
  content TEXT NOT NULL,
  screenshot_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- reminder/update/achievement
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  scheduled_for TIMESTAMP
);
```

---

## 3. API Architecture

### 3.1 Base URL
```
Production: https://api.geetasaathi.com
Staging: https://api-staging.geetasaathi.com
```

### 3.2 API Endpoints

#### Authentication
```
POST   /auth/send-otp          - Send OTP to phone
POST   /auth/verify-otp        - Verify OTP & get token
POST   /auth/refresh           - Refresh access token
POST   /auth/logout            - Logout user
```

#### User Profile
```
GET    /users/me               - Get current user profile
PUT    /users/me               - Update profile
PUT    /users/me/settings      - Update settings
DELETE /users/me               - Delete account
```

#### Progress & Stats
```
GET    /users/me/progress      - Get full progress data
GET    /users/me/streaks        - Get streak history
POST   /users/me/log-activity   - Log daily activity
```

#### Audio
```
GET    /audio                   - List all audio (paginated, filterable)
GET    /audio/categories        - Get audio categories
GET    /audio/:id               - Get single track details
GET    /audio/:id/stream        - Get signed streaming URL
POST   /audio/:id/progress      - Update playback position
GET    /audio/:id/related       - Get related tracks
POST   /audio/:id/bookmark      - Add/Remove bookmark
GET    /audio/bookmarks         - Get user bookmarks
```

#### Verses
```
GET    /verses                  - List all verses
GET    /verses/daily            - Get today's verse
GET    /verses/random            - Get random verse
GET    /verses/chapter/:chapter  - Get verses by chapter
```

#### Lessons
```
GET    /lessons                 - List all lessons
GET    /lessons/:id             - Get single lesson
POST   /lessons/:id/complete    - Mark lesson complete
GET    /lessons/recommended     - Get recommended lessons
```

#### Journal
```
GET    /journal                 - Get user journal entries
POST   /journal                 - Create entry
PUT    /journal/:id             - Update entry
DELETE /journal/:id             - Delete entry
GET    /journal/calendar        - Get entries by date range
```

#### Temple
```
GET    /temples                 - List all temples
GET    /temples/:id             - Get temple details
GET    /temples/live            - Get currently live temples
```

#### AI Guide
```
POST   /ai/chat                 - Ask question to AI guide
GET    /ai/history              - Get chat history
DELETE /ai/history              - Clear chat history
```

#### Notifications
```
GET    /notifications           - Get user notifications
PUT    /notifications/:id/read   - Mark as read
```

#### Admin (Future)
```
POST   /admin/audio             - Upload audio
POST   /admin/verses            - Manage verses
POST   /admin/users             - User management
GET    /admin/analytics         - Platform analytics
```

---

## 4. Authentication Flow

### 4.1 Provider Choice: Supabase Auth

**Why Supabase:**
- Built-in Phone OTP (saves 2-3 weeks development)
- PostgreSQL database included
- Row Level Security (RLS) for data isolation
- Generous free tier (500MB DB, 1GB storage)
- Indian phone support (+91)

### 4.2 Auth Flow Diagram

```
┌─────────┐     Send OTP      ┌──────────┐     Send OTP      ┌──────────┐
│  Mobile │ ────────────────>  │ Supabase│ ───────────────> │ Twilio   │
│   App   │                    │   Auth   │                    │  SMS API │
└─────────┘                    └──────────┘                    └──────────┘
    │                              │
    │   Enter OTP                 │
    │───────────────────────────>│
    │                              │
    │   Verify + Return Token     │
    │<────────────────────────────│
    │                              │
│  Store JWT    │                │
│  in AsyncStorage              │
```

### 4.3 Token Structure

```typescript
// JWT Payload (Supabase)
{
  "aud": "authenticated",
  "role": "authenticated",
  "exp": 1738364200,
  "sub": "user-uuid",
  "user_metadata": {
    "phone": "+91XXXXXXXXXX",
    "first_name": "Arunav"
  },
  "app_metadata": {
    "provider": "phone",
    "providers": ["phone"]
  }
}
```

---

## 5. AI Integration Strategy

### 5.1 Provider: OpenAI API

**Prompt Engineering:**

```typescript
const SYSTEM_PROMPT = `
You are a wise, compassionate spiritual guide knowledgeable about the Bhagavad Gita.
You help users find practical wisdom from the Gita for their modern life challenges.

Guidelines:
1. Always reference specific verses (Chapter:Verse) when relevant
2. Provide practical, actionable advice
3. Be encouraging and non-judgmental
4. Suggest related audio content when available
5. Keep responses concise (100-150 words)
6. Use warm, respectful language

Format your response as JSON:
{
  "verse_ref": "Chapter 2, Verse 47",
  "explanation": "Clear explanation...",
  "actionable_step": "Practical advice...",
  "related_topic": "keyword for audio search"
}
`;

// API Call to OpenAI
async function askAI(question: string, userProfile: User) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Cost-effective
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `User context: ${JSON.stringify(userProfile)}\nQuestion: ${question}` }
    ],
    response_format: { type: "json_object" },
    max_tokens: 300
  });

  return JSON.parse(response.choices[0].message.content);
}
```

### 5.2 Cost Optimization

- Use **gpt-4o-mini** for production (~$0.15/1M tokens)
- Cache common Q&A pairs (50% cache hit expected)
- Implement rate limiting (10 questions/day free, then pay)

---

## 6. Media Storage Strategy

### 6.1 Audio File Management

```
┌─────────────────────────────────────────────────────┐
│                   Audio Storage                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Original Files                                     │
│       │                                             │
│       ▼                                             │
│  ┌─────────────┐     Upload to                      │
│  │   Admin     │ ───────────────────┐               │
│  │   Portal    │                   │               │
│  └─────────────┘                   │               │
│                                     ▼               │
│                           ┌───────────────┐        │
│                           │  AWS S3       │        │
│                           │  / Supabase   │        │
│                           │    Storage     │        │
│                           └───────────────┘        │
│                                     │               │
│                                     ▼               │
│                           ┌───────────────┐        │
│                           │   Transcode   │        │
│                           │   (Optional)   │        │
│                           └───────────────┘        │
│                                     │               │
│                    ┌────────────────┼────────────────┐
│                    ▼                ▼                ▼
│              ┌─────────┐     ┌─────────┐     ┌─────────┐
│              │  MP3    │     │  AAC    │     │  HLS    │
│              │  128kbps│     │  64kbps │     │ Streams │
│              └─────────┘     └─────────┘     └─────────┘
│                    │                │                │
│                    └────────────────┼────────────────┘
│                                     ▼
│                           ┌───────────────┐        │
│                           │    CDN        │        │
│                           │  (CloudFront)  │        │
│                           └───────────────┘        │
│                                     │               │
│                                     ▼               │
│                           ┌───────────────┐        │
│                           │  Signed URLs   │        │
│                           │  (expiring)    │        │
│                           └───────────────┘        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 6.2 CDN Configuration (Recommended: CloudFront)

```
Origin: S3 Bucket (ap-south-1 Mumbai)

Distribution: https://audio.geetasaathi.com

Behaviors:
- /tracks/* → MP3 files
- /streams/* → HLS streams
- /thumbnails/* → Images

Caching:
- MP3: 24 hours
- Thumbnails: 7 days
- Signed URLs for premium content
```

---

## 7. Push Notification System

### 7.1 Firebase Cloud Messaging

```typescript
// Notification Types
type NotificationType =
  | 'daily_reminder'     // 9 AM reminder
  | 'evening_reflection' // 8 PM journal
  | 'streak_milestone'   // 7, 14, 30 days
  | 'new_content'        // New lesson/verse
  | 'community_update';  // Festival/event

// Scheduling
// Using Supabase pg_cron or external cron service
CREATE TABLE notification_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type VARCHAR(50) NOT NULL,
  scheduled_time TIME NOT NULL,
  timezone VARCHAR(50) DEFAULT 'Asia/Kolkata',
  enabled BOOLEAN DEFAULT true
);
```

### 7.2 Notification Templates (Hindi + English)

```typescript
const templates = {
  daily_reminder: {
    en: {
      title: "Good Morning {name}! 🙏",
      body: "Start your day with Gita wisdom. A new verse awaits you.",
    },
    hi: {
      title: "प्रभात {name}! 🙏",
      body: "अपना दिन गीता की ज्ञान के साथ शुरू करें।",
    }
  },
  evening_reflection: {
    en: {
      title: "Evening Reflection 🌙",
      body: "Take a moment to reflect on your day. Write in your journal.",
    },
    hi: {
      title: "शाम की चिंतन 🌙",
      body: "अपने दिन के बारे में सोचें। जर्नल लिखें।",
    }
  }
};
```

---

## 8. Security Implementation

### 8.1 Security Checklist

| Area | Implementation |
|------|----------------|
| **Authentication** | JWT with Supabase Auth, 7-day expiry |
| **Authorization** | Row Level Security (RLS) in PostgreSQL |
| **Rate Limiting** | Express-rate-limit: 100 req/min per IP |
| **Input Validation** | Zod schema validation on all inputs |
| **SQL Injection** | Prisma ORM (parameterized queries) |
| **XSS Protection** | Content Security Policy headers |
| **CORS** | Whitelist: geetasaathi.com, vercel.app |
| **File Upload** | File type validation, size limits (50MB) |
| **Sensitive Data** | Phone numbers encrypted at rest |
| **API Keys** | Environment variables, never in code |
| **HTTPS** | Enforced on all endpoints |
| **Password Reset** | N/A (OTP-based, no passwords) |

### 8.2 RLS Policies (PostgreSQL)

```sql
-- Users can only see their own data
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress" ON user_progress
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own progress" ON user_progress
  FOR UPDATE USING (auth.uid()::text = user_id::text);
```

---

## 9. Monitoring & Analytics

### 9.1 Tools Setup

```
Error Tracking:     Sentry (https://sentry.io)
Analytics:          Vercel Analytics + Posthog (optional)
Uptime Monitoring:  UptimeRobot (free tier)
Logs:              Vercel Logs + Papertrail (optional)
Performance:        Vercel Speed Insights
```

### 9.2 Key Metrics to Track

```typescript
// Business Metrics
- DAU (Daily Active Users)
- Retention rate (Day 1, 7, 30)
- Average session duration
- Audio completion rate
- Streak distribution
- Most played audio/categories

// Technical Metrics
- API response time (p50, p95, p99)
- Error rate (< 0.1% target)
- Database query performance
- CDN cache hit rate (> 90% target)
- Push notification delivery rate
```

---

## 10. Deployment Architecture

### 10.1 Infrastructure

```
                            ┌─────────────────┐
                            │     CloudFlare   │
                            │      DNS/SSL     │
                            └────────┬────────┘
                                     │
                    ┌──────────────┴──────────────┐
                    │                              │
            ┌───────▼────────┐          ┌───────▼────────┐
            │   Vercel (FE)  │          │  Railway (BE)  │
            │                │          │                │
            │  React App     │          │  Express API    │
            │  Next.js/Res    │          │  Node.js        │
            └────────┬────────┘          └───────┬────────┘
                     │                          │
         ┌───────────┴───────────┐          │
         │                       │          │
    ┌────▼────────┐     ┌───────▼─────▼─────┐
    │  Supabase   │     │  PostgreSQL      │
    │  Auth+DB    │◄────►   (Railway)       │
    └─────────────┘     └──────────────────┘
                            │
              ┌─────────────┴─────────────┐
              │                           │
         ┌────▼────────┐         ┌────────▼─────┐
         │  S3/CloudFront│         │    Redis     │
         │   CDN        │         │   (Railway)  │
         └─────────────┘         └──────────────┘
```

### 10.2 Environment Variables

```bash
# Backend (.env.production)
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
SUPABASE_URL=https://*.supabase.co
SUPABASE_ANON_KEY=...
OPENAI_API_KEY=sk-...
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
FIREBASE_PROJECT_ID=...
FIREBASE_PRIVATE_KEY=...
AWS_S3_BUCKET=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
CDN_URL=https://audio.geetasaathi.com
JWT_SECRET=...
NODE_ENV=production

# Frontend (Vercel)
NEXT_PUBLIC_API_URL=https://api.geetasaathi.com
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

---

## 11. Development Timeline (8-10 Weeks)

### Phase 1: Foundation (Week 1-2)
- [ ] Set up Supabase project + RLS policies
- [ ] Initialize Express + Prisma backend
- [ ] Create database schema & migrations
- [ ] Set up GitHub Actions CI/CD
- [ ] Configure Sentry for error tracking

### Phase 2: Core APIs (Week 3-4)
- [ ] Authentication API (OTP flow)
- [ ] User profile & progress APIs
- [ ] Audio library & streaming endpoints
- [ ] Verses & daily verses API
- [ ] Basic admin endpoints

### Phase 3: Content Management (Week 5)
- [ ] Admin portal for content upload
- [ ] Bulk verse import (18 chapters)
- [ ] Audio file upload & CDN setup
- [ ] Lesson creation interface
- [ ] Temple data management

### Phase 4: AI Integration (Week 6)
- [ ] OpenAI API integration
- [ ] Prompt engineering & testing
- [ ] Conversation history storage
- [ ] Caching for common queries
- [ ] Rate limiting implementation

### Phase 5: Push Notifications (Week 7)
- [ ] Firebase FCM setup
- [ ] Notification templates (Hi/En)
- [ ] Scheduling system
- [ ] Permission flow in app
- [ ] Testing & optimization

### Phase 6: Polish & Testing (Week 8)
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Load testing (1000 concurrent users)
- [ ] Beta testing with 100 users

### Phase 7: Production Launch (Week 9-10)
- [ ] Final deployment setup
- [ ] Domain & SSL configuration
- [ ] Monitoring dashboards
- [ ] User onboarding refinement
- [ ] Launch preparation
- [ ] GO LIVE 🚀

---

## 12. Cost Estimates (Monthly)

| Service | Tier | Cost (USD) |
|---------|------|-------------|
| **Vercel** | Pro | $20 |
| **Railway** | Starter | $5-20 |
| **Supabase** | Pro | $25 |
| **S3 + CloudFront** | ~100GB transfer | $10-15 |
| **Twilio SMS** | India OTP | $0.007/SMS (~$20 for 3000) |
| **OpenAI API** | gpt-4o-mini | $15-30 |
| **Firebase** | Free tier | $0 |
| **Sentry** | Developer | $0 |
| **UptimeRobot** | Free | $0 |
| **Domain** | .com | $15/year |
| **TOTAL** | | **~$100-120/month** |

**Scale to 10,000 users:** ~$200-300/month

---

## 13. Post-Launch Roadmap

### Month 1-3: Stabilization
- Monitor performance metrics
- Fix critical bugs
- Gather user feedback
- Add missing features
- Optimize onboarding funnel

### Month 4-6: Growth
- Content expansion (more verses, lessons)
- Social features (share progress, challenges)
- Premium tier planning
- Referral program
- Partnership with temples/ashrams

### Month 7-12: Monetization
- Premium subscription (₹199/month or ₹1499/year)
- Premium content: exclusive lessons, live satsangs
- Offline mode for premium
- Ad-free experience
- 1-on-1 consultations

---

## 14. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| **SMS Cost** | Use Twilio for MVP, explore cheaper Indian SMS aggregators |
| **AI Cost** | Aggressive caching, limit free queries, consider open-source LLMs |
| **CDN Cost** | Use CloudFront with India region, implement smart caching |
| **Scalability** | Start with managed services, move to containers when needed |
| **Content Rights** | Use public domain Gita translations, create original content |
| **User Privacy** | GDPR compliant, clear privacy policy, data encryption |

---

## 15. Success Metrics

**Target by Month 6:**
- 5,000 registered users
- 1,000 DAU (Daily Active Users)
- 60%+ retention (Day 7)
- 10,000 audio plays/day
- 90%+ uptime
- < 500ms API response time (p95)

---

## 16. Next Steps

1. **Review this plan** with stakeholders
2. **Create GitHub project board** with phases as milestones
3. **Set up development & staging environments**
4. **Begin Phase 1: Foundation**
5. **Schedule weekly syncs** for progress review

---

**Document Status:** Ready for Implementation
**Last Review:** 2025-02-11
**Next Review:** After Phase 2 completion

---

*Prepared by: Claude (Frontend Design Specialist)*
*For: Geeta Saathi Project*
