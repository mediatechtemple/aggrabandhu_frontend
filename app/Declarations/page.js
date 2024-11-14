'use client';
import dynamic from 'next/dynamic'; // Dynamically import the editor
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });
import React, { useEffect, useState } from 'react';

const PrivacyPolicy = () => {
    const [postedData, setPostedData] = useState(null);
    const [content, setContent] = useState(''); // Store editor content
    const [memberRights,setmemberRights]=useState([]);

    useEffect(()=>{
        setmemberRights(JSON.parse( localStorage.getItem('user')).rights)
        // console.log(memberRights);
        // console.log('Asoka rights');
      },[]);


    // Method to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        console.log('Editor Content:', content); // Log the content to console

        // Post the content
        const postContent = async () => {
            try {
              const response = await fetch('https://backend.aggrabandhuss.org/api/declearation/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ declearation: content }), // Sending content as JSON
              });
        
              if (response.ok) {
                const data = await response.json();
                console.log('Content posted successfully:', data);
                setPostedData(data.declearation); // Assuming the API returns the posted declearation
                setContent(''); // Clear the editor content after submission
              } else {
                console.error('Error posting content:', response.statusText);
              }
            } catch (error) {
              console.error('Error:', error);
            }
        };
        
        postContent();
    };

    // Fetch content on component mount
    useEffect(() => {
        const getContent = async () => {
            try {
              const response = await fetch('https://backend.aggrabandhuss.org/api/declearation/');
        
              if (response.ok) {
                const data = await response.json();
                console.log('Fetched content:', data);
                setPostedData(data[0].declearation); // Assuming the API returns the policy
              } else {
                console.error('Error fetching content:', response.statusText);
              }
            } catch (error) {
              console.error('Error:', error);
            }
        };
          
        getContent();
    }, []);

    return (
        <>
        <div>
            <h2 className='text-center bg-blue-500 text-white p-4 text-2xl'>Declaration</h2>
            <form onSubmit={handleSubmit}> {/* Wrap editor in a form */}
                <div>
                    <JoditEditor
                        value={content} // Set the value of the editor to content
                        onChange={setContent} // Update content whenever the editor changes
                    />
                </div>
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white">Submit</button>
            </form>

            {postedData && ( // Conditionally rendering the posted data
            <div className="mt-4 p-4 border border-blue-300 rounded overflow-x-auto">
                <h3 className="text-lg font-semibold">Posted Declaration:</h3>
                <div dangerouslySetInnerHTML={{ __html: postedData }} />
            </div>
            )}
        </div>
        </>
    );
}

export default PrivacyPolicy;
