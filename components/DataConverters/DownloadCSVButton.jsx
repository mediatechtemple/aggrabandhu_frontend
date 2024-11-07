import { FaFileCsv } from 'react-icons/fa';
const DownloadCSVButton = ({ data, filename = 'table_data.csv' }) => {
  
    const convertToCSV = (data) => {
      // Extracting headers
      const headers = Object.keys(data[0]);
      const csvRows = [];
  
      // Add headers row
      csvRows.push(headers.join(','));
  
      // Looping through each row
      data.forEach(row => {
        const values = headers.map(header => JSON.stringify(row[header])); // Removed replacer
        csvRows.push(values.join(','));
      });
  
      return csvRows.join('\n');
    };
  
    const downloadCSV = () => {
      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
      // Creating a download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
  
      link.click();
      URL.revokeObjectURL(url); // Cleaning up the URL object
    };
  
    return (
      <button onClick={downloadCSV} className="bg-blue-500 text-white p-3 rounded">
       <FaFileCsv />
      </button>
    );
  };

  export default DownloadCSVButton;