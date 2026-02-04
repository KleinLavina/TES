import './PlaceholderSection.css';

/**
 * Admissions Section - Placeholder
 * Enrollment requirements and process
 */
const AdmissionsSection = () => {
  return (
    <section className="placeholder-section" id="admissions">
      <div className="placeholder-section__container">
        <h2 className="placeholder-section__title">Admissions</h2>
        <div className="placeholder-section__content">
          <div className="placeholder-section__card">
            <h3>Enrollment Requirements</h3>
            <ul>
              <li>Birth Certificate (PSA Copy)</li>
              <li>Report Card or Form 138 (for transferees)</li>
              <li>Good Moral Certificate</li>
              <li>2x2 ID Photos (2 copies)</li>
              <li>Barangay Clearance</li>
            </ul>
          </div>
          
          <div className="placeholder-section__card">
            <h3>Enrollment Process</h3>
            <ol>
              <li>Submit complete requirements to the school office</li>
              <li>Fill out enrollment forms</li>
              <li>Wait for assessment and approval</li>
              <li>Receive class assignment</li>
            </ol>
          </div>
          
          <div className="placeholder-section__card">
            <h3>Enrollment Period</h3>
            <p>Enrollment typically opens in April-May for the upcoming school year. Please visit the school office for specific dates and schedules.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsSection;
