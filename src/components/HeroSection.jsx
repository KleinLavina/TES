import { useState, useEffect, useRef } from 'react';
import InfoBoxModal from './InfoBoxModal';
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  // Info box content data
  const infoBoxContent = {
    growth: {
      type: 'growth',
      icon: 'trending_up',
      title: 'Growth',
      subtitle: 'Nurturing potential in every child',
      images: [
        'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=400&fit=crop', // Children playing outdoors
        'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=1200&h=400&fit=crop', // Kids learning together
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=400&fit=crop', // Child growing/reaching
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=400&fit=crop'  // Students developing skills
      ],
      sections: [
        {
          heading: 'Fostering Personal Development',
          text: 'At Tag-os Elementary School, we believe every child has unique potential waiting to be discovered. Our growth-focused approach ensures that each student develops not just academically, but also emotionally, socially, and physically.'
        },
        {
          heading: 'Our Growth Programs',
          list: [
            'Individualized learning plans tailored to each student\'s pace',
            'Character development through values education',
            'Leadership training and student government participation',
            'Mentorship programs connecting older and younger students',
            'Regular progress monitoring and parent-teacher conferences'
          ]
        },
        {
          heading: 'Building Confidence',
          text: 'We create a supportive environment where students feel safe to take risks, make mistakes, and learn from them. Through positive reinforcement and constructive feedback, we help build the confidence needed for lifelong success.'
        }
      ]
    },
    knowledge: {
      type: 'knowledge',
      icon: 'school',
      title: 'Knowledge',
      subtitle: 'Building strong foundations for the future',
      images: [
        'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&h=400&fit=crop', // Students in classroom
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=400&fit=crop', // Books and learning
        'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=400&fit=crop', // Library/reading
        'https://images.unsplash.com/photo-1503676382389-4809596d5290?w=1200&h=400&fit=crop'  // Science/STEM learning
      ],
      sections: [
        {
          heading: 'Quality Education',
          text: 'Our curriculum follows the K-12 program of the Department of Education, enhanced with innovative teaching methods and modern learning resources to ensure students receive the best education possible.'
        },
        {
          heading: 'Core Learning Areas',
          list: [
            'Filipino and English language proficiency',
            'Mathematics and logical reasoning',
            'Science and environmental awareness',
            'Araling Panlipunan (Social Studies)',
            'Technology and digital literacy',
            'Arts, Music, and Physical Education'
          ]
        },
        {
          heading: 'Beyond the Classroom',
          text: 'Learning extends beyond textbooks through field trips, educational tours, science fairs, and interactive workshops that make education engaging and memorable.'
        }
      ]
    },
    health: {
      type: 'health',
      icon: 'favorite',
      title: 'Health',
      subtitle: 'Wellness first, always',
      images: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop', // Kids exercising/sports
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=400&fit=crop', // Gym/fitness activities
        'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200&h=400&fit=crop', // Healthy eating/nutrition
        'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=400&fit=crop'  // Medical care/wellness
      ],
      sections: [
        {
          heading: 'Comprehensive Health Programs',
          text: 'We prioritize the physical and mental well-being of our students through comprehensive health initiatives, regular check-ups, and wellness education.'
        },
        {
          heading: 'Health Services',
          list: [
            'School clinic with trained health personnel',
            'Regular medical and dental check-ups',
            'Nutrition programs and feeding initiatives',
            'Mental health awareness and counseling',
            'Physical fitness activities and sports programs',
            'Health and hygiene education'
          ]
        },
        {
          heading: 'Safe Environment',
          text: 'Our school maintains clean facilities, safe play areas, and implements strict health protocols to ensure a healthy learning environment for all students.'
        }
      ]
    },
    creativity: {
      type: 'creativity',
      icon: 'palette',
      title: 'Creativity',
      subtitle: 'Inspiring imagination and innovation',
      images: [
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=400&fit=crop', // Art supplies/painting
        'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&h=400&fit=crop', // Kids doing arts
        'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=1200&h=400&fit=crop', // Music/instruments
        'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=1200&h=400&fit=crop'  // Creative projects/crafts
      ],
      sections: [
        {
          heading: 'Unleashing Creative Potential',
          text: 'We encourage students to express themselves through various creative outlets, fostering innovation, critical thinking, and artistic expression.'
        },
        {
          heading: 'Creative Programs',
          list: [
            'Arts and crafts workshops',
            'Music and dance programs',
            'Drama and theater activities',
            'Creative writing and storytelling',
            'Science and innovation projects',
            'Cultural performances and celebrations'
          ]
        },
        {
          heading: 'Celebrating Creativity',
          text: 'Through exhibitions, performances, and competitions, we provide platforms for students to showcase their talents and build confidence in their creative abilities.'
        }
      ]
    }
  };

  const handleInfoBoxClick = (type) => {
    setSelectedContent(infoBoxContent[type]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedContent(null);
  };

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
    <section className={`hero-section ${videoLoaded ? 'hero-section--video-loaded' : ''}`} id="hero">
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

        {/* Social Media Links */}
        <div className="hero-section__socials">
          <span className="hero-section__socials-label">Our Socials</span>
          <div className="hero-section__socials-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hero-section__social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hero-section__social-link" aria-label="X (Twitter)">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hero-section__social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hero-section__social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
              </svg>
            </a>
            <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hero-section__social-link" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
            <a href="mailto:school@tagos.edu" className="hero-section__social-link" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Info Boxes - Bottom Right */}
      <div className={`hero-section__info-boxes ${infoBoxesVisible ? 'hero-section__info-boxes--visible' : 'hero-section__info-boxes--hidden'}`}>
        <button 
          className="hero-section__info-box hero-section__info-box--growth"
          onClick={() => handleInfoBoxClick('growth')}
          aria-label="Learn about Growth"
        >
          <span className="material-icons hero-section__info-icon">trending_up</span>
          <div className="hero-section__info-content">
            <h3>Growth</h3>
            <p>Nurturing potential</p>
          </div>
        </button>
        <button 
          className="hero-section__info-box hero-section__info-box--knowledge"
          onClick={() => handleInfoBoxClick('knowledge')}
          aria-label="Learn about Knowledge"
        >
          <span className="material-icons hero-section__info-icon">school</span>
          <div className="hero-section__info-content">
            <h3>Knowledge</h3>
            <p>Building foundations</p>
          </div>
        </button>
        <button 
          className="hero-section__info-box hero-section__info-box--health"
          onClick={() => handleInfoBoxClick('health')}
          aria-label="Learn about Health"
        >
          <span className="material-icons hero-section__info-icon">favorite</span>
          <div className="hero-section__info-content">
            <h3>Health</h3>
            <p>Wellness first</p>
          </div>
        </button>
        <button 
          className="hero-section__info-box hero-section__info-box--creativity"
          onClick={() => handleInfoBoxClick('creativity')}
          aria-label="Learn about Creativity"
        >
          <span className="material-icons hero-section__info-icon">palette</span>
          <div className="hero-section__info-content">
            <h3>Creativity</h3>
            <p>Inspiring imagination</p>
          </div>
        </button>
      </div>

      {/* Info Box Modal */}
      <InfoBoxModal 
        isOpen={modalOpen}
        onClose={closeModal}
        content={selectedContent}
      />
    </section>
  );
};

export default HeroSection;
