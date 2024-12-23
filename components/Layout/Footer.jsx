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
        zIndex: 1400, // Ensure it is above the sidebar
      }}
    >
      <Typography variant="body2">
        &copy; All Right Reserved to Agrabandhu Sewarth Sansthan (ABSS) - <Link href="https://www.mediatechtemple.com/web-design-and-development-services/"
        target="_blank" rel="noopener noreferrer" color="inherit"
        >Desing & Developed  </Link>{'  '}
  by{' '}
        <Link href="https://mediatechtemple.com" target="_blank" rel="noopener noreferrer" color="inherit">
           Media Tech Temple
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
