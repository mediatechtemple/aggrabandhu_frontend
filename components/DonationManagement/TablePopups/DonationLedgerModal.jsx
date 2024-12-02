import DownloadCSVButton from "@/components/DataConverters/DownloadCSVButton";
import DownloadPDFButton from "@/components/DataConverters/DownloadPDFButton";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSortableData from "../Hooks/useSortableData";
import Pagination from "@/user_component/Pagination/Pagination";

const tableHeaders = [
  { key: "sr", label: "Sr" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "state", label: "State" },
  { key: "donation_date", label: "Donation Date" },
  { key: "transaction_id", label: "Transaction Id" },
  // { key: "status", label: "Status" },
  { key: "amount", label: "Amount" },
  { key: "transactionFile", label: "Transaction File" },
  { key: "action", label: "Action" },
];

const BankDetailPopup = ({ledgerData, handleLedgerClose}) => {
    const [error,setError]=useState(null);
    const [DonatorsData,setDonatorsData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [searchText, setSearchText] = useState('');
    const [totalAmount,setTotalAmount]=useState(0);
    const [state,setState]=useState([]);
    const [district,setDistrict]=useState([]);useSortableData
    const { items: sortedData, requestSort, getSortIcon } = useSortableData(DonatorsData);

    const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setitemsPerPage] = useState(2);
    
    const [filters, setFilters] = useState({
        state: '',
        district: '',
    });
  
    const handleFilterInputChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    function handlerSearchText(e){
        setSearchText(e.target.value);
    }

    async function disputeDelete(id){
      // alert(ledgerData.id)
      // return;
      
        try{
            const response=await fetch(`https://backend.aggrabandhuss.org/api/donation/status/${id}`,{
                method:'DELETE',
            })
            if(!response.ok){
                throw new Error('dispute error')
            }

            alert('data disputed');
            getData();
        }catch(error){
            console.log(error)
        }
    }

    
    async function disputePut(id) {
      try {
        const response = await fetch(`https://backend.aggrabandhuss.org/api/donation/status/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Specify JSON content type
          },
          body: JSON.stringify({ status: 'Approved' }) // Properly format JSON body
        });
    
        if (!response.ok) { // Check response status
          throw new Error('Dispute error');
        }
    
        alert('Data disputed successfully');
        getData();
      } catch (error) {
        console.log(error);
      }
    }
    
    

    async function getData(){
        try{
            const response= await fetch(`https://backend.aggrabandhuss.org/api/donationreceive/getOne/${ledgerData.id}`);
            if(!response.ok){
                throw new Error('got one error here');
            }
            const data=await response.json();
            setLoading(false);
            // console.log('Ashoka yadav')
            console.log(data.data);
            setDonatorsData(data.data);


              // Extract unique states
            setState([...new Set(data.data.map(item => item.Member.state))]);

            // Extract unique districts
            setDistrict([...new Set(data.data.map(item => item.Member.district))])


        } catch (err) {
            setError(err.message);
        }
    }


    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleItemPerChange = (pageNumber) => {
      setCurrentPage(1)
      setitemsPerPage(pageNumber);
    };

    function ExportData(data){

      return data.map((item)=>{
        return {

          name:item.Member.name,
          email:item.Member.email,
          state:item.Member.state,
          district:item.Member.district,
          donationDate:new Date(item.donation_date).toLocaleDateString('en-GB'),  
          transactionId:item.transaction_id,
          Amount:item.amount,
          Status:item.status
        }
      })
      // return data;
    }

    

    

    useEffect(()=>{
        getData();
    },[ledgerData.id])

    

    
   


    const datafilter = sortedData.filter((donator) => {
        const stateMatch = filters.state ? donator.Member.state.toLowerCase().includes(filters.state.toLowerCase()) : true;
        const districtMatch = filters.district ? donator.Member.district.toLowerCase().includes(filters.district.toLowerCase()) : true;
        const searchTextMatch = searchText ? JSON.stringify(donator).toLowerCase().includes(searchText.toLowerCase()) : true;
      
        return stateMatch && districtMatch && searchTextMatch;
      });



      useEffect(()=>{
        setTotalAmount(datafilter.reduce((sum, item) => {
          // Only add the amount if the status is not "Rejected"
          if (item.status !== "Rejected") {
            return sum + (+item.amount); // Add the amount if condition is met
          }
          return sum; // Otherwise, just return the current sum without adding anything
        }, 0));
      },[datafilter])

      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = datafilter.slice(indexOfFirstItem, indexOfLastItem);
      const totalPages = Math.ceil(datafilter.length / itemsPerPage);




    if((DonatorsData.length==0) && loading){
        return <p>Loading...</p>
    }

    const toprecetneventpro=(e)=>{
        e.preventDefault();
    }

  return (
<div className="fixed inset-0 text-black bg-gray-800 bg-opacity-50 flex justify-center items-center z-[2800]">
  <div className="bg-white rounded-lg shadow-lg p-6 z-[2800] w-full h-full overflow-y-auto">
    <div className="text-right">
      <button 
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" 
        onClick={() => handleLedgerClose()}>
        Close
      </button>
    </div>
    














    <div className="flex justify-between items-center my-4">
  <div>
    <DownloadCSVButton data={ExportData(datafilter)} />
    <DownloadPDFButton data={ExportData(datafilter)} />
  </div>

  <div className="flex justify-end items-center gap-4">
    {/* State filter */}
    <div>
      <label className="block text-sm font-medium">State</label>
      <select
        name="state"
        value={filters.state}
        onChange={handleFilterInputChange}
        className="border rounded px-2 py-1 w-[200px]"
      >
        <option value="">All</option>
        {state.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>

    {/* District filter */}
    <div>
      <label className="block text-sm font-medium">District</label>
      <select
        name="district"
        value={filters.district}
        onChange={handleFilterInputChange}
        className="border rounded px-2 py-1 w-[200px]"
      >
        <option value="">All</option>
        {district.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>

    {/* Search input */}
    <div>
    <label className="block text-sm font-medium">Search</label>
    <input
      className="border p-1"
      placeholder="Search..."
      type="text"
      value={searchText}
      onChange={handlerSearchText}
    />
    </div>
    
  </div>
</div>















    <div className="p-4 bg-gray-100 rounded-lg shadow-md max-w-sm ">
        <p className="text-2xl font-semibold text-green-500">
            Total Amount:  ₹{totalAmount}
        </p>
    </div>

    <div className="overflow-x-auto w-full h-full">
      <table className="w-full table-auto border-collapse border border-gray-300 text-black text-center">
        <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th
              key={header.key}
              onClick={() => requestSort(header.key)}
              className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2 cursor-pointer"
            >
              {header.label} {getSortIcon(header.key)}
            </th>
          ))}
        </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{item.Member.reference_id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.Member.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.Member.email}</td>
              <td className="border border-gray-300 px-4 py-2">{item.Member.state}</td>
              <td className="border border-gray-300 px-4 py-2">{new Date(item.donation_date).toLocaleDateString('en-GB')}</td>
              <td className="border border-gray-300 px-4 py-2">{item.transaction_id}</td>
              {/* <td className={`border border-gray-300 px-4 py-2 ${item.status === 'Rejected' ? 'text-red-500' : 'text-green-500'}`}>
                {item.status}
              </td> */}
              <td className="border border-gray-300 px-4 py-2">₹{item.amount}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                  <Link href={`https://backend.aggrabandhuss.org${item.transaction_file}`} target="_blank" rel="noopener noreferrer">
                    View
                  </Link>
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.status === 'Approved' ? (
                  <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={()=>disputeDelete(item.id)}>
                    Dispute
                  </button>
                ) :
                (
                  <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={()=>disputePut(item.id)}>
                    Undispute
                  </button>
                )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {DonatorsData.length === 0 && <h1 className="text-center text-red-500">No data available!</h1>}
    <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        handleItemPerChange={handleItemPerChange}
        membersLength={currentItems.length}
      />
    </div>





  </div>
</div>

  );
};

export default BankDetailPopup;
