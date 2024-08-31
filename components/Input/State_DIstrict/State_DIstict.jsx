'use client';
import React, { useState, Suspense, lazy } from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import useStates from './customHook/useStates';
import useDistricts from './customHook/useDistricts';
import useModal from './customHook/useModal';

// Lazy load components
const StateTable = lazy(() => import('./StateTable'));
const DistrictTable = lazy(() => import('./DistrictTable'));
const AddDistrictModal = lazy(() => import('./AddDistrictModal'));
const AddStateModal = lazy(() => import('./AddStateModal'));

const StateDistrictManager = () => {
  // Custom Hooks
  const { states, addState, deleteState } = useStates();
  const { districts, addDistrict, deleteDistrict } = useDistricts();
  const {
    openStateModal,
    openDistrictModal,
    openStateModalHandler,
    closeStateModalHandler,
    openDistrictModalHandler,
    closeDistrictModalHandler,
  } = useModal();

  // State management for form fields
  const [currentState, setCurrentState] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [currentDistrict, setCurrentDistrict] = useState('');
  const [selectedState, setSelectedState] = useState(null);
  const [viewDistricts, setViewDistricts] = useState(false);

  // Handlers
  const handleAddState = () => {
    addState(currentState, stateCode);
    setCurrentState('');
    setStateCode('');
    closeStateModalHandler();
  };

  const handleAddDistrict = () => {
    addDistrict(currentDistrict, selectedState);
    setCurrentDistrict('');
    closeDistrictModalHandler();
  };

  const handleDeleteState = (stateName) => {
    deleteState(stateName);
    // If needed, you can handle additional logic for deleting related districts
  };

  const handleDeleteDistrict = (districtName) => {
    deleteDistrict(districtName);
  };

  const openDistrictForm = (stateName) => {
    setSelectedState(stateName);
    openDistrictModalHandler();
  };

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={openStateModalHandler}>
          Add State
        </Button>
      </Box>
      <Suspense fallback={<CircularProgress />}>
        <StateTable
          states={states}
          openDistrictForm={openDistrictForm}
          setSelectedState={setSelectedState}
          setViewDistricts={setViewDistricts}
          handleDeleteState={handleDeleteState}
        />
      </Suspense>

      <Suspense fallback={<CircularProgress />}>
        <AddStateModal
          open={openStateModal}
          onClose={closeStateModalHandler}
          currentState={currentState}
          stateCode={stateCode}
          setCurrentState={setCurrentState}
          setStateCode={setStateCode}
          handleAddState={handleAddState}
        />
      </Suspense>

      <Suspense fallback={<CircularProgress />}>
        <AddDistrictModal
          open={openDistrictModal}
          onClose={closeDistrictModalHandler}
          selectedState={selectedState}
          currentDistrict={currentDistrict}
          setCurrentDistrict={setCurrentDistrict}
          handleAddDistrict={handleAddDistrict}
        />
      </Suspense>

      {viewDistricts && (
        <Suspense fallback={<CircularProgress />}>
          <DistrictTable
            districts={districts}
            selectedState={selectedState}
            handleDeleteDistrict={handleDeleteDistrict}
          />
        </Suspense>
      )}
    </div>
  );
};

export default StateDistrictManager;
