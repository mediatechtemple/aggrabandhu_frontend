import { useEffect, useState } from 'react';

const useNotificationForm = (closeModal,token) => {
  // State to store form data
  const [formData, setFormData] = useState({ 
      title: '',
      content: '',
      file:null,
      web:false,
      app:false

     });
  // State to store an array of submissions
  const [submissions, setSubmissions] = useState([]);
  // State to handle loading and error messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch notifications from API
  const getNotification = async () => {
    try {
      const response = await fetch('https://backend.aggrabandhuss.org/api/notificationweb?limit=100');
      if (!response.ok) {
        throw new Error('Data not fetched from API');
      }
      const data = await response.json();
      setSubmissions(data.data); // Assuming data.data is an array
    } catch (error) {
      setError(error.message); // Set the error message
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  

  useEffect(() => {
    getNotification(); // Fetch notifications when component mounts
  }, []);

  useEffect(()=>{
    console.log(formData);
  },[formData])


  // Handle changes in form inputs
  const handleChange = (event) => {
    
    const { id, value,type, checked } = event.target;
    console.log(id);
    console.log(value);
    console.log(type),
    console.log(checked);
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox'? checked : value,
    }));
  };


  const handleFileChange=(event)=>{
    const {id,value,files}=event.target;
    console.log(id);
    console.log(value);
    console.log(files);
    setFormData((prevData) => ({
      ...prevData,
      file: files[0],
    }));
  }








  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('content', formData.content);
    if (formData.file) formDataToSubmit.append('file', formData.file);

    try {
      const endpoints = [];
      if (formData.web) endpoints.push('https://backend.aggrabandhuss.org/api/notificationweb');
      if (formData.app) endpoints.push('https://backend.aggrabandhuss.org/api/notification');

      const responses = await Promise.all(
        endpoints.map((url) =>
          fetch(url, { 
            method: 'POST', 
            headers:{
              'Authorization':`Bearer ${token}`
            },
            body: formDataToSubmit })
        )
      );

      responses.forEach((response) => {
        if (!response.ok) throw new Error('Failed to submit notification');
      });

      const data = await responses[0].json();
      setSubmissions((prevSubmissions) => [{ ...data }, ...prevSubmissions]);

      setFormData({ title: '', content: '', file: null, web: false, app: false });
      closeModal();
    } catch (error) {
      console.error('Error submitting notification:', error);
      setError(error.message);
    }
  };











  const deleteNotification = async (id) => {
    
    try {
      const response = await fetch(`https://backend.aggrabandhuss.org/api/notificationweb/${id}`, {
        method: 'DELETE',
        headers:{
          'Authorization':`Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the notification');
      }
  
      // Agar delete successful ho gaya toh updated submissions list set karo
      setSubmissions((prevSubmissions) =>
        prevSubmissions.filter((notification) => notification.id !== id)
      );
      console.log('Notification deleted successfully');
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };
  

  return {
    formData,
    handleChange,
    handleSubmit,
    submissions,
    loading, // Expose loading state
    error, // Expose error state
    deleteNotification,
    handleFileChange
  };
};

export default useNotificationForm;
