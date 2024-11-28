// hooks/useSortableData.js
import { useState, useMemo } from 'react';

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
  
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue;
        let bValue;
  
        // Check if the key exists inside the 'Member' object
        if (a.Member && a.Member.hasOwnProperty(sortConfig.key)) {
          aValue = a.Member[sortConfig.key];
        } else {
          aValue = a[sortConfig.key];
        }
  
        if (b.Member && b.Member.hasOwnProperty(sortConfig.key)) {
          bValue = b.Member[sortConfig.key];
        } else {
          bValue = b[sortConfig.key];
        }
  
        // Convert to numbers if the key is 'amount'
        if (sortConfig.key === 'amount') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }
  
        // Convert to Date objects if the key is 'donation_date'
        if (sortConfig.key === 'donation_date') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        }
  
        // Perform the sorting
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  
    return sortableItems;
  }, [items, sortConfig]);
  



  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (!sortConfig || sortConfig.key !== key) return '↑↓';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return { items: sortedItems, requestSort, getSortIcon, sortConfig };
};

export default useSortableData;
