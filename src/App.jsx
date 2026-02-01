import { useState } from 'react';
import Header from './components/Header';
import MenuOverlay from './components/MenuOverlay';
import HeroSection from './components/HeroSection';
import './App.css';

/**
 * Main App Component
 * Tag-os Elementary School Website
 * 
 * Features:
 * - Auto-hide header on scroll
 * - Floating menu overlay
 * - Hero section with placeholder background
 */
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="app">
      <Header onMenuToggle={toggleMenu} />
      <MenuOverlay isOpen={isMenuOpen} onClose={closeMenu} />
      <main>
        <HeroSection />
        
        {/* Additional sections can be added below */}
        <section className="content-section" id="home">
          <div className="content-container">
            <h2>Welcome to Tag-os Elementary School</h2>
            <p>
              At Tag-os Elementary School, we are committed to providing a nurturing 
              and enriching educational experience for every child. Our dedicated faculty 
              and staff work together to create an environment where young minds can grow, 
              explore, and achieve their full potential.
            </p>
          </div>
        </section>

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

      <footer className="footer">
        <div className="content-container">
          <p>&copy; 2026 Tag-os Elementary School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
