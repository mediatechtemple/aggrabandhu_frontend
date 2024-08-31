import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';

const StateTable = ({ states, openDistrictForm, setSelectedState, setViewDistricts, handleDeleteState }) => {
  return (
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
              <TableCell sx={{ textAlign: 'center', border: '2px solid #ddd' }}>{state.name}</TableCell>
              <TableCell sx={{ textAlign: 'center', border: '2px solid #ddd' }}>{state.state_code}</TableCell>
              <TableCell sx={{ textAlign: 'center', border: '2px solid #ddd' }}>
                <Button variant="outlined" onClick={() => openDistrictForm(state.name)}>Add District</Button>
                <Button variant="outlined" onClick={() => { setSelectedState(state.name); setViewDistricts((one)=>!one); }}>View Districts</Button>
                <Button variant="outlined" color="error" onClick={() => handleDeleteState(state.name)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StateTable;
