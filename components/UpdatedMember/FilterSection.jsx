// components/FilterSection.jsx
import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, TextField, Typography } from '@mui/material';
import Iconsss from '../Icons/Iconsss';

const FilterSection = ({filters, handleFilterChange }) => {
  return (
    <Box m={2}>
      <Box display='flex' justifyContent='space-between'>
      <Iconsss tableId="my-tablee"/>
        <Box display="flex">
          <FormControl sx={{ marginRight: 2, minWidth: 150 }}>
            <InputLabel>District</InputLabel>
            <Select
              style={{ height: '40px' }}
              name="district"
              value={filters.district}
              onChange={handleFilterChange}
              placeholder="Search with district"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"District1"}>District1</MenuItem>
              <MenuItem value={"District2"}>District2</MenuItem>
              <MenuItem value={"District3"}>District3</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel style={{ height: '40px' }}>State</InputLabel>
            <Select
              style={{ height: '40px' }}
              name="state"
              value={filters.state}
              onChange={handleFilterChange}
              placeholder="Search with state"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"State1"}>State1</MenuItem>
              <MenuItem value={"State2"}>State2</MenuItem>
              <MenuItem value={"State3"}>State3</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder='Search with name'
            sx={{
              marginLeft: 2,
              '& .MuiInputBase-input': {
                padding: '5px', // Adjust padding here
              },
            }}
          />
        </Box>
      </Box>

      <Box display='flex' justifyContent='flex-end' alignItems='center' sx={{ marginTop: 1 }}>
        <Box display='flex' justifyContent='flex-end' alignItems='center'>
          <Typography variant="body1" sx={{ marginRight: '10px' }}>Date Range:</Typography>
          <TextField
            type='date'
            value={filters.startDate}
            onChange={handleFilterChange}
            sx={{
              '& .MuiInputBase-input': {
                padding: '5px', // Adjust padding here
              },
            }}
          />
          <Typography variant="body1" sx={{ margin: '10px' }}>to</Typography>
          <TextField
            type='date'
            value={filters.endDate}
            onChange={handleFilterChange}
            sx={{
              '& .MuiInputBase-input': {
                padding: '5px', // Adjust padding here
              },
            }}
          />
        </Box>
        <Box>
          <TextField
            name="refrenceId"
            value={filters.refrenceId}
            onChange={handleFilterChange}
            placeholder='Search with refrenceId'
            sx={{
              marginLeft: 2,
              '& .MuiInputBase-input': {
                padding: '5px', // Adjust padding here
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FilterSection;
