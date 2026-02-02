import { useState } from 'react';
import Header from './components/Header';
import MenuOverlay from './components/MenuOverlay';
import HeroSection from './components/HeroSection';
import AnnouncementSection from './components/AnnouncementSection';
import Footer from './components/Footer';
import AdminRoute from './admin/AdminRoute';
import './App.css';

/**
 * Main App Component
 * Tag-os Elementary School Website
 * 
 * Features:
 * - Auto-hide header on scroll
 * - Floating menu overlay
 * - Hero section with video background
 * - Featured announcements carousel
 * - Admin CMS at /tes/admin/
 * - Improved footer with multiple sections
 */
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Simple routing check (will be replaced with React Router in Phase 3)
  const isAdminRoute = window.location.pathname === '/tes/admin' || 
                       window.location.pathname === '/tes/admin/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Render admin interface if on admin route
  if (isAdminRoute) {
    return <AdminRoute />;
  }

  // Render public website
  return (
    <div className="app">
      <Header onMenuToggle={toggleMenu} />
      <MenuOverlay isOpen={isMenuOpen} onClose={closeMenu} />
      <main>
        <HeroSection />
        
        {/* Featured Announcements Section - Replaces #home */}
        <AnnouncementSection />

        {/* Additional sections */}
        <section className="content-section content-section--alt" id="about-the-school">
          <div className="content-container">
            <h2>About the School</h2>
            <p>
              Founded with a vision to provide quality education to the community of Tag-os, 
              our school has been a cornerstone of academic excellence and character development. 
              We believe in fostering creativity, critical thinking, and compassion in all our students.
            </p>
          </div>
        </section>

        <section className="content-section" id="academics">
          <div className="content-container">
            <h2>Academics</h2>
            <p>
              Our comprehensive curriculum is designed to meet the developmental needs of 
              elementary students while preparing them for future academic success. We offer 
              a balanced approach that includes core subjects, arts, physical education, and 
              character education.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
