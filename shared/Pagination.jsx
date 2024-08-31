import React from 'react';
import { Box, Button, Select, MenuItem, FormControl, InputLabel, Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ page, pageSize, totalPages, onPageChange, onPageSizeChange }) => {

  
  const handlePageChange = (event, value) => {
    onPageChange(value);
  };

  const handlePageSizeChange = (value) => {
    onPageSizeChange(value);
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
