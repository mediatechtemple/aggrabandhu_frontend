// AddDistrictModal.jsx
import React from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const AddDistrictModal = ({ open, onClose, selectedState, currentDistrict, setCurrentDistrict, handleAddDistrict }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', mt: 4, width: 300 }}>
        <Typography variant="h6">Add District for {selectedState}</Typography>
        <TextField
          label="District Name"
          value={currentDistrict}
          onChange={(e) => setCurrentDistrict(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddDistrict} fullWidth>Add District</Button>
      </Box>
    </Modal>
  );
};

export default AddDistrictModal;
