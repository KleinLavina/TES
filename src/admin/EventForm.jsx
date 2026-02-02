import { useState, useEffect } from 'react';
import RichTextEditor from './RichTextEditor';
import ImageUploadModal from './ImageUploadModal';
import FeaturedImagePreview from './FeaturedImagePreview';
import './EventForm.css';

/**
 * EventForm - Create/Edit form for events and announcements
 */
const EventForm = ({ event, onSave, onCancel, isEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Event',
    description: '',
    eventDate: '',
    eventTime: '',
    location: '',
    featuredImage: '',
    featured: false,
    published: true,
  });

  const [errors, setErrors] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        category: event.category || 'Event',
        description: event.description || '',
        eventDate: event.eventDate || '',
        eventTime: event.eventTime || '',
        location: event.location || '',
        featuredImage: event.featuredImage || '',
        featured: event.featured || false,
        published: event.published !== undefined ? event.published : true,
      });
    }
  }, [event]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be 200 characters or less';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.location && formData.location.length > 100) {
      newErrors.location = 'Location must be 100 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave(formData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageSave = (imageData) => {
    handleChange('featuredImage', imageData);
    setShowImageModal(false);
  };

  const handleImageRemove = () => {
    handleChange('featuredImage', '');
  };

  return (
    <div className="event-form">
      <div className="event-form__header">
        <h2>{isEdit ? 'Edit Event/Announcement' : 'Create New Event/Announcement'}</h2>
      </div>

      <form onSubmit={handleSubmit} className="event-form__form">
        {/* Title */}
        <div className="event-form__field">
          <label htmlFor="title" className="event-form__label">
            Title <span className="event-form__required">*</span>
          </label>
          <input
            type="text"
            id="title"
            className={`event-form__input ${errors.title ? 'event-form__input--error' : ''}`}
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter event or announcement title"
            maxLength={200}
          />
          {errors.title && (
            <span className="event-form__error">{errors.title}</span>
          )}
          <span className="event-form__hint">
            {formData.title.length}/200 characters
          </span>
        </div>

        {/* Category */}
        <div className="event-form__field">
          <label htmlFor="category" className="event-form__label">
            Category <span className="event-form__required">*</span>
          </label>
          <select
            id="category"
            className={`event-form__select ${errors.category ? 'event-form__input--error' : ''}`}
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="Event">Event</option>
            <option value="Announcement">Announcement</option>
            <option value="College Event">College Event</option>
            <option value="Academic">Academic</option>
            <option value="Sports">Sports</option>
            <option value="Cultural">Cultural</option>
            <option value="Community">Community</option>
          </select>
          {errors.category && (
            <span className="event-form__error">{errors.category}</span>
          )}
        </div>

        {/* Description */}
        <div className="event-form__field">
          <label className="event-form__label">
            Description
          </label>
          <RichTextEditor
            value={formData.description}
            onChange={(value) => handleChange('description', value)}
            placeholder="Enter event description with rich formatting..."
          />
        </div>

        {/* Event Date & Time */}
        <div className="event-form__row">
          <div className="event-form__field">
            <label htmlFor="eventDate" className="event-form__label">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              className="event-form__input"
              value={formData.eventDate}
              onChange={(e) => handleChange('eventDate', e.target.value)}
            />
          </div>

          <div className="event-form__field">
            <label htmlFor="eventTime" className="event-form__label">
              Event Time
            </label>
            <input
              type="time"
              id="eventTime"
              className="event-form__input"
              value={formData.eventTime}
              onChange={(e) => handleChange('eventTime', e.target.value)}
            />
          </div>
        </div>

        {/* Location */}
        <div className="event-form__field">
          <label htmlFor="location" className="event-form__label">
            Location
          </label>
          <input
            type="text"
            id="location"
            className={`event-form__input ${errors.location ? 'event-form__input--error' : ''}`}
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Enter event location"
            maxLength={100}
          />
          {errors.location && (
            <span className="event-form__error">{errors.location}</span>
          )}
          <span className="event-form__hint">
            {formData.location.length}/100 characters
          </span>
        </div>

        {/* Featured Image */}
        <div className="event-form__field">
          <label className="event-form__label">
            Featured Image (3:2 aspect ratio)
          </label>
          
          {formData.featuredImage ? (
            <FeaturedImagePreview
              imageUrl={formData.featuredImage}
              onRemove={handleImageRemove}
              onReplace={() => setShowImageModal(true)}
            />
          ) : (
            <button
              type="button"
              className="event-form__upload-btn"
              onClick={() => setShowImageModal(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              Upload Featured Image
            </button>
          )}
        </div>

        {/* Toggles */}
        <div className="event-form__toggles">
          <label className="event-form__toggle">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => handleChange('featured', e.target.checked)}
            />
            <span className="event-form__toggle-label">
              <strong>Featured</strong> - Show in hero carousel
            </span>
          </label>

          <label className="event-form__toggle">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => handleChange('published', e.target.checked)}
            />
            <span className="event-form__toggle-label">
              <strong>Published</strong> - Visible to public
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="event-form__actions">
          <button
            type="button"
            className="event-form__btn event-form__btn--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="event-form__btn event-form__btn--save"
          >
            {isEdit ? 'Update Event' : 'Create Event'}
          </button>
        </div>
      </form>

      {/* Image Upload Modal */}
      {showImageModal && (
        <ImageUploadModal
          onSave={handleImageSave}
          onClose={() => setShowImageModal(false)}
          aspectRatio={3 / 2}
          title="Upload Featured Image (3:2)"
        />
      )}
    </div>
  );
};

export default EventForm;
