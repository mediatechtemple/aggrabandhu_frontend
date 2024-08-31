import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import useNotificationForm from './hooks/useNotificationForm';
// import useNotificationForm from '../hooks/useNotificationForm'; // Adjust the path as necessary

const ModalForm = ({ open, onClose ,formData, handleChange, handleSubmit}) => {
  

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={{ width: 600, padding: 2, backgroundColor: 'white', margin: 'auto', marginTop: '20vh' }}>
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ textAlign: 'center', color: '#1976d2' }}
        >
          Notification Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <div style={{ margin: '16px 0' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: 8 }}>
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
          <div style={{ margin: '16px 0' }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: 8 }}>
              Notification Message:
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              style={{
                width: '100%',
                padding: '8px',
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
