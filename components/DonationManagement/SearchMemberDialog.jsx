import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const SearchMemberDialog = ({
  searchDialogOpen,
  handleSearchDialogClose,
  searchQuery,
  setSearchQuery,
  handleSelectMember,
}) => {
  const [members, setMembers] = useState([]); // Stores the full list of members
  const [filteredMembers, setFilteredMembers] = useState([]); // Stores the filtered list of members based on search

  // Fetching members data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://backend.aggrabandhuss.org/api/member?limit=ALL"
        );
        if (!response.ok) {
          throw new Error("Data fetching error");
        }
        const data = await response.json();
        setMembers(data.data); // Store fetched data in the members state
        setFilteredMembers(data.data); // Initialize filtered members with all members
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter members based on the search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          member.id.toString().includes(searchQuery)
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members); // If no search query, show all members
    }
  }, [searchQuery, members]); // Run filter when searchQuery or members change

  return (
    <Dialog
      open={searchDialogOpen}
      onClose={handleSearchDialogClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "650px",
          height: "450px", // Customize the height of the dialog
          maxHeight: "450px", // Limit the maximum height of the dialog
        },
      }}
    >
      <DialogTitle>Search Member</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Search Person by ID or Name"
          fullWidth
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Divider sx={{ my: 2 }} />
        {filteredMembers.length > 0 ? (
          <List>
            {filteredMembers.map((member) => (
              <ListItemButton
                key={member.id}
                onClick={() => handleSelectMember(member)}
              >
                <ListItemText primary={`${member.id} - ${member.name}`} />
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
};

export default SearchMemberDialog;
