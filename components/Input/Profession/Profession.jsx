'use client'
import { Box, Button, Dialog, Paper, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import GotraForm from '../Gotra/GotraForm';
import ProfesstionTable from './ProfesstionTable';
import GotraForm from './GotraForm';

const Profession = () => {
    const [professions, setProfessions] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);

    const HeaderData = ['Professions'];

    const [memberRights,setmemberRights]=useState([]);
    const [token,setToken]=useState(null)

    useEffect(()=>{
        setmemberRights(JSON.parse( localStorage.getItem('user')).rights)
        // console.log(memberRights);
        // console.log('Asoka rights');
    },[]);


    useEffect(() => {
        async function fetchProfession(toke) {
            try {
                const response = await fetch('https://backend.aggrabandhuss.org/api/profession',{
                    method:'GET',
                    'Authorization':`bearer ${toke}`
                });
                if (!response.ok) {
                    throw new Error('Error fetching professions');
                }
                const data = await response.json();
                setProfessions(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        let toke=JSON.parse( localStorage.getItem('user')).token;
       setToken(toke);

        fetchProfession(toke);
    }, []);

    const handleAddProfession = async (profession) => {
        if (editIndex !== null) {
            try {
                const professionToEdit = professions.find(p => p.id === editIndex);
                const response = await fetch(`https://backend.aggrabandhuss.org/api/profession/${editIndex}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`bearer ${token}`
                    },
                    body: JSON.stringify({ name: profession }),
                });
                //hel

                if (!response.ok) {
                    throw new Error('Error updating profession');
                }

                const updatedData = await response.json();
                const updatedProfessions = professions.map((p) =>
                    p.id === editIndex ? { ...p, name: profession } : p
                );

                setProfessions(updatedProfessions);
                setEditIndex(null);
                setIsFormOpen(false);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        } else {
            try {
                const response = await fetch('https://backend.aggrabandhuss.org/api/profession', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization':`bearer ${token}`
                    },
                    body: JSON.stringify({ name: profession }),
                });

                if (!response.ok) {
                    throw new Error('Error adding profession');
                }

                const data = await response.json();
                setProfessions([...professions, { id: data.id, name: data.name }]);
                setIsFormOpen(false);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleEditProfession = (id) => {
        setEditIndex(id);
        setIsFormOpen(true);
    };

    const handleDeleteProfession = async (id) => {
        try {
            const response = await fetch(`https://backend.aggrabandhuss.org/api/profession/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Error deleting profession');
            }

            setProfessions(professions.filter(p => p.id !== id));
        } catch (error) {
            setError(error);
        }
    };

    const filteredProfession = professions.filter((profession) =>
        profession?.name?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Stack spacing={2} padding={2}>
           {
          memberRights['Profession Management']?.['add'] &&  <Box display='flex' justifyContent="flex-end">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsFormOpen(true)}
                >
                    Add Profession
                </Button>
            </Box>
}
            <Dialog open={isFormOpen} onClose={() => {
                setIsFormOpen(false);
                setEditIndex(null);
            }}>
                <Paper elevation={3} padding={2}>
                    <GotraForm
                        onSubmit={handleAddProfession}
                        initialValue={editIndex !== null ? professions.find(item => item.id === editIndex).name : ''}
                        formTitle={editIndex !== null ? 'Edit Profession' : 'Add Profession'}
                        label={'profession'}
                        setIsFormOpen={setIsFormOpen}
                    />
                </Paper>
            </Dialog>

            <TextField
                label="Search Profession"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
            />

            <ProfesstionTable
                HeaderData={HeaderData}
                gotras={filteredProfession}
                onEdit={handleEditProfession}
                onDelete={handleDeleteProfession}
                memberRights={memberRights}
            />
        </Stack>
    );
};

export default Profession;
