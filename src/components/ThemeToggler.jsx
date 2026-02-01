import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggler.css';

/**
 * Animated Theme Toggle Button (Animate UI style)
 * Toggles between Light and Dark modes with swipe animation
 * Direction: left-to-right (ltr)
 */
const ThemeToggler = () => {
  const { theme, resolvedTheme, setTheme, isTransitioning } = useTheme();

  const toggleTheme = () => {
    if (isTransitioning) return; // Prevent multiple clicks during animation
    
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const getIcon = () => {
    // Use resolvedTheme for icon display (actual applied theme)
    return resolvedTheme === 'light' 
      ? <Sun className="theme-toggler__icon" />
      : <Moon className="theme-toggler__icon" />;
  };

  const getLabel = () => {
    return theme === 'light' 
      ? 'Switch to dark mode' 
      : 'Switch to light mode';
  };

  return (
    <button
      className="theme-toggler"
      onClick={toggleTheme}
      disabled={isTransitioning}
      aria-label={getLabel()}
      title={getLabel()}
      data-theme={theme}
    >
      <div className="theme-toggler__icon-wrapper">
        {getIcon()}
      </div>
    </button>
  );
};

export default ThemeToggler;
