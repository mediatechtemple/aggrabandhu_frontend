import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DonationLedgerModal from './DonationLedgerModal';
import { styled } from '@mui/system';

const StyledTable = styled(Table)({
  border: '1px solid #ddd',
  minWidth: '600px',
  width: '100%',
  overflowX: 'auto',
});



const StyledTableCell = styled(TableCell)({
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
});

const StyledHeaderCell = styled(StyledTableCell)({
  background: '#1976d2',
  color: 'white',
  cursor: 'pointer',
});

const StyledTableSortLabel = styled(TableSortLabel)({
  color: 'inherit', // Inherit color from StyledHeaderCell
  '&:hover': {
    color: 'inherit', // Prevent color change on hover
  },
  '&.Mui-active': {
    color: 'inherit', // Prevent color change on click
  },
  '&.Mui-focusVisible': {
    color: 'inherit', // Prevent color change on focus
  },
});


const SortableTable = ({ sortedRows, sortConfig, handleSort, getSortIcon, openHandler }) => {
  const [rowsData, setRowsData] = useState([]);
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  useEffect(() => {
    setRowsData(sortedRows);
  }, [sortedRows]);

  const handleLedgerOpen = (donation) => {
    setLedgerOpen(true);
    setSelectedDonation(donation);
  };

  const handleLedgerClose = () => {
    setLedgerOpen(false);
    setSelectedDonation(null);
  };

  const handleStatusToggle = (index) => {
    window.alert('Hello brother, how are you!!!!! ' + index);
  };

  return (
    <>
      <StyledTable>
        <TableHead>
          <TableRow>
            {['srNo', 'code', 'name', 'mobileNo', 'district', 'state', 'startDate', 'endDate', 'noOfDonation', 'totalDonation', 'paymentDetails', 'donationLedger', 'profile', 'action', 'status', 'remark'].map((column) => (
              <StyledHeaderCell key={column}>
                <StyledTableSortLabel
                  active={sortConfig.key === column}
                  direction={sortConfig.key === column ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort(column)}
                  IconComponent={() => getSortIcon(column, sortConfig)}
                >
                  {column === 'srNo' ? 'Sr. No' : column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </StyledTableSortLabel>
              </StyledHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((member, index) => (
            <TableRow key={member.srNo}>
              <StyledTableCell>{member.srNo}</StyledTableCell>
              <StyledTableCell>{member.code}</StyledTableCell>
              <StyledTableCell>{member.name}</StyledTableCell>
              <StyledTableCell>{member.mobileNo}</StyledTableCell>
              <StyledTableCell>{member.district}</StyledTableCell>
              <StyledTableCell>{member.state}</StyledTableCell>
              <StyledTableCell>{member.startDate}</StyledTableCell>
              <StyledTableCell>{member.endDate}</StyledTableCell>
              <StyledTableCell>{member.noOfDonation}</StyledTableCell>
              <StyledTableCell>{member.totalDonation}</StyledTableCell>
              <StyledTableCell>{member.paymentDetails}</StyledTableCell>
              <StyledTableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleLedgerOpen(member)}
                >
                  {member.donationLedger}
                </Button>
              </StyledTableCell>
              <StyledTableCell><a href={member.profile}>View Profile</a></StyledTableCell>
              <StyledTableCell>
                <IconButton aria-label="edit" onClick={() => openHandler(member)}>
                  <EditIcon />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell onClick={() => handleStatusToggle(index)}>
                {member.status === 'active' ? 'Active' : 'Inactive'}
              </StyledTableCell>
              <StyledTableCell>{member.remark}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
      <DonationLedgerModal
        open={ledgerOpen}
        handleClose={handleLedgerClose}
        donation={selectedDonation}
      />
    </>
  );
};

export default SortableTable;
