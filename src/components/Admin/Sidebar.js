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
import { NavLink, useNavigate} from 'react-router-dom';
import { deleteUser } from '../../Store/authSlice';
import instance from '../../routes/axios';
import { useDispatch } from 'react-redux';

const Sidebar = ({children}) => {
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
      
    const handleLogout = () => {
        const refreshToken = localStorage.getItem('refresh');
        if (refreshToken) {
        instance.post('logout/', { refresh:refreshToken })
          .then(response => {
            console.log('Logged out successfully:', response);
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            dispatch(deleteUser());
            navigate('/login'); 
          })
          .catch(error => {
            console.error('Error logging out:', error);
          });
        }
      };

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
       
    ]
    return (
<div className="flex flex-col ml-2 w-[300px] h-full ">
<div className="bg-slate-500 text-white h-screen w-48 transition-all duration-500 w-[260px]">
    {menuItem.map((item, index) => (
        <NavLink
            to={item.path}
            key={index}
            className="flex items-center p-6 w-[300px]"
            activeClassName="active bg-light-blue-500 text-black w-[300px]"
        >
            <div className="text-lg">{item.icon}</div>
            <div className="text-lg text-bold pl-2">{item.name}</div>
        </NavLink>
    ))}
    {/* Logout button */}
    <div className="flex items-center p-6 w-[300px]" onClick={handleLogout} style={{ cursor: 'pointer' }}>
        <div className="text-lg"><FaChevronCircleDown /></div>
        <div className="text-lg text-bold pl-2">Logout</div>
       
    </div>
</div>
<main>{children}</main>
</div>
);
};
export default Sidebar;