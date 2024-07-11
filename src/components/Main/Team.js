import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import Loader from '../Loader';
import axiosinstance from '../../routes/noauthinstance';


function Team() {
   const[team,setTeam]=useState([])
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosinstance.get('team/');
        setTeam(response.data);
        setLoading(false)
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[]);

  return (
    <>
    <div className='text-center mb-4'>
      <h4 className='text-xl text-[#1eb2a6] font-bold'>Team</h4>
      <h1 className='font-extrabold text-5xl pt-2'>Our Best Teachers</h1>
      </div>
      {loading ? (
            <Loader visible={loading} />
          ) : (
            team.length==0?(
              <div className='flex items-center justify-center m-4  h-96'>
              <h1 className='text-red-500 font-bold text-2xl'>Teachers are gearing up to bring you an enriching learning experience!</h1>
              </div>
            )  :( 


    <section className='m-8 px-[80px]'>
      <div className='  grid grid-cols-4 gap-30'>
      {team.map((val) => (
        <div className='m-8 bg-white border w-[250px] h-[350px] hover:bg-[#1eb2a6] hover:text-white hover:cursor-pointer'  style={{ boxShadow: '0 5px 25px -2px rgba(0, 0, 0, 0.06)',}}>
            <div className='w-full h-[70%] overflow-hidden'>
                <img src={val.profile_pic} alt=''  style={{ width: '100%', height: '100%', objectFit: 'fill' }} />
            </div>
          <div className='text-center py-4'>
            <h2 className='font-[500] text-[20px] duration-[.5s]'>{val.full_name}</h2>
            <p className='text-[15px] text-gray mt-[10px] duration-[.5s]'>{val.job_role}</p>
          </div>
        </div>
      
      ))}
      </div>
    </section>
            )
          )}
    
  </>
  )
}

export default Team
