'use client';
import { useState, useEffect, lazy, Suspense } from 'react';
// Lazy load components

const GotraForm = lazy(() => import('./GotraForm'));
const GotraTable = lazy(() => import('./GotraTable'));
import { TextField, Paper, Stack, Box, Button, Dialog } from '@mui/material';

const GotraPage = () => {
  // Initialize gotras from local storage
  const [gotras, setGotras] = useState([]);
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);


  const HeaderData=['Gotra'];


  const [memberRights,setmemberRights]=useState([]);

  useEffect(()=>{
      setmemberRights(JSON.parse( localStorage.getItem('user')).rights)
      // console.log(memberRights);
      // console.log('Asoka rights');
  },[]);

  useEffect(() => {
    const fetchGotras = async () => {
      
      try {
        const response = await fetch('https://backend.aggrabandhuss.org/api/gotra');
        const data = await response.json();
        setGotras(data);
        
      } catch (error) {
        console.error('Error fetching gotras:', error);
      }
    };
  
    fetchGotras();
  }, []);




// here we will do same task brother
const handleAddGotra = async (gotra) => {
  try {
    let updatedGotras;
    
    if (editIndex !== null) {
      // If we are editing, make a PUT request to update the gotra
      const response = await fetch(`https://backend.aggrabandhuss.org/api/gotra/${editIndex}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: gotra }), // Updating the gotra with { name: gotra }
      });

      if (!response.ok) {
        throw new Error('Failed to update gotra');
      }

      const data = await response.json();
      console.log(data);
      // Update the gotra in the existing list (UI update immediately)
      updatedGotras = gotras.map(g => g.id === editIndex ? { id: editIndex, name: gotra } : g);
      // setIsFormOpen(false);

    } else {
      // If adding a new gotra, make a POST request
      const response = await fetch('https://backend.aggrabandhuss.org/api/gotra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: gotra }), // Adding { name: gotra }
      });

      if (!response.ok) {
        throw new Error('Failed to add gotra');
      }

      const data = await response.json();
      console.log(data);

      // Add the new gotra to the existing list
      updatedGotras = [...gotras, { id: data.id, name: data.name }];
      // setIsFormOpen(false);
    }

    // Update the state with the new/updated list
    setGotras(updatedGotras);

    // Reset editIndex and close the form
    setEditIndex(null);
    // setIsFormOpen(false);

  } catch (error) {
    console.error('Error adding/updating gotra:', error);
  }
};











  const handleEditGotra = (index) => {
    // console.log(index);
    setEditIndex(index);
    setIsFormOpen(true);
  };



  const handleDeleteGotra = async (id) => {
    console.log(id);
    try {
      // Make an API request to delete the gotra by its id
      const response = await fetch(`https://backend.aggrabandhuss.org/api/gotra/${id}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete gotra');
      }
  
      // Update the gotras list by filtering out the deleted gotra
      const updatedGotras = gotras.filter(gotra => gotra.id !== id);
  
      // Update the state with the new list
      setGotras(updatedGotras);
    } catch (error) {
      console.error('Error deleting gotra:', error);
    }
  };
  



  const filteredGotras = gotras.filter(({name}) =>
    name.toLowerCase().includes(search.toLowerCase())
  );




  return (
    <Stack spacing={2} padding={2}>

      {
        memberRights['Gotra Management']?.['add'] &&
        <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormOpen(true)}
        >
          Add Gotra
        </Button>
      </Box>}


      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <Paper elevation={3} padding={2}>
        <Suspense fallback={<div>Loading form...</div>}>
          <GotraForm
              onSubmit={handleAddGotra}
              initialValue={editIndex !== null ? gotras.find(gotra => gotra.id === editIndex).name  : ''}
              formTitle={editIndex !== null ? 'Edit Gotra' : 'Add Gotra'}
              label={'Gotra'}
              setIsFormOpen={setIsFormOpen}
            />
        </Suspense>
          
          
        </Paper>
      </Dialog>


      <TextField
        label="Search Gotra"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth 
      />

      <Suspense fallback={<div>Loading table...</div>}>
        <GotraTable
          HeaderData={HeaderData}
          gotras={filteredGotras}
          onEdit={handleEditGotra}
          onDelete={handleDeleteGotra}
          memberRights={memberRights}
        />
      </Suspense>
      

    </Stack>
  );
};

export default GotraPage;
