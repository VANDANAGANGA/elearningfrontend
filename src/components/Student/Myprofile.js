
import React, { useState,useEffect } from 'react'
import { FaEdit,FaCamera } from "react-icons/fa";
import { useSelector } from 'react-redux';
import axios from 'axios';
import instance from '../../routes/axios';
import { baseUrl } from '../../utils/urls';




function MyProfile() {
    const [modal,setModal]= useState(false)
    const [file, setFile] = useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = useState();
    const[profile,setProfile]=useState({})
    const [counter,setCounter]=useState(0)
    const [formData, setFormData] = useState({
        full_name: '',
        job_role: '',
        highest_education: '',
        specialization: '',
        mother_name: '',
        father_name: '',
        house_name: '',
        street: '',
        city:'',
        state:'',
        pin:''
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
    data.append('student_id', user?.role_id);
    data.append('full_name', formData.full_name);
    data.append('highest_education', formData.highest_education);
    data.append('specilization', formData.specialization);
    data.append('mother_name', formData.mother_name);
    data.append('father_name', formData.father_name);
    data.append('house_name', formData.house_name);
    data.append('street', formData.street);
    data.append('city', formData.city);
    data.append('state', formData.state);
    data.append('pin', formData.pin);
    
    if (file) {
        data.append('profile_pic', file); 
    }
    try {
        await instance.put('studentprofile/', data, {
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
    
    
    const user=useSelector((store) => (store.authUser.user))

      useEffect(()=>{
    
        instance.get('studentprofile/',{ params: { student_id:user?.role_id } })
        .then((response) => {
          setProfile(response.data);
          setFormData(response.data)
          setImagePreviewUrl(`${baseUrl}${response.data.profile_pic}`);
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching modules:', error);
        });
    }, [user?.role_id]);


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
            <img src={`${baseUrl}${profile.profile_pic}`} alt="Profile" className="profile-pic"  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className=''>
                <h1 className='font-bold text-black pt-4'>{profile.full_name}</h1>
                <h1 className='font-bold text-black pt-4'>Email:{profile.email}</h1>
                <h1 className='font-bold text-black pt-4'>Phone:{profile.phone_number}</h1>
            </div>
        </div>
        <div className='text-black text-xl pl-11 justify-center mr-11 '>
            <h1 className='font-bold p-4'>Education<span className='pl-2 font-semibold'>{profile.highest_education}</span></h1>
            <h1 className='font-bold p-4'>Specilization<span className='pl-2 font-semibold'>{profile.specialization}</span></h1>
            <h1 className='font-bold p-4'>Mothers Name<span className='pl-2 font-semibold'>{profile.mother_name}</span></h1>
            <h1 className='font-bold p-4'>Fathers Name<span className='pl-2 font-semibold'>{profile.father_name}</span></h1>
            <div className='text-black pt-8 font-bold text-xl'>
         <h1>Address</h1>
         <div className='flex flex-col ml-6'>
         <span className='text-l font-semibold pl-2'>{profile.house_name}</span>
         <span className='text-l font-semibold pl-2'>{profile.street}</span>
         <span className='text-l font-semibold pl-2'>{profile.city}</span>
         <span className='text-l font-semibold pl-2'>{profile.state}</span>
         <span className='text-l font-semibold pl-2'>Pin:{profile.pin}</span>
         </div>
        </div>
        </div>
       
      </div>
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
                            <span className='text-black px-2 '>Highest Education:</span>
                            <input  className='text-black round-lg  border-2 border-black px-4 m-2' type="text" name="job_role" value={formData.highest_education} onChange={handleChange} />
                            <span className='text-black px-2 '>Specilization:</span>
                            <textarea  className='text-black round-lg border-2 border-black px-4 m-2' name="about" value={formData.specialization} onChange={handleChange}></textarea>
                            <span className='text-black px-2 '>Mothers Name:</span>
                            <input  className='text-black round-lg border-2 border-black px-4 m-2' type="text" name="years_of_experience" value={formData.mother_name} onChange={handleChange} />
                            <span className='text-black px-2 '>Fathers Name:</span>
                            <input  className='text-black round-lg border-2 border-black px-4 m-2'type="text" name="company_name" value={formData.father_name} onChange={handleChange} />
                            <span className='text-black px-2 '>House Name:</span>
                            <input  className='text-black round-lg border-2 border-black px-4 m-2'type="text" name="company_name" value={formData.house_name} onChange={handleChange} />
                            <div className='flex justify-between'>
                            <div>
                            <span className='text-black px-2 '>Street:</span>
                            <input  className='text-black round-lg border-2 border-black px-4 m-2'type="text" name="company_name" value={formData.street} onChange={handleChange} />
                            </div>
                            <div>
                            <span className='text-black px-2 '>City:</span>
                            <input  className='text-black round-lg border-2 border-black px-4 m-2'type="text" name="company_name" value={formData.city} onChange={handleChange} />
                            </div>
                            </div>
                            <div className='flex justify-between'>
                            <div className=' flex flex-col'>
                            <span className='text-black px-2 '>State:</span>
                            <input  className='text-black round-lg border-2 border-black px-4 m-2'type="text" name="company_name" value={formData.state} onChange={handleChange} />
                            </div>
                            <div className='flex flex-col'>
                            <span className='text-black px-2 '>Pin:</span>
                            <input  className='text-black round-lg border-2 border-black px-4 m-2'type="text" name="company_name" value={formData.pin} onChange={handleChange} />
                            </div>
                            </div>
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

export default MyProfile
