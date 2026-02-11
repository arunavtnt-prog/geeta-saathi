# Geeta Saathi - Frontend Design Implementation

> Modern spiritual minimalism - "Digital Temple" aesthetic

## Design Direction

### Aesthetic Philosophy

The frontend follows a **"Digital Temple"** design language that blends:

- **Warm sandstone textures** - like temple walls at dawn
- **Deep saffron accents** - sacred fire, ritual energy
- **Indigo depth** - meditation, midnight sky
- **Organic flowing curves** - river, prayer flags

### Typography

| Usage | Font | Character |
|-------|------|------------|
| Display headings | Cormorant Garamond | Elegant, high-contrast serifs |
| Body text | Nunito | Warm, rounded sans-serif |
| Sanskrit | Noto Sans Devanagari | Proper Devanagari rendering |

### Color Palette

```css
--color-sand-light: #F5F0E8      /* Base background */
--color-flame: #FF6B35           /* Sacred fire, primary actions */
--color-deep: #1A237E            /* Meditation, depth */
--color-gold: #C9A227            /* Auspicious accents */
--color-ink: #2C1810             /* Text primary */
```

## Project Structure

```
src/
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Card.tsx             # Card with sacred variants
│   │   ├── Button.tsx           # Buttons with ritual interactions
│   │   └── *.module.css
│   ├── layout/
│   │   └── BottomNav.tsx        # Mobile bottom navigation
│   └── features/
│       ├── home/                # Daily practice feed
│       ├── audio/               # Mini & full-screen player
│       ├── guide/               # AI Q&A interface
│       └── temple/              # Live darshan, Panchang
├── lib/
│   └── mock/                    # Demo data (100+ audio tracks)
├── styles/
│   └── theme.css                # Design system variables
├── App.tsx                      # Main app shell
└── main.tsx
```

## Key Features Implemented

### 1. Home Feed (Daily Practice)
- Dynamic greeting with streak counter
- Verse of the Day with breathing animation
- 5-minute lesson cards
- Midday check-in prompts
- Evening reflection journal
- Personalized suggestions carousel

### 2. Audio Player
- **Mini Player**: Persistent bottom bar with progress
- **Full Player**: Mandala-inspired visualization
- Speed control (0.75x - 2x)
- Skip forward/back 15 seconds
- Bookmark and note-taking UI

### 3. AI Guide
- Conversational chat interface
- Typing indicator animation
- Structured response cards:
  - Verse reference
  - Explanation
  - Actionable step
  - Related audio button
- Voice input button (UI)

### 4. Temple Section
- Live Darshan grid (4 temples)
- Panchang with today's Tithi, Nakshatra
- Festival calendar
- Video placeholder modal

### 5. Bottom Navigation
- 5 primary tabs with sacred active states
- Floating gradient for visual depth
- iOS safe area support

## Design Details

### Animations
- `breathe`: Subtle scale pulse for sacred text
- `float`: Gentle vertical movement
- `slideUp`: Entry animation for cards
- `mandalaRotate`: Circular rotation in audio player
- Staggered delays (100ms - 800ms) for cascading reveals

### Micro-interactions
- Hover elevation on cards
- Glow effect on sacred buttons
- Ripple-like shimmer on primary actions
- Progress fill animation on audio player

### Texture Overlays
- 2% noise texture on all surfaces
- Gradient backgrounds with depth
- Shadow system with warmth (`box-shadow` with brown tints)

## Installation & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Mock Data

The app includes 100+ demo audio tracks across categories:
- Meditation
- Chapter Narrations
- 5-Min Lessons
- Bhajans
- Sleep
- Satsang

## Browser Support

- Modern browsers with CSS Grid, Flexbox
- Mobile-first (375px breakpoint)
- Tablet/desktop responsive

## AVOID (Anti-patterns)

This design explicitly avoids:
- Generic AI aesthetics (purple gradients, Inter font)
- Cookie-cutter component patterns
- Predictable layouts
- Cliched spiritual app tropes

Each component has intentional character - unexpected but cohesive.
