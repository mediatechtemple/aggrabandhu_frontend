import React, { useState } from 'react';
import { Button, TextField, Typography, Dialog, DialogContent } from '@mui/material';

const MobileVerification = ({ formData, handleChange }) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(null); // null, true, or false
  const [openDialog, setOpenDialog] = useState(false);

  const handleSendOtp = () => {
    console.log('Sending OTP to:', formData.mobile);
    setOtpSent(true);
    setOpenDialog(true);
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') {
      setOtpVerified(true);
      setOpenDialog(false);
    } else {
      setOtpVerified(false);
    }
  };

  return (
    <>
      <TextField
        label="Mobile Number"
        name="mobile"
        value={formData.mobile}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" onClick={handleSendOtp} fullWidth>
        Send OTP
      </Button>
      {otpVerified !== null && (
        <Typography
          variant="body1"
          color={otpVerified ? 'success.main' : 'error.main'}
          sx={{ mt: 2 }}
        >
          {otpVerified ? 'OTP Verified Successfully' : ''}
        </Typography>
      )}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogContent>
          <TextField
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            fullWidth
            margin="normal"
          />

{otpVerified !== null && (
        <Typography
          variant="body1"
          color={otpVerified ? 'success.main' : 'error.main'}
          sx={{ mt: 2 }}
        >
          {otpVerified ? 'OTP Verified Successfully' : 'Invalid OTP'}
        </Typography>
      )}
          <Button variant="contained" onClick={handleVerifyOtp} fullWidth>
            Verify OTP
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileVerification;
