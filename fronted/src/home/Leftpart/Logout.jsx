import axios from 'axios';
import React, { useState } from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from "js-cookie"
import toast from 'react-hot-toast';


const Logout = () => {
  const[loading,setLoading]= useState(false)
  const handleLogout=async()=>{
    setLoading(true)
    try{
      const res= await axios.post("/api/user/logout");
      localStorage.removeItem('chatApp');
      Cookies.remove("jwt");
      

      setLoading(false)
      toast.error("logout successfully")
      window.location.reload()
    }
    catch(error){
      console.log("error in logout", error);
    }

  }
  return (
    <div className=' h-[10vh]'>
        <div>
            <BiLogOutCircle className=' text-5xl text-white hover:bg-slate-700 duration-100 cursor-pointer rounded-full p-2 ml-2  ' onClick={handleLogout}/>
            
        </div>
    </div>
  )
}

export default Logout
