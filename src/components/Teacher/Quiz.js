import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import Swal from 'sweetalert2';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { Table,Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar,Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { baseUrl } from '../../utils/urls';
import instance from '../../routes/axios';




pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function  Quiz() {
    const[showModal, setShowModal]=useState(false)
    const[title,setTitle]=useState()
    const[number,setNumber]=useState()
    const[quiz,setQuiz]=useState([])
    const[question,setQuestion]=useState([])
    const[counter,setCounter]=useState(0)
    const[addQuestion, setAddQuestion]=useState(false)
    const[quizId, setQuizId]=useState(false)
    const[questionTitle,setQuestionTitle]=useState()
    const[questionNumber,setQuestionNumber]=useState()
    const[optionA,setOptionA]= useState()
    const[optionB,setOptionB]= useState()
    const[optionC,setOptionC]= useState()
    const[optionD,setOptionD]= useState()
    const [answere,setAnswere]=useState()
    const[student,setStudent]=useState([])
    const[studentModal,setStudentModal]=useState(false)
    const[modalQuestion,setModalQuestion]=useState(false)

    
    const course = useSelector((store) => store.course.course);

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
    //    title: 'Result',
    //    render: (record) => (
    //       <div>
           
    //       </div>
    //     )}
   ]
   
  const columns1 = [
    
    {
     key: "1",
     title: "Question",
      render: (record) => record.question,
   },
   {
     key: "2",
     title: "Option A",
     render: (record) => record.option_a,
   },
   {
     key: "3",
     title: "Option B",
     render: (record) => record.option_b,
   },
   {
     key: "4",
     title: "Option C",
     render:(record)=>record.option_c
     
     
   },
   {
     key: "5",
     title: "Option D",
     render: (record) => record.option_d,
   },
   {
    key: "6",
    title: "Answer",
    render: (record) => record.answer,
  },
   {
     key: '7',
     title: 'Delete',
     render: (record) => (
       <MdDeleteForever onClick={() => handleDeleteQuestion(record.id)}/> )
  
   },
 ]
  
  


    const handleSubmit = (e) => {
      e.preventDefault();
      const formData={
       quiz_no: number,
       quiz_title:title,
       course:course,
      }
      console.log(formData)
      instance.post('teacherquiz/',formData)
      .then(response => {
        Swal.fire({
          title: 'Quiz created successfully',
          icon: 'success',
          timer: 2000,
        })
        setShowModal(false)
        setCounter((prevCounter) => prevCounter + 1); 
      })
      .catch(error => {
        Swal.fire({
          title: 'Sorry quiz not Created!',
          icon: 'failed',
          timer: 2000,})
      });
       
      }
       
      const handleSubmitQuestion = (e) => {
        e.preventDefault();
        const formData={
         quiz:quizId,
         question_no:questionNumber,
         question:questionTitle,
         option_a:optionA,
         option_b:optionB,
         option_c:optionC,
         option_d:optionD,
         answer:answere
        }
        console.log(formData)
        instance.post('teacherquestions/',formData)
        .then(response => {
          Swal.fire({
            title: 'Question created successfully',
            icon: 'success',
            timer: 2000,
          })
          setAddQuestion(false)
          setCounter((prevCounter) => prevCounter + 1); 
        })
        .catch(error => {
          Swal.fire({
            title: 'Sorry questions not Created!',
            icon: 'failed',
            timer: 2000,})
        });
         
        }

       
      
      

     
      useEffect(()=>{
    
        instance.get('teacherquiz/',{ params: { id: course } })
        .then((response) => {
          setQuiz(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching modules:', error);
        });
    }, [course,counter]);
    
    const handleShowQuestions = (questions) => {
      console.log(question)
      setModalQuestion(true)
      setQuestion(questions);
    };
    
    const handleStudent=(student)=>{
      setStudent(student)
      console.log(student)
      setStudentModal(true)
   }
   
  const handleDeleteQuiz=(quizId)=>{
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
        instance.delete('teacherquiz/',{ params: { id: quizId } })
          .then(response => {
            Swal.fire(
              'Deleted!',
              'Your Quiz has been deleted.',
              'success'
            );
            setCounter((prevCounter) => prevCounter + 1);
          })
          .catch(error => {
            // Handle error response
            console.error('There was an error deleting the quiz:', error);
            Swal.fire(
              'Error!',
              'Could not delete the Quiz. Please try again later.',
              'error'
            );
          });
      }
    });

  } 
  const handleDeleteQuestion=(questionId)=>{
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
        instance.delete('teacherquestions/',{ params: { id: questionId } })
          .then(response => {
            Swal.fire(
              'Deleted!',
              'Your Quiz has been deleted.',
              'success'
            );
            setCounter((prevCounter) => prevCounter + 1);
          })
          .catch(error => {
            // Handle error response
            console.error('There was an error deleting the question:', error);
            Swal.fire(
              'Error!',
              'Could not delete the Question. Please try again later.',
              'error'
            );
          });
      }
    });
  }

  return (
    <div className='p-4'> 
         <div className="relative p-4 m-4">
      <button className=' absolute  right-0 w-40 h-12 bg-[#1eb2a6] font-bold hover:bg-blue-400 px-4 py-2  rounded'  onClick={() => setShowModal(true)}>Add Quiz</button>
      </div>
      
      {/* {question && (
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
      )} */}

 
{modalQuestion &&(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40'>
        <div className='  p-8 w-1/2 h-3/4 rounded-lg'>
          <button className='absolute top-4 right-4 text-red-400 text-3xl' onClick={() => setModalQuestion(false)}>
            X
          </button>
          <Table columns={columns1} dataSource={question}></Table>
          </div>
          </div>

      )
      }

{studentModal&&(
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40'>
        <div className='  p-8 w-1/2 h-3/4 rounded-lg'>
          <button className='absolute top-4 right-4 text-red-400 text-3xl' onClick={() => setStudentModal(false)}>
            X
          </button>
          <Table columns={columns} dataSource={student}></Table>
          </div>
          </div>

      )
      }
    
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
                    className="p-4 ml-auto  border-0 text-red-400  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>X </button>
                <div className="  p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black text-center PL-10">Add Quiz </h3>  
                </div>
                {/*body*/}
                

                <form  className='space-y-6 p-4' onSubmit={handleSubmit}>
                <div className=" p-6  flex flex-col">
                <label className='text-black'>Quiz No</label>
            <input
              type="text"  
              className="px-2 py-1 border rounded m-4 text-black" value={number} onChange={(e)=>setNumber(e.target.value)}
            />
            <label className='text-black'>Quiz Title</label>
            <input
              type="text"  
              className="px-2 py-1 border rounded m-4 text-black" value={title} onChange={(e)=>setTitle(e.target.value)}
            />
                </div>
                <div className='items-center justify-center flex'>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                    type="submit" disabled={(!title && !number)}>Save Quiz</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          
        </>
      ) : null}
         { quiz.map( (items) => (
        <div className='rounded-lg bg-white text-black max-w-[600px] pl-6 py-2 flex justify-between'>
            <div>
            <h2>Quiz {items.quiz.quiz_no}</h2>
            <h1 className='pl-12 text-xl font-bold'>{items.quiz.quiz_title}</h1>
            
            <h4 className='pl-2 py-2'>No of Questions:{items.questions.length}</h4>
            <div className='flex justify-center items-center py-2'>
            <button onClick={()=>{setAddQuestion(true);setQuizId(items.quiz.id)}} className=' mx-2 px-2 text-white bg-[#1eb2a6] font-bold'>Add Questions</button>
            <button className=' mx-2 px-2 text-white bg-[#1eb2a6] font-bold'  onClick={()=>handleStudent(items.students)}>Show Details</button>
            <button onClick={() => handleShowQuestions(items.questions)} className=' mx-2 px-2 text-white bg-[#1eb2a6] font-bold'> Show Questions</button>
            <button onClick={() => handleDeleteQuiz(items.quiz.id)} className=' mx-2 px-2 text-white bg-[#1eb2a6] font-bold'> Delete</button>
            </div>
            </div>
            <div className='pr-6 justify-items-center pt-6 text-3xl text-black'>
            
            </div>
        </div>
          ))}






{addQuestion ? (
            <>
              
              <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <button
                    className="p-4 ml-auto  border-0 text-red-400  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setAddQuestion(false)}>X </button>
                <div className="  p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black text-center PL-10">Add Questions </h3>  
                </div>
                {/*body*/}
                

                <form  className='space-y-6 p-4' onSubmit={handleSubmitQuestion}>
                <div className=" p-6  flex flex-col">
                <label className='text-black'>Question No</label>
            <input
              type="text"  
              className="px-2 py-1 border rounded m-4 text-black" value={number} onChange={(e)=>setQuestionNumber(e.target.value)}
            />
            <label className='text-black'>Question</label>
            <input
              type="text"  
              className="px-2 py-1 border rounded m-4 text-black" value={title} onChange={(e)=>setQuestionTitle(e.target.value)}
            />

               

            <div className='flex'>
            <div className=''>
              <label className='text-black'>Option A</label>
              <input type="text" className="px-2 py-1 border rounded m-4 text-black" value={title} onChange={(e)=>setOptionA(e.target.value)} />
            </div>

            <div className=''>
              <label className='text-black'>Option B</label>
              <input type="text" className="px-2 py-1 border rounded m-4 text-black" value={title} onChange={(e)=>setOptionB(e.target.value)}/>
            </div>

            </div>

            <div className='flex'>
            <div className=''>
              <label className='text-black'>Option C</label>
              <input type="text" className="px-2 py-1 border rounded m-4 text-black" value={title} onChange={(e)=>setOptionC(e.target.value)} />
            </div>

            <div className=''>
              <label className='text-black'>Option D</label>
              <input type="text" className="px-2 py-1 border rounded m-4 text-black" value={title} onChange={(e)=>setOptionD(e.target.value)}/>
            </div>

            </div>
            <div className='mt-4'>
      <label className='text-black' htmlFor="answere">Select Answer:</label>
      <select id="answer" className='text-black border rounded ml-6 p-2' value={answere} onChange={(e)=>setAnswere(e.target.value)}>
        <option value="A">Option A</option>
        <option value="B">Option B</option>
        <option value="C">Option C</option>
        <option value="D">Option D</option>
      </select>

      <p>Selected Answer: {answere}</p>
    </div>

                </div>
                <div className='items-center justify-center flex'>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                    type="submit" disabled={(!questionTitle && !questionNumber && !optionA && !optionB && !optionC && !optionD && !answere)}>Save Quiz</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          
        </>
      ) : null}      

    </div>
  )
}


export default Quiz
