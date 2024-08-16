import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const GotraTable = ({HeaderData, gotras, onEdit, onDelete }) => {

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
          {gotras.map((gotra, index) => (
            <TableRow key={index} sx={{ border: '1px solid #eee' }}>
              <TableCell sx={{  border: '2px solid #ddd', textAlign: 'center' }}>{gotra}</TableCell>
              <TableCell sx={{  border: '2px solid #ddd', textAlign: 'center' }}>
                <Button
                  onClick={() => onEdit(index)}
                  variant="outlined"
                  color="primary"
                  sx={{ marginRight: 1 }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(index)}
                  variant="outlined"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GotraTable;
