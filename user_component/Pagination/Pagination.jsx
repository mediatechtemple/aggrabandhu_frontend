// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange ,handleItemPerChange,membersLength}) => {



  const getPaginationGroup = () => {
    const delta = 2;
    const range = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) range.unshift("...");
    if (currentPage + delta < totalPages - 1) range.push("...");

    return [1, ...range, totalPages];
  };



  
  return (
    <div className="flex justify-between">
      <nav aria-label="Page navigation example" className="mt-4">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded-l-lg text-gray-500 hover:bg-gray-100 disabled:text-gray-300"
          >
            Previous
          </button>
        </li>




        {getPaginationGroup().map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 py-1 text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-1 border ${
                  currentPage === page
                    ? "bg-blue-50 text-blue-600 border-blue-300"
                    : "text-gray-500 hover:bg-gray-100 border-gray-300"
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}





        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-r-lg text-gray-500 hover:bg-gray-100 disabled:text-gray-300"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>

    <nav className="flex space-x-2 list-none mt-4">
  {/* Previous Button */}
  <li>
    <button
      onClick={() => handleItemPerChange(100)}
      className="px-3 py-1 border border-gray-300 rounded-l-lg text-gray-500 hover:bg-gray-100 disabled:text-gray-300"
    >
      100
    </button>
  </li>

  {/* Next Button */}
  <li>
    <button
      onClick={() => handleItemPerChange(membersLength)}
      className="px-3 py-1 border border-gray-300 rounded-r-lg text-gray-500 hover:bg-gray-100 disabled:text-gray-300"
    >
      All
    </button>
  </li>
    </nav>

    </div>
    
  );
};

export default Pagination;
