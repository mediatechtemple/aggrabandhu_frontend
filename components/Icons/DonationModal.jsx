'use client'
import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import Icon from '../Icons/Icon';
import Iconsss from '../Icons/Iconsss';

const DonationModal = ({ modalData, selectedRow, closeModal }) => {
  const [sortOrder, setSortOrder] = useState({ key: '', order: 'asc' });
  const [sortedData, setSortedData] = useState(modalData);

  const sortData = (key) => {
    const sorted = [...sortedData].sort((a, b) => {
      if (sortOrder.order === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      }
      return a[key] < b[key] ? 1 : -1;
    });

    setSortedData(sorted);
    setSortOrder({
      key,
      order: sortOrder.order === 'asc' ? 'desc' : 'asc',
    });
  };

  const getSortIndicator = (key) => (
    sortOrder.key === key
      ? (sortOrder.order === 'asc' ? <FaSortUp /> : <FaSortDown />)
      : <FaSort />
  );

  const totalAmount = sortedData.reduce((total, donation) => total + donation.amount, 0);

  const columns = [
    { key: 'serialNo', label: 'Serial No.' },
    { key: 'code', label: 'Code' },
    { key: 'name', label: 'Name' },
    { key: 'date', label: 'Date' },
    { key: 'amount', label: 'Amount' },
  ];

  return (
    <div
      onClick={closeModal}
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '10000',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          width: '60%',
          maxHeight: '70vh',
          overflowY: 'auto',
          borderRadius: '8px',
          zIndex: '1001',
        }}
      >
        <h2 style={{ backgroundColor: '#1976d2', color: 'white', padding: '5px', textAlign: 'center', marginBottom: '1px' }}>
          Donations for {selectedRow?.name}
        </h2>
        <Iconsss tableId="my-table" />
        <p style={{ color: 'black' }}><strong>Code:</strong> {selectedRow?.code}</p>
        <p style={{ color: 'black' }}><strong>Name:</strong> {selectedRow?.name}</p>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }} id="my-table">
            <thead>
              <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    onClick={() => sortData(column.key)}
                    style={{
                      cursor: 'pointer',
                      padding: '8px',
                      border: '1px solid #ddd',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {column.label} {getSortIndicator(column.key)}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((donation, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }}>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={{ border: '1px solid #ddd', padding: '8px', color: 'black' }}
                    >
                      {donation[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: '10px', fontWeight: 'bold', color: 'black' }}>Total Donations: ${totalAmount}</p>
        <button onClick={closeModal} style={{ marginTop: '20px', color: 'black' }}>Close</button>
      </div>
    </div>
  );
};

export default DonationModal;
