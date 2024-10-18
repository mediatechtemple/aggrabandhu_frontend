'use client'
import { useState } from "react";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    date: "",
    nominee1: "",
    relationship1: "",
    phone1: "",
  });
  const [nomineeCount, setNomineeCount] = useState(1);

  // Handle input change for main fields and nominee fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to add more nominee fields
  const addNominee = () => {
    if (nomineeCount < 4) {
      setNomineeCount(nomineeCount + 1);
    }
  };

  // Function to remove nominee fields
  const removeNominee = (index) => {
    // Create new form data without removed nominee
    const newFormData = { ...formData };
    delete newFormData[`nominee${index + 1}`];
    delete newFormData[`relationship${index + 1}`];
    delete newFormData[`phone${index + 1}`];

    // Shift remaining nominee fields to fill gaps
    for (let i = index + 1; i < nomineeCount; i++) {
      newFormData[`nominee${i}`] = newFormData[`nominee${i + 1}`] || "";
      newFormData[`relationship${i}`] = newFormData[`relationship${i + 1}`] || "";
      newFormData[`phone${i}`] = newFormData[`phone${i + 1}`] || "";
    }

    setFormData(newFormData);
    setNomineeCount(nomineeCount - 1);
  };

  // Handle form submit (for demo purposes, just logs the formData)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md">
      <form onSubmit={handleSubmit}>
        {/* Main Form Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        {/* Nominee Fields */}
        {[...Array(nomineeCount)].map((_, index) => (
          <div key={index} className="mb-4 border p-3 rounded">

            <h4 className="text-sm font-medium mb-2">Nominee {index + 1}</h4>

            <div className="mb-2">
              <label className="block text-xs">Nominee Name</label>
              <input
                type="text"
                name={`nominee${index + 1}`}
                value={formData[`nominee${index + 1}`]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-xs">Relationship</label>
              <input
                type="text"
                name={`relationship${index + 1}`}
                value={formData[`relationship${index + 1}`]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div className="mb-2">
              <label className="block text-xs">Phone Number</label>
              <input
                type="text"
                name={`phone${index + 1}`}
                value={formData[`phone${index + 1}`]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            {/* Remove Nominee Button */}
            {nomineeCount > 1 && (
              <button
                type="button"
                onClick={() => removeNominee(index)}
                className="text-red-500 text-sm mt-2"
              >
                Remove Nominee {index + 1}
              </button>
            )}


          </div>
        ))}

        {/* Add Nominee Button */}
        {nomineeCount < 4 && (
          <button
            type="button"
            onClick={addNominee}
            className="mb-4 w-full bg-blue-500 text-white py-2 rounded"
          >
            Add Nominee
          </button>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormComponent;
