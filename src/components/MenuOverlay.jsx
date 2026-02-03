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
    { label: 'Home', href: '#hero' },
    { label: 'Stories & Activities', href: '#stories' },
    { label: 'Featured Events', href: '#events' },
    { label: 'About the School', href: '#about' },
    { label: 'Faculty & Staff', href: '#faculty' },
  ];

  const handleMenuClick = (e, href) => {
    e.preventDefault();
    onClose();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

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
              <a 
                href={item.href} 
                onClick={(e) => handleMenuClick(e, item.href)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default MenuOverlay;
