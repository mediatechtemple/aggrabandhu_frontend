import React, { useState } from 'react';

const AdminForm = ({ onClose,getAdminData }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile_no: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

//   https://backend.aggrabandhuss.org/api/auth/register/users${id}'
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend.aggrabandhuss.org/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration Successful');
        onClose(); // Close the popup on success
        getAdminData();
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {

      console.error('Error:', error);
      alert('Registration Failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[2800]">
  <div className="bg-white p-6 rounded shadow-lg w-96">
    <h2 className="text-xl font-bold mb-4">Register Admin</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Mobile No</label>
        <input 
          type="text" 
          name="mobile_no" 
          value={formData.mobile_no} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Password</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          className="w-full p-2 border rounded" 
          required 
        />
      </div>
      <div className="flex justify-end">
        <button 
          type="button" 
          className="bg-gray-300 px-4 py-2 rounded mr-2" 
          onClick={onClose}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AdminForm;
