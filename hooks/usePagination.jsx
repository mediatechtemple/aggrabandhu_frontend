import { useState } from 'react';

const usePagination = (rows, initialRowsPerPage = 100) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  // Calculate the total number of pages
  const totalPages = Math.ceil(rows.length / rowsPerPage);

  // Get the rows for the current page
  const currentRows = rows.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    if (newPageSize === 'all') {
      setRowsPerPage(rows.length);
    } else {
      setRowsPerPage(newPageSize);
    }
    setPage(1); // Reset to the first page
  };

  return {
    page,
    rowsPerPage,
    totalPages,
    currentRows,
    handlePageChange,
    handlePageSizeChange,
  };
};

export default usePagination;
