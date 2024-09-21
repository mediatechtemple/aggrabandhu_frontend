import React from 'react'

const page = () => {
  return (
    <div>
      <h1>here we to do this stuff</h1>
    </div>
  )
}

export default page




// 'use client'
// import React, { useEffect, useState } from 'react';
// import { FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa'; // Import icons

// let data = [
//     {
//       memberId: 1,
//       donationId: 101,
//       donaterName: 'John Doe',
//       receiverName: 'Charity A',
//       deathDate: '2023-09-01',
//       donationDuration: '1 year',
//       minimumAmount: 100,
//       actualAmount: 150,
//       transactionId: 'TXN123456',
//       uploadedFile: 'receipt.pdf',
//       Action: 'View'
//     },
//     {
//       memberId: 2,
//       donationId: 102,
//       donaterName: 'Jane Smith',
//       receiverName: 'Charity B',
//       deathDate: '2023-08-15',
//       donationDuration: '6 months',
//       minimumAmount: 200,
//       actualAmount: 250,
//       transactionId: 'TXN654321',
//       uploadedFile: 'proof.jpg',
//       Action: 'Edit'
//     }
//     // Add more objects as needed
//   ];
// const page = () => {
//     const [sortConfig,setSortConfig]=useState(null);

//     //here we will write the same logic here if we see here to be honest;


//     const getSortIcon=(key)=>{
//         if(sortConfig && sortConfig.key===key && sortConfig.direction==='asc'){
//             return '↑';
//         }
//         if(sortConfig && sortConfig.key===key && sortConfig.direction==='dec'){
//             return '↓';
//         }
//        return '↑↓';
//     }

//     const handleSort=(key)=>{
//         if(!sortConfig){
//             setSortConfig({key:key,direction:'asc'});
//         }
//         if(sortConfig && sortConfig.key===key){
//             setSortConfig({key:key,direction:sortConfig.direction==='asc'?'dec':'asc'});
//         }
//         if(sortConfig && sortConfig.key!==key){
//             setSortConfig({key:key,direction:'asc'});
//         }
//     }

//     let sortedData=data;
//     if(sortConfig && sortConfig.direction=='asc'){
//         sortedData.sort((a,b)=>a[sortConfig.key]>b[sortConfig.key]?-1:1);
//     }
//     if(sortConfig && sortConfig.direction=='dec'){
//         sortedData.sort((a,b)=>a[sortConfig.key]>b[sortConfig.key]?1:-1);
//     }



//     useEffect(()=>{
//         console.log(sortConfig);
//     },[sortConfig])

//   return (
//     <>
//     <div className='overflow-x-auto'>
//   <table className='border-collapse'>
//     <thead>
//       <tr>
//         {[
//           { key: 'memberId', value: 'Member Id' },
//           { key: 'donationId', value: 'Donation Id' },
//           { key: 'donaterName', value: 'Donater Name' },
//           { key: 'receiverName', value: 'Receiver Name' },
//           { key: 'deathDate', value: 'Death Date' },
//           { key: 'donationDuration', value: 'Donation Duration' },
//           { key: 'minimumAmount', value: 'Minimum Amount' },
//           { key: 'actualAmount', value: 'Actual Amount' },
//           { key: 'transactionId', value: 'Transaction Id' },
//           { key: 'uploadedFile', value: 'Uploaded File',sortable:true },
//           { key: 'action', value: 'Action' }
//         ].map(({key, value,sortable}) => (
//           <th 
//             key={key}
//             className='py-2 border bg-customBlue text-white min-w-[200px]' // Set min width here
//             onClick={() => handleSort(key)}>
//             {value} {getSortIcon(key)}
//           </th>
//         ))}
//       </tr>
//     </thead>
//     <tbody>
//       {sortedData.map((item, index) => (
//         <tr key={item.memberId}>
//           <td className='p-2 border text-center'>{item.memberId}</td>
//           <td className='p-2 border text-center'>{item.donationId}</td>
//           <td className='p-2 border text-center'>{item.donaterName}</td>
//           <td className='p-2 border text-center'>{item.receiverName}</td>
//           <td className='p-2 border text-center whitespace-nowrap'>{item.deathDate}</td>
//           <td className='p-2 border text-center'>{item.donationDuration}</td>
//           <td className='p-2 border text-center'>{item.minimumAmount}</td>
//           <td className='p-2 border text-center'>{item.actualAmount}</td>
//           <td className='p-2 border text-center'>{item.transactionId}</td>
//           <td className='p-2 border text-center'>{item.uploadedFile}</td>
//           <td className='p-2 border text-center whitespace-nowrap'>
//             {/* Action buttons */}
//             <button className="bg-customBlue mx-1 text-white font-bold py-2 px-4 rounded inline-flex items-center">
//               <FaCheck className="mr-2" /> {/* Approve icon */}
//             </button>
//             <button className="bg-customBlue text-white font-bold py-2 px-4 rounded inline-flex items-center">
//               <FaTimes className="mr-2" /> {/* Disapprove icon */}
//             </button>
//             <button className="bg-customBlue mx-1 text-white font-bold py-2 px-4 rounded inline-flex items-center">
//               <FaExclamationTriangle className="mr-2" /> {/* Dispute icon */}
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
  
// </div>


// </>
//   )
// }

// export default page
