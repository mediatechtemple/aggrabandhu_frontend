'use client'
import { Box, Button, TableHead, TextField, Typography } from '@mui/material'
import React from 'react'
import useModal from './hooks/useModal'
import ModalForm from './ModalForm'
import useNotificationForm from './hooks/useNotificationForm'
import useFilters from './hooks/useFilters'
import Link from 'next/link'

const Notification = () => {
    const { isOpen, openModal, closeModal } = useModal();
    const {
      formData,
      handleChange,
      handleSubmit,
      submissions,
      loading, // Expose loading state
      error, // Extract submissions array
      deleteNotification,
      handleFileChange
      } = useNotificationForm(closeModal);



      const { filteredMembers,
        filters,
        handleFilterChange}=useFilters(submissions)

        const convertToClickableLink = (text) => {
          const urlPattern = /(https?:\/\/[^\s]+)/g;
          const parts = text.split(urlPattern);
          return parts.map((part, index) => {
            if (urlPattern.test(part)) {
              return (
                <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  {part}
                </a>
              );
            }
            return part;
          });
        };

  
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


        {/* Here Modal form will come brother */}

      <ModalForm 
      open={isOpen} 
      onClose={closeModal}  
      formData={formData} 
      handleChange={handleChange}
       handleSubmit={handleSubmit}
       handleFileChange={handleFileChange}
       />
      





     
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

      



      {loading ? (
          <h1 className='text-2xl text-center'>Data is loading...</h1>
      ) : error ? (
          <h1 className='text-red-300 text-2xl text-center'>{error}</h1>
      ) : (
          <Box mt={2}>
              <ul className="list-none p-0">
                  {filteredMembers.map((item, index) => (
                      <li
                          key={index}
                          className="bg-gray-100 mb-5 p-4 rounded-lg shadow-md transform perspective-1000 rotate-x-5 rotate-y--5 transition-transform duration-300 ease-in-out hover:rotate-x-0 hover:rotate-y-0 hover:shadow-lg"
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box>
                          <Typography variant="h6" className="mb-2 text-gray-800">
                              {item.title}
                          </Typography>
                          <Typography className="text-gray-600">
                              {convertToClickableLink(item.content)}
                          </Typography>
                          
                          {item.file && 
                          <button  className="p-1 bg-gray-300  text-black rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-200"
                          >
                            <Link href={ `https://backend.aggrabandhuss.org${item.file}`} to='_blank'>
                              View File
                            </Link>
                          </button>}
                         
                          </Box>
                          <Box>
                            <button
                             className="px-4 py-2 bg-red-500 text-white rounded-lg text-lg font-semibold hover:bg-red-600 transition duration-200"
                             onClick={()=>deleteNotification(item.id)}
                            >Delete</button>
                          </Box>
                        </Box>
                      </li>
                  ))}
              </ul>
          </Box>
    )}

    </>
  )
}

export default Notification
