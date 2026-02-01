# Typography System Design
## Tag-os Elementary School Website

**Feature Name:** typography-system  
**Created:** 2026-02-01  
**Status:** Draft

---

## Design Overview

This document provides detailed implementation guidelines for the typography system using Playwrite India Guides, Playwrite England Joined Guides, and Urbanist fonts.

---

## Font Loading Strategy

### Google Fonts Implementation

```html
<!-- Add to index.html <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playwrite+IN:wght@100..400&family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&family=Urbanist:ital,wght@100..900;0,100..900&display=swap" rel="stylesheet">
```

### CSS Font Face (Alternative - Local Hosting)

```css
@font-face {
  font-family: 'Playwrite England Joined Guides';
  src: url('/fonts/PlaywriteGBJ-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Playwrite India Guides';
  src: url('/fonts/PlaywriteIN-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Urbanist';
  src: url('/fonts/Urbanist-Variable.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

---

## CSS Variables System

### Root Variables Definition

```css
:root {
  /* Font Families */
  --font-display: 'Playwrite England Joined Guides', 'Brush Script MT', cursive, serif;
  --font-decorative: 'Playwrite India Guides', 'Comic Sans MS', cursive, sans-serif;
  --font-body: 'Urbanist', 'Inter', 'Helvetica Neue', Arial, sans-serif;
  
  /* Font Sizes - Base */
  --font-size-xs: 0.875rem;    /* 14px */
  --font-size-sm: 0.9375rem;   /* 15px */
  --font-size-base: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;    /* 18px */
  --font-size-xl: 1.25rem;     /* 20px */
  --font-size-2xl: 1.5rem;     /* 24px */
  --font-size-3xl: 2rem;       /* 32px */
  --font-size-4xl: 2.5rem;     /* 40px */
  --font-size-5xl: 3rem;       /* 48px */
  --font-size-6xl: 3.5rem;     /* 56px */
  
  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.2;
  --line-height-snug: 1.3;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.7;
  --line-height-loose: 1.8;
  
  /* Letter Spacing */
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.02em;
  --letter-spacing-wider: 0.05em;
}
```

---

## Typography Classes

### Heading Styles

```css
/* H1 - Page Titles */
.heading-1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: 0.5px;
  margin-bottom: 1.5rem;
  color: #1a4d2e;
}

/* H2 - Section Headings */
.heading-2 {
  font-family: var(--font-decorative);
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-snug);
  letter-spacing: 0.3px;
  margin-bottom: 1rem;
  color: #1a4d2e;
}

/* H3 - Subsection Headings */
.heading-3 {
  font-family: var(--font-body);
  font-size: clamp(1.5rem, 3vw, 1.75rem);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  letter-spacing: 0.2px;
  margin-bottom: 0.75rem;
  color: #333333;
}

/* H4 - Minor Headings */
.heading-4 {
  font-family: var(--font-body);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  margin-bottom: 0.5rem;
  color: #333333;
}
```

### Body Text Styles

```css
/* Body Text - Default */
.body-text {
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-relaxed);
  letter-spacing: var(--letter-spacing-wide);
  color: #333333;
  margin-bottom: 1rem;
}

/* Body Text - Large */
.body-text-lg {
  font-family: var(--font-body);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-relaxed);
  color: #333333;
}

/* Body Text - Small */
.body-text-sm {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  color: #666666;
}
```

### UI Element Styles

```css
/* Navigation Links */
.nav-link {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  letter-spacing: 0.3px;
  text-decoration: none;
  transition: color 0.2s ease;
}

/* Button Text */
.button-text {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

/* Button Text - Secondary */
.button-text-secondary {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  letter-spacing: 0.3px;
  text-transform: none;
}

/* Caption Text */
.caption {
  font-family: var(--font-body);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  letter-spacing: var(--letter-spacing-wide);
  color: #666666;
}

/* Label Text */
.label {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  letter-spacing: 0.02em;
  color: #333333;
}
```

### Special Styles

```css
/* Logo Text */
.logo-text {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: var(--font-weight-semibold);
  line-height: 1;
  letter-spacing: 0.5px;
  color: #1a4d2e;
}

/* Hero Headline */
.hero-headline {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-tight);
  letter-spacing: 1px;
  color: #ffffff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

/* Hero Subtitle */
.hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-normal);
  color: #f0f0f0;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}

/* Decorative Quote */
.quote-text {
  font-family: var(--font-decorative);
  font-size: clamp(1.25rem, 2vw, 1.5rem);
  font-weight: var(--font-weight-normal);
  line-height: var(--line-height-relaxed);
  font-style: italic;
  color: #1a4d2e;
}

/* Footer Heading */
.footer-heading {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  letter-spacing: 0.02em;
  color: #ffffff;
  text-transform: uppercase;
}
```

---

## Component-Specific Implementation

### Header Component

```css
/* Header Title */
.header__title {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.5px;
  transition: color 0.3s ease-in-out;
}

/* Header Navigation Links */
.header__nav-link {
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.3px;
  transition: color 0.2s ease, opacity 0.2s ease;
}
```

### Hero Section

```css
/* Hero Headline */
.hero-section__headline {
  font-family: var(--font-display);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: 1px;
  color: #ffffff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
}

/* Hero Subtitle */
.hero-section__subtitle {
  font-family: var(--font-body);
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  line-height: 1.6;
  color: #f0f0f0;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}
```

### Content Sections

```css
/* Section Headings */
.content-section h2 {
  font-family: var(--font-decorative);
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: var(--font-weight-medium);
  line-height: 1.3;
  letter-spacing: 0.3px;
  color: #1a4d2e;
  margin-bottom: 1.5rem;
}

/* Section Paragraphs */
.content-section p {
  font-family: var(--font-body);
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  line-height: 1.8;
  color: #333333;
  margin-bottom: 1rem;
  max-width: 800px;
}
```

### Footer Component

```css
/* Footer Headings */
.footer__heading {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: var(--font-weight-semibold);
  color: #ffffff;
  margin-bottom: 1.25rem;
}

/* Footer Links */
.footer__links a {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: var(--font-weight-normal);
  color: #a0a0a0;
  transition: color 0.2s;
}

/* Footer Description */
.footer__description {
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.7;
  color: #a0a0a0;
}
```

### Menu Overlay

```css
/* Menu Items */
.menu-overlay__item a {
  font-family: var(--font-body);
  font-size: 1.1rem;
  font-weight: var(--font-weight-medium);
  color: #1a4d2e;
  transition: background-color 0.2s, padding-left 0.2s;
}
```

---

## Responsive Typography

### Mobile (< 768px)

```css
@media (max-width: 768px) {
  :root {
    --font-size-3xl: 1.75rem;
    --font-size-4xl: 2rem;
    --font-size-5xl: 2.5rem;
    --font-size-6xl: 3rem;
  }
  
  .heading-1 {
    font-size: clamp(2rem, 8vw, 2.5rem);
  }
  
  .heading-2 {
    font-size: clamp(1.75rem, 6vw, 2rem);
  }
  
  .body-text {
    font-size: 1rem;
  }
}
```

### Tablet (768px - 1024px)

```css
@media (min-width: 768px) and (max-width: 1024px) {
  .heading-1 {
    font-size: clamp(2.25rem, 5vw, 3rem);
  }
  
  .heading-2 {
    font-size: clamp(1.875rem, 4vw, 2.25rem);
  }
}
```

---

## Accessibility Considerations

### Contrast Ratios

```css
/* Ensure WCAG AA compliance */
.body-text {
  color: #333333; /* 12.63:1 on white background */
}

.caption {
  color: #666666; /* 5.74:1 on white background */
}

/* Dark backgrounds */
.footer__links a {
  color: #a0a0a0; /* 4.54:1 on #1a1a1a background */
}
```

### Focus States

```css
/* Keyboard navigation */
a:focus-visible,
button:focus-visible {
  outline: 2px solid #1a4d2e;
  outline-offset: 4px;
  border-radius: 2px;
}
```

---

## Performance Optimization

### Font Subsetting

```css
/* Load only required character sets */
@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&text=ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&display=swap');
```

### Font Loading Strategy

```css
/* Critical fonts - preload */
<link rel="preload" href="/fonts/Urbanist-Variable.woff2" as="font" type="font/woff2" crossorigin>

/* Non-critical fonts - async load */
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playwrite+IN&display=swap" media="print" onload="this.media='all'">
```

---

## Testing Checklist

- [ ] All fonts load correctly on all browsers
- [ ] Fallback fonts display properly if custom fonts fail
- [ ] Font sizes are readable on mobile devices
- [ ] Contrast ratios meet WCAG AA standards
- [ ] Line heights provide comfortable reading experience
- [ ] Letter spacing is appropriate for each font
- [ ] Responsive breakpoints work correctly
- [ ] Performance metrics are within acceptable range
- [ ] Fonts render correctly on retina displays
- [ ] Print styles use appropriate fonts

---

## Migration Notes

### Existing Components to Update

1. **Header** - Apply display font to title
2. **Hero Section** - Apply display font to headline
3. **Content Sections** - Apply decorative font to H2, body font to paragraphs
4. **Footer** - Apply body font throughout
5. **Menu Overlay** - Apply body font to menu items
6. **Buttons** - Apply body font with appropriate weights

### CSS Files to Modify

- `src/index.css` - Add font variables and base styles
- `src/components/Header.css` - Update header typography
- `src/components/HeroSection.css` - Update hero typography
- `src/App.css` - Update content section typography
- `src/components/Footer.css` - Update footer typography
- `src/components/MenuOverlay.css` - Update menu typography

---

## Future Enhancements

- Implement variable font features if supported
- Add font loading animations
- Create typography playground/style guide page
- Implement dark mode typography adjustments
- Add print-specific typography styles
