// useModal.js
import { useState } from 'react';

const useModal = () => {
  const [openStateModal, setOpenStateModal] = useState(false);
  const [openDistrictModal, setOpenDistrictModal] = useState(false);

  const openStateModalHandler = () => setOpenStateModal(true);
  const closeStateModalHandler = () => setOpenStateModal(false);
  const openDistrictModalHandler = () => setOpenDistrictModal(true);
  const closeDistrictModalHandler = () => setOpenDistrictModal(false);

  return {
    openStateModal,
    openDistrictModal,
    openStateModalHandler,
    closeStateModalHandler,
    openDistrictModalHandler,
    closeDistrictModalHandler,
  };
};

export default useModal;
