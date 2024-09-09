import React, { useState } from 'react';
import { Button, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const DiseaseAndRules = ({
  formData,
  handleDiseaseChange,
  handleDiseaseFileChange,
  handleRulesChange,
}) => {
  const [open, setOpen] = useState(false);  // Popup state

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // This function handles the checkbox click event
  const handleRulesClick = () => {
    if (!formData.rulesAccepted) {
      handleClickOpen();  // Open the popup if rules are not accepted yet
    } else {
      handleRulesChange({ target: { checked: false } });  // Uncheck if already checked
    }
  };

  const handleAcceptRules = () => {
    handleRulesChange({ target: { checked: true } });  // Automatically check the checkbox
    setOpen(false);  // Close the popup
  };

  return (
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
        control={
          <Checkbox
            checked={formData.rulesAccepted}
            onClick={handleRulesClick} // Handle the checkbox click
          />
        }
        label="Accept Rules & Regulations"
      />

      {/* Popup for Rules & Regulations */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Rules & Regulations</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* You can put your rules and regulations text here */}
            1. Rule 1: Be respectful to others. <br />
            2. Rule 2: Follow the instructions carefully. <br />
            3. Rule 3: All participants must adhere to the schedule.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleAcceptRules} color="primary">
            Accept Rules
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DiseaseAndRules;
