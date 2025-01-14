'use client';
import React, { useEffect, useMemo, useState } from 'react';
import useAdminData from './AdminCustomHook/useAdminData';
import useSelectedUsers from './AdminCustomHook/useSelectedUsers';
import useDialog from './AdminCustomHook/useDialog';
// import useCheckboxes from './AdminCustomHook/useCheckboxes';
import PermissionsDialog from './PermissionsDialog';
import AdminForm from './AdminForm'
import ChangePassword from './ChangePassword';

const UserManagement = () => {
  const { dialogOpen, 
    searchDialogOpen, 
    handleDialogOpen, 
    handleDialogClose, 
    handleSearchDialogOpen, 
    handleSearchDialogClose ,
    // selectedAdmin
  } = useDialog();

  const { allUsers, searchQuery, setSearchQuery, filteredUsers,getAdminData } = useAdminData();
  const { selectedUsers, addUser } = useSelectedUsers();
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [chanegepaswordShowPopup, setChanegepaswordShowPopup] = useState(false);
  const [changepasswordId,setChangepasswordId]=useState(null);
  // const initialPermissions = useMemo(() => ({
  //   "User Management": { view: false, add: false, edit: false, delete: false },
  //   "Member Management": { view: false, add: false, edit: false, delete: false },
  //   "Donation Management": { view: false, add: false, edit: false, delete: false },
  //   "Rules & Reg. Management": { view: false, add: false, edit: false, delete: false },
  //   "Input Management": { view: false, add: false, edit: false, delete: false },
  //   "Notification Management": { view: false, add: false, edit: false, delete: false },
  //   "Websites Management": { view: false, add: false, edit: false, delete: false }
  // }), []);


  
  const [permissions, setPermissions] = useState(selectedUsers.role || null);


  useEffect(() => {
    const updatedPermissions = {};
    selectedUsers.forEach(user => {
      updatedPermissions[user.id]={...user.role}
    });
    setPermissions(updatedPermissions);
  }, [selectedUsers]);


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

  const deleteAdmin=async(id)=>{
   try{
    const response=await fetch(`https://backend.aggrabandhuss.org/api/auth/users/${id}`,{
      method:'DELETE'
    })
    if(!response.ok){
      throw new Error(' Admin Not deleted')
    }
    const data=await response.json();
    alert('Admin Deleted');
    getAdminData()

   }catch(error){
    alert(error)
   }

  }
  


  return (
    <>
    

      {showPopup && <AdminForm 
      onClose={() => setShowPopup(false)}
      getAdminData={getAdminData}
       />}



     {chanegepaswordShowPopup && <ChangePassword 
     changepasswordId={changepasswordId}
      onClose={() => setChanegepaswordShowPopup(false)}
      getAdminData={getAdminData}
       />}

    <div className="container mx-auto p-4">
      <h2 className="bg-blue-700 text-white text-center py-2 my-4">User Management</h2>

      <div className='flex justify-end pb-2'>
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded" 
        onClick={() => setShowPopup(true)}
      >
        Create Admin
      </button>

      </div>


      <div className="flex justify-end mb-4">
        {/* <button
          onClick={handleSearchDialogOpen}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Search
        </button> */}
        <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Search by ID or name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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
            {filteredUsers.map(user => (
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
                  <button onClick={()=>deleteAdmin(user.admin_id)} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Delete</button>
                  <button onClick={()=>{
                    setChangepasswordId(user.admin_id)
                    setChanegepaswordShowPopup(true);
                  }} className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">Change Password</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>





      {selectedAdmin && permissions  &&
       <PermissionsDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        // checkboxes={checkboxes}
        // initialPermissions={initialPermissions}
        permissions={permissions}
        handleCheckboxChange={handleCheckboxChange}
        selectedAdmin={selectedAdmin}
        handleSubmitPermissions={handleSubmitPermissions}
      />}

    </div>
    </>
  );
};

export default UserManagement;
