// hooks/useFetchMembers.js
import { useEffect, useState } from 'react';

const useFetchMembers = (url,token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloadData1,setDownloadData1]=useState([]);

  const [page,setPage]=useState(1);
  const [totalPage,setTotalPage]=useState(1)

  // const columns = [
  //   { key: 'SNo', label: 'S.No' },
  //   { key: 'id', label: 'Member Id' },
  //   { key: 'referFrom', label: 'Referred Member' },
  //   { key: 'referFrom', label: 'Referred Name' },
  //    { key: 'referFrom', label: 'Referred Photo' },
  //   // { key: 'reference_id', label: 'Reference Id' },
  //   { key: 'name', label: 'Member Name' },
  //   { key: 'Member Photo', label: 'Member Photo' },
  //   { key: 'father_name', label: 'Father Name' },
  //   { key: 'mobile_no', label: 'Phone No' },
  //   { key: 'address', label: 'Address' },
  //   { key: 'referCount', label: 'Total Referred' },
  // ];
// done




const fetchData = async (pageSize,page=1) => {
  setLoading(true);
  setError(null); // Reset error state

  try {
    const Htoken=JSON.parse( localStorage.getItem('user')).token
    const response = await fetch(`${url}?pageSize=${pageSize}&&page=${page}`,{
      method:'GET',
      headers:{
        'Authorization':`Bearer ${Htoken}`
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    setData(result.members); // Assuming the data is in the "data" field of the response
    setTotalPage(result.pagination.totalPages);
    setPage(result.pagination.page);

    console.log(result);
    
    const downloadData = result.members.map(item => ({
      'S.No':item.id,
      'Member Id': item.reference_id,
      'Referred Member':item.referFrom,
      'Referred Name':item.refer_name,
      // 'Referred From':item.referFrom,
      // mobile_no: item.father_name,
      "Member Name":item.name,
      'Father Name':item.father_name,
      "Phone No": item.mobile_no,  
       Address: item.address,
    //  'Total Referred':item.referCount,
    }));
    console.log(downloadData);
    setDownloadData1(downloadData)
    // setPage();
    // setTotalPage();

  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchData(100);
  }, []);
  

  return { data, loading, error ,downloadData1,page,totalPage,fetchData};
};

export default useFetchMembers;
