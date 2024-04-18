import React from 'react'
import Category from '../Main/Category'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Avatar,Space } from 'antd';
import { UserOutlined,StarFilled } from '@ant-design/icons';
import { HiUsers } from "react-icons/hi";
import { MdDateRange } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../../Store/courseSlice';
import instance from '../../routes/axios';

function StudentCourse() {
  const[data, setData] = useState([]);
  const navigate= useNavigate()
  const dispatch = useDispatch();



  const user=useSelector((store) => (store.authUser.user))

  const handleViewDetails = (courseId) =>{
    console.log('iam here',courseId);
    dispatch(addCourse(courseId));
    navigate('/student/coursedetails')
   }


  useEffect(() => {
       console.log('teacher_id',user.role_id)
      if (user){
{       instance.get('studentcourse/',{ params: { id: user?.role_id } })
        .then(response => {
          console.log(response)
          setData(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }
  }, [user?.role_id]);
    
    



    
  return (
    <section className='w-full'>
    
      <div className='text-center '>
        <h1 className='text-center text-black text-4xl font-extrabold' >My Courses</h1>
      </div>

      <div className=" p-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
    {data.map((course) => 
           <div className="bg-white shadow-md  rounded  transition-transform transform">
           <div className='bg-cyan-400 w-full h-3/5 rounded flex relative'>
           <div className=" max-w-[200px] max-h-[200px] items-front mt-auto ml-4">
           <img
             src='https://images.pexels.com/photos/3779760/pexels-photo-3779760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
             alt="Profile"
             className="max-w-[100px] max-h-[100px]"
           />
         </div>
             <div className="absolute top-0 right-0  overflow-hidden">
                 <div className='px-10 py-.5 pt-1.5'>
                 <img
                 src={course.category_icon}
                 alt=''
                 className=' h-14 w-12 object-cover  text-white opacity-50'/>
                 </div>
                     <div className="flex items-center mt-8 justify-center  bg-white h-[22px] w-[152px]"  style={{ clipPath: "polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)" }}>
                     <h2 className="text-black">{course.teacher_name}</h2>
                     </div>
             </div>
           </div>
             <div className='flex flex-col mb-4'>
                 <h1 className=" text-black font-semibold text-l my-2 pl-2">{course.title}</h1>
                 <div className=' flex justify-center mb-6 pt-2 '>
                 <button className="bg-[#1eb2a6] px-4 py-2  font-semibold text-red text-sm rounded-full"  onClick={() => handleViewDetails(course.id)}>View Details</button>
                 </div>
             </div>
            
           </div>
            )}
        </div>
      </section>

    

    
)
}

export default StudentCourse;
