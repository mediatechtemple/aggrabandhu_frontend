// useDistricts.js
import { useState, useEffect } from 'react';

const useDistricts = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const storedDistricts = localStorage.getItem('district');
    if (storedDistricts) {
      setDistricts(JSON.parse(storedDistricts));
    }
  }, []);

  const addDistrict = (districtName, stateName) => {
    const updatedDistricts = [...districts, { name: districtName, state: stateName }];
    localStorage.setItem('district', JSON.stringify(updatedDistricts));
    setDistricts(updatedDistricts);
  };

  const deleteDistrict = (districtName) => {
    setDistricts(districts.filter((district) => district.name !== districtName));
  };

  return { districts, addDistrict, deleteDistrict };
};

export default useDistricts;
