import React from 'react';
import useNotificationForm from './hooks/useNotificationForm';

const ModalForm = ({ open, onClose, formData, handleChange, handleSubmit,handleFileChange }) => {
  if (!open) return null; // Return null if the modal is not open

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2800]">
        <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
          <h2 id="modal-title" className="text-xl text-center text-blue-600 font-semibold mb-4">
            Notification Form
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block mb-1 font-medium">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-1 font-medium">
                Notification Message:
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={4}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Upload File:
              </label>
              <input
                type="file"
                id="file"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
        <label className=" text-blue-500 block text-sm">
        Add Notification Preferences (Web, App, or Both)
          </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="web"
            checked={formData.web}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Web</label>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="app"
            checked={formData.app}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">App</label>
        </div>
      </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full mt-2 bg-gray-300 text-black font-semibold py-2 rounded hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalForm;
