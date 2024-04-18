import React, { useState,useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaCamera } from "react-icons/fa";

function Profile() {
    const user=useSelector((store) => (store.authUser.user))
    const [file, setFile] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const[profile,setProfile]=useState({})
    const [modal, setModal] = useState(false);
    const [counter,setCounter]=useState(0)
    const [formData, setFormData] = useState({
        full_name: '',
        job_role: '',
        about: '',
        years_of_experience: '',
        company_name: '',
        phone_number: '',
        email: '',
        account: ''
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const newFile = e.target.files[0];
    reader.onloadend = () => {
      setFile(newFile);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(newFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(); // Use FormData to handle file uploads
    data.append('user_id', user?.id);
    data.append('teacher_id', user?.role_id);
    data.append('full_name', formData.full_name);
    data.append('job_role', formData.job_role);
    data.append('about', formData.about);
    data.append('years_of_experience', formData.years_of_experience);
    data.append('company_name', formData.company_name);
    if (file) {
        data.append('profile_pic', file); 
    }
    try {
        await axios.put(`http://localhost:8000/api/teacherprofile/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data', 
            },
        });
        setModal(false);
        setCounter((prevCounter) => prevCounter + 1);

    } catch (error) {
        console.error('Error updating profile:', error);
    }
};

    useEffect(()=>{
  
      axios.get('http://localhost:8000/api/teacherprofile/',{ params: { teacher_id:user?.role_id } })
      .then((response) => {
        setProfile(response.data);
        setFormData(response.data)
        setImagePreviewUrl(`http://localhost:8000${response.data.profile_pic}`);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching modules:', error);
      });
  }, [user?.role_id,counter]);

  return (
    <section className='w-full'>
    
      <div className='text-center '>
        <h1 className='text-center text-black text-4xl font-extrabold' >My Profile</h1>
      </div>
      <div className="relative p-4 m-4">
      <button className=' absolute right-0 text-black  text-3xl'  onClick={() => setModal(true)}><FaEdit /></button>
      </div>
      <div className='m-11  mt-11 flex justify-between'>
        <div className='justify-center text-center'>
            <div className=' w-[200px] h-[250px] bg-black'>
            <img src={`http://localhost:8000${profile.profile_pic}`} alt="Profile" className="profile-pic"  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className=''>
                <h1 className='font-bold text-black pt-4'>{profile.full_name}</h1>
                <h1 className='font-bold text-black pt-4'>{profile.job_role}</h1>
            </div>
        </div>
        <div className='text-black text-xl pl-11 justify-center mr-11 '>
            <h1 className='font-bold p-4'>About:<span className='pl-2 font-semibold'>{profile.about}</span></h1>
            <h1 className='font-bold p-4'>Experience:<span className='pl-2 font-semibold'>{profile.years_of_experience} yr of experience</span></h1>
            <h1 className='font-bold p-4'>Worked At:<span className='pl-2 font-semibold'>{profile.company_name}</span></h1>
            <div className='text-black pt-8 font-bold text-xl'>
         <h1>CONTACT</h1>
         <h1 className='pl-6 pt-2'>PH:<span className='text-l font-semibold pl-2'>{profile.phone_number}</span> </h1>
         <h1 className='pl-6 pt-4'>EMAIL:<span className='text-l font-semibold pl-2'>{profile.email}</span></h1>
        </div>
        </div>
      </div>
      <h1 className='pl-6 pt-4 text-black font-semibold text-2xl' >Account:<span className='text-l font-semibold pl-2'>{profile.account}</span></h1>

      {modal && (
                 <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
            <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button className="p-4 ml-auto  border-0 text-red-400  float-right text-3xl leading-none font-semibold outline-none focus:outline-none" onClick={() => setModal(false)}>X </button>
                        <form onSubmit={handleSubmit} >


                        <div className='flex flex-col px-4 m2-2'>
                        <label htmlFor="photo-upload" className="">
        <div className='flex justify-center'>
                <div className="relative w-20 h-20 overflow-hidden rounded-full  border border-black">
                    <img htmlFor="photo-upload" src={imagePreviewUrl} alt="Preview" className="w-full h-full" />
                    <div className="before:absolute before:top-1/2 before:left-1/2 before:transform-translate-x-[-50%] before:transform-translate-y-[-50%] before:content-['\f093'] before:font-size-90px before:position-absolute before:padding-top-80px before:text-center before:text-teal-500 before:width-200px before:height-200px before:border-radius-full before:opacity-0 before:transition-500 before:bg-white" ></div>
                </div>
                <div className='flex place-items-end'>
                <label htmlFor="photo-upload" className="cursor-pointer">
                      <FaCamera className="text-black" />
                      <input id="photo-upload" type="file" onChange={photoUpload} className="hidden" />
                </label>
                </div>
         </div>
      </label>
                        
                          <span className='text-black px-2 '>Full Name:</span>
                            <input className='text-black round-lg border-2 border-black px-4 m-2' type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
                            <span className='text-black px-2 '>job Role:</span>
                            <input  className='text-black round-lg  border-2 border-black px-4 m-2' type="text" name="job_role" value={formData.job_role} onChange={handleChange} />
                            <span className='text-black px-2 '>About:</span>
                            <textarea  className='text-black round-lg border-2 border-black px-4 m-2' name="about" value={formData.about} onChange={handleChange}></textarea>
                            <span className='text-black px-2 '>Years of Experiences:</span>
                            <input  className='text-black round-lg border-2 border-black px-4 m-2' type="text" name="years_of_experience" value={formData.years_of_experience} onChange={handleChange} />
                            <span className='text-black px-2 '>Company Name:</span>
                            <input  className='text-black round-lg border-2 border-black px-4 m-2'type="text" name="company_name" value={formData.company_name} onChange={handleChange} />
                            
                            </div>
                            <div className=' flex justify-center items-center m-2'>
                            <button className='text-black round-lg border-2 px-4 py-2' type="submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
                </>
            )}
      </section>
  )
}

export default Profile
