'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Profile = ({ memberId }) => {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        const response = await fetch(`https://agerbandhu-production.up.railway.app/api/member/detail?key=id&&value=121`);
        if (!response.ok) {
          throw new Error("Failed to fetch member details");
        }
        const data = await response.json();
        console.log(data);
        setMember(data[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberDetails();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!member) return <p className="text-center text-gray-500">No member data available</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Member Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-600">Basic Information</h2>
          <table className="w-full text-left table-auto">
            <tbody>
              <tr>
                <th className="pr-4 py-2 text-gray-500">Member ID:</th>
                <td>{member.id}</td>
              </tr>
              <tr>
                <th className="pr-4 py-2 text-gray-500">Reference ID:</th>
                <td>{member.reference_id}</td>
              </tr>
              <tr>
                <th className="pr-4 py-2 text-gray-500">Date of Joining:</th>
                <td>{new Date(member.createdAt).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th className="pr-4 py-2 text-gray-500">Name:</th>
                <td>{member.name}</td>
              </tr>
              <tr>
                <th className="pr-4 py-2 text-gray-500">Father&apos;s Name:</th>
                <td>{member.father_name}</td>
              </tr>
              <tr>
                <th className="pr-4 py-2 text-gray-500">Mother&apos;s Name:</th>
                <td>{member.mother_name}</td>
              </tr>
              <tr>
                <th className="pr-4 py-2 text-gray-500">Date of Birth:</th>
                <td>{new Date(member.dob).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <Image
            src={`https://agerbandhu-production.up.railway.app${member.profileUrl || ''}`}
            alt="Profile"
            width="200"
            height="200"
            className="rounded-full shadow-md"
          />
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-gray-600">Additional Details</h2>
        <table className="w-full text-left table-auto">
          <tbody>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Profession:</th>
              <td>{member.profession}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Address:</th>
              <td>{member.address}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">District:</th>
              <td>{member.district}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">State:</th>
              <td>{member.state}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Mobile No:</th>
              <td>{member.mobile_no}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Email:</th>
              <td>{member.email}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Aadhar No:</th>
              <td>{member.aadhar_no}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Pan Card No:</th>
              <td>{member.id_no}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Marital Status:</th>
              <td>{member.marital_status}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Disease:</th>
              <td>{member.disease ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Pincode:</th>
              <td>{member.pincode}</td>
            </tr>
            <tr>
              <th className="pr-4 py-2 text-gray-500">Status:</th>
              <td>{member.status}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold text-gray-600">Documents</h2>
        <div className="flex justify-center gap-6 mt-6">
          {member.profileUrl && (
            <Image
              src={`https://agerbandhu-production.up.railway.app${member.profileUrl}`}
              alt="Profile Image"
              width={150}
              height={150}
              className="rounded-lg shadow-md"
            />
          )}
          {member.aadharUrl && (
            <Image
              src={`https://agerbandhu-production.up.railway.app${member.aadharUrl}`}
              alt="Aadhar"
              width={150}
              height={150}
              className="rounded-lg shadow-md"
            />
          )}
          {member.diseaseUrl && (
            <Image
              src={`https://agerbandhu-production.up.railway.app${member.diseaseUrl}`}
              alt="Disease"
              width={150}
              height={150}
              className="rounded-lg shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
