# Staff Directory Feature - Requirements

## Overview
Create a staff directory section that displays the school principal and teachers with expandable functionality. All content should be manageable through the existing CMS at `/tes/admin/`.

## User Stories

### 1. Principal Display
**As a** website visitor  
**I want to** see the school principal's profile prominently displayed  
**So that** I can identify the school leadership

**Acceptance Criteria:**
- Principal section displays profile picture, name, title/status, and brief bio
- Profile picture is circular or professional format
- Section is visually distinct and prominent
- Responsive layout works on all devices

### 2. Teacher Directory Expansion
**As a** website visitor  
**I want to** expand the section to view all teachers  
**So that** I can learn about the teaching staff

**Acceptance Criteria:**
- Right-pointing arrow icon is visible next to principal section
- On hover, arrow shows "See Teachers" tooltip/indicator
- Clicking arrow expands section to reveal teacher profiles
- Smooth animation for expansion/collapse
- Teachers are displayed in a grid layout (responsive)
- Teachers are ordered by grade level (Grade 1, Grade 2, etc.)

### 3. Teacher Profiles
**As a** website visitor  
**I want to** view individual teacher information  
**So that** I can learn about each teacher's role and background

**Acceptance Criteria:**
- Each teacher card shows: profile picture, name, grade level, subject (if applicable), brief bio
- Cards have consistent styling with principal card
- Profile pictures are properly sized and formatted
- Layout is clean and professional

### 4. Pagination
**As a** website visitor  
**I want to** navigate through multiple pages of teachers if there are many  
**So that** the page doesn't become too long

**Acceptance Criteria:**
- If more than 6 teachers, show pagination controls
- "Next" and "Previous" buttons for navigation
- Page indicator shows current page (e.g., "Page 1 of 3")
- Smooth transition between pages

### 5. CMS Management - Principal
**As a** school administrator  
**I want to** manage principal information through the CMS  
**So that** I can update details without code changes

**Acceptance Criteria:**
- Admin panel has "Staff" or "Principal" section
- Can upload/change principal profile picture
- Can edit name, title, and bio
- Can set principal as active/inactive
- Changes reflect immediately on frontend
- Image upload with cropping functionality (reuse existing image cropper)

### 6. CMS Management - Teachers
**As a** school administrator  
**I want to** manage teacher profiles through the CMS  
**So that** I can add, edit, or remove teachers easily

**Acceptance Criteria:**
- Admin panel has "Teachers" management section
- Can add new teacher with: name, profile picture, grade level, subject, bio
- Can edit existing teacher information
- Can delete teachers
- Can reorder teachers or set custom sort order
- Grade level is selectable from dropdown (Grade 1-6, Kindergarten, etc.)
- Changes reflect immediately on frontend
- Image upload with cropping functionality

### 7. Data Persistence
**As a** system  
**I want to** store staff data persistently  
**So that** information is retained across sessions

**Acceptance Criteria:**
- Staff data stored in localStorage (consistent with existing CMS pattern)
- Data structure supports principal and multiple teachers
- Data includes all required fields plus metadata (created_at, updated_at, is_published)
- Fallback to mock data if no CMS data exists

## Technical Requirements

### Data Structure

#### Principal Object
```json
{
  "id": "principal-1",
  "name": "Dr. Maria Santos",
  "title": "School Principal",
  "bio": "Brief biography...",
  "profile_image": "/path/to/image.jpg",
  "is_published": true,
  "created_at": "2026-01-15T10:00:00Z",
  "updated_at": "2026-01-15T10:00:00Z"
}
```

#### Teacher Object
```json
{
  "id": "teacher-1",
  "name": "Ms. Jane Doe",
  "grade_level": "Grade 1",
  "subject": "Mathematics",
  "bio": "Brief biography...",
  "profile_image": "/path/to/image.jpg",
  "sort_order": 1,
  "is_published": true,
  "created_at": "2026-01-15T10:00:00Z",
  "updated_at": "2026-01-15T10:00:00Z"
}
```

### Frontend Components
- `StaffSection.jsx` - Main container component
- `PrincipalCard.jsx` - Principal profile display
- `TeacherGrid.jsx` - Grid layout for teachers
- `TeacherCard.jsx` - Individual teacher profile card
- `StaffSection.css` - Styling

### Admin Components
- `StaffDashboard.jsx` - Main admin view with tabs for Principal/Teachers
- `PrincipalForm.jsx` - Form for editing principal info
- `TeacherForm.jsx` - Form for adding/editing teachers
- `TeacherList.jsx` - List view of all teachers with edit/delete actions

### Storage
- localStorage key: `principal` (single object)
- localStorage key: `teachers` (array of objects)
- Utility functions in `src/utils/staffStorage.js`

## Mock Data Requirements
- 1 principal with placeholder image and details
- 6 teachers with placeholder images and details
- Teachers assigned to Grade 1-6 (one per grade)
- Use placeholder image service (e.g., UI Avatars or similar)

## Design Considerations
- Section positioned after "About School" section
- Consistent with existing site design (colors, typography, spacing)
- Smooth animations for expand/collapse
- Hover effects on cards
- Responsive breakpoints: mobile (1 column), tablet (2 columns), desktop (3 columns)
- Arrow icon with smooth rotation animation when expanded

## Accessibility
- Proper ARIA labels for expand/collapse button
- Keyboard navigation support
- Alt text for all profile images
- Focus indicators for interactive elements
- Screen reader announcements for state changes

## Future Enhancements (Out of Scope)
- Email contact links for staff
- Individual staff detail pages
- Staff search/filter functionality
- Department grouping
- Staff achievements/awards section
