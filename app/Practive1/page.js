'use client';
import { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Dialog, Checkbox } from '@mui/material';

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
  const [showPopup, setShowPopup] = useState(false);
  const [addedItems, setAddedItems] = useState([]);



  const handleAdd = (item) => {
    if (!addedItems.some(addedItem => addedItem.id === item.id)) {
      setAddedItems([...addedItems, item]);
    }
  };

  const handleOpenDialog = (user) => {
    const initialRights = {};
    user.pages.forEach((page) => {
      initialRights[page.pageName] = page.rights;
    });

    setSelectedUser(user);
    setSelectedRights(initialRights);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setSelectedRights({});
  };

// Here i got this one brother let's we start it to gvie it back 

  const handleCheckboxChange = (pageName, right) => {

    const updatedRights = selectedRights[pageName].includes(right)
      ? selectedRights[pageName].filter((r) => r !== right)
      : [...selectedRights[pageName], right];

    setSelectedRights({ ...selectedRights, [pageName]: updatedRights });

  };


// here i need to debug brother let's we start but happen here
  const handleSaveRights = () => {

    const updatedUsers = users.map((user) => {
      if (user.id === selectedUser.id) {
        return {
          ...user,
          pages: user.pages.map((page) =>
            page.pageName in selectedRights
              ? { ...page, rights: selectedRights[page.pageName] }
              : page
          ),
        };
      }
      return user;
    });



    setUsers(updatedUsers);
    handleCloseDialog();
  };



  return (
    <>
      <div className="flex flex-col items-center">
        <button
          onClick={() => setShowPopup(true)}
          className="ml-auto mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Open Table
        </button>

        {showPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
              <h2 className="text-lg font-semibold mb-4">User Table</h2>
              <table className="min-w-full border">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Name</th>
                    <th className="border px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item) => (
                    <tr key={item.id}>
                      <td className="border px-4 py-2">{item.id}</td>
                      <td className="border px-4 py-2">{item.name}</td>
                      <td className="border px-4 py-2">
                        <button
                          onClick={() => handleAdd(item)}
                          className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <button>search</button>
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

        <div style={{ marginTop: '20px' }}>
          <h3>Updated User Rights</h3>
          <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
      </div>
    </>
  );
};

export default Page;
