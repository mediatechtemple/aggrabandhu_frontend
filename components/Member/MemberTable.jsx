'use client';
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Checkbox,
} from '@mui/material';
import { styled } from '@mui/system';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DonationModal from '../Icons/DonationModal';
import MembershipModal1 from './MembershipModal1';
import Image from 'next/image';
import PrintIcon from '@mui/icons-material/Print';

const TableContainer = styled('div')({
  overflowX: 'auto', // Enable horizontal scrolling
  width: '100%',
});

const StyledTable = styled(Table)({
  border: '1px solid #ddd',
  minWidth: 1200, // Increase minWidth to allow horizontal scrolling
});
// here one ehre
const StyledTableCell = styled(TableCell)({
  border: '1px solid #ddd',
  padding: '8px',
  minWidth: 150, // Ensure each cell has enough width
  justifyContent:'center',
  textAlign:'center'
});

const StyledHeaderRow = styled(TableRow)({
  background: '#1976d2',
});

const StyledHeaderCell = styled('div')({
  cursor: 'pointer',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent:'center'
});

const MemberTable = ({ members, removeMember, handleEditClick, id,setMembers }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [modalData, setModalData] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const sortedMembers = useMemo(() => {
    const sortableMembers = [...members];

    if (sortConfig.key) {
      sortableMembers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableMembers;
  }, [members, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
    }
    return <FaSort />;
  };

  const openModal = (row) => {
    setModalData(row.timesDonationMade);
    setSelectedMember(row);
  };

  const closeModal = () => {
    setModalData(null);
  };


  const handlePrint = (member) => {
    const ImgUrl = `https://agerbandhu-production.up.railway.app${member.profileUrl ? member.profileUrl : ''}`;
    const IdUrl = `https://agerbandhu-production.up.railway.app${member.id_file ? member.id_file : ''}`;
    const aadharUrl = `https://agerbandhu-production.up.railway.app${member.aadharUrl ? member.aadharUrl : ''}`;
    const diseaseUrl = member.diseaseFile ? `https://agerbandhu-production.up.railway.app${member.diseaseFile}` : '';

    console.log(ImgUrl);
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Member Details</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            img {
              border-radius: 10%;
              display: block;
              margin: 10px auto;
            }
            .details {
              width: 70%; /* Adjust width as needed */
            }
            .image {
              width: 30%; /* Adjust width as needed */
              text-align: center; /* Center the image */
            }
            .flex-container {
              display: flex; /* Use flexbox to align items horizontally */
              justify-content: center; /* Center the items */
              gap: 10px; /* Space between images */
            }
          </style>
        </head>
        <body>
          <h1>Member Details</h1>
          <table>
            <tr>
              <td class="details">
                <table style="width: 100%;">
                  <tr>
                    <th>MemberId</th><td>${member.id}</td>
                  </tr>
                  <tr>
                    <th>RefrenceId</th><td>${member.reference_id}</td>
                  </tr>
                  <tr>
                    <th>Date of joining</th><td>${new Date(member.createdAt).toLocaleDateString()}</td>
                  </tr>
                </table>
              </td>
              <td class="image">
                <img
                  src="${ImgUrl}"
                  alt="Profile"
                  width="100"
                  height="100"
                />
              </td>
            </tr>
            <tr><th>Name</th><td colspan="5">${member.name}</td></tr>
            <tr><th>Father's Name</th><td colspan="5">${member.father_name}</td></tr>
            <tr><th>Mother's Name</th><td colspan="5">${member.mother_name}</td></tr>
            <tr><th>Date of Birth</th><td colspan="5">${new Date(member.dob).toLocaleDateString()}</td></tr>
            <tr><th>Profession</th><td colspan="5">${member.profession}</td></tr>
            <tr><th>Address</th><td colspan="5">${member.address}</td></tr>
            <tr><th>District</th><td colspan="5">${member.district}</td></tr>
            <tr><th>State</th><td colspan="5">${member.state}</td></tr>
            <tr><th>Mobile No</th><td colspan="5">${member.mobile_no}</td></tr>
            <tr><th>Email</th><td colspan="5">${member.email}</td></tr>
            <tr><th>Aadhar No</th><td colspan="5">${member.aadhar_no}</td></tr>
            <tr><th>Pan Card No</th><td colspan="5">${member.id_no}</td></tr>
            <tr><th>Marital Status</th><td colspan="5">${member.marital_status}</td></tr>
            <tr><th>Disease</th><td colspan="5">${member.disease ? 'Yes' : 'No'}</td></tr>
            <tr><th>Pincode</th><td colspan="5">${member.pincode}</td></tr>
            <tr><th>Status</th><td colspan="5">${member.status}</td></tr>
            <tr><th>Nominee</th><td colspan="5">${member.nominees[0]?.nominee || 'N/A'}</td></tr>
            <tr><th>Relationship</th><td colspan="5">${member.nominees[0]?.relationship || 'N/A'}</td></tr>
            <tr><th>Nominee2</th><td colspan="5">${member.nominees[0]?.nominee2 || 'N/A'}</td></tr>
            <tr><th>Relationship2</th><td colspan="5">${member.nominees[0]?.relationship2 || 'N/A'}</td></tr>
            </table>
            <div class="flex-container">
              <img
                src="${IdUrl}"
                alt="ID"
                width="100%"
                height="150"
              />
              <img
                src="${aadharUrl}"
                alt="Aadhar"
                width="100%"
                height="150"
              />
              ${diseaseUrl ? `<img src="${diseaseUrl}" alt="Disease" width="100%" height="150" />` : ''}
            </div>
        </body>
      </html>
    `);

    printWindow.document.close(); // Close the document stream
    printWindow.focus(); // Ensure the print window is focused
    setTimeout(() => {
      printWindow.print(); // Trigger the print
    }, 2000);
};


  
          

















  const handleStatusChange = async (e, member) => {
        alert(member.id); // To show the current member's ID
      
        // Create a new array with the updated status for the specific member
        const updatedMembers = members.map(item => {
          if (item.id === member.id) {
            // Toggle the status between 'Active' and 'Inactive'
            return { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' };
          }
          return item;
        });
      
        // Update the members state with the new array
        setMembers(updatedMembers);
      
        // Prepare the updated status for API call
        const updatedStatus = updatedMembers.find(item => item.id === member.id).status;
      
        // Make the API call to update the status on the server
        try {
          const response = await fetch(`https://agerbandhu-production.up.railway.app/api/member/${member.id}`, {
            method: 'PUT', // Assuming it's a PUT request to update data
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: updatedStatus }), // Sending the updated status in the body
          });
      
          if (!response.ok) {
            throw new Error('Failed to update status on the server');
          }
      
          // Optionally, you can handle the response here if needed
          const data = await response.json();
          console.log('Status updated on the server:', data);
        } catch (error) {
          console.error('Error updating status:', error);
          // Optionally, revert the state change if the API call fails
        }
      };
      
      

  const columns = [
    { key: 'reference_id', label: 'Reference_id', sortable: false },
    { key: 'id', label: 'Member_id', sortable: false },
    { key: 'createdAt', label: 'Joining Date' },
    { key: 'profileUrl', label: 'Photo', sortable: false },
    { key: 'name', label: 'Name' },
    { key: 'district', label: 'District' },
    { key: 'state', label: 'State' },
    { key: 'pincode', label: 'No of Times Donation Made' },
    { key: 'mobile_no', label: 'Total Amount Donated' },
    { key: 'status', label: 'Status' },
  ];

  return (
    <TableContainer>
      <StyledTable id={id}>
        <TableHead>
          <StyledHeaderRow>
            {columns.map(({ key, label, sortable = true }) => (
              <StyledTableCell key={key} onClick={sortable ? () => handleSort(key) : null}>
                <StyledHeaderCell>
                  {label} {sortable && getSortIcon(key)}
                </StyledHeaderCell>
              </StyledTableCell>
            ))}
            <StyledTableCell style={{ color: 'white', minWidth: 200 }}>Actions</StyledTableCell>
          </StyledHeaderRow>
        </TableHead>
        <TableBody>
  {sortedMembers.map((member) => (
    <TableRow key={member.id}>
      {columns.map(({ key }) => (
        <StyledTableCell key={key}>
          {key === 'pincode' || key === 'mobile_no' ? (
            <span
              style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold' }}
              onClick={() => openModal(member)}
            >
              {member[key]?.length || member[key]}
            </span>
          ) : key === 'profileUrl' ? (
            <Image
              src={`https://agerbandhu-production.up.railway.app${member.profileUrl ? member.profileUrl : ''}`}
              alt="Profile"
              width={50}
              height={50}
              style={{ borderRadius: '10%', margin: 'auto' }}
            />
          ) : key === 'status' ? (
            <Checkbox
              checked={member[key]==='Active'?true:false}
              onChange={(e) => handleStatusChange(e, member)}
              inputProps={{ 'aria-label': 'status checkbox' }}
            />
          ) : (
            member[key]
          )}
        </StyledTableCell>
      ))}
      <StyledTableCell>
        <Tooltip title="Edit">
          <IconButton onClick={() => handleEditClick(member)} aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton onClick={() => removeMember(member.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Print">
          <IconButton onClick={() => handlePrint(member)} aria-label="print">
            <PrintIcon />
          </IconButton>
        </Tooltip>
      </StyledTableCell>
    </TableRow>
  ))}
</TableBody>

      </StyledTable>

      {modalData && (
        <DonationModal modalData={modalData} closeModal={closeModal} selectedRow={selectedMember} />
      )}
    </TableContainer>
  );
};

export default MemberTable;






















































































// 'use client'
// import React, { useState, useMemo } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import { styled } from '@mui/system';
// import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import DonationModal from '../Icons/DonationModal';
// import MembershipModal1 from './MembershipModal1';
// import Image from 'next/image';
// import PrintIcon from '@mui/icons-material/Print';

// const TableContainer = styled('div')({
//   overflowX: 'auto',  // Enable horizontal scrolling
//   width: '100%',
// });

// const StyledTable = styled(Table)({
//   border: '1px solid #ddd',
//   minWidth: 900, // Set a minimum width to ensure horizontal scrolling
// });

// const StyledTableCell = styled(TableCell)({
//   border: '1px solid #ddd',
//   padding: '8px',
// });

// const StyledHeaderRow = styled(TableRow)({
//   background: '#1976d2',
// });

// const StyledHeaderCell = styled('div')({
//   cursor: 'pointer',
//   color: 'white',
//   display: 'flex',
//   alignItems: 'center',
// });


// const MemberTable = ({ members, removeMember, handleEditClick, id, open, handleClose, handleOpen }) => {

  

//   const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedMember, setSelectedMember] = useState(null);
//   const [modalData, setModalData] = useState(null);

//   const sortedMembers = useMemo(() => {
//     const sortableMembers = [...members];

//     if (sortConfig.key) {
//       sortableMembers.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
//         if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return sortableMembers;
//   }, [members, sortConfig]);

//   const handleSort = (key) => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
//     }));
//   };

//   const handleEdit = (member) => {
//     setSelectedMember(member);
//     setEditModalOpen(true);
//   };

//   const handleDelete = (memberId) => {
//     removeMember(memberId);
//   };

//   const handleCloseEditModal = () => {
//     setEditModalOpen(false);
//     setSelectedMember(null);
//   };

//   const openModal = (row) => {
//     setModalData(row.timesDonationMade);
//     setSelectedMember(row);
//   };

//   const closeModal = () => {
//     setModalData(null);
//   };



//   const getSortIcon = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === 'asc' ? <FaSortUp/> : <FaSortDown/>;
//     }
//     return <FaSort />;
//   };


//   const handlePrint = (member) => {
//     const printWindow = window.open('', '', 'width=800,height=600');
//     printWindow.document.write(`
//       <html>
//         <head>
//           <title>Print Member Details</title>
//           <style>
//             table {
//               width: 100%;
//               border-collapse: collapse;
//             }
//             th, td {
//               border: 1px solid black;
//               padding: 8px;
//               text-align: left;
//             }
//             th {
//               background-color: #f2f2f2;
//             }
//           </style>
//         </head>
//         <body>
//           <h1>Member Details</h1>
//           <table>
//             <tr><th>Name</th><td>${member.name}</td></tr>
//             <tr><th>Father's Name</th><td>${member.father_name}</td></tr>
//             <tr><th>Mother's Name</th><td>${member.mother_name}</td></tr>
//             <tr><th>Date of Birth</th><td>${new Date(member.dob).toLocaleDateString()}</td></tr>
//             <tr><th>Profession</th><td>${member.profession}</td></tr>
//             <tr><th>Address</th><td>${member.address}</td></tr>
//             <tr><th>District</th><td>${member.district}</td></tr>
//             <tr><th>State</th><td>${member.state}</td></tr>
//             <tr><th>Mobile No</th><td>${member.mobile_no}</td></tr>
//             <tr><th>Email</th><td>${member.email}</td></tr>
//             <tr><th>Aadhar No</th><td>${member.aadhar_no}</td></tr>
//             <tr><th>Pan Card No</th><td>${member.id_no}</td></tr>
//             <tr><th>Marital Status</th><td>${member.marital_status}</td></tr>
//             <tr><th>Disease</th><td>${member.disease ? 'Yes' : 'No'}</td></tr>
//             <tr><th>Pincode</th><td>${member.pincode}</td></tr>
//             <tr><th>Status</th><td>${member.status}</td></tr>

//             <tr><th>Nominee</th><td>${member.nominees[0].nominee}</td></tr>
//             <tr><th>Relationship</th><td>${member.nominees[0].relationship}</td></tr>
//             <tr><th>Nominee2</th><td>${member.nominees[0].nominee2}</td></tr>
//             <tr><th>Relationship2</th><td>${member.nominees[0].relationship2}</td></tr>
            
//           </table>
//         </body>
//       </html>
//     `);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//   };

//   const columns = [
//     { key: 'reference_id', label: 'Reference_id', sortable: false },
//     { key: 'id', label: 'Member_id', sortable: false },
//     { key: 'createdAt', label: 'Joining Date' },
//     { key: 'profileUrl', label: 'Photo', sortable: false },
//     { key: 'name', label: 'Name' },
//     { key: 'district', label: 'District' },
//     { key: 'state', label: 'State' },
//     { key: 'pincode', label: 'No of Times Donation Made' },
//     { key: 'mobile_no', label: 'Total Amount Donated' },
//     { key: 'status', label: 'Status' },
//   ];

//   return (
//     <>
//       <StyledTable id={id}>
//         <TableHead>
//           <StyledHeaderRow>
//             {columns.map(({ key, label, sortable = true }) => (
//               <StyledTableCell key={key} onClick={sortable ? () => handleSort(key) : null}>
//                 <StyledHeaderCell>
//                   {label} {sortable && getSortIcon(key)}
//                 </StyledHeaderCell>
//               </StyledTableCell>
//             ))}
//             <StyledTableCell style={{ color: 'white' }}>Actions</StyledTableCell>
//           </StyledHeaderRow>
//         </TableHead>
//         <TableBody>
//           {sortedMembers.map((member) => (

//             <TableRow key={member.id}>
//               {columns.map(({ key }) => (


//                 <StyledTableCell key={key}>
//                   {

//                   key === 'pincode' || key === 'mobile_no' ? (
//                     <span
//                       style={{ cursor: 'pointer', color: '#007bff', fontWeight: 'bold' }}
//                       onClick={() => openModal(member)}
//                     >
//                       {member[key]?.length || member[key]}
//                     </span>
//                   ) :key==='profileUrl'? (
//                     <Image
//                     // src={`https://agerbandhu-production.up.railway.app${member.profileUrl? member.profileUrl? member.profile}`}
//                     src={`https://agerbandhu-production.up.railway.app${member.profileUrl ? member.profileUrl : ''}`}

//                     alt="Profile"
//                     width={50}  // Set width
//                     height={50} // Set height
//                     style={{ borderRadius: '10%' }} // Circular image
//                   />
//                   ):(
//                     member[key]
//                   )

//                   }
//                 </StyledTableCell>



//               ))}


//               <StyledTableCell>
//                 <Tooltip title="Edit">
//                   <IconButton onClick={() => handleEditClick(member)} aria-label="edit">
//                     <EditIcon />
//                   </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Delete">
//                   <IconButton onClick={() => handleDelete(member.id)} aria-label="delete">
//                     <DeleteIcon />
//                   </IconButton>
//                 </Tooltip>
//                 <Tooltip title="Print">
//                   <IconButton onClick={() => handlePrint(member)} aria-label="delete">
//                     <PrintIcon/>
//                   </IconButton>
//                 </Tooltip>
//               </StyledTableCell>


//             </TableRow>
//           ))}
//         </TableBody>
//       </StyledTable>

//       {modalData && (
//         <DonationModal
//           modalData={modalData}
//           closeModal={closeModal}
//           selectedRow={selectedMember}
//         />
//       )}
//     </>
//   );
// };

// export default MemberTable;
