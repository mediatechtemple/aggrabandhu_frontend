'use client';
import React, { useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Button, TableFooter } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  table: {
    border: '1px solid #ddd',
    minWidth: '600px',
    width: '100%',
    overflowX: 'auto',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
    color: '#007bff',
    fontWeight: 'bold',
  },
  headerRow: {
    background: '#1976d2',
  },
  headerCell: {
    cursor: 'pointer',
    color: 'white',
    border: '1px solid #ddd',
    textAlign: 'center',
    paddingTop: '0px',
    paddingBottom: '0px',
  },
  TCell: {
    cursor: 'pointer',
    color: 'black',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
});

const DonationTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([
    {
      transaction_id: '',
      file: null,
      amount: '',
      payment_method: '',
      member_id: '',
      donation_id: ''
    }
  ]);

  // State to hold the rows data
  const [rows, setRows] = useState([
    {
      id: 1,
      member_id: 7,
      donation_id: 1,
      name: "John Doe",
      district: "District",
      state: "State",
      payment_method: "UPI",
    },
    {
      id: 2,
      member_id: 7,
      donation_id: 1,
      name: "Jane Doe",
      district: "District",
      state: "State",
      payment_method: "UPI",
    },
    // Add more rows as needed
  ]);

  // Update row data
  const updateRowData = (index, field, value) => {
    // const updatedRows = [...rows];
    // updatedRows[index][field] = value;
    // setRows(updatedRows);

    // Update data state
    const updatedData = [...data];
    updatedData[index][field] = value;
    
    setData(updatedData);
  };

  const handleFileChange = (index, event) => {
    const updatedRows = [...rows];
    updatedRows[index].file = URL.createObjectURL(event.target.files[0]);
    setRows(updatedRows);

    const updatedData = [...data];
    updatedData[index].file = event.target.files[0];
    setData(updatedData);
  };

  const handleTransactionIdChange = (index, event) => {
    updateRowData(index, 'transaction_id', event.target.value);
  };

  const handleAmountChange = (index, event) => {
    updateRowData(index, 'amount', event.target.value);
  };

  const handleSubmit = (index) => {
    console.log('Submitted data:', data[index]);

    // Optionally remove the row after submission
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    setData(updatedRows);
  };

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow className={classes.headerRow}>
          <TableCell className={classes.headerCell}>ID</TableCell>
          <TableCell className={classes.headerCell}>Member ID</TableCell>
          <TableCell className={classes.headerCell}>Donation ID</TableCell>
          <TableCell className={classes.headerCell}>Name</TableCell>
          <TableCell className={classes.headerCell}>District</TableCell>
          <TableCell className={classes.headerCell}>State</TableCell>
          <TableCell className={classes.headerCell}>Amount</TableCell>
          <TableCell className={classes.headerCell}>Transaction ID</TableCell>
          <TableCell className={classes.headerCell}>File</TableCell>
          <TableCell className={classes.headerCell}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={row.id}>
            <TableCell className={classes.TCell}>{row.id}</TableCell>
            <TableCell className={classes.TCell}>{row.member_id}</TableCell>
            <TableCell className={classes.TCell}>{row.donation_id}</TableCell>
            <TableCell className={classes.TCell}>{row.name}</TableCell>
            <TableCell className={classes.TCell}>{row.district}</TableCell>
            <TableCell className={classes.TCell}>{row.state}</TableCell>
            <TableCell className={classes.TCell}>
              <TextField
                value={row.amount}
                onChange={(e) => handleAmountChange(index, e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </TableCell>
            <TableCell className={classes.TCell}>
              <TextField
                value={row.transaction_id}
                onChange={(e) => handleTransactionIdChange(index, e)}
                variant="outlined"
                size="small"
                fullWidth
              />
            </TableCell>
            <TableCell className={classes.TCell}>
              <Button
                variant="outlined"
                component="label"
              >
                Upload
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => handleFileChange(index, e)}
                />
              </Button>
            </TableCell>
            <TableCell className={classes.TCell}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSubmit(index)}
              >
                Submit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DonationTable;









































































































// 'use client';
// import React, { useState } from 'react';
// import { Table, TableHead, TableBody, TableRow, TableCell, TextField, Button, TableFooter } from '@mui/material';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles({
//   table: {
//     border: '1px solid #ddd',
//     minWidth: '600px',
//     width: '100%',
//     overflowX: 'auto',
//   },
//   tableCell: {
//     border: '1px solid #ddd',
//     padding: '8px',
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   headerRow: {
//     background: '#1976d2',
//   },
//   headerCell: {
//     cursor: 'pointer',
//     color: 'white',
//     border: '1px solid #ddd',
//     textAlign: 'center',
//     paddingTop: '0px',
//     paddingBottom: '0px',
//   },
//   TCell: {
//     cursor: 'pointer',
//     color: 'black',
//     border: '1px solid #ddd',
//     textAlign: 'center',
//   },
// });

// const DonationTable = () => {
//   const classes = useStyles();
//   const [data, setData] = useState([
//     {
//       transaction_id: '',
//       file: null,
//       amount: '',
//       payment_method: '',
//       member_id: '',
//       donation_id: ''
//     }
//   ]);

//   // State to hold the rows data
//   const [rows, setRows] = useState([
//     {
//       id: 1,
//       member_id: 7,
//       donation_id: 1,
//       name: "John Doe",
//       district: "District",
//       state: "State",
//       payment_method: "UPI",
//     },
//     {
//       id: 2,
//       member_id: 7,
//       donation_id: 1,
//       name: "Jane Doe",
//       district: "District",
//       state: "State",
//       payment_method: "UPI",
//     },
//     // Add more rows as needed
//   ]);

//   // Update row data
//   const updateRowData = (index, field, value) => {
//     // const updatedRows = [...rows];
//     // updatedRows[index][field] = value;
//     // setRows(updatedRows);

//     // Update data state
//     const updatedData = [...data];
//     updatedData[index][field] = value;
    
//     setData(updatedData);
//   };

//   const handleFileChange = (index, event) => {
//     const updatedRows = [...rows];
//     updatedRows[index].file = URL.createObjectURL(event.target.files[0]);
//     setRows(updatedRows);

//     const updatedData = [...data];
//     updatedData[index].file = event.target.files[0];
//     setData(updatedData);
//   };

//   const handleTransactionIdChange = (index, event) => {
//     updateRowData(index, 'transaction_id', event.target.value);
//   };

//   const handleAmountChange = (index, event) => {
//     updateRowData(index, 'amount', event.target.value);
//   };

//   const handleSubmit = (index) => {
//     console.log('Submitted data:', data[index]);

//     // Optionally remove the row after submission
//     const updatedRows = rows.filter((_, i) => i !== index);
//     setRows(updatedRows);
//     setData(updatedRows);
//   };

//   const handleSubmitTest = () => {
//     console.log('All data:', data);
//   };

//   return (
//     <Table className={classes.table}>
//       <TableHead>
//         <TableRow className={classes.headerRow}>
//           <TableCell className={classes.headerCell}>ID</TableCell>
//           <TableCell className={classes.headerCell}>Member ID</TableCell>
//           <TableCell className={classes.headerCell}>Donation ID</TableCell>
//           <TableCell className={classes.headerCell}>Name</TableCell>
//           <TableCell className={classes.headerCell}>District</TableCell>
//           <TableCell className={classes.headerCell}>State</TableCell>
//           <TableCell className={classes.headerCell}>Amount</TableCell>
//           <TableCell className={classes.headerCell}>Transaction ID</TableCell>
//           <TableCell className={classes.headerCell}>File</TableCell>
//           <TableCell className={classes.headerCell}>Actions</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {rows.map((row, index) => (
//           <TableRow key={row.id}>
//             <TableCell className={classes.TCell}>{row.id}</TableCell>
//             <TableCell className={classes.TCell}>{row.member_id}</TableCell>
//             <TableCell className={classes.TCell}>{row.donation_id}</TableCell>
//             <TableCell className={classes.TCell}>{row.name}</TableCell>
//             <TableCell className={classes.TCell}>{row.district}</TableCell>
//             <TableCell className={classes.TCell}>{row.state}</TableCell>
//             <TableCell className={classes.TCell}>
//               <TextField
//                 value={row.amount}
//                 onChange={(e) => handleAmountChange(index, e)}
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//               />
//             </TableCell>
//             <TableCell className={classes.TCell}>
//               <TextField
//                 value={row.transaction_id}
//                 onChange={(e) => handleTransactionIdChange(index, e)}
//                 variant="outlined"
//                 size="small"
//                 fullWidth
//               />
//             </TableCell>
//             <TableCell className={classes.TCell}>
//               <Button
//                 variant="outlined"
//                 component="label"
//               >
//                 Upload
//                 <input
//                   type="file"
//                   hidden
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(index, e)}
//                 />
//               </Button>
//             </TableCell>
//             <TableCell className={classes.TCell}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => handleSubmit(index)}
//               >
//                 Submit
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//       <TableFooter>
//         <TableRow>
//           <TableCell colSpan={10} style={{ textAlign: 'right' }}>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleSubmitTest}
//             >
//               Submit All
//             </Button>
//           </TableCell>
//         </TableRow>
//       </TableFooter>
//     </Table>
//   );
// };

// export default DonationTable;
