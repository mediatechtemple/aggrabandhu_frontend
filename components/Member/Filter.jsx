import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';

const Filter = ({ filters, onFilterChange }) => {
  // const handleRoleChange = (event) => {
  //   onFilterChange({ ...filters, role: event.target.value });
  // };
  const handleRoleChange = (event) => {
    onFilterChange({ ...filters, blood_group: event.target.value });
  };

  const handleActiveChange = (event) => {
    onFilterChange({ ...filters, isActive: event.target.checked });
  };

  return (
    <div style={{ display: 'flex'  }}>
      {/* <FormControl variant="outlined" style={{ minWidth: '120px' }}>
        <InputLabel>Role</InputLabel>
        <Select 
        style={{ height: '40px' }}
        value={filters.role} onChange={handleRoleChange} label="Role">
          <MenuItem value=""><em>All Roles</em></MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="member">Member</MenuItem>
        </Select>
      </FormControl> */}


      {/* <FormControl variant="outlined" style={{ minWidth: '120px' }}>
        <InputLabel>Blood Group</InputLabel>
        <Select 
        style={{ height: '40px' }}
        value={filters.blood_group} onChange={handleRoleChange} label="Blood_group">
          <MenuItem value=""><em>All Roles</em></MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="member">Member</MenuItem>
        </Select>
      </FormControl> */}


      <FormControl variant="outlined" style={{ minWidth: '140px' }}>
      <InputLabel>Blood Group</InputLabel>
      <Select
        style={{ height: '40px' }}
        value={filters.blood_group}
        onChange={handleRoleChange}
        label="Blood_group"
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 200, // Maximum height for the dropdown
              overflowY: 'auto', // Enable vertical scrolling
            },
          },
        }}
      >
        <MenuItem value="">
          <em>All Blood Groups</em>
        </MenuItem>
        <MenuItem value="A+">A+</MenuItem>
        <MenuItem value="A-">A-</MenuItem>
        <MenuItem value="B+">B+</MenuItem>
        <MenuItem value="B-">B-</MenuItem>
        <MenuItem value="AB+">AB+</MenuItem>
        <MenuItem value="AB-">AB-</MenuItem>
        <MenuItem value="O+">O+</MenuItem>
        <MenuItem value="O-">O-</MenuItem>
      </Select>
    </FormControl>





      <FormControlLabel
        control={
          <Checkbox
            checked={filters.isActive}
            onChange={handleActiveChange}
          />
        }
        label="Active_Donars"
      />
    </div>
  );
};

export default Filter;
