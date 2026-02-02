# Featured Announcement System - Requirements

## Overview
Database-driven announcement system with CMS admin interface for Tag-os Elementary School website.

## User Stories

### Public User Stories
- **US-1**: As a visitor, I want to see featured announcements on the home page so I can stay informed about school news
- **US-2**: As a visitor, I want announcements to automatically cycle through pages so I can see multiple announcements without clicking
- **US-3**: As a visitor, I want smooth transitions between announcement pages so the experience feels polished
- **US-4**: As a visitor, I want to read more details about an announcement by clicking "Read more"

### Admin User Stories
- **US-5**: As an admin, I want to access the admin panel at /tes/admin/ so I can manage announcements
- **US-6**: As an admin, I want to create new announcements with title, description, and image
- **US-7**: As an admin, I want to edit existing announcements
- **US-8**: As an admin, I want to delete announcements
- **US-9**: As an admin, I want to reorder announcements to control display priority

## Functional Requirements

### Frontend (Public Pages)

#### FR-1: Announcement Display
- Display announcements as cards with:
  - Featured image
  - Title
  - Short description/excerpt
  - "Read more" button
- Maximum 3 cards per page view
- Replace content in /#home and /#about-the-school sections

#### FR-2: Pagination
- Group announcements in sets of 3
- Page 1: items 1-3
- Page 2: items 4-6
- Page 3: items 7-9
- Continue dynamically based on database records
- Data-driven pagination (not hardcoded)

#### FR-3: Auto-Cycling
- Automatically advance to next page after fixed interval (configurable, default: 8 seconds)
- Loop back to first page after last page
- Pause auto-cycle on user interaction (hover, click)

#### FR-4: Page Transitions
- Animated transitions between pages
- Options: slide (left/right) or fade
- Animation only on page switch, not initial load
- Smooth, professional animation timing

#### FR-5: Read More Action
- Click "Read more" to view full announcement
- Options: expand inline, modal overlay, or dedicated page
- Recommended: Modal overlay for better UX

### Backend & Data

#### FR-6: Database Structure
- Announcements table with fields:
  - id (primary key)
  - title (string, required)
  - excerpt (text, required)
  - content (text, optional - full content)
  - image_url (string, required)
  - order_index (integer, for manual ordering)
  - created_at (timestamp)
  - updated_at (timestamp)
  - is_published (boolean, default: true)

#### FR-7: Data Ordering
- Default: Most recent first (created_at DESC)
- Support manual ordering via order_index field
- Admin can drag-and-drop to reorder

#### FR-8: Configuration
- items_per_page: configurable (default: 3)
- auto_cycle_interval: configurable (default: 8000ms)
- transition_type: 'slide' | 'fade'
- Store in config file or database

### Admin Interface

#### FR-9: Admin Access
- URL: /tes/admin/
- Requires authentication (basic auth for now)
- Not accessible from public navigation
- Protected route

#### FR-10: Announcement Management
- List all announcements (table view)
- Create new announcement form
- Edit announcement form
- Delete announcement (with confirmation)
- Upload/change images
- Preview before publishing

#### FR-11: Image Upload
- Support common formats: JPG, PNG, WebP
- Image optimization/resizing
- Preview uploaded image
- Store in /public/media/announcements/

## Non-Functional Requirements

### NFR-1: Performance
- Lazy load images
- Optimize image sizes
- Smooth 60fps animations
- Fast page transitions (<300ms)

### NFR-2: Responsive Design
- Mobile: Stack cards vertically, 1 per page
- Tablet: 2 cards per page
- Desktop: 3 cards per page

### NFR-3: Accessibility
- Keyboard navigation for pagination
- ARIA labels for screen readers
- Alt text for images
- Focus management in modals

### NFR-4: Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript support required

## Technical Constraints

- **Frontend**: React JS (existing stack)
- **Backend**: Node.js + Express (recommended) or Firebase/Supabase
- **Database**: SQLite (development), PostgreSQL (production recommended)
- **Authentication**: Basic auth or JWT for admin
- **Animations**: CSS transitions or Framer Motion
- **Image Storage**: Local filesystem (/public/media/announcements/)

## Out of Scope (Future Enhancements)

- Advanced role-based permissions
- Publishing schedules (publish_at, expire_at)
- Draft/published workflow
- Multi-language support
- Analytics/view tracking
- Email notifications
- Social media integration
- Rich text editor (use textarea for now)

## Acceptance Criteria

### Public Pages
- [ ] Announcements display in cards with image, title, excerpt, and button
- [ ] Maximum 3 announcements per page
- [ ] Pagination works dynamically based on database records
- [ ] Auto-cycling advances every 8 seconds
- [ ] Smooth slide or fade transitions between pages
- [ ] "Read more" opens modal with full content
- [ ] Responsive on mobile, tablet, desktop
- [ ] No errors in console

### Admin Interface
- [ ] Admin accessible at /tes/admin/ with authentication
- [ ] Can create new announcements with all fields
- [ ] Can edit existing announcements
- [ ] Can delete announcements with confirmation
- [ ] Can upload and preview images
- [ ] Changes reflect immediately on public pages
- [ ] Form validation works correctly

## Priority

**Phase 1 (MVP)**: 
- Frontend announcement display
- Pagination and auto-cycling
- Basic animations
- Mock data (JSON file)

**Phase 2**:
- Backend API setup
- Database integration
- Admin interface (create, edit, delete)
- Image upload

**Phase 3**:
- Authentication
- Manual ordering
- Modal for "Read more"
- Polish and optimization

## Dependencies

- React Router (for /tes/admin/ route)
- Backend framework (Express.js recommended)
- Database (SQLite for dev, PostgreSQL for prod)
- Image upload library (multer for Express)
- Optional: Framer Motion for animations
- Optional: React Hook Form for admin forms

## Timeline Estimate

- Phase 1 (Frontend + Mock Data): 4-6 hours
- Phase 2 (Backend + Database): 6-8 hours
- Phase 3 (Auth + Polish): 4-6 hours
- **Total**: 14-20 hours

## Notes

- Start with mock data to build frontend first
- Use JSON file to simulate API responses
- Build admin interface after frontend is working
- Consider using Supabase or Firebase for faster backend setup
- Keep admin UI simple and functional (not fancy)
