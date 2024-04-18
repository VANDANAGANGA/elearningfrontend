import React, { useState } from 'react';
import { FaCamera } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';



const StudentRegistration = () => {
  const [file, setFile] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState( 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsCi6jIpUwMzv_N0UFxaP-5t93LICCJ-1tGOppPenAG_9yxtse94yBQIBIlonSamb64x4&usqp=CAU' );
  const [mothersName,setMothersName]= useState('')
  const [fathersName,setFathersName]= useState('')
  const[houseName,setHouseName]= useState('')
  const[street,setStreet]= useState('')
  const[city,setCity]= useState('')
  const[country,setCountry]= useState('')
  const[state,setState]= useState('')
  const[education,setEducation]= useState('')
  const[specilization,setSpecilization]= useState('')
  const[pin,setPin]= useState('')
  
  const navigate= useNavigate()
  const user = useSelector(state => state.registerUser.user);
  console.log(user)
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const newFile = e.target.files[0];
    reader.onloadend = () => {
      setFile(newFile);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(newFile);
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    {
  const formData = {
  email: user.email,
  full_name: user.full_name,
  phone_number: user.phone_number,
  password: user.password,
  password2: user.password2,
  role: user.role,
  profile_pic:file,
  highest_education:education,
  specialization:specilization,
  mother_name:mothersName,
  father_name:fathersName,
  house_name:houseName,
  street:street,
  city:city,
  country:country,
  state:state,
  pin:pin,
    };
  
    axios.post('http://localhost:8000/api/register/', formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
        .then(response => {
          console.log(response.data)
          if (response.data.message=='User registration successful.') {
            console.log('iam here')
            Swal.fire({
              title: 'Registration Successful!',
              text: 'You can now log in with your new account.',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              
              navigate('/login');
            });
          } else {
            Swal.fire({
              title: 'Registration Failed!',
              icon: 'failed',
              confirmButtonText: 'Failed'})
          }
        })
        .catch(error => {
          Swal.fire({
            title: 'Registration Failed!',
            icon: 'failed',
            confirmButtonText: 'Failed'})
        });
    };
  };
  


  return (
    
         <section className="" style={{backgroundColor: '#acddde',backgroundSize: 'cover',backgroundAttachment: 'fixed',
    position: 'absolute',top: '0',left: '0',zIndex: '-1',width: '100%',paddingTop: '15%',paddingRight: '50px',color: '#fff',marginBottom: '50px'}}>
      
      <div className='m-8 flex justify-center'>
      
      <div className="max-w-screen-sm w-full border border-gray-300 rounded-md bg-white shadow-md justify-center h-full p-8">
      <div className='text-center'>
      <h1 className="text-2xl text-black font-bold"> Hello {user.full_name.toUpperCase()} </h1>
      <span className='text-black text-2xl'>Please complete your Registration</span>
      </div>
      <form  className='space-y-6 p-4' onSubmit={handleSubmit}>
      <label htmlFor="photo-upload" className="">
        <div className='flex justify-center'>
                <div className="relative w-20 h-20 overflow-hidden rounded-full  border border-black">
                    <img htmlFor="photo-upload" src={imagePreviewUrl} alt="Preview" className="w-full h-full" />
                    <div className="before:absolute before:top-1/2 before:left-1/2 before:transform-translate-x-[-50%] before:transform-translate-y-[-50%] before:content-['\f093'] before:font-size-90px before:position-absolute before:padding-top-80px before:text-center before:text-teal-500 before:width-200px before:height-200px before:border-radius-full before:opacity-0 before:transition-500 before:bg-white" ></div>
                </div>
                <div className='flex place-items-end'>
                <label htmlFor="photo-upload" className="cursor-pointer">
                      <FaCamera className="text-black" />
                      <input id="photo-upload" type="file" onChange={photoUpload} className="hidden" />
                </label>
                </div>
         </div>
      </label>
      <select
        id="education-level" name="educationLevel" value={education} onChange={(e) => setEducation(e.target.value)}
        className="mt-1  w-full p-2 border-2 text-black" >
       <option value="" className='text-black'>Select Education Level</option>
        <option className='text-black' value="sslc">SSLC</option>
        <option className='text-black' value="PlusTwo">+2</option>
        <option className='text-black' value="graduation">Graduation</option>
        <option className='text-black' value="postgraduation">Postgraduation</option>
        <option className='text-black' value="Phd">PHD</option>
      </select>
      <input className='w-full p-2 border-2 text-black' type='text' value={specilization} placeholder='Specilization' onChange={(e) => setSpecilization(e.target.value)} />
      <input className='w-full p-2 border-2 text-black' type='text' value={mothersName} placeholder='Mothers Name' onChange={(e) => setMothersName(e.target.value)} />
      <input className='w-full p-2 border-2 text-black' type='text' value={fathersName} placeholder='Fathers Name' onChange={(e) => setFathersName(e.target.value)} />
      <div className='flex'>
      <input className='w-full p-2 border-2 mr-2 text-black' type='text' value={houseName} placeholder='House Name' onChange={(e) => setHouseName(e.target.value)} />
      <input className='w-full p-2 border-2 ml-2 text-black' type='text' value={street} placeholder='Street' onChange={(e) => setStreet(e.target.value)} />
      </div>
      <div className='flex'>
    
      <input className='w-full p-2 border-2 mr-2 text-black' type='text' value={city} placeholder='City' onChange={(e) => setCity(e.target.value)} />
      <input className='w-full p-2 border-2 ml-2 text-black' type='text' value={state} placeholder='State' onChange={(e) => setState(e.target.value)} />
      </div>
      <div className='flex'>
      <input className='w-full p-2 border-2 mr-2 text-black' type='text' value={country} placeholder='Country' onChange={(e) => setCountry(e.target.value)} />
      <input className='w-full p-2 border-2 ml-2 text-black' type='text' value={pin} placeholder='Pin' onChange={(e) => setPin(e.target.value)} />
      </div>
      <div className='flex justify-center'>
      <button id='registerButton' className='px-12 py-4 bg-red text-black font-semibold border border-transparent m-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6]' 
          type='submit' disabled='' >Save</button>
      </div>     
    </form>
    </div>
    </div>
    </section>
  );
};

export default StudentRegistration;
