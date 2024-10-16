import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const NomineeComponent = () => {
  const [nominees, setNominees] = useState([
    { name: '', relationship: '', phone: '' },
  ]); // Initial form with one nominee

  // Function to handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedNominees = [...nominees];
    updatedNominees[index][field] = value;
    setNominees(updatedNominees);
  };

  // Function to add a new nominee form
  const handleAddNominee = () => {
    if (nominees.length < 4) {
      setNominees([...nominees, { name: '', relationship: '', phone: '' }]);
    }
  };

  // Function to remove a nominee
  const handleRemoveNominee = (index) => {
    const updatedNominees = nominees.filter((_, i) => i !== index);
    setNominees(updatedNominees);
  };

  return (
    <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h5" gutterBottom color="primary">
        Nominee Details
      </Typography>
      {nominees.map((nominee, index) => (
        <Box key={index} sx={{ marginBottom: '16px' }}>
          <TextField
            label={`Nominee Name ${index + 1}`}
            variant="outlined"
            fullWidth
            value={nominee.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            sx={{ marginBottom: '8px' }}
          />
          <TextField
            label="Relationship"
            variant="outlined"
            fullWidth
            value={nominee.relationship}
            onChange={(e) =>
              handleInputChange(index, 'relationship', e.target.value)
            }
            sx={{ marginBottom: '8px' }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={nominee.phone}
            onChange={(e) =>
              handleInputChange(index, 'phone', e.target.value)
            }
            sx={{ marginBottom: '8px' }}
          />
          {nominees.length > 1 && (
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleRemoveNominee(index)}
              sx={{ marginBottom: '8px' }}
            >
              Remove
            </Button>
          )}
        </Box>
      ))}
      {nominees.length < 4 && (
        <Button variant="contained" onClick={handleAddNominee}>
          + Add Nominee
        </Button>
      )}
    </Box>
  );
};

export default NomineeComponent;
