'use client'
import { Box, Button, TableHead, TextField, Typography } from '@mui/material'
import React from 'react'
import useModal from './hooks/useModal'
import ModalForm from './ModalForm'
import useNotificationForm from './hooks/useNotificationForm'
import useFilters from './hooks/useFilters'

const Notification = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const {
        formData,
        handleChange,
        handleSubmit,
        submissions, // Extract submissions array
      } = useNotificationForm();

      const { filteredMembers,
        filters,
        handleFilterChange}=useFilters(submissions)
  return (
    <>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4" gutterBottom color='#007bff'>
                Notification Management
            </Typography>
            <Button variant="contained" onClick={openModal} sx={{ backgroundColor: '#1976d2' }}>
                Add New Notification
            </Button>
        </Box>
        <Box borderBottom='1px solid #bcd1c2' display="flex" justifyContent="space-between" alignItems="center" mb={2}> </Box>
        
        <Box borderBottom="1px solid #bcd1c2" padding="5px" marginBottom='5px' bgcolor="#007bff" color="white">
            <Typography>Notification List</Typography>
        </Box>
      <ModalForm open={isOpen} onClose={closeModal}  formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
      
     
      <Box display="flex" justifyContent="flex-end" alignItems="center">
  <Typography variant="body1" sx={{ marginRight: '10px' }}>
    Date Range:
  </Typography>
  
  <TextField
    type="date"
    name="startDate"  // Added name attribute for handleFilterChange to work properly
    value={filters.startDate}
    onChange={handleFilterChange}
    sx={{
      '& .MuiInputBase-input': {
        padding: '5px', // Adjust padding here
      },
    }}
  />
  
  <Typography variant="body1" sx={{ marginX: '10px' }}> {/* Changed margin to marginX for horizontal margin */}
    to
  </Typography>
  
  <TextField
    type="date"
    name="endDate"  // Added name attribute for handleFilterChange to work properly
    value={filters.endDate}
    onChange={handleFilterChange}
    sx={{
      '& .MuiInputBase-input': {
        padding: '5px', // Adjust padding here
      },
    }}
  />
</Box>

      
      <Box mt={2}>
            <ul className="list-none p-0">
                {filteredMembers.map((item, index) => (
                    <li
                        key={index}
                        className="bg-gray-100 mb-5 p-4 rounded-lg shadow-md transform perspective-1000 rotate-x-5 rotate-y--5 transition-transform duration-300 ease-in-out hover:rotate-x-0 hover:rotate-y-0 hover:shadow-lg"
                    >
                        <Typography variant="h6" className="mb-2 text-gray-800">
                            {item.title}
                        </Typography>
                        <Typography className="text-gray-600">
                            {item.message}
                        </Typography>
                    </li>
                ))}
            </ul>
        </Box>
    </>
  )
}

export default Notification
