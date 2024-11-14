"use client";

import { useEffect, useState } from "react";


const ShowMemberList = ({memberRights,handleEditMemberList,


  handleGetMemberList,
  handleDeleteMemberList,
  memberList,
  loading,
  deleting,


}) => {
  
  

  // const handleEditMemberList =  (item) => {
  //   console.log(item);
  // }




  useEffect(() => {
    handleGetMemberList();
  }, []); 

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center mt-20">
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <div className="mt-20 overflow-x-auto">
      <table className="min-w-full bg-white border">
        <caption className="text-lg font-semibold mb-4">A list of Member</caption>
        <thead>
          <tr className="text-left">
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Designation</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {memberList && memberList.length > 0 && memberList.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={`https://backend.aggrabandhuss.org${item.image}`}
                  alt={item.name}
                />
              </td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.designation}</td>
              <td className="border px-4 py-2 text-center">

              {
                   memberRights['Add-Member-List Management']?.['add'] &&
                  <button
                  onClick={() => handleEditMemberList(item)}
                  disabled={deleting === item.id}
                  className={`px-4 m-1 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:ring focus:ring-red-500 focus:outline-none ${
                    deleting === item.id ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {deleting === item.id ? "Editing..." : "Edit"}
                </button>
                }




                {
                   memberRights['Add-Member-List Management']?.['add'] &&
                  <button
                  onClick={() => handleDeleteMemberList(item.id)}
                  disabled={deleting === item.id}
                  className={`px-4 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 focus:ring focus:ring-red-500 focus:outline-none ${
                    deleting === item.id ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {deleting === item.id ? "Deleting..." : "Delete"}
                </button>}
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowMemberList;