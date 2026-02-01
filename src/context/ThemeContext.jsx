import { createContext, useContext, useEffect, useState, useCallback } from 'react';

/**
 * Theme Context for managing light/dark modes
 * Mimics next-themes behavior with Animate UI-style transitions
 */
const ThemeContext = createContext({
  theme: 'light',
  resolvedTheme: 'light',
  setTheme: () => {},
  isTransitioning: false,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState('light');
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const root = document.documentElement;
    
    // Apply initial theme without animation
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    setThemeState(savedTheme);
    setResolvedTheme(savedTheme);
    setMounted(true);
  }, []);

  // Trigger swipe animation and theme change
  const triggerThemeTransition = useCallback((newTheme) => {
    if (isTransitioning || newTheme === theme) return;
    
    setIsTransitioning(true);
    const root = document.documentElement;
    
    // Create smooth transition overlay (single swipe, no lines)
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    overlay.setAttribute('data-direction', 'ltr');
    
    // Set the overlay color to the NEW theme color
    if (newTheme === 'dark') {
      overlay.style.setProperty('--bg-primary', '#0f172a');
    } else {
      overlay.style.setProperty('--bg-primary', '#ffffff');
    }
    
    document.body.appendChild(overlay);
    
    // STEP 1: Start the swipe animation first (visible immediately)
    root.classList.add('theme-transitioning');
    
    // STEP 2: Change theme AFTER swipe is clearly visible (300ms delay)
    // This ensures the swipe animation is seen before theme changes
    setTimeout(() => {
      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      setResolvedTheme(newTheme);
    }, 300);
    
    // STEP 3: Clean up after animation completes
    setTimeout(() => {
      root.classList.remove('theme-transitioning');
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
      setIsTransitioning(false);
    }, 1100);
    
    // Update theme state immediately
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
  }, [theme, isTransitioning]);

  const setTheme = useCallback((newTheme) => {
    if (!mounted) return;
    triggerThemeTransition(newTheme);
  }, [mounted, triggerThemeTransition]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, isTransitioning }}>
      {children}
    </ThemeContext.Provider>
  );
};
