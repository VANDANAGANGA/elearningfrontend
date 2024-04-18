import React from "react"

const Heading = ({ subtitle, title }) => {
  return (
    <>
      <div className=' px-[40px]'>
        <h3 className="text-[20px] font-[600] uppercase font-bold">{subtitle} </h3>
        <h1 className="text-[45px] uppercase font-extrabold">{title} </h1>
      </div>
    </>
  )
}

export default Heading