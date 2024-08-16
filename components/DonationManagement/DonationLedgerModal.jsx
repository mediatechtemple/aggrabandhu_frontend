import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from '@mui/material';

const DonationLedgerModal = ({ open, handleClose }) => {
  const donations = [
    {
      id: 1,
      member_id: 1,
      donation_id: 1,
      amount: "100.00",
      donation_date: "2024-08-05T06:51:16.000Z",
      transaction_id: "T2408020903406872603746",
      transaction_file: "http://localhost:7000/api/file/payments/1/screepayment1.jpg",
      payment_method: "upi_number",
      status: "Pending",
      createdAt: "2024-08-05T06:51:16.000Z",
      updatedAt: "2024-08-05T06:51:16.000Z",
      Member: {
        id: 1,
        name: "Gulshan",
        email: "gamerronak9@gmail.com",
        state: "Rajasthan",
        district: "Alwar",
      },
    },
    {
      id: 2,
      member_id: 2,
      donation_id: 2,
      amount: "200.00",
      donation_date: "2024-08-06T07:52:17.000Z",
      transaction_id: "T2408030903416872603747",
      transaction_file: "http://localhost:7000/api/file/payments/2/screepayment2.jpg",
      payment_method: "credit_card",
      status: "Completed",
      createdAt: "2024-08-06T07:52:17.000Z",
      updatedAt: "2024-08-06T07:52:17.000Z",
      Member: {
        id: 2,
        name: "Rohit",
        email: "rohit123@gmail.com",
        state: "Maharashtra",
        district: "Mumbai",
      },
    },
  ];

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Donation Ledger Details</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Donation Date</TableCell>
                  <TableCell>Payment Method</TableCell>
                  <TableCell>Transaction ID</TableCell>
                  <TableCell>Transaction File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>{donation.id}</TableCell>
                    <TableCell>{donation.Member.name}</TableCell>
                    <TableCell>{donation.Member.email}</TableCell>
                    <TableCell>{donation.Member.state}</TableCell>
                    <TableCell>{new Date(donation.donation_date).toLocaleDateString()}</TableCell>
                    <TableCell>{donation.payment_method}</TableCell>
                    <TableCell>{donation.transaction_id}</TableCell>
                    <TableCell>
                      <a href={donation.transaction_file} target="_blank" rel="noopener noreferrer">View Receipt</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DonationLedgerModal;
