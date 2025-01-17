'use client'
import React from 'react';
import useDateRangeFilter from './useDateRangeFilter'; // Assume the hook is in the same folder

const data = [
  { id: 1, name: 'Arjun', fatherName: 'Rajesh', date: '2024-11-01' },
  { id: 2, name: 'Ravi', fatherName: 'Suresh', date: '2024-11-05' },
  { id: 3, name: 'Anita', fatherName: 'Rakesh', date: '2024-11-08' },
  { id: 4, name: 'Pooja', fatherName: 'Mohan', date: '2024-11-10' },
  { id: 5, name: 'Kiran', fatherName: 'Jagdish', date: '2024-11-12' },
];

const DateRangeFilterTable = () => {
  const { filteredData, startDate, setStartDate, endDate, setEndDate } = useDateRangeFilter(data);

  return (
    <div className="p-4">
        <div className="flex space-x-4 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded p-2"
            placeholder="Start Date"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded p-2"
            placeholder="End Date"
          />
        </div>
      
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Name</th>
            <th className="py-2 px-4 border-b text-center">Father Name</th>
            <th className="py-2 px-4 border-b text-center">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b text-center">{item.name}</td>
              <td className="py-2 px-4 border-b text-center">{item.fatherName}</td>
              <td className="py-2 px-4 border-b text-center">{item.date}</td>
            </tr>
          ))}
          {filteredData.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center py-2 px-4">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DateRangeFilterTable;
