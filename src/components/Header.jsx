import { useState, useEffect } from 'react';
import ThemeToggler from './ThemeToggler';
import './Header.css';

/**
 * Auto-hide header component with scroll detection
 * - Hides on scroll down
 * - Reveals on scroll up
 * - Includes theme toggle button
 * - Smooth transitions
 */
const Header = ({ onMenuToggle }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`header ${isVisible ? 'header--visible' : 'header--hidden'}`}>
      <div className="header__container">
        <h1 className="header__title">Tag-os Elementary School</h1>
        <div className="header__actions">
          <ThemeToggler />
          <button 
            className="header__menu-btn"
            onClick={onMenuToggle}
            aria-label="Toggle menu"
          >
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
