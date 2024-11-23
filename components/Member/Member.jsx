"use client"
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Search from './Search';
import Filter from './Filter';
import MemberTable from './MemberTable';
import Pagination from './Pagination';
import MembershipModal1 from './MembershipModal1';
import DateRangeFilter from './DatedRangeFilter';
import DistrictFilter from './DistrictFilter';
import StateFilter from './StateFilter';
import ReferenceSearch from './ReferenceSearch';
import Iconsss from '../Icons/Iconsss';
import DownloadCSVButton from '../DataConverters/DownloadCSVButton';
import DownloadPDFButton from '../DataConverters/DownloadPDFButton';
import { filter } from 'draft-js/lib/DefaultDraftBlockRenderMap';

const Member = () => {
  const [formData, setFormData] = useState({
    reference_id: '',
    refer_id:'',
    Date_Of_Merriage:'',
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

  const [members, setMembers] = useState([]);
  const [stateData,setStateData]=useState([]);
  const [districtData,setDistrictData]=useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [token,setToken]=useState(null);
  const [filters, setFilters] = useState({
    searchQuery: '', role: '', isActive: false, startDate: null, endDate: null, state: '', district: '', referenceId: ''
  });

  const [pdfData,setpdfData]=useState([]);

console.log(members);




  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [loading,setLoading]=useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const[block,setBehsil]=useState([]);

  const [memberRights,setmemberRights]=useState([]);

  const [role,setRole]=useState('');
  const [superAdmin,setSuperAdmin]=useState('');


  
let temp;


  
  // useEffect(()=>{
  //   // console.log(filters)
  //  console.log(memberRights['Member Management']?.['add'])
  // },[filters,memberRights]);

  useEffect(()=>{
    setmemberRights(JSON.parse( localStorage.getItem('user')).rights)
    setToken(JSON.parse( localStorage.getItem('user')).token);
  },[]);


  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    return true;
  };

  const fetchMembers = async () => {
    try {
      const response = await fetch('https://backend.aggrabandhuss.org/api/member?limit=1000');
      if(!response.ok){
        throw new Error('Failed to fetch Donars');
      }
      const data = await response.json();
      console.log(data.data); // Log the fetched data
      setMembers([...data.data]);
      setpdfData(
        [...data.data].map((item) => {
          return {
            aadhar_no: item.aadhar_no,
            address: item.address,
            createdAt:new Date(item.createdAt).toLocaleDateString(),
            declaration: item.declaration,
            disease: item.disease,
            district: item.district,
            dob: new Date(item.dob).toLocaleDateString(),
            donationCount: item.donationCount,
            email: item.email,
            father_name: item.father_name,
            gender: item.gender,
            gotra: item.gotra,
            id_no: item.id_no,
            id_type: item.id_type, // Using item.id_type dynamically
            marital_status: item.marital_status, // Using dynamic value if needed
            marriage_age: item.marriage_age, // Using dynamic value if needed
            marriage_date: item.marriage_date, // Using dynamic value if needed
            mobile_no: item.mobile_no, // Using dynamic value if needed
            mother_name: item.mother_name, // Using dynamic value if needed
            name: item.name,
            pincode: item.pincode,
            profession: item.profession,
            refer_id: item.refer_id || null,
            reference_id: item.reference_id,
            rulesAccepted: item.rulesAccepted,
            spouse_name: item.spouse_name,
            state: item.state,
            status: item.status,
            tahsil: item.tahsil,
            totalDonation: item.totalDonation,
            total_age: item.total_age,
          };
        })
      );
      
      

      const uniqueStates = [...new Set(data.data.map(member => member.state))].filter(Boolean);
      setStateData(uniqueStates);

 

      const uniqueDistrict = [...new Set(data.data.map(member => member.district))].filter(Boolean);
      setDistrictData(uniqueDistrict);

    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  useEffect(() => {
    let role=JSON.parse(localStorage.getItem('user')).role;
    let super_admin=JSON.parse(localStorage.getItem('user')).super_admin;
    setRole(role);
    setSuperAdmin(super_admin);
    fetchMembers();
  }, []);





  // Filter and paginate members
  // useEffect(() => {
  //   let result = members.filter(member => {
  //     const { searchQuery, role, isActive, state, district, referenceId, startDate, endDate } = filters;
  //     return (
  //       (!searchQuery || member.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
  //       (!role || member.role === role) &&
  //       (!isActive || member.status === 'active') &&
  //       (!state || member.state === state) &&
  //       (!district || member.district === district) &&
  //       (!referenceId || member.code?.toString() === referenceId) &&
  //       (!startDate || !endDate || (new Date(member.joiningDate) >= startDate && new Date(member.joiningDate) <= endDate))
  //     );
  //   });

  //   setTotalPages(Math.ceil(result.length / pageSize));
  //   setFilteredMembers(result.slice((page - 1) * pageSize, page * pageSize));
  // }, [filters, members, page, pageSize]);



  useEffect(() => {
    let result = members.filter(member => {
      const { searchQuery, role, isActive, state, district, referenceId, startDate, endDate } = filters;
      return (
        (!searchQuery || member.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!role || member.role === role) &&
        (!isActive || member.status === 'active') &&
        (!state || member.state === state) &&
        (!district || member.district === district) &&
        (!referenceId || member.reference_id?.toString() === referenceId) &&
        (!startDate || !endDate || (new Date(member.createdAt) >= startDate && new Date(member.createdAt) <= endDate))
      );
    });

    setTotalPages(Math.ceil(result.length / pageSize));
    setFilteredMembers(result.slice((page - 1) * pageSize, page * pageSize));
  }, [filters, members, page, pageSize]);

  useEffect(() => {
    const filteredDistricts = [
      ...new Set(
        members
          .filter((item) => item.state === filters.state) // Filter objects by state
          .map((item) => item.district) // Extract districts
      ),
    ];
console.log(filteredDistricts);
    setDistrictData(filteredDistricts); // Output: Unique districts, e.g., ["Pune", "Mumbai"]
  }, [filters.state, members]);


  // Member addition, edit, delete handlers
  const handleSubmit = async (e) => {
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
      setLoading(true);
      if (editData) {
        // Use editData.id for the PUT request
        response = await fetch(`https://backend.aggrabandhuss.org/api/member/${editData.id}`, {
          method: 'PUT', // Use PUT for updating data
          headers:{
            'Authorization':`Bearer ${token}`
          },
          body: formToSubmit,
        });
      } else {
        response = await fetch('https://backend.aggrabandhuss.org/api/member', {
          method: 'POST', // Use POST for creating a new member
          headers:{
            'Authorization':`Bearer ${token}`
          },
          body: formToSubmit,
        });
      }
  
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
      setLoading(false);
      console.log('Form submitted successfully:', result);
      handleClose(); // Close the modal on successful submission
      fetchMembers();
    } catch (error) {
      setLoading(false);
      alert(error);
      console.error('Error submitting the form:', error);
      setErrorMessage('Failed to submit the form. Please try again.');
    }
  };
  



  const handleClose = () => {
    // Reset form data
    // setFormData({
    //   reference_id: '',
    //   gotra: '',
    //   profile: null,
    //   name: '',
    //   gender:'',
    //   father_name: '',
    //   mother_name: '',
    //   dob: '',
    //   marital_status: '',
    //   spouse_name: '',
    //   mobile_no: '',
    //   otp: '',
    //   password: '',
    //   confirmPassword: '',
    //   email: '',
    //   address: '',
    //   district: '',
    //   state: '',
    //   pincode: '',
    //   profession: '',
    //   aadhar_no: '',
    //   file: null,
    //   id_no: '',
    //   file2: null,
    //   nominee: '',
    //   relationship: '',
    //   nominee2: '',
    //   relationship2: '',
    //   disease: false,
    //   diseaseFile: '',
    //   rulesAccepted: false,
    //   id_type:''
    // });

    // Set open to false
    setEditData(null)
    setOpen(false);
  };

  function Cross_handleClose(){
    setOpen(false);
    setFormData({
    reference_id: '',
    gotra: '',
    profile: null,
    name: '',
    gender:'',
    father_name: '',
    mother_name: '',
    dob: '',
    marital_status: '',
    spouse_name: '',
    marriage_date:'',
    marriage_age:'',
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

 



  const handleEditClick = (member) => {
    
    handlePincodeChange(member.pincode);
    member.reference_id;
    if (Array.isArray(member.nominees) && member.nominees.length > 0) {
      const detailsObj = member.nominees[0]; // Get the first object from the array
      
      // Spread the keys and values from `detailsObj` into `obj`
      Object.assign(member, detailsObj);
      
      // Remove the `details` field from the object
      delete member.nominees;
     
    }else{
      Object.assign(member, {nominee:'',relationship:'',nominee2:'',relationship2:''});
      
      // Remove the `details` field from the object
      delete member.nominees;

    }
    // member['refer_id']=member.refer_id;
    member['file']=member.aadharUrl;
    member['file2']=member.id_file;
    member['profile']=member.profileUrl;
    member['photo']=member.profileUrl.substring(member.profileUrl.lastIndexOf('/') + 1);
    member['photoUrl']=`https://backend.aggrabandhuss.org${member.profileUrl}`;
    member['diseaseFileName']=member.diseaseFile ? member.diseaseFile.substring(member.diseaseFile.lastIndexOf('/') + 1) :'';
    if(member['id_type']=='PAN Card'){
      member['id_type']='Pan card';
    }
    member['refer_id']=member?.referData?.reference_id;
    // console.log("Ashoka maaa");
    // console.log(member)
    
    setEditData(member); // Set the data of the member you want to edit
    setFormData(member)
    setOpen(true); // Open the modal
  };


  const removeMember = async (id) => {
    const confirmDelete = window.confirm(id);
    
    if (confirmDelete) {
      try {
        const response = await fetch(`https://backend.aggrabandhuss.org/api/member/${id}`, {
          method: 'DELETE',
          headers:{
            'Authorization':`Bearer ${token}`
          },
        });
  
        if (response.ok) {
          setMembers(members.filter(member => member.id !== id));
          alert('Member deleted successfully!');
        } else {
          alert('Failed to delete the member. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the member.');
      }
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


  
  




  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom color='#007bff'>Members Management</Typography>
       {memberRights['Member Management']?.['add']  && <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: '#1976d2' }}>Application for New Membership</Button>
   }   </Box>

      <MembershipModal1 
      formData={formData} 
      setFormData={setFormData} 
      open={open}
      handleClose={handleClose} 
      initialData={editData}
      editData={editData}
      handleSubmit={handleSubmit}
      handlePincodeChange={handlePincodeChange}
      block={block}
      loading={loading}
      Cross_handleClose={Cross_handleClose}
      role={role}
      superAdmin={ superAdmin}
        />
        

      <Box borderBottom='1px solid #bcd1c2' display="flex" justifyContent="space-between" alignItems="center" mb={2}></Box>
    
      <Box style={{ border: '1px solid #bcd1c2' }}>

         <Box borderBottom="1px solid #bcd1c2" padding="5px" marginBottom='5px' bgcolor="#007bff" color="white">
          <Typography>Member List</Typography>
         </Box>
      </Box>

      <Box display="flex"  justifyContent='space-between' >
        <Box>
         {/* <Iconsss dataObject={filteredMembers}  tableId="my-tablee"/> */}
         <div>
      <DownloadCSVButton data={members} filename="my_data.csv" />
      <DownloadPDFButton data={pdfData} filename="table_data.pdf" />
    </div>
        </Box>
        <Box display="flex"> 
        <StateFilter states={stateData} selectedState={filters.state} onSelectState={state => handleFilterChange('state', state)} />
        <DistrictFilter districts={districtData} selectedDistrict={filters.district} onSelectDistrict={district => handleFilterChange('district', district)} />
        <Filter filters={filters} onFilterChange={newFilters => setFilters(prev => ({ ...prev, ...newFilters }))} />
        <Search onSearch={query => handleFilterChange('searchQuery', query)} />
  
        </Box>
           </Box>

      <Box display="flex" justifyContent="flex-end">
        <DateRangeFilter onDateRangeChange={(start, end) => handleFilterChange('startDate', start) && handleFilterChange('endDate', end)} />
        <ReferenceSearch onSearch={refId => handleFilterChange('referenceId', refId)} />
      </Box>

      <MemberTable 
      members={filteredMembers} 
      removeMember={removeMember} 
      handleEditClick={handleEditClick} 
      id="my-tablee"
      setMembers={setMembers}
      memberRights={memberRights}
      />

      <Pagination page={page} pageSize={pageSize} totalPages={totalPages} onPageChange={setPage} onPageSizeChange={newSize => setPageSize(newSize === 'all' ? members.length : newSize)} />
    </>
  );
};

export default Member;