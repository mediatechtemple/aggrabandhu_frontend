// import React, { useEffect, useState } from 'react';
// import { Modal, Box, Button, TextField, Typography, Select, MenuItem, InputLabel, FormControl, Checkbox, FormControlLabel, IconButton, Input } from '@mui/material';
// import { DatePicker } from '@mui/lab';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import CameraAltIcon from '@mui/icons-material/CameraAlt';
// import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

// const MembershipModal = () => {
//   const [open, setOpen] = useState(false);
//   const [edit,setEdit]=useState(null);
//   const [formData, setFormData] = useState({
//     referenceId: '',
//     gotra: '',
//     photo: '',
//     name: '',
//     fatherName: '',
//     motherName: '',
//     dob: null,
//     maritalStatus: '',
//     spouseName: '',
//     mobile: '',
//     otp: '',
//     password: '',
//     email: '',
//     address: '',
//     district: '',
//     state: '',
//     pincode: '',
//     profession: '',
//     adharCard: '',
//     voterId: '',
//     nominee1: { name: '', relationship: '' },
//     nominee2: { name: '', relationship: '' },
//     disease: false,
//     diseaseFile: null,
//     rulesAccepted: false,
//   });

//   const handleOpen = (entry) => {
//     if(entry){
//       setEdit(entry)
//     }
//     setOpen(true)
//   };
//   useEffect(()=>alert(edit),[edit])
//   const handleClose = () => setOpen(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleDateChange = (date) => {
//     setFormData({ ...formData, dob: date });
//   };

//   const handleNomineeChange = (index, field, value) => {
//     setFormData(prevData => {
//       const nominee1 = { ...prevData.nominee1 };
//       const nominee2 = { ...prevData.nominee2 };

//       if (index === 0) {
//         nominee1[field] = value;
//       } else if (index === 1) {
//         nominee2[field] = value;
//       }

//       return {
//         ...prevData,
//         nominee1,
//         nominee2
//       };
//     });
//   };

//   const handleDiseaseFileChange = (e) => {
//     setFormData({ ...formData, diseaseFile: e.target.files[0] });
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFormData({ ...formData, photo: file.name });
//     } else {
//       setFormData({ ...formData, photo: '' });
//     }
//   };

//   // useEffect(()=>window.alert(formData.photo),[formData.photo])

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Applying for membership with:', formData);
//     handleClose();
//   };

//   return (
//     <div>
//       <Button variant="contained" onClick={()=>handleOpen()} sx={{ backgroundColor: "#1976d2" }}>Apply for New Membership</Button>
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           component="form"
//           onSubmit={handleSubmit}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 800,
//             bgcolor: 'background.paper',
//             p: 4,
//             boxShadow: 24,
//             maxHeight: '80vh',
//             overflowY: 'auto'
//           }}
//         >
//           <Typography variant="h6" component="h2" sx={{ backgroundColor: "#1976d2", color: 'white', textAlign: 'center' }}>Apply for New Membership</Typography>
//           <TextField
//             label="Reference ID"
//             name="referenceId"
//             value={formData.referenceId}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Gotra</InputLabel>
//             <Select
//               value={formData.gotra}
//               onChange={handleChange}
//               name="gotra"
//               label="Gotra"
//             >
//               <MenuItem value="">None of Them</MenuItem>
//               <MenuItem value="gotra1">Gotra 1</MenuItem>
//               <MenuItem value="gotra2">Gotra 2</MenuItem>
//               <MenuItem value="gotra3">Gotra 3</MenuItem>
//             </Select>
//           </FormControl>
//           <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
//           <Button variant="contained" component="label">
//         Upload Photo
//         <input 
//           type="file" 
//           accept="image/*" 
//           hidden 
//           onChange={handleFileChange} 
//         />
//       </Button>
//       {formData.photo && (
//         <Typography variant="body1" sx={{ mt: 2 }}>
//           Selected File: {formData.photo}
//         </Typography>
//       )}
//           </div>
//           <TextField
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Father's Name"
//             name="fatherName"
//             value={formData.fatherName}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Mother's Name"
//             name="motherName"
//             value={formData.motherName}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />


//           {/*  */}
//           <TextField
//         type="date"
//         label="Date of Birth"
//         name="dob"
//         value={formData.dob}
//         onChange={handleChange}
//         fullWidth
//         required
//         margin="normal"
//         InputLabelProps={{
//           shrink: true,
//         }}
//       />
//           {/*  */}
//           {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <DatePicker
//               label="DOB"
//               value={formData.dob}
//               onChange={handleDateChange}
//               renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
//             />
//           </LocalizationProvider> */}
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Marital Status</InputLabel>
//             <Select
//               value={formData.maritalStatus}
//               onChange={handleChange}
//               name="maritalStatus"
//               label="Marital Status"
//             >
//               <MenuItem value="unmarried">Unmarried</MenuItem>
//               <MenuItem value="married">Married</MenuItem>
//             </Select>
//           </FormControl>
//           {formData.maritalStatus === 'married' && (
//             <TextField
//               label="Spouse Name"
//               name="spouseName"
//               value={formData.spouseName}
//               onChange={handleChange}
//               fullWidth
//               margin="normal"
//             />
//           )}
//           <TextField
//             label="Mobile No"
//             name="mobile"
//             value={formData.mobile}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Button variant="contained" fullWidth>Verify OTP</Button>
//           <TextField
//             label="Password"
//             name="password"
//             type="password"
//             value={formData.password}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Email ID"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//           />
//           <Button variant="contained" fullWidth>Verify OTP</Button>
//           <TextField
//             label="Address"
//             name="address"
//             value={formData.address}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>District</InputLabel>
//             <Select
//               value={formData.district}
//               onChange={handleChange}
//               name="district"
//               label="District"
//             >
//               <MenuItem value="district1">District 1</MenuItem>
//               <MenuItem value="district2">District 2</MenuItem>
//               <MenuItem value="district3">District 3</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth margin="normal">
//             <InputLabel>State</InputLabel>
//             <Select
//               value={formData.state}
//               onChange={handleChange}
//               name="state"
//               label="State"
//             >
//               <MenuItem value="state1">State 1</MenuItem>
//               <MenuItem value="state2">State 2</MenuItem>
//               <MenuItem value="state3">State 3</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="Pincode"
//             name="pincode"
//             value={formData.pincode}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Profession</InputLabel>
//             <Select
//               value={formData.profession}
//               onChange={handleChange}
//               name="profession"
//               label="Profession"
//             >
//               <MenuItem value="profession1">Profession 1</MenuItem>
//               <MenuItem value="profession2">Profession 2</MenuItem>
//               <MenuItem value="profession3">Profession 3</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField
//             label="Adhar Card No"
//             name="adharCard"
//             value={formData.adharCard}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Button variant="contained" fullWidth>Attach Adhar Card</Button>
//           <TextField
//             label="Voter ID / Driving License / Pan Card No"
//             name="voterId"
//             value={formData.voterId}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Button variant="contained" fullWidth>Attach Voter ID/Driving License/Pan Card</Button>
//           <Typography variant="subtitle1" sx={{ mt: 2 }}>Nominee Details</Typography>
//           <TextField
//             label="Nominee 1 Name"
//             value={formData.nominee1.name}
//             onChange={(e) => handleNomineeChange(0, 'name', e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Nominee 1 Relationship"
//             value={formData.nominee1.relationship}
//             onChange={(e) => handleNomineeChange(0, 'relationship', e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Nominee 2 Name"
//             value={formData.nominee2.name}
//             onChange={(e) => handleNomineeChange(1, 'name', e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <TextField
//             label="Nominee 2 Relationship"
//             value={formData.nominee2.relationship}
//             onChange={(e) => handleNomineeChange(1, 'relationship', e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <FormControlLabel
//             control={<Checkbox checked={formData.disease} onChange={(e) => setFormData({ ...formData, disease: e.target.checked })} />}
//             label="Suffering from any disease"
//           />
//           {formData.disease && (
//             <Button variant="contained" component="label" fullWidth>
//               Attach Doctor’s certi2323ficate
//               <input type="file" hidden onChange={handleDiseaseFileChange} />
//             </Button>
//           )}
//           <FormControlLabel
//             control={<Checkbox checked={formData.rulesAccepted} onChange={(e) => setFormData({ ...formData, rulesAccepted: e.target.checked })} />}
//             label="Accept Rules & Regulations"
//           />
//           <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Submit</Button>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default MembershipModal;
