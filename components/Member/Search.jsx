import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  let debounceTimeout;

  const handleInputChange = (event) => {
    clearTimeout(debounceTimeout);
    const value = event.target.value;
    setQuery(value);

    debounceTimeout = setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  return (
    <Box display="flex" justifyContent="flex-end" width="100%" style={{ marginBottom: '5px' }}>
      <TextField
        label="Search members..."
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        size="small" // Adjust size to small
        style={{ height: '30px'}} // Adjust height as needed
        InputProps={{ style: { padding: '0px' } }} // Adjust padding inside the input
      />
    </Box>
  );
};

export default Search;
