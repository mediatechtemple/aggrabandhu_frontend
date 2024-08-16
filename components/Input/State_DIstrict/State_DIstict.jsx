'use client'
'use client'
import React, { useEffect, useState } from 'react';
import { Modal, Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const StateDistrictManager = () => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
//////////////////////////////////////////////////////////////////////////////

  const [openStateModal, setOpenStateModal] = useState(false);
  const [openDistrictModal, setOpenDistrictModal] = useState(false);

////////////////////////////////////////////////////////////////////////////

  const [currentState, setCurrentState] = useState('');
  const [stateCode, setStateCode] = useState('');

///////////////////////////////////////////////////////////////////////////

  const [currentDistrict, setCurrentDistrict] = useState('');
  const [selectedState, setSelectedState] = useState(null);

  const [viewDistricts, setViewDistricts] = useState(false);

  //////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    const storedStates = localStorage.getItem('states');
    const storedDistrict = localStorage.getItem('district');
    if (storedStates) {
      setStates(JSON.parse(storedStates));
    }
    if(storedDistrict){
      setDistricts(JSON.parse(storedDistrict));
    }
  }, []);
  

  const handleAddState = () => {
     // Update the states array
  const updatedStates = [...states, { name: currentState, state_code: stateCode }];
  
  // Save the updated states array to localStorage
  localStorage.setItem('states', JSON.stringify(updatedStates));

  // Update the state and reset form fields
  setStates(updatedStates);
  setCurrentState('');
  setStateCode('');
  setOpenStateModal(false);
  };
//this one is to add district of States here according to me....
  const handleAddDistrict = () => {
    const updatedDistrict=[...districts, { name: currentDistrict, state: selectedState }];

    localStorage.setItem('district', JSON.stringify(updatedDistrict));

    //////////////
    setDistricts(updatedDistrict);
    setCurrentDistrict('');
    setOpenDistrictModal(false);
  };

  const handleDeleteState = (stateName) => {
    setStates(states.filter((state) => state.name !== stateName));
    setDistricts(districts.filter((district) => district.state !== stateName));
  };

  const handleDeleteDistrict = (districtName) => {
    setDistricts(districts.filter((district) => district.name !== districtName));
  };

  const openDistrictForm = (stateName) => {
    setSelectedState(stateName);
    setOpenDistrictModal(true);
  };

  return (
    <div>
        <Box sx={{display:'flex', justifyContent:'flex-end'}}>
         <Button variant="contained" onClick={() => setOpenStateModal(true)}>Add State</Button>
        </Box>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>State Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>State-Code</TableCell>
              <TableCell sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {states.map((state, index) => (
              <TableRow key={index}>
                <TableCell sx={{textAlign:'center',border: '2px solid #ddd'}}>{state.name}</TableCell>
                <TableCell sx={{textAlign:'center',border: '2px solid #ddd'}}>{state.state_code}</TableCell>
                <TableCell sx={{textAlign:'center',border: '2px solid #ddd'}}>
                  <Button variant="outlined" onClick={() => openDistrictForm(state.name)}>Add District</Button>
                  <Button variant="outlined" onClick={() => { setSelectedState(state.name); setViewDistricts(true); }}>View Districts</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDeleteState(state.name)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={openStateModal} onClose={() => setOpenStateModal(false)}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', mt: 4, width: 300 }}>
          <Typography variant="h6">Add State</Typography>
          <TextField
            label="State Name"
            value={currentState}
            onChange={(e) => setCurrentState(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="State Code"
            value={stateCode}
            onChange={(e) => setStateCode(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddState} fullWidth>Add State</Button>
        </Box>
      </Modal>

      <Modal open={openDistrictModal} onClose={() => setOpenDistrictModal(false)}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', margin: 'auto', mt: 4, width: 300 }}>
          <Typography variant="h6">Add District for {selectedState}</Typography>
          <TextField
            label="District Name"
            value={currentDistrict}
            onChange={(e) => setCurrentDistrict(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddDistrict} fullWidth>Add District</Button>
        </Box>
      </Modal>

      {viewDistricts && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>District Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>State</TableCell>
                <TableCell sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {districts.filter(d => d.state === selectedState).map((district, index) => (
                <TableRow key={index}>
                  <TableCell sx={{textAlign:'center',border: '2px solid #ddd'}}>{district.name}</TableCell>
                  <TableCell sx={{textAlign:'center',border: '2px solid #ddd'}}>{district.state}</TableCell>
                  <TableCell sx={{textAlign:'center',border: '2px solid #ddd'}}>
                    <Button variant="outlined" color="error" onClick={() => handleDeleteDistrict(district.name)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default StateDistrictManager;
