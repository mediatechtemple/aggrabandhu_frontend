// useStates.js
import { useState, useEffect } from 'react';

const useStates = () => {
  const [states, setStates] = useState([]);

  useEffect(() => {
    const storedStates = localStorage.getItem('states');
    if (storedStates) {
      setStates(JSON.parse(storedStates));
    }
  }, []);

  const addState = (stateName, stateCode) => {
    const updatedStates = [...states, { name: stateName, state_code: stateCode }];
    window.localStorage.setItem('states', JSON.stringify(updatedStates));
    setStates(updatedStates);
  };

  const deleteState = (stateName) => {
    setStates(states.filter((state) => state.name !== stateName));
    // Optionally, remove related districts here or handle separately
  };

  return { states, addState, deleteState };
};

export default useStates;
