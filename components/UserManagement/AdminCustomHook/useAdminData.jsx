import { useState, useEffect } from 'react';

const useAdminData = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const getAdminData = async () => {
    try {
      const response = await fetch('https://backend.aggrabandhuss.org/api/auth/addrole/');
      if (!response.ok) throw new Error('Data fetch error from admin');
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdminData();
  }, []);

  const filteredUsers = allUsers.filter(user => 
    user.mobile_no.includes(searchQuery) || user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const filteredUsers=[];

  return { allUsers, searchQuery, setSearchQuery, filteredUsers };
};

export default useAdminData;
