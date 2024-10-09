import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, FormControlLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';

const DiseaseAndRules = ({
  formData,
  handleDiseaseChange,
  handleDiseaseFileChange,
  handleRulesChange,
  handleDiseasefile,
  handleDeclaration
}) => {
  const [open, setOpen] = useState(false);  // Popup state
  const [decOpen, setDecOpen] = useState(false);
  const [postedData, setPostedData] = useState(null);
  const [declarations,setDeclarations]=useState(null);
  
  useEffect(()=>{
    const getContent = async () => {
        try {
          const response = await fetch('https://agerbandhu-production.up.railway.app/api/declearation/');
    
          if (response.ok) {
            const data = await response.json();
            console.log('Content posted successfully:', data);
            setPostedData(data[0].declearation); // Assuming the API returns the posted rule in the response
            
          } else {
            console.error('Error posting content:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      getContent();

  },[])

  useEffect(()=>{
    const getContent = async () => {
        try {
          const response = await fetch('https://agerbandhu-production.up.railway.app/api/rule/');
    
          if (response.ok) {
            const data = await response.json();
            console.log('Content posted successfully:', data);
            setDeclarations(data[0].rule); // Assuming the API returns the posted rule in the response
            
          } else {
            console.error('Error posting content:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      getContent();

  },[])

  // 
  
  const iframeRef=useRef(null);
  
  const handleContextMenu = (e) => {
    e.preventDefault(); // Disable right-click
    alert('hello ashoka')
  };




  // 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeclarationOpen=()=>{
    setDecOpen(true)
  }
  const handleDeclarationClose=()=>{
    setDecOpen(false);
  }

  // This function handles the checkbox click event
  const handleRulesClick = () => {
    if (!formData.rulesAccepted) {
      handleClickOpen();  // Open the popup if rules are not accepted yet
    } else {
      handleRulesChange({ target: { checked: false } });  // Uncheck if already checked
    }
  };

  const handleAcceptRules = () => {
    handleRulesChange({ target: { checked: true } });  // Automatically check the checkbox
    setOpen(false);  // Close the popup
  };





  const handleDeclarationClick = () => {
    if (!formData.declaration) {
      handleDeclarationOpen();  // Opens the dialog if not accepted
    } else {
      handleDeclaration({ target: { checked: false } });  // Unchecks if already accepted
    }
  };
  
  const handleDeclarationAcceptRules = () => {
    handleDeclaration({ target: { checked: true } });  // Automatically checks the box
    handleDeclarationClose();  // Closes the dialog
  };

  return (
    <>

    <FormControlLabel
        control={<Checkbox checked={formData.disease} onChange={handleDiseaseChange} />}
        label="Suffering from any disease"
      />
      {formData.disease && (
        <>
        <p className='text-lg  text-blue-600 font-bold font-serif'>Upload high quality Image in .jpg</p>
        <Button variant="contained" component="label" fullWidth>
          Attach Doctor’s Certificate
          <input type="file" accept=".jpg" hidden onChange={handleDiseasefile} />
        </Button>
        </>
      )}

     
          {/* Show the file name after file selection */}
          {formData.diseaseFile && (
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Selected File: {formData.diseaseFileName}
            </Typography>
          )}
      




      <FormControlLabel
        control={
          <Checkbox
            checked={formData.rulesAccepted}
            onClick={handleRulesClick} // Handle the checkbox click
          />
        }
        label="Accept Rules & Regulations"
      />



      {/* Popup for Rules & Regulations */}
      <Dialog  open={open} onClose={handleClose} PaperProps={{
          sx: {
            width: {
              xs: '90%', // for extra small screens
              sm: '80%', // for small screens
              md: '60%', // for medium screens
              lg: '50%', // for large screens
            },
            maxWidth: '100%', // ensures the width doesn't exceed 100%
            maxHeight: '90vh', // set maximum height to ensure it fits on the screen
           overflowY: 'auto', // allows scrolling if content overflows
          } // Set width here
        }}>
  <DialogTitle
   sx={{ 
    textAlign: 'center', // Center align text
    color: 'white',      // White text color
    backgroundColor: 'blue', // Blue background color
    // padding: '16px', // Optional padding
}}
  >Rules & Regulations</DialogTitle>
  <DialogContent
  >
    <DialogContentText >
            <div className="mt-4 p-4 border border-blue-300 rounded overflow-x-auto">
            <div 
             onContextMenu={(e) => e.preventDefault()}
            dangerouslySetInnerHTML={{ __html: declarations }} 
            />
            <div className='text-right'>
            <Button onClick={handleClose} color="secondary" variant="contained" className='m-2'>
              Close
            </Button>
            <Button onClick={handleAcceptRules} color="primary" variant="contained">
              Accept Rules
            </Button>
            </div>
          </div>
            
            

    </DialogContentText>
  </DialogContent>
  {/* <DialogActions>
    <Button onClick={handleClose} color="secondary" variant="contained">
      Close
    </Button>
    <Button onClick={handleAcceptRules} color="primary" variant="contained">
      Accept Rules
    </Button>
  </DialogActions> */}
      </Dialog>














     <FormControlLabel
      control={
        <Checkbox
          checked={formData.declaration}
          onClick={handleDeclarationClick} // Opens the dialog if not accepted yet
        />
      }
      label="Declarations"
    />


{/* //here active field will come...... */}


      {/* Popup for Rules & Regulations */}
      <Dialog open={decOpen} onClose={handleDeclarationClose}>
      <DialogTitle
       sx={{ 
        textAlign: 'center', // Center align text
        color: 'white',      // White text color
        backgroundColor: 'blue', // Blue background color
        // padding: '16px', // Optional padding
    }}
      >Declaration</DialogTitle>
      <DialogContent>
        <DialogContentText>
        <div className="mt-4 p-4 border border-blue-300 rounded overflow-x-auto">
            <div 
             onContextMenu={(e) => e.preventDefault()}
            dangerouslySetInnerHTML={{ __html: postedData }} 
            />
            <div className='text-right'>
            <Button onClick={handleDeclarationClose} color="secondary" variant="contained" className='m-2'>
              Close
            </Button>
            <Button onClick={handleDeclarationAcceptRules} color="primary" variant="contained">
              Accept Rules
            </Button>
            </div>
          </div>
        </DialogContentText>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleDeclarationClose} color="secondary" variant="contained">
          Close
        </Button>
        <Button onClick={handleDeclarationAcceptRules} color="primary" variant="contained">
          Accept Declaration
        </Button>
      </DialogActions> */}
    </Dialog>

    </>
  );
};

export default DiseaseAndRules;
