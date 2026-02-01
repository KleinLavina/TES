import './Footer.css';

/**
 * Footer component with multiple sections
 * - School info and description
 * - Quick links organized in columns
 * - Partner logos section
 * - Copyright and legal links
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Top Section - Newsletter */}
        <div className="footer__newsletter">
          <div className="footer__newsletter-content">
            <h3>Stay Connected</h3>
            <p>Subscribe to receive updates and announcements from Tag-os Elementary School</p>
          </div>
          <div className="footer__newsletter-form">
            <input 
              type="email" 
              placeholder="Enter email address" 
              className="footer__input"
              aria-label="Email address"
            />
            <button className="footer__subscribe-btn">Subscribe</button>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="footer__main">
          {/* School Info */}
          <div className="footer__section footer__section--about">
            <h3 className="footer__title">TAG-OS ELEMENTARY SCHOOL</h3>
            <p className="footer__description">
              A nurturing environment dedicated to fostering academic excellence, 
              character development, and lifelong learning for young minds in Tag-os.
            </p>
            <a href="#about" className="footer__read-more">read more →</a>
          </div>

          {/* Quick Links - Discover */}
          <div className="footer__section">
            <h4 className="footer__heading">Discover</h4>
            <ul className="footer__links">
              <li><a href="#admissions">Admissions</a></li>
              <li><a href="#programs">Programs</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#support">Help & Support</a></li>
            </ul>
          </div>

          {/* Quick Links - About */}
          <div className="footer__section">
            <h4 className="footer__heading">About</h4>
            <ul className="footer__links">
              <li><a href="#staff">Staff</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>

          {/* Quick Links - Resources */}
          <div className="footer__section">
            <h4 className="footer__heading">Resources</h4>
            <ul className="footer__links">
              <li><a href="#calendar">Calendar</a></li>
              <li><a href="#library">Library</a></li>
              <li><a href="#forms">Forms</a></li>
              <li><a href="#privacy">Privacy</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer__section">
            <h4 className="footer__heading">Social</h4>
            <ul className="footer__links">
              <li><a href="#facebook">Facebook</a></li>
              <li><a href="#twitter">Twitter</a></li>
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#youtube">YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Partners Section */}
        <div className="footer__partners">
          <span className="footer__partners-label">Our Partners:</span>
          <div className="footer__partners-list">
            <div className="footer__partner-item">PARTNER 01</div>
            <div className="footer__partner-item">PARTNER 02</div>
            <div className="footer__partner-item">PARTNER 03</div>
            <div className="footer__partner-item">PARTNER 04</div>
            <div className="footer__partner-item">PARTNER 05</div>
            <div className="footer__partner-item">PARTNER 06</div>
          </div>
          <a href="#partners" className="footer__see-all">See All →</a>
        </div>

        {/* Bottom Section */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            Copyright ©2026 All rights reserved | Tag-os Elementary School
          </p>
          <div className="footer__legal">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href="#compliances">Compliances</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
