// NomineeComponent.js
import React from 'react';

const NomineeComponent = ({
  nomineeCount,
  formData,
  handleInputChange,
  addNominee,
  removeNominee,
}) => {
  return (
    <div>
      {[...Array(nomineeCount)].map((_, index) => (
        <div key={index} className="mb-4 border p-3 rounded">
          <h4 className="text-sm font-medium mb-2">Nominee {index + 1}</h4>

          <div className="mb-2">
            <label className="block text-xs">Nominee Name</label>
            <input
              type="text"
              name={`nominee${index + 1}`}
              value={formData[`nominee${index + 1}`]}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs">Relationship</label>
            <input
              type="text"
              name={`relation${index + 1}`}
              value={formData[`relation${index + 1}`]}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-xs">Phone Number</label>
            <input
              type="text"
              name={`mobile_no${index + 1}`}
              value={formData[`mobile_no${index + 1}`]}
              onChange={handleInputChange}
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
    </div>
  );
};

export default NomineeComponent;
