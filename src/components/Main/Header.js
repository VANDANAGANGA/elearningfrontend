import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header>
        <nav className='flex justify-between items-center bg-white bg-opacity-20 h-[85px] mx-6'>
          <ul className='flex justify-between  space-x-6   mx-5'>
            <li className="lg:text-gray-600 font-bold hover:text-[#1eb2a6] ">
              <Link to='/'>Home</Link>
            </li>
            <li className="lg:text-gray-600 font-bold hover:text-[#1eb2a6] ">
              <Link to='/courses'>All Courses</Link>
            </li>
            <li className="lg:text-gray-600 font-bold hover:text-[#1eb2a6] ">
              <Link to='/about'>About</Link>
            </li >
            <li className="lg:text-gray-600 font-bold hover:text-[#1eb2a6] ">
              <Link to='/team'>Team</Link>
            </li>
            <li className="lg:text-gray-600 font-bold hover:text-[#1eb2a6] ">
              <Link to='/pricing'>Pricing</Link>
            </li>
            <li className="lg:text-gray-600 font-bold hover:text-[#1eb2a6] ">
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
          <div className="flex items-center justify-center  bg-[#1eb2a6] h-[85px] w-[300px]"  style={{ clipPath: "polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)" }}>
            <h2 className="text-white">PREEMINENT SKILL</h2>
          </div>
          {/* <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button> */}
        </nav>
      </header>
    </>
  )
}

export default Header