import React, { useState } from 'react';

const Pagination1 = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`mx-1 px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          {index + 1}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`mx-1 px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination1;
