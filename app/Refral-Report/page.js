'use client';
import React, { useState } from 'react';

// Sample data
const members = [
  {
    SNo: 1,
    memberId: 'M001',
    memberName: 'John Doe',
    phoneNo: '123-456-7890',
    address: '123 Main St, New York, NY',
    referenceId: 'R12345',
    totalReferred: 5
  },
  {
    SNo: 2,
    memberId: 'M002',
    memberName: 'Jane Smith',
    phoneNo: '987-654-3210',
    address: '456 Oak Ave, Los Angeles, CA',
    referenceId: 'R67890',
    totalReferred: 3
  },
  {
    SNo: 3,
    memberId: 'M003',
    memberName: 'Alice Johnson',
    phoneNo: '555-555-5555',
    address: '789 Pine Rd, Chicago, IL',
    referenceId: 'R11223',
    totalReferred: 8
  }
];

const columns = [
  { key: 'SNo', label: 'S.No' },
  { key: 'memberId', label: 'Member Id' },
  { key: 'memberName', label: 'Member Name' },
  { key: 'phoneNo', label: 'Phone No' },
  { key: 'address', label: 'Address' },
  { key: 'referenceId', label: 'Reference Id' },
  { key: 'totalReferred', label: 'Total Referred' }
];

const Page = () => {
  const [sortConfig, setSortConfig] = useState(null);

  // Function to display sort arrows
  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) {
      return '↑↓'; // Show both arrows by default
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort the data based on sortConfig
  const sortedMembers = React.useMemo(() => {
    if (sortConfig !== null) {
      return [...members].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return members;
  }, [sortConfig]);

  return (
    <div className='overflow-x-auto'>
      <table className='w-full table-auto border-collapse border border-gray-300'>
        <thead>
          <tr>
            {columns.map(({ key, label }) => (
              <th
                key={key}
                className='p-2 bg-customBlue border text-white cursor-pointer'
                onClick={() => handleSort(key)}
              >
                <span>{label}</span>
                <span className='m-1 w-6 inline-block text-center'>{getSortIcon(key)}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedMembers.map((item) => (
            <tr key={item.SNo}>
              <td className='p-2 text-center border'>{item.SNo}</td>
              <td className='p-2 text-center border'>{item.memberId}</td>
              <td className='p-2 text-center border'>{item.memberName}</td>
              <td className='p-2 text-center border'>{item.phoneNo}</td>
              <td className='p-2 text-center border'>{item.address}</td>
              <td className='p-2 text-center border'>{item.referenceId}</td>
              <td className='p-2 text-center border'>{item.totalReferred}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
