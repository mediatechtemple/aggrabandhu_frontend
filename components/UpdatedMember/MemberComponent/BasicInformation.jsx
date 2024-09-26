import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';

const BasicInformation = ({
  formData,
  handleChange,
  handleFileChange,
}) => {
  
  
  const [gotraOptions, setGotraOptions] = useState([]);
  const [professionsOptions, setProfessionsOptions] = useState([]);
  // Fetch the array from localStorage when the component mounts
  
  useEffect(() => {
    // Replace 'gotraOptions' with the key used to store your array in localStorage
    const storedGotraOptions = JSON.parse(window.localStorage.getItem('inputs')) || [];
    const storedProfessionOptions = JSON.parse(window.localStorage.getItem('professions')) || [];

    setGotraOptions(storedGotraOptions);
    setProfessionsOptions(storedProfessionOptions);

  }, []);
 return <>
    <TextField
      label="Reference ID"
      name="referenceId"
      value={formData.referenceId}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />

    <FormControl fullWidth margin="normal">
      <InputLabel>Gotra</InputLabel>
      <Select
        value={formData.gotra}
        onChange={handleChange}
        name="gotra"
        label="Gotra"
      >
        {gotraOptions.map((gotra, index) => (
          <MenuItem key={index} value={gotra}>
            {gotra}
          </MenuItem>
        ))}
      </Select>
    </FormControl>


    <Button variant="contained" component="label" fullWidth>
      Upload Photo
      <input
        type="file"
        accept="image/*"
        hidden
        name="Photo"
        onChange={handleFileChange}
      />
    </Button>
    {formData.Photo && (
        <Typography variant="body2" sx={{ mt: 2 }}>
          Selected file: {formData.Photo.name}
        </Typography>
      )}

    {formData.photo && (
      <Typography variant="body1" sx={{ mt: 2 }}>
        Selected File: {formData.photo}
      </Typography>
    )}

    <TextField
      label="Name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />

    <TextField
      label="Father's Name"
      name="fatherName"
      value={formData.fatherName}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />

    <TextField
      label="Mother's Name"
      name="motherName"
      value={formData.motherName}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />

    <TextField
      type="date"
      label="Date of Birth"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
    />

    <FormControl fullWidth margin="normal">
      <InputLabel>Marital Status</InputLabel>
      <Select 
        value={formData.maritalStatus}
        onChange={handleChange}
        name="maritalStatus"
        label="Marital Status"
      >
        <MenuItem value="">Select Marital Status</MenuItem>
        <MenuItem value="single">Single</MenuItem>
        <MenuItem value="married">Married</MenuItem>
        <MenuItem value="divorced">Divorced</MenuItem>
      </Select>
    </FormControl>

    
    {formData.maritalStatus === 'married' && (
      <TextField
        label="Spouse Name"
        name="spouseName"
        value={formData.spouseName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
    )}


<FormControl fullWidth margin="normal">
      <InputLabel>Profession</InputLabel>
      <Select
        value={formData.profession}
        onChange={handleChange}
        name="profession"
        label="profession"
      >
        {professionsOptions.map((profession, index) => (
          <MenuItem key={index} value={profession}>
            {profession}
          </MenuItem>
        ))}
        

      </Select>
    </FormControl>




    <TextField
      label="Password"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />


    
   


  </>
};

export default BasicInformation;
