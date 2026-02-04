import { useEffect, useState } from 'react';
import './ConfirmModal.css';

/**
 * ConfirmModal - Reusable confirmation dialog
 * Replaces JavaScript confirm() with a styled modal
 */
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleConfirm = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onConfirm();
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className={`confirm-modal__backdrop ${isAnimating ? 'confirm-modal__backdrop--entering' : 'confirm-modal__backdrop--exiting'}`}
        onClick={handleClose}
      ></div>
      <div className={`confirm-modal ${isAnimating ? 'confirm-modal--entering' : 'confirm-modal--exiting'}`}>
        <div className="confirm-modal__content">
          <div className={`confirm-modal__icon confirm-modal__icon--${type}`}>
            {type === 'danger' && <span className="material-icons">warning</span>}
            {type === 'warning' && <span className="material-icons">error_outline</span>}
            {type === 'info' && <span className="material-icons">info</span>}
          </div>
          
          <h2 className="confirm-modal__title">{title}</h2>
          <p className="confirm-modal__message">{message}</p>
          
          <div className="confirm-modal__actions">
            <button 
              className="confirm-modal__button confirm-modal__button--cancel"
              onClick={handleClose}
            >
              {cancelText}
            </button>
            <button 
              className={`confirm-modal__button confirm-modal__button--confirm confirm-modal__button--${type}`}
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
