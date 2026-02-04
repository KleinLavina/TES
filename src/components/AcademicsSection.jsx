import './PlaceholderSection.css';

/**
 * Academics Section - Placeholder
 * Grade levels and curriculum overview
 */
const AcademicsSection = () => {
  return (
    <section className="placeholder-section" id="academics">
      <div className="placeholder-section__container">
        <h2 className="placeholder-section__title">Academics</h2>
        <div className="placeholder-section__content">
          <div className="placeholder-section__card">
            <h3>Grade Levels</h3>
            <p>We offer quality education for Kindergarten through Grade 6, following the K-12 curriculum set by the Department of Education.</p>
          </div>
          
          <div className="placeholder-section__card">
            <h3>Curriculum Overview</h3>
            <p>Our curriculum focuses on developing well-rounded students through core subjects including Filipino, English, Mathematics, Science, and Araling Panlipunan.</p>
          </div>
          
          <div className="placeholder-section__card">
            <h3>Learning Programs</h3>
            <p>We provide engaging learning experiences through interactive lessons, hands-on activities, and values education.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
