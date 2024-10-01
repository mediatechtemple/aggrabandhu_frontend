import React, { useState } from 'react';
import { Button, TextField, Typography, Dialog, DialogContent } from '@mui/material';

const EmailVerification = ({ formData, handleChange }) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(null); // null, true, or false
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);

  // Send OTP API call
  const handleSendOtp = async () => {
    try {
      const response = await fetch('https://agerbandhu-production.up.railway.app/api/member/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ via: formData.email }), // Pass email in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      const data = await response.json();
      console.log('OTP sent response:', data);

      setOtpSent(true);
      setOpenDialog(true);
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Failed to send OTP. Please try again.');
    }
  };

  // Verify OTP API call
  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('https://agerbandhu-production.up.railway.app/api/member/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ via: formData.email, otp: parseInt(otp)}), // Pass email and OTP in the request body
      });

      if (!response.ok) {
        throw new Error('Failed to verify OTP');
      }

      const data = await response.json();
      console.log('OTP verification response:', data);

      if (data.message=='verified') {
        setOtpVerified(true);
        setOpenDialog(false);
      } else {
        setOtpVerified(false);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Failed to verify OTP. Please try again.');
    }
  };


  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  return (
    <>
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />


      {/* <Button variant="contained" onClick={handleSendOtp} fullWidth disabled={!validateEmail(formData.email)}>
        Send Email OTP (optional)
      </Button> */}

      {/* {otpVerified !== null && (
        <Typography
          // variant="body1"
          color={otpVerified ? 'success.main' : 'error.main'}
          sx={{fontSize:18}}
        >
          {otpVerified ? 'OTP Verified Successfully' : 'Invalid OTP'}
        </Typography>
      )} */}
      

      {/* {error && <Typography sx={{ fontSize:18}} color="error">{error}</Typography>} */}


      {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
      </Dialog> */}
    </>
  );
};

export default EmailVerification;
