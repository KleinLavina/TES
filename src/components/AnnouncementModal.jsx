import { useEffect, useState } from 'react';
import './AnnouncementModal.css';

/**
 * AnnouncementModal - Full article view in modal
 * (Will be replaced with dedicated page when React Router is added)
 * 
 * Props:
 * - announcement: Announcement object or null
 * - isOpen: Boolean
 * - onClose: Callback to close modal
 */
const AnnouncementModal = ({ announcement, isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

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

  return (
    <div 
      className={`announcement-modal ${isAnimating ? 'announcement-modal--open' : 'announcement-modal--closing'}`}
      onClick={handleClose}
    >
      <div 
        className={`announcement-modal__content ${isAnimating ? 'announcement-modal__content--open' : 'announcement-modal__content--closing'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="announcement-modal__close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="announcement-modal__hero">
          <img 
            src={announcement.image_url} 
            alt={announcement.title}
            className="announcement-modal__hero-image"
          />
        </div>

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
