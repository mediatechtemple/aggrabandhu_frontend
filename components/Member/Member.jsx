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

const Member = () => {
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
    id_type:''
  });

  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [filters, setFilters] = useState({
    searchQuery: '', role: '', isActive: false, startDate: null, endDate: null, state: '', district: '', referenceId: ''
  });


  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalPages, setTotalPages] = useState(1);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Handle filter changes
  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch('https://agerbandhu-production.up.railway.app/api/member');
        if(!response.ok){
          throw new Error('Failed to fetch Donars');
        }
        const data = await response.json();
        console.log(data.data); // Log the fetched data
        setMembers([...data.data]);
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };
  
    fetchMembers();
  }, []);





  // Filter and paginate members
  useEffect(() => {
    let result = members.filter(member => {
      const { searchQuery, role, isActive, state, district, referenceId, startDate, endDate } = filters;
      return (
        (!searchQuery || member.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (!role || member.role === role) &&
        (!isActive || member.status === 'active') &&
        (!state || member.state === state) &&
        (!district || member.district === district) &&
        (!referenceId || member.code?.toString() === referenceId) &&
        (!startDate || !endDate || (new Date(member.joiningDate) >= startDate && new Date(member.joiningDate) <= endDate))
      );
    });

    setTotalPages(Math.ceil(result.length / pageSize));
    setFilteredMembers(result.slice((page - 1) * pageSize, page * pageSize));
  }, [filters, members, page, pageSize]);




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
        setMembers([...members, { ...result }]);
      }
  
      console.log('Form submitted successfully:', result);
      handleClose(); // Close the modal on successful submission
    } catch (error) {
      alert(error);
      console.error('Error submitting the form:', error);
      setErrorMessage('Failed to submit the form. Please try again.');
    }
  };
  
























  const handleClose = () => {
    // Reset form data
    setFormData({
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
      id_type:''
    });

    // Set open to false
    setEditData(null)
    setOpen(false);
  };


  const handleEditClick = (member) => {
     
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
    member['diseaseFileName']=member.diseaseFile.substring(member.diseaseFile.lastIndexOf('/') + 1)
    console.log("Ashoka maaa");
    console.log(member)
    
    setEditData(member); // Set the data of the member you want to edit
    setFormData(member)
    setOpen(true); // Open the modal
  };






  const removeMember = async (id) => {
    const confirmDelete = window.confirm(id);
    
    if (confirmDelete) {
      try {
        const response = await fetch(`https://agerbandhu-production.up.railway.app/api/member/${id}`, {
          method: 'DELETE',
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
  




  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" gutterBottom color='#007bff'>Doners Management</Typography>
        <Button variant="contained" onClick={() => setOpen(true)} sx={{ backgroundColor: '#1976d2' }}>Apply for New Donership</Button>
      </Box>

      <MembershipModal1 
      formData={formData} 
      setFormData={setFormData} 
      open={open}
      handleClose={handleClose} 
      initialData={editData}
      editData={editData}
      handleSubmit={handleSubmit}
        />
        

      <Box borderBottom='1px solid #bcd1c2' display="flex" justifyContent="space-between" alignItems="center" mb={2}></Box>
    
      <Box style={{ border: '1px solid #bcd1c2' }}>

         <Box borderBottom="1px solid #bcd1c2" padding="5px" marginBottom='5px' bgcolor="#007bff" color="white">
          <Typography>Donar List</Typography>
         </Box>
      </Box>

      <Box display="flex"  justifyContent='space-between' >
        <Box>
         <Iconsss tableId="my-tablee"/>
        </Box>
        <Box display="flex"> 
        <StateFilter states={['XYZ', 'PQR', 'STU']} selectedState={filters.state} onSelectState={state => handleFilterChange('state', state)} />
        <DistrictFilter districts={['ABC', 'DEF', 'GHI']} selectedDistrict={filters.district} onSelectDistrict={district => handleFilterChange('district', district)} />
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
      />

      <Pagination page={page} pageSize={pageSize} totalPages={totalPages} onPageChange={setPage} onPageSizeChange={newSize => setPageSize(newSize === 'all' ? members.length : newSize)} />
    </>
  );
};

export default Member;







































































































// "use client"
// import React, { useState, useEffect } from 'react';
// import Search from './Search';
// import Filter from './Filter';
// import MemberTable from './MemberTable';
// import Pagination from './Pagination';
// import MembershipModal1 from './MembershipModal1';
// import DateRangeFilter from './DatedRangeFilter'; // Corrected import name
// import { Container, Typography, Box, Button } from '@mui/material';
// import DistrictFilter from './DistrictFilter';
// import StateFilter from './StateFilter';
// // import Icon from '../../component/Icons/Icon';
// import ReferenceSearch from './ReferenceSearch';
// import Iconsss from '../Icons/Iconsss';
// import data from '@/utils/memberTableData';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';


// const Member = () => {
  
//   const [members, setMembers] = useState([]);
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filters, setFilters] = useState({ role: '', isActive: false });
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(100); // Default page size
//   const [totalPages, setTotalPages] = useState(1);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [fetchAll, setFetchAll] = useState(false); // State to fetch all data
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedDistrict, setSelectedDistrict] = useState('');
//   const [referenceId,setReferenceId]=useState('');

// //////////////////////////////////////////////////////////////////
//   const [open,setOpen]=useState(false);
//   const [editData,setEditData]=useState(null);

//   const handleClose=()=>{
//     setOpen(false);
//   }
//   const handleOpen=(entry=null)=>{
//     setEditData(entry)
//     setOpen(true);
//   }

//   useEffect(()=>{editData && console.log(editData)},[editData])
// /////////////////////////////////////////////////////////////////////
//   const states = ['XYZ', 'PQR', 'STU'];
//   const districts = ['ABC', 'DEF', 'GHI'];

  
//   useEffect(() => {
//     setMembers(data); // Set initial members state with data array
//   }, []);


//   useEffect(() => {
//     let result = members;

//     // Apply search filter
//     //
//     if (searchQuery) {
//       result = result.filter(member =>
//         member.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply role filter
//     if (filters.role) {
//       result = result.filter(member => member.role === filters.role);
//     }

//     // Apply active status filter
//     if (filters.isActive) {
//       result = result.filter(member => member.status === 'active');
//     }
    
//     // Apply state filter
//     if (selectedState) {
//       result = result.filter(member => member.state === selectedState);
//     }

//     // Apply district filter
//     if (selectedDistrict) {
//       result = result.filter(member => member.district === selectedDistrict);
//     }

//     // Apply reference ID filter
//     if (referenceId) {
//       result = result.filter(member => member.code && member.code.toString() === referenceId);
//     }

//     //apply for refrence id brother here
    

  

//     // Apply date range filter
//     if (startDate && endDate) {
//       result = result.filter(member => {
//         const memberJoiningDate = new Date(member.joiningDate);
//         return memberJoiningDate >= startDate && memberJoiningDate <= endDate;
//       });
//     }

//     // Calculate total pages for pagination
//     setTotalPages(Math.ceil(result.length / pageSize));

//     // Apply pagination and update filtered members
//     setFilteredMembers(result.slice((page - 1) * pageSize, page * pageSize));

//   }, [members, searchQuery, filters, startDate, endDate, page, pageSize,referenceId,selectedDistrict,selectedState]);




//   const handleSearch = query => {
//     setSearchQuery(query);
//   };

//   const handleFilterChange = newFilters => {
//     setFilters(newFilters);
//   };

//   /////////////////////////////////////////////////////////////////

//   const handlePageChange = newPage => {
//     setPage(newPage);
//   };

//   const handlePageSizeChange = newSize => {
//     if (newSize === 'all') {
//       setPageSize(members.length); // Set pageSize to total length of members array
//     } else {
//       setPageSize(newSize);
//     }
//     setPage(1); // Reset page to 1 when page size changes
//   };
  
//   /////////////////////////////////////////////////////////////////

//   const handleDateRangeChange = (start, end) => {
//     setStartDate(start);
//     setEndDate(end);
//   };

//   const handleToggleFetchAll = () => {
//     setFetchAll(!fetchAll); // Toggle between fetching all data and fetching 100 items

//   };

//   const handleStateChange = (state) => {
//     setSelectedState(state);
//     // Handle state filtering logic (e.g., filter table data)
//   };

//   const handleDistrictChange = (district) => {
//     setSelectedDistrict(district);
//     // Handle district filtering logic (e.g., filter table data)
//   };
//   const handleSearchRefrence = (district) => {
//     setSelectedDistrict(district);
//     // Handle district filtering logic (e.g., filter table data)
//   };
  
//   const RefernceHandler=(refId)=>{
//     setReferenceId(refId);
//   }
// //this function help us ot add member in this funcitno brother
//   const addMember = (newMember) => {
//     setMembers(prevMembers => [...prevMembers, newMember]);
//   };


//   // Function to remove a member by ID
//   const removeMember = (id) => {
//     window.alert('Are you sure!');
    
//     setMembers(prevMembers => prevMembers.filter(member => member.code !== id));
//   };
// // here this one is edit function
//   const editMember = (id, updatedData) => {
//     setMembers(prevMembers =>
//       prevMembers.map(member =>
//         member.code === id ? { ...member, ...updatedData } : member
//       )
//     );
//   };


//   return (
//     <>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
//         <Typography variant="h4" gutterBottom color='#007bff' >
//           Doners Management
//         </Typography>



//         <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#1976d2' }}>
//             Apply for New Donership
//         </Button>
//       </Box>

//         <MembershipModal1 open={open} handleClose={handleClose} handleOpen={handleOpen} initialData={editData} />


//       <Box borderBottom='1px solid #bcd1c2' display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//       </Box>

//       <box style={{ border: '1px solid #bcd1c2' }}>

//         <Box borderBottom="1px solid #bcd1c2" padding="5px" marginBottom='5px' bgcolor="#007bff" color="white">
//           <Typography>Donar List</Typography>
//         </Box>
       
//         <Box display="flex" justifyContent="space-between">
//           <Box padding='1px'>
//             {/* <Icon generatePdf={generatePdf} copyToClipboard={copyToClipboard} printTable={printTable} downloadCsv={downloadCsv}/> */}
//             <Iconsss tableId="my-tablee"/>
//           </Box>
//           <Box display="flex" justifyContent="flex-end" mb={2}>
//               <StateFilter states={states} selectedState={selectedState} onSelectState={handleStateChange}/>
//               <DistrictFilter  districts={districts} selectedDistrict={selectedDistrict} onSelectDistrict={handleDistrictChange}/>
            
//               <Filter filters={filters} onFilterChange={handleFilterChange} />
//               <Box display="flex" justifyContent="flex-end" mb={2}>
//                 <Search onSearch={handleSearch} />
//               </Box>
//           </Box>
//         </Box>
        
//         {/* Date Range Filter Component */}
//         <Box display="flex" justifyContent="flex-end" mb={2}>
//           <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
//           <ReferenceSearch onSearch={RefernceHandler} />
//         </Box>




//         <MemberTable 
//         members={filteredMembers} //
//         removeMember={removeMember} //
//         editMember={editMember}//
//         id="my-tablee"
//         open={open} handleClose={handleClose} handleOpen={handleOpen}
//         />


//         <Pagination
//           page={page}
//           pageSize={pageSize}
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//           onPageSizeChange={handlePageSizeChange}
//         />
//       </box>
//     </>
//   );
// };

// export default Member;
