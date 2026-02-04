import { useEffect, useState, useRef } from 'react';
import './InfoBoxModal.css';

/**
 * InfoBoxModal - Article-style modal for hero info boxes
 * Displays detailed content with images
 */
const InfoBoxModal = ({ isOpen, onClose, content }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isImageMinimized, setIsImageMinimized] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contentRef = useRef(null);
  const slideshowTimerRef = useRef(null);

  // Auto-advance slideshow every 2 seconds
  useEffect(() => {
    if (isOpen && content?.images?.length > 1) {
      slideshowTimerRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % content.images.length);
      }, 2000);

      return () => {
        if (slideshowTimerRef.current) {
          clearInterval(slideshowTimerRef.current);
        }
      };
    }
  }, [isOpen, content]);

  const handlePrevImage = () => {
    if (content?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + content.images.length) % content.images.length);
      // Reset auto-advance timer
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
        slideshowTimerRef.current = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % content.images.length);
        }, 2000);
      }
    }
  };

  const handleNextImage = () => {
    if (content?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % content.images.length);
      // Reset auto-advance timer
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
        slideshowTimerRef.current = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % content.images.length);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
      // Trigger enter animation
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      document.body.style.overflow = 'unset';
      setIsAnimating(false);
      setIsImageMinimized(false);
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
      }
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (contentRef.current) {
            const scrollTop = contentRef.current.scrollTop;
            // Minimize image when scrolled past 150px
            const shouldMinimize = scrollTop > 150;
            setIsImageMinimized(shouldMinimize);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  const handleClose = () => {
    // Trigger exit animation first
    setIsAnimating(false);
    // Then call onClose after animation completes
    setTimeout(() => {
      onClose();
    }, 400);
  };

  if (!isOpen || !content) return null;

  return (
    <>
      <div 
        className={`info-modal__backdrop ${isAnimating ? 'info-modal__backdrop--entering' : 'info-modal__backdrop--exiting'}`}
        onClick={handleClose}
      ></div>
      
      {/* Close button - outside modal for fixed positioning */}
      <button className="info-modal__close" onClick={handleClose} aria-label="Close">
        <span className="material-icons">close</span>
      </button>
      
      {/* Mini floating image - outside modal for fixed positioning */}
      {content.images && content.images.length > 0 && (
        <div className={`info-modal__hero-mini ${isImageMinimized ? 'info-modal__hero-mini--visible' : ''}`}>
          <img 
            src={content.images[currentImageIndex]} 
            alt={`${content.title} mini`}
            className="info-modal__hero-image info-modal__hero-image--active"
          />
        </div>
      )}
      
      <div className={`info-modal ${isAnimating ? 'info-modal--entering' : 'info-modal--exiting'}`}>
        <div className="info-modal__content" ref={contentRef}>
          {/* Hero Image Slideshow */}
          {content.images && content.images.length > 0 && (
            <div className={`info-modal__hero ${isImageMinimized ? 'info-modal__hero--minimized' : ''}`}>
              {content.images.map((image, index) => (
                <img 
                  key={index}
                  src={image} 
                  alt={`${content.title} ${index + 1}`}
                  className={`info-modal__hero-image ${index === currentImageIndex ? 'info-modal__hero-image--active' : ''}`}
                />
              ))}
              
              {/* Slideshow Controls - Only show when not minimized */}
              {!isImageMinimized && content.images.length > 1 && (
                <>
                  <button 
                    className="info-modal__hero-arrow info-modal__hero-arrow--prev"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                  >
                    <span className="material-icons">chevron_left</span>
                  </button>
                  <button 
                    className="info-modal__hero-arrow info-modal__hero-arrow--next"
                    onClick={handleNextImage}
                    aria-label="Next image"
                  >
                    <span className="material-icons">chevron_right</span>
                  </button>
                  
                  {/* Slideshow Indicators */}
                  <div className="info-modal__hero-indicators">
                    {content.images.map((_, index) => (
                      <button
                        key={index}
                        className={`info-modal__hero-indicator ${index === currentImageIndex ? 'info-modal__hero-indicator--active' : ''}`}
                        onClick={() => {
                          setCurrentImageIndex(index);
                          // Reset timer
                          if (slideshowTimerRef.current) {
                            clearInterval(slideshowTimerRef.current);
                            slideshowTimerRef.current = setInterval(() => {
                              setCurrentImageIndex((prev) => (prev + 1) % content.images.length);
                            }, 2000);
                          }
                        }}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          
          {/* Article Content */}
          <div className="info-modal__article">
            <div className="info-modal__header">
              <span className={`material-icons info-modal__icon info-modal__icon--${content.type}`}>
                {content.icon}
              </span>
              <h2 className="info-modal__title">{content.title}</h2>
              <p className="info-modal__subtitle">{content.subtitle}</p>
            </div>
            
            <div className="info-modal__body">
              {content.sections.map((section, index) => (
                <div key={index} className="info-modal__section">
                  {section.heading && <h3>{section.heading}</h3>}
                  {section.text && <p>{section.text}</p>}
                  {section.list && (
                    <ul>
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.image && (
                    <div className="info-modal__section-image">
                      <img src={section.image} alt={section.heading || ''} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBoxModal;
