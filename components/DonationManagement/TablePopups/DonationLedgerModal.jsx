import DownloadCSVButton from "@/components/DataConverters/DownloadCSVButton";
import DownloadPDFButton from "@/components/DataConverters/DownloadPDFButton";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const BankDetailPopup = ({ledgerData, handleLedgerClose}) => {
    const [error,setError]=useState(null);
    const [DonatorsData,setDonatorsData]=useState([]);
    const [loading,setLoading]=useState(true);
    console.log(DonatorsData);
    
    async function getData(){
        try{
            const response= await fetch(`https://backend.aggrabandhuss.org/api/donationreceive/getOne/${ledgerData.id}`);
            if(!response.ok){
                throw new Error('got one error here');
            }
            const data=await response.json();
            setLoading(false);
            console.log(data.data);
            setDonatorsData(data.data);
        } catch (err) {
            setError(err.message);
        }
    }

    useEffect(()=>{
        getData();
    },[ledgerData.id])

    if((DonatorsData.length==0) && loading){
        return <p>Loading...</p>
    }

  return (
    <div onClick={handleLedgerClose} className="fixed inset-0 text-black bg-gray-800 bg-opacity-50 flex justify-center items-center z-[2800]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 z-[2800] max-h-[60vh] overflow-y-auto">
        <div>
            <DownloadCSVButton data={DonatorsData}/>
            <DownloadPDFButton data={DonatorsData}/>
        </div>
        <table min-w-full table-auto border-collapse border border-gray-300 text-black text-center>
            <thead>
                <tr>
                    <th className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2">Sr</th>
                    <th className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2">Name</th>
                    <th className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2">Email</th>
                    <th className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2">State</th>
                    <th className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2">Donation Date</th>
                    <th className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2">Transaction Id</th>
                    <th className="border bg-blue-500 text-white text-center border-gray-300 px-4 py-2">Transaction File</th>
                   
                </tr>
            </thead>
            <tbody>
                {
                  DonatorsData.map((item,index)=>{
                   return <tr key={index}>
                        <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.Member.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.Member.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.Member.state}</td>
                        <td className="border border-gray-300 px-4 py-2">{new Date(item.donation_date).toLocaleDateString('en-GB')}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.transaction_id}</td>
                        <td className="border border-gray-300 px-4 py-2">
                            <button
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                            >View</button>
                        </td>
                        
                    </tr>
                  })  
                }
            </tbody>
        </table>
        {DonatorsData.length==0 && <h1 className="text-center text-red-500"> No data available!</h1>}
      </div>
    </div>
  );
};

export default BankDetailPopup;
