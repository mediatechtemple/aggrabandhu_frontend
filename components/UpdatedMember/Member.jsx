'use client'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import React , { Suspense, lazy } from 'react';
import useMemberManagement from './hooks/useMemberManagement';
import useFilters from './hooks/useFilters';
import usePagination from '@/hooks/usePagination';


const MemberTable = lazy(() => import('./MemberTable'));
const MembershipModal2 = lazy(() => import('./MembershipModal2'));
const FilterSection = lazy(() => import('./FilterSection'));
const Pagination = lazy(() => import('@/shared/Pagination'));

const columns = [
    { id: 'referenceId', label: 'Reference ID' },
    { id: 'name', label: 'Name' },
    { id: 'fatherName', label: "Father's Name" },
    { id: 'motherName', label: "Mother's Name" },
    { id: 'dob', label: 'DOB' },
    { id: 'maritalStatus', label: 'Marital Status' },
    { id: 'spouseName', label: 'Spouse Name' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'email', label: 'Email' },
    { id: 'address', label: 'Address' },
    { id: 'district', label: 'District' },
    { id: 'state', label: 'State' },
    { id: 'pincode', label: 'Pincode' },
    { id: 'profession', label: 'Profession' },
    { id: 'adharCard', label: 'Adhar Card' },
    { id: 'voterId', label: 'Voter ID' },
    { id: 'nominee1', label: 'Nominee 1' },
    { id: 'nominee2', label: 'Nominee 2' },
    { id: 'actions', label: 'Actions' },
  ];


const Member = () => {
    const {
        isFormOpen,
        formValues,
        handleInputChange,
        handleFileChange,
        openForm,
        closeForm,
        handleFormSubmit,
        members,
        handleNomineeChange
    } = useMemberManagement();

    
    const {
        filteredMembers,
        filters,
        handleFilterChange
    } = useFilters(members);


    const {
        page,
        rowsPerPage,
        totalPages,
        currentRows,
        handlePageChange,
        handlePageSizeChange,
      } = usePagination(filteredMembers,100);

    //   console.log(currentRows[0])
    return (
        <div >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} >
                <Typography variant="h4" gutterBottom color='#007bff'>
                    Member Management
                </Typography>
                <Button
                 variant="contained" 
                 onClick={openForm} sx={{ backgroundColor: '#1976d2' }}>
                    Apply for New Membership
                </Button>
            </Box>
            <Box borderBottom='1px solid #bcd1c2' display="flex" justifyContent="space-between" alignItems="center" mb={2}> </Box>
           
            <Box borderBottom="1px solid #bcd1c2" padding="5px" marginBottom='5px' bgcolor="#007bff" color="white">
                <Typography>Member List</Typography>
            </Box>




            <Suspense fallback={<div>Loading...</div>}>
            <FilterSection filters={filters} handleFilterChange={handleFilterChange} />


            <MembershipModal2  
                open={isFormOpen} 
                handleClose={closeForm} 
                formValues={formValues} 
                handleChange={handleInputChange} 
                handleSubmit={handleFormSubmit} 
                handleFileChange={handleFileChange}
                handleNomineeChange={handleNomineeChange}
            />

            <MemberTable members={currentRows} openForm={openForm} columns={columns}/>
            
            <Pagination
                page={page}
                pageSize={rowsPerPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
            />
            </Suspense>
        </div>
    );
}

export default Member;
