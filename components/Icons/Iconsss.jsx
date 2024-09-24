'use client'
import React from 'react';
import { IconButton, Box } from '@mui/material';
import { GetApp as GetAppIcon, PictureAsPdf as PictureAsPdfIcon, Print as PrintIcon, FileCopy as FileCopyIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const Iconsss = ({ dataObject,tableId, columnsToExclude = [] }) => {

    const copyToClipboard = () => {
        const table = document.getElementById(tableId);
        const rows = Array.from(table.querySelectorAll('tr'));
        const data = rows.map(row => {
          const cells = Array.from(row.querySelectorAll('th, td'))
            .filter((_, index) => !columnsToExclude.includes(index))
            .map(cell => cell.textContent.trim());
          return cells.join('\t');
        });
        navigator.clipboard.writeText(data.join('\n'));
        alert('Data copied to clipboard!');
      };
      
      const printTable = () => {
        const tableElement = document.getElementById(tableId);
        if (!tableElement) return;
      
        const printContent = tableElement.outerHTML;
        const printWindow = window.open('', '', 'height=600,width=800');
      
        printWindow.document.write('<html><head><title>Print Table</title></head><body>');
        printWindow.document.write(printContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
      
      
      const generatePdf = () => {

        const doc = new jsPDF();
        doc.text('Table Data', 14, 10);
      
        const table = document.getElementById(tableId);

        const rows = Array.from(table.querySelectorAll('tr')).map(row =>
          Array.from(row.querySelectorAll('th, td'))
            .filter((_, index) => !columnsToExclude.includes(index))
            .map(cell => cell.textContent.trim())
        );
      
        doc.autoTable({
          head: [rows[0]],
          body: rows.slice(1),
        });
      
        doc.save('table_data.pdf');

      };
      

      const downloadCsvFromArray = (dataArray) => {
        // Check if dataArray is empty
        if (!dataArray.length) {
            console.error('No data available to download.');
            return;
        }
    
        // Get headers from the first object
        const headers = Object.keys(dataArray[0]);
    
        // Map through the array to create rows
        const csvContent = [
            headers.join(','), // Join headers with commas
            ...dataArray.map(dataObject => {
                // Create a copy of the object and delete the 'nominees' field if it exists
                const objectCopy = { ...dataObject };
                delete objectCopy.nominees;
                // Get the values and join with commas
                return headers.map(header => `"${objectCopy[header] || ''}"`).join(',');
            })
        ].join('\n');
    
        // Create a Blob from the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'data_array.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };





      const downloadCsv = () => {
        const table = document.getElementById(tableId);
        const rows = Array.from(table.querySelectorAll('tr'));
        const csvContent = rows.map(row => {
          const cells = Array.from(row.querySelectorAll('th, td'))
            .filter((_, index) => !columnsToExclude.includes(index))
            .map(cell => `"${cell.textContent.trim()}"`);
          return cells.join(',');
        }).join('\n');
      
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'table_data.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
      
      
      
  return (
    <Box >
      <IconButton onClick={()=>downloadCsvFromArray(dataObject)} aria-label="Download CSV" sx={{ border: '1px solid #969999', 
      borderRadius: '0', 
      padding: '8px',}}>
        <GetAppIcon />
      </IconButton>

      <IconButton onClick={generatePdf} aria-label="Download PDF" sx={{ border: '1px solid #969999', 
      borderRadius: '0', 
      marginLeft:'1px',
      padding: '8px',}}>
        <PictureAsPdfIcon />
      </IconButton>

      <IconButton onClick={printTable} aria-label="Print" sx={{ border: '1px solid #969999', 
      borderRadius: '0', 
      marginLeft:'1px',
      padding: '8px',}}>
        <PrintIcon />
      </IconButton>

      <IconButton onClick={copyToClipboard} aria-label="Copy" sx={{ border: '1px solid #969999', 
      borderRadius: '0', 
      marginLeft:'1px',
      padding: '8px',}}>
        <FileCopyIcon />
      </IconButton>

    </Box>
  );
};

export default Iconsss;









