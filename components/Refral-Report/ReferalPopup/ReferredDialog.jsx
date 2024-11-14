'use client';
import DownloadCSVButton from '@/components/DataConverters/DownloadCSVButton';
import DownloadPDFButton from '@/components/DataConverters/DownloadPDFButton';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const column = [
  { key: 'SNo', value: 'S.No' },
  { key: 'id', value: 'Member Id' },
  { key: 'name', value: 'Member Name' },
  { key: 'profileUrl', value: 'Member Photo' },
  { key: 'father_name', value: 'Father Name' },
  { key: 'mobile_no', value: 'PhoneNo' },
  { key: 'address', value: 'Address' },
];

const ReferredDialog = ({ id,referDialogCloseHandler }) => {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortConfig, setSortConfig] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const[downloadData,setDownloadData]=useState([]);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  function getIcon(key) {
    if (!sortConfig || sortConfig.key !== key) {
      return '↑↓';
    }
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  }

  function handleSort(key) {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }

  const sortedData = members.sort((a, b) => {
    if (!sortConfig) return 0;
    return sortConfig.direction === 'asc'
      ? a[sortConfig.key] < b[sortConfig.key] ? -1 : 1
      : a[sortConfig.key] > b[sortConfig.key] ? -1 : 1;
  });

  const filteredData = sortedData.filter((member) =>
    Object.values(member).some((value) =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const dateFilterData = filteredData.filter((item) => {
    const itemDate = new Date(item.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return itemDate >= start && itemDate <= end;
    } else if (start) {
      return itemDate >= start;
    } else if (end) {
      return itemDate <= end;
    } else {
      return true; // No filter applied, include all items
    }
  });




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://backend.aggrabandhuss.org/api/member/referal/${id}`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setMembers(data);
        console.log(data);
        const downloadData = data.map(item => ({
          id: item.id,
          name: item.name,
          mobile_no: item.father_name,
          dob: item.mobile_no,
          address: item.address,
          // profession: item.pro,
        }));
        setDownloadData(downloadData)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
  
    <div onClick={referDialogCloseHandler} className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-[2800]">
      <div onClick={(e) => e.stopPropagation()} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] z-[1401] overflow-y-auto">
      
        <div>
          <p className="w-full p-2 bg-blue-500 text-white text-center text-2xl font-serif">Referred Members</p>
        </div>
        <div>
          <DownloadCSVButton data={downloadData} filename="my_data.csv" />
          <DownloadPDFButton data={downloadData} filename="table_data.pdf" />
        </div>

        <div className="flex justify-between mt-2">
        <div className="flex space-x-4 mb-4">
          <p className='text-center p-2 '>Date-Range:</p>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded p-2"
          placeholder="Start Date"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded p-2"
          placeholder="End Date"
        />
      </div>


          <input
            type="text"
            placeholder="Search referred member"
            className="p-3 w-80 max-w-md rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
            value={searchTerm}
            onChange={(e) => {setSearchTerm(e.target.value)}}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                {column.map(({ key, value }) => (
                  <th
                    key={key}
                    onClick={() => key !== 'SNo' && handleSort(key)}
                    className="bg-blue-500 text-white border border-gray-300 p-3 cursor-pointer"
                  >
                    <span>{value}</span>
                    {key !== 'SNo' && <span>{getIcon(key)}</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dateFilterData.map((item, index) => (
                <tr key={item.id}>
                  <td className="p-2 text-center border">{index + 1}</td>
                  <td className="p-2 text-center border">{item.reference_id}</td>
                  <td className="p-2 text-center border">{item.name}</td>
                  <td className="flex justify-center text-center border">
                    {item.profileUrl && (
                      <Image src={`https://backend.aggrabandhuss.org${item.profileUrl}`} width={80} height={60} className="h-16 text-center" alt="Member Profile" />
                    )}
                  </td>
                  <td className="p-2 text-center border">{item.father_name}</td>
                  <td className="p-2 text-center border">{item.mobile_no}</td>
                  <td className="p-2 text-center border">{item.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default ReferredDialog;
