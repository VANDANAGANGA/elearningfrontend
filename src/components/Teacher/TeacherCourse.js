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

function TeacherCourse() {
  const[data, setData] = useState([]);
  const [showModal, setShowModal]=useState(false)
  const[title,setTitle]=useState()
  const[about,setAbout]=useState()
  const[categories,setCategories]=useState()
  const[category,setCategory]=useState()
  const navigate= useNavigate()
  const dispatch = useDispatch();
  const[counter,setCounter]=useState(0)


  const user=useSelector((store) => (store.authUser.user))

  const handleViewDetails = (courseId) =>{
    console.log('iam here',courseId);
    dispatch(addCourse(courseId));
    navigate('/teacher/coursedetails')
   }
   

   const handleDeleteCourse =(courseId)=>{
    Swal.fire({
      title: 'Are you sure Want to delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed deletion, send Axios request
        instance.delete('courses/',{ params: { id: courseId } })
          .then(response => {
            Swal.fire(
              'Deleted!',
              'Your Course has been deleted.',
              'success'
            );
            setCounter((prevCounter) => prevCounter + 1);
          })
          .catch(error => {
            // Handle error response
            console.error('There was an error deleting the course:', error);
            Swal.fire(
              'Error!',
              'Could not delete the course. Please try again later.',
              'error'
            );
          });
      }
    });
  };

  useEffect(() => {
       console.log('teacher_id',user?.role_id)
      if (user){
       instance.get('teachercourses/',{ params: { id: user?.role_id } })
        .then(response => {
          console.log(response)
          setData(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    
    }, [user,counter]);
    
    useEffect(() => {
      instance.get('coursecategory/') // Replace with your actual API endpoint
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    }, []);



    const handleSubmit = (e) => {
      e.preventDefault();
      {
    const formData = {
        title:title,
        teacher:user.role_id,
        category:category,
        about:about

      };
    
      console.log(formData)
        instance.post('courses/', formData)
          .then(response => {
            if (response.data) {
              // Display a SweetAlert with a success message
              Swal.fire({
                title: 'New Course Created Successfully',
                icon: 'success',
                confirmButtonText: 'OK'
              })
              setShowModal(false)
              setCounter((prevCounter) => prevCounter + 1);
            } else {
              Swal.fire({
                title: 'Failed',
                icon: 'Failed',
                confirmButtonText: 'OK'
              })
              console.error(response.data.error);
            }
          })
          .catch(error => {
            Swal.fire({
              title: 'Failed',
              icon: 'Failed',
              confirmButtonText: 'OK'
            })
            
            console.error(error);
          });
      };
  
    }
    
  return (
    <section className='w-full'>
    
      <div className='text-center '>
        <h1 className='text-center text-black text-4xl font-extrabold' >My Courses</h1>
      </div>
      <div className="relative p-4 m-4">
      <button className=' absolute right-0 w-36 h-12 bg-[#1eb2a6] font-bold hover:bg-blue-400 px-4 py-2  rounded'  onClick={() => setShowModal(true)}>Add Course</button>
      </div>
       

      
          {showModal ? (
            <>    
              <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <button
                    className="px-4 ml-auto  border-0 text-red-400  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>X </button>
                <div className="  border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black text-center PL-10">Add Course </h3>  
                </div>
                {/*body*/}
                

                <form  className='space-y-6 p-4' onSubmit={handleSubmit}>
                <div className=" p-6  flex flex-col">
            <label className='text-black'>Course Title</label>
            <input type="text" className="px-2 py-1 border rounded m-4 text-black" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <label className='text-black'>About</label>
            <input type="text" className="px-2 py-1 border rounded m-4 text-black" value={about} onChange={(e)=>setAbout(e.target.value)} />
            <label className="text-black">Category</label>
            <select className="px-2 py-1 border rounded m-4 text-black"value={category} onChange={(e) =>{ console.log('Selected Category ID:', e.target.value); setCategory(e.target.value)}} >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>        
                </div>
                <div className='items-center justify-center flex'>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                    type="submit" disabled=''>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          
        </>
      ) : null}

    {data.length==0?(
      <div className='h-fit pt-40 flex items-center justify-center'>
      <h1 className='text-red-500 font-bold text-2xl'>Create A Course And Start Teaching</h1>
      </div>
    )  :( 

    <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
    {data.map((course) => (
      <div key={course.id} className='bg-cyan-400 w-full min-h-[150px] p-4 rounded flex flex-col m-4 relative '>
         <div className=' flex justify-end pr-2'>
        <button className='border ml-2 px-2'  onClick={() => handleDeleteCourse(course.id)}>Delete</button>
        </div>
      <h1 className=" text-black font-semibold text-l my-2 pl-2 text-center">{course.title}</h1>
      <h6 className='border max-w-fit p-2 solid-balck'>Category:{course.category_name}</h6>
      <div className='flex text-xs  py-4'>
      <span className='text-lg'><MdDateRange /></span>
      <span className='text-sm'>Created_at:<span className='ml-2'>{course.created_at}</span></span>
      </div>
      <div className='flex'>
      <span className='text-2xl pr-2'><HiUsers /></span> 
      <span>{course.num_students_enrolled} Learns </span>
      </div>

            <button className="bg-[#1eb2a6] px-4 py-2 mt-2  font-semibold text-red text-sm rounded-full" onClick={() => handleViewDetails(course.id)}>View Details</button>
            </div>
         ))}    
        </div>
    )}
    
   
    
    
</section>
    
  )
}

export default TeacherCourse
