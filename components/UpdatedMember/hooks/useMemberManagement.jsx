import React, { useEffect, useState } from 'react';
import data from '@/utils/applyMemberData';
const useMemberManagement = () => {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    referenceId: '',
    gotra: '',
    Photo: null,
    name: '',
    fatherName: '',
    motherName: '',
    dob: '',
    maritalStatus: '',
    spouseName: '',
    mobile: '',
    otp: '',
    password: '',
    email: '',
    address: '',
    district: '',
    state: '',
    pincode: '',
    profession: '',
    adharCard: '',
    adharCardFile: null,
    voterId: '',
    voterIdFile: null,
    nominee1: { name: '', relationship: '' },
    nominee2: { name: '', relationship: '' },
    disease: false,
    diseaseFile: null,
    rulesAccepted: false,
  });

  

  const [currentEditData, setCurrentEditData] = useState(null);
  const [members, setMembers] = useState(data);


  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value, type, checked} = e.target;
   
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };



  // Handle file input changes
  const handleFileChange = (e) => {

    const { name, files } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: files[0],
    }));
  };

  const handleNomineeChange = (nomineeIndex, field, value) => {
    setFormValues((prevFormData) => ({
      ...prevFormData,
      [`nominee${nomineeIndex + 1}`]: {
        ...prevFormData[`nominee${nomineeIndex + 1}`],
        [field]: value,
      },
    }));
  };

  // Open the form, prepopulate it with existing data if editing
  const openForm = (data = {}) => {
    if (data.name) {
      setCurrentEditData(data);
      setFormValues({ ...data });
    }
    setIsFormOpen(true);
  };

  // Close the form and reset states
  const closeForm = () => {
    setIsFormOpen(false);
    setFormValues({
      referenceId: '',
      gotra: '',
      Photo: '',
      name: '',
      fatherName: '',
      motherName: '',
      dob: '',
      maritalStatus: '',
      spouseName: '',
      mobile: '',
      otp: '',
      password: '',
      email: '',
      address: '',
      district: '',
      state: '',
      pincode: '',
      profession: '',
      adharCard: '',
      adharCardFile: null,
      voterId: '',
      voterIdFile: null,
      nominee1: { name: '', relationship: '' },
      nominee2: { name: '', relationship: '' },
      disease: false,
      diseaseFile: null,
      rulesAccepted: false,
    });
    setCurrentEditData(null);
  };


  

  // Submit form data to add or update the member list
  const handleFormSubmit = () => {
    console.log(formValues);
    if (currentEditData !== null) {
      const updatedMembers = [...members];
      const editIndex = updatedMembers.findIndex(member => member.id === currentEditData.id);
      updatedMembers[editIndex] = { ...formValues, id: currentEditData.id };
      setMembers(updatedMembers);
    } else {
      setMembers([...members, { ...formValues, id: members.length }]);
    }
    closeForm();
  };

  return {
    isFormOpen,
    formValues,
    handleInputChange,
    handleFileChange,
    openForm,
    closeForm,
    handleFormSubmit,
    members,
    currentEditData,
    handleNomineeChange
  };
};

export default useMemberManagement;
