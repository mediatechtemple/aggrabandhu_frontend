import React from 'react';
import { TextField, Typography } from '@mui/material';

const NomineeDetails = ({ formData, handleNomineeChange }) => (
  <>
    <Typography variant="subtitle1" sx={{ mt: 2 }}>Nominee Details</Typography>
    <TextField
      label="Nominee 1 Name"
      value={formData.nominee1.name}
      onChange={(e) => handleNomineeChange(0, 'name', e.target.value)}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Nominee 1 Relationship"
      value={formData.nominee1.relationship}
      onChange={(e) => handleNomineeChange(0, 'relationship', e.target.value)}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Nominee 2 Name"
      value={formData.nominee2.name}
      onChange={(e) => handleNomineeChange(1, 'name', e.target.value)}
      fullWidth
      margin="normal"
    />
    <TextField
      label="Nominee 2 Relationship"
      value={formData.nominee2.relationship}
      onChange={(e) => handleNomineeChange(1, 'relationship', e.target.value)}
      fullWidth
      margin="normal"
    />
  </>
);

export default NomineeDetails;
