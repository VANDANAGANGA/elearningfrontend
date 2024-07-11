import React from 'react'
import { useState,useEffect } from 'react';
import Swal from 'sweetalert2';
import { MdDateRange } from "react-icons/md";
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import instance from '../../routes/axios';
import Loader from '../Loader';

function Shedule() {
  const[data, setData] = useState([]);
  const [showModal, setShowModal]=useState(false)
  const[title,setTitle]=useState()
  const[about,setAbout]=useState()
  const[date,setDate]=useState([])
  const [filterOption, setFilterOption] = useState('today');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true); 

  const navigate= useNavigate()
  const dispatch = useDispatch();
  const[counter,setCounter]=useState(0)


  const user=useSelector((store) => (store.authUser.user))

  const handleComplete = (sheduleId) =>{
    console.log('iam here',sheduleId);
    instance.put('shedule/',null,{ params: { id: sheduleId } })
    .then(response => {
      console.log(response)
      setCounter((prevCounter) => prevCounter + 1);
    })
    .catch(error => {
      console.error('Error:', error);
    });
   
   }


  useEffect(() => {
       console.log('teacher_id',user.role_id)
      
       instance.get('shedule/',{ params: { id: user?.role_id } })
        .then(response => {
          console.log(response)
          setData(response.data);
          setLoading(false)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    
    }, [user,counter]);
    
    
    useEffect(() => {
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];
        console.log(formattedCurrentDate)
      
        if (filterOption === 'today') {
          const todayData = data.filter((shedule) => shedule.date === formattedCurrentDate);
          setFilteredData(todayData);
        } else if (filterOption === 'completed') {
          const completedData = data.filter((shedule) => shedule.date < formattedCurrentDate);
          setFilteredData(completedData);
        } else if (filterOption === 'upcoming') {
          const upcomingData = data.filter((shedule) => shedule.date > formattedCurrentDate);
          setFilteredData(upcomingData);
        }
      }, [data, filterOption,counter]);


    const handleSubmit = (e) => {
      e.preventDefault();
      {
    const formData = {
        title:title,
        teacher:user.role_id,
        date:date,
        about:about

      };
    
      console.log(formData)
        instance.post('shedule/', formData)
          .then(response => {
            if (response.data) {
              // Display a SweetAlert with a success message
              Swal.fire({
                title: 'New Shedule Created Successfully',
                icon: 'success',
                confirmButtonText: 'OK'
              })
              setShowModal(false)
              setCounter((prevCounter) => prevCounter + 1);
            } else {
              Swal.fire({
                title: 'Failed',
                icon: 'Failed',
                confirmButtonText: 'OK'
              })
              console.error(response.data.error);
            }
          })
          .catch(error => {
            Swal.fire({
              title: 'Failed',
              icon: 'Failed',
              confirmButtonText: 'OK'
            })
            
            console.error(error);
          });
      };
  
    }
    
  return (
    <section className='w-full'>
    
      <div className='text-center '>
        <h1 className='text-center text-black text-4xl font-extrabold' >My Schedule</h1>
      </div>
      <div className='flex items-center justify-between'>
      <div>
      <select className="px-2 py-1 border rounded m-4 text-black"  value={filterOption} onChange={(e)=>setFilterOption(e.target.value)}  >
                <option  value='today'>Today</option>
                <option  value='completed'>Completed</option>
                <option  value='upcoming'>Upcomming</option>
            </select>    
      </div>
      <div className="relative p-4 m-4">
      <button className=' absolute right-0 w-36 h-18 bg-[#1eb2a6] font-bold  px-4 py-2  rounded'  onClick={() => setShowModal(true)}>Make Shedule</button>
      </div>
      </div>

      
          {showModal ? (
            <>
              
              <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button
                    className="px-4 ml-auto  border-0 text-red-400  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>X </button>
                <div className="  border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black text-center PL-10">Create Shedule </h3>  
                </div>
                
                <form  className='space-y-6 p-4' onSubmit={handleSubmit}>
                <div className=" p-6  flex flex-col">
            <label className='text-black'>Title</label>
            <input type="text" className="px-2 py-1 border rounded m-4 text-black" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            <label className='text-black'>About</label>
            <input type="text" className="px-2 py-1 border rounded m-4 text-black" value={about} onChange={(e)=>setAbout(e.target.value)} />
            <label className='text-black'>Date</label>
            <input type="date" className="px-2 py-1 border rounded m-4 text-black" value={date} onChange={(e)=>setDate(e.target.value)} />
             </div>
                <div className='items-center justify-center flex'>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                    type="submit" disabled=''>Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          
        </>
      ) : null}
      
 {loading ? (
            <Loader visible={loading} />
          ) : (
       data.length==0?(
      <div className='h-fit pt-40 flex items-center justify-center'>
      <h1 className='text-red-500 font-bold text-2xl'>Make Schedule And Start Teaching</h1>
      </div>
    )  :( 

    <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
    {filteredData.map((shedule) => (
      <div key={shedule.id}  className={`w-full min-h-[150px] p-4 rounded flex flex-col m-4 relative ${
        shedule.completed
          ? 'bg-green-400'  
          : shedule.is_active
          ? 'bg-blue-400'   
          : 'bg-red-400'    
      }`}>
      <h1 className=" text-black font-semibold text-l my-2 pl-2 text-center">{shedule.title}</h1>
      <div className='flex text-xs py-4'>
      <span className='text-lg pr-4 text-black font-semibold'><MdDateRange /></span>
      <span className='text-black font-semibold'>{shedule.date}</span>
      </div>
      <div className='whitespace-pre-wrap'>
        <p className="text-sm text-gray-800">
         {shedule.about}</p>
        </div>
      <button className="bg-white text-black px-4 py-2 mt-2  font-semibold  text-sm rounded-full" onClick={() => handleComplete(shedule.id)}>{shedule.completed ? 'Completed' : 'Complete'}</button>
      </div>
         ))}    
        </div>
    ))}
    
   
    
    
</section>
    
  )
}

export default Shedule;

