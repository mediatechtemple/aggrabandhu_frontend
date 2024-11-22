"use client";
import Dashboardcomp from '@/components/Dashboard/Dashboard';
import Dashboard from '@/components/Dashboard/Dashboard';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [isLogin,setIsLogin]=useState(false);
  useEffect(()=>{
    const user=window.localStorage.getItem('user');
    if(!user){
      window.location.href="/Login"
    }

  },[])
  return (
    <div>
      <Dashboardcomp/>
    </div>
  )
}

export default Home
