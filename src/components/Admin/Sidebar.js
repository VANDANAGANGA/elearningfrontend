import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaGraduationCap,
    FaBookReader,
    FaChevronCircleDown
}from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';


const Sidebar = ({children}) => {
    const navigate=useNavigate
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
      
const handleLogout =()=>{
    localStorage.removeItem('token')
    navigate('/')
   }
    const menuItem=[
        {
            path:"/admin",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/admin/teachermanagement",
            name:"Teacher Management",
            icon:<FaUserAlt/>
        },
        {
            path:"/admin/studentmanagement",
            name:"Student Management",
            icon:<FaUserAlt/>
        },
        {
            path:"/admin/coursecategory",
            name:"Course Category",
            icon:<FaBookReader/>
        },
        {
            path:"/admin/courses",
            name:"Course",
            icon:<FaGraduationCap/>
        },
        {
            path:"/admin/salesreport",
            name:"Sales Report",
            icon:<FaRegChartBar/>
        },
        {
        
            name:"Logout",
            icon:<FaChevronCircleDown/>,
            onClick: handleLogout
        }
    ]
    return (
        <div className="flex  flex-col ml-2 w-[300px]">
           <div  className=" bg-slate-500 text-white h-screen w-48 transition-all duration-500 w-[260px]">
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="flex items-center p-6 w-[300px]" activeClassName="active bg-light-blue-500 text-black w-[300px]">
                           <div className="text-lg">{item.icon}</div>
                           <div  className="text-lg text-bold pl-2">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;