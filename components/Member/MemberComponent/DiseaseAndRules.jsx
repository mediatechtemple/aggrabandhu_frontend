import React, { useState } from 'react';
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
      <Dialog open={open} onClose={handleClose}  PaperProps={{
          sx: { width: '1000px', maxWidth: '100%' }  // Set width here
        }}>
  <DialogTitle>Rules & Regulations</DialogTitle>
  <DialogContent>
    <DialogContentText>
  <iframe
              src="/rules_regulation/Rule & Regulation.pdf"
              width="100%"
              height="400px"
              className="border-2 border-gray-300"
              title="PDF Viewer"
            ></iframe>

    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="secondary" variant="contained">
      Close
    </Button>
    <Button onClick={handleAcceptRules} color="primary" variant="contained">
      Accept Rules
    </Button>
  </DialogActions>
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
      <DialogTitle>Declaration</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* Declaration text in Hindi and English */}
          अग्रबंधु सेवार्थ संस्थान (ABSS) -आज का सहयोग, कल की सुरक्षास्व-घोषणा
          मैंने डोनर पंजीकरण से पहले संस्थान की वेबसाइट पर ABSS के सभी नियम और विनियम पढ़ लिए हैं और मैं उन नियमों से सहमत हूँ। मैं भविष्य में ABSS के अद्यतन नवीनतम नियमों से खुद को अपडेट रखूँगा और उनसे सहमत रहूँगा। मैं और मेरा परिवार ABSS पर कभी भी नियमों से परे किसी भी लाभ के लिए दबाव नहीं बनाएंगे। मैं इस बात पर अपनी सहमति देता हूँ कि मुझे या मेरे परिवार को केवल उन्हीं लाभों का हक मिलेगा जो नियमों के अंतर्गत आते हैं। मैं और मेरा परिवार भविष्य में किसी भी प्रकार का न्यायिक या कानूनी विवाद दायर नहीं करेंगे।
          Self-Declaration
          I have read and understood all the rules and regulations of ABSS on the institutions website before registering as a donor, and I agree with the rules. I will keep myself updated with the latest rules of ABSS in the future and will agree to them as well. My family and I will never exert any pressure on ABSS for any benefits beyond what is stipulated by the rules. I give my consent that any benefits for me or my family will be granted only if they fall within the rules. My family and I will not pursue any judicial or legal disputes in the future

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeclarationClose} color="secondary" variant="contained">
          Close
        </Button>
        <Button onClick={handleDeclarationAcceptRules} color="primary" variant="contained">
          Accept Declaration
        </Button>
      </DialogActions>
    </Dialog>

    </>
  );
};

export default DiseaseAndRules;
