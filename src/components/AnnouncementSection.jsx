import { useState, useEffect, useRef } from 'react';
import AnnouncementCarousel from './AnnouncementCarousel';
import AnnouncementModal from './AnnouncementModal';
import mockAnnouncements from '../data/mockAnnouncements.json';
import './AnnouncementSection.css';

/**
 * AnnouncementSection - Main container
 * Fetches announcements and manages modal state
 * Replaces the #home section content
 * Listens for updates from admin panel
 * Includes scroll-triggered animations
 */
const AnnouncementSection = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const loadAnnouncements = () => {
    // Load from localStorage (updated by admin) or use mock data
    const stored = localStorage.getItem('announcements');
    if (stored) {
      const parsed = JSON.parse(stored);
      setAnnouncements(parsed.filter(a => a.is_published));
    } else {
      setAnnouncements(mockAnnouncements.filter(a => a.is_published));
    }
  };

  useEffect(() => {
    loadAnnouncements();

    // Listen for updates from admin panel
    const handleUpdate = () => {
      loadAnnouncements();
    };

    window.addEventListener('announcementsUpdated', handleUpdate);
    
    return () => {
      window.removeEventListener('announcementsUpdated', handleUpdate);
    };
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleAnnouncementClick = (announcement) => {
    setSelectedAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedAnnouncement(null), 300);
  };

  // Split text into letters for animation
  const splitTextToLetters = (text) => {
    return text.split('').map((char, index) => (
      <span key={index} className="letter" style={{ animationDelay: `${index * 0.03}s` }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  if (announcements.length === 0) {
    return (
      <section className="announcement-section" id="home" ref={sectionRef}>
        <div className="announcement-section__loading">
          <p>Loading announcements...</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className={`announcement-section ${isVisible ? 'announcement-section--visible' : 'announcement-section--hidden'}`} 
      id="home"
      ref={sectionRef}
    >
      <div className="announcement-section__header">
        <h2 className="announcement-section__title">
          {splitTextToLetters('Latest Announcements')}
        </h2>
        <p className="announcement-section__subtitle">
          {splitTextToLetters('Stay updated with the latest news and events from Tag-os Elementary School')}
        </p>
      </div>

      <AnnouncementCarousel
        announcements={announcements}
        itemsPerPage={3}
        autoPlayInterval={10000}
        onAnnouncementClick={handleAnnouncementClick}
        isVisible={isVisible}
      />

      <AnnouncementModal
        announcement={selectedAnnouncement}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default AnnouncementSection;
