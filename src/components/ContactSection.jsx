import { useState } from 'react';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    state: '',
    message: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      setSubmitMessage('Please consent to emails and calls regarding your inquiry.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitMessage('Thank you! Your message has been sent successfully.');
      setIsSubmitting(false);
      
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        state: '',
        message: '',
        consent: false
      });
    }, 1000);
  };

  return (
    <section className="contact-section">
      <div className="contact-section__container">
        <div className="contact-section__header">
          <span className="contact-section__label">CONTACT US</span>
          <h2 className="contact-section__title">Connect with an Advisor</h2>
        </div>

        <div className="contact-section__content">
          <form className="contact-section__form" onSubmit={handleSubmit}>
            <div className="contact-section__row">
              <div className="contact-section__field">
                <label htmlFor="firstName" className="contact-section__field-label">First Name*</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="contact-section__input" required />
              </div>
              <div className="contact-section__field">
                <label htmlFor="lastName" className="contact-section__field-label">Last Name*</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="contact-section__input" required />
              </div>
            </div>

            <div className="contact-section__row">
              <div className="contact-section__field">
                <label htmlFor="phone" className="contact-section__field-label">Phone Number*</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="contact-section__input" required />
              </div>
              <div className="contact-section__field">
                <label htmlFor="address" className="contact-section__field-label">Address*</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="contact-section__input" required />
              </div>
            </div>

            <div className="contact-section__field contact-section__field--full">
              <label htmlFor="state" className="contact-section__field-label">Your State</label>
              <select id="state" name="state" value={formData.state} onChange={handleChange} className="contact-section__select">
                <option value="">Select your state</option>
                <option value="Metro Manila">Metro Manila</option>
                <option value="Cebu">Cebu</option>
                <option value="Davao">Davao</option>
                <option value="Iloilo">Iloilo</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="contact-section__field contact-section__field--full">
              <label htmlFor="message" className="contact-section__field-label">Message</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="contact-section__textarea" rows="5" placeholder="Tell us how we can help..." />
            </div>

            <div className="contact-section__consent">
              <label className="contact-section__checkbox-label">
                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="contact-section__checkbox" required />
                <span>I consent to emails and calls regarding my inquiry and agree to the <a href="/privacy-policy" className="contact-section__link">Privacy Policy</a>.</span>
              </label>
            </div>

            {submitMessage && (
              <div className={`contact-section__message ${submitMessage.includes('Thank') ? 'contact-section__message--success' : 'contact-section__message--error'}`}>
                {submitMessage}
              </div>
            )}

            <div className="contact-section__submit-wrapper">
              <button type="submit" className="contact-section__submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Now'}
                <span className="material-icons">arrow_forward</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
