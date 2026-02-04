import './AdmissionsSection.css';

const AdmissionsSection = () => {
  return (
    <section className="admissions-section" id="admissions">
      <div className="admissions-section__container">
        <div className="admissions-section__header">
          <span className="admissions-section__label">ADMISSIONS</span>
          <h2 className="admissions-section__title">Join Our School Community</h2>
          <p className="admissions-section__subtitle">
            Start your child's educational journey with us. Follow these simple steps 
            to enroll at Tag-os Elementary School.
          </p>
        </div>

        <div className="admissions-section__steps">
          <div className="admissions-section__step">
            <div className="admissions-section__step-number">1</div>
            <h3 className="admissions-section__step-title">Prepare Documents</h3>
            <p className="admissions-section__step-text">
              Gather all required documents including birth certificate, report cards, 
              and other necessary papers.
            </p>
          </div>

          <div className="admissions-section__step">
            <div className="admissions-section__step-number">2</div>
            <h3 className="admissions-section__step-title">Visit School Office</h3>
            <p className="admissions-section__step-text">
              Submit your complete requirements to our school office during enrollment period.
            </p>
          </div>

          <div className="admissions-section__step">
            <div className="admissions-section__step-number">3</div>
            <h3 className="admissions-section__step-title">Complete Forms</h3>
            <p className="admissions-section__step-text">
              Fill out enrollment forms and provide accurate information for school records.
            </p>
          </div>

          <div className="admissions-section__step">
            <div className="admissions-section__step-number">4</div>
            <h3 className="admissions-section__step-title">Get Class Assignment</h3>
            <p className="admissions-section__step-text">
              Receive your child's class assignment and prepare for the school year ahead.
            </p>
          </div>
        </div>

        <div className="admissions-section__info-grid">
          <div className="admissions-section__card">
            <div className="admissions-section__card-image">
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop" alt="Required Documents" />
            </div>
            <h3 className="admissions-section__card-title">Required Documents</h3>
            <ul className="admissions-section__card-list">
              <li>Birth Certificate (PSA-issued original copy)</li>
              <li>Report Card / Form 138 (for transferees and Grade 2-6)</li>
              <li>Certificate of Good Moral Character</li>
              <li>2x2 ID Photos (2 recent copies)</li>
              <li>Barangay Clearance or Certificate of Residency</li>
              <li>Parent's Valid ID (photocopy)</li>
            </ul>
            <div className="admissions-section__card-highlight">
              <p>
                <strong>Note:</strong> All documents must be original or certified true copies. 
                Photocopies should be clear and readable.
              </p>
            </div>
          </div>

          <div className="admissions-section__card">
            <div className="admissions-section__card-image">
              <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop" alt="Enrollment Information" />
            </div>
            <h3 className="admissions-section__card-title">Enrollment Information</h3>
            <div className="admissions-section__card-highlight">
              <p>
                <strong>Enrollment Period:</strong> Typically opens in April-May for the 
                upcoming school year. Please check with the school office for exact dates.
              </p>
            </div>
            <p className="admissions-section__card-text">
              <strong>Age Requirements:</strong>
            </p>
            <ul className="admissions-section__card-list">
              <li>Kindergarten: At least 5 years old by June 1</li>
              <li>Grade 1: At least 6 years old by June 1</li>
              <li>Grades 2-6: Age-appropriate with proper documents</li>
            </ul>
            <p className="admissions-section__card-text">
              <strong>Office Hours:</strong> Monday to Friday, 8:00 AM - 4:00 PM
            </p>
          </div>
        </div>

        <div className="admissions-section__cta">
          <h3 className="admissions-section__cta-title">Ready to Enroll Your Child?</h3>
          <p className="admissions-section__cta-text">
            Visit our school office or contact us for more information about the enrollment process. 
            Our staff is ready to assist you with any questions.
          </p>
          <a href="#contact" className="admissions-section__cta-button">
            Contact Us
            <span className="material-icons">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
