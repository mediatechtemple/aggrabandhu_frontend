import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Image from 'next/image';

const ReceivingMethodSelect = ({ receivingMethods, handleReceivingMethodsChange,formData,handleInputChange,handleImageChange,preview  }) => {
  return (
    <>
    <FormControl fullWidth variant="outlined" margin="dense">
      <InputLabel>Receiving Method</InputLabel>
      <Select
        multiple
        value={receivingMethods}
        onChange={handleReceivingMethodsChange}
        renderValue={(selected) => selected.join(', ')}
        label="Receiving Method"
      >
        <MenuItem value="bank_detail">bank_detail</MenuItem>
        <MenuItem value="upi_id">upi_id</MenuItem>
        <MenuItem value="upi_number">upi_number</MenuItem>
        <MenuItem value="qrcode">Qr Code</MenuItem>
      </Select>
    </FormControl>
    {receivingMethods.includes('bank_detail') && (
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '16px',
                marginTop: '16px',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '8px',
                  marginBottom: '8px',
                  color:'#1976d2'
                }}
              >
                Bank Details
              </Typography>







              <TextField
                margin="dense"
                label="Bank Name"
                fullWidth
                variant="outlined"
                name='bank_name'
                value={formData.bank_name}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label="Account Number"
                fullWidth
                variant="outlined"
                name='account_number'
                value={formData.account_number}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                label="IFSC Code"
                fullWidth
                variant="outlined"
                name='ifsc_code'
                value={formData.ifsc_code}
                onChange={handleInputChange}
              />
            </Box>
          )}













          {receivingMethods.includes('upi_id') && (
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '16px',
                marginTop: '16px',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '8px',
                  marginBottom: '8px',
                  color:'#1976d2'
                }}
              >
                UPI ID Details
              </Typography>
              <TextField
                margin="dense"
                label="UPI ID"
                fullWidth
                variant="outlined"
                name='upi_id'
                value={formData.upi_id}
                onChange={handleInputChange}
              />
            </Box>
          )}










          {receivingMethods.includes('upi_number') && (
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '16px',
                marginTop: '16px',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '8px',
                  marginBottom: '8px',
                  color:'#1976d2'
                }}
              >
                UPI Number Details
              </Typography>
              <TextField
                margin="dense"
                label="UPI Name"
                fullWidth
                variant="outlined"
                name='upi_name'
                value={formData.upi_name}
                onChange={handleInputChange}
                
              />
              <TextField
                margin="dense"
                label="UPI Number"
                fullWidth
                variant="outlined"
                name='upi_number'
                value={formData.upi_number}
                onChange={handleInputChange}
              />
            </Box>
          )}










          {receivingMethods.includes('qrcode') && (
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '16px',
                marginTop: '16px',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '8px',
                  marginBottom: '8px',
                  color:'#1976d2'
                }}
              >
                QR Code Details
              </Typography>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                margin="dense"
              >
                Upload QR Code
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  name='qrcode'
                  onChange={handleImageChange}
                />
              </Button>
                

              {formData.qrcode && (
                <div>
                  <p className='text-blue-500' >Selected Image: {formData.qrcode.name}</p>
                <div style={{   position: 'relative', marginTop:'0px',marginLeft:'0px', width: '30%',height:'100px' }}>
                  <Image
                    src={preview.qrcode}   // This should be the preview URL of the uploaded image
                    alt="Selected"
                    layout="fill"    // Use the fill layout to fill the parent container 
                    // objectFit="contain"  // Ensure the image fits inside the container without being cut off
                    objectFit="contain"   // Ensure the image fits inside the container without being cut off
                    objectPosition="top"  // Align the image to the top of the container
                  />
                </div>
                </div>
      )}









            </Box>
          )}
    </>
  );
};

export default ReceivingMethodSelect;
