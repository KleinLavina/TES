import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__split">
        {/* Left Side - White Background */}
        <div className="footer__left">
          <div className="footer__branding">
            <img 
              src="/media/logo/logotes.png" 
              alt="Tag-os Elementary School Logo" 
              className="footer__logo"
            />
            <h3 className="footer__school-name">Tag-os Elementary School</h3>
            <p className="footer__tagline">The official website of Tag-os Elementary School</p>
          </div>

          <div className="footer__contact">
            <h4 className="footer__heading">Contact Us</h4>
            <div className="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>Tag-os, Surigao del Norte</span>
            </div>
            <div className="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <a href="mailto:info@tagos-es.edu.ph">info@tagos-es.edu.ph</a>
            </div>
          </div>

          <div className="footer__social">
            <h4 className="footer__heading">Connect With Us</h4>
            <div className="footer__social-icons">
              <a href="#facebook" className="footer__social-icon" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#twitter" className="footer__social-icon" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#youtube" className="footer__social-icon" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Black Background with Navigation */}
        <div className="footer__right">
          <div className="footer__nav-columns">
            <div className="footer__nav-column">
              <h4 className="footer__nav-heading">About</h4>
              <ul className="footer__nav-list">
                <li><a href="#about">About School</a></li>
                <li><a href="#mission">Mission & Vision</a></li>
                <li><a href="#history">History</a></li>
                <li><a href="#faculty">Faculty & Staff</a></li>
              </ul>
            </div>

            <div className="footer__nav-column">
              <h4 className="footer__nav-heading">Academics</h4>
              <ul className="footer__nav-list">
                <li><a href="#programs">Programs</a></li>
                <li><a href="#curriculum">Curriculum</a></li>
                <li><a href="#calendar">School Calendar</a></li>
                <li><a href="#library">Library</a></li>
              </ul>
            </div>

            <div className="footer__nav-column">
              <h4 className="footer__nav-heading">Admissions</h4>
              <ul className="footer__nav-list">
                <li><a href="#enrollment">Enrollment</a></li>
                <li><a href="#requirements">Requirements</a></li>
                <li><a href="#tuition">Tuition & Fees</a></li>
                <li><a href="#scholarships">Scholarships</a></li>
              </ul>
            </div>

            <div className="footer__nav-column">
              <h4 className="footer__nav-heading">Resources</h4>
              <ul className="footer__nav-list">
                <li><a href="#announcements">Announcements</a></li>
                <li><a href="#events">Events</a></li>
                <li><a href="#forms">Forms & Downloads</a></li>
                <li><a href="#contact">Contact Us</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="footer__bottom">
        <p className="footer__copyright">
          © 2026 Tag-os Elementary School. All rights reserved.
        </p>
        <div className="footer__legal">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
