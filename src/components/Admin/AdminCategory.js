import React from 'react'
import Category from '../Main/Category'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import instance from '../../routes/axios';
import Loader from '../Loader';


function AdminCategory() {
  const [online, setOnline] = useState([]);
  const [showModal, setShowModal]=useState(false)
  const[category,setCategory]=useState()
  const[image_url,setImage_url]=useState()
  const[counter,setCounter]=useState(0)
  const [loading, setLoading] = useState(true); 



  useEffect(() => {
    
      instance.get('coursecategory/')
        .then(response => {
          setOnline(response.data);
          setLoading(false)
          console.log(response.data)
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }, [counter]);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      {
    
    const formData = {
    title:category,
    icon_url:image_url
      };
    
      console.log(formData)
      instance.post('coursecategory/',formData)
        
          .then(response => {
            if (response.data && response.data.success) {
            
              Swal.fire({
                title: 'New Category added',
                icon: 'success',
                confirmButtonText: 'OK'
              })
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

    const handleDelete = (categoryId) => {
      instance.delete('coursecategory/',{id:categoryId})
        .then(response => {
          setCounter((prevCounter) => prevCounter + 1); 
          Swal.fire({
            title: 'Category Deleted',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        })
        .catch(error => {
          Swal.fire({
            title: 'Failed to delete category',
            icon: 'Failed',
            confirmButtonText: 'OK'
          });
          console.error('Error:', error);
        });
    };
    
    

  return (
    <section className='w-full'>
    
      <div className='text-center '>
        <h1 className='text-center text-black text-4xl font-extrabold' >CATEGORY</h1>
      </div>
      <div className="relative p-4 m-4">
      <button className=' absolute right-0 w-36 h-12 bg-[#1eb2a6] font-bold hover:bg-blue-400 px-4 py-2  rounded'  onClick={() => setShowModal(true)}>Add Category</button>
      </div>
          {showModal ? (
            <>
              
              <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-2/5 my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button
                    className="p-4 ml-auto  border-0 text-red-400  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}>X </button>
                <div className="  p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black text-center PL-10">ADD CATEGORY </h3>  
                </div>
                <form  className='space-y-6 p-4' onSubmit={handleSubmit}>
                <div className=" p-6  flex flex-col">
            <label className='text-black'>Category Name</label>
            <input
              type="text"  
              className="px-2 py-1 border rounded m-4 text-black" value={category} onChange={(e)=>setCategory(e.target.value)}
            />
             <label className='text-black'>Category image_url</label>
            <input
              type="text"
              className="px-2 py-1 border rounded m-4 text-black" value={image_url} onChange={(e)=>setImage_url(e.target.value)} />
                </div>
                <div className='items-center justify-center flex'>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 "
                    type="submit" disabled={!(category && image_url)}>Save</button>
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
   online.length==0?(
      <div className='flex items-center justify-center m-4  h-96'>
      <h1 className='text-red-500 font-bold text-2xl'>New categories are on the way! Stay tuned for exciting updates and opportunities!</h1>
      </div>
    )  :( 
      <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
     
    {online.map((val) => (
      <div
        className="bg-white shadow-md p-5 rounded text-center transition-transform transform hover:scale-105 hover:bg-[#1eb2a6] hover:text-white"
        key={val.id}
      >
        <div className='flex justify-end'>
       <button className='text-black border border-black px-2'  onClick={() => handleDelete(val.id)}>Delete</button>
       </div>
        <div className="w-20 h-20 m-auto relative">
         
          <img
            src={val.icon_url}
            alt={val.title}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <h1 className=" text-black font-semibold text-2xl my-5">{val.title}</h1>
        <span className="bg-[#f8f8f8] px-4 py-2 font-semibold text-[#1eb2a6] text-sm rounded-full">
          {val.num_courses} Courses
        </span>
      </div>
    ))}
  </div>
          ))}
  </section>
)
}
export default AdminCategory;
