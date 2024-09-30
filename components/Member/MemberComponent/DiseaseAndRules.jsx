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
        <p className='text-lg text-blue-950'>Upload high quality Image in jpg</p>
        <Button variant="contained" component="label" fullWidth>
          Attach Doctor’s Certificate
          <input type="file" hidden onChange={handleDiseasefile} />
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
      <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Rules & Regulations</DialogTitle>
  <DialogContent>
    <DialogContentText>
    अग्रबंधु सेवार्थ संस्थान (ABSS) - आज का सहयोग, कल की सुरक्षा
आइये जानते हैं, ABSS क्या है?

सच्चे समाजवाद के प्रणेता श्री श्री 1008 महाराजा अग्रसेन जी के संदेश &quot;एक ईंट एक रुपया&quot; से प्रेरित होकर, अग्रबंधु सेवार्थ संस्थान (ABSS) की स्थापना 03.10.2024 को अग्रबंधुओं के सहयोग हेतु की गई। यह भारत में अपनी तरह का पहला संगठन है। ABSS का मुख्य उद्देश्य सभी अग्रबंधुओं को सामाजिक और आर्थिक रूप से सहयोग प्रदान करना है।

उद्देश्य
महाराजा अग्रसेन जी के संदेश &quot;एक ईंट एक रुपया&quot; को साकार करते हुए, यदि किसी अग्रबंधु परिवार में मुख्य पालनकर्ता की असमय मृत्यु हो जाती है और आश्रित बच्चे अबोध उम्र के होते हैं, तो ऐसी स्थिति में संस्था (ABSS) द्वारा मृतक सदस्य के नॉमिनी को आर्थिक सहयोग प्रदान किया जाएगा। यह सहयोग उनके परिवार को आगे जीवन यापन में सहायता करेगा।

संस्था (ABSS) का मुख्य उद्देश्य ऐसे परिवारों को सम्मानजनक सहयोग राशि प्रदान करना है। समय-समय पर आर्थिक सहयोग राशि पर विचार केंद्रीय समिति द्वारा किया जाएगा, जिसका निर्णय अंतिम और मान्य होगा।

सदस्यता
अग्रबंधु सेवार्थ संस्थान से जुड़ने के लिए निम्नलिखित शर्तें हैं:

भारतीय नागरिक होना अनिवार्य।
महिला या पुरुष अग्रबंधु।
आयु 18 से 70 वर्ष के बीच होनी चाहिए।
पंजीकरण के समय गंभीर बीमारियों का उल्लेख आवश्यक है।
सदस्यता निशुल्क है और कोई भी अग्रबंधु संस्थान की वेबसाइट या मोबाइल ऐप के माध्यम से पंजीकरण कर सकता है।

नियम एवं शर्तें
सहयोग प्राप्त करने के नियम:

पंजीकरण के तुरंत बाद आर्थिक सहयोग करना अनिवार्य है।
90 दिन की प्रतिबंधित अवधि (लॉक-इन पीरियड) लागू होगी, जिसमें सहयोग राशि का पात्रता नहीं होगी।
गंभीर बीमारियों की स्थिति में यह अवधि 2 वर्ष की होगी।
नॉमिनी का नाम पंजीकरण फार्म में पहले से दर्ज होना आवश्यक है।
कार्य व्यवस्था शुल्क:

ABSS के कार्यों के लिए वार्षिक ₹100 शुल्क स्वेच्छा से जमा कर सकते हैं, जो संस्था के खर्चों में मदद करता है।
टेलीग्राम ग्रुप:

सभी सदस्यों को समय-समय पर टेलीग्राम ग्रुप पर सूचनाएं प्राप्त करनी अनिवार्य है। ग्रुप को सप्ताह में कम से कम 2 बार देखना अनिवार्य है।
हेल्पलाइन:

हेल्पलाइन नंबर: 7830-30-5040, जिसपर कॉल या व्हाट्सएप के माध्यम से जानकारी प्राप्त की जा सकती है।
90 दिन की लॉक-इन अवधि:

पंजीकरण के दिन से 90 दिन की लॉक-इन अवधि रहेगी, जिसमें मृत्यु की स्थिति में आर्थिक सहयोग प्रदान नहीं किया जाएगा।
सदस्यता समाप्ति:

यदि कोई सदस्य अन्य समान संस्था से जुड़ता है, तो उसकी सदस्यता स्वतः समाप्त मानी जाएगी।
गंभीर बीमारियों की घोषणा:

सदस्यता लेते समय गंभीर बीमारियों का उल्लेख करना आवश्यक है। बीमारी छिपाने पर सदस्यता समाप्त हो जाएगी।
नॉमिनी संबंधी नियम:

विवाद की स्थिति में वारिसान या न्यायालय का निर्णय अंतिम और मान्य होगा।
आर्थिक सहयोग का प्रमाण:

सहयोग राशि प्राप्त करने के लिए सहयोग के बाद रसीद अपलोड करना अनिवार्य है।
अन्य नियम:

संस्था (ABSS) नियमों में संशोधन करने का अधिकार रखती है, जिसका निर्णय अंतिम होगा। <br/>

Agrabandhu Sewarth Sansthan (ABSS) Overview
Establishment and Inspiration: Agrabandhu Sewarth Sansthan (ABSS) was founded on October 3, 2024, inspired by the teachings of Shri Shri 1008 Maharaja Agrasen Ji, who emphasized the principle of &quot;One Brick, One Rupee.&quot; This organization is the first of its kind in India, dedicated to supporting the Agrabandhu community socially and economically.

Objectives and Support Mechanism
ABSS aims to implement Maharaja Agrasen Ji&quot;s philosophy by providing immediate financial assistance to families in distress, especially those who lose their primary breadwinner unexpectedly. If a member passes away and has dependent children, ABSS will ensure that financial aid is transferred directly to the family&quot;s bank account, helping them to sustain their household during difficult times.

Membership Criteria
To become a member of ABSS, individuals must meet the following criteria:

Eligibility:

Permanent residents of India.
Adults aged between 18 to 70 years.
No serious illnesses must be disclosed during registration.
Registration Process:

Membership is free and can be obtained through the ABSS website or mobile app.
Members must agree to the organizations terms and conditions.
Key Regulations
Support Rules:

Members must adhere to financial contribution guidelines.
A 90-day lock-in period applies after registration, during which financial support is not available if a member passes away.
Financial Contributions:

While there are no mandatory fees, members can voluntarily contribute an annual fee of ₹100 to support operational costs.
Communication and Updates:

Members are encouraged to engage with ABSS through official social media channels and must regularly check for updates.
Helpline Availability:

A helpline (7830-30-5040) is available for members to seek assistance and information.
Important Considerations
Lock-in Period:

The initial 90 days post-registration is crucial; deaths occurring within this time do not qualify for financial assistance.
Serious Illness Policy:

If a member has a serious illness, a longer lock-in period of 2 years applies.
Conflict of Interest:

Membership will be revoked if a member joins a similar organization.
Contribution Guidelines
Members must maintain their financial contributions to remain eligible for support. Specific rules apply to reinstating membership after lapses in contributions.

Tagline Significance
The tagline, &quot;Today&quot;s Support, Tomorrow&quot;s Assurance,&quot; encapsulates the essence of ABSS:

Today&quot;s Support: Represents immediate assistance during crises.
Tomorrow&quot;s Assurance: Emphasizes the long-term security and stability that such support fosters in the community.


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
