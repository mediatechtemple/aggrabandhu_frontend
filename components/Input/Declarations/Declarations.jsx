'use client'; // Marking this component as a client component

import dynamic from 'next/dynamic'; // Dynamically import the editor
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });

import React, { useState, useRef } from 'react';

const Declarations = () => {
  const editor = useRef(null);
  const [content, setContent] = useState('');

  // Function to post content to API
  const postContent = async () => {
    try {
      const response = await fetch('YOUR_API_ENDPOINT', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }), // Sending content as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Content posted successfully:', data);
      } else {
        console.error('Error posting content:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='h-96'>
      <h2 className='text-center'>Privacy Policy</h2>
      <JoditEditor
        ref={editor}
        value={content}
        onChange={newContent => setContent(newContent)} 
      />
      <button onClick={postContent} className="mt-4 bg-blue-500 text-white p-2 rounded">Post Content</button>
    </div>
  );
};

export default Declarations;
