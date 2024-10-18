import React from 'react';
import { TextField } from '@mui/material';

const DateRangePicker = ({formData,handleInputChange}) => {
  return (
    <div>
      <TextField
        margin="dense"
        label="Start Date"
        type="date"
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        name='start_date'
        value={formData.startDate}
        onChange={handleInputChange}
      />
      <TextField
        margin="dense"
        label="End Date"
        type="date"
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        name='end_date'
        value={formData.endDateDate}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default DateRangePicker;
