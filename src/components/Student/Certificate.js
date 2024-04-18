import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import instance from '../../routes/axios';


function Certificate() {

    const [percentage,setPercentage]=useState(0.0)
    const [course,setCourse]=useState('')
    const [teacher,setTeacher]=useState('')
    const [certificate,setCertificate]=useState('')
    const [counter,setCounter]=useState(0)

    const courseId = useSelector((store) => store.course.course);
    const user=useSelector((store) => (store.authUser.user))


    useEffect(() => {
      // axios.get('http://localhost:8000/api/coursecertificate/', { params: { course: course, id: user?.role_id } })
      instance.get('coursecertificate/',{params:{course:course,id:user?.role_id }})
          .then((response) => {
              if (response.data.message === "No certificate exist.") {
                  // axios.get('http://localhost:8000/api/coursecompletion/', { params: { id: courseId, student_id: user?.role_id } })
                  instance.get('coursecompletion/',{params:{id: courseId,student_id:user?.role_id}})
                      .then((response) => {
                          console.log(response.data);
                          if (parseFloat(response.data) > 80) {

                              const formdata = {
                                  student:user.role_id,
                                  course:course,
                                  teacher:teacher
                              };
                              if (formdata) {
                                console.log(formdata)
                                  // axios.post('http://localhost:8000/api/coursecertificate/', formdata)
                                  instance.post('coursecertificate/',formdata)
                                      .then((response) => {
                                          console.log(response.data);
                                          setCounter((prevCounter) => prevCounter + 1); 
                                      })
                                      .catch((completionError) => {
                                          console.error('Error fetching course completion:', completionError);
                                      });
                              }
                          }
                          setPercentage(response.data);
                      })
                      .catch((completionError) => {
                          console.error('Error fetching course completion:', completionError);
                      });
              } else {
                  setCertificate(response.data);
              }
          })
          .catch((error) => {
              console.error('Error fetching modules:', error);
          });
  }, [courseId, user?.role_id, course,teacher,counter]);
  
    

    useEffect(() => {
    
        // axios.get('http://localhost:8000/api/coursedetailsmain/',{ params: { id: courseId } })
        instance.get('coursedetailsmain/',{params:{id:courseId}})
          .then(response => {
            // Once data is fetched, update the 'online' state with the data
            console.log(response.data)
            setCourse(response.data.course.title)
            setTeacher(response.data.teacher.full_name)
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }, [courseId,user]);
     
      const generateCertificate = () => {
        // Get the certificate element
        const certificateElement = document.getElementById('certificate');

        // Use html2canvas to capture the certificate element as an image
        html2canvas(certificateElement).then((canvas) => {
            // Convert the canvas to a data URL
            const imgData = canvas.toDataURL('image/png');

            // Create a new jsPDF instance
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Add the image to the PDF document
            pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height);

            // Save the PDF as a downloadable file
            pdf.save('certificate.pdf');
        });
    };
     
    

    return (
        <div className="mx-8">
          {certificate ? (
            <div className='m-2'>
            <div id="certificate" className="container mx-auto bg-white rounded-lg shadow-lg p-8 mt-8 border border-4 border-black m-20 p-6 ">
              <div className="text-black text-xl font-bold italic underline">
                <h1 className="text-[#1eb2a6]">SKILLSAGA</h1>
              </div>
              <div className="text-center ">
                <h1 className="text-3xl font-semibold text-gray-800">CERTIFICATE OF COMPLETION</h1>
                <p className="text-gray-600 pt-6">This Certificate is Proudly Presented To</p>
                <h2 className="text-2xl font-bold text-blue-700">{user?.name.toUpperCase()}</h2>
              </div>
              <div className="text-center mb-8">
                <p className="text-gray-600">For successfully completing the online course</p>
                <h2 className="text-xl font-semibold text-gray-800">{certificate.course}</h2>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-1/2">
                  <p className="text-gray-700">Date of Issue:</p>
                  <p className="text-lg font-bold text-black">{certificate.date}</p>
                </div>
                <div className="w-1/2 text-right">
                  <p className="text-gray-700">Instructor:</p>
                  <p className="text-lg font-bold text-black">{certificate.teacher}</p>
                </div>
              </div>
              <div className="mt-8 flex flex-col items-center">
                <p className="text-sm text-gray-600">Provided by:</p>
                <p className="text-lg font-bold text-black">SKILLSAGA</p>
              </div>
            </div>

            <div className=' m-2 flex justify-center items-center'>
            <button className='border border-2 bg-cyan-300 text-black text-xl p-2' onClick={generateCertificate}>Download</button>
            </div>
            </div>
          ) : (
            <div className='flex justify-center items-center mt-10 pt-6 '>
              <p className="text-red-600 text-xl font-semibold">Please complete your course to receive the certificate.</p>
            </div>
          )}
        </div>
      );
    }
    
export default Certificate
