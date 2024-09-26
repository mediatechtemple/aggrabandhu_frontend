'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Profile = ({ memberId }) => {
//   const [member, setMember] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMemberDetails = async () => {
//       try {
//         const response = await fetch(`https://agerbandhu-production.up.railway.app/api/member/detail?key=id&&value=121`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch member details");
//         }
//         const data = await response.json(); // Parse the response JSON
//         console.log(data)
//         setMember(data); // Set the member 
//         console.log(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMemberDetails();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   if (!member) return <p>No member data available</p>;

//   return (
//     <div>
//       <h1>Member Details</h1>
//       <table>
//         <tr>
//           <td className="details">
//             <table style={{ width: "100%" }}>
//               <tr>
//                 <th>MemberId</th><td>{member.id}</td>
//               </tr>
//               <tr>
//                 <th>RefrenceId</th><td>{member.reference_id}</td>
//               </tr>
//               <tr>
//                 <th>Date of Joining</th>
//                 <td>{new Date(member.createdAt).toLocaleDateString()}</td>
//               </tr>
//             </table>
//           </td>
//           <td className="image">
//             <Image
//               src={`https://agerbandhu-production.up.railway.app/${member.imgUrl ? member.imgUrl :''}`}
//               alt="Profile"
//               width="100"
//               height="100"
//               style={{ borderRadius: "10%", display: "block", margin: "10px auto" }}
//             />
//           </td>
//         </tr>
//         <tr><th>Name</th><td colSpan="5">{member.name}</td></tr>
//         <tr><th>Father&aposs; Name</th><td colSpan="5">{member.father_name}</td></tr>
//         <tr><th>Mother&aposs; Name</th><td colSpan="5">{member.mother_name}</td></tr>
//         <tr><th>Date of Birth</th><td colSpan="5">{new Date(member.dob).toLocaleDateString()}</td></tr>
//         <tr><th>Profession</th><td colSpan="5">{member.profession}</td></tr>
//         <tr><th>Address</th><td colSpan="5">{member.address}</td></tr>
//         <tr><th>District</th><td colSpan="5">{member.district}</td></tr>
//         <tr><th>State</th><td colSpan="5">{member.state}</td></tr>
//         <tr><th>Mobile No</th><td colSpan="5">{member.mobile_no}</td></tr>
//         <tr><th>Email</th><td colSpan="5">{member.email}</td></tr>
//         <tr><th>Aadhar No</th><td colSpan="5">{member.aadhar_no}</td></tr>
//         <tr><th>Pan Card No</th><td colSpan="5">{member.id_no}</td></tr>
//         <tr><th>Marital Status</th><td colSpan="5">{member.marital_status}</td></tr>
//         <tr><th>Disease</th><td colSpan="5">{member.disease ? "Yes" : "No"}</td></tr>
//         <tr><th>Pincode</th><td colSpan="5">{member.pincode}</td></tr>
//         <tr><th>Status</th><td colSpan="5">{member.status}</td></tr>
//         {/* <tr><th>Nominee</th><td colSpan="5">{member.nominees[0]?.nominee || "N/A"}</td></tr>
//         <tr><th>Relationship</th><td colSpan="5">{member.nominees[0]?.relationship || "N/A"}</td></tr>
//         <tr><th>Nominee2</th><td colSpan="5">{member.nominees[0]?.nominee2 || "N/A"}</td></tr>
//         <tr><th>Relationship2</th><td colSpan="5">{member.nominees[0]?.relationship2 || "N/A"}</td></tr> */}
//       </table>

//       <div className="flex-container" style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
//         <Image 
//         src={`https://agerbandhu-production.up.railway.app${member.profileUrl ? member.profileUrl : ''}`} 
//         alt="ID" 
//         width={150}
//         height={150}
//         />
//         <Image 
//         src={`https://agerbandhu-production.up.railway.app/${member.aadharUrl ? member.aadharUrl :''}`} 
//         alt="Aadhar" 
//         width={150}
//         height={150}
//         />
//         {member.diseaseUrl && <Image src={member.diseaseUrl} alt="Disease" width="100%" height="150" />}
//       </div>
//     </div>
//   );

return <h1>Here profile will come</h1>
};

export default Profile;
