import React from 'react';

const Dashboard = () => {
  // Dummy data for the dashboard metrics
  const totalDonationAmount = 25000; // in your currency
  const totalActiveMembers = 150;
  const totalBeneficiaries = 1200;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Card for Total Donation Amount */}
      <div className="flex flex-col items-center justify-center bg-blue-500 text-white p-8 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-2xl font-semibold">Total Donation Amount</h2>
        <p className="text-4xl font-bold mt-4">₹{totalDonationAmount.toLocaleString()}</p>
      </div>

      {/* Card for Total Active Members */}
      <div className="flex flex-col items-center justify-center bg-green-500 text-white p-8 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-2xl font-semibold">Total Active Members</h2>
        <p className="text-4xl font-bold mt-4">{totalActiveMembers}</p>
      </div>

      {/* Card for Total Beneficiaries */}
      <div className="flex flex-col items-center justify-center bg-purple-500 text-white p-8 rounded-lg shadow-md w-full md:w-1/3">
        <h2 className="text-2xl font-semibold">Total Beneficiaries</h2>
        <p className="text-4xl font-bold mt-4">{totalBeneficiaries}</p>
      </div>
    </div>
  );
};

export default Dashboard;
