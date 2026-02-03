import { useState, useEffect, useRef } from 'react';
import './SchoolInfoSection.css';

const SchoolInfoSection = () => {
  const [openItem, setOpenItem] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [mapType, setMapType] = useState('google'); // 'google' or 'osm'
  const mapRef = useRef(null);

  const toggleItem = (index) => {
    setOpenItem(openItem === index ? null : index);
  };

  const toggleMapType = () => {
    setMapType(mapType === 'google' ? 'osm' : 'google');
  };

  // Intersection Observer for map fade animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsMapVisible(entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        observer.unobserve(mapRef.current);
      }
    };
  }, []);

  const faqData = [
    {
      question: (
        <>
          <span className="material-icons">location_on</span>
          Where is Tag-os Elementary School located?
        </>
      ),
      answer: (
        <>
          <img 
            src="/media/about/512725150_24221509374181319_7314861801373657304_n.jpg" 
            alt="Tag-os Elementary School" 
            className="school-info__location-image"
          />
          <p>Tag-os Elementary School is a public elementary school in <strong>Barangay Tag-os, Municipality of Matalom, Province of Leyte, Philippines</strong>.</p>
          <p>It's under the Matalom South District of the Leyte Schools Division of the Department of Education.</p>
          <p className="school-info__address">
            <strong>Address:</strong><br />
            Barangay Tag-os, Matalom, Leyte<br />
            6526 Philippines
          </p>
        </>
      )
    },
    {
      question: (
        <>
          <span className="material-icons">event</span>
          When was Tag-os Elementary School established?
        </>
      ),
      answer: (
        <>
          <p>There isn't an official DepEd page showing the exact foundation date, but OpenStreetMap data suggests the school was founded around <strong>1958</strong>.</p>
          <p>If an exact date from DepEd records is required, please refer to the official DepEd masterlist.</p>
        </>
      )
    },
    {
      question: (
        <>
          <span className="material-icons">flag</span>
          What is the school's mission & vision?
        </>
      ),
      answer: (
        <>
          <p>There's no publicly available school-specific mission/vision page for Tag-os Elementary School right now. If it follows standard DepEd public school guidelines, it likely adopts the Department of Education's vision and mission:</p>
          
          <div className="school-info__deped-vision">
            <h4>DepEd Vision</h4>
            <p><em>To dream of Filipinos who passionately love their country and whose values and competencies enable them to realize their full potential and contribute meaningfully to building the nation.</em></p>
          </div>

          <div className="school-info__deped-mission">
            <h4>DepEd Mission</h4>
            <p><em>To protect and promote the right of every Filipino to quality, equitable, culture-based and complete basic education where students learn in a child-friendly, gender-sensitive, safe, and motivating environment.</em></p>
          </div>
        </>
      )
    },
    {
      question: (
        <>
          <span className="material-icons">diamond</span>
          What are our Core Values?
        </>
      ),
      answer: (
        <>
          <p>Tag-os Elementary School upholds the core values that guide our educational community:</p>
          
          <div className="school-info__core-values">
            <div className="school-info__value-item">
              <h4>Maka-Diyos (Faith in God)</h4>
              <p>We foster spiritual and moral development, encouraging students to live with integrity and respect for all beliefs.</p>
            </div>
            
            <div className="school-info__value-item">
              <h4>Maka-Tao (Respect for Others)</h4>
              <p>We promote compassion, empathy, and respect for human dignity in all our interactions.</p>
            </div>
            
            <div className="school-info__value-item">
              <h4>Makakalikasan (Care for Environment)</h4>
              <p>We instill environmental awareness and responsibility for sustainable living.</p>
            </div>
            
            <div className="school-info__value-item">
              <h4>Makabansa (Love of Country)</h4>
              <p>We nurture patriotism, civic responsibility, and pride in our Filipino heritage.</p>
            </div>
          </div>
        </>
      )
    },
    {
      question: (
        <>
          <span className="material-icons">description</span>
          What is our Mandate?
        </>
      ),
      answer: (
        <>
          <p>As a public elementary school under the Department of Education, Tag-os Elementary School operates under the following mandate:</p>
          
          <div className="school-info__mandate">
            <h4>Our Mandate</h4>
            <p>To provide free and compulsory elementary education to all Filipino children, ensuring:</p>
            <ul>
              <li><strong>Quality Education:</strong> Delivering effective teaching and learning experiences that meet national standards</li>
              <li><strong>Inclusive Access:</strong> Ensuring every child, regardless of background, has access to education</li>
              <li><strong>Holistic Development:</strong> Nurturing cognitive, social, emotional, and physical growth</li>
              <li><strong>Community Partnership:</strong> Working with parents, local government, and community stakeholders</li>
              <li><strong>Safe Learning Environment:</strong> Maintaining child-friendly, gender-sensitive, and secure facilities</li>
            </ul>
            <p className="school-info__mandate-footer">We are committed to implementing the K-12 Basic Education Program and preparing our students for lifelong learning and responsible citizenship.</p>
          </div>
        </>
      )
    }
  ];

  return (
    <section className="school-info">
      <div className="school-info__container">
        {/* Left Column - Accordion */}
        <div className="school-info__accordion">
          <h2 className="school-info__title">About Our School</h2>
          
          <div className="accordion" role="region" aria-label="School Information">
            {faqData.map((item, index) => (
              <div key={index} className="accordion__item">
                <h3 className="accordion__header">
                  <button
                    className={`accordion__trigger ${openItem === index ? 'accordion__trigger--open' : ''}`}
                    onClick={() => toggleItem(index)}
                    aria-expanded={openItem === index}
                    aria-controls={`accordion-content-${index}`}
                    id={`accordion-trigger-${index}`}
                  >
                    <span className="accordion__trigger-text">{item.question}</span>
                    <svg
                      className="accordion__icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </h3>
                
                <div
                  id={`accordion-content-${index}`}
                  className={`accordion__content ${openItem === index ? 'accordion__content--open' : ''}`}
                  role="region"
                  aria-labelledby={`accordion-trigger-${index}`}
                  hidden={openItem !== index}
                >
                  <div className="accordion__content-inner">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Google Maps */}
        <div 
          className={`school-info__map ${isMapVisible ? 'school-info__map--visible' : 'school-info__map--hidden'}`}
          ref={mapRef}
        >
          {/* Map Switcher */}
          <div className="school-info__map-switcher">
            <button
              className={`school-info__map-btn ${mapType === 'google' ? 'school-info__map-btn--active' : ''}`}
              onClick={toggleMapType}
              aria-label="Switch to Google Maps"
              disabled={mapType === 'google'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Google Maps
            </button>
            <button
              className={`school-info__map-btn ${mapType === 'osm' ? 'school-info__map-btn--active' : ''}`}
              onClick={toggleMapType}
              aria-label="Switch to OpenStreetMap"
              disabled={mapType === 'osm'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              OpenStreetMap
            </button>
          </div>

          <div className="school-info__map-wrapper">
            {mapType === 'google' ? (
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.234567890123!2d124.76247!3d10.19233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDExJzMyLjQiTiAxMjTCsDQ1JzQ0LjkiRQ!5e0!3m2!1sen!2sph!4v1234567890123!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tag-os Elementary School Location - Google Maps"
                aria-label="Google Maps showing Tag-os Elementary School location"
              ></iframe>
            ) : (
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=124.7580%2C10.1890%2C124.7670%2C10.1960&layer=mapnik&marker=10.19233%2C124.76247"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                title="Tag-os Elementary School Location - OpenStreetMap"
                aria-label="OpenStreetMap showing Tag-os Elementary School location"
              ></iframe>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolInfoSection;
