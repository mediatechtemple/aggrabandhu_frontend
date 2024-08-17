"use client"
import React, { useState, useEffect } from 'react';
import Search from './Search';
import Filter from './Filter';
import MemberTable from './MemberTable';
import Pagination from './Pagination';
import MembershipModal from './MembershipModal';
import MembershipModal1 from './MembershipModal1';
import DateRangeFilter from './DatedRangeFilter'; // Corrected import name
import { Container, Typography, Box, Button } from '@mui/material';
import DistrictFilter from './DistrictFilter';
import StateFilter from './StateFilter';
// import Icon from '../../component/Icons/Icon';
import ReferenceSearch from './ReferenceSearch';
import Iconsss from '../Icons/Iconsss';
import data from '@/utils/memberTableData';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Member = () => {
  
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ role: '', isActive: false });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100); // Default page size
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fetchAll, setFetchAll] = useState(false); // State to fetch all data
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [referenceId,setReferenceId]=useState('');

//////////////////////////////////////////////////////////////////
  const [open,setOpen]=useState(false);
  const [editData,setEditData]=useState(null);

  const handleClose=()=>{
    setOpen(false);
  }
  const handleOpen=(entry=null)=>{
    setEditData(entry)
    setOpen(true);
  }

  useEffect(()=>{editData && console.log(editData)},[editData])
/////////////////////////////////////////////////////////////////////
  const states = ['XYZ', 'PQR', 'STU'];
  const districts = ['ABC', 'DEF', 'GHI'];

  
  useEffect(() => {
    setMembers(data); // Set initial members state with data array
  }, []);


  useEffect(() => {
    let result = members;

    // Apply search filter
    //
    if (searchQuery) {
      result = result.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply role filter
    if (filters.role) {
      result = result.filter(member => member.role === filters.role);
    }

    // Apply active status filter
    if (filters.isActive) {
      result = result.filter(member => member.status === 'active');
    }
    
    // Apply state filter
    if (selectedState) {
      result = result.filter(member => member.state === selectedState);
    }

    // Apply district filter
    if (selectedDistrict) {
      result = result.filter(member => member.district === selectedDistrict);
    }

    // Apply reference ID filter
    if (referenceId) {
      result = result.filter(member => member.code && member.code.toString() === referenceId);
    }

    //apply for refrence id brother here
    

  

    // Apply date range filter
    if (startDate && endDate) {
      result = result.filter(member => {
        const memberJoiningDate = new Date(member.joiningDate);
        return memberJoiningDate >= startDate && memberJoiningDate <= endDate;
      });
    }

    // Calculate total pages for pagination
    setTotalPages(Math.ceil(result.length / pageSize));

    // Apply pagination and update filtered members
    setFilteredMembers(result.slice((page - 1) * pageSize, page * pageSize));

  }, [members, searchQuery, filters, startDate, endDate, page, pageSize,referenceId,selectedDistrict,selectedState]);




  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleFilterChange = newFilters => {
    setFilters(newFilters);
  };

  /////////////////////////////////////////////////////////////////

  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handlePageSizeChange = newSize => {
    if (newSize === 'all') {
      setPageSize(members.length); // Set pageSize to total length of members array
    } else {
      setPageSize(newSize);
    }
    setPage(1); // Reset page to 1 when page size changes
  };
  
  /////////////////////////////////////////////////////////////////

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleToggleFetchAll = () => {
    setFetchAll(!fetchAll); // Toggle between fetching all data and fetching 100 items

  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    // Handle state filtering logic (e.g., filter table data)
  };

  const handleDistrictChange = (district) => {
    setSelectedDistrict(district);
    // Handle district filtering logic (e.g., filter table data)
  };
  const handleSearchRefrence = (district) => {
    setSelectedDistrict(district);
    // Handle district filtering logic (e.g., filter table data)
  };
  
  const RefernceHandler=(refId)=>{
    setReferenceId(refId);
  }
//this function help us ot add member in this funcitno brother
  const addMember = (newMember) => {
    setMembers(prevMembers => [...prevMembers, newMember]);
  };


  // Function to remove a member by ID
  const removeMember = (id) => {
    window.alert('Are you sure!');
    
    setMembers(prevMembers => prevMembers.filter(member => member.code !== id));
  };
// here this one is edit function
  const editMember = (id, updatedData) => {
    setMembers(prevMembers =>
      prevMembers.map(member =>
        member.code === id ? { ...member, ...updatedData } : member
      )
    );
  };


  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
        <Typography variant="h4" gutterBottom color='#007bff' >
          Member Management
        </Typography>
        <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#1976d2' }}>
            Apply for New Membership
        </Button>
      </Box>

        <MembershipModal1 open={open} handleClose={handleClose} handleOpen={handleOpen} initialData={editData} />


      <Box borderBottom='1px solid #bcd1c2' display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      </Box>

      <box style={{ border: '1px solid #bcd1c2' }}>

        <Box borderBottom="1px solid #bcd1c2" padding="5px" marginBottom='5px' bgcolor="#007bff" color="white">
          <Typography>Member List</Typography>
        </Box>
       
        <Box display="flex" justifyContent="space-between">
        <Box padding='1px'>
          {/* <Icon generatePdf={generatePdf} copyToClipboard={copyToClipboard} printTable={printTable} downloadCsv={downloadCsv}/> */}
          <Iconsss tableId="my-tablee"/>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={2}>
            <StateFilter states={states} selectedState={selectedState} onSelectState={handleStateChange}/>
            <DistrictFilter  districts={districts} selectedDistrict={selectedDistrict} onSelectDistrict={handleDistrictChange}/>
          
            <Filter filters={filters} onFilterChange={handleFilterChange} />
            <Box display="flex" justifyContent="flex-end" mb={2}>
              <Search onSearch={handleSearch} />
            </Box>
          </Box>
        </Box>
        
        {/* Date Range Filter Component */}
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <DateRangeFilter onDateRangeChange={handleDateRangeChange} />
          <ReferenceSearch onSearch={RefernceHandler} />
        </Box>

        <MemberTable 
        members={filteredMembers} //
        removeMember={removeMember} //
        editMember={editMember}//
        id="my-tablee"
        open={open} handleClose={handleClose} handleOpen={handleOpen}
        />
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </box>
    </>
  );
};

export default Member;
