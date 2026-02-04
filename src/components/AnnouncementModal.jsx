import { useEffect, useState, useRef } from 'react';
import './AnnouncementModal.css';

/**
 * AnnouncementModal - Full article view in modal
 * Features: Image slideshow, mini floating mode, smooth animations
 * 
 * Props:
 * - announcement: Announcement object or null
 * - isOpen: Boolean
 * - onClose: Callback to close modal
 */
const AnnouncementModal = ({ announcement, isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isImageMinimized, setIsImageMinimized] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contentRef = useRef(null);
  const slideshowTimerRef = useRef(null);

  // Auto-advance slideshow every 3 seconds
  useEffect(() => {
    if (isOpen && announcement?.images?.length > 1) {
      slideshowTimerRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % announcement.images.length);
      }, 3000);

      return () => {
        if (slideshowTimerRef.current) {
          clearInterval(slideshowTimerRef.current);
        }
      };
    }
  }, [isOpen, announcement]);

  const handlePrevImage = () => {
    if (announcement?.images) {
      setCurrentImageIndex((prev) => (prev - 1 + announcement.images.length) % announcement.images.length);
      // Reset auto-advance timer
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
        slideshowTimerRef.current = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % announcement.images.length);
        }, 3000);
      }
    }
  };

  const handleNextImage = () => {
    if (announcement?.images) {
      setCurrentImageIndex((prev) => (prev + 1) % announcement.images.length);
      // Reset auto-advance timer
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
        slideshowTimerRef.current = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % announcement.images.length);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      setShouldRender(true);
      setCurrentImageIndex(0);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      setIsImageMinimized(false);
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
      }
    };
  }, [isOpen]);

  // Scroll detection for mini image mode
  useEffect(() => {
    let ticking = false;

    const handleScroll = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = e.target.scrollTop;
          const shouldMinimize = scrollTop > 150;
          setIsImageMinimized(shouldMinimize);
          ticking = false;
        });
        ticking = true;
      }
    };

    const contentElement = contentRef.current;
    if (contentElement && isOpen) {
      contentElement.addEventListener('scroll', handleScroll, { passive: true });
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen, shouldRender]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShouldRender(false);
      document.body.style.overflow = 'unset';
      onClose();
    }, 300);
  };

  if (!shouldRender || !announcement) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  // Get images array (support both old single image and new multiple images)
  const images = announcement.images || [announcement.image_url];

  return (
    <div 
      className={`announcement-modal ${isAnimating ? 'announcement-modal--open' : 'announcement-modal--closing'}`}
      onClick={handleClose}
    >
      {/* Close button - outside content for fixed positioning */}
      <button 
        className="announcement-modal__close"
        onClick={handleClose}
        aria-label="Close modal"
      >
        <span className="material-icons">close</span>
      </button>

      {/* Mini floating image - outside content for fixed positioning */}
      {images && images.length > 0 && (
        <div className={`announcement-modal__hero-mini ${isImageMinimized ? 'announcement-modal__hero-mini--visible' : ''}`}>
          <img 
            src={images[currentImageIndex]} 
            alt={`${announcement.title} mini`}
            className="announcement-modal__hero-image announcement-modal__hero-image--active"
          />
        </div>
      )}

      <div 
        className={`announcement-modal__content ${isAnimating ? 'announcement-modal__content--open' : 'announcement-modal__content--closing'}`}
        onClick={(e) => e.stopPropagation()}
        ref={contentRef}
      >
        {/* Hero Image Slideshow */}
        {images && images.length > 0 && (
          <div className={`announcement-modal__hero ${isImageMinimized ? 'announcement-modal__hero--minimized' : ''}`}>
            {images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`${announcement.title} ${index + 1}`}
                className={`announcement-modal__hero-image ${index === currentImageIndex ? 'announcement-modal__hero-image--active' : ''}`}
              />
            ))}
            
            {/* Slideshow Controls - Only show when not minimized and multiple images */}
            {!isImageMinimized && images.length > 1 && (
              <>
                <button 
                  className="announcement-modal__hero-arrow announcement-modal__hero-arrow--prev"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                >
                  <span className="material-icons">chevron_left</span>
                </button>
                <button 
                  className="announcement-modal__hero-arrow announcement-modal__hero-arrow--next"
                  onClick={handleNextImage}
                  aria-label="Next image"
                >
                  <span className="material-icons">chevron_right</span>
                </button>
                
                {/* Slideshow Indicators */}
                <div className="announcement-modal__hero-indicators">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`announcement-modal__hero-indicator ${index === currentImageIndex ? 'announcement-modal__hero-indicator--active' : ''}`}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        // Reset timer
                        if (slideshowTimerRef.current) {
                          clearInterval(slideshowTimerRef.current);
                          slideshowTimerRef.current = setInterval(() => {
                            setCurrentImageIndex((prev) => (prev + 1) % images.length);
                          }, 3000);
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

        <div className="announcement-modal__body">
          <div className="announcement-modal__meta">
            <span className="announcement-modal__source">{announcement.source}</span>
            <span className="announcement-modal__date">{formatDate(announcement.published_at)}</span>
            {announcement.author && (
              <span className="announcement-modal__author">By {announcement.author}</span>
            )}
          </div>

          <h1 className="announcement-modal__title">{announcement.title}</h1>

          <div 
            className="announcement-modal__text"
            dangerouslySetInnerHTML={{ __html: announcement.content }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnnouncementModal;
