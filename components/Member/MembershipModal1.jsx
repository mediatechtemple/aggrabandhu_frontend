import React, { useEffect, useState } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import BasicInformation from './MemberComponent/BasicInformation';
import EmailVerification from './MemberComponent/EmailVerification';
import MobileVerification from './MemberComponent/MobileVerification';
import AddressInformation from './MemberComponent/AddressInformation';
import IdentificationDocuments from './MemberComponent/IdentificationDocuments';
import NomineeDetails from './MemberComponent/NomineeDetails';
import DiseaseAndRules from './MemberComponent/DiseaseAndRules';

const MembershipModal1 = ({formData,setFormData, open, handleClose, initialData ,editData,handleSubmit}) => {
  
  const [errorMessage, setErrorMessage] = useState('');
  const[block,setBehsil]=useState([]);

  // Handle input change
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




  // Handle pincode change and fetch postal data
  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setFormData((prevState) => ({ ...prevState, pincode }));

    if (pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        console.log(data[0].PostOffice);
        if (data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          setFormData((prevState) => ({
            ...prevState,
            state: postOffice.State,
            district: postOffice.District,
          }));
          setErrorMessage('');
        } else {
          setErrorMessage('Invalid Pincode. Please enter a valid 6-digit pincode.');
        }
      } catch (error) {
        setErrorMessage('Error fetching data. Please try again later.');
      }
    }
  };

  // Handle file change for profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: file.name, photoUrl: imageUrl, profile: file });
    }
  };



  const handleDiseaseChange = (e) => {
    setFormData({ ...formData, disease: e.target.checked });
  };

  const handleDiseasefile = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, diseaseFile: file,diseaseFileName:file.name });
  };

  const handleRulesChange = (e) => {
    setFormData({ ...formData, rulesAccepted: e.target.checked });
  };

  const handleDeclaration = (e) => {
    setFormData({ ...formData, declaration: e.target.checked });
  };

  useEffect(()=>{
    console.log(formData)
  },[formData])





















 





  return (
    <Modal component="form" onSubmit={handleSubmit} open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          bgcolor: 'background.paper',
          p: 4,
          boxShadow: 24,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" component="h2" sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
          {initialData ? 'Edit Data of Member' : 'Apply for New Membership'}
        </Typography>
        <BasicInformation formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} editData={editData} />
        <EmailVerification formData={formData} handleChange={handleChange} />
        <MobileVerification formData={formData} handleChange={handleChange} />
        <AddressInformation formData={formData} 
        handleChange={handleChange} 
        handlePincodeChange={handlePincodeChange}
        editData={editData}
         />
        <IdentificationDocuments formData={formData} handleChange={handleChange}
         setFormData={setFormData} 
         editData={editData}
         />
        <NomineeDetails formData={formData} handleChange={handleChange} />
        <DiseaseAndRules
          formData={formData}
          handleDiseaseChange={handleDiseaseChange}
          handleRulesChange={handleRulesChange}
          setFormData={setFormData}
          handleDiseasefile={handleDiseasefile}
          handleDeclaration={handleDeclaration}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default MembershipModal1;
