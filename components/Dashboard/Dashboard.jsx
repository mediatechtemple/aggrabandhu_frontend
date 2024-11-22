// Dashboard.js
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Dashboardcomp = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://backend.aggrabandhuss.org/api/dashboard'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <h1 className="text-red-500 text-center">{error}</h1>;
  }

  if (!data) {
    return <h1 className="text-blue-500 text-center">Loading...</h1>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <Card
        title="Total Registered Members"
        value={data.registeredMembers}
        bgColor="bg-blue-500"
      />
      <Card
        title="Total Active Members"
        value={data.ActiveMember}
        bgColor="bg-green-500"
      />
      <Card
        title="Total Beneficiaries"
        value={data.BeneficaryCount}
        bgColor="bg-purple-500"
      />
      <Card
        title="Total Beneficiaries Amount"
        value={`₹${data.totalDonationReceive}`}
        bgColor="bg-yellow-500"
      />
    </div>
  );
};

export default Dashboardcomp;
