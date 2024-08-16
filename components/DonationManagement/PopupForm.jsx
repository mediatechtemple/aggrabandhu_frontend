'use client'
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem, FormControl, InputLabel, Select, Box, List, ListItem, ListItemText, Divider } from '@mui/material';

const PopupForm = ({ open, onClose }) => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [receivingMethod, setReceivingMethod] = useState('');
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  const handleSearchDialogOpen = () => {
    setSearchDialogOpen(true);
  };

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false);
  };

  const handleSelectMember = (member) => {
    setUserId(member.id);
    setName(member.name);
    handleSearchDialogClose(); // Close search dialog after selection
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form Submitted:', { userId, name, startDate, endDate, receivingMethod });
    onClose(); // Close the popup after submission
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Donation Form</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchDialogOpen}
              sx={{ mb: 2 }}
            >
              Search Member by ID or Name
            </Button>
            <TextField
              autoFocus
              margin="dense"
              label="User ID"
              fullWidth
              variant="outlined"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Start Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              margin="dense"
              label="End Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Receiving Method</InputLabel>
              <Select
                value={receivingMethod}
                onChange={(e) => setReceivingMethod(e.target.value)}
                label="Receiving Method"
              >
                <MenuItem value="bank">Bank Transfer</MenuItem>
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="check">Check</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Search Dialog */}
      <SearchDialog
        open={searchDialogOpen}
        onClose={handleSearchDialogClose}
        onSelectMember={handleSelectMember}
      />
    </>
  );
};





















const SearchDialog = ({ open, onClose, onSelectMember }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Implement search logic here
    // For demonstration, use static data
    if(searchQuery===''){
      setSearchResults([]);
      return;
    }
    const dummyResults = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' }
    ];
    const filteredResults = dummyResults.filter(member =>
      member.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Search Member</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Search Person by ID or Name"
          fullWidth
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ marginTop: 1, display: 'block', mx: 'auto' }}
        >
          Search
        </Button>
        <Divider sx={{ my: 2 }} />
        {searchResults.length > 0 ?  (
          <List>
            {searchResults.map((member) => (
              <ListItem button key={member.id} onClick={() => onSelectMember(member)}>
                <ListItemText primary={`${member.id} - ${member.name}`} />
              </ListItem>
            ))}
          </List>
        ):(<h2>no item exits</h2>)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupForm;
