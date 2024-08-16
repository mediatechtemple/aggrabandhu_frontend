'use client'
import { Box, Button, Dialog, Paper, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import GotraForm from '../Gotra/GotraForm'
import GotraTable from '../Gotra/GotraTable'

const Profession = () => {
    /////////////////////////////////////////////////////////////
    const[professions,setProfessions]=useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const[search,setSearch]=useState('');

    const[isFormOpen,setIsFormOpen]=useState(false);

    const HeaderData=['Professions'];

/////////////////////////////////////////////////////////////////////

useEffect(() => {
    const storedProfessions = JSON.parse(localStorage.getItem('professions')) || [];
    setProfessions(storedProfessions);
  }, []);







//////////////////////////////////////////////////////////////////

const handleAddProfession = (profession) => {
    let updatedProfession;

    if (editIndex !== null) {
      // Update the existing gotra at the editIndex
      updatedProfession = [...professions];
      updatedProfession[editIndex] = profession;
    } else {
      // Add new gotra
      updatedProfession = [...professions, profession];
    }

    // Update local storage and state
    localStorage.setItem('professions', JSON.stringify(updatedProfession));
    setProfessions(updatedProfession);

    // Reset editIndex and close the form
    setEditIndex(null);
    setIsFormOpen(false);
  };





    const handleEditProfession = (index) => {
        setEditIndex(index);
        setIsFormOpen(true);
      };
      
    //so here main function are avalable brohter

      const handleDeleteProfession = (index) => {
        const updatedProfessions = professions.filter((_, i) => i !== index);
    
        // Update local storage and state
        localStorage.setItem('professions', JSON.stringify(updatedProfessions));
        setProfessions(updatedProfessions);
      };
    
      const filteredProfession = professions.filter((profession) =>
        profession.toLowerCase().includes(search.toLowerCase())
      );

  return (
   <Stack spacing={2} padding={2}>
      <Box display='flex' justifyContent="flex-end">
      <Button
          variant="contained"
          color="primary"
          onClick={() => setIsFormOpen(true)}
        >
          Add Profession
        </Button>
      </Box>

      <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <Paper elevation={3} padding={2}>
          <GotraForm
            onSubmit={handleAddProfession}
            initialValue={editIndex !== null ? professions[editIndex] : ''}
            formTitle={editIndex !== null ? 'Edit Profession' : 'Add Profession'}
            label={'profession'} 
          />
        </Paper>
      </Dialog>
{/* this one here is search fleld which we will work together  if you do't get according to mee.... */}
      <TextField
        label="Search Profession"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
      />
      <GotraTable
        HeaderData={HeaderData}
        gotras={filteredProfession}
        onEdit={handleEditProfession}
        onDelete={handleDeleteProfession}
      />


   </Stack>
  )
}

export default Profession
