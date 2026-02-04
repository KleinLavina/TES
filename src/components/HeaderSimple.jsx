import { useState, useRef, useEffect } from 'react';
import './Header.css';

const HeaderSimple = ({ onMenuToggle }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [spinSpeed, setSpinSpeed] = useState(0);
  const logoRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const idleTimerRef = useRef(null);

  const menuItems = [
    { label: 'Home', href: '#hero', icon: 'fa-solid fa-house' },
    { label: 'About', href: '#about', icon: 'fa-solid fa-circle-info' },
    { label: 'Events', href: '#stories', icon: 'fa-solid fa-calendar-days' },
    { label: 'Academics', href: '#academics', icon: 'fa-solid fa-graduation-cap' },
    { label: 'Faculty', href: '#faculty', icon: 'fa-solid fa-users' },
    { label: 'Contact', href: '#footer', icon: 'fa-solid fa-envelope' },
  ];

  // Idle detection - make arrow semi-transparent after 0.3s
  useEffect(() => {
    const resetIdleTimer = () => {
      setIsIdle(false);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 300);
    };

    // Reset idle timer on user activity (excluding mousemove)
    const events = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetIdleTimer, { passive: true });
    });

    // Initial timer
    resetIdleTimer();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetIdleTimer);
      });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  // Scroll detection for auto-hide header
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Add solid background when scrolled past 50px
          setIsScrolled(currentScrollY > 50);
          
          // Hide header when scrolling down past 80px
          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setIsVisible(false);
            setShowArrow(true);
          }
          // Show header when at top
          else if (currentScrollY < 10) {
            setIsVisible(true);
            setShowArrow(false);
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

  const handleLogoMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setSpinSpeed(1);
    hoverTimerRef.current = setTimeout(() => setSpinSpeed(2), 1000);
  };

  const handleLogoMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    setSpinSpeed(0);
  };

  const getAnimationDuration = () => {
    switch (spinSpeed) {
      case 0: return '0s';
      case 1: return '3s';
      case 2: return '0.6s';
      default: return '0s';
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleArrowClick = () => {
    setIsVisible(true);
    setShowArrow(false);
  };

  return (
    <>
      <header className={`header ${isVisible ? 'header--visible' : 'header--hidden'} ${isScrolled ? 'header--scrolled' : 'header--transparent'}`}>
        <div className="header__container">
          <div className="header__brand">
            <div className="header__logo-wrapper" onMouseEnter={handleLogoMouseEnter} onMouseLeave={handleLogoMouseLeave}>
              <img 
                ref={logoRef}
                src="/media/logo/logotes.png" 
                alt="Tag-os Elementary School Logo" 
                className="header__logo"
                style={{
                  animation: spinSpeed > 0 ? `spin ${getAnimationDuration()} linear infinite` : 'none'
                }}
              />
            </div>
            <h1 className="header__title">Tag-os Elementary School</h1>
          </div>
          
          <nav className="header__nav">
            <ul className="header__nav-list">
              {menuItems.map((item, index) => (
                <li key={index} className="header__nav-item">
                  <a 
                    href={item.href} 
                    className="header__nav-link"
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    <i className={`${item.icon} header__nav-icon`}></i>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <button className="header__menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
              <span className="hamburger"></span>
              <span className="hamburger"></span>
              <span className="hamburger"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Sticky Arrow Button - Shows when header is hidden */}
      <button 
        className={`header-arrow ${showArrow ? 'header-arrow--visible' : ''} ${isIdle ? 'header-arrow--idle' : ''}`}
        onClick={handleArrowClick}
        aria-label="Show menu"
      >
        <span className="material-icons header-arrow__icon">expand_more</span>
        <span className="header-arrow__label">Show Menu</span>
      </button>
    </>
  );
};

export default HeaderSimple;
