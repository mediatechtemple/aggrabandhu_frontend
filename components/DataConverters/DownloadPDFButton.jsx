'use client';
import jsPDF from 'jspdf';
import { FaDownload } from 'react-icons/fa';

const DownloadPDFButton = ({ data, filename = 'table_data.pdf' }) => {
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(10);
    doc.text('Referral Reports Data', 14, 16);

    // Headers
    const headers = ['No.', 'ID', 'Refer From', 'Reference ID', 'Name', 'Mobile No.', 'Refer Count', 'Address'];
    let yPosition = 30;

    // Fixed column widths
    const fixedWidth = 18; // Width for columns No., ID, Refer From, Reference ID, Mobile No., Refer Count
    const nameWidth = 40;  // Width for Name column
    const addressWidth = 50; // Max width for Address column (will wrap text)

    // Adding headers to PDF
    doc.setFontSize(6);
    headers.forEach((header, index) => {
      let xPosition;

      if (index === 0) {
        xPosition = 6; // No.
      } else if (index === 1) {
        xPosition = 6 + fixedWidth; // ID
      } else if (index === 2) {
        xPosition = 6 + fixedWidth * 2; // Refer From
      } else if (index === 3) {
        xPosition = 6 + fixedWidth * 3; // Reference ID
      } else if (index === 4) {
        xPosition = 6 + fixedWidth * 4; // Name
      } else if (index === 5) {
        xPosition = 6 + fixedWidth * 4 + nameWidth; // Mobile No.
      } else if (index === 6) {
        xPosition = 6 + fixedWidth * 4 + nameWidth + fixedWidth; // Refer Count
      } else if (index === 7) {
        xPosition = 6 + fixedWidth * 4 + nameWidth + fixedWidth + fixedWidth; // Address
      }

      doc.text(header, xPosition, yPosition);
    });

    // Adding table rows to PDF
    yPosition += 10;
    data.forEach((item, index) => {
      const row = [
        index + 1,                     // Serial No.
        item.id || 'N/A',              // ID
        item.referFrom || 'N/A',       // Refer From
        item.reference_id || 'N/A',    // Reference ID
        item.name || 'N/A',            // Name
        item.mobile_no || 'N/A',       // Mobile No.
        item.referCount || 'N/A',      // Refer Count
        item.address || 'N/A'          // Address
      ];

      row.forEach((text, colIndex) => {
        let xPosition;

        if (colIndex === 0) {
          xPosition = 6; // No.
        } else if (colIndex === 1) {
          xPosition = 6 + fixedWidth; // ID
        } else if (colIndex === 2) {
          xPosition = 6 + fixedWidth * 2; // Refer From
        } else if (colIndex === 3) {
          xPosition = 6 + fixedWidth * 3; // Reference ID
        } else if (colIndex === 4) {
          xPosition = 6 + fixedWidth * 4; // Name
        } else if (colIndex === 5) {
          xPosition = 6 + fixedWidth * 4 + nameWidth; // Mobile No.
        } else if (colIndex === 6) {
          xPosition = 6 + fixedWidth * 4 + nameWidth + fixedWidth; // Refer Count
        } else if (colIndex === 7) {
          xPosition = 6 + fixedWidth * 4 + nameWidth + fixedWidth + fixedWidth; // Address
        }

        // Adjust yPosition for Address to allow text wrapping
        if (colIndex === 7) {
          const addressLines = doc.splitTextToSize(text, addressWidth); // Wrap text
          addressLines.forEach((line, lineIndex) => {
            doc.text(line, xPosition, yPosition + (lineIndex * 6)); // 6 is the line height
          });
          // Increase yPosition after address text
          yPosition += addressLines.length * 6;
        } else {
          doc.text(String(text), xPosition, yPosition);
        }
      });

      // Add a new page if content goes beyond the page height
      if (yPosition > 280) {
        doc.addPage();
        yPosition = 20; // Reset y position for new page
      }
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
