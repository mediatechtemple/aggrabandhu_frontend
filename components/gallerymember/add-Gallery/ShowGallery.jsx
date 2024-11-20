"use client";

import { useEffect, useState } from "react";
// import { Loading } from "@/Loading";
// import urlApi from "@/utils/api";

const ShowGallery = ({memberRights,
  galleryList,
  loading,
  deleting,
  handleDeleteGallery,
  token

}) => {
  

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
        <caption className="text-lg font-semibold mb-4">A list of Gallery</caption>
        <thead>
          <tr className="text-left">
            <th className="border px-4 py-2">Id</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {galleryList.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">
                <img
                  src={`https://backend.aggrabandhuss.org${item.url}`}
                  alt={item.description}
                  className="w-44 h-36 rounded-md"
                />
              </td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">
                {
                  memberRights['Gallery Management']?.['add'] &&
                  <button
                  onClick={() => handleDeleteGallery(item.id)}
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

export default ShowGallery;