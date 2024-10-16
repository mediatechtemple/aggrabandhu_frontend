import React, { useState } from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';

const ImageUpload = ({formData,preview, handleImageChange}) => {
  const [image, setImage] = useState(null);
  // const [preview, setPreview] = useState(null); // State for storing image preview URL

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setImage(file);
  //     setPreview(URL.createObjectURL(file)); // Create and set preview URL
  //   }
  // };

  
  return (
    <div>
      {/* <label color='primary' style={{ fontSize: '16px', marginBottom: '10px', display: 'block' }}>
        Upload Death Certificate
      </label> */}
      <label
        style={{
          fontSize: '16px',
          marginBottom: '10px',
          display: 'block',
          // fontStyle: 'san',  // Sets the font style (italic in this case)
          color: '#1976d2',     // Sets the font color (primary blue color in this case)
        }}
      >
        Upload Death Certificate
      </label>  
      <input
        id="upload-button"
        type="file"
        accept="image/*"
        style={{ display: 'none' }} // Hides the default file input
        onChange={handleImageChange}
      />
      <Button
        variant="contained"
        component="span"
        onClick={() => document.getElementById('upload-button').click()}
        color="primary"
      >
        Choose File
      </Button>

      {formData.image && (
        <div style={{ marginTop: '20px', position: 'relative', width: '100%', height: '300px' }}>
          <p>Selected Image: {formData.image.name}</p>
          
          <Image
            src={preview}   // This should be the preview URL of the uploaded image
            alt="Selected"
            layout="fill"    // Use the fill layout to fill the parent container
            objectFit="contain"  // Ensure the image fits inside the container without being cut off
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

