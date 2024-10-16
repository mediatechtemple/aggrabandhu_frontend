import React from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const ReceivingMethodSelect = ({ receivingMethods, handleReceivingMethodsChange }) => {
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
        <MenuItem value="bank">Bank Transfer</MenuItem>
        <MenuItem value="upiId">UPI ID</MenuItem>
        <MenuItem value="upiNumber">UPI Number</MenuItem>
        <MenuItem value="qrCode">QR Code</MenuItem>
      </Select>
    </FormControl>
    {receivingMethods.includes('bank') && (
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
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Account Number"
                fullWidth
                variant="outlined"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <TextField
                margin="dense"
                label="IFSC Code"
                fullWidth
                variant="outlined"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
              />
            </Box>
          )}

          {receivingMethods.includes('upiId') && (
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
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </Box>
          )}

          {receivingMethods.includes('upiNumber') && (
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
                value={upiName}
                onChange={(e) => setUpiName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="UPI Number"
                fullWidth
                variant="outlined"
                value={upiNumber}
                onChange={(e) => setUpiNumber(e.target.value)}
              />
            </Box>
          )}

          {receivingMethods.includes('qrCode') && (
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
                  onChange={handleFileChange}
                />
              </Button>
            </Box>
          )}
    </>
  );
};

export default ReceivingMethodSelect;
