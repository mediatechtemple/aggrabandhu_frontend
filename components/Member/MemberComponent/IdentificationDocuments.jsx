import React from 'react';
import { TextField, Button } from '@mui/material';

const IdentificationDocuments = ({ formData, handleAadharFileChange, handleVoterIdFileChange,handleChange }) => (
  <>
    <TextField
      label="Aadhar Card No"
      name="adharCard"
      value={formData.adharCard}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />

    <Button variant="contained" component="label" fullWidth>
      Attach Aadhar Card
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        hidden
        onChange={handleAadharFileChange}
      />
    </Button>

    {/* this would become inptu brother very simple here i would say */}

    <TextField
      label="Voter ID / Driving License / Pan Card No"
      name="voterId"
      value={formData.voterId}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />

    <Button variant="contained" component="label" fullWidth>
      Attach Voter ID/Driving License/Pan Card
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        hidden
        onChange={handleVoterIdFileChange}
      />
    </Button>
  </>
);

export default IdentificationDocuments;
