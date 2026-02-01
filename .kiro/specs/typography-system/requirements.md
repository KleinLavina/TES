# Typography System Requirements
## Tag-os Elementary School Website

**Feature Name:** typography-system  
**Created:** 2026-02-01  
**Status:** Draft

---

## Overview

Implement a comprehensive typography system using three custom fonts (Playwrite India Guides, Playwrite England Joined Guides, and Urbanist) to create a cohesive, readable, and visually appealing design hierarchy across the entire website.

---

## Font Inventory

### 1. Playwrite India Guides
- **Style:** Handwritten, cursive, warm
- **Best for:** Decorative elements, personal touch
- **Characteristics:** Friendly, approachable, educational feel

### 2. Playwrite England Joined Guides
- **Style:** Connected cursive, elegant
- **Best for:** Formal headings, emphasis
- **Characteristics:** Traditional, academic, sophisticated

### 3. Urbanist
- **Style:** Modern sans-serif, geometric
- **Best for:** Body text, UI elements
- **Characteristics:** Clean, readable, contemporary

---

## User Stories

### US-1: As a visitor, I want clear visual hierarchy
**Acceptance Criteria:**
- Different font styles clearly distinguish between headings, body text, and UI elements
- Font sizes create obvious importance levels (H1 > H2 > H3 > body)
- Consistent spacing and line heights improve readability

### US-2: As a parent/guardian, I want easy-to-read content
**Acceptance Criteria:**
- Body text uses highly readable sans-serif font (Urbanist)
- Sufficient contrast between text and background
- Appropriate font sizes for comfortable reading (minimum 16px for body)
- Line height provides adequate breathing room (1.6-1.8 for body text)

### US-3: As a school administrator, I want the brand to feel warm and educational
**Acceptance Criteria:**
- Handwritten fonts (Playwrite) used for decorative elements to convey warmth
- Professional sans-serif (Urbanist) maintains credibility
- Font choices reflect elementary school environment (friendly, approachable)

### US-4: As a developer, I want consistent font implementation
**Acceptance Criteria:**
- CSS variables defined for all font families
- Clear documentation for font usage by element type
- Fallback fonts specified for all font families
- Reusable CSS classes for common text styles

### US-5: As a mobile user, I want readable text on small screens
**Acceptance Criteria:**
- Responsive font sizes that scale appropriately
- Touch-friendly button text sizes (minimum 16px)
- Adequate spacing for mobile navigation

---

## Font Usage Plan

### 1. Titles / Logo
**Font:** Playwrite England Joined Guides  
**Reasoning:** Elegant cursive conveys tradition and academic excellence while maintaining warmth  
**Usage:**
- School name in header
- Main site logo text
- Hero section main headline

**Specifications:**
- Font size: 2rem - 4rem (responsive)
- Font weight: 400-600
- Letter spacing: 0.5px - 1px
- Line height: 1.2

---

### 2. Main Headings (H1, H2, H3)

#### H1 - Page Titles
**Font:** Playwrite England Joined Guides  
**Reasoning:** Creates strong visual impact, maintains brand identity  
**Specifications:**
- Font size: 2.5rem - 3.5rem
- Font weight: 600
- Letter spacing: 0.5px
- Line height: 1.2
- Margin bottom: 1.5rem

#### H2 - Section Headings
**Font:** Playwrite India Guides  
**Reasoning:** Softer, more approachable for content sections  
**Specifications:**
- Font size: 2rem - 2.5rem
- Font weight: 500
- Letter spacing: 0.3px
- Line height: 1.3
- Margin bottom: 1rem

#### H3 - Subsection Headings
**Font:** Urbanist  
**Reasoning:** Clean, readable for smaller headings  
**Specifications:**
- Font size: 1.5rem - 1.75rem
- Font weight: 600
- Letter spacing: 0.2px
- Line height: 1.4
- Margin bottom: 0.75rem

---

### 3. Body Content / Paragraphs
**Font:** Urbanist  
**Reasoning:** Highly readable sans-serif, excellent for long-form content  
**Specifications:**
- Font size: 1rem - 1.125rem (16px - 18px)
- Font weight: 400
- Letter spacing: 0.01em
- Line height: 1.7
- Margin bottom: 1rem
- Max width: 65-75 characters per line

---

### 4. Menus / Navigation
**Font:** Urbanist  
**Reasoning:** Clean, modern, easy to scan quickly  
**Specifications:**
- Font size: 0.95rem - 1rem
- Font weight: 500
- Letter spacing: 0.3px
- Line height: 1.5
- Text transform: None (natural case)

---

### 5. Buttons / CTAs
**Font:** Urbanist  
**Reasoning:** Clear, actionable, maintains UI consistency  
**Specifications:**
- Font size: 0.95rem - 1rem
- Font weight: 600
- Letter spacing: 0.5px
- Line height: 1.5
- Text transform: Uppercase (for primary CTAs)
- Padding: 0.75rem 1.5rem

---

### 6. Captions / Footnotes / Minor Text
**Font:** Urbanist  
**Reasoning:** Maintains readability at smaller sizes  
**Specifications:**
- Font size: 0.875rem - 0.9rem (14px - 14.4px)
- Font weight: 400
- Letter spacing: 0.02em
- Line height: 1.5
- Color: Slightly muted (e.g., #666)

---

### 7. Special Elements

#### Footer Headings
**Font:** Urbanist  
**Weight:** 600  
**Size:** 1rem

#### Newsletter/Form Labels
**Font:** Urbanist  
**Weight:** 500  
**Size:** 0.9rem

#### Decorative Quotes/Callouts
**Font:** Playwrite India Guides  
**Weight:** 400  
**Size:** 1.25rem - 1.5rem

---

## Implementation Requirements

### REQ-1: Font Loading
- Load fonts from Google Fonts or local files
- Implement font-display: swap for better performance
- Preload critical fonts for above-the-fold content

### REQ-2: CSS Variables
- Define all font families as CSS custom properties
- Define font sizes as CSS custom properties
- Define font weights as CSS custom properties

### REQ-3: Fallback Fonts
- Playwrite England Joined Guides → 'Brush Script MT', cursive, serif
- Playwrite India Guides → 'Comic Sans MS', cursive, sans-serif
- Urbanist → 'Inter', 'Helvetica Neue', Arial, sans-serif

### REQ-4: Responsive Typography
- Use clamp() for fluid typography
- Define breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Scale font sizes appropriately for each breakpoint

### REQ-5: Accessibility
- Maintain WCAG AA contrast ratios (4.5:1 for body text, 3:1 for large text)
- Allow user font size adjustments (use rem units)
- Ensure sufficient line height for readability

---

## Non-Functional Requirements

### Performance
- Font files should be optimized and subset if possible
- Total font file size should not exceed 200KB
- Fonts should load within 2 seconds on 3G connection

### Browser Support
- Support modern browsers (Chrome, Firefox, Safari, Edge)
- Graceful degradation to system fonts if custom fonts fail

### Maintainability
- Document all font usage in style guide
- Create reusable CSS utility classes
- Centralize font definitions in single file

---

## Out of Scope

- Custom font creation or modification
- Icon fonts (use SVG icons instead)
- Variable font implementation (unless fonts support it)
- Right-to-left (RTL) language support

---

## Success Metrics

1. **Readability Score:** Achieve Flesch Reading Ease score > 60
2. **Performance:** Font loading time < 2 seconds
3. **Consistency:** 100% of text elements use defined font system
4. **Accessibility:** Pass WCAG AA contrast requirements
5. **User Feedback:** Positive feedback on visual design and readability

---

## Dependencies

- Google Fonts API or local font files
- CSS preprocessor (optional, for better organization)
- Build system for font optimization

---

## Timeline Estimate

- **Phase 1:** Font setup and CSS variables (2 hours)
- **Phase 2:** Apply fonts to existing components (4 hours)
- **Phase 3:** Responsive adjustments and testing (2 hours)
- **Phase 4:** Documentation and style guide (1 hour)

**Total:** ~9 hours

---

## Notes

- Consider using font subsetting to reduce file sizes
- Test fonts on various devices and screen sizes
- Ensure fonts work well with school's color palette
- Consider adding font preloading for critical text
- Monitor Core Web Vitals impact after implementation
