'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { Button, Box,Typography} from '@mui/material';

import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

import Iconsss from '../Icons/Iconsss';

import data from '@/utils/donationTableData'



const Pagination = React.lazy(() => import('../Member/Pagination'));
const StateFilter = React.lazy(() => import('../Member/StateFilter'));
const DistrictFilter = React.lazy(() => import('../Member/DistrictFilter'));
const Search = React.lazy(() => import('../Member/Search'));
const ReferenceSearch = React.lazy(() => import('../Member/ReferenceSearch'));
const DonationFormDialog = React.lazy(() => import('./DonationFormDialog'));
const SearchMemberDialog = React.lazy(() => import('./SearchMemberDialog'));
const SortableTable = React.lazy(() => import('./SortableTable'));



/////////////////////////////////////////////////////////////////////
  const getSortIcon = (key, sortConfig) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };
  //////////////////////////////////////////////////////////////////////////////

  const Loading = () => <div>Loading...</div>;

//////////////////////////////////
const ParentComponent = () => {
    // const classes=useStyles();
    const [popupOpen, setPopupOpen] = useState(false);
    const [searchDialogOpen, setSearchDialogOpen] = useState(false);

    const [searchResults, setSearchResults] = useState([]);
  ///////////////////////////////////////////////////////////
  // these are nothing but form field

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [receivingMethod, setReceivingMethod] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [upiId, setUpiId] = useState('');
    const [upiNumber, setUpiNumber] = useState('');
    const [qrCode, setQrCode] = useState(null);
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');

    const [receivingMethods, setReceivingMethods] = useState([]);




  




  /////////////////////////////////////////////////////////////
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [totalPages, setTotalPages] = useState(1);

  ////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////////////////////

//here state,districst,name and id filter......... filtering will comes into picture 
const[selectedState,setSelectedState]=useState('');
const[selectedDistrict,setSelectedDistrict]=useState('');
const[nameQuery,setNameQuery]=useState('');
const [referenceId,setReferenceId]=useState('');
// const [startDate, setStartDate] = useState(null);
// const [endDate, setEndDate] = useState(null);

const states = ['State 1', 'PQR', 'STU'];
const districts = ['District 1', 'District 2', 'GHI'];


function handleStateChange(state){
  setSelectedState(state);
}

function handleDistrictChange(district){
  setSelectedDistrict(district);
}
const handleNameSearch = query => {
  setNameQuery(query);
};

function RefernceHandler(refId){
  setReferenceId(refId);
}

const handleDateRangeChange = (start, end) => {
  setStartDate(start);
  setEndDate(end);
};
  
  


  //bhai yaha sorting icon is going to work brotehr........
// --------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------

  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  

//   ---------------------------------------------------------------------------------------------------------------
//   ---------------------------------------------------------------------------------------------------------------

  const handleOpen = (data) => {
    setPopupOpen(true);

  };

  const handleFileChange = (e) => {
    setQrCode(e.target.files[0]);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const handleSearchDialogOpen = () => {
    setSearchDialogOpen(true);
  };

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false);
  };

  const handleSelectMember = (member) => {
    setUserId(member.code);
    setName(member.name);
    handleSearchDialogClose(); // Close search dialog after selection
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const handleSearch = () => {
    // Implement search logic here
    // For demonstration, use static data
    if (searchQuery === '') {
      setSearchResults([]);
      return;
    }

    const dummyResults = [
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Smith' }
    ];

    const filteredResults = dummyResults.filter(member =>
      member.id.toLowerCase().includes(searchQuery.toLowerCase())
    //    || member.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredResults);
  };


  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form Submitted:', { userId, name, startDate, endDate, receivingMethod ,upiId,upiNumber,qrCode,bankName,ifscCode,accountNumber});
    handleClose(); // Close the popup after submission
  };

  //////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    let result = data;

     result = [...data].sort((a, b) => {
        if (sortConfig.key) {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        }
        return 0;
      });
    // Apply search filter
    if (nameQuery) {
      result = result.filter(member =>
        member.name.toLowerCase().includes(nameQuery.toLowerCase())
      );
    }

    
    // // Apply state filter
    if (selectedState) {
      result = result.filter(member => member.state === selectedState);
    }

    // Apply district filter
    if (selectedDistrict) {
      result = result.filter(member => member.district === selectedDistrict);
    }

    // // Apply reference ID filter
    if (referenceId) {
      result = result.filter(member => member.code && member.code.toString() === referenceId);
    }

    //apply for refrence id brother here
    

  

    // Calculate total pages for pagination
    setTotalPages(Math.ceil(result.length / pageSize));

    // Apply pagination and update filtered members
    setSearchResults(result.slice((page - 1) * pageSize, page * pageSize));
  }, [ page, pageSize,sortConfig,selectedState,selectedDistrict,nameQuery,referenceId]);



/////////////////////////////////////////////////////////////////////////////////////
  const handlePageChange = newPage => {
    setPage(newPage);
  };

  const handlePageSizeChange = newSize => {
    if (newSize === 'all') {
      setPageSize(data.length); // Set pageSize to total length of members array
    } else {
      setPageSize(newSize);
    }
    setPage(1); // Reset page to 1 when page size changes
  };

  ////////////////////////////////////////////////////////////////////////////////


  return (
    <div>

    <Box  display="flex" justifyContent="space-between" alignItems="center" mb={2} >

        <Typography variant="h4" gutterBottom color='#007bff' >
          Donation Management
        </Typography>
        <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#1976d2' }}>
            New Donation
        </Button>
      </Box>


      <Box borderBottom='1px solid #bcd1c2' display="flex" justifyContent="space-between" alignItems="center" mb={2} >
      </Box>
        

          <Box borderBottom="1px solid #bcd1c2" padding="5px" marginBottom='5px' bgcolor="#007bff" color="white">
          <Typography>Member List</Typography>
        </Box>
          <Box display="flex" justifyContent="space-between" >
          <Box padding='1px'>
              <Iconsss tableId="my-tablee"/>
          </Box>
            <Box display="flex" justifyContent="flex-end" mb={2} >
                {/* <Filter filters={filters} onFilterChange={handleFilterChange} /> */}
                <Box display="flex" justifyContent="flex-end" mb={2}>
                <Suspense fallback={<Loading />}>
                  <StateFilter states={states} selectedState={selectedState} onSelectState={handleStateChange}/>

                  <DistrictFilter  districts={districts} selectedDistrict={selectedDistrict} onSelectDistrict={handleDistrictChange}/>

                  <Search onSearch={handleNameSearch} /> 
                </Suspense>
                </Box>
            </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          {/* <DateRangeFilter onDateRangeChange={handleDateRangeChange} /> */}
          <Suspense fallback={<Loading />}>
          <ReferenceSearch onSearch={RefernceHandler} />
          </Suspense>
        </Box>

      <Box borderBottom="1px solid #bcd1c2"  marginBottom='5px'  color="white" sx={{  overflowX: 'auto',  }}>
          
          <Suspense fallback={<Loading />}>
          <SortableTable
                sortedRows={searchResults}
                sortConfig={sortConfig}
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                openHandler={handleOpen}
                />
          </Suspense>
            
        </Box>

        

        <Suspense fallback={<Loading />}>
        <Pagination
                page={page}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
            <DonationFormDialog
              popupOpen={popupOpen}
              handleClose={handleClose}
              userId={userId}
              setUserId={setUserId}
              name={name}
              setName={setName}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              receivingMethod={receivingMethod}
              setReceivingMethod={setReceivingMethod}
              bankName={bankName}
              setBankName={setBankName}
              accountNumber={accountNumber}
              setAccountNumber={setAccountNumber}
              ifscCode={ifscCode}
              setIfscCode={setIfscCode}
              upiId={upiId}
              setUpiId={setUpiId}
              upiNumber={upiNumber}
              setUpiNumber={setUpiNumber}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              handleSearchDialogOpen={handleSearchDialogOpen}
              receivingMethods={receivingMethods}
              setReceivingMethods={setReceivingMethods}
              
            />
            <SearchMemberDialog
              searchDialogOpen={searchDialogOpen}
              handleSearchDialogClose={handleSearchDialogClose}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              searchResults={searchResults}
              handleSelectMember={handleSelectMember}
            />
      </Suspense>
             
    </div>
  );
};

export default ParentComponent;
