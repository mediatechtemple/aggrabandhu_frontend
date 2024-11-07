import { useState } from 'react';

const useDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  // const [selectedAdmin, setSelectedAdmin] = useState(false);

  const handleDialogOpen = () => {
  
    setDialogOpen(true);
    // setSelectedAdmin(user);
  };

  const handleDialogClose = () => setDialogOpen(false);
  const handleSearchDialogOpen = () => setSearchDialogOpen(true);
  const handleSearchDialogClose = () => setSearchDialogOpen(false);

  return {
    dialogOpen,
    searchDialogOpen,
    handleDialogOpen,
    handleDialogClose,
    handleSearchDialogOpen,
    handleSearchDialogClose,

  };
};

export default useDialog;
