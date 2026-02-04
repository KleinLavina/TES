import { useState, useRef } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';
import './ImageCropper.css';

/**
 * ImageCropper - Crop images to 3:2 aspect ratio
 * Uses react-advanced-cropper for accurate cropping
 */
const ImageCropper = ({ image, onCropComplete, onCancel }) => {
  const cropperRef = useRef(null);

  const handleCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        canvas.toBlob((blob) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            onCropComplete(reader.result);
          };
          reader.readAsDataURL(blob);
        }, 'image/jpeg', 0.9);
      }
    }
  };

  return (
    <div className="image-cropper">
      <div className="image-cropper__header">
        <h3 className="image-cropper__title">Crop Image (3:2 Ratio)</h3>
        <p className="image-cropper__subtitle">
          Drag to reposition • Pinch or scroll to zoom • Image will be cropped to 1200x800px
        </p>
      </div>

      <div className="image-cropper__container">
        <Cropper
          ref={cropperRef}
          src={image}
          className="image-cropper__cropper"
          stencilProps={{
            aspectRatio: 3 / 2,
          }}
          imageRestriction="stencil"
        />
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
          onClick={handleCrop}
        >
          Crop & Save
        </button>
      </div>
    </div>
  );
};

export default ImageCropper;
