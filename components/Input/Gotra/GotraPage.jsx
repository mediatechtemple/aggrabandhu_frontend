'use client';
import { useState, useEffect } from 'react';
import GotraForm from './GotraForm';
import GotraTable from './GotraTable';
import { TextField, Paper, Stack, Box, Button, Dialog } from '@mui/material';

const GotraPage = () => {
  // Initialize gotras from local storage
  const [gotras, setGotras] = useState([]);

  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);


  const HeaderData=['Gotra'];
  // Load gotras from local storage when the component mounts
  useEffect(() => {
    const storedGotras = JSON.parse(localStorage.getItem('inputs')) || [];
    setGotras(storedGotras);
  }, []);



  const handleAddGotra = (gotra) => {
    let updatedGotras;

    if (editIndex !== null) {
      // Update the existing gotra at the editIndex
      updatedGotras = [...gotras];
      updatedGotras[editIndex] = gotra;
    } else {
      // Add new gotra
      updatedGotras = [...gotras, gotra];
    }

    // Update local storage and state
    localStorage.setItem('inputs', JSON.stringify(updatedGotras));
    setGotras(updatedGotras);

    // Reset editIndex and close the form
    setEditIndex(null);
    setIsFormOpen(false);
  };


  const handleEditGotra = (index) => {
    setEditIndex(index);
    setIsFormOpen(true);
  };


  const handleDeleteGotra = (index) => {
    const updatedGotras = gotras.filter((_, i) => i !== index);

    // Update local storage and state
    localStorage.setItem('inputs', JSON.stringify(updatedGotras));
    setGotras(updatedGotras);
  };

  const filteredGotras = gotras.filter((gotra) =>
    gotra.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Stack spacing={2} padding={2}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormOpen(true)}
        >
          Add Gotra
        </Button>
      </Box>


      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <Paper elevation={3} padding={2}>
          <GotraForm
            onSubmit={handleAddGotra}
            initialValue={editIndex !== null ? gotras[editIndex] : ''}
            formTitle={editIndex !== null ? 'Edit Gotra' : 'Add Gotra'}
            label={'Gotra'}
          />
          
        </Paper>
      </Dialog>


      <TextField
        label="Search Gotra"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />
      <GotraTable
      HeaderData={HeaderData}
        gotras={filteredGotras}
        onEdit={handleEditGotra}
        onDelete={handleDeleteGotra}

      />

    </Stack>
  );
};

export default GotraPage;
