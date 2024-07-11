import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios';
import Swal from 'sweetalert2';
import { pdfjs } from 'react-pdf';
import { Document, Page } from 'react-pdf';
import { IoIosAttach } from "react-icons/io";
import { FaQuestionCircle } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import jsPDF from 'jspdf';
import instance from '../../routes/axios';
import { baseUrl } from '../../utils/urls';
import Loader from '../Loader';

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.js',
//   import.meta.url,
// ).toString();

function StudentQuiz() {
    const[quiz,setQuiz]=useState([])
    const[question,setQuestion]=useState([])
    const[counter,setCounter]=useState(0)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedAnswers, setSelectedAnsweres] = useState([]);
    const[totalScore,setTotalScore]=useState(0)
   const[Modal,setModal]=useState(false)
   const [quizId,setQuizId]=useState()
   const [response,setResponse]=useState(null)
   const [loading, setLoading] = useState(true);

    const course = useSelector((store) => store.course.course);
    const user=useSelector((store) => (store.authUser.user))

      useEffect(()=>{
        instance.get('studentquiz/',{ params: { id: course,student_id:user?.role_id } })
        .then((response) => {
          setQuiz(response.data);
          setLoading(false) 
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching modules:', error);
        });
    }, [course,counter,user?.role_id]);
    
    const handleShowQuestions = (question,quizId) => {
      setQuizId(quizId);
      setQuestion(question);
    };


 const handleResult=(Response)=>{
   if (Response==null){
    Swal.fire({
      title: 'You have not attended the quiz yet',
      icon: 'warning',
      confirmButtonText: 'OK',
  });
   }
   else{
    setResponse(Response);
    
   }
 }   

 const handleOptionClick = (option) => {
  const correctOption = question[currentQuestionIndex].answer.toLowerCase();
  console.log(correctOption)
  const selectedOption = option[option.length - 1]
  console.log(selectedOption)
  const currentQuestion = question[currentQuestionIndex];
  const options = Object.keys(currentQuestion)
    .filter(key => key.startsWith('option'))
    .map(key => currentQuestion[key]);
    const selectedAnswer = {
        questionNo: currentQuestionIndex + 1,
        question: currentQuestion.question,
        options: options,
        selectedOption: selectedOption,
        correctAnswer: correctOption,
      };
  setSelectedAnsweres(prevOptions => [...prevOptions, selectedAnswer]);
  if (selectedOption === correctOption) {
    setSelectedOption({ option, correct: true });
    setTotalScore((prevScore) => prevScore + 1);
  } else {
    setSelectedOption({ option, correct: false });
  }

  setTimeout(() => {
    if (currentQuestionIndex  === question.length) {
      console.log(selectedAnswers);
      const generatePDF = () => {
        const doc = new jsPDF();
        let yOffset = 20; 
        doc.setFontSize(16);
        doc.text(`Total Score: ${totalScore}/${selectedAnswers.length}`, 15, yOffset);
        yOffset += 10;    
        doc.setFontSize(18);
        doc.text('Response:', 15, yOffset);
        yOffset += 10; 
        selectedAnswers.forEach((item, index) => {
          doc.setFontSize(14);
          doc.text(`${index + 1}. ${item.question}`, 15, yOffset);
          yOffset += 7; 
          Object.keys(item.options).forEach((key) => {
            const optionLabel = String.fromCharCode('A'.charCodeAt(0) + parseInt(key.slice(-1)));
            const optionText = `${optionLabel}. ${item.options[key]}`;
            doc.text(optionText, 20, yOffset);
            yOffset += 5; 
          });
          doc.text(`Your Answer: ${item.selectedOption.toUpperCase()}`, 20, yOffset);
          yOffset += 5; 
          doc.text(`Correct Answer: ${item.correctAnswer.toUpperCase()}`, 20, yOffset);
          yOffset += 10; 
        });
        return doc.output('blob');
      }
      const pdfBlob = generatePDF();
    const formData={
    student:user?.role_id,
    quiz:quizId,
    mark:totalScore,
    response:pdfBlob,
    }
    console.log('i am here')
    instance.post('studentquiz/',formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response)
        setQuestion(null)
        setModal(true);
       
        setCounter((prevCounter) => prevCounter + 1); 
      })
      .catch(error => {
        Swal.fire({
          title: 'Sorry Cant Submit',
          icon: 'failed',
          timer: 2000,})
      });
      
      }
       else {
      setSelectedOption(null); 
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  }, 2000);
  
};

  return (
    <>
    {loading ? (
            <Loader visible={loading} />
          ) : (

    <div className='p-4'> 
        
        {question && question.length > 0 && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='p-8 w-1/2 h-3/4 rounded-lg'>
            <button className='absolute top-4 right-4 text-red-400 text-3xl' onClick={() => setQuestion(null)}>
              X
            </button>
            <div className='w-[400px] h-[400px] bg-white'>
              <div className="flex justify-start p-4">
                <span className="border border-black w-[40px] h-[40px] text-black flex items-center justify-center">{currentQuestionIndex + 1}</span>
                <span className="text-3xl font-semibold text-black mx-2">of </span>
                <span className="border border-black w-[40px] h-[40px] text-black flex items-center justify-center">{question.length}</span>
              </div>
              <div className='text-black p-4'>
                <h1 className='text-lg font-semibold'>{currentQuestionIndex+1}.{question[currentQuestionIndex].question}</h1>
                <div className="mt-4">
                 {Object.keys(question[currentQuestionIndex]).map((key) => {
                    if (key.startsWith('option')) {
                      return (
                        <label key={key} className={`flex items-center mb-2 border ${
      selectedOption?.option === key && selectedOption.correct !== null
      ? selectedOption.correct
        ? 'border-green-500'
        : 'border-red-500'
      : 'border'
  }`}>
                          <input
                            type="radio"
                            name="option"
                            value={key}
                            className="mr-2"
                            checked={selectedOption?.option === key}
                            onClick={() => handleOptionClick(key)}
                          />
                          {question[currentQuestionIndex][key]}
                        </label>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

{ quiz.length==0?(
      <div className='flex items-center justify-center m-4  h-96'>
      <h1 className='text-red-500 font-bold text-2xl'>Stay tuned for fun quizzes to evaluate your understanding!</h1>
      </div>
    )  :( 
          quiz.map( (items) => (
        <div className='flex my-2 justify-between w-2/5 items-center'>

            <h1 className=' text-2xl text-black font-bold'><span className='text-lg font-semibold px-6'>Quiz {items.quiz.quiz_no}</span> {items.quiz.quiz_title}</h1>
            <button onClick={() => handleShowQuestions(items.questions,items.quiz.id)} className=' ml-12 px-2 text-black text-lg  border border-black'>Start Quiz</button>
           <div className='flex items-center justify-center'>
            <button className='text-black text-lg border border-black px-2' onClick={()=>handleResult(items.student.response)}>Result</button>
            </div>
           </div>
          )))}
          { Modal &&(
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
            <div className='p-8  w-full h-full rounded-lg'>
              <button className='absolute top-4 right-4 text-red-400 text-3xl' onClick={() => setModal(false)}>
                X
              </button>
                <h1 className='text-2xl font-bold'>Total {totalScore}/{selectedAnswers.length}</h1>
                <h1>Response</h1>
                {selectedAnswers.map((item, index) => (
                 <div key={index}>
                 <h2>{index + 1}.{item.question}</h2>
            <div className='flex justify-between'>
            <ul className="flex flex-row space-x-4">
            {Object.keys(item.options).map((key) => {
    const optionLabel = String.fromCharCode('A'.charCodeAt(0) + parseInt(key.slice(-1)) );
    return (
      <li key={key}>
        {optionLabel}. {item.options[key]}
        {item.selectedOption === key ? ' (Selected)' : ''}
        {item.selectedOption === key && item.correctOption === key ? ' (Correct)' : ''}
      </li>
    );
  })}

            </ul>
            </div>
            <p>Your Answer: {item.selectedOption.toUpperCase()}</p>
            <p>Correct Answer: {item.correctAnswer.toUpperCase()}</p>
          </div>
        ))}
                </div>
                </div>
                

          )}
      
        
      {response && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='p-8 w-1/2 h-3/4 rounded-lg'>
            <button className='absolute top-4 right-4 text-red-400 text-3xl' onClick={() => setResponse(null)}>
              X
            </button>
            <Document file={`${baseUrl}${response}`} onLoadSuccess=''>
              <Page pageNumber={1} />
            </Document>
          </div>
        </div>
      )}


    </div>
          )}
    </>
  )
}


export default StudentQuiz
