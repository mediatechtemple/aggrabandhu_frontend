'use client'
import React, { useState } from 'react';

const SortableTable = () => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  // Static data
  const data = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  // Columns definition (for mapping)
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
  ];

  // Utility function for sorting icons
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return '↑↓';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  // Sorting logic
  const sortedData = [...data].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  // Sort toggle function
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="border border-gray-300 p-2 cursor-pointer"
              onClick={() => handleSort(column.key)}
            >
              {column.label} {getSortIcon(column.key)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.id}>
            <td className="border border-gray-300 p-2">{item.name}</td>
            <td className="border border-gray-300 p-2">{item.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
