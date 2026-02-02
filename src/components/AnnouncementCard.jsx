import './AnnouncementCard.css';

/**
 * AnnouncementCard - SLSU Style
 * Displays announcement with background image overlay
 * 
 * Props:
 * - announcement: { id, title, source, published_at, image_url, slug }
 * - onClick: Function to handle card click
 * - isVisible: Boolean for scroll-triggered animations
 * - index: Card index for staggered animations
 */
const AnnouncementCard = ({ announcement, onClick, isVisible = true, index = 0 }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div 
      className={`announcement-card ${isVisible ? 'announcement-card--visible' : 'announcement-card--hidden'}`}
      onClick={() => onClick(announcement)}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <img 
        src={announcement.image_url} 
        alt={announcement.title}
        className="announcement-card__image"
        loading="lazy"
      />
      <div className="announcement-card__overlay">
        <h3 className="announcement-card__title">{announcement.title}</h3>
        <div className="announcement-card__meta">
          <span className="announcement-card__source">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {announcement.source}
          </span>
          <span className="announcement-card__date">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {formatDate(announcement.published_at)}
          </span>
        </div>
        <button className="announcement-card__button">
          Read More
        </button>
      </div>
    </div>
  );
};

export default AnnouncementCard;
