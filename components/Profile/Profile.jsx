'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MembershipModal1 from "../Member/MembershipModal1";

const Profile = () => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editData,setEditData]=useState(true);
  const [role,setRole]=useState('');
  const [superAdmin,setSuperAdmin]=useState('');

    
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
    declaration:false,
    blood_group:''
  });

  const [open,setOpen]=useState(false);
  const[block,setBehsil]=useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const[memberId,setMemberId]=useState(null);
  const[token,setToken]=useState(null);

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }).catch((error) => {
      console.error("Failed to copy: ", error);
    });
  };




  const fetchMemberDetails = async (toke) => {
    
    try {
      
      const jsonString = localStorage.getItem("user");

      // Check if there is data in local storage
      if (jsonString) {
      // Parse the JSON string back into a JavaScript object
      const parsedObject = JSON.parse(jsonString);

     
      console.log(typeof parsedObject.userid);          
      } else {
      console.log("No data found in local storage");
      }




      const response = await fetch(`https://backend.aggrabandhuss.org/api/member/detail?key=id&&value=${JSON.parse(jsonString).userid}`,{
        method:'GET',
        headers:{
          'Authorization':`bearer ${toke}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch member details");
      }
      const data = await response.json();
      console.log(data);
      setMember(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    let toke=JSON.parse(localStorage.getItem('user')).token;
    setToken(toke);
  
    
    let role=JSON.parse(localStorage.getItem('user')).role;
    let super_admin=JSON.parse(localStorage.getItem('user')).super_admin;
    setRole(role);
    setSuperAdmin(super_admin);

    fetchMemberDetails(toke);
  }, []);



// console.log(JSON.parse(localStorage.getItem('user')).userid)

const handleEditClick = (edit) => {
  console.log(edit);
    const member={...edit};
    handlePincodeChange(member.pincode);

    setMemberId(member.id);


    if (Array.isArray(member.nominees) && member.nominees.length > 0) {
      const detailsObj = member.nominees[0]; // Get the first object from the array
      
      // Spread the keys and values from `detailsObj` into `obj`
      Object.assign(member, detailsObj);
      
      // Remove the `details` field from the object
    //   delete member.nominees;
     
    }else{
      Object.assign(member, {nominee:'',relationship:'',nominee2:'',relationship2:''});
      
      // Remove the `details` field from the object
    //   delete member.nominees;

    }
    member['file']=member.aadharUrl;
    member['file2']=member.id_file;
    member['profile']=member.profileUrl;
    member['photo']=member.profileUrl.substring(member.profileUrl.lastIndexOf('/') + 1);
    member['photoUrl']=`https://backend.aggrabandhuss.org${member.profileUrl}`;
    member['diseaseFileName']=member.diseaseFile ? member.diseaseFile.substring(member.diseaseFile.lastIndexOf('/') + 1) :'';
    if(member['id_type']=='PAN Card'){
      member['id_type']='Pan card';
    }
    delete member.aadharUrl;
    delete member.profileUrl;
    delete member.password;
    // delete member.reference_id;
    delete member.id_file;
    delete member.id;
    console.log("Ashoka maaa");
    console.log(member)
    
    setEditData(member); // Set the data of the member you want to edit
    setFormData(member)
    setOpen(true); // Open the modal
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


































  
  const handleClose=()=>{
    setOpen(false);
  }

  const Cross_handleClose=()=>{
    setOpen(false);
  }
  
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Function to update each string property in the data object
  const capitalizeData = (data) => {
    const newData = { ...data }; // Create a copy of the data
  
    for (let key in newData) {
      // Check if the value is a string and non-empty
      if (typeof newData[key] === 'string' && newData[key].length > 0) {
        newData[key] = capitalizeFirstLetter(newData[key]); // Capitalize first letter
      }
    }
  
    return newData;
  };





const handleSubmittt = async (e) => {
    e.preventDefault();

    console.log("this is in MembershipModal1");
    console.log(formData);
    const capitalFormData=capitalizeData(formData);
    // Prepare form data for sending to the API
    const formToSubmit = new FormData();

    Object.keys(capitalFormData).forEach((key) => {
      formToSubmit.append(key, capitalFormData[key]);
    });
  
    try {
      let response;
        response = await fetch(`https://backend.aggrabandhuss.org/api/member/${memberId}`, {
          method: 'PUT', // Use POST for creating a new member
          headers:{
            Authorization:`bearer ${token}`
          },
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
      setMember({...result})
      handleClose(); // Close the modal on successful submission
    } catch (error) {
      alert(error);
      console.error('Error submitting the form:', error);
      setErrorMessage('Failed to submit the form. Please try again.');
    }
  };






 

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
      initialData={editData}
      editData={editData}
      handleSubmit={handleSubmittt}
      handlePincodeChange={handlePincodeChange}
      block={block}
      Cross_handleClose={Cross_handleClose}
      role={role}
      superAdmin={superAdmin}
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

                    <td>{member.reference_id}
                    </td>
                     {/* Show "Copied!" message when copied is true */}
                     <button
                        className={`bg-blue-500 w-[180px]  text-white py-2 px-4 ml-6 rounded-lg shadow-md transform transition-all duration-200 hover:bg-green-600 active:scale-95 ${copied ? 'bg-green-700' : ''}`}
                        onClick={() => copyToClipboard(member.reference_id)}
                      >
                        {copied ? 'Copied!' : 'Copy Reference ID'}
                      </button>
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
                    <tr>
                    <th className="pr-4 py-2 text-gray-500">Age:</th>
                    <td>{member.total_age} years</td>
                    </tr>
                    <tr>
                    <th className="pr-4 py-2 text-gray-500">Blood Group:</th>
                    <td>{member.blood_group || 'Not Mention'}</td>
                    </tr>
                </tbody>
                </table>
            </div>

            {/* Profile Image Section */}
            <div className="flex justify-center items-center flex-1">
                <Image
                src={`https://backend.aggrabandhuss.org${member.profileUrl || ''}`}
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
            {/* here we will add rest changes. */}


           
            <tr>
              <th className="pr-4 py-2 text-gray-500">Spouse Name:</th>
              <td>{member.spouse_name}</td>
            </tr>

            <tr>
              <th className="pr-4 py-2 text-gray-500">Marriage Date:</th>
              <td>{member.marriage_date}</td>
            </tr>

            <tr>
              <th className="pr-4 py-2 text-gray-500">Marriage Age:</th>
              <td>{member.marriage_age ? member.marriage_age : 'Not Define'} Years</td>
            </tr>


<tr>
              <th className="pr-4 py-2 text-gray-500">Gender:</th>
              <td>{member.gender}</td>
            </tr>

            <tr>
              <th className="pr-4 py-2 text-gray-500">Profession:</th>
              <td>{member.profession}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Address:</th>
              <td>{member.address}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Gotra:</th>
              <td>{member.gotra}</td>
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
              <th className="pr-4 py-2 text-gray-500">Tahsil:</th>
              <td>{member.tahsil}</td>
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

            <tr>
              <th className="pr-4 py-2 text-gray-500">Nominee:</th>
              <td>{member.nominees[0].nominee}</td>
            </tr>

            <tr>
              <th className="pr-4 py-2 text-gray-500">Relationship:</th>
              <td>{member.nominees[0].relationship}</td>
            </tr>

            <tr>
              <th className="pr-4 py-2 text-gray-500">Nominee2:</th>
              <td>{member.nominees[0].nominee2}</td>
            </tr>

            <tr>
              <th className="pr-4 py-2 text-gray-500">Relationship2:</th>
              <td>{member.nominees[0].relationship2}</td>
            </tr>
          </tbody>
        </table>
      </div>


<div className="mt-10 text-center p-1">
  {/* Title Section */}
  <h2 className="text-xl font-semibold bg-customBlue text-white">Documents</h2>

  {/* Aadhar and Pancard Image Section */}
  <div className="flex flex-nowrap jgap-6 ">
    {/* Aadhar Image */}
    <div className="relative  shadow-md p-2 w-1/2 border border-gray-300 m-1">
      {member.aadharUrl && (
        <Image
          src={`https://backend.aggrabandhuss.org${member.aadharUrl}`}
          alt="Aadhar"
          width={250}
          height={200}
          className="rounded-lg object-fit w-full h-full"
        />
      )}
    </div>

    {/* Pancard Image */}
    <div className="relative  shadow-md p-2 w-1/2 border border-gray-300  m-1">
      {member.id_file && (
        <Image
          src={`https://backend.aggrabandhuss.org${member.id_file}`}
          alt="Pancard Image"
          className="rounded-lg object-fit w-full h-full"
          width={250}
          height={200}
        />
      )}
    </div>
  </div>

  {/* Disease Image Section */}
  
  <div className="flex flex-nowrap gap-6 ">
    {/* Aadhar Image */}
    <div className="relative  shadow-md p-2 w-1/2 border border-gray-300 h-auto  m-1">
      {member.diseaseFile && (
        <Image
          src={`https://backend.aggrabandhuss.org${member.diseaseFile}`}
          alt="desiese document"
          width={250}
          height={200}
          className="rounded-lg object-fit w-full h-full"
        />
      )}
    </div>

  </div>
  
</div>





      
    </div>





    
    </>
  );
};

export default Profile;
