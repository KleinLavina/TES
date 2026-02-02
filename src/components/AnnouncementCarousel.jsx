import { useState, useEffect, useRef } from 'react';
import AnnouncementCard from './AnnouncementCard';
import NavigationArrow from './NavigationArrow';
import PaginationDots from './PaginationDots';
import './AnnouncementCarousel.css';

/**
 * AnnouncementCarousel - SLSU Style
 * Handles pagination, auto-cycling, and navigation
 * 
 * Props:
 * - announcements: Array of announcement objects
 * - itemsPerPage: Number of items per page (default: 3)
 * - autoPlayInterval: Auto-cycle interval in ms (default: 5000)
 * - onAnnouncementClick: Callback when announcement is clicked
 * - isVisible: Boolean for scroll-triggered animations
 */
const AnnouncementCarousel = ({ 
  announcements, 
  itemsPerPage = 3, 
  autoPlayInterval = 5000,
  onAnnouncementClick,
  isVisible = true
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Calculate total pages
  const totalPages = Math.ceil(announcements.length / itemsPerPage);

  // Get announcements for current page
  const startIndex = currentPage * itemsPerPage;
  const currentAnnouncements = announcements.slice(startIndex, startIndex + itemsPerPage);

  const goToNextPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToPrevPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToPage = (pageIndex) => {
    if (isAnimating || pageIndex === currentPage) return;
    setIsAnimating(true);
    setCurrentPage(pageIndex);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-cycle logic
  useEffect(() => {
    if (isPaused || totalPages <= 1 || isAnimating) return;

    timerRef.current = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentPage, isPaused, totalPages, autoPlayInterval, isAnimating]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="announcement-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="announcement-carousel__container">
        {totalPages > 1 && (
          <NavigationArrow 
            direction="left" 
            onClick={goToPrevPage}
            disabled={isAnimating}
          />
        )}

        <div className="announcement-carousel__track">
          <div 
            className={`announcement-carousel__page ${isAnimating ? 'animating' : ''}`}
            key={currentPage}
          >
            {currentAnnouncements.map((announcement, index) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onClick={onAnnouncementClick}
                isVisible={isVisible}
                index={index}
              />
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <NavigationArrow 
            direction="right" 
            onClick={goToNextPage}
            disabled={isAnimating}
          />
        )}
      </div>

      {totalPages > 1 && (
        <PaginationDots
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={goToPage}
        />
      )}
    </div>
  );
};

export default AnnouncementCarousel;
