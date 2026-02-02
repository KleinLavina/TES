import './NavigationArrow.css';

/**
 * NavigationArrow - Carousel navigation
 * 
 * Props:
 * - direction: 'left' | 'right'
 * - onClick: Callback when arrow is clicked
 * - disabled: Boolean to disable arrow
 */
const NavigationArrow = ({ direction, onClick, disabled = false }) => {
  return (
    <button
      className={`carousel-arrow carousel-arrow--${direction}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`Go to ${direction === 'left' ? 'previous' : 'next'} page`}
    >
      {direction === 'left' ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      )}
    </button>
  );
};

export default NavigationArrow;
