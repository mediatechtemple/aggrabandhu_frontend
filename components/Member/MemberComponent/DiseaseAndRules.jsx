import React from 'react';
import { Button, Checkbox, FormControlLabel } from '@mui/material';

const DiseaseAndRules = ({
  formData,
  handleDiseaseChange,
  handleDiseaseFileChange,
  handleRulesChange
}) => (
  <>
    <FormControlLabel
      control={<Checkbox checked={formData.disease} onChange={handleDiseaseChange} />}
      label="Suffering from any disease"
    />
    {formData.disease && (
      <Button variant="contained" component="label" fullWidth>
        Attach Doctor’s Certificate
        <input type="file" hidden onChange={handleDiseaseFileChange} />
      </Button>
    )}
    <FormControlLabel
      control={<Checkbox checked={formData.rulesAccepted} onChange={handleRulesChange} />}
      label="Accept Rules & Regulations"
    />
  </>
);

export default DiseaseAndRules;
