import './FacilitiesSection.css';

const FacilitiesSection = () => {
  return (
    <section className="facilities-section" id="facilities">
      <div className="facilities-section__container">
        <div className="facilities-section__header">
          <span className="facilities-section__label">FACILITIES</span>
          <h2 className="facilities-section__title">Our School Facilities</h2>
          <p className="facilities-section__subtitle">
            Modern, safe, and well-maintained spaces designed to support learning, 
            growth, and development for every student.
          </p>
        </div>

        <div className="facilities-section__grid">
          <div className="facilities-section__card">
            <div className="facilities-section__card-image">
              <img 
                src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop" 
                alt="Classrooms" 
              />
            </div>
            <div className="facilities-section__card-content">
              <div className="facilities-section__card-header">
                <div className="facilities-section__card-icon">
                  <span className="material-icons">meeting_room</span>
                </div>
                <h3 className="facilities-section__card-title">Classrooms</h3>
              </div>
              <p className="facilities-section__card-text">
                Well-ventilated and spacious classrooms equipped with modern learning 
                materials, visual aids, and comfortable seating to support effective 
                teaching and interactive learning experiences.
              </p>
            </div>
          </div>

          <div className="facilities-section__card">
            <div className="facilities-section__card-image">
              <img 
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop" 
                alt="Library" 
              />
            </div>
            <div className="facilities-section__card-content">
              <div className="facilities-section__card-header">
                <div className="facilities-section__card-icon">
                  <span className="material-icons">local_library</span>
                </div>
                <h3 className="facilities-section__card-title">Library</h3>
              </div>
              <p className="facilities-section__card-text">
                A quiet reading area stocked with age-appropriate books, reference 
                materials, and educational resources to encourage reading habits and 
                support research activities for all grade levels.
              </p>
            </div>
          </div>

          <div className="facilities-section__card">
            <div className="facilities-section__card-image">
              <img 
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop" 
                alt="Playground" 
              />
            </div>
            <div className="facilities-section__card-content">
              <div className="facilities-section__card-header">
                <div className="facilities-section__card-icon">
                  <span className="material-icons">sports_soccer</span>
                </div>
                <h3 className="facilities-section__card-title">Playground</h3>
              </div>
              <p className="facilities-section__card-text">
                Safe and spacious outdoor play area where students can engage in 
                physical activities, recreational games, and sports during break time, 
                promoting health and social interaction.
              </p>
            </div>
          </div>

          <div className="facilities-section__card">
            <div className="facilities-section__card-image">
              <img 
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop" 
                alt="Computer Laboratory" 
              />
            </div>
            <div className="facilities-section__card-content">
              <div className="facilities-section__card-header">
                <div className="facilities-section__card-icon">
                  <span className="material-icons">computer</span>
                </div>
                <h3 className="facilities-section__card-title">Computer Lab</h3>
              </div>
              <p className="facilities-section__card-text">
                Modern computer facilities equipped with educational software to 
                introduce students to basic technology, digital literacy skills, and 
                prepare them for the digital age.
              </p>
            </div>
          </div>

          <div className="facilities-section__card">
            <div className="facilities-section__card-image">
              <img 
                src="https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop" 
                alt="Canteen" 
              />
            </div>
            <div className="facilities-section__card-content">
              <div className="facilities-section__card-header">
                <div className="facilities-section__card-icon">
                  <span className="material-icons">restaurant</span>
                </div>
                <h3 className="facilities-section__card-title">Canteen</h3>
              </div>
              <p className="facilities-section__card-text">
                Clean and hygienic canteen facility serving nutritious meals and 
                healthy snacks for students and staff, ensuring proper nutrition to 
                support learning and growth.
              </p>
            </div>
          </div>

          <div className="facilities-section__card">
            <div className="facilities-section__card-image">
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop" 
                alt="Health Clinic" 
              />
            </div>
            <div className="facilities-section__card-content">
              <div className="facilities-section__card-header">
                <div className="facilities-section__card-icon">
                  <span className="material-icons">medical_services</span>
                </div>
                <h3 className="facilities-section__card-title">Health Clinic</h3>
              </div>
              <p className="facilities-section__card-text">
                School health facility staffed for basic first aid, health monitoring, 
                and medical assistance to ensure the well-being and safety of all 
                students throughout the school day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
