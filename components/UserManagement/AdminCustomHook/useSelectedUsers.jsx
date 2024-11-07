import { useEffect, useState } from 'react';

const useSelectedUsers = () => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const addUser = async (user) => {
    console.log(user)
    try {
      const response = await fetch('https://backend.aggrabandhuss.org/api/auth/addrole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin_id: user.id,name:user.name,mobile_no:user.mobile_no }),
      });

      if (!response.ok) throw new Error('Failed to add role');

      const result = await response.json();
      console.log(result);
      console.log('Role added successfully:', result);

      if (!selectedUsers.some(selected => selected.id === user.id)) {
        setSelectedUsers([...selectedUsers, user]);
      }
    } catch (error) {
      console.error('Error adding role:', error);
    }
  };

  
  const getAdminData = async () => {
    try {
      const response = await fetch('https://backend.aggrabandhuss.org/api/auth/addrole');
      if (!response.ok) throw new Error('Data fetch error from admin');
      const data = await response.json();
      setSelectedUsers(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    getAdminData();
  }, []);


  return { selectedUsers, addUser };
};

export default useSelectedUsers;
