import React, { useState } from 'react';
import { TextField, Box, Button } from '@mui/material';

const ReferenceSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <Box display="flex" marginLeft="40px" justifyContent="flex-end" alignItems="center"  style={{ marginBottom: '5px' }}>
      <TextField
        label="Enter Reference ID..."
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        size="small"
        style={{ marginRight: '10px' }}
      />
      
      <Button variant="contained" color="primary" sx={{backgroundColor:"#1976d2"}} onClick={handleSearch}>
        Submit
      </Button>
    </Box>
  );
};

export default ReferenceSearch;
