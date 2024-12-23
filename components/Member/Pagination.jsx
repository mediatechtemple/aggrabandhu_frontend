'use client'
import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ page,totalPages,fetchMembers }) => {
  const[pageNo,setPageNo]=useState('');
  const [pageSize1, setPageSize1] = useState(100);

  const handleChange = (event) => {
    const value = event.target.value;
      
    setPageSize1(value);
    fetchMembers(value);
  };
  
  const handlePageChange = (event, value) => {
    fetchMembers(pageSize1,value);
    // onPageChange(value);
  };

  

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
          className="border border-gray-300 px-4 w-32 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={() => fetchMembers(pageSize1,pageNo)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all"
        >
          Go
        </button>
      </Box>





      <Box display="flex" alignItems="center">
  <FormControl variant="outlined" >
    {/* <InputLabel id="page-size-label">Get Members</InputLabel> */}
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
      sx={{
        "& .MuiSelect-select": {
          backgroundColor: "#3B82F6", // Dropdown button background color
          color: "white", // Text color in the dropdown button
          height: "16px", // Reduce the height of the dropdown button
          display: "flex",
          alignItems: "center",
          width:'25px',
          padding:'6px',
          margin:'0px'
        },
        "& .MuiMenuItem-root": {
          minHeight: "32px", // Reduce the height of each menu item
        },
      }}
    >
      <MenuItem value={100}>100</MenuItem>
      <MenuItem value={200}>200</MenuItem>
      <MenuItem value={500}>500</MenuItem>
      <MenuItem value={1000}>1000</MenuItem>
      <MenuItem value={'ALL'}>All</MenuItem>
    </Select>
  </FormControl>
</Box>















      
    </Box>
  );
};

export default Pagination;
