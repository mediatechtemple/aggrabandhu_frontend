


// initialPermissions,
const PermissionsDialog = ({ open, onClose,
  permissions, handleCheckboxChange, 
  selectedAdmin,
  handleSubmitPermissions
 }) => {
 
// !initialPermissions &&  return;



  // console.log(initialPermissions);
  console.log(permissions);
  // console.log(handleCheckboxChange)
  console.log(selectedAdmin)

  return (
   
      <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2800] ${open ? '' : 'hidden'}`}>
      <div className="bg-white  p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Manage Permissions for {selectedAdmin}</h3>

        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Page</th>
              <th className="border border-gray-300 px-4 py-2">View</th>
              <th className="border border-gray-300 px-4 py-2">Add</th>
              <th className="border border-gray-300 px-4 py-2">Edit</th>
              <th className="border border-gray-300 px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(permissions[selectedAdmin]).map(page => (
              <tr key={page}>
                <td className="border border-gray-300 px-4 py-2">{page}</td>
                {["view", "add", "edit", "delete"].map(permissionType => (
                  <td key={permissionType} className="border border-gray-300 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={permissions[selectedAdmin]?.[page]?.[permissionType]}
                      onChange={(e) => handleCheckboxChange( e, page, permissionType)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            Close
          </button>
          <button onClick={handleSubmitPermissions} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionsDialog;
