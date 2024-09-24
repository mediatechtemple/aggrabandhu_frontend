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
            अग्रबंधु सेवार्थ संस्थान (ABSS) -आज का सहयोग, कल की सुरक्षा
आइये जानते हैं, ABSS के बारे में क्या है ?
सच्चे समाजवाद के प्रणेता और महाभारत काल में जन्मे श्री श्री 1008 महाराजा अग्रसेन जी के संदेश: “एक ईट एक रुपया” से प्रेरणा लेकर अग्रबंधु सेवार्थ संस्थान की स्थापना दिनांक: 03.10.2024 को अग्रबंधुओ के द्वारा सहयोग हेतु बनाई गई है। यह भारतवर्ष में अपनी तरह का प्रथम संगठन होगा। अग्रबंधु सेवार्थ संस्थान आज के सभी अग्रबंधुओ के सामाजिक एवं आर्थिक रूप से सहयोग के लिए कार्य करेगा।
महाराजा अग्रसेन जी के संदेश ‘एक ईट एक रुपया’ को साकार करने का हमारा भाव चरितार्थ करने के उद्देश्य से समाज में किसी अग्रबंधु परिवार में मुख्य पालन कर्ता की असमय मृत्यु हो जाती है l परिवार में यदि उसके आश्रित बच्चे अबोध उम्र के है, इस स्थिति में उसके परिवार के सामने अत्यंत चिंताजनक स्थिति उत्पन्न हो जाती है l समाज में जीवन यापन के लिए कोई सहारा नहीं दिखाई देता। ऐसी स्थिति में संस्था (ABSS) के सभी सदस्य उस (मृतक) सदस्य के नॉमिनी को सम्मानजनक निर्धारित राशि नॉमिनी के खाते में सीधे भेज कर सहयोग पहुंचाने का कार्य करेंगे। इस आर्थिक सहयोग से उस परिवार को अपने आगे का जीवन यापन में उल्लेखनीय योगदान होगा एवं उसका घर सुचारू रूप से चलने हेतु सहायता होगी l संस्था (ABSS) का उद्देश्य परिवार को एक सम्मानजनक सहयोग राशि प्रदान करना है l इसके लिए संस्था (ABSS) समय-समय पर आर्थिक सहयोग की जाने वाली राशि पर विचार करेगी l इस संदर्भ मे केंद्रीय समिति का निर्णय ही अंतिम एवं मान्य होगा जिसको चुनौती नहीं दी जा सकेगी।
अग्रबंधु सेवार्थ संस्थान से जुड़ने के लिए अग्रबंधु स्वेच्छा से उक्त संस्थान के सभी नियमों एवं शर्तों की सहमति के उपरांत, संस्थान की वेबसाइट aggrabandhuss.org के माध्यम से अथवा अपने मोबाइल पर संस्थान के App के माध्यम से रजिस्ट्रेशन कर इसका सदस्य बन सकते हैं l सदस्यता निशुल्क होगीl
नियामावली
1.	ABSS का सदस्य बनने के नियम:  
a)	भारतीय परिक्षेत्र का स्थायी निवासी अनिवार्य।
b)	कोई भी अग्रबंधु महिला एवं पुरुष।
c)	आयु 18- 70 वर्ष के मध्य। 
d)	“सदस्य पंजीकरण” के समय गंभीर बीमारियों का उल्लेख आवश्यक।
2.	ABSS से सहयोग प्राप्त करने के नियम: 
a)	“सदस्य पंजीकरण” के तुरन्त बाद ABSS के निर्देशों पर आर्थिक सहयोग करना अनिवार्य है।
b)	“सदस्य पंजीकरण” से 90 दिन की प्रतिबंधित अवधि (लॉक इन पीरियड) रहेगी। सहयोग छूट जाने/बंद कर देने/आंशिक सहयोग करने की स्थिति में, सहयोग पुन: शुरू करने की तिथि से पुन: 90 दिन का प्रतिबंधित अवधि (Lock-in-period) रहेगी।
c)	गंभीर बीमारी की स्थिति मे प्रतिबंधित अवधि 2 वर्ष की होगी।
d)	पंजीकरण फार्म में भरे गए नॉमिनी का नाम ही मान्य। 
3.	ABSS के कार्य व्यवस्था पर खर्च का शुल्क अनिवार्य नहीं है l सदस्य स्वेच्छा से व्यवस्था शुल्क ABSS के खाते में ₹100 वार्षिक जमा करा सकते हैं l यह ABSS पर होने वाले खर्चों की पूर्ति प्रदान करता है l 
विस्तृत विवरण और अन्य नियम
4.	संस्था (ABSS) का सदस्य कोई भी अग्रबंधु महिला एवं पुरुष जिसकी आयु 18- 70 वर्ष तक ही मान्य है, संस्था (ABSS) का सदस्य बनते समय कोई भी गंभीर बीमारी नहीं होनी चाहिए, यदि कोई बीमारी है तो उसकी घोषणा वेबसाइट अथवा App पर “सदस्य पंजीकरण” के समय देनी होगी । बीमारी को उल्लेख न करने की दशा में उसकी सदस्यता स्वत: ही समाप्त हो जायेगी अथवा अमान्य हो जायेगीl यदि किसी सदस्य की बीमारी का (उल्लेख न करने की दशा में) पता बाद में चलता है, तो ऐसी स्थिति में किसी भी अनहोनी की दशा में संस्था (ABSS) उसके नॉमिनी को किसी भी तरह का आर्थिक सहयोग प्रदान नहीं करेगी। 
5.	अग्रबंधु सेवार्थ संस्थान से जुड़ने हेतु आवश्यक सूचना संबंधी फ़ार्म भरकर रजिस्ट्रेशन किया जाना अनिवार्य है, साथ ही ABSS का टेलीग्राम ग्रुप पर आधिकारिक ग्रुप बनाया गया है, जिसपर समय समय पर सहयोग या नियम या अन्य महत्वपूर्ण सूचनाएं प्रदान की जाती रहती हैं।  इसके साथ ही आवश्यकता पड़ने पर महत्वपूर्ण निर्णय लेने संबंधी पोल या विचार सुझाव आदि के दृष्टिगत ग्रुप के सदस्यों को भी विचार रखने और पोल में भाग लेने का अवसर दिया जाता है।  यही कारण है कि ABSS का सदस्य बनने के साथ ही महत्वपूर्ण सूचनाओं से अपडेट रहने हेतु टेलीग्राम ग्रुप को सप्ताह में कम से कम 2 बार देखने और अपडेट रहने की भी बाध्यता रखी गयी है। कोई भी सदस्य अगर टेलीग्राम ग्रुप नियमतः नहीं देखता और संबंधित सूचनाएं यदि नहीं प्राप्त कर पाता तो संबंधित अग्रबंधु /सदस्य स्वयं जिम्मेदार होगा। फिर भी प्रयास किया जाता है कि अन्य सोशल मिडिया प्लेटफार्म तथा जनपदीय टीम के माध्यम से भी आवश्यक सूचनाओं का प्रसारण किया जाता है।
6.	ABSS द्वारा हेल्पलाइन नंबर: 7830-30-5040 सदस्यों की सुविधा हेतु जारी किया गया है, जिसपर कॉल  /व्हाट्सएप्प के माध्यम से जानकारी का आदान प्रदान किया जा सकता है। कोई भी सदस्य इस नम्बर पर कॉल या मैसेज करके सूचना दे/ले सकता है।
7.	संस्था (ABSS) के सभी सदस्यों के लिए सहयोग पाने के लिए रजिस्ट्रेशन के दिनांक से 90 दिन की अमान्य अवधि (लॉक इन पीरियड) रहेगी, तात्पर्य अगर कोई सदस्य 1 जनवरी को संस्था (ABSS) का सदस्य बनता है एवं उसकी मृत्यु 31 मार्च के बीच होती है तो उस सदस्य का नॉमिनी संस्था (ABSS) के सदस्यों से सहयोग राशि लेने के लिए योग्य नहीं होगा। अगर उस सदस्य की मृत्यु 1 अप्रैल को होती है, इस स्थिति में उस सदस्य के परिवार का नॉमिनी आर्थिक सहयोग प्राप्त करने का अधिकारी होगा l अर्थात सदस्य बनने के 90 दिन के अंदर मृत्यु होने की दशा में परिवार के नॉमिनी को किसी भी प्रकार का आर्थिक सहयोग नहीं किया जा सकेगा।
8.	अनुभव एवं आवश्यकता को देखते हुए संस्था (ABSS) को किसी भी नियमों में संशोधन अथवा परिवर्तन करने का अधिकार होगा। इस प्रक्रिया को किसी भी प्रकार से कही भी चुनौती देने का अधिकार किसी भी सदस्य/नॉमिनी को नहीं होगा। यदि सदस्य अथवा नॉमिनी इस प्रक्रिया को कहीं भी चुनौती देगा तो उसकी सदस्यता एवं आर्थिक सहयोग पाने का अधिकार स्वतः ही संस्था (ABSS) से उसी दिन से समाप्त हो जाएगा l
9.	संस्था (ABSS) का सदस्य बनने के बाद सभी सदस्यों की यह नैतिक जिम्मेदारी होगी की मृतक परिवार के आर्थिक सहयोग के लिए संस्था (ABSS) द्वारा जारी निर्देशों का पालन करना अनिवार्य होगा। अगर कोई सदस्य बीच में आर्थिक सहयोग देना बंद कर देता है तो ऐसी स्थिति में वह वैधानिक सदस्य नहीं होगा। वैधानिकता प्राप्त करने के लिए उसको सहयोग पुन: शुरू करने के उपरांत पुन: 90 दिन का अमान्य अवधि (Lock-in-period) उस पर लागू होगी। सभी सदस्यों से उम्मीद की जाती है कि किसी भी तरह से सहयोग राशि को रोकने का प्रयास नहीं करेंगे।
10.	अगर संस्था (ABSS) से जुड़ा कोई सदस्य भविष्य में अन्य किसी ऐसी ही संस्था का सदस्य बनता है या प्रचार प्रसार करता है, तो उसकी सदस्यता स्वतः ही समाप्त मानी जाएगी l ऐसा सदस्य पूर्व में किए गए आर्थिक सहयोग के बदले उसके नॉमिनी को किसी भी प्रकार के लाभ का दावा करने का अधिकार नहीं होगा l संस्था (ABSS)  के किसी भी पदाधिकारी के साथ अभद्रता,डराने,धमकाने वाली कार्यवाही भी नहीं करेगा। नियमों का उल्लंघन करने पर ऐसे सदस्य की सदस्यता भी समाप्त कर दी जाएगी l
आप बिना किसी अन्य टीम का हिस्सा बने भी किसी का भी सहयोग करने के लिए स्वतंत्र है। किंतु लाभ किसी एक मंच से ही उचित है। वैसे भी ABSS मदद का मंच है लाभ का नही है।
11.	गंभीर बीमारी की स्थिति में संस्था (ABSS) यह अपेक्षा करती है, कि सभी सदस्य अपनी गंभीर बीमारी अपनी प्रोफाइल में दर्ज करेंगे अगर किसी कारण से बीमारी प्रोफाइल में दर्ज नहीं हुई है, तो इसका निर्धारण मृत्यु के आधार पर किया जाएगा। अगर मृत्यु का कारण गंभीर बीमारी है, तो उसे बीमारी में शामिल किया जाएगा, भले ही प्रोफाइल में प्रदर्शित न किया गया हो साथ ही संस्था ABSS से जुड़ते समय बीमारी की जानकारी थी या नहीं थी यह संस्था (ABSS) का विषय नहीं होगा l ऐसे मामलों में मृत्यु का कारण संस्था (ABSS) के आधार पर निर्णय लिया जाएगा। उदाहरण:  यदि किसी सदस्य की किडनी खराब है वह संस्था (ABSS) से जुड़ते हैं तो उसके लिए प्रतिबंधित अवधि 2 वर्ष की होगी l यदि संस्था (ABSS) से जुड़ने के 6 महीने बाद उसकी मृत्यु हो जाती है और वह अवैधानिक होगा उसे किसी भी प्रकार की धनराशि का सहयोग नहीं किया जाएगा l अगर उसकी मृत्यु एक्सीडेंट के द्वारा किसी दुर्घटना से हुई है तो उसे वैधानिक माना जाएगा क्यूंकि मृत्यु बीमारी से न होकर दुर्घटना से हुई है। गंभीर बीमारियां कैंसर, हार्ट अटैक, किडनी, लिवर, ब्रेनहेमरेज अथवा इंडियन मेडिकल एसोसिएशन द्वारा जारी गंभीर बीमारी की लिस्ट से किया जाएगा l
12.	अग्रबंधु सेवार्थ संस्थान ट्रस्ट के पदाधिकारी मृतक के नोमिनी को आर्थिक सहयोग के लिए सर्वसम्मति से निर्णय लेंगे l वैधानिकता के किसी भी प्रकार के मामले में जहां उचित समझेगी अपने स्तर से निरीक्षण/परिक्षण करlने को स्वतंत्र होगीl कोई भी सदस्य अथवा नॉमिनी आर्थिक सहयोग प्राप्त करने हेतु कानूनी दावा अथवा अधिकार किसी भी कोर्ट में नहीं कर सकेगा, बल्कि संस्था (ABSS) से नैतिक रूप से सहयोग प्राप्त करने का प्रयास करेगा l
13.	संस्था (ABSS) दिवंगत सदस्यों के पंजीकरण फार्म में भरे गए नॉमिनी के नाम को ही मान्यता देगी। दो नॉमिनी होने की स्थिति में यह सहयोग राशि 50-50 परसेंट के अनुपात में दी जा सकेगी जिस पर लाभार्थी द्वारा किसी भी प्रकार का कानूनी अथवा गैर कानूनी कदम नहीं उठाया जा सकेगा l नॉमिनी के नाम के संबंध में विवाद की स्थिति में वारिसान अथवा माननीय न्यायालय का निर्णय ही अंतिम और मान्य होगा। लाभार्थी या उसके परिवार द्वारा संस्था(ABSS) के प्रति मिथ्या आरोप लगाने भ्रम फैलाने, दुष्प्रचार करने, दुर्व्यवहार करने पर सहयोग की राशि वापस करवा कर किसी अन्य दिवंगत सदस्य के परिवार को दे दी जाएगी l ऐसे मामले में संस्था(ABSS) कानूनी कार्रवाई करने के लिए भी स्वतंत्र होगी एवं संस्था (ABSS) का निर्णय ही अंतिम निर्णय होगा, जो सभी को मान्य होगा।
14.	किसी अग्रबंधु द्वारा भूलवश अधिक राशि किसी सहयोग हो रहे या हो चुके नॉमिनी के खाते में भेज दी जाती है l तो सहयोग के दौरान या बाद में अग्रबंधु द्वारा उचित साक्ष्य प्रस्तुत करने पर नॉमिनी द्वारा प्राप्त अधिक धनराशि उस अग्रबंधु के खाते में वापस करनी होगी l
15.	वर्तमान समय में आर्थिक सहयोग प्राप्त करने हेतु सभी सदस्यो को (सदस्य बनने के बाद) संस्था (ABSS) के निर्देशों पर आर्थिक सहयोग करना अनिवार्य है l (समस्त सहयोग करने के बाद,) संस्था (ABSS) की वेबसाइट पर सहयोग रसीद अपलोड करना अनिवार्य है l बिना सहयोग किया या सहयोग करने के बाद रसीद अपलोड ना कर पाने की स्थिति में सहयोग प्राप्त करने हेतु अर्ह: नहीं माना जा सकेगा क्योंकि वैधानिकता की पुष्टि के लिए सहयोग के बाद रसीद अपलोड अनिवार्य है l
16.	सुसाइड या किसी विवादित केस या अन्य कोई केस जो संज्ञान में आने के बाद संस्था (ABSS)  द्वारा जांच पड़ताल करके परिस्थिति से अवगत होने के बाद निर्णय लेने का अधिकार संस्था (ABSS)  का होगा l उपरोक्त प्रकरणों में किसी विशेष परिस्थिति जैसे स्थलीय निरीक्षण का ना हो पाना, कुछ तकनीकी कमी आदि मामलों में संस्था(ABSS) सहयोग के क्रम का निर्णय अपने अधिकार से ले सकेंगी l कोई भी व्यक्ति किसी भी प्रकार की कानूनी कार्यवाही नहीं कर सकेगा ना ही मान्य की जाएगीl
17.	यदि किसी सदस्य द्वारा सदस्य बनने के बाद सहयोग नहीं किया गया या बीच में किसी का सहयोग नहीं किया गया तो ऐसी स्थिति में वह वैधानिक सदस्य नहीं होगा। ऐसे सदस्य निम्नलिखित नियमो के तहत अपनी वैधानिकता सक्रिय कर सकेंगे-
A.	ऐसे सदस्य जो जुड़ने के उपरांत लगातार सहयोग करते आ रहे हैं, अगर दस सहयोग से पहले (यानी 90% वाली छूट से पूर्व) कोई सहयोग ब्रेक होता है, तो वैधानिकता समाप्त हो जाएगी किंतु एक बार वैधानिकता समाप्त होने पर लगातार तीन सहयोग करके सदस्यता पुनः बहाल की जा सकेगी। 3सहयोग पूरा होने तक वह सदस्य सहयोग प्राप्त करने हेतु वैध नही होगा, तीन सहयोग पूरा करते ही वह वैधानिक सदस्य हो जाएगा। लेकिन यह एक सदस्य को केवल एक ही बार ऐसा अवसर दिया जायेगा। यहाँ पर यह भी ध्यान देने योग्य होगा कि बीच मे केवल दो सहयोग ही अधिकतम ब्रेक हुआ हो। इससे अधिक सहयोग ब्रेक होने की दशा में नियम (17.B) लागू होगा। सदस्य द्वारा दस सहयोग कर देने पर 90% वाला नियम प्रभावी होगा, साथ ही 90% के नियमो के अतिरिक्त ब्रेक होने की स्थिति में नियम (17.A) और (17.B) परिस्थितियों के अनुसार लागू होगा।
B.	रजिस्ट्रेशन करने के बाद सहयोग न करने वाले सदस्य यदि स्वतः क्रियाशील होकर वैधानिक सदस्य बनकर सहयोग करने की स्थिति में एवं बीच मे दो से अधिक सहयोग ब्रेक होने की स्थिति में, पांच सहयोग करने के बाद ही सदस्यता बहाल मानी जायेगी, जब तक पांच सहयोग नही किये जाते, बीच मे मृत्यु होने की स्थिति में वह सदस्य अवैधानिक होगा और सहयोग नही प्राप्त कर सकेगा। कोर टीम की विशेष संस्तुति पर लगातार पांच  सहयोग करने पर ही सदस्यता बहाल की जा सकेगी। ऐसे मामले में तीन माह का लॉक इन पीरियड भी लागू होगा। (यह जरूरी नही की तीन माह का लॉक इन पीरियड पूरा होने तक पांच सहयोग करने का अवसर आये, तीन माह के लॉक इन पीरियड पूरा करने के साथ-साथ पांच सहयोग पूरा करना अनिवार्य होगा।)
C.	जो सदस्य किसी कारण से सहयोग नही कर पाए, उनको हमेशा के लिए निकालने से अच्छा एक मौका देना है । यदि कोई नया रजिस्ट्रेशन करता है, तब भी लॉकिंग पीरियड होती है। उसी प्रकार जो अब तक सहयोग नही किया है और अब सहयोग करना चाह रहे है तो लगातार पांच सहयोग और उनके लिए तीन माह का लॉकिग पीरियड होगा।
D.	किसी अन्य व्यस्तता, पारिवारिक व्यस्तता, समारोह, कार्यक्रम आदि अन्य स्थितियों स्वयं या पारिवारिक आदि की स्थिति में सहयोग छूट जाने की दशा में दावा मान्य नही होगा, उपरोक्त परिस्थिति मे नियम (17.C) लागू होगा।
E.	90% सहयोग की व्याख्या– अगर किसी ऐसे सदस्य की मृत्यु होती है जो की टीम से लंबे समय से जुड़ा था किंतु कुछ सहयोग के कारण अवैधानिक हो रहा है तो उस समय देखा जायेगा की मृत्यु की तिथि से दो वर्ष पूर्व के बीच हुए कुल सहयोग का अगर 90% सहयोग किया है तो उसे 90% सहयोग के दायरे के वैधानिक मानते हुए सहयोग किया जाएगा।
F.	यदि कोई अग्रबंधु / सदस्य पूर्व में सभी सहयोग कर रहा था और वैधानिक सदस्य था किंतु गतिमान सहयोग के दौरान (सहयोग शुरू होने की तिथि से सहयोग खत्म होने तक) सहयोग तिथि समाप्त होने से पूर्व सहयोग नही किया रहता और उसी दौरान उसकी दुःखद मृत्यु हो जाती है तो वह लाभ का पात्र माना जायेगा क्योंकि यह माना जायेगा कि वह जीवित होते तो पूर्व की भाँति सहयोग करते। किंतु अगर सहयोग समाप्त हो जाने के बाद मृत्यु होती है तो गतिमान सहयोग की छूट का लाभ नही दिया जा सकेगा। जैसे- सहयोग शुरू होने के पूर्व या शुरू होने के दिन या गतिमान सहयोग के दौरान कोई सदस्य हॉस्पिटल में भर्ती होता है और उसकी मृत्यु हो जाती है तो उस स्तिथि में दिवंगत अग्रबंधु के परिवार को सहयोग किया जा सकेगा। यहां पर यह भी देखा जाएगा कि उस स्थिति में गतिमान सहयोग पूर्ण हो गया, उस स्थिति में सहयोग करना जरूरी होगा। सहयोग समाप्त हो जाने के बाद मृत्यु होने की स्थिति में सहयोग नही दिया जा सकेगा।
G.	यह नियम सिर्फ अग्रबंधु के स्वयं के अपरिहार्य हालात जैसे गम्भीर दुर्घटना/ बीमारी/अस्पताल में होने की स्थिति में ही मान्य होगा।
18.	संस्था (ABSS) के कार्य व्यवस्था पर खर्च का शुल्क अनिवार्य नहीं है l सदस्य स्वेच्छा से व्यवस्था शुल्क संस्था के खाते में ₹100 वार्षिक जमा कर सकते हैं l यह संस्था (ABSS) पर होने वाले खर्चों की पूर्ति प्रदान करता है l व्यवस्था शुल्क का हिसाब संस्था (ABSS)  द्वारा वार्षिक बैठक में दिया जाएगाl
19.	महाराजा अग्रसेन जी के संदेश “एक ईट एक रुपया” की भावना के आधार पर हीं इस संस्था (ABSS) का निर्माण किया गया है, किसी भी प्रकार के आर्थिक लाभ के लिये नही। इसी उद्देशय की पूर्ति करते हुए कोई विवाद उत्पन्न होता है तो संचालित केंद्रीय समिति द्वारा लिया गया निर्णय ही सर्वमान्य होगा। यद्यपि कार्य प्रणाली से संबंधित सभी विषयों पर संस्था (ABSS) की केंद्रीय समिति का निर्णय ही अंतिम एवं मान्य होगा, जिसे किसी भी अदालत में चुनौती नहीं दी जा सकेगी l फिर भी किसी वाद की स्थिति में फिरोजाबाद न्यायालय के अंतर्गत ही होगा। यह संस्था (ABSS) एक दूसरे को सहयोग करने की संस्था है, धन कमाने के लिए नहीं है।
20.	किसी भी निर्णय की स्थिति में वेबसाइट पर अपलोड नियमावली की प्रति ही मान्य होगी।
21.	Note : सदस्यों द्वारा अपना सहयोग सीधा मृतक अग्रबंधु के नॉमिनी को दिया जाता है अतः आपके द्वारा दिए गए सहयोग के बदले सहयोग प्राप्त करने का कोई कानूनी अधिकार नही होगा, यह पूरी तरह सदस्यों की मर्जी पर निर्भर रहेगा, टीम द्वारा अपील करने पर सहयोग कम ज्यादा आने पर या ना आने की दशा में टीम जिम्मेदार नहीं होगी। क्योंकि टीम सिर्फ सहयोग की अपील करती है, अतः किसी तरह की देनदारी के लिए कानूनी अधिकार मान्य नहीं होगा। कोई तथ्य छुपा कर या बिना पात्रता पूरी किए जुड़ जाता है और सहयोग कर देता है तो उसका दावा मान्य नहीं होगा।
22.	अग्रबंधु सेवा संस्थान का संक्षिप्त नाम (ABSS) होगा एवं अग्रबंधु जो भारत वर्ष में निवास करते हैं वही सदस्य बनने के अधिकारी होंगे। संस्था (ABSS) के संचालन रजिस्ट्रेशन रजिस्ट्रेशन नंबर |

अग्रबंधु सेवार्थ संस्थान (ABSS)
“आज की सहायता, कल की सुरक्षा”
टैगलाइन “आज की सहायता, कल की सुरक्षा” अग्रबंधु सेवार्थ संस्थान (ABSS) के मुख्य मिशन और दृष्टिकोण को दर्शाती है। यह इस विचार को व्यक्त करती है कि आज प्रदान की गई सहायता का दीर्घकालिक प्रभाव होता है, जिससे भविष्य में सुरक्षा और स्थिरता सुनिश्चित होती है।
आज की सहायता
इस टैगलाइन का यह हिस्सा उस तत्काल मदद पर केंद्रित है जो ABSS संकट के समय व्यक्तियों और परिवारों को प्रदान करता है। जीवन में अक्सर अप्रत्याशित चुनौतियाँ आती हैं—चाहे वह परिवार के मुख्य कमाने वाले का अचानक निधन हो, चिकित्सा आपातकाल, आर्थिक संकट या प्राकृतिक आपदाएँ हों। ABSS इन स्थितियों की गंभीरता को समझते हुए तुरंत सहायता प्रदान करता है:
•	आर्थिक सहायता: उन परिवारों को वित्तीय मदद प्रदान करना जिन्होंने अपनी आय का मुख्य स्रोत खो दिया है, ताकि वे आवश्यक जरूरतों को पूरा कर सकें।
•	चिकित्सा सहायता: चिकित्सा संकट के दौरान इलाज के लिए आवश्यक धनराशि प्रदान करना, ताकि लोग स्वास्थ्य सेवाओं का लाभ उठा सकें।
•	प्राकृतिक आपदाओं में सहायता: प्राकृतिक आपदाओं या अप्रत्याशित कठिनाइयों के समय राहत प्रदान करना।
•	शिक्षा सहायता: वंचित छात्रों को शिक्षा प्राप्त करने में मदद करना ताकि वे अपनी पढ़ाई जारी रख सकें।
तत्काल सहायता देकर ABSS यह सुनिश्चित करता है कि परिवार निराशा या आर्थिक कठिनाइयों में न फँसे।
कल की सुरक्षा
टैगलाइन का यह हिस्सा ABSS द्वारा प्रदान की गई सहायता के दीर्घकालिक प्रभाव को दर्शाता है। जब व्यक्तियों और परिवारों को समय पर सहायता मिलती है, तो वे अपनी ज़िंदगी को पुनः सँवारने और भविष्य का आत्मविश्वास से सामना करने के लिए बेहतर स्थिति में होते हैं। "कल की सुरक्षा" का मतलब है कि आज दी गई मदद भविष्य के लिए सुरक्षा और उम्मीद पैदा करती है, जिससे यह सुनिश्चित होता है कि समुदाय को कठिन समय में अकेला नहीं छोड़ा जाएगा।
•	भविष्य की स्थिरता: तत्काल आर्थिक सहायता प्रदान करके, ABSS परिवारों की वित्तीय स्थिरता बनाए रखने में मदद करता है, जिससे वे दीर्घकालिक गरीबी या संकट से बच सकें।
•	समुदाय में विश्वास: ABSS द्वारा बनाए गए समर्थन तंत्र से समुदाय में विश्वास और एकजुटता की भावना मजबूत होती है। परिवारों को पता होता है कि वे अकेले नहीं हैं, और जरूरत के समय वे संगठन और एक-दूसरे पर भरोसा कर सकते हैं।
•	एक विश्वसनीय सुरक्षा जाल: ABSS एक सुरक्षा जाल के रूप में कार्य करता है, यह सुनिश्चित करता है कि संकट के समय भी लोगों के पास जीवित रहने और पुनर्निर्माण करने के लिए आवश्यक संसाधन हों। इससे उन्हें मानसिक राहत मिलती है कि भविष्य में भी एक सहारा मौजूद है।
सामूहिक प्रयास और पारस्परिक सहयोग
ABSS आपसी सहायता और सामूहिक जिम्मेदारी के सिद्धांतों पर कार्य करता है, जिसका अर्थ है कि संगठन के प्रयास समुदाय के समर्थन से चलते हैं। विचार यह है कि हर कोई किसी न किसी रूप में योगदान देता है, यह सुनिश्चित करते हुए कि जरूरतमंदों के लिए हमेशा मदद उपलब्ध हो। यह देखभाल और समर्थन का एक ऐसा नेटवर्क बनाता है जो भविष्य की चुनौतियों का सामना कर सकता है, और दीर्घकालिक सुरक्षा के विचार को मजबूत करता है।
टैगलाइन ABSS की आत्मनिर्भरता और सशक्तिकरण की व्यापक दृष्टि को भी प्रतिबिंबित करती है। आज मदद देकर, ABSS केवल अस्थायी राहत प्रदान नहीं करता है; यह व्यक्तियों और परिवारों को फिर से खड़े होने में मदद करता है ताकि वे भविष्य में दूसरों के कल्याण में योगदान दे सकें, इस प्रकार सहायता और सतत समर्थन का एक चक्र बनाता है।
निष्कर्ष
“आज की सहायता, कल की सुरक्षा” ABSS के मिशन को संपूर्ण रूप से व्यक्त करता है, जिसमें तत्काल सहायता प्रदान करना और समुदाय के लिए दीर्घकालिक सुरक्षा का निर्माण करना शामिल है। यह संकट से निपटने, समुदाय की एकजुटता बनाए रखने, और एक सुरक्षा जाल तैयार करने की संगठन की प्रतिबद्धता को दर्शाता है, ताकि व्यक्ति भविष्य की चुनौतियों का आत्मविश्वास और गरिमा के साथ सामना कर सकें। सामूहिक प्रयास और आपसी सहयोग के माध्यम से, ABSS यह सुनिश्चित करता है कि आज की सहायता सभी के लिए एक मजबूत और सुरक्षित कल का निर्माण करे।

Agrabandhu Sewarth Sansthan (ABSS)
Let’s learn about what ABSS is.
Inspired by the message of true socialism from Shri Shri 1008 Maharaja Agrasen Ji, who was born in the Mahabharata era, "One Brick, One Rupee", the Agrabandhu Sewarth Sansthan was established on Dated: 03.10.2024 to support the Agrabandhu community. This will be the first of its kind organization in India. ABSS will work for the social and economic support of all Agrabandhus today.

Our goal is to bring Maharaja Agrasen Ji's message of "One Brick, One Rupee" to life. If the head of a family in the Agrabandhu community passes away prematurely, and the children are of a tender age, the family faces an extremely difficult and worrying situation. They may find no means of livelihood. In such cases, all ABSS members will provide support by directly transferring a respectable, predetermined amount into the nominee's bank account. This financial aid will contribute significantly to the family’s survival and help them continue running their household smoothly. The aim of ABSS is to offer a respectable financial support to the family. The central committee will periodically review the amount of financial aid to be given. The committee's decision will be final and cannot be challenged.

To join Agrabandhu Sewarth Sansthan, members of the Agrabandhu community can voluntarily register through the organization's website at aggrabandhuss.org or through the Institution's Mobile App (Android Only) after agreeing to all terms and conditions. Membership will be free of cost.
Regulations
1.	Rules for becoming a member of ABSS: 
A.	Permanent resident of the Indian territory is mandatory.
B.	Any adult male or female member. 
C.	Age between 18 to 70 years. 
D.	Mention of any serious illnesses is required at the time of "Member Registration."
2.	Rules for receiving support from ABSS: 
a) It is mandatory to provide financial support as per ABSS's instructions immediately after "Member Registration." 
b) There will be a 90-day lock-in period after "Member Registration." In case of missed, discontinued, or partial financial support, the lock-in period will reset to 90 days from the date the support is resumed. 
c) In the case of a serious illness, the lock-in period will be extended to 2 years. 
d) Only the nominee mentioned in the registration form will be considered valid.
3.	There is no mandatory fee for ABSS's operational expenses. Members can voluntarily contribute an annual administrative fee of ₹100 to ABSS's official bank account. This helps cover the organization's operational costs.
Detailed Guidelines and Additional Rules:
4.	Membership Conditions: 
Only Agrabandhu males and females aged 18 to 70 years are eligible for ABSS membership. At the time of joining ABSS, members must not have any serious illnesses, and any existing illness must be disclosed during "Member Registration" via the website or app. Failure to disclose a serious illness will result in automatic termination or invalidation of membership. If an undisclosed illness is discovered later, the nominee will not be entitled to any financial support from ABSS in the event of the member's death.
5.	Registration and Communication: 
To join as “ABSS” Member, it is mandatory to complete the registration form with the required information. ABSS has also established an official Whatsapp Channel/Telegram group/Facebook Page and Instagram Id where important information, updates, and instructions regarding cooperation, rules, and decisions are shared. Members are expected to visit and check the mentioned media platforms at least twice a week to stay informed. If a member fails to check the same regularly and misses relevant updates, they will be held responsible. However, ABSS also attempts to disseminate/broadcast important information through other social media platforms and local teams.
6.	Helpline: 
ABSS has provided a helpline number 7830-30-5040, for members' convenience. Members can communicate via call or WhatsApp to share or receive information.
7.	Lock-in Period: 
All ABSS members will be subject to a 90-day lock-in period from the date of registration. If a member joins ABSS on January 1 and passes away between January 1 and March 31, the nominee will not be eligible for financial support. If the death occurs after the 90-day period (i.e., from April 1 onward, the nominee will be entitled to receive financial assistance. In other words, if a member dies within the first 90 days of membership, no financial aid will be provided to the nominee.
8.	Rule Modifications:
ABSS reserves the right to amend or revise its rules as necessary. Members or nominees cannot challenge these changes in any way. If a member or nominee disputes these changes, their membership and eligibility for financial assistance will be automatically terminated.
9.	Members' Responsibility: 
After becoming a member of ABSS, it is the ethical responsibility of all members to comply with ABSS's financial contribution guidelines in the incident/event of a member's death. If a member stops contributing financially, they will lose their legal membership status. To regain legal membership, they must resume contributions, and the 90-day lock-in period will apply again. All members are expected not to attempt to delay or withhold contributions.
10.	Conflict of Interest: 
If a member of ABSS joins or promotes another similar organization, their membership in ABSS will be automatically terminated, and their nominee will not be eligible for any financial benefits. Furthermore, members must not engage in any form of misconduct, threats, or harassment toward ABSS officials. Violating these rules will result in termination of membership.
11.	Serious Illness: 
ABSS expects all members to accurately record any serious illness in their profile. If a serious illness is not recorded for some reason, it will be determined at the time of death. If the cause of death is due to a serious illness, it will be considered as such, regardless of whether it was documented. The nature of the illness at the time of joining will not be ABSS's concern. For example, if a member joins ABSS with kidney failure, a two-year lock-in period will apply. If the member passes away six months later due to kidney failure, no financial aid will be provided. However, if the death is due to an accident, financial assistance will be granted. Serious illnesses include cancer, heart attack, kidney failure, liver failure, brain hemorrhage, or any illness listed by the Indian Medical Association.
12.	Decision on Financial Aid: 
ABSS officials will make a unanimous decision on providing financial aid to the nominee of a deceased member. In case of any dispute, ABSS reserves the right to conduct inspections or investigations. No member or nominee may file a legal claim in court for financial aid; they must seek assistance from ABSS on ethical grounds.
13.	Nominee Recognition: 
ABSS will only recognize the nominee listed on the deceased member's registration form. If there are two nominees, the financial assistance will be divided equally (50-50) ratio. In case of disputes regarding the nominee, the decision of the legal heirs or a court will be final. If false allegations or misinformation are spread against ABSS by a beneficiary or family member, the aid will be revoked and allocated to another deceased member's family. ABSS also reserves the right to take legal action in such cases.
14.	Overpayment: 
If an excess amount is mistakenly transferred to a nominee’s account, the overpaid sum must be returned upon request with proper evidence.
15.	Financial Contribution Records: 
All members must upload proof of financial contributions to the ABSS website after making their donation. Failure to upload the receipt will result in ineligibility for financial support, as it is mandatory to confirm the legal status of the contribution.
16.	Special Cases (Suicide or Controversial Incidents): 
ABSS reserves the right to investigate and decide on cases involving suicide, controversial incidents, or other sensitive issues. ABSS’s decision will be final, and no legal action can be taken against the organization in such cases.
17.	Reinstatement of Legal Membership:
If a member stops contributing financially, they will no longer be considered a legal member. Such members can reactivate their legal membership under the following rules:
a)	Members who were consistently contributing but missed up to two payments (before reaching the 90% contribution threshold) will lose their legal status. However, if they resume and make three consecutive payments, their membership will be reinstated. Until all three contributions are made, they will not be eligible for any financial support. This opportunity is granted only once, and no more than two missed contributions are allowed. Once a member has made 10 contributions, the 90% rule will apply. In case of further breaks, Rule 17.A or 17.B will apply based on circumstances.
b)	Members who registered but did not contribute or missed more than two payments can regain legal membership only after making five consecutive contributions. Until the five payments are made, they will be considered ineligible for any support. The core team may grant special approval to reinstate membership after five contributions, and a three-month lock-in period will apply. Both the five contributions and the three-month lock-in period must be completed.
c)	Members who failed to contribute earlier are given a second chance to reinstate their membership, similar to new registrations. They must make five consecutive contributions and complete a three-month lock-in period.
d)	In cases of personal or family commitments (e.g., events, ceremonies), no claims will be valid, and Rule 17.C will apply.
e)	90% Contribution Rule: If a long-term member passes away and has made 90% of contributions in the last two years, they will be considered eligible for support, even if they missed some payments.
f)	If a legal member who has been making contributions dies unexpectedly without having completed their current contribution cycle, their nominee will still be eligible for support. This assumes that the member would have continued contributing had they been alive. However, if the death occurs after the end of the contribution cycle, they will not be eligible for benefits.
g)	This rule will only apply in cases of unavoidable circumstances, such as serious accidents, illnesses, or hospitalization.
18.	Administrative Fees: 
Administrative fees are not mandatory. Members can voluntarily contribute ₹100 annually to cover ABSS's operational expenses. The financial report on the administrative costs will be presented at the annual meeting.
19.	Objective of ABSS: 
ABSS was established with the spirit of Maharaja Agrasen Ji’s message, “One Brick, One Rupee,” and is not intended for financial gain. Any disputes arising will be resolved by the central committee, whose decision will be final and binding. All matters related to the functioning of ABSS will be decided by the central committee and cannot be challenged in any court. In case of legal disputes, they will be addressed only in the Firozabad Jurisdiction. ABSS is a cooperative organization, not a profit-making entity.
20.	Valid Documentation: 
The official version of the rules uploaded on the website will be the only valid reference.
21.	Contribution Responsibility: 
Members contribute directly to the nominee of the deceased member. Thus, there is no legal right to claim contributions in return. The contribution amount depends on the discretion of the members, and ABSS is not liable if contributions are less or not made at all. If a member fails to meet eligibility criteria or conceals information but makes contributions, they will not be entitled to any claims.
22.	Name and Eligibility: 
The organization will be abbreviated as ABSS, and only Agrabandhus residing in India are eligible to become members. The registration number for the organization is [to be specified]

ABSS  “Today's Support, Tomorrow's Assurance”
Agrabandhu Sewarth Sansthan (ABSS)
“Today's Support, Tomorrow's Assurance”
The tagline “Today's Support, Tomorrow's Assurance” highlights the foundational mission and vision of Agrabandhu Sewarth Sansthan (ABSS). It communicates the idea that the assistance provided by the organization today has a lasting impact, ensuring security and stability for the future. Here’s a detailed explanation of the phrase and its significance for ABSS:
Today's Support
This part of the slogan refers to the immediate help or aid that ABSS provides to individuals and families during times of crisis or need. ABSS recognizes that people often face sudden, unforeseen challenges, such as the death of a family breadwinner, medical emergencies, financial difficulties, or natural disasters. The organization steps in during these critical moments to offer financial, emotional, and practical support. This could include:
•	Financial assistance to families who have lost their primary source of income.
•	Aid in medical emergencies by providing funds for healthcare or treatment.
•	Support in natural disasters or unexpected hardships by offering relief.
•	Educational help for underprivileged students, ensuring they can continue their studies.
By responding immediately to these situations, ABSS ensures that families do not fall into despair or economic hardship.
Tomorrow's Assurance
This part of the slogan addresses the long-term impact of the support ABSS provides. When individuals and families receive timely help today, they are better positioned to rebuild their lives and face the future with confidence. "Tomorrow's Assurance" signifies that the aid offered today creates a sense of security and hope for the future, providing the assurance that the community will not be left to struggle alone during tough times.
•	Future Stability: By providing immediate financial assistance, ABSS helps families maintain their financial stability, preventing long-term poverty or suffering.
•	Trust in the Community: The support system created by ABSS fosters a strong sense of trust and solidarity within the community. Families know that they are not alone, and they can count on the organization and each other for help when needed.
•	A Reliable Safety Net: ABSS acts as a safety net, ensuring that even in times of crisis, people have the resources they need to survive and rebuild. This provides emotional reassurance, knowing there is a support system in place for the future.
Collective Effort and Mutual Support
ABSS operates on the principles of mutual aid and collective responsibility, meaning that the organization’s efforts are backed by the support of the community. The idea is that everyone contributes in some way, ensuring that there is always help available for those in need. This builds a network of care and support that can withstand future challenges, reinforcing the idea of long-term assurance.
The tagline also reflects the broader vision of self-reliance and empowerment. By giving support today, ABSS is not just providing temporary relief; it is helping individuals and families get back on their feet so they can contribute to the welfare of others in the future, creating a cycle of giving and sustainable support.
Conclusion
In summary, “Today's Support, Tomorrow's Assurance” perfectly encapsulates the mission of ABSS to provide immediate help while building long-term security for the community. It reflects the organization's dedication to crisis relief, community solidarity, and creating a safety net that ensures individuals can face future challenges with confidence and dignity. Through collective effort and mutual aid, ABSS ensures that today’s assistance builds a stronger, more secure tomorrow for everyone

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
