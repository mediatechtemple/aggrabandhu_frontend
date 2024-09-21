'use client'
import React, { useState } from 'react';
import { Button, Checkbox, Dialog, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const UserTable = ({ users }) => {
  const [showModal, setShowModal] = useState(false);
  const [addedUsers, setAddedUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRights, setSelectedRights] = useState({});

  const handleAdd = (user) => {
    if (!addedUsers.some((u) => u.id === user.id)) {
      setAddedUsers([...addedUsers, user]);
    }
  };

  const handleAddRights = (user) => {
    setSelectedUser(user);
    setOpenDialog(true);

    // Initialize the selectedRights state with the existing rights of the user
    setSelectedRights(
      user.pages.reduce((acc, page) => {
        acc[page.pageName] = page.rights || [];
        return acc;
      }, {})
    );
  };

  const handleCheckboxChange = (pageName, right) => {
    setSelectedRights((prevRights) => {
      const rightsForPage = prevRights[pageName] || [];
      if (rightsForPage.includes(right)) {
        return {
          ...prevRights,
          [pageName]: rightsForPage.filter((r) => r !== right),
        };
      } else {
        return {
          ...prevRights,
          [pageName]: [...rightsForPage, right],
        };
      }
    });
  };

  const handleSaveRights = () => {
    // Update the selected user's pages with the new rights
    const updatedUsers = addedUsers.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          pages: user.pages.map((page) => ({
            ...page,
            rights: selectedRights[page.pageName] || [],
          })),
        };
      }
      return user;
    });

    setAddedUsers(updatedUsers);
    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setShowModal(true)}
          variant="contained"
          color="primary"
        >
          Show Table
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">User Table</h2>
              <Button onClick={() => setShowModal(false)}>✖</Button>
            </div>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleAdd(user)}
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {addedUsers.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Added Users</h3>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {addedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddRights(user)}
                    >
                      Add Rights
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialog for setting rights */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div style={{ padding: '20px', width: '500px' }}>
          <h3>Set Rights for {selectedUser?.name}</h3>
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
              {selectedUser?.pages.map((page) => (
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
    </div>
  );
};

// Sample usage with initialUsers array
const App = () => {
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

  return <UserTable users={initialUsers} />;
};

export default App;
