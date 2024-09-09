import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';


import BasicInformation from './MemberComponent/BasicInformation';
import EmailVerification from './MemberComponent/EmailVerification';
import MobileVerification from './MemberComponent/MobileVerification';
import AddressInformation from './MemberComponent/AddressInformation';
import NomineeDetails from './MemberComponent/NomineeDetails';
import DiseaseAndRules from './MemberComponent/DiseaseAndRules';
import IdentificationDocuments from './MemberComponent/IdentificationDocuments';

const MembershipModal1 = ({ 
    open,
    handleClose,
    formValues,
    handleChange, 
    handleSubmit,
    handleFileChange,
    handleNomineeChange
 }) => {
  return (
    <>
      <Dialog open={open} onClose={handleClose} >
      <DialogTitle>New Membership</DialogTitle>
      <DialogContent>

        <BasicInformation 
        formData={formValues}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        />

        <EmailVerification formData={formValues}  handleChange={handleChange}  />

        {/* here Mobile verification will come */}

        <MobileVerification formData={formValues}  handleChange={handleChange}  />

        <AddressInformation
          formData={formValues}
          handleChange={handleChange}
        />
        <IdentificationDocuments
        formData={formValues}
        handleChange={handleChange}
        handleFileChange={handleFileChange}
        
        />

        <NomineeDetails
          formData={formValues}
          handleNomineeChange={handleNomineeChange}
        />


        <DiseaseAndRules
          formData={formValues}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
        />

      </DialogContent>
      <DialogActions >
       <button 
        onClick={handleClose} 
        className="bg-blue-500 text-white font-medium py-2 px-4 rounded "
      >
        Cancel
      </button>

        <button 
          onClick={handleSubmit} 
          className="bg-blue-500 text-white font-medium py-2 px-4 rounded "
        >
        submit
      </button>
      </DialogActions>
      </Dialog>
    </>
      
    
  );
};

export default MembershipModal1;
