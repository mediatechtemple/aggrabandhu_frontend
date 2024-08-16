// PermissionsDialog.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Checkbox, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define styled components
const StyledTable = styled(Table)(({ theme }) => ({
  border: '1px solid #ddd',
  minWidth: 600,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #ddd',
  padding: '8px',
  textAlign: 'center',
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  cursor: 'pointer',
  color: 'white',
  textAlign: 'center',
  backgroundColor: '#1976d2',
  fontWeight: 'bold',
  padding: '8px',
}));



const HeaderRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: '#1976d2',
}));

const PermissionsDialog = ({ open, onClose, currentId}) => {

    // alert(currentId)
  const initialPermissions = {
    "User Management": { "view": false, "add": false, "edit": false, "delete": false },
    "Member Management": { "view": false, "add": false, "edit": false, "delete": false },
    "Donation Management": { "view": false, "add": false, "edit": false, "delete": false },
    "Rules & Reg. Management": { "view": false, "add": false, "edit": false, "delete": false },
    "Input Management": { "view": false, "add": false, "edit": false, "delete": false },
    "Notification Management": { "view": false, "add": false, "edit": false, "delete": false },
    "Websites Management": { "view": false, "add": false, "edit": false, "delete": false }
  };

  const [permissions, setPermissions] = useState(initialPermissions);

  const handleCheckboxChange = (event) => {
    const [category, permission] = event.target.name.split('-');
    setPermissions(prevPermissions => ({
      ...prevPermissions,
      [category]: {
        ...prevPermissions[category],
        [permission]: event.target.checked
      }
    }));
  };

  const handleSubmit = () => {
    console.log('Permissions submitted:', permissions);
    onClose(); // Close the dialog after submission
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: 'white', textAlign: 'center', backgroundColor: '#1976d2', fontWeight: 'bold', padding: '8px', marginBottom: '1px' }}>
        Permissions Table
      </DialogTitle>
      <DialogContent sx={{ padding: '0px' ,maxHeight:'500px'}}>
        <StyledTable>
          <TableHead>
            <HeaderRow>
              <StyledTableHeadCell>Names</StyledTableHeadCell>
              <StyledTableHeadCell>View</StyledTableHeadCell>
              <StyledTableHeadCell>Add</StyledTableHeadCell>
              <StyledTableHeadCell>Edit</StyledTableHeadCell>
              <StyledTableHeadCell>Delete</StyledTableHeadCell>
            </HeaderRow>
          </TableHead>
          <TableBody>
            {Object.keys(permissions).map(category => (
              <TableRow key={category}>
                <StyledTableCell>{category}</StyledTableCell>
                {['view', 'add', 'edit', 'delete'].map(permission => (
                  <TableCell key={permission} sx={{textAlign:'center'}}>
                    <Checkbox
                      name={`${category}-${permission}`}
                      checked={permissions[category][permission]}
                      onChange={handleCheckboxChange}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </StyledTable>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px' }}>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionsDialog;
