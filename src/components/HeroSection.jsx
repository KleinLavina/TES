import { useState, useEffect } from 'react';
import './HeroSection.css';

/**
 * Hero section with optimized video background
 * - Video preloads and shows gradient fallback while loading
 * - Animated headline with jumping wave effect
 * - Animated subtitle with color wave effect
 * - Info boxes with scroll-triggered fade animations
 */
const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [infoBoxesVisible, setInfoBoxesVisible] = useState(true);

  useEffect(() => {
    // Preload video
    const video = document.querySelector('.hero-section__video');
    if (video) {
      video.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });
    }

    // Scroll observer for info boxes
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5;
        setInfoBoxesVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Split text into individual letters/words for animation
  const titleWords = ["Learning", "Starts", "Here"];
  const subtitleText = "A nurturing environment for young minds in Tag-os.";
  
  // Calculate animation timing - each letter colored sequentially with gaps
  const totalLetters = titleWords.join('').length;
  const animationDuration = 8; // seconds
  const timePerLetter = animationDuration / totalLetters; // Time allocated per letter (includes color + gap)
  
  // ROYGBIV colors
  const roygbivColors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];

  return (
    <section className={`hero-section ${videoLoaded ? 'hero-section--video-loaded' : ''}`}>
      {/* Video background with preload */}
      <video 
        className="hero-section__video" 
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
      >
        <source src="/media/videos/5198159-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="hero-section__overlay"></div>
      
      <div className="hero-section__content">
        <h2 className="hero-section__headline">
          {titleWords.map((word, wordIndex) => {
            // Calculate starting letter index for this word
            let letterOffset = 0;
            for (let i = 0; i < wordIndex; i++) {
              letterOffset += titleWords[i].length;
            }
            
            return (
              <span key={wordIndex} className="hero-section__headline-word">
                {word.split('').map((char, charIndex) => {
                  const totalIndex = letterOffset + charIndex;
                  
                  // Each letter gets its turn with a delay
                  const colorDelay = totalIndex * timePerLetter;
                  
                  // Cycle through ROYGBIV colors
                  const colorIndex = totalIndex % roygbivColors.length;
                  const letterColor = roygbivColors[colorIndex];
                  
                  return (
                    <span 
                      key={charIndex} 
                      className="hero-section__headline-letter"
                      style={{ 
                        animationDelay: `${totalIndex * 0.05}s, ${colorDelay}s`,
                        '--letter-color': letterColor
                      }}
                    >
                      {char}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </h2>
        <p className="hero-section__subtitle">
          {subtitleText.split('').map((char, index) => (
            <span 
              key={index} 
              className="hero-section__subtitle-letter"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </p>
      </div>

      {/* Info Boxes - Bottom Right */}
      <div className={`hero-section__info-boxes ${infoBoxesVisible ? 'hero-section__info-boxes--visible' : 'hero-section__info-boxes--hidden'}`}>
        <div className="hero-section__info-box hero-section__info-box--growth">
          <span className="material-icons hero-section__info-icon">trending_up</span>
          <div className="hero-section__info-content">
            <h3>Growth</h3>
            <p>Nurturing potential</p>
          </div>
        </div>
        <div className="hero-section__info-box hero-section__info-box--knowledge">
          <span className="material-icons hero-section__info-icon">school</span>
          <div className="hero-section__info-content">
            <h3>Knowledge</h3>
            <p>Building foundations</p>
          </div>
        </div>
        <div className="hero-section__info-box hero-section__info-box--health">
          <span className="material-icons hero-section__info-icon">favorite</span>
          <div className="hero-section__info-content">
            <h3>Health</h3>
            <p>Wellness first</p>
          </div>
        </div>
        <div className="hero-section__info-box hero-section__info-box--creativity">
          <span className="material-icons hero-section__info-icon">palette</span>
          <div className="hero-section__info-content">
            <h3>Creativity</h3>
            <p>Inspiring imagination</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
