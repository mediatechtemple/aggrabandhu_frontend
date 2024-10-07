'use client'
import React, { useState } from 'react';

const FileUploadComponent = () => {
  const [pdfFilePath, setPdfFilePath] = useState(''); // Store the file path for the uploaded PDF
  const [errorMessage, setErrorMessage] = useState(''); // Store error messages
  const [isUploading, setIsUploading] = useState(false); // Track upload status

  // Function to handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return; // If no file is selected, exit

    setIsUploading(true);
    setErrorMessage(''); // Clear previous error messages

    const formData = new FormData(); // Create form data to hold the file
    formData.append('file', file);

    try {
      // Send POST request using fetch API
      const response = await fetch('https://agerbandhu-production.up.railway.app/api/rule/', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json(); // Parse the response

      if (response.ok) {
        // Set the PDF file path for displaying in an iframe
        setPdfFilePath(data.filePath);
      } else {
        // Handle errors (e.g., from the API response)
        setErrorMessage('Failed to upload the file. Please try again.');
      }
    } catch (error) {
      // Handle network or other errors
      setErrorMessage('An error occurred while uploading the file.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl mb-4">Upload Rules and Regulations</h2>

      {/* Upload Button */}
      <label className="w-64 flex flex-col items-center px-4 py-6 bg-gray-200 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 hover:text-white">
        <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M16.88 10.44a1 1 0 0 0 0-1.42L10.7 2.85a1 1 0 0 0-1.42 0L2.85 9.02a1 1 0 0 0 1.42 1.42L9 5.71v9.58a1 1 0 0 0 2 0V5.71l4.73 4.73a1 1 0 0 0 1.42 0z"/>
        </svg>
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input 
          type="file" 
          className="hidden" 
          onChange={handleFileUpload} 
        />
      </label>

      {/* Loading Indicator */}
      {isUploading && <p className="mt-2 text-blue-600">Uploading...</p>}

      {/* Error Message */}
      {errorMessage && <p className="mt-2 text-red-600">{errorMessage}</p>}

      {/* PDF Iframe */}
      {pdfFilePath && (
        <div className="mt-4 w-full">
          <h3 className="text-lg mb-2">Uploaded PDF:</h3>
          <iframe
            src={`https://agerbandhu-production.up.railway.app${pdfFilePath}`} // Replace with your domain
            width="100%"
            height="600"
            className="border border-gray-300"
            title="Uploaded PDF"
          />
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
