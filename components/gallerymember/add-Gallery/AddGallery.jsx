"use client";
import React, { useEffect, useState } from "react";
import ShowGallery from "./ShowGallery";

const AddGallery = ({memberRights}) => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const [galleryList, setGalleryList] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null); 

  const handleGalleryList = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(`https://backend.aggrabandhuss.org/api/gallery`);
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
      const apiResponse = await fetch(`https://backend.aggrabandhuss.org/api/gallery/${getCurrentID}`, {
        method: "DELETE",
      });
      
      if (!apiResponse.ok) {
        throw new Error("Network response was not ok");
      }
      setGalleryList((prevList) => prevList.filter((item) => item.id !== getCurrentID));
    } catch (error) {
      console.log(error);
    }finally{
      setDeleting(null)
    }
  };

  
  useEffect(() => {
    handleGalleryList();
  }, []);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !description) {
      setMessage("Please add an image and a description.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("description", description);

    try {
      const response = await fetch(
        "https://backend.aggrabandhuss.org/api/gallery",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        setMessage("Image uploaded successfully!");
        setIsSuccess(true);
        setImage(null);
        setDescription("");
        document.getElementById("fileInput").value = ""; // Reset file input
      } else {
        setMessage("Failed to upload the image.");
        setIsSuccess(false);
        console.log("Upload failed:", await response.json());
      }
    } catch (error) {
      setMessage("Error occurred while uploading.");
      setIsSuccess(false);
    } finally {
      setLoading(false);
      handleGalleryList();
    }
  };

  return (
    <>
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg mt-20">
      <h2 className="text-2xl font-extrabold text-green-600 mb-6 text-center">
        Add to Gallery
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="Enter Description"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700 focus:ring focus:ring-green-500 focus:outline-none ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

        {message && (
          <p
            className={`text-center text-sm mt-4 ${
              isSuccess ? "text-blue-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
    <div>
      <ShowGallery
        memberRights={memberRights}
        galleryList={galleryList}
        loading={loading}
        deleting={deleting}
        handleDeleteGallery={handleDeleteGallery}
        />
    </div>
    </>
  );
};

export default AddGallery;