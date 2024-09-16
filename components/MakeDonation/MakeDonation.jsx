'use client';
import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
} from '@mui/material';

const DonationTable = () => {
  const [rows, setRows] = useState([
    {
      id: 1,
      member_id: 7,
      donation_id: 1,
      name: 'John Doe',
      district: 'District',
      state: 'State',
      death_date: '2023-08-15',
      minimum_amount: '100',
      payment_method: 'UPI',
      amount: '',
      transaction_id: '',
      file: null,
    },
    {
      id: 2,
      member_id: 7,
      donation_id: 1,
      name: 'Jane Doe',
      district: 'District',
      state: 'State',
      death_date: '2024-01-10',
      minimum_amount: '150',
      payment_method: 'UPI',
      amount: '',
      transaction_id: '',
      file: null,
    },
  ]);

  const updateRowData = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      updateRowData(index, 'file', file);
    }
  };

  const handleSubmit = (index) => {
    console.log('Submitted data:', rows[index]);

    // Optionally remove the row after submission or clear fields
    const updatedRows = [...rows];
    updatedRows.splice(index, 1); // If you don't want to remove, comment this line out
    setRows(updatedRows);
  };

  return (
    <Table
      sx={{
        border: '1px solid #ddd',
        minWidth: '600px',
        width: '100%',
        overflowX: 'auto',
      }}
    >
      <TableHead>
        <TableRow sx={{ background: '#1976d2' }}>
          {['ID', 'Member ID', 'Name', 'District', 'State', 'Death Date', 'Minimum Amount', 'Payment Method', 'Amount', 'Transaction ID', 'Screen_shot', 'Actions'].map((header) => (
            <TableCell sx={{ color: 'white', textAlign: 'center' }} key={header}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell sx={{ textAlign: 'center' }}>{row.id}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{row.member_id}</TableCell>
            
            <TableCell sx={{ textAlign: 'center' }}>{row.name}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{row.district}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{row.state}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{row.death_date} </TableCell>
            <TableCell sx={{ textAlign: 'center' }}>{row.minimum_amount} </TableCell>
            <TableCell sx={{ textAlign: 'center'  }}>{row.payment_method}</TableCell>
            <TableCell sx={{ textAlign: 'center' }}>
              <TextField
                value={row.amount}
                onChange={(e) => updateRowData(index, 'amount', e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </TableCell>
            <TableCell sx={{ textAlign: 'center' }}>
              <TextField
                value={row.transaction_id}
                onChange={(e) => updateRowData(index, 'transaction_id', e.target.value)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </TableCell>
            <TableCell sx={{ textAlign: 'center' }}>
              <Button variant="outlined" component="label">
                Upload
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e)}
                />
              </Button>
              {row.file && (
                <div style={{ marginTop: '8px' }}>
                  <a href={URL.createObjectURL(row.file)} target="_blank" rel="noopener noreferrer">
                    View File
                  </a>
                </div>
              )}
            </TableCell>
            <TableCell sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(index)}
              >
                Submit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DonationTable;
