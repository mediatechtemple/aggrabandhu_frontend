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
 
  receivingMethods,
  setReceivingMethods,

  handleSubmit,
  handleSearchDialogOpen,


  formData,
  handleInputChange,
  handleImageChange,
  preview,
  handleReceivingMethodsChange,
  addNominee,
  removeNominee,
  nomineeCount
}) => {
  
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

        <Box sx={{ mb: 2 }}>

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
            label="member_id"
            fullWidth
            variant="outlined"
            name="member_id"  // Name should match the key in formData
            value={formData.member_id}
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
            name="death_date"  // Name should match the key in formData
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
              name="min_amount"  // Name should match the key in formData
              value={formData.min_amount}
              onChange={handleInputChange}
            />
            
          <DateRangePicker
            formData={formData}
            handleInputChange={handleInputChange}
          />

  

          <ReceivingMethodSelect 
          receivingMethods={receivingMethods}  
          handleReceivingMethodsChange={handleReceivingMethodsChange}
          formData={formData}
          handleInputChange ={handleInputChange }
          handleImageChange={handleImageChange}
          preview={preview}
          />

          

       

        <NomineeComponent
            nomineeCount={nomineeCount}
            formData={formData}
            handleInputChange={handleInputChange}
            addNominee={addNominee}
            removeNominee={removeNominee}
          />



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
