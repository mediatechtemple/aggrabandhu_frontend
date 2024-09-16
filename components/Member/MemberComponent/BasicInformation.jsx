import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';

const BasicInformation = ({
  formData,
  handleChange,
  handleFileChange,
}) => {
  
  const [gotraOptions, setGotraOptions] = useState([]);
  const [professionsOptions, setProfessionsOptions] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
  // Fetch the array from localStorage when the component mounts
  
  // useEffect(() => {
  //   // Replace 'gotraOptions' with the key used to store your array in localStorage
  //   const storedProfessionOptions = JSON.parse(localStorage.getItem('professions')) || [];

  
  //   setProfessionsOptions(storedProfessionOptions);

  // }, []);

  useEffect(() => {
    const fetchGotras = async () => {
      try {
        const response = await fetch('https://internal.aggrabandhuss.org/api/gotra');
        const data = await response.json();
        setGotraOptions(data);
        
      } catch (error) {
        console.error('Error fetching gotras:', error);
      }
    };
  
    fetchGotras();
  }, []);

  useEffect(() => {
    async function fetchProfession() {
        try {
            const response = await fetch('https://internal.aggrabandhuss.org/api/profession');
            if (!response.ok) {
                throw new Error('Error fetching professions');
            }
            const data = await response.json();
            setProfessionsOptions(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    fetchProfession();
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
          <MenuItem key={index} value={gotra.name}>
            {gotra.name}
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
          onChange={handleFileChange}
        />
  </Button>

      {/* Show selected file name */}
      {formData.photo && (
        <>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Selected File: {formData.photo}
          </Typography>

          {/* Display the image below */}
          <img
            src={formData.photoUrl}
            alt={formData.photo}
            style={{ marginTop: '10px', maxWidth: '20%', height: 'auto' }}
          />
        </>
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
          <MenuItem key={index} value={profession.name}>
            {profession.name}
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
     <TextField
      label="Confirt_Password"
      name="confirmPassword"
      type="password"
      value={formData.confirmPassword}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />



    
   


  </>
};

export default BasicInformation;
