import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

const DateRangeFilter = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = event => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = event => {
    setEndDate(event.target.value);
  };

  const handleApplyFilter = () => {
   console.log(startDate)
    if (startDate && endDate) {
      onDateRangeChange(new Date(startDate), new Date(endDate));
    } else {
      // Handle invalid input or provide feedback to user
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" sx={{ marginRight: '10px' }}>Date Range:</Typography>
      <TextField
        type="date"
        variant="outlined"
        size="small"
        value={startDate}
        onChange={handleStartDateChange}
        sx={{ marginRight: '10px' }}
      />
      <Typography variant="body1" sx={{ marginRight: '10px' }}>to</Typography>
      <TextField
        type="date"
        variant="outlined"
        size="small"
        value={endDate}
        onChange={handleEndDateChange}
        sx={{ marginRight: '10px' }}
      />
      <Button sx={{backgroundColor:"#1976d2"}} variant="contained" onClick={handleApplyFilter}>Apply</Button>
    </Box>
  );
};

export default DateRangeFilter;
