import { useState, useEffect, useRef } from 'react';
import './Header.css';

/**
 * Transparent header with scroll-based background transition
 * - Typewriter animation for school name (repeats every 15s)
 * - Menu fade-in and slide-down animation on load
 * - Desktop: Full menu displayed inline
 * - Mobile: Hamburger menu with overlay
 */
const Header = ({ onMenuToggle }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [spinSpeed, setSpinSpeed] = useState(0);
  const logoRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const decelerationTimerRef = useRef(null);
  const [animateTypewriter, setAnimateTypewriter] = useState(true);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About the School', href: '#about-the-school' },
    { label: 'Academics', href: '#academics' },
    { label: 'Faculty & Staff', href: '#faculty-staff' },
    { label: 'Announcements', href: '#announcements' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          setIsScrolled(currentScrollY > 100);
          
          if (currentScrollY < lastScrollY || currentScrollY < 10) {
            setIsVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setIsVisible(false);
          }
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Typewriter animation - repeat every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimateTypewriter(false);
      requestAnimationFrame(() => {
        setTimeout(() => setAnimateTypewriter(true), 50);
      });
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const handleLogoMouseEnter = () => {
    if (decelerationTimerRef.current) {
      clearTimeout(decelerationTimerRef.current);
    }
    
    setSpinSpeed(1);
    
    hoverTimerRef.current = setTimeout(() => {
      setSpinSpeed(2);
    }, 1000);
  };

  const handleLogoMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    setSpinSpeed(3);
    
    decelerationTimerRef.current = setTimeout(() => {
      setSpinSpeed(1);
      
      decelerationTimerRef.current = setTimeout(() => {
        setSpinSpeed(0);
      }, 1000);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      if (decelerationTimerRef.current) {
        clearTimeout(decelerationTimerRef.current);
      }
    };
  }, []);

  const getAnimationDuration = () => {
    switch (spinSpeed) {
      case 0: return '0s';
      case 1: return '3s';
      case 2: return '0.6s';
      case 3: return '1.5s';
      default: return '0s';
    }
  };

  return (
    <header 
      className={`header ${isVisible ? 'header--visible' : 'header--hidden'} ${isScrolled ? 'header--scrolled' : 'header--transparent'}`}
    >
      <div className="header__container">
        <div className="header__brand">
          <div 
            className="header__logo-wrapper"
            onMouseEnter={handleLogoMouseEnter}
            onMouseLeave={handleLogoMouseLeave}
          >
            <img 
              ref={logoRef}
              src="/media/logo/logotes.png" 
              alt="Tag-os Elementary School Logo" 
              className="header__logo"
              style={{
                animation: spinSpeed > 0 ? `spin ${getAnimationDuration()} linear infinite` : 'none',
                transition: 'filter 0.3s ease-in-out'
              }}
            />
          </div>
          <h1 className={`header__title ${animateTypewriter ? 'header__title--typewriter' : ''}`}>
            Tag-os Elementary School
          </h1>
        </div>
        
        {/* Desktop Navigation with fade-in slide-down animation */}
        <nav className="header__nav">
          <ul className="header__nav-list">
            {menuItems.map((item, index) => (
              <li 
                key={index} 
                className="header__nav-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a href={item.href} className="header__nav-link">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="header__actions">
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
