import React from 'react';
import { TextField, Typography } from '@mui/material';

const NomineeDetails = ({ formData, handleChange }) => (
  <>
    <Typography variant="subtitle1" sx={{ mt: 2 }}>Nominee Details</Typography>
    <TextField
      label="Nominee 1 Name"
      name="nominee"
      value={formData.nominee}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      label="Nominee 1 Relationship"
      name="relationship"
      value={formData.relationship}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      label="Nominee 2 Name"
      name="nominee2"
      value={formData.nominee2}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />
    <TextField
      label="Nominee 2 Relationship"
      name="relationship2"
      value={formData.relationship2}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />
  </>
);

export default NomineeDetails;
