import { useState } from 'react';

const useDateRangeFilter = (data) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return itemDate >= start && itemDate <= end;
    } else if (start) {
      return itemDate >= start;
    } else if (end) {
      return itemDate <= end;
    } else {
      return true; // No filter applied, include all items
    }
  });

  return { filteredData, startDate, setStartDate, endDate, setEndDate };
};

export default useDateRangeFilter;
