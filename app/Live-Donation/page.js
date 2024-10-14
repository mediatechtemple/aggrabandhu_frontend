import React from 'react';

const Page = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-spacing-1 w-full">
        <thead>
          <tr>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">S.No</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Member ID</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Name</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Death Date</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Death Certificate</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Min Donate Amount</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Transaction ID</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Donated Amount</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Screenshot</th>
            <th className="bg-blue-500 text-white p-2 border border-spacing-1 border-gray-400">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 text-center border">1</td>
            <td className="p-2 text-center border">1234</td>
            <td className="p-2 text-center border">John Doe</td>
            <td className="p-2 text-center border">01-01-2022</td>
            <td className="p-2 text-center border">
              <a href="#" className="text-blue-500 underline">View</a>
            </td>
            <td className="p-2 text-center border">$500</td>
            <td className="p-2 text-center border">
                <input type="text" placeholder='transaction no' className="border p-1" />
            </td>
            <td className="p-2 text-center border">
                <input type="text" placeholder='donated amount' className="border p-1"/>
            </td>
            <td className="p-2 text-center border">
                <input type="file" className="border p-1"/>
            </td>
            <td className="p-2 text-center border">
              <button className="bg-green-500 text-white px-4 py-2 rounded">Approve</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
