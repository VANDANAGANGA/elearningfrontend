import React, { useState } from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../routes/axios';

import axiosinstance from '../../routes/noauthinstance';
import Loader from '../Loader';
import { IoIosStar } from "react-icons/io";
import { baseUrl } from '../../utils/urls';
import { MdOutlineGroups } from "react-icons/md";



function Course() {
  const[course,setCourse]=useState([])
  const navigate= useNavigate()
  const [loading, setLoading] = useState(true);

  
  const handleViewDetails = (courseId) => {
    navigate(`/coursedetails/${courseId}`);
  };  


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };

      useEffect(() => {
        // Make an Axios GET request to your Django API endpoint
        axiosinstance.get('courses/')
          .then(response => {
            // Once data is fetched, update the 'online' state with the data
            console.log(response.data)
            setCourse(response.data)
            setLoading(false)
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);
          
  return (
    <>
       <section className="" style={{backgroundColor: '#acddde',backgroundSize: 'cover',backgroundAttachment: 'fixed',
    position: 'absolute',top: '0',left: '0',zIndex: '-1',width: '100%',paddingTop: '15%',paddingRight: '50px',color: '#fff',marginBottom: '50px'}}>
        <div className="text-center pt-18 pr-20 mb-4 ">
        <div className='text-center mb-4'>
      <h4 className='text-xl text-[#1eb2a6] font-bold'>Courses</h4>
      <h1 className='font-extrabold text-5xl pt-2'>Browse Our Online Courses</h1>
      </div>
          {loading ? (
            <Loader visible={loading} />
          ) : (
         
    course.length==0?(
      <div className='flex items-center justify-center m-4  h-96'>
      <h1 className='text-red-500 font-bold text-2xl'>No courses available at the moment. Stay tuned for exciting updates!</h1>
      </div>
    )  :( 
      <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            
           {course.map((course) => 
            <div key={course.id} className='border bg-white p-2 m-4 w-100 '>
              <div className='flex'>
                  <div className='img'>
                    <img className='w-[80px] h-[80px]  border-radius-[50%]' src={course.category} alt='' />
                  </div>
                    <div className='text'>
                    <h1 className='text-black text-xl font-bold'>{course.title}</h1>
                    </div>
              </div>
                    <div className=' flex  justify-center text-[#1eb2a6] text-xs pt-2'>
                        <i className='fa fa-star'><IoIosStar/></i>
                        <i className='fa fa-star'><IoIosStar/></i>
                        <i className='fa fa-star'><IoIosStar/></i>
                        <i className='fa fa-star'><IoIosStar/></i>
                        <i className='fa fa-star'><IoIosStar/></i>
                        <label htmlFor=''>(5.0)</label>
                    </div>


                  <div className='details'>
                 
                      <>
                        <div className='flex items-center justify-center p-2'>
                          <div className=''>
                            <img className='w-[70px] h-[70px] border-radius-[50%] rounded-full' src={`${baseUrl}${course.pic}`} alt='' />
                          </div>
                          <div className=''>
                            <h4 className='text-black'>{course.teacher}</h4>
                          </div>
                        </div>
                        <span className='text-[#1eb2a6] font-semibold mt-2'>{course.chapter} lecture({course.duration} hr)</span>
                      </>
              
                  </div>
              <div className='flex justify-center items-center'>
                <i className='text-black text-3xl pr-2 items-center'><MdOutlineGroups /></i>
                <div className=' flex items-center'>
                <h3 className='text-black pt-2'>{course.students} Learnes</h3>
                </div>
              </div>
              <button   onClick={() => handleViewDetails(course.id)} className='px-8 py-4 bg-white text-[#1eb2a6] w-full font-semibold border border-transparent my-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6]'>VIEW DETAILS !</button>
            </div>
            )}
             </div>
            )
       
       )}
    </div>
      </section>
          
    </>
  )
}

export default Course
