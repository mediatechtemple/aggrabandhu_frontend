'use client'
import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ page, pageSize, totalPages, onPageChange, onPageSizeChange,fetchMembers }) => {
  const[pageNo,setPageNo]=useState('');
  const [pageSize1, setPageSize1] = useState(100);

  const handleChange = (event) => {
    const value = event.target.value;
      
    setPageSize1(value);
    fetchMembers(value)
    // handlePageSizeChange(value);
  };
  
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
  <FormControl variant="outlined" sx={{ minWidth: 120 }}>
    <InputLabel id="page-size-label">Get Members</InputLabel>
    <Select
      labelId="page-size-label"
      value={pageSize1}
      onChange={handleChange}
      label="Page Size"
      MenuProps={{
        anchorOrigin: {
          vertical: "top",
          horizontal: "left", // Dropdown opens from the top
        },
        transformOrigin: {
          vertical: "bottom",
          horizontal: "left", // Aligning dropdown to start from the bottom
        },
        disablePortal: true, // Prevent dropdown from rendering outside the container
      }}
    >
      <MenuItem value={100}>100</MenuItem>
      <MenuItem value={200}>200</MenuItem>
      <MenuItem value={500}>500</MenuItem>
      <MenuItem value={1000}>1000</MenuItem>
      <MenuItem value="all">All</MenuItem>
    </Select>
  </FormControl>
</Box>















      
    </Box>
  );
};

export default Pagination;
