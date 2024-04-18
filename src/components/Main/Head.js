import React from "react"
import { FaFacebookF,FaInstagramSquare,FaTwitter,FaYoutube } from "react-icons/fa";

const Head = () => {
  return (
    <>
      <section className='m-[20px]'>
        <div className='flex justify-between'>
          <div>
            <h1 style={{ margin: '-1', padding: '-1' }}  className="text-gray-500 font-[900] text-[35px] my-0 py-0">SKILLSAGE</h1>
            <span style={{ margin: '-1', padding: '-1' }}  className="text-gray-500 text-[18px] my-0 py-0 ">ONLINE EDUCATION & LEARNING</span>
          </div>
          
          <div className='m-[30px] flex space-x-[10px]'>
              <div className='bg-white bg-opacity-20 rounded-full w-[40px] h-[40px] flex items-center justify-center'>
               <i className='text-[#1eb2a6] fab fa-facebook-f icon'><FaFacebookF/></i>
              </div>
              <div className='bg-white bg-opacity-20 rounded-full w-[40px] h-[40px] flex items-center justify-center'>
               <i className='text-[#1eb2a6] fab fa-instagram icon'><FaInstagramSquare /></i>
              </div>
              <div className='bg-white bg-opacity-20 rounded-full w-[40px] h-[40px] flex items-center justify-center'>
               <i className='text-[#1eb2a6] fab fa-twitter icon'><FaTwitter /></i>
              </div>
              <div className='bg-white bg-opacity-20 rounded-full w-[40px] h-[40px] flex items-center justify-center'>
               <i className='text-[#1eb2a6] fab fa-youtube icon'><FaYoutube /></i>
              </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Head