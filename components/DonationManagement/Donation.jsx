'use client'
import React, { useEffect, useState } from 'react';
import { Button, Box, Dialog, DialogContent, DialogActions, TextField, MenuItem, FormControl, InputLabel, Select, Divider, List, ListItem, ListItemText, DialogTitle, ListItemButton, Typography, Table, TableHead, TableRow, TableBody, TableCell, IconButton, TableSortLabel} from '@mui/material';
import { border, minWidth } from '@mui/system';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
// import SortableTable from '@/app/component/DonationManagement/SortableTable'
import Iconsss from '../Icons/Iconsss';
import Pagination from '../Member/Pagination';
import data from '@/utils/donationTableData'
import StateFilter from '../Member/StateFilter';
import DistrictFilter from '../Member/DistrictFilter';
import Search from '../Member/Search';
import DateRangeFilter from '../Member/DatedRangeFilter';
import ReferenceSearch from '../Member/ReferenceSearch';
import DonationFormDialog from'./DonationFormDialog';

import SearchMemberDialog from './SearchMemberDialog'
import SortableTable from './SortableTable';


/////////////////////////////////////////////////////////////////////
  const getSortIcon = (key, sortConfig) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };
  //////////////////////////////////////////////////////////////////////////////


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




    
    
    // const [formData, setFormData] = useState({
    //   userId: '',
    //   name: '',
    //   startDate: '',
    //   endDate: '',
    //   receivingMethod: '',
    //   upiId: '',
    //   upiNumber: '',
    //   qrCode: null,
    //   bankName: '',
    //   accountNumber: '',
    //   ifscCode: ''
    // });
 




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

    // // Apply role filter
    // if (filters.role) {
    //   result = result.filter(member => member.role === filters.role);
    // }

    // // Apply active status filter
    // if (filters.isActive) {
    //   result = result.filter(member => member.status === 'active');
    // }
    
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
    

  

    // Apply date range filter
    // if (startDate && endDate) {
    //   result = result.filter(member => {
    //     const memberJoiningDate = new Date(member.joiningDate);
    //     return memberJoiningDate >= startDate && memberJoiningDate <= endDate;
    //   });
    // }

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
                  <StateFilter states={states} selectedState={selectedState} onSelectState={handleStateChange}/>

                  <DistrictFilter  districts={districts} selectedDistrict={selectedDistrict} onSelectDistrict={handleDistrictChange}/>

                  <Search onSearch={handleNameSearch} /> 
                </Box>
            </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          {/* <DateRangeFilter onDateRangeChange={handleDateRangeChange} /> */}
          <ReferenceSearch onSearch={RefernceHandler} />
        </Box>
      <Box borderBottom="1px solid #bcd1c2"  marginBottom='5px'  color="white" sx={{  overflowX: 'auto',  }}>
     
            <SortableTable
            sortedRows={searchResults}
            sortConfig={sortConfig}
            handleSort={handleSort}
            getSortIcon={getSortIcon}
            openHandler={handleOpen}
            />
        </Box>

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



      {/* here dialog will get open here brother..... */}
      {/* <Dialog open={popupOpen} onClose={handleClose}>
        <DialogTitle>Donation Form</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearchDialogOpen}
              sx={{ mb: 2 }}
            >
              Search Member by ID 
            </Button>
            <TextField
              autoFocus
              margin="dense"
              label="User ID"
              fullWidth
              variant="outlined"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Start Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <TextField
              margin="dense"
              label="End Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel>Receiving Method</InputLabel>
            <Select
              value={receivingMethod}
              onChange={(e) => setReceivingMethod(e.target.value)}
              label="Receiving Method"
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="bank">Bank Transfer</MenuItem>
            </Select>
          </FormControl>
          {receivingMethod === 'bank' && (
            <Box
              sx={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '16px',
                marginTop: '16px',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '8px',
                  marginBottom: '8px',
                 color:'#1976d2'
                }}
              >
                Bank Details
              </Typography>
              <TextField
                margin="dense"
                label="Bank Name"
                fullWidth
                variant="outlined"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Account Number"
                fullWidth
                variant="outlined"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
              <TextField
                margin="dense"
                label="IFSC Code"
                fullWidth
                variant="outlined"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
              />
            </Box>
          )
        }
            <TextField
            margin="dense"
            label="UPI ID"
            fullWidth
            variant="outlined"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <TextField
            margin="dense"
            label="UPI Number"
            fullWidth
            variant="outlined"
            value={upiNumber}
            onChange={(e) => setUpiNumber(e.target.value)}
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            margin="dense"
          >
            Upload QR Code
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog> */}

{/* here we will search for item to */}
      {/* <Dialog open={searchDialogOpen} onClose={handleSearchDialogClose}>
        <DialogTitle>Search Member</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Search Person by ID "
            fullWidth
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // onKeyPress={handleKeyPress}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ marginTop: 1, display: 'block', mx: 'auto' }}
          >
            Search
          </Button>
          <Divider sx={{ my: 2 }} />
          {searchResults.length > 0 ? (
            <List>
              {searchResults.map((member) => (
                <ListItemButton  key={member.id} onClick={() => handleSelectMember(member)}>
                  <ListItemText primary={`${member.code} - ${member.name}`} /> <Button>add</Button>
                </ListItemButton>
              ))}
            </List>
          ) : (
            <Typography>No member exists</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSearchDialogClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default ParentComponent;
