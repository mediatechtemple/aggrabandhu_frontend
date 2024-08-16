import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AddressInformation = ({ formData, handleChange }) => {
  const[states,setStates]=useState([]);
  const[districts,setDistricts]=useState([]);
  useEffect(()=>{
    // const storedStates = localStorage.getItem('states');
    const storedStates = JSON.parse(localStorage.getItem('states')) || [];
    const storedDistrict = JSON.parse(localStorage.getItem('district')) || [];

    console.log(storedStates);
    setStates(storedStates);
    setDistricts(storedDistrict);

  },[])
 return <>
    <TextField
      label="Address"
      name="address"
      value={formData.address}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
      multiline
      rows={4}
    />
    <FormControl fullWidth margin="normal">
      <InputLabel>District</InputLabel>
      <Select
        value={formData.district}
        onChange={handleChange}
        name="district"
        label="District"
      >
        {
          districts.map((item,index)=>
            <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
          )
        }
      </Select>
    </FormControl>
    <FormControl fullWidth margin="normal">
      <InputLabel>State</InputLabel>
      <Select
        value={formData.state}
        onChange={handleChange}
        name="state"
        label="State"
      >
        {
          states.map((item,index)=>
            <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
          )
        }
      </Select>
    </FormControl>
    <TextField
      label="Pincode"
      name="pincode"
      value={formData.pincode}
      onChange={handleChange}
      fullWidth
      margin="normal"
      required
      type="number"
    />
  </>
};

export default AddressInformation;
