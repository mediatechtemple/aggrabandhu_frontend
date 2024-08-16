import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TableSortLabel, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { makeStyles } from '@mui/styles';
import DonationLedgerModal from './DonationLedgerModal';

const useStyles = makeStyles({
  table: {
    border: '1px solid #ddd',
    minWidth: '600px',
    width: '100%',
    overflowX: 'auto',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    color: '#007bff',
    fontWeight: 'bold',
  },
  headerRow: {
    background: '#1976d2',
  },
  headerCell: {
    cursor: 'pointer',
    color: 'white',
    border: '1px solid #ddd',
    textAlign: 'center',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  TCell: {
    cursor: 'pointer',
    color: 'black',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  sortLabel: {
    '&.Mui-active': {
      color: 'inherit',
    },
    '&:hover': {
      color: 'inherit',
    },
  },
});

const SortableTable = ({ sortedRows, sortConfig, handleSort, getSortIcon, openHandler }) => {
  const classes = useStyles();
  const [rowsData,setRowsData]=useState([]);
  console.log(rowsData);

  const [ledgerOpen, setLedgerOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);



//How this would work here brother let's we start it to continue it......

  useEffect(()=>setRowsData(sortedRows),[sortedRows]);

  const handleLedgerOpen = (donation) => {
    setLedgerOpen(true);
    setSelectedDonation(donation);
  };

  const handleLedgerClose = () => {
    setLedgerOpen(false);
    setSelectedDonation(null);
  };

  function handleStatusToggle(index){
    window.alert('hello brohter how are you!!!!!   '+ index)
  }

 

  return (
    <>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.headerRow}>
            {['srNo', 'code', 'name', 'mobileNo', 'district', 'state', 'startDate', 'endDate', 'noOfDonation', 'totalDonation', 'paymentDetails', 'donationLedger', 'profile', 'action', 'status','remark'].map((column) => (
              <TableCell className={classes.headerCell} key={column}>
                <TableSortLabel
                  active={sortConfig.key === column}
                  direction={sortConfig.key === column ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort(column)}
                  IconComponent={() => getSortIcon(column, sortConfig)}
                  classes={{ root: classes.sortLabel }}
                >
                  {column === 'srNo' ? 'Sr. No' : column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsData.map((member,index) => (
            <TableRow key={member.srNo}>
              <TableCell className={classes.TCell}>{member.srNo}</TableCell>
              <TableCell className={classes.TCell}>{member.code}</TableCell>
              <TableCell className={classes.TCell}>{member.name}</TableCell>
              <TableCell className={classes.TCell}>{member.mobileNo}</TableCell>
              <TableCell className={classes.TCell}>{member.district}</TableCell>
              <TableCell className={classes.TCell}>{member.state}</TableCell>
              <TableCell className={classes.TCell}>{member.startDate}</TableCell>
              <TableCell className={classes.TCell}>{member.endDate}</TableCell>
              <TableCell className={classes.TCell}>{member.noOfDonation}</TableCell>
              <TableCell className={classes.TCell}>{member.totalDonation}</TableCell>
              <TableCell className={classes.TCell}>{member.paymentDetails}</TableCell>
              <TableCell className={classes.TCell}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleLedgerOpen(member)}
                >
                  {member.donationLedger}
                </Button>
              </TableCell>
              <TableCell className={classes.TCell}><a href={member.profile}>View Profile</a></TableCell>
              <TableCell className={classes.TCell}>
                <IconButton aria-label="edit" onClick={() => openHandler(member)}>
                  <EditIcon />
                </IconButton>
                {/* <IconButton aria-label="hold">
                  <PauseCircleOutlineIcon />
                </IconButton>
                <IconButton aria-label="resume">
                  <PlayCircleOutlineIcon />
                </IconButton> */}
              </TableCell>
              <TableCell className={classes.TCell} onClick={() => handleStatusToggle(index)}>
                {member.status === 'active' ? 'Active' : 'Inactive'}
              </TableCell>
              <TableCell className={classes.TCell}>{member.remark}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DonationLedgerModal
        open={ledgerOpen}
        handleClose={handleLedgerClose}
        donation={selectedDonation}
      />
    </>
  );
};

export default SortableTable;
