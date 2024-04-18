import React, { useState, useEffect } from 'react';
import axios from 'axios';
import image_url from '../../utils/urls';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../../Store/registerSlice';
import { FaCheckCircle } from "react-icons/fa";
import instance from '../../routes/axios';



const Registration = () => {
  console.log()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [name, setName] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [role,setRole]=useState('')
  const [showOTPField, setShowOTPField] = useState(false);
  const [counter, setCounter] = useState(60); // Set the initial countdown value
  const [emailError, setEmailError] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [phonenumberError, setPhoneNumberError] = useState('');
  const [passwordError, setPasswordError]=useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [canResendOTP, setCanResendOTP] = useState(false);
  const [OTPerror, setOTPError] = useState('');
  const [nameError, setNameError] = useState('');
  const [error,setError]=useState('')

  
  
  
  const [focused, setFocused] = useState(false);
  const [emailfocused, setEmailFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const [verifyingOTP, setVerifyingOTP] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);
  
  

 

  const handleFocus = () => {
    setFocused(true);
  };
  
  const handleEmailFocus = () => {
    setEmailFocused(true);
  };
  const handlePhoneFocus = () => {
    setIsPhoneFocused(true);
  };
  const handlePasswordFocus = () => {
    setIsPasswordFocused(true);
  };
  const handleConfirmPasswordFocus = () => {
    setIsConfirmPasswordFocused(true);
  };

  
  useEffect(() => {
    if (otp.length === 4 && !verifyingOTP) {
      console.log(otp)
      setVerifyingOTP(true); // Set verifyingOTP to true to prevent further verification attempts
      instance.post('verify-otp/', { email, otp })
        .then((response) => {
          console.log(response.data);
          if (response.data.message === 'OTP verified successfully') {
            setShowOTPField(false);
            setEmailVerified(true);
            setOTPError('');
          } else {
            setOTPError('Invalid OTP');
            setVerifyingOTP(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setOTPError('Invalid OTP');
          setVerifyingOTP(false);
        })
        
    }
  }, [otp]);

  
  const handleResendOTP = () => {
    console.log('i am here')
    instance.post('generate-otp/', { email })
      .then(response => {
        
        setCounter(60);
        setCanResendOTP(false); 
        setEmailVerified(false); 
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }

      if (counter === 0) {
        setCanResendOTP(true); 
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
}, [counter]);
  



  const handleSubmit = (e) => {
    e.preventDefault();
    {
  const formData = {
  email: email,
  full_name: name,
  phone_number: phonenumber,
  password: password,
  password2: confirmpassword,
  role: role
    };
  
      dispatch(addUser(formData))
      if (role==2){
        navigate('/studentregistration')
      } else if (role==3){
        navigate('/teacherregistration')
      }
    };
  };
  
  

  const isFormValid = () => {
      if (name === '' || email === '' || phonenumber === '' || password === '' || confirmpassword === '' || role === '') {
        return false;
      }
      if (emailError || nameError || phonenumberError || passwordError || confirmPasswordError) {
        return false;
      }
      setError('')
      return true;
      
    };
    const handleError = () => {
      if (!isFormValid()) {
       setError('Please complete the form ')
      }
    };
    

  return (
    <section className="" style={{backgroundColor: '#acddde',backgroundSize: 'cover',backgroundAttachment: 'fixed',
    position: 'absolute',top: '0',left: '0',zIndex: '-1',width: '100%',paddingTop: '15%',paddingRight: '50px',color: '#fff',marginBottom: '50px'}}>
    <div className="mx-auto max-w-screen-xl flex">
      
       
          <div className='flex m-8 '>
            <div className="max-w-screen-xl w-full border border-gray-300 rounded-md bg-white shadow-md justify-center h-full p-8">
              <div className='text-center'>
            <h1 className="text-4xl text-black font-bold">SIGN IN</h1>
            <span className='text-black'> Regsiter And Start Learning</span>
            </div>
            <form  className=' p-4' onSubmit={handleSubmit}>

        <input className='block w-full my-6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        type="text"
        placeholder="Username"
        value={name}
        onChange={(e) => { setName(e.target.value);
          if (e.target.value.length < 4 || !/^[A-Za-z0-9 ]+$/.test(e.target.value)) {
            setNameError("Name must contain at least 4 letters and no special characters.");
          } else {
            setNameError("");
          }
        }}
        onBlur={handleFocus} onFocus={handleFocus} focused={focused.toString()} required/>
        <span className="text-red-500">{nameError}</span>

  
              <input className='block w-full mt-6 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' type="email" placeholder='Email Address' value={email} 
              onChange={(e) => {setEmail(e.target.value); if(!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(e.target.value)) {
                setEmailError("Please enter a valid email");
              }else{
                setEmailError("");
              }
              }}   onBlur={() => {
                if (!hasBlurred) {
                  handleEmailFocus();
                  if (!emailError && !showOTPField && !emailVerified) {
                    setEmailError(null); // Clear any previous email errors
                    axios.post('http://localhost:8000/api/generate-otp/', { email })
                      .then(response => {
                        setHasBlurred(true);
                        setShowOTPField(true); // Show the OTP field
                        console.log(response.data);
                      })
                      .catch(error => {
                        console.log(error.response.data.error);
                        if (error.response.data.error==="User with this email already exists")
                        setEmailError("User with this email already exists") // Corrected access to error message
                      });
                  }
                }
              }}
              onFocus={handleEmailFocus} emailfocused={emailfocused.toString()} required/>
              <span className="text-red-500">{emailError}</span>
{/* 
                {showOTPField && (
  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-70 bg-gray-900">
    <div className="bg-white p-4 rounded-lg  justify-center flex flex-col items-center">
      <h4 className="text-xl font-semibold text-black mb-4"> Enter your Email Otp for verification</h4>
      <div className="flex space-x-2">
  <input className='w-12 h-12 border-2 border-sky-600 text-black text-center'
    type="text"
    placeholder="0"
    maxLength="1"
    value={otp[0]}
    onChange={(e) => setOTP(otp.substring(0, 0) + e.target.value + otp.substring(1, 4))}
    disabled={counter === 0}
  />
  <input className='w-12 h-12 border-2 border-sky-600 text-black text-center'
    type="text"
    placeholder="0"
    maxLength="1"
    value={otp[1]}
    onChange={(e) => setOTP(otp.substring(0, 1) + e.target.value + otp.substring(2, 4))}
    disabled={counter === 0}
  />
  <input className='w-12 h-12 border-2 border-sky-600 text-black text-center'
    type="text"
    placeholder="0"
    maxLength="1"
    value={otp[2]}
    onChange={(e) => setOTP(otp.substring(0, 2) + e.target.value + otp.substring(3, 4))}
    disabled={counter === 0}
  />
  <input className='w-12 h-12 border-2 border-sky-600 text-black text-center'
    type="text"
    placeholder="0"
    maxLength="1"
    value={otp[3]}
    onChange={(e) => setOTP(otp.substring(0, 3) + e.target.value)}
    disabled={counter === 0}
  />
</div>

       {OTPerror && <div className="text-red-500">{OTPerror}</div>}
                    {canResendOTP ? (
                    <div className='justify-center'>  <button  className='text-blue-400 m-2 border  ' onClick={handleResendOTP}>Resend OTP</button></div>
                  ) : (
                    <div className='text-red-500'>Time left: {counter} seconds</div>
                  )}
    </div>
  </div>
)}

            {emailVerified && (  
            <div className='text-black flex'>
              <div className='flex justify-center items-center'>
              <span><FaCheckCircle style={{ color: 'green' }} /></span>
              </div>
              <div className='flex justify-center items-center pl-2'>
              <p className=''>Email verified</p>
              </div>
              </div>
             )}  */}

       
          <input  className="block w-full my-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          type="text" placeholder='Phone Number' value={phonenumber} onChange={(e) => {setPhoneNumber(e.target.value);if(!/^\+\d{12}$/.test(e.target.value)){
            setPhoneNumberError('Please enter a valid phone number (e.g., +918281851522).');
            } else {
            setPhoneNumberError("");
          }}} onBlur={handlePhoneFocus}
          onFocus={handlePhoneFocus}
          isPhoneFocused={isPhoneFocused.toString()} required/>
          <span className="text-red-500">{phonenumberError}</span> 
          
        <input className='className="block my-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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

        <input className='className="block my-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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

          
         
          <select  className="block w-full my-4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value='2'>Student</option>
                <option value='3'>Teacher</option>  
          </select>
          <span className="text-red-500">{error}</span>
          <div className='flex justify-center'>
          <button id='registerButton' className='px-12 py-4 bg-red text-black font-semibold border border-transparent m-3 rounded cursor-pointer shadow-md transition duration-500 hover:text-white hover:bg-[#1eb2a6] hover:border-[#1eb2a6]' 
          type='submit' disabled={handleError} >Register</button>
          
          </div>     
             </form>
             <div>
             <h4 className='text-black'>Already an Account? <sapn className='text-purple-700 cursor-pointer'><Link to='/login'>Sign In</Link></sapn></h4>
             <div className='text-center pt-2'>
             <h4 className='text-black'>By Clicking  Button Above.You Agree To Our  </h4>
             <h4 className='text-black'><span className='text-purple-700'>Terms of Use</span> And <span className='text-purple-700'>Privacy Policy</span></h4>
             </div>
             </div>
          
             </div>
        
    <div className='h-full'>
    <img src="https://www.vegaitglobal.com/media/xejht1oc/mapiq_vega_it_case_study.jpg?format=webp&quality=60" alt="" className="h-full w-full object-cover"/>
    </div>
    </div>
    </div>
    
    </section>
  );
};

export default Registration;
