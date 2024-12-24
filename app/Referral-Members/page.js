'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const column = [
  { key: 'SNo', value: 'S.No' },
  { key: 'id', value: 'Member Id' },
  // { key: 'reference_id', value: 'referenceId' },
  { key: 'name', value: 'Member Name' },
  { key: 'profileUrl', value: 'Member Photo' },
  { key: 'father_name', value: 'Father Name' },
  { key: 'mobile_no', value: 'PhoneNo' },
  { key: 'address', value: 'Address' },
];

const Page = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // search term for filtering
  const [token,setToken]=useState(null);

  const [page,setPage]=useState(1);
  const [totalPages,setTotalPages]=useState(1);



  function getIcon(key) {
    if (!sortConfig || sortConfig.key !== key) {
      return '↑↓';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  }

  function handleSort(key) {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }

  const sortedData = members.sort((a, b) => {
    if (!sortConfig) return 0; // No sorting applied

    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((member) =>
    Object.values(member).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // useEffect(() => {
  //   const fetchData = async (token) => {
  //     try {
  //       const response = await fetch(
  //         `https://backend.aggrabandhuss.org/api/member/referal/${JSON.parse(localStorage.getItem('user')).userid}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `${token}`,
  //           },
  //         }
  //       );
  
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch data');
  //       }
  
  //       console.log(response);
  //       const data = await response.json();
  //       setMembers(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   // Check if user exists in localStorage
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (user && user.token) {
  //     const token = user.token;
  //     setToken(token); // Assuming setToken is defined in your component
  //     fetchData(token);
  //   } else {
  //     setError('User not logged in or invalid token');
  //     setLoading(false);
  //   }
  // }, []); 

  const fetchData = async (lim,page=1) => {
    try {
      // Retrieve user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));

      // Check if user exists and has a valid token
      if (!user || !user.token) {
        throw new Error('User not logged in or invalid token');
      }

      // Set token if needed
      setToken(user.token);

      const response = await fetch(
        `https://backend.aggrabandhuss.org/api/member/referal/${user.userid}?limit=${lim}&&page=${page}`,
        {
          method: 'GET',
          headers: {
            Authorization: `${user.token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setMembers(data);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  
    fetchData();
  }, []);
  
 
  







  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
    <div>
      <p className='w-full p-2 bg-blue-500 text-white text-center text-2xl font-serif'>Referred Members</p>
    </div>
      <div className='flex justify-end mt-2'>
        <input
          type="text"
          placeholder="Search referred member"
          className="p-3 w-full max-w-md rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        />
      </div>
      <div>

        <table className="min-w-full border-collapse border border-red-500 border-spacing-1">
          <thead>
            <tr>
              {column.map(({ key, value }) => (
                <th
                  key={key}
                  onClick={() => key !== 'SNo' && handleSort(key)} // Handle sorting except for 'SNo'
                  className="bg-blue-500 text-white border border-spacing-1 border-gray-300 p-3 cursor-pointer"
                >
                  <span>{value}</span>
                  {key !== 'SNo' && <span>{getIcon(key)}</span>}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item.id}>
                <td className="p-2 text-center border">{index + 1}</td>
                <td className="p-2 text-center border">{item.reference_id}</td>
                {/* <td className="p-2 text-center border">{item.reference_id}</td> */}
                <td className="p-2 text-center border">{item.name}</td>
                <td className=" flex justify-center text-center border">
                 { item.profileUrl && <Image src={`https://backend.aggrabandhuss.org${item.profileUrl}`} width={80} height={60}  className='h-16 text-center' />
               } </td>
                <td className="p-2 text-center border">{item.father_name}</td>
                <td className="p-2 text-center border">{item.mobile_no}</td>
                <td className="p-2 text-center border">{item.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Page;
