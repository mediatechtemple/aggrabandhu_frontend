'use client'
import React, { Suspense, useEffect, useState } from 'react';
import { Button, Box,Typography} from '@mui/material';

import DownloadCSVButton from '../DataConverters/DownloadCSVButton';
import DownloadPDFButton from '../DataConverters/DownloadPDFButton';
import useSortableData from '../Refral-Report/hooks/useSortableData';
import Pagination from '../Member/Pagination';
// import Pagination from '@/user_component/Pagination/Pagination';
const DonationFormDialog = React.lazy(() => import('./DonationFormDialog'));
const SearchMemberDialog = React.lazy(() => import('./SearchMemberDialog'));
const  SortableTable = React.lazy(() => import('./SortableTable'));

  const Loading = () => <div>Loading...</div>;

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

    const [page,setPage]=useState(1);
    const [totalPages,setTotalPages]=useState(1);


    /////////////////////////////////////////////////////////
    // Here i will make formState and and one function to  fill the form here
    
    const [donationData, setDonationData] = useState([]); // State to store API data
      const [error, setError] = useState(null); // State to handle errors
      const [loading, setLoading] = useState(true); // State to show loading indicator
      const { items: sortedMembers, requestSort, getSortIcon } = useSortableData(donationData);
    const [filters, setFilters] = useState({
      name: '',
      state: '',
      district: '',
      ReferenceId:''
  });

  const handleFilterInputChange = (e) => {
      setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  
  const filteredUsers = sortedMembers.filter((user) => {
      const matchesName = !filters.name || user.Member.name.toLowerCase().includes(filters.name.toLowerCase());
     
      const matchesState = !filters.state || user.Member.state === filters.state;
      const matchesDistrict = !filters.district || user.Member.district  === filters.district;

      const matchReferenceId = !filters.ReferenceId || user.Member.reference_id.toLowerCase().includes(filters.ReferenceId.toLowerCase())
   
      return matchesName && matchesState && matchesDistrict && matchReferenceId;
  });


























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

const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setitemsPerPage] = useState(100);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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



const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const handleItemPerChange = (pageNumber) => {
  setCurrentPage(1)
  setitemsPerPage(pageNumber);
};












const fetchDonationData = async (lim,page=1) => {
  console.log(lim,page);
  let toke=JSON.parse( localStorage.getItem('user')).token;
  setToken(toke);
  try {
    const response = await fetch(`https://backend.aggrabandhuss.org/api/donationreceive?limit=${lim}&&${page}`, {
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
    console.log(data);
    setPage(data.currentPage);
    setTotalPages(data.totalpages)
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
  setToken(JSON.parse( localStorage.getItem('user')).token);
  setmemberRights(JSON.parse( localStorage.getItem('user')).rights)
  // console.log(memberRights);
  // console.log('Asoka rights');
},[]);







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
  <div className="flex justify-between items-center mb-2">
    <h1 className="text-2xl font-semibold text-[#007bff]">
      Donation Management
    </h1>

    {memberRights['Donation Management']?.['add'] && (
      <button
        onClick={handleOpen}
        className="bg-[#1976d2] text-white py-2 px-4 rounded"
      >
        New Donation
      </button>
    )}
  </div>

  <div className="border-b border-[#bcd1c2] mb-2"></div>

  <div className="border-b border-[#bcd1c2] p-2 mb-2 bg-[#007bff] text-white">
    <h2>Member List</h2>
  </div>

  <div className="flex justify-between">
    <div className="p-1">
      {/* Download buttons */}
      <div>
        <DownloadCSVButton data={donationData} filename="my_data.csv" />
        <DownloadPDFButton data={pdfData} filename="table_data.pdf" />
      </div>
    </div>

    <div className="flex justify-end mb-2">
      <div className="flex justify-end mb-2">
      

{/* Filters */}
<div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-1">
   
    <div>
        <label className="block text-sm font-medium">State</label>
        <select
            name="state"
            value={filters.state}
            onChange={handleFilterInputChange}
            className="border rounded px-2 py-1 w-full"
        >
            <option value="">All</option>
            {state.map((state) => (
                <option key={state} value={state}>
                    {state}
                </option>
            ))}
        </select>
    </div>

    <div>
        <label className="block text-sm font-medium">District</label>
        <select
            name="district"
            value={filters.district}
            onChange={handleFilterInputChange}
            className="border rounded px-2 py-1 w-full"
        >
            <option value="">All</option>
            {district.map((district) => (
                <option key={district} value={district}>
                    {district}
                </option>
            ))}
        </select>
    </div>

    <div>
        <label className="block text-sm font-medium">Name</label>
        <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterInputChange}
            placeholder="Enter name"
            className="border rounded px-2 py-1 w-full"
        />
    </div>
</div>
      </div>
    </div>
  </div>

  <div className="flex justify-end mb-2">
    <Suspense fallback={<Loading />}>
    <div>
        <label className="block text-sm font-medium">Member Id</label>
        <input
            type="text"
            name="ReferenceId"
            value={filters.ReferenceId}
            onChange={handleFilterInputChange}
            placeholder="Enter MemberId"
            className="border rounded px-2 py-1 w-full"
        />
    </div>
    </Suspense>
  </div>

  <div className="border-b border-[#bcd1c2] mb-2 overflow-x-auto">
    <Suspense fallback={<Loading />}>
      <SortableTable
        sortedRows={filteredUsers}
        openHandler={handleEditOpen}
        setsortedRows={setDonationData}
        memberRights={memberRights}
        requestSort={requestSort}
         getSortIcon={getSortIcon}
      />
    </Suspense>
  </div>

  <Suspense fallback={<Loading />}>
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
    {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        handleItemPerChange={handleItemPerChange}
        membersLength={filteredUsers.length}
      /> */}
      <Pagination 
      page={page} 
      totalPages={totalPages} 
        fetchMembers={fetchDonationData} 
       />

  </Suspense>
</div>

  );
};

export default ParentComponent;
