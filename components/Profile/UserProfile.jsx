import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid, Box } from '@mui/material';
import { styled } from '@mui/system';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  marginTop: theme.spacing(4),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  margin: '0 auto',
}));

const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, Anytown, USA',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.',
    avatar: 'https://via.placeholder.com/100', // Replace with actual image URL
  };

  return (
    <Grid container justifyContent="center">
      <StyledCard>
        <CardContent>
          <StyledAvatar alt={user.name} src={user.avatar} />
          <Typography variant="h5" component="div" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.phone}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.address}
          </Typography>
          <Box mt={2}>
            <Typography variant="body2" color="textSecondary">
              {user.bio}
            </Typography>
          </Box>
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

export default ProfilePage;
