"use client";
import React, { useState } from "react";
import ShowMemberList from "./ShowMemberList";
// import { Label } from "../ui/label";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";

const AddMemberList = ({memberRights}) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  // const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEdit,setIsEdit]=useState(null);


  const [memberList, setMemberList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(null); 

  const handleGetMemberList = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(`https://backend.aggrabandhuss.org/api/designation`);
      const response = await apiResponse.json();
      setMemberList(response);
    } catch (error) {
      console.error("Error fetching member data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMemberList = async (id) => {
    setDeleting(id); 
    try {
      const apiResponse = await fetch(`https://backend.aggrabandhuss.org/api/designation/${id}`, {
        method: "DELETE",
      });
      if (!apiResponse.ok) {
        console.log("Network response was not ok");
        return;
      }
      // Directly update the member list state after deletion
      setMemberList((prevList) => prevList.filter((member) => member.id !== id));
    } catch (error) {
      console.log("Error deleting member:", error);
    } finally {
      setDeleting(null); 
    }
  };




  const handleImageChange = (e) => {
    setImageUrl(null);
    const file = e.target.files[0];
    setImage(file);
  };

  const handleEditMemberList =  (item) => {
    console.log(item);
    setImage(null);
    setIsEdit(item);
    setImageUrl(`https://backend.aggrabandhuss.org`+item.image);
    setName(item.name);
    setDesignation(item.designation);
  }

  const ClearFormData = ()=>{
    setImage(null);
    setName('');
    setDesignation('');
    setIsEdit(null);
  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    
    if (!image || !name) {
      setMessage("Please add an image and a name.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    formData.append("designation", designation);
    try {
      const response = await fetch(
        "https://backend.aggrabandhuss.org/api/designation",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok) {
        setMessage("Image uploaded successfully!");
        setIsSuccess(true);
        setImage(null);
        setName("");
        setDesignation("");
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
    }
  };

  const handelEditSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Please add an image and a name.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    image && formData.append("file", image);
    formData.append("name", name);
    formData.append("designation", designation);
    try {
      const response = await fetch(
        "https://backend.aggrabandhuss.org/api/designation/update/"+isEdit.id,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (response.ok) {
        setMessage("Image uploaded successfully!");
        setIsSuccess(true);
        setImage(null);
        setName("");
        setDesignation("");
        setImageUrl('');
       
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
      handleGetMemberList();
    }
  };


  return <>
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-10 mt-30">
      <h2 className="text-2xl font-extrabold text-green-600 mb-6 text-center">
        Add Member
      </h2>

      <form onSubmit={isEdit ? handelEditSubmit : handelSubmit} className="space-y-6">
        <div className="flex flex-col items-center">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Upload Image
          </label>
          <input
            // key={image || "file-input"}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500"
          />
           {/* Image preview */}
        </div>
      {imageUrl && isEdit && (
        <div className="mt-1">
          <img
            src={imageUrl}
            alt="Image Preview"
            className="w-32 h-32  object-cover border border-gray-300 rounded-lg"
          />
        </div>
      )}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="Enter Full Name"
          />

         
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Designation
          </label>
          <input
            type="text"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            placeholder="Enter Designation"
          />
        </div>

        <div className="text-center">
        <button
            type="button"
            onClick={ClearFormData}
            className={`px-6 py-2 text-white bg-green-600 rounded-full hover:bg-green-700 focus:ring focus:ring-green-500 focus:outline-none }`}
          >
            Clear
          </button>


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
      <ShowMemberList 
      memberRights={memberRights} 
      handleEditMemberList={handleEditMemberList}


      handleGetMemberList={handleGetMemberList}
      handleDeleteMemberList={handleDeleteMemberList}
      memberList={memberList}
      loading={loading}
      deleting={deleting}
      />
    </div>
  </>
};

export default AddMemberList;
