import React, { useState } from 'react'
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import instance from '../../routes/axios';
import { baseUrl } from '../../utils/urls';

function Navbar() {
  const navigate=useNavigate()
  const [profilePic,setProfilePic]=useState()
  const user = useSelector(state => state.authUser.user); // Accessing user details from Redux store
  
   const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/')
   }
   useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await instance.get('profilepic/', {
          params: { id: user?.id },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProfilePic(response.data.profile_pic);
        console.log(profilePic)
      } catch (error) {
        console.error('Error fetching profile picture:', error);
      }
    };
  
    fetchProfilePic();
  }, [user]);
  

  return (
    <header className='mt-4'>
        <nav className='flex justify-between items-center bg-white bg-opacity-20 h-[85px] px-8'>
        <div>
            <h1 style={{ margin: '-1', padding: '-1' }}  className="text-gray-500 font-[900] text-[35px] my-0 py-0">SKILLSAGE</h1>
            <span style={{ margin: '-1', padding: '-1' }}  className="text-gray-500 text-[18px] my-0 py-0 ">ONLINE EDUCATION & LEARNING</span>
          </div>
          <div className="flex items-center justify-center  h-[85px] w-[300px]" >
          <div className='pr-4'>
          <h4>Welcome {user?.name?.toUpperCase()}</h4>
         </div>
         <div> 
         < Avatar size="60" round={true} src={`${baseUrl}${profilePic}`}/>
         </div> 
         <div className='pl-4'> 
           <button onClick={handleLogout}>Logout</button>
         </div>      
          </div>
        </nav>
      </header>
  )
}

export default Navbar
