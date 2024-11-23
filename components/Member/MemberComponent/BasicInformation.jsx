import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';
import Image from 'next/image';
import { usePathname } from 'next/navigation'
const BasicInformation = ({
  formData,
  handleChange,
  handleFileChange,
  editData,
  checkImageType,
  handleMerriageChange,
  handleDobChange
}) => {
  
  const [gotraOptions, setGotraOptions] = useState([]);
  const [professionsOptions, setProfessionsOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname()

  let aaa=formData.referData?.reference_id;
  
  useEffect(() => {
    const fetchGotras = async () => {
      try {
        const response = await fetch('https://backend.aggrabandhuss.org/api/gotra');
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
            const response = await fetch('https://backend.aggrabandhuss.org/api/profession');
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











// "refer_id" 
 return <>

 <TextField
      label={editData ? "refer_id *" :"Reference id *"}
      name={editData ? "refer_id":"reference_id" }
      value={editData?formData.refer_id:formData.reference_id}
      onChange={handleChange}
      fullWidth
      margin="normal"
      InputProps={{
        readOnly:(pathname==='/Profile'), // Set readonly if editData is true
      }}
      required
    />

{editData && <TextField
      label={"Memeber id *"}
      name={"reference_id"}
      value={formData.reference_id}
      // onChange={null}
      fullWidth
      margin="normal"
      InputProps={{
        readOnly:true // Set readonly if editData is true
      }}
      required
    />}




    <FormControl fullWidth margin="normal">
      <InputLabel>Gotra</InputLabel>
      <Select
        value={formData.gotra}
        onChange={handleChange}
        name="gotra"
        label="Gotra"
        required
      >
        {gotraOptions.map((gotra, index) => (
          <MenuItem key={index} value={gotra.name}>
            {gotra.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>




<span className='text-lg text-blue-600 font-bold font-serif'>Upload high quality Image in jpg</span>
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
      {checkImageType && <p className='text-red-700 text-3xl font-serif'>{checkImageType}</p>}
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

<FormControl fullWidth margin="normal">
  <InputLabel>Blood Group</InputLabel>
  <Select
    value={formData.blood_group}
    onChange={handleChange}
    name="blood_group"
    label="Blood Group"
    required
    MenuProps={{
      PaperProps: {
        style: {
          maxHeight: 200, // Set the max height for the dropdown
          overflowY: 'auto', // Enable vertical scrolling
        },
      },
    }}
  >
    <MenuItem value="">Select Blood Group</MenuItem>
    <MenuItem value="A+">A+</MenuItem>
    <MenuItem value="A-">A-</MenuItem>
    <MenuItem value="B+">B+</MenuItem>
    <MenuItem value="B-">B-</MenuItem>
    <MenuItem value="AB+">AB+</MenuItem>
    <MenuItem value="AB-">AB-</MenuItem>
    <MenuItem value="O+">O+</MenuItem>
    <MenuItem value="O-">O-</MenuItem>
  </Select>
</FormControl>




<FormControl fullWidth margin="normal">
      <InputLabel>Gender</InputLabel>
      <Select
        value={formData.gender}
        onChange={handleChange}
        name="gender"
        label="Gender"
        required
      >
        <MenuItem value="">Select Gender</MenuItem>
        <MenuItem value="Male">Male</MenuItem>
        <MenuItem value="Female">Female</MenuItem>
      </Select>
    </FormControl>



    <TextField
      label="Father's Name*/Husband's Name"
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
      onChange={handleDobChange}
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      required
    />

    {
      formData.dob &&
      <TextField
      label="Total Age"
      name="total_age"
      value={formData.total_age}
      fullWidth
      margin="normal"
      required
      readOnly
    />


    }



    <FormControl fullWidth margin="normal">
      <InputLabel>Marital Status</InputLabel>
      <Select
        value={formData.marital_status}
        onChange={handleChange}
        name="marital_status"
        label="Marital Status"
        required
      >
        <MenuItem value="">Select Marital Status</MenuItem>
        <MenuItem value="Single">Single</MenuItem>
        <MenuItem value="Married">Married</MenuItem>
        <MenuItem value="Divorced">Divorced</MenuItem>
        <MenuItem value="Widow">Widow</MenuItem>
        <MenuItem value="Widower">Widower</MenuItem>
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
        required
      />

    )}

    {formData.marital_status === 'Married' && (
       <TextField
       type="date"
       label="marriage_date"
       name="marriage_date"
       value={formData.marriage_date}
       onChange={handleMerriageChange}
       fullWidth
       margin="normal"
       InputLabelProps={{
         shrink: true,
       }}
       required
     />

    )}

{formData.marital_status === 'Married' && (
       <TextField
       type="text"
       label="years_since_marriage"
       name="marriage_age"
       value={formData.marriage_age}
      //  onChange={handleChange}
       fullWidth
       margin="normal"
       InputLabelProps={{
         shrink: true,
       }}
       required
       readOnly
     />

    )}





    <FormControl fullWidth margin="normal">
      <InputLabel>Profession of Donner</InputLabel>
      <Select
        value={formData.profession}
        onChange={handleChange}
        name="profession"
        label="profession"
        required
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
      <p className='text-red-600 text-3xl font-bold font-serif'>
        Incorrect password.
      </p>
    )}
  </>
)}



    
   


  </>
};

export default BasicInformation;
