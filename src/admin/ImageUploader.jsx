import { useState, useRef } from 'react';
import ImageCropper from './ImageCropper';
import './ImageUploader.css';

/**
 * ImageUploader - Handle image upload with preview and cropping
 * Enforces 3:2 aspect ratio through cropping interface
 */
const ImageUploader = ({ currentImage, onImageUpload, error }) => {
  const [imageUrl, setImageUrl] = useState(currentImage || '');
  const [previewUrl, setPreviewUrl] = useState(currentImage || '');
  const [tempImage, setTempImage] = useState(''); // Image before cropping
  const [showCropper, setShowCropper] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef(null);

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setUploadError('');
  };

  const handleUrlSubmit = () => {
    if (!imageUrl.trim()) {
      setUploadError('Please enter an image URL');
      return;
    }

    setIsLoading(true);
    setUploadError('');

    // Validate image URL by loading it
    const img = new Image();
    img.onload = () => {
      setTempImage(imageUrl);
      setShowCropper(true);
      setIsLoading(false);
    };
    img.onerror = () => {
      setUploadError('Invalid image URL or image failed to load');
      setIsLoading(false);
    };
    img.src = imageUrl;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size must be less than 5MB');
      return;
    }

    setIsLoading(true);
    setUploadError('');

    // Create preview using FileReader
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setTempImage(dataUrl);
      setShowCropper(true);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage) => {
    setPreviewUrl(croppedImage);
    setImageUrl(croppedImage);
    onImageUpload(croppedImage);
    setShowCropper(false);
    setTempImage('');
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setTempImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    setImageUrl('');
    setPreviewUrl('');
    onImageUpload('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (showCropper) {
    return (
      <ImageCropper
        image={tempImage}
        onCropComplete={handleCropComplete}
        onCancel={handleCropCancel}
      />
    );
  }

  return (
    <div className="image-uploader">
      {previewUrl ? (
        <div className="image-uploader__preview">
          <img 
            src={previewUrl} 
            alt="Preview" 
            className="image-uploader__preview-image"
          />
          <div className="image-uploader__preview-info">
            <span className="image-uploader__preview-badge">3:2 Ratio • 1200x800px</span>
          </div>
          <button
            type="button"
            className="image-uploader__remove"
            onClick={handleRemove}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      ) : (
        <div className="image-uploader__dropzone">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          <p className="image-uploader__text">Upload an image (will be cropped to 3:2 ratio)</p>
        </div>
      )}

      <div className="image-uploader__controls">
        <div className="image-uploader__url-input">
          <input
            type="text"
            className="image-uploader__input"
            value={imageUrl}
            onChange={handleUrlChange}
            placeholder="https://example.com/image.jpg or paste image URL"
          />
          <button
            type="button"
            className="image-uploader__url-btn"
            onClick={handleUrlSubmit}
            disabled={isLoading || !imageUrl.trim()}
          >
            {isLoading ? 'Loading...' : 'Load & Crop'}
          </button>
        </div>

        <div className="image-uploader__divider">
          <span>OR</span>
        </div>

        <div className="image-uploader__file-input">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="image-uploader__file-hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="image-uploader__file-label">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            Choose File & Crop
          </label>
        </div>
      </div>

      {(uploadError || error) && (
        <div className="image-uploader__error">
          {uploadError || error}
        </div>
      )}

      <div className="image-uploader__hint">
        <strong>Required:</strong> 3:2 aspect ratio (1200x800px) • Formats: JPG, PNG, WebP • Max: 5MB
      </div>
    </div>
  );
};

export default ImageUploader;
