import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';

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
  handleSearchDialogOpen
}) => {
  const handleReceivingMethodsChange = (event) => {
    setReceivingMethods(event.target.value);
  };

  return (
    <Dialog open={popupOpen} onClose={handleClose}>
      <DialogTitle>Donation Form</DialogTitle>
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
            label="User ID"
            fullWidth
            variant="outlined"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Start Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            margin="dense"
            label="End Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
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
