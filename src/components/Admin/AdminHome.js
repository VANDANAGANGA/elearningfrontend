import React from 'react'
import Sidebar from './Sidebar'
import { Outlet} from 'react-router-dom'
import Teachermanagement from './Teachermanagement'
import DashBoard from './DashBoard'
import Navbar from '../Main/Navbar'

function AdminHome() {
  return (
    <>
    <Navbar/>
    <section className="" style={{backgroundColor: '#acddde',backgroundSize: 'cover',backgroundAttachment: 'fixed',
    position: 'absolute',top: '0',left: '0',right:'0',zIndex: '-1',width: '100%',paddingTop: '9%',color: '#fff',marginBottom: '50px'}}>
    <div className='flex'> 
    <Sidebar/>
    <div className="flex flex-col w-full md:w-[calc(100%-300px)]">
    <Outlet /> 
    </div>
    </div>   
    </section>
    </>
  )}
 


  export default  AdminHome;
   



