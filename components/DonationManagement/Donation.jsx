'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { Button, Box,Typography} from '@mui/material';

import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';

import Iconsss from '../Icons/Iconsss';

import data from '@/utils/donationTableData'
import DownloadCSVButton from '../DataConverters/DownloadCSVButton';
import DownloadPDFButton from '../DataConverters/DownloadPDFButton';



const Pagination = React.lazy(() => import('../Member/Pagination'));
const StateFilter = React.lazy(() => import('../Member/StateFilter'));
const DistrictFilter = React.lazy(() => import('../Member/DistrictFilter'));
const Search = React.lazy(() => import('../Member/Search'));
const ReferenceSearch = React.lazy(() => import('../Member/ReferenceSearch'));





const DonationFormDialog = React.lazy(() => import('./DonationFormDialog'));
const SearchMemberDialog = React.lazy(() => import('./SearchMemberDialog'));
const     SortableTable = React.lazy(() => import('./SortableTable'));



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

    const [searchQuery, setSearchQuery] = useState('');



//this one is important brother..
    const [receivingMethods, setReceivingMethods] = useState([]);



  
    const [memberRights, setmemberRights] = useState([]);


























/////////////////////////////////////////////////////////
// Here i will make formState and and one function to  fill the form here

const [donationData, setDonationData] = useState([]); // State to store API data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to show loading indicator



const [formData, setFormData] = useState({
  member_id: '',
  name: '',
  death_date: '',
  file:null,
  nominee1: "",
  relation1: "",
  mobile_no1: "",
});

// const [image, setImage] = useState(null);
const [preview, setPreviews] = useState({
  image1: '',
  image2: '',
  image3: '',
});


const [nomineeCount, setNomineeCount] = useState(1);
const [editData,setEditData]=useState(null);


// State for storing image preview URL

const handleImageChange = (event) => {
  const { name, files } = event.target;
  const file = files[0]; // Select the first file
  

  if (file) {
    // Update formData dynamically based on the input's name attribute
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));

    // Set the corresponding preview dynamically
    setPreviews((prevPreviews) => ({
      ...prevPreviews,
      [name]: URL.createObjectURL(file),
    }));
  }
};
// Common method to handle input changes for all fields
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,  // Dynamically updating the field based on its name
  }));
};

const handleReceivingMethodsChange = (event) => {
  console.log(event.target.value);
  setReceivingMethods(event.target.value);
};

const addNominee = () => {
  if (nomineeCount < 4) {
    setNomineeCount(nomineeCount + 1);
  }
};

// Function to remove nominee fields
const removeNominee = (index) => {
  // Create new form data without removed nominee
  const newFormData = { ...formData };
  delete newFormData[`nominee${index + 1}`];
  delete newFormData[`relationship${index + 1}`];
  delete newFormData[`phone${index + 1}`];

  // Shift remaining nominee fields to fill gaps
  for (let i = index + 1; i < nomineeCount; i++) {
    newFormData[`nominee${i}`] = newFormData[`nominee${i + 1}`] || "";
    newFormData[`relationship${i}`] = newFormData[`relationship${i + 1}`] || "";
    newFormData[`phone${i}`] = newFormData[`phone${i + 1}`] || "";
  }

  setFormData(newFormData);
  setNomineeCount(nomineeCount - 1);
};






const handleSubmit = async () => {
  const { account_number, bank_name, ifsc_code, file, qrcode, ...rest } = formData;

  // Create FormData object
  const newFormData = new FormData();
  Object.keys(rest).forEach(key => newFormData.append(key, rest[key]));

  // Append bank details as JSON
  const bankDetails = { account_number, bank_name, ifsc_code };
  newFormData.append('bank_detail', JSON.stringify(bankDetails));
  newFormData.append('receivingMethods', JSON.stringify(receivingMethods));
  newFormData.append('nomineeCount', nomineeCount);

  // Append files if they exist
  if (file) newFormData.append('file', file);
  if (qrcode) newFormData.append('qrcode', qrcode);

  try {
    const url = editData 
      ? `https://backend.aggrabandhuss.org/api/donationreceive/${editData}`
      : 'https://backend.aggrabandhuss.org/api/donationreceive/';
    const method = editData ? 'PUT' : 'POST';

    const response = await fetch(url, { method, body: newFormData });
    if (!response.ok) throw new Error('Data fetch error');

    const message = editData ? 'Edit Successful!' : 'Submission Successful!';
    alert(message);

    // Reset form and states after submission
    setFormData({});
    setReceivingMethods([]);
    setNomineeCount(1);
    setEditData(null);

    fetchDonationData(); // Refresh donationData
    handleClose(); // Close the popup

  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during submission.');
  }
};















const fetchDonationData = async () => {
  try {
    const response = await fetch('https://backend.aggrabandhuss.org/api/donationreceive/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json(); // Parse the response JSON
    console.log(data.data);
    setDonationData(data.data); // Store the data in state
    setLoading(false); // Set loading to false after data is fetched
  } catch (error) {
    setError(error.message); // Handle and store the error
    setLoading(false); // Set loading to false in case of error
  }
};



useEffect(() => {
  // Function to fetch data from the API

  fetchDonationData(); // Call the fetch function when the component mounts
}, []); // Empty dependency array ensures this runs only on mount



const handleEditOpen = (member) => {
  const {receivingMethods,bank_detail,nomineeCount,...data}=member;
  
  setPopupOpen(true);
  // let death_data=formatDate(data.death_data);

  console.log(data);
  setEditData(data.id);

  console.log(receivingMethods);

  let filePath=`https://backend.aggrabandhuss.org${data.file}`;
  let qrcodePath=`https://backend.aggrabandhuss.org${data.qrcode}`;
  let bank_details=JSON.parse(bank_detail);

  console.log(filePath);
  console.log(qrcodePath);

  console.log(bank_detail);

  setNomineeCount(+nomineeCount);
  setReceivingMethods(JSON.parse(receivingMethods))

  
  setPreviews({
    file:filePath
  })
  
  setPreviews({
    ...preview,
    qrcode:qrcodePath,
    file:filePath
  })



  
  setFormData({
    ...data,
    name:data.Member.name,
    death_date:data.death_date.split('T')[0],
    start_date:data.start_date.split('T')[0],
    end_date:data.end_date.split('T')[0],
    bank_name:bank_details.bank_name,
    account_number:bank_details.account_number,
    ifsc_code:bank_details.ifsc_code,
    
  });

  

};





const handleOpen = (data) => {
  setPopupOpen(true);
};

const handleClose = () => {
  setPopupOpen(false);
  setPreviews({
    qrcode:'',
    file:null
  })
  
  setFormData({
    name:'',
    death_date:'',
    start_date:'',
    end_date:''
  });

  setNomineeCount(1);
  setReceivingMethods([])
};









useEffect(()=>{
  console.log(formData);
},[formData])


useEffect(()=>{
  setmemberRights(JSON.parse( localStorage.getItem('user')).rights)
  console.log(memberRights);
  console.log('Asoka rights');
},[]);












































///////////////////////////////////////////////////////////////////////////


  




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

 

  const handleFileChange = (e) => {
    setQrCode(e.target.files[0]);
  };

  
  const handleSearchDialogOpen = () => {
    setSearchDialogOpen(true);
  };

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false);
  };

  const handleSelectMember = (member) => {
  
    setFormData({
      ...formData,
      member_id:member.id,
      name:member.name,
    });
    // setFormData(member.name);
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








  if (loading) return <p>Loading...</p>; // Show loading indicator while fetching data
  if (error) return <p>Error: {error}</p>; // Show error message if something went wrong




















  return (
    <div>

    <Box  display="flex" justifyContent="space-between" alignItems="center" mb={2} >

        <Typography variant="h4" gutterBottom color='#007bff' >
          Donation Management
        </Typography>

       {memberRights['Donation Management']?.['add'] && <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: '#1976d2' }}>
            New Donation
        </Button>}
      </Box>


      <Box borderBottom='1px solid #bcd1c2' display="flex" justifyContent="space-between" alignItems="center" mb={2} >
      </Box>
        

          <Box borderBottom="1px solid #bcd1c2" padding="5px" marginBottom='5px' bgcolor="#007bff" color="white">
          <Typography>Member List</Typography>
        </Box>
          <Box display="flex" justifyContent="space-between" >
          <Box padding='1px'>
              {/* <Iconsss tableId="my-tablee"/> */}
              <div>
              <DownloadCSVButton data={donationData} filename="my_data.csv" />
              <DownloadPDFButton data={donationData} filename="table_data.pdf" />
              </div>
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
                sortedRows={donationData}
                sortConfig={sortConfig}
                handleSort={handleSort}
                getSortIcon={getSortIcon}
                openHandler={handleEditOpen}
                setsortedRows={setDonationData}
                memberRights={memberRights}
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

   {/* here donation form dialog will open so today it this would be our task */}

            <DonationFormDialog
              popupOpen={popupOpen}
              handleClose={handleClose}
             
              handleFileChange={handleFileChange}


              handleSubmit={handleSubmit}
              handleSearchDialogOpen={handleSearchDialogOpen}


              receivingMethods={receivingMethods}
              setReceivingMethods={setReceivingMethods}


              formData={formData}
              handleInputChange={handleInputChange}
              handleImageChange={handleImageChange}
              preview={preview}
              handleReceivingMethodsChange={handleReceivingMethodsChange}
              
              addNominee={addNominee}
              removeNominee={removeNominee}
              nomineeCount={nomineeCount}
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
