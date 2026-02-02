import './FeaturedImagePreview.css';

/**
 * FeaturedImagePreview - Mini preview of current featured image
 * Shows in edit mode with "Replace Image" button
 */
const FeaturedImagePreview = ({ imageUrl, onReplace, onRemove }) => {
  if (!imageUrl) {
    return (
      <div className="featured-image-preview featured-image-preview--empty">
        <div className="featured-image-preview__empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <p>No image selected</p>
          <button
            type="button"
            className="featured-image-preview__button"
            onClick={onReplace}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Upload Image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-image-preview">
      <div className="featured-image-preview__image-container">
        <img 
          src={imageUrl} 
          alt="Featured" 
          className="featured-image-preview__image"
        />
        <div className="featured-image-preview__badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          3:2 Ratio • 1200x800px
        </div>
      </div>
      <div className="featured-image-preview__actions">
        <button
          type="button"
          className="featured-image-preview__button replace"
          onClick={onReplace}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 4 23 10 17 10"></polyline>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
          </svg>
          Replace Image
        </button>
        <button
          type="button"
          className="featured-image-preview__button remove"
          onClick={onRemove}
          title="Remove image"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FeaturedImagePreview;
