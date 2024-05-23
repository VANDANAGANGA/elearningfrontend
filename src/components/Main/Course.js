import React, { useState } from 'react'
import Heading from './Heading'
import Slider from 'react-slick/lib/slider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosinstance from '../../routes/nonauthaxios';


function Course() {
  const[course,setCourse]=useState([])
  const navigate= useNavigate()

  
  const handleViewDetails = (courseId) => {
    // Navigate to the course details page with the course ID
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
          <Heading subtitle="COURSES" title="Browse Our Online Courses" />
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
                    <div className='text-[#1eb2a6] text-xs pt-2'>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <i className='fa fa-star'></i>
                        <label htmlFor=''>(5.0)</label>
                    </div>


                  <div className='details'>
                 
                      <>
                        <div className='flex items-center justify-center p-2'>
                          <div className=''>
                            <img className='w-[70px] h-[70px] border-radius-[50%]' src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIAAgAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUDBgcBAv/EADEQAAIBAwEFBgQHAQAAAAAAAAABAgMEEQUGITFBURITIjJhcUKBkdEHFFJTobHB4f/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A7iAAAAAAAAAAAAAAAAAAAAAAAAAeN4A9MNa5p0fNLf0XEh3V65ZhReFzl19iFzyWRE6eoSziEEvVvJhd7XfxJeyI4LgkK9rr4k/dGaGoS4Tgn6p4IIGC5o3NOqvDLf0e5mYoOeSba3rjiFZ5jyl09yYasgeJ5R6RQAAAAAK3ULjtSdKHBeZ9fQmXdXuqMpc+C9ymZYAAKyAx161O3ozrVpqFOCzKT5I1S+2yl3jjYW0XBfHWzv8AkgNvBqFjtlLvFG/toqD+Oi3u+TNroVqdxRhWozU6c1mMlzQGQAFE3T7jElSnwflfT0LIoEXNpV76ipc+D9zNWMwAIoAAK3U5+OEFyWSESL95upeiRHNRAABGlbb38ql1CwjLFOklOousnw+i/s1ktNqE1r97nnJP5dlFWUDZtiL+VO6nYTlmnVTnTXSS4/Vf0ayWmy6b1+yxylJ/LssI6OACKE3TJ+OUHwayiESLB4uo+qYWLcAGVAABUX6xdS9UiOTdTh44TXNYIRqIAAI07bbTqirU9QpxzCUVCq18LXB/P/DVTrU4xnBxnFSjJYcZLc0Ud1spplWXbiqlvn9E938oDQTatidOm609QqRahGLhSz8TfFotLXZTTKUu3JVLjH657vokXkIxhBRhFRjHcoxW5ID0AACRYLN1H0TI5N0yGZym1uSwhViyABlQAAYbul3tGUefFe5TF+VuoW/Zk6sOD8y6epYlQiLqWoW+m2/fXU8LhGK80n0SMl3c07S2qXFZ4p04uUv+epzXVNQraldzuK747oxzuhHojSLLUtqL+7k428vytLpB+J+8vsUlWc60u1WnKpLrN5f8nyAPqlOdGXapTlTl1g8F3pu1F/ayUbiX5ql0m/El6S+5RADqGm6hb6lb99azyvii90ovo0Szl+l6hW027jcUHw3SjndNdGdLtLind21O4ovNOpFSX29wMvsXNpS7qhGPPi/ch6fb5kqs+C8q6+pZGaoACKAAAeNZR6ANR240i9utPitOp95BS7dSlHzPHDHX2OaNOLcZJqSeGmt6Z3hpPiVOr7OaZqqcrq3Sq/u0/DP68/nksqWOOA3a9/D2vFt2F7Ca5QrR7L+q3fwiqqbFa7B4jbU6i6wrR/1o1qY14Gw09itdm8StqdNdZ1o/42Wtl+HteUk7+9hBc4UY9p/V/ZjUxpUU5NRim23hJLLbOl7DaTe2unyWo0+7hKXbp0peZZ456exb6Rs7pmlJStaCdX92p4p/Xl8sFsklwM2tSCWEegEUAAAAAAAAAAAAAAAAAAAAAAAB/9k=' alt='' />
                          </div>
                          <div className=''>
                            <h4 className='text-black'>{course.teacher}</h4>
                          </div>
                        </div>
                        <span className='text-[#1eb2a6] font-semibold mt-2'>50 lecture(150 hr)</span>
                      </>
              
                  </div>
              <div className='price'>
                <h3 className='text-black pt-2'>  bejdnkj / nejendckml </h3>
              </div>
              <button   onClick={() => handleViewDetails(course.id)} className='px-8 py-4 bg-white text-[#1eb2a6] w-full font-semibold border border-transparent my-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6]'>VIEW DETAILS !</button>
            </div>
            )}
        </div>

    </div>
      </section>
    </>
  )
}

export default Course
