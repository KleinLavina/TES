import { useState } from 'react';
import HeaderSimple from './components/HeaderSimple';
import MenuOverlay from './components/MenuOverlay';
import HeroSection from './components/HeroSection';
import FeaturedEventsCarousel from './components/FeaturedEventsCarousel';
import AnnouncementSection from './components/AnnouncementSection';
import SchoolInfoSection from './components/SchoolInfoSection';
import AcademicsSection from './components/AcademicsSection';
import AdmissionsSection from './components/AdmissionsSection';
import StaffSection from './components/StaffSection';
import FacilitiesSection from './components/FacilitiesSection';
import Footer from './components/Footer';
import AdminRoute from './admin/AdminRoute';
import './App.css';

/**
 * Main App Component
 * Tag-os Elementary School Website
 */
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isAdminRoute = window.location.pathname === '/tes/admin' || 
                       window.location.pathname === '/tes/admin/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (isAdminRoute) {
    return <AdminRoute />;
  }

  return (
    <div className="app">
      <HeaderSimple onMenuToggle={toggleMenu} />
      <MenuOverlay isOpen={isMenuOpen} onClose={closeMenu} />
      <main>
        <HeroSection />
        <SchoolInfoSection />
        <AnnouncementSection />
        <FeaturedEventsCarousel />
        <AcademicsSection />
        <AdmissionsSection />
        <StaffSection />
        <FacilitiesSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
