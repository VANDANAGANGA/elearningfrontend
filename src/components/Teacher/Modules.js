import React from 'react'
import { FaVideo,FaAngleDown, FaAngleUp  } from "react-icons/fa";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player'
import { MdDeleteForever } from "react-icons/md";
import Swal from 'sweetalert2';
import instance from '../../routes/axios';
import { baseUrl } from '../../utils/urls';


function Modules() {
    const [showModal, setShowModal]=useState(false)
    const[moduleNo,setModuleNo]=useState(0)
    const[moduleTitle,setModuleTitle]=useState()
    const [flippedModules, setFlippedModules] = useState({});
    const [isopen,setIsOpen]=useState(false)
    const[chapterNo,setChapterNo]=useState(0)
    const[chapterTitle,setChapterTitle]=useState()
    const[videoFile,setVideoFile]=useState()
    const[modules,setModules]=useState([])
    const[moduleId,setModuleId]=useState()
    const[isVideo,setIsVideo]=useState(false)
    const [videoUrl, setVideoUrl] = useState("");
    const[counter,setCounter]=useState(0)
     
    const course = useSelector((store) => store.course.course);

    

    useEffect(()=>{
    
      instance.get('module/',{ params: { id: course } })
      .then((response) => {
        setModules(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching modules:', error);
      });
  }, [course,counter]);
    


    const handleSubmit = (e) => {
      e.preventDefault();
       const formData={
        module_no: moduleNo,
        module_title: moduleTitle,
        course:course
       }
       instance.post('module/', formData)
       .then(response => {
           console.log('Module created successfully:', response.data);
           setShowModal(false)
           setCounter((prevCounter) => prevCounter + 1); 
           // You can handle success, e.g., redirect to another page
       })
       .catch(error => {
           console.error('Error creating module:', error);
           // Handle error, e.g., show an error message
       });
};
   
const handleOpenChapters = (moduleId) => {
  setIsOpen(true);
  setModuleId(moduleId);
};

 const handleDeleteModule =(moduleId)=>{
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
      instance.delete('module/',{ params: { id: moduleId } })
        .then(response => {
          Swal.fire(
            'Deleted!',
            'Your module has been deleted.',
            'success'
          );
          setCounter((prevCounter) => prevCounter + 1);
        })
        .catch(error => {
          // Handle error response
          console.error('There was an error deleting the module:', error);
          Swal.fire(
            'Error!',
            'Could not delete the module. Please try again later.',
            'error'
          );
        });
    }
  });
};

 
       
 const handleDeleteChapter=(chapterId)=>{
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
      instance.delete('chapter/',{ params: { id: chapterId } })
        .then(response => {
          Swal.fire(
            'Deleted!',
            'Your Chapter has been deleted.',
            'success'
          );
          setCounter((prevCounter) => prevCounter + 1);
        })
        .catch(error => {
          // Handle error response
          console.error('There was an error deleting the Chapter:', error);
          Swal.fire(
            'Error!',
            'Could not delete the chapter. Please try again later.',
            'error'
          );
        });
    }
  });
};
      
const handleClick = (moduleId) => {
  setFlippedModules((prevFlippedModules) => {
    return { ...prevFlippedModules, [moduleId]: !prevFlippedModules[moduleId] };
  });
};

      const handlesave = (e) => {
        e.preventDefault();
        console.log('error here',moduleId)
        const chapterForm = {
         chapter_no:chapterNo,
         chapter_title:chapterTitle,
         module:moduleId,
         video:videoFile,
        }
        console.log('chapterform',chapterForm)
        instance.post('chapter/',chapterForm, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
            console.log('Module created successfully:', response.data);
            setIsOpen(false)
            setCounter((prevCounter) => prevCounter + 1); 
            // You can handle success, e.g., redirect to another page
        })
        .catch(error => {
            console.error('Error creating module:', error);
            // Handle error, e.g., show an error message
        });
      
      }  

      const handleOpenVideo = (videoUrl) => {
        console.log('iam in video')
        setVideoUrl(videoUrl);
        setIsVideo(true);
      };
    
  return (
    <div className='p-4'> 
         <div className="relative p-4 m-4">
      <button className=' absolute right-0 w-36 h-12 bg-[#1eb2a6] font-bold hover:bg-blue-400 px-4 py-2  rounded'  onClick={() => setShowModal(true)}>Add Module</button>
      </div>
      {showModal ? (
            <>
              
              <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button className="p-4 ml-auto  border-0 text-red-400  float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setShowModal(false)}>X </button>
                <div className="   border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black text-center PL-10">Add Module </h3>  
                </div>
                <form  className='space-y-6 p-4' onSubmit={handleSubmit}>
                <div className=" p-6  flex flex-col">
            <label className='text-black'>Module No</label>
            <input
              type="int"  
              className="px-2 py-1 border rounded m-4 text-black" value={moduleNo} onChange={(e)=>setModuleNo(e.target.value)}
            />
             <label className='text-black'>Module Title</label>
            <input
              type="text" className="px-2 py-1 border rounded m-4 text-black" value={moduleTitle} onChange={(e)=>setModuleTitle(e.target.value)} />
                </div>
                <div className='items-center justify-center flex'>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                    type="submit" disabled={!(moduleNo && moduleTitle)}>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          
        </>
      ) : null}
          
          { isVideo && (
            <div className=' flex justify-center items-center'>
              <div className='relative w-[640px] h-[360px]'>
         <ReactPlayer url={`${baseUrl}${videoUrl}`} controls onEnded={()=>setIsVideo(false)} />
         <div className="absolute top-0 right-0 text-red-400 text-lg px-2 py-1 cursor-pointer" onClick={()=>setIsVideo(false)}> X </div>
          </div>
          </div>
         )} 


         {modules.map((items, index) => (
       <div className='rounded-lg border-[1px] border-black text-black bg-white max-w-[500px] pl-6 py-2 my-2 '>
        <div className=' flex justify-end pr-2'>
        <button className='border mr-2 px-2'  onClick={() => handleOpenChapters(items.module.id)}>Add chapters</button>
        <button className='border ml-2 px-2'  onClick={() => handleDeleteModule(items.module.id)}>Delete</button>
        </div>
          <div className='flex justify-between'>
            <div>
            <h2>Module {items.module.module_no}</h2>
            <h1 className='pl-12 text-xl'>{items.module.module_title}</h1>
            <span>Chapters: {items.chapters.length}</span> 
            </div>
            <div className='pr-6 justify-items-center pt-6 text-3xl text-black' onClick={() => handleClick(items.module.id)}>
            {flippedModules[items.module.id] ?  <FaAngleUp /> : <FaAngleDown />}
            </div> 
            </div>
            {flippedModules[items.module.id] && (
  <div>
    {items.chapters.map((chapter) => (
      <div key={chapter.chapter_no}>
        <div className='flex bg-black h-[1px] items-center mt-2 mr-2' />
        <div className="flex justify-between pr-4 pt-2">
          <p>{`Chapter ${chapter.chapter_no}: `}<span>{chapter.chapter_title}</span></p>
          <div>
          <button className='mr-2' onClick={()=>handleOpenVideo(chapter.video)}><FaVideo/></button>
          <button className='ml-2 text-lg' onClick={()=>handleDeleteChapter(chapter.id)}><MdDeleteForever /></button>
          </div>
        </div>
      </div>
    ))}
  </div>
)}
       
     </div>
     ) )}
        {isopen? (
            <>
              <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button className="p-4 ml-auto  border-0 text-red-400  float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setIsOpen(false)}>X </button>
                <div className="   border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black text-center PL-10">Add Chapter </h3>  
                </div>
                <form  className='space-y-6 p-4' onSubmit={handlesave}>
                <div className=" p-6  flex flex-col">
            <label className='text-black'>Chapter No</label>
            <input type="int"  className="px-2 py-1 border rounded m-4 text-black" value={chapterNo} onChange={(e)=>setChapterNo(e.target.value)} />
             <label className='text-black'>Chapter Title</label>
            <input
              type="text" className="px-2 py-1 border rounded m-4 text-black" value={chapterTitle} onChange={(e)=>setChapterTitle(e.target.value)} />
                <div>
                <label className='text-black mr-4'>Video File:</label>
                  <input className='text-black' type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} />
                </div>
                </div>
                <div className='items-center justify-center flex'>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                    type="submit" disabled={!(chapterNo && chapterTitle && videoFile)}>Save</button>
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

export default Modules
