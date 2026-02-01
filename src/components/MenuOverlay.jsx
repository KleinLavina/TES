import { useState, useEffect } from 'react';
import './MenuOverlay.css';

/**
 * Floating menu overlay panel
 * - Desktop: Right side top
 * - Mobile: Centered
 * - Smooth enter/exit transitions (no glitching)
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
      // First render the component
      setShouldRender(true);
      // Then trigger the animation on next frame
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else if (shouldRender) {
      // Start exit animation
      setIsAnimating(false);
      // Wait for transition to complete before unmounting
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
            <li key={index} className="menu-overlay__item">
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
