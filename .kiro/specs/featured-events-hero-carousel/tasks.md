# Implementation Plan: Featured Events & Announcements Hero Carousel

## Overview

This implementation plan breaks down the Featured Events & Announcements Hero Carousel system into discrete, incremental coding tasks. The approach prioritizes building core functionality first, then adding CMS capabilities, and finally integrating everything together. Each task builds on previous work to ensure no orphaned code.

## Tasks

- [x] 1. Set up data models and localStorage utilities
  - Create `EventAnnouncement` TypeScript interface/type definition
  - Implement `saveItems()` function to persist data to localStorage
  - Implement `loadItems()` function to retrieve all items from localStorage
  - Implement `loadFeaturedItems()` function to filter and sort featured items
  - Add error handling for localStorage quota exceeded
  - _Requirements: 11.1, 11.2, 11.3, 9.2, 9.3, 10.1, 10.2_

- [ ] 1.1 Write property tests for localStorage operations
  - **Property 6: CRUD Operations Persistence**
  - **Property 14: localStorage Round Trip**
  - **Validates: Requirements 11.1, 11.2, 11.3**

- [ ] 1.2 Write unit tests for localStorage error handling
  - Test quota exceeded scenario
  - Test invalid data scenarios
  - _Requirements: 11.2_

- [x] 2. Create HeroCarousel component structure
  - Create `HeroCarousel.jsx` and `HeroCarousel.css` files
  - Implement component state management (currentIndex, featuredItems, isTransitioning)
  - Implement `loadFeaturedItems()` on component mount
  - Create basic full-width container with responsive height breakpoints
  - _Requirements: 2.1, 9.1_

- [ ] 2.1 Write unit test for HeroCarousel mounting and data loading
  - Test component renders without errors
  - Test data loads from localStorage on mount
  - _Requirements: 2.1, 9.1_

- [x] 3. Implement slide rendering logic
  - Create `renderSlide()` method to display individual slide content
  - Render category label, title, and rich text description
  - Conditionally render event date, time, and location when present
  - Apply featured image as background with CSS
  - Add semi-transparent overlay for text readability
  - Ensure only one slide is visible at a time (active class)
  - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9_

- [ ] 3.1 Write property tests for slide rendering
  - **Property 2: Complete Slide Rendering**
  - **Property 3: Conditional Field Rendering**
  - **Property 4: Rich Text Preservation**
  - **Validates: Requirements 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 7.8**

- [ ] 3.2 Write unit tests for slide rendering edge cases
  - Test slide with all fields populated
  - Test slide with only required fields
  - Test slide with very long title/description
  - _Requirements: 2.2, 2.3, 2.4, 2.5_

- [x] 4. Implement carousel navigation and animations
  - Add navigation controls (dots and/or arrows)
  - Implement `nextSlide()`, `prevSlide()`, and `goToSlide(index)` methods
  - Add fade-in/fade-out CSS transitions using opacity
  - Implement transition state management to prevent rapid clicking
  - Add keyboard navigation support (Arrow keys, Tab, Enter)
  - Ensure no sliding/horizontal scroll animations are used
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 13.3_

- [ ] 4.1 Write property test for navigation interactions
  - **Property 5: Navigation Control Interaction**
  - **Validates: Requirements 3.3**

- [ ] 4.2 Write unit tests for navigation edge cases
  - Test navigation with single item
  - Test wrap-around (last to first, first to last)
  - Test keyboard navigation
  - _Requirements: 3.2, 3.3, 13.3_

- [x] 5. Add accessibility features to HeroCarousel
  - Add ARIA labels to navigation controls (aria-label, aria-current)
  - Add alt text or aria-label for background images
  - Ensure keyboard focus is visible
  - Test with screen reader (manual verification)
  - _Requirements: 13.2, 13.5, 13.3_

- [ ] 5.1 Write property test for accessibility labels
  - **Property 13: Accessibility Labels**
  - **Validates: Requirements 13.2, 13.5**

- [x] 6. Integrate HeroCarousel into homepage
  - Import and render HeroCarousel component in main App.jsx or homepage
  - Remove or conditionally hide existing "About School" section
  - Remove or conditionally hide existing "Academics" section
  - Verify full-width display and responsive behavior
  - _Requirements: 1.1, 1.2, 2.1_

- [ ] 6.1 Write unit tests for static section removal
  - Test that About School section is not rendered
  - Test that Academics section is not rendered
  - _Requirements: 1.1, 1.2_

- [ ] 7. Checkpoint - Verify carousel displays correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Create EventAnnouncementForm component
  - Create `EventAnnouncementForm.jsx` and `EventAnnouncementForm.css` files
  - Add form fields: title (text), category (dropdown), description (RichTextEditor)
  - Add optional fields: eventDate, eventTime, location
  - Add featured image upload button (opens ImageUploadModal)
  - Add featured checkbox and published toggle
  - Implement form state management
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

- [ ] 8.1 Write unit tests for form field rendering
  - Test all form fields are rendered
  - Test dropdown has correct options
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8_

- [x] 9. Implement form validation and save logic
  - Create `validateForm()` function to check required fields
  - Display inline error messages for invalid fields
  - Implement `handleSave()` to persist data to localStorage
  - Generate unique ID for new items (use crypto.randomUUID() or similar)
  - Update existing items while preserving ID
  - Clear form after successful save
  - _Requirements: 6.9, 5.1, 5.2_

- [ ] 9.1 Write property test for form validation
  - **Property 11: Form Validation**
  - **Validates: Requirements 6.9**

- [ ] 9.2 Write unit tests for form validation edge cases
  - Test validation with missing required fields
  - Test validation with all fields present
  - Test title length limit (200 chars)
  - Test location length limit (100 chars)
  - _Requirements: 6.9_

- [x] 10. Integrate ImageUploadModal with 3:2 aspect ratio
  - Import existing ImageUploadModal component
  - Configure ImageCropper with aspectRatio={3/2}
  - Handle image upload and save cropped image to form state
  - Display preview of uploaded image in form
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 10.1 Write property test for image aspect ratio
  - **Property 12: Image Aspect Ratio Enforcement**
  - **Validates: Requirements 8.1, 8.4**

- [ ] 10.2 Write unit tests for image upload
  - Test invalid file type rejection
  - Test file size limit (5MB)
  - _Requirements: 8.1_

- [x] 11. Create EventAnnouncementList component
  - Create `EventAnnouncementList.jsx` and `EventAnnouncementList.css` files
  - Load and display all items from localStorage
  - Show item preview with title, category, featured/published status
  - Add Edit and Delete buttons for each item
  - Display visual indicator for featured items
  - _Requirements: 5.1, 5.2, 5.3_

- [ ] 11.1 Write unit tests for list rendering
  - Test list displays all items
  - Test featured items have visual indicator
  - Test edit/delete buttons are present
  - _Requirements: 5.1, 5.2, 5.3_

- [x] 12. Implement delete functionality with confirmation
  - Add delete confirmation dialog/modal
  - Implement `handleDelete(id)` to remove item from localStorage
  - Refresh list after deletion
  - _Requirements: 5.3_

- [ ] 12.1 Write property test for delete operation
  - **Property 6: CRUD Operations Persistence** (delete portion)
  - **Validates: Requirements 5.3**

- [x] 13. Implement drag-and-drop reordering
  - Add drag-and-drop library or implement custom drag handlers
  - Update item `order` field based on new position
  - Persist new order to localStorage
  - Refresh list to show new order
  - _Requirements: 5.4, 10.3_

- [ ] 13.1 Write property tests for reordering
  - **Property 8: Reordering Persistence**
  - **Property 9: Order-Based Sorting**
  - **Validates: Requirements 5.4, 10.1, 10.3, 10.4**

- [x] 14. Implement featured and published toggles
  - Add toggle buttons/checkboxes in list for quick status changes
  - Implement `toggleFeatured(id)` and `togglePublished(id)` functions
  - Update localStorage immediately on toggle
  - Refresh list to show updated status
  - _Requirements: 5.5, 5.6_

- [ ] 14.1 Write property test for featured filtering
  - **Property 7: Featured and Published Filtering**
  - **Validates: Requirements 5.5, 5.6, 9.2, 9.3**

- [x] 15. Update AdminDashboard with tabs
  - Modify `AdminDashboard.jsx` to include tab navigation
  - Create tabs for "Stories & Activities" and "Events & Announcements"
  - Implement tab switching logic
  - Render EventAnnouncementList in Events & Announcements tab
  - Ensure existing Stories & Activities tab still works
  - _Requirements: 4.1, 4.2, 4.4_

- [ ] 15.1 Write unit tests for admin dashboard tabs
  - Test both tabs are rendered
  - Test tab switching works
  - Test correct content displays for each tab
  - _Requirements: 4.1, 4.2, 4.4_

- [x] 16. Wire EventAnnouncementForm to EventAnnouncementList
  - Add "Create New" button in EventAnnouncementList
  - Show EventAnnouncementForm when creating or editing
  - Pass item ID to form for editing
  - Refresh list after form save
  - Handle form cancel to return to list view
  - _Requirements: 5.1, 5.2_

- [x] 17. Implement date-based fallback sorting
  - Update `loadFeaturedItems()` to sort by eventDate when order is undefined
  - Handle items with no date (place at end)
  - Ensure sorting is stable and consistent
  - _Requirements: 10.2_

- [ ] 17.1 Write property test for date-based sorting
  - **Property 10: Date-Based Fallback Sorting**
  - **Validates: Requirements 10.2**

- [x] 18. Add empty state handling
  - Display placeholder message in HeroCarousel when no featured items exist
  - Hide navigation controls when carousel is empty
  - Ensure layout doesn't break with empty state
  - _Requirements: 9.1_

- [ ] 18.1 Write unit test for empty carousel state
  - Test placeholder message displays
  - Test navigation controls are hidden
  - _Requirements: 9.1_

- [x] 19. Implement responsive design and styling
  - Add CSS media queries for mobile, tablet, desktop breakpoints
  - Adjust hero carousel height for different screen sizes
  - Adjust typography sizes for different screen sizes
  - Ensure touch-friendly navigation on mobile
  - Test image display maintains 3:2 ratio without distortion
  - _Requirements: 2.10, 8.5_

- [ ] 19.1 Write unit test for image CSS properties
  - Test background-size: cover is applied
  - Test background-position: center is applied
  - _Requirements: 8.5_

- [x] 20. Add contrast overlay for text readability
  - Apply semi-transparent dark overlay to background images
  - Ensure text color provides sufficient contrast
  - Test with various background images (light and dark)
  - _Requirements: 2.9, 13.1_

- [ ] 20.1 Write unit test for overlay rendering
  - Test overlay element is present
  - Test overlay has appropriate opacity
  - _Requirements: 2.9, 13.1_

- [ ] 21. Final integration and testing
  - Test complete flow: create event in CMS → appears in carousel
  - Test edit flow: edit event in CMS → changes reflect in carousel
  - Test delete flow: delete event in CMS → removed from carousel
  - Test featured toggle: unmark featured → removed from carousel
  - Test published toggle: unpublish → removed from carousel
  - Verify data persists across page reloads
  - _Requirements: 5.1, 5.2, 5.3, 5.5, 5.6, 11.4_

- [ ] 21.1 Write integration tests for admin-to-public flow
  - Test create → display flow
  - Test edit → update flow
  - Test delete → remove flow
  - Test featured toggle → visibility flow
  - _Requirements: 5.1, 5.2, 5.3, 5.5, 5.6_

- [ ] 22. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across many generated inputs
- Unit tests validate specific examples, edge cases, and error conditions
- The implementation reuses existing components (RichTextEditor, ImageCropper, ImageUploadModal) to maintain consistency
- localStorage is used for data persistence, consistent with the existing Stories system
