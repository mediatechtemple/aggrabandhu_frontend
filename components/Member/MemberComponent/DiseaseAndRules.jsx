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
        <Button variant="contained" component="label" fullWidth>
          Attach Doctor’s Certificate
          <input type="file" hidden onChange={handleDiseasefile} />
        </Button>
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
            {/* You can put your rules and regulations text here */}
            {/* <div>
            <h1>अग्रबंधु सेवार्थ संस्थान (ABSS) - आज का सहयोग, कल की सुरक्षा</h1>
            <h2>आइये जानते हैं, ABSS के बारे में क्या है ?</h2>
            <p>
                सच्चे समाजवाद के प्रणेता और महाभारत काल में जन्मे श्री श्री 1008 महाराजा अग्रसेन जी के संदेश: “एक ईट एक रुपया” से प्रेरणा लेकर 
                अग्रबंधु सेवार्थ संस्थान की स्थापना दिनांक: 03.10.2024 को अग्रबंधुओ के द्वारा सहयोग हेतु बनाई गई है। यह भारतवर्ष में अपनी 
                तरह का प्रथम संगठन होगा। अग्रबंधु सेवार्थ संस्थान आज के सभी अग्रबंधुओ के सामाजिक एवं आर्थिक रूप से सहयोग के लिए कार्य करेगा।
            </p>
            <p>
                महाराजा अग्रसेन जी के संदेश ‘एक ईट एक रुपया’ को साकार करने का हमारा भाव चरितार्थ करने के उद्देश्य से समाज में किसी 
                अग्रबंधु परिवार में मुख्य पालन कर्ता की असमय मृत्यु हो जाती है। परिवार में यदि उसके आश्रित बच्चे अबोध उम्र के हैं, इस 
                स्थिति में उसके परिवार के सामने अत्यंत चिंताजनक स्थिति उत्पन्न हो जाती है। समाज में जीवन यापन के लिए कोई सहारा नहीं 
                दिखाई देता। ऐसी स्थिति में संस्था (ABSS) के सभी सदस्य उस (मृतक) सदस्य के नॉमिनी को सम्मानजनक निर्धारित राशि नॉमिनी के 
                खाते में सीधे भेज कर सहयोग पहुंचाने का कार्य करेंगे। इस आर्थिक सहयोग से उस परिवार को अपने आगे का जीवन यापन में 
                उल्लेखनीय योगदान होगा एवं उसका घर सुचारू रूप से चलने हेतु सहायता होगी। संस्था (ABSS) का उद्देश्य परिवार को एक 
                सम्मानजनक सहयोग राशि प्रदान करना है। इसके लिए संस्था (ABSS) समय-समय पर आर्थिक सहयोग की जाने वाली राशि पर विचार 
                करेगी। इस संदर्भ में केंद्रीय समिति का निर्णय ही अंतिम एवं मान्य होगा जिसको चुनौती नहीं दी जा सकेगी।
            </p>
            <h2>नियामावली</h2>
            <ol>
                <li>
                    <strong>ABSS का सदस्य बनने के नियम:</strong>
                    <ul>
                        <li>भारतीय परिक्षेत्र का स्थायी निवासी अनिवार्य।</li>
                        <li>कोई भी अग्रबंधु महिला एवं पुरुष।</li>
                        <li>आयु 18-70 वर्ष के मध्य।</li>
                        <li>“सदस्य पंजीकरण” के समय गंभीर बीमारियों का उल्लेख आवश्यक।</li>
                    </ul>
                </li>
                <li>
                    <strong>ABSS से सहयोग प्राप्त करने के नियम:</strong>
                    <ul>
                        <li>“सदस्य पंजीकरण” के तुरन्त बाद ABSS के निर्देशों पर आर्थिक सहयोग करना अनिवार्य है।</li>
                        <li>“सदस्य पंजीकरण” से 90 दिन की प्रतिबंधित अवधि (लॉक इन पीरियड) रहेगी।</li>
                        <li>गंभीर बीमारी की स्थिति में प्रतिबंधित अवधि 2 वर्ष की होगी।</li>
                        <li>पंजीकरण फार्म में भरे गए नॉमिनी का नाम ही मान्य।</li>
                    </ul>
                </li>
                <li>
                    ABSS के कार्य व्यवस्था पर खर्च का शुल्क अनिवार्य नहीं है। सदस्य स्वेच्छा से व्यवस्था शुल्क ABSS के खाते में 
                    ₹100 वार्षिक जमा करा सकते हैं।
                </li>
                <li>
                    विस्तृत विवरण और अन्य नियम:
                    <ul>
                        <li>संस्था (ABSS) का सदस्य कोई भी अग्रबंधु महिला एवं पुरुष जिसकी आयु 18-70 वर्ष तक ही मान्य है।</li>
                        <li>अगर कोई बीमारी है तो उसकी घोषणा वेबसाइट अथवा App पर “सदस्य पंजीकरण” के समय देनी होगी।</li>
                        <li>ABSS द्वारा हेल्पलाइन नंबर: 7830-30-5040 सदस्यों की सुविधा हेतु जारी किया गया है।</li>
                        <li>सभी सदस्यों के लिए सहयोग पाने के लिए रजिस्ट्रेशन के दिनांक से 90 दिन की अमान्य अवधि (लॉक इन पीरियड) रहेगी।</li>
                    </ul>
                </li>
            </ol>
        </div>

        <div>
      <h1>Agrabandhu Sewarth Sansthan (ABSS)</h1>
      <p>
        Lets learn about what ABSS is. Inspired by the message of true socialism from Shri Shri 1008 Maharaja Agrasen Ji, who was born in the Mahabharata era, "One Brick, One Rupee", the Agrabandhu Sewarth Sansthan was established on Dated: 03.10.2024 to support the Agrabandhu community. This will be the first of its kind organization in India. ABSS will work for the social and economic support of all Agrabandhus today.
      </p>
      <p>
        Our goal is to bring Maharaja Agrasen Ji's message of "One Brick, One Rupee" to life. If the head of a family in the Agrabandhu community passes away prematurely, and the children are of a tender age, the family faces an extremely difficult and worrying situation. They may find no means of livelihood. In such cases, all ABSS members will provide support by directly transferring a respectable, predetermined amount into the nominees bank account. This financial aid will contribute significantly to the family's survival and help them continue running their household smoothly. The aim of ABSS is to offer a respectable financial support to the family. The central committee will periodically review the amount of financial aid to be given. The committee's decision will be final and cannot be challenged.
      </p>
      <h2>To join Agrabandhu Sewarth Sansthan</h2>
      <p>
        Members of the Agrabandhu community can voluntarily register through the organization's website at <a href="https://aggrabandhuss.org">aggrabandhuss.org</a> or through the Institutions Mobile App (Android Only) after agreeing to all terms and conditions. Membership will be free of cost.
      </p>

      <h3>Regulations</h3>
      <ol>
        <li>
          <strong>Rules for becoming a member of ABSS:</strong>
          <ul>
            <li>A. Permanent resident of the Indian territory is mandatory.</li>
            <li>B. Any adult male or female member.</li>
            <li>C. Age between 18 to 70 years.</li>
            <li>D. Mention of any serious illnesses is required at the time of "Member Registration."</li>
          </ul>
        </li>
        <li>
          <strong>Rules for receiving support from ABSS:</strong>
          <ul>
            <li>a) It is mandatory to provide financial support as per ABSS's instructions immediately after "Member Registration."</li>
            <li>b) There will be a 90-day lock-in period after "Member Registration." In case of missed, discontinued, or partial financial support, the lock-in period will reset to 90 days from the date the support is resumed.</li>
            <li>c) In the case of a serious illness, the lock-in period will be extended to 2 years.</li>
            <li>d) Only the nominee mentioned in the registration form will be considered valid.</li>
          </ul>
        </li>
        <li>
          There is no mandatory fee for ABSS's operational expenses. Members can voluntarily contribute an annual administrative fee of ₹100 to ABSS's official bank account. This helps cover the organization's operational costs.
        </li>
      </ol>

      <h3>Detailed Guidelines and Additional Rules:</h3>
      <ol>
        <li>
          <strong>Membership Conditions:</strong>
          <p>Only Agrabandhu males and females aged 18 to 70 years are eligible for ABSS membership. At the time of joining ABSS, members must not have any serious illnesses, and any existing illness must be disclosed during "Member Registration" via the website or app. Failure to disclose a serious illness will result in automatic termination or invalidation of membership. If an undisclosed illness is discovered later, the nominee will not be entitled to any financial support from ABSS in the event of the member's death.</p>
        </li>
        <li>
          <strong>Registration and Communication:</strong>
          <p>To join as “ABSS” Member, it is mandatory to complete the registration form with the required information. ABSS has also established an official Whatsapp Channel/Telegram group/Facebook Page and Instagram Id where important information, updates, and instructions regarding cooperation, rules, and decisions are shared. Members are expected to visit and check the mentioned media platforms at least twice a week to stay informed. If a member fails to check the same regularly and misses relevant updates, they will be held responsible. However, ABSS also attempts to disseminate/broadcast important information through other social media platforms and local teams.</p>
        </li>
        <li>
          <strong>Helpline:</strong>
          <p>ABSS has provided a helpline number 7830-30-5040, for members' convenience. Members can communicate via call or WhatsApp to share or receive information.</p>
        </li>
        <li>
          <strong>Lock-in Period:</strong>
          <p>All ABSS members will be subject to a 90-day lock-in period from the date of registration. If a member joins ABSS on January 1 and passes away between January 1 and March 31, the nominee will not be eligible for financial support. If the death occurs after the 90-day period (i.e., from April 1 onward, the nominee will be entitled to receive financial assistance. In other words, if a member dies within the first 90 days of membership, no financial aid will be provided to the nominee.</p>
        </li>
        <li>
          <strong>Rule Modifications:</strong>
          <p>ABSS reserves the right to amend or revise its rules as necessary. Members or nominees cannot challenge these changes in any way. If a member or nominee disputes these changes, their membership and eligibility for financial assistance will be automatically terminated.</p>
        </li>
        <li>
          <strong>Members' Responsibility:</strong>
          <p>After becoming a member of ABSS, it is the ethical responsibility of all members to comply with ABSS's financial contribution guidelines in the incident/event of a member's death. If a member stops contributing financially, they will lose their legal membership status. To regain legal membership, they must resume contributions, and the 90-day lock-in period will apply again. All members are expected not to attempt to delay or withhold contributions.</p>
        </li>
        <li>
          <strong>Conflict of Interest:</strong>
          <p>If a member of ABSS joins or promotes another similar organization, their membership in ABSS will be automatically terminated, and their nominee will not be eligible for any financial benefits. Furthermore, members must not engage in any form of misconduct, threats, or harassment toward ABSS officials. Violating these rules will result in termination of membership.</p>
        </li>
        <li>
          <strong>Serious Illness:</strong>
          <p>ABSS expects all members to accurately record any serious illness in their profile. If a serious illness is not recorded for some reason, it will be determined at the time of death. If the cause of death is due to a serious illness, it will be considered as such, regardless of whether it was documented. The nature of the illness at the time of joining will not be ABSS's concern. For example, if a member joins ABSS with kidney failure, a two-year lock-in period will apply. If the member passes away six months later due to kidney failure, no financial aid will be provided. However, if the death is due to an accident, financial assistance will be granted. Serious illnesses include cancer, heart attack, kidney failure, liver failure, brain hemorrhage, or any illness listed by the Indian Medical Association.</p>
        </li>
        <li>
          <strong>Decision on Financial Aid:</strong>
          <p>ABSS officials will make a unanimous decision on providing financial aid to the nominee of a deceased member. In case of any dispute, ABSS reserves the right to conduct inspections or investigations. No member or nominee may file a legal claim in court for financial aid; they must seek assistance from ABSS on ethical grounds.</p>
        </li>
        <li>
          <strong>Nominee Recognition:</strong>
          <p>ABSS will only recognize the nominee listed on the deceased member's registration form. If there are two nominees, the financial assistance will be divided equally (50-50) ratio. In case of disputes regarding the nominee, the decision of the legal heirs or a court will be final. If false allegations or misinformation are spread against ABSS by a beneficiary or family member, the aid will be revoked and allocated to another deceased member's family. ABSS also reserves the right to take legal action in such cases.</p>
        </li>
        <li>
          <strong>Overpayment:</strong>
          <p>If an excess amount is mistakenly transferred to a nominee’s account, the overpaid sum must be returned upon request with proper evidence.</p>
        </li>
        <li>
          <strong>Financial Contribution Records:</strong>
          <p>All members must upload proof of financial contributions to the ABSS website after making their donation. Failure to upload the receipt will result in ineligibility for financial support, as it is mandatory to confirm the legal status of the contribution.</p>
        </li>
        <li>
          <strong>Financial Support Amount:</strong>
          <p>The amount of financial support will be determined based on the total number of registered members at the time of the member's death. If the number of members reaches 10,000, the financial support amount will be ₹10,000. Similarly, for 50,000 members, the amount will be ₹50,000, and for 1,00,000 members, it will be ₹1,00,000.</p>
        </li>
      </ol>

      <h3>Tagline</h3>
      <p><strong>Today's Support, Tomorrow's Assurance:</strong> ABSS believes in providing immediate assistance to families facing unexpected crises, ensuring they do not succumb to despair. The long-term impact of this support fosters stability and hope, equipping families to rebuild and face future challenges confidently.</p>
    </div> */}

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
