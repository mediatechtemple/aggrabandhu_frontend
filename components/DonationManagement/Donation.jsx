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
const  SortableTable = React.lazy(() => import('./SortableTable'));



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
    
    const [state,setState]=useState('');
    const [district,setDistrict]=useState('');

    const [filters, setFilters] = useState({
      name: '',
      ageRange: '',
      status: '',
      state: '',
      district: '',
  });

  const handleFilterInputChange = (e) => {
      setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // const filteredUsers = users.filter((user) => {
  //     const matchesName = user.name.toLowerCase().includes(filters.name.toLowerCase());
  //     const matchesAgeRange = !filters.ageRange || (
  //         (filters.ageRange === '20-30' && user.age >= 20 && user.age <= 30) ||
  //         (filters.ageRange === '31-40' && user.age >= 31 && user.age <= 40)
  //     );
  //     const matchesStatus = !filters.status || user.status === filters.status;
  //     const matchesState = !filters.state || user.state === filters.state;
  //     const matchesDistrict = !filters.district || user.district === filters.district;

  //     return matchesName && matchesAgeRange && matchesStatus && matchesState && matchesDistrict;
  // });























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

const [pdfData,setPdfData]=useState([]);

const [nomineeCount, setNomineeCount] = useState(1);
const [editData,setEditData]=useState(null);

const [token,setToken]=useState(null);

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

    const response = await fetch(url, { method,
      headers:{
        'Authorization':`Bearer ${token}`
      },
      body: newFormData });
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















const fetchDonationData = async (toke) => {
  try {
    const response = await fetch('https://backend.aggrabandhuss.org/api/donationreceive/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
          'Authorization':`Bearer ${toke}`
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json(); // Parse the response JSON
    console.log(data.data);
    setDonationData(data.data); // Store the data in state


    
    setState(data.data.map((item)=>item.Member.state));
    setDistrict(data.data.map((item)=>item.Member.district));

    // console.log(statdist);
    
    setPdfData([...data.data].map((item) => {
      return {
        // Member: {
        //   // id: item.Member?.id || null,
        //   name: item.Member?.name || null,
        //   // email: item.Member?.email || null,
        //   state: item.Member?.state || null,
        //   district: item.Member?.district || null,
        // },

        Member_name:item.Member?.name || null,
        Member_state: item.Member?.state || null,
        Member_district:item.Member?.district || null,




        bank_detail: item.bank_detail || null,
        // createdAt: item.createdAt || null,
        death_date: item.death_date || null,
        end_date: item.end_date || null,
        // file: item.file || null,
        // id: item.id || null,
        member_id: item.member_id || null,
        min_amount: item.min_amount || null,


        mobile_numbers:item.mobile_no1,


        nominee1:item.nominee1,
        nominee2:item.nominee2,
        nominee3:item.nominee3,
        nominee4:item.nominee4,

        // qrcode: item.qrcode || null,
        // receivingMethods: JSON.parse(item.receivingMethods || "[]"), // String ko array mein convert kiya
       
        // receivingMethods:'upi_number',
       
       
        // refer_by: {
        //   // id: item.refer_by?.id || null,
        //   name: item.refer_by?.name || null,
        //   // email: item.refer_by?.email || null,
        //   state: item.refer_by?.state || null,
        //   district: item.refer_by?.district || null,
        // },


       refer_by_name:item.refer_by?.name || null,
       refer_by_state: item.refer_by?.state || null,
       refer_by_district:item.refer_by?.district || null,




        remark: item.remark || null,
        start_date: item.start_date || null,
        status: item.status || "Inactive", // Default "Inactive" set kiya
        total_donation_received: item.total_donation_received || "0.00",
        // updatedAt: item.updatedAt || null,

        upi_name:item.upi_name,
        upi_number:item.upi_number,
        upi_id:item.upi_id,
        // upi_details: {
        //   id: item.upi_id || null,
        //   name: item.upi_name || null,
        //   number: item.upi_number || null,
        // },
      };
    }));
    
    setLoading(false); // Set loading to false after data is fetched
  } catch (error) {
    setError(error.message); // Handle and store the error
    setLoading(false); // Set loading to false in case of error
  }
};



useEffect(() => {
  // Function to fetch data from the API
  let toke=JSON.parse( localStorage.getItem('user')).token;
  setToken(toke);
  fetchDonationData(toke); // Call the fetch function when the component mounts
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









// useEffect(()=>{
//   console.log(formData);
// },[formData])


useEffect(()=>{
  setToken(JSON.parse( localStorage.getItem('user')).token);
  setmemberRights(JSON.parse( localStorage.getItem('user')).rights)
  // console.log(memberRights);
  // console.log('Asoka rights');
},[]);












































///////////////////////////////////////////////////////////////////////////


  


























  



  
  


  

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

  

 








/////////////////////////////////////////////////////////////////////////////////////
 








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
              <DownloadPDFButton data={pdfData} filename="table_data.pdf" />
              </div>
          </Box>

            <Box display="flex" justifyContent="flex-end" mb={2} >
                {/* <Filter filters={filters} onFilterChange={handleFilterChange} /> */}
                <Box display="flex" justifyContent="flex-end" mb={2}>
                <Suspense fallback={<Loading />}>
                  {/* <StateFilter states={state} selectedState={setState} onSelectState={handleStateChange}/>

                  <DistrictFilter  districts={district} selectedDistrict={setDistrict} onSelectDistrict={handleDistrictChange}/>

                  <Search onSearch={handleNameSearch} />  */}
                </Suspense>
                </Box>
            </Box>

            
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          {/* <DateRangeFilter onDateRangeChange={handleDateRangeChange} /> */}
          <Suspense fallback={<Loading />}>
          {/* <ReferenceSearch onSearch={RefernceHandler} /> */}
          </Suspense>
        </Box>

      <Box borderBottom="1px solid #bcd1c2"  marginBottom='5px'  color="white" sx={{  overflowX: 'auto',  }}>
          
          <Suspense fallback={<Loading />}>
          <SortableTable
                sortedRows={donationData}
                openHandler={handleEditOpen}
                setsortedRows={setDonationData}
                memberRights={memberRights}
                />
          </Suspense>
            
        </Box>

        

        <Suspense fallback={<Loading />}>
        {/* <Pagination
                page={page}
                pageSize={pageSize}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            /> */}

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
              // handleSearch={handleSearch}
              searchResults={searchResults}
              handleSelectMember={handleSelectMember}
              
            />
      </Suspense>
             
    </div>
  );
};

export default ParentComponent;
