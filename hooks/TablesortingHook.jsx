import { useState } from 'react';

// Utility function to access nested keys
const getNestedValue = (obj, key) => {
  return key.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const useSortableData = (items, config = { key: '', direction: '' }) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = [...items].sort((a, b) => {
    if (sortConfig.key) {
      const valueA = getNestedValue(a, sortConfig.key);
      const valueB = getNestedValue(b, sortConfig.key);

      if (valueA < valueB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return '↑↓';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return { sortedItems, requestSort, getSortIcon, sortConfig };
};

export default useSortableData;
