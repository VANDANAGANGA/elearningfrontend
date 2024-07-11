import React,{useEffect,useState} from 'react'
import axios from 'axios';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import instance from '../../routes/axios';
import Loader from '../Loader';

function Salesreport() {
    const[data,setData]=useState([])
    const [totalAmount, setTotalAmount] = useState(0);
    const [filterOption, setFilterOption] = useState('total');
    const [filteredData, setFilteredData] = useState([]);
    const componentRef = useRef(null);
    const [loading, setLoading] = useState(true); 
   
    const generatePDF = () => {
      const input = componentRef.current;
      const currentDate = new Date().toLocaleDateString();
      const title = "Sales Report";
      const filterLabel = filterOption === 'total' ? 'Total' : 
                          filterOption === 'today' ? 'Today' : 
                          filterOption === 'last_week' ? 'Last Week' : 'Last Month';
  
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
  
        pdf.setFontSize(18);
        pdf.text(title, 40, 40);
        pdf.setFontSize(12);
        pdf.text(`Period: ${filterLabel}`, 40, 60);
        pdf.text(`Date: ${currentDate}`, 40, 80);
  
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 100, pdfWidth, pdfHeight);
        pdf.save('sales_report.pdf');
      });
    };

    useEffect(() => {
        fetchData();
      }, []); 
    
      useEffect(() => {
        filterData();
      }, [data, filterOption]);
    
      const fetchData = () => {
        instance.get('salesreport/')
          .then(response => {
            setData(response.data);
            setLoading(false)
            setFilteredData(response.data);
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
        let filtered = [];
      
        if (filterOption === 'today') {
          const todayData = data.filter(schedule => schedule.date === formattedCurrentDate);
          filtered=todayData;
        } else if (filterOption === 'last_week') {
            const last7DaysStart = new Date(currentDate);
            last7DaysStart.setDate(last7DaysStart.getDate() - 6); // Go back 6 days to include today
            const last7DaysData = data.filter(schedule => {
              const scheduleDate = new Date(schedule.date);
              return scheduleDate >= last7DaysStart && scheduleDate <= currentDate;
            });
            filtered=last7DaysData;
        } else if (filterOption === 'last_month') {
            const lastMonthStart = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            const lastMonthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            const lastMonthData = data.filter(schedule => {
              const scheduleDate = new Date(schedule.date);
              return scheduleDate >= lastMonthStart && scheduleDate <= lastMonthEnd;
            });
            filtered=lastMonthData;
        } else if (filterOption === 'total') {
          filtered=data;
        }
        setFilteredData(filtered);
        const total = filtered.reduce((acc, order) => acc + order.order_amount, 0);
        setTotalAmount(total);
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
    {loading ? (
            <Loader visible={loading} />
          ) : (
    <div className=' text-black p-2 text-center' id="component-to-pdf" ref={componentRef}>
        <h1 className='text-3xl font-black'>TOTAL : {totalAmount} </h1>

          
    {filteredData.length==0?(
      <div className='flex items-center justify-center m-4  h-96'>
      <h1 className='text-red-500 font-bold text-2xl'>"Oops! No orders for this period. Stay tuned for exciting opportunities ahead!"</h1>
      </div>
    )  :( 
      <table className="min-w-full divide-y divide-gray-200 mt-6">
  <thead className="bg-gray-50">
    <tr>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Amount</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Months</th>
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200">
    {filteredData.map((order) => (
      <tr key={order.id}>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.student_name}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.order_amount}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.order_payment_id}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.is_active ? 'Yes' : 'No'}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.order_date).toLocaleDateString()}</td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.months}</td>
      </tr>
    ))}
  </tbody>
</table>
    )}
    </div>
    )}
</section>
)
}

export default Salesreport
