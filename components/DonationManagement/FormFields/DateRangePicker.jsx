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
        value={formData.start_date}
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
        value={formData.end_date}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default DateRangePicker;
