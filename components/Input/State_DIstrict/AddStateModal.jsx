// AddStateModal.jsx
import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const AddStateModal = ({ open, onClose, currentState, stateCode, setCurrentState, setStateCode, handleAddState }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', mt: 4, width: 300 }}>
        <Typography variant="h6">Add State</Typography>
        <TextField
          label="State Name"
          value={currentState}
          onChange={(e) => setCurrentState(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="State Code"
          value={stateCode}
          onChange={(e) => setStateCode(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddState} fullWidth>Add State</Button>
      </Box>
    </Modal>
  );
};

export default AddStateModal;
