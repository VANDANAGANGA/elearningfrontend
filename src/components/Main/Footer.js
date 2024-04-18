import React from "react"


const Footer = () => {
  return (
    <>
      <section className='newletter'>
        <div className='container flexSB'>
          <div className='left row'>
            <h1>Newsletter - Stay tune and get the latest update</h1>
            <span>Far far away, behind the word mountains</span>
          </div>
          <div className='right row'>
            <input type='text' placeholder='Enter email address' />
            <i className='fa fa-paper-plane'></i>
          </div>
        </div>
      </section>
      <footer className="bg-white  items-center p-12 ">
        <div className='mx-auto flex justify-items-stretch auto-rows-auto space-x-8'>
          <div className='box logo'>
            <h1>SKILLSAGA</h1>
            <span className="text-[#1eb2a6] text-[15px] font-bold ">ONLINE EDUCATION & LEARNING</span>
            <p className="max-w-md">A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>

            <i className='fab fa-facebook-f icon mr-[10px] text-white bg-[#1eb2a6]'></i>
            <i className='fab fa-twitter icon mr-[10px] text-white bg-[#1eb2a6]'></i>
            <i className='fab fa-instagram icon mr-[10px] text-white bg-[#1eb2a6]'></i>
          </div>
          <div className='font-text-black'>
            <h3 className="m-[40px] font-bold">Explore</h3>
            <ul>
              <li>About Us</li>
              <li>Services</li>
              <li>Courses</li>
              <li>Blog</li>
              <li>Contact us</li>
            </ul>
          </div>
          <div className='font-text-black'>
            <h3 className="m-[40px] font-bold">Quick Links</h3>
            <ul>
              <li>Contact Us</li>
              <li>Pricing</li>
              <li>Terms & Conditions</li>
              <li>Privacy</li>
              <li>Feedbacks</li>
            </ul>
          </div>
          {/* <div className='box'>
            <h3>Recent Post</h3>
              <div className='items flexSB'>
                <div className='img'>
                  <img src='' alt='' />
                </div>
                <div className='text'>
                  <span>
                    <i className='fa fa-calendar-alt'></i>
                    <label htmlFor=''>ndfnkd</label>
                  </span>
                  <span>
                    <i className='fa fa-user'></i>
                    <label htmlFor=''>njdinsj</label>
                  </span>
                  <h4>bndsjjn</h4>
                </div>
              </div>
          </div> */}
          <div className='box last'>
            <h3 className="m-[40px] font-bold">Have a Questions?</h3>
            <ul>
              <li>
                <i className='fa fa-map text-[#1eb2a6]'></i>
                203 , Kalamassery, Kerala, India
              </li>
              <li>
                <i className='fa fa-phone-alt text-[#1eb2a6]'></i>
                +2 392 3929 210
              </li>
              <li>
                <i className='fa fa-paper-plane text-[#1eb2a6]'></i>
                info@skillsaga.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className='legal'>
        <p>
          Copyright ©2022 All rights reserved |<i className='fa fa-heart text-[#1eb2a6]'></i>
        </p>
      </div>
    </>
  )
}

export default Footer