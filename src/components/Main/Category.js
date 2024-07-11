import React from "react"
import Heading from "./Heading"
import { useEffect, useState } from "react"
import instance from "../../routes/axios";
import axiosinstance from "../../routes/noauthinstance";

const Category = () => {
    const [online, setOnline] = useState([]);
    useEffect(() => {
        // Make an Axios GET request to your Django API endpoint
        axiosinstance.get('coursecategory/')
          .then(response => {
            // Once data is fetched, update the 'online' state with the data
            setOnline(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, []);

  return (
    <>
      <section className="" style={{backgroundColor: '#acddde',backgroundSize: 'cover',backgroundAttachment: 'fixed',
    position: 'absolute',top: '0',left: '0',zIndex: '-1',width: '100%',height:'100%',paddingTop: '15%',paddingRight: '50px',color: '#fff',marginBottom: '50px'}}>
        <div className="text-center pt-18 pr-20 ">
          <Heading subtitle="COURSES" title="Browse Our Online Courses" />
          <div className=" p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {online.map((val) => (
              <div
                className="bg-white shadow-md p-5 rounded text-center transition-transform transform hover:scale-105 hover:bg-[#1eb2a6] hover:text-white"
                key={val.id}
              >
                <div className="w-20 h-20 m-auto relative">
                  <img
                    src={val.icon_url}
                    alt={val.title}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h1 className=" text-black font-semibold text-2xl my-5">{val.title}</h1>
                <span className="bg-[#f8f8f8] px-4 py-2 font-semibold text-[#1eb2a6] text-sm rounded-full">
                  20 Courses
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;



