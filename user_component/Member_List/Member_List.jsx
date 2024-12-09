'use client'
import useSortableData from '@/hooks/TablesortingHook';
import React, { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';

const Member_List = () => {
  const [memberList, setMemberList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { sortedItems, requestSort, getSortIcon } = useSortableData(memberList);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage,setitemsPerPage] = useState(100);

 

  useEffect(() => {
    fetch('https://backend.aggrabandhuss.org/api/member')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMemberList(data.data);
      })
      .catch((error) => {
        console.error('Error fetching memberList data:', error);
      });
  }, []);

  
const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const handleItemPerChange = (pageNumber) => {
  setCurrentPage(1)
  setitemsPerPage(pageNumber);
};


  const filteredData = sortedItems.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Column configuration for mapping headers
  const columns = [
    { key: 'reference_id', label: 'Member ID' },
    { key: 'profileUrl', label: 'Photo', sortable: false },
    { key: 'name', label: 'Name' },
    { key: 'profession', label: 'Profession' },
    { key: 'address', label: 'Address' },
    { key: 'createdAt', label: 'Joining Date' },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white text-center">Member List</h2>

      <div className="flex justify-end mb-4">
        <input
          placeholder="Search Member"
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
          {currentItems.map((member) => (
            <tr key={member.id} className="text-center">
              <td className="py-2 px-4 border">{member.id}</td>
              <td className="py-2 px-4 border">
                <img
                  src={`https://backend.aggrabandhuss.org${member.profileUrl}`}
                  alt="Member"
                  className="w-16 h-16 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 border">{member.name}</td>
              <td className="py-2 px-4 border">{member.profession}</td>
              <td className="py-2 px-4 border">{member.address}</td>
              <td className="py-2 px-4 border">{new Date(member.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        handleItemPerChange={handleItemPerChange}
        membersLength={sortedItems.length}
      />
    </div>
  );
};

export default Member_List;


















































// import useSortableData from '@/hooks/TablesortingHook';
// import React, { useEffect, useState } from 'react';

// const Member_List = () => {
//   const [memberList, setmemberList] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('')

//   const { sortedItems, requestSort, getSortIcon, sortConfig  } = useSortableData(memberList);

//   useEffect(() => {
//     // Fetching data from the API
//     fetch('https://backend.aggrabandhuss.org/api/member')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setmemberList(data.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching memberList data:', error);
//       });
//   }, []);


//   const filterData=memberList.filter(item=>{
//     return Object.values(item).some(value=>{
//       return typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
//     })
//   })

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4 bg-blue-500 text-white text-center" >Member List</h2>
//       <div className="flex justify-end">
//       <input
//        placeholder="Search Member" 
//        className="p-2 border border-black " 
//        value={searchQuery}
//        onChange={(e)=>setSearchQuery(e.target.value)}
//        />
//       </div>
//       <table className="min-w-full bg-white border border-gray-300">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border  bg-blue-500 text-white">Member ID </th>
//             <th className="py-2 px-4 border bg-blue-500 text-white">Photo</th>
//             <th className="py-2 px-4 border  bg-blue-500 text-white">Name</th>
//             <th className="py-2 px-4 border  bg-blue-500 text-white">Profession</th>
//             <th className="py-2 px-4 border  bg-blue-500 text-white">Address</th>
//             <th className="py-2 px-4 border  bg-blue-500 text-white">Joining Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filterData.map((donation) => (
//             <tr key={donation.id} className="text-center">
//                 <td className="py-2 px-4 border">{donation.reference_id}</td>
//               <td className="py-2 px-4 border">
//                 <img
//                   src={`https://backend.aggrabandhuss.org${donation.profileUrl}`}
//                   alt="Transaction"
//                   className="w-16 h-16 object-cover mx-auto"
//                 />
//               </td>
//               <td className="py-2 px-4 border">{donation.name}</td>
//               <td className="py-2 px-4 border">₹{donation.profession}</td>
//               <td className="py-2 px-4 border">
//                 {donation.address}
//               </td>
//               <td className="py-2 px-4 border">
//                 {new Date(donation.createdAt).toLocaleDateString()}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Member_List;
