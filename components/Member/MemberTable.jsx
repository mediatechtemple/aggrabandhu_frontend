'use client'
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditFormModal from '../EditFormModal/EditFormModal'; 
import DonationModal from '../Icons/DonationModal';
import MembershipModal1 from './MembershipModal1';

const useStyles = makeStyles({
  table: {
    border: '1px solid #ddd',
    minWidth: 600,
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  headerRow: {
    background: "#1976d2",
  },
  headerCell: {
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
  },
});

const MemberTable = ({ members, removeMember, editMember, id,open, handleClose, handleOpen }) => {
  const classes = useStyles();
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [modalData, setModalData] = useState(null);

  const sortedMembers = useMemo(() => {
    const sortableMembers = [...members];
    if (sortConfig.key) {
      sortableMembers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableMembers;
  }, [members, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleEdit = (member) => {
    setSelectedMember(member);
    setEditModalOpen(true);
  };

  const handleDelete = (memberId) => {
    removeMember(memberId);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedMember(null);
  };

  const openModal = (row) => {
    setModalData(row.timesDonationMade);
    setSelectedMember(row)
  };

  const closeModal = () => {
    setModalData(null);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const columns = [
    { key: 'code', label: 'Code', sortable: false },
    { key: 'joiningDate', label: 'Joining Date' },
    { key: 'photo', label: 'Photo', sortable: false },
    { key: 'name', label: 'Name' },
    { key: 'district', label: 'District' },
    { key: 'state', label: 'State' },
    { key: 'timesDonationMade', label: 'No of Times Donation Made' },
    { key: 'totalAmountDonated', label: 'Total Amount Donated' },
  ];

  return (
    <>
      <Table className={classes.table} id={id}>
        <TableHead>
          <TableRow className={classes.headerRow}>
            {columns.map(({ key, label, sortable = true }) => (
              <TableCell key={key} className={classes.tableCell} onClick={sortable ? () => handleSort(key) : null}>
                <div className={classes.headerCell}>
                  {label} {sortable && getSortIcon(key)}
                </div>
              </TableCell>
            ))}
            <TableCell className={classes.tableCell} style={{ color: 'white' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedMembers.map((member) => (
            <TableRow key={member.id}>
              {columns.map(({ key }) => (
                <TableCell key={key} className={classes.tableCell}>
                  {key === 'timesDonationMade' || key === 'totalAmountDonated' ? (
                    <span
                      style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold' }}
                      onClick={() => openModal(member)}
                    >
                      {member[key].length || member[key]}
                    </span>
                  ) : (
                    member[key]
                  )}
                </TableCell>
              ))}
              <TableCell className={classes.tableCell}>
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleOpen(member)} aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(member.code)} aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      
      {modalData && (
        <DonationModal
          modalData={modalData}
          closeModal={closeModal}
          selectedRow={selectedMember}
        />
      )}
    </>
  );
};

export default MemberTable;
