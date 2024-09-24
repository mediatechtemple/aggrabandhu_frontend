'use client';
import React, { useState, useEffect } from 'react';
import { Checkbox, TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Box, Container, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import PermissionsDialog from './PermissionsDialog';

// Define styled components
const StyledTable = styled(Table)(({ theme }) => ({
  border: '1px solid #ddd',
  minWidth: 600,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #ddd',
  cursor: 'pointer',
  color: 'white',
  textAlign: 'center',
  backgroundColor: '#1976d2',
  fontWeight: 'bold',
  padding: '8px',
}));

const HeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#1976d2',
}));

const UserManagement = () => {
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });
  const [currentId, setCurrentId] = useState(null);

  const allUsers = [
    { id: '01', name: 'Alice' },
    { id: '02', name: 'Bob' },
    { id: '03', name: 'Charlie' },
    { id: '04', name: 'Alice' },
    { id: '05', name: 'Bob' },
    { id: '06', name: 'Charlie' },
    { id: '07', name: 'Alice' },
    { id: '08', name: 'Bob' },
    { id: '09', name: 'Charlie' },
    { id: '10', name: 'Alice' },
    { id: '11', name: 'Bob' },
    { id: '12', name: 'Charlie' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  useEffect(() => {
    const results = allUsers.filter(user =>
      user.id.includes(searchQuery) || user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchQuery,allUsers]);



  const addUser = (user) => {
    if (!selectedUsers.some(selected => selected.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
  };



  const handleDialogOpen = (currentId) => {
    setDialogOpen(true);
    setCurrentId(currentId);
  };



  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSearchDialogOpen = () => {
    setSearchDialogOpen(true);
  };

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false);
  };


  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };


  const handleUpdate = (section) => {
    console.log(`${section} management`);
    console.log(checkboxes);
    console.log({ ...checkboxes, Id: currentId });
  };

  
  return (
    <Container>
      <Typography 
        sx={{ 
          backgroundColor: '#1976d2', 
          color: 'white', 
          textAlign: 'center',
          padding: '10px',
          marginTop: '20px',
          marginBottom: '2px'
        }}
      >
        User Management
      </Typography>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        marginBottom="20px"
      >
        <Button variant="contained" color="primary" onClick={handleSearchDialogOpen}>
          Search
        </Button>
      </Box>

      <Typography 
        sx={{ 
          backgroundColor: '#1976d2', 
          color: 'white', 
          textAlign: 'center',
          padding: '10px',
          marginTop: '20px'
        }}
      >
        Selected Users
      </Typography>




      <StyledTable>
        <TableHead>
          <HeaderRow>
            <StyledTableHeadCell>Name</StyledTableHeadCell>
            <StyledTableHeadCell>ID</StyledTableHeadCell>
            <StyledTableHeadCell>Right</StyledTableHeadCell>
            <StyledTableHeadCell>Actions</StyledTableHeadCell>
          </HeaderRow>
        </TableHead>
        <TableBody>
          {selectedUsers.map(user => (
            <TableRow key={user.id}>
              <StyledTableCell>{user.name}</StyledTableCell>
              <StyledTableCell>{user.id}</StyledTableCell>
              <StyledTableCell>
                <Button onClick={() => handleDialogOpen(user.id)}>Right</Button>
              </StyledTableCell>
              <StyledTableCell>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>






      <PermissionsDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        checkboxes={checkboxes}
        handleCheckboxChange={handleCheckboxChange}
        handleUpdate={handleUpdate}
        currentId={currentId}
      />

























      <Dialog open={searchDialogOpen} onClose={handleSearchDialogClose} fullWidth maxWidth="md">
        <DialogTitle>Search Registered Users</DialogTitle>
        <DialogContent style={{ maxHeight: '400px'}}>
          <TextField
            label="Search by ID or name"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginBottom: '20px', marginTop:'6px' }}
          />
          <Paper style={{ height: '300px', overflow: 'auto' }}>
            <StyledTable stickyHeader>
              <TableHead>
                <HeaderRow>
                  <StyledTableHeadCell>Name</StyledTableHeadCell>
                  <StyledTableHeadCell>ID</StyledTableHeadCell>
                  <StyledTableHeadCell>Actions</StyledTableHeadCell>
                </HeaderRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id}>
                    <StyledTableCell>{user.name}</StyledTableCell>
                    <StyledTableCell>{user.id}</StyledTableCell>
                    <StyledTableCell>
                      <Button variant="outlined" color="secondary" onClick={() => addUser(user)}>
                        Add
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearchDialogClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
