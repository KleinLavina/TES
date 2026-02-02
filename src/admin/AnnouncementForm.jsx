import { useState, useEffect } from 'react';
import ImageUploadModal from './ImageUploadModal';
import FeaturedImagePreview from './FeaturedImagePreview';
import RichTextEditor from './RichTextEditor';
import './AnnouncementForm.css';

/**
 * AnnouncementForm - Create/Edit announcement form
 * Now with modal-based image upload and cropping
 */
const AnnouncementForm = ({ announcement, onSave, onCancel, isEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image_url: '',
    source: '',
    author: '',
    is_published: true,
    published_at: new Date().toISOString().split('T')[0],
    order_index: 0,
  });

  const [errors, setErrors] = useState({});
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    if (announcement) {
      setFormData({
        ...announcement,
        published_at: announcement.published_at.split('T')[0],
      });
    }
  }, [announcement]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue,
      // Auto-generate slug from title
      ...(name === 'title' && { slug: generateSlug(value) })
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (imageUrl) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl }));
    if (errors.image_url) {
      setErrors(prev => ({ ...prev, image_url: '' }));
    }
  };

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, image_url: '' }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.excerpt.trim()) {
      newErrors.excerpt = 'Excerpt is required';
    } else if (formData.excerpt.length > 300) {
      newErrors.excerpt = 'Excerpt must be less than 300 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if (!formData.image_url) {
      newErrors.image_url = 'Image is required';
    }

    if (!formData.source.trim()) {
      newErrors.source = 'Source is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSave({
        ...formData,
        published_at: new Date(formData.published_at).toISOString(),
      });
    }
  };

  return (
    <div className="announcement-form">
      <div className="announcement-form__header">
        <h2 className="announcement-form__title">
          {isEdit ? 'Edit Story' : 'Create New Story'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="announcement-form__form">
        <div className="announcement-form__section">
          <h3 className="announcement-form__section-title">Basic Information</h3>

          <div className="announcement-form__field">
            <label htmlFor="title" className="announcement-form__label">
              Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className={`announcement-form__input ${errors.title ? 'error' : ''}`}
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter announcement title"
            />
            {errors.title && <span className="announcement-form__error">{errors.title}</span>}
          </div>

          <div className="announcement-form__field">
            <label htmlFor="slug" className="announcement-form__label">
              URL Slug
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              className="announcement-form__input"
              value={formData.slug}
              onChange={handleChange}
              placeholder="auto-generated-from-title"
            />
            <small className="announcement-form__hint">Auto-generated from title</small>
          </div>

          <div className="announcement-form__field">
            <label htmlFor="excerpt" className="announcement-form__label">
              Excerpt <span className="required">*</span>
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              className={`announcement-form__textarea ${errors.excerpt ? 'error' : ''}`}
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Short description (max 300 characters)"
              rows="3"
            />
            <div className="announcement-form__char-count">
              {formData.excerpt.length} / 300
            </div>
            {errors.excerpt && <span className="announcement-form__error">{errors.excerpt}</span>}
          </div>

          <div className="announcement-form__field">
            <label htmlFor="content" className="announcement-form__label">
              Full Content <span className="required">*</span>
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(html) => {
                setFormData(prev => ({ ...prev, content: html }));
                if (errors.content) {
                  setErrors(prev => ({ ...prev, content: '' }));
                }
              }}
              placeholder="Write your announcement content here. Use the toolbar to format text."
              error={errors.content}
            />
            {errors.content && <span className="announcement-form__error">{errors.content}</span>}
          </div>
        </div>

        <div className="announcement-form__section">
          <h3 className="announcement-form__section-title">Featured Image</h3>
          <FeaturedImagePreview
            imageUrl={formData.image_url}
            onReplace={() => setShowImageModal(true)}
            onRemove={handleImageRemove}
          />
          {errors.image_url && <span className="announcement-form__error">{errors.image_url}</span>}
        </div>

        <div className="announcement-form__section">
          <h3 className="announcement-form__section-title">Metadata</h3>

          <div className="announcement-form__row">
            <div className="announcement-form__field">
              <label htmlFor="source" className="announcement-form__label">
                Source <span className="required">*</span>
              </label>
              <input
                type="text"
                id="source"
                name="source"
                className={`announcement-form__input ${errors.source ? 'error' : ''}`}
                value={formData.source}
                onChange={handleChange}
                placeholder="e.g., School Administration"
              />
              {errors.source && <span className="announcement-form__error">{errors.source}</span>}
            </div>

            <div className="announcement-form__field">
              <label htmlFor="author" className="announcement-form__label">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className="announcement-form__input"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g., Principal Maria Santos"
              />
            </div>
          </div>

          <div className="announcement-form__row">
            <div className="announcement-form__field">
              <label htmlFor="published_at" className="announcement-form__label">
                Publish Date
              </label>
              <input
                type="date"
                id="published_at"
                name="published_at"
                className="announcement-form__input"
                value={formData.published_at}
                onChange={handleChange}
              />
            </div>

            <div className="announcement-form__field">
              <label htmlFor="order_index" className="announcement-form__label">
                Display Order
              </label>
              <input
                type="number"
                id="order_index"
                name="order_index"
                className="announcement-form__input"
                value={formData.order_index}
                onChange={handleChange}
                min="0"
              />
              <small className="announcement-form__hint">Lower numbers appear first</small>
            </div>
          </div>

          <div className="announcement-form__field">
            <label className="announcement-form__checkbox">
              <input
                type="checkbox"
                name="is_published"
                checked={formData.is_published}
                onChange={handleChange}
              />
              <span>Publish immediately</span>
            </label>
          </div>
        </div>

        <div className="announcement-form__actions">
          <button
            type="button"
            className="announcement-form__button cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="announcement-form__button submit"
          >
            {isEdit ? 'Update Announcement' : 'Create Announcement'}
          </button>
        </div>
      </form>

      <ImageUploadModal
        isOpen={showImageModal}
        onClose={() => setShowImageModal(false)}
        onImageSaved={handleImageUpload}
        currentImage={formData.image_url}
      />
    </div>
  );
};

export default AnnouncementForm;
