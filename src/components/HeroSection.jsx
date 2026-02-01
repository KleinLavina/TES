import './HeroSection.css';

/**
 * Hero section with video background
 * - Video background with fallback gradient
 * - Large decorative headline text
 * - Positioned for visual impact
 */
const HeroSection = () => {
  return (
    <section className="hero-section">
      {/* Video background */}
      <video className="hero-section__video" autoPlay loop muted playsInline>
        <source src="/media/videos/3214535-uhd_3840_2160_25fps.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay for better text readability */}
      <div className="hero-section__overlay"></div>
      
      <div className="hero-section__content">
        <h2 className="hero-section__headline">
          Learning Starts Here
        </h2>
        <p className="hero-section__subtitle">
          A nurturing environment for young minds in Tag-os.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
