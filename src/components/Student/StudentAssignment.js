import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { IoIosAttach } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import instance from '../../routes/axios';
import { baseUrl } from '../../utils/urls';
import Loader from '../Loader';

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function StudentAssignments() {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState();
    const [number, setNumber] = useState();
    const [file, setFile] = useState();
    const [assignemnt, setAssignemnt] = useState([]);
    const [question, setQuestion] = useState();
    const [counter, setCounter] = useState(0);
    const [filename, setFilename] = useState();
    const [ansquestion, setAnsQuestion] = useState();
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(true); 

    const course = useSelector((store) => store.course.course);
    const user = useSelector((store) => store.authUser.user);

    const handleSubmit = (pdf, id) => {
        setAnsQuestion(pdf);
    };

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmitAnswer = () => {
        const formData = {
            assignment: ansquestion, // Assuming ansquestion holds the PDF URL or path
            student: user?.role_id,
            answer: answer,
        };

        instance.post('studentassignment/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(response => {
            Swal.fire({
                title: 'Assignment Submitted successfully',
                icon: 'success',
                timer: 2000,
            });
            setShowModal(false);
            setAnswer(''); 
            setFilename(null); 
            setCounter(prevCounter => prevCounter + 1);
        })
        .catch(error => {
            Swal.fire({
                title: 'Sorry Assignment not Submitted!',
                icon: 'failed',
                timer: 2000,
            });
        });
    };

    const handleCancel = () => {
        setAnswer('');
        setFilename(null);
        setQuestion(null);
    };

    useEffect(() => {
        instance.get('studentassignment/', { params: { id: course, student_id: user?.role_id } })
        .then(response => {
            setAssignemnt(response.data);
            setLoading(false)
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching modules:', error);
        });
    }, [course, counter, user?.role_id]);

    const handleShowQuestions = (pdf) => {
        setQuestion(pdf);
    };

    return (
        <>
        {loading ? (
            <Loader visible={loading} />
          ) : (
        <div className='p-4'> 
            {question && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
                    <div className='p-8 w-1/2 h-3/4 rounded-lg'>
                        <button className='absolute top-4 right-4 text-red-400 text-3xl' onClick={() => setQuestion(null)}>
                            X
                        </button>
                        <Document file={`${baseUrl}${question}`} onLoadSuccess=''>
                            <Page pageNumber={1} />
                        </Document>
                    </div>
                </div>
            )}
            {ansquestion && (
                <div className='flex'>
                    <div className='w-1/2 p-4'>
                        <Document file={ansquestion} onLoadSuccess=''>
                            <Page pageNumber={1} />
                        </Document>
                    </div>
                    <div className='w-1/2 p-4'>
                        <textarea
                            value={answer}
                            onChange={handleAnswerChange}
                            className='w-full h-full border'
                            placeholder='Write your answer here...'
                        />
                        <div className='mt-4'>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2' onClick={handleSubmitAnswer}>
                                Submit Answer
                            </button>
                            <button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded' onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {assignemnt.length==0?(
      <div className='flex items-center justify-center m-4  h-96'>
      <h1 className='text-red-500 font-bold text-2xl'>Exciting assignments are in the works! Stay tuned for updates!</h1>
      </div>
    )  :( 
            assignemnt.map((items) => (
                <div className='flex my-2 w-3/5 items-center' key={items.assignment.id}>
                    <div className='flex items-center justify-between mr-4'>
                        <h1 className='text-2xl text-black font-bold'>
                            <span className='text-lg font-semibold px-6'>Assignment {items.assignment.assignment_no}</span> {items.assignment.assignment_title}
                        </h1>
                        <button onClick={() => handleShowQuestions(items.assignment.pdf)} className='ml-12 px-2 text-black text-2xl font-bold'>
                            <FaQuestionCircle />
                        </button>
                    </div>
                    <div className='flex items-center justify-center ml-4'>
                        {items.student_assignments.submitted_at ? (
                            <>
                                <button onClick={() => handleShowQuestions(items.student_assignments.answer)} className='text-black text-lg'>
                                    <FaFileAlt />
                                </button>
                                {items.student_assignments.verified ? (
                                    <span className='text-green-500 ml-2'>Verified</span>
                                ) : (
                                    <span className='text-red-500 ml-2'>Not Verified</span>
                                )}
                            </>
                        ) : (
                            <>
                                <button className='text-black text-lg' onClick={() => handleSubmit(items.assignment.pdf, items.assignment.id)}>
                                    Submit
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )))}
        </div>
          )}
        </>
    );
}

export default StudentAssignments;
