'use client'; // Use this for client-side rendering in Next.js

import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const UserForm = () => {
  const [formData, setFormData] = useState({
    reference_id: '', // Reference ID field for gotra
    gotra: '',
    name: '',
    father_name: '',
    mother_name: '',
    dob: '',
    email: '',
    marital_status: '',
    spouse_name: '',
    mobile_no: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    profession: '',
    aadhar_no: '',
    id_type: '',
    id_no: '',
    file2: null, //document file uplaod field
    file: null, // Aadhar file upload field
    profile: null, // Photo upload field
    nominee: '', // Nominee 1 name
    relationship: '', // Nominee 1 relationship
    nominee2: '', // Nominee 2 name
    relationship2: '' // Nominee 2 relationship
  });

  const [open, setOpen] = useState(false); // For managing popup state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission (e.g., API call)
  };

  const handleClickOpen = () => {
    setOpen(true); // Open the popup
  };

  const handleClose = () => {
    setOpen(false); // Close the popup
  };

  return (
    <div>
      {/* Button to open the popup */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Open Form
      </Button>

      {/* Dialog for the popup */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Fill the User Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} style={{ padding: '20px' }}>
            {/* Reference _id field */}
            <TextField
              label="Reference ID (Gotra)"
              name="_id"
              value={formData._id}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

            {/* Upload Photo Field */}
            <Button
              variant="contained"
              component="label"
              fullWidth
              margin="normal"
            >
              Upload Photo
              <input
                type="file"
                hidden
                name="photo_file"
                onChange={handleFileChange}
              />
            </Button>

            {/* Other form fields */}
            <TextField
              label="Gotra"
              name="gotra"
              value={formData.gotra}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Father's Name"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Mother's Name"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Marital Status</InputLabel>
              <Select
                name="marital_status"
                value={formData.marital_status}
                onChange={handleChange}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
              </Select>
            </FormControl>
            {formData.marital_status === 'Married' && (
              <TextField
                label="Spouse's Name"
                name="spouse_name"
                value={formData.spouse_name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
            )}
            <TextField
              label="Mobile No"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="District"
              name="district"
              value={formData.district}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Profession"
              name="profession"
              value={formData.profession}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Aadhar No"
              name="aadhar_no"
              value={formData.aadhar_no}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              margin="normal"
            >
              Upload Aadhar File
              <input
                type="file"
                hidden
                name="aadhar_file"
                onChange={handleFileChange}
              />
            </Button>
            <FormControl fullWidth margin="normal">
              <InputLabel>Identification Type</InputLabel>
              <Select
                name="id_type"
                value={formData.id_type}
                onChange={handleChange}
              >
                <MenuItem value="PAN Card">PAN Card</MenuItem>
                <MenuItem value="Voter ID">Voter ID</MenuItem>
                <MenuItem value="Driving License">Driving License</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Identification Number"
              name="id_no"
              value={formData.id_no}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              component="label"
              fullWidth
              margin="normal"
            >
              Upload ID File
              <input
                type="file"
                hidden
                name="id_file"
                onChange={handleFileChange}
              />
            </Button>

            {/* Nominees Section */}
            <TextField
              label="Nominee 1"
              name="nominee"
              value={formData.nominee}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nominee 1 Relationship"
              name="relationship"
              value={formData.relationship}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nominee 2"
              name="nominee2"
              value={formData.nominee2}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Nominee 2 Relationship"
              name="relationship2"
              value={formData.relationship2}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserForm;
