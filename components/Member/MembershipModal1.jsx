import React, { useEffect, useState } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import BasicInformation from './MemberComponent/BasicInformation';
import EmailVerification from './MemberComponent/EmailVerification';
import MobileVerification from './MemberComponent/MobileVerification';
import AddressInformation from './MemberComponent/AddressInformation';
import IdentificationDocuments from './MemberComponent/IdentificationDocuments';
import NomineeDetails from './MemberComponent/NomineeDetails';
import DiseaseAndRules from './MemberComponent/DiseaseAndRules';
import { AiOutlineClose } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
const MembershipModal1 = ({formData,setFormData, open, handleClose, initialData ,editData,handleSubmit,handlePincodeChange,block,loading=false,Cross_handleClose}) => {
  
  const [errorMessage, setErrorMessage] = useState('');
  const [checkImageType,setCheckImageType]=useState('');

  // Handle input change
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };




  // Handle pincode change and fetch postal data
  // const handlePincodeChange = async (e) => {
  //   const pincode = e.target.value;
  //   setFormData((prevState) => ({ ...prevState, pincode }));

  //   if (pincode.length === 6) {
  //     try {
  //       const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
  //       const data = await response.json();
  //       const blockmap=data[0].PostOffice;
  //       const bl=[];
    
  //       blockmap.forEach((office, index) => {
  //         bl.push(office);
  //         // console.log(`Post Office ${index}:`, office); // Log each object to find correct field
  //       });
  //       // console.log("bl",bl);
  //       setBehsil([...bl]);
        
  

  //       if (data[0].Status === 'Success') {
  //         const postOffice = data[0].PostOffice[0];
  //         setFormData((prevState) => ({
  //           ...prevState,
  //           state: postOffice.State,
  //           district: postOffice.District,
  //         }));
  //         setErrorMessage('');
  //       } else {
  //         setErrorMessage('Invalid Pincode. Please enter a valid 6-digit pincode.');
  //       }
  //     } catch (error) {
  //       setErrorMessage('Error fetching data. Please try again later.');
  //     }
  //   }

    
  // };


  

  // Handle file change for profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type; // Get the file type


      if (!fileType.startsWith('image/')) {
        // If it's not an image, show an error message
        setCheckImageType('Please upload an image file!');
        e.target.value = ''; // Reset the file input
    } else {
        // If it's an image, clear the error message
        setCheckImageType('');
        const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, photo: file.name, photoUrl: imageUrl, profile: file });
    }





      // const imageUrl = URL.createObjectURL(file);
      // setFormData({ ...formData, photo: file.name, photoUrl: imageUrl, profile: file });
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


  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const currentDate = new Date();
    let calculatedAge = currentDate.getFullYear() - dobDate.getFullYear();
    const monthDiff = currentDate.getMonth() - dobDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && currentDate.getDate() < dobDate.getDate())) {
      calculatedAge--;
    }


    return calculatedAge;
  };


  const handleMerriageChange = (event) => {
    const selectedDate = event.target.value;
    const age = calculateAge(selectedDate);

    // Update formData with marriage_date and calculated marriage_age
    setFormData({
      ...formData,
      marriage_date: selectedDate,
      marriage_age: age
    });
  };

  const handleDobChange = (event) => {
    const selectedDate = event.target.value;
    const age = calculateAge(selectedDate);

    if(age < 18 || age > 70){
      alert('Sorry you can not apply membership either you age is more than 70 years or less than 18 years.');
      setFormData({
        ...formData,
        dob: '',
        total_age: ''
      });
      return;
    }

    // Update formData with marriage_date and calculated marriage_age
    setFormData({
      ...formData,
      dob: selectedDate,
      total_age: age
    });
  };



  





  useEffect(()=>{
    console.log(formData)
  },[formData])





















 





  return (
    <>


{loading && <div className="relative  p-4 border-4 border-gray-500 " style={{ zIndex: 1400 }}  >
      {/* Loader (spinner) */}
      {/* {loading && ( */}
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 ">
          <div className="relative max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">
              Submitting...
            </h5>
            <div
              role="status"
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <svg
                aria-hidden="true"
                className="w-32 h-32 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      {/* )} */}
    </div>}
   







    <Modal  component="form" onSubmit={handleSubmit} open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {
            xs: '90%', // for extra small screens
            sm: '80%', // for small screens
            md: 700, // for medium screens
            lg: 900, // for large screens
          },
          bgcolor: 'background.paper',
          p: 4,
          boxShadow: 24,
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >






        {/* <p className='p-2'> <AiOutlineClose className="absolute top-2 right-2 text-4xl cursor-pointer" onClick={Cross_handleClose} />
        </p> */}
        <p className='p-2'>
  <FaTimes className="absolute top-2 right-2 text-4xl cursor-pointer" onClick={Cross_handleClose} />
</p>
        <Typography variant="h6" component="h2" sx={{ backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
          {initialData ? 'Edit Data of Member' : 'Apply for New Membership'}
        </Typography>

        <BasicInformation 
        formData={formData} 
        handleChange={handleChange}
         handleFileChange={handleFileChange} 
         editData={editData} 
         checkImageType={checkImageType}
         handleMerriageChange={handleMerriageChange}
         handleDobChange={handleDobChange}
         />
       
       
        <EmailVerification formData={formData} handleChange={handleChange} />

        <MobileVerification formData={formData} handleChange={handleChange} />

        <AddressInformation formData={formData} 
        handleChange={handleChange} 
        handlePincodeChange={handlePincodeChange}
        editData={editData}
        block={block}
         />

        <IdentificationDocuments formData={formData} handleChange={handleChange}
         setFormData={setFormData} 
         editData={editData}
         checkImageType={checkImageType}
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
    </>
  );

};

export default MembershipModal1;
