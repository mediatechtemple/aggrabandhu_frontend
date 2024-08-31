import React from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';

const DistrictTable = ({ districts, selectedState, handleDeleteDistrict }) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
              District Name
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
              State
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {districts.filter(d => d.state === selectedState).map((district, index) => (
            <TableRow key={index}>
              <TableCell sx={{ textAlign: 'center', border: '2px solid #ddd' }}>{district.name}</TableCell>
              <TableCell sx={{ textAlign: 'center', border: '2px solid #ddd' }}>{district.state}</TableCell>
              <TableCell sx={{ textAlign: 'center', border: '2px solid #ddd' }}>
                <Button variant="outlined" color="error" onClick={() => handleDeleteDistrict(district.name)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DistrictTable;
