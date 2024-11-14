import React, { useState, useRef } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const AadharCardVerification = ({ formData, handleChange, setFormData, editData }) => {
  const [aadharVerificationMessage, setAadharVerificationMessage] = useState('');
  const [checkImageType, setCheckImageType] = useState('');
  const [matched, setMatched] = useState(false);

  const aadharFileInputRef = useRef(null);

  const handleAadharFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (!fileType.startsWith('image/')) {
        setCheckImageType('Please upload an image file!');
        e.target.value = '';
      } else {
        setCheckImageType('');
        const data = new FormData();
        data.append('file', file);
        data.append('number', formData.aadhar_no);
        data.append('type_id', 'aadhar card');

        try {
          const response = await fetch('https://backend.aggrabandhuss.org/api/validate-image', {
            method: 'POST',
            body: data,
          });

          const result = await response.json();

          if (result.valid && result.matched) {
            setAadharVerificationMessage('Aadhaar verification successful!');
            setMatched(false);
          } else {
            setAadharVerificationMessage('Aadhaar number does not match the document.');
            setMatched(true);
          }
        } catch (error) {
          setAadharVerificationMessage('Verification failed. Please try again.');
          setMatched(true);
        }

        aadharFileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <TextField
        label="Enter 12 digit Aadhar Card no"
        name="aadhar_no"
        value={formData.aadhar_no}
        onChange={editData ? () => {} : handleChange}
        fullWidth
        required
      />
      {!editData && (
        <Button variant="contained" component="label" fullWidth disabled={formData.aadhar_no.length !== 12}>
          Attach Aadhar Card
          <input type="file" accept=".jpg,.jpeg" hidden ref={aadharFileInputRef} onChange={handleAadharFileChange} />
        </Button>
      )}
      {checkImageType && <p className="text-red-500">{checkImageType}</p>}
      {aadharVerificationMessage && (
        <Typography className={`font-bold ${!matched ? 'text-blue-500' : 'text-red-500'}`}>
          {aadharVerificationMessage}
        </Typography>
      )}
    </>
  );
};

export default AadharCardVerification;
