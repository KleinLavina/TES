import { useState, useRef } from 'react';
import ImageCropper from './ImageCropper';
import './ImageUploadModal.css';

/**
 * ImageUploadModal - Modal for uploading and cropping images
 * Handles both URL and file upload, then opens cropper
 */
const ImageUploadModal = ({ isOpen, onClose, onImageSaved, currentImage }) => {
  const [step, setStep] = useState('upload'); // 'upload' | 'crop'
  const [tempImage, setTempImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const fileInputRef = useRef(null);

  const handleClose = () => {
    setStep('upload');
    setTempImage('');
    setImageUrl('');
    setError('');
    onClose();
  };

  const handleUrlChange = (e) => {
    setImageUrl(e.target.value);
    setError('');
  };

  const handleUrlSubmit = () => {
    if (!imageUrl.trim()) {
      setError('Please enter an image URL');
      return;
    }

    setIsLoading(true);
    setError('');

    const img = new Image();
    img.onload = () => {
      setTempImage(imageUrl);
      setStep('crop');
      setIsLoading(false);
    };
    img.onerror = () => {
      setError('Invalid image URL or image failed to load');
      setIsLoading(false);
    };
    img.src = imageUrl;
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setIsLoading(true);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      setTempImage(e.target.result);
      setStep('crop');
      setIsLoading(false);
    };
    reader.onerror = () => {
      setError('Failed to read image file');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImage) => {
    onImageSaved(croppedImage);
    handleClose();
  };

  const handleCropCancel = () => {
    setStep('upload');
    setTempImage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="image-upload-modal" onClick={handleClose}>
      <div 
        className="image-upload-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="image-upload-modal__close"
          onClick={handleClose}
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {step === 'upload' ? (
          <div className="image-upload-modal__upload">
            <div className="image-upload-modal__header">
              <h2 className="image-upload-modal__title">
                {currentImage ? 'Replace Featured Image' : 'Upload Featured Image'}
              </h2>
              <p className="image-upload-modal__subtitle">
                Select an image to crop to 3:2 aspect ratio (1200x800px)
              </p>
            </div>

            <div className="image-upload-modal__dropzone">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <p className="image-upload-modal__dropzone-text">
                Choose an image from your computer or enter a URL
              </p>
            </div>

            <div className="image-upload-modal__methods">
              <div className="image-upload-modal__method">
                <label className="image-upload-modal__method-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Upload from Computer
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="image-upload-modal__file-input"
                  id="modal-file-upload"
                />
                <label htmlFor="modal-file-upload" className="image-upload-modal__file-button">
                  Choose File
                </label>
              </div>

              <div className="image-upload-modal__divider">
                <span>OR</span>
              </div>

              <div className="image-upload-modal__method">
                <label className="image-upload-modal__method-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                  Load from URL
                </label>
                <div className="image-upload-modal__url-group">
                  <input
                    type="text"
                    className="image-upload-modal__url-input"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    className="image-upload-modal__url-button"
                    onClick={handleUrlSubmit}
                    disabled={isLoading || !imageUrl.trim()}
                  >
                    {isLoading ? 'Loading...' : 'Load'}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="image-upload-modal__error">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {error}
              </div>
            )}

            <div className="image-upload-modal__hint">
              <strong>Requirements:</strong> JPG, PNG, or WebP • Max 5MB • Will be cropped to 3:2 ratio
            </div>
          </div>
        ) : (
          <ImageCropper
            image={tempImage}
            onCropComplete={handleCropComplete}
            onCancel={handleCropCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ImageUploadModal;
