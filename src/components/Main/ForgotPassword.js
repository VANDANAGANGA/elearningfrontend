import React, { useState } from 'react';
import axiosinstance from '../../routes/axios';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
   const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1);
  const [passwordError, setPasswordError]=useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);


  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
     axiosinstance.post('generate-otp/', { email })
     .then(response => {
        setStep(2);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      } catch (error) {
      console.error(error);
    }
   
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosinstance.post('verify-otp/', { email, otp })
      .then(response => {
        setStep(3);
      })
      .catch(error => {
        console.error('Error:', error);
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await axiosinstance.put('reset-password/', { email,password,confirmpassword })
      .then(response => {
        Swal.fire({
            title: 'Password Updated Successfully',
            icon: 'success',
            confirmButtonText: 'OK'
          })
          navigate('/login')
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };
  const handleConfirmPasswordFocus = () => {
    setIsConfirmPasswordFocused(true);
  };

  return (
    <section className="" style={{ backgroundColor: '#acddde', backgroundSize: 'cover', backgroundAttachment: 'fixed', position: 'absolute', top: '0', left: '0', zIndex: '-1', width: '100%', height:'100%', paddingTop: '15%', paddingRight: '50px', color: '#fff', marginBottom: '50px' }}>
      <div className="mx-auto max-w-screen-lg flex justify-center mt-6">
        <div className="  max-w-screen-xl w-3/5 border border-gray-300 rounded-md bg-white shadow-md justify-center h-96 p-8">
          <div className='text-center'>
            <h1 className="text-4xl text-black font-bold mb-6">Forgot Password</h1>
            {step === 1 && (
              <form className='p-4' onSubmit={handleEmailSubmit}>
                <input className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  p-2 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-8' type="email" placeholder='Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
                <button id='registerButton' className='px-12 py-4 bg-red text-black font-semibold border border-transparent m-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6] mt-8' type='submit'>Send OTP</button>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={handleOTPSubmit}>
                <input className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-8 p-2' type="text" placeholder='Enter OTP' value={otp} onChange={(e) => setOtp(e.target.value)} />
                <button id='registerButton' className='px-12 py-4 bg-red text-black font-semibold border border-transparent m-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6] mt-8' type='submit'>Verify OTP</button>
              </form>
            )}
            {step === 3 && (
              <form onSubmit={handlePasswordReset}>
                <input className='className="block my-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2'
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => { setPassword(e.target.value);
          if ( !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(e.target.value)) {
            setPasswordError("Password contains atleast one uppercase one lowercase one number and one special characture");
          } else {
            setPasswordError("");
          }
        }}
        onBlur={handlePasswordFocus}
          onFocus={handlePasswordFocus}
          isPasswordFocused={isPasswordFocused.toString()} required/>
        <span className="text-red-500">{passwordError}</span>

        <input className='className="block p-2 my-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        type="password"
        placeholder="Confirm password"
        value={confirmpassword}
        onChange={(e) => { setConfirmPassword(e.target.value);
          if ( e.target.value!=password) {
            setConfirmPasswordError("Password should be match");
          } else {
            setConfirmPasswordError("");
          }
        }}
        onBlur={handleConfirmPasswordFocus}
          onFocus={handleConfirmPasswordFocus}
          isPasswordFocused={isConfirmPasswordFocused.toString()} required/>
        <span className="text-red-500">{confirmPasswordError}</span>

          
                <button id='registerButton' className='px-12 py-4 bg-red text-black font-semibold border border-transparent m-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6] mt-8' type='submit'>Reset Password</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
