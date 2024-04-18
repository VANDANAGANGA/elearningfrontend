import React from 'react'
import { Table } from "antd";
import { useState,useEffect } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from 'axios';
import { Avatar,Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Modal from 'react-modal';
import { PiStudentFill } from "react-icons/pi";


function Studentmanagement() {
  const activeImageURL = "https://cdn-icons-png.flaticon.com/256/12225/12225958.png";
  const inactiveImageURL = "https://cdn-icons-png.flaticon.com/256/10309/10309493.png";

  
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [modalUserId, setModalUserId] = useState(null);
  const [modalUsername, setModalUsername] = useState("");
  const [isEditSuccessful, setIsEditSuccessful] = useState(0);
  const [course,setCourse]=useState([]);

  const showModal = (userId, action, username) => {
    console.log(userId)
    setModalAction(action);
    setModalUserId(userId);
    setModalUsername(username);
    setIsModalVisible(true);
  };
 

  const columns = [
    
     {
      key: "1",
      title: "Name",
      render: (record) => (
        <Space>
          <Avatar src={`http://127.0.0.1:8000${record.student.profile_pic}`} alt="Avatar" icon={<UserOutlined />} />
          <span>{record.student.full_name}</span>
        </Space>
      ),
    },
    {
      key: "2",
      title: "Email",
      render: (record) => record.student.email,
    },
    {
      key: "3",
      title: "Phone number",
      render: (record) => record.student.phone_number,
    },
    {
      key: "5",
      title: "Education",
      render:(record)=>(
        <div className=' flex flex-col'>
        <span>{record.student.highest_education}</span>
        <span>({record.student.specialization})</span>
        </div>
      ),
    },
    {
      key: "6",
      title: "Parents",
      render:(record)=>(
        <div className=' flex flex-col'>
        <span>Mother's Name:{record.student.mother_name}</span>
        <span>Father's Name:{record.student.father_name}</span>
        </div>
      ),
    },
    {
      key: "7",
      title: "Address",
      render:(record)=>(
        <div className=' flex flex-col'>
        <span>{record.student.house_name}</span>
        <span>{record.student.street}</span>
        <span>{record.student.city},{record.student.state}</span>
        <span>PIN:{record.student.pin}</span>
        </div>
      ),
    },
    {
      key: '8',
      title: 'Courses',
      render: (record) => (
        <EditOutlined onClick={() => setCourse(record.enrolled_courses)} />
        )
    },
    {
      key: '9',
      title: 'Actions',
      render: (record) => (
        <div>
        {record.student.is_active ? (
          <img src={activeImageURL} alt="Active" style={{ width: 30, height: 30,marginRight: 8  }} onClick={()=>showModal(record.student.user_id,"deactivate",record.student.full_name)}/>
        ) : (
          <img src={inactiveImageURL} alt="Inactive" style={{ width: 30, height: 30,marginRight: 8 }} onClick={()=>showModal(record.student.user_id,"activate",record.student.full_name)} />
        )}
      </div>)
    },
  ]
  const columns1=[
    {
      key: "1",
      title: "Title",
      render: (record) => record.title,
    },
    {
      key: "2",
      title: "Category",
      render: (record) => record.category_name,
    },
    {
      key: "3",
      title: "About",
      render: (record) => record.about,
    },
    {
      key: "3",
      title: "Enrolled_at",
      render: (record) => record.enrolled_at,
    },
    {
      key: "4",
      title: "is_active",
      render: (record) => (
      <div>
      {record.is_active ? (
        <PiStudentFill  style={{ width: 30, height: 30,marginRight: 8,color: 'green' }} />
      ) : (
        <PiStudentFill style={{ width: 30, height: 30,marginRight: 8,color:'red' }}/>
      )}
    </div>)
    },


  ]

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/studentmanagement/');
        setDataSource(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [isEditSuccessful]);
  const handleModalClose = () => {
    console.log('ia am here ')
    setIsModalVisible(false);
  };

  
    const handleEdit = async () => {
      try {
        console.log(modalUserId)
        const response = await axios.put('http://127.0.0.1:8000/api/studentmanagement/', { id: modalUserId });
        console.log('User updated successfully', response.data);
        setIsModalVisible(false);
        setIsEditSuccessful((prevCounter) => prevCounter + 1); 
      } catch (error) {
        console.error('Error updating student:', error);
      }
    };
  
    const handleCloseCourse = () => {
      setCourse([]);
    };
  
  
  
  return (
    <section className='w-full'>
       <div className='text-center m-2 '>
        <h1 className='text-center text-black text-4xl font-extrabold' >These Are Our Students</h1>
      </div>
        <div className="relative p-4 m-2">
        <Table columns={columns} dataSource={dataSource}></Table>
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
         <h2 className='text-red-500 font-semibold'>{`Are you sure you want to ${modalAction === 'activate' ? 'activate' : 'deactivate'} ${modalUsername}?`}</h2>
         <div className='flex flex-row-reverse'>
         <button className='rounded-full border py-2  px-4 m-2 text-white' onClick={handleModalClose}>Close</button>
         <button className='rounded-full border py-2 px-4 m-2 text-white' onClick={()=>handleEdit(modalUserId)}>{modalAction === 'activate' ? 'Activate' : 'Deactivate'}</button>
        </div>
          </Modal>

          <Modal
        isOpen={course.length>0}
        onRequestClose={handleCloseCourse}
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
            width:'90%',
            height:'90%',
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
      <h1 className='text-white mb-2'>COURSES</h1>
       <Table columns={columns1} dataSource={course}></Table>
       
         <button className='rounded-full border py-2  px-4 m-2 text-white' onClick={handleCloseCourse}>Close</button>
          </Modal>    

      </div>
    </section>
    
  );
}

export default Studentmanagement
