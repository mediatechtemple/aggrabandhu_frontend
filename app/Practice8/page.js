'use client'
import DownloadCSVButton from '@/components/DataConverters/DownloadCSVButton';
import React from 'react'
import jsPDF from 'jspdf';
import DownloadPDFButton from '@/components/DataConverters/DownloadPDFButton';






















const Page = () => {
  const tableData = [
    { name: 'Alice', age: 25, city: 'New York' },
    { name: 'Bob', age: 30, city: 'Los Angeles' },
    { name: 'Charlie', age: 35, city: 'Chicago' }
  ];

  return (
    <div>
      <DownloadCSVButton data={tableData} filename="my_data.csv" />
      <DownloadPDFButton data={tableData} filename="table_data.pdf" />
    </div>
  );
};

export default Page;
