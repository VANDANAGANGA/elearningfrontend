import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


function Salesreport() {
    const[data,setData]=useState([])
    const [totalAmount, setTotalAmount] = useState(0);
    const [filterOption, setFilterOption] = useState('total');
    const [filteredData, setFilteredData] = useState([]);
    const componentRef = useRef(null);

    const generatePDF = () => {
      const input = document.getElementById('component-to-pdf');
    
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save('download.pdf');
        });
    };
    

    useEffect(() => {
        fetchData();
      }, []); // Fetch data when the component mounts
    
      useEffect(() => {
        filterData();
      }, [data, filterOption]); // Re-filter data when the data or filterOption changes
    
      const fetchData = () => {
        axios.get('http://localhost:8000/api/salesreport/')
          .then(response => {
            setData(response.data);
            setFilteredData(response.data); // Initialize filtered data with fetched data
            const total = response.data.reduce((acc, order) => acc + order.order_amount, 0);
            setTotalAmount(total);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      };
    
      const filterData = () => {
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];
      
        if (filterOption === 'today') {
          const todayData = data.filter(schedule => schedule.date === formattedCurrentDate);
          setFilteredData(todayData);
        } else if (filterOption === 'last_week') {
            const last7DaysStart = new Date(currentDate);
            last7DaysStart.setDate(last7DaysStart.getDate() - 6); // Go back 6 days to include today
            const last7DaysData = data.filter(schedule => {
              const scheduleDate = new Date(schedule.date);
              return scheduleDate >= last7DaysStart && scheduleDate <= currentDate;
            });
            setFilteredData(last7DaysData);
        } else if (filterOption === 'last_month') {
            const lastMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            const lastMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            const lastMonthData = data.filter(schedule => {
              const scheduleDate = new Date(schedule.date);
              return scheduleDate >= lastMonthStart && scheduleDate <= lastMonthEnd;
            });
            setFilteredData(lastMonthData);
        } else if (filterOption === 'total') {
          setFilteredData(data);
        }
      };
      
    
      const handleFilterChange = (event) => {
        setFilterOption(event.target.value);
      };

  return (
    <section className='w-full'>
    
    <div className='text-center '>
      <h1 className='text-center text-black text-4xl font-extrabold' >Sales Report</h1>
    </div>
    <div className='flex items-center justify-between'>
    <div>
    <select className="px-2 py-1 border rounded m-4 text-black" value={filterOption} onChange={handleFilterChange}>
              <option  value='total'>Total</option>
              <option  value='today'>Today</option>
              <option  value='last_week'>Last week</option>
              <option  value='last_month'>Last Month</option>
          </select>    
    </div>
    <div className="relative p-4 m-4">
    <button className=' absolute right-0 w-36 h-18 bg-[#1eb2a6] font-bold  px-4 py-2  rounded'  onClick={generatePDF} >PDF</button>
    </div>
    </div>
    <div className=' text-black p-2 text-center' id="component-to-pdf" ref={componentRef}>
        <h1 className='text-3xl font-black'>TOTAL : {totalAmount} </h1>
      <table>
          
        <thead className='p-4'>
          <tr>
            <th className='p-2 mx-4'>ID</th>
            <th className='p-2 mx-4'>Student Name</th>
            <th className='p-2 mx-4'>Order Amount</th>
            <th className='p-2 mx-4'>Payment ID</th>
            <th className='p-2 mx-4'>Active</th>
            <th className='p-2 mx-4'>Order Date</th>
            <th className='p-2 mx-4'>Months</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map(order => (
            <tr key={order.id}>
              <td className='p-2 mx-4'>{order.id}</td>
              <td className='p-2 mx-4'>{order.student_name}</td>
              <td className='p-2 mx-4'>{order.order_amount}</td>
              <td className='p-2 mx-4'>{order.order_payment_id}</td>
              <td className='p-2 mx-4'>{order.is_active ? 'Yes' : 'No'}</td>
              <td className='p-2 mx-4'>{new Date(order.order_date).toLocaleDateString()}</td>
              <td className='p-2 mx-4'>{order.months}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
</section>
)
}

export default Salesreport
