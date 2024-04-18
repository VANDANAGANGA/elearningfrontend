import React,{useState} from 'react';
import Heading from './Heading';
import axios from 'axios';
import { useEffect } from 'react';

function About() {
  const[data,setData]=useState()

  useEffect(() => {
    // Make an Axios GET request to your Django API endpoint
    axios.get('http://localhost:8000/api/about/')
      .then(response => {
        // Once data is fetched, update the 'online' state with the data
        console.log(response.data)
        setData(response.data)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [data]);

    const awrapper = [
        {
          cover: "https://img.icons8.com/external-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto/80/ffffff/external-graduation-education-yogi-aprelliyanto-basic-outline-yogi-aprelliyanto.png",
          data: data?.total_students,
          title: "SUCCESS STORIES",
        },
      
        {
          cover: "https://img.icons8.com/ios/80/ffffff/athlete.png",
          data: data?.total_teachers,
          title: "TRUSTED TUTORS",
        },
        {
          cover: "https://img.icons8.com/external-outline-icons-maxicons/80/ffffff/external-calender-insurance-outline-outline-icons-maxicons.png",
          data: "1,000",
          title: "SCHEDULES",
        },
        {
          cover: "https://img.icons8.com/ios/80/ffffff/macbook-idea--v3.png",
          data: data?.total_course, 
          title: "COURSES",
        },
      ]
      const homeAbout = [
        {
          id: 1,
          cover: "https://img.icons8.com/dotty/80/000000/storytelling.png",
          title: "Online Courses",
          desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        },
        {
          id: 1,
          cover: "https://img.icons8.com/ios/80/000000/diploma.png",
          title: "Earn A Certificates",
          desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        },
        {
          id: 1,
          cover: "https://img.icons8.com/ios/80/000000/athlete.png",
          title: "Learn with Expert",
          desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        },
      ]
  return (
    <>
    <section className='h-auto'>
      <div className='flex '>
        <div className='w-full h-screen'>
          <img src='https://raw.githubusercontent.com/sunil9813/Education-Website-Using-ReactJS/master/public/images/about.webp' className='h-full' alt='' />
        </div>
        <div className='px-[80px] py-[48px] h-screen'>
          <h4 className='text-xl text-[#1eb2a6] font-bold'>LEARN ANYTHING</h4>
           <h1 className='font-extrabold text-5xl pt-2'>Benefits About Online Learning Expertise</h1>
          <div className='mt-[50px]'>
            {homeAbout.map((val) => {
              return (
                <div className='mt-[30px] p-[20px] bg-white duration-[.5s] flex hover:bg-[#1eb2a6] hover:text-white hover:cursor-pointer' style={{ boxShadow: '0 5px 25px -2px rgba(0, 0, 0, 0.06)',}}>
                  <div className='w-[200px]'>
                    <img src={val.cover} alt='' className='w-[70px] h-[70px]' />
                  </div>
                  <div className='text'>
                    <h2 className='text-[20px] mb-[15px]'>{val.title}</h2>
                    <p className='text-[#999999] hover:text-white'>{val.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
    <div className='h-[20vh] text-white flex mt-8 p-2 mb-2' style={{ backgroundImage: 'url("https://raw.githubusercontent.com/sunil9813/Education-Website-Using-ReactJS/master/public/images/awrapper.webp")', backgroundPosition: 'center', }}>
          {awrapper.map((val) => {
            return (
              <div className='px-[70px] flex '>
                <div className='mr-[30px]'>
                  <img src={val.cover} alt='' />
                </div>
                <div className='text'>
                  <h1 className='text-[50px] font-semibold'>{val.data}</h1>
                  <h3 className='text-20px font-[500]'>{val.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
  </>
  )
}

export default About
