import React from 'react';

const Dashboard = async() => {
  // Dummy data for the dashboard metrics

  const response=await fetch('https://backend.aggrabandhuss.org/api/dashboard');
  if(!response.ok){
    return <h1>Data Feching Error</h1>
  }

  const data=await response.json();
  console.log(data);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Card for Total Donation Amount */}
      <div className="flex flex-col items-center justify-center bg-blue-500 text-white p-8 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-2xl font-semibold">Total Register Member</h2>
        <p className="text-4xl font-bold mt-4">{data.registeredMembers}</p>
      </div>

      {/* Card for Total Active Members */}
      <div className="flex flex-col items-center justify-center bg-green-500 text-white p-8 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-2xl font-semibold">Total Active Members</h2>
        <p className="text-4xl font-bold mt-4">{data.ActiveMember}</p>
      </div>

      {/* Card for Total Beneficiaries */}
      <div className="flex flex-col items-center justify-center bg-purple-500 text-white p-8 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-2xl font-semibold">Total Beneficiaries</h2>
        <p className="text-4xl font-bold mt-4">{data.BeneficaryCount}</p>
      </div>

      <div className="flex flex-col items-center justify-center bg-purple-500 text-white p-8 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-2xl font-semibold">Total Beneficiaries Amount</h2>
        <p className="text-4xl font-bold mt-4">₹{data.totalDonationReceive}</p>
      </div>
    </div>
  );
};

export default Dashboard;
