"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { Loading } from "@/Loading";
// import urlApi from "@/utils/api";

const ShowGallery = () => {
  const router = useRouter();
  const [galleryList, setGalleryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const urlApi ='https://backend.aggrabandhuss.org/api';
  const handleGalleryList = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(`${urlApi}/gallery`);
      const response = await apiResponse.json();
      setGalleryList(response);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGallery = async (getCurrentID) => {
    try {
      const apiResponse = await fetch(`${urlApi}/gallery/${getCurrentID}`, {
        method: "DELETE",
      });
      if (!apiResponse.ok) {
        throw new Error("Network response was not ok");
      } else router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGalleryList();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-gray-50 min-h-full">
      <div className="flex items-center space-x-6 animate-pulse">
        <div className="h-16 w-16 rounded-full bg-gray-300"></div>

        <div className="space-y-3">
          <div className="h-5 w-[280px] rounded-md bg-gray-300"></div>
          <div className="h-4 w-[240px] rounded-md bg-gray-300"></div>
        </div>
      </div>

      <div className="text-gray-500 text-lg font-semibold animate-pulse">
        Loading...
      </div>
    </div>
      </div>
    );
  }

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
                <button
                  onClick={() => handleDeleteGallery(item.id)}
                  disabled={loading}
                  className={`px-6 py-2 text-white bg-red-600 rounded-full hover:bg-red-700 focus:ring focus:ring-red-500 focus:outline-none ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowGallery;
