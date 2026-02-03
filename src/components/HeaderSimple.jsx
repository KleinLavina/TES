import { useState, useRef, useEffect } from 'react';
import './Header.css';

const HeaderSimple = ({ onMenuToggle }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [spinSpeed, setSpinSpeed] = useState(0);
  const logoRef = useRef(null);
  const hoverTimerRef = useRef(null);

  const menuItems = [
    { label: 'Home', href: '#hero' },
    { label: 'Stories', href: '#stories' },
    { label: 'Events', href: '#events' },
    { label: 'About', href: '#about' },
    { label: 'Faculty', href: '#faculty' },
  ];

  // Scroll detection for auto-hide header
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Add solid background when scrolled past 50px
          setIsScrolled(currentScrollY > 50);
          
          // Show header when scrolling up or at top
          if (currentScrollY < lastScrollY || currentScrollY < 10) {
            setIsVisible(true);
          } 
          // Hide header when scrolling down past 80px
          else if (currentScrollY > lastScrollY && currentScrollY > 80) {
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

  return (
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
                  {item.label}
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
  );
};

export default HeaderSimple;
