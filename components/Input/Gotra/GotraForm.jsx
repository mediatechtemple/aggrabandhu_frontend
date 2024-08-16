'use client'
import { useState } from 'react';
import { Button, TextField, Box, Typography, Dialog } from '@mui/material';

const GotraForm = ({ onSubmit, initialValue = '', formTitle = 'Add Gotra',label }) => {
  const [gotra, setGotra] = useState(initialValue);

  //as we enter on submit from here data woll go to parent componentn and in onSubmit gotra will add
  //to the state in parent component......
  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (gotra) {
      onSubmit(gotra);
      setGotra('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        padding: 3,
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        gap: 2,
        width: '500px'
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ background: '#1976d2', color: 'white', width: '100%', textAlign: 'center', padding: 1 }}
      >
        {formTitle}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, width: '100%', justifyContent: 'center' }}>
        <TextField
          label={label}
          value={gotra}
          onChange={(e) => setGotra(e.target.value)}
          required
          variant="outlined"
          sx={{ width: '70%' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ width: '20%', fontWeight: 'bold' }}
        >
          {formTitle.split(' ')[0]}
        </Button>
      </Box>
    </Box>
  );
};

export default GotraForm;
