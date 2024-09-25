
"use client"
import { Inter } from "next/font/google";
import React, { useState } from 'react';
import {
  CssBaseline,
  Toolbar,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import Header from './Header';
import DrawerComponent from './Drawer';
import CustomDialog from '../Dialog/CustomDialog';
import UserProfile from "../Profile/UserProfile";
import ChangePassword from "../Auth/ChangePassword/ChangePassword";
import Footer from './Footer';






const inter = Inter({ subsets: ["latin"] });
const drawerWidth = 250;

const MainContent = styled('main')(({ theme, isSidebarOpen }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: isSidebarOpen ? drawerWidth : 0,
  width: isSidebarOpen ? `calc(100% - ${drawerWidth}px)` : '100%',
  transition: 'margin-left 0.3s ease, width 0.3s ease',
  marginTop: 0,
  marginBottom: 40,
}));
// cheking we on 9/25/2024
export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleMenuNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElUser(null);
    setAnchorElNotifications(null);
  };

  const openProfile = () => {
    setProfileOpen(true);
    handleClose();
  };

  const openChangePassword = () => {
    setChangePasswordOpen(true);
    handleClose();
  };

  const closeProfile = () => {
    setProfileOpen(false);
  };

  const closeChangePassword = () => {
    setChangePasswordOpen(false);
  };

  const rediretLogin=()=>{
    router.push('/login');
  }

  return (
    <>
      <div className={inter.className}>
        <CssBaseline />
        <Header
          toggleSidebar={toggleSidebar}
          handleMenuNotifications={handleMenuNotifications}
          handleMenuUser={handleMenuUser}
          anchorElNotifications={anchorElNotifications}
          anchorElUser={anchorElUser}
          handleClose={handleClose}
          openProfile={openProfile}
          openChangePassword={openChangePassword}
          rediretLogin={rediretLogin}
        />

        <DrawerComponent
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        <MainContent isSidebarOpen={isSidebarOpen}>
          <Toolbar />
          {children}
        </MainContent>

        <CustomDialog open={profileOpen} handleClose={closeProfile} title="User Profile">
          <UserProfile />
        </CustomDialog>

        <CustomDialog open={changePasswordOpen} handleClose={closeChangePassword} title="Change Password">
          <ChangePassword />
        </CustomDialog>
      </div>
      <Footer />
    </>
  );
}


























































































// "use client"
// import { Inter } from "next/font/google";
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from './Header';
// import DrawerComponent from './Drawer';
// import CustomDialog from '../Dialog/CustomDialog';
// import UserProfile from "../Profile/UserProfile";
// import ChangePassword from "../Auth/ChangePassword/ChangePassword";

// const inter = Inter({ subsets: ["latin"] });
// const drawerWidth = "w-[250px]"; // Sidebar width

// export default function Layout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [profileOpen, setProfileOpen] = useState(false);
//   const [changePasswordOpen, setChangePasswordOpen] = useState(false);
//   const router = useRouter();

//   const [isLoggin, setIsLoggin] = useState(localStorage.getItem('user'));

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className={`${inter.className} h-screen flex flex-col overflow-hidden`}>
//       {/* Header Section */}
//       {true && (
//         <Header
//           toggleSidebar={toggleSidebar}
//           openProfile={() => setProfileOpen(true)}
//           openChangePassword={() => setChangePasswordOpen(true)}
//           redirectLogin={() => router.push('/login')}
//         />
//       )}

//       <div className="flex flex-grow overflow-hidden">
//         {/* Sidebar */}
//         {true && isSidebarOpen && (
//           <div className={`bg-gray-800 ${drawerWidth} transition-all duration-300`}>
//            <DrawerComponent
//           isSidebarOpen={isSidebarOpen}
//           toggleSidebar={toggleSidebar}
//         />
//           </div>
//         )}

//         {/* Main Content */}
//         <main
//           className={`flex-grow p-4 overflow-auto transition-all duration-300 ${
//             isLoggin && isSidebarOpen ? 'ml-[250px]' : 'ml-0'
//           }`}
//         >
//           {children}
//         </main>
//       </div>

//       {/* Dialogs */}
//       <CustomDialog open={profileOpen} handleClose={() => setProfileOpen(false)} title="User Profile">
//         <UserProfile />
//       </CustomDialog>

//       <CustomDialog open={changePasswordOpen} handleClose={() => setChangePasswordOpen(false)} title="Change Password">
//         <ChangePassword />
//       </CustomDialog>
//     </div>
//   );
// }
