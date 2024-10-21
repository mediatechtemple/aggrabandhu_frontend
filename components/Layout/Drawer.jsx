import React, { useEffect, useState } from 'react';
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
import GavelIcon from '@mui/icons-material/Gavel';


import SupportIcon from '@mui/icons-material/Support';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import DonationIcon from '@mui/icons-material/MonetizationOn'; // for 'My Donation'


export default function DrawerComponent({ isSidebarOpen, toggleSidebar }) {
  const [openWebsiteManagement, setOpenWebsiteManagement] = React.useState(false);
  const [openInputManagement, setOpenInputManagement] = React.useState(false);
  const [openMakeDonation, setOpenMakeDonation] = React.useState(false);
  const [userManagement ,setUserManagement] = React.useState(false);
  const [donationManagement,setDonationManagement]=React.useState(false);
  const [role,setRole]=useState(null);



  useEffect(()=>{
    setRole(JSON.parse(localStorage.getItem('role')));
  },[])
  
  // console.log((localStorage.getItem('role')));

  // const [memberId,setMemberId]=useState(JSON.parse(window.localStorage.getItem('user')).role);


  const handleClickWebsiteManagement = () => {
    setOpenWebsiteManagement(!openWebsiteManagement);
  };


  const handleClickInputManagement=()=>{
    setOpenInputManagement(!openInputManagement);
  }

  const handleClickMakeDonation=()=>{
    setOpenMakeDonation(!openMakeDonation);
  }

  const handleClickUserManagement=()=>{
    setUserManagement(!userManagement);
  }

  const handleClickDonationManagement=()=>{
    setDonationManagement(!donationManagement);
  }

  
  return (
    <Drawer
  variant="persistent"
  anchor="left"
  open={isSidebarOpen}
  sx={{
    width: drawerWidth,
    flexShrink: 0,
    zIndex: (theme) => theme.zIndex.drawer + 1,  // Custom z-index value
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      boxSizing: 'border-box',
      zIndex: 1,  // Custom z-index for drawer paper
    },
  }}
>
      <Toolbar />
      <Box sx={{ overflow: 'auto',paddingBottom:'40px' }}>
        <List>
          {
          [
            { text: 'Dashboard', icon: <DashboardIcon />, route: '/Dashboard' ,roles:['admin']},
            { text: 'Profile', icon: <PersonIcon />, route: '/Profile',roles:['user'] },
            { text: 'Live Donation', icon: <VolunteerActivismIcon />, route: '/Live-Donation',roles:['user'] },
            { text: 'My Donation', icon: <DonationIcon />, route: '/My-Donation',roles:['user'] },
            { text: 'Member List', icon: <PeopleIcon />, route: '/Member-List',roles:['user'] },
            { text: 'Donation List', icon: <VolunteerActivismIcon />, route: '/Donation-List',roles:['user'] },
            { text: 'Referral Members', icon: <GroupIcon />, route: '/Referral-Members',roles:['user'] },
            { text: 'Support', icon: <SupportIcon />, route: '/Support',roles:['user'] },
            { text: 'Follow Us', icon: <FollowTheSignsIcon />, route: '/Follow-Us',roles:['user'] },
            { text: 'Legal For Web', icon: <GavelIcon />, route: '/Legal-For-Web',roles:['user'] },
            { text: 'Admin Management', icon: <GroupIcon />, route: '/User-Management',roles:['admin'] },
            { text: 'Members Management', icon: <PeopleIcon />, route: '/Members',roles:['admin'] },
            // { text: 'Donation Management', icon: <VolunteerActivismIcon />, route: '/Donation-Receivers',roles:['admin'] },
            { text: 'Rules & Regulations', icon: <RuleIcon />, route: '/Rules-Regulations',roles:['admin'] },
            { text: 'Notification Management', icon: <NotificationsIcon />, route: '/Notification-Management',roles:['admin'] },
            // {text:'Make Donation',icon:<VolunteerActivismIcon/>,route:'/make-donation'}
          ]
          .filter(item => item.roles.includes(role))
          .map((item) => (
            <Link href={item.route} passHref key={item.text}>
              <ListItem >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </Link>
          ))
          
          }


{/* here make donation list will come */}
         {role =='admin' && <>
          <ListItem button onClick={handleClickUserManagement}>
            <ListItemIcon><VolunteerActivismIcon/></ListItemIcon>
            <ListItemText primary="User Management" />
            {userManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={userManagement} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/User-Management" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><People /></ListItemIcon>
                  <ListItemText primary="Members Management" />
                </ListItem>
              </Link>
              <Link href="/Refral-Report" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><LocationOn /></ListItemIcon>
                  <ListItemText primary="Refral Report" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
         </>
          }



{role =='admin' && <>
          <ListItem button onClick={handleClickDonationManagement}>
            <ListItemIcon><VolunteerActivismIcon/></ListItemIcon>
            <ListItemText primary="Donation Management" />
            {donationManagement ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={donationManagement} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/Donation-Receivers" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><People /></ListItemIcon>
                  <ListItemText primary="Make Donation" />
                </ListItem>
              </Link>
              <Link href="/Donators-List" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><LocationOn /></ListItemIcon>
                  <ListItemText primary="Donator's List" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
         </>
          }

















          {role=="admin" && <><ListItem button onClick={handleClickMakeDonation}>
            <ListItemIcon><VolunteerActivismIcon/></ListItemIcon>
            <ListItemText primary="Make Donation" />
            {openMakeDonation ? <ExpandLess /> : <ExpandMore />}
          </ListItem>


          <Collapse in={openMakeDonation} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link href="/make-donation" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><People /></ListItemIcon>
                  <ListItemText primary="new_donation" />
                </ListItem>
              </Link>
              <Link href="/donation-list" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><LocationOn /></ListItemIcon>
                  <ListItemText primary="donation-list" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          </>
          }



          {
            role=='admin' && <>
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

            {/* here we are going to add three more inputs */}

            <Link href="/Rules_Regulations" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><WorkIcon /></ListItemIcon>
                  <ListItemText primary="Rules_Regulations" />
                </ListItem>
              </Link>

              <Link href="/Declarations" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><WorkIcon /></ListItemIcon>
                  <ListItemText primary="Declarations" />
                </ListItem>
              </Link>

              <Link href="/Privacy_Policy" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><WorkIcon /></ListItemIcon>
                  <ListItemText primary="Privacy Policy" />
                </ListItem>
              </Link>

              <Link href="/term_condition" passHref>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemIcon><WorkIcon /></ListItemIcon>
                  <ListItemText primary="Term & Condition" />
                </ListItem>
              </Link>


            </List>
          </Collapse>
            </>
          }
          



          {
            role=='admin' && <>
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
            </>
          }









        </List>
      </Box>
    </Drawer>
  );
}
