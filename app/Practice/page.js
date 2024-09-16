'use client';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, Checkbox, Grid, FormControlLabel } from '@mui/material';

// Dummy users data with rights for three pages
const initialUsers = [
  {
    id: 1,
    name: 'Alice',
    pages: [
      { pageName: 'Dashboard', rights: [] },
      { pageName: 'Settings', rights: [] },
      { pageName: 'Reports', rights: [] },
    ],
  },
  {
    id: 2,
    name: 'Bob',
    pages: [
      { pageName: 'Dashboard', rights: [] },
      { pageName: 'Settings', rights: [] },
      { pageName: 'Reports', rights: [] },
    ],
  },
  {
    id: 3,
    name: 'Charlie',
    pages: [
      { pageName: 'Dashboard', rights: [] },
      { pageName: 'Settings', rights: [] },
      { pageName: 'Reports', rights: [] },
    ],
  },
  {
    id: 4,
    name: 'Harry',
    pages: [
      { pageName: 'Dashboard', rights: [] },
      { pageName: 'Settings', rights: [] },
      { pageName: 'Reports', rights: [] },
    ],
  },
];

const rightsOptions = ['Read', 'Write', 'Admin'];

const Page = () => {
  const [users, setUsers] = useState(initialUsers);
  const [openDialog, setOpenDialog] = useState(false);


  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRights, setSelectedRights] = useState({});




  // Open the dialog for the specific user

  const handleOpenDialog = (user) => {
    const initialRights = {};
    user.pages.forEach((page) => {
      initialRights[page.pageName] = page.rights;
    });
    console.log(user);
    console.log(initialRights);

    setSelectedUser(user);
    setSelectedRights(initialRights);
    setOpenDialog(true);
  };







  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setSelectedRights({});
  };

  // Handle checkbox change for each page
  const handleCheckboxChange = (pageName, right) => {
// i need to work on this rights if we see here carefully

    const updatedRights = selectedRights[pageName].includes(right)
      ? selectedRights[pageName].filter((r) => r !== right)
      : [...selectedRights[pageName], right];

      
    setSelectedRights({ ...selectedRights, [pageName]: updatedRights });


  };

  // Save the updated rights when clicking "Save"
  const handleSaveRights = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          pages: user.pages.map((page) =>
            page.pageName in selectedRights ? { ...page, rights: selectedRights[page.pageName] } : page
          ),
        };
      }
      return user;
    });

    setUsers(updatedUsers);
    handleCloseDialog(); // Close the dialog after saving
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Rights</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleOpenDialog(user)}>
                  Set Rights
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>






      {/* Rights Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div style={{ padding: '20px', width: '500px' }}>
          <h3>Set Rights for {selectedUser?.name}</h3>

          {/* Rights form with column labels */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Page Name</TableCell>
                <TableCell>Read</TableCell>
                <TableCell>Write</TableCell>
                <TableCell>Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
              selectedUser?.pages.map((page) => (

                <TableRow key={page.pageName}>

                  <TableCell>{page.pageName}</TableCell>

                  <TableCell>
                    <Checkbox
                      checked={selectedRights[page.pageName]?.includes('Read')}
                      onChange={() => handleCheckboxChange(page.pageName, 'Read')}
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={selectedRights[page.pageName]?.includes('Write')}
                      onChange={() => handleCheckboxChange(page.pageName, 'Write')}
                    />
                  </TableCell>

                  <TableCell>
                    <Checkbox
                      checked={selectedRights[page.pageName]?.includes('Admin')}
                      onChange={() => handleCheckboxChange(page.pageName, 'Admin')}
                    />
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Action buttons */}
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveRights}
              style={{ marginRight: '10px' }}
            >
              Save
            </Button>
            <Button variant="outlined" onClick={handleCloseDialog}>
              Cancel
            </Button>
          </div>

        </div>
      </Dialog>

      {/* Displaying updated users array */}
      <div style={{ marginTop: '20px' }}>
        <h3>Updated User Rights</h3>
        <pre>{JSON.stringify(users, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Page;
