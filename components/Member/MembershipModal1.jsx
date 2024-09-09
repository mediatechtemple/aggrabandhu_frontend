import React, { useEffect, useState } from 'react';
import { Modal, Button, Box, Dialog, DialogTitle, DialogContent, TextField, Typography } from '@mui/material';
import MembershipForm from './MembershipModal1';
import BasicInformation from './MemberComponent/BasicInformation';
import EmailVerification from './MemberComponent/EmailVerification';
import MobileVerification from './MemberComponent/MobileVerification';
import AddressInformation from './MemberComponent/AddressInformation';
import IdentificationDocuments from './MemberComponent/IdentificationDocuments';
import NomineeDetails from './MemberComponent/NomineeDetails';
import DiseaseAndRules from './MemberComponent/DiseaseAndRules';

const MembershipModal1 = ({open,handleClose,initialData}) => {
  const [formData, setFormData] = useState({
    referenceId: '',
    gotra: '',
    photo: '',
    name: '',
    fatherName: '',
    motherName: '',
    dob: '',
    maritalStatus: '',
    spouseName: '',
    mobile: '',
    otp: '',
    password: '',
    confirmPassword: '',
    email: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    profession: '',
    adharCard: '',
    adharCardFile:null,
    voterId: '',
    voterIdFile:null,
    nominee1: { name: '', relationship: '' },
    nominee2: { name: '', relationship: '' },
    disease: false,
    diseaseFile: null,
    rulesAccepted: false,
  });


  const [errorMessage, setErrorMessage] = useState('');


  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(null); // Changed to null
  const [openn, setOpenn] = useState(false);


//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//////////////////////////////////////

if(initialData){
    formData.name='Ashoka'
}

/////////////////////

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setFormData((prevState) => ({ ...prevState, pincode })); // Preserve old state

    if (pincode.length === 6) {
      try {
        // Fetch data from the Postal API based on the pincode
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          setFormData((prevState) => ({
            ...prevState, // Preserve existing pincode
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

  const handleNomineeChange = (index, field, value) => {
    setFormData((prevData) => {
      const nominee1 = { ...prevData.nominee1 };
      const nominee2 = { ...prevData.nominee2 };

      if (index === 0) {
        nominee1[field] = value;
      } else if (index === 1) {
        nominee2[field] = value;
      }

      return {
        ...prevData,
        nominee1,
        nominee2,
      };
    });
  };

  const handleDiseaseFileChange = (e) => {
    setFormData({ ...formData, diseaseFile: e.target.files[0] });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the selected image and update the formData
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: file.name, photoUrl: imageUrl });
    }
  };

  const handleDiseaseChange = (e) => {
    setFormData({ ...formData, disease: e.target.checked });
  };

  const handleRulesChange = (e) => {
    setFormData({ ...formData, rulesAccepted: e.target.checked });
  };

  const handleAadharFileChange = (e) => {
    setFormData({ ...formData, adharCardFile: e.target.files[0].name });
  };

  const handleVoterIdFileChange = (e) => {
    setFormData({ ...formData, voterIdFile: e.target.files[0].name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match!");
      alert("hello here one password does not match");
      return;
    }
    console.log('Applying for membership with:', formData);
    handleClose();
  };

  // here all concept of otp will be played bro

  const handleVerifyOtp = (e)=>{
    if (otp === '1234') {
      setOtpVerified(true);
      handleCloseDialog();
    } else {
      setOtpVerified(false);
    }
  }
  const handleOpenDialog = () => {
    setOpenn(true);
    handleSendOtp();
  };
  const handleSendOtp = () => {
    console.log('Sending OTP to:', formData.phone);
    setOtpSent(true);
  };

  const handleCloseDialog = () => {
    setOpenn(false);
  };

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
              
        <Typography variant="h6" component="h2" sx={{ backgroundColor: "#1976d2", color: 'white', textAlign: 'center' }}>
          {initialData ? 'Apply for New Membership': 'Edit Data of Member'}
        </Typography>
        <BasicInformation
          formData={formData}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          handleAadharFileChange={handleAadharFileChange}
          handleVoterIdFileChange={handleVoterIdFileChange}
          
        />

        {/* here Email verification code will come */}

        <EmailVerification formData={formData}  handleChange={handleChange}  />

        {/* here Mobile verification will come */}

        <MobileVerification formData={formData}  handleChange={handleChange}  />



        <AddressInformation
          formData={formData}
          handleChange={handleChange}
          handlePincodeChange={handlePincodeChange}
        />
        <IdentificationDocuments
          formData={formData}
          handleChange={handleChange}
          handleAadharFileChange={handleAadharFileChange}
          handleVoterIdFileChange={handleVoterIdFileChange}
        />
        <NomineeDetails
          formData={formData}
          handleNomineeChange={handleNomineeChange}
        />


        <DiseaseAndRules
          formData={formData}
          handleDiseaseChange={handleDiseaseChange}
          handleDiseaseFileChange={handleDiseaseFileChange}
          handleRulesChange={handleRulesChange}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      
            </Box>
          </Modal>
  );
};

export default MembershipModal1;
