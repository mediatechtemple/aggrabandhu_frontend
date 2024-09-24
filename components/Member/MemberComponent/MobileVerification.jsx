import React, { useState } from 'react';
import { Button, TextField, Typography, Dialog, DialogContent } from '@mui/material';

const MobileVerification = ({ formData, handleChange }) => {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(null); // null, true, or false
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const[mobileError,setMobileError]=useState(true);

  const handleSendOtp = async () => {
    if(formData.mobile_no.length!==10){
      setMobileError(false);
      return;
    }
    setMobileError(true);
    try {
      setLoading(true);
      const response = await fetch('https://agerbandhu-production.up.railway.app/api/member/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ via: formData.mobile_no }), // Using mobile number from formData
      });

      if (response.ok) {
        setOtpSent(true);
        setOpenDialog(true);
        console.log('OTP sent successfully');
      } else {
        console.error('Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://agerbandhu-production.up.railway.app/api/member/verifyotp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ via: formData.mobile_no, otp }), // Using mobile number and OTP
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message) {
          setOtpVerified(true);
          setOpenDialog(false);
        } else {
          setOtpVerified(false);
        }
      } else {
        setOtpVerified(false);
        console.error('Failed to verify OTP');
      }
    } catch (error) {
      setOtpVerified(false);
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TextField
        label="Mobile 10 digit Number"
        name="mobile_no"
        value={formData.mobile_no}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
       {!mobileError && (
        <Typography
          variant="body1"
          color={'error.main'}
          sx={{ fontSize:18 }}
        >
          {mobileError ? 'OTP Verified Successfully' : 'Invalid OTP'}
        </Typography>
      )}
      <Button
  variant="contained"
  onClick={handleSendOtp}
  disabled={formData.mobile_no.length!==10 ? true : false } // Combine the conditions
  fullWidth
>
  
  {loading ? 'Sending OTP...' : 'Send OTP On Mobile'}
</Button>

      {otpVerified !== null && (
        <Typography
          variant="body1"
          color={otpVerified ? 'success.main' : 'error.main'}
          sx={{ fontSize:18 }}
        >
          {otpVerified ? 'OTP Verified Successfully' : 'Invalid OTP'}
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
          <Button variant="contained" onClick={handleVerifyOtp} fullWidth disabled={loading}>
            {loading ? 'Verifying OTP...' : 'Verify OTP'}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MobileVerification;
