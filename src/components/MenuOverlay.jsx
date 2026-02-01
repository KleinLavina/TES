import { useState, useEffect } from 'react';
import './MenuOverlay.css';

/**
 * Floating menu overlay panel
 * - Desktop: Right side top
 * - Mobile: Centered
 * - Smooth enter/exit transitions with fade-in slide-down animation
 */
const MenuOverlay = ({ isOpen, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const menuItems = [
    'Home',
    'About the School',
    'Academics',
    'Faculty & Staff',
    'Announcements',
    'Contact'
  ];

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else if (shouldRender) {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  return (
    <>
      <div 
        className={`menu-overlay__backdrop ${isAnimating ? 'entering' : 'exiting'}`}
        onClick={onClose}
      ></div>
      <nav className={`menu-overlay ${isAnimating ? 'entering' : 'exiting'}`}>
        <ul className="menu-overlay__list">
          {menuItems.map((item, index) => (
            <li 
              key={index} 
              className="menu-overlay__item"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} onClick={onClose}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MenuOverlay;
