import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const AddressInformation = ({ formData, handleChange ,handlePincodeChange,block}) => {
  
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

<TextField
      label="Pincode"
      name="pincode"
      value={formData.pincode}
      onChange={handlePincodeChange}
      fullWidth
      margin="normal"
      required
      type="number"
    />

    {/* here will be my code  */}
    {/* {errorMessage && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {errorMessage}
        </Typography>
      )} */}

      <TextField
        label="State"
        type="text"
        variant="outlined"
        fullWidth
        value={formData.state}
        // disabled
        sx={{ mb: 2 }}
      />

      <TextField
        label="District"
        type="text"
        variant="outlined"
        fullWidth
        value={formData.district}
        // disabled
        sx={{ mb: 2 }}
      />

    <FormControl fullWidth margin="normal" >
      <InputLabel>Tehsil</InputLabel>
      <Select
          labelId="tehsil-label"
          value={formData.tahsil}
          onChange={handleChange}
          name="tahsil"
          label="Tahsil"
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 294,
                width: 250,
              },
            },
          }}
        >
        {block.map((item, index) => (
          <MenuItem key={index} value={item.Name}>
            {item.Name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>


    {/* <FormControl fullWidth margin="normal">
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
    </FormControl> */}
    
  </>
};

export default AddressInformation;
