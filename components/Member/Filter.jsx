import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

const Filter = ({ filters, onFilterChange }) => {
  const handleRoleChange = (event) => {
    onFilterChange({ ...filters, role: event.target.value });
  };

  const handleActiveChange = (event) => {
    onFilterChange({ ...filters, isActive: event.target.checked });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'  }}>
      <FormControl variant="outlined" style={{ minWidth: '120px' }}>
        <InputLabel>Role</InputLabel>
        <Select 
        style={{ height: '40px' }}
        value={filters.role} onChange={handleRoleChange} label="Role">
          <MenuItem value=""><em>All Roles</em></MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="member">Member</MenuItem>
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Checkbox
            checked={filters.isActive}
            onChange={handleActiveChange}
          />
        }
        label="Active Members Only"
        // style={{ height: '30px' }}
      />
    </div>
  );
};

export default Filter;
