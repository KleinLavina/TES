# Featured Announcement System - Design Document

## Visual Reference

Based on SLSU website design:
- **Carousel View**: 3 cards side-by-side with background images
- **Card Overlay**: Dark overlay with white text on images
- **Card Content**: Title, source/date metadata, "Read More" button
- **Navigation**: Left/right arrows for manual navigation
- **Pagination Dots**: Centered below cards (YES●4●SLSU style)
- **Full Article View**: Dedicated page with full-width hero image, article content, and sidebar with "Recent Articles"

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     PUBLIC FRONTEND                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │  App.jsx                                            │    │
│  │    ├─ AnnouncementSection (replaces #home)         │    │
│  │    │    ├─ AnnouncementCarousel                    │    │
│  │    │    │    ├─ NavigationArrow (left)             │    │
│  │    │    │    ├─ AnnouncementCard (x3)              │    │
│  │    │    │    ├─ NavigationArrow (right)            │    │
│  │    │    │    └─ PaginationDots (YES●4●SLSU)        │    │
│  │    └─ AnnouncementDetailPage (full article)        │    │
│  │         ├─ ArticleHero (image + title)             │    │
│  │         ├─ ArticleContent (main text)              │    │
│  │         └─ RecentArticlesSidebar                   │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Structure

### Public Components

#### 1. AnnouncementSection
**Location**: `src/components/AnnouncementSection.jsx`

**Purpose**: Container component that fetches and manages announcement data

**Layout** (matches SLSU):
```
┌──────────────────────────────────────────────────────────────┐
│                    YES●4●SLSU (header)                        │
├──────────────────────────────────────────────────────────────┤
│  ◄  [Card 1]        [Card 2]        [Card 3]        ►       │
│                                                               │
│                      ● ○ ○ ○                                 │
└──────────────────────────────────────────────────────────────┘
```

---

#### 2. AnnouncementCard
**Location**: `src/components/AnnouncementCard.jsx`

**Purpose**: Display individual announcement with image background

**Layout** (matches SLSU card):
```
┌─────────────────────────┐
│                         │
│  [Background Image]     │
│  with dark overlay      │
│                         │
│  Title Text (white)     │
│  👤 Source  📅 Date     │
│                         │
│  [Read More Button]     │
│                         │
└─────────────────────────┘
```

**Props**:
```javascript
{
  announcement: {
    id: Number,
    title: String,
    source: String,        // e.g., "Extension Services"
    date: String,          // e.g., "29 January 2026"
    image_url: String,     // Background image
    slug: String           // For URL routing
  },
  onClick: Function        // Navigate to detail page
}
```

**Styling**:
- Background image with dark overlay (rgba(0,0,0,0.5))
- White text on dark background
- Rounded corners
- Hover effect: slight scale up
- "Read More" button: rounded, semi-transparent background

---

#### 3. AnnouncementCarousel
**Location**: `src/components/AnnouncementCarousel.jsx`

**Purpose**: Handles pagination, navigation arrows, and auto-cycling

**Features**:
- Left/right navigation arrows (◄ ►)
- Auto-advance every 8 seconds
- Pause on hover
- Slide animation between pages
- Pagination dots below cards

**Props**:
```javascript
{
  announcements: Array,
  itemsPerPage: 3,
  autoPlayInterval: 8000
}
```

---

#### 4. PaginationDots
**Location**: `src/components/PaginationDots.jsx`

**Purpose**: Visual indicator styled like "YES●4●SLSU"

**Layout**:
```
● ○ ○ ○  (filled dot = current page)
```

**Styling**:
- Centered below carousel
- Clickable dots
- Active dot: filled circle
- Inactive dots: outline circle
- Smooth transition on change

---

#### 5. AnnouncementDetailPage
**Location**: `src/pages/AnnouncementDetailPage.jsx`

**Purpose**: Full article view (matches SLSU article page)

**Layout**:
```
┌─────────────────────────────────────────────────────────┐
│  [Header with navigation]                               │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Article Title (large, centered)                        │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [Full-width hero image]                                │
│                                                          │
├──────────────────────────────┬──────────────────────────┤
│                              │  Recent Articles         │
│  Article Content             │  ┌──────────────────┐   │
│                              │  │ [Thumbnail]      │   │
│  Paragraph text...           │  │ Title            │   │
│                              │  └──────────────────┘   │
│  More content...             │  ┌──────────────────┐   │
│                              │  │ [Thumbnail]      │   │
│                              │  │ Title            │   │
│                              │  └──────────────────┘   │
└──────────────────────────────┴──────────────────────────┘
```

**Features**:
- Full-width hero image at top
- Article metadata (source, date, author)
- Main content area (left, 70% width)
- Sidebar with recent articles (right, 30% width)
- Breadcrumb navigation
- Social share buttons (optional)

---

#### 6. RecentArticlesSidebar
**Location**: `src/components/RecentArticlesSidebar.jsx`

**Purpose**: Show recent articles in sidebar (matches SLSU)

**Layout**:
```
Recent Articles
┌──────────────────┐
│ [Thumbnail]      │
│ Article Title    │
└──────────────────┘
┌──────────────────┐
│ [Thumbnail]      │
│ Article Title    │
└──────────────────┘
```

**Props**:
```javascript
{
  articles: Array,      // Recent announcements
  currentId: Number,    // Exclude current article
  limit: 5              // Show 5 recent
}
```

---

## Database Schema

### announcements table

```sql
CREATE TABLE announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(250) NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  source VARCHAR(100),              -- e.g., "Extension Services", "Office of the President"
  author VARCHAR(100),
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT 1,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_slug ON announcements(slug);
CREATE INDEX idx_order_published ON announcements(order_index, is_published);
CREATE INDEX idx_published_at ON announcements(published_at DESC);
```

### Sample Data (SLSU Style)

```json
[
  {
    "id": 1,
    "title": "From Homemakers to Entrepreneurs: How SLSU Empowered Women of Tiaong Through Mushroom Production",
    "slug": "homemakers-to-entrepreneurs-mushroom-production",
    "excerpt": "SLSU's extension program transforms lives of women in Tiaong through sustainable mushroom farming.",
    "content": "Full article content here...",
    "image_url": "/media/announcements/mushroom-production.jpg",
    "source": "Extension Services",
    "author": "SLSU Communications",
    "published_at": "2026-01-29T08:00:00Z",
    "is_published": true
  },
  {
    "id": 2,
    "title": "SLSU launches first spin-off company through formalized technology licensing deal",
    "slug": "slsu-first-spinoff-company-tech-licensing",
    "excerpt": "University takes major step in commercializing research innovations.",
    "content": "Full article content here...",
    "image_url": "/media/announcements/tech-licensing.jpg",
    "source": "Office of the President",
    "published_at": "2026-01-29T10:00:00Z",
    "is_published": true
  },
  {
    "id": 3,
    "title": "International internship now available through SLSU, Interskills Foundation partnership",
    "slug": "international-internship-interskills-partnership",
    "excerpt": "Students gain global experience through new partnership program.",
    "content": "Full article content here...",
    "image_url": "/media/announcements/internship.jpg",
    "source": "Office of the President",
    "published_at": "2026-01-27T09:00:00Z",
    "is_published": true
  }
]
```

---

## Routing Structure

```javascript
// App.jsx routes
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/announcements/:slug" element={<AnnouncementDetailPage />} />
  <Route path="/tes/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
</Routes>
```

**URL Examples**:
- Homepage carousel: `https://tagos-elementary.edu/`
- Full article: `https://tagos-elementary.edu/announcements/homemakers-to-entrepreneurs-mushroom-production`
- Admin: `https://tagos-elementary.edu/tes/admin/`

---

## Styling Specifications (SLSU Style)

### Color Palette
```css
:root {
  --announcement-overlay: rgba(0, 0, 0, 0.5);
  --announcement-text: #ffffff;
  --announcement-button-bg: rgba(255, 255, 255, 0.2);
  --announcement-button-hover: rgba(255, 255, 255, 0.3);
  --pagination-active: #1a4d2e;
  --pagination-inactive: #cccccc;
}
```

### Card Styling
```css
.announcement-card {
  position: relative;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.announcement-card:hover {
  transform: scale(1.02);
}

.announcement-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.announcement-card__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
}

.announcement-card__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.announcement-card__meta {
  display: flex;
  gap: 1.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 1rem;
}

.announcement-card__button {
  align-self: flex-start;
  padding: 0.75rem 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

.announcement-card__button:hover {
  background: rgba(255, 255, 255, 0.3);
}
```

### Navigation Arrows
```css
.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.3);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  color: white;
  transition: background 0.3s ease;
  z-index: 10;
}

.carousel-arrow--left {
  left: 1rem;
}

.carousel-arrow--right {
  right: 1rem;
}

.carousel-arrow:hover {
  background: rgba(255, 255, 255, 0.5);
}
```

### Pagination Dots
```css
.pagination-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
}

.pagination-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--pagination-inactive);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-dot--active {
  background: var(--pagination-active);
  border-color: var(--pagination-active);
}
```

---

## Animation Specifications

### Slide Animation (Horizontal)
```css
.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-track.slide-left {
  transform: translateX(-100%);
}

.carousel-track.slide-right {
  transform: translateX(100%);
}
```

**Timing**: 600ms cubic-bezier(0.4, 0, 0.2, 1) - smooth ease

---

## File Structure

```
src/
├── components/
│   ├── AnnouncementSection.jsx
│   ├── AnnouncementSection.css
│   ├── AnnouncementCarousel.jsx
│   ├── AnnouncementCarousel.css
│   ├── AnnouncementCard.jsx
│   ├── AnnouncementCard.css
│   ├── PaginationDots.jsx
│   ├── PaginationDots.css
│   ├── NavigationArrow.jsx
│   └── RecentArticlesSidebar.jsx
│
├── pages/
│   ├── HomePage.jsx
│   └── AnnouncementDetailPage.jsx
│   └── AnnouncementDetailPage.css
│
├── admin/
│   ├── AdminDashboard.jsx
│   ├── AnnouncementForm.jsx
│   └── ImageUploader.jsx
│
├── services/
│   └── announcementService.js
│
├── config/
│   └── announcements.config.js
│
└── data/
    └── mockAnnouncements.json

public/
└── media/
    └── announcements/
```

---

## Implementation Phases

### Phase 1: Frontend with Mock Data (SLSU Style)
1. ✅ Create mock data file (SLSU-style announcements)
2. ✅ Build AnnouncementCard with image background overlay
3. ✅ Build AnnouncementCarousel with 3-card layout
4. ✅ Add left/right navigation arrows
5. ✅ Implement slide animations
6. ✅ Add pagination dots (YES●4●SLSU style)
7. ✅ Add auto-cycling (8 seconds)
8. ✅ Build AnnouncementDetailPage (full article view)
9. ✅ Build RecentArticlesSidebar
10. ✅ Set up React Router for /announcements/:slug
11. ✅ Replace #home section in App.jsx
12. ✅ Test responsive behavior

### Phase 2: Backend Setup
1. Set up Express server
2. Create database with announcements table
3. Implement API endpoints
4. Add image upload handling
5. Generate slugs automatically
6. Connect frontend to real API

### Phase 3: Admin Interface
1. Build admin dashboard
2. Create announcement form
3. Add image uploader
4. Implement authentication
5. Test full CRUD workflow

---

## Responsive Behavior

### Desktop (1024px+)
- 3 cards per page
- Full navigation arrows
- Pagination dots centered

### Tablet (768px - 1023px)
- 2 cards per page
- Smaller navigation arrows
- Pagination dots

### Mobile (< 768px)
- 1 card per page
- Swipe gestures
- Smaller pagination dots
- Stack article content (no sidebar)

---

## Next Steps

1. ✅ Create mock data file with SLSU-style announcements
2. ✅ Build AnnouncementCard component with image overlay
3. ✅ Build carousel with navigation arrows
4. ✅ Implement pagination dots
5. ✅ Create detail page with sidebar
6. ✅ Set up routing
7. ✅ Test all interactions

```
┌─────────────────────────────────────────────────────────────┐
│                     PUBLIC FRONTEND                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │  App.jsx                                            │    │
│  │    ├─ AnnouncementSection (replaces #home)         │    │
│  │    │    ├─ AnnouncementCarousel                    │    │
│  │    │    │    ├─ AnnouncementCard (x3)              │    │
│  │    │    │    └─ PaginationDots                     │    │
│  │    │    └─ AnnouncementModal                       │    │
│  │    └─ (other sections)                             │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ API Calls
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND API                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │  /api/announcements (GET)                          │    │
│  │  /api/announcements/:id (GET)                      │    │
│  │  /api/announcements (POST) - Admin only            │    │
│  │  /api/announcements/:id (PUT) - Admin only         │    │
│  │  /api/announcements/:id (DELETE) - Admin only      │    │
│  │  /api/upload (POST) - Admin only                   │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ Database Queries
┌─────────────────────────────────────────────────────────────┐
│                     DATABASE                                 │
│  ┌────────────────────────────────────────────────────┐    │
│  │  announcements table                               │    │
│  │    - id, title, excerpt, content, image_url        │    │
│  │    - order_index, created_at, updated_at           │    │
│  │    - is_published                                  │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            ↕ Admin Access
┌─────────────────────────────────────────────────────────────┐
│                     ADMIN INTERFACE                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │  /tes/admin/                                       │    │
│  │    ├─ AdminLogin                                   │    │
│  │    ├─ AdminDashboard                               │    │
│  │    │    ├─ AnnouncementList                        │    │
│  │    │    ├─ AnnouncementForm (Create/Edit)          │    │
│  │    │    └─ ImageUploader                           │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Structure

### Public Components

#### 1. AnnouncementSection
**Location**: `src/components/AnnouncementSection.jsx`

**Purpose**: Container component that fetches and manages announcement data

**Props**: None (fetches data internally)

**State**:
```javascript
{
  announcements: [],        // All announcements from API
  currentPage: 0,           // Current page index
  isAutoPlaying: true,      // Auto-cycle state
  selectedAnnouncement: null // For modal
}
```

**Responsibilities**:
- Fetch announcements from API on mount
- Manage pagination state
- Handle auto-cycling timer
- Pass data to child components

---

#### 2. AnnouncementCarousel
**Location**: `src/components/AnnouncementCarousel.jsx`

**Purpose**: Handles pagination logic and animations

**Props**:
```javascript
{
  announcements: Array,     // All announcements
  itemsPerPage: Number,     // Default: 3
  autoPlayInterval: Number, // Default: 8000ms
  onReadMore: Function      // Callback for "Read more"
}
```

**State**:
```javascript
{
  currentPage: 0,
  direction: 'next' | 'prev', // For animation direction
  isAnimating: false
}
```

**Features**:
- Calculate total pages
- Slice announcements for current page
- Auto-advance with interval
- Pause on hover
- Animated transitions

---

#### 3. AnnouncementCard
**Location**: `src/components/AnnouncementCard.jsx`

**Purpose**: Display individual announcement

**Props**:
```javascript
{
  announcement: {
    id: Number,
    title: String,
    excerpt: String,
    image_url: String
  },
  onReadMore: Function
}
```

**Layout**:
```
┌─────────────────────────┐
│                         │
│   [Featured Image]      │
│                         │
├─────────────────────────┤
│  Title                  │
│  Short excerpt text...  │
│  [Read More Button]     │
└─────────────────────────┘
```

---

#### 4. AnnouncementModal
**Location**: `src/components/AnnouncementModal.jsx`

**Purpose**: Display full announcement content

**Props**:
```javascript
{
  announcement: Object | null,
  isOpen: Boolean,
  onClose: Function
}
```

**Features**:
- Full-screen overlay
- Close on backdrop click
- Close on ESC key
- Scroll for long content
- Responsive design

---

#### 5. PaginationDots
**Location**: `src/components/PaginationDots.jsx`

**Purpose**: Visual indicator of current page

**Props**:
```javascript
{
  totalPages: Number,
  currentPage: Number,
  onPageChange: Function
}
```

**Layout**:
```
● ○ ○ ○  (4 pages, on page 1)
```

---

### Admin Components

#### 6. AdminDashboard
**Location**: `src/admin/AdminDashboard.jsx`

**Purpose**: Main admin interface

**Features**:
- List all announcements
- Create/Edit/Delete actions
- Protected route

---

#### 7. AnnouncementForm
**Location**: `src/admin/AnnouncementForm.jsx`

**Purpose**: Create/Edit announcement form

**Fields**:
- Title (text input)
- Excerpt (textarea, max 200 chars)
- Content (textarea, optional)
- Image (file upload)
- Order Index (number input)

**Validation**:
- Title: required, max 100 chars
- Excerpt: required, max 200 chars
- Image: required, valid format

---

#### 8. ImageUploader
**Location**: `src/admin/ImageUploader.jsx`

**Purpose**: Handle image upload with preview

**Features**:
- Drag & drop
- File picker
- Image preview
- Format validation
- Size limit (5MB)

---

## Data Flow

### Public Page Load
```
1. User visits homepage
2. AnnouncementSection mounts
3. Fetch GET /api/announcements
4. Store announcements in state
5. AnnouncementCarousel receives data
6. Calculate pages (announcements.length / itemsPerPage)
7. Render first 3 AnnouncementCards
8. Start auto-cycle timer
9. After 8s, advance to next page with animation
10. Loop back to page 1 after last page
```

### Read More Flow
```
1. User clicks "Read More" on card
2. onReadMore(announcement) called
3. AnnouncementSection sets selectedAnnouncement
4. AnnouncementModal opens with full content
5. User clicks close or backdrop
6. Modal closes, auto-cycle resumes
```

### Admin Create Flow
```
1. Admin navigates to /tes/admin/
2. Login if not authenticated
3. Click "Create New Announcement"
4. Fill form (title, excerpt, content, image)
5. Submit form
6. POST /api/announcements with FormData
7. Backend saves to database
8. Backend saves image to /public/media/announcements/
9. Return success response
10. Redirect to announcement list
11. Public page automatically shows new announcement
```

---

## Database Schema

### announcements table

```sql
CREATE TABLE announcements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(100) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  image_url VARCHAR(255) NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_published ON announcements(order_index, is_published);
CREATE INDEX idx_created_at ON announcements(created_at DESC);
```

### Sample Data

```json
[
  {
    "id": 1,
    "title": "Welcome Back to School!",
    "excerpt": "We're excited to welcome all students back for the new academic year. Join us for orientation week.",
    "content": "Full content here...",
    "image_url": "/media/announcements/welcome-back.jpg",
    "order_index": 1,
    "is_published": true,
    "created_at": "2026-01-15T08:00:00Z"
  },
  {
    "id": 2,
    "title": "Science Fair 2026",
    "excerpt": "Annual Science Fair coming up! Students can register their projects starting next week.",
    "content": "Full content here...",
    "image_url": "/media/announcements/science-fair.jpg",
    "order_index": 2,
    "is_published": true,
    "created_at": "2026-01-20T10:00:00Z"
  }
]
```

---

## API Endpoints

### Public Endpoints

#### GET /api/announcements
**Description**: Get all published announcements

**Query Params**:
- `limit` (optional): Number of items (default: all)
- `offset` (optional): Pagination offset

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Welcome Back",
      "excerpt": "Short description...",
      "content": "Full content...",
      "image_url": "/media/announcements/image.jpg",
      "created_at": "2026-01-15T08:00:00Z"
    }
  ],
  "total": 10
}
```

#### GET /api/announcements/:id
**Description**: Get single announcement by ID

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Welcome Back",
    "excerpt": "Short description...",
    "content": "Full content...",
    "image_url": "/media/announcements/image.jpg",
    "created_at": "2026-01-15T08:00:00Z"
  }
}
```

### Admin Endpoints (Protected)

#### POST /api/announcements
**Description**: Create new announcement

**Headers**: `Authorization: Bearer <token>`

**Body** (multipart/form-data):
```
title: "New Announcement"
excerpt: "Short description"
content: "Full content"
image: <file>
order_index: 1
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "New Announcement",
    "image_url": "/media/announcements/abc123.jpg"
  }
}
```

#### PUT /api/announcements/:id
**Description**: Update announcement

**Headers**: `Authorization: Bearer <token>`

**Body**: Same as POST

#### DELETE /api/announcements/:id
**Description**: Delete announcement

**Headers**: `Authorization: Bearer <token>`

**Response**:
```json
{
  "success": true,
  "message": "Announcement deleted"
}
```

---

## Animation Specifications

### Slide Animation (Recommended)

**CSS Approach**:
```css
.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel-page {
  display: flex;
  gap: 2rem;
  transition: transform 0.5s ease-in-out;
}

.carousel-page.slide-left {
  transform: translateX(-100%);
}

.carousel-page.slide-right {
  transform: translateX(100%);
}
```

**Timing**: 500ms ease-in-out

---

### Fade Animation (Alternative)

```css
.carousel-page {
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
}

.carousel-page.fade-out {
  opacity: 0;
}
```

**Timing**: 400ms ease-in-out

---

## Configuration File

**Location**: `src/config/announcements.config.js`

```javascript
export const announcementConfig = {
  itemsPerPage: 3,
  autoPlayInterval: 8000, // 8 seconds
  transitionType: 'slide', // 'slide' | 'fade'
  transitionDuration: 500, // ms
  pauseOnHover: true,
  showPaginationDots: true,
  
  // Responsive breakpoints
  responsive: {
    mobile: {
      itemsPerPage: 1,
      breakpoint: 768
    },
    tablet: {
      itemsPerPage: 2,
      breakpoint: 1024
    },
    desktop: {
      itemsPerPage: 3,
      breakpoint: 1440
    }
  }
};
```

---

## File Structure

```
src/
├── components/
│   ├── AnnouncementSection.jsx
│   ├── AnnouncementSection.css
│   ├── AnnouncementCarousel.jsx
│   ├── AnnouncementCarousel.css
│   ├── AnnouncementCard.jsx
│   ├── AnnouncementCard.css
│   ├── AnnouncementModal.jsx
│   ├── AnnouncementModal.css
│   └── PaginationDots.jsx
│
├── admin/
│   ├── AdminDashboard.jsx
│   ├── AdminDashboard.css
│   ├── AnnouncementForm.jsx
│   ├── AnnouncementForm.css
│   ├── ImageUploader.jsx
│   └── ProtectedRoute.jsx
│
├── services/
│   └── announcementService.js  // API calls
│
├── config/
│   └── announcements.config.js
│
└── data/
    └── mockAnnouncements.json  // For Phase 1

public/
└── media/
    └── announcements/  // Uploaded images

server/  (Backend - separate from React)
├── index.js
├── routes/
│   └── announcements.js
├── controllers/
│   └── announcementController.js
├── models/
│   └── Announcement.js
├── middleware/
│   └── auth.js
└── database/
    └── db.sqlite
```

---

## Implementation Phases

### Phase 1: Frontend with Mock Data (Start Here)
1. Create mock data file
2. Build AnnouncementCard component
3. Build AnnouncementCarousel with pagination
4. Implement slide animations
5. Add auto-cycling
6. Build AnnouncementModal
7. Replace #home section in App.jsx
8. Test responsive behavior

### Phase 2: Backend Setup
1. Set up Express server
2. Create database schema
3. Implement API endpoints
4. Add image upload handling
5. Connect frontend to real API
6. Test CRUD operations

### Phase 3: Admin Interface
1. Create admin routes
2. Build AdminDashboard
3. Build AnnouncementForm
4. Build ImageUploader
5. Add authentication
6. Protect admin routes
7. Test full workflow

---

## Security Considerations

1. **Authentication**: Use JWT tokens for admin access
2. **File Upload**: Validate file types and sizes
3. **SQL Injection**: Use parameterized queries
4. **XSS**: Sanitize user input
5. **CSRF**: Implement CSRF tokens for forms
6. **Rate Limiting**: Limit API requests
7. **Image Storage**: Store outside web root or validate access

---

## Testing Checklist

### Frontend
- [ ] Announcements display correctly
- [ ] Pagination works (3 items per page)
- [ ] Auto-cycling advances every 8 seconds
- [ ] Animations are smooth
- [ ] Modal opens and closes correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Pause on hover works
- [ ] Keyboard navigation works

### Backend
- [ ] GET /api/announcements returns data
- [ ] POST creates announcement
- [ ] PUT updates announcement
- [ ] DELETE removes announcement
- [ ] Image upload works
- [ ] Authentication protects admin routes
- [ ] Validation catches errors

### Admin
- [ ] Login works
- [ ] Can create announcement
- [ ] Can edit announcement
- [ ] Can delete announcement
- [ ] Image upload shows preview
- [ ] Form validation works
- [ ] Changes reflect on public page

---

## Performance Optimization

1. **Lazy Load Images**: Use `loading="lazy"` attribute
2. **Image Optimization**: Resize and compress images on upload
3. **Caching**: Cache API responses for 5 minutes
4. **Pagination**: Limit database queries
5. **Debounce**: Debounce auto-cycle timer on interaction
6. **Code Splitting**: Lazy load admin components

---

## Accessibility

1. **Keyboard Navigation**: Tab through cards, Enter to open modal
2. **ARIA Labels**: Add aria-label to buttons and controls
3. **Alt Text**: Require alt text for images
4. **Focus Management**: Trap focus in modal
5. **Screen Reader**: Announce page changes
6. **Color Contrast**: Ensure WCAG AA compliance

---

## Next Steps

1. Review and approve this design
2. Start Phase 1 implementation
3. Create mock data file
4. Build components one by one
5. Test thoroughly before moving to Phase 2
