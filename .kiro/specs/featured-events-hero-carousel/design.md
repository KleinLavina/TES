# Design Document: Featured Events & Announcements Hero Carousel

## Overview

The Featured Events & Announcements Hero Carousel system replaces static homepage sections with a dynamic, full-width hero banner that showcases upcoming events and announcements. The system consists of two main components:

1. **Public-Facing Hero Carousel**: A React component that displays featured items with fade transitions, manual navigation, and responsive design
2. **Administrative CMS Interface**: A management interface for creating, editing, and organizing events and announcements

The system integrates with the existing Tag-os Elementary School website architecture, reusing components like the Rich Text Editor, Image Cropper, and carousel logic while maintaining consistency with the existing Stories & Activities system.

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     Public Website                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         HeroCarousel Component                        │  │
│  │  - Loads featured items from localStorage             │  │
│  │  - Renders slides with fade transitions               │  │
│  │  - Provides navigation controls                       │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕
                    localStorage API
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   Admin Dashboard                           │
│  ┌──────────────────┐  ┌──────────────────────────────┐    │
│  │ Stories & Activ. │  │ Events & Announcements (NEW) │    │
│  │   Management     │  │  - EventAnnouncementList     │    │
│  │                  │  │  - EventAnnouncementForm     │    │
│  │                  │  │  - ImageUploadModal          │    │
│  │                  │  │  - RichTextEditor            │    │
│  └──────────────────┘  └──────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **Admin Creates/Edits Content** → CMS Form validates and saves to localStorage
2. **Public Site Loads** → HeroCarousel reads from localStorage, filters featured items
3. **User Navigates** → HeroCarousel updates current slide with fade animation

### Technology Stack

- **Frontend Framework**: React
- **Data Storage**: localStorage (consistent with existing Stories system)
- **Reused Components**:
  - `RichTextEditor.jsx` (existing)
  - `ImageCropper.jsx` (existing, configured for 3:2 ratio)
  - Carousel logic adapted from `AnnouncementCarousel.jsx`
- **New Components**:
  - `HeroCarousel.jsx`
  - `EventAnnouncementList.jsx`
  - `EventAnnouncementForm.jsx`

## Components and Interfaces

### 1. HeroCarousel Component

**Purpose**: Display featured events and announcements as a full-width hero banner with fade transitions.

**Props**:
```typescript
interface HeroCarouselProps {
  autoPlayInterval?: number;  // Optional auto-advance (default: disabled)
  showNavigation?: boolean;   // Show/hide navigation controls (default: true)
}
```

**State**:
```typescript
interface HeroCarouselState {
  featuredItems: EventAnnouncement[];
  currentIndex: number;
  isTransitioning: boolean;
}
```

**Key Methods**:
- `loadFeaturedItems()`: Fetch featured items from localStorage
- `nextSlide()`: Advance to next slide with fade transition
- `prevSlide()`: Go to previous slide with fade transition
- `goToSlide(index)`: Jump to specific slide
- `renderSlide(item)`: Render individual slide content

**Rendering Logic**:
- Apply background image with overlay
- Position text content over image with proper contrast
- Render rich text description using dangerouslySetInnerHTML or safe HTML parser
- Show/hide date and location conditionally
- Display category badge

### 2. EventAnnouncementList Component

**Purpose**: Display list of all events and announcements in the CMS with management controls.

**Props**:
```typescript
interface EventAnnouncementListProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (items: EventAnnouncement[]) => void;
}
```

**State**:
```typescript
interface EventAnnouncementListState {
  items: EventAnnouncement[];
  sortBy: 'order' | 'date' | 'title';
  filterBy: 'all' | 'featured' | 'published';
}
```

**Key Methods**:
- `loadItems()`: Load all items from localStorage
- `handleDelete(id)`: Delete item with confirmation
- `handleReorder(dragResult)`: Update item order via drag-and-drop
- `toggleFeatured(id)`: Toggle featured status
- `togglePublished(id)`: Toggle published status

**Features**:
- Drag-and-drop reordering
- Quick toggle for featured/published status
- Visual indicators for featured items
- Edit/Delete action buttons

### 3. EventAnnouncementForm Component

**Purpose**: Create and edit events and announcements with all required fields.

**Props**:
```typescript
interface EventAnnouncementFormProps {
  itemId?: string;           // undefined for new items
  onSave: (item: EventAnnouncement) => void;
  onCancel: () => void;
}
```

**State**:
```typescript
interface EventAnnouncementFormState {
  title: string;
  category: 'Event' | 'Announcement' | 'Custom';
  description: string;       // Rich text HTML
  eventDate?: Date;
  eventTime?: string;
  location?: string;
  featuredImage?: string;    // Base64 or URL
  isFeatured: boolean;
  isPublished: boolean;
  errors: Record<string, string>;
}
```

**Key Methods**:
- `loadItem(id)`: Load existing item for editing
- `validateForm()`: Validate required fields
- `handleSave()`: Save to localStorage
- `handleImageUpload()`: Open image upload modal
- `handleRichTextChange(html)`: Update description

**Validation Rules**:
- Title: Required, max 200 characters
- Category: Required, must be one of the enum values
- Description: Required
- Featured Image: Required
- Event Date: Optional, must be valid date
- Location: Optional, max 100 characters

### 4. ImageUploadModal Component (Reused)

**Purpose**: Upload and crop images to 3:2 aspect ratio.

**Configuration for this feature**:
```typescript
<ImageUploadModal
  aspectRatio={3/2}
  onSave={(croppedImage) => setFeaturedImage(croppedImage)}
  onClose={() => setShowModal(false)}
/>
```

The existing `ImageCropper.jsx` component will be reused with the aspect ratio locked to 3:2.

### 5. RichTextEditor Component (Reused)

**Purpose**: Provide WYSIWYG editing for event descriptions.

**Configuration for this feature**:
```typescript
<RichTextEditor
  value={description}
  onChange={(html) => setDescription(html)}
  toolbar={['bold', 'italic', 'underline', 'bulletList', 'numberedList', 'link']}
/>
```

## Data Models

### EventAnnouncement Model

```typescript
interface EventAnnouncement {
  id: string;                    // UUID
  title: string;                 // Max 200 chars
  category: 'Event' | 'Announcement' | 'Custom';
  description: string;           // Rich text HTML
  eventDate?: string;            // ISO 8601 date string
  eventTime?: string;            // HH:MM format
  location?: string;             // Max 100 chars
  featuredImage: string;         // Base64 or URL
  isFeatured: boolean;           // Show in hero carousel
  isPublished: boolean;          // Visible to public
  order: number;                 // Admin-defined order
  createdAt: string;             // ISO 8601 timestamp
  updatedAt: string;             // ISO 8601 timestamp
}
```

### localStorage Schema

**Key**: `tagos-events-announcements`

**Value Structure**:
```typescript
interface EventAnnouncementStorage {
  items: EventAnnouncement[];
  version: string;               // Schema version for migrations
}
```

**Storage Operations**:
```typescript
// Save
const saveItems = (items: EventAnnouncement[]) => {
  const data = { items, version: '1.0' };
  localStorage.setItem('tagos-events-announcements', JSON.stringify(data));
};

// Load
const loadItems = (): EventAnnouncement[] => {
  const data = localStorage.getItem('tagos-events-announcements');
  if (!data) return [];
  const parsed = JSON.parse(data);
  return parsed.items || [];
};

// Filter featured
const loadFeaturedItems = (): EventAnnouncement[] => {
  return loadItems()
    .filter(item => item.isFeatured && item.isPublished)
    .sort((a, b) => a.order - b.order);
};
```

## Carousel Animation Implementation

### Fade Transition Logic

The carousel uses CSS transitions for fade effects:

```css
.hero-slide {
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-slide.active {
  opacity: 1;
  position: relative;
}
```

**State Machine**:
```
[Slide A Active] → User clicks next → [Transitioning] → [Slide B Active]
     ↓                                      ↓                    ↓
  opacity: 1                          opacity: 0→1          opacity: 1
```

**Implementation**:
```typescript
const transitionToSlide = (newIndex: number) => {
  setIsTransitioning(true);
  
  // Fade out current slide
  setTimeout(() => {
    setCurrentIndex(newIndex);
    
    // Fade in new slide
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Match CSS transition duration
  }, 100);
};
```

### Navigation Controls

**Dot Navigation**:
- One dot per featured item
- Active dot highlighted
- Click to jump to specific slide

**Arrow Navigation**:
- Previous/Next buttons
- Wrap around (last → first, first → last)
- Disabled during transitions

## Responsive Design

### Breakpoints

```css
/* Mobile: < 768px */
.hero-carousel {
  height: 400px;
  padding: 20px;
}

.hero-title {
  font-size: 24px;
}

/* Tablet: 768px - 1024px */
@media (min-width: 768px) {
  .hero-carousel {
    height: 500px;
    padding: 40px;
  }
  
  .hero-title {
    font-size: 36px;
  }
}

/* Desktop: > 1024px */
@media (min-width: 1024px) {
  .hero-carousel {
    height: 600px;
    padding: 60px;
  }
  
  .hero-title {
    font-size: 48px;
  }
}
```

### Image Handling

- Use `background-size: cover` for featured images
- Apply `background-position: center` for optimal cropping
- Ensure 3:2 aspect ratio is maintained across all screen sizes
- Use CSS object-fit as fallback for img tags

## Admin Dashboard Integration

### Tab Structure

```typescript
interface AdminDashboardState {
  activeTab: 'stories' | 'events';
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('stories');
  
  return (
    <div className="admin-dashboard">
      <nav className="admin-tabs">
        <button 
          className={activeTab === 'stories' ? 'active' : ''}
          onClick={() => setActiveTab('stories')}
        >
          Stories & Activities
        </button>
        <button 
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          Events & Announcements
        </button>
      </nav>
      
      <div className="admin-content">
        {activeTab === 'stories' && <AnnouncementList />}
        {activeTab === 'events' && <EventAnnouncementList />}
      </div>
    </div>
  );
};
```

### Shared Infrastructure

Both management sections share:
- Authentication (existing AdminLogin)
- Layout and styling
- Modal components
- Form validation utilities
- localStorage access patterns

## Static Section Removal

### Implementation Approach

**Option 1: Conditional Rendering (Recommended)**
```typescript
// In App.jsx or main layout component
const [showStaticSections, setShowStaticSections] = useState(false);

return (
  <>
    <HeroCarousel />
    {showStaticSections && (
      <>
        <AboutSchool />
        <Academics />
      </>
    )}
  </>
);
```

**Option 2: Comment Out**
- Keep components in codebase but commented
- Easy to restore if needed
- Maintains git history

**Option 3: Feature Flag**
```typescript
const FEATURES = {
  HERO_CAROUSEL: true,
  STATIC_SECTIONS: false
};
```

The design recommends Option 1 (conditional rendering) for flexibility and easy rollback.



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Single Slide Visibility

*For any* carousel state with multiple featured items, exactly one slide should be visible (have active styling) at any given time.

**Validates: Requirements 2.2**

### Property 2: Complete Slide Rendering

*For any* event announcement with all fields populated (title, category, description, date, location, image), the rendered slide should contain all of these elements in the DOM output.

**Validates: Requirements 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9**

### Property 3: Conditional Field Rendering

*For any* event announcement, if a field (date, time, location) is undefined or empty, that field should not appear in the rendered slide output.

**Validates: Requirements 2.6, 2.7**

### Property 4: Rich Text Preservation

*For any* rich text HTML content in the description field, rendering the slide should preserve all HTML tags and formatting without escaping or stripping them.

**Validates: Requirements 7.8**

### Property 5: Navigation Control Interaction

*For any* valid slide index in the carousel, clicking the corresponding navigation control should update the current slide index to that value.

**Validates: Requirements 3.3**

### Property 6: CRUD Operations Persistence

*For any* valid event announcement data:
- Creating it should add it to localStorage with a unique ID
- Editing it should update the stored data while preserving the ID
- Deleting it should remove it from localStorage

**Validates: Requirements 5.1, 5.2, 5.3, 11.2**

### Property 7: Featured and Published Filtering

*For any* collection of event announcements in localStorage, the Hero Carousel should display only those items where both `isFeatured === true` AND `isPublished === true`.

**Validates: Requirements 9.2, 9.3, 5.6**

### Property 8: Reordering Persistence

*For any* list of event announcements, if an administrator reorders them and saves, then reloading the data from localStorage should return the items in the new order.

**Validates: Requirements 5.4, 10.3, 10.4**

### Property 9: Order-Based Sorting

*For any* collection of featured items with defined order values, the carousel should display them sorted by the `order` field in ascending order.

**Validates: Requirements 10.1**

### Property 10: Date-Based Fallback Sorting

*For any* collection of featured items where order values are undefined or equal, the carousel should sort them by `eventDate` in ascending order (earliest first).

**Validates: Requirements 10.2**

### Property 11: Form Validation

*For any* event announcement form submission:
- If required fields (title, category, description, featuredImage) are missing, validation should fail and return error messages
- If all required fields are present, validation should pass

**Validates: Requirements 6.9**

### Property 12: Image Aspect Ratio Enforcement

*For any* uploaded and cropped image, the stored image data should have dimensions that maintain a 3:2 width-to-height ratio (within a small tolerance for rounding).

**Validates: Requirements 8.1, 8.4**

### Property 13: Accessibility Labels

*For any* navigation control (dot, arrow, or keyboard control) in the carousel, it should have an `aria-label` or `aria-labelledby` attribute that describes its function.

**Validates: Requirements 13.2, 13.5**

### Property 14: localStorage Round Trip

*For any* valid event announcement, saving it to localStorage and then immediately loading all items should return a collection that includes an equivalent item (same field values).

**Validates: Requirements 11.1, 11.2, 11.3**

## Error Handling

### Form Validation Errors

**Scenario**: User submits form with missing required fields

**Handling**:
- Display inline error messages next to each invalid field
- Prevent form submission
- Maintain user's input for valid fields
- Focus on first invalid field

**Error Messages**:
```typescript
const ERROR_MESSAGES = {
  TITLE_REQUIRED: 'Title is required',
  TITLE_TOO_LONG: 'Title must be 200 characters or less',
  CATEGORY_REQUIRED: 'Please select a category',
  DESCRIPTION_REQUIRED: 'Description is required',
  IMAGE_REQUIRED: 'Featured image is required',
  INVALID_DATE: 'Please enter a valid date',
  LOCATION_TOO_LONG: 'Location must be 100 characters or less'
};
```

### localStorage Errors

**Scenario**: localStorage is full or unavailable

**Handling**:
```typescript
const saveWithErrorHandling = (items: EventAnnouncement[]) => {
  try {
    localStorage.setItem('tagos-events-announcements', JSON.stringify({ items, version: '1.0' }));
    return { success: true };
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      return { 
        success: false, 
        error: 'Storage limit exceeded. Please delete some items or images.' 
      };
    }
    return { 
      success: false, 
      error: 'Unable to save. Please check your browser settings.' 
    };
  }
};
```

### Image Upload Errors

**Scenario**: Image file is too large or wrong format

**Handling**:
- Validate file size (max 5MB recommended)
- Validate file type (JPEG, PNG, WebP only)
- Display clear error message
- Allow user to select different file

```typescript
const validateImageFile = (file: File): { valid: boolean; error?: string } => {
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Please upload a JPEG, PNG, or WebP image' };
  }
  
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'Image must be smaller than 5MB' };
  }
  
  return { valid: true };
};
```

### Empty Carousel State

**Scenario**: No featured items exist

**Handling**:
- Display placeholder message: "No featured events or announcements at this time"
- Optionally show a default image or school logo
- Ensure layout doesn't break
- Hide navigation controls

### Data Migration

**Scenario**: localStorage schema version changes

**Handling**:
```typescript
const loadItemsWithMigration = (): EventAnnouncement[] => {
  const data = localStorage.getItem('tagos-events-announcements');
  if (!data) return [];
  
  const parsed = JSON.parse(data);
  
  // Migrate from older versions
  if (!parsed.version || parsed.version === '1.0') {
    // Current version, no migration needed
    return parsed.items || [];
  }
  
  // Future migrations would go here
  return parsed.items || [];
};
```

## Testing Strategy

### Dual Testing Approach

This feature requires both **unit tests** and **property-based tests** for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

Both testing approaches are complementary and necessary. Unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across a wide range of inputs.

### Property-Based Testing Configuration

**Library Selection**: 
- For JavaScript/React: Use **fast-check** library
- Install: `npm install --save-dev fast-check`

**Test Configuration**:
- Each property test MUST run minimum 100 iterations
- Each test MUST include a comment tag referencing the design property
- Tag format: `// Feature: featured-events-hero-carousel, Property {number}: {property_text}`

**Example Property Test Structure**:
```typescript
import fc from 'fast-check';

// Feature: featured-events-hero-carousel, Property 7: Featured and Published Filtering
test('carousel displays only featured and published items', () => {
  fc.assert(
    fc.property(
      fc.array(eventAnnouncementArbitrary()),
      (items) => {
        // Save items to localStorage
        saveItems(items);
        
        // Load featured items
        const featured = loadFeaturedItems();
        
        // Verify all returned items are featured AND published
        featured.forEach(item => {
          expect(item.isFeatured).toBe(true);
          expect(item.isPublished).toBe(true);
        });
        
        // Verify no featured+published items are missing
        const expectedCount = items.filter(
          i => i.isFeatured && i.isPublished
        ).length;
        expect(featured.length).toBe(expectedCount);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Testing Focus Areas

Unit tests should focus on:

1. **Specific Examples**:
   - Rendering a slide with all fields populated
   - Rendering a slide with only required fields
   - Empty carousel state

2. **Edge Cases**:
   - Single item in carousel
   - Very long titles or descriptions
   - Missing optional fields
   - Invalid date formats

3. **Error Conditions**:
   - Form validation with missing required fields
   - localStorage quota exceeded
   - Invalid image file types
   - Image file too large

4. **Integration Points**:
   - Admin dashboard tab switching
   - Form submission and list update
   - Carousel data refresh after CMS changes

### Test Data Generators (Arbitraries)

For property-based testing, create generators for random test data:

```typescript
import fc from 'fast-check';

const eventAnnouncementArbitrary = () => fc.record({
  id: fc.uuid(),
  title: fc.string({ minLength: 1, maxLength: 200 }),
  category: fc.constantFrom('Event', 'Announcement', 'Custom'),
  description: fc.string({ minLength: 1, maxLength: 1000 }),
  eventDate: fc.option(fc.date().map(d => d.toISOString())),
  eventTime: fc.option(fc.string({ minLength: 5, maxLength: 5 })), // HH:MM
  location: fc.option(fc.string({ maxLength: 100 })),
  featuredImage: fc.string(), // Base64 or URL
  isFeatured: fc.boolean(),
  isPublished: fc.boolean(),
  order: fc.integer({ min: 0, max: 1000 }),
  createdAt: fc.date().map(d => d.toISOString()),
  updatedAt: fc.date().map(d => d.toISOString())
});
```

### Component Testing

**HeroCarousel Component**:
- Test slide rendering with various data combinations
- Test navigation control interactions
- Test fade transition CSS classes
- Test keyboard navigation
- Test accessibility attributes

**EventAnnouncementForm Component**:
- Test form field rendering
- Test validation logic
- Test save/cancel actions
- Test image upload integration
- Test rich text editor integration

**EventAnnouncementList Component**:
- Test item list rendering
- Test drag-and-drop reordering
- Test delete confirmation
- Test featured/published toggles
- Test edit action

### Integration Testing

**Admin to Public Flow**:
1. Create event in CMS
2. Mark as featured and published
3. Verify it appears in Hero Carousel
4. Edit event in CMS
5. Verify changes reflect in Hero Carousel
6. Unmark as featured
7. Verify it disappears from Hero Carousel

**localStorage Persistence**:
1. Create multiple events
2. Reload page
3. Verify all events persist
4. Reorder events
5. Reload page
6. Verify order persists

### Accessibility Testing

- Run automated accessibility checks (axe-core or similar)
- Test keyboard navigation (Tab, Arrow keys, Enter, Escape)
- Test screen reader compatibility
- Verify ARIA labels and roles
- Check color contrast ratios

### Performance Considerations

- Test carousel with 1, 5, 10, 20+ featured items
- Measure render time for slides with large images
- Test localStorage read/write performance with many items
- Verify smooth fade transitions (60fps target)

### Browser Compatibility

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Manual Testing Checklist

- [ ] Hero carousel displays correctly on homepage
- [ ] Static sections are removed/hidden
- [ ] Carousel navigation works (dots and arrows)
- [ ] Fade transitions are smooth
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Admin dashboard shows both tabs
- [ ] Can create new event/announcement
- [ ] Can edit existing items
- [ ] Can delete items with confirmation
- [ ] Can reorder items via drag-and-drop
- [ ] Can toggle featured/published status
- [ ] Image cropper enforces 3:2 ratio
- [ ] Rich text editor formats text correctly
- [ ] Form validation shows appropriate errors
- [ ] Changes in CMS reflect immediately in carousel
- [ ] Data persists across page reloads
- [ ] Keyboard navigation works
- [ ] Screen reader announces content correctly
