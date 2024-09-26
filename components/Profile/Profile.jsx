'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MembershipModal1 from "../Member/MembershipModal1";

const Profile = () => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const [memberId,setMemberId]=useState(JSON.parse(window.localStorage.getItem('user').userid));

  const [memberId, setMemberId] = useState(143);

  useEffect(() => {
    const storedUser = JSON.parse(window.localStorage.getItem('user'));
    console.log(storedUser.userid);

    setMemberId(storedUser.userid)
  }, []);



//   useEffect(()=>{
//     const a=JSON.parse(window.localStorage.getItem('user')).userid;
//     setMemberId(a);
//   },[])
    
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
    tahsil:'',
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

  const [open,setOpen]=useState(false);

  

// console.log(JSON.parse(localStorage.getItem('user')).userid)

const handleEditClick = (member) => {

    console.log(member);
    
     
    delete member.reference_id;
    if (Array.isArray(member.nominees) && member.nominees.length > 0) {
      const detailsObj = member.nominees[0]; // Get the first object from the array
      
      // Spread the keys and values from `detailsObj` into `obj`
      Object.assign(member, detailsObj);
      
      // Remove the `details` field from the object
      delete member.nominees;
     
    }else{
      Object.assign(member, {nominee:'khauf1',relationship:'khauf2',nominee2:'khauf3',relationship2:'khauf4'});
      
      // Remove the `details` field from the object
      delete member.nominees;

    }
    member['file']=member.aadharUrl;
    member['file2']=member.id_file;
    member['profile']=member.profileUrl;
    member['photo']=member.profileUrl.substring(member.profileUrl.lastIndexOf('/') + 1);
    member['photoUrl']=`https://agerbandhu-production.up.railway.app${member.profileUrl}`;
    member['diseaseFileName']=member.diseaseFile ? member.diseaseFile.substring(member.diseaseFile.lastIndexOf('/') + 1) :'';
    console.log("Ashoka maaa");
    console.log(member)
    
    // setEditData(member); // Set the data of the member you want to edit
    setFormData(member)
    setOpen(true); // Open the modal
  };


  const handleClose=()=>{
    setOpen(false);
  }
  





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
        response = await fetch('https://agerbandhu-production.up.railway.app/api/member', {
          method: 'POST', // Use POST for creating a new member
          body: formToSubmit,
        });
      
  
      if (response.status === 406) {
        alert('Reference ID not valid');
        return; // Stop further execution if ID is invalid
      }
  
      if (!response.ok) {
        throw new Error('Failed to submit the form');
      }
  
      const result = await response.json();
     
        // Add the new member to the list after successful creation
   
      console.log('Form submitted successfully:');
      handleClose(); // Close the modal on successful submission
    } catch (error) {
      alert(error);
      console.error('Error submitting the form:', error);
      setErrorMessage('Failed to submit the form. Please try again.');
    }
  };






  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(`https://agerbandhu-production.up.railway.app/api/member/detail?key=id&&value=${memberId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch member details");
        }
        const data = await response.json();
        console.log(data);
        setMember(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberDetails();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!member) return <p className="text-center text-gray-500">No member data available</p>;

  return (
    <>
    <MembershipModal1
      formData={formData} 
      setFormData={setFormData} 
      open={open}
      handleClose={handleClose} 
      handleSubmit={handleSubmittt}
        />
    <div className="max-w-full mx-auto p-0 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl  font-bold text-center bg-customBlue text-white mb-6">Member Profile</h1>

                <div className="flex justify-between">
                <h2 className="flex-1 text-xl font-semibold mr-1 bg-customBlue text-white">Basic Information</h2>
                <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => { handleEditClick(member)}}
            >
              Edit Profile
            </button>
                </div>
        <div className="flex flex-col md:flex-row gap-8 p-1">
            {/* Basic Information Section */}
            <div className="flex-1 space-y-4">
                <table className="w-full text-left table-auto">
                <tbody>
                    <tr>
                    <th className="pr-4 py-2 text-gray-500">Member ID:</th>
                    <td>{member.id}</td>
                    </tr>
                    <tr>
                    <th className="pr-4 py-2 text-gray-500">Reference ID:</th>
                    <td>{member.reference_id}</td>
                    </tr>
                    <tr>
                    <th className="pr-4 py-2 text-gray-500">Date of Joining:</th>
                    <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                    <th className="pr-4 py-2 text-gray-500">Name:</th>
                    <td>{member.name}</td>
                    </tr>
                    <tr>
                    <th className="pr-4 py-2 text-gray-500">Father&apos;s Name:</th>
                    <td>{member.father_name}</td>
                    </tr>
                    <tr>
                    <th className="pr-4 py-2 text-gray-500">Mother&apos;s Name:</th>
                    <td>{member.mother_name}</td>
                    </tr>
                    <tr>
                    <th className="pr-4 py-2 text-gray-500">Date of Birth:</th>
                    <td>{new Date(member.dob).toLocaleDateString()}</td>
                    </tr>
                </tbody>
                </table>
            </div>

            {/* Profile Image Section */}
            <div className="flex justify-center items-center flex-1">
                <Image
                src={`https://agerbandhu-production.up.railway.app${member.profileUrl || ''}`}
                alt="Profile"
                width="200"
                height="200"
                className="rounded-sm shadow-md"
                />
            </div>
        </div>



      <div className="mt-10 space-y-4 p-1">
        <h2 className="text-xl font-semibold  bg-customBlue text-white">Additional Details</h2>
        <table className="w-full text-left table-auto">
          <tbody>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Profession:</th>
              <td>{member.profession}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Address:</th>
              <td>{member.address}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">District:</th>
              <td>{member.district}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">State:</th>
              <td>{member.state}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Mobile No:</th>
              <td>{member.mobile_no}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Email:</th>
              <td>{member.email}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Aadhar No:</th>
              <td>{member.aadhar_no}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Pan Card No:</th>
              <td>{member.id_no}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Marital Status:</th>
              <td>{member.marital_status}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Disease:</th>
              <td>{member.disease ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Pincode:</th>
              <td>{member.pincode}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Status:</th>
              <td>{member.status}</td>
            </tr>
          </tbody>
        </table>
      </div>



      <div className="mt-10 text-center p-1">
        <h2 className="text-xl font-semibold bg-customBlue text-white">Documents</h2>
        <div className="flex justify-center gap-6 mt-6">
          {member.profileUrl && (
            <Image
              src={`https://agerbandhu-production.up.railway.app${member.profileUrl}`}
              alt="Profile Image"
              width={150}
              height={150}
              className="rounded-lg shadow-md"
            />
          )}
          {member.aadharUrl && (
            <Image
              src={`https://agerbandhu-production.up.railway.app${member.aadharUrl}`}
              alt="Aadhar"
              width={150}
              height={150}
              className="rounded-lg shadow-md"
            />
          )}
          {member.diseaseUrl && (
            <Image
              src={`https://agerbandhu-production.up.railway.app${member.diseaseUrl}`}
              alt="Disease"
              width={150}
              height={150}
              className="rounded-lg shadow-md"
            />
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
