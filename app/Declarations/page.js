'use client'
import dynamic from 'next/dynamic'; // Dynamically import the editor
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import React, { useEffect, useRef, useState } from 'react';

const Page = () => {
    const editorRef = useRef(null); // Create a ref for the editor instance
    const[content,setContent]=useState(false);
    const [postedData, setPostedData] = useState(null);
    // Method to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
        const editorContent = editorRef.current.value; // Get the content from the editor
        console.log(editorContent); // Log the content to console
        setContent(true);
        setTimeout(()=>{
            setContent(false);
        },1000);

        const postContent = async () => {
            try {
              const response = await fetch('https://agerbandhu-production.up.railway.app/api/declearation/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ declearation: editorRef.current.value }), // Sending content as JSON
              });
        
              if (response.ok) {
                const data = await response.json();
                console.log('Content posted successfully:', data);
                setPostedData(data.declearation); // Assuming the API returns the posted rule in the response
                setContent(''); // Clear the editor content
              } else {
                console.error('Error posting content:', response.statusText);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
        
        postContent();

    };

    useEffect(()=>{
        const getContent = async () => {
            try {
              const response = await fetch('https://agerbandhu-production.up.railway.app/api/declearation/');
        
              if (response.ok) {
                const data = await response.json();
                console.log('Content posted successfully:', data);
                setPostedData(data[0].declearation); // Assuming the API returns the posted rule in the response
                setContent(''); // Clear the editor content
              } else {
                console.error('Error posting content:', response.statusText);
              }
            } catch (error) {
              console.error('Error:', error);
            }
          };
          
          getContent();
    
      },[])

    return (
        <>
        <div>
            <h2 className='text-center bg-blue-500 text-white p-4 text-2xl'>Declarations</h2>
            <form onSubmit={handleSubmit}> {/* Wrap editor in a form */}
                <div>
                    <JoditEditor
                        ref={editorRef} // Set the ref to the editor
                        value={content ? '': null}
                    />
                </div>
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Submit</button>
            </form>


            {postedData && ( // Conditionally rendering the posted data
            <div className="mt-4 p-4 border border-blue-300 rounded overflow-x-auto">
            <h3 className="text-lg font-semibold">Posted Declarations:</h3>
            <div dangerouslySetInnerHTML={{ __html: postedData }} />
        </div>
            )
            }
      </div>
        </>
    );
}

export default Page;
