import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import Swal from 'sweetalert2';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { IoIosAttach } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import instance from '../../routes/axios';
import { baseUrl } from '../../utils/urls';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

function StudentAssignments() {
    const[showModal, setShowModal]=useState(false)
    const[title,setTitle]=useState()
    const[number,setNumber]=useState()
    const[file,setFile]=useState()
    const[assignemnt,setAssignemnt]=useState([])
    const[question,setQuestion]=useState()
    const[counter,setCounter]=useState(0)
    const[filename,setFilename]=useState()
    
    const course = useSelector((store) => store.course.course);
    const user=useSelector((store) => (store.authUser.user))

    const handleSubmit= (id) => {
      if (!filename) {
        
        Swal.fire({
            title: 'Please select a file',
            icon: 'warning',
            timer: 2000,
        });
        return; 
    }

        const formData={
        assignment:id,
        student:user?.role_id,
        answer:filename
        }
        instance.post('studentassignment/',formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            Swal.fire({
              title: 'Assignment Submitted successfully',
              icon: 'success',
              timer: 2000,
            })
            setShowModal(false)
            setCounter((prevCounter) => prevCounter + 1); 
          })
          .catch(error => {
            Swal.fire({
              title: 'Sorry Assignment not Submitted!',
              icon: 'failed',
              timer: 2000,})
          });
           
          }
      

    
     
      useEffect(()=>{
    
        instance.get('studentassignment/',{ params: { id: course,student_id:user?.role_id } })
        .then((response) => {
          setAssignemnt(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching modules:', error);
        });
    }, [course,counter,user?.role_id]);

    
    const handleShowQuestions = (pdf) => {
      console.log(' i am here',pdf)
      setQuestion(pdf);
      console.log(question)
    };


  return (
    <div className='p-4'> 
        
      
      {question && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='p-8 w-1/2 h-3/4 rounded-lg'>
            <button className='absolute top-4 right-4 text-red-400 text-3xl' onClick={() => setQuestion(null)}>
              X
            </button>
            <Document file={`${baseUrl}${question}`} onLoadSuccess=''>
              <Page pageNumber={1} />
            </Document>
          </div>
        </div>
      )}
         { assignemnt.map( (items) => (
        <div className='flex my-2  w-3/5 items-center '>
           <div className=' flex items-center justify-between mr-4'>
            <h1 className=' text-2xl text-black font-bold'><span className='text-lg font-semibold px-6'>Assignment {items.assignment.assignment_no}</span> {items.assignment.assignment_title}</h1>
            <button onClick={() => handleShowQuestions(items.assignment.pdf)} className=' ml-12 px-2 text-black text-2xl font-bold'><FaQuestionCircle /></button>
            </div>
           {/* <div className='flex items-center justify-center'>
            <label className='text-black text-2xl'><IoIosAttach />
            <input type="file"  className="text-sm hidden"  accept="application/pdf"  onChange={(e)=>setFilename(e.target.files[0])}/></label>
            <button className='text-black text-lg' onClick={()=>handleSubmit(items.assignment.id)}>submit</button>
            </div> */}
         <div className='flex items-center justify-center ml-4'>
         
      {items.student_assignments.submitted_at ? (
         <>
        <button onClick={()=> handleShowQuestions(items.student_assignments.answer)}  className='text-black text-lg'> <FaFileAlt /> </button>
        {items.student_assignments.verified ? (
      <span className="text-green-500 ml-2">Verified</span>
    ) : (
      <span className="text-red-500 ml-2">Not Verified</span>
    )}

        </>
      ) : (
        <>
          <label className='text-black text-2xl'>
            <IoIosAttach />
            <input type="file" className="text-sm hidden" accept="application/pdf" onChange={(e) => setFilename(e.target.files[0])} />
          </label>
          <button className='text-black text-lg' onClick={() => handleSubmit(items.assignment.id)}>Submit</button>
        </>
      )}
    </div>
           </div>
          ))}
    </div>
  )
}


export default StudentAssignments
