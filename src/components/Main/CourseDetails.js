import React from 'react'
import { useState ,useEffect } from 'react'
import { FaAngleDown, FaAngleUp  } from "react-icons/fa";
import { useParams} from 'react-router-dom';
import ReactPlayer from 'react-player'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { baseUrl } from '../../utils/urls';
import axiosinstance from '../../routes/noauthinstance';
import Loader from '../Loader';
import instance from '../../routes/axios';




function CourseDetails() {
  const { courseId } = useParams();
  console.log('courseId',courseId)
  const[flippedModules,setFlippedModules]=useState(false)
  const[course,setCourse]=useState()
  const[modules,setModules]=useState([])
  const navigate= useNavigate()
  const[data,setData]=useState()
  const[teacher,setTeacher]=useState()
  const [loading, setLoading] = useState(true);

  const user=useSelector((store) => (store.authUser.user))


  useEffect(() => {
    
    axiosinstance.get('coursedetailsmain/',{ params: { id: courseId } })
      .then(response => {
        console.log(response.data)
        setData(response.data)
        setCourse(response.data.course)
        setLoading(false)
        console.log(course)
        console.log('user',user)
        setModules(response.data.modules)
        setTeacher(response.data.teacher)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [courseId,user]);
 
  const handleClick = (moduleId) => {
    setFlippedModules((prevFlippedModules) => {
      return { ...prevFlippedModules, [moduleId]: !prevFlippedModules[moduleId] };
    });
  };
   
  const firstVideo = modules?.[0]?.chapters?.[0]?.video;
  
  const handlePrice =()=>{
    
    console.log(user);
    if (!user) {
      navigate('/login');
      return;
    } else if (user.role !== 2) {
      Swal.fire({
        icon: 'info',
        title: 'Login as Student',
        text: 'You need to login as a student to access the course.',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/login');
      });
      return;
    }
    if (user.role==2){
    axiosinstance.get('check-payment/',{ params: { id: user.role_id } })
    .then(response => {
      if (response.data.message === "Valid Plan exists for the student.") {
        console.log('i am here')
        const formData = {
          student: user.role_id,
          course: courseId
        };

        instance.post('studentcourse/', formData)
          .then( response => {
            console.log('i am here')
            console.log(response.data)
            if (response.status === 201) {
              Swal.fire({
                title: 'Success',
                text: 'Successfully Enrolled this Course ',
                icon: 'success',
                timer: 1000, 
                showConfirmButton: false
              }).then(() => {
                navigate('/student');
              });
            } else if (response.data.message === 'Student has already bought this course.')  {
              Swal.fire({
                title: 'Error!',
                text: 'You already Enrolled this course.',
                icon: 'error',
                timer: 1000, 
                showConfirmButton: false
              }).then(() => {
                navigate('/student');
              });
            } 
          })
          .catch(error => {
            // console.error('Error:', error);
          });
      }
      else if (response.data.message === "No valid Plan exists for the student.") {
        navigate('/pricing')
      }    
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
  }
  }
  return (
    <>
    {loading ? (
            <Loader visible={loading} />
          ) : (
    
    <section className="" style={{backgroundColor: '#acddde',backgroundSize: 'cover',backgroundAttachment: 'fixed',
    position: 'absolute',top: '0',left: '0',zIndex: '-1',width: '100%',paddingTop: '15%',paddingRight: '50px',color: '#fff',marginBottom: '50px'}}>
      {course?.title && (
        <div className=' flex flex-col items-center'>
        <h1 className='font-bold text-black m-2 text-4xl'>{course.title.toUpperCase()}</h1>
        <h1 className=' text-black  text-l m-4 pl-4'>{course.about}</h1>
        <h1 className='text-black text-xl font-semibold m-4'><span>{modules.length}Modules|</span><span>{data.num_assignments}Assignments|</span><span>{data.num_quizzes}Quizes</span></h1>

        {firstVideo && (
      <ReactPlayer url={`${baseUrl}${firstVideo}`} controls onEnded={handlePrice} />
    )}
  </div>
)}
           
    {modules.length==0?(
      <div className='flex items-center justify-center m-4 py-2'>
      <h1 className='text-red-500 font-bold text-2xl'>No courses available at the moment. Stay tuned for exciting updates!</h1>
      </div>
    )  :( 
      <>
       
        {modules.map(items => (
         <div className='border-black border-2 rounded-lg max-w-[500px] ml-14  py-2 my-2 '>
            <div className='flex justify-between'>
                <div className='text-black'>
                  <h1 className='pl-4'>Module {items.module.module_no}</h1>
                  <h1 className='pl-16 text-2xl font-semibold'>{items.module.module_title}</h1>
                  <h1 className='pl-4'>Chapters {items.chapters.length}</h1> 
                </div>
                <div className='pr-6 justify-items-center pt-6 text-3xl text-black' onClick={()=>handleClick(items.module.id)}>
                {flippedModules[items.module.id] ?   <FaAngleUp /> : <FaAngleDown />}
                </div> 

            </div>

             {flippedModules[items.module.id]  && (
           items.chapters.map( (chapters) =>(
           <div key={chapters.id}>
           <div className=' bg-black h-[1px]  mt-2 mr-2' />
          <span className='text-black pl-6'>{chapters.chapter_title}</span>
           </div>
           ))
          )}
         </div>
         ))}
         </>
         )}

{teacher && (
        <div className=' flex flex-col items-center mt-4'>
          <div className='border-2 border-black rounded-md max-w-xl'>

            <div className=' flex items-center ml-5 py-2'>
              <div className="relative w-20 h-20 mx-6 overflow-hidden rounded-full  border border-black">
              <img src={`${baseUrl}${teacher.profile_pic}`} alt="Profile" className="profile-pic"  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className='mx-6 text-black'>
              <h1 className='font-semibold'>Course Instructor</h1>
              <h1>{teacher.full_name}</h1>
              <h1>{teacher.job_role}</h1>
              </div>
            </div>
          <div className=' border border-black m-2'></div>
          <div className='text-black mx-2 p-2'>
            <h1>{teacher.about}</h1>
            <h1>+{teacher.years_of_experience} Yr of Experience</h1>
            <h1>Ex:{teacher.company_name}</h1>
          </div>
          </div>

        </div>
   )}
      <div className='text-center'>
      <button   onClick={handlePrice} className='px-8 py-4 bg-white text-[#1eb2a6] w-[300px] font-semibold border border-transparent my-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6]'>ENROLL NOW !</button>
      </div>
    </section>  
          )}
    </>  
  )
}

export default CourseDetails
