import './PlaceholderSection.css';

/**
 * Facilities Section - Placeholder
 * School spaces and resources
 */
const FacilitiesSection = () => {
  return (
    <section className="placeholder-section" id="facilities">
      <div className="placeholder-section__container">
        <h2 className="placeholder-section__title">Facilities</h2>
        <div className="placeholder-section__content">
          <div className="placeholder-section__card">
            <h3>Classrooms</h3>
            <p>Well-ventilated and spacious classrooms equipped with learning materials and visual aids to support effective teaching and learning.</p>
          </div>
          
          <div className="placeholder-section__card">
            <h3>Library</h3>
            <p>A reading area with books and educational materials to encourage reading habits and support research activities.</p>
          </div>
          
          <div className="placeholder-section__card">
            <h3>Playground</h3>
            <p>Safe outdoor play area where students can engage in physical activities and recreational games during break time.</p>
          </div>
          
          <div className="placeholder-section__card">
            <h3>Computer Laboratory</h3>
            <p>Computer facilities to introduce students to basic technology and digital literacy skills.</p>
          </div>
          
          <div className="placeholder-section__card">
            <h3>Canteen</h3>
            <p>Clean and hygienic canteen serving nutritious meals and snacks for students and staff.</p>
          </div>
          
          <div className="placeholder-section__card">
            <h3>Clinic</h3>
            <p>School health facility for basic first aid and health monitoring of students.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
