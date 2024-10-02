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
  const [errorMessage,setErrorMessage]=useState('');
  const [loading,setLoading]=useState(false);

  const [open,setOpen]=useState(false);
  const [formData, setFormData] = useState({
    reference_id: '',
    marriage_date:'',
    gotra: '',
    profile: null,
    name: '',
    gender:'',
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

  const[block,setBehsil]=useState([]);

  function handleOpen(){
    setOpen(true);
  }

 

  function handleClose(){
    setOpen(false);
  }



  function Cross_handleClose(){
    setOpen(false);
    setFormData({
      reference_id: '',
    gotra: '',
    profile: null,
    marriage_date:'',
    name: '',
    gender:'',
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
    })
    
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
        window.localStorage.setItem('role', JSON.stringify(data.role));
        window.localStorage.setItem('user', JSON.stringify(data));
        // You can redirect or show success message here
        // router.push('/') 
        window.location.href="/Profile";
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
  

    if(!formData.rulesAccepted){
      alert('Rules and regulations are necessary to select');
      return;
    }

    if(!formData.declaration){
      alert('Declarations are necessary to select');
      return;
    }

    if(!formData.profile){
      alert('Please select profile picture');
      return;
    }
    if(!formData.file){
      alert('Please select Aadhar File');
      return;
    }
    if(!formData.file2){
      alert('Please select ID File ');
      return;
    }
























    // Prepare form data for sending to the API
    const formToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formToSubmit.append(key, formData[key]);
    });
  
    try {
      setLoading(true);
      let response;
        response = await fetch('https://agerbandhu-production.up.railway.app/api/member', {
          method: 'POST', // Use POST for creating a new member
          body: formToSubmit,
        });
      
  
      if (response.status === 406) {
        setLoading(false);
        alert('Reference ID not valid');
        return; // Stop further execution if ID is invalid
      }
  
      if (!response.ok) {
        setLoading(false);
        throw new Error('Failed to submit the form');
      }
  
      const result = await response.json();
     
        // Add the new member to the list after successful creation
   
      console.log('Form submitted successfully:');
      console.log(result);
      setLoading(false);
      console.log(result.memberAdd.id)
      alert("You are successfully Registered. Your Member ID is "+result.memberAdd.id);
      alert("ou are successfully registered. Your Reference ID is "+result.memberAdd.reference_id);
      Cross_handleClose(); // Close the modal on successful submission
    } catch (error) {
      setLoading(false);
      alert(error);
      console.error('Error submitting the form:', error);
      setErrorMessage('Failed to submit the form. Please try again.');
    }
  };

  const handlePincodeChange = async (e) => {
    // const pincode = e.target.value;
    const pincode = typeof e === 'object' ? e.target.value : e;
  
    setFormData((prevState) => ({ ...prevState, pincode }));

    if (pincode.length === 6) {
      try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();
        const blockmap=data[0].PostOffice;
        const bl=[];
    
        blockmap.forEach((office, index) => {
          bl.push(office);
          // console.log(`Post Office ${index}:`, office); // Log each object to find correct field
        });
        // console.log("bl",bl);
        console.log(bl);
        setBehsil([...bl]);
        
  

        if (data[0].Status === 'Success') {
          const postOffice = data[0].PostOffice[0];
          setFormData((prevState) => ({
            ...prevState,
            state: postOffice.State,
            district: postOffice.District,
          }));
          setErrorMessage('');
        } else {
          setErrorMessage('Invalid Pincode. Please enter a valid 6-digit pincode.');
        }
      } catch (error) {
        setErrorMessage('Error fetching data. Please try again later.');
      }
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
      handlePincodeChange={handlePincodeChange}
      block={block}
      loading={loading}
      Cross_handleClose={Cross_handleClose}
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
