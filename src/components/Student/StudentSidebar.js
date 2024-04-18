import React, { useState } from 'react';
import {
    FaUserAlt,
    FaMedium,
    FaBookReader,
    FaRegFileImage,
    FaCube,
    FaChevronCircleDown
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StudentSidebar = ({children}) => {
    const navigate=useNavigate()
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
     
    
const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/')
   }


    const menuItem=[
        {
            path:"/courses",
            name:"Course",
            icon:<FaBookReader/>
        },
        {
            path:"/student",
            name:"My Courses",
            icon:<FaBookReader/>
        },
       
        {
            path:"/student/profile",
            name:"My Profile",
            icon:<FaUserAlt/>
        },
        
        // {
        //     name:"Logout",
        //     icon:<FaChevronCircleDown/>,
        //     onClick: handleLogout
        // }
    ]
    return (
        <div className="flex ml-6">
           <div  className=" bg-slate-500 text-white h-screen w-40 transition-all duration-500 w-[300px]">
               <div className="flex items-center justify-center p-3">
                   <h1 className="">WELCOME</h1>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="flex items-center p-6" activeClassName="active bg-light-blue-500 text-black">
                           <div className="text-lg">{item.icon}</div>
                           <div  className="text-lg text-bold pl-2">{item.name}</div>
                       </NavLink>
                   ))
               }
               <div className="flex items-center p-6 w-[300px]" onClick={handleLogout} style={{ cursor: 'pointer' }}>
        <div className="text-lg"><FaChevronCircleDown /></div>
        <div className="text-lg text-bold pl-2">Logout</div>
       
    </div>
           </div>
           <main>{children}</main>
        </div>
    );
};

export default StudentSidebar;