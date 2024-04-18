import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios';
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";


function DashBoard() {
  const [modal,setModal]= useState(false)
    const [details,setDetails]=useState({})
    const chartRef = useRef(null);
    const [chartData, setChartData] = useState(null);
    const [userData, setUserData] = useState(null);


    
      useEffect(()=>{
    
        axios.get('http://localhost:8000/api/dashboard/')
        .then((response) => {
          setDetails(response.data);
          console.log(response)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  

    // const chartData = {
    //   labels: details.courses_with_enrollment_count ? details.courses_with_enrollment_count.map(course => course.title) : [],
    //   datasets: [
    //     {
    //       data: details.courses_with_enrollment_count ? details.courses_with_enrollment_count.map(course => course.num_students_enrolled) : [],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.6)',
    //         'rgba(54, 162, 235, 0.6)',
    //         'rgba(255, 206, 86, 0.6)',
    //         'rgba(75, 192, 192, 0.6)',
    //         'rgba(153, 102, 255, 0.6)',
    //         'rgba(255, 159, 64, 0.6)',
    //         // Add more colors as needed
    //       ],
    //     },
    //   ],
    // };
   
    useEffect(() => {
      if (details.courses_with_enrollment_count) {
        const labels = details.courses_with_enrollment_count.map((data) => data.title);
        const data = details.courses_with_enrollment_count.map((data) => data.num_students_enrolled);
    
        setUserData({
          labels: labels,
          datasets: [
            {
              label: 'Number of Students Enrolled',
              data: data,
              backgroundColor: [
                'rgba(75,192,192,1)',
                '#ecf0f1',
                '#50AF95',
                '#f3ba2f',
                '#2a71d0',
              ],
              borderColor: 'black',
              borderWidth: 2,
            },
          ],
        });
      }
    }, [details]);
    
    
  return (
    <section className='w-full'>
    <div className='text-center m-2 '>
     <h1 className='text-center text-black text-4xl font-extrabold' >DashBoard</h1>
   </div>
   <div className='flex justify-between text-black mt-12'>
    <div className='border bg-gray-400 w-[250px] h-[120px] p-2'>
      <h1 className='text-3xl font-bold'>Total Teachers:</h1>
      <h1 className='text-3xl p-2 font-bold text-center'>{details.total_teachers?.total_teachers}</h1>
    </div>
    <div className='border bg-gray-400 w-[250px] h-[120px] p-2'>
      <h1 className='text-3xl font-bold'>Total Student:</h1>
      <h1 className='text-3xl p-2  text-center font-bold'>{details.total_students?.total_students}</h1>
    </div>
    <div className='border bg-gray-400 w-[250px] h-[120px] p-2'>
      <h1 className='text-3xl font-bold'>Total Amount:</h1>
      <h1 className='text-3xl p-2 text-center font-bold'>{details.total_order_amount?.total_order_amount}</h1>
    </div>
   </div>
    <div className='h-200 w-200'>
      {userData ? (
          <div style={{ width: 700 }}>
          <Bar data={userData} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
   </section>
  )
}

export default DashBoard
