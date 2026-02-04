import { useState, useEffect } from 'react';
import { staffStorage } from '../utils/staffStorage';
import './StaffSection.css';

/**
 * StaffSection - Carousel displaying principal and teachers
 * - Shows principal first
 * - Arrow navigates to teachers (4 at a time)
 * - No looping - arrows disable at boundaries
 * - CMS-editable content from localStorage
 */
const StaffSection = () => {
  const [principal, setPrincipal] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [currentView, setCurrentView] = useState(0); // 0 = principal, 1+ = teacher pages
  const [direction, setDirection] = useState('next'); // 'next' or 'prev'
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const teachersPerPage = isMobile ? 1 : 4;

  const loadStaffData = () => {
    // Load principal from localStorage
    const storedPrincipal = staffStorage.getPrincipal();
    setPrincipal(storedPrincipal);

    // Load and sort teachers from localStorage
    const storedTeachers = staffStorage.getTeachers();
    const sortedTeachers = staffStorage.sortTeachersByGrade(
      storedTeachers.filter(t => t.is_published)
    );
    setTeachers(sortedTeachers);
  };

  useEffect(() => {
    loadStaffData();

    // Listen for CMS updates
    const handleUpdate = () => {
      loadStaffData();
    };

    window.addEventListener('staffUpdated', handleUpdate);
    return () => {
      window.removeEventListener('staffUpdated', handleUpdate);
    };
  }, []);

  const totalTeacherPages = Math.ceil(teachers.length / teachersPerPage);
  const totalViews = 1 + totalTeacherPages; // Principal + teacher pages

  const handleNext = () => {
    if (currentView < totalViews - 1) {
      setDirection('next');
      setCurrentView(currentView + 1);
    }
  };

  const handlePrev = () => {
    if (currentView > 0) {
      setDirection('prev');
      setCurrentView(currentView - 1);
    }
  };

  const handleIndicatorClick = (index) => {
    setDirection(index > currentView ? 'next' : 'prev');
    setCurrentView(index);
  };

  // Check if arrows should be disabled
  const isPrevDisabled = currentView === 0;
  const isNextDisabled = currentView === totalViews - 1;

  // Determine CSS classes based on current view and direction
  const getViewClass = (viewIndex) => {
    if (viewIndex === currentView) {
      return 'staff-section__view--active';
    }
    
    // Views before current view should be hidden to the left
    // Views after current view should be hidden to the right
    return viewIndex < currentView 
      ? 'staff-section__view--hidden-left' 
      : 'staff-section__view--hidden-right';
  };

  if (!principal) {
    return null;
  }

  return (
    <section className="staff-section" id="faculty">
      <div className="staff-section__backdrop"></div>
      <div className="staff-section__container">
        <h2 className="staff-section__title">Our Leadership & Faculty</h2>

        <div className="staff-section__carousel">
          {/* Navigation Arrows */}
          <button 
            className="staff-section__nav-btn staff-section__nav-btn--prev"
            onClick={handlePrev}
            disabled={isPrevDisabled}
            aria-label="Previous"
          >
            <span className="material-icons">chevron_left</span>
          </button>

          <div className="staff-section__content-wrapper">
            {/* Principal View */}
            <div className={`staff-section__view ${getViewClass(0)}`}>
              <div className="principal-card">
                <div className="principal-card__image-wrapper">
                  <img 
                    src={principal.profile_image} 
                    alt={principal.name}
                    className="principal-card__image"
                  />
                </div>
                <div className="principal-card__content">
                  <h3 className="principal-card__name">{principal.name}</h3>
                  <p className="principal-card__title">{principal.title}</p>
                  <p className="principal-card__bio">{principal.bio}</p>
                </div>
              </div>
            </div>

            {/* Teachers Views - One for each page */}
            {Array.from({ length: totalTeacherPages }).map((_, pageIndex) => {
              const viewIndex = pageIndex + 1;
              const startIndex = pageIndex * teachersPerPage;
              const endIndex = startIndex + teachersPerPage;
              const pageTeachers = teachers.slice(startIndex, endIndex);

              return (
                <div key={viewIndex} className={`staff-section__view ${getViewClass(viewIndex)}`}>
                  <div className="teachers-grid">
                    {pageTeachers.map((teacher) => (
                      <div key={teacher.id} className="teacher-card">
                        <div className="teacher-card__image-wrapper">
                          <img 
                            src={teacher.profile_image} 
                            alt={teacher.name}
                            className="teacher-card__image"
                          />
                        </div>
                        <div className="teacher-card__content">
                          <h4 className="teacher-card__name">{teacher.name}</h4>
                          <p className="teacher-card__grade">{teacher.grade_level}</p>
                          <p className="teacher-card__subject">{teacher.subject}</p>
                          <p className="teacher-card__bio">{teacher.bio}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <button 
            className="staff-section__nav-btn staff-section__nav-btn--next"
            onClick={handleNext}
            disabled={isNextDisabled}
            aria-label="Next"
          >
            <span className="material-icons">chevron_right</span>
          </button>
        </div>

        {/* Page Indicator */}
        <div className="staff-section__indicators">
          {Array.from({ length: totalViews }).map((_, index) => (
            <button
              key={index}
              className={`staff-section__indicator ${currentView === index ? 'staff-section__indicator--active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={index === 0 ? 'Principal' : `Teachers page ${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaffSection;
