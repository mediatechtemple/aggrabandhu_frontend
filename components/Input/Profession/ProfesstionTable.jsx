import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ProfesstionTable = ({HeaderData, gotras, onEdit, onDelete ,memberRights}) => {


  return (
    <TableContainer component={Paper} sx={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Table>
        <TableHead>
        <TableRow>
          {HeaderData.map((item, index) => (
            <TableCell
              key={index}
              sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
            >
              {item}
            </TableCell>
          ))}
          <TableCell
            sx={{ fontWeight: 'bold', border: '2px solid #ddd', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}
          >
            Actions
          </TableCell>
      </TableRow>
        </TableHead>
        <TableBody>
          {gotras.map((item, index) => (
            <TableRow key={item.id} sx={{ border: '1px solid #eee' }}>
              <TableCell sx={{  border: '2px solid #ddd', textAlign: 'center' }}>{item.name}</TableCell>
              <TableCell sx={{  border: '2px solid #ddd', textAlign: 'center' }}>
                {
                memberRights['Profession Management']?.['edit'] &&      
                  <Button
                  onClick={() => onEdit(item.id)}
                  variant="outlined"
                  color="primary"
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>}

                {
                  memberRights['Profession Management']?.['delete'] &&      
                  <Button
                  onClick={() => onDelete(item.id)}
                  variant="outlined"
                  color="secondary"
                >
                  Delete
                </Button>}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProfesstionTable;
