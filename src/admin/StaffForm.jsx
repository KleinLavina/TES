import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import './StaffForm.css';

/**
 * StaffForm - Create/Edit principal or teacher
 */
const StaffForm = ({ staff, staffType, onSave, onCancel, isEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    grade_level: '',
    subject: '',
    bio: '',
    profile_image: '',
    is_published: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (staff) {
      setFormData({
        name: staff.name || '',
        title: staff.title || '',
        grade_level: staff.grade_level || '',
        subject: staff.subject || '',
        bio: staff.bio || '',
        profile_image: staff.profile_image || '',
        is_published: staff.is_published ?? true,
      });
    }
  }, [staff]);

  const gradeOptions = [
    'Kindergarten',
    'Grade 1',
    'Grade 2',
    'Grade 3',
    'Grade 4',
    'Grade 5',
    'Grade 6',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, profile_image: imageUrl }));
    if (errors.profile_image) {
      setErrors(prev => ({ ...prev, profile_image: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (staffType === 'principal') {
      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }
    } else {
      if (!formData.grade_level) {
        newErrors.grade_level = 'Grade level is required';
      }
      if (!formData.subject.trim()) {
        newErrors.subject = 'Subject is required';
      }
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    }

    if (!formData.profile_image) {
      newErrors.profile_image = 'Profile image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="staff-form">
      <div className="staff-form__header">
        <h2 className="staff-form__title">
          {isEdit ? 'Edit' : 'Add'} {staffType === 'principal' ? 'Principal' : 'Teacher'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="staff-form__form">
        {/* Profile Image */}
        <div className="staff-form__section">
          <h3 className="staff-form__section-title">Profile Image</h3>
          <div className="staff-form__image-upload">
            <ImageUploader
              currentImage={formData.profile_image}
              onImageUpload={handleImageUpload}
              aspectRatio={1}
              label="Upload Profile Photo"
            />
            {errors.profile_image && (
              <p className="staff-form__error">{errors.profile_image}</p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="staff-form__section">
          <h3 className="staff-form__section-title">Basic Information</h3>
          
          <div className="staff-form__field">
            <label className="staff-form__label">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`staff-form__input ${errors.name ? 'staff-form__input--error' : ''}`}
              placeholder="e.g., Dr. Maria Santos"
            />
            {errors.name && (
              <p className="staff-form__error">{errors.name}</p>
            )}
          </div>

          {staffType === 'principal' ? (
            <div className="staff-form__field">
              <label className="staff-form__label">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`staff-form__input ${errors.title ? 'staff-form__input--error' : ''}`}
                placeholder="e.g., School Principal"
              />
              {errors.title && (
                <p className="staff-form__error">{errors.title}</p>
              )}
            </div>
          ) : (
            <>
              <div className="staff-form__field">
                <label className="staff-form__label">
                  Grade Level *
                </label>
                <select
                  name="grade_level"
                  value={formData.grade_level}
                  onChange={handleChange}
                  className={`staff-form__select ${errors.grade_level ? 'staff-form__input--error' : ''}`}
                >
                  <option value="">Select grade level</option>
                  {gradeOptions.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>
                {errors.grade_level && (
                  <p className="staff-form__error">{errors.grade_level}</p>
                )}
              </div>

              <div className="staff-form__field">
                <label className="staff-form__label">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`staff-form__input ${errors.subject ? 'staff-form__input--error' : ''}`}
                  placeholder="e.g., Mathematics & Science"
                />
                {errors.subject && (
                  <p className="staff-form__error">{errors.subject}</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Bio */}
        <div className="staff-form__section">
          <h3 className="staff-form__section-title">Biography</h3>
          
          <div className="staff-form__field">
            <label className="staff-form__label">
              Bio *
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className={`staff-form__textarea ${errors.bio ? 'staff-form__input--error' : ''}`}
              placeholder="Write a brief biography..."
              rows="5"
            />
            {errors.bio && (
              <p className="staff-form__error">{errors.bio}</p>
            )}
            <p className="staff-form__hint">
              {formData.bio.length} characters
            </p>
          </div>
        </div>

        {/* Publishing */}
        {staffType === 'teacher' && (
          <div className="staff-form__section">
            <h3 className="staff-form__section-title">Publishing</h3>
            
            <div className="staff-form__checkbox">
              <input
                type="checkbox"
                id="is_published"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
                className="staff-form__checkbox-input"
              />
              <label htmlFor="is_published" className="staff-form__checkbox-label">
                <span className="material-icons">
                  {formData.is_published ? 'visibility' : 'visibility_off'}
                </span>
                Publish this teacher profile
              </label>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="staff-form__actions">
          <button
            type="button"
            onClick={onCancel}
            className="staff-form__btn staff-form__btn--cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="staff-form__btn staff-form__btn--save"
          >
            <span className="material-icons">save</span>
            {isEdit ? 'Update' : 'Create'} {staffType === 'principal' ? 'Principal' : 'Teacher'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StaffForm;
