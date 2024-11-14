'use client';
// import jsPDF from 'jspdf';
import { FaDownload } from 'react-icons/fa';
import { jsPDF } from 'jspdf';  // Make sure you import this way
import 'jspdf-autotable';

const DownloadPDFButton = ({ data, filename = 'table_data.pdf' }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.text('Referral Reports Data', 14, 16);

    // Generate headers dynamically from the data keys
    const headers = Object.keys(data[0] || {}); // Default to empty object if data is empty

    // Format data for autoTable
    const tableData = data.map((item, index) => [
      index + 1, 
      ...headers.map(header => item[header] || 'N/A')
    ]);

    // Use autoTable to generate the table
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30,  // Starting position for the table
      theme: 'grid',
      styles: {
        fontSize: 6,  // Font size for table cells
        cellPadding: 1, // Padding inside cells
        valign: 'middle', // Vertical alignment of text in cells
      },
      columnStyles: {
        // Adjust column widths if necessary
        0: { cellWidth: 10 }, // ID column width
        1: { cellWidth: 30 }, // Adjust other columns similarly
        2: { cellWidth: 50 },
        3: { cellWidth: 30 },
        // Add more column styles as needed
      },
      margin: { left: 10, top: 20 },
    });

    // Save the PDF
    doc.save(filename);
  };

  return (
    <button onClick={downloadPDF} className="bg-green-500 text-white p-3 m-1 rounded">
      <FaDownload />
    </button>
  );
};

export default DownloadPDFButton;
