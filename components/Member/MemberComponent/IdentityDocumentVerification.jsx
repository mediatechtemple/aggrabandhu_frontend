import React, { useState, useRef } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const IdentityDocumentVerification = ({ formData, handleChange, setFormData, editData }) => {
  const [voterIdVerificationMessage, setVoterIdVerificationMessage] = useState('');
  const [checkImageType, setCheckImageType] = useState('');
  const [matched, setMatched] = useState(false);

  const voterIdFileInputRef = useRef(null);

  const handleVoterIdFileChange = async (e) => {
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
        data.append('number', formData.id_no);
        data.append('type_id', formData.id_type);

        try {
          const response = await fetch('https://backend.aggrabandhuss.org/api/validate-image', {
            method: 'POST',
            body: data,
          });

          const result = await response.json();

          if (result.valid && result.matched) {
            setVoterIdVerificationMessage('Verification successful!');
            setMatched(false);
          } else {
            setVoterIdVerificationMessage('Document number does not match.');
            setMatched(true);
          }
        } catch (error) {
          setVoterIdVerificationMessage('Verification failed. Please try again.');
          setMatched(true);
        }

        voterIdFileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <FormControl fullWidth required>
        <InputLabel>Select Identification Document</InputLabel>
        <Select name="id_type" value={formData.id_type} onChange={handleChange}>
          <MenuItem value="Pan card">Pan Card</MenuItem>
          <MenuItem value="Voter ID">Voter ID</MenuItem>
          <MenuItem value="Driving License">Driving License</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label={
          formData.id_type === 'Driving License'
            ? 'Enter 16 digit driving Licence no'
            : formData.id_type === 'Pan card'
            ? 'Enter 10 digit pan card no'
            : 'Enter 10 digit Voter ID'
        }
        name="id_no"
        value={formData.id_no}
        onChange={editData ? () => {} : handleChange}
        fullWidth
        required
      />

      {!editData && (
        <Button
          variant="contained"
          component="label"
          fullWidth
          disabled={formData.id_type === 'Driving License' ? formData.id_no.length !== 16 : formData.id_no.length !== 10}
        >
          Attach Document
          <input type="file" accept=".jpg,.jpeg" hidden ref={voterIdFileInputRef} onChange={handleVoterIdFileChange} />
        </Button>
      )}

      {checkImageType && <p className="text-red-500">{checkImageType}</p>}
      {voterIdVerificationMessage && (
        <Typography className={`font-bold ${!matched ? 'text-blue-500' : 'text-red-500'}`}>
          {voterIdVerificationMessage}
        </Typography>
      )}
    </>
  );
};

export default IdentityDocumentVerification;
