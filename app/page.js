"use client";
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
      <h1>Here Dahboard will come</h1>
    </div>
  )
}

export default Home
