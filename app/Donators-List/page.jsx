import React from 'react';

const page = () => {
  const donators = [
    {
      id: 4,
      member_id: 20,
      donation_id: 1,
      amount: "300.00",
      donation_date: "2024-10-21T09:42:25.000Z",
      transaction_id: "NX24080208582192042918771",
      transaction_file: "/uploads/payments/4/screenshot.jpg",
      payment_method: "paytm",
      status: "Approved",
      Member: {
        id: 20,
        name: "Sanjeev Agrawal",
        email: "sanjeev@example.com", // Added email
        state: "Uttar Pradesh",
        district: "Agra"
      }
    }
    // Add more dummy data if needed
  ];

  return (
    <div className="p-5">
      <h2 className="text-3xl text-center font-bold mb-4 bg-blue-500 text-white ">Donators List</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-spacing-1  bg-blue-500 text-white">ID</th>
            <th className="py-2 px-4 border border-spacing-1  bg-blue-500 text-white">Member Name</th>
            <th className="py-2 px-4 border border-spacing-1  bg-blue-500 text-white">Email</th> {/* Added Email Column */}
            <th className="py-2 px-4 border border-spacing-1  bg-blue-500 text-white">Amount</th>
            <th className="py-2 px-4 border border-spacing-1  bg-blue-500 text-white">Donation Date</th>
            <th className="py-2 px-4 border border-spacing-1  bg-blue-500 text-white">Transaction ID</th>
            <th className="py-2 px-4 border border-spacing-1  bg-blue-500 text-white">Payment Method</th>
            <th className="py-2 px-4 border border-spacing-1  bg-blue-500 text-white">Status</th>
            <th className="py-2 px-4 border border-spacing-1  bg-blue-500 text-white">State</th>
            <th className="py-2 px-4 border border-spacing-1  bg-blue-500 text-white">District</th>
          </tr>
        </thead>
        <tbody>
          {donators.map((donator) => (
            <tr key={donator.id}>
              <td className="py-2 px-4 border border-spacing-1 ">{donator.id}</td>
              <td className="py-2 px-4 border border-spacing-1 ">{donator.Member.name}</td>
              <td className="py-2 px-4 border border-spacing-1 ">{donator.Member.email || 'N/A'}</td> {/* Display email or 'N/A' */}
              <td className="py-2 px-4 border border-spacing-1 ">{donator.amount}</td>
              <td className="py-2 px-4 border border-spacing-1 ">{new Date(donator.donation_date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border border-spacing-1 ">{donator.transaction_id}</td>
              <td className="py-2 px-4 border border-spacing-1 ">{donator.payment_method}</td>
              <td className="py-2 px-4 border border-spacing-1 ">{donator.status}</td>
              <td className="py-2 px-4 border border-spacing-1 ">{donator.Member.state}</td>
              <td className="py-2 px-4 border border-spacing-1 ">{donator.Member.district}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
