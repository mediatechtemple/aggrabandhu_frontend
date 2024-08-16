import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const StateFilter = ({ states, selectedState, onSelectState }) => {
  const handleStateChange = (event) => {
    onSelectState(event.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
      <FormControl variant="outlined" style={{ minWidth: '150px' }}>
        <InputLabel >Select State</InputLabel>
        <Select
          style={{ height: '40px' }}
          value={selectedState}
          onChange={handleStateChange}
          label="Select State"
        >
          <MenuItem value=""><em>All States</em></MenuItem>
          {states.map((state) => (
            <MenuItem key={state} value={state}>
              {state}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default StateFilter;
