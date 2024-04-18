import React from 'react'
import { FaVideo,FaAngleDown, FaAngleUp  } from "react-icons/fa";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ReactPlayer from 'react-player'

function StudentModule() {
   
    const [flippedModules, setFlippedModules] = useState({});
    const [isopen,setIsOpen]=useState(false)
   
    const[modules,setModules]=useState([])
    const[moduleId,setModuleId]=useState()
    const[isVideo,setIsVideo]=useState(false)
    const [videoUrl, setVideoUrl] = useState("");
    const[counter,setCounter]=useState(0)
    const[chapterId,setChapterId]=useState()

    
  
  
    const user=useSelector((store) => (store.authUser.user))
  
     
    const course = useSelector((store) => store.course.course);

    

    useEffect(()=>{
       console.log("course",course)
      axios.get('http://localhost:8000/api/studentmodule/',{ params: { id: course } })
      .then((response) => {
        setModules(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching modules:', error);
      });
  }, [course,counter]);
    

  
   
   
            const handleOpenChapters = (moduleId) => {
            setIsOpen(true);
            setModuleId(moduleId);
            };

      const handlestudentChapter= ()=>{
          setIsVideo(false);
         const data={
            id: user?.role_id,
             chapter:chapterId
          }
          console.log(user.role_id,chapterId)
          axios.post('http://localhost:8000/api/studentchapter/', data)
      .then((response) => {
        console.log('Chapter data sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending chapter data:', error);
      });
  };

        
      
        const handleClick = (moduleId) => {
        setFlippedModules((prevFlippedModules) => {
            return { ...prevFlippedModules, [moduleId]: !prevFlippedModules[moduleId] };
        });
        };

      const handleOpenVideo = (videoUrl,chapterId) => {
        console.log('iam in video')
        setVideoUrl(videoUrl);
        setIsVideo(true);
        setChapterId(chapterId);
      };
    
      return (
        <div className='p-4 '>
          <div className=' flex justify-center items-center'>
            <div className='relative w-[640px] h-[360px]'>
              <ReactPlayer url={`http://localhost:8000${videoUrl}`} controls onEnded={handlestudentChapter}/>
              <div className="absolute top-0 right-0 text-red-400 text-lg px-2 py-1 cursor-pointer" onClick={() => setIsVideo(false)}> X </div>
            </div>
          </div>
      
          {modules.map((items, index) => (
            <div className='w-3/5 pl-52'>
            <div className=' flex  mt-6'>
              <h1 className='text-2xl text-black font-bold'><span className='font-semibold text-lg'>Module {items.module.module_no} : </span>{items.module.module_title}</h1>
              <div className='pr-6 justify-items-center pl-6 text-3xl text-black' onClick={() => handleClick(items.module.id)}>
                {flippedModules[items.module.id] ? <FaAngleUp /> : <FaAngleDown />}
              </div>
              </div>
              {flippedModules[items.module.id] && (
                <div>
                  {items.chapters.map((chapter) => (
                    <div key={chapter.chapter_no}>
                      <div className='flex bg-black h-[1px] items-center mt-2 mr-2' />
                      <div className="flex justify-between pr-4 pt-2 text-black">
                        <p>{`Chapter ${chapter.chapter_no}: `}<span>{chapter.chapter_title}</span></p>
                        <button onClick={() => handleOpenVideo(chapter.video,chapter.id)}><FaVideo /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      );
      
    }
export default StudentModule;


