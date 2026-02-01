import { useState, useEffect } from 'react';
import './HeroSection.css';

/**
 * Hero section with optimized video background
 * - Video preloads and shows gradient fallback while loading
 * - Animated headline with jumping wave effect
 * - Animated subtitle with color wave effect
 */
const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Preload video
    const video = document.querySelector('.hero-section__video');
    if (video) {
      video.addEventListener('loadeddata', () => {
        setVideoLoaded(true);
      });
    }
  }, []);

  // Split text into individual letters/words for animation
  const titleText = "Learning Starts Here";
  const subtitleText = "A nurturing environment for young minds in Tag-os.";

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
          {titleText.split('').map((char, index) => (
            <span 
              key={index} 
              className="hero-section__headline-letter"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
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
    </section>
  );
};

export default HeroSection;
