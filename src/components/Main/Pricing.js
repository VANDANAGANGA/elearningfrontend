import React from 'react'
import useRazorpay from "react-razorpay";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Pricing() {
  const [Razorpay] = useRazorpay();
  const[amount,setAmount]=useState()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authUser.user);
  const navigate = useNavigate();
  

  const handlePaymentSuccess = (response,order) => {
    const orderData = {
      razorpay_order_id: order,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    };

    axios.post('http://localhost:8000/api/handle-payment-success/', orderData)
      .then((res) => {
        navigate('/student')
        console.log('Payment success handled on the server');
      
      })
      .catch((err) => {
        console.error('Error handling payment success:', err);
      });
  };

  const handleSubmit = (price, month) => {
    console.log(user);
    if (!user?.role_id) {
      navigate('/login');
    } else if (user.role !== 2) {
      Swal.fire({
        icon: 'info',
        title: 'Login as Student',
        text: 'You need to login as a student to access the course.',
        confirmButtonText: 'OK',
        onClose: () => {
          navigate('/login');
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    }
    const formData = {
      amount: price,
      month: month,
      role_id: user?.role_id,
    };
    console.log(formData);
    axios.get('http://localhost:8000/api/check-payment/', { params: { id: user.role_id } })
      .then(response => {
        if (response.data.message === "No valid Plan exists for the student.") {
          console.log('i am here');
          axios.post('http://localhost:8000/api/create-razorpay-order/', formData)
            .then(orderResponse => {
              const razorpayOrder = orderResponse.data;
              console.log(razorpayOrder);
  
              const options = {
                key: 'rzp_test_AZRz71dY2SuShj',
                amount: parseInt(razorpayOrder.razorpay_order.amount / 100),
                currency: 'INR',
                name: 'SKILLSAGA',
                description: 'Test transaction',
                order_id: razorpayOrder.id,
                handler: function (response) {
                  console.log(response);
                  const order = razorpayOrder.order.order_payment_id;
                  handlePaymentSuccess(response, order);
                },
                prefill: {
                  name: user?.name || 'User',
                  email: user?.email || 'user@example.com',
                  contact: 'User\'s phone',
                },
                notes: {
                  address: 'Razorpay Corporate Office',
                },
                theme: {
                  color: '#3399cc',
                },
              };
  
              // Create a new instance of Razorpay and open the payment dialog
              const rzp = new window.Razorpay(options);
              rzp.open();
            })
            .catch(error => {
              if (error === 'You already have an active plan') {
                // Display SweetAlert for an already active plan
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'You already have an active plan!',
                });
              }
              console.error('Error initiating Razorpay payment:', error);
            });
        }
        else if (response.data.message === "Valid Plan exists for the student.")  {
          Swal.fire({
            title: 'Error!',
            text: 'You Have A Valid Plan Exists ',
            icon: 'error',
            timer: 1000, 
            showConfirmButton: false
          })
        } 
      })
      .catch(error => {
        console.error('Error checking payment:', error);
      });
  };
  
    const price = [
        {
          name: "BASIC PLAN",
          price: "999",
          month:"3",
          desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        },
        {
          name: "BEGINNER PLAN",
          price: "2999",
          month:"6",
          desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        },
        {
          name: "PREMIUM PLAN",
          price: "4999",
          month:"12",
          desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        },
        {
          name: "ULTIMATE PLAN",
          price: "5999",
          month:"24",
          desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
        },
      ]
  return (
   <>
   <div className='text-center mb-4'>
      <h4 className='text-xl text-[#1eb2a6] font-bold'>Plan</h4>
      <h1 className='font-extrabold text-5xl pt-2'>Choose The Right Plan</h1>
      </div>
      <section className='m-8 px-[80px]'>
      <div className='  grid grid-cols-4 gap-30'>
      {price.map((val) => (
        <div className='p-[40px] m-2 text-center bg-white'  style={{ boxShadow: '0 5px 25px -2px rgba(0, 0, 0, 0.06)', }}>
          <h4 className='font-bold'>{val.name}</h4>
          <h1 className='text-[50px] mx-[20px] text-[#1eb2a6]'>
            <span className='text-[20px] text-black font-semibold mr-[5px]'>₹</span>
            {val.price}/<span className='text-[20px]'>{val.month}Months</span>
          </h1>
          <p className='text-gray mx-[40px] mb-4'>{val.desc}</p>
          <button className="transition-all duration-500 p-4 ease-in-out hover:bg-[#1eb2a6] hover:text-white"
             style={{ margin: '10px', boxShadow: 'none', border: '2px solid #1eb2a6', width: '100%',}}   onClick={() => handleSubmit(val.price,val.month)} >GET STARTED</button>
        </div>
      ))}
      </div>
      </section>
   </>
  )
}

export default Pricing
