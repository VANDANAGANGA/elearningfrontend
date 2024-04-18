import React, { useState,useEffect } from 'react'
import { VscFileSubmodule } from "react-icons/vsc";
import { MdAssignment } from "react-icons/md";
import { MdQuiz } from "react-icons/md";
import { TbLanguageHiragana } from "react-icons/tb";
import { MdDateRange } from "react-icons/md";
import { IoMdPricetags } from "react-icons/io";
import axios from 'axios';
import { useSelector } from 'react-redux';


function AboutCourse() {
  const [about,setAbout]=useState({})

  const course = useSelector((store) => store.course.course);
  useEffect(()=>{
    
    axios.get('http://localhost:8000/api/coursedetails/',{ params: { id: course } })
    .then((response) => {
      setAbout(response.data);
      console.log(response.data)
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
      <h4 className='p-2 text-3xl'>Modules:<span>{about.num_modules}</span></h4>
      </div>
      <div className='flex m-4 '>
       <span className='text-5xl'><MdAssignment /></span>
       <h4 className='p-2 text-3xl'>Assignments:<span>{about.num_assignments}</span></h4>
       </div>
       <div className='flex m-4'>
       <span className='text-5xl'><MdQuiz/></span>
       <h4 className='p-2 text-3xl'>Quiz:<span>{about.num_quizzes}</span></h4>
       </div>
       <div className='flex m-4'>
       <span className='text-5xl'><TbLanguageHiragana/></span>
       <h4 className='p-2 text-3xl'>Language: <span>English</span></h4>
       </div>
       <div className='flex m-4'>
       <span className='text-5xl'><MdDateRange/></span>
       <h4 className='p-2 text-3xl'>Created_at:<span className='ml-2'>{about.created_at}</span></h4>
  
       </div>
       <div>
        <h4>{about.about}</h4>
       </div>
       </div>
      

    </div>
  )
}

export default AboutCourse
