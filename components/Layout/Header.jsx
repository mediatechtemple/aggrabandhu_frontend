import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Image from 'next/image';

const Header = ({
  toggleSidebar,
  handleMenuNotifications,
  anchorElNotifications,
  handleClose,
  handleMenuUser,
  anchorElUser,
  openProfile,
  openChangePassword,
  rediretLogin
}) => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center' }}>
        
        {/* Left side: Menu Button and Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2, flex: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>

          <Image
            src="/Images/agarsen.png"
            alt="Logo"
            height={40}
            width={40}
            style={{ marginRight: '16px' }}
          />

          <Typography variant="h6" noWrap>
          AGGRABANDHU SEVARTH SANSTHAN
          </Typography>
        </Box>

        {/* Center: Dashboard */}
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', flex: 1 }}>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Box>

        {/* Right side: Notifications and Account */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
          <IconButton
            edge="end"
            aria-label="notifications"
            aria-controls="menu-notifications"
            aria-haspopup="true"
            onClick={handleMenuNotifications}
            color="inherit"
          >
            <NotificationsIcon />
          </IconButton>
          <Menu
            id="menu-notifications"
            anchorEl={anchorElNotifications}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElNotifications)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>No new notifications</MenuItem>
          </Menu>

          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuUser}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleClose}
          >
            <MenuItem onClick={openProfile}>User Profile</MenuItem>
            <MenuItem onClick={openChangePassword}>Change Password</MenuItem>
            <MenuItem onClick={rediretLogin}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
