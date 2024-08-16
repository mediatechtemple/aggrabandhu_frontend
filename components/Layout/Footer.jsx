// app/components/Footer/Footer.jsx
import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: "#1976d2",
        color: 'common.white',
        textAlign: 'center',
        padding: 2,
        boxShadow: 3,
        zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it is above the sidebar
      }}
    >
      <Typography variant="body2">
        &copy; 2024 Media Tech Temple. All rights reserved.{' '}
        <Link href="https://mediatechtemple.com" target="_blank" rel="noopener noreferrer" color="inherit">
          Media Tech Temple
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
