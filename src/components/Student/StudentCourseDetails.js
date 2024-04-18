import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import instance from '../../routes/axios';

function StudentCourseDetails() {
   const [data,setData]= useState('')
   
  const course = useSelector((store) => store.course.course);
  console.log(course)

  useEffect(() => {
    if (course) {
      instance.get('coursedetails/', { params: { id: course } })
        .then(response => {
          console.log('course',response.data);
          setData(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [course]); 


  return (
    <section className='w-full'>
      <div className='text-center '>
        <h1 className='text-center text-black text-4xl font-extrabold' >{data.title}</h1>
      </div>
      <div className='m-8 justify-center text-center'>
        <button className='m-2 px-2 rounded-full bg-emerald-400'><Link to=''>About</Link></button>
        <button className='m-2 px-2 rounded-full bg-emerald-400'><Link to='modules'>Modules</Link></button>
        <button className='m-2 px-2 rounded-full bg-emerald-400'><Link to='assignments'>Assignments</Link></button>
        <button className='m-2 px-2 rounded-full bg-emerald-400'><Link to='quiz'>Quiz</Link></button>
        <button className='m-2 px-2 rounded-full bg-emerald-400'><Link to='comments'>Comments</Link></button>
        <button className='m-2 px-2 rounded-full bg-emerald-400'><Link to='certificate'>Certificate</Link></button>
      </div>
     <Outlet/>
    </section>
    
  )
}

export default StudentCourseDetails
