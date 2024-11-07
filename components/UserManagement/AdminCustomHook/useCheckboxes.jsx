import { useState } from 'react';

const useCheckboxes = () => {
  const [checkboxes, setCheckboxes] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxes(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return { checkboxes, handleCheckboxChange };
};

export default useCheckboxes;
