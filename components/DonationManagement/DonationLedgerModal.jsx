import React, { useEffect, useState } from 'react';

const DonationLedgerModal = ({ open, handleClose, ledgerId }) => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && ledgerId?.id) { // Fetch data only when modal is open and ledgerId is valid
      const fetchData = async () => {
        try {
          const response = await fetch(`https://backend.aggrabandhuss.org/api/donationreceive/getOne/${ledgerId}`);
          if (!response.ok) {
            throw new Error('Error fetching data');
          }
          const data = await response.json();
          setDonations(data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchData();
    } else if (!ledgerId?.id) {
      setDonations([]); // Clear donations if ledgerId is null or invalid
      setError('Invalid ledger ID');
    }
  }, [open, ledgerId]);

  return (
    <div className={`fixed inset-0 text-black bg-gray-800 bg-opacity-50 flex justify-center items-center z-[2800] ${open ? '' : 'hidden'}`}>
      <div className="bg-white w-full max-w-3xl mx-auto rounded-lg shadow-lg p-6 z-[2800] max-h-[90vh] overflow-y-auto">
        
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Donation Ledger Details</h2>
          <button
            onClick={handleClose}
            className="text-red-500 font-bold hover:text-red-700"
          >
            Close
          </button>
        </div>

        {error ? (
          <div className="text-red-500 mb-4">Error: {error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2">Sr.</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">State</th>
                  <th className="px-4 py-2">Donation Date</th>
                  <th className="px-4 py-2">Payment Method</th>
                  <th className="px-4 py-2">Transaction ID</th>
                  <th className="px-4 py-2">Transaction File</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation, index) => (
                  <tr key={donation.id} className="border-b">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{donation.Member.name}</td>
                    <td className="px-4 py-2">{donation.Member.email}</td>
                    <td className="px-4 py-2">{donation.Member.state}</td>
                    <td className="px-4 py-2">
                      {new Date(donation.donation_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{donation.payment_method}</td>
                    <td className="px-4 py-2">{donation.transaction_id}</td>
                    <td className="px-4 py-2">
                      <a
                        href={donation.transaction_file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View Receipt
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationLedgerModal;
