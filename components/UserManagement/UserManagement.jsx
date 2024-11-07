'use client';
import React, { useEffect, useMemo, useState } from 'react';
import useAdminData from './AdminCustomHook/useAdminData';
import useSelectedUsers from './AdminCustomHook/useSelectedUsers';
import useDialog from './AdminCustomHook/useDialog';
// import useCheckboxes from './AdminCustomHook/useCheckboxes';
import PermissionsDialog from './PermissionsDialog';

const UserManagement = () => {
  const { dialogOpen, 
    searchDialogOpen, 
    handleDialogOpen, 
    handleDialogClose, 
    handleSearchDialogOpen, 
    handleSearchDialogClose ,
    // selectedAdmin
  } = useDialog();

  const { allUsers, searchQuery, setSearchQuery, filteredUsers } = useAdminData();
  const { selectedUsers, addUser } = useSelectedUsers();
  const [selectedAdmin, setSelectedAdmin] = useState(null);


  const initialPermissions = useMemo(() => ({
    "User Management": { view: false, add: false, edit: false, delete: false },
    "Member Management": { view: false, add: false, edit: false, delete: false },
    "Donation Management": { view: false, add: false, edit: false, delete: false },
    "Rules & Reg. Management": { view: false, add: false, edit: false, delete: false },
    "Input Management": { view: false, add: false, edit: false, delete: false },
    "Notification Management": { view: false, add: false, edit: false, delete: false },
    "Websites Management": { view: false, add: false, edit: false, delete: false }
  }), []);


  
  const [permissions, setPermissions] = useState({});


  useEffect(() => {
    const updatedPermissions = {};
    selectedUsers.forEach(user => {
      updatedPermissions[user.admin_id] = { ...initialPermissions };
    });
    setPermissions(updatedPermissions);
  }, [selectedUsers,initialPermissions]);

  useEffect(()=>{
    console.log(selectedUsers)
    console.log(permissions)
    console.log(selectedAdmin)
  },[permissions,selectedUsers,selectedAdmin])
  

  const handleCheckboxChange = (e, page, permission) => {
    const { checked } = e.target;
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [selectedAdmin]: {
        ...prevPermissions[selectedAdmin],
        [page]: {
          ...prevPermissions[selectedAdmin][page],
          [permission]: checked,
        },
      },
    }));
  };

  const adminSelectedHandler=(user)=>{
    setSelectedAdmin(user);
    handleDialogOpen()
  }


  const handleSubmitPermissions = async () => {
    try {
      // Close the dialog
     
      
      // Define the payload
      const payload = {
        role: permissions[selectedAdmin],
      };
      handleDialogClose();
      console.log(payload);

      return;

      // Make the API request
      const response = await fetch(`https://backend.aggrabandhuss.org/api/auth/addrole/${selectedAdmin}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ...payload 
        }),
      });
  
      // Check if the request was successful
      if (response.ok) {
        console.log('Permissions updated successfully for Id', selectedAdmin, payload);
        handleDialogClose();
      } else {
        const errorData = await response.json();
        console.error('Failed to update permissions:', errorData.message);
        handleDialogClose();
      }
    } catch (error) {
      console.error('An error occurred while updating permissions:', error.message);
      handleDialogClose();
    }
  };
  


  return (
    <div className="container mx-auto p-4">
      <h2 className="bg-blue-700 text-white text-center py-2 my-4">User Management</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleSearchDialogOpen}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Search
        </button>
      </div>




















      <h3 className="bg-blue-700 text-white text-center py-2">Selected Users</h3>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Mobile No</th>
              <th className="border border-gray-300 px-4 py-2">Right</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedUsers.map(user => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.name}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{user.mobile_no}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button
                    onClick={() =>adminSelectedHandler(user.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Right
                  </button>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center space-x-2">
                  <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">Edit</button>
                  <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>





      {selectedAdmin  &&
       <PermissionsDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        // checkboxes={checkboxes}
        initialPermissions={initialPermissions}
        permissions={permissions}
        handleCheckboxChange={handleCheckboxChange}
        selectedAdmin={selectedAdmin}
        handleSubmitPermissions={handleSubmitPermissions}
      />}


















      {/* Search Dialog */}
      {searchDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-[2800]">
          <div className="bg-white rounded-lg w-3/4 md:w-1/2 lg:w-1/3 p-4">
            <h3 className="text-lg font-semibold mb-4">Search Registered Users</h3>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Search by ID or name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="max-h-64 overflow-y-auto border border-gray-300 rounded">
              <table className="table-auto w-full border border-gray-300">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">Mobile No</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td className="border border-gray-300 px-4 py-2 text-center">{user.name}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{user.mobile_no}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => addUser(user)}
                          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSearchDialogClose}
                className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}













      
    </div>
  );
};

export default UserManagement;
