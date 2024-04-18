import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import Swal from 'sweetalert2';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar,Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";


// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

function Assignments() {
    const[showModal, setShowModal]=useState(false)
    const[title,setTitle]=useState()
    const[number,setNumber]=useState()
    const[file,setFile]=useState()
    const[assignemnt,setAssignemnt]=useState([])
    const[question,setQuestion]=useState()
    const[counter,setCounter]=useState(0)
    
    const course = useSelector((store) => store.course.course);
    
  const columns = [
  
      {
       key: "1",
       title: "Name",
       render: (record) => (
         <Space>
           <Avatar src={`http://127.0.0.1:8000${record.profile_pic}`} alt="Avatar" icon={<UserOutlined />} />
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
       title: "Answer",
       render: (record) => (
          <FaFilePdf
            className="cursor-pointer text-xl"
            onClick={() => handleShowQuestions(record.answer)}
          />
        ),
     },
     {
       key: '4',
       title: 'Actions',
       render: (record) => (
          <div>
            {record.is_active ? (
              <MdVerified style={{ width: 30, height: 30, marginRight: 8 }} />
            ) : (
              <GoUnverified style={{ width: 30, height: 30, marginRight: 8 }} />
            )}
          </div>
        )}
   ]
  
  
  const[student,setStudent]=useState([])
  const[modal,setModal]=useState(false)

    const handleSubmit = (e) => {
      e.preventDefault();
      const formData={
       assignment_no: number,
       assignment_title:title,
       course:course,
       pdf:file
      }
      console.log(formData)
      axios.post('http://localhost:8000/api/teacherassignment/',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        Swal.fire({
          title: 'Assignment created successfully',
          icon: 'success',
          timer: 2000,
        })
        setShowModal(false)
        setCounter((prevCounter) => prevCounter + 1); 
      })
      .catch(error => {
        Swal.fire({
          title: 'Sorry Assignment not Created!',
          icon: 'failed',
          timer: 2000,})
      });
       
      }
     
      useEffect(()=>{
    
        axios.get('http://localhost:8000/api/teacherassignment/',{ params: { id: course } })
        .then((response) => {
          setAssignemnt(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching modules:', error);
        });
    }, [course,counter]);
    
    const handleShowQuestions = (pdf) => {
      setQuestion(pdf);
    };
    const handleStudent=(student)=>{
      setStudent(student)
      console.log(student)
      setModal(true)
   }
  const handleDeleteAssignment=(assignmentId)=>{
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
        axios.delete('http://localhost:8000/api/teacherassignment/',{ params: { id: assignmentId } })
          .then(response => {
            Swal.fire(
              'Deleted!',
              'Your assignment has been deleted.',
              'success'
            );
            setCounter((prevCounter) => prevCounter + 1);
          })
          .catch(error => {
            // Handle error response
            console.error('There was an error deleting the assignment:', error);
            Swal.fire(
              'Error!',
              'Could not delete the assignment. Please try again later.',
              'error'
            );
          });
      }
    });
  };
  return (
    <div className='p-4'> 
         <div className="relative p-4 m-4">
      <button className=' absolute  right-0 w-40 h-12 bg-[#1eb2a6] font-bold hover:bg-blue-400 px-4 py-2  rounded'  onClick={() => setShowModal(true)}>Add Assignment</button>
      </div>
      
      {question && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='p-8 w-1/2 h-3/4 rounded-lg'>
            <button className='absolute top-4 right-4 text-red-400 text-3xl' onClick={() => setQuestion(null)}>
              X
            </button>
            <Document file={`http://localhost:8000${question}`} onLoadSuccess=''>
              <Page pageNumber={1} />
            </Document>
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
                  <h3 className="text-3xl font-semibold text-black text-center PL-10">Add Assignment </h3>  
                </div>
                {/*body*/}
                

                <form  className='space-y-6 p-4' onSubmit={handleSubmit}>
                <div className=" p-6  flex flex-col">
                <label className='text-black'>Assignment No</label>
            <input
              type="text"  
              className="px-2 py-1 border rounded m-4 text-black" value={number} onChange={(e)=>setNumber(e.target.value)}
            />
            <label className='text-black'>Assignment Title</label>
            <input
              type="text"  
              className="px-2 py-1 border rounded m-4 text-black" value={title} onChange={(e)=>setTitle(e.target.value)}
            />
             <label className='text-black'>Upload File</label>
            <input
              type="file"
              className="px-2 py-1  rounded m-4 text-black"  accept="application/pdf"  onChange={(e)=>setFile(e.target.files[0])} />
            
                </div>
                <div className='items-center justify-center flex'>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                    type="submit" disabled={(!title && !file && !number)}>Save Assignment</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          
        </>
      ) : null}
         { assignemnt.map( (items) => (
        <div className='rounded-lg bg-white text-black max-w-[500px] mt-2 pl-6 py-2 flex justify-between'>
            <div>
            <h2>Assignment {items.assignment.assignment_no}</h2>
            <h1 className='pl-12 text-xl font-bold'>{items.assignment.assignment_title}</h1>
            
            <h4 className='pl-2 py-2'>No of Student Submitted:{items.students.length}</h4>
            <div className='flex justify-center items-center py-2'>
            <button className=' mx-4 px-2 text-white bg-[#1eb2a6] font-bold'  onClick={()=>handleStudent(items.students)}>Show Details</button>
            <button onClick={() => handleShowQuestions(items.assignment.pdf)} className=' mx-4 px-2 text-white bg-[#1eb2a6] font-bold'>Questions</button>
            <button onClick={() => handleDeleteAssignment(items.assignment.id)} className=' mx-4 px-2 text-white bg-[#1eb2a6] font-bold'>Delete</button>
            </div>
            </div>
            <div className='pr-6 justify-items-center pt-6 text-3xl text-black'>
            
            </div>
        </div>
          ))}
    </div>
  )
}


export default Assignments
