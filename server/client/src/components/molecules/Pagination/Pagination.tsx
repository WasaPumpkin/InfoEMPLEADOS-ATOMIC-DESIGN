// src/components/molecules/Pagination/Pagination.tsx
import React from 'react';
import Button from '../../atoms/Button/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        ariaLabel="Go to previous page"
      >
        Previous
      </Button>

      {/* Current Page Info */}
      <span>
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        ariaLabel="Go to next page"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;