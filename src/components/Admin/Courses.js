import React from 'react'
import Category from '../Main/Category'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Avatar,Space } from 'antd';
import { UserOutlined,StarFilled } from '@ant-design/icons';
import Modal from 'react-modal';
import instance from '../../routes/axios';
import  baseUrl  from '../../utils/urls';

function AdminCourses() {
  const [online, setOnline] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [modalCourseId, setModalCourseId] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [isEditSuccessful, setIsEditSuccessful] = useState(0);

  useEffect(() => {
    instance.get('admincourse/')
      // Make an Axios GET request to your Django API endpoint
      // axios.get('http://localhost:8000/api/admincourse/')
        .then(response => {
          // Once data is fetched, update the 'online' state with the data
          setOnline(response.data);
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [isEditSuccessful]);
    
    const showModal = (courseId, action, title) => {
      setModalAction(action);
      setModalCourseId(courseId);
      setModalTitle(title);
      setIsModalVisible(true);
    };

    
    const handleModalClose = () => {
      console.log('ia am here ')
      setIsModalVisible(false);
    };
  
    
      const handleEdit = async () => {
        try {
          const response = await  instance.put('admincourse/',{id:modalCourseId})
          // axios.put('http://127.0.0.1:8000/api/admincourse/', { id: modalCourseId });
          console.log('Course updated successfully', response.data);
          setIsModalVisible(false);
          setIsEditSuccessful((prevCounter) => prevCounter + 1); 
        } catch (error) {
          console.error('Error updating course:', error);
        }
      };
    
    

  return (
<section className='w-full'>
<Modal
        isOpen={isModalVisible}
        onRequestClose={handleModalClose}
        contentLabel="Modal"
        style={{
          overlay: {
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center', // Set a higher value for zIndex
          },
          content: {
            zIndex: 1001,
            width:'400px',
            height:'200px',
            backgroundColor: 'black',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            },
        }}
      >  
           <h2 className='text-red-500 font-semibold'>{`Are you sure you want to ${modalAction === 'activate' ? 'activate' : 'deactivate'} ${modalTitle}?`}</h2>
         <div className='flex flex-row-reverse'>
         <button className='rounded-full border py-2  px-4 m-2 text-white' onClick={handleModalClose}>Close</button>
         <button className='rounded-full border py-2 px-4 m-2 text-white' onClick={()=>handleEdit(modalCourseId)}>{modalAction === 'activate' ? 'Activate' : 'Deactivate'}</button>
        </div>
          </Modal>

      <div className='text-center '>
        <h1 className='text-center text-black text-4xl font-extrabold' >Our All Courses Are Here</h1>
      </div>
    <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
    {online.map(course => (
     <div className="bg-white shadow-md mb-2 rounded  transition-transform transform hover:scale-105">
      <div className='bg-cyan-400 w-full h-2/5 rounded flex relative'>
      <div className="max-w-[400px] max-h-[400px] items-front mt-auto ml-4">
      <Avatar  src={`data:image/jpeg;base64, ${course.profile_pic}`} alt="Avatar" icon={<UserOutlined />} />
      </div>
        <div className="absolute top-0 right-0  overflow-hidden">
            <div className='px-10 py-.5 pt-1.5'>
            <img
            src={course.category_url}
            alt=''
            className=' h-14 w-12 object-cover  text-white opacity-50'/>
            </div>
                <div className="flex items-center  justify-center mb-22 bg-white h-5 "  style={{ clipPath: "polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)" }}>
                <h2 className="text-black">{course.teacher_name}</h2>
                </div>
        </div>
      </div>
        <div className='flex flex-col mb-4'>
            <h1 className=" text-black font-semibold text-l mt-8 pl-2">{course.title}</h1>
            <span className='text-red-400 text-sm pl-2'><StarFilled/>5 | {course.students_enrolled} enrolled </span>
            <div className=' flex justify-center mb-4 pt-2 '>
            <button  className={`px-4 py-2 font-semibold text-sm rounded-full ${course.is_active ? 'bg-[#1eb2a6] text-red' : 'bg-red-500 text-white'}`} onClick={()=>showModal(course.id, course.is_active ? "deactivate" : "activate",course.title)}
        >{course.is_active ? 'Active' : 'Deactive'}</button>
            </div>
        </div>
       
      </div>
   
   

    ))}

    </div>
    
</section>
)
}
export default AdminCourses;
