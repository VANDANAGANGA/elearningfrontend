import React from 'react'
import StudentSidebar from './StudentSidebar'
import { Outlet} from 'react-router-dom'
import Navbar from '../Main/Navbar'

function StudentHome() {
  return (
    <>
    <Navbar/>
    <section className="" style={{backgroundColor: '#acddde',backgroundSize: 'cover',backgroundAttachment: 'fixed',
    position: 'absolute',top: '0',left: '0',right:'0',zIndex: '-1',width: '100%',paddingTop: '8%',color: '#fff',marginBottom: '50px'}}>
    <div className='flex'> 
    <StudentSidebar/>
    <Outlet/>
    </div>   
    </section>
    </>
  )}
 


  export default  StudentHome;
   



