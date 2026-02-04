import './AcademicsSection.css';

const AcademicsSection = () => {
  return (
    <section className="academics-section" id="academics">
      <div className="academics-section__container">
        <div className="academics-section__header">
          <span className="academics-section__label">ACADEMICS</span>
          <h2 className="academics-section__title">Quality Education for Every Child</h2>
          <p className="academics-section__subtitle">
            We provide comprehensive K-6 education following DepEd's K-12 curriculum, 
            fostering academic excellence and character development.
          </p>
        </div>

        <div className="academics-section__grid">
          <div className="academics-section__card">
            <div className="academics-section__icon">
              <span className="material-icons">school</span>
            </div>
            <h3 className="academics-section__card-title">Grade Levels</h3>
            <p className="academics-section__card-text">
              Complete elementary education from Kindergarten through Grade 6, 
              aligned with the Department of Education's K-12 Basic Education Program.
            </p>
            <ul className="academics-section__card-list">
              <li>Kindergarten (5-6 years old)</li>
              <li>Primary Level (Grades 1-3)</li>
              <li>Intermediate Level (Grades 4-6)</li>
            </ul>
          </div>

          <div className="academics-section__card">
            <div className="academics-section__icon">
              <span className="material-icons">menu_book</span>
            </div>
            <h3 className="academics-section__card-title">Core Subjects</h3>
            <p className="academics-section__card-text">
              Comprehensive curriculum covering essential subjects to build strong 
              academic foundations and critical thinking skills.
            </p>
            <ul className="academics-section__card-list">
              <li>Filipino & English Language</li>
              <li>Mathematics & Science</li>
              <li>Araling Panlipunan (Social Studies)</li>
              <li>MAPEH (Music, Arts, PE, Health)</li>
              <li>Edukasyon sa Pagpapakatao (Values)</li>
            </ul>
          </div>

          <div className="academics-section__card">
            <div className="academics-section__icon">
              <span className="material-icons">psychology</span>
            </div>
            <h3 className="academics-section__card-title">Learning Approach</h3>
            <p className="academics-section__card-text">
              Student-centered teaching methods that encourage active participation, 
              creativity, and holistic development.
            </p>
            <ul className="academics-section__card-list">
              <li>Interactive classroom activities</li>
              <li>Hands-on learning experiences</li>
              <li>Values integration in lessons</li>
              <li>Regular assessments & feedback</li>
            </ul>
          </div>
        </div>

        <div className="academics-section__featured">
          <div className="academics-section__featured-content">
            <span className="academics-section__featured-label">OUR COMMITMENT</span>
            <h3 className="academics-section__featured-title">
              Building Tomorrow's Leaders Today
            </h3>
            <p className="academics-section__featured-text">
              At Tag-os Elementary School, we believe every child deserves quality education 
              that nurtures not just academic excellence, but also strong character, creativity, 
              and social responsibility. Our dedicated teachers create a supportive learning 
              environment where students can thrive and reach their full potential.
            </p>
            <p className="academics-section__featured-text">
              Through our comprehensive curriculum and values-based approach, we prepare 
              students for success in their future academic journey and life beyond the classroom.
            </p>
          </div>
          <div className="academics-section__featured-image">
            <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=900&fit=crop" alt="Building Tomorrow's Leaders" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicsSection;
