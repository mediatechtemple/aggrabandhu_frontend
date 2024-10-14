'use client'
import React, { useEffect, useState } from 'react';

const column = [
  { key: 'SNo', value: 'S No' },
  { key: 'id', value: 'memberId' },
  { key: 'reference_id', value: 'referenceId' },
  { key: 'name', value: 'memberName' },
  { key: 'mobile_no', value: 'phoneNo' },
  { key: 'address', value: 'address' },
];

const Page = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // search term for filtering

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://backend.aggrabandhuss.org/api/member/referal/' + JSON.parse(localStorage.getItem('user')).userid);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

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
                <td className="p-2 text-center border">{item.id}</td>
                <td className="p-2 text-center border">{item.reference_id}</td>
                <td className="p-2 text-center border">{item.name}</td>
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
