import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const IdentificationDocuments = ({ formData,handleChange,setFormData, editData}) => {

  const [aadharVerificationMessage, setAadharVerificationMessage] = useState('');
  const [setEr,setErr]=useState(false);


  const [voterIdVerificationMessage, setVoterIdVerificationMessage] = useState('');
  
  const[adharError,setAdharError]=useState(true);

  const [checkImageType,setCheckImageType]=useState('');
  const [checkImageType1,setCheckImageType1]=useState('');


  // References for the file inputs
  const aadharFileInputRef = useRef(null);
  const voterIdFileInputRef = useRef(null);

 








  // Aadhar file upload and verification
  const handleAadharFileChange = async (e) => {

    setAdharError(true);
    const file = e.target.files[0];

    
    setFormData({ ...formData, file: e.target.files[0] });



    if (file) {
      const fileType = file.type;

      if(!fileType.startsWith('image/')){
        // If it's not an image, show an error message
        setCheckImageType('Please upload an image file!');
        e.target.value = ''; // Reset the file input
      }else{
        setCheckImageType('');
        const data = new FormData();
      data.append('file', file);
      data.append('number', formData.aadhar_no); 
      data.append('type_id', 'aadhar card');

      try {
        const response = await fetch('https://agerbandhu-production.up.railway.app/api/validate-image', {
          method: 'POST',
          body: data,
        });
       const  result = await response.json();

       console.log(result);

       if(result.status===406){
        alert('member Aleready Exists! Enter Unique Number');
        return;
      }

        if (result.valid && result.matched) {
          setErr(false);
          setAadharVerificationMessage(`Aadhaar verification successful! Number: ${result.aadhaarNumber}`);
        } else if (!result.valid) {
          setErr(true)
          setAadharVerificationMessage('Invalid Aadhaar number.');
        } else {
          setErr(true);
          setAadharVerificationMessage('Aadhaar number does not match the document.');
        }
      } catch (error) {
        setAadharVerificationMessage('Verification failed. Please try again.');
      }

      // Reset file input
      aadharFileInputRef.current.value = '';
      }

    }



  };





















  // Voter ID / Driving License / Pan Card file upload and verification
  const handleVoterIdFileChange = async (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file2: e.target.files[0] });






    if (file) {
      const fileType = file.type;

      if(!fileType.startsWith('image/')){
        // If it's not an image, show an error message
        setCheckImageType1('Please upload an image file!');
        e.target.value = ''; // Reset the file input
      }else{
        setCheckImageType1('');
        const data = new FormData();
      data.append('file', file);
      data.append('number', formData.id_no); 
      data.append('type_id', formData.id_type); // Change the type if needed


      try {
        const response = await fetch('https://agerbandhu-production.up.railway.app/api/validate-image', {
          method: 'POST',
          body: data,
        });

        const result = await response.json();
        
        if(result.status===406){
          alert('member Aleready Exists! Enter Unique Number');
          return;
        }

        // Check for validation and matching
        if (result.valid && result.matched) {
          setVoterIdVerificationMessage(`Verification successful! Number: ${result.panNumber}`);
        } else if (!result.valid) {
          setVoterIdVerificationMessage(`file selected`);

          // setVoterIdVerificationMessage('Invalid Voter ID / Pan Card number.');
        } else {
          setVoterIdVerificationMessage('Document number does not match.');
        }
      } catch (error) {
        setVoterIdVerificationMessage('Verification failed. Please try again.');
      }

      // Reset file input
      voterIdFileInputRef.current.value = '';
      }
    }




  };

























  return (
    <>



      <TextField
        label="Enter 12 digit Aadhar Card no"
        name="aadhar_no"
        value={formData.aadhar_no}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      
      <p className='text-lg text-blue-600 font-bold font-serif'>Upload high quality Image in .jpg</p>
  <Button variant="contained" component="label" fullWidth
  disabled={formData.aadhar_no.length !== 12}
  >
    Attach Aadhar Card
    <input
      type="file"
      accept=".jpg"
      hidden
      ref={aadharFileInputRef} // Reference for Aadhar file input
      onChange={handleAadharFileChange}
    />
  </Button>
  {checkImageType && <p className='text-red-700  text-2xl'>Attach Image Of Aadhar Card!</p>}



      {aadharVerificationMessage && (
        <Typography color={setEr ?'red':'primary'} variant="body2" margin="normal" class="text-xl">
          {aadharVerificationMessage}
        </Typography>
      )}

       {formData.file && editData && (
        <Typography color="primary" variant="body2" margin="normal" class="text-xl">
          Verification successful!
        </Typography>
      )}


























  <FormControl fullWidth margin="normal">
      <InputLabel>Select Identification Document</InputLabel>
      <Select
        name="id_type"
        value={formData.id_type}
        onChange={handleChange}
        label="Identification Document"
      >
        <MenuItem value="">Select Identification Document</MenuItem>
        <MenuItem value="Pan card">Pan Card</MenuItem>
        <MenuItem value="Voter ID">Voter ID</MenuItem>
        <MenuItem value="Driving License">Driving License</MenuItem>
      </Select>
    </FormControl>






    <p className='text-lg  text-blue-600 font-bold font-serif'>Upload high quality Image in .jpg</p>
      <TextField
        label={formData.id_type == "Driving License"?"Enter 16 digit driving Licence no":formData.id_type=="Pan card" ? "enter 10 digit pan card no" : formData.id_type=="Voter ID" ? "enter 10 digit VoterId": "Voter ID / Driving License / Pan Card No"}
        name="id_no"
        value={formData.id_no}
        onChange={handleChange}
        fullWidth
        
      />

      <Button variant="contained" component="label" fullWidth
        disabled={ formData.id_type=='Driving License' ? formData.id_no.length !== 16 : formData.id_no.length !== 10 }
      >
        Attach Voter ID / Driving License / Pan Card
        <input
          type="file"
          accept=".jpg"
          hidden
          ref={voterIdFileInputRef} // Reference for Voter ID file input
          onChange={handleVoterIdFileChange}
        />
      </Button>
      {checkImageType1 && <p className='text-red-700 text-xl'>Attach Image Of Identity Card!</p>}
      {voterIdVerificationMessage && (
        <Typography color="primary" variant="body2" margin="normal" class="text-xl">
          {voterIdVerificationMessage}
        </Typography>
      )}
      {formData.file2 && editData && (
        <Typography color="primary" variant="body2" margin="normal " class="text-xl">
          Verification successful!
        </Typography>
      )}
    </>
  );
};

export default IdentificationDocuments;
