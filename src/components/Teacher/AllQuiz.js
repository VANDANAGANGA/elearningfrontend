import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import axios from 'axios';
import Swal from 'sweetalert2';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { FcViewDetails } from "react-icons/fc";
import { FaClipboardQuestion } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { addCourse } from '../../Store/courseSlice';
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar,Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { baseUrl } from '../../utils/urls';
import instance from '../../routes/axios';



// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

function AllQuiz() {
    const columns = [
    
        {
         key: "1",
         title: "Name",
         render: (record) => (
           <Space>
             <Avatar src={`${baseUrl}${record.profile_pic}`} alt="Avatar" icon={<UserOutlined />} />
             <span>{record.full_name}</span>
           </Space>
         ),
       },
       {
         key: "2",
         title: "Submitted Date",
         dataIndex: "submitted_at",
         render: (submittedAt) => {
            const dateObject = new Date(submittedAt);
            const formattedDate = dateObject.toLocaleDateString(); // Adjust the formatting as needed
            return formattedDate;
          },
       },
       {
         key: "3",
         title: "Mark",
         render: (record) => (
           <span>{record.mark}</span>
          ),
       },
      //  {
      //    key: '4',
      //    title: 'Actions',
      //    render: (record) => (
      //       <div>
      //         {record.is_active ? (
      //           <MdVerified style={{ width: 30, height: 30, marginRight: 8 }} />
      //         ) : (
      //           <GoUnverified style={{ width: 30, height: 30, marginRight: 8 }} />
      //         )}
      //       </div>
      //     )}
     ]
    const [quiz,setQuiz]=useState([])
    const[question,setQuestion]=useState()
    const[student,setStudent]=useState([])
    const[modal,setModal]=useState(false)
    const navigate= useNavigate()
    const dispatch = useDispatch();
    const user=useSelector((store) => (store.authUser.user))
    console.log("user:",user)
    useEffect(()=>{
    
        instance.get('teacherallquiz/',{ params: { id: user.role_id } })
        .then((response) => {
         setQuiz(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching modules:', error);
        });
    }, [user]);
    
    const handleShowQuestions = (pdf) => {
        // setModal(false)
        setQuestion(pdf);
      };
 const handleCreateAssignment= (courseId)=>{
    console.log('iam here',courseId);
    dispatch(addCourse(courseId));
    navigate('/teacher/coursedetails/quiz')
 }  
 const handleCreateCourse=()=>{
    navigate('/teacher/')
 }
 const handleStudent=(student)=>{
    setStudent(student)
    console.log(student)
    setModal(true)
 }

  return (
    <section className='w-full'>
    
      <div className='text-center '>
        <h1 className='text-center text-black text-4xl font-extrabold' >Quiz</h1>
      </div>


      {question && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='p-8 w-1/2 h-3/4 rounded-lg'>
            <button className='absolute top-4 right-4 text-red-400 text-3xl' onClick={() => setQuestion(null)}>
              X
            </button>
            { question.map( (items,index) => (
              <div  key={index} className='p-2 text-lg'>
              <h1>{items.id}.{items.question}</h1>
              <div className='flex justify-between'>
              <h1>A.{items.option_a}</h1>
              <h1>B.{items.option_b}</h1> 
              <h1>C.{items.option_c}</h1>
              <h1>D.{items.option_d}</h1>
              </div>
              Answere: {items.answer}
              </div>
            ))}
          </div>
        </div>
      )}
      {modal&&(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40'>
        <div className='  p-8 w-1/2 h-3/4 rounded-lg'>
          <button className='absolute top-4 right-4 text-red-400 text-3xl' onClick={() => setModal(false)}>
            X
          </button>
          <Table columns={columns} dataSource={student}></Table>
          </div>
          </div>

      )
      }



      {quiz.length === 0 ? (
  <div className='ml-8 pl-5 text-red-500 my-4 text-center pt-40 '>
     <h1 className='text-2xl font-bold'> Create A Course and Start Teaching</h1>
    <button className='pl-2 hover:cursor-pointer' onClick={handleCreateCourse}>
      Click here to create a new Course
    </button>
  </div>
) : (

      quiz.map((items,index)=>(
      <div className='mt-2 ml-6'>
        <h1 className='text-2xl text-black font-semibold'>{index+1}.{items.course.title}</h1>
       
        {items.quiz.length === 0 ? (
              <div className=' ml-8 pl-5 text-red-500 my-4'>No quiz created yet.<buttton  className='pl-2 hover:cursor-pointer' onClick={()=>handleCreateAssignment(items.course.id)}>Click here to create a new Quiz</buttton> </div>
            ) : (
        <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">           
    {items.quiz.map((item) => (
      <div key='' className='bg-cyan-400 w-full min-h-[150px] p-4 rounded flex flex-col m-4 relative '>
      <h1 className=" text-black font-semibold text-l ">Quiz.{item.quiz.quiz_no}</h1>
      <h1 className='text-black font-bold pl-6'>{item.quiz.quiz_title}</h1>
      <div className='flex justify-center text-3xl text-black pt-4'>
      <button className='pr-6' onClick={()=>handleStudent(item.students)}><FcViewDetails /></button>
      <button className='pl-6' onClick={() => handleShowQuestions(item.questions)} ><FaClipboardQuestion /></button>
      </div>
      </div>
         )) }
        </div>
       )}  

      </div>
       )))}
      </section>
  )
}

export default AllQuiz;
