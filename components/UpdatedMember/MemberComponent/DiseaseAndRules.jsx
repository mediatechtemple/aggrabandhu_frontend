import React from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';

const DiseaseAndRules = ({
  formData,
  handleChange,
  handleFileChange,
  
}) => (
  <>
    <FormControlLabel
      control={<Checkbox 
        checked={formData.disease} 
        onChange={handleChange} 
        name="disease"
        />
      }
      label="Suffering from any disease"
    />
    {formData.disease && (
      <Button variant="contained" component="label" fullWidth>
        Attach Doctor’s Certificate
        <input type="file" 
        hidden
        onChange={handleFileChange}
        name="diseaseFile"
          />
      </Button>
    )}
    <FormControlLabel
      control={<Checkbox 
        checked={formData.rulesAccepted} 
        onChange={handleChange} 
        name="rulesAccepted"
        />}
      label="Accept Rules & Regulations"
    />
  </>
);

export default DiseaseAndRules;
