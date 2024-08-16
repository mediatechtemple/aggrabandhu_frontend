import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const DistrictFilter = ({ districts, selectedDistrict, onSelectDistrict }) => {
  const handleDistrictChange = (event) => {
    onSelectDistrict(event.target.value);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', marginLeft:'2px', marginRight:'2px' }}>
      <FormControl variant="outlined" style={{ minWidth: '150px' }}>
        <InputLabel>Select District</InputLabel>
        <Select
          style={{ height: '40px' }}
          value={selectedDistrict}
          onChange={handleDistrictChange}
          label="Select District"
        >
          <MenuItem value=""><em>All Districts</em></MenuItem>
          {districts.map((district) => (
            <MenuItem key={district} value={district}>
              {district}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default DistrictFilter;
