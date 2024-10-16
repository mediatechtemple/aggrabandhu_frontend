import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';
import ImageUpload from './FormFields/ImageUpload';
import ActiveDeactiveCheckbox from './FormFields/ActiveDeactiveCheckbox';
import NomineeComponent from './FormFields/NomineeComponent';
import ReceivingMethodSelect from './FormFields/ReceivingMethodSelect';
import DateRangePicker from './FormFields/DateRangePicker';

const DonationFormDialog = ({
  popupOpen,
  handleClose,
  userId,
  setUserId,
  name,
  setName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  receivingMethods,
  setReceivingMethods,

  bankName,
  setBankName,
  accountNumber,
  setAccountNumber,
  ifscCode,
  setIfscCode,
  upiId,
  setUpiId,
  upiName,
  setUpiName,
  upiNumber,
  setUpiNumber,
  handleFileChange,

  handleSubmit,
  handleSearchDialogOpen,
  formData,
  handleInputChange,
  handleImageChange,
  preview
}) => {
  const handleReceivingMethodsChange = (event) => {
    setReceivingMethods(event.target.value);
  };

  return (
    <Dialog open={popupOpen} onClose={handleClose}
    sx={{
      '& .MuiDialog-paper': {
        height: '450px',   // Customize the height of the dialog
        maxHeight: '450px', // Limit the maximum height of the dialog
      },
    }}
    >
      <DialogTitle 
  color="primary" 
  sx={{
    textAlign: 'center',
    fontSize: '26px', // Corrected font size
    bgcolor:'#17874'
  }}
>
  Donation Receiver Registration Form
</DialogTitle>

      <DialogContent>

        <Box sx={{ mb: 10 }}>

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearchDialogOpen}
            sx={{ mb: 2 }}
          >
            Search Member by ID
          </Button>






          <TextField
            autoFocus
            margin="dense"
            label="User ID"
            fullWidth
            variant="outlined"
            name="userId"  // Name should match the key in formData
            value={formData.userId}
            // onChange={handleInputChange}
            InputProps={{
              readOnly: true,  // This prevents the cursor from appearing and makes the field read-only
            }}
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            name="name"  // Name should match the key in formData
            value={formData.name}
            // onChange={handleInputChange}
            InputProps={{
              readOnly: true,  // This prevents the cursor from appearing and makes the field read-only
            }}
          />
          <TextField
            margin="dense"
            label="Death Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            name="deathDate"  // Name should match the key in formData
            value={formData.deathDate}
            onChange={handleInputChange}
          />







            <ImageUpload
            formData={formData}
            preview={preview}
            handleImageChange={handleImageChange}
            />
            
           <TextField
              margin="dense"
              label="Minimum Amount"
              type="number"
              fullWidth
              variant="outlined"
              // value={minimumAmount}
              // onChange={(e) => setMinimumAmount(e.target.value)}
            />
            
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />

  

          <ReceivingMethodSelect 
          receivingMethods={receivingMethods}  
          handleReceivingMethodsChange={handleReceivingMethodsChange}
          />

          

          
          <NomineeComponent/>
         {false && <ActiveDeactiveCheckbox/>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DonationFormDialog;
