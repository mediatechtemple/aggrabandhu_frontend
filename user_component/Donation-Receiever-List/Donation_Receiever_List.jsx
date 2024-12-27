'use client'
import React, { useEffect, useState } from 'react';
import useSortableData from '@/hooks/TablesortingHook';
import Pagination from '@/components/Member/Pagination';
// import Pagination from '../Pagination/Pagination';

const getAllValues = (obj) => {
  let values = [];
  for (let key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      values = values.concat(getAllValues(obj[key]));
    } else {
      values.push(obj[key]);
    }
  }
  return values;
};

const Donation_Receiever_List = () => {
  const [donations, setDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { sortedItems, requestSort, getSortIcon } = useSortableData(donations);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setitemsPerPage] = useState(100);
  const [page,setPage]=useState(1);
  const [totalPage,setTotalPages]=useState(1);

  const fetchDonations = async (lim,page=1) => {
    try {
      const response = await fetch(`https://backend.aggrabandhuss.org/api/donationreceive?limit=${lim}&&page=${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDonations(data.data);
      console.log(data);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching donations data:', error);
    }
  };
  useEffect(() => {
  
    fetchDonations();
  }, []);
  

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleItemPerChange = (pageNumber) => {
    setCurrentPage(1)
    setitemsPerPage(pageNumber);
  };
  

  // Filter data based on search input
  // const filteredDonations = sortedItems.filter((item) =>
  //   Object.values(item).some((value) =>
  //     typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  // );
  const filteredDonations = sortedItems.filter((item) =>
    getAllValues(item).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDonations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredDonations.length / itemsPerPage);

  // Column configuration
  const columns = [
    { key: 'Member.reference_id', label: 'Member ID' },
    { key: 'file', label: 'Photo', sortable: false },
    { key: 'Member.name', label: 'Name' },
    { key: 'total_donation_received', label: 'Amount' },
    { key: 'death_date', label: 'Death Date' },
    { key: 'Member.state', label: 'Address',},
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white text-center">Donations Receiver</h2>

      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search Donations"
          className="p-2 border border-black"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-2 px-4 border bg-blue-500 text-white ${
                  column.sortable !== false ? 'cursor-pointer' : ''
                }`}
                onClick={column.sortable !== false ? () => requestSort(column.key) : null}
              >
                {column.label} {column.sortable !== false && getSortIcon(column.key)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredDonations.map((donation) => (
            <tr key={donation.id} className="text-center">
              <td className="py-2 px-4 border">{donation.Member.reference_id}</td>
              <td className="py-2 px-4 border">
                <img
                  src={`https://backend.aggrabandhuss.org${donation.file}`}
                  alt="Donation"
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 border">{donation.Member?.name}</td>
              <td className="py-2 px-4 border">₹{donation.total_donation_received}</td>
              <td className="py-2 px-4 border">
                {new Date(donation.death_date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border">
                {donation.Member?.district}, {donation.Member?.state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
      page={page} 
      totalPages={totalPages} 
        fetchMembers={fetchDonations} 
       />
      {/* <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        handleItemPerChange={handleItemPerChange}
        membersLength={filteredDonations.length}
      /> */}
    </div>
  );
};

export default Donation_Receiever_List;


































// import React, { useEffect, useState } from 'react';

// const Donation_Receiever_List = () => {
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     // Fetching data from the API
//     fetch('https://backend.aggrabandhuss.org/api/donationreceive')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setDonations(data.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching donations data:', error);
//       });
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white text-center" >Donations Receiver</h2>
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border  bg-blue-500 text-white">Member ID</th>
//             <th className="py-2 px-4 border bg-blue-500 text-white">Photo</th>
//             <th className="py-2 px-4 border  bg-blue-500 text-white">Name</th>
//             <th className="py-2 px-4 border  bg-blue-500 text-white">Amount</th>
//             <th className="py-2 px-4 border  bg-blue-500 text-white">Death Date</th>
//             <th className="py-2 px-4 border  bg-blue-500 text-white">Address</th>
//           </tr>
//         </thead>
//         <tbody>
//           {donations.map((donation) => (
//             <tr key={donation.id} className="text-center">
//                 <td className="py-2 px-4 border">{donation.member_id}</td>
//               <td className="py-2 px-4 border">
//                 <img
//                   src={`https://backend.aggrabandhuss.org${donation.file}`}
//                   alt="Transaction"
//                   className="w-16 h-16 object-cover mx-auto"
//                 />
//               </td>
//               <td className="py-2 px-4 border">{donation.Member.name}</td>
//               <td className="py-2 px-4 border">₹{donation.total_donation_received}</td>
//               <td className="py-2 px-4 border">
//                 {new Date(donation.death_date).toLocaleDateString()}
//               </td>
//               <td className="py-2 px-4 border">
//                 {donation.Member.district}, {donation.Member.state}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Donation_Receiever_List;
