import './PaginationDots.css';

/**
 * PaginationDots - SLSU Style (YES●4●SLSU)
 * Visual indicator of current page
 * 
 * Props:
 * - totalPages: Number of total pages
 * - currentPage: Current active page (0-indexed)
 * - onPageChange: Callback when dot is clicked
 */
const PaginationDots = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination-dots">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`pagination-dot ${index === currentPage ? 'pagination-dot--active' : ''}`}
          onClick={() => onPageChange(index)}
          aria-label={`Go to page ${index + 1}`}
          aria-current={index === currentPage ? 'true' : 'false'}
        />
      ))}
    </div>
  );
};

export default PaginationDots;
