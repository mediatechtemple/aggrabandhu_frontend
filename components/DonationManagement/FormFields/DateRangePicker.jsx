import React from 'react';
import { TextField } from '@mui/material';

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <div>
      <TextField
        margin="dense"
        label="Start Date"
        type="date"
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <TextField
        margin="dense"
        label="End Date"
        type="date"
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
    </div>
  );
};

export default DateRangePicker;
