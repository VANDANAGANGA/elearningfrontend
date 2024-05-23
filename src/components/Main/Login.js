import React, { useState } from 'react'
import image from '../../images/image.jpg'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../Store/authSlice';
import Swal from 'sweetalert2';
import axiosinstance from '../../routes/nonauthaxios';




const Login =()=> {
 const dispatch = useDispatch();
 const [email,setEmail]=useState('')
 const [password,setPassword]=useState('')
 const [error,setError]=useState('')
 const navigate = useNavigate();
  
 const handleRoleBasedNavigation = (access) => {
   
    try {
      const decodedToken = jwtDecode(access);
      if (decodedToken) {
        console.log(decodedToken);
        const role=decodedToken.role
        if (role==1){
          navigate('/admin')
        } else if (role==2){
          navigate('/student')
        }else if( role==3){
          navigate('/teacher')
        }
        
      } else {
        Swal.fire({
          title: 'Invalid Credentials',
          icon: 'failed',
          confirmButtonText: 'Failed'})
      }
    } catch (error) {
      Swal.fire({
        title: 'Invalid Credentials',
        icon: 'failed',
        confirmButtonText: 'Failed'})
    }
  
  }
  
 const handleSubmit=async(e)=>{
    e.preventDefault()
    if (!email || !password) {
        setError('Please fill in both email and password.');
        return;
      }
    const data={
        email,
        password
    }
    try {
        const response = await axiosinstance.post('login/',data)
  
        if (response.status === 200) {
          // Request was successful, you can handle the response data here
          const responseData = response.data;
          console.log('Login successful:', responseData);
          console.log(responseData.access)
          localStorage.setItem("token",responseData.access);
          console.log('my token',localStorage.getItem('token'))
          handleRoleBasedNavigation(responseData.access);
        } else {
          Swal.fire({
            title: 'Invalid Credentials',
            icon: 'failed',
            confirmButtonText: 'Failed'})
        }
      } catch (error) {
        console.error('An error occurred:', error);
        Swal.fire({
          title: 'Invalid Credentials',
          icon: 'failed',
          confirmButtonText: 'Failed'})
      }
  
    }
    
  return (
    <section className="" style={{backgroundColor: '#acddde',backgroundSize: 'cover',backgroundAttachment: 'fixed',
    position: 'absolute',top: '0',left: '0',zIndex: '-1',width: '100%',paddingTop: '15%',paddingRight: '50px',color: '#fff',marginBottom: '50px'}}>
    <div className="mx-auto max-w-screen-lg flex">
      
    <div className='flex m-8'>
      
            <div className="max-w-screen-xl w-full border border-gray-300 rounded-md bg-white shadow-md justify-center h-full p-8">
            <div className='text-center'>
            <h1 className="text-4xl text-black font-bold">Login
            </h1>
            <span className='text-black'> Login And Start Learning</span>
            </div>
            <form  className='space-y-6 p-4' onSubmit={handleSubmit}>
            
            <input className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' type="email" placeholder='Email Address' value={email} 
              onChange={(e) => {setEmail(e.target.value); 
              }}  />

               
        <input className='className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => { setPassword(e.target.value);
         
          }
        }required/>
       
        <span className="text-red-500">{error}</span>
          <div className='flex justify-center'>
          <button id='registerButton' className='px-12 py-4 bg-red text-black font-semibold border border-transparent m-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6]' 
          type='submit'  >Login</button>
          </div>     
             </form>
             <h4 className='text-black'>Don't have an Account? <sapn className='text-purple-700 cursor-pointer'><Link to='/register'>Sign Up</Link></sapn></h4>
             <div className='text-center pt-2'>
             <h4 className='text-black'>By Clicking  Button Above.You Agree To Our  </h4>
             <h4 className='text-black'><span className='text-purple-700'>Terms of Use</span> And <span className='text-purple-700'>Privacy Policy</span></h4>
             </div>
             </div>
        
        <div className='h-full' style={{ height: '100%'}}>
        <img src="https://www.vegaitglobal.com/media/xejht1oc/mapiq_vega_it_case_study.jpg?format=webp&quality=60" alt="" className="h-full w-full object-cover"/>
        </div>
    </div>
    </div>
    </section>
  )
}
export default Login;
