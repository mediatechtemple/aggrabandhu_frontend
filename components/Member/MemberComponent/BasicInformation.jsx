import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';
import Image from 'next/image';

const BasicInformation = ({
  formData,
  handleChange,
  handleFileChange,
  editData
}) => {
  
  const [gotraOptions, setGotraOptions] = useState([]);
  const [professionsOptions, setProfessionsOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    const fetchGotras = async () => {
      try {
        const response = await fetch('https://agerbandhu-production.up.railway.app/api/gotra');
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
            const response = await fetch('https://agerbandhu-production.up.railway.app/api/profession');
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

   {!editData && <TextField
      label="Reference id *"
      name="reference_id"
      value={formData.reference_id}
      onChange={handleChange}
      fullWidth
      margin="normal"
    />}




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




<span className='text-lg'>Upload high quality Image in jpg</span>
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
      {formData.profile && (
        <>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Selected File: {formData.photo}
          </Typography>

          {/* Display the image below */}
          <Image
            src={formData.photoUrl}
            alt={formData.photo}
            width={200} // You can adjust the width and height as needed
            height={200}
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
      name="father_name"
      value={formData.father_name}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />


    <TextField
      label="Mother's Name"
      name="mother_name"
      value={formData.mother_name}
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
        value={formData.marital_status}
        onChange={handleChange}
        name="marital_status"
        label="Marital Status"
      >
        <MenuItem value="">Select Marital Status</MenuItem>
        <MenuItem value="Single">Single</MenuItem>
        <MenuItem value="Married">Married</MenuItem>
        <MenuItem value="Divorced">Divorced</MenuItem>
      </Select>
    </FormControl>

    {formData.marital_status === 'Married' && (
      <TextField
        label="Spouse Name"
        name="spouse_name"
        value={formData.spouse_name}
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


    {!editData && <TextField
      label="Password"
      name="password"
      type="password"
      value={formData.password}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />}

{!editData && (
  <>
    <TextField
      label="Confirm Password"
      name="confirmPassword"
      type="password"
      value={formData.confirmPassword}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
    />
    {formData.confirmPassword && formData.confirmPassword !== formData.password && (
      <Typography variant="body2" color="error" margin="normal">
        Incorrect password.
      </Typography>
    )}
  </>
)}



    
   


  </>
};

export default BasicInformation;
