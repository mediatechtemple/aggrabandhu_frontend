'use client'; // Use this directive to enable client-side features in Next.js

import React, { useState, useEffect } from 'react';
import { Button, Dialog, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const FormPopup = () => {
  const [openForm, setOpenForm] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    description: '',
  });
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleClickOpenSearch = () => {
    setOpenSearch(true);
  };

  const handleCloseSearch = () => {
    setOpenSearch(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    // Clear the form after submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      description: '',
    });

    handleCloseForm();
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilteredUsers(users.filter(user => user.name.toLowerCase().includes(term.toLowerCase())));
  };

  const handleAddClick = (user) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: user.name, // Set the selected user's name
    }));
    handleCloseSearch(); // Close the search dialog after selecting a user
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickOpenForm}
        style={{ marginRight: '10px', float: 'right' }}
      >
        Open Form
      </Button>
      
      {/* Form Dialog */}
      <Dialog open={openForm} onClose={handleCloseForm}>
        <div style={{ padding: '20px', width: '600px' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpenSearch}
            style={{ marginBottom: '20px' }}
          >
            Open User Search
          </Button>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }}
              >
                Submit
              </Button>
              <Button variant="outlined" onClick={handleCloseForm}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* User Search Dialog */}
      <Dialog open={openSearch} onClose={handleCloseSearch}>
        <div style={{ padding: '20px', width: '400px', height: '400px' }}>
          <h3>User Search</h3>
          <TextField
            label="Search Users"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            margin="normal"
          />
          <TableContainer component={Paper} style={{ maxHeight: '250px', marginTop: '20px', overflowY: 'auto' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddClick(user)}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Dialog>
    </div>
  );
};

export default FormPopup;
