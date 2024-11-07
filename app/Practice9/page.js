'use client'
import { useEffect, useState } from 'react';

export default function UserPermissions() {
  const initialPermissions = {
    Dashboard: { view: false, add: false, edit: false, delete: false },
    Settings: { view: false, add: false, edit: false, delete: false },
    Reports: { view: false, add: false, edit: false, delete: false },
    
  };

  const [users, setUsers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);
    
  const [userPermissions, setUserPermissions] = useState({
    Alice: { ...initialPermissions },
    Bob: { ...initialPermissions },
    Charlie: { ...initialPermissions },
  });

  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ id: '', name: '' });

  useEffect(()=>{
    console.log(userPermissions);
  },[userPermissions])

  const handleRightsClick = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleCheckboxChange = (e, page, permission) => {
      const { checked } = e.target;
      console.log(checked,page,permission);
    setUserPermissions((prevPermissions) => ({
      ...prevPermissions,
      [selectedUser.name]: {
        ...prevPermissions[selectedUser.name],
        [page]: {
          ...prevPermissions[selectedUser.name][page],
          [permission]: checked,
        },
      },
    }));
  };

  const handleAddUser = () => {
    setShowAddUserForm(true);
  };

  const handleNewUserChange = (e) => {f
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmitNewUser = () => {
    setUsers((prevUsers) => [...prevUsers, newUser]);

    setUserPermissions((prevPermissions) => ({
      ...prevPermissions,
      [newUser.name]: { ...initialPermissions },
    }));
    setShowAddUserForm(false);
    setNewUser({ id: '', name: '' });
  };

  const handleSubmitPermissions = () => {
    setOpen(false);
    console.log('Updated permissions for', selectedUser.name,{ 
        role:userPermissions[selectedUser.name]});
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">User Permissions</h2>
      <button
        onClick={handleAddUser}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
      >
        Add User
      </button>

      {showAddUserForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[2800]">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Add New User</h3>
            <input
              type="text"
              name="id"
              value={newUser.id}
              onChange={handleNewUserChange}
              placeholder="Enter ID"
              className="border p-2 w-full mb-4"
            />
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleNewUserChange}
              placeholder="Enter Name"
              className="border p-2 w-full mb-4"
            />
            <button
              onClick={handleSubmitNewUser}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </div>
      )}

      <table className="w-full border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Rights</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border p-2 text-center">{user.id}</td>
              <td className="border p-2 text-center">{user.name}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleRightsClick(user)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Rights
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>










      {open && selectedUser && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[2800]">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white text-center py-3 font-semibold text-lg">
              Permissions for {selectedUser.name}
            </div>
            <div className="overflow-y-auto max-h-[500px]">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-gray-300 p-2 text-center">Page</th>
                    <th className="border border-gray-300 p-2 text-center">View</th>
                    <th className="border border-gray-300 p-2 text-center">Add</th>
                    <th className="border border-gray-300 p-2 text-center">Edit</th>
                    <th className="border border-gray-300 p-2 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(initialPermissions).map((page) => (
                    <tr key={page} className="hover:bg-gray-100">
                      <td className="border border-gray-300 p-2 text-center font-semibold">{page}</td>


                      {['view', 'add', 'edit', 'delete'].map((permission) => (
                        <td key={permission} className="border border-gray-300 p-2 text-center">
                          <input
                            type="checkbox"
                            checked={userPermissions[selectedUser.name][page][permission]}
                            onChange={(e) => handleCheckboxChange(e, page, permission)}
                            className="w-4 h-4 accent-blue-600"
                          />
                        </td>
                      ))}



                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end p-4">
              <button
                onClick={handleSubmitPermissions}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
