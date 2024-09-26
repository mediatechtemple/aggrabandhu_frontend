'use client'
import MembershipModal1 from '@/components/Member/MembershipModal1';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginPage = () => {
  const router = useRouter();
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [open,setOpen]=useState(false);
  const [formData, setFormData] = useState({
    reference_id: '',
    gotra: '',
    profile: null,
    name: '',
    father_name: '',
    mother_name: '',
    dob: '',
    marital_status: '',
    spouse_name: '',
    mobile_no: '',
    otp: '',
    password: '',
    confirmPassword: '',
    email: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    tehsil:'',
    profession: '',
    aadhar_no: '',
    file: null,
    id_no: '',
    file2: null,
    nominee: '',
    relationship: '',
    nominee2: '',
    relationship2: '',
    disease: false,
    diseaseFile: '',
    rulesAccepted: false,
    id_type:'',
    declaration:false
  });

  function handleOpen(){
    setOpen(true);
  }

  function handleClose(){
    setOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error message
    setError('');

    const loginData = {
      mobile_no: mobileNo,
      password: password,
    };

    try {
      const response = await fetch('https://agerbandhu-production.up.railway.app/api/member/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login, maybe store the user in localStorage
        console.log('Login successful:', data);
        localStorage.setItem('user', JSON.stringify(data));
        // You can redirect or show success message here
        // router.push('/') 
        window.location.href="/";
      } else {
        // Handle error if login failed
        setError(data.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('An error occurred. Please try again later.');
    }
  };


  const handleSubmittt = async (e) => {
    e.preventDefault();
  
    console.log("this is in MembershipModal1");
    console.log(formData);
  

    // Prepare form data for sending to the API
    const formToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formToSubmit.append(key, formData[key]);
    });
  
    try {
      let response;
      if (editData) {
        // Use editData.id for the PUT request
        response = await fetch(`https://agerbandhu-production.up.railway.app/api/member/${editData.id}`, {
          method: 'PUT', // Use PUT for updating data
          body: formToSubmit,
        });
      } else {
        response = await fetch('https://agerbandhu-production.up.railway.app/api/member', {
          method: 'POST', // Use POST for creating a new member
          body: formToSubmit,
        });
      }
  
      if (response.status === 406) {
        alert('Reference ID not valid');
        return; // Stop further execution if ID is invalid
      }
  
      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }
  
      const result = await response.json();
      
  
      if (editData) {
        // Update the existing member in the list after successful edit
        const updatedMembers = members.map((member) =>
          member.id === editData.id ? { ...member, ...result } : member
        );
        setMembers(updatedMembers);
      } else {
        // Add the new member to the list after successful creation
        setMembers([...members, { ...result.memberAdd }]);
      }
  
      console.log('Form submitted successfully:', result);
      handleClose(); // Close the modal on successful submission
    } catch (error) {
      alert(error);
      console.error('Error submitting the form:', error);
      setErrorMessage('Failed to submit the form. Please try again.');
    }
  };





  const handleRedirect = () => {
    // Programmatically navigate to the "Forgot Password" page
    router.push('/forgot-password');
  };
  

  return (
    <>
    <MembershipModal1
      formData={formData} 
      setFormData={setFormData} 
      open={open}
      handleClose={handleClose} 
      handleSubmit={handleSubmittt}
        />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="text-3xl font-bold mb-8">AGGRABANDHU SEVARTH SANSTHAN</header>

      <div className="bg-white p-8 rounded shadow-md w-196">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobileNo">
              Mobile No
            </label>
            <input
              type="text"
              id="mobileNo"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>

          <p className="text-center space-x-4">
            <Link href='/forget-password' className="text-blue-500 hover:text-blue-700 font-semibold transition duration-300">
              Forgot Password?
            </Link>
            <span className="text-gray-600">||</span>
            <Link href='/forget-id' className="text-blue-500 hover:text-blue-700 font-semibold transition duration-300">
              Forget Id?
            </Link>
            <span className="text-gray-600">||</span>
            <Button onClick={handleOpen} className="text-blue-500 hover:text-blue-700 font-semibold transition duration-300">
              Apply for New Membership
            </Button>
          </p>
        </form>
      </div>
    </div>
    </>
  );
};

export default LoginPage;