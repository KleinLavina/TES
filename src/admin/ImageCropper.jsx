import { useState, useCallback, useRef } from 'react';
import './ImageCropper.css';

/**
 * ImageCropper - Crop images to 3:2 aspect ratio
 * Lightweight implementation without external dependencies
 * For production, consider using react-easy-crop or similar
 */
const ImageCropper = ({ image, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const ASPECT_RATIO = 3 / 2; // 3:2 landscape

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - crop.x,
      y: e.clientY - crop.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;

    setCrop({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomChange = (e) => {
    setZoom(parseFloat(e.target.value));
  };

  const getCroppedImage = useCallback(() => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Target dimensions (3:2 ratio)
        const targetWidth = 1200;
        const targetHeight = 800;

        canvas.width = targetWidth;
        canvas.height = targetHeight;

        // Calculate crop area
        const container = containerRef.current;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const cropWidth = containerRect.width;
        const cropHeight = containerRect.width / ASPECT_RATIO;

        // Calculate scale
        const scaleX = img.width / (containerRect.width / zoom);
        const scaleY = img.height / (containerRect.height / zoom);

        // Calculate crop position
        const cropX = (-crop.x * scaleX) / zoom;
        const cropY = (-crop.y * scaleY) / zoom;
        const cropW = cropWidth * scaleX / zoom;
        const cropH = cropHeight * scaleY / zoom;

        // Draw cropped image
        ctx.drawImage(
          img,
          cropX, cropY, cropW, cropH,
          0, 0, targetWidth, targetHeight
        );

        // Convert to blob
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
        }, 'image/jpeg', 0.9);
      };

      img.src = image;
    });
  }, [image, crop, zoom]);

  const handleSave = async () => {
    const croppedImage = await getCroppedImage();
    onCropComplete(croppedImage);
  };

  return (
    <div className="image-cropper">
      <div className="image-cropper__header">
        <h3 className="image-cropper__title">Crop Image (3:2 Ratio)</h3>
        <p className="image-cropper__subtitle">
          Drag to reposition • Use slider to zoom • Image will be cropped to 1200x800px
        </p>
      </div>

      <div
        ref={containerRef}
        className="image-cropper__container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <img
          ref={imageRef}
          src={image}
          alt="Crop preview"
          className="image-cropper__image"
          style={{
            transform: `translate(${crop.x}px, ${crop.y}px) scale(${zoom})`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          draggable={false}
        />
        <div className="image-cropper__overlay">
          <div className="image-cropper__crop-area" />
        </div>
      </div>

      <div className="image-cropper__controls">
        <div className="image-cropper__zoom">
          <label htmlFor="zoom" className="image-cropper__zoom-label">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            Zoom
          </label>
          <input
            type="range"
            id="zoom"
            min="1"
            max="3"
            step="0.1"
            value={zoom}
            onChange={handleZoomChange}
            className="image-cropper__zoom-slider"
          />
          <span className="image-cropper__zoom-value">{zoom.toFixed(1)}x</span>
        </div>
      </div>

      <div className="image-cropper__actions">
        <button
          type="button"
          className="image-cropper__button cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="button"
          className="image-cropper__button save"
          onClick={handleSave}
        >
          Crop & Save
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
