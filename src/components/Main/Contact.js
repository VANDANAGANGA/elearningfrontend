import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { FaFacebookF,FaInstagramSquare,FaTwitter,FaYoutube } from "react-icons/fa";
import axiosinstance from '../../routes/noauthinstance';

function Contact() {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const response= await axiosinstance.post('contact/', formData);
        if (response.status === 200) {
          Swal.fire({
              icon: 'success',
              title: 'Success!',
              text: 'Email sent successfully.',
          }).then(() => {
            // Clear the form data
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        });
      }
  } catch (error) {
      console.error('Error:', error.response.data);
      Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
      });
  }
};
  return (
    <>
     <h1 className='font-extrabold text-5xl pt-2 text-center'>Contact Us</h1>
    <section className='m-10 h-fit'>
      <div className='flex border m-8'>
        <div className='w-full h-full'>
        <iframe width="100%" height="700" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Kkanad,%20Kochi,Kerala,682042+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.maps.ie/population/">Population mapping</a></iframe>
        </div>
        <div className='w-full h-full p-4'>
          <p className='text-[20px] text-gray-400 font-semibold'>We're open for any suggestion or just to have a chat</p>

          <div className='flex justify-between mt-4'>
            <div className='box'>
              <h4 className='font-bold pb-2'>ADDRESS:</h4>
              <p className='text-gray-500 font-semibold'>2977+JFX, Infopark Campus</p>
              <p className='text-gray-500 font-semibold'>Kochi, Kakkanad</p>
              <p className='text-gray-500 font-semibold'></p>
            </div>
            <div className='box'>
              <h4 className='font-bold pb-2'>EMAIL:</h4>
              <p className='text-gray-500 font-semibold'> skillsaga@info.com</p>
            </div>
            <div className='box'>
              <h4 className='font-bold pb-2'>PHONE:</h4>
              <p className='text-gray-500 font-semibold'> + 1235 2355 98</p>
            </div>
          </div>

          
          <form className='p-2' onSubmit={handleSubmit}>
              <div className='flex mt-8 '>
                <input className='border p-4 border-black w-full mr-2' type='text' name='name' value={formData.name} onChange={handleChange} placeholder='Name' />
                <input className='border border-black p-4 w-full' type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email' />
              </div>
              <input className='border border-black w-full p-4 my-4' type='text' name='subject' value={formData.subject} onChange={handleChange} placeholder='Subject' />
              <textarea className='border border-black w-full h-full' name='message' value={formData.message} onChange={handleChange} cols='30' rows='5' placeholder='Create a message here...'></textarea>
              <button type="submit" className="transition-all border-2 border-[#1eb2a6] mt-8 duration-500 p-4 ease-in-out hover:bg-[#1eb2a6] hover:text-white">SEND MESSAGE</button>
            </form>


          <h3 className='font-bold text-xl'>Follow us here</h3>
          <div className='m-[30px] flex space-x-[10px]'>
              <div className='bg-[#1eb2a6]  rounded-full w-[40px] h-[40px] flex items-center justify-center'>
               <i className='text-white fab fa-facebook-f icon'><FaFacebookF/></i>
              </div>
              <div className='bg-[#1eb2a6] rounded-full w-[40px] h-[40px] flex items-center justify-center'>
               <i className='text-white fab fa-instagram icon'><FaInstagramSquare/></i>
              </div>
              <div className='bg-[#1eb2a6]  rounded-full w-[40px] h-[40px] flex items-center justify-center'>
               <i className='text-white fab fa-twitter icon'><FaTwitter/></i>
              </div>
              <div className='bg-[#1eb2a6]  rounded-full w-[40px] h-[40px] flex items-center justify-center'>
               <i className='text-white fab fa-youtube icon'><FaYoutube/></i>
              </div>
          </div>
        </div>
      </div>
    </section>
  </>
  )
}

export default Contact
