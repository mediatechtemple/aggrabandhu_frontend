'use client'
import AddGallery from '@/components/gallerymember/add-Gallery/AddGallery'
import ShowGallery from '@/components/gallerymember/add-Gallery/ShowGallery'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [memberRights,setmemberRights]=useState([]);

  useEffect(()=>{
      setmemberRights(JSON.parse( localStorage.getItem('user')).rights)
      // console.log(memberRights);
      // console.log('Asoka rights');
  },[]);
  
  return (
    <div>
       {
        memberRights['Gallery Management']?.['add'] &&
        <AddGallery
        memberRights={memberRights}
        />}
        <ShowGallery
        memberRights={memberRights}
        />
    </div>
  )
}

export default Page
