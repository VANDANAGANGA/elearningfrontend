import React, { useState,useEffect } from 'react'
import { VscFileSubmodule } from "react-icons/vsc";
import { MdAssignment } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { TbLanguageHiragana } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import axios from 'axios';
import { useSelector } from 'react-redux';


function StudentAboutCourse() {
  const [about,setAbout]=useState({})

  const course = useSelector((store) => store.course.course);
  
  useEffect(()=>{
    
    axios.get('http://localhost:8000/api/studentcoursedetails/',{ params: { id: course } })
    .then((response) => {
      setAbout(response.data);
      console.log('about:',response.data)
    })
    .catch((error) => {
      console.error('Error fetching modules:', error);
    });
}, [course]);
  return (
    <div>
       <div className='m-2 p-2 text-black'>
      <div className='flex m-4'>
      <span className='text-5xl'><VscFileSubmodule /></span>   
      <h4 className='p-2 text-3xl'>Modules:{about.num_modules}</h4>
      </div>
      <div className='flex m-4 '>
       <span className='text-5xl'><MdAssignment /></span>
       <h4 className='p-2 text-3xl'>Assignments:{about.num_assignments}</h4>
       </div>
       <div className='flex m-4'>
       <span className='text-5xl'><MdQuiz/></span>
       <h4 className='p-2 text-3xl'>Quiz:{about.num_quizzes}</h4>
       </div>
       <div className='flex m-4'>
       <span className='text-5xl'><TbLanguageHiragana/></span>
       <h4 className='p-2 text-3xl'>Language: English</h4>
       </div>
       <div>
        <h4>{about.about}</h4>
       </div>
       </div>
       {about.teacher && (
        
       <div className='flex flex-col items-center justify-center mb-4'>
        <h1 className='font-semibold text-black text-lg mb-2'> About Teacher</h1>
        <div className='flex items-center space-between'>
         <div className='bg-black w-[200px] h-[200px] mr-6 '>
         <img src={`http://localhost:8000${about.teacher.profile_pic}`} alt="Teacher Profile" className="profile-pic"  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
         </div>
         <div className='text-black text-lg ml-6'>
         <h4 className='text-xl'>{about.teacher.full_name}</h4>
         <h4 className=' text-xl'> {about.teacher.job_role}</h4>
         <h4 className=' text-xl'> {about.teacher.years_of_experience} years of experience</h4>
         <h4 className=' text-xl'> ex.{about.teacher.company_name}</h4>
         <h4 className=' text-xl'> {about.teacher.about}</h4>
         </div>
         </div>
      </div> 
      )}

    </div>
  )
}

export default StudentAboutCourse
