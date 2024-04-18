import React from "react"
import Heading from "./Heading"
import {useNavigate} from 'react-router-dom';



const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log('i am here')
    navigate('/register');
  }
  const handleCategory = () => {
    console.log('i am here')
    navigate('/courses');
  }
  return (
    <>
      <section  style={{
  backgroundImage: 'url("https://raw.githubusercontent.com/sunil9813/Education-Website-Using-ReactJS/master/public/images/bg.webp")',
  backgroundSize: 'cover',
  backgroundAttachment: 'fixed',
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: '-1',
  width: '100%',
  paddingTop: '20%',
  paddingRight: '50px',
  color: '#fff',
  marginBottom: '50px'
}}>
        <div className='container'>
          <div className='w-[700px]'>
            <Heading subtitle='WELCOME TO SKILLSAGE' title='Best Online Education Expertise' />
            <p className="px-10 py-4">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            <div className='p-8'>
            <button className="px-8 py-4 bg-white text-[#1eb2a6] font-semibold border border-transparent m-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6]" onClick={handleButtonClick}>
              GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button className="px-8 py-4 bg-white text-[#1eb2a6] font-semibold border border-transparent m-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6]" onClick={handleCategory}>
                VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Home;