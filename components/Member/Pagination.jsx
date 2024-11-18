'use client'
import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ page, pageSize, totalPages, onPageChange, onPageSizeChange }) => {
  const[pageNo,setPageNo]=useState('');
  
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  const handlePageSizeChange = (value) => {
    onPageSizeChange(value);
  };

  const handlePageNo=(data)=>{
    onPageChange(data);
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
      <Box display="flex" alignItems="center">
        <MuiPagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
        
        <input
          placeholder="Enter page no"
          value={pageNo}
          onChange={(e) => setPageNo(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => handlePageNo(pageNo)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Go
        </button>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageSizeChange(100)}
          sx={{ mr: 2 }}
        >
          100
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePageSizeChange('all')}
        >
          All
        </Button>
      </Box>
    </Box>
  );
};

export default Pagination;
