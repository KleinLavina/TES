import { useState, useEffect, useCallback, useRef } from 'react';
import { loadFeaturedEvents } from '../utils/eventStorage';
import './FeaturedEventsCarousel.css';

/**
 * FeaturedEventsCarousel - Hero carousel for featured events and announcements
 * Displays full-width hero banner with fade transitions
 */
const FeaturedEventsCarousel = () => {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Load featured events
  useEffect(() => {
    const loadData = () => {
      const featuredEvents = loadFeaturedEvents();
      setEvents(featuredEvents);
      if (currentIndex >= featuredEvents.length) {
        setCurrentIndex(0);
      }
    };

    loadData();

    // Listen for updates from admin
    const handleUpdate = () => loadData();
    window.addEventListener('featuredEventsUpdated', handleUpdate);
    
    return () => {
      window.removeEventListener('featuredEventsUpdated', handleUpdate);
    };
  }, [currentIndex]);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (isPaused || events.length <= 1 || isTransitioning) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length);
    }, 5000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex, isPaused, events.length, isTransitioning]);

  // Navigate to specific slide
  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [currentIndex, isTransitioning]);

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    if (events.length === 0) return;
    const next = (currentIndex + 1) % events.length;
    goToSlide(next);
  }, [currentIndex, events.length, goToSlide]);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    if (events.length === 0) return;
    const prev = (currentIndex - 1 + events.length) % events.length;
    goToSlide(prev);
  }, [currentIndex, events.length, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Empty state
  if (events.length === 0) {
    return (
      <section className="featured-events-carousel featured-events-carousel--empty">
        <div className="featured-events-carousel__empty-state">
          <h2>No Featured Events</h2>
          <p>Check back soon for upcoming events and announcements.</p>
        </div>
      </section>
    );
  }

  const currentEvent = events[currentIndex];

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Split text into letters for animation
  const splitTextToLetters = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter" style={{ animationDelay: `${index * 0.03}s` }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      className="featured-events-carousel"
    >
      {/* Section Title - Outside carousel */}
      <div className="featured-events-carousel__header">
        <h2 className="featured-events-carousel__section-title">
          {splitTextToLetters('Featured & Upcoming Events')}
        </h2>
      </div>

      {/* Carousel Container */}
      <div 
        className="featured-events-carousel__container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      {/* Slides */}
      <div className="featured-events-carousel__slides">
        {events.map((event, index) => (
          <div
            key={event.id}
            className={`featured-events-carousel__slide ${
              index === currentIndex ? 'featured-events-carousel__slide--active' : ''
            }`}
            style={{
              backgroundImage: event.featuredImage ? `url(${event.featuredImage})` : 'none',
            }}
          >
            {/* Overlay for text readability */}
            <div className="featured-events-carousel__overlay"></div>

            {/* Content */}
            <div className="featured-events-carousel__content">
              {event.category && (
                <span className="featured-events-carousel__category">
                  {event.category}
                </span>
              )}
              
              <h2 className="featured-events-carousel__title">
                {event.title}
              </h2>

              {event.description && (
                <div 
                  className="featured-events-carousel__description"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              )}

              {(event.eventDate || event.location) && (
                <div className="featured-events-carousel__meta">
                  {event.eventDate && (
                    <div className="featured-events-carousel__meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>
                        {new Date(event.eventDate).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                        {event.eventTime && ` at ${event.eventTime}`}
                      </span>
                    </div>
                  )}
                  
                  {event.location && (
                    <div className="featured-events-carousel__meta-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation - only show if more than 1 event */}
      {events.length > 1 && (
        <>
          {/* Arrow Navigation */}
          <button
            className="featured-events-carousel__arrow featured-events-carousel__arrow--prev"
            onClick={prevSlide}
            disabled={isTransitioning}
            aria-label="Previous event"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="featured-events-carousel__arrow featured-events-carousel__arrow--next"
            onClick={nextSlide}
            disabled={isTransitioning}
            aria-label="Next event"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Dot Navigation */}
          <div className="featured-events-carousel__dots">
            {events.map((_, index) => (
              <button
                key={index}
                className={`featured-events-carousel__dot ${
                  index === currentIndex ? 'featured-events-carousel__dot--active' : ''
                }`}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                aria-label={`Go to event ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>
        </>
      )}
      </div>
    </section>
  );
};

export default FeaturedEventsCarousel;
