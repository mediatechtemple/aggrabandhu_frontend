'use client'
import AddMemberList from '@/components/gallerymember/add-memberList/AddMemberList'
import ShowMemberList from '@/components/gallerymember/add-memberList/ShowMemberList'
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
        memberRights['Add-Member-List Management']?.['add'] &&
        <AddMemberList
        memberRights={memberRights}
        />
        }

        {/* <ShowMemberList
        memberRights={memberRights}
        /> */}
    </div>
  )
}

export default Page
