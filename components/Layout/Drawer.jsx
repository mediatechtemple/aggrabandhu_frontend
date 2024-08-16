import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
  Collapse,
} from '@mui/material';

import Link from 'next/link';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PeopleIcon from '@mui/icons-material/People';
import RuleIcon from '@mui/icons-material/Gavel';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupIcon from '@mui/icons-material/Group';
import InputIcon from '@mui/icons-material/Input';
import { LocationOn, People } from '@mui/icons-material';
import WorkIcon from '@mui/icons-material/Work';
const drawerWidth = 250;

export default function DrawerComponent({ isSidebarOpen, toggleSidebar }) {
  const [openWebsiteManagement, setOpenWebsiteManagement] = React.useState(false);
  const [openInputManagement, setOpenInputManagement] = React.useState(false);

  const handleClickWebsiteManagement = () => {
    setOpenWebsiteManagement(!openWebsiteManagement);
  };


  const handleClickInputManagement=()=>{
    setOpenInputManagement(!openInputManagement);
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isSidebarOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto',paddingBottom:'40px' }}>
        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, route: '/Dashboard' },
            { text: 'Profile', icon: <PersonIcon />, route: '/Profile' },
            { text: 'User Management', icon: <GroupIcon />, route: '/User-Management' },
            { text: 'Members Management', icon: <PeopleIcon />, route: '/Members' },
            { text: 'Donation Management', icon: <VolunteerActivismIcon />, route: '/Donation-Receivers' },
            { text: 'Rules & Regulations', icon: <RuleIcon />, route: '/Rules-Regulations' },
            { text: 'Notification Management', icon: <NotificationsIcon />, route: '/Notification' },
          ].map((item) => (
            <Link href={item.route} passHref key={item.text}>
              <ListItem >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))}

          <ListItem button onClick={handleClickInputManagement}>
            <ListItemIcon><InputIcon/></ListItemIcon>
            <ListItemText primary="Input" />
            {openInputManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openInputManagement} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/Gotra" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><People /></ListItemIcon>
                  <ListItemText primary="Gotra" />
                </ListItem>
              </Link>
              <Link href="/State-District" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><LocationOn /></ListItemIcon>
                  <ListItemText primary="State-District" />
                </ListItem>
              </Link>
              <Link href="/Profession" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><WorkIcon /></ListItemIcon>
                  <ListItemText primary="Profession" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          

          <ListItem button onClick={handleClickWebsiteManagement}>
            <ListItemIcon><ManageAccountsIcon/></ListItemIcon>
            <ListItemText primary="Website Management" />
            {openWebsiteManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItem>


          <Collapse in={openWebsiteManagement} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/Gallery" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><PhotoLibraryIcon /></ListItemIcon>
                  <ListItemText primary="Gallery" />
                </ListItem>
              </Link>
              <Link href="/Contact-Us" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><ContactMailIcon /></ListItemIcon>
                  <ListItemText primary="Contact Us" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
}
