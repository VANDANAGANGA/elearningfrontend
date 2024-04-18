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
import { Table ,Modal} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar,Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa";



// /'pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

function AllAssignments() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [modalUserId, setModalUserId] = useState(null);
  const [modalUsername, setModalUsername] = useState("");
  const [isEditSuccessful, setIsEditSuccessful] = useState(0);

  const showModal = (userId, action, username) => {
    console.log('am here 11111111')
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
                <MdVerified alt="verified" style={{ width: 30, height: 30, marginRight: 8, cursor:'pointer'}} onClick={()=>showModal(record.user_id,"verified",record.full_name)} />
              ) : (
                <GoUnverified  alt="not verified"  style={{ width: 30, height: 30, marginRight: 8, cursor: 'pointer' }} onClick={()=>showModal(record.user_id,"not verified",record.full_name)} />
              )}
            </div>
          )}
          
     ]
    const [assignment,setAssignment]=useState([])
    const[question,setQuestion]=useState()
    const[student,setStudent]=useState([])
    const[modal,setModal]=useState(false)
    const navigate= useNavigate()
    const dispatch = useDispatch();
    const user=useSelector((store) => (store.authUser.user))
    console.log("user:",user)
    useEffect(()=>{
    
        axios.get('http://localhost:8000/api/teacherallassignment/',{ params: { id: user.role_id } })
        .then((response) => {
         setAssignment(response.data);
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
    navigate('/teacher/coursedetails/assignments')
 }  
 const handleCreateCourse=()=>{
    navigate('/teacher/')
 }
 const handleStudent=(student)=>{
    setStudent(student)
    console.log(student)
    setModal(true)
 }
 const handleModalClose = () => {
  console.log('ia am here ')
  setIsModalVisible(false);
};


  const handleEdit = async () => {
    try {
      const response = await axios.put('http://127.0.0.1:8000/api//', { id: modalUserId });
      console.log('User updated successfully', response.data);
      setIsModalVisible(false);
      setIsEditSuccessful((prevCounter) => prevCounter + 1); 
    } catch (error) {
      console.error('Error updating teacher:', error);
    }
  };



  return (
    <section className='w-full'>
    
      <div className='text-center '>
        <h1 className='text-center text-black text-4xl font-extrabold' >Assignment</h1>
      </div>
      {question && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50'>
          <div className='  p-8 w-1/2 h-3/4 rounded-lg relative z-50'>
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
            zIndex: 1000,
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
         <h2 className='text-red-500 font-semibold'>{`Are you  ${modalAction === 'verified' ? 'verified' : 'not verified'} ${modalUsername}?`}</h2>
         <div className='flex flex-row-reverse'>
         <button className='rounded-full border py-2  px-4 m-2 text-white' onClick={handleModalClose}>Close</button>
         <button className='rounded-full border py-2 px-4 m-2 text-white' onClick={()=>handleEdit(modalUserId)}>{modalAction === 'verified' ? 'verified' : 'not verified'}</button>
        </div>
          </Modal>


      {assignment.length === 0 ? (
  <div className='ml-8 pl-5 text-red-500 my-4 text-center pt-40 '>
     <h1 className='text-2xl font-bold'> Create A Course and Start Teaching</h1>
    <button className='pl-2 hover:cursor-pointer' onClick={handleCreateCourse}>
      Click here to create a new Course
    </button>
  </div>
) : (

      assignment.map((items,index)=>(
      <div className='mt-2 ml-6'>
        <h1 className='text-2xl text-black font-semibold'>{index+1}.{items.course.title}</h1>
       
        {items.assignments.length === 0 ? (
              <div className=' ml-8 pl-5 text-red-500 my-4'>No assignments created yet.<buttton  className='pl-2 hover:cursor-pointer' onClick={()=>handleCreateAssignment(items.course.id)}>Click here to create a new Assignemnt</buttton> </div>
            ) : (
        <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">           
    {items.assignments.map((item) => (
      <div key='' className='bg-cyan-400 w-full min-h-[150px] p-4 rounded flex flex-col m-4 relative '>
      <h1 className=" text-black font-semibold text-l ">Assignment.{item.assignment.assignment_no}</h1>
      <h1 className='text-black font-bold pl-6'>{item.assignment.assignment_title}</h1>
      <div className='flex justify-center text-3xl text-black pt-4'>
      <button className='pr-6' onClick={()=>handleStudent(item.students)}><FcViewDetails /></button>
      <button className='pl-6' onClick={() => handleShowQuestions(item.assignment.pdf)} ><FaClipboardQuestion /></button>
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

export default AllAssignments
