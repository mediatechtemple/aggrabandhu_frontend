import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';

const SearchMemberDialog = ({
  searchDialogOpen,
  handleSearchDialogClose,
  searchQuery,
  setSearchQuery,
  handleSearch,
  searchResults,
  handleSelectMember,
}) => (
  <Dialog open={searchDialogOpen} onClose={handleSearchDialogClose}>
    <DialogTitle>Search Member</DialogTitle>
    <DialogContent>
      <TextField
        margin="dense"
        label="Search Person by ID"
        fullWidth
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
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
      {searchResults.length > 0 ? (
        <List>
          {searchResults.map((member) => (
            <ListItemButton key={member.id} onClick={() => handleSelectMember(member)}>
              <ListItemText primary={`${member.code} - ${member.name}`} />
              <Button>Add</Button>
            </ListItemButton>
          ))}
        </List>
      ) : (
        <Typography>No member exists</Typography>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSearchDialogClose} color="secondary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default SearchMemberDialog;
